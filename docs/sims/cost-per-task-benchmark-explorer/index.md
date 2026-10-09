---
title: "Cost Per Task Benchmark Explorer"
description: "The learner will compare the cost per completed task of a small and a large model, including human review of rejected answers, and identify which is cheaper at four review costs."
image: /sims/cost-per-task-benchmark-explorer/cost-per-task-benchmark-explorer.png
og:image: /sims/cost-per-task-benchmark-explorer/cost-per-task-benchmark-explorer.png
twitter:image: /sims/cost-per-task-benchmark-explorer/cost-per-task-benchmark-explorer.png
social:
   cards: false
quality_score: 0
---

# Cost Per Task Benchmark Explorer

<iframe src="main.html" height="447px" width="100%" scrolling="no"></iframe>

[Run the Cost Per Task Benchmark Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will compare the cost per completed task of a small and a large model, including human review of rejected answers, and identify which is cheaper at four review costs. Analyze-level comparison means breaking a total into parts and seeing how they combine. The learner decides before the breakdown appears, then sees which part dominated.

This MicroSim belongs to the chapter [Model Compression Testing Efficiency](../../chapters/08-model-compression-testing-efficiency/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads a review cost and selects the model they think is cheaper per task.
2. The sim shows both cost-per-task breakdowns (attempt cost and review cost) and the "Why" text.
3. After four review costs, exploration unlocks: the learner changes the three quantities and watches the break-even review cost move.
4. The learner should notice that a larger acceptance gap lowers the review cost at which the small model stops being cheaper.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/cost-per-task-benchmark-explorer/main.html"
        height="447px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Analyze (compare)

### Prerequisites
cost-per-task benchmarking, quality-cost tradeoff, acceptance rate, review cost

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four review costs the learner selects the model with the lower cost per task before the costs are shown. A selection is correct when it matches the "Cheaper model" column; at a tie the large model is correct. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) The model with the lower attempt cost always has the lower cost per task. (2) Human review cost can be ignored when comparing models. (3) The break-even depends on traffic volume.
