---
title: Business Case Development and Financial Forecasting
description: Unit economics, benefit categories, baselines and counterfactuals, forecasting, and the appraisal, sensitivity, and scenario techniques used to build and defend a GenAI business case.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 17:40:00
version: 1.11
---

# Business Case Development and Financial Forecasting

## Summary

Extends financial fundamentals into unit economics, business-case development, investment appraisal, and the forecasting techniques used to project financial outcomes. This chapter covers 22 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Cost Per Transaction | 1 |
| Cost Per User | 167 |
| Cost Per Query | 166 |
| Cost Avoidance | 165 |
| Cost Reduction Vs Avoidance | 164 |
| Revenue Impact | 163 |
| Productivity Gain | 162 |
| Labor Cost Savings | 1 |
| Financial Statement Basics | 120 |
| Income Statement | 65 |
| Balance Sheet Basics | 1 |
| Budget Cycle | 63 |
| Business Case | 62 |
| Investment Appraisal | 1 |
| Hurdle Rate | 60 |
| Risk-Adjusted Return | 59 |
| Sensitivity Analysis | 58 |
| Scenario Analysis | 55 |
| Financial Forecasting | 32 |
| Baseline Cost Model | 31 |
| Counterfactual Cost Estimate | 2 |
| Financial KPI | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)

---

Chapter 9 gave you the vocabulary and applied it to one initiative: a generative AI assistant that drafts replies for support agents, with a $60,000 investment, net cash flows of +$30,000, +$45,000 and +$45,000, a 10% discount rate, an NPV of $38,272, and an ROI of 37.5%. A finance leader will now press on exactly where those numbers came from: where the benefit figure came from, how the baseline was measured, how confident you are, and what happens if you are wrong. This chapter builds the case so that it survives those questions. It continues with the same example, adding the operating data behind it.

!!! mascot-welcome "Numbers That Survive the Meeting"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A business case is not a spreadsheet; it is a set of numbers you can defend line by line. By the end of this chapter you can show where each number came from, how it moves when assumptions change, and what you would still recommend if you are wrong by 20%. Every token counts, and every assumption gets tested.

### Where the Money Shows Up: Financial Statements and the Budget Cycle

Finance teams judge an initiative partly by how it appears in their reports, so you need a working picture of two of them. **Financial statement basics** means knowing the two principal reports. The **income statement** summarizes revenues, expenses, and the resulting profit or loss over a period, such as a quarter or a year. The **balance sheet** reports assets, liabilities, and equity at a single date, and the balance sheet basics to remember are that it is a snapshot, not a flow. Operating expenditure goes straight to the income statement in the period it is incurred. Capital expenditure is recorded first as an asset on the balance sheet and reaches the income statement gradually, through the depreciation or amortization of Chapter 9.

The running example's $60,000 investment, if capitalized and amortized over three years, shows the difference between cash and accounting profit:

| Year | Benefit | Running cost | Amortization | Effect on operating profit | Asset on balance sheet at year end |
|-----:|--------:|-------------:|-------------:|---------------------------:|-----------------------------------:|
| 0 | $0 | $0 | $0 | $0 | $60,000 |
| 1 | $60,000 | $30,000 | $20,000 | +$10,000 | $40,000 |
| 2 | $80,000 | $35,000 | $20,000 | +$25,000 | $20,000 |
| 3 | $80,000 | $35,000 | $20,000 | +$25,000 | $0 |

The profit effects total $60,000, the same as the net cash flows, but the timing differs: year 0 shows no profit effect although $60,000 of cash left, and year 1 shows $10,000 although the cash flow was $30,000. If the investment were instead expensed at once, year 0 would show a $60,000 hit. Knowing this tells you which view your finance partner is looking at when they question a figure.

The **budget cycle** is the recurring, usually annual or quarterly, process of planning, approving, and reviewing spending. A business case timed to the cycle competes for funding along with every other request; one that arrives after the budget is set must wait for the next cycle or draw on a contingency fund that is usually small. Ask your finance partner for the calendar before you start writing, not after you finish.

