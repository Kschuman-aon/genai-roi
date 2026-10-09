---
title: "Control Group Attribution Lab"
description: "The learner will attribute the measured change in ticket handle time to the assistant for each of six scenarios by subtracting the control group's change, and will identify whether a pre/post study alone overstates, understates, or about equals the attributable benefit."
image: /sims/control-group-attribution-lab/control-group-attribution-lab.png
og:image: /sims/control-group-attribution-lab/control-group-attribution-lab.png
twitter:image: /sims/control-group-attribution-lab/control-group-attribution-lab.png
social:
   cards: false
quality_score: 0
---

# Control Group Attribution Lab

<iframe src="main.html" height="362px" width="100%" scrolling="no"></iframe>

[Run the Control Group Attribution Lab MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The learner will attribute the measured change in ticket handle time to the assistant for each of six scenarios by subtracting the control group's change, and will identify whether a pre/post study alone overstates, understates, or about equals the attributable benefit. Analyze-level work separates a whole into its parts. Splitting a before and after change into a part that the control group also shows and a part that only the treated group shows is that separation, and predicting the split before it is revealed requires the learner to do it rather than watch.

This MicroSim belongs to the chapter [Measurement Rigor Kpi Reporting](../../chapters/12-measurement-rigor-kpi-reporting/index.md). It uses JavaScript with the shared quiz kit in `sims/shared-libs/`. All data in it is illustrative.

## How to Use

1. Read the case and commit an answer before any result is shown.
2. Press Check (or Commit). The sim shows whether the answer is correct and explains why.
3. A wrong answer gets one more attempt; after the second miss the answer is shown.
4. After the last item an exploration panel unlocks. It is practice only and is not scored.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/control-group-attribution-lab/main.html"
        height="362px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Audience
Professionals and graduate students learning to estimate and defend the cost and return of generative AI.

### Duration
10-15 minutes

### Bloom's Taxonomy
Analyze (attribute)

### Prerequisites
pre/post comparison study, confounding factor, control group comparison, metric attribution

### Activities

1. **Predict** (5-10 min): work through the committed challenges before any answer is revealed.
2. **Explore** (5 min): use the controls unlocked after the last challenge to see how each input changes the result.

### Assessment
For each of six scenarios the learner commits two answers before the result is shown: the attributable benefit in minutes, and a verdict of "Pre/post overstates", "Pre/post understates", or "Pre/post is about right". The benefit is correct within 0.05 minutes. The verdict is correct when it matches the Content table. Mastery is 5 of 6 scenarios with both answers correct on the first attempt. Exploration is not evidence.

### Common Misconceptions
(1) A before and after drop is the effect of the intervention. (2) The control group's change is irrelevant if the treated group improved. (3) A confounder can only make an intervention look better, never worse.
