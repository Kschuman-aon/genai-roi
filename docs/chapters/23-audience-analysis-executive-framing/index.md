---
title: Audience Analysis and Executive Framing
description: How to analyze an executive audience, translate technical cost findings into financial language, and frame a result as a short, bottom-line-first message for a CFO, CIO, CTO, or board.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:18:35
version: 1.11
---

# Audience Analysis and Executive Framing

## Summary

Introduces the audience-analysis and message-framing skills needed to translate technical cost findings into terms a financial executive will act on. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Executive Audience Analysis | 85 |
| Financial Literacy For Engineers | 84 |
| Technical-Financial Translation | 83 |
| Jargon Reduction Technique | 82 |
| Executive Attention Span | 81 |
| Message Framing | 80 |
| Storytelling With Data | 79 |
| Narrative Arc For Reports | 78 |
| Key Message Development | 77 |
| So-What Statement | 76 |
| Elevator Pitch For Findings | 75 |
| Stakeholder Mapping | 74 |
| Audience-Specific Framing | 73 |
| CFO Perspective | 72 |
| CIO Perspective | 71 |
| CTO Perspective | 70 |
| Board-Level Communication | 69 |
| One-Page Summary Technique | 1 |
| Executive Summary Writing | 67 |
| Bottom-Line-Up-Front Principle | 62 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)
- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)

---

Chapter 22 ended with a result that is correct and hard to say. The support assistant was planned at an ROI of 37.5%, measured at -5.3%, and risk-adjusted at -62.4%, an NPV of -$222,085 at 10%, with a break-even benefit of $104,697 a year against the $55,080 it delivers. An engineer can defend every one of those numbers and still lose the room, because the room asks different questions. This chapter is about the step between a correct analysis and a decision: who is listening, what they can absorb, what they need to hear first, and how the same facts are framed for each of them. The running example stays the same, with its figures from Chapters 9 to 22, and every figure below is illustrative.

!!! mascot-welcome "Same Numbers, Different Room"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A finding that nobody acts on has the same return as one that was never made. By the end of this chapter you can turn the assistant's three results into a 30-second pitch, a one-page summary, and a frame for each executive who must approve it. Every token counts, and so does every second of an executive's attention.

### Knowing the Audience

The **executive audience analysis** is the practice of finding out, before writing, who will read or hear the findings, what decision they own, what they already believe, and what would change their mind. It is four questions asked of each reader.

1. **What decision does this person make?** A CFO approves or releases funds, a CIO decides which systems run, and a board member oversees risk.
2. **What do they already believe?** If last quarter's slide promised a 37.5% return, the reader arrives expecting it.
3. **What do they fear?** Embarrassment, a surprise from audit, a budget overrun, or a failed program with their name on it.
4. **What action do I want them to take?** Naming it first prevents a report that informs and asks for nothing.

The **stakeholder mapping** is a diagram that places each person or group on two axes, their power over the decision and their interest in it, and assigns an engagement strategy to each quadrant. For the assistant:

| Stakeholder | Power | Interest | Strategy | What they need |
|-------------|-------|----------|----------|----------------|
| CFO | High | High | Manage closely | The three-way ROI and what would change it |
| CIO | High | High | Manage closely | Portfolio fit, vendor and risk position |
| Board audit committee | High | Low | Keep satisfied | Risk appetite status and one decision |
| CTO | Medium | High | Keep informed | Architecture, debt, and scaling |
| VP of Support | Medium | High | Keep informed | Realized benefit and agent impact |
| Security and legal | Medium | Medium | Consult before release | Control costs and exposure figures |
| Support agents | Low | High | Keep informed | What changes in their work |

The rule of the map is that nobody in the top row is surprised. A CFO who first hears -62.4% in the meeting treats it as an ambush, and one who heard it two days earlier treats it as a finding.

!!! mascot-tip "Write Down the Decision Before the Report"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Complete the sentence "I want [name] to [verb] by [date]" for each person in the top row of the map before you open a document. If you cannot complete it, you do not yet have a recommendation, and no amount of formatting will supply one.

### Executive Attention