### Unit Measures: Cost Per Query, Transaction, and User

Totals hide whether a system is getting more or less efficient, so finance leaders convert them to per-unit measures (Chapter 9 introduced unit economics). Three matter most. **Cost per query** is total token and infrastructure cost divided by the number of queries processed, a very granular measure. **Cost per transaction** is the average total cost to complete one business transaction, such as a resolved support ticket, and is the usual way to compare an automated process with a manual one. **Cost per user** is total cost divided by the number of distinct users of a feature, and normalizes by people rather than requests.

The running example's operating data: in year 1 the 40 agents handle 120,000 tickets, averaging 6 assistant queries per ticket, or 720,000 queries; in year 2 volume grows to 160,000 tickets and 960,000 queries with the same 40 agents. Total running cost is $30,000 in year 1 and $35,000 in year 2, of which token and platform fees are $18,000 and $22,000.

| Measure | Year 1 | Year 2 |
|---------|-------:|-------:|
| Cost per transaction (ticket) | $30,000 ÷ 120,000 = $0.250 | $35,000 ÷ 160,000 = $0.219 |
| Cost per query, fully loaded | $30,000 ÷ 720,000 = $0.0417 | $35,000 ÷ 960,000 = $0.0365 |
| Cost per query, fees only | $18,000 ÷ 720,000 = $0.0250 | $22,000 ÷ 960,000 = $0.0229 |
| Cost per user (agent per year) | $30,000 ÷ 40 = $750 | $35,000 ÷ 40 = $875 |

The table shows two lessons. Cost per query and per ticket fall as volume grows, because fixed costs spread over more units, while cost per user rises, because the total grew and the number of users did not. And the fees-only query cost is only roughly 60% of the fully loaded one, so quoting it as "the" cost per query understates the cost that finance will compare against.

These measures become **financial KPIs** when you track them over time: key performance indicators expressed in money or financial ratios, such as cost per ticket or ROI, as opposed to operational ones such as latency. A cost-per-ticket target of $0.25 or below, reviewed monthly, gives you an early signal long before the annual review.

#### Diagram: Unit Cost Metrics Calculator

<iframe src="../../sims/unit-cost-metrics-calculator/main.html" width="100%" height="462px" scrolling="no"></iframe>

<details markdown="1">
<summary>Unit Cost Metrics Calculator</summary>
Type: microsim
**sim-id:** unit-cost-metrics-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate cost per transaction, cost per query, and cost per user from the running example's operating data, distinguishing fully loaded cost from fees only.

**Prerequisites:** cost per query, cost per transaction, cost per user, financial KPI, fully loaded cost (all defined in the section "Unit Measures" above).

**Evidence of Mastery:** For each of five items the learner types a value before the answer is shown. A value is correct when within $0.0005 of the model value for per-ticket and per-query items and within $1 for the per-user item. Mastery is 4 of 5 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Fees-only cost equals the full cost per query. (2) Cost per user falls whenever cost per ticket falls. (3) Cost per query and cost per transaction are interchangeable.

**Instructional Rationale:** Apply-level calculation needs a procedure and a check. Placing fees-only and fully loaded items side by side makes the denominator and numerator choices explicit.

**Content:**

| | Year 1 | Year 2 |
|---|---|---|
| Tickets | 120,000 | 160,000 |
| Queries | 720,000 | 960,000 |
| Agents (users) | 40 | 40 |
| Total running cost | $30,000 | $35,000 |
| Token and platform fees | $18,000 | $22,000 |

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Year 1 cost per ticket | $0.2500 | 30,000 ÷ 120,000. |
| 2 | Year 1 cost per query, fully loaded | $0.0417 | 30,000 ÷ 720,000 = 0.04167, using total running cost. |
| 3 | Year 2 cost per query, fully loaded | $0.0365 | 35,000 ÷ 960,000 = 0.03646. |
| 4 | Year 2 cost per query, fees only | $0.0229 | 22,000 ÷ 960,000 = 0.02292; this leaves out maintenance and governance cost. |
| 5 | Year 2 cost per user (per agent per year) | $875 | 35,000 ÷ 40. |

