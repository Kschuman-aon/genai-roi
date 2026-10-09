---
title: Presenting and Defending Findings to Executives
description: How to present a financial finding with its assumptions and uncertainty visible, frame a recommendation, prepare for objections and questions, and keep every claim as strong as its evidence and no stronger.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:21:37
version: 1.11
---

# Presenting and Defending Findings to Executives

## Summary

Covers presentation design, handling uncertainty and objections, and the credibility-building techniques used to defend findings before an executive audience. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Assumption Transparency | 61 |
| Confidence Interval Framing | 60 |
| Uncertainty Communication | 59 |
| Risk Communication To Executives | 58 |
| Recommendation Framing | 57 |
| Actionable Insight Development | 36 |
| Objection Anticipation | 35 |
| Q&A Presentation Prep | 34 |
| Executive Presentation Design | 33 |
| Slide Design For Financial Data | 32 |
| Verbal Presentation Technique | 31 |
| Written Report Tone | 30 |
| Credibility Building Technique | 29 |
| Data-Driven Persuasion | 28 |
| Ethical Findings Communication | 27 |
| Avoiding Overstated Claims | 26 |
| Benchmarking Against Peers | 4 |
| Industry Comparison Framing | 3 |
| Communication Feedback Loop | 1 |
| Iterative Report Refinement | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 23: Audience Analysis and Executive Framing](../23-audience-analysis-executive-framing/index.md)

---

Chapter 23 produced a message: the support assistant delivered 69% of its planned benefit, costs about $105,000 a year when risk is priced, and should have its controls restructured and its future decided in two quarters. A message is not yet a defended finding. In the room, someone will ask where the $30 an hour came from, whether the 1-minute saving is real, and why they should pay for risks that have not happened. This chapter covers what happens after the message is written: how to show assumptions and uncertainty without losing the point, how to present and frame a recommendation, how to prepare for objections, and how to keep every claim honest. The running example continues, and all figures are illustrative.

!!! mascot-welcome "Ready for the Hard Questions"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A finding that survives scrutiny is worth more than a finding that was never challenged, and scrutiny is where trust is made. By the end of this chapter you can show your assumptions, give a range instead of a false point, and answer the objections you can already predict. Every token counts, and so does every claim.

### Showing What the Numbers Rest On

The **assumption transparency** is the practice of listing the assumptions behind a result, with their values, their sources, and how much the result depends on each. It does not weaken a finding. A result with hidden assumptions is attacked at the weakest one, and one with visible assumptions is attacked only where the reader has a better number. Grade each assumption by its evidence: measured, estimated from a sample or a quote, or a judgment. The assistant's year-2 result rests on these.

| Assumption | Value | Basis | Grade | Effect of a plausible change on the year-2 net |
|------------|-------|-------|-------|-----------------------------------------------|
| Minutes saved per ticket | 1.0 | Timestamps, 2 groups of 2,000 tickets | Measured | +0.1 minute adds $6,120 |
| Adoption | 85% | Usage logs | Measured | +1 point adds $648 |
| Usage coverage | 90% | Usage logs | Measured | +1 point adds $612 |
| Labor rate for saved time | $30 an hour | Finance, fully loaded | Estimated | +$3 adds $5,508 |
| Rework increase | 1 point | Quality sample | Estimated | +1 point costs $6,120 |
| Shadow AI removed by approved tool | 90% | Staff survey | Judgment | 75% costs $5,400 |
| Chance catch rate falls (overreliance) | 15% | Judgment | Judgment | 30% costs $3,456 |

The last column comes from the model of Chapter 22 and tells the reader where to argue. The labor rate row shows how a change works through the model: a 10% rise in the rate, from $30 to $33, raises the benefit before rework from $61,200 to $67,320, which is $6,120, and raises the cost of the rework time by 10%, from $6,120 to $6,732, which is $612, so the net gain is $5,508. The table is the answer to a long list of future questions, and it is short enough to put on a slide.