The **executive attention span** is the amount of time and concentration an executive can give one finding, which is short and is shared with a dozen other items. It is better treated as a budget than as a character trait. Take a reading speed of 200 words a minute and a speaking pace of 130 words a minute, both assumptions to be replaced by measurements of your audience. Then a 5-minute read is \( 5 \times 200 = 1{,}000 \) words, and a 6,000-word report takes \( 6{,}000 \div 200 = 30 \) minutes. An 8-minute presentation has \( 8 \times 130 = 1{,}040 \) spoken words, which is 4 slides at 2 minutes each, and in a 20-minute slot it leaves \( 12 \div 20 = 60\% \) of the time for questions.

Three consequences follow. The first message must be understood in the first minute, since that is all that some readers will give. Each page or slide carries one idea. And the material that cannot fit is not deleted but moved to an appendix, where a reader who doubts a number can find its source. The first of the three specifications below lets the learner practice the arithmetic.

#### Diagram: Attention Budget Calculator

<details markdown="1">
<summary>Attention Budget Calculator</summary>
Type: microsim
**sim-id:** attention-budget-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the word count, reading time, speaking time, and slide count that fit eight stated executive time slots, to within the tolerance stated for each item.

**Prerequisites:** executive attention span, one-page summary technique, elevator pitch for findings (defined in the sections "Executive Attention" and "Framing and Telling the Story" of this chapter).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A longer report is a more credible one. (2) Reading and speaking take the same time per word. (3) The whole slot can be used for presenting.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Turning a time slot into a word budget makes the cost of each extra paragraph concrete, and the exploration shows how much the pace assumptions move the answer.

**Content:**

Assumptions: reading pace 200 words a minute and speaking pace 130 words a minute, both illustrative.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Words a reader can read in 5 minutes | 1,000 | 0 | 5 × 200 = 1,000. |
| 2 | Minutes to read a 6,000-word report | 30 | 0 | 6,000 ÷ 200 = 30. |
| 3 | Words spoken in an 8-minute presentation | 1,040 | 0 | 8 × 130 = 1,040. |
| 4 | Slides in an 8-minute presentation at 2 minutes a slide | 4 | 0 | 8 ÷ 2 = 4. |
| 5 | Share of a 20-minute slot left for questions after an 8-minute talk | 60% | 0.1 | (20 − 8) ÷ 20 = 0.60. |
| 6 | Minutes to read a 450-word one-page summary | 2.25 | 0.01 | 450 ÷ 200 = 2.25. |
| 7 | Words to cut from a 1,500-word summary to fit a 3-minute read | 900 | 0 | 3 × 200 = 600 words fit, and 1,500 − 600 = 900. |
| 8 | Words in a 30-second pitch | 65 | 0 | 0.5 × 130 = 65. |

**Provenance:** The pace assumptions and the figures come from the chapter sections "Executive Attention" and "Framing and Telling the Story". The sim must label all data "illustrative".

**Rules:** Words = minutes × pace. Minutes = words ÷ pace. Slides = minutes ÷ minutes per slide. Question share = (slot − talk) ÷ slot. Words are shown as whole numbers, times to two decimals, and shares to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Reading pace | 150 | 300 | 10 | 200 | words per minute |
| Speaking pace | 100 | 180 | 10 | 130 | words per minute |
| Time slot | 5 | 60 | 5 | 20 | minutes |
| Presentation time | 3 | 30 | 1 | 8 | minutes |

**Learner Activity:**

1. The learner reads the assumptions and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the two paces, the slot, and the presentation time, and watches the word budget, the slide count, and the question share update.
4. The learner should notice that a 10-word change in speaking pace moves the 8-minute budget by 80 words.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The assumptions are shown and item 1 has an empty answer box. The question on screen is "How many words can a reader take in during a 5-minute read?"

**Chapter Anchors:** The chapter states a reading pace of 200 and a speaking pace of 130 words a minute, 1,000 words in 5 minutes, 30 minutes for 6,000 words, 1,040 spoken words in 8 minutes, and 60% of a 20-minute slot for questions.
</details>

### Speaking the Reader's Language