**Provenance:** The data is the chapter's running example; the sim must label it "illustrative". Values are computed from the Rules and rounded to four decimals (per-ticket and per-query) or the dollar (per user).

**Rules:** Cost per ticket = total running cost ÷ tickets. Cost per query = cost ÷ queries, using total running cost for "fully loaded" and token and platform fees for "fees only". Cost per user = total running cost ÷ users. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tickets | 80,000 | 240,000 | 20,000 | 120,000 | tickets |
| Queries per ticket | 2 | 10 | 1 | 6 | queries |
| Agents | 20 | 80 | 10 | 40 | users |
| Total running cost | 20,000 | 60,000 | 5,000 | 30,000 | USD |

Queries = tickets × queries per ticket. A denominator of 0 is not reachable within the ranges.

**Learner Activity:**

1. The learner reads the data table and the first item, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After five items, exploration unlocks: the learner changes the four quantities and watches the three unit measures update.
4. The learner should notice that raising tickets lowers cost per ticket and cost per query but leaves cost per user unchanged.

**Feedback:** Five items, fixed order, two attempts each. Correct: "Correct: $<value>." Incorrect first attempt: the "Why" text. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 5" is shown.

**Starting State:** The data table is shown and item 1 has an empty answer box. The question on screen is "What did each ticket cost to handle with the assistant in year 1?"

**Chapter Anchors:** The chapter states 120,000 and 160,000 tickets, 720,000 and 960,000 queries, 40 agents, running costs of $30,000 and $35,000, fees of $18,000 and $22,000, and unit costs of $0.250, $0.219, $0.0417, $0.0365, $0.0250, $0.0229, $750 and $875.
</details>

### What the Benefit Is Really Made Of

The most common weak point in a business case is the benefit line, so it deserves a precise breakdown. A **productivity gain** is an improvement in output per unit of employee time from a GenAI tool. In the example, the assistant saves 1 minute of a 15-minute ticket, making agents about 6.7% faster. **Labor cost savings** convert that gain to money: hours saved multiplied by a fully loaded labor rate (salary plus benefits and overhead). In year 1: 120,000 tickets × 1 minute = 2,000 hours, and 2,000 × $30 per hour = $60,000, the year 1 benefit. In year 2, 160,000 tickets × 1 minute = 160,000 minutes, or about 2,667 hours, and 2,667 × $30 comes to $80,000 (rounded).

!!! mascot-warning "Saved Time Is Not Banked Money"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Two thousand hours across 40 agents is 50 hours each, about one working week a year, spread in one-minute slices that cannot be sold or laid off. The labor saving counts as money only if the time shows up as reduced spend or redeployed output, so write down which one and who confirms it.

Savings come in two kinds that finance teams treat differently. A **cost reduction** lowers an expense you are currently paying. **Cost avoidance** prevents an expense that would otherwise have occurred in the future, and is measured against a counterfactual rather than a historical actual. **Cost reduction versus avoidance** is the distinction between them, and it matters because reductions can be seen in the ledger while avoidance must be argued. Suppose the year 1 benefit splits as follows:

| Benefit | Hours | Value | Kind | Evidence a reviewer will want |
|---------|------:|------:|------|-------------------------------|
| Contractor overtime no longer paid | 500 | $15,000 | Cost reduction | Overtime payments fall against last year's actual |
| Temporary staff not hired to absorb growth | 1,500 | $45,000 | Cost avoidance | A documented hiring plan that would have happened without the assistant |
| **Total** | **2,000** | **$60,000** | | |

Report them in separate lines. Both are legitimate benefits, but the first is verifiable in the ledger and the second rests on a claim about what would have happened, which brings us to counterfactuals below.

A third category, **revenue impact**, is the change in top-line revenue attributable to the initiative, such as better retention or conversion. It is the hardest to attribute and is usually measured with a control group (Chapter 12). It also needs converting to profit: if faster replies kept an extra 0.5% of 20,000 customers, that is 100 customers; at $400 a year each, $40,000 of revenue, and at a 30% margin only $12,000 of profit. The running example counts no revenue impact, which makes its case conservative.

