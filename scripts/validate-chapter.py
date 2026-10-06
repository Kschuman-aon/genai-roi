#!/usr/bin/env python3
"""One-command quality gate for generated chapters.

Replaces the separate calls we used to make after writing a chapter:
  - repair stray </details> tags left after mascot admonitions   (--fix)
  - check the TODO placeholder is gone and the front matter exists
  - check <details> blocks are balanced
  - check every concept in the "Concepts Covered" table appears in the text
  - run the mascot placement validator from ibook-skills
  - sanity-check every MicroSim specification block (required fields, Bloom
    verb in the level's list, no build instructions, no vague Content)
  - report word counts (total, and excluding specification blocks)
  - optionally run `mkdocs build --strict` into a temp dir            (--build)

Usage (from the project root):
    scripts/validate-chapter.py 11 12 13            # chapter numbers
    scripts/validate-chapter.py 11 --fix --build    # repair stray tags, then full check
    scripts/validate-chapter.py --all               # every chapter that has content

Exit status: 0 if there are no errors, 1 otherwise. Warnings never fail the run.
"""
from __future__ import annotations

import argparse
import glob
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHAPTERS = ROOT / "docs" / "chapters"

BLOOM_VERBS = {
    "Remember": "list define recall identify name recognize locate describe".split(),
    "Understand": "explain summarize interpret classify compare contrast exemplify infer".split(),
    "Apply": "use execute implement solve demonstrate calculate apply practice".split(),
    "Analyze": "differentiate organize attribute compare contrast examine deconstruct distinguish".split(),
    "Evaluate": "judge critique assess justify prioritize recommend validate defend".split(),
    "Create": "design construct develop formulate compose produce invent generate".split(),
}
REQUIRED_FIELDS = [
    "Bloom Level", "Bloom Verb", "Learning Objective", "Prerequisites", "Evidence of Mastery",
    "Misconceptions", "Instructional Rationale", "Content", "Provenance", "Rules",
    "Learner Activity", "Feedback", "Starting State", "Chapter Anchors",
]
LIBRARIES = {"p5.js", "Chart.js", "Plotly", "Mermaid", "vis-network", "vis-timeline", "Leaflet", "venn.js", "html"}
TYPES = {"microsim", "chart", "diagram", "infographic", "timeline", "map", "workflow", "graph-model", "causal-loop"}
# Layout and build instructions the specification rules forbid.
BUILD_WORDS = re.compile(r"\b\d+\s?px\b|\bpixel (?:size|width|height)s?\b|Implementation:|\bcanvas (?:height|width|size)\b|\bbreakpoints?\b", re.I)
VAGUE = re.compile(r"\bfor example\b|\bsuch as\b|\betc\.|\ba few\b", re.I)


def find_mascot_validator() -> Path | None:
    candidates = []
    for var in ("BK_HOME", "IBOOK_SKILLS"):
        if os.environ.get(var):
            candidates.append(Path(os.environ[var]) / "skills/book-installer/scripts/validate-chapter-mascots.py")
    candidates.append(Path.home() / "projects/ibook-skills/skills/book-installer/scripts/validate-chapter-mascots.py")
    candidates += [Path(p) for p in glob.glob(str(Path.home() / "projects/*/skills/book-installer/scripts/validate-chapter-mascots.py"))]
    return next((c for c in candidates if c.exists()), None)


def chapter_path(token: str) -> Path | None:
    token = token.strip()
    if token.isdigit():
        hits = sorted(CHAPTERS.glob(f"{int(token):02d}-*/index.md"))
    else:
        hits = sorted(CHAPTERS.glob(f"{token}/index.md")) or sorted(CHAPTERS.glob(f"*{token}*/index.md"))
    return hits[0] if hits else None


def fix_stray_details(text: str) -> tuple[str, int]:
    """Drop a </details> that directly follows an indented admonition body line.

    A real closing tag follows an unindented line (the last field of a spec), so
    a closing tag right after a 4-space-indented line can only be a stray one.
    """
    new, n = re.subn(r"(\n    [^\n]+)\n</details>\n", r"\1\n", text)
    return new, n


