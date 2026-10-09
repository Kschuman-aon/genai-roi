---
title: "Metric Matcher"
description: "The learner will classify each of ten described situations under the one metric from a list of eight that the situation measures, with at least 8 of 10 correct on the first attempt."
image: /sims/metric-matcher/metric-matcher.png
og:image: /sims/metric-matcher/metric-matcher.png
twitter:image: /sims/metric-matcher/metric-matcher.png
social:
   cards: false
quality_score: 0
---

# Metric Matcher

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Metric Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will classify each of ten described situations under the one metric from a list of eight that the situation measures, with at least 8 of 10 correct on the first attempt. Classifying real situations under the right label is how an Understand objective is shown. Using near neighbours (adoption against usage, deflection against first-contact resolution, task time against cycle time) forces the learner to apply each definition's boundary.

This MicroSim belongs to the chapter [Productivity Quality Metrics](../../chapters/11-productivity-quality-metrics/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads situation 1 and selects one of the eight metrics, then presses Commit.
2. The sim marks the choice correct or incorrect and shows the "Why" text.
3. The learner continues through all ten situations.
4. At the end the learner sees the full table of situations, correct metrics and reasons, and should notice which near-neighbour pairs caused errors.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/metric-matcher/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Understand (classify)

### Prerequisites
adoption rate metric, usage frequency metric, task completion time, cycle time reduction, throughput improvement metric, deflection rate metric, first-contact resolution rate, rework rate metric

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each situation the learner chooses one metric and commits. A choice is correct when it matches the "Correct metric" column in Content. Mastery is 8 of 10 correct on the first attempt. Reading the metric definitions is exploration, not evidence.

### Common Misconceptions
(1) Adoption rate and usage frequency are the same measure. (2) A task-level time saving equals a process-level cycle time reduction. (3) Deflection and first-contact resolution are interchangeable, but only first-contact resolution allows a human to be involved. (4) Throughput and task time are different data rather than two views of the same change.
