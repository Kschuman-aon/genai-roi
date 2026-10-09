---
title: "Technical Debt Break-Even Explorer"
description: "The learner will assess, for each of eight scenarios, whether an AI saving can be reported as stated, must be restated net of debt, or is net negative, using thresholds on the share of the gross saving that the debt consumes."
image: /sims/technical-debt-break-even-explorer/technical-debt-break-even-explorer.png
og:image: /sims/technical-debt-break-even-explorer/technical-debt-break-even-explorer.png
twitter:image: /sims/technical-debt-break-even-explorer/technical-debt-break-even-explorer.png
social:
   cards: false
quality_score: 0
---

# Technical Debt Break-Even Explorer

<iframe src="main.html" height="292px" width="100%" scrolling="no"></iframe>

[Run the Technical Debt Break-Even Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will assess, for each of eight scenarios, whether an AI saving can be reported as stated, must be restated net of debt, or is net negative, using thresholds on the share of the gross saving that the debt consumes. Evaluate-level work is judging against criteria. The three-way verdict and the boundary scenario at exactly 25% require the learner to compare the debt with the saving rather than to look at either alone.

This MicroSim belongs to the chapter [AI-Assisted Coding Across the SDLC](../../chapters/15-ai-assisted-coding-sdlc/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/technical-debt-break-even-explorer/main.html"
        height="292px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Evaluate (assess)

### Prerequisites
technical debt from AI code, refactoring cost, gross saving, net saving

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight scenarios the learner commits one of three verdicts before the arithmetic is shown. A verdict is correct when it matches the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A positive gross saving means a positive result. (2) A small debt rate is always negligible. (3) Hours per refactoring do not matter if the rate is low.