### The Baseline and the Counterfactual

Every saving is a difference from something, and that something must be written down before the initiative starts. A **baseline cost model** is a documented representation of current costs before the initiative, against which savings are measured. In the example, handling a ticket takes 15 minutes at $30 an hour, so the baseline labor cost is $7.50 a ticket, or $900,000 across 120,000 tickets. With the assistant, labor falls to $7.00 and the assistant adds $0.25, so the cost per ticket goes from $7.50 to $7.25, a 3.3% drop.

A **counterfactual cost estimate** is an estimate of what would have happened without the initiative, used to isolate its true effect from other changes. It matters most when conditions change. In year 2, volume grows to 160,000 tickets. With no assistant, the labor cost would have grown with it, to 160,000 × $7.50 = $1,200,000, not stayed at the year 1 actual of $900,000. If you compared year 2 actuals against year 1, the $300,000 growth would hide part of the saving and might wrongly look like an overrun. The savings must be measured against the $1,200,000 counterfactual.

!!! mascot-thinking "Compare Against What Would Have Happened"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A saving is never a number you can look up; it is the gap between two numbers, and one of them, the counterfactual, is an estimate. Notice that the credibility of the whole case rests on how carefully that estimate is built and documented.

### Forecasting the Numbers Forward

**Financial forecasting** is projecting future costs, revenues, or usage from historical data, trends, and assumptions. It differs from the baseline model, which describes the present. Two approaches serve most GenAI cases. A trend forecast extends past values forward, which is quick but fails when something changes. A driver-based forecast models cost from the quantities that cause it, which keeps the assumptions visible and challengeable.

The running example's fees follow a driver model: a fixed $6,000 a year of platform fees plus $1 for every 60 queries (about $0.0167 per query). That reproduces year 1 (720,000 ÷ 60 = $12,000, plus $6,000 = $18,000) and year 2 (960,000 ÷ 60 = $16,000, plus $6,000 = $22,000). If tickets grow to 200,000 in year 4, queries are 1,200,000, and the model forecasts fees of $20,000 + $6,000 = $26,000. The forecast is only as good as its drivers, so the discipline is to state them, record their source, and revisit the forecast each budget cycle against actuals.

### Appraising the Investment

**Investment appraisal** is the discipline of deciding whether an investment is financially worthwhile using NPV, payback, and IRR (Chapter 9). The organization's **hurdle rate** is the minimum return it requires before approving an investment, often set above its cost of capital to allow for risk. An initiative's IRR must exceed it. If the hurdle is 15%, the running example's IRR of about 41% clears it, and its NPV at 15% is $29,702.

A single set of estimates is a promise, not a forecast. **Risk-adjusted return** modifies a return to reflect the uncertainty of achieving it, typically by raising the discount rate for riskier projects or by discounting the benefits themselves. Using a 25% rate in place of 10% for a first deployment of an unproven tool gives an NPV of $15,840, which is still positive.

Two techniques show how much the answer depends on the assumptions. **Sensitivity analysis** varies one input at a time to see how much the result changes and which assumptions matter most. For the running example at 10%, with each input moved in the adverse direction:

| Change (one at a time) | NPV | Change from base ($38,272) |
|------------------------|----:|---------------------------:|
| Benefits 20% lower | $2,119 | −$36,153 |
| Running costs 20% higher | $21,773 | −$16,499 |
| Investment 20% higher | $26,272 | −$12,000 |
| Discount rate 5 points higher (15%) | $29,702 | −$8,570 |

The benefit assumption dominates: a 20% shortfall in benefits removes about 94% of the NPV, while no single cost change comes close. That tells you where to spend your validation effort. Combinations are worse: a 20% benefit shortfall measured at a 15% hurdle gives an NPV of −$3,352, and the IRR of the shortfall case is only 11.8%, below a 15% hurdle.

**Scenario analysis** instead evaluates a model under several internally consistent sets of assumptions, such as best, base, and worst case, where several inputs move together as they would in reality. Here the worst case is slow adoption: benefits at 60% of plan and running costs 10% higher. The best case has benefits 20% above plan.