def split_sections(text: str) -> tuple[str, str]:
    """Return (front matter + outline, generated body)."""
    parts = text.split("\n---\n")
    # first --- closes front matter, second closes the outline, the rest is the body
    if len(parts) >= 3 and text.startswith("---"):
        return "\n---\n".join(parts[:2]), "\n---\n".join(parts[2:])
    return "", text


def concepts_from_outline(text: str) -> list[str]:
    m = re.search(r"## Concepts Covered(.*?)(?=\n## )", text, re.S)
    if not m:
        return []
    return [r[0] for r in re.findall(r"^\|\s*([^|]+?)\s*\|\s*\d+\s*\|", m.group(1), re.M)]


def norm(s: str) -> str:
    s = s.lower().replace("-", " ")
    return re.sub(r"\s+", " ", s)


def check_specs(body: str, errors: list[str], warnings: list[str]) -> int:
    blocks = re.findall(r"<details markdown=\"1\">(.*?)</details>", body, re.S)
    specs = [b for b in blocks if "**sim-id:**" in b]
    for b in specs:
        sid = re.search(r"\*\*sim-id:\*\*\s*([^\s<]+)", b)
        sid = sid.group(1) if sid else "?"
        tag = f"spec {sid}"
        t = re.search(r"^Type:\s*(\S+)", b, re.M)
        if not t or t.group(1) not in TYPES:
            errors.append(f"{tag}: Type missing or not one of {sorted(TYPES)}")
        lib = re.search(r"\*\*Library:\*\*\s*([^<\n]+?)\s*(?:<br/>|$)", b, re.M)
        if not lib or lib.group(1).strip() not in LIBRARIES:
            errors.append(f"{tag}: Library missing or free text ({lib.group(1).strip() if lib else 'none'})")
        if "**Status:** Specified" not in b and "**Status:** Reused" not in b:
            errors.append(f"{tag}: Status must be Specified or Reused")
        for f in REQUIRED_FIELDS:
            if not re.search(rf"\*\*{re.escape(f)}:\*\*", b):
                errors.append(f"{tag}: missing field '{f}'")
        lvl = re.search(r"\*\*Bloom Level:\*\*\s*([A-Za-z]+)", b)
        verb = re.search(r"\*\*Bloom Verb:\*\*\s*([A-Za-z]+)", b)
        obj = re.search(r"\*\*Learning Objective:\*\*\s*(.+)", b)
        if lvl and verb:
            if lvl.group(1) not in BLOOM_VERBS:
                errors.append(f"{tag}: Bloom Level '{lvl.group(1)}' is not one of the six levels")
            elif verb.group(1).lower() not in BLOOM_VERBS[lvl.group(1)]:
                errors.append(f"{tag}: verb '{verb.group(1)}' is not in the {lvl.group(1)} list")
            if obj and not obj.group(1).startswith(f"The learner will {verb.group(1).lower()}"):
                errors.append(f"{tag}: objective must start 'The learner will {verb.group(1).lower()}'")
        if BUILD_WORDS.search(b):
            errors.append(f"{tag}: contains layout/build wording ({BUILD_WORDS.search(b).group(0)!r})")
        content = re.search(r"\*\*Content:\*\*(.*?)(?=\n\*\*Provenance:\*\*)", b, re.S)
        if content and VAGUE.search(content.group(1)):
            warnings.append(f"{tag}: vague wording in Content ({VAGUE.search(content.group(1)).group(0)!r})")
        if re.search(r"^ +\S", b.split("</summary>")[-1], re.M) and not re.search(r"^\s*\|", b, re.M):
            warnings.append(f"{tag}: indented lines inside the details block")
    return len(specs)


