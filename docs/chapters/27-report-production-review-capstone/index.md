---
title: Report Production, Review, and the Capstone Project
description: How to review, fact-check, edit, version, make accessible, distribute, and archive an executive ROI report, followed by the six-week capstone in which the learner builds, critiques, presents, and reflects on a complete GenAI ROI report.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:27:52
version: 1.11
---

# Report Production, Review, and the Capstone Project

## Summary

Combines the quality-assurance pass on a finished report with the step-by-step capstone project: building, critiquing, and presenting a complete GenAI ROI report. This chapter covers 24 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Report Review Checklist | 24 |
| Peer Review Process | 23 |
| Report Editing Pass | 22 |
| Fact-Checking Financial Claims | 21 |
| Report Version Control | 20 |
| Report Template Library | 19 |
| Report Length Calibration | 18 |
| Report Accessibility | 17 |
| Report Distribution Strategy | 16 |
| Report Feedback Incorporation | 15 |
| Report Localization Note | 1 |
| Report Archiving Practice | 13 |
| Capstone Report Planning | 12 |
| Capstone Data Collection | 11 |
| Capstone Cost Model Build | 10 |
| Capstone ROI Calculation | 9 |
| Capstone Executive Summary Draft | 8 |
| Capstone Report Full Draft | 1 |
| Capstone Peer Critique | 6 |
| Capstone Presentation Delivery | 5 |
| Capstone Report Finalization | 4 |
| Post-Capstone Reflection | 3 |
| Continuous Improvement Plan | 2 |
| Career Application Of Skills | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)
- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 12: Measurement Rigor and KPI Reporting](../12-measurement-rigor-kpi-reporting/index.md)
- [Chapter 13: Telemetry, Logging, and Cost Dashboards](../13-telemetry-logging-cost-dashboards/index.md)
- [Chapter 16: SDLC Productivity, Risk, and Cost Roadmapping](../16-sdlc-productivity-risk-roadmapping/index.md)
- [Chapter 18: MLOps Infrastructure and Reuse Economics](../18-mlops-infrastructure-reuse-economics/index.md)
- [Chapter 23: Audience Analysis and Executive Framing](../23-audience-analysis-executive-framing/index.md)
- [Chapter 24: Presenting and Defending Findings to Executives](../24-presenting-defending-findings/index.md)
- [Chapter 25: Designing the Executive ROI Report](../25-designing-executive-roi-report/index.md)
- [Chapter 26: Data Visualization and Storytelling for Financial Audiences](../26-data-visualization-storytelling/index.md)

---

Chapters 23 to 26 produced a report. This chapter makes sure it is right and then asks you to make one of your own. The first half is the production line that stands between a finished draft and a document an executive can rely on: review, fact-checking, editing, versioning, accessibility, distribution, and archiving. The second half is the capstone, a six-week project that takes you from a blank page to a defended report, using the Year-2 ROI Review of the support assistant as the worked model at every step. The figures are those of Chapters 9 to 26, and they are illustrative.

!!! mascot-welcome "From Draft to Defensible"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The last mile of a report is where most credibility is won or lost, and it is the least glamorous mile. By the end of this chapter you can run a review that finds the errors before the CFO does, and you will have a plan for the project that proves you can do this whole book's work. Every token counts, and so does every last check.

### Reviewing the Report

The **report review checklist** is a fixed list of pass-or-fail checks applied to a finished draft, so that quality does not depend on what the reviewer happens to notice. Twelve checks, in five groups, cover an ROI report.

| Group | Check |
|-------|-------|
| Numbers | Every table foots, and every total recomputes from its parts |
| Numbers | Every figure reconciles to its source and its date |
| Consistency | The same figure has the same value and precision everywhere |
| Consistency | Terms, units, and periods are used the same way throughout |
| Structure | The decision and bottom line are in the first sentence and on the cover |
| Structure | Every finding has an exhibit, and every recommendation traces to a finding |
| Claims | No claim is stronger than its evidence |
| Claims | Every assumption is listed, graded, and sensitivity-tested |
| Risk and ethics | The bad number is shown, and exclusions are disclosed |
| Risk and ethics | Personal data of staff and customers is absent |
| Accessibility | Charts and tables can be read without color and with a screen reader |
| Source | Every exhibit has a source line |

