---
title: "Sensitivity Tornado Ranker"
description: "The learner will differentiate which of four input changes reduces the running-example NPV the most, by ranking them from most to least damaging, and will predict whether a combined change makes the NPV negative."
image: /sims/sensitivity-tornado-ranker/sensitivity-tornado-ranker.png
og:image: /sims/sensitivity-tornado-ranker/sensitivity-tornado-ranker.png
twitter:image: /sims/sensitivity-tornado-ranker/sensitivity-tornado-ranker.png
social:
   cards: false
quality_score: 0
---

# Sensitivity Tornado Ranker

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Sensitivity Tornado Ranker MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will differentiate which of four input changes reduces the running-example NPV the most, by ranking them from most to least damaging, and will predict whether a combined change makes the NPV negative. Analyze-level work means finding which part of a structure drives the result. Committing a ranking first exposes the learner's intuition about costs versus benefits, and the combination prediction shows why single-input tests are not enough.

This MicroSim belongs to the chapter [Business Case Financial Forecasting](../../chapters/10-business-case-financial-forecasting/index.md). It uses Chart.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner orders the four adverse changes from most to least damaging and predicts the sign of the combined case.
2. The learner presses Commit. The sim draws a tornado chart of the four NPV reductions and reveals the combined NPV, with the "Why" text for each rank.
3. Exploration unlocks: the learner changes the four quantities and watches the NPV and IRR update.
4. The learner should notice that benefits and costs move the NPV in opposite directions, and that benefits dominate.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/sensitivity-tornado-ranker/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Analyze (differentiate)

### Prerequisites
sensitivity analysis, scenario analysis, NPV, hurdle rate

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
The learner commits (1) a ranking of the four adverse changes from largest to smallest NPV reduction and (2) a prediction of Positive or Negative for the combined change "benefits 20% lower at a 15% discount rate", both before the chart is revealed. Part 1 is correct when the order matches the "Correct rank" column; part 2 is correct when it matches the model sign. Mastery is both parts correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) Costs matter more than benefits in an ROI case. (2) A project that stays positive under each change alone stays positive under a combination. (3) The discount rate is the most influential assumption.
