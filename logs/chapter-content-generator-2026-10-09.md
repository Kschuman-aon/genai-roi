# Chapter Content Generator Session Log

**Skill Version:** 1.11
**Date:** 2026-10-09
**Execution Mode:** Sequential, one chapter at a time, main session only (no subagents)
**Scope:** Chapters 22-27, the last six stubs. With these, all 27 chapters have content.

## Timing

| Metric | Value |
|--------|-------|
| Start Time | 2026-10-09 08:08:28 |
| End Time | 2026-10-09 08:28:04 |
| Elapsed Time | about 20 minutes |

## Token Usage

Measured with `scripts/token-usage.py --session 33ffc20b-f84b-4261-95e4-81c8ece34814 --since-text "finish generating the rest of the chapters" --markdown`, 38 API turns.

| Field | Total |
|-------|------:|
| Fresh input tokens | 76 |
| Cache creation tokens (new context ingested) | 252,911 |
| Cache read tokens (history replay) | 5,894,082 |
| Output tokens | 162,827 |
| **Total processed** | **6,309,896** |
| Marginal (cache creation + output) | 415,738 |

Marginal tokens per chapter, from `--mark` checkpoints taken after Chapters 22, 24, 25, and 26 (no mark was taken after Chapter 23, so Chapters 23 and 24 are one figure):

| Chapters | Marginal tokens | Note |
|----------|----------------:|------|
| 22 | 200,694 | Includes the setup: reading the guide, the skill, the spec rules, Chapter 21, and the earlier chapters' figures, and designing the running case |
| 23 and 24 | 104,813 | About 52,400 each |
| 25 | 22,760 | |
| 26 | 31,987 | |
| 27 | 55,484 | |
| **All six** | **415,738** | About 69,300 a chapter on average; about 43,000 a chapter for Chapters 23-27 |

For comparison, the earlier sessions logged about 72,000 (Chapters 12-16) and about 92,700 (Chapters 17-21) marginal tokens per chapter. Each chapter here was written in a single `Write` call, as AGENTS.md rule 1 requires, with at most one small `Edit`-style correction pass afterward.

## Results

| Chapter | Words (total) | Words (excl. specs) | MicroSim specs | Concepts |
|--------:|--------------:|--------------------:|---------------:|---------:|
| 22 | 7,207 | 4,839 | 3 | 20/20 |
| 23 | 5,884 | 3,488 | 3 | 20/20 |
| 24 | 6,091 | 3,704 | 3 | 20/20 |
| 25 | 3,828 | 2,338 | 2 | 8/8 |
| 26 | 4,722 | 2,547 | 3 | 13/13 |
| 27 | 5,852 | 3,639 | 3 | 24/24 |
| **Total** | **33,584** | **20,555** | **17** | **105/105** |

- `scripts/validate-chapter.py N --fix --build`: clean on all six (no errors, mascot placement rules satisfied, `mkdocs build --strict` passes). `--fix` removed stray `</details>` tags after mascot admonitions, 2 to 4 per chapter, the recurring slip.
- `scripts/validate-chapter.py --all`: 27 chapters, 145,243 words (88,061 excluding specs). No `TODO: Generate Chapter Content` placeholder remains in any chapter.
- Edge-direction and chapter-order checks (Steps 1.3a/1.3b) were not re-run: the learning graph and chapter structure are unchanged since the 2026-10-06 session.
- MicroSim reuse check: skipped (search-microsims service is not present on this machine).
- All 17 specifications are in the v1.11 format, marked `Specified`, with no iframes; none are built yet.
- Arithmetic in every worked example and every specification item bank was computed in Python before writing. Four slips were caught on a read-back and fixed before validation: a placeholder left in a Chapter 22 ledger step, a "notice" claim in a Chapter 22 spec that was false at the plan benefit (the net turns positive at $80,000 of benefit with 4 sharing systems), a $12,150 versus $11,340 sum in Chapter 23, and a mislabeled $6,120 rework figure in Chapter 23.

## Running Case Continued

The support assistant of Chapters 9, 10, 19, 20, and 21 is carried through all six chapters, with the 3-year view of Chapter 11 (realized benefit $41,310, $55,080, $55,080).