The first specification lets the learner practice finding the kind of defect each check exists to catch.

#### Diagram: Review Defect Finder

<details markdown="1">
<summary>Review Defect Finder</summary>
Type: microsim
**sim-id:** review-defect-finder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish eight defects in excerpts of an ROI report by the kind of defect each is, from arithmetic, consistency, claim strength, structure, accessibility, and source.

**Prerequisites:** report review checklist, fact-checking financial claims, avoiding overstated claims (defined in this chapter and in Chapter 24).

**Evidence of Mastery:** For each of eight excerpts the learner commits one defect kind before the answer is shown. A choice is correct when it matches the correct kind in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Review is mainly proofreading. (2) A figure that appears twice is checked once. (3) A defect has one right fix and one right name regardless of its cause.

**Instructional Rationale:** Analyze-level work separates cases by the feature that matters. Excerpts that contain several numbers and one defect force the learner to find what is wrong and to name the check that would catch it.

**Content:**

Kinds: Arithmetic, Consistency, Claim strength, Structure, Accessibility, Source.

| # | Excerpt shown to the learner | Correct kind | Why (shown as feedback) | Fix shown after the answer |
|---|---|---|---|---|
| 1 | A year-1 cost column with items of $30,000, $15,300, $6,120, $36,488, $5,588, $10,800, and $27,261, and a total of $131,757. | Arithmetic | The items sum to $131,557, not $131,757. | Correct the total to $131,557. |
| 2 | The summary says the realized benefit is 68.85% of plan, and the findings page says 69.5%. | Consistency | The same figure has two values. | Use 68.85% everywhere. |
| 3 | "The assistant will return 37.5% over three years." | Claim strength | It states a plan as a certainty. | The plan projected 37.5%, and the measured ROI is -5.3%. |
| 4 | The recommendation first appears on page 6, after the methodology. | Structure | The decision is not up front. | Move the decision to the cover and the first sentence of the summary. |
| 5 | A chart distinguishes the plan from the risk-adjusted case with red and green only. | Accessibility | A reader who cannot tell red from green cannot tell the cases apart. | Add direct labels and a second cue. |
| 6 | The realized benefit of $55,080 appears with no source in the methodology or the exhibit. | Source | The reader cannot trace the figure. | Add a source line with the data and the date. |
| 7 | A bridge shows $45,000 less $94,617 as -$49,716. | Arithmetic | 45,000 − 94,617 = −49,617. | Correct the result to -$49,617. |
| 8 | One table uses 960,000 queries for year 2 and another uses 940,000. | Consistency | The same input has two values. | Use 960,000 in both tables. |

**Provenance:** All excerpts are illustrative defects built from figures in Chapters 11, 22, and 24. The sim must label all data "illustrative".

**Rules:** Each excerpt has exactly one correct kind, the one whose check it breaks most directly. No excerpt takes two kinds.

**Learner Activity:**

1. The learner reads excerpt 1, chooses one of the six kinds, and presses Commit.
2. The sim shows the correct kind, the "Why" text, and the fix.
3. After eight excerpts, exploration unlocks: the learner selects any kind and sees the excerpts that belong to it and their fixes.
4. The learner should notice that arithmetic and consistency defects each account for two of the eight.

**Feedback:** Eight excerpts, fixed order, two attempts each. Correct: "Correct: <kind>." Incorrect on the first attempt: the "Why" text without the kind. After a second wrong attempt the kind is shown and the excerpt counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Excerpt 1 is shown with no choice made. The question on screen is "What kind of defect is in this excerpt?"

**Chapter Anchors:** The chapter states a year-1 cost total of $131,557, a realized benefit of 68.85% of plan, a risk-adjusted net of -$49,617, and 960,000 queries in year 2.
</details>

The **peer review process** is the structured reading of a draft by people other than its author, each with a defined role. Four roles cover the ground: a domain reviewer who checks that the technical claims are right, a finance reviewer who checks the arithmetic and the use of terms, a reader from the intended audience who checks that the message lands, and a reader who knows nothing of the topic, who finds the jargon. Each reviewer logs defects with a severity: critical if a decision could change, major if a reader would be misled, minor otherwise. Review is worth its cost. A detailed read takes about three times the reading time, so for the 15.4-minute body of Chapter 25 it is about 46 minutes, and three reviewers cost \( 3 \times 46 \div 60 \times 90 = \$207 \). If each reviewer independently finds half of the defects, two find 75% and three find \( 1 - 0.5^3 = 87.5\% \). The assumption of independence is generous, since reviewers share blind spots, and a different role for each reviewer is the way to make it closer to true.

