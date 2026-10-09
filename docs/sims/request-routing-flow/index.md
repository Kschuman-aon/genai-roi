---
title: "Request Routing Flow"
description: "The learner will explain which path through cache, small model, quality check, large model, and fallback model each of five example requests takes and what it costs."
image: /sims/request-routing-flow/request-routing-flow.png
og:image: /sims/request-routing-flow/request-routing-flow.png
twitter:image: /sims/request-routing-flow/request-routing-flow.png
social:
   cards: false
quality_score: 0
---

# Request Routing Flow

<iframe src="main.html" height="447px" width="100%" scrolling="no"></iframe>

[Run the Request Routing Flow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will explain which path through cache, small model, quality check, large model, and fallback model each of five example requests takes and what it costs. Understand-level explanation is shown by predicting the route and cost of concrete requests before the step-through reveals them, with the actual per-step values visible.

This MicroSim belongs to the chapter [Prompt Routing Retrieval Efficiency](../../chapters/07-prompt-routing-retrieval-efficiency/index.md). It uses Mermaid with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads a request and selects the node where they think it is answered.
2. The sim reveals the path node by node with the running cost, and shows the "Why" text.
3. After five requests, the learner can open any node's description to review it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/request-routing-flow/main.html"
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
Understand (explain)

### Prerequisites
deterministic caching, semantic deduplication, model cascading, small model first strategy, fallback model strategy

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of five requests the learner selects, before the trace is shown, the node where the request is answered. A selection is correct when it matches the "Answered at" column. Mastery is 4 of 5 correct on the first attempt. Opening a node's description is exploration, not evidence.

### Common Misconceptions
(1) Every request reaches a model. (2) Escalated requests pay only for the large model. (3) A fallback model is used whenever the small model is wrong.
