---
title: Governance, Compliance, and Security Risk
description: The governance, privacy, security, legal, fairness, and human-factors costs of a generative AI system that never appear on a token invoice, with the controls that reduce them and the arithmetic to price both.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 15:03:00
version: 1.11
---

# Governance, Compliance, and Security Risk

## Summary

Surfaces governance, compliance, and security risks that do not appear on a token invoice but materially affect a generative AI system's true cost. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| AI Governance Framework | 40 |
| Model Risk Management | 1 |
| Hidden Cost Of AI Systems | 38 |
| Shadow AI Usage Risk | 1 |
| Data Security Risk | 36 |
| Data Privacy Risk | 35 |
| Intellectual Property Risk | 34 |
| Compliance Risk | 1 |
| Regulatory Uncertainty Cost | 32 |
| Bias And Fairness Risk | 31 |
| Explainability Requirement Cost | 30 |
| Audit Requirement Cost | 1 |
| Model Governance Board | 28 |
| Responsible AI Policy | 27 |
| Third-Party Risk Assessment | 26 |
| Data Residency Requirement | 25 |
| Access Control Cost | 24 |
| Incident Response Planning | 23 |
| Reputational Risk | 22 |
| Overreliance Risk | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)

---

Chapters 19 and 20 priced the vendor. A vendor's invoice, though, shows only what the vendor does. The costs of using a model responsibly, keeping its data safe, proving that it behaves fairly, and answering a regulator are paid by the customer, to its own staff, lawyers, and tools. This chapter prices them for the support assistant of Chapters 19 and 20 on vendor A: 960,000 queries a year, $14,880 of usage fees, an annual total of $58,680, and tickets that contain customers' personal data. Hours cost $90 as before, and all figures are illustrative. Chapter 22 turns the exposures priced here into a risk-adjusted cost model and an executive report.

!!! mascot-welcome "The Invoice Is the Easy Part"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The costs that sink an AI business case are usually the ones nobody put in it. By the end of this chapter you can price the governance, privacy, security, and fairness work around a system, and tell which of it pays for itself and which is simply the cost of operating. Every token counts, and so does every control.

### What the Invoice Leaves Out

The **hidden cost of AI systems** is the cost of governance, security, privacy, compliance, and oversight that a system requires but that no vendor invoice or infrastructure bill records. It has two parts that must be kept apart. The first is the cost of controls: money and hours spent every year to prevent and detect problems. The second is exposure, the expected loss from the problems the controls do not stop. The sections below price both for the assistant, and the last section adds the controls up.

### The Governance Structure

The **AI governance framework** is the set of policies, roles, review processes, and controls through which an organization decides which AI systems may be built or bought, how they are checked, and who is accountable. A practical framework does not review everything equally. It assigns each system a risk tier and scales the review to the tier. Suppose a review takes 4 hours for a low tier, 16 for a medium tier, and 40 for a high tier, which is \( 4 \times 90 = \$360 \), \( 16 \times 90 = \$1{,}440 \), and \( 40 \times 90 = \$3{,}600 \). An organization with 12 systems, 6 low, 4 medium, and 2 high, spends \( 6 \times 360 + 4 \times 1{,}440 + 2 \times 3{,}600 = \$15{,}120 \) on a first review, about $7,560 a year to renew at half depth, plus 120 hours, $10,800, to write the framework. The assistant, which handles customers' personal data, is in the high tier: $3,600 a year.

!!! mascot-tip "Tier the Review Before You Staff It"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Score each system on the data it touches, who sees its output, and what an error costs, and give it one of three tiers before anyone books a meeting. Reviewing all 12 systems at the high-tier depth would cost $43,200 instead of $15,120.

The **model risk management** is the discipline of identifying, measuring, and controlling the losses a model's errors can cause, through an inventory of every model, validation before use, ongoing monitoring, and limits on use. It reuses the validation and monitoring of Chapter 17 and the registry of Chapter 18, so its marginal cost is mostly the inventory: 2 hours a year per system, \( 12 \times 2 \times 90 = \$2{,}160 \), or $180 for the assistant.