The **fact-checking financial claims** is the reperformance of every figure in a report from its source. Three operations do most of the work. Trace each figure to the data it came from and its date. Recompute it from its inputs, as with the year-2 realized benefit, \( 160{,}000 \times 1 \div 60 \times 30 \times 0.85 \times 0.90 - 6{,}120 = \$55{,}080 \). And cross-foot every table, adding down the columns and across the rows to check that they agree. The year-1 column of Chapter 22's cost table sums to \( 30{,}000 + 15{,}300 + 6{,}120 + 36{,}488 + 5{,}588 + 10{,}800 + 27{,}261 = \$131{,}557 \), and a reviewer who finds $131,757 has found a typing error that a reader would have taken for an analytical one. Keep a log of claim, source, recomputed value, and status.

!!! mascot-thinking "A Table That Foots Is Evidence, Not Decoration"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice why a typing slip in a total does so much damage: a finance reader who finds one wrong total assumes the model behind it is also careless. Footing every table costs minutes and protects the credibility of the findings.

The **report editing pass** is the revision of the text after the numbers are settled, in four sweeps that are done separately. The structure sweep checks order and headings against Chapter 25. The clarity sweep removes jargon and unclear antecedents. The concision sweep cuts words that carry no information, and the consistency sweep fixes terms, units, and precision, for example one form of the realized benefit share, 68.85%, in place of 69% in one place and 68.9% in another. Do the sweeps in this order, since polishing sentences that a structural change will remove is wasted work.

The **report feedback incorporation** is the handling of the comments that come back, so that none is lost and none is silently ignored. Log each comment, and mark it accepted, declined, or deferred, with a reason. Suppose nine comments come back: five are accepted and changed, two are declined with a stated reason, and two are deferred to the next version. The reviewer who sees their comment answered, even when declined, reviews again.

### Producing the Report

The **report version control** is the practice of naming and tracking every version of the report so that two people never work from different ones. A version has a number, a date, an author, and a change note. The rule is that the numbers change when the scope or the data change, and the change is recorded.

| Version | Date | Change |
|---------|------|--------|
| 0.1 | Draft | First complete draft |
| 0.2 | After review | Footing errors corrected, decision moved to cover |
| 1.0 | For decision | Signed off by finance and the CIO |
| 1.1 | After decision | Scope note updated, shared-controls figure revised |

One file is the single source of truth, and copies are marked with the version in the footer. When version 1.1 changes a figure, the change note says which, so that a reader of version 1.0 knows what moved.

The **report template library** is the collection of reusable report parts: a cover, a one-page summary, a finding block, a risk register, an appendix. It saves the time of making them again and, more usefully, keeps reports consistent. Suppose a template set takes 30 hours to build, $2,700, and saves 12 hours, $1,080, on each report. It pays for itself at \( 2{,}700 \div 1{,}080 = 2.5 \), so at the third report.

The **report length calibration** is the setting of a report's length from its audience and the time they have, which Chapter 25 worked out. The body of 3,075 words suits a 15-minute reader, one page of 450 words suits a 3-minute reader, and a board paper is one page. A longer report is not a more credible one, and the detail is moved to an appendix.

The **report accessibility** is the design of the report so that people with different abilities and tools can read it. For ROI reports, four practices matter. Use real headings, so a screen reader can navigate. Give each chart a text description and a table of its values. Mark table headers. And keep contrast high enough to read: the common standard, WCAG 2.1 level AA, asks for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text and for chart graphics. The ratio is \( (L_1 + 0.05) \div (L_2 + 0.05) \), where \( L_1 \) and \( L_2 \) are the relative luminances of the lighter and the darker color. Mid-grey text shows how thin the margin is: #767676 on white has a ratio of 4.54, and #777777, one step lighter, 4.48, which fails for normal text and passes for large text. The second specification lets the learner apply the thresholds.

#### Diagram: Contrast Threshold Checker

