---
title: Data Visualization and Storytelling for Financial Audiences
description: How to choose and design the charts and tables of an executive ROI report, from bars and lines to waterfall, sensitivity, and scenario exhibits, with the labeling, color, and sourcing rules that make a number checkable.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:25:26
version: 1.11
---

# Data Visualization and Storytelling for Financial Audiences

## Summary

Covers chart selection and design for financial data — bar, line, waterfall, sensitivity, and scenario visualizations — built for a non-technical audience. This chapter covers 13 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Data Visualization Principles | 37 |
| Chart Type Selection | 1 |
| Bar Chart For Cost Comparison | 35 |
| Line Chart For Trend Analysis | 34 |
| Waterfall Cost Breakdown Chart | 33 |
| Cost Driver Tree Diagram | 1 |
| Sensitivity Analysis Chart | 31 |
| Scenario Comparison Table | 30 |
| Dashboard Mockup For Report | 1 |
| Color Use In Financial Charts | 1 |
| Chart Labeling Best Practice | 27 |
| Data Table Design | 26 |
| Footnote And Source Citation | 25 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)
- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 12: Measurement Rigor and KPI Reporting](../12-measurement-rigor-kpi-reporting/index.md)
- [Chapter 25: Designing the Executive ROI Report](../25-designing-executive-roi-report/index.md)

---

Chapter 25 named an exhibit for each finding of the Year-2 ROI Review. This chapter builds those exhibits: a bar chart of the vendor totals, a line chart of the cash position, a waterfall from the plan to the risk-adjusted result, a sensitivity chart, a scenario table, and the labels, colors, and sources that make each one checkable. The data are those of the support assistant, from Chapters 9 to 24, and they are illustrative. The specifications here describe the charts in terms of what the reader must be able to do with them, and the finished interactive versions are built from those specifications.

!!! mascot-welcome "A Chart Is an Argument With the Words Taken Out"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A well-chosen chart lets a CFO see in five seconds what a paragraph needs a minute to say, and a badly chosen one makes the same numbers look like a different result. By the end of this chapter you can pick the right chart for a question, build the assistant's bridge, and check each exhibit for the flaws that cost credibility. Every token counts, and so does every pixel of ink.

### Principles and Choosing a Chart

The **data visualization principles** are the few rules that decide whether a chart informs or misleads. Four of them cover most financial work.

1. **One message per chart.** The title says what the reader should conclude, and every element either supports the message or is removed.
2. **Honest scale.** Bars start at zero, because their length is the value. A line may start elsewhere, because its slope is the message, and the axis then says so.
3. **Direct comparison.** Things to be compared share a baseline and a scale, so the eye compares lengths along one line, which people judge more accurately than areas or angles.
4. **Order that helps.** Sort categories by value unless they have a natural order such as time.

The **chart type selection** is the choice of chart from the question being asked, not from what the software offers. Before drawing, write the question and the comparison it needs. The table summarizes the choices for this program.

| Question | Chart | Example |
|----------|-------|---------|
| How do the totals of several options compare? | Bar chart | Annual total cost of vendors A to D |
| How does a measure change over time? | Line chart | Cumulative cash position over four years |
| How does one number become another? | Waterfall chart | Plan net to risk-adjusted net |
| Which input matters most? | Sensitivity chart | Effect of each assumption on the net |
| How do cases compare on several measures? | Scenario table | Plan, realized, and risk-adjusted results |
| Where does a total come from, in layers? | Cost driver tree | The $104,697 cost by driver |

The first specification lets the learner choose among them.

#### Diagram: Chart Type Selector

<details markdown="1">
<summary>Chart Type Selector</summary>
Type: microsim
**sim-id:** chart-type-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of eight questions about the assistant, the chart type that answers it best from bar, line, waterfall, sensitivity, scenario table, and cost driver tree.

**Prerequisites:** chart type selection, data visualization principles (defined in the section "Principles and Choosing a Chart" above).

