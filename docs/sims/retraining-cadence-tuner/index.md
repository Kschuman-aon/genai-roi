---
title: "Retraining Cadence Tuner"
description: "The learner will recommend, for each of six scenarios, the retraining interval of 1, 2, 3, 4, 6, or 12 months that has the lowest annual cost."
image: /sims/retraining-cadence-tuner/retraining-cadence-tuner.png
og:image: /sims/retraining-cadence-tuner/retraining-cadence-tuner.png
twitter:image: /sims/retraining-cadence-tuner/retraining-cadence-tuner.png
social:
   cards: false
quality_score: 0
---

# Retraining Cadence Tuner

<iframe src="main.html" height="324px" width="100%" scrolling="no"></iframe>

[Run the Retraining Cadence Tuner MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will recommend, for each of six scenarios, the retraining interval of 1, 2, 3, 4, 6, or 12 months that has the lowest annual cost. Evaluate-level work judges options against a criterion. Scenarios whose runner-up costs almost the same, and scenarios in which the winner is at an end of the range, make the learner judge from the totals instead of from habit.

This MicroSim belongs to the chapter [Data and Model Lifecycle Cost Drivers](../../chapters/17-data-model-lifecycle-cost-drivers/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/retraining-cadence-tuner/main.html"
        height="324px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Evaluate (recommend)

### Prerequisites
retraining cadence tuning, retraining cost, error cost, point-month

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six scenarios the learner commits one interval before the answer is shown. An interval is correct when it has the lowest annual total in the Content table. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) Retraining as often as possible is safest. (2) The cheapest model update is the cheapest schedule. (3) The best interval is the same for every model.