The **model governance board** is the cross-functional committee that approves high-risk uses and settles disputes the framework cannot, with members from engineering, security, legal, risk, and the business. Six members meeting 2 hours a month cost \( 6 \times 2 \times 12 \times 90 = \$12{,}960 \) a year, $1,080 a month. Its cost per review falls as it handles more, and its value lies in decisions made once, with a record, instead of repeatedly by whoever is nearest. The **responsible AI policy** is the written statement of principles and rules that binds the whole organization: permitted and prohibited uses, data handling, human oversight, and disclosure. Writing it takes 60 hours, $5,400, keeping it current 12 hours a year, $1,080, and training 100 employees for an hour at $45 costs $4,500. A policy nobody has been trained on is not a control.

The **shadow AI usage risk** is the risk created when employees use AI tools the organization has not approved, so that data leaves outside every control. Suppose 12 of the 40 agents paste 20 tickets a week each into a personal chat tool for 50 weeks, 12,000 tickets a year. If 2% hold regulated personal data, 240 records are exposed, and at $150 a record for notification and remediation the exposure is $36,000. The approved assistant costs $14,880 for everyone, so the cheapest control is to supply a tool people prefer.

!!! mascot-warning "A Ban Without an Alternative Moves the Risk, It Does Not Remove It"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    People who are told to stop using a tool they find useful tend to keep using it quietly, which hides the exposure from you. Offer an approved tool that does the job, monitor for unapproved traffic, and make the policy say what is allowed, not only what is not.

### Protecting the Data

The **data security risk** is the risk that data processed by an AI system is accessed, stolen, or leaked by someone who should not have it, whether through a vendor, a stolen key, or an attack on the model itself, such as hidden instructions in a ticket that make the assistant reveal other customers' data. Chapter 20 priced a vendor data incident: 800 records at $150 each, \( 800 \times 150 = \$120{,}000 \), with a 5% yearly chance, an expected loss of $6,000. Redacting personal data before it is sent costs $2,400 and removes 80% of that loss, $4,800. The impact scales with how many records are held, which makes retention a control. Cutting prompt-log retention from 90 days to 30 reduces the records held at any moment to a third, about 267, an impact of $40,000, and an expected loss of $2,000, a $4,000 saving for almost no cost.

The **data privacy risk** is the risk that personal data is collected, used, kept, or disclosed beyond what law, contract, and consent allow. Its costs are recurring. A data protection impact assessment of 40 hours, $3,600, refreshed every two years is $1,800 a year; redaction is $2,400; and answering 20 deletion requests a year at 2 hours each, \( 20 \times 2 \times 90 = \$3,600 \). The assistant's privacy cost is $7,800 a year, and the deletion requests are the part that grows with the customer base.

The **data residency requirement** is a legal or contractual rule that certain data be stored and processed within a stated region. It changes the vendor choice for the affected share of traffic. Chapter 20 found that 15% of tickets, 144,000 queries, must stay in a region. There are three ways to serve them. A self-hosted model costs $45,360 a year whatever the share. Vendor C hosted in the region at a 20% premium costs \( 144{,}000 \times 0.00342 \times 1.20 = \$591 \), plus $3,000 for a second vendor's support and integration, $3,591. Vendor A, if it offers an in-region option at a 20% premium, costs \( 0.15 \times 14{,}880 \times 1.20 = \$2{,}678 \) for the segment. The two managed options cross when the sensitive share is \( 3{,}000 \div (17{,}856 - 3{,}940) = 21.6\% \): below it the vendor A option is cheaper, above it the vendor C option, because the second vendor's fixed $3,000 is spread over more queries. Self-hosting is cheapest only when no managed option qualifies. The comparison assumes the quality of C is acceptable, which is a separate test.

The first specification lets the learner choose among those options.

#### Diagram: Residency Option Chooser

<details markdown="1">
<summary>Residency Option Chooser</summary>
Type: microsim
**sim-id:** residency-option-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of eight residency cases, the feasible option with the lowest annual cost from self-hosting, vendor C in the region, and vendor A in the region.

**Prerequisites:** data residency requirement, sensitive share, in-region premium (defined in the section "Protecting the Data" above).