**Evidence of Mastery:** For each of eight questions the learner commits one chart type before the answer is shown. A choice is correct when it matches the correct type in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The most elaborate chart is the best one. (2) A line chart suits any comparison. (3) Any question about a total needs a bar chart.

**Instructional Rationale:** Evaluate-level work picks the best of several options against a criterion. Questions that sound alike, such as two about the same data over time and over options, make the learner identify the comparison being asked for.

**Content:**

Chart types: Bar compares totals across options. Line shows change over time. Waterfall shows the steps from one number to another. Sensitivity shows which input moves a result most. Scenario table compares cases on several measures. Cost driver tree shows a total broken into the layers that make it up.

| # | Question shown to the learner | Correct type | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which of vendors A, B, C, and D has the lowest annual total cost? | Bar | It compares totals across options. |
| 2 | How have monthly queries moved over twelve months? | Line | It shows change over time. |
| 3 | How does the planned year-2 net of $45,000 become -$49,617? | Waterfall | It shows the steps from one number to another. |
| 4 | Which assumption moves the year-2 net the most? | Sensitivity | It asks which input matters most. |
| 5 | How do the plan, realized, and risk-adjusted cases compare on cost, benefit, ROI, and NPV? | Scenario table | It compares cases on several measures. |
| 6 | Where do the $104,697 of risk-adjusted cost come from, by layer? | Cost driver tree | It breaks a total into layers. |
| 7 | How does the cumulative cash position of the plan and realized cases move over four years? | Line | It shows change over time for two cases. |
| 8 | How do the three-year costs of options A to D compare? | Bar | It compares totals across options. |

**Provenance:** All questions and figures come from this chapter and Chapters 10, 11, 19, 22, and 24. The sim must label all data "illustrative".

**Rules:** Each question has exactly one correct type, the one that matches the comparison asked for. No question takes two types.

**Learner Activity:**

1. The learner reads question 1, chooses one of the six chart types, and presses Commit.
2. The sim shows the correct type and the "Why" text.
3. After eight questions, exploration unlocks: the learner selects any chart type and sees which of the eight questions it answers.
4. The learner should notice that questions 1 and 8 take the same chart type and questions 2 and 7 do too.

**Feedback:** Eight questions, fixed order, two attempts each. Correct: "Correct: <type>." Incorrect on the first attempt: the "Why" text without the type. After a second wrong attempt the type is shown and the question counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Question 1 is shown with no choice made. The question on screen is "Which chart answers this question best?"

**Chapter Anchors:** The chapter states a planned year-2 net of $45,000 and a risk-adjusted net of -$49,617, a risk-adjusted cost of $104,697, and six chart types for six questions.
</details>

### Comparing and Trending

The **bar chart for cost comparison** shows the totals of several options as bars of equal width whose lengths are the values. Its rule is a zero baseline, since the eye reads length as quantity. Take the annual totals of Chapter 19: A $58,680, B $76,776, C $59,083, and D $111,360. B is \( 76{,}776 \div 58{,}680 = 1.31 \) times A. If the axis starts at $50,000, the bars are 8,680 and 26,776 tall, and B looks \( 26{,}776 \div 8{,}680 = 3.1 \) times A. The data are the same and the impression is wrong by a factor of 2.4. Sort the bars from low to high, label the value at the end of each bar, and, when the question is where the total comes from, split each bar into its layers of fees, support, integration, and wrong answers.

The **line chart for trend analysis** shows how a measure moves over an ordered axis, usually time, with points joined because the order matters. Use it for the cumulative cash position of the three cases, which gives four points for each case.

| Year | Plan | Realized | Risk-adjusted |
|-----:|-----:|---------:|--------------:|
| 0 | -$60,000 | -$60,000 | -$60,000 |
| 1 | -$30,000 | -$48,690 | -$150,247 |
| 2 | $15,000 | -$28,610 | -$199,864 |
| 3 | $60,000 | -$8,530 | -$251,821 |

