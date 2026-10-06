#!/usr/bin/env python3
"""Measure real token usage from a Claude Code session transcript.

Sums the `usage` block of every API turn (deduplicated by message id) between two
points in a session, including any subagents the session launched. Use it to put
measured, not estimated, token numbers in the session log.

Examples (run from anywhere; the project's transcript folder is found automatically):
    scripts/token-usage.py --since-text "generate through chapter 10"
    scripts/token-usage.py --start 2026-10-06T21:26:06Z --end 2026-10-06T22:10:00Z
    scripts/token-usage.py --since-text "chapter 11" --mark ch11-done        # remember an end point
    scripts/token-usage.py --from-mark ch11-done                              # usage since that mark
    scripts/token-usage.py --since-text "chapter 11" --markdown               # markdown table for logs

By default it reads the newest transcript for the current directory's project
(~/.claude/projects/<cwd with / replaced by ->/*.jsonl). Pass --session <id or path> to pick another.

Fields:
  input        fresh input tokens
  cache_create tokens written to the prompt cache (new context ingested)
  cache_read   tokens replayed from the cache (conversation history; billed at a steep discount)
  output       generated tokens, including reasoning and tool calls
  marginal     cache_create + output, the "new work" measure used in earlier logs
  subagent_*   the same totals for subagent transcripts, reported separately and included in total
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

MARKS = Path(os.environ.get("TOKEN_USAGE_MARKS", Path.home() / ".claude" / "token-usage-marks.json"))


def project_dir() -> Path:
    slug = os.getcwd().replace("/", "-")
    d = Path.home() / ".claude" / "projects" / slug
    if d.exists():
        return d
    # fall back to any project dir whose name is a prefix of the cwd (e.g. launched from the home directory)
    root = Path.home() / ".claude" / "projects"
    best = None
    for c in root.iterdir():
        if c.is_dir() and slug.startswith(c.name) and (best is None or len(c.name) > len(best.name)):
            best = c
    return best or d


def find_session(arg: str | None) -> Path:
    if arg:
        p = Path(arg)
        if p.exists():
            return p
        hit = list(project_dir().glob(f"{arg}*.jsonl")) or list((Path.home() / ".claude" / "projects").glob(f"*/{arg}*.jsonl"))
        if hit:
            return hit[0]
        sys.exit(f"no transcript matches {arg!r}")
    files = sorted(project_dir().glob("*.jsonl"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not files:
        sys.exit(f"no transcripts in {project_dir()}")
    return files[0]


def records(path: Path):
    with open(path) as fh:
        for line in fh:
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


def text_of(rec: dict) -> str:
    msg = rec.get("message")
    if not isinstance(msg, dict):
        return ""
    c = msg.get("content")
    if isinstance(c, str):
        return c
    if isinstance(c, list):
        return " ".join(b.get("text", "") for b in c if isinstance(b, dict))
    return ""


def timestamp_of_text(path: Path, needle: str) -> str:
    for r in records(path):
        if r.get("type") == "user" and needle.lower() in text_of(r).lower():
            return r["timestamp"]
    sys.exit(f"no user message containing {needle!r} in {path.name}")


def sum_usage(path: Path, start: str, end: str, seen: set) -> dict:
    """Sum usage per API message, keeping the LAST record of each message id.

    A streamed message is logged several times as it grows; only the final record has
    the true output_tokens (earlier ones hold partial counts), so first-wins undercounts.
    """
    last: dict = {}
    for r in records(path):
        m = r.get("message")
        if not isinstance(m, dict) or not m.get("usage"):
            continue
        ts = r.get("timestamp", "")
        if not (start <= ts < end):
            continue
        key = m.get("id") or r.get("uuid")
        if key in seen:
            continue
        last[key] = m["usage"]
    seen.update(last)
    t = dict(turns=len(last), input=0, cache_create=0, cache_read=0, output=0)
    for u in last.values():
        t["input"] += u.get("input_tokens", 0)
        t["cache_create"] += u.get("cache_creation_input_tokens", 0)
        t["cache_read"] += u.get("cache_read_input_tokens", 0)
        t["output"] += u.get("output_tokens", 0)
    return t


def finish(t: dict) -> dict:
    t["total"] = t["input"] + t["cache_create"] + t["cache_read"] + t["output"]
    t["marginal"] = t["cache_create"] + t["output"]
    return t


def add(a: dict, b: dict) -> dict:
    return {k: a[k] + b[k] for k in ("turns", "input", "cache_create", "cache_read", "output")}


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def load_marks() -> dict:
    try:
        return json.loads(MARKS.read_text())
    except (OSError, json.JSONDecodeError):
        return {}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--session", help="session id prefix or transcript path (default: newest)")
    ap.add_argument("--start", help="ISO timestamp, e.g. 2026-10-06T21:26:06Z")
    ap.add_argument("--end", help="ISO timestamp (default: now)")
    ap.add_argument("--since-text", help="start at the first user message containing this text")
    ap.add_argument("--from-mark", help="start at a mark saved earlier with --mark")
    ap.add_argument("--mark", help="save the end point under this name for later --from-mark")
    ap.add_argument("--markdown", action="store_true", help="print a markdown table instead of JSON")
    ap.add_argument("--no-subagents", action="store_true", help="exclude subagent transcripts")
    args = ap.parse_args()

    session = find_session(args.session)
    marks = load_marks()
    if args.start:
        start = args.start
    elif args.since_text:
        start = timestamp_of_text(session, args.since_text)
    elif args.from_mark:
        if args.from_mark not in marks:
            sys.exit(f"unknown mark {args.from_mark!r}; known: {sorted(marks)}")
        start = marks[args.from_mark]
    else:
        start = "0000"
    end = args.end or now_iso()

    seen: set = set()
    main_t = sum_usage(session, start, end, seen)
    sub_t = dict(turns=0, input=0, cache_create=0, cache_read=0, output=0)
    sub_files = []
    if not args.no_subagents:
        # subagent transcripts live beside the session: <session-id>/subagents/*.jsonl (and agent-*.jsonl in older layouts)
        folder = session.with_suffix("")
        sub_files = sorted(folder.glob("subagents/*.jsonl")) + sorted(folder.glob("**/agent-*.jsonl"))
        for f in dict.fromkeys(sub_files):
            sub_t = add(sub_t, sum_usage(f, start, end, seen))
    total = finish(add(main_t, sub_t))
    result = dict(session=session.name, start=start, end=end, main=finish(dict(main_t)),
                  subagents=finish(dict(sub_t)), subagent_transcripts=len(set(sub_files)), total=total)

    if args.mark:
        marks[args.mark] = end
        MARKS.parent.mkdir(parents=True, exist_ok=True)
        MARKS.write_text(json.dumps(marks, indent=2))

    if not args.markdown:
        print(json.dumps(result, indent=2))
        return
    rows = [("Fresh input tokens", "input"), ("Cache creation tokens (new context ingested)", "cache_create"),
            ("Cache read tokens (history replay)", "cache_read"), ("Output tokens", "output")]
    print(f"Measured from `{session.name}`, {start} to {end} ({total['turns']} API turns).\n")
    print("| Field | Main session | Subagents | Total |\n|-------|-------------:|----------:|------:|")
    for label, k in rows:
        print(f"| {label} | {main_t[k]:,} | {sub_t[k]:,} | {total[k]:,} |")
    m = result["main"]; s = result["subagents"]
    print(f"| **Total processed** | **{m['total']:,}** | **{s['total']:,}** | **{total['total']:,}** |")
    print(f"| Marginal (cache creation + output) | {m['marginal']:,} | {s['marginal']:,} | {total['marginal']:,} |")


if __name__ == "__main__":
    main()
