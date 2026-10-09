---
title: Measurement Rigor and KPI Reporting
description: Accuracy and outcome metrics, the instrumentation and dashboard design that makes them reportable, and the baseline, control group, and significance methods that decide whether a measured change can be trusted.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 13:50:00
version: 1.11
---

# Measurement Rigor and KPI Reporting

## Summary

Covers accuracy-oriented metrics and the measurement rigor — baselines, control groups, statistical significance — needed to trust any reported KPI. This chapter covers 19 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Model Accuracy Metric | 62 |
| Precision And Recall | 61 |
| Hallucination Rate Metric | 60 |
| User Retention Metric | 59 |
| Net Promoter Score | 1 |
| Cost Per Outcome | 57 |
| Value Realization Metric | 56 |
| Leading Vs Lagging Indicator | 1 |
| North Star Metric | 54 |
| Metric Instrumentation Plan | 53 |
| KPI Dashboard Design | 46 |
| Metric Baseline Capture | 19 |
| Metric Attribution | 7 |
| Confounding Factor | 6 |
| Statistical Significance Check | 5 |
| Control Group Comparison | 4 |
| Pre/Post Comparison Study | 1 |
| Longitudinal Tracking | 2 |
| Metric Reporting Cadence | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)

---

Chapter 11 ended with two uncomfortable facts about the support assistant. Reply errors rose from 3.0% to 4.0% (15 of 500 sampled replies, then 20 of 500), and the task time fell by one minute, from 15 to 14. Both numbers drive the realized ROI of −5.3%, and neither has been tested. Was the error rise real or noise? Was the minute saved by the assistant, or by the new knowledge-base article that went live the same month? This chapter adds the remaining outcome metrics, then the measurement discipline that decides how far a number can be trusted. Every figure continues the illustrative example.

!!! mascot-welcome "A Number You Can Defend"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A metric nobody trusts is a metric nobody funds. By the end of this chapter you can say not only what changed, but whether the change is real and whether the assistant caused it. Every token counts, and so does every claim you can stand behind.

### Accuracy Metrics: Right, Wrong, and Made Up

The **model accuracy metric** is the proportion of a model's outputs that are correct against a reference standard, measured on a sample that humans or a trusted system have labeled:

\[
\text{accuracy} = \frac{\text{correct outputs}}{\text{outputs evaluated}}
\]

In the example, 500 sampled replies were reviewed and 20 contained an error, so accuracy is \( 480 \div 500 = 96.0\% \) with the assistant and 97.0% at baseline. Accuracy is simple to compute and often misleading, which is the reason for the next two ideas.

Suppose the assistant also flags incoming tickets as urgent. A reviewer labels 200 tickets, of which 50 are truly urgent. The assistant flags 60 tickets, and 45 of those are truly urgent. Four counts describe every such result: **true positives** (TP, flagged and truly urgent: 45), **false positives** (FP, flagged but not urgent: 15), **false negatives** (FN, urgent but missed: 5), and **true negatives** (TN, correctly left unflagged: 135).

**Precision and recall** are the two measures built from these counts. Precision is the share of flagged tickets that were truly urgent, and recall is the share of truly urgent tickets that were flagged:

\[
\text{precision} = \frac{TP}{TP + FP} \qquad \text{recall} = \frac{TP}{TP + FN}
\]

Here precision is \( 45 \div 60 = 75.0\% \) and recall is \( 45 \div 50 = 90.0\% \). Accuracy is \( (45 + 135) \div 200 = 90.0\% \). Now consider a useless system that never flags anything: it has 0 TP and 0 FP, so \( TN = 150 \) and \( FN = 50 \). Its accuracy is \( 150 \div 200 = 75.0\% \), which sounds respectable, while its recall is 0%. When the thing you care about is rare, accuracy rewards a system for doing nothing.

!!! mascot-thinking "Choose the Error You Can Afford"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Precision and recall are two prices, not two scores. A false positive costs a reviewer's time and a false negative costs whatever the missed case costs, so the right balance is the one that minimises total cost, which makes this a finance question as much as a model question.

