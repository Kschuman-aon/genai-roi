---
title: "Peak Capacity Planner"
description: "The learner will calculate the number of inference servers needed for a stated peak request rate and utilization ceiling, and the monthly cost of provisioning for the peak around the clock, to the nearest whole server and dollar."
image: /sims/peak-capacity-planner/peak-capacity-planner.png
og:image: /sims/peak-capacity-planner/peak-capacity-planner.png
twitter:image: /sims/peak-capacity-planner/peak-capacity-planner.png
social:
   cards: false
quality_score: 0
---

# Peak Capacity Planner

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Peak Capacity Planner MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will calculate the number of inference servers needed for a stated peak request rate and utilization ceiling, and the monthly cost of provisioning for the peak around the clock, to the nearest whole server and dollar. Apply-level calculation needs a checked procedure. Committing numbers before the reveal surfaces the rounding and headroom errors, and the exploration mode then lets the learner see how schedule changes alter the elastic plan.

This MicroSim belongs to the chapter [Infrastructure Planning Monitoring](../../chapters/06-infrastructure-planning-monitoring/index.md). It uses p5.js with the shared quiz kit in `sims/shared-libs/`.

## How to Use

1. The learner reads the scenario and types a server count and a monthly cost.
2. The learner presses Check. The sim shows the model answer and the "Why" text beside the learner's numbers.
3. After three scenarios, exploration unlocks. The learner changes the five quantities and watches the peak-provisioned cost, the elastic cost, the saving, and the average utilization of the peak-provisioned fleet update together.
4. The learner should notice that shortening the peak window widens the gap between the two plans.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/peak-capacity-planner/main.html"
        height="482px"
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
inference server, peak load provisioning, capacity planning, idle capacity cost, utilization

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the sliders unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of three scenarios the learner types the number of servers and the monthly cost of running that many servers around the clock before the sim reveals the model answer. A response is correct when the server count equals the model count and the cost equals the model cost within $1. Mastery is 3 of 3 correct on the first attempt. Exploration of the elastic plan is not evidence.

### Common Misconceptions
(1) Servers needed = peak tokens ÷ raw capacity, with no utilization ceiling. (2) Rounding down is acceptable. (3) A peak-sized fleet has high average utilization.