The **confidence interval framing** is the presentation of an estimate as a range with a stated probability, not as a single number. The 1.0-minute saving is a measurement from a sample. With groups of 2,000 tickets and a standard deviation of 6 minutes, the standard error of the difference is \( 6 \times \sqrt{2 \div 2000} = 0.19 \), and a 95% interval is \( 1.0 \pm 1.96 \times 0.19 \), which is 0.63 to 1.37 minutes. The year-2 realized benefit is \( 61{,}200 \times m - 6{,}120 \) for \( m \) minutes saved, so the interval is $32,314 to $77,846. Subtracting the risk-adjusted cost of $104,697 gives a net of -$72,383 to -$26,851. The interval is wide and sits wholly below zero, which is what makes it useful: the conclusion that the assistant does not pay does not depend on the exact minute. The test of an interval is whether it crosses the line that decides the question. Here the line is zero, and the interval does not reach it.

The **uncertainty communication** is the wider practice of telling the reader how much to trust a number, by whatever means fit the audience. Three forms are common.

| Form | Example | Best for |
|------|---------|----------|
| A range | The net is between -$72,000 and -$27,000 | Readers who want the numbers |
| Scenarios | Plan, realized, and risk-adjusted cases | Readers who think in cases |
| A confidence label | High confidence on benefit, low on the shadow AI risk | Readers who want a verdict on quality |

One rule applies to all three: put the range next to the number, in the same place, and do not hide it in a footnote. The first specification lets the learner practice the interval arithmetic.

#### Diagram: Interval Reader

<details markdown="1">
<summary>Interval Reader</summary>
Type: microsim
**sim-id:** interval-reader<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the standard error, the 95% interval for minutes saved, and the year-2 benefit and risk-adjusted net at each end of it, to within the tolerance stated for each item.

**Prerequisites:** confidence interval framing, realized benefit, risk-adjusted cost (defined in the section "Showing What the Numbers Rest On" above and in Chapters 11 and 22).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A measured average is the true value. (2) A wide interval means the conclusion is unknown. (3) The interval for the benefit and the interval for the net are the same width as the interval for the minutes.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Carrying the interval through to the net shows the learner that the interval of a result is what decides whether a conclusion survives.

**Content:**

Fixed inputs: observed difference 1.0 minute, standard deviation 6 minutes per ticket, 2,000 tickets in each group, z = 1.96. Realized year-2 benefit = 61,200 × minutes − 6,120. Risk-adjusted cost = $104,697.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Standard error of the difference, minutes | 0.19 | 0.01 | 6 × √(2 ÷ 2,000) = 0.1897. |
| 2 | Half-width of the 95% interval, minutes | 0.37 | 0.01 | 1.96 × 0.1897 = 0.372. |
| 3 | Lower end of the interval, minutes | 0.63 | 0.01 | 1.0 − 0.372 = 0.628. |
| 4 | Upper end of the interval, minutes | 1.37 | 0.01 | 1.0 + 0.372 = 1.372. |
| 5 | Year-2 benefit at the lower end | $32,314 | 100 | 61,200 × 0.628 − 6,120 = 32,314. |
| 6 | Year-2 benefit at the upper end | $77,846 | 100 | 61,200 × 1.372 − 6,120 = 77,846. |
| 7 | Risk-adjusted net at the upper end | -$26,851 | 100 | 77,846 − 104,697 = −26,851. |
| 8 | Tickets in each group needed to halve the half-width | 8,000 | 0 | The half-width falls with the square root of the group size, so halving it needs 4 × 2,000 = 8,000. |

**Provenance:** The inputs come from this chapter and Chapters 11, 12, and 22. The sim must label all data "illustrative".

**Rules:** SE = SD × √(2 ÷ n). Half-width = 1.96 × SE. Benefit = 61,200 × minutes − 6,120. Net = benefit − 104,697. Dollars are shown to the whole dollar, minutes to two decimals. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Observed difference | 0.2 | 2.0 | 0.1 | 1.0 | minutes |
| Standard deviation | 3 | 9 | 1 | 6 | minutes |
| Tickets in each group | 500 | 8,000 | 500 | 2,000 | tickets |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the three quantities and watches the interval for the minutes, the benefit, and the net update.
4. The learner should notice that at the default sample the upper end of the net's interval reaches zero only when the observed saving is about 1.4 minutes.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "How uncertain is the measured saving of 1.0 minute?"

**Chapter Anchors:** The chapter states a standard error of 0.19, an interval of 0.63 to 1.37 minutes, a benefit interval of $32,314 to $77,846, and a net interval of -$72,383 to -$26,851.
</details>

### Communicating Risk and Recommending

