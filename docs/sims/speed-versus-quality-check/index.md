---
title: "Speed Versus Quality Check"
description: "The learner will judge, for each of eight time-saving claims, whether the claim can be reported as stated or must be restated net of rework, using the rule that rework minutes above 25% of the claimed saving require restatement."
image: /sims/speed-versus-quality-check/speed-versus-quality-check.png
og:image: /sims/speed-versus-quality-check/speed-versus-quality-check.png
twitter:image: /sims/speed-versus-quality-check/speed-versus-quality-check.png
social:
   cards: false
quality_score: 0
---

# Speed Versus Quality Check

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Speed Versus Quality Check MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will judge, for each of eight time-saving claims, whether the claim can be reported as stated or must be restated net of rework, using the rule that rework minutes above 25% of the claimed saving require restatement. Evaluate-level work means judging against a criterion. Committing a verdict before the arithmetic appears makes the learner estimate the size of the rework cost, and the boundary item at exactly 25% forces attention to the comparison rule.

This MicroSim belongs to the chapter [Productivity Quality Metrics](../../chapters/11-productivity-quality-metrics/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads claim 1 with its three inputs and chooses a verdict, then presses Commit.
2. The sim shows rework minutes per ticket, the share consumed, the net saving, and the "Why" text.
3. After eight claims, exploration unlocks: the learner changes the three quantities and watches the share consumed and verdict update.
4. The learner should notice that a small rework-rate rise matters little with a large saving and decides the verdict when the saving is small or each rework is costly.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/speed-versus-quality-check/main.html"
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
Evaluate (judge)

### Prerequisites
task completion time, rework rate metric, error rate metric, quality score metric, the 25% working rule

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight claims the learner commits a verdict, "Report as stated" or "Restate net of rework", before the arithmetic is shown. A verdict is correct when it matches the "Correct verdict" column in Content. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) A time saving is the benefit regardless of quality. (2) A small rise in rework rate is always negligible. (3) Rework only matters when the rework rate itself is high, ignoring how many minutes each rework costs.