The **financial literacy for engineers** is the working knowledge of finance that an engineer needs to be understood by the people who fund the work. It is smaller than an accountant's, and it is mostly vocabulary with a few ideas behind it. Chapters 9 to 11 supplied the ideas: NPV, payback, ROI, the fully loaded cost, and the difference between cost reduction and cost avoidance. The table translates the words an engineer reaches for into the words a finance reader hears.

| An engineer says | A finance reader hears | Use instead |
|------------------|------------------------|-------------|
| Cost per token | A price, with no volume | Cost per ticket or per customer |
| Headcount saved | A reduction already in the ledger | Hours freed, a cost avoidance unless a role is removed |
| Technical debt | An unexplained liability | Deferred maintenance: $10,800 to fix, $19,656 of extra cost if left |
| Pilot | An open-ended experiment | A stage-gated investment with a stated exit test |
| We will optimize later | An unbudgeted cost | A named cost with an owner and a date |
| High availability | A vague promise | Downtime cost per hour and the hours allowed |

The **technical-financial translation** is the conversion of a technical measurement into the financial outcome it causes, expressed in the unit the audience budgets in. It needs the chain of Chapter 11: the measurement, the quantity it changes, and the money. Four examples from the assistant follow.

- **Tokens to cost per ticket.** Each query sends 3,000 input and 800 output tokens, costing $0.0155, and a ticket has 6 queries, so model fees are \( 6 \times 0.0155 = \$0.093 \) a ticket. The labor in a ticket is \( 15 \div 60 \times 30 = \$7.50 \), so the fees are 1.2% of the labor they affect.
- **Rework rate to dollars.** A rework rate that rose from 8% to 9% means 1 more ticket in every 100 comes back. Across 122,400 assisted tickets that is 1,224 tickets and $6,120 of agent time.
- **Adoption to benefit.** An adoption rate of 85% and coverage of 90% mean that of every $100 of planned benefit, $68.85 is realized after rework.
- **Version pinning to expected loss.** Pinning model versions costs $1,200 a year and removes $5,616 of the $9,360 expected annual loss from unannounced updates.

!!! mascot-thinking "A Measurement Is Not Yet a Message"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that each translation changes the unit as well as the words: tokens became dollars, a rate became a count of tickets, and a pinning policy became a loss avoided. If your sentence still contains a unit that only your team uses, it is a measurement, and the executive cannot weigh it against anything.

The **jargon reduction technique** is a routine for removing words the reader cannot use. For each technical term, ask whether the reader needs it to decide. If not, delete it. If so, define it in plain words the first time and use it consistently. If a plain word does the same job, replace it. Applying the routine to a sentence from an engineer's draft:

> Input token consumption per inference increased 18% post-migration due to prompt template bloat, degrading unit economics.

The sentence has 16 words, and four terms an executive may not know. The translation first needs the money. If the average input rose from 3,000 to 3,540 tokens, and output stayed at 800, the cost per query rose from $0.0155 to \( 3{,}540 \times 2.50 \div 10^6 + 800 \times 10 \div 10^6 = \$0.01685 \), which is 8.7% and not 18%, because output tokens cost more and did not change. Across 960,000 queries it is $1,296 a year.

> Each answer now costs 8.7% more, $1,296 a year, because the instructions we send with every question grew longer.

The second version has 19 words and no jargon. It is longer, and it says how much, how often, and why, which the first did not. Reducing jargon is not the same as reducing words. Notice also that the engineer's 18% is not wrong, but it is the wrong number for this reader, since it is a quantity of tokens and not of money.

!!! mascot-warning "The Reader Will Not Ask What a Term Means"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Executives rarely interrupt to ask for a definition, so an unknown term costs you the sentence silently. Test a draft by giving it to someone outside your team and asking them to underline every word they would have to look up, then fix each underline.

### Perspectives of the Decision Makers

The **audience-specific framing** is the choice of which facts to lead with, in which unit, for a particular audience, with the facts themselves unchanged. A frame changes emphasis, never the numbers. Four audiences matter for an ROI finding, and each has a question that comes before all others.

