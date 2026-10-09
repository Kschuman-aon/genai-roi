---
title: "Unit Cost Metrics Calculator"
description: "The learner will calculate cost per transaction, cost per query, and cost per user from the running example's operating data, distinguishing fully loaded cost from fees only."
image: /sims/unit-cost-metrics-calculator/unit-cost-metrics-calculator.png
og:image: /sims/unit-cost-metrics-calculator/unit-cost-metrics-calculator.png
twitter:image: /sims/unit-cost-metrics-calculator/unit-cost-metrics-calculator.png
social:
   cards: false
quality_score: 0
---

# Unit Cost Metrics Calculator

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Unit Cost Metrics Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate cost per transaction, cost per query, and cost per user from the running example's operating data, distinguishing fully loaded cost from fees only. Apply-level calculation needs a procedure and a check. Placing fees-only and fully loaded items side by side makes the denominator and numerator choices explicit.

This MicroSim belongs to the chapter [Business Case Financial Forecasting](../../chapters/10-business-case-financial-forecasting/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the data table and the first item, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After five items, exploration unlocks: the learner changes the four quantities and watches the three unit measures update.
4. The learner should notice that raising tickets lowers cost per ticket and cost per query but leaves cost per user unchanged.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/unit-cost-metrics-calculator/main.html"
        height="462px"
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
cost per query, cost per transaction, cost per user, financial KPI, fully loaded cost

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of five items the learner types a value before the answer is shown. A value is correct when within $0.0005 of the model value for per-ticket and per-query items and within $1 for the per-user item. Mastery is 4 of 5 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) Fees-only cost equals the full cost per query. (2) Cost per user falls whenever cost per ticket falls. (3) Cost per query and cost per transaction are interchangeable.
