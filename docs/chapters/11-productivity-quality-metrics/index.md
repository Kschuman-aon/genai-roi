---
title: Productivity and Quality Metrics for GenAI
description: The adoption, speed, support, quality, satisfaction, and software-delivery metrics that supply the benefit figures in a GenAI ROI calculation, with worked examples that continue the support-assistant case.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 16:58:54
version: 1.11
---

# Productivity and Quality Metrics for GenAI

## Summary

Introduces the metrics that connect generative AI usage to productivity and quality outcomes, from adoption rate through developer velocity and defect reduction. This chapter covers 21 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| GenAI ROI Metric | 137 |
| Adoption Rate Metric | 82 |
| Usage Frequency Metric | 1 |
| Task Completion Time | 80 |
| Time-To-Value Metric | 79 |
| Quality Score Metric | 78 |
| Error Rate Metric | 77 |
| Rework Rate Metric | 76 |
| Customer Satisfaction Metric | 1 |
| Employee Satisfaction Metric | 74 |
| Automation Rate Metric | 1 |
| Throughput Improvement Metric | 72 |
| Deflection Rate Metric | 71 |
| First-Contact Resolution Rate | 1 |
| Cycle Time Reduction | 69 |
| Defect Reduction Rate | 68 |
| Code Review Time Saved | 67 |
| Developer Velocity Metric | 1 |
| Story Points Delivered | 65 |
| Lead Time For Changes | 64 |
| Mean Time To Resolution | 63 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)
- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)
- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)

---

Chapters 9 and 10 built a business case for a GenAI assistant that drafts replies for 40 support agents: a $60,000 investment, a first-year benefit of $60,000, an NPV of $38,272, and a three-year ROI of 37.5%. The benefit line rested on one assumption, that the assistant saves 1 minute on each of 120,000 tickets. Nothing so far shows that anyone uses the assistant, that the minute is really saved, or that the replies are still correct. This chapter supplies the metrics that test each of those links. It continues the same example, and every figure is illustrative.

!!! mascot-welcome "From Hunch to Evidence"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A benefit figure is only worth what you can measure behind it. By the end of this chapter you can pick the right metric for each claim, compute it, and rebuild the benefit line from measured data instead of a forecast. Every token counts, and so does every minute you claim to have saved.

### From Activity to Dollars: The GenAI ROI Metric

A **GenAI ROI metric** is a defined financial KPI that expresses the return of a GenAI initiative relative to its cost, usually by applying the ROI formula of Chapter 9 to measured benefits and total cost:

\[
\text{ROI} = \frac{\text{benefits} - \text{costs}}{\text{costs}}
\]

The costs come from the cost model of Chapters 9 and 10. The benefits are the hard part, because a benefit is never observed directly. It is built from a chain of measurements, and each link has its own metric.

1. **Adoption and usage:** are the intended people using the tool, and how often?
2. **Operational outcome:** does that use change time, volume, or resolution?
3. **Quality:** does the output stay good enough, or does it create rework?
4. **Experience:** how do customers and employees respond?
5. **Money:** the measured quantity multiplied by a unit value, such as hours saved times a labor rate.

Metrics at the start of the chain are leading indicators: they move within days and warn you early. The money at the end is a lagging indicator: it appears in quarterly results, when it is late to correct anything. A credible ROI report shows both, and shows how they connect.

!!! mascot-thinking "The Benefit Is a Product, Not a Number"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the benefit multiplies its links: users, usage, minutes saved, and quality all scale it, so a weak link anywhere lowers the whole result. That is why a single headline number can look healthy while one hidden factor is at 60%.

### Adoption: Did Anyone Use It?

The **adoption rate metric** is the proportion of intended or eligible users who have begun actively using a GenAI-enabled feature, tracked over time:

\[
\text{adoption rate} = \frac{\text{active users}}{\text{eligible users}}
\]

You must define "active" before you count, for example "used the assistant at least once in the last 30 days". Without that definition, a different team can report a different adoption rate from the same data. In the running example, all 40 agents are eligible. After week 2, 22 had used the assistant in the preceding 30 days (55%); after week 6, 31 (77.5%); after week 12, 34 (85%).

!!! mascot-warning "Licenses Are Not Users"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Counting assigned seats makes adoption look like 100% on day one, and it happens because seats are the easiest number to pull. Count only people with logged activity inside your stated window, and report the window next to the percentage.