- **Chapter 22 builds the risk-adjusted model.** Year-2 net before additions $20,080; additions $69,697 (retraining $5,400, change management $2,160, Chapter 21 controls $29,288, mitigations not in the controls $5,588, expected residual loss $27,261); risk-adjusted net -$49,617; break-even benefit $104,697 (1.90 times the realized benefit, 1.31 times the plan's $80,000). Three-year risk-adjusted cost $403,291 against a benefit of $151,470 gives an ROI of -62.4% and an NPV at 10% of -$222,085, against 37.5% in the plan and -5.3% realized. The result moves only to -58.2% and -65.9% when the residual loss is halved or raised by half, because controls ($95,064) are the larger part of the additions.
- **This changes the book's running story.** Earlier chapters left the case at -5.3% realized; Chapter 22 shows it deeply negative once Chapter 21's controls and the register are priced in full. Chapters 23-27 are written as the honest reporting of that result, with a recommendation (restructure now, two-quarter gate, retire otherwise) rather than a rescue. If a different narrative is wanted, Chapter 22's controls allocation is the lever.
- **Chapter 22 corrects Chapter 21 in one place.** Chapter 21 scaled the whole $150 a record when it cut retention to 30 days (impact $40,000, expected loss $2,000). Chapter 22 splits the $120,000 incident into fixed and per-record parts, which gives $80,025 and $4,001, and says so in the text. Chapter 21 itself is unchanged.
- Chapter 22 keeps Chapter 10's $35,000 as the planned running cost and Chapter 11's $55,080 as the benefit, and excludes Chapter 19's $38,400 of wrong-answer cost with a stated reason (the measured task time already includes the fixing). Agent time is costed at $45 an hour in the new costs, the rate Chapters 19 and 21 use for agent time, while the benefit uses Chapter 10's $30; the text does not call out the difference.
- Chapters 23-27 all take their figures from Chapters 11, 12, 19-22, with the new illustrative figures labeled: the time-study standard deviation of 6 minutes and 2,000 tickets a group come from Chapter 12; the peer median of $0.40 a ticket (Chapter 24), the reading and speaking paces of 200 and 130 words a minute (Chapter 23), and the maturity-level costs (Chapter 22) are invented and marked illustrative.

## Deviations From the Elaboration Budget

`cis_max` for the book is 424. By the skill's tiering, Chapter 22 has 1 Tier A concept (CIS 20), 15 Tier B, and 4 Tier C; Chapters 23 and 24 are almost all Tier A (CIS 25-85), which would budget about 11,000 words each. As in earlier sessions, prose is well below the CIS-driven budget (Chapter 23 has 19 Tier A concepts and about 3,500 words excluding specs), following the project's anti-padding rule. Every concept has a definition, and most have a worked number or a table. Chapters 25 and 26 are the shortest because they have the fewest concepts.

## Process Notes

- AGENTS.md rule 1 (one `Write` per chapter) was followed for all six chapters.
- The `token-usage.py` default project folder did not find this session, which started in `/home/a0909852`; passing `--session <id>` fixed it, as the earlier log noted.
- Front matter dates were set from the real clock, and in Chapters 22, 23, and 24 corrected after writing, because I had first typed times that did not match the clock.
- The `validate-chapter.py --all` output still reports FAIL for Chapters 1-5 (see below) and warnings about front matter versions for earlier chapters.

## Pre-existing Issues Found (not changed)

`scripts/validate-chapter.py --all` reports FAIL for Chapters 1-5, whose MicroSim specifications predate the v1.11 format (one example: `compute-utilization-explorer` is missing eight required fields and has an `Implementation:` line). They build cleanly. The chapters 6-21 files show as modified in `git status` because they were never committed in earlier sessions.

## Files Created/Updated

- `docs/chapters/22-risk-adjusted-costing-reporting/index.md`
- `docs/chapters/23-audience-analysis-executive-framing/index.md`
- `docs/chapters/24-presenting-defending-findings/index.md`
- `docs/chapters/25-designing-executive-roi-report/index.md`
- `docs/chapters/26-data-visualization-storytelling/index.md`
- `docs/chapters/27-report-production-review-capstone/index.md`
- `logs/chapter-content-generator-2026-10-09.md` (this file)

Nothing was committed or published.