Put dollars on it. Each false positive costs 2 minutes of an agent's attention, or \( 2 \div 60 \times \$30 = \$1.00 \). Each missed urgent ticket costs an average of $25 in service-level penalties. The assistant's 15 false positives and 5 false negatives per 200 tickets cost \( 15 \times 1.00 + 5 \times 25 = \$140 \). A stricter setting that flags only 32 tickets (30 correct) has 2 false positives and 20 false negatives, costing \( 2 \times 1.00 + 20 \times 25 = \$502 \), though its precision is higher (93.8%). Optimising the metric that looks best, precision, would more than triple the cost.

The first of the specifications below lets the learner compute these measures.

#### Diagram: Confusion Matrix Metric Explorer


<iframe src="../../sims/confusion-matrix-metric-explorer/main.html" width="100%" height="362px" scrolling="no"></iframe>
[Run Confusion Matrix Metric Explorer Fullscreen](../../sims/confusion-matrix-metric-explorer/main.html)

<details markdown="1">
<summary>Confusion Matrix Metric Explorer</summary>
Type: microsim
**sim-id:** confusion-matrix-metric-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate precision, recall, and accuracy from the four counts of a confusion matrix for eight prompted cases, to within 0.5 percentage points.

**Prerequisites:** model accuracy metric, precision and recall, true positive, false positive, false negative, true negative (all defined in the section "Accuracy Metrics: Right, Wrong, and Made Up" above).

**Evidence of Mastery:** For each of eight items the learner types a percentage before the answer is shown. A value is correct when it is within 0.5 percentage points of the model value. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable counts is not evidence.

**Misconceptions:** (1) A high accuracy means the system finds the cases that matter. (2) Precision and recall are two names for the same thing. (3) Fewer false positives always means a better system.

**Instructional Rationale:** Apply-level work means carrying out a procedure on new numbers. Computing the same three measures for a never-flag baseline and for a strict setting shows the learner, with their own arithmetic, that accuracy can stay high while recall collapses.

**Content:**

Every case uses 200 reviewed tickets, of which 50 are truly urgent.

| Case | TP | FP | FN | TN |
|---|---|---|---|---|
| A: assistant as deployed | 45 | 15 | 5 | 135 |
| B: never flags anything | 0 | 0 | 50 | 150 |
| C: strict setting | 30 | 2 | 20 | 148 |

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Case A precision | 75.0% | 45 ÷ (45 + 15) = 0.75. |
| 2 | Case A recall | 90.0% | 45 ÷ (45 + 5) = 0.90. |
| 3 | Case A accuracy | 90.0% | (45 + 135) ÷ 200 = 0.90. |
| 4 | Case B accuracy | 75.0% | (0 + 150) ÷ 200 = 0.75, high only because urgent tickets are rare. |
| 5 | Case B recall | 0.0% | 0 ÷ (0 + 50) = 0, it finds none of the urgent tickets. |
| 6 | Case C precision | 93.8% | 30 ÷ (30 + 2) = 0.9375. |
| 7 | Case C recall | 60.0% | 30 ÷ (30 + 20) = 0.60. |
| 8 | Case C accuracy | 89.0% | (30 + 148) ÷ 200 = 0.89. |

**Provenance:** Case A comes from the chapter section "Accuracy Metrics: Right, Wrong, and Made Up". Cases B and C are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Precision = TP ÷ (TP + FP), shown as "undefined" when TP + FP = 0. Recall = TP ÷ (TP + FN). Accuracy = (TP + TN) ÷ 200. All three are shown as percentages to one decimal place. The number of truly urgent tickets is fixed at 50, so FN = 50 − TP and TN = 150 − FP. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| True positives | 0 | 50 | 1 | 45 | tickets |
| False positives | 0 | 150 | 1 | 15 | tickets |

**Learner Activity:**