<details markdown="1">
<summary>Contrast Threshold Checker</summary>
Type: microsim
**sim-id:** contrast-threshold-checker<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the contrast thresholds of 4.5 to 1 for normal text and 3 to 1 for large text and chart graphics to eight color and use cases, deciding whether each passes or fails.

**Prerequisites:** report accessibility, color use in financial charts (defined in this chapter and in Chapter 26).

**Evidence of Mastery:** For each of eight cases the learner commits Pass or Fail before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A color that looks readable passes. (2) One threshold applies to every use. (3) A ratio that fails by a small margin passes.

**Instructional Rationale:** Apply-level work uses a rule in a new case. Cases on both sides of a threshold, and the same color judged for two uses, make the learner choose the threshold before comparing the ratio.

**Content:**

Thresholds: normal text needs a ratio of at least 4.5. Large text and chart graphics need a ratio of at least 3.0. All colors are on a white background, and the ratio is shown to two decimals.

| # | Color and use | Ratio | Correct choice | Why (shown as feedback) |
|---|---|---:|---|---|
| 1 | #000000 as normal text | 21.00 | Pass | 21.00 is at least 4.5. |
| 2 | #767676 as normal text | 4.54 | Pass | 4.54 is at least 4.5. |
| 3 | #777777 as normal text | 4.48 | Fail | 4.48 is below 4.5. |
| 4 | #777777 as large text | 4.48 | Pass | Large text needs 3.0, and 4.48 is at least 3.0. |
| 5 | #FF0000 as normal text | 4.00 | Fail | 4.00 is below 4.5. |
| 6 | #FF0000 as a chart line | 4.00 | Pass | A chart graphic needs 3.0, and 4.00 is at least 3.0. |
| 7 | #808080 as normal text | 3.95 | Fail | 3.95 is below 4.5. |
| 8 | #BFBFBF as a chart line | 1.84 | Fail | 1.84 is below 3.0. |

**Provenance:** The thresholds are from WCAG 2.1 success criteria 1.4.3 and 1.4.11 of the W3C. The ratios are computed by the formula in Rules. The sim must label all data "illustrative".

**Rules:** Relative luminance L = 0.2126 R + 0.7152 G + 0.0722 B, where each of R, G, B is the channel value divided by 255, then divided by 12.92 if at most 0.03928, and otherwise raised as ((value + 0.055) ÷ 1.055) to the power 2.4. Ratio = (L of the lighter + 0.05) ÷ (L of the darker + 0.05). Pass when the ratio is at least the threshold, including when it equals it. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Grey level of the foreground | 0 | 255 | 1 | 118 | channel value |
| Use | Normal text | Chart graphic | one choice | Normal text | choice |

A grey level g means the color with red, green, and blue all equal to g. The default 118 is #767676.

**Learner Activity:**

1. The learner reads case 1, chooses Pass or Fail, and presses Commit.
2. The sim shows the ratio, the threshold used, and the "Why" text.
3. After eight cases, exploration unlocks: the learner changes the grey level and the use and watches the ratio and the verdict update.
4. The learner should notice that grey levels 118 and 119 differ by one step and give different verdicts for normal text.

**Feedback:** Eight cases, fixed order, two attempts each. Correct: "Correct: <choice>, ratio <ratio>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the case counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Case 1 is shown with no choice made. The question on screen is "Does this color pass for this use?"

**Chapter Anchors:** The chapter states thresholds of 4.5 to 1 for normal text and 3 to 1 for large text and graphics, and ratios of 4.54 for #767676 and 4.48 for #777777.
</details>

The **report localization note** is a short note on what must change if the report is read in another country: the currency and the date of the exchange rate, number formats (1,000.00 against 1.000,00), date formats, and local rules on data and disclosure. State the currency on the cover and the conversion date in the footnote.

The **report distribution strategy** is the plan of who receives the report, in what order, through what channel, and with what access. The stakeholder map of Chapter 23 sets the order: the CFO and CIO see it before the meeting, security and legal consult it before release, and the board audit committee receives a one-page version with the full report available. A restricted report that holds personal or confidential data goes to a named list, not an open folder.

| Reader | When | Form | Channel |
|--------|------|------|---------|
| CFO, CIO | 3 days before | Full report | Direct, with a call |
| Security, legal | 5 days before | Risk section and appendix B | Restricted folder |
| VP of Support, CTO | 2 days before | Full report | Restricted folder |
| Audit committee | With the board pack | One-page summary | Board portal |