**Evidence of Mastery:** For each of eight cases the learner commits one option before the answer is shown. An option is correct when it has the lowest cost among the feasible options in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Keeping data in house by self-hosting is the safe and therefore the best choice. (2) The cheaper vendor is cheaper at every sensitive share. (3) An option that is cheapest is feasible whatever the quality requirement.

**Instructional Rationale:** Evaluate-level work picks the best option under constraints. Cases on both sides of the 21.6% crossover, and cases in which an option is not feasible, make the learner check feasibility before comparing cost.

**Content:**

The assistant handles 960,000 queries a year, and vendor A's usage fees are $14,880. Option S1, self-hosting, costs $45,360 and is always feasible. Option S2, vendor C in the region, costs share × 960,000 × 0.00342 × 1.20 + 3,000 and is feasible only when vendor C's quality is acceptable. Option S3, vendor A in the region, costs share × 14,880 × 1.20 and is feasible only when vendor A offers an in-region option.

| # | Sensitive share | Vendor A offers in-region | Vendor C quality acceptable | Costs: S1; S2; S3 | Correct option | Why (shown as feedback) |
|---|---:|---|---|---|---|---|
| 1 | 15% | Yes | Yes | $45,360; $3,591; $2,678 | S3 | At 15%, below the 21.6% crossover, vendor A in the region is the cheapest. |
| 2 | 15% | No | Yes | $45,360; $3,591; not feasible | S2 | S3 is not feasible, and vendor C costs $41,769 less than self-hosting. |
| 3 | 15% | No | No | $45,360; not feasible; not feasible | S1 | Self-hosting is the only feasible option. |
| 4 | 100% | Yes | Yes | $45,360; $6,940; $17,856 | S2 | Above the crossover, the second vendor's fixed $3,000 is spread over every query. |
| 5 | 100% | Yes | No | $45,360; not feasible; $17,856 | S3 | S2 is not feasible, and vendor A in the region costs $27,504 less than self-hosting. |
| 6 | 5% | Yes | Yes | $45,360; $3,197; $893 | S3 | At a small share, the fixed $3,000 makes vendor C dearer than vendor A. |
| 7 | 30% | Yes | Yes | $45,360; $4,182; $5,357 | S2 | At 30%, above the crossover, vendor C is $1,175 cheaper than vendor A. |
| 8 | 50% | Yes | No | $45,360; not feasible; $8,928 | S3 | S2 is not feasible, and vendor A in the region costs $36,432 less than self-hosting. |

**Provenance:** The three options and their costs come from the chapter section "Protecting the Data" and Chapter 20. The cases other than case 1 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** S1 = 45,360. S2 = share × 960,000 × 0.00342 × 1.20 + 3,000, feasible only when vendor C quality is acceptable. S3 = share × 14,880 × 1.20, feasible only when vendor A offers an in-region option. The lowest feasible cost is correct, and no case has a tie. The crossover between S2 and S3 is at a share of 21.6%. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Sensitive share | 5 | 100 | 5 | 15 | percent |
| Vendor A offers in-region | No | Yes | one choice | Yes | choice |
| Vendor C quality acceptable | No | Yes | one choice | Yes | choice |

**Learner Activity:**

1. The learner reads case 1, chooses S1, S2, or S3, and presses Commit.
2. The sim shows the cost of each option, marks the infeasible ones, and shows the "Why" text.
3. After eight cases, exploration unlocks: the learner changes the share and the two feasibility choices and watches the costs and the lowest feasible option update.
4. The learner should notice that the lowest feasible option changes from S3 to S2 as the share rises from 20% to 25%.

**Feedback:** Eight cases, fixed order, two attempts each. Correct: "Correct: <option> at <cost>." Incorrect on the first attempt: the "Why" text without the option. After a second wrong attempt the option is shown and the case counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Case 1 is shown with the three costs and no option chosen. The question on screen is "Which feasible option has the lowest annual cost?"

**Chapter Anchors:** The chapter states a self-hosted cost of $45,360, an in-region vendor C cost of $3,591 and an in-region vendor A cost of $2,678 at a 15% share, and a crossover share of 21.6%.
</details>