1. The learner reads the counts for the first case and types a value for item 1, then presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes true positives and false positives and watches precision, recall, and accuracy update.
4. The learner should notice that accuracy barely moves when false positives and false negatives change a little, while recall and precision swing widely.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Case A counts are shown with item 1 and an empty answer box. The question on screen is "Of the tickets the assistant flagged, what share were truly urgent?"

**Chapter Anchors:** The chapter states 200 tickets with 50 urgent, 60 flagged, 45 true positives, 15 false positives, 5 false negatives, 135 true negatives, precision 75.0%, recall 90.0%, accuracy 90.0%, a never-flag accuracy of 75.0%, and a strict setting with precision 93.8%.
</details>

The **hallucination rate metric** is the proportion of GenAI outputs that contain fabricated or unsupported content presented as fact. It is a sub-set of the error rate, so you count it by asking a narrower question of the same review sample: does each claim trace to the knowledge base? Of the 20 erroneous replies in the sample, 8 contained an invented detail such as a non-existent refund policy, so the hallucination rate is \( 8 \div 500 = 1.6\% \). The other 12 were plain mistakes (the wrong product, an outdated price). The distinction matters because the remedies differ: grounding the answers in retrieved documents lowers hallucination, and better routing lowers the other errors. Do not add the cost of hallucinations to the cost of errors, since the 8 replies are already inside the 20.

### Outcome Metrics: Retention, Sentiment, Cost, and Value

Accuracy tells you the output is right. Four more metrics tell you whether the investment is working.

The **user retention metric** is the proportion of users who continue to use a GenAI feature over a defined later period, usually measured for a cohort that started at the same time. In the example 22 agents were active by week 2, and 20 of those 22 are still active in week 12, so cohort retention is \( 20 \div 22 = 90.9\% \). Retention is a stronger signal than adoption, because a tool people try and abandon shows up in adoption but not in retention.

The **net promoter score** (NPS) is a loyalty measure computed from one question, "how likely are you to recommend this?", answered from 0 to 10. Respondents scoring 9 or 10 are promoters, 7 or 8 are passives, and 0 to 6 are detractors; the score is the percentage of promoters minus the percentage of detractors. Among the 34 active agents, 18 are promoters, 11 passive, and 5 detractors, so the NPS is \( 52.9 - 14.7 = +38.2 \). Report it with the count of respondents, because with 34 people one agent moves it by almost 3 points.

The **cost per outcome** is the total cost of producing one unit of the result the business cares about, such as a resolved ticket, including labor, tool, and rework costs. It is the unit-cost idea of Chapter 10 applied to a delivered result. At baseline an agent-handled ticket costs 15 minutes at $30 an hour, which is $7.50. With the assistant, year 1 costs are the $30,000 running cost plus one third of the $60,000 investment ($20,000), or $50,000, spread over 91,800 assisted tickets: $0.545 per assisted ticket. Add $7.00 of labor (14 minutes) and $0.05 of extra rework (\( 0.01 \times 10 \div 60 \times 30 \)) for a cost per assisted ticket of $7.595, which is 1.3% higher than $7.50. In years 2 and 3 the running cost is $35,000 over 122,400 assisted tickets, giving $7.499, essentially level with the baseline. The numbers say what the −5.3% ROI said, in a unit an operations manager recognises: the assistant does not pay for itself until volume or adoption grows.

The **value realization metric** is the ratio of benefit actually delivered to the benefit forecast in the business case, tracked over time:

\[
\text{value realization} = \frac{\text{realized benefit}}{\text{planned benefit}}
\]

Year 1 gives \( 41{,}310 \div 60{,}000 = 68.85\% \), the figure Chapter 11 found. Because the same factors apply every year, the three-year figure is the same 68.85%. A value realization below 100% is not a failure of measurement; it is the business case reporting back.

!!! mascot-warning "Cost Per Outcome Needs a Fixed Definition of Outcome"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If one report counts every handled ticket and the next counts only resolved ones, cost per outcome changes with no change in operations. Write the definition of "outcome" and of what is in the cost next to the number, and do not change either mid-year.