Three lines are the working limit for an executive page. Draw a reference line at zero, label each line at its right end instead of in a legend, and keep one scale for all three. The chart tells the story at a glance: the plan crosses zero in year 2, the realized case approaches it by year 3 and does not reach it, and the risk-adjusted case falls away. A line suits categories poorly, so do not use one to join the four vendors.

### Showing How the Number Moves

The **waterfall cost breakdown chart** shows the steps by which one total becomes another, as floating bars that start where the last one stopped. It is the right chart for a bridge. The bridge from the planned year-2 net to the risk-adjusted one, in the order in which the report explains it, has seven steps.

| Step | Change | Running net |
|------|-------:|------------:|
| Plan, year 2 | | $45,000 |
| Adoption 85% and coverage 90% | -$18,800 | $26,200 |
| Rework | -$6,120 | $20,080 |
| Retraining | -$5,400 | $14,680 |
| Change management | -$2,160 | $12,520 |
| Controls | -$29,288 | -$16,768 |
| Mitigations | -$5,588 | -$22,356 |
| Expected residual loss | -$27,261 | -$49,617 |

The drops total \( 18{,}800 + 6{,}120 + 5{,}400 + 2{,}160 + 29{,}288 + 5{,}588 + 27{,}261 = \$94{,}617 \), which is \( 45{,}000 + 49{,}617 \). The largest single step is the controls, at $29,288, and the chart should make that the thing the eye finds. Show the start and end as full bars from zero, the steps as floating bars, and the running total as a label where the sign changes, between controls and the previous step, because that is where the net goes negative. The second specification lets the learner build the running totals.

#### Diagram: Waterfall Bridge Builder

<details markdown="1">
<summary>Waterfall Bridge Builder</summary>
Type: chart
**sim-id:** waterfall-bridge-builder<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the running net after each step of the bridge from the planned year-2 net to the risk-adjusted net, and the total of the drops, to within the tolerance stated for each item.

**Prerequisites:** waterfall cost breakdown chart, risk-adjusted cost model (defined in this chapter and in Chapter 22).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The steps of a bridge can be listed in any order without changing the story. (2) The end of a waterfall is the sum of the drops. (3) The largest bar is the last one.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Building each running total by hand shows the learner why each floating bar starts where the previous one stopped, and the exploration shows how the end point moves when a step changes.

**Content:**

Fixed inputs: plan net $45,000. Steps in order: adoption and coverage, rework, retraining $5,400, change management $2,160, controls $29,288, mitigations $5,588, expected residual loss $27,261. At adoption 85% and coverage 90%, the benefit falls from $80,000 to $61,200 and rework costs $6,120.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Running net after adoption and coverage | $26,200 | 1 | 45,000 − (80,000 − 61,200) = 26,200. |
| 2 | Running net after rework | $20,080 | 1 | 26,200 − 6,120 = 20,080. |
| 3 | Running net after retraining | $14,680 | 1 | 20,080 − 5,400 = 14,680. |
| 4 | Running net after change management | $12,520 | 1 | 14,680 − 2,160 = 12,520. |
| 5 | Running net after controls | -$16,768 | 1 | 12,520 − 29,288 = −16,768. |
| 6 | Running net after mitigations | -$22,356 | 1 | −16,768 − 5,588 = −22,356. |
| 7 | Running net after expected residual loss | -$49,617 | 1 | −22,356 − 27,261 = −49,617. |
| 8 | Total of all the drops | $94,617 | 1 | 45,000 − (−49,617) = 94,617. |

**Provenance:** All values come from the chapter section "Showing How the Number Moves" and from Chapters 22 and 24. The sim must label all data "illustrative".