The **access control cost** is the cost of the identity, permission, and key management that decides who and what may use an AI system and its data: single sign-on, role-based permissions, secret storage, rotation, and periodic review. Setup takes 40 hours, $3,600, and each year a quarterly access review of 6 hours, 24 hours or $2,160, and 12 hours of key rotation, $1,080, add $3,240. It buys limits on damage. If a leaked key is used at ten times normal volume for 3 days, vendor A's $1,240 monthly bill produces \( 1{,}240 \times 10 \times 3 \div 30 = \$1{,}240 \) of charges, whereas a per-key spend cap at twice normal limits it to $248.

The **third-party risk assessment** is the periodic assessment of each vendor's security and continuity once it is in use, which is a different step from the due diligence done before signing. A critical vendor gets 30 hours, $2,700, a year, and four others 12 hours each, $4,320, for $7,020 in all, of which the assistant's vendor accounts for $2,700. The **incident response planning** is the preparation for the day a security or privacy incident happens: a written plan, named roles, contact lists, and rehearsals. Writing the plan takes 40 hours, $3,600, and an annual drill by 6 people for 4 hours is 24 hours, $2,160. If practice cuts the cost of an incident by 40%, the expected saving on the $120,000 incident at a 5% chance is $2,400, which narrowly beats the drill's cost, and notification deadlines in many rules make a plan mandatory regardless.

### Legal, Fairness, and Human Risks

The **intellectual property risk** is the risk that an AI system leaks the organization's trade secrets, infringes someone else's rights in its output, or leaves ownership of its output unclear. Three contract terms decide much of it: whether the vendor trains on the organization's inputs, who owns the outputs, and whether the vendor indemnifies against infringement claims. Suppose a 2% yearly chance of a claim costing $150,000 to defend, an expected loss of $3,000. An indemnified tier at a 10% premium on $14,880, $1,488, removes 90% of that, $2,700, for a net saving of $1,212.

The **compliance risk** is the risk of failing to meet a law, regulation, or contractual obligation, with fines, remediation, and lost business as the consequences. The cost pattern is steady: a control built before launch might cost $2,000, and the same gap found by an auditor costs about ten times as much, $20,000, to remediate under deadline. The **regulatory uncertainty cost** is the cost of not knowing which rules will apply, which is paid either as a reserve or as design choices made early. Suppose three scenarios: no new rules at 50% with no cost, moderate rules at 35% costing $40,000, and strict rules at 15% costing $120,000. The expected cost is \( 0.35 \times 40{,}000 + 0.15 \times 120{,}000 = \$32{,}000 \). Spending $12,000 now on logging, configurable controls, and documentation halves the moderate case to $20,000 and cuts the strict case to $72,000, so the expected cost becomes \( 7{,}000 + 10{,}800 + 12{,}000 = \$29{,}800 \), a saving of $2,200. A small margin is the usual result, and it comes from the scenario weights, which are judgments.

!!! mascot-encourage "Guessing Probabilities Is Uncomfortable, and You Can Still Do It"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If assigning percentages to rules that have not been written feels like invention, that is a fair reaction, and the way through is to write down three scenarios and test whether the decision changes when the weights move. If it does not, the uncertainty is not what is deciding it.

The **bias and fairness risk** is the risk that a system performs systematically worse for some groups of people, producing harm, complaints, or legal exposure. It is measured by comparing outcomes across groups. One common screen is the four-fifths rule: compute the ratio of the lower group's favorable-outcome rate to the higher group's, and flag a ratio below 0.80. If the assistant resolves 80% of English-language tickets and 62% of Spanish-language ones, the ratio is \( 62 \div 80 = 0.775 \), below 0.80, and is flagged. The screen does not prove unfairness, and it tells the team where to look. Testing three slices with 500 tickets each costs \( 3 \times 500 \times 1.125 = \$1{,}687.50 \), and 20 hours of analysis $1,800, a total of about $3,488 a year. A disparity has direct cost too: if a group making up 20% of queries, 192,000, has a 12% wrong-answer rate against 8%, the extra errors cost \( 192{,}000 \times 0.04 \times 0.50 = \$3{,}840 \) a year.

