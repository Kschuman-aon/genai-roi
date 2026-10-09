---
title: "Roll-Up and Reconciliation Calculator"
description: "The learner will calculate a feature's allocated shared cost and unit cost, the reconciliation difference between warehouse and invoices, and a normalized cost per million words for two providers, to the tolerances stated for each item."
image: /sims/rollup-reconciliation-calculator/rollup-reconciliation-calculator.png
og:image: /sims/rollup-reconciliation-calculator/rollup-reconciliation-calculator.png
twitter:image: /sims/rollup-reconciliation-calculator/rollup-reconciliation-calculator.png
social:
   cards: false
quality_score: 0
---

# Roll-Up and Reconciliation Calculator

<iframe src="main.html" height="392px" width="100%" scrolling="no"></iframe>

[Run the Roll-Up and Reconciliation Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate a feature's allocated shared cost and unit cost, the reconciliation difference between warehouse and invoices, and a normalized cost per million words for two providers, to the tolerances stated for each item. Apply-level work means carrying out procedures on new numbers. Three different calculations, an allocation, a reconciliation, and a normalization, appear in one sim so that the learner sees them as steps of one cost-integrity routine.

This MicroSim belongs to the chapter [Cost Attribution Observability Maturity](../../chapters/14-cost-attribution-observability-maturity/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/rollup-reconciliation-calculator/main.html"
        height="392px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Apply (calculate)

### Prerequisites
per-feature cost tracking, vendor invoice reconciliation, cost data normalization

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) Shared costs belong to no feature. (2) A higher price per token always means a higher cost for the same work. (3) A small reconciliation difference needs no explanation.
