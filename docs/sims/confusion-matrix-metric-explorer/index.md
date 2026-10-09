---
title: "Confusion Matrix Metric Explorer"
description: "The learner will calculate precision, recall, and accuracy from the four counts of a confusion matrix for eight prompted cases, to within 0.5 percentage points."
image: /sims/confusion-matrix-metric-explorer/confusion-matrix-metric-explorer.png
og:image: /sims/confusion-matrix-metric-explorer/confusion-matrix-metric-explorer.png
twitter:image: /sims/confusion-matrix-metric-explorer/confusion-matrix-metric-explorer.png
social:
   cards: false
quality_score: 0
---

# Confusion Matrix Metric Explorer

<iframe src="main.html" height="362px" width="100%" scrolling="no"></iframe>

[Run the Confusion Matrix Metric Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate precision, recall, and accuracy from the four counts of a confusion matrix for eight prompted cases, to within 0.5 percentage points. Apply-level work means carrying out a procedure on new numbers. Computing the same three measures for a never-flag baseline and for a strict setting shows the learner, with their own arithmetic, that accuracy can stay high while recall collapses.

This MicroSim belongs to the chapter [Measurement Rigor Kpi Reporting](../../chapters/12-measurement-rigor-kpi-reporting/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/confusion-matrix-metric-explorer/main.html"
        height="362px"
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
model accuracy metric, precision and recall, true positive, false positive, false negative, true negative

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight items the learner types a percentage before the answer is shown. A value is correct when it is within 0.5 percentage points of the model value. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable counts is not evidence.

### Common Misconceptions
(1) A high accuracy means the system finds the cases that matter. (2) Precision and recall are two names for the same thing. (3) Fewer false positives always means a better system.