Adoption says whether people started. The **usage frequency metric** is the rate at which adopted users keep engaging, such as queries per active user per week, which separates a trial from a habit. The plan implied 3,000 tickets per agent per year, or 60 a week over 50 working weeks, at 6 queries per ticket, so 360 queries per agent per week. Observed usage among active agents is 324 queries per week, which is 90% of plan. Usage coverage, observed over planned, is the factor we apply to the benefit.

The **time-to-value metric** is the elapsed time between deploying an initiative and the point where it starts delivering measurable benefit. In the example the assistant went live in week 0 and the first week with measurably lower handling time was week 6, so time-to-value is 6 weeks. Do not confuse it with the payback period of Chapter 9, which measures the time to recover the whole investment, here about 20 months in the plan. A slow time-to-value pushes cash benefit later, which lowers NPV even when the long-run benefit is unchanged.

### Speed: Task Time, Throughput, and Cycle Time

Three metrics describe speed, and they answer different questions. The **task completion time** is the elapsed time required for a user or process to finish a defined task, measured before and after introducing GenAI. It is the foundational input to the productivity gain of Chapter 10. In the example, handling one ticket took 15 minutes at baseline and takes 14 minutes with the assistant, a reduction of \( 1 \div 15 = 6.7\% \). The time is read from ticketing-system timestamps, which beats asking agents to estimate.

The **throughput improvement metric** is the percentage increase in the volume of work completed per unit of time. At 15 minutes per ticket an agent completes \( 60 \div 15 = 4.00 \) tickets per working hour; at 14 minutes, \( 60 \div 14 = 4.29 \). The improvement is \( (4.29 - 4.00) \div 4.00 = 7.1\% \). It is larger than the 6.7% time reduction because the same change is measured against a smaller denominator, so always say which of the two you are quoting. Throughput turns into money only if there is more work to complete or fewer people are needed to complete it.

The **cycle time reduction** is the decrease in total elapsed time for a complete business process, which may span several tasks and waiting periods:

\[
\text{cycle time reduction} = \frac{\text{before} - \text{after}}{\text{before}}
\]

A support ticket from open to close averages 240 minutes: 15 minutes of agent handling and 225 minutes of waiting in queues and for customer replies. A one-minute saving makes it 239 minutes, a cycle time reduction of 0.4%. Even if handling took no time at all, cycle time could fall by at most \( 15 \div 240 = 6.25\% \). Cycle time reduction is the most direct route to labor savings when elapsed time is mostly hands-on work, and a weak one when, as here, most of it is waiting.

The table collects the three measures of the same one-minute saving.

| Measure | Before | After | Change |
|---------|-------:|------:|-------:|
| Task completion time per ticket | 15 min | 14 min | −6.7% |
| Throughput per agent-hour | 4.00 tickets | 4.29 tickets | +7.1% |
| Ticket cycle time, open to close | 240 min | 239 min | −0.4% |

The same assistant produces a 6.7% improvement, a 7.1% improvement, and a 0.4% improvement. None is wrong; each answers a different question, and which one you present decides whether the story is about agent effort or customer wait.

### Support Outcomes: Resolution, Deflection, and Automation

Support teams use four more metrics that count outcomes rather than minutes. The **mean time to resolution** is the average elapsed time to fully resolve an incident or ticket from the moment it is reported. It is the cycle time of one incident, and is the usual headline for IT operations. Take an operations team with 240 incidents a year. An AI-assisted diagnosis tool cuts mean time to resolution from 90 to 70 minutes, a 22.2% reduction. The engineering time saved is \( 240 \times 20 = 4{,}800 \) minutes, or 80 hours, worth $4,800 at $60 an hour. The larger benefit is downtime: if 24 of the incidents are customer-facing outages costing $500 a minute, the 20 minutes saved are worth \( 24 \times 20 \times 500 = \$240{,}000 \). That is cost avoidance in the sense of Chapter 10, so it needs a counterfactual and should be reported on its own line. Because a mean is pulled up by one long incident, report the median alongside it.

The **deflection rate metric** is the proportion of incoming requests, typically customer inquiries, fully resolved by an automated system without escalation to a human agent. The running example's assistant only drafts replies for humans, so its deflection rate is 0%: choosing a metric the tool cannot move is a classic mistake. Consider instead a separate, hypothetical self-service bot that receives 1,000 requests in a month. It marks 760 as closed, but 60 of those customers contact an agent within three days. Only requests that do not come back count as deflected, so the rate is \( (760 - 60) \div 1000 = 70\% \), not 76%. Each deflected request avoids the $7.50 baseline labor cost of Chapter 10, so \( 700 \times 7.50 = \$5{,}250 \); at $0.40 of bot cost per request, \( 1000 \times 0.40 = \$400 \), the net saving is $4,850 for the month.

