---
title: "Developer Productivity Index Builder"
description: "The learner will calculate four improvement ratios and the weighted developer productivity index for the 20-engineer team, to within 0.01 for ratios and 0.1 for index points."
image: /sims/developer-productivity-index-builder/developer-productivity-index-builder.png
og:image: /sims/developer-productivity-index-builder/developer-productivity-index-builder.png
twitter:image: /sims/developer-productivity-index-builder/developer-productivity-index-builder.png
social:
   cards: false
quality_score: 0
---

# Developer Productivity Index Builder

<iframe src="main.html" height="370px" width="100%" scrolling="no"></iframe>

[Run the Developer Productivity Index Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate four improvement ratios and the weighted developer productivity index for the 20-engineer team, to within 0.01 for ratios and 0.1 for index points. Apply-level calculation needs a procedure and an immediate check. Building the index from ratios shows that the direction of improvement differs by measure, and the item with falling throughput shows an index that stays above 100.

This MicroSim belongs to the chapter [SDLC Productivity, Risk, and Cost Roadmapping](../../chapters/16-sdlc-productivity-risk-roadmapping/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/developer-productivity-index-builder/main.html"
        height="370px"
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
developer productivity index, improvement ratio, lead time for changes, change failure rate, code review cycle time

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) Lower is always better, so a lower throughput number is an improvement. (2) An index above 100 means every component improved. (3) Components with equal weights contribute equally.