| Scenario | Year 1 net | Year 2 net | Year 3 net | NPV at 10% | Probability |
|----------|-----------:|-----------:|-----------:|-----------:|------------:|
| Worst | $3,000 | $9,500 | $9,500 | −$42,284 | 25% |
| Base | $30,000 | $45,000 | $45,000 | $38,272 | 50% |
| Best | $42,000 | $61,000 | $61,000 | $74,425 | 25% |

Weighting each NPV by its probability gives an expected NPV of $27,171, also a form of risk adjustment. The range from −$42,284 to +$74,425 is the more honest message for a decision maker than the single base-case number.

!!! mascot-encourage "Sensitivity and Scenario Are Two Different Questions"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the two techniques blur together, remember the split: sensitivity moves one assumption to find which matters most, while scenario moves a consistent set together to see what could really happen. Run both, and the weak points of your case show themselves.

#### Diagram: Sensitivity Tornado Ranker

<iframe src="../../sims/sensitivity-tornado-ranker/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sensitivity Tornado Ranker</summary>
Type: chart
**sim-id:** sensitivity-tornado-ranker<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate which of four input changes reduces the running-example NPV the most, by ranking them from most to least damaging, and will predict whether a combined change makes the NPV negative.

**Prerequisites:** sensitivity analysis, scenario analysis, NPV, hurdle rate (all defined in the section "Appraising the Investment" above).

**Evidence of Mastery:** The learner commits (1) a ranking of the four adverse changes from largest to smallest NPV reduction and (2) a prediction of Positive or Negative for the combined change "benefits 20% lower at a 15% discount rate", both before the chart is revealed. Part 1 is correct when the order matches the "Correct rank" column; part 2 is correct when it matches the model sign. Mastery is both parts correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Costs matter more than benefits in an ROI case. (2) A project that stays positive under each change alone stays positive under a combination. (3) The discount rate is the most influential assumption.

**Instructional Rationale:** Analyze-level work means finding which part of a structure drives the result. Committing a ranking first exposes the learner's intuition about costs versus benefits, and the combination prediction shows why single-input tests are not enough.

**Content:**

Base NPV at 10%: $38,272. Base flows: year 0 −$60,000, year 1 +$30,000, year 2 +$45,000, year 3 +$45,000 (benefits $60,000, $80,000, $80,000; running costs $30,000, $35,000, $35,000; investment $60,000).

| Change | NPV after change | NPV reduction | Correct rank | Why (shown as feedback) |
|---|---|---|---|---|
| Benefits 20% lower | $2,119 | $36,153 | 1 | Benefits are the largest cash line, so a 20% change moves the NPV most. |
| Running costs 20% higher | $21,773 | $16,499 | 2 | Running costs are smaller than benefits, so the same percentage moves the NPV less. |
| Investment 20% higher | $26,272 | $12,000 | 3 | The investment is paid at year 0 and is not discounted, but it is the smallest line. |
| Discount rate 5 points higher (15%) | $29,702 | $8,570 | 4 | Discounting shrinks later cash flows, but 5 points changes them by less than a 20% change in the cash lines. |

Combination for part 2: benefits 20% lower at a 15% discount rate gives NPV −$3,352 (Negative).

**Provenance:** Computed from the running example in the chapter; the sim must label the data "illustrative". Values are computed from the Rules and rounded to the dollar.

**Rules:** NPV = sum of net cash flow ÷ (1 + rate)^t over years 0 to 3, where net cash flow = benefit − running cost in years 1 to 3, and −investment in year 0. A percentage change multiplies the named line. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Benefit change | −40 | 40 | 10 | 0 | percent |
| Running cost change | −40 | 40 | 10 | 0 | percent |
| Investment change | −40 | 40 | 10 | 0 | percent |
| Discount rate | 5 | 30 | 5 | 10 | percent |

NPV is shown with a Positive or Negative label and the IRR of the resulting flows.

**Learner Activity:**

