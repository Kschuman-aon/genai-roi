---
title: Designing the Executive ROI Report
description: The structure of an executive ROI report, from cover page and scope through methodology, findings, recommendations, and appendices, with page and word budgets worked out for the support assistant case.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:23:29
version: 1.11
---

# Designing the Executive ROI Report

## Summary

Walks through the structural mechanics of an executive ROI report: scope definition, methodology, findings, recommendations, appendices, and front matter. This chapter covers 8 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 8 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Executive Report Structure | 45 |
| Report Scope Definition | 44 |
| Methodology Section Design | 1 |
| Findings Section Design | 42 |
| Recommendations Section Design | 41 |
| Appendix Design | 40 |
| Cover Page And Framing | 39 |
| Table Of Contents Design | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 12: Measurement Rigor and KPI Reporting](../12-measurement-rigor-kpi-reporting/index.md)
- [Chapter 23: Audience Analysis and Executive Framing](../23-audience-analysis-executive-framing/index.md)
- [Chapter 24: Presenting and Defending Findings to Executives](../24-presenting-defending-findings/index.md)

---

Chapters 23 and 24 gave you a message and a defense. This chapter puts them into a document. The report here is the one the support assistant's story needs: the Year-2 ROI Review for the CFO and CIO, with a plan ROI of 37.5%, a measured ROI of -5.3%, a risk-adjusted ROI of -62.4%, and a recommendation to restructure and set a two-quarter gate. A report is an argument in a fixed order, and the order is part of the argument. The figures in this chapter come from Chapters 9 to 24, and all are illustrative.

!!! mascot-welcome "Give the Argument a Shape"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A report with the right numbers in the wrong order loses the reader before the numbers matter. By the end of this chapter you can lay out an executive ROI report page by page, with a word budget for each section, and know what belongs in the body and what belongs behind it. Every token counts, and so does every page.

### The Shape of the Report

The **executive report structure** is the fixed sequence of sections in which an ROI report is organized, so that each kind of reader finds what they need without reading the rest. The order puts the decision first and the evidence behind it. It is the bottom-line-up-front principle of Chapter 23 applied to a whole document.

1. **Cover page** with the title, the decision requested, the audience, the date, and the version.
2. **Executive summary** of one page, readable alone.
3. **Table of contents** with a reading guide.
4. **Scope** of what the report covers and what it leaves out.
5. **Methodology**, in one page, of how the numbers were produced.
6. **Findings**, each with its evidence.
7. **Risk**, the register and appetite status.
8. **Recommendations** with options, owners, and dates.
9. **Appendices** with the detail that a skeptic will check.

Different readers take different paths through it. A 30-second reader sees the cover and the first sentence of the summary, a 3-minute reader reads the summary, a 15-minute reader reads the body, and an analyst or auditor goes to the appendices. The report must work at each depth, which is why the summary cannot depend on the body and the body cannot depend on the appendices.

The length is a budget set before writing. Take a body of 8.5 pages at about 350 words a page for text and exhibits, with a one-page summary of 450 words.

| Section | Pages | Words |
|---------|------:|------:|
| Executive summary | 1.0 | 450 |
| Scope | 0.5 | 175 |
| Methodology | 1.0 | 350 |
| Findings | 3.0 | 1,050 |
| Risk | 1.5 | 525 |
| Recommendations | 1.5 | 525 |
| **Body** | **8.5** | **3,075** |

The body is 3,075 words, which at 200 words a minute is \( 3{,}075 \div 200 = 15.4 \) minutes. That matches the 15-minute reader, which is the point of setting the budget first. Findings take \( 1{,}050 \div 3{,}075 = 34.1\% \) of the words and the summary takes \( 1 \div 8.5 = 11.8\% \) of the pages. If the CFO has 12 minutes, the body must fall to 2,400 words, a cut of 675 words, or \( 675 \div 350 = 1.9 \) pages, and the cut comes from the body and not from the summary, with the detail moved to an appendix. The first specification lets the learner work with such a budget.

#### Diagram: Report Budget Builder

<details markdown="1">
<summary>Report Budget Builder</summary>
Type: microsim
**sim-id:** report-budget-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the words, pages, reading time, shares, and cuts of an executive report body from the pages and words per page of its sections, to within the tolerance stated for each item.

**Prerequisites:** executive report structure, executive attention span, one-page summary technique (defined in this chapter and in Chapter 23).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A report's length is decided while writing it. (2) A cut to the reading time should come out of the summary. (3) Every section needs the same number of words per page.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Setting a budget before writing makes the cost of an extra page concrete, and the exploration shows how sections trade against one another when the reading time is fixed.

**Content:**