The **report archiving practice** is the storing of the final report with everything needed to reproduce it: the final version, the data snapshot, the model file, the change log, and the review log. A report whose model is lost cannot be defended a year later, and the cost of keeping the package is small beside that of rebuilding it. Retention follows the organization's records policy.

!!! mascot-tip "Archive the Model With the Report"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you save version 1.0, copy the model file and the data extract into the same folder and name them with the same version. Six months later, when someone asks how you got $55,080, you can answer in a minute instead of rebuilding from memory.

### The Capstone Project

The capstone is a six-week project in which you build a complete executive ROI report for a GenAI initiative, review it, present it, and reflect on it. Choose a real initiative, with data you may use, or a realistic fictional one. The support assistant is the worked model at each step. The 100-point rubric is shown first, so that you can see where the weight lies.

| Component | Points |
|-----------|-------:|
| Planning and scope | 10 |
| Data and sources | 10 |
| Cost model and ROI | 20 |
| Risk adjustment | 15 |
| Executive summary | 10 |
| Report quality: structure, exhibits, tone | 15 |
| Presentation and Q&A | 10 |
| Reflection and improvement plan | 10 |
| **Total** | **100** |

!!! mascot-encourage "The Capstone Looks Big, and It Is Twelve Small Steps"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    A project that uses a whole book can feel like a wall, and you have already done each piece of it in the chapters. Take one milestone a day, treat the assistant's version as a template and not a ceiling, and notice how often the next step is one you have practiced.

| Week | Milestones | Hours |
|-----:|-----------|------:|
| 1 | Planning | 8 |
| 2 | Data collection | 10 |
| 3 | Cost model and ROI calculation | 14 |
| 4 | Executive summary draft and full draft | 14 |
| 5 | Peer critique and revision | 10 |
| 6 | Presentation, finalization, and reflection | 8 |

The **capstone report planning** is the first milestone: choose the initiative, name the decision and the decision maker, define the scope with its exclusions, set the question for the baseline, and agree the plan. The deliverable is a one-page plan, and its acceptance test is that the decision, the audience, the scope, and the baseline are each named in one sentence. For the assistant: "The CFO and CIO will decide whether to continue the support assistant, using a three-year view of its cost and benefit against a pre-launch baseline."

The **capstone data collection** is the gathering of every input the model needs, each with a source and a date. List the data requests before the first meeting. For the assistant: ticket timestamps for two groups of 2,000 tickets to measure the minutes saved, usage logs for adoption and coverage, a quality sample for rework, the vendor invoices and the finance ledger for cost, and the risk register. Record the date and the owner of each, and check the sample size against the precision you need, as in Chapter 12.

The **capstone cost model build** is the construction of the model in a form that can be checked: inputs on one sheet with their sources, calculations on another, and outputs in a third, with no figure typed into a formula. Build the plan cost first, then the controls, the mitigations, and the residual loss as in Chapter 22. Check that each table foots and that the totals reconcile to the ledger, and keep the three-year table of $160,000 of plan cost and $403,291 of risk-adjusted cost as the target to reproduce.

The **capstone ROI calculation** is the computation of the return in the three views: the plan, the realized, and the risk-adjusted. For each, compute the three-year cost and benefit, the ROI as \( (\text{benefit} - \text{cost}) \div \text{cost} \), the NPV at the organization's rate, and the payback. For the assistant they are 37.5%, -5.3%, and -62.4%, with NPVs of $38,272, -$18,037, and -$222,085. State the discount rate and run the sensitivity tests of Chapter 24.

The **capstone executive summary draft** is the one-page summary, written before the full report so that it sets the argument. Use the layout of Chapter 23, within 450 words. The summary for the assistant would read as follows.

