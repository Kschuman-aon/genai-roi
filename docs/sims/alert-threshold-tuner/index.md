---
title: "Alert Threshold Tuner"
description: "The learner will recommend, for each of six monitoring scenarios, the smallest threshold multiplier from 2, 2.5, 3, 3.5, and 4 standard deviations that keeps the expected false alerts per week at or below the stated limit."
image: /sims/alert-threshold-tuner/alert-threshold-tuner.png
og:image: /sims/alert-threshold-tuner/alert-threshold-tuner.png
twitter:image: /sims/alert-threshold-tuner/alert-threshold-tuner.png
social:
   cards: false
quality_score: 0
---

# Alert Threshold Tuner

<iframe src="main.html" height="302px" width="100%" scrolling="no"></iframe>

[Run the Alert Threshold Tuner MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will recommend, for each of six monitoring scenarios, the smallest threshold multiplier from 2, 2.5, 3, 3.5, and 4 standard deviations that keeps the expected false alerts per week at or below the stated limit. Evaluate-level work is a judgment against a criterion with a trade-off. The criterion here is the false alert limit, and the trade-off is that a higher multiplier misses smaller real spikes, so choosing the smallest acceptable multiplier is a reasoned recommendation.

This MicroSim belongs to the chapter [Cost Attribution Observability Maturity](../../chapters/14-cost-attribution-observability-maturity/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/alert-threshold-tuner/main.html"
        height="302px"
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
alerting threshold design, real-time alert fatigue, anomaly detection in spend, standard deviation

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six scenarios the learner selects one multiplier and commits before the expected false alerts are shown. A selection is correct when it is the smallest multiplier whose expected false alerts per week are <= the limit. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) The same threshold suits every number of monitored series. (2) A stricter threshold is always better. (3) False alerts are only a nuisance and do not reduce response to real ones.
