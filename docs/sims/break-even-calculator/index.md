---
title: "Fixed Versus Variable Break-Even Calculator"
description: "The learner will calculate the monthly request volume at which a fixed-cost server and a per-request API cost the same, to within 1,000 requests."
image: /sims/break-even-calculator/break-even-calculator.png
og:image: /sims/break-even-calculator/break-even-calculator.png
twitter:image: /sims/break-even-calculator/break-even-calculator.png
social:
   cards: false
quality_score: 0
---

# Fixed Versus Variable Break-Even Calculator

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Fixed Versus Variable Break-Even Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the monthly request volume at which a fixed-cost server and a per-request API cost the same, to within 1,000 requests. Apply-level calculation uses a one-step formula, and the chart makes the crossing visible after the learner commits a number.

This MicroSim belongs to the chapter [Core Financial Roi Vocabulary](../../chapters/09-core-financial-roi-vocabulary/index.md). It uses Chart.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the fixed cost and the API price and types the break-even volume.
2. The sim draws the two lines and marks the crossing beside the learner's answer, with the "Why" text.
3. After three scenarios, exploration unlocks: the learner changes the two costs and drags the volume marker and reads which option is cheaper at that volume.
4. The learner should notice that halving the API price doubles the break-even volume.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/break-even-calculator/main.html"
        height="522px"
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
fixed cost, variable cost, marginal cost, break-even analysis

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of three scenarios the learner types the break-even volume before the chart reveals it. An answer is correct when within 1,000 requests of the model value. Mastery is 3 of 3 correct on the first attempt. Dragging the volume marker is exploration, not evidence.

### Common Misconceptions
(1) Break-even depends on the benefits only. (2) The break-even volume does not change when the fixed cost changes. (3) The fixed-cost option is always cheaper at high volume, regardless of its capacity.