The second specification lets the learner apply the screen.

#### Diagram: Fairness Rate Ratio Check

<details markdown="1">
<summary>Fairness Rate Ratio Check</summary>
Type: microsim
**sim-id:** fairness-rate-ratio-check<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate eight pairs of group resolution rates that the four-fifths screen flags from those it does not.

**Prerequisites:** bias and fairness risk, resolution rate, four-fifths rule (defined in the section "Legal, Fairness, and Human Risks" above).

**Evidence of Mastery:** For each of eight pairs the learner commits Flag or No flag before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A flag proves the system is unfair. (2) A ratio of exactly 0.80 is flagged. (3) The ratio is the higher rate divided by the lower rate.

**Instructional Rationale:** Analyze-level work separates cases by the feature that matters. Pairs that sit exactly on the 0.80 line, and one in which the larger rate is listed second, force the learner to compute the ratio and not to judge the gap by eye.

**Content:**

Rule: the ratio is the lower group's resolution rate divided by the higher group's rate. Flag when the ratio < 0.80. Rates are in percent.

| # | Group 1 rate | Group 2 rate | Ratio | Correct choice | Why (shown as feedback) |
|---|---:|---:|---:|---|---|
| 1 | 80 | 62 | 0.775 | Flag | 62 ÷ 80 = 0.775, which is below 0.80. |
| 2 | 80 | 64 | 0.800 | No flag | 64 ÷ 80 = 0.800, which is not below 0.80. |
| 3 | 80 | 70 | 0.875 | No flag | 70 ÷ 80 = 0.875, which is above 0.80. |
| 4 | 90 | 71 | 0.789 | Flag | 71 ÷ 90 = 0.789, which is below 0.80. |
| 5 | 60 | 75 | 0.800 | No flag | The lower rate is 60 and the higher is 75, so 60 ÷ 75 = 0.800, which is not below 0.80. |
| 6 | 59 | 75 | 0.787 | Flag | 59 ÷ 75 = 0.787, which is below 0.80. |
| 7 | 60 | 50 | 0.833 | No flag | The lower rate is 50, and 50 ÷ 60 = 0.833, which is above 0.80. |
| 8 | 85 | 60 | 0.706 | Flag | 60 ÷ 85 = 0.706, which is below 0.80. |

**Provenance:** Pair 1 comes from the chapter section "Legal, Fairness, and Human Risks". The other pairs are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Ratio = the smaller of the two rates ÷ the larger. Flag when ratio < 0.80, and No flag otherwise, including when the ratio equals 0.80. Ratios are shown to three decimals. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Group 1 rate | 40 | 100 | 1 | 80 | percent |
| Group 2 rate | 40 | 100 | 1 | 62 | percent |

**Learner Activity:**

1. The learner reads pair 1, chooses Flag or No flag, and presses Commit.
2. The sim shows the ratio, the arithmetic, and the "Why" text.
3. After eight pairs, exploration unlocks: the learner changes the two rates and watches the ratio and the screen result update.
4. The learner should notice that with group 1 at 80, a group 2 rate of 63 is flagged and 64 is not.

**Feedback:** Eight pairs, fixed order, two attempts each. Correct: "Correct: <choice>, ratio <ratio>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the pair counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Pair 1 is shown with no choice made. The question on screen is "Does this pair of rates pass the four-fifths screen?"

**Chapter Anchors:** The chapter states a ratio of 0.775 for resolution rates of 80% and 62%, and a threshold of 0.80 below which a ratio is flagged.
</details>

The **explainability requirement cost** is the cost of being able to show, for any output, how it was produced: the sources it drew on, the prompt that produced it, and the version of the model. If the assistant adds source citations of 300 output tokens to each answer, the cost is \( 300 \times 10.00 \div 10^6 = \$0.003 \) a query, \( 960{,}000 \times 0.003 = \$2{,}880 \) a year, plus 40 hours, $3,600, to build logging of prompts and sources. The **audit requirement cost** is the cost of producing evidence that controls operated as stated. Gathering it by hand takes 80 hours a year, $7,200. With logs that already record access, changes, and reviews, as in Chapter 14, it takes 24 hours, $2,160, which saves $5,040.