The **risk communication to executives** is the presentation of a risk so that a non-specialist can place it: how likely, how large, what is already done about it, and what is asked. Two habits help. Say frequencies and not probabilities, because "1 in 20 years" is understood where "5%" is not. And state both the event and the expected loss, because the event is what people remember and the expected loss is what the budget needs. For the vendor data incident: "There is about a 1 in 20 chance each year of an incident costing $80,000 after our controls. The yearly expected loss is $4,001, and we propose to insure the event for $3,600." The sentence has a frequency, an impact, an expected value, and a request, and it has no adjective.

!!! mascot-thinking "A Probability Is a Promise About Many Years"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that "5% a year" does not mean the incident will not happen this year, and it does not mean it will in 20. Say "1 in 20" and add "in any given year, with no memory", and the room will not take a quiet year as proof that the risk was inflated.

The **recommendation framing** is the way a recommendation is put to a decision maker: the options considered, the one recommended and why, what it costs, what it commits the organization to, and how it can be reversed. Four options for the assistant follow. Each is stated as its year-2 net and what it needs.

| Option | Year-2 net | What it needs |
|--------|-----------:|---------------|
| A. Continue as is | -$49,617 | Nothing |
| B. Restructure | -$37,467 | $3,600 once, then shared controls and an adoption push |
| C. Widen use | Break-even at $104,697 of benefit | Evidence of 1.9 times today's benefit |
| D. Retire | $0 | $4,500 to retire, and loss of $55,080 of benefit |

Option B is the sum of two levers from Chapter 22: sharing the platform controls over four systems saves $5,670 and ten more points of adoption add $6,480, so the net improves by $12,150, and the one-off work is 40 hours at $90. Its break-even is \( 35{,}000 + 64{,}027 = \$99{,}027 \) of benefit against $61,560 after the adoption push, so it does not close the gap alone. Option D saves the whole $104,697 of cost and gives up $55,080 of benefit, so it is \( 104{,}697 - 55{,}080 = \$49{,}617 \) a year better than A, with the $60,000 invested already spent whichever option is chosen.

The recommendation is B with a gate. Restructure now, and in two quarters continue only if there is evidence of a way to reach $99,027 of annual benefit, and retire otherwise. The two quarters cost about \( 0.5 \times 37{,}467 + 3{,}600 = \$22{,}334 \) against retiring today. That is the price of the information, and it is stated in the recommendation so that nobody has to discover it.

The **actionable insight development** is the conversion of a finding into an action with an owner, a date, and an expected value. A finding says what is true, and an insight says what to do about it. The table lists four from this program.

| Finding | Action | Owner | By | Expected value |
|---------|--------|-------|----|---------------:|
| Adoption is 85% | Coach the two lowest-adoption teams | VP of Support | 90 days | $6,480 a year at +10 points |
| Platform controls are charged to one system | Share access reviews, audit readiness, and drills across 4 systems | CIO | Next budget | $5,670 a year |
| Prompts sit in 14 places with no tests | Pay down the debt | CTO | 2 quarters | $8,856 over 3 years, $19,656 − $10,800 |
| A manual 1% sample checks policy | Automate the check | Security | 1 quarter | $10,800 over 3 years |

!!! mascot-tip "An Insight Has Three Blanks"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before a finding goes in a report, fill in "Because [finding], [owner] should [action] by [date], worth [amount]." If you cannot name an owner, you have an observation, and if you cannot name an amount, you have an opinion.

### Preparing for the Room

The **objection anticipation** is the practice of listing the challenges the audience is likely to raise, with a prepared answer and the evidence for each, before the meeting. Most objections are predictable, and they fall into four kinds that call for four kinds of response: a question about where a number came from calls for its source, a question about what if calls for a sensitivity, a question about how one number became another calls for a bridge, and a question about why not something else calls for the alternative. The bridge from plan to risk-adjusted is the one a CFO will ask for first.

| Step | Benefit | Cost | Net |
|------|--------:|-----:|----:|
| Plan, year 2 | $80,000 | $35,000 | $45,000 |
| After adoption 85% and coverage 90% | $61,200 | $35,000 | $26,200 |
| After rework | $55,080 | $35,000 | $20,080 |
| After retraining, change, controls, mitigations | $55,080 | $77,436 | -$22,356 |
| After expected residual loss | $55,080 | $104,697 | -$49,617 |