The **CFO perspective** is the view of the person accountable for funds and for the accuracy of forecasts. Their first question is whether the numbers will hold, and they think in cash timing, NPV, payback, and variance to plan. For the assistant, the plan's payback is \( 1 + 30{,}000 \div 45{,}000 = 1.67 \) years, the realized case has not paid back by year 3, with a cumulative position of -$8,530, and the benefit came in at 68.85% of plan, a forecast error of 31.15%. A CFO also asks what would change the answer, which the sensitivity analysis of Chapter 10 provides.

The **CIO perspective** is the view of the person accountable for the portfolio of systems, their vendors, and their operating risk. Their first question is how this fits with everything else they run. The assistant is one of 12 AI systems, at governance maturity level 3, with $29,288 a year of controls that would be cheaper per system if shared, and with a vendor whose exit would cost $11,904. They want to know about concentration, support, and what happens if the vendor changes.

The **CTO perspective** is the view of the person accountable for the architecture and its ability to scale. Their first question is whether the system is sound and what it will cost to change. At 960,000 queries a year the assistant is about a third of the 2.93 million at which self-hosting beats vendor A, and its technical debt costs $10,800 to fix against $19,656 of interest over three years. They need the findings that bear on engineering work, not those that bear on finance.

The **board-level communication** is the reporting of findings to directors who oversee the organization and do not manage it. Their first question is whether management has risk under control and what is asked of them. A board reads little, often once, before the meeting. It needs the appetite status, the two rules breached, a single recommendation, and the decision requested, on one page, with the detail available behind it. The second specification lets the learner match statements to audiences.

#### Diagram: Audience Framing Matcher

<details markdown="1">
<summary>Audience Framing Matcher</summary>
Type: microsim
**sim-id:** audience-framing-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify eight statements about the assistant by the audience, CFO, CIO, CTO, or board, whose first question each statement answers.

**Prerequisites:** audience-specific framing, CFO perspective, CIO perspective, CTO perspective, board-level communication (defined in the section "Perspectives of the Decision Makers" above).

**Evidence of Mastery:** For each of eight statements the learner commits one audience before the answer is shown. A choice is correct when it matches the correct audience in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Every executive wants every number. (2) A statement that contains a dollar figure is always for the CFO. (3) A risk statement is always for the board.

**Instructional Rationale:** Understand-level classification needs the learner to say why an example belongs to a category. The reason shown as feedback ties each statement to the audience's first question, and the exploration shows one result in four frames.

**Content:**

First questions: the CFO asks whether the numbers will hold. The CIO asks how the system fits with everything else that is run. The CTO asks whether the system is sound and what it will cost to change. The board asks whether risk is under control and what is asked of it.

| # | Statement shown to the learner | Correct audience | Why (shown as feedback) |
|---|---|---|---|
| 1 | The three-year NPV at 10% is -$18,037 and the assistant does not pay back in three years. | CFO | NPV and payback are the finance tests of whether the numbers hold. |
| 2 | Two of the three appetite rules are breached, and the decision is whether to escalate. | Board | Risk appetite and escalation are the board's oversight. |
| 3 | The prompts live in 14 places with no tests, and fixing them costs $10,800 against $19,656 of interest. | CTO | Technical debt is an engineering condition and a cost to change. |
| 4 | Vendor A carries a 25% renewal price-rise risk, and leaving early would cost $11,904. | CIO | Vendor concentration and contract exposure are portfolio concerns. |
| 5 | The realized benefit is 68.85% of plan, a forecast error of 31.15%. | CFO | Variance to plan is how a CFO judges forecast reliability. |
| 6 | At 960,000 queries a year the assistant is about a third of the 2.93 million at which self-hosting wins. | CTO | The hosting break-even is an architecture and scaling question. |
| 7 | The assistant is one of 12 AI systems, governance is at level 3, and its controls cost $29,288 a year. | CIO | How one system sits in the portfolio and its governance is the CIO's concern. |
| 8 | Management asks the board to approve restructuring the controls and deferring expansion for two quarters. | Board | A requested decision on risk is addressed to directors. |