The **reputational risk** is the risk that a visible failure damages customers' trust and so revenue. It is hard to estimate and easy to dismiss. Suppose a 2% yearly chance that a wrong answer goes public, with 1.5% of 20,000 customers leaving, 300 customers at $200 a year of margin, $60,000. The expected loss is $1,200. The estimate is crude, and its use is to compare with the price of the controls that make the failure less likely.

The last risk is human. The **overreliance risk** is the risk that people accept AI output without checking it, so that errors the system makes are not caught. The assistant is wrong in 8% of its 960,000 queries, 76,800 answers. If agents catch 80% of them and the catch rate falls to 60%, 15,360 more wrong answers reach customers. At $1.50 of extra cost for each, beyond the $0.50 of fixing it, that is \( 15{,}360 \times 1.50 = \$23{,}040 \) a year, larger than any control in this chapter. It is measured by seeding known-wrong suggestions into the stream and counting how many are caught, and it is reduced by showing sources and by rotating review duties.

### Adding It Up

The recurring cost of controls for the assistant is summarized below. Each line is a figure derived above.

| Control | Annual cost |
|---------|------------:|
| AI governance review, high tier | $3,600 |
| Model risk inventory | $180 |
| Governance board, one twelfth | $1,080 |
| Privacy: assessment, redaction, deletion requests | $7,800 |
| Access control: reviews and key rotation | $3,240 |
| Bias testing | $3,488 |
| Explainability: citations | $2,880 |
| Audit readiness, automated | $2,160 |
| Third-party risk assessment | $2,700 |
| Incident response drills | $2,160 |
| **Total** | **$29,288** |

The total is 1.97 times the $14,880 of usage fees, and it raises vendor A's annual total from $58,680 to $87,968, with controls 33.3% of the new figure. There is also a one-time $7,200 for access control setup and the incident plan, and shared costs, the framework, policy, and board, that are not allocated here. The exposures are separate from this table and are not added to it: shadow AI at $36,000 unmitigated, the data incident at $2,000 after shorter retention, the infringement claim at $300 after indemnity, reputation at $1,200, and overreliance at up to $23,040. Chapter 22 carries them into a risk-adjusted model.

!!! mascot-thinking "Controls Are a Cost, Exposure Is a Bet"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the $29,288 is certain and the exposures are probabilities. A control is worth buying when the loss it removes is larger than its cost, but some controls are required whatever the arithmetic says, and those belong in the baseline cost of the system.

The third specification lets the learner build the ledger.

#### Diagram: Hidden Cost Ledger

<details markdown="1">
<summary>Hidden Cost Ledger</summary>
Type: microsim
**sim-id:** hidden-cost-ledger<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the privacy, access control, bias testing, and explainability costs and the total annual cost of controls for the support assistant, to within the tolerance stated for each item.

**Prerequisites:** hidden cost of AI systems, data privacy risk, access control cost, bias and fairness risk, explainability requirement cost (defined in this chapter).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The vendor invoice is most of the cost of an AI system. (2) Governance costs are one-time. (3) Every control cost grows with query volume.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Building the ledger line by line shows how many separate costs surround the invoice, and the exploration shows which of them move with the learner's choices.

**Content:**

Fixed inputs: usage fees $14,880 a year and vendor A's annual total of $58,680 from Chapter 19. Fixed control costs: governance review $3,600, model risk inventory $180, governance board share $1,080, audit readiness $2,160, third-party assessment $2,700, incident response drills $2,160. Privacy has an assessment of $1,800 a year, redaction of $2,400, and $180 per deletion request, with 20 requests. Access control has reviews of $2,160 and key rotation of $1,080. Bias testing costs 3 slices × $562.50 plus $1,800 of analysis. Explainability adds 300 output tokens to each of 960,000 queries at $10.00 per million.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Annual privacy cost | $7,800 | 1 | 1,800 + 2,400 + 20 × 180 = 7,800. |
| 2 | Annual access control cost | $3,240 | 1 | 2,160 + 1,080 = 3,240. |
| 3 | Annual bias testing cost | $3,488 | 1 | 3 × 562.50 + 1,800 = 3,487.50. |
| 4 | Annual explainability cost | $2,880 | 1 | 300 × 10.00 ÷ 1,000,000 × 960,000 = 2,880. |
| 5 | Total annual cost of controls | $29,288 | 1 | The ten lines sum to 29,287.50, shown as 29,288. |
| 6 | Controls divided by usage fees | 1.97 | 0.01 | 29,288 ÷ 14,880 = 1.968. |
| 7 | Vendor A annual total including controls | $87,968 | 1 | 58,680 + 29,288 = 87,968. |
| 8 | Controls as a percentage of that total | 33.3% | 0.1 | 29,288 ÷ 87,968 = 0.333. |