### Choosing and Organising the Metrics

A report with 19 metrics tells nobody anything, so you need a way to choose. The **leading vs lagging indicator** distinction sorts metrics by timing: a leading indicator moves early and predicts results, while a lagging indicator confirms results after the fact. The table classifies the metrics in this and the previous chapter.

| Metric | Type | Typically moves within |
|--------|------|------------------------|
| Adoption rate, usage frequency | Leading | Days |
| Error rate, hallucination rate | Leading | Weeks |
| User retention | Leading | Weeks to months |
| Task completion time, rework rate | Leading | Weeks |
| Cost per outcome | Lagging | Months |
| Value realization, ROI, NPV | Lagging | Quarters |

A **north star metric** is the single metric that best captures the value an initiative creates, chosen so that every team's work can be pointed at it. For the support assistant the candidate is cost per resolved ticket, with a guardrail that the quality score stays at or above 4.0. A good north star is a lagging outcome that leading metrics can explain: if cost per ticket stops falling, you look at adoption, then usage, then rework, in that order.

!!! mascot-tip "Test a North Star With One Question"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Ask whether a team could improve the metric while making the customer's experience worse. If yes, add a guardrail metric beside it before you adopt it, as the quality floor does here.

A metric you cannot collect is a wish. The **metric instrumentation plan** is a document that states, for each metric, where its data comes from, which event or field is recorded, who owns it, and how often it is collected. A plan for the support assistant looks like this.

| Metric | Source system | Field or event | Owner | Frequency |
|--------|---------------|----------------|-------|-----------|
| Adoption rate | Assistant logs | Agent ID with at least one query in 30 days | Support operations | Weekly |
| Task completion time | Ticketing system | Ticket opened and closed timestamps | Support operations | Weekly |
| Error rate | Review sample | 100 replies scored each week | Quality team | Weekly |
| Rework rate | Ticketing system | Reopened or edited-after-send flag | Support operations | Weekly |
| Cost per outcome | Finance ledger and logs | Tool cost divided by resolved tickets | Finance partner | Monthly |
| Realized benefit | Computed | Chapter 11 formula | Finance partner | Quarterly |

**KPI dashboard design** is the practice of selecting, arranging, and presenting key performance indicators so a defined audience can read their status and act on it. Four rules carry most of the value. Give the dashboard one audience, because the executive wants three numbers and the operations lead wants twenty. Show every KPI against a target or baseline, since 85% means nothing alone. Mark each KPI as leading or lagging. Put the guardrails next to the metrics they protect. A one-screen dashboard for the finance sponsor would show value realization, cost per resolved ticket against the $7.50 baseline, and quality score against the 4.0 floor, with adoption and rework as drill-downs.

The **metric reporting cadence** is the schedule on which each metric is calculated and reported, matched to how quickly the metric moves and how fast someone can act on it. Weekly review suits the leading operational metrics, monthly review suits cost per outcome and value realization, and quarterly review suits ROI and NPV. Reporting a quarterly metric weekly produces noise, and reporting an adoption problem quarterly means finding it after the money is spent.

### Measurement Rigor: Is the Change Real, and Is It Ours?

The rest of the chapter turns on one habit: before you credit a metric change to the assistant, rule out the alternatives. Six ideas give the method.

**Metric baseline capture** is the recording of a metric's value, with its definition and measurement method, before the initiative starts, so later values have something fair to be compared to. The 15-minute ticket time came from 4 weeks of ticketing timestamps before launch, 15.0 minutes on average. If the baseline is missing, you can only reconstruct it from memory or from a different period, and both invite argument. Capture it for every metric in the instrumentation plan, and write down the dates and the definition.

A **pre/post comparison study** compares a metric's value before an intervention with its value afterwards, in the same group. It is the cheapest design and the one most often used: handle time was 15.0 minutes before and 14.0 after, so the assistant saved a minute. Its weakness is that it credits the intervention with everything else that changed between the two periods.

