---
title: "NPV and Payback Calculator"
description: "The learner will calculate the net present value of the running-example cash flows at a stated discount rate to within $5, and decide whether the investment should be accepted."
image: /sims/npv-payback-calculator/npv-payback-calculator.png
og:image: /sims/npv-payback-calculator/npv-payback-calculator.png
twitter:image: /sims/npv-payback-calculator/npv-payback-calculator.png
social:
   cards: false
quality_score: 0
---

# NPV and Payback Calculator

<iframe src="main.html" height="477px" width="100%" scrolling="no"></iframe>

[Run the NPV and Payback Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the net present value of the running-example cash flows at a stated discount rate to within $5, and decide whether the investment should be accepted. Apply-level calculation needs a procedure practiced against a checked result. Four rates that walk the NPV from large and positive to negative let the learner see the sign change that defines the IRR.

This MicroSim belongs to the chapter [Core Financial Roi Vocabulary](../../chapters/09-core-financial-roi-vocabulary/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the discount rate and types an NPV, then selects Accept or Reject.
2. The sim shows each year's present value, the NPV, and the "Why" text.
3. After four rates, exploration unlocks: the learner changes the discount rate and the cash flows and watches the NPV, payback, and IRR update.
4. The learner should notice that payback does not change when the discount rate does, while NPV does.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/npv-payback-calculator/main.html"
        height="477px"
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
time value of money, discount rate, present value, net present value, internal rate of return

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four discount rates the learner types the NPV and selects Accept or Reject before the answer is shown. The NPV is correct when within $5 of the model value, and the decision is correct when it is Accept for NPV >= 0 and Reject for NPV < 0. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A higher discount rate raises NPV. (2) A short payback means a positive NPV. (3) The initial investment should not be discounted, or should be discounted like future flows.