**Rules:** Running net after a step = previous running net − the step's drop. Benefit before rework = 80,000 × adoption × 0.90. The adoption and coverage drop = 80,000 − benefit before rework. Rework = 160,000 × adoption × 0.90 × 0.01 × 10 ÷ 60 × 30. Dollars are shown to the whole dollar, with negative values marked with a minus sign. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Adoption | 60 | 100 | 1 | 85 | percent |
| Controls | 0 | 40,000 | 1 | 29,288 | dollars |
| Expected residual loss | 0 | 40,000 | 1 | 27,261 | dollars |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the adoption, the controls, and the expected residual loss and watches the chart of floating bars and the end point update.
4. The learner should notice that the end point stays negative even with 100% adoption and no controls.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown with an empty chart and item 1 has an empty answer box. The question on screen is "Where does the running net stand after adoption and coverage?"

**Chapter Anchors:** The chapter states a bridge of $45,000, $26,200, $20,080, $14,680, $12,520, -$16,768, -$22,356, and -$49,617, and total drops of $94,617.
</details>

The **cost driver tree diagram** is a diagram that breaks a total into the costs that make it up, layer by layer, so that the reader can see which branch holds most of it. The $104,697 of risk-adjusted year-2 cost has two main branches.

- **Plan running cost, $35,000:** token and platform fees $22,000 and other running cost $13,000.
- **Additions, $69,697:**
    - **Recurring, $42,436:** controls $29,288, mitigations $5,588, retraining $5,400, change management $2,160.
    - **Expected residual loss, $27,261:** budgeted at the system $15,900 and rare and large $11,361.

Each node shows its amount and its share of its parent. The tree shows what no bar of totals does: the single largest branch below the plan is the $29,288 of controls, 28% of the total.

!!! mascot-tip "Draw the Tree Before the Waterfall"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The tree tells you which steps are big enough to deserve their own bar, and which can be grouped as "other". A waterfall with a dozen thin steps hides its message, and one with six steps that each matter shows it.

### Uncertainty, Cases, and the Dashboard

The **sensitivity analysis chart** shows how much a result moves when each input is varied over a plausible range. A tornado chart is the usual form: one horizontal bar per input, centered on the base result, sorted with the widest at the top. For the year-2 net of -$49,617:

| Input and range | Net at low end | Net at high end | Swing |
|-----------------|---------------:|----------------:|------:|
| Minutes saved, 0.63 to 1.37 | -$72,383 | -$26,851 | $45,533 |
| Expected residual loss, 1.5 times to 0.5 times | -$63,248 | -$35,986 | $27,261 |
| Rework increase, 2 to 0 points | -$55,737 | -$43,497 | $12,240 |
| Labor rate, $27 to $33 | -$55,125 | -$44,109 | $11,016 |
| Adoption, 80% to 90% | -$52,857 | -$46,377 | $6,480 |
| Coverage, 85% to 95% | -$52,677 | -$46,557 | $6,120 |

The chart's message is in two facts. The minutes saved matter most, so the measurement that deserves more sampling is the time study. And no bar reaches zero, so no single input, over its plausible range, turns the result positive. Draw the zero line and the base line, label both ends of each bar with its value, and give the range as text beside the input name.

The **scenario comparison table** compares complete cases across several measures, with the cases in columns and the measures in rows, and with the base case first.

| Measure | Plan | Realized | Risk-adjusted |
|---------|-----:|---------:|--------------:|
| Three-year cost | $160,000 | $160,000 | $403,291 |
| Three-year benefit | $220,000 | $151,470 | $151,470 |
| ROI | 37.5% | -5.3% | -62.4% |
| NPV at 10% | $38,272 | -$18,037 | -$222,085 |
| Payback | 1.67 years | Not within 3 years | Not within 3 years |

A scenario table suits the reader who wants the exact figure and a line chart suits the reader who wants the shape, so a report often carries both. The cases must be internally consistent, with the inputs that move together moved together, as Chapter 10 required.