A **confounding factor** is a variable that influences the outcome and also differs between the compared conditions, so it can be mistaken for the effect of the intervention. In the example three confounders are plausible: a new knowledge-base article that cut look-up time for every agent, a seasonal dip in ticket complexity after the holidays, and the departure of two slow-handling agents. Each moves handle time and has nothing to do with the assistant.

A **control group comparison** measures an outcome for a group that received the intervention and for a similar group that did not, over the same period, so that confounders affecting both groups cancel out. Suppose 20 agents use the assistant and 20 do not, and the groups are chosen by random assignment so they are similar. The results are:

| Group | Before | After | Change |
|-------|-------:|------:|-------:|
| With assistant | 15.0 min | 14.0 min | −1.0 min |
| Without assistant | 15.0 min | 14.6 min | −0.4 min |

The 0.4-minute fall in the control group is the confounders at work. **Metric attribution** is the assignment of a measured change to its causes, and here the attributable change is the treated change minus the control change: \( -1.0 - (-0.4) = -0.6 \) minutes. The pre/post study overstated the benefit by 40%, and the assistant's share of the improvement is 60%.

!!! mascot-warning "A Control Group Can Disagree With Your Forecast"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is uncomfortable to run a control group that halves your claimed saving, and that is why teams skip it. Run it anyway, using random assignment, and report the attributable figure with the pre/post figure beside it. Finance will find the gap sooner or later.

Using only the attributable 0.6 minutes, the year 1 gross saving falls from $45,900 to \( 120{,}000 \times 0.6 \div 60 \times 30 \times 0.85 \times 0.90 = \$27{,}540 \), and after the $4,590 rework cost the realized benefit would be $22,950. The book's running case continues with the 1-minute figure so that its numbers stay comparable across chapters, but this is the kind of adjustment a rigorous report makes.

The second specification lets the learner practise the attribution.

#### Diagram: Control Group Attribution Lab


<iframe src="../../sims/control-group-attribution-lab/main.html" width="100%" height="362px" scrolling="no"></iframe>
[Run Control Group Attribution Lab Fullscreen](../../sims/control-group-attribution-lab/main.html)

<details markdown="1">
<summary>Control Group Attribution Lab</summary>
Type: microsim
**sim-id:** control-group-attribution-lab<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** attribute<br/>
**Learning Objective:** The learner will attribute the measured change in ticket handle time to the assistant for each of six scenarios by subtracting the control group's change, and will identify whether a pre/post study alone overstates, understates, or about equals the attributable benefit.

**Prerequisites:** pre/post comparison study, confounding factor, control group comparison, metric attribution (all defined in the section "Measurement Rigor: Is the Change Real, and Is It Ours?" above).

**Evidence of Mastery:** For each of six scenarios the learner commits two answers before the result is shown: the attributable benefit in minutes, and a verdict of "Pre/post overstates", "Pre/post understates", or "Pre/post is about right". The benefit is correct within 0.05 minutes. The verdict is correct when it matches the Content table. Mastery is 5 of 6 scenarios with both answers correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A before and after drop is the effect of the intervention. (2) The control group's change is irrelevant if the treated group improved. (3) A confounder can only make an intervention look better, never worse.

**Instructional Rationale:** Analyze-level work separates a whole into its parts. Splitting a before and after change into a part that the control group also shows and a part that only the treated group shows is that separation, and predicting the split before it is revealed requires the learner to do it rather than watch.

**Content:**

Benefit means minutes saved, which is the before value minus the after value, so a positive benefit is an improvement. All handle times are in minutes per ticket.