The **automation rate metric** is the proportion of a process's total volume that is completed by a GenAI system without human intervention, as opposed to merely assisted by it. It is closely related to deflection but is not limited to customer requests: if a system completes 3,800 of 5,000 monthly invoice-coding steps end to end, the automation rate is 76%.

The **first-contact resolution rate** is the proportion of customer inquiries fully resolved during the first interaction, without follow-up contact, whether a human, a GenAI system, or both handled it. Unlike deflection it does not require that a human be excluded, so it is the right metric for an assistant that helps agents. If the share rises from 72% to 75% on 120,000 tickets, first-contact resolutions go from 86,400 to 90,000 and 3,600 fewer follow-up contacts occur. Each follow-up is another unit of work, so this metric also feeds the cost model.

### Quality: Is the Output Any Good?

Speed metrics reward cheap, fast, wrong output. Five quality-side metrics keep that honest. The **quality score metric** is a quantified assessment of GenAI output against defined criteria, produced by human review, automated scoring, or a model accuracy metric. In the example, a reviewer scores 100 sampled replies each week from 1 to 5 against a rubric for accuracy, completeness, and tone. The average is 4.20 at baseline and 4.25 with the assistant, comfortably above a guardrail floor of 4.0 the team set before launch, so cost savings are not buying lower standards.

The **error rate metric** is the proportion of outputs or task attempts that are incorrect, incomplete, or fail defined acceptance criteria. A quality score is graded; an error rate is pass or fail, so it is simpler to audit. In a sample of 500 sent replies, 15 contained a factual error at baseline (3.0%), and 20 do with the assistant (4.0%). The one-point rise is a leading indicator of the next metric, though five extra errors in 500 could be noise, which Chapter 12 shows how to test.

The **rework rate metric** is the proportion of GenAI-assisted outputs that must be corrected, redone, or escalated because quality was unacceptable. It directly consumes labor time and offsets the productivity gain, and it is often the most underestimated cost in naive ROI calculations. Take a rework cost of 10 agent-minutes per reworked ticket. Baseline rework is 8% of tickets; on assisted tickets it is 9%. With 85% adoption and 90% usage coverage, \( 120{,}000 \times 0.85 \times 0.90 = 91{,}800 \) tickets are assisted. The extra rework is one point:

\[
91{,}800 \times 0.01 \times \frac{10}{60} \times \$30 = \$4{,}590
\]

That is 918 extra reworked tickets, or 153 hours, and it removes 10% of the $45,900 the assistant saves at that adoption and coverage. As a working rule in this book, if rework consumes more than a quarter of the claimed saving, restate the benefit net of rework rather than reporting the gross figure.

The following specification lets the learner apply that rule on eight claims.

#### Diagram: Speed Versus Quality Check

<details markdown="1">
<summary>Speed Versus Quality Check</summary>
Type: microsim
**sim-id:** speed-versus-quality-check<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight time-saving claims, whether the claim can be reported as stated or must be restated net of rework, using the rule that rework minutes above 25% of the claimed saving require restatement.

**Prerequisites:** task completion time, rework rate metric, error rate metric, quality score metric, the 25% working rule (all defined in the section "Quality: Is the Output Any Good?" above).

**Evidence of Mastery:** For each of eight claims the learner commits a verdict, "Report as stated" or "Restate net of rework", before the arithmetic is shown. A verdict is correct when it matches the "Correct verdict" column in Content. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A time saving is the benefit regardless of quality. (2) A small rise in rework rate is always negligible. (3) Rework only matters when the rework rate itself is high, ignoring how many minutes each rework costs.

**Instructional Rationale:** Evaluate-level work means judging against a criterion. Committing a verdict before the arithmetic appears makes the learner estimate the size of the rework cost, and the boundary item at exactly 25% forces attention to the comparison rule.

**Content:**

Definitions shown to the learner:

- Claimed saving: minutes saved per assisted ticket before rework.
- Rework increase: the rise in the rework rate on assisted tickets, in percentage points.
- Minutes per rework: agent minutes consumed by one reworked ticket.
- Rework minutes per ticket = rework increase ÷ 100 × minutes per rework.
- Share consumed = rework minutes per ticket ÷ claimed saving.
- Net saving = claimed saving − rework minutes per ticket.

