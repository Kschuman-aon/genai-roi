# Learning Graph Generator — Session Log

- **Skill version:** learning-graph-generator 1.07
- **Date:** 2026-09-03
- **Trigger:** `book-chapter-generator` detected `learning-graph.json` had no `cis` field (predates learning-graph-generator v1.06). User chose to regenerate.

## What ran

Steps 1–8 were already complete and untouched (course description assessment, concept list, dependency CSV, taxonomy, quality metrics all pre-existing and valid). Only Step 9 (JSON build) was re-run:

1. Copied `csv-to-json.py` from the skill package into `docs/learning-graph/` — local copy was v0.04, skill package is **v1.05**.
2. Ran `python3 csv-to-json.py learning-graph.csv learning-graph.json.new color-config.json metadata.json taxonomy-names.json`.

## Bug found: CIS explosion in csv-to-json.py v1.05

The script's recursive CIS formula (`CIS(x) = 1 + Σ CIS(dependents)`) double-counts every
shared descendant across reconvergent ("diamond") paths in the DAG. On this 561-node /
824-edge graph it produced CIS values up to **164,101,954** — many orders of magnitude
past the 561-node ceiling a bounded impact score should have. Worse, the *ranking* was
wrong: "Artificial Intelligence" (true unique transitive-dependents = 423, the highest in
the graph) did not appear in the buggy top 10 at all, while several downstream financial
concepts with far fewer true dependents topped it — an artifact of local diamond density,
not real pedagogical importance.

## Fix applied (with user approval)

Replaced the `cis` field on every node with **`1 + |unique transitive dependents|`**
(BFS/DFS reachability over the dependents graph, each descendant counted once regardless
of how many paths reach it) — same semantics the field is documented to have (terminal
concepts = 1, foundational hubs = high), computed without the double-counting bug.

Corrected top 10 by CIS: Artificial Intelligence (424), Machine Learning (423), Deep
Learning (422), Neural Network (421), Generative AI (420), Return On Investment (305),
Total Cost Of Ownership (304), Large Language Model (292), Foundation Model (249),
Transformer Architecture (248). These are genuinely foundational course concepts —
sanity check passes.

## Files changed

- `docs/learning-graph/csv-to-json.py` — updated to v1.05 (from v0.04)
- `docs/learning-graph/learning-graph.json` — regenerated with corrected `cis` field on
  all 561 nodes; re-validated against `learning-graph-schema.json` (✓ pass, 0 orphaned
  nodes)

## Not changed

`concept-list.md`, `learning-graph.csv`, `concept-taxonomy.md`, `taxonomy-names.json`,
`color-config.json`, `metadata.json`, `quality-metrics.md`, `taxonomy-distribution.md`,
`index.md` — all pre-existing and unaffected by this fix.