| # | Treated before | Treated after | Control before | Control after | Pre/post benefit | Control benefit | Attributable benefit | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 15.0 | 14.0 | 15.0 | 14.6 | 1.0 | 0.4 | 0.6 | Pre/post overstates | The control group improved by 0.4 without the assistant, so only 0.6 is attributable. |
| 2 | 15.0 | 14.0 | 15.0 | 15.0 | 1.0 | 0.0 | 1.0 | Pre/post is about right | Nothing else changed, so the whole benefit is attributable. |
| 3 | 15.0 | 14.0 | 15.0 | 13.8 | 1.0 | 1.2 | −0.2 | Pre/post overstates | The control group improved more than the treated group, so the assistant appears to have slowed work. |
| 4 | 15.0 | 14.5 | 15.0 | 15.5 | 0.5 | −0.5 | 1.0 | Pre/post understates | Conditions got worse for everyone, which hid part of the assistant's benefit. |
| 5 | 15.0 | 13.0 | 15.0 | 14.1 | 2.0 | 0.9 | 1.1 | Pre/post overstates | A large improvement is still inflated when the control group improved by 0.9. |
| 6 | 14.0 | 13.0 | 14.0 | 14.0 | 1.0 | 0.0 | 1.0 | Pre/post is about right | The control group did not change, so pre/post equals the attributable figure. |

**Provenance:** Scenario 1 comes from the chapter section "Measurement Rigor: Is the Change Real, and Is It Ours?". Scenarios 2 to 6 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Pre/post benefit = treated before − treated after. Control benefit = control before − control after. Attributable benefit = pre/post benefit − control benefit, shown to one decimal. Verdict is "Pre/post overstates" when control benefit > 0.1, "Pre/post understates" when control benefit < −0.1, and "Pre/post is about right" otherwise. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Treated after | 12.0 | 17.0 | 0.1 | 14.0 | minutes |
| Control after | 12.0 | 17.0 | 0.1 | 14.6 | minutes |

All four "before" values are 15.0 minutes in exploration.

**Learner Activity:**

1. The learner reads the four handle times for scenario 1, enters the attributable benefit, selects a verdict, and presses Commit.
2. The sim shows the pre/post benefit, the control benefit, the attributable benefit, and the "Why" text.
3. After six scenarios, exploration unlocks: the learner changes the two "after" values and watches the three benefits and the verdict update.
4. The learner should notice that the attributable benefit depends on the control group's change and not on the treated group's change alone.

**Feedback:** Six scenarios, fixed order, two attempts each. Correct: "Correct: attributable benefit <value> minutes; <verdict>." Incorrect on the first attempt: the "Why" text without the answers. After a second wrong attempt the answers are shown and the scenario counts as missed. A running count "Both correct on first attempt: n of 6" is shown.

**Starting State:** Scenario 1 is shown with empty answer boxes. The question on screen is "How many of the 1.0 minutes saved can be credited to the assistant?"

**Chapter Anchors:** The chapter states treated handle time falling from 15.0 to 14.0 minutes, a control group falling from 15.0 to 14.6 minutes, an attributable change of 0.6 minutes, an overstatement of 40%, and an attributable share of 60%.
</details>

An attributable figure is still an estimate from a sample, so you also need to know how much it could vary by chance. A **statistical significance check** is a test of whether an observed difference is larger than random variation in the sample would plausibly produce. For the error rates, the null assumption is that the true rate is the same with and without the assistant. With 15 errors in 500 baseline replies and 20 in 500 assisted replies, the pooled error rate is \( 35 \div 1000 = 3.5\% \), and the standard error of the difference between two proportions is:

\[
SE = \sqrt{\hat{p}(1 - \hat{p})\left(\frac{1}{n_1} + \frac{1}{n_2}\right)} = \sqrt{0.035 \times 0.965 \times \frac{2}{500}} = 0.0116
\]

The test statistic \( z \) is the observed difference divided by that standard error: \( 0.010 \div 0.0116 = 0.86 \). As a rule of thumb, a difference is significant at the 5% level when \( |z| \ge 1.96 \). At 0.86 the two-sided p-value is about 0.39, so a gap this large would appear by chance roughly four times in ten. The one-point rise in errors is not evidence of a problem, and equally it is not evidence of no problem; the sample is too small to say.