> **Bottom line.** The support assistant delivers 68.85% of its planned benefit and, once its controls and risks are priced, costs $104,697 a year against a benefit of $55,080. At today's size it does not pay.
>
> **Decision requested.** We ask the CFO and CIO to approve a $3,600 restructure of the assistant's controls and a two-quarter gate, after which it either continues on evidence or is retired.
>
> **Three numbers.** Plan ROI 37.5%. Measured ROI -5.3%. Risk-adjusted ROI -62.4%, an NPV of -$222,085 at 10%.
>
> **Why.** Adoption of 85% and coverage of 90% cut the planned $80,000 to $61,200, and rework takes $6,120 more. The plan left out $243,291 of costs over three years, of which $95,064 is controls and $81,783 is expected residual loss. The result barely depends on the risk judgments: halving the expected loss moves the ROI only from -62.4% to -58.2%.
>
> **Main risks.** Two of three appetite rules are breached. A data incident of $80,025 is uninsured, and the expected residual loss is 49.5% of the realized benefit against a limit of 25%.
>
> **Options.** Continue as is, -$49,617 a year. Restructure, -$37,467 a year, which we recommend with a gate. Widen use, which needs $104,697 of benefit, 1.9 times today's. Retire, which saves $49,617 a year against continuing and costs $4,500.
>
> **Next step.** Approve the restructure this quarter. At the two-quarter review, continue only with evidence of a path to $99,027 of annual benefit.

The **capstone report full draft** is the assembly of the whole report to the structure and word budget of Chapter 25, with each finding's exhibit built to the rules of Chapter 26. The deliverable is version 0.1, and its test is that every finding has an exhibit and every recommendation traces to a finding.

The **capstone peer critique** is the exchange of drafts with another learner, who reviews yours as in the first half of this chapter and whose draft you review. Use the checklist and the roles of the review process, log each defect with its severity, and return the log within two days. The critique is graded on the quality of the comments you give as well as on the report you receive them for.

The **capstone presentation delivery** is the 8-minute talk on four slides, then a question period, to a small panel playing the CFO and the CIO. Use the design of Chapter 24: conclusion titles, about five numbers a slide, rounded spoken numbers, and a bank of 24 prepared questions. The panel asks at least one objection of each of the four kinds.

The **capstone report finalization** is the closing of the draft: the critique defects closed, the numbers re-footed, the version set to 1.0, the sign-off recorded, and the package archived. The third specification lets the learner judge whether a milestone is ready to pass its gate.

#### Diagram: Milestone Gate Check

<details markdown="1">
<summary>Milestone Gate Check</summary>
Type: microsim
**sim-id:** milestone-gate-check<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight capstone situations, whether the milestone may proceed to the next one or must be held, using the gate criterion for that milestone.

**Prerequisites:** the capstone milestones from planning through finalization (defined in the section "The Capstone Project" above).

**Evidence of Mastery:** For each of eight situations the learner commits Proceed or Hold before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A milestone is complete when the work is done, not when the criterion is met. (2) A small defect can be left for the next milestone. (3) A hold is a failure.

**Instructional Rationale:** Evaluate-level work applies criteria to a case and defends the verdict. Situations that are nearly complete, and fail on one stated criterion, make the learner test the criterion and not the effort.

**Content:**

Gate criteria. Planning: the decision, audience, scope, and baseline are each named in one sentence. Data: every input has a source, a date, and an owner. Model: every table foots, and totals reconcile to the ledger. Summary: the bottom line is the first sentence and the summary is at most 450 words. Draft: every finding has an exhibit and every recommendation traces to a finding. Critique: every critical defect is closed. Presentation: the rehearsed talk runs at most 8 minutes. Finalization: the sign-off is recorded and the package is archived at version 1.0.

| # | Situation shown to the learner | Gate | Correct choice | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | The plan names the decision, the audience, and the scope, and says nothing of the baseline. | Planning | Hold | The baseline is not named. |
| 2 | Every input has a source and a date, and two have no owner. | Data | Hold | Every input needs an owner as well. |
| 3 | The model's tables all foot, and the cost total matches the ledger. | Model | Proceed | Both parts of the criterion are met. |
| 4 | The summary has 520 words and opens with the bottom line. | Summary | Hold | 520 is above the limit of 450. |
| 5 | The draft has an exhibit for each of four findings, and one recommendation cites no finding. | Draft | Hold | Every recommendation must trace to a finding. |
| 6 | The critique log has one critical defect open and four minor defects closed. | Critique | Hold | Every critical defect must be closed. |
| 7 | The rehearsed talk runs 7 minutes 40 seconds. | Presentation | Proceed | 7 minutes 40 seconds is within 8 minutes. |
| 8 | The report is signed off at version 1.0, and the model file is not yet archived. | Finalization | Hold | The package must be archived as well. |

