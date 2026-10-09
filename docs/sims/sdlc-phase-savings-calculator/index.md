---
title: "SDLC Phase Savings Calculator"
description: "The learner will calculate the quarterly cost of an SDLC phase, the time value freed in it, and the total gross and net time value across six phases for the 20-engineer team, to within $1."
image: /sims/sdlc-phase-savings-calculator/sdlc-phase-savings-calculator.png
og:image: /sims/sdlc-phase-savings-calculator/sdlc-phase-savings-calculator.png
twitter:image: /sims/sdlc-phase-savings-calculator/sdlc-phase-savings-calculator.png
social:
   cards: false
quality_score: 0
---

# SDLC Phase Savings Calculator

<iframe src="main.html" height="494px" width="100%" scrolling="no"></iframe>

[Run the SDLC Phase Savings Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the quarterly cost of an SDLC phase, the time value freed in it, and the total gross and net time value across six phases for the 20-engineer team, to within $1. Apply-level calculation needs a procedure and a check. Walking from the baseline cost map to the gross, the net, and the 30% realization case shows the learner how much each adjustment removes.

This MicroSim belongs to the chapter [AI-Assisted Coding Across the SDLC](../../chapters/15-ai-assisted-coding-sdlc/index.md). It uses Chart.js with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/sdlc-phase-savings-calculator/main.html"
        height="494px"
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
software development lifecycle, the six phase costs, loaded labor rate, realization

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight items the learner types a value before the answer is shown. A value is correct when it is within $1 of the model value for dollar items, or within 0.1 percentage points for percentage items. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) Coding is where most engineering cost sits. (2) Time freed is the same as money saved. (3) An assistant's tool cost is the only cost it adds.