Exploration frames of the same result: CFO: "Over three years the assistant returns -5.3% against a planned 37.5%, and priced for risk it is -62.4%, an NPV of -$222,085 at 10%." CIO: "One of 12 AI systems carries $29,288 a year of controls and breaches two appetite rules, so the portfolio needs shared controls." CTO: "The system is sound to operate at 960,000 queries, and $10,800 of technical debt costs $19,656 in interest if left." Board: "Management asks the board to approve a restructure and to defer expansion, because the system breaches the risk appetite."

**Provenance:** All statements and figures come from this chapter and from Chapters 10, 11, 19, 20, 21, and 22. The sim must label all data "illustrative".

**Rules:** Each statement has exactly one correct audience, the one whose first question it answers. No statement is shared between audiences. Figures are shown as written.

**Learner Activity:**

1. The learner reads statement 1, chooses CFO, CIO, CTO, or Board, and presses Commit.
2. The sim shows the correct audience and the "Why" text.
3. After eight statements, exploration unlocks: the learner chooses an audience and sees the frame of the assistant's result written for it.
4. The learner should notice that the four frames contain different figures about one system and none of them contradicts another.

**Feedback:** Eight statements, fixed order, two attempts each. Correct: "Correct: <audience>." Incorrect on the first attempt: the "Why" text without the audience. After a second wrong attempt the audience is shown and the statement counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Statement 1 is shown with no choice made. The question on screen is "Whose first question does this statement answer?"

**Chapter Anchors:** The chapter states an NPV of -$18,037, a forecast error of 31.15%, a technical debt cost of $10,800 against $19,656, an exit cost of $11,904, 12 systems, controls of $29,288, and a hosting break-even of 2.93 million queries.
</details>

### Framing and Telling the Story

The **message framing** is the choice of how a finding is presented, through what it is compared with and in what unit, so that the same facts lead to a clear reading. Four frames are common: absolute against ratio, total against per unit, loss against gain, and the baseline chosen. The assistant's result can be said four ways.

| Frame | Statement |
|-------|-----------|
| Absolute loss | The assistant loses $49,617 in a steady year. |
| Ratio | The assistant returns -62.4% over three years. |
| Per unit | Each query earns 5.7 cents and costs 10.9 cents. |
| Break-even | The assistant needs $104,697 of benefit a year and delivers 52.6% of that. |

All four are true, and they do not feel the same. A loss frame prompts action more than a gain frame does, and a per-unit frame invites the question of what to change. The rule is that a frame may choose what to emphasize but may not remove the bad number, which Chapter 24 takes up under honest reporting.

The **storytelling with data** is the use of data as the evidence in an account that has people, a problem, and a point, instead of as a display. Its test is whether each chart or number is there because the story needs it. The **narrative arc for reports** is the order that the account takes. A reliable arc for findings has three parts: the situation the reader already knows, the complication that the data reveals, and the resolution that you propose. For the assistant:

| Arc stage | Content | Number carried |
|-----------|---------|----------------|
| Situation | The assistant was approved at a planned ROI of 37.5% | $60,000 investment, NPV $38,272 |
| Complication | It delivers 69% of the benefit and carries $243,291 of costs the plan left out | ROI -5.3%, then -62.4% |
| Resolution | Restructure the controls, decide on expansion in two quarters | Break-even benefit $104,697 |

The **key message development** is the work of reducing a body of analysis to the few statements a reader should leave with. Three is the working limit, since most readers retain about that many. Each message is a sentence of 15 words or fewer that has a number and one piece of evidence behind it. For the assistant:

1. The assistant delivers 69% of its planned benefit. Evidence: $55,080 against $80,000.
2. Priced for risk, it costs $104,697 a year. Evidence: the Chapter 22 model.
3. We recommend restructuring and deciding on expansion in two quarters. Evidence: shared controls and an adoption gain of 10 points are worth $12,150 a year between them.

The **so-what statement** is the sentence that follows a finding and says why it matters. A finding without one is an observation. Adoption of 85% becomes: each point is worth $648 a year, so moving from 85% to 95% adds $6,480. A one-point rise in rework becomes: it costs $6,120 a year, so each point removed saves $6,120. The test is whether the reader could act on the sentence.

