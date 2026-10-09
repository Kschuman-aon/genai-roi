---
title: "Spend Anomaly Detector"
description: "The learner will distinguish, for each of 14 days of platform spend, the days flagged by the rule 'spend greater than the mean plus 3 standard deviations of the previous 7 days' from the days not flagged, and will identify the day on which masking hides a real spike."
image: /sims/spend-anomaly-detector/spend-anomaly-detector.png
og:image: /sims/spend-anomaly-detector/spend-anomaly-detector.png
twitter:image: /sims/spend-anomaly-detector/spend-anomaly-detector.png
social:
   cards: false
quality_score: 0
---

# Spend Anomaly Detector

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Spend Anomaly Detector MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will distinguish, for each of 14 days of platform spend, the days flagged by the rule "spend greater than the mean plus 3 standard deviations of the previous 7 days" from the days not flagged, and will identify the day on which masking hides a real spike. Analyze-level work breaks a result into its parts. Predicting each flag before the baseline appears makes the learner estimate what is normal, and the masked day forces them to see that the baseline itself is built from the data being judged.

This MicroSim belongs to the chapter [Telemetry Logging Cost Dashboards](../../chapters/13-telemetry-logging-cost-dashboards/index.md). It uses Chart.js with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/spend-anomaly-detector/main.html"
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
Analyze (distinguish)

### Prerequisites
anomaly detection in spend, standard deviation, z-score, masking

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of 14 days the learner commits "Flag" or "No flag" before the baseline is shown. A choice is correct when it matches the "Rule result" column in Content. After the 14 days the learner selects the one day on which masking hides a real spike, which is correct when it is day 13. Mastery is 12 of 14 day choices correct on the first attempt and the masked day identified. Exploration is not evidence.

### Common Misconceptions
(1) A day that looks very high to a person will always be flagged. (2) A flagged spike is followed by another flag if spend stays high. (3) A threshold of 3 standard deviations is a fixed dollar amount.
