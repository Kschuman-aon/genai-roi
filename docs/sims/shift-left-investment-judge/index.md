---
title: "Shift-Left Investment Judge"
description: "The learner will judge, for each of six AI investment options, whether to fund it using the rule that savings from moving defects to an earlier phase must be at least twice the cost."
image: /sims/shift-left-investment-judge/shift-left-investment-judge.png
og:image: /sims/shift-left-investment-judge/shift-left-investment-judge.png
twitter:image: /sims/shift-left-investment-judge/shift-left-investment-judge.png
social:
   cards: false
quality_score: 0
---

# Shift-Left Investment Judge

<iframe src="main.html" height="304px" width="100%" scrolling="no"></iframe>

[Run the Shift-Left Investment Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will judge, for each of six AI investment options, whether to fund it using the rule that savings from moving defects to an earlier phase must be at least twice the cost. Evaluate-level work is judgment against a criterion. Having to estimate whether savings reach twice the cost, with an option exactly at the boundary, makes the learner apply the criterion rather than the size of the headline saving.

This MicroSim belongs to the chapter [AI-Assisted Coding Across the SDLC](../../chapters/15-ai-assisted-coding-sdlc/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/shift-left-investment-judge/main.html"
        height="304px"
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
the defect fix costs by phase, shift-left, benefit-cost ratio

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six options the learner commits "Fund" or "Do not fund" before the ratio is shown. A verdict is correct when it matches the Content table. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) The option that moves the most defects is the best. (2) Any positive saving justifies funding. (3) The phase the defect moves to does not matter.