How large would it need to be? The sample size per group needed to detect a change from \( p_1 \) to \( p_2 \) with 80% power at the 5% level is approximately:

\[
n \approx \frac{(1.96 + 0.84)^2 \left[p_1(1 - p_1) + p_2(1 - p_2)\right]}{(p_2 - p_1)^2} = \frac{7.84 \times 0.0675}{0.0001} \approx 5{,}300
\]

for \( p_1 = 3.0\% \) and \( p_2 = 4.0\% \). Reviewing 100 replies a week would take 53 weeks per group, so for rare errors you need either a bigger sample or a larger effect. The time measurement is easier: with a standard deviation of 6 minutes per ticket and 2,000 tickets in each group, the standard error of a 0.6-minute difference is \( 6 \times \sqrt{2 \div 2000} = 0.19 \), so \( z = 3.16 \) and the p-value is about 0.002. The time saving is significant; the error increase is not yet resolved.

The third specification lets the learner judge eight such results.

#### Diagram: Significance Check Lab


<iframe src="../../sims/significance-check-lab/main.html" width="100%" height="322px" scrolling="no"></iframe>
[Run Significance Check Lab Fullscreen](../../sims/significance-check-lab/main.html)

<details markdown="1">
<summary>Significance Check Lab</summary>
Type: microsim
**sim-id:** significance-check-lab<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight comparisons of two rates, whether the difference is statistically significant at the 5% level using the rule that the absolute value of z must be at least 1.96.

**Prerequisites:** statistical significance check, standard error, z statistic, pooled rate (all defined in the section "Measurement Rigor: Is the Change Real, and Is It Ours?" above).

**Evidence of Mastery:** For each of eight comparisons the learner commits a verdict, "Significant" or "Not significant", before z is shown. A verdict is correct when it matches the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A difference that looks large in percentage terms is significant. (2) A non-significant result proves there is no difference. (3) Sample size does not matter if the rates are the same.

**Instructional Rationale:** Evaluate-level work is judging against a criterion. Committing a verdict before z appears makes the learner weigh the size of the gap against the sample size, and the boundary item at z = 1.92 forces attention to the 1.96 cutoff.

**Content:**

Rates are shown as counts out of the sample size. Group 1 is the baseline and group 2 is with the assistant, or the second condition named.

| # | Comparison | Group 1 | Group 2 | z | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | Reply errors, 500 per group | 15 of 500 | 20 of 500 | 0.86 | Not significant | The gap is under one standard error wide. |
| 2 | Reply errors, 5,000 per group | 150 of 5,000 | 200 of 5,000 | 2.72 | Significant | The same 3.0% and 4.0% rates are significant with ten times the sample. |
| 3 | Rework, 2,000 tickets per group | 160 of 2,000 | 180 of 2,000 | 1.13 | Not significant | 8% against 9% is within chance at this size. |
| 4 | Hallucinations, 500 per group | 4 of 500 | 8 of 500 | 1.16 | Not significant | Doubling a very small count is still within chance. |
| 5 | Cohort retention, 22 agents per group | 15 of 22 | 20 of 22 | 1.87 | Not significant | Twenty-two people is too few to confirm a 23-point gap. |
| 6 | Deflection, 1,000 requests per group | 650 of 1,000 | 700 of 1,000 | 2.39 | Significant | A 5-point gap on 1,000 requests each exceeds chance. |
| 7 | Reply errors, 2,500 per group | 75 of 2,500 | 100 of 2,500 | 1.92 | Not significant | z is 1.92, just below the 1.96 cutoff. |
| 8 | Reply errors, 5,300 per group | 159 of 5,300 | 212 of 5,300 | 2.80 | Significant | At about 5,300 per group the 3.0% and 4.0% rates are detectable. |