The **dashboard mockup for report** is the one-page layout that gathers the few measures a reader checks first. A dashboard for the review has four tiles: realized benefit as a share of plan (68.85%), risk-adjusted ROI (-62.4%), appetite status (2 of 3 rules breached), and controls as a multiple of usage fees (1.97). Each tile has a value, a comparison to a target or last period, and a status, and a page holds six tiles at most. The mockup is made before the data are final so that the report's reader tests which tiles they would actually look at.

The **color use in financial charts** follows three rules. Use one accent color for the thing the chart is about and grey for the context. Never use red against green as the only difference, because about 1 in 12 men cannot tell them apart, and pair color with a label, a sign, or a pattern. And give a color one meaning throughout the report, so that the color of the risk-adjusted case on one page is its color on every page.

!!! mascot-warning "A Truncated Bar Axis Is the Fastest Way to Lose a CFO"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Starting a bar chart at $50,000 made a 1.31 times difference look like 3.1 times, and any reader who checks the axis will conclude you did it on purpose. Start bars at zero, and if the differences are too small to see, change the chart to a table or a line.

### Labels, Tables, and Sources

The **chart labeling best practice** is the set of rules for the words on a chart. The title states the conclusion, as in "Controls are the largest step from plan to risk-adjusted net". Axis titles carry units, such as "Net, dollars a year". Label lines and bars directly where they end and omit the legend, and label the key values, not every one. Annotate the one point that matters, such as "Net turns negative here". Spell out abbreviations: "Expected residual loss" and not "RsdLoss". If a reader must look away from the data to decode it, the label has failed.

The **data table design** is the layout of a table of numbers so that it can be read and compared. Right-align numbers and keep the same decimals in a column. Put the unit in the column header, not in every cell. Order rows by value or by a logical sequence, with totals set apart and no more than seven columns. Use light rules in place of a grid, and bold only the row or cell the table is about. Compare the two layouts of the same row: "58680.0000" in a left-aligned cell with a different precision from the cell below it, and "$58,680" right-aligned in a column titled "Annual total, dollars".

The **footnote and source citation** is the line under an exhibit that says where its data came from and what the reader should know about it. Every exhibit has one. It names the source and its date, the model it comes from, any assumption that is a judgment, and a pointer to the appendix. For the waterfall: "Source: finance ledger, October 2026; usage logs; risk-adjusted model, Appendix C. Note: expected residual loss includes judgments graded in Appendix A. Figures are dollars a year, year 2." A reader who doubts a figure can then find its origin in one step, which is what makes the exhibit checkable.

The third specification lets the learner find the flaw in a chart.

#### Diagram: Chart Flaw Finder

<details markdown="1">
<summary>Chart Flaw Finder</summary>
Type: microsim
**sim-id:** chart-flaw-finder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** critique<br/>
**Learning Objective:** The learner will critique eight described charts by identifying the kind of flaw each has from axis and scale, color, labels, and source and notes.

**Prerequisites:** data visualization principles, color use in financial charts, chart labeling best practice, footnote and source citation (defined in this chapter).

**Evidence of Mastery:** For each of eight charts the learner commits one flaw category before the answer is shown. A choice is correct when it matches the correct category in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A chart that looks professional is accurate. (2) A flaw is a matter of taste. (3) A source line is optional on an internal report.

**Instructional Rationale:** Evaluate-level work tests an artifact against standards. Charts that each break one rule force the learner to name which standard it breaks and why a reader would be misled.

**Content:**

Categories: Axis and scale, Color, Labels, Source and notes.

