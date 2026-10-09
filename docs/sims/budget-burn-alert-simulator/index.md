---
title: "Budget Burn Alert Simulator"
description: "The learner will calculate the day on which each of four cost alerts (50%, 80%, 100% of budget, and month-end forecast) fires for a month with a runaway daily spend, to the exact day."
image: /sims/budget-burn-alert-simulator/budget-burn-alert-simulator.png
og:image: /sims/budget-burn-alert-simulator/budget-burn-alert-simulator.png
twitter:image: /sims/budget-burn-alert-simulator/budget-burn-alert-simulator.png
social:
   cards: false
quality_score: 0
---

# Budget Burn Alert Simulator

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Budget Burn Alert Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the day on which each of four cost alerts (50%, 80%, 100% of budget, and month-end forecast) fires for a month with a runaway daily spend, to the exact day. Apply-level calculation requires the learner to run the threshold and forecast rules on a series. Committing days first exposes the difference between a total-based and a rate-based alert, and playing the month afterward shows the consequence.

This MicroSim belongs to the chapter [Infrastructure Planning Monitoring](../../chapters/06-infrastructure-planning-monitoring/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the month's description and types a day for each of the four alerts.
2. The learner presses Check; the sim plays the month day by day, marking each alert on the day it fires, beside the learner's answers.
3. After the four checks, exploration unlocks: the learner changes the four quantities and sees all four firing days and the end-of-month total update.
4. The learner should notice that the forecast alert moves earlier than every threshold alert whenever spend rises mid-month.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/budget-burn-alert-simulator/main.html"
        height="472px"
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
cost alerting, budget threshold, cumulative spend, projected month-end spend

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of the four alerts the learner types a day number before the sim plays the month. An answer is correct when it equals the day computed by the Rules. Mastery is 4 of 4 correct, with at most one wrong attempt across the four. Exploration is not evidence.

### Common Misconceptions
(1) The 100% alert gives enough warning. (2) A forecast alert fires at the same time as the 50% alert. (3) Spend that is normal for 9 days means the month is on budget.