The **elevator pitch for findings** is the whole result in the time of a short conversation, about 30 seconds, which at 130 words a minute is up to 65 words. A pitch has a result, a reason, and a request:

> The support assistant delivered 69% of its planned benefit, $55,080 a year against $80,000. Once we price its controls and risks, it costs about $105,000 a year, so it does not pay at today's size. We recommend sharing the control costs across other systems and deciding in two quarters whether to widen its use or retire it.

It has 57 words, which takes 26 seconds at 130 words a minute. A pitch you cannot give in a lift between floors is one you do not yet understand well enough.

!!! mascot-tip "Test the Pitch With the So-What Question"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Say your pitch to a colleague and ask only "so what?" after each sentence. A sentence that cannot answer it belongs in the appendix, and a question you cannot answer is a gap to close before the meeting.

### Writing the Summary

The **bottom-line-up-front principle** is the rule that a message opens with its conclusion, recommendation, or request, and supports it afterward. The reader who stops after one sentence has still received the point. The common alternative, building from background to conclusion in the order the analysis was done, serves the analyst, and an executive can run out of time before the end. Compare two openings.

> Buried: This report reviews the performance of the support assistant over its first two years.
>
> Up front: The assistant delivered 68.85% of its planned benefit, and we recommend deferring expansion for two quarters.

The test is whether a reader who stops after the first sentence knows the verdict and what is wanted. A number alone does not meet it: "The assistant handled 960,000 queries" is a fact and not a conclusion.

The **executive summary writing** is the preparation of the short section, at the start of a report, that a decision maker may read in place of the report. It states the bottom line, the decision requested, the three numbers that support it, the main risk, and the options. It contains nothing that is not in the report, and it can be read without the report. The **one-page summary technique** is a fixed layout that holds this to one page of about 450 words, which is 2.25 minutes at 200 words a minute:

| Section | Words |
|---------|------:|
| Bottom line | 40 |
| Decision requested | 40 |
| Three supporting numbers | 60 |
| Why | 100 |
| Main risks | 80 |
| Options | 80 |
| Next step and date | 50 |
| **Total** | **450** |

The third specification lets the learner judge openings against the principle.

#### Diagram: Summary Opening Critic

<details markdown="1">
<summary>Summary Opening Critic</summary>
Type: microsim
**sim-id:** summary-opening-critic<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** critique<br/>
**Learning Objective:** The learner will critique eight opening sentences of an executive summary by judging whether each leads with the bottom line, using the stated test.

**Prerequisites:** bottom-line-up-front principle, so-what statement, executive summary writing (defined in the section "Writing the Summary" above).

**Evidence of Mastery:** For each of eight openings the learner commits Leads or Buries before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) An opening that contains a number leads with the bottom line. (2) An opening that describes the report is a safe default. (3) A long opening is more complete and therefore better.

**Instructional Rationale:** Evaluate-level work applies a criterion to a case and explains the verdict. Openings that contain a number and still fail the test make the learner check for a verdict, not for a figure.

**Content:**

Test: an opening Leads when its first sentence states a verdict, a recommendation, or a decision requested, and contains at least one number tied to it. Otherwise it Buries.

| # | Opening shown to the learner | Correct choice | Why (shown as feedback) | Rewrite shown after the answer |
|---|---|---|---|---|
| 1 | This report reviews the performance of the support assistant over its first two years. | Buries | It describes the report and gives no verdict. | The assistant delivered 68.85% of its planned benefit and does not pay at today's size. |
| 2 | We recommend restructuring the assistant's controls and deferring expansion, because it returns -62.4% when risks are priced. | Leads | It states a recommendation with a number. | Not needed. |
| 3 | The assistant handled 960,000 queries and 160,000 tickets in year 2. | Buries | The numbers are volumes and not a verdict. | The assistant handled 160,000 tickets but delivered only 68.85% of its planned benefit. |
| 4 | The assistant delivered $55,080 a year, 68.85% of the planned $80,000. | Leads | It states the result against the plan with numbers. | Not needed. |
| 5 | Several factors, including adoption, rework, and control costs, affect the economics of the assistant. | Buries | It names topics and states no result or number. | Adoption, rework, and control costs cut the assistant's year-2 net from a planned $45,000 to -$49,617. |
| 6 | We ask you to hold expansion, because the assistant breaks even only at $104,697 of benefit a year, 1.9 times today's. | Leads | It states a requested decision with a number. | Not needed. |
| 7 | As discussed at the last meeting, we have continued our analysis. | Buries | It refers to a process and states no result. | We recommend deferring expansion for two quarters while the controls are restructured. |
| 8 | After pricing risk, the assistant costs $0.109 a query against a benefit of $0.057. | Leads | It states the result per query with numbers. | Not needed. |