Verdict rule: "Report as stated" when share consumed <= 25%; otherwise "Restate net of rework".

| # | Claimed saving (min) | Rework increase (points) | Minutes per rework | Rework min per ticket | Share consumed | Net saving (min) | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.0 | 1 | 10 | 0.10 | 10.0% | 0.90 | Report as stated | Rework takes 10% of the saving, at or below 25%. |
| 2 | 1.0 | 5 | 10 | 0.50 | 50.0% | 0.50 | Restate net of rework | Half the saving is consumed by rework, which is above 25%. |
| 3 | 2.0 | 4 | 15 | 0.60 | 30.0% | 1.40 | Restate net of rework | The rework rate rise looks small, but 15 minutes per rework makes it 30% of the saving. |
| 4 | 3.0 | 10 | 20 | 2.00 | 66.7% | 1.00 | Restate net of rework | A large saving can still be two-thirds consumed by costly rework. |
| 5 | 1.5 | 2 | 10 | 0.20 | 13.3% | 1.30 | Report as stated | Rework takes 13.3% of the saving, below 25%. |
| 6 | 0.5 | 3 | 10 | 0.30 | 60.0% | 0.20 | Restate net of rework | A small saving is easily consumed by a modest rework increase. |
| 7 | 4.0 | 10 | 10 | 1.00 | 25.0% | 3.00 | Report as stated | The share is exactly 25%, and the rule restates only above 25%. |
| 8 | 1.0 | 10 | 10 | 1.00 | 100.0% | 0.00 | Restate net of rework | Rework consumes the entire saving, so the net saving is zero. |

**Provenance:** The rule and item 1 come from the chapter section "Quality: Is the Output Any Good?"; items 2 to 8 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Rework minutes per ticket = rework increase ÷ 100 × minutes per rework. Share consumed = rework minutes per ticket ÷ claimed saving; a claimed saving of 0 is not reachable within the ranges. Verdict is "Report as stated" when share consumed <= 25%, otherwise "Restate net of rework". Net saving = claimed saving − rework minutes per ticket, shown to two decimals. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Claimed saving | 0.5 | 4.0 | 0.5 | 1.0 | minutes |
| Rework increase | 0 | 10 | 1 | 1 | percentage points |
| Minutes per rework | 5 | 30 | 5 | 10 | minutes |

**Learner Activity:**

1. The learner reads claim 1 with its three inputs and chooses a verdict, then presses Commit.
2. The sim shows rework minutes per ticket, the share consumed, the net saving, and the "Why" text.
3. After eight claims, exploration unlocks: the learner changes the three quantities and watches the share consumed and verdict update.
4. The learner should notice that a small rework-rate rise matters little with a large saving and decides the verdict when the saving is small or each rework is costly.

**Feedback:** Eight claims, fixed order, two attempts each. Correct: "Correct: <verdict>; net saving <value> minutes." Incorrect on the first attempt: the "Why" text without the verdict. After a second wrong attempt the correct verdict is shown and the claim counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Claim 1 is shown with no verdict chosen. The question on screen is "Can this time saving be reported as stated?"

**Chapter Anchors:** The chapter states a rework cost of 10 agent-minutes, a baseline rework rate of 8% and an assisted rate of 9%, a one-point rise, the 25% working rule, and a first claim of 1 minute saved with rework taking 10% of it.
</details>

!!! mascot-tip "Pair Every Speed Metric With a Guardrail"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before launch, write down a floor for quality score or a ceiling for error rate, and review a small weekly sample of 50 to 100 outputs against it. A speed gain reported without its guardrail is half a result.

Two experience metrics complete the quality side. The **customer satisfaction metric** is a quantified measure of external customer sentiment, commonly captured by surveys or a Net Promoter Score, tracked to detect whether GenAI changes improve or harm the customer experience. In the example the survey score is 4.3 out of 5 both before and after, which is what a cost-motivated change should show: no harm.

The **employee satisfaction metric** is a quantified measure of internal staff sentiment toward tools, workload, or working conditions, used to detect whether GenAI is improving morale or adding pressure despite productivity gains. A pulse survey of the 34 active agents finds 27 (79%) agree that the assistant makes their work easier. Satisfaction also has a cost side. If 8 of 40 agents leave each year and replacing one costs $10,000, attrition costs $80,000 a year, so one fewer departure is worth $10,000. The running case counts no such benefit, which keeps it conservative, but a falling satisfaction score among adopters is an early warning of poor adoption or of over-reliance on the tool.