| # | Chart described to the learner | Correct category | Why (shown as feedback) | Fix shown after the answer |
|---|---|---|---|---|
| 1 | A bar chart of vendor annual totals whose vertical axis starts at $50,000. | Axis and scale | It makes a 1.31 times difference look like 3.1 times. | Start the bars at zero. |
| 2 | A chart of the plan, realized, and risk-adjusted ROI in red and green only. | Color | A reader who cannot tell red from green cannot tell the cases apart. | Add direct labels and use one accent color with greys. |
| 3 | A line chart of cumulative net with no unit on the vertical axis. | Labels | The reader cannot tell dollars from thousands of dollars. | Title the axis "Cumulative net, dollars". |
| 4 | A table of year-2 costs with no source or date. | Source and notes | The reader cannot check where the figures came from. | Add a source line with the ledger, the date, and the model. |
| 5 | A dual-axis line chart whose two axes are scaled so that the lines cross. | Axis and scale | The crossing is produced by the scales and not by the data. | Use one axis, or two charts on the same scale. |
| 6 | A waterfall chart in which increases and decreases are the same blue. | Color | The reader cannot tell which steps add and which subtract. | Use one color for decreases and another for increases, each labeled with its sign. |
| 7 | A chart whose bars are labeled "CtrlsAlloc" and "RsdLoss" with no legend. | Labels | The reader cannot decode the abbreviations. | Spell out "Controls" and "Expected residual loss". |
| 8 | A table of risk-adjusted costs that does not say that the residual loss is a judgment. | Source and notes | The reader treats an estimate as a measurement. | Add a note that residual loss is a judgment, graded in Appendix A. |

**Provenance:** All charts are illustrative descriptions built from this chapter and Chapters 19 and 22. The sim must label all data "illustrative".

**Rules:** Each chart has exactly one correct category, the one whose rule it breaks most directly. No chart takes two categories.

**Learner Activity:**

1. The learner reads chart 1, chooses one of the four categories, and presses Commit.
2. The sim shows the correct category, the "Why" text, and the fix.
3. After eight charts, exploration unlocks: the learner selects any category and sees the two charts that belong to it and their fixes.
4. The learner should notice that each category holds exactly two of the eight charts.

**Feedback:** Eight charts, fixed order, two attempts each. Correct: "Correct: <category>." Incorrect on the first attempt: the "Why" text without the category. After a second wrong attempt the category is shown and the chart counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Chart 1 is shown with no choice made. The question on screen is "Which kind of flaw does this chart have?"

**Chapter Anchors:** The chapter states vendor totals with B at 1.31 times A, a truncated axis that makes it look like 3.1 times, and a note that residual loss is a judgment graded in Appendix A.
</details>

### Summary and Quick Check

Visualization starts from the question, one message per chart with an honest scale, and the chart type follows from it: bars for totals from zero, lines for change over time, waterfalls for bridges, tornado charts for sensitivity, tables for cases, and trees for layers. The assistant's bridge falls from $45,000 to -$49,617 in seven steps totalling $94,617, of which the $29,288 of controls is the largest. The tornado shows that the minutes saved matter most and that no single input turns the result positive. A scenario table gives the exact figures for the plan, realized, and risk-adjusted cases, and a dashboard holds four tiles. Color has one accent, a second cue, and one meaning, labels state a conclusion and carry units, tables align numbers and put units in headers, and every exhibit names its source and its judgments.

??? note "Quick check: why must a bar chart start at zero but a line chart may not? - Click to expand"
    A bar's length is the value, so cutting off its base distorts the comparison, as when 1.31 times looks like 3.1 times. A line's message is its slope, and the axis labels show where it starts.

??? note "Quick check: why does the tornado chart for the net draw a zero line? - Click to expand"
    The question is whether any input can turn the result positive. With zero marked, the reader sees that every bar stays below it, so no single input over its plausible range changes the conclusion.

??? note "Quick check: why does every exhibit need a source line even in an internal report? - Click to expand"
    A reader who doubts a figure needs to find its origin in one step. Without a source line the figure cannot be checked, and a figure that cannot be checked is treated as an opinion.

!!! mascot-celebration "You Can Draw the Number So It Can Be Checked"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now choose a chart from its question, build the bridge from $45,000 to -$49,617, read a tornado, lay out a scenario table, and label, color, and source an exhibit so that a skeptic can check it. Chapter 27 brings every part together in the capstone.
