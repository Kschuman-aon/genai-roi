# MicroSim generation: Chapters 15-17 (2026-10-09)

Nine MicroSims built from the `#### Diagram:` specifications of Chapters 15, 16, and 17 (the second batch of the 47 that remained for Chapters 12-27; 38 remain, in Chapters 18-27).

| Chapter | Sim | Pattern | Height |
|---|---|---|---|
| 15 | sdlc-phase-savings-calculator | Runner, numeric answers, Chart.js bar chart (baseline cost, then freed time), four sliders | 492 |
| 15 | shift-left-investment-judge | Runner, Fund / Do not fund, move selector plus three sliders | 302 |
| 15 | technical-debt-break-even-explorer | Runner, three-way verdict, three sliders | 290 |
| 16 | developer-productivity-index-builder | Runner, numeric answers, four sliders, points-by-component table | 368 |
| 16 | roadmap-prioritizer | Runner, multi-select of six initiatives (toggle buttons inside the table), budget slider | 394 |
| 16 | sdlc-roi-case-study-workbench | Runner, numeric answers, three sliders | 316 |
| 17 | labeling-strategy-cost-calculator | Runner, numeric answers with per-item tolerances, three sliders | 308 |
| 17 | retraining-trigger-classifier | Runner, three-way action, shows which clause of the rule decided | 322 |
| 17 | retraining-cadence-tuner | Runner, interval choice, six annual totals with the lowest marked, four sliders | 322 |

## Method
- Reused `sims/shared-libs/quiz-kit.js` (the pattern of the 26 sims built on Oct 8-9). One `.js` per sim was written by hand; `main.html`, `metadata.json`, and `index.md` were generated from the chapter specifications by a scratchpad script that reads the sim-id, Bloom level and verb, objective, prerequisites, misconceptions, evidence of mastery, and rationale straight out of each `<details>` block.
- Library deviation: the specifications name p5.js (Chart.js for the first). The sims use the DOM with the quiz kit, as the earlier batches did, plus Chart.js for the first sim's bar chart. Interaction, items, tolerances, and feedback follow the specifications.
- One addition to a specification: in the Shift-Left Investment Judge exploration, the specification's default (20 defects, $6,000, a testing-to-requirements move) does not depend on the production fix cost, yet the specification wants the learner to see a lower production fix cost remove the case for production-dependent options. The exploration therefore adds a "move" selector (the six moves used by the six options, default Testing → Requirements) beside the three specified sliders.
- Chapter iframes inserted with `add-iframes-to-chapter.py`, heights set with `sync-iframe-heights.py`, nav regenerated with `update-mkdocs-nav.py` (56 entries). Nine cards inserted into `docs/sims/index.md` in alphabetical position (46 to 55 cards, nothing removed). Thumbnails are headless captures of the first screen.
- Panel heights were first estimated, then measured (the panel's content height at every step, including exploration) and set to the measured need plus about 14 px. The estimates had been 50 to 140 px too tall.

## Verification
- A headless Chromium run (`~/.venvs/microsim`, served from `docs/sims` over HTTP) answered every item of every sim through the real UI with the model values typed from the specifications: all nine finished at full marks with mastery reached, no page errors or console errors, and no panel overflow at 800 px. Every slider was also moved to its minimum and maximum in exploration without error.
- Wrong-first-attempt path checked on seven of the nine (a wrong answer shows the "Why" text and "Try again", then the right answer scores one fewer). The two it did not cover (trigger classifier, cadence tuner) use the same shared Runner code; the harness picked an answer that was correct for item 1.
- Data checked against the specification tables: all six roadmap funded sets, amounts spent, and savings; all six ratios and verdicts in the shift-left judge; the eight debt shares; the eight index values; the case workbench values; the eight labeling values; the eight retraining actions with the deciding clause; and, for the cadence tuner, the 36 annual totals (six intervals by six scenarios) compared with the specification's numbers, all matching.
- Two formatting slips caught by the run and fixed: negative numbers printed with an ASCII hyphen ("net hours -20", "-100.0%") instead of the minus sign used elsewhere.
- `validate-sims.py`: all nine score 95 (grade A). `scripts/validate-chapter.py 15 16 17 --build`: OK, `mkdocs build --strict` passes.

## Incident worth knowing about
My first attempt to insert the gallery cards searched for `<div class="grid cards" markdown="1">`; the page uses `markdown` with no `="1"`, so the script matched nothing and appended the nine cards after the closing `</div>`. I caught it from the diff, restored the page to its original 292 lines (the original content was a verbatim prefix of the damaged file), and redid the insertion with asserts on the marker. The final diff against HEAD for `docs/sims/index.md` contains additions only.

## Token usage (measured)
Measured with `scripts/token-usage.py --session cd7dfbd8-5a76-40c8-a2e3-64086508610c --since-text "generate the next section of microsims"`, 32 API turns, no subagents. The count stops before this log was written.

| Field | Tokens |
|---|---:|
| Fresh input | 64 |
| Cache creation | 141,291 |
| Cache read | 3,470,506 |
| Output | 50,539 |
| **Total processed** | **3,662,400** |
| Marginal (cache creation + output) | 191,830 |

Per sim: about 21,300 marginal and 407,000 total processed, against about 19,300 and 556,000 for the Oct 9 batch of nine and about 20,500 and 576,000 for the Oct 8 batch of 17. (The session began in the home directory, so `--session` was passed explicitly.)

Not committed or published.