def check_chapter(path: Path, fix: bool, mascot: Path | None) -> dict:
    errors: list[str] = []
    warnings: list[str] = []
    text = path.read_text()
    fixed = 0
    if fix:
        text2, fixed = fix_stray_details(text)
        if fixed:
            path.write_text(text2)
            text = text2
    outline, body = split_sections(text)

    if "TODO: Generate Chapter Content" in text:
        errors.append("TODO placeholder is still present")
    if not text.startswith("---\n") or "generated_by:" not in text.split("\n---\n")[0]:
        errors.append("front matter missing generated_by")
    if "version: 1.11" not in text.split("\n---\n")[0]:
        warnings.append("front matter version is not 1.11")

    opens, closes = text.count("<details"), text.count("</details>")
    if opens != closes:
        errors.append(f"<details> blocks unbalanced: {opens} open, {closes} close (try --fix)")

    concepts = concepts_from_outline(text)
    low = norm(body)
    alias = {"cost reduction vs avoidance": "cost reduction versus avoidance",
             "fine tuning vs prompting": "fine tuning versus prompting"}
    missing = [c for c in concepts if alias.get(norm(c), norm(c)) not in low and norm(c) not in low]
    if not concepts:
        errors.append("no 'Concepts Covered' table found")
    if missing:
        errors.append(f"concepts not found in text: {missing}")

    nspecs = check_specs(body, errors, warnings)

    mascot_out = ""
    if mascot is None:
        warnings.append("mascot validator not found (set BK_HOME or IBOOK_SKILLS)")
    else:
        r = subprocess.run([sys.executable, str(mascot), str(path)], capture_output=True, text=True)
        mascot_out = r.stdout.strip().splitlines()[-1] if r.stdout.strip() else ""
        if r.returncode != 0:
            errors.append("mascot validator failed:\n" + r.stdout.strip())

    if "$$" in body:
        errors.append("uses $$ math delimiters (use \\( \\) and \\[ \\])")

    words = len(body.split())
    words_prose = len(re.sub(r"<details.*?</details>", "", body, flags=re.S).split())
    return dict(path=path, errors=errors, warnings=warnings, fixed=fixed, words=words,
                prose=words_prose, specs=nspecs, concepts=len(concepts) - len(missing),
                total=len(concepts), mascot=mascot_out)


def build_strict() -> tuple[bool, str]:
    with tempfile.TemporaryDirectory() as tmp:
        r = subprocess.run(["mkdocs", "build", "--strict", "-d", tmp], cwd=ROOT, capture_output=True, text=True)
    bad = [l for l in (r.stdout + r.stderr).splitlines() if re.search(r"WARNING|ERROR|Aborted", l)]
    return r.returncode == 0, "\n".join(bad)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("chapters", nargs="*", help="chapter numbers (11) or directory names")
    ap.add_argument("--all", action="store_true", help="check every chapter that no longer has the TODO placeholder")
    ap.add_argument("--fix", action="store_true", help="repair stray </details> tags in place")
    ap.add_argument("--build", action="store_true", help="also run mkdocs build --strict (temp dir)")
    args = ap.parse_args()

    paths: list[Path] = []
    if args.all:
        paths = [p for p in sorted(CHAPTERS.glob("[0-9][0-9]-*/index.md"))
                 if "TODO: Generate Chapter Content" not in p.read_text()]
    for tkn in args.chapters:
        p = chapter_path(tkn)
        if p is None:
            print(f"!! no chapter matches '{tkn}'")
            return 2
        paths.append(p)
    if not paths:
        ap.print_usage()
        return 2

    mascot = find_mascot_validator()
    failed = False
    tot_w = tot_p = 0
    for p in paths:
        r = check_chapter(p, args.fix, mascot)
        failed |= bool(r["errors"])
        tot_w += r["words"]
        tot_p += r["prose"]
        status = "FAIL" if r["errors"] else "ok"
        print(f"[{status}] {p.parent.name}: concepts {r['concepts']}/{r['total']}, "
              f"words {r['words']:,} ({r['prose']:,} excl. specs), specs {r['specs']}, "
              f"mascot: {r['mascot'] or 'n/a'}" + (f", fixed {r['fixed']} stray tag(s)" if r["fixed"] else ""))
        for e in r["errors"]:
            print(f"      ERROR   {e}")
        for w in r["warnings"]:
            print(f"      warning {w}")
    if len(paths) > 1:
        print(f"total: {tot_w:,} words ({tot_p:,} excl. specs) across {len(paths)} chapters")

    if args.build:
        ok, detail = build_strict()
        print("[ok] mkdocs build --strict" if ok else "[FAIL] mkdocs build --strict\n" + detail)
        failed |= not ok
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
