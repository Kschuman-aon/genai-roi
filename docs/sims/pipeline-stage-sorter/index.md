---
title: "Pipeline Stage Sorter"
description: "The learner will classify each of ten cost-analytics pipeline tasks under the one of four stages (Collect, Transform, Load, Serve) in which it occurs, with at least 8 of 10 correct on the first attempt."
image: /sims/pipeline-stage-sorter/pipeline-stage-sorter.png
og:image: /sims/pipeline-stage-sorter/pipeline-stage-sorter.png
twitter:image: /sims/pipeline-stage-sorter/pipeline-stage-sorter.png
social:
   cards: false
quality_score: 0
---

# Pipeline Stage Sorter

<iframe src="main.html" height="402px" width="100%" scrolling="no"></iframe>

[Run the Pipeline Stage Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will classify each of ten cost-analytics pipeline tasks under the one of four stages (Collect, Transform, Load, Serve) in which it occurs, with at least 8 of 10 correct on the first attempt. Classifying concrete tasks under stage definitions is how an Understand objective is shown. Items such as deduplication and tag mapping, which look like storage work, test whether the learner knows where cleaning belongs.

This MicroSim belongs to the chapter [Telemetry Logging Cost Dashboards](../../chapters/13-telemetry-logging-cost-dashboards/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/pipeline-stage-sorter/main.html"
        height="402px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Understand (classify)

### Prerequisites
data pipeline for cost analytics, ETL for usage data, cost data warehouse, data quality for cost metrics

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each task the learner chooses one stage and commits. A choice is correct when it matches the "Correct stage" column in Content. Mastery is 8 of 10 correct on the first attempt. Reading the stage definitions is exploration, not evidence.

### Common Misconceptions
(1) Cleaning and deduplicating happen after storage. (2) Alerting is part of data collection. (3) Retention management belongs in the transform stage.