The **Q&A presentation prep** is the rehearsal of the question period. A 20-minute slot with an 8-minute talk leaves 12 minutes, which at about 1.5 minutes an answer is 8 questions, and preparing three times as many, 24, covers most of what will be asked. Collect them from people who have read the draft, put each on a card with its type and its evidence, and rehearse with one person assigned to be hostile. Agree in advance what to say when you do not know: the answer is "I don't have that figure; I will send it by Friday", and then to send it.

The second specification lets the learner choose the response to each objection.

#### Diagram: Objection Response Chooser

<details markdown="1">
<summary>Objection Response Chooser</summary>
Type: microsim
**sim-id:** objection-response-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of eight executive objections, the type of response that answers it best from source, sensitivity, bridge, and alternative.

**Prerequisites:** objection anticipation, assumption transparency, recommendation framing (defined in the sections "Showing What the Numbers Rest On" and "Preparing for the Room" above).

**Evidence of Mastery:** For each of eight objections the learner commits one response type before the answer is shown. A choice is correct when it matches the correct type in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Every objection is answered by more data. (2) A "what if" question is answered by defending the base case. (3) "Why not just stop?" is a hostile question and not an option to be priced.

**Instructional Rationale:** Evaluate-level work picks the best of several courses of action against a criterion. Objections of similar tone that need different evidence make the learner identify what is actually being asked.

**Content:**

Response types: Source shows where a number came from. Sensitivity shows how the result changes when an input changes. Bridge shows the steps from one number to another. Alternative shows another option and its cost.

| # | Objection shown to the learner | Correct type | Why (shown as feedback) | Response shown after the answer |
|---|---|---|---|---|
| 1 | Where does the $30 an hour come from? | Source | The question asks about the origin of a number. | It is the fully loaded labor rate supplied by finance, and it is graded Estimated. |
| 2 | What if adoption reaches 95%? | Sensitivity | The question changes an input. | Each point is worth $648, so ten points add $6,480 and the net moves from -$49,617 to -$43,137. |
| 3 | How did $80,000 become $55,080? | Bridge | The question asks how one number became another. | $80,000 falls to $61,200 after adoption and coverage, and to $55,080 after rework. |
| 4 | Why not switch to vendor B, which is cheaper per token? | Alternative | The question names another option. | Vendor B's annual total is $76,776 against vendor A's $58,680, because of its higher wrong-answer cost. |
| 5 | These risks have not happened, so why charge for them? | Sensitivity | The question asks how much the result depends on the risks. | Halving the expected loss moves the three-year ROI only from -62.4% to -58.2%. |
| 6 | Where did the 15% chance of overreliance come from? | Source | The question asks for the origin of a number. | It is a judgment, graded Judgment, and a 30% chance would add $3,456 of cost. |
| 7 | How do you get from the $35,000 I approved to $104,697? | Bridge | The question asks how one number became another. | $35,000 plus $42,436 of recurring additions plus $27,261 of expected residual loss. |
| 8 | Why not just stop? | Alternative | The question names another option. | Stopping saves $104,697 and gives up $55,080 of benefit, $49,617 better a year, and costs $4,500 to retire. |

**Provenance:** All objections and responses come from this chapter and Chapters 10, 11, 19, and 22. The sim must label all data "illustrative".

**Rules:** Each objection has exactly one correct type, the one that answers the question it asks. No objection takes two types. Dollars are shown as written.

**Learner Activity:**

1. The learner reads objection 1, chooses Source, Sensitivity, Bridge, or Alternative, and presses Commit.
2. The sim shows the correct type, the "Why" text, and the response.
3. After eight objections, exploration unlocks: the learner selects any objection and sees its type and its response.
4. The learner should notice that objections 2 and 5 sound different and have the same type.

**Feedback:** Eight objections, fixed order, two attempts each. Correct: "Correct: <type>." Incorrect on the first attempt: the "Why" text without the type. After a second wrong attempt the type is shown and the objection counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Objection 1 is shown with no choice made. The question on screen is "What kind of answer does this objection need?"

**Chapter Anchors:** The chapter states a $648 value for each adoption point, a net moving from -$49,617 to -$43,137 at 95% adoption, a bridge of $80,000, $61,200, and $55,080, an ROI moving from -62.4% to -58.2%, and a cost of $104,697 made of $35,000, $42,436, and $27,261.
</details>