**Provenance:** All situations are illustrative and use the criteria in this chapter. The sim must label all data "illustrative".

**Rules:** Proceed when every part of the gate criterion is met, and Hold when any part is not. A talk of exactly 8 minutes meets the presentation criterion. A summary of exactly 450 words meets the summary criterion.

**Learner Activity:**

1. The learner reads situation 1 and its gate criterion, chooses Proceed or Hold, and presses Commit.
2. The sim shows the correct choice and the "Why" text.
3. After eight situations, exploration unlocks: the learner selects a gate and sees its criterion and the one situation that tests it.
4. The learner should notice that six of the eight situations are holds, and that each of them fails exactly one part of its criterion.

**Feedback:** Eight situations, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the situation counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Situation 1 is shown with its gate criterion and no choice made. The question on screen is "May this milestone pass its gate?"

**Chapter Anchors:** The chapter states a summary limit of 450 words and a talk of 8 minutes.
</details>

### After the Capstone

The **post-capstone reflection** is a structured look back, written within a week of the presentation. Four questions suit it. Which assumption did you get most wrong, and how would you have known? Which review comment changed the report most? What would you do with a second week? And what did you learn about your own habits, such as rounding early or writing the summary last? The assistant gives a concrete first example: the plan overstated the benefit by 31.15%, and the cause was an adoption of 85% where the plan implied 100%, so the lesson is to measure adoption in the first month.

The **continuous improvement plan** is the schedule for keeping the report's figures current after it is signed. Name the measures, targets, and triggers, and an owner for each. For the assistant:

| Measure | Target | Trigger | Owner |
|---------|--------|---------|-------|
| Adoption | 95% | Below 85% | VP of Support |
| Minutes saved per ticket | 1.0 | Below 0.63, the bottom of the interval | CTO |
| Rework increase | 0 points | Above 1 point | VP of Support |
| Controls as a multiple of usage fees | 1.5 | Above 1.97 | CIO |
| Appetite rules breached | 0 | Any | CIO |

Review them at the two-quarter gate, and replace the plan's figures with the measured ones. The **career application of skills** is the use of this work beyond the course. The capstone report is a portfolio piece that shows you can build a defensible model, a risk-adjusted view, and an honest message. Three sentences you can say in an interview follow from it: what the plan said, what you measured, and what you recommended and why. These skills serve finance partners, FinOps and platform roles, product owners, and anyone who must justify a technology investment to people who fund it.

### Summary and Quick Check

A report is ready when it has passed a checklist of twelve checks in five groups, a review by four roles, and a fact-check that traces, recomputes, and foots every figure. Three reviewers who each find half of the defects find 87.5% between them, for about $207. The text is edited in four sweeps, the comments are logged as accepted, declined, or deferred, and the report has a version, a template, a length matched to its reader, accessible headings, descriptions, and contrast of at least 4.5 to 1 for normal text, a distribution plan, and an archive that includes the model. The capstone takes six weeks and 64 hours across twelve milestones, graded on a 100-point rubric in which the cost model and ROI carry 20 and risk adjustment 15, and every milestone has a gate. The assistant's one-page summary, ROI of 37.5%, -5.3%, and -62.4%, and its improvement plan are the reference at each step.

??? note "Quick check: why do three reviewers with different roles find more than three of the same role? - Click to expand"
    Reviewers with the same background share blind spots, so their findings overlap. Different roles, such as domain, finance, audience, and a newcomer, miss different things, which brings the combined result closer to the 87.5% that independence would give.

??? note "Quick check: why does a one-step change in grey, #767676 to #777777, change the verdict? - Click to expand"
    The ratio for normal text must be at least 4.5, and the two greys are on either side of it, at 4.54 and 4.48. The threshold is a sharp line, so a colour that looks the same can pass or fail.

??? note "Quick check: why is the executive summary drafted before the full report in the capstone? - Click to expand"
    The summary sets the argument, and drafting it first shows early whether there is a recommendation to support. The full report then supplies the evidence for each sentence, and a finding that does not support the summary is a sign of a gap.

!!! mascot-celebration "You Have Built the Whole Skill"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now review, fact-check, edit, version, and archive an ROI report, plan and run a six-week capstone, and take a GenAI initiative from its first token to a defended recommendation. That is the whole path of this book, and it is a smart trade-off for every hour you spent on it.
