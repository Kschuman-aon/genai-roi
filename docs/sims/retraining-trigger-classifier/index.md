---
title: "Retraining Trigger Classifier"
description: "The learner will differentiate eight monthly monitoring readings that call for retraining, investigation, or no action by applying the team's retraining trigger rule."
image: /sims/retraining-trigger-classifier/retraining-trigger-classifier.png
og:image: /sims/retraining-trigger-classifier/retraining-trigger-classifier.png
twitter:image: /sims/retraining-trigger-classifier/retraining-trigger-classifier.png
social:
   cards: false
quality_score: 0
---

# Retraining Trigger Classifier

<iframe src="main.html" height="324px" width="100%" scrolling="no"></iframe>

[Run the Retraining Trigger Classifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will differentiate eight monthly monitoring readings that call for retraining, investigation, or no action by applying the team's retraining trigger rule. Analyze-level work separates cases by the features that matter. Readings that sit on a threshold, or that show one signal without the other, force the learner to apply the rule exactly instead of reacting to the number that looks worst.

This MicroSim belongs to the chapter [Data and Model Lifecycle Cost Drivers](../../chapters/17-data-model-lifecycle-cost-drivers/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/retraining-trigger-classifier/main.html"
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
Analyze (differentiate)

### Prerequisites
model retraining trigger, data drift detection, model drift detection, PSI

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight readings the learner commits one of three actions before the answer is shown. An action is correct when it matches the correct action in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A high PSI means the model must be retrained. (2) A single reading below the accuracy floor means retrain. (3) A reading exactly on a threshold is below it.
