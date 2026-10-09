---
title: "Multi-Tenant Cost Allocator"
description: "The learner will calculate each tenant's direct token cost, shared-cost allocation, and total allocated cost for the shared platform from request counts and per-request costs, to within $1."
image: /sims/multi-tenant-cost-allocator/multi-tenant-cost-allocator.png
og:image: /sims/multi-tenant-cost-allocator/multi-tenant-cost-allocator.png
twitter:image: /sims/multi-tenant-cost-allocator/multi-tenant-cost-allocator.png
social:
   cards: false
quality_score: 0
---

# Multi-Tenant Cost Allocator

<iframe src="main.html" height="392px" width="100%" scrolling="no"></iframe>

[Run the Multi-Tenant Cost Allocator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate each tenant's direct token cost, shared-cost allocation, and total allocated cost for the shared platform from request counts and per-request costs, to within $1. Apply-level work means carrying a procedure out on given data. Splitting direct cost by measurement and shared cost by a stated key, then comparing with the earlier assumed split, shows the learner what telemetry changes.

This MicroSim belongs to the chapter [Telemetry Logging Cost Dashboards](../../chapters/13-telemetry-logging-cost-dashboards/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/multi-tenant-cost-allocator/main.html"
        height="392px"
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
multi-tenant cost attribution, direct cost, shared cost, cost attribution tagging

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of eight items the learner types a value before the answer is shown. A value is correct when it is within $1 of the model value for dollar items, or within 0.1 percentage points for the percentage item. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

### Common Misconceptions
(1) Teams with equal request shares should pay equal amounts. (2) Shared costs should be split equally per team. (3) An assumed usage share is as good as a measured one.