!!! mascot-encourage "Nobody Enjoys a Hostile Question, and You Can Rehearse It Away"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If a tough question makes your pulse jump, that is normal, and the cure is repetition. Ask a colleague to put the three worst questions to you twice, once cold and once after you have prepared, and notice how much calmer the second round feels.

### Designing the Presentation

The **executive presentation design** is the planning of the talk around the decision, not around the analysis. An 8-minute slot of 4 slides at 2 minutes each can hold exactly one argument: the answer, the evidence, the risk, and the decision. The structure follows the arc of Chapter 23.

| Slide | Title as a sentence | Content |
|-------|---------------------|---------|
| 1 | The assistant delivers 69% of its plan and does not pay at today's size | Three-way ROI: 37.5%, -5.3%, -62.4% |
| 2 | Risk-adjusted cost is 1.9 times the benefit | Bridge from $35,000 to $104,697 |
| 3 | Two of three appetite rules are breached | Appetite status and the largest exposures |
| 4 | We ask you to approve a restructure and a two-quarter gate | Options A to D and the recommendation |

The **slide design for financial data** is the set of habits that make a slide of numbers readable in seconds. Make the title the conclusion, so that a reader who reads only titles has the argument. Keep to about five numbers a slide, round to the precision of the decision, align decimals and put units in the column header, mark the one number the slide is about, and give a source in a footer. A slide titled "Cost analysis" with 40 numbers asks the reader to find the point, and one titled "Risk-adjusted cost is 1.9 times the benefit" with 5 numbers delivers it.

The **verbal presentation technique** is the way the numbers are spoken. Speech cannot hold the detail that a page can, so round to two significant figures and attach a meaning: say "about one hundred and five thousand dollars" and not "one hundred four thousand six hundred ninety-seven". Signpost the structure ("three things, first the benefit"), pause after the number that matters, and do not read the slide aloud. At 130 words a minute a 2-minute slide has about 260 words, and many slides need far fewer.

The **written report tone** is the register of the written report: neutral, precise, and active, with the number carrying the weight and not the adjective. Hedging stacks up in drafts. "We believe it may potentially be the case that the assistant could be delivering somewhat less benefit than anticipated" has 21 words and no number, and "The assistant delivered 68.85% of its planned benefit" has 8 and one.

### Credibility, Persuasion, and Ethics

The **credibility building technique** is the set of actions that make a reader trust a finding before they have checked it. Four work reliably. Reconcile your figures to numbers the reader already knows, such as the approved budget of $35,000 in the bridge above. Show your sources. Pre-wire the high-power readers, so that nobody meets the result in the room, as the stakeholder map of Chapter 23 required. And say what you got wrong before, because a team that admits that its plan of 37.5% became -5.3% is believed about the rest. Credibility is built over a series of reports, which is a reason to correct the record when a forecast misses.

The **data-driven persuasion** is the use of evidence, in a sound order, to move a reader to a conclusion. A claim is followed by its evidence, and the evidence is tied to the claim by a warrant, the reason it counts. The pattern is the same for a request to share platform controls: the claim is that the controls should be shared, the evidence is a table, and the warrant is that the cost is fixed and does not rise with the number of systems.

| Systems sharing the three platform controls | Controls cost charged to the assistant |
|--------------------------------------------:|---------------------------------------:|
| 1 | $29,288 |
| 2 | $25,508 |
| 4 | $23,618 |

The persuasive part is the table and the reason, and the adjective "wasteful" adds nothing. A reader who disagrees can see which row they dispute.

The **ethical findings communication** is the duty to present results so that the reader can reach the conclusion the evidence supports, even when it is unwelcome. Five commitments follow from it. Do not drop the bad number, such as presenting the realized ROI without the risk-adjusted one. Do not choose the favorable year, the favorable baseline, or the favorable chart axis. Disclose the interests of the people who prepared the analysis. Keep personal data out: the measurements are of the team, and an individual agent's productivity should not appear on a slide that others will see. And attribute work and sources fairly. The frame of Chapter 23 may choose the emphasis, and it may not remove the number.

