---
title: "Serving Batch Size Tuner"
description: "The learner will solve for the batch size that gives the lowest cost per million tokens while a 400-token response finishes within a stated latency limit and the batch fits in GPU memory."
image: /sims/serving-batch-tuner/serving-batch-tuner.png
og:image: /sims/serving-batch-tuner/serving-batch-tuner.png
twitter:image: /sims/serving-batch-tuner/serving-batch-tuner.png
social:
   cards: false
quality_score: 0
---

# Serving Batch Size Tuner

<iframe src="main.html" height="447px" width="100%" scrolling="no"></iframe>

[Run the Serving Batch Size Tuner MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will solve for the batch size that gives the lowest cost per million tokens while a 400-token response finishes within a stated latency limit and the batch fits in GPU memory. Apply-level solving needs a procedure practiced against a checkable answer. The learner commits a batch size first, and the exploration mode that follows lets them see why the saturated and memory-limited rows were wrong.

This MicroSim belongs to the chapter [Infrastructure Planning Monitoring](../../chapters/06-infrastructure-planning-monitoring/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the latency limit for the current challenge and the table of five batch sizes with all readouts visible.
2. The learner chooses one batch size and presses Commit.
3. The sim marks the chosen row and shows whether it was correct, with the feedback text.
4. After four challenges, exploration mode unlocks: the learner picks any latency limit from 8 s to 60 s in steps of 1 s (default 20 s) and any context length from 2,000 to 8,000 tokens in steps of 2,000 (default 4,000); the sim marks every batch size as feasible or not and highlights the correct answer. The memory ceiling is 240 at 2,000 tokens, 120 at 4,000, 80 at 6,000 and 60 at 8,000.
5. The learner should notice that raising the context length removes the larger batch sizes from the feasible set even when the latency limit is generous.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/serving-batch-tuner/main.html"
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
Apply (solve)

### Prerequisites
batch size tuning, concurrency limit, throughput-latency tradeoff, inter-token latency, aggregate throughput, cost per million tokens, GPU memory constraint

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four challenges the learner commits one batch size before any row is highlighted. A commitment is correct when it equals the batch size with the lowest cost per million tokens among the batch sizes that satisfy both the latency limit (response time <= limit) and the memory ceiling (batch size <= 120). When two batch sizes tie on cost, the smaller one is correct. Mastery is 3 of 4 correct on the first attempt. Exploration (changing the selected batch size and reading the readouts) is not evidence.

### Common Misconceptions
(1) The largest batch is always the cheapest. (2) Cost keeps falling as batch size rises. (3) A batch that is fast enough on latency must also fit in memory.