**Provenance:** All values come from the chapter sections of this chapter and from Chapter 19. The sim must label the data "illustrative".

**Rules:** Privacy = 1,800 + 2,400 + 180 × requests. Bias testing = slices × 562.50 + 1,800. Explainability = 9.6 × extra tokens, because 960,000 × 10.00 ÷ 1,000,000 = 9.6 dollars for each extra token. Total controls = privacy + access control + bias testing + explainability + 3,600 + 180 + 1,080 + 2,160 + 2,700 + 2,160. Dollars are shown to the whole dollar, ratios to two decimals, and percentages to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Deletion requests a year | 0 | 100 | 10 | 20 | requests |
| Bias testing slices | 1 | 6 | 1 | 3 | slices |
| Extra tokens for citations | 0 | 600 | 100 | 300 | tokens |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the deletion requests, the slices, and the citation tokens and watches the three costs, the total, and the ratio to usage fees update.
4. The learner should notice that the total stays above the usage fees in every setting, including 0 requests, 1 slice, and 0 tokens.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What does the assistant's privacy work cost each year?"

**Chapter Anchors:** The chapter states a privacy cost of $7,800, an access control cost of $3,240, a bias testing cost of about $3,488, an explainability cost of $2,880, a total of $29,288, a ratio of 1.97 to usage fees, a vendor A total of $87,968, and controls at 33.3% of it.
</details>

### Summary and Quick Check

The hidden cost of an AI system has two parts, the controls that are paid for and the exposures that remain. A tiered governance framework spends review effort where risk is: $15,120 against $43,200 for reviewing everything at full depth. A board, a policy, and a model inventory are the structure, and a ban on unapproved tools without an approved alternative leaves $36,000 of shadow AI exposure in place. Data security, privacy, and residency are priced in records and hours, with retention the cheapest control and a 21.6% crossover between the two managed ways to meet a residency rule. Access control, third-party assessment, and incident planning cost $3,240, $2,700, and $2,160 a year. Intellectual property, compliance, and regulatory uncertainty are priced by expected loss against a control or a reserve, bias is screened by a 0.80 ratio, and explainability and audit evidence add $2,880 and $2,160. Reputation and overreliance are the least certain and can be the largest, the latter at up to $23,040. The controls total $29,288 a year, 1.97 times the usage fees, and raise the assistant's total to $87,968. Chapter 22 builds the risk-adjusted cost model that carries the exposures into the case.

??? note "Quick check: why is shortening log retention a strong security control? - Click to expand"
    The impact of a breach scales with the records held. Cutting retention from 90 to 30 days reduces the records at risk to a third, so the expected loss falls from $6,000 to $2,000 for almost no cost.

??? note "Quick check: why is a resolution-rate ratio of exactly 0.80 not flagged? - Click to expand"
    The screen flags a ratio below 0.80, and 0.80 is not below it. A pair of 80% and 64% gives 0.800 and passes, while 80% and 62% gives 0.775 and is flagged.

??? note "Quick check: why can overreliance be a larger cost than any control? - Click to expand"
    A fall in the share of wrong answers that people catch from 80% to 60% lets 15,360 more wrong answers reach customers a year. At $1.50 each that is $23,040, more than the $7,800 of the largest control.

!!! mascot-celebration "You Can Price the Costs Behind the Invoice"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now tier a governance review, price the privacy, security, and residency work around a system, screen a model for disparity, and separate the controls you pay from the exposures you carry. That is the other half of a true cost.