### Software Delivery: Velocity, Lead Time, and Defects

Engineering teams have their own metrics, which we illustrate with a separate team of 20 engineers. The **developer velocity metric** is a composite measure of how quickly a team delivers working software, tracked through indicators such as story points delivered and lead time for changes. It is the primary lens for GenAI's ROI in the software lifecycle, and, being a composite, it has no single formula.

**Story points delivered** is an agile measure of the relative effort or complexity of work a team completes in a period, and one proxy input to velocity. The team averages 80 points per two-week sprint, and 92 after adopting an AI coding assistant, a rise of 15%, or 480 to 552 points over the six sprints in a quarter. Points are subjective estimates, so compare only the same team against its own history and keep the same estimators. If teams are rewarded for points, the points inflate.

**Lead time for changes** is the elapsed time from a code change being committed to its running in production, a standard DevOps performance indicator. It drops from 72 to 54 hours, a 25% reduction. Unlike story points it is measured by the delivery pipeline, so it is harder to game.

**Code review time saved** is the reduction in human engineering hours spent reviewing code changes, attributable to AI-assisted tools and measured against a pre-adoption baseline. The team merges 500 changes a quarter. An automated reviewer cuts human review from 30 to 24 minutes a change, which saves \( 500 \times 6 = 3{,}000 \) minutes, or 50 hours, a quarter. At a loaded rate of $75 an hour that is $3,750 a quarter.

The **defect reduction rate** is the percentage decrease in quality defects produced after introducing a GenAI-assisted process, measured against a baseline period. Count defects per unit of work, not in total, so a busier quarter does not hide a change. Escaped defects fall from 8.0 to 6.0 per 100 merged changes, a 25% reduction, which on 500 changes is from 40 to 30 defects a quarter. At 6 hours to fix each, \( 10 \times 6 \times \$75 = \$4{,}500 \) a quarter.

!!! mascot-warning "Do Not Count the Same Hour Twice"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Review time saved is already inside the shorter lead time and the higher velocity, so adding the dollar value of all three counts one improvement three times. Put dollars on the hard, countable items (review hours and defect fixes) and report velocity and lead time as supporting indicators.

The two hard items give $3,750 + $4,500 = $8,250 a quarter, or $33,000 a year. If the assistant costs $12,000 a year in licences and support, the GenAI ROI metric for the team is \( (33{,}000 - 12{,}000) \div 12{,}000 = 175\% \), a figure that depends entirely on the two measured lines and not on the velocity claims.

With all 21 metrics now defined, the next specification tests whether you can match a situation to the metric it measures.

#### Diagram: Metric Matcher

<details markdown="1">
<summary>Metric Matcher</summary>
Type: microsim
**sim-id:** metric-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of ten described situations under the one metric from a list of eight that the situation measures, with at least 8 of 10 correct on the first attempt.

**Prerequisites:** adoption rate metric, usage frequency metric, task completion time, cycle time reduction, throughput improvement metric, deflection rate metric, first-contact resolution rate, rework rate metric (all defined in the sections "Adoption", "Speed", "Support Outcomes" and "Quality" above).

**Evidence of Mastery:** For each situation the learner chooses one metric and commits. A choice is correct when it matches the "Correct metric" column in Content. Mastery is 8 of 10 correct on the first attempt. Reading the metric definitions is exploration, not evidence.

**Misconceptions:** (1) Adoption rate and usage frequency are the same measure. (2) A task-level time saving equals a process-level cycle time reduction. (3) Deflection and first-contact resolution are interchangeable, but only first-contact resolution allows a human to be involved. (4) Throughput and task time are different data rather than two views of the same change.

**Instructional Rationale:** Classifying real situations under the right label is how an Understand objective is shown. Using near neighbours (adoption against usage, deflection against first-contact resolution, task time against cycle time) forces the learner to apply each definition's boundary.

**Content:**

The eight metrics and their definitions, always visible to the learner:

| Metric | Definition shown |
|---|---|
| Adoption Rate | Active users divided by eligible users. |
| Usage Frequency | How often adopted users engage, measured in queries per active user per week. |
| Task Completion Time | Elapsed time for a user to finish one defined task. |
| Cycle Time Reduction | Percentage decrease in total elapsed time of a whole process, including waiting. |
| Throughput Improvement | Percentage increase in work completed per unit of time. |
| Deflection Rate | Requests fully resolved by automation with no escalation to a human. |
| First-Contact Resolution Rate | Inquiries fully resolved in the first interaction, with or without a human. |
| Rework Rate | Share of assisted outputs that had to be corrected, redone, or escalated. |