**Provenance:** Comparisons 1, 2, 7 and 8 use the error rates and the sample-size calculation from the chapter section "Measurement Rigor: Is the Change Real, and Is It Ours?". Comparisons 3 to 6 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Pooled rate = (x1 + x2) ÷ (n1 + n2). Standard error = square root of pooled rate × (1 − pooled rate) × (1 ÷ n1 + 1 ÷ n2). z = (x2 ÷ n2 − x1 ÷ n1) ÷ standard error. The verdict is "Significant" when |z| >= 1.96 and "Not significant" otherwise. The sim displays z to two decimals and shows the pooled rate and standard error in the reveal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Group 1 rate | 1 | 20 | 1 | 3 | percent |
| Group 2 rate | 1 | 20 | 1 | 4 | percent |
| Sample size per group | 100 | 6,000 | 100 | 500 | replies |

**Learner Activity:**

1. The learner reads comparison 1 and selects a verdict, then presses Commit.
2. The sim shows the pooled rate, the standard error, z, and the "Why" text.
3. After eight comparisons, exploration unlocks: the learner changes the two rates and the sample size and watches z and the verdict update.
4. The learner should notice that with the 3% and 4% rates fixed, z crosses 1.96 only once the sample size is large enough.

**Feedback:** Eight comparisons, fixed order, two attempts each. Correct: "Correct: <verdict>, z = <value>." Incorrect on the first attempt: the "Why" text without the verdict. After a second wrong attempt the verdict is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Comparison 1 is shown with no verdict chosen. The question on screen is "Could this difference plausibly be chance?"

**Chapter Anchors:** The chapter states error counts of 15 and 20 out of 500, a pooled rate of 3.5%, a standard error of 0.0116, z of 0.86, a p-value of about 0.39, the 1.96 cutoff, and a required sample of about 5,300 per group.
</details>

The last two terms in the method concern time. **Longitudinal tracking** is the repeated measurement of the same metric and population at regular intervals over an extended period, so that trends, decay, and novelty effects become visible. A one-minute saving measured in week 6 may fade as the novelty wears off, or grow as agents learn to prompt better. The example tracks weekly handle time from week 6 on, and reports the 4-week moving average so that a single odd week does not move the story. Longitudinal tracking is also what makes a baseline useful: you can see whether the metric was drifting before the launch.

Together, the six ideas give a checklist for any benefit claim. Was a baseline captured before launch? Is there a comparison group, and how was it chosen? What else changed during the period? Is the difference larger than the sample's noise? Does it hold over time? Which share of the change is attributable?

### Summary and Quick Check

Accuracy, precision, recall, and hallucination rate measure the output, and retention, NPS, cost per outcome, and value realization measure whether the investment is working. A leading vs lagging classification, a single north star metric, an instrumentation plan, a dashboard designed for one audience, and a reporting cadence turn those metrics into a report. Baselines, control groups, attribution, significance checks, and longitudinal tracking say how far the report can be trusted. Applied to the support assistant, they show an error-rate rise that cannot yet be called real, a time saving that is real but only 60% attributable to the assistant, and a value realization of 68.85%. Chapter 13 turns to the telemetry that collects these numbers automatically.

??? note "Quick check: why can a system with 75% accuracy be useless? - Click to expand"
    If only 25% of cases are positive, a system that never flags anything is correct on the other 75%, so accuracy is 75% while recall is 0%. Precision and recall reveal what accuracy hides when the cases that matter are rare.

??? note "Quick check: why is a pre/post comparison not enough? - Click to expand"
    It credits the intervention with every other change between the two periods, such as a new knowledge-base article or seasonal ticket mix. A control group that did not receive the assistant shows how much of the change would have happened anyway, and subtracting it gives the attributable change.

??? note "Quick check: the error rate rose from 3.0% to 4.0%, so is the assistant making errors worse? - Click to expand"
    Not on this evidence. With 500 replies per group, z is 0.86 and the p-value is about 0.39, so chance explains the gap easily. You would need about 5,300 replies per group to detect a one-point change reliably.

!!! mascot-celebration "You Can Defend a Metric in Front of Finance"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compute precision and recall, attribute a change with a control group, and test whether a difference is bigger than chance. That is the difference between reporting a number and defending it.
