---
title: "Semantic Cache Threshold Explorer"
description: "The learner will recommend the similarity threshold that gives the largest saving without exceeding a stated tolerance for wrong cached answers per 100,000 requests."
image: /sims/semantic-cache-threshold-explorer/semantic-cache-threshold-explorer.png
og:image: /sims/semantic-cache-threshold-explorer/semantic-cache-threshold-explorer.png
twitter:image: /sims/semantic-cache-threshold-explorer/semantic-cache-threshold-explorer.png
social:
   cards: false
quality_score: 0
---

# Semantic Cache Threshold Explorer

<iframe src="main.html" height="497px" width="100%" scrolling="no"></iframe>

[Run the Semantic Cache Threshold Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will recommend the similarity threshold that gives the largest saving without exceeding a stated tolerance for wrong cached answers per 100,000 requests. Evaluate-level judgment means choosing against a criterion and defending the choice. Each situation supplies a criterion (the tolerance), and the learner must apply it to the data rather than pick the largest saving.

This MicroSim belongs to the chapter [Prompt Routing Retrieval Efficiency](../../chapters/07-prompt-routing-retrieval-efficiency/index.md). It uses Chart.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads a business situation and its tolerance and commits a threshold.
2. The sim reveals the correct threshold, highlights it on the chart, and shows the "Why" text.
3. After four situations, exploration unlocks: the learner changes the tolerance and sees which threshold qualifies and what the saving and wrong-answer count would be.
4. The learner should notice that the saving gained per step shrinks while the wrong-answer count grows faster.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/semantic-cache-threshold-explorer/main.html"
        height="497px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Evaluate (recommend)

### Prerequisites
response caching, deterministic caching, semantic deduplication, similarity threshold

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of four business situations the learner commits one threshold from the six values before the sim reveals the answer. A commitment is correct when it is the lowest threshold (largest saving) whose wrong answers per 100,000 requests are <= the situation's tolerance. Mastery is 3 of 4 correct on the first attempt. Hovering a threshold to read its values is exploration, not evidence.

### Common Misconceptions
(1) The lowest threshold is best because it saves the most. (2) A higher threshold is always safer without cost. (3) Hit rate and wrong-answer rate move together in proportion.
