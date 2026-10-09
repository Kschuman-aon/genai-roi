# Chapter Content Generator Session Log

**Skill Version:** 1.11
**Date:** 2026-10-08
**Execution Mode:** Sequential, one chapter at a time, validated before the next began (per AGENTS.md)
**Scope:** Request was "generate chapters 16-21". Chapter 16 already had validated content from the earlier 2026-10-08 session (`chapter-content-generator-2026-10-08.md`), so it was not regenerated. Chapters 17-21 were written.

## Timing

| Metric | Value |
|--------|-------|
| Start Time | 2026-10-08 14:41:08 |
| End Time | 2026-10-08 15:03:20 (wall-clock as reported by the shell) |

## Token Usage (measured, not estimated)

From `scripts/token-usage.py --session f609de3f-4b8b-4fcc-80dd-fdedc6c6082e --since-text "generate chapters 16-21" --markdown`, 40 API turns, no subagents. Includes the one-time setup (guides, skill, spec rules, Chapter 16 sample, project survey).

| Field | Tokens |
|-------|-------:|
| Fresh input tokens | 80 |
| Cache creation tokens (new context ingested) | 279,372 |
| Cache read tokens (history replay) | 7,129,903 |
| Output tokens | 184,265 |
| **Total processed** | **7,593,620** |
| Marginal (cache creation + output) | 463,637 |

Marginal tokens per chapter: about 92,700 (463,637 / 5), against about 72,000 in the earlier Chapter 12-16 session.

## Results

| Chapter | Words (total) | Words (excl. specs) | MicroSim specs | Concepts |
|--------:|--------------:|--------------------:|---------------:|---------:|
| 17 | 6,082 | 3,627 | 3 | 23/23 |
| 18 | 6,269 | 3,627 | 3 | 22/22 |
| 19 | 5,939 | 3,317 | 3 | 20/20 |
| 20 | 5,871 | 3,351 | 3 | 20/20 |
| 21 | 5,606 | 3,145 | 3 | 20/20 |
| **Total** | **29,767** | **17,067** | **15** | **105/105** |

- `scripts/validate-chapter.py N --fix --build`: clean on all five (no errors, mascot placement rules satisfied, `mkdocs build --strict` passes). A final run on Chapters 16-21 together was also clean.
- Edge-direction and chapter-order checks (Steps 1.3a/1.3b) were not re-run: the learning graph and chapter structure are unchanged since the 2026-10-06 session.
- MicroSim reuse check: skipped (search-microsims service is not present on this machine).
- All 15 specifications are in the v1.11 format, marked `Specified`, with no iframes; none are built yet.
- Arithmetic in every worked example and every specification item bank was computed in Python before writing.

## Running Cases Continued

- Chapters 17 and 18 follow one ticket-routing model, then a four-model portfolio, using the Chapter 6 unit costs ($4.00 GPU hour, $3 and $15 per million tokens) plus $90 an hour for data scientists and $45 an hour for reviewers. Chapter 17 year 1 totals: $84,930 manual, $68,498 with AI-assisted labeling and features.
- Chapters 19-21 continue the support assistant of Chapters 9 and 10 at 960,000 queries a year. Chapter 19 rebuilds its fees from vendor rate cards ($14,880 for vendor A, against Chapter 10's rounded $0.0167 a query driver) and says so in the text. Annual totals A $58,680, B $76,776, C $59,083, D $111,360 carry into Chapters 20 and 21.
- Chapter 21 prices $29,288 of annual controls and leaves the exposures (shadow AI $36,000, overreliance up to $23,040, and others) for Chapter 22's risk-adjusted model, which it names explicitly.

## Deviations From the Elaboration Budget

As in earlier sessions, prose is well below the CIS-driven budget sum (Chapter 17 alone has 21 Tier A concepts, about 13,400 words of budget against about 3,600 written). This follows the project's anti-padding rule. Every Tier A concept has a definition and a worked number; every Tier C concept is defined without padding.

## Process Notes

- **AGENTS.md rule 1 (one `Write` per chapter) was not followed for Chapters 18, 19, 20 and 21.** Each of those files was written in a first `Write` that stopped partway through the chapter, then completed with several `Edit` appends. Chapter 17 was a single `Write`. The final files are complete and validated, but the appends cost extra turns, which is the likely reason marginal tokens per chapter are higher than in the earlier session.
- Chapter front matter dates for 18-21 were first written with invented later times and then corrected to the real clock time (15:03:00); the time is a single stamp for the batch, not each chapter's own finish time.
- The `--since-text` option of `token-usage.py` did not find this session by default, because the session started in `/home/a0909852` and the script looked in the project folder for `genai-roi`. Passing `--session <id>` fixed it.

## Notes for Later Chapters

- Chapter 22 (risk-adjusted costing) should take its exposures from Chapter 21's closing section and the Chapter 20 risk register ($37,232 of expected annual loss across a portfolio with vendor A and one self-hosted open model). Avoid adding an exposure to a control that already removes it.
- Chapters 23-27 remain stubs.

## Pre-existing Issues Found (not changed)

`scripts/validate-chapter.py --all` reports FAIL for Chapters 1-5, whose MicroSim specifications predate the v1.11 format (see the earlier session's log). They build cleanly.

## Files Created/Updated

- `docs/chapters/17-data-model-lifecycle-cost-drivers/index.md`
- `docs/chapters/18-mlops-infrastructure-reuse-economics/index.md`
- `docs/chapters/19-vendor-pricing-licensing-economics/index.md`
- `docs/chapters/20-vendor-selection-sourcing-strategy/index.md`
- `docs/chapters/21-governance-compliance-security-risk/index.md`
- `logs/chapter-content-generator-2026-10-08-ch17-21.md` (this file)

Nothing was committed or published.