| # | Situation shown | Correct metric | Why (shown as feedback) |
|---|---|---|---|
| 1 | 34 of the 40 eligible agents used the assistant at least once in the last 30 days. | Adoption Rate | It is the share of eligible users who are active. |
| 2 | Agents who use the assistant send it 324 queries a week on average, against 360 planned. | Usage Frequency | It measures how often adopted users engage, not how many started. |
| 3 | The average time an agent spends on one ticket fell from 15 to 14 minutes. | Task Completion Time | It is the elapsed time of a single defined task. |
| 4 | A refund runs through intake, review, approval and payment, and its elapsed time fell from 6 days to 5. | Cycle Time Reduction | It is the elapsed time of a whole multi-step process. |
| 5 | Agents now complete 4.29 tickets per working hour, up from 4.00. | Throughput Improvement | It is work completed per unit of time, increased. |
| 6 | The self-service bot resolved 700 of 1,000 requests and none of those customers contacted an agent within three days. | Deflection Rate | Automation resolved the requests with no escalation to a human. |
| 7 | 75% of tickets are fully resolved in the customer's first interaction, with the assistant helping the human agent. | First-Contact Resolution Rate | A human was involved, so it cannot be deflection. |
| 8 | 9% of assisted tickets had to be corrected or reopened. | Rework Rate | It is the share of assisted outputs needing correction. |
| 9 | Ticket open-to-close time fell from 240 to 239 minutes. | Cycle Time Reduction | It covers the whole elapsed time of the ticket, including waiting. |
| 10 | Only 40% of staff who tried the assistant once now use it more than five times a week. | Usage Frequency | It measures continued engagement among those who started. |

**Provenance:** Situations 1, 2, 3, 5, 8 and 9 come from the running example in this chapter; situations 4, 6, 7 and 10 are illustrative values. The sim must label them "illustrative".

**Rules:** Ten items, each with exactly one correct metric. Items 4 and 9 share the correct answer Cycle Time Reduction and items 2 and 10 share Usage Frequency; no metric is the correct answer for more than two items, and Automation Rate and Mean Time To Resolution are not offered. Score is the count of items correct on the first attempt; mastery is >= 8.

**Learner Activity:**

1. The learner reads situation 1 and selects one of the eight metrics, then presses Commit.
2. The sim marks the choice correct or incorrect and shows the "Why" text.
3. The learner continues through all ten situations.
4. At the end the learner sees the full table of situations, correct metrics and reasons, and should notice which near-neighbour pairs caused errors.

**Feedback:** Ten items, fixed order, two attempts each. Correct: "Correct: <metric>. <Why>". Incorrect on the first attempt: "Not quite. <Why>" without naming the answer. After a second wrong attempt the correct metric and the "Why" are shown and the item counts as missed. A running count "Correct on first attempt: n of 10" is shown.

**Starting State:** The eight definitions are visible and situation 1 is shown with nothing selected. The question on screen is "Which metric does this situation measure?"

**Chapter Anchors:** The chapter states 34 of 40 agents adopted, 324 of 360 weekly queries, 15 to 14 minutes, 4.00 to 4.29 tickets per hour, 240 to 239 minutes of cycle time, 9% rework, a 75% first-contact resolution rate, and a deflection rate of 70% for the self-service bot.
</details>

### Assembling the Realized ROI

Now we return to the benefit line. The Chapter 10 plan counted 1 minute on every ticket, with every agent using the tool on every ticket and no rework. Replacing each assumption with its measured value gives the realized benefit. The formula for one year is:

\[
\text{realized benefit} = \frac{T \times m}{60} \times r \times a \times c - \frac{T \times a \times c \times w \times k}{60} \times r
\]

where \( T \) is tickets, \( m \) is minutes saved per ticket, \( r \) is the labor rate of $30 an hour, \( a \) is adoption, \( c \) is usage coverage, \( w \) is the rise in rework rate as a fraction, and \( k \) is minutes per rework. The first term is the gross saving; the second is the rework cost on assisted tickets. For year 1 the steps are:

