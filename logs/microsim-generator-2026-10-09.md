# MicroSim generation: Chapters 12-14 (2026-10-09)

Nine MicroSims built from the `#### Diagram:` specifications of Chapters 12, 13, and 14 (the first batch of the 47 that remained for Chapters 12-27).

| Chapter | Sim | Pattern | Height |
|---|---|---|---|
| 12 | confusion-matrix-metric-explorer | QK.Runner, numeric answers, slider exploration | 360 |
| 12 | control-group-attribution-lab | Runner, number plus verdict per scenario | 360 |
| 12 | significance-check-lab | Runner, verdict, z-statistic exploration | 320 |
| 13 | multi-tenant-cost-allocator | Runner, numeric answers, three sliders | 390 |
| 13 | pipeline-stage-sorter | Runner, four-way choice, final stage table | 400 |
| 13 | spend-anomaly-detector | Runner plus Chart.js, masked-day question, k and window sliders | 580 |
| 14 | rollup-reconciliation-calculator | Runner, numeric answers, error sliders | 390 |
| 14 | cost-metric-lineage-explorer | Runner plus vis-network (19 nodes, 18 arrows), click-to-select | 580 |
| 14 | alert-threshold-tuner | Runner, choice among five multipliers | 300 |

## Method
- Reused `sims/shared-libs/quiz-kit.js` (the pattern of the 17 sims built on Oct 8). Only one `.js` per sim was written; `main.html`, `index.md`, and `metadata.json` came from a small scaffold script.
- Library deviation: the specifications name p5.js. The sims use the DOM with the quiz kit (plus Chart.js for the spend series and vis-network for the lineage graph), as the Oct 8 sims did. The interaction, items, tolerances, and feedback follow the specifications.
- Chapter iframes inserted with `add-iframes-to-chapter.py`; heights set with `sync-iframe-heights.py`; nav regenerated with `update-mkdocs-nav.py`; nine cards added by hand to `docs/sims/index.md` (the generator rewrites the whole page in another format). Thumbnails are headless captures of the first screen.

## Verification
- A headless Chromium run (`~/.venvs/microsim`) answered every item of every sim correctly through the real UI: no page errors or console errors, and no panel overflow at 800 px (at 420 px the panel scrolls inside the frame).
- Data checked against the specification tables: all eight z values, the 14-day mean, SD, and threshold table, the flagged days (12 and 21), the alert tables and best multipliers, the six lineage affected sets, and every numeric answer.
- Caught by the run: vis-network returns no node on a real click when `selectable: false`, so the lineage sim was unplayable until `selectable: true` (with `chosen: false` and `unselectAll()`).
- `validate-sims.py`: all nine score 95 (grade A). `scripts/validate-chapter.py 12 13 14 --build`: OK, `mkdocs build --strict` passes.

## Token usage (measured)
Measured with `scripts/token-usage.py --session 7d91c765-7e1a-4f82-b1d4-652d3755cda3 --from-mark sims-12-14-start`, 26 API turns, no subagents.

| Field | Tokens |
|---|---:|
| Fresh input | 52 |
| Cache creation | 124,134 |
| Cache read | 4,826,165 |
| Output | 49,890 |
| **Total processed** | **5,000,241** |
| Marginal (cache creation + output) | 174,024 |

Per sim: about 19,300 marginal and 556,000 total processed, against about 20,500 and 576,000 for the Oct 8 batch of 17.

Not committed or published.
