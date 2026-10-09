---
title: "Cost Metric Lineage Explorer"
description: "The learner will examine a 19-node lineage graph to identify every downstream node affected when one source, table, or metric changes, for six change scenarios, matching the affected set exactly."
image: /sims/cost-metric-lineage-explorer/cost-metric-lineage-explorer.png
og:image: /sims/cost-metric-lineage-explorer/cost-metric-lineage-explorer.png
twitter:image: /sims/cost-metric-lineage-explorer/cost-metric-lineage-explorer.png
social:
   cards: false
quality_score: 0
---

# Cost Metric Lineage Explorer

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Cost Metric Lineage Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will examine a 19-node lineage graph to identify every downstream node affected when one source, table, or metric changes, for six change scenarios, matching the affected set exactly. Analyze-level work examines how parts connect. Tracing which nodes sit downstream of a change is the examination that lineage exists to support, and requiring an exact set prevents guessing by selecting everything.

This MicroSim belongs to the chapter [Cost Attribution Observability Maturity](../../chapters/14-cost-attribution-observability-maturity/index.md). It uses vis-network with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/cost-metric-lineage-explorer/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Analyze (examine)

### Prerequisites
data lineage for cost metrics, cost data warehouse, single source of truth, metric definition documentation

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six scenarios the learner selects the nodes they believe are affected and commits the selection before the answer is shown. A selection is correct when it equals the "Affected nodes" set in Content exactly, with no missing and no extra nodes. Mastery is 5 of 6 scenarios correct on the first attempt. Clicking nodes to read their descriptions is exploration, not evidence.

### Common Misconceptions
(1) A change in one source affects only the metric named after it. (2) A change to a price table affects every dashboard. (3) A change to a metric definition changes the data underneath it.