| Step | Rule | Year 1 benefit |
|------|------|---------------:|
| Plan (Chapter 10) | \( 120{,}000 \times 1 \div 60 \times \$30 \) | $60,000 |
| After 85% adoption | × 0.85 | $51,000 |
| After 90% usage coverage | × 0.90 | $45,900 |
| Less rework cost | 91,800 assisted tickets × 1 point × 10 min | −$4,590 |
| Realized benefit | | $41,310 |

The per-ticket ratios hold in years 2 and 3, when tickets rise to 160,000, so the realized benefits are $55,080 in each of those years. The three-year benefits total \( 41{,}310 + 55{,}080 + 55{,}080 = \$151{,}470 \), against total costs of $160,000, so realized ROI is \( (151{,}470 - 160{,}000) \div 160{,}000 = -5.3\% \), against 37.5% in the plan. The net cash flows become −$60,000, +$11,310, +$20,080 and +$20,080, the NPV at 10% is −$18,037, and the investment does not pay back within three years: the cumulative position at the end of year 3 is still −$8,530. The realized benefit is 68.85% of plan, inside the range between the base and worst cases of Chapter 10.

The table shows how much each lever matters. Each row changes only adoption, usage coverage, and whether rework is counted.

| Adoption | Coverage | Rework counted | Year 1 benefit | 3-year benefits | ROI | NPV at 10% |
|---------:|---------:|:--------------:|---------------:|----------------:|----:|-----------:|
| 100% | 100% | No (plan) | $60,000 | $220,000 | 37.5% | $38,272 |
| 100% | 100% | Yes | $54,000 | $198,000 | 23.8% | $20,195 |
| 85% | 90% | Yes (realized) | $41,310 | $151,470 | −5.3% | −$18,037 |
| 95% | 90% | Yes | $46,170 | $169,290 | 5.8% | −$3,395 |
| 95% | 95% | Yes | $48,735 | $178,695 | 11.7% | $4,333 |

Two lessons follow. First, even perfect adoption cannot restore 37.5% once rework is honestly counted. Second, the 95% and 90% row shows a positive ROI with a negative NPV, because ROI ignores timing and NPV does not. The leverage is in adoption and usage, not in the model, which is why the program's early effort should go to training, workflow fit, and the adoption and usage metrics.

The following specification lets the learner reproduce this calculation and test the levers.

#### Diagram: Benefit Realization Calculator

<details markdown="1">
<summary>Benefit Realization Calculator</summary>
Type: microsim
**sim-id:** benefit-realization-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the year 1 realized benefit and the three-year ROI of the running example from measured adoption, usage coverage, minutes saved, and rework data, to within $1 for dollar values and 0.1 percentage points for ROI.

**Prerequisites:** adoption rate metric, usage frequency metric, rework rate metric, GenAI ROI metric, productivity gain, labor cost savings (all defined in this chapter or in Chapter 10, above this block).

**Evidence of Mastery:** For each of six items the learner types a value before the answer is shown. A value is correct when within $1 of the model value for dollar items, or within 0.1 percentage points for the ROI item. Mastery is 5 of 6 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) Benefit equals tickets times minutes saved times the labor rate, with no adjustment for adoption or usage. (2) Rework can be ignored when the rework rate rises by only one point. (3) A positive ROI always implies a positive NPV.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Walking the benefit from plan to realized in labelled steps shows which factor removes which dollars.

**Content:**

Fixed inputs:

| Quantity | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Tickets | 120,000 | 160,000 | 160,000 |
| Running cost | $30,000 | $35,000 | $35,000 |

Investment at year 0: $60,000. Total three-year cost: $160,000. Labor rate: $30 per hour. Discount rate: 10%.

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Year 1 plan benefit, at 100% adoption and 100% coverage, 1 minute saved | $60,000 | 120,000 × 1 ÷ 60 × 30 = 60,000. |
| 2 | Year 1 benefit after 85% adoption | $51,000 | 60,000 × 0.85 = 51,000. |
| 3 | Year 1 benefit after 85% adoption and 90% coverage | $45,900 | 51,000 × 0.90 = 45,900. |
| 4 | Year 1 rework cost, with 1 point more rework and 10 minutes per rework | $4,590 | Assisted tickets are 120,000 × 0.85 × 0.90 = 91,800; 91,800 × 0.01 × 10 ÷ 60 × 30 = 4,590. |
| 5 | Year 1 realized benefit | $41,310 | 45,900 − 4,590 = 41,310. |
| 6 | Three-year ROI from realized benefits of $41,310, $55,080 and $55,080 | −5.3% | Benefits total 151,470; (151,470 − 160,000) ÷ 160,000 = −0.0533. |