1. The learner orders the four adverse changes from most to least damaging and predicts the sign of the combined case.
2. The learner presses Commit. The sim draws a tornado chart of the four NPV reductions and reveals the combined NPV, with the "Why" text for each rank.
3. Exploration unlocks: the learner changes the four quantities and watches the NPV and IRR update.
4. The learner should notice that benefits and costs move the NPV in opposite directions, and that benefits dominate.

**Feedback:** One commitment (first attempt) is scored for evidence; a practice retry is allowed afterward. Correct: "Correct order." Incorrect: the "Why" text for every item in the wrong position. The combination is explained with the NPV value. A score "Part 1: correct or incorrect; part 2: correct or incorrect" is shown.

**Starting State:** The four changes are listed unordered, with the base NPV of $38,272 shown. The question on screen is "Which change hurts the NPV most? Rank them, then predict the sign of the combined case."

**Chapter Anchors:** The chapter states a base NPV of $38,272, adverse-change NPVs of $2,119, $21,773, $26,272 and $29,702, reductions of $36,153, $16,499, $12,000 and $8,570, a combined NPV of −$3,352, and an IRR of 11.8% for the benefit shortfall.
</details>

### Assembling the Business Case

A **business case** is a structured document presenting the rationale, expected costs, expected benefits, and risks of a proposed investment, used to justify a funding decision. It packages everything in this chapter and the last. The outline below is the order in which a finance reviewer expects to read it.

| Section | Contents | Running-example content |
|---------|----------|-------------------------|
| Problem and options | The need and the alternatives, including doing nothing | Support cost per ticket is $7.50; alternatives are hiring or no change |
| Baseline | Current costs and the counterfactual | $7.50 per ticket; $1,200,000 counterfactual in year 2 |
| Costs | TCO with every component | $160,000 over three years |
| Benefits | Itemized, reductions and avoidance separate, revenue excluded or flagged | $220,000; $15,000 reduction and $45,000 avoidance in year 1 |
| Appraisal | NPV, IRR, payback against the hurdle rate | NPV $38,272, IRR about 41%, payback 20 months, hurdle 15% |
| Risk | Sensitivity, scenarios, risk-adjusted view | Benefit shortfall of 20% fails a 15% hurdle |
| Recommendation and ask | A decision, a size, and a timing aligned to the budget cycle | Fund $60,000 now, gated on measured benefit |

!!! mascot-tip "Turn the Weakest Assumption Into a Gate"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The sensitivity table told us benefits are the assumption that can sink the case. Propose releasing the money in stages, with the next tranche tied to a measured benefit (for example hours saved per ticket) after the first quarter, so the approval does not rest on a forecast alone.

### Summary and Quick Check

A credible business case starts with how costs reach the income statement and balance sheet and when funding is available. It states unit costs fully loaded, breaks the benefit into productivity, cost reduction, cost avoidance, and revenue (with revenue converted to profit), and measures every saving from a documented baseline and a counterfactual. It forecasts from visible drivers, appraises with NPV, IRR, and payback against the hurdle rate, and tests the result with sensitivity and scenario analysis so the decision maker sees the range, not a single number. Chapter 11 turns to the productivity and quality metrics that supply the benefit figures this case depends on.

??? note "Quick check: why is the counterfactual cost, not last year's actual, the right comparison for year 2? - Click to expand"
    Because volume grew. Without the assistant, year 2 would have cost more than year 1 simply because there were more tickets. Comparing against last year's actual would hide part of the saving, or make growth look like an overrun, while the counterfactual isolates the assistant's own effect.

??? note "Quick check: what does sensitivity analysis show that scenario analysis does not? - Click to expand"
    Sensitivity analysis varies one assumption at a time, so it ranks which input matters most. Scenario analysis moves several assumptions together in a consistent story, so it shows the plausible range of outcomes but does not isolate which single input drives them.

!!! mascot-celebration "You Can Build and Stress-Test a Business Case"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compute unit costs, split a benefit into its real components, set a baseline and counterfactual, forecast from drivers, and show finance how the NPV moves when you are wrong. That completes the financial toolkit; the next chapters supply the evidence that feeds it.
