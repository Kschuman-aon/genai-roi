---
title: "Benefit Realization Calculator"
description: "The learner will calculate the year 1 realized benefit and the three-year ROI of the running example from measured adoption, usage coverage, minutes saved, and rework data, to within $1 for dollar values and 0.1 percentage points for ROI."
image: /sims/benefit-realization-calculator/benefit-realization-calculator.png
og:image: /sims/benefit-realization-calculator/benefit-realization-calculator.png
twitter:image: /sims/benefit-realization-calculator/benefit-realization-calculator.png
social:
   cards: false
quality_score: 0
---

# Benefit Realization Calculator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Benefit Realization Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the year 1 realized benefit and the three-year ROI of the running example from measured adoption, usage coverage, minutes saved, and rework data, to within $1 for dollar values and 0.1 percentage points for ROI. Apply-level calculation needs a procedure and an immediate check. Walking the benefit from plan to realized in labelled steps shows which factor removes which dollars.

This MicroSim belongs to the chapter [Productivity Quality Metrics](../../chapters/11-productivity-quality-metrics/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After six items, exploration unlocks: the learner changes the five quantities and watches realized benefit, ROI, and NPV update.
4. The learner should notice that adoption and coverage scale the whole benefit, that rework lowers it by a smaller amount, and that ROI and NPV can disagree in sign.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/benefit-realization-calculator/main.html"
        height="482px"
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
adoption rate metric, usage frequency metric, rework rate metric, GenAI ROI metric, productivity gain, labor cost savings

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six items the learner types a value before the answer is shown. A value is correct when within $1 of the model value for dollar items, or within 0.1 percentage points for the ROI item. Mastery is 5 of 6 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) Benefit equals tickets times minutes saved times the labor rate, with no adjustment for adoption or usage. (2) Rework can be ignored when the rework rate rises by only one point. (3) A positive ROI always implies a positive NPV.
