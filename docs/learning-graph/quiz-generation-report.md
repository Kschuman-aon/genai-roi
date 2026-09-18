# Quiz Generation Quality Report

Generated: 2026-09-18
Execution Mode: Serial (1 agent)
Chapters processed: 2 of 27 (the only two with written content so far)

## Overall Statistics

- **Total Chapters:** 2
- **Total Questions:** 20
- **Avg Questions per Chapter:** 10
- **Distinct Concepts Tested:** 20 (10 per chapter, no overlap)

## Per-Chapter Summary

| Chapter | Questions | Bloom's (R/U/Ap/An) | Answer Balance (A/B/C/D) | Concepts Tested |
|---------|-----------|----------------------|----------------------------|------------------|
| 1. Core Concepts of Large Language Models | 10 | 4/4/1/1 | 2/3/2/3 | Artificial Intelligence, Machine Learning, Deep Learning, Generative AI, Self-Attention, Pretraining, RLHF Alignment, Training Vs Inference Cost, Context Window, Proprietary Model |
| 2. Prompting, Deployment, and Model Optimization Basics | 10 | 4/4/1/1 | 2/3/2/3 | System Prompt, Prompt Engineering, Few-Shot Prompting, Chain-Of-Thought Prompting, Model Hallucination, Retrieval-Augmented Generation, Vector Database, Batch Inference, On-Premises Deployment, Model Right-Sizing |

## Bloom's Taxonomy Distribution (Overall)

Both chapters are introductory (Chapters 1-2 of 27); target was 40% Remember,
40% Understand, 15% Apply, 5% Analyze.

| Level | Actual | Target | Deviation |
|-------|--------|--------|-----------|
| Remember | 40% (8/20) | 40% | 0% ✓ |
| Understand | 40% (8/20) | 40% | 0% ✓ |
| Apply | 10% (2/20) | 15% | -5% ✓ |
| Analyze | 10% (2/20) | 5% | +5% ✓ |
| Evaluate | 0% | 0% | 0% ✓ |
| Create | 0% | 0% | 0% ✓ |

**Bloom's Distribution Score:** Within tolerance (±15%) on all levels.

## Answer Balance (Overall)

- A: 20% (4/20)
- B: 30% (6/20)
- C: 20% (4/20)
- D: 30% (6/20)

Within the 20-30% per-option target range for each chapter individually; B/D
lean slightly high in the combined 20-question set, still within tolerance.

## Validation Results

Independently re-verified against the actual files (not taken from the
generating agent's self-report, after a prior session found a self-report
mismatch on a different skill):

- Question count: 10/10 per chapter ✓ (confirmed via `grep -c '^#### [0-9]+\.'`)
- Format compliance: all 10 `<div class="upper-alpha" markdown>` wrappers, all
  10 `??? question "Show Answer"` admonitions, all 10 `**Concept Tested:**`
  lines present in both files ✓
- Indentation: all answer-block content indented exactly 4 spaces ✓
- Forbidden patterns: 0 "All/None of the above" options, 0 fabricated
  `**See:**` links ✓
- Answer-letter distribution: matches the agent's self-report exactly (2A/3B/2C/3D
  per chapter) ✓
- Duplicate questions: 0 duplicates within or across the two quizzes ✓
- All 20 questions have a resolvable `correct_answer` letter (no parsing
  gaps) ✓
- `mkdocs build --strict`: clean

## Recommendations

- No issues found in this batch. Both quizzes meet all automated quality
  checks (format, balance, Bloom's distribution, no duplicates).
- Extend this same process to Chapters 3-27 as their content is written —
  quiz generation is gated on chapter content existing, so this report will
  grow chapter-by-chapter alongside `chapter-content-generator`.