**Provenance:** The data is the running example from this chapter and Chapters 9 and 10; the sim must label it "illustrative". Values are computed from the Rules and rounded to the dollar, or to one decimal for ROI.

**Rules:** Gross benefit = tickets × minutes saved ÷ 60 × labor rate × adoption × coverage. Rework cost = tickets × adoption × coverage × rework increase ÷ 100 × minutes per rework ÷ 60 × labor rate. Realized benefit = gross benefit − rework cost, and may be negative. Years 2 and 3 use 160,000 tickets with the same factors. ROI = (sum of realized benefits − 160,000) ÷ 160,000. NPV = sum of net cash flow ÷ (1.10)^t over t = 0 to 3, with net cash flow = realized benefit − running cost in years 1 to 3 and −60,000 in year 0. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Adoption | 50 | 100 | 5 | 85 | percent |
| Usage coverage | 50 | 100 | 5 | 90 | percent |
| Minutes saved per ticket | 0.5 | 2.0 | 0.5 | 1.0 | minutes |
| Rework increase | 0 | 10 | 1 | 1 | percentage points |
| Minutes per rework | 5 | 30 | 5 | 10 | minutes |

The sim shows year 1 realized benefit, three-year ROI, and NPV, each with a Positive or Negative label.

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After six items, exploration unlocks: the learner changes the five quantities and watches realized benefit, ROI, and NPV update.
4. The learner should notice that adoption and coverage scale the whole benefit, that rework lowers it by a smaller amount, and that ROI and NPV can disagree in sign.

**Feedback:** Six items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What would the year 1 benefit be if everything in the plan came true?"

**Chapter Anchors:** The chapter states a plan benefit of $60,000, $51,000 after adoption, $45,900 after coverage, a rework cost of $4,590, a realized benefit of $41,310, realized benefits of $55,080 in years 2 and 3, a three-year total of $151,470, an ROI of −5.3%, an NPV of −$18,037, and table rows of 23.8% ROI with $20,195 NPV, 5.8% ROI with −$3,395 NPV, and 11.7% ROI with $4,333 NPV.
</details>

### Summary and Quick Check

The GenAI ROI metric is built from a chain of measurements, and each metric guards one link. The table organizes the 21 concepts by the question each answers, with the value from this chapter's examples.

| Question | Metric | Result in the examples |
|----------|--------|-----------------------|
| Who is using it? | Adoption rate; usage frequency | 85%; 324 of 360 queries a week |
| How soon does it pay? | Time-to-value | 6 weeks |
| How much faster is a task? | Task completion time; throughput; cycle time | −6.7%; +7.1%; −0.4% |
| How quickly are incidents closed? | Mean time to resolution | 90 to 70 minutes |
| Does it avoid human work? | Deflection; automation; first-contact resolution | 70%; 76%; 72% to 75% |
| Is the output good? | Quality score; error rate; rework rate | 4.25; 4.0%; 9% |
| How do people feel? | Customer and employee satisfaction | 4.3 of 5; 79% agree |
| How is software delivered? | Velocity, story points, lead time, review time, defects | +15%; 80 to 92; 72 to 54 hours; 50 hours; −25% |

Adoption and usage determine how much of the planned benefit can exist, speed metrics measure what happens when it is used, and quality metrics subtract the cost of errors and rework. Measured this way, the support assistant's 37.5% planned ROI becomes −5.3%. That is not a verdict against the investment but a map of where to work. The baselines, control groups, and significance tests that make these measurements trustworthy are the subject of Chapter 12.

??? note "Quick check: why is task completion time down 6.7% while cycle time is down only 0.4%? - Click to expand"
    Task completion time measures only the 15 minutes an agent spends on the ticket, while cycle time includes the 225 minutes of waiting. A one-minute saving is a large share of the first and a tiny share of the second.

??? note "Quick check: why does the realized ROI fall from 37.5% to −5.3%? - Click to expand"
    The plan assumed all 40 agents used the assistant on every ticket and that quality was unchanged. Measured adoption of 85%, usage coverage of 90%, and a one-point rise in rework each remove part of the benefit, and together they leave 68.85% of the planned amount.

!!! mascot-celebration "You Can Rebuild a Benefit From Evidence"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now match a claim to adoption, speed, resolution, quality, or delivery metrics, and turn measured usage and rework into a realized ROI that finance can check. That is how a forecast becomes evidence.
