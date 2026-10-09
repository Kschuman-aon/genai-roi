---
title: "Deployment Placement Sorter"
description: "The learner will distinguish which of four placement approaches (single region, multi-region, edge, hybrid cloud) best fits each of eight workload descriptions, by matching the deciding requirement in each description."
image: /sims/deployment-placement-sorter/deployment-placement-sorter.png
og:image: /sims/deployment-placement-sorter/deployment-placement-sorter.png
twitter:image: /sims/deployment-placement-sorter/deployment-placement-sorter.png
social:
   cards: false
quality_score: 0
---

# Deployment Placement Sorter

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Deployment Placement Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will distinguish which of four placement approaches (single region, multi-region, edge, hybrid cloud) best fits each of eight workload descriptions, by matching the deciding requirement in each description. Analyze-level distinction requires the learner to pick out the deciding requirement in a description and match it to an approach, which a sorting task with explained feedback makes explicit.

This MicroSim belongs to the chapter [Infrastructure Planning Monitoring](../../chapters/06-infrastructure-planning-monitoring/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads each card and places it in one of the four bins.
2. After placing all eight, the learner presses Commit.
3. The sim marks each card correct or incorrect and shows the "Why" text for every incorrect card.
4. The learner may then press Retry once; incorrect cards return to the pool and are re-placed, and the retry does not count toward mastery.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/deployment-placement-sorter/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Analyze (distinguish)

### Prerequisites
multi-region deployment, edge deployment, hybrid cloud strategy, data residency, always-on floor

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
The learner assigns each of eight scenario cards to one of four bins and commits the assignment. An assignment is correct when it matches the answer column in Content. Mastery is 7 of 8 correct on the first attempt.

### Common Misconceptions
(1) Multi-region is the default choice for reliability and always worth its cost. (2) Edge deployment is suitable for any model size. (3) Hybrid cloud is only about cost, not control or vendor dependence.