**Provenance:** All openings and figures come from this chapter and Chapters 10, 11, and 22. The sim must label all data "illustrative".

**Rules:** An opening is Leads only when both parts of the test are met: a verdict, recommendation, or decision requested, and a number tied to it. A number alone does not meet the test. No opening is partly correct.

**Learner Activity:**

1. The learner reads opening 1, chooses Leads or Buries, and presses Commit.
2. The sim shows the correct choice, the "Why" text, and, for a Buries opening, its rewrite.
3. After eight openings, exploration unlocks: the learner selects any opening and sees its test result and its rewrite.
4. The learner should notice that opening 3 contains two numbers and still buries the bottom line.

**Feedback:** Eight openings, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the opening counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Opening 1 is shown with no choice made. The question on screen is "Does this opening lead with the bottom line?"

**Chapter Anchors:** The chapter states a realized benefit of 68.85% of plan, a risk-adjusted ROI of -62.4%, a break-even benefit of $104,697, a cost of $0.109 a query and a benefit of $0.057 a query, and the one-page layout of 450 words.
</details>

!!! mascot-encourage "Cutting Your Own Analysis Is Hard"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    After weeks on a model, every number feels essential, and reducing it to 450 words can feel like discarding work. Write the long version first, then cut by asking of each line whether the reader could decide without it, and keep the cut material in the appendix.

### Summary and Quick Check

An audience is analyzed by the decision it owns, what it believes, what it fears, and the action you want, and a stakeholder map keeps those in the top row from being surprised. Attention is a budget: 200 words a minute reading and 130 speaking give 1,000 words in a 5-minute read and 1,040 in an 8-minute talk. Engineers translate tokens, rates, and policies into dollars per ticket, tickets, and losses avoided, and cut jargon by defining or replacing every term the reader cannot use, as when an 18% rise in input tokens becomes an 8.7% cost rise of $1,296 a year. The CFO asks whether the numbers hold, the CIO how the system fits the portfolio, the CTO whether it is sound, and the board whether risk is controlled and what is asked. The frame changes emphasis and never the facts. A story has a situation, a complication, and a resolution, three key messages, a so-what for every finding, and a pitch of about 65 words. Every written summary leads with its bottom line and fits one page of 450 words.

??? note "Quick check: why is an 18% rise in input tokens the wrong number for an executive? - Click to expand"
    It is a quantity of tokens and not of money. Output tokens cost more per token and did not change, so the cost per query rose only 8.7%, $1,296 a year, which is the figure a budget holder can use.

??? note "Quick check: why does the sentence 'The assistant handled 960,000 queries' bury the bottom line? - Click to expand"
    It states a volume and not a verdict, recommendation, or request. A reader who stops there still does not know whether the assistant is working or what is wanted.

??? note "Quick check: why should nobody in the top row of the stakeholder map first hear the result in the meeting? - Click to expand"
    A high-power, high-interest reader who is surprised reads the finding as an ambush and defends the old number. One who heard it earlier has had time to ask questions and treats it as a finding.

!!! mascot-celebration "You Can Say It in the Room's Language"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now analyze an audience, budget its attention, translate a technical measurement into dollars, frame one result for a CFO, CIO, CTO, and board, and open with the bottom line in 57 words or on one page. Chapter 24 takes that message into the room and defends it.