Reading pace is 200 words a minute. The sections have these pages and words per page: executive summary 1.0 page at 450, scope 0.5 at 350, methodology 1.0 at 350, findings 3.0 at 350, risk 1.5 at 350, recommendations 1.5 at 350.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Words in the scope section | 175 | 0 | 0.5 × 350 = 175. |
| 2 | Pages in the body | 8.5 | 0 | 1.0 + 0.5 + 1.0 + 3.0 + 1.5 + 1.5 = 8.5. |
| 3 | Words in the body | 3,075 | 0 | 450 + 175 + 350 + 1,050 + 525 + 525 = 3,075. |
| 4 | Reading time of the body, minutes | 15.4 | 0.1 | 3,075 ÷ 200 = 15.375. |
| 5 | Findings as a share of the body words | 34.1% | 0.1 | 1,050 ÷ 3,075 = 0.341. |
| 6 | Executive summary as a share of the body pages | 11.8% | 0.1 | 1.0 ÷ 8.5 = 0.118. |
| 7 | Words to cut to make the body a 12-minute read | 675 | 0 | 12 × 200 = 2,400 words fit, and 3,075 − 2,400 = 675. |
| 8 | Pages to cut at 350 words a page | 1.9 | 0.1 | 675 ÷ 350 = 1.93. |

**Provenance:** All figures come from the chapter section "The Shape of the Report". The sim must label all data "illustrative".

**Rules:** Words = pages × words per page. Reading time = words ÷ pace. Share = part ÷ whole. Cut = words − (minutes × pace). Words are shown as whole numbers, times and pages to one decimal, and shares to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Findings pages | 1.0 | 6.0 | 0.5 | 3.0 | pages |
| Risk pages | 0.5 | 3.0 | 0.5 | 1.5 | pages |
| Recommendations pages | 0.5 | 3.0 | 0.5 | 1.5 | pages |
| Words per page, body sections | 250 | 450 | 50 | 350 | words |
| Reading pace | 150 | 300 | 10 | 200 | words per minute |

**Learner Activity:**

1. The learner reads the section table and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the three section lengths, the words per page, and the pace, and watches the body words, the reading time, and the words to cut for a 12-minute read update.
4. The learner should notice that adding one page of findings adds about 1.75 minutes of reading at the default settings.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The section table is shown and item 1 has an empty answer box. The question on screen is "How many words does the scope section hold?"

**Chapter Anchors:** The chapter states a body of 8.5 pages and 3,075 words, a reading time of 15.4 minutes, findings at 34.1% of the words, and a cut of 675 words, or 1.9 pages, for a 12-minute read.
</details>

### Cover, Contents, and Scope

The **cover page and framing** is the first page and the one sentence on it that says what the document is for. A neutral title such as "AI Performance Report" hides the decision, and a cover that states it lets the reader prepare. A cover for the assistant would read:

> **Support Assistant: Year-2 ROI Review**
> Decision requested: approve a controls restructure and a two-quarter gate
> Prepared for the CFO and CIO. Version 1.0, for decision. Confidential.

The cover carries the title, the decision, the audience, the date, the version, the status, and the classification, and nothing decorative. Naming the version matters later, when two copies are in circulation.

The **table of contents design** is the layout of the contents page so that it also tells the reader where to go. For a report of about ten pages a one-level list with page numbers is enough, and a two-line reading guide above it is better: "Decision and evidence: pages 2 to 3. Detail: pages 4 to 8. Checks: appendices A to D."

!!! mascot-tip "Let the Contents Page Answer 'Where Is the Decision?'"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Put the page of the decision first in the reading guide, and number the sections so that the reader can cite them in the meeting. "See 4.2" saves a minute of searching for every question asked.

The **report scope definition** is the statement of what the report covers, for which period, for whom, and, equally, what it excludes and why. Scope is the largest single decision in a report, because it can change the answer more than any assumption does. For the assistant, the plan and measured ROI exclude controls and risk, and the risk-adjusted ROI includes them, so the scope choice alone moves the result from -5.3% to -62.4%. A scope statement says so. For the assistant it includes the following.

| Scope item | Statement | Consequence of the choice |
|------------|-----------|---------------------------|
| System | The support assistant on vendor A | Other AI systems excluded |
| Period | Years 0 to 3, with year 2 as the steady year | Year 3 is a projection |
| Costs | Plan cost, controls, mitigations, residual risk | Shared governance costs are allocated, not added in full |
| Benefits | Time saved, valued at $30 an hour | Agent satisfaction and quality gains are not valued, so the benefit may be understated |
| Decisions supported | Continue, restructure, widen, or retire | Not a vendor reselection |

