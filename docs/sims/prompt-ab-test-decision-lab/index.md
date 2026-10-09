---
title: "Prompt A/B Test Decision Lab"
description: "The learner will judge, from a 95% interval for the quality difference, whether to adopt, reject, or keep testing a shorter prompt variant against a 3-point quality tolerance."
image: /sims/prompt-ab-test-decision-lab/prompt-ab-test-decision-lab.png
og:image: /sims/prompt-ab-test-decision-lab/prompt-ab-test-decision-lab.png
twitter:image: /sims/prompt-ab-test-decision-lab/prompt-ab-test-decision-lab.png
social:
   cards: false
quality_score: 0
---

# Prompt A/B Test Decision Lab

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Prompt A/B Test Decision Lab MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will judge, from a 95% interval for the quality difference, whether to adopt, reject, or keep testing a shorter prompt variant against a 3-point quality tolerance. Evaluate-level judgment applies a criterion to evidence. The learner must compare the interval to the tolerance, not read the headline difference, and the fourth result shows that an improvement can also be adopted.

This MicroSim belongs to the chapter [Model Compression Testing Efficiency](../../chapters/08-model-compression-testing-efficiency/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads a test result and selects Adopt B, Reject B, or Keep testing.
2. The sim draws the interval against the tolerance line and shows the "Why" text.
3. After four results, exploration unlocks: the learner changes the four quantities and watches the interval and the decision update.
4. The learner should notice that raising the number of requests narrows the interval without changing the difference.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/prompt-ab-test-decision-lab/main.html"
        height="452px"
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
A/B testing prompts, prompt version control, 95% confidence interval, quality tolerance

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four test results the learner selects Adopt B, Reject B, or Keep testing before the interval is drawn. A selection is correct when it matches the decision rule in Rules for that result. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A smaller difference in the sample means the variants are equal. (2) If the interval includes zero the test proves B is fine. (3) More tokens saved justifies adopting regardless of the interval.