The **avoiding overstated claims** is the discipline of making each claim as strong as its evidence and no stronger. The common overstatements are a plan stated as a result, an association stated as a cause, a difference that is within the noise stated as a change, a projection stated as a certainty, and an average stated as true of every case. Chapter 12's reply-error rate is an example. Errors rose from 15 of 500 sampled replies, 3.0%, to 20 of 500, 4.0%. The standard error of the difference is \( \sqrt{0.03 \times 0.97 \div 500 + 0.04 \times 0.96 \div 500} = 0.0116 \), so the 95% interval is 1.0 point plus or minus 2.3, which is -1.3 to +3.3 points, and it includes no change. The claim "quality is falling" is overstated, and the claim "we cannot yet tell whether quality changed, and we are sampling 2,000 more replies" is supported.

!!! mascot-warning "The Strongest Verb Is Usually the Wrong One"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Words such as saves, proves, causes, and will are the ones an executive repeats and a skeptic attacks. Replace each with the verb your evidence earns, such as delivered, is associated with, or is projected to, and add the condition the claim depends on.

The third specification lets the learner judge claims.

#### Diagram: Claim Strength Checker

<details markdown="1">
<summary>Claim Strength Checker</summary>
Type: microsim
**sim-id:** claim-strength-checker<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge eight claims about the assistant as supported as stated or overstated, using the evidence given with each claim.

**Prerequisites:** avoiding overstated claims, assumption transparency, ethical findings communication (defined in the section "Credibility, Persuasion, and Ethics" above).

**Evidence of Mastery:** For each of eight claims the learner commits Supported or Overstated before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A claim with a number in it is supported. (2) A negative claim is automatically honest. (3) A claim is overstated only when it is false.

**Instructional Rationale:** Evaluate-level work tests a claim against the evidence for it. Claims that are true as numbers and still overstated make the learner compare the strength of the wording with the strength of the evidence.

**Content:**

Test: a claim is Supported when its wording is no stronger than the evidence given. It is Overstated when it states a plan as a result, a projection as a certainty, an association as a cause, a change inside the noise as a change, or an average as true of every case.

| # | Claim and evidence shown to the learner | Correct choice | Why (shown as feedback) | Corrected claim shown after the answer |
|---|---|---|---|---|
| 1 | "The assistant saves $80,000 a year." Evidence: $80,000 is the planned benefit, and the realized benefit is $55,080. | Overstated | It states the plan as a result. | The assistant delivered $55,080 in year 2 against a planned $80,000. |
| 2 | "Quality is falling." Evidence: errors were 15 of 500 and then 20 of 500, a 95% interval of -1.3 to +3.3 points. | Overstated | The interval includes no change. | We cannot yet tell whether the error rate changed. |
| 3 | "The assistant delivered 68.85% of its planned benefit in year 2." Evidence: $55,080 measured against $80,000 planned. | Supported | It states a measured result against the plan. | Not needed. |
| 4 | "Under the stated assumptions the three-year risk-adjusted ROI is -62.4%." Evidence: the Chapter 22 model. | Supported | It states the result with its condition. | Not needed. |
| 5 | "The assistant will return 37.5%." Evidence: 37.5% is the plan, and the measured ROI is -5.3%. | Overstated | It states a plan as a certainty. | The plan projected 37.5%, and the measured ROI is -5.3%. |
| 6 | "The result does not depend on the risk judgments." Evidence: halving the residual loss moves the ROI from -62.4% to -58.2%. | Supported | The evidence shows how little the result moves. | Not needed. |
| 7 | "Training caused adoption to rise from 80% to 85%." Evidence: adoption rose after training, and there was no comparison group. | Overstated | It states an association as a cause. | Adoption rose from 80% to 85% after training, and we have no comparison group. |
| 8 | "Every agent saves 1 minute a ticket." Evidence: 1.0 minute is the average, with a 95% interval of 0.63 to 1.37. | Overstated | It states an average as true of every case. | On average, agents saved 1.0 minute a ticket, with a 95% interval of 0.63 to 1.37. |

**Provenance:** All claims and figures come from this chapter and Chapters 11, 12, and 22. The adoption figures in claim 7 are illustrative. The sim must label all data "illustrative".

**Rules:** A claim is Overstated when any one of the five failures in the test applies, and Supported otherwise. No claim is partly correct.

**Learner Activity:**

1. The learner reads claim 1 and its evidence, chooses Supported or Overstated, and presses Commit.
2. The sim shows the correct choice, the "Why" text, and, for an Overstated claim, the corrected claim.
3. After eight claims, exploration unlocks: the learner selects any claim and sees its test result and its corrected form.
4. The learner should notice that claim 6 sounds bold and is supported, and claim 1 sounds modest and is overstated.