Each exclusion carries its consequence. A reader who finds an exclusion that was not disclosed stops trusting the rest.

!!! mascot-warning "Scope Creep Reaches the Reader as a Different Number"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If the cost scope of the draft changes after the first review, every ratio in the report changes, and an earlier version in someone's inbox no longer matches. Fix the scope in a signed paragraph before building the model, and change it only with a version number and a note of what moved.

The **methodology section design** is the layout of the one page that tells the reader how the numbers were made, in enough detail that a second analyst could repeat them. It lists the data sources, the formulas used, the period, the rate, the adjustments, and the limitations. A table does most of the work:

| Measure | Source | Method | Period |
|---------|--------|--------|--------|
| Minutes saved | Ticket timestamps, 2 groups of 2,000 | Difference in means, 95% interval | Year 2 |
| Adoption and coverage | Usage logs | Share of tickets assisted | Year 2 |
| Rework | Quality sample | Increase in reworked tickets, 10 minutes each | Year 2 |
| Costs | Finance ledger and Chapters 21 and 22 model | Plan plus additions | Years 0 to 3 |
| Discount rate | Finance | 10%, with 15% as a hurdle test | Years 0 to 3 |

The test of the page is reproducibility: could a second analyst recompute the $55,080 of realized benefit from it? If not, a source or a formula is missing.

### Findings and Recommendations

The **findings section design** is the way the evidence is laid out so that each finding can be read, checked, and acted on. A finding has a headline that states the result, an exhibit that shows the evidence, a so-what that says why it matters, and a confidence label. The headings are in order of importance to the decision, not in the order the analysis was done, and there are three to five of them. For the assistant:

| ID | Headline | Exhibit | Confidence |
|----|----------|---------|------------|
| F1 | Realized benefit is 68.85% of plan | Bridge from $80,000 to $55,080 | High, measured |
| F2 | Costs the plan left out total $243,291 over three years, mostly controls | Risk-adjusted cost table | Medium, estimated |
| F3 | The result barely depends on the risk judgments | ROI of -62.4% against -58.2% at half the residual loss | High, tested |
| F4 | Two of three appetite rules are breached | Appetite status table | High, rule-based |

Each finding names its exhibit, so that the reader never meets a claim without its evidence. The charts for these exhibits are the subject of Chapter 26.

The **recommendations section design** is the layout of what the reader is asked to do. It states the decision requested first, then the options considered, the option recommended and why, the cost and the commitment, the actions with owners and dates, and what happens without a decision. The recommendation is B with a gate: restructure now and decide in two quarters, whether to continue or retire, with the evidence of a path to $99,027 a year of benefit. Each recommendation must trace back to a finding, and each finding either leads to a recommendation or has a stated reason why not. A judgment about whether a recommendation follows from a cited finding is the test.

| Recommendation | Cited finding | Follows? |
|----------------|---------------|----------|
| Share the platform controls across four systems | Platform controls of $7,560 a year are charged in full to the assistant | Yes |
| Replace vendor A with vendor B | Vendor A's price per token is higher | No, B's annual total is $76,776 against A's $58,680 |
| Hold expansion for two quarters | Break-even needs $104,697, 1.9 times today's benefit | Yes |
| Drop bias testing to save $3,488 | Controls are 1.97 times the usage fees | No, a ratio does not show which control is not needed |

!!! mascot-thinking "Every Recommendation Needs a Parent"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the two recommendations that fail the test are both attractive: a cheaper price and a smaller bill. A recommendation with no finding behind it is a preference, and executives who find one begin to wonder what else was.

### Appendices and Sorting Content

The **appendix design** is the organization of the supporting detail that sits behind the body. It exists so that the body can be short without being unsupported. Each appendix answers one question, is referred to from the body by its letter, and is ordered by first reference. For the assistant:

| Appendix | Contents | Supports | Reader |
|----------|----------|----------|--------|
| A | Assumptions register, graded | The methodology and F1 | CFO's analyst |
| B | Full risk register, 12 lines | F4 and the risk section | CIO, security |
| C | Three-year risk-adjusted cost table | F2 | CFO's analyst |
| D | Sensitivity tables and intervals | F3 | CFO's analyst, auditor |
| E | Glossary and source list | All | Any reader |

The rule for sorting content is whether the reader needs it to decide. If so, it goes in the body, and if the reader needs it only to check, it goes in an appendix. The second specification lets the learner apply this rule to the report's content.

#### Diagram: Report Section Router

<details markdown="1">
<summary>Report Section Router</summary>
Type: microsim
**sim-id:** report-section-router<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify eight pieces of report content into the section of the executive report where each belongs.

