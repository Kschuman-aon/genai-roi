---
title: "Model Cascade Cost Calculator"
description: "The learner will calculate the monthly cost of a small-model-first cascade for a stated pass rate and decide whether it is cheaper than sending every request to the large model."
image: /sims/model-cascade-cost-calculator/model-cascade-cost-calculator.png
og:image: /sims/model-cascade-cost-calculator/model-cascade-cost-calculator.png
twitter:image: /sims/model-cascade-cost-calculator/model-cascade-cost-calculator.png
social:
   cards: false
quality_score: 0
---

# Model Cascade Cost Calculator

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Model Cascade Cost Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the monthly cost of a small-model-first cascade for a stated pass rate and decide whether it is cheaper than sending every request to the large model. Apply-level calculation needs a procedure checked against an answer. The fourth scenario sits below the break-even pass rate, so the learner commits to a plan before discovering that a cascade can lose.

This MicroSim belongs to the chapter [Prompt Routing Retrieval Efficiency](../../chapters/07-prompt-routing-retrieval-efficiency/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads a scenario's pass rate, types the monthly cascade cost, and selects the cheaper plan.
2. The learner presses Check; the sim shows the cascade cost, the all-large cost, and the "Why" text.
3. After four scenarios, exploration unlocks: the learner changes the four quantities and watches both monthly costs and the break-even pass rate update.
4. The learner should notice that raising the checker cost or lowering the price ratio raises the break-even pass rate.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/model-cascade-cost-calculator/main.html"
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
model cascading, small model first strategy, pass rate, per-request cost

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four scenarios the learner types the cascade's monthly cost for 100,000 requests and selects "cascade" or "all-large" as the cheaper option, before the sim reveals the answer. A scenario is correct when the cost is within $1 of the model value and the selection matches. When the two plans cost the same, "all-large" is the correct selection. Mastery is 3 of 4 scenarios correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A cascade is always cheaper than using the large model. (2) The cascade cost is only the small model's cost. (3) Failed requests cost the large-model price only, not small plus large.