**Feedback:** Eight claims, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the claim counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Claim 1 is shown with its evidence and no choice made. The question on screen is "Is this claim as strong as its evidence?"

**Chapter Anchors:** The chapter states a realized benefit of $55,080 against a planned $80,000, an error rate moving from 15 to 20 of 500 with an interval of -1.3 to +3.3 points, a risk-adjusted ROI of -62.4% moving to -58.2%, and a saving of 1.0 minute with an interval of 0.63 to 1.37.
</details>

### Comparing With Peers

The **benchmarking against peers** is the comparison of an organization's measures with those of similar organizations, to show whether a result is unusual. It is persuasive and easily misused, because peers differ in scope, accounting, and scale. Suppose, illustratively, that six peers report a median AI cost of $0.40 a ticket. The assistant's running cost is \( 35{,}000 \div 160{,}000 = \$0.219 \) a ticket, which looks efficient. The risk-adjusted figure is \( 104{,}697 \div 160{,}000 = \$0.654 \), which looks expensive. Neither comparison is valid until the reader knows what each peer included.

The **industry comparison framing** is the set of choices that make such a comparison fair: the same unit, the same scope, and the same period, and an honest statement of the differences. Three questions test a benchmark.

1. Is the unit the same, such as per ticket and not per query?
2. Is the scope the same, so that controls and risk are in both or in neither?
3. Is the peer group like this one in size and in the kind of data it handles?

If the peers' figure excludes controls, the fair comparison is the assistant's $0.219, which is below the peer median of $0.40, and if it includes them, the fair comparison is $0.654. A report that quotes only the first has chosen its comparison, and that is the kind of choice the ethical commitments above rule out.

### Closing the Loop

The **communication feedback loop** is the habit of asking the audience, after each report, what they took from it, which questions they asked, and what they did, and of changing the next report in response. A simple form is to ask two readers to say the main message back in a sentence. If the sentence differs from yours, the message was not delivered. The **iterative report refinement** is the cycle of draft, review, revision, and a second review, with each cycle checked against an observable test, such as whether a new reader can find the decision requested in 30 seconds. Three cycles with different reviewers, one who knows the subject, one who knows the audience, and one who knows neither, catch different faults. Chapter 27 builds a review process around this loop.

### Summary and Quick Check

A defended finding shows its assumptions, graded by evidence, with the effect of a plausible change on each, and shows its uncertainty as a range next to the number, such as the 0.63 to 1.37 minutes that carries through to a net of -$72,383 to -$26,851, wholly below zero. Risk is spoken as a frequency, an impact, an expected loss, and a request. A recommendation names its options, here A to D, recommends one with a gate, and prices the delay, $22,334. Insights have an owner, a date, and a value. Objections fall into source, sensitivity, bridge, and alternative, and Q&A is prepared with three times the expected questions. A talk of 4 slides has conclusion titles and about five numbers a slide, and it speaks rounded numbers. A report is neutral and precise. Credibility comes from reconciliation, sources, pre-wiring, and admitted misses, and persuasion from a claim, evidence, and a warrant. Ethics means keeping the bad number, and claims are no stronger than their evidence. A peer benchmark is fair only at the same unit, scope, and peer group. A feedback loop and iterative review improve the next report.

??? note "Quick check: why does an interval entirely below zero make the conclusion stronger? - Click to expand"
    The interval is the range of results the evidence allows, so if none of it reaches break-even, the conclusion that the assistant does not pay holds whatever the exact minute saved is, between 0.63 and 1.37.

??? note "Quick check: why is 'quality is falling' overstated when errors went from 3.0% to 4.0%? - Click to expand"
    The change is 15 of 500 to 20 of 500, and its 95% interval of -1.3 to +3.3 points includes no change, so the data cannot distinguish a rise from noise.

??? note "Quick check: why is the peer comparison of $0.219 against $0.40 per ticket not yet fair? - Click to expand"
    The $0.219 excludes controls and risk, and it is fair only if the peers' figure also excludes them. Including them the assistant's cost is $0.654, and a comparison must say which of the two it makes.

!!! mascot-celebration "You Can Defend a Number Without Defending a Position"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now show assumptions and an interval, frame risk and a recommendation with its gate, prepare the four kinds of objection, and test every claim against its evidence. The next chapter builds the report that carries all of this on paper.