**Prerequisites:** executive report structure, report scope definition, methodology section design, findings section design, recommendations section design, appendix design (defined in this chapter).

**Evidence of Mastery:** For each of eight pieces of content the learner commits one section before the answer is shown. A choice is correct when it matches the correct section in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Everything the analysis produced belongs in the body. (2) The methodology section holds the results. (3) Exclusions can be left out because they are negative.

**Instructional Rationale:** Understand-level classification needs the learner to state why an item belongs in a category. The reason shown as feedback ties each item to the reader's need to decide or only to check.

**Content:**

Sections: Executive summary, Scope, Methodology, Findings, Recommendations, Appendix. The rule: the executive summary holds the bottom line and the decision; scope holds what is covered and excluded; methodology holds how the numbers were made; findings hold results with their evidence; recommendations hold what the reader is asked to do; an appendix holds detail the reader needs only to check.

| # | Content shown to the learner | Correct section | Why (shown as feedback) |
|---|---|---|---|
| 1 | The discount rate is 10%, over three years, with 15% as a hurdle test. | Methodology | It says how the numbers were made. |
| 2 | Other AI systems are excluded, because their controls are shared. | Scope | It states an exclusion and its reason. |
| 3 | Realized benefit is 68.85% of plan. | Findings | It is a result. |
| 4 | Approve the restructure and the two-quarter gate. | Recommendations | It is what the reader is asked to do. |
| 5 | The full 12-line risk register with chances and impacts. | Appendix | The reader needs it to check, not to decide. |
| 6 | The assistant does not pay at today's size, and we ask the CFO and CIO to approve a restructure. | Executive summary | It states the bottom line and the decision. |
| 7 | Benefits and costs come from usage logs, ticket timestamps, and the finance ledger. | Methodology | It names the data sources. |
| 8 | The bridge from a planned $80,000 of benefit to $55,080. | Findings | It is the evidence for a finding. |

**Provenance:** All content comes from this chapter and Chapters 10, 11, and 22. The sim must label all data "illustrative".

**Rules:** Each piece of content has exactly one correct section, the one that matches the rule in Content. No item belongs to two sections.

**Learner Activity:**

1. The learner reads content 1, chooses one of the six sections, and presses Commit.
2. The sim shows the correct section and the "Why" text.
3. After eight pieces of content, exploration unlocks: the learner selects any section and sees which of the eight pieces belong in it.
4. The learner should notice that the methodology and findings sections both contain numbers, and that they hold different kinds of numbers.

**Feedback:** Eight pieces of content, fixed order, two attempts each. Correct: "Correct: <section>." Incorrect on the first attempt: the "Why" text without the section. After a second wrong attempt the section is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Content 1 is shown with no choice made. The question on screen is "Which section of the report does this belong in?"

**Chapter Anchors:** The chapter states a discount rate of 10% with a 15% hurdle, a realized benefit of 68.85% of plan, a bridge from $80,000 to $55,080, and a 12-line risk register in the appendix.
</details>

### Summary and Quick Check

An executive report puts the decision first and the evidence behind it, in nine parts, and works at four depths of reading, from 30 seconds to an audit. Its length is a budget: a body of 8.5 pages and 3,075 words takes 15.4 minutes to read, and a cut to a 12-minute read removes 675 words, 1.9 pages, from the body and not from the summary. The cover states the decision, and the contents page says where to find it. The scope states what is in and out and the consequence of each choice, and for the assistant that choice alone moves the ROI from -5.3% to -62.4%. The methodology is one page that another analyst could repeat. Findings are three to five, each with a headline, an exhibit, a so-what, and a confidence label, and recommendations trace to them. The appendices hold what the reader needs only to check.

??? note "Quick check: why is a cut to a report's reading time taken from the body and not from the summary? - Click to expand"
    The summary is the part every reader reads, and the body is the part that can be reduced by moving detail into an appendix. Cutting the summary removes the one section that works alone.

??? note "Quick check: why does the report state what it excludes? - Click to expand"
    An exclusion changes the result, here from -5.3% to -62.4% when controls and risk are in or out, and a reader who finds an undisclosed one stops trusting the rest. Stating each exclusion with its consequence is what lets the reader judge the number.

??? note "Quick check: why does 'replace vendor A with vendor B' fail the traceability test? - Click to expand"
    Its cited finding is that A's price per token is higher, but B's annual total is $76,776 against $58,680 for A, because of its wrong-answer cost. The finding does not support the recommendation.

!!! mascot-celebration "You Can Lay Out the Whole Report"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now set a page and word budget for an executive report, define its scope with consequences, design a methodology page another analyst could repeat, and trace every recommendation to a finding. Chapter 26 gives the findings their charts.
