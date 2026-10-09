---
title: Risk-Adjusted Costing and Executive Risk Reporting
description: How to find the costs that no plan lists, register and price the risks that remain, build a risk-adjusted total cost of ownership, and report it to executives against a stated risk appetite.
generated_by: claude skill chapter-content-generator
date: 2026-10-09 08:16:52
version: 1.11
---

# Risk-Adjusted Costing and Executive Risk Reporting

## Summary

Covers risk-adjusted costing frameworks and the practices used to register, mitigate, and report AI-related risk to executive stakeholders. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Skill Erosion Risk | 20 |
| Staff Retraining Cost | 19 |
| Change Management Cost | 1 |
| Governance Overhead Cost | 17 |
| AI Risk Register | 16 |
| Risk Appetite Statement | 15 |
| Contingency Budget | 14 |
| Technical Debt Risk | 13 |
| Model Retirement Cost | 12 |
| Legacy Integration Risk | 11 |
| Security Incident Cost Estimate | 10 |
| Insurance Cost For AI Risk | 1 |
| Governance Maturity Model | 8 |
| Policy Enforcement Automation | 7 |
| Risk-Adjusted Cost Model | 6 |
| Hidden Cost Discovery Checklist | 5 |
| Risk-Adjusted TCO | 4 |
| Governance ROI Tradeoff | 3 |
| Risk Mitigation Cost-Benefit | 2 |
| Risk Reporting To Executives | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 21: Governance, Compliance, and Security Risk](../21-governance-compliance-security-risk/index.md)

---

Three earlier chapters gave the support assistant three different answers. Chapter 10 planned it: a $60,000 investment, running costs of $30,000 and $35,000 a year, benefits of $60,000 and $80,000, an NPV of $38,272, and an ROI of 37.5%. Chapter 11 measured it: adoption of 85%, usage coverage of 90%, and extra rework cut the benefit to $41,310 in year 1 and $55,080 in each later year, an ROI of -5.3% and an NPV of -$18,037. Chapter 21 priced the controls around it, $29,288 a year, and left a list of exposures unpriced in the total. This chapter puts all of it in one model. It finds the costs nobody budgeted, registers the risks that remain, builds a risk-adjusted total cost of ownership for three years, and shows how to report it to an executive. Hours cost $90 for specialists and $45 for agents, as in Chapters 19 and 21, queries are 960,000 a year in a steady year, and all figures are illustrative.

!!! mascot-welcome "The Last Line of the Ledger"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A business case is only as honest as its least-welcome line, and by the end of this chapter you can build that line yourself and defend it. You will price the people, process, technology, and risk costs around a system and report what is left after the controls. Every token counts, and so does every risk.

### Finding the Costs Nobody Budgeted

The **hidden cost discovery checklist** is a fixed list of questions, asked of every initiative before its cost is final, that prompts for the costs a plan tends to leave out. Its value is that it replaces memory with a routine. The questions are grouped by the stage of the system's life that generates the cost: people, process, technology, risk, and end of life. The table below applies it to the assistant and points to the section that prices each answer.

| Stage | Question | Answer for the assistant | Priced in |
|-------|----------|--------------------------|-----------|
| People | Who must learn to use it, and how often? | 40 agents, plus about 10 new hires a year | Staff retraining |
| People | What must change in how people work? | Reply drafting, review habits | Change management |
| People | What can people stop being able to do? | Unaided speed and judgment | Skill erosion |
| Process | What does oversight cost to run? | Reviews, board, audits | Governance overhead |
| Process | Which checks can be automated? | Redaction, logging, spend caps | Policy enforcement automation |
| Technology | What shortcuts were taken to launch? | Hard-coded prompts, no tests | Technical debt |
| Technology | What must it connect to that is old? | The ticketing system | Legacy integration |
| Risk | What can go wrong, how often, at what price? | Eight vendor risks and more | Risk register, incident estimate |
| Risk | Which losses can be moved to someone else? | The largest single event | Insurance |
| End of life | What does shutting it down cost? | Archive, deletion, contract exit | Model retirement |

!!! mascot-tip "Run the Checklist Before the Numbers, Not After"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Hold a 30-minute session with one engineer, one finance partner, and one person from legal or security, and answer each question aloud before any spreadsheet is opened. A missing answer is worth far more as a question you can still ask than as a surprise in the quarterly review.

### People Costs

The **staff retraining cost** is the cost of the time people spend learning a tool, and learning it again when it changes. It has an initial part and a recurring part. For the 40 agents, a 4-hour onboarding at $45 an hour costs \( 40 \times 4 \times 45 = \$7{,}200 \), and designing the course takes 30 hours at $90, $2,700, so the initial cost is $9,900. Each year a 2-hour refresher after model updates costs \( 40 \times 2 \times 45 = \$3{,}600 \), and about 10 new hires, a quarter of the team, need the full 4 hours, \( 10 \times 4 \times 45 = \$1{,}800 \), so the recurring cost is $5,400.

Retraining is easy to cut and hard to see the effect of, so price what an adoption point is worth. Chapter 11's benefit is \( 160{,}000 \text{ tickets} \times 1 \text{ minute} \div 60 \times \$30 = \$80{,}000 \) at full use. One more point of adoption at 90% coverage adds \( 80{,}000 \times 0.01 \times 0.90 = \$720 \), and costs \( 160{,}000 \times 0.01 \times 0.90 \times 0.01 \times 10 \div 60 \times 30 = \$72 \) of extra rework, a net $648. The $5,400 a year therefore pays for itself only if it holds or lifts adoption by \( 5{,}400 \div 648 = 8.3 \) points a year. That is a large effect for 2 hours of training, so most of this cost is better treated as the price of keeping the tool usable than as an investment that earns a return.

The **change management cost** is the cost of the communication, sponsorship, and support that move people to a new way of working. For the assistant it is a launch message of 20 hours at $90, $1,800, and two team champions giving 4 hours a month each, \( 2 \times 4 \times 12 \times 45 = \$4,320 \) in year 1, halved to $2,160 in year 2 and ended in year 3, $8,280 in all.

The **skill erosion risk** is the risk that people lose a skill by no longer using it, so that the organization is slower, or unable to work, when the tool is unavailable and is worse at judging the tool's output. It is a slow risk, which makes it easy to overlook, and it is measurable in the cost of the fallback. The assistant handles tickets at 15 minutes unaided. With 160,000 tickets over 250 working days, a day has 640 tickets, and if the assistant is down for 5 days a year, 3,200 tickets are handled by hand. If agents' unaided time has grown by a share \( e \) because of disuse, the cost is \( 3{,}200 \times 15 \times e \div 60 \times 45 \), in dollars.

| Years of use | Unaided slowdown \( e \) | Extra hours in 5 outage days | Cost a year |
|-------------:|-------------------------:|-----------------------------:|------------:|
| 0 | 0% | 0 | $0 |
| 1 | 4% | 32 | $1,440 |
| 2 | 7% | 56 | $2,520 |
| 3 | 10% | 80 | $3,600 |

The cost is small here, because the fallback is a known task done a little slower, and it is larger for work where the skill is judgment, such as noticing that a draft is wrong, which Chapter 21 priced as overreliance. A practice drill of 1 hour a year per agent costs \( 40 \times 45 = \$1,800 \), and if it holds the slowdown to 4%, it saves \( 3{,}600 - 1{,}440 = \$2,160 \) at the year-3 level, a net $360. The drill is marginal on the outage arithmetic alone, and its main value is the judgment it keeps.

!!! mascot-encourage "A Soft Risk Is Still a Risk You Can Price"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If skill erosion feels too vague to put a number on, start with the cheapest observable: how much longer an unaided ticket takes now than at launch. Measure it once a year on a small sample, and the vague risk becomes a trend line.

### Governance and Process Costs

The **governance overhead cost** is the cost of running the oversight itself: reviews, committees, evidence gathering, and the time projects spend waiting for approval. Chapter 21's controls table can be split into two kinds. The oversight lines are the governance review $3,600, the model risk inventory $180, the board share $1,080, audit readiness $2,160, third-party assessment $2,700, and incident drills $2,160, together $11,880. The technical controls are privacy $7,800, access control $3,240, bias testing $3,488, and explainability $2,880, together $17,408. Oversight is 40.6% of the $29,288, and 33.9% of the plan's $35,000 running cost. Waiting is a cost too. A three-week approval delay postpones a year-1 benefit of $60,000, which is \( 60{,}000 \div 52 \times 3 = \$3,462 \), a figure that belongs in the overhead because it is paid by the business, not by the governance team.

The **governance maturity model** is a scale of how developed an organization's AI oversight is, from level 1, ad hoc and dependent on individuals, through defined, managed, and measured, to level 5, optimized and largely automated. Its use for cost is that each level has a price and an effect on losses. The figures below are illustrative for a portfolio of 12 systems.

| Level | Annual cost of controls | Expected annual loss | Total |
|------:|------------------------:|---------------------:|------:|
| 1 Ad hoc | $5,000 | $90,000 | $95,000 |
| 2 Defined | $20,000 | $60,000 | $80,000 |
| 3 Managed | $45,000 | $30,000 | $75,000 |
| 4 Measured | $70,000 | $18,000 | $88,000 |
| 5 Optimized | $100,000 | $12,000 | $112,000 |

The **governance ROI tradeoff** is the comparison of what an increase in governance costs with the loss it removes. Moving from level 1 to 2 costs $15,000 more and removes $30,000 of loss, from 2 to 3 costs $25,000 and removes $30,000, a gain of $5,000. Moving from 3 to 4 costs $25,000 and removes $12,000, a net loss of $13,000, and from 4 to 5 costs $30,000 and removes $6,000, a net loss of $24,000. The minimum total is at level 3. The result is true for these figures and for a portfolio of this risk, and it does not mean that more governance is always wasteful, because a legal requirement can fix the level whatever the arithmetic says.

The **policy enforcement automation** is the use of software to apply a policy to every request, such as redaction before sending, logging, and spend caps, in place of a person checking a sample. Suppose a person checks 1% of 960,000 queries, 9,600 queries at 1 minute each, \( 160 \text{ hours} \times 45 = \$7,200 \) a year, a cost of \( 7{,}200 \div 9{,}600 = \$0.75 \) for each query checked. An automated check takes 60 hours to build, $5,400, and $150 a month to run, $1,800 a year, and it checks all queries at \( 1{,}800 \div 960{,}000 = \$0.0019 \) each. Over three years the manual sample costs $21,600 and the automated check \( 5{,}400 + 3 \times 1{,}800 = \$10,800 \); the two cost the same at exactly one year, because \( 5{,}400 + 1{,}800 = 7{,}200 \). The saving is $10,800, and coverage rises from 1% to 100%.

### Technology Costs

The **technical debt risk** is the risk that shortcuts taken to launch quickly make every later change slower and more costly. Debt has a principal, the cost to fix it, and interest, the extra cost each change pays until it is fixed. Suppose the assistant launched with its prompts written into 14 places and no tests. Fixing that takes 120 hours, \( 120 \times 90 = \$10,800 \). The interest is 6 extra hours on each of 10 changes a year, \( 6 \times 10 \times 90 = \$5,400 \) in year 1, and if it grows by 20% a year, $6,480 and $7,776, or $19,656 over three years. Paying the debt is worth it when the principal is less than the interest over the system's remaining life, here $10,800 against $19,656, and it would not be worth it for a system with 1 year left, where the interest is $5,400.

The **legacy integration risk** is the risk that connecting the system to older software costs more than planned or breaks later. The assistant reads and writes tickets in an older ticketing system. Suppose a 30% chance of 60 hours of rework at launch, \( 0.30 \times 60 \times 90 = \$1,620 \), and a 50% chance of 40 hours when the ticketing system is upgraded in year 3, \( 0.50 \times 40 \times 90 = \$1,800 \). The expected cost is $3,420 over three years, or $1,140 a year.

The **model retirement cost** is the cost of ending a model's use in an orderly way: decommissioning it, deleting or archiving its data, and keeping the evidence an auditor may later ask for. At the end of year 3 the assistant needs 24 hours of decommissioning, 16 hours of data deletion and attestation, and 10 hours of archiving evaluation records, \( 50 \times 90 = \$4,500 \). A forced move to a new model, which Chapter 19 priced at $12,040, is a different event, and it costs more than an orderly end because it happens on the vendor's schedule.

### Registering and Pricing the Risks

The **AI risk register** is the maintained list of an AI system's risks, each with a chance, an impact, an expected loss, a control, and a residual loss after the control. Chapter 20 built a register of eight vendor risks and Chapter 21 added the exposures of governance, privacy, and people. Both are merged below for the assistant on vendor A. The community support risk of Chapter 20 applies to a self-hosted model and is left out. The **residual loss** is the expected loss that remains after the controls, and it is the figure that goes into the cost model.

One impact needs a correction first. The **security incident cost estimate** is the cost of a security or privacy incident built up from its parts. Chapters 20 and 21 used $120,000 for 800 records at $150 each. The parts are forensics of $24,000, legal advice of $30,000, staff time of $6,000, notification of 800 records at $45, $36,000, and monitoring and support of 800 at $30, $24,000, which total \( 24{,}000 + 30{,}000 + 6{,}000 + 36{,}000 + 24{,}000 = \$120,000 \). Only the last two parts scale with the records. Chapter 21 scaled the whole $150 down when it cut retention to 30 days and 267 records, giving $40,000. With the fixed part held at $60,000, the impact is \( 60{,}000 + 60{,}000 \times 267 \div 800 = \$80,025 \), and the expected loss at a 5% chance is $4,001, not $2,000. The register carries the larger figure. It is still conservative, because it gives no credit for the redaction that Chapter 21 already pays for.

The register follows. The first six risks happen often enough to be budgeted at the system, and the last six are rare and large. The shadow AI figure is 10% of Chapter 21's $36,000, on the judgment that an approved tool and monitoring remove 90% of unapproved use, and the overreliance figure is a 15% chance of Chapter 21's $23,040. Both are judgments, and the register labels them as such.

| Risk | Chance a year | Impact after controls | Residual loss | Control and cost |
|------|--------------:|----------------------:|--------------:|------------------|
| Update regression | 1.00 | $3,744 | $3,744 | Pinning and tests, $1,200 |
| Outage beyond the SLA | 0.50 | $6,000 | $3,000 | None; failover does not pay |
| Early exit from a long contract | 0.25 | $11,904 | $2,976 | None; exit clause does not pay |
| Shadow AI use | 1.00 | $3,600 | $3,600 | Approved tool, monitoring |
| Skill erosion, outage days | 1.00 | $1,440 | $1,440 | Practice drill, $1,800 |
| Legacy integration | 1.00 | $1,140 | $1,140 | None |
| **Subtotal, budgeted at the system** | | | **$15,900** | |
| Vendor data incident | 0.05 | $80,025 | $4,001 | Redaction, shorter retention |
| Model deprecation | 0.20 | $6,020 | $1,204 | Notice clause, $500 |
| Vendor business failure | 0.02 | $60,000 | $1,200 | None; standby does not pay |
| Overreliance | 0.15 | $23,040 | $3,456 | Source display, seeding checks |
| Infringement claim | 0.02 | $15,000 | $300 | Indemnity, $1,488 |
| Reputational damage | 0.02 | $60,000 | $1,200 | None |
| **Subtotal, rare and large** | | | **$11,361** | |
| **Total residual loss** | | | **$27,261** | |

The price cap of $600 removes the renewal price risk entirely, so it has no residual line. The controls that cost money and are not in Chapter 21's table are the price cap $600, the deprecation notice clause $500, the regression tests $1,200, the indemnity $1,488, and the practice drill $1,800, together $5,588 a year. Regulatory change is carried in the organization's reserve and is not allocated to a single system.

The **risk mitigation cost-benefit** is the comparison of what a control costs with the expected loss it removes, and a control is bought when the loss removed is larger than the cost. It is the test of Chapter 20, and it applies to every line of the register. The indemnity removes \( 0.02 \times 150{,}000 \times 0.90 = \$2,700 \) for $1,488, a net $1,212, and the drill nets $360. Some controls fail the test and are required anyway. A legal duty to notify, or a contract term, overrides the arithmetic, and those belong in the baseline.

The **insurance cost for AI risk** is the premium paid to move part of a large loss to an insurer. Suppose a policy with a $100,000 limit and a $10,000 retention costs $3,600 a year. After the retention the insurer would pay \( 80{,}025 - 10{,}000 = \$70,025 \) of the data incident, an expected recovery of \( 0.05 \times 70{,}025 = \$3,501 \), $99 less than the premium. Insurance seldom pays in expectation, since the insurer needs a margin, and it is bought to cap the worst case, which is a matter for the risk appetite below.

!!! mascot-warning "Do Not Add a Risk and the Control That Removes It"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The same $2,400 of redaction appears as a mitigation in Chapter 20 and as a privacy cost in Chapter 21, and a model that adds both counts it twice. Give each cost one home, carry the residual loss and not the loss before controls, and keep a note of where each figure is already counted.

The first specification lets the learner practice that audit.

#### Diagram: Double-Count Detector

<details markdown="1">
<summary>Double-Count Detector</summary>
Type: microsim
**sim-id:** double-count-detector<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate eight cost items that must be added to the risk-adjusted model from those already counted elsewhere in it.

**Prerequisites:** risk register, residual loss, risk mitigation cost-benefit, governance overhead cost (defined in the sections "Governance and Process Costs" and "Registering and Pricing the Risks" above).

**Evidence of Mastery:** For each of eight items the learner commits Add or Already counted before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Every cost mentioned in an earlier chapter is a new cost. (2) The loss before controls and the residual after controls are both added. (3) A cost that sits in a benefit measure is also a cost line.

**Instructional Rationale:** Analyze-level work separates items by a structural feature. Items that look alike, such as two forms of the data incident figure, force the learner to ask where each cost already lives and not to react to its size.

**Content:**

The model starts from the plan's $35,000 running cost and Chapter 11's realized benefit of $55,080. Chapter 21's controls total of $29,288 is already in the model. The register carries residual losses, and the contingency is funded from them.

| # | Item shown to the learner | Correct choice | Why (shown as feedback) |
|---|---|---|---|
| 1 | Redaction before sending, $2,400, listed as a mitigation in Chapter 20 | Already counted | It is inside the $7,800 privacy cost of Chapter 21's $29,288. |
| 2 | Wrong-answer handling, $38,400, from Chapter 19's vendor total | Already counted | Task time comes from ticket timestamps, so the time spent fixing answers is already inside the measured benefit. |
| 3 | Annual retraining, $5,400 | Add | It is in neither the plan nor Chapter 21's controls. |
| 4 | Price-cap clause, $600 | Add | It is a Chapter 20 mitigation that Chapter 21's table does not contain. |
| 5 | Vendor data incident expected loss of $6,000 before controls | Already counted | The register carries the residual of $4,001, which replaces it. |
| 6 | Model retirement at the end of year 3, $4,500 | Add | No earlier chapter prices the end of life. |
| 7 | Governance board share, $1,080 | Already counted | It is one of the six oversight lines in the $29,288. |
| 8 | Indemnity premium, $1,488 | Add | Chapter 21 priced it as a decision, and its controls table leaves it out. |

**Provenance:** Items come from the chapter sections of this chapter and from Chapters 11, 19, 20, and 21. The sim must label all data "illustrative".

**Rules:** An item is Already counted when its amount, or a figure that replaces it, is inside the $35,000 plan cost, the $55,080 benefit, the $29,288 controls total, or the residual losses of the register. It is Add otherwise. No item is both. Dollars are shown to the whole dollar.

**Learner Activity:**

1. The learner reads item 1, chooses Add or Already counted, and presses Commit.
2. The sim shows the correct choice and the "Why" text.
3. After eight items, the learner sees a ledger that sums the items whose correct choice is Add, $11,988 in all, and the items whose correct choice is Already counted, $47,880, shown as "not added".
4. The learner should notice that the largest figures on the list, $38,400 and $6,000, are both ones that must not be added.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Item 1 is shown with no choice made. The question on screen is "Is this cost already inside the model, or must it be added?"

**Chapter Anchors:** The chapter states that redaction of $2,400 appears in both Chapters 20 and 21, a data incident residual of $4,001, a controls total of $29,288, and recurring items such as retraining of $5,400.
</details>

### Risk Appetite and Contingency

The **risk appetite statement** is a written statement, approved by senior leadership, of the amount and kinds of risk the organization is willing to carry in pursuit of its goals. Without it a risk register is a list of numbers with nothing to compare them to. A usable statement is a few rules a reader can test. For AI systems, three suffice:

1. A single event with an impact above $50,000 must be insured or mitigated to below that level, or approved by an executive.
2. The expected residual loss of a system must not exceed 25% of its realized annual benefit.
3. Regulated personal data must not be left exposed to an uncontrolled tool.

Apply them to the assistant. The largest single event is the data incident at $80,025, above $50,000 and uninsured, so rule 1 is breached, and a policy of $3,600 would cure it. The residual loss of $27,261 is \( 27{,}261 \div 55{,}080 = 49.5\% \) of the realized benefit, double the 25% limit, so rule 2 is breached, and no insurance cures it. The assistant must be escalated, which is the statement doing its job: it turns a feeling of unease into a defined trigger for a decision.

The **contingency budget** is money set aside for risks that are expected to occur, in a reserve released only by an agreed rule. The register suggests how to size it. Risks with a chance of 25% or more a year, the six frequent ones, are close to certain, so the system holds $15,900. The rare and large risks, $11,361, are better pooled in a reserve held for all systems, because they will not all happen to one system in the same year. A reserve set at the expected loss is exhausted in about half of the years, so the rule must say who tops it up and when unused money is released.

The second specification lets the learner apply the statement.

#### Diagram: Risk Appetite Check

<details markdown="1">
<summary>Risk Appetite Check</summary>
Type: microsim
**sim-id:** risk-appetite-check<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight systems, whether it is within the risk appetite or must be escalated, using the two testable rules of the statement.

**Prerequisites:** risk appetite statement, residual loss, contingency budget (defined in the section "Risk Appetite and Contingency" above).

**Evidence of Mastery:** For each of eight systems the learner commits Within appetite or Escalate before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A system with a small residual loss in dollars is within appetite whatever its benefit. (2) A ratio exactly at the limit is a breach. (3) Insurance cures a breach of the ratio rule.

**Instructional Rationale:** Evaluate-level work applies criteria to a case and defends the verdict. Cases that sit exactly on a limit, and one in which insurance cures one rule and not the other, make the learner test each rule separately.

**Content:**

Rule 1: Escalate when the largest single-event impact is above $50,000 and it is not insured. Rule 2: Escalate when the expected residual loss is above 25% of the realized annual benefit. A system is Within appetite when neither rule requires escalation.

| # | Realized annual benefit | Expected residual loss | Largest single event | Insured against it | Ratio | Correct choice | Why (shown as feedback) |
|---|---:|---:|---:|---|---:|---|---|
| 1 | $55,080 | $27,261 | $80,025 | No | 49.5% | Escalate | The ratio is above 25%, and the largest event is above $50,000 and uninsured. |
| 2 | $200,000 | $40,000 | $45,000 | No | 20.0% | Within appetite | The ratio is 20.0%, and the largest event is not above $50,000. |
| 3 | $200,000 | $50,000 | $30,000 | No | 25.0% | Within appetite | A ratio of exactly 25.0% is not above the limit. |
| 4 | $100,000 | $26,000 | $20,000 | No | 26.0% | Escalate | The ratio is 26.0%, above 25%. |
| 5 | $80,000 | $10,000 | $120,000 | No | 12.5% | Escalate | The ratio passes, but the largest event is above $50,000 and uninsured. |
| 6 | $80,000 | $10,000 | $120,000 | Yes | 12.5% | Within appetite | Insurance cures rule 1, and the ratio passes. |
| 7 | $150,000 | $30,000 | $50,000 | No | 20.0% | Within appetite | A largest event of exactly $50,000 is not above $50,000. |
| 8 | $60,000 | $15,000 | $55,000 | No | 25.0% | Escalate | The ratio is exactly 25.0% and passes, but the largest event is above $50,000 and uninsured. |

**Provenance:** Case 1 comes from the chapter sections "Registering and Pricing the Risks" and "Risk Appetite and Contingency". The other cases are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Ratio = expected residual loss ÷ realized annual benefit. Escalate if ratio > 25% or if (largest event > $50,000 and insured = No). Otherwise Within appetite, including when the ratio equals 25% or the largest event equals $50,000. Ratios are shown to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Realized annual benefit | 20,000 | 300,000 | 1 | 55,080 | dollars |
| Expected residual loss | 0 | 100,000 | 1 | 27,261 | dollars |
| Largest single event | 0 | 150,000 | 1 | 80,025 | dollars |
| Insured against it | No | Yes | one choice | No | choice |

**Learner Activity:**

1. The learner reads system 1, chooses Within appetite or Escalate, and presses Commit.
2. The sim shows the ratio, the result of each rule, and the "Why" text.
3. After eight systems, exploration unlocks: the learner changes the four quantities and watches the ratio, each rule's result, and the verdict update.
4. The learner should notice that buying insurance changes rule 1 and has no effect on rule 2.

**Feedback:** Eight systems, fixed order, two attempts each. Correct: "Correct: <choice>, ratio <ratio>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the system counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** System 1 is shown with no choice made. The question on screen is "Does this system fit the risk appetite?"

**Chapter Anchors:** The chapter states a residual loss of $27,261, a realized benefit of $55,080, a ratio of 49.5%, a limit of 25% and a single-event threshold of $50,000.
</details>

### The Risk-Adjusted Model and Its Total Cost

The **risk-adjusted cost model** is a cost model that adds to the plan every cost found by the checklist and the expected residual loss from the register, so that the figure compared with the benefit includes what is likely to go wrong. For a steady year, year 2, the steps follow.

| Step | Amount |
|------|-------:|
| Realized benefit (Chapter 11) | $55,080 |
| Planned running cost (Chapter 10) | $35,000 |
| **Net before additions** | **$20,080** |
| Retraining | $5,400 |
| Change management | $2,160 |
| Controls (Chapter 21) | $29,288 |
| Mitigations not in the controls | $5,588 |
| Expected residual loss | $27,261 |
| **Total additions** | **$69,697** |
| **Risk-adjusted net** | **-$49,617** |

The recurring additions are \( 5{,}400 + 2{,}160 + 29{,}288 + 5{,}588 = \$42,436 \), and the residual loss adds \$27,261. The risk-adjusted cost is \( 35{,}000 + 69{,}697 = \$104,697 \), which is \( 104{,}697 \div 960{,}000 = \$0.109 \) a query, and the benefit that would break even is \$104,697, which is 1.90 times the realized benefit and 1.31 times the plan's \$80,000. Even the plan's benefit would not cover it.

The **risk-adjusted TCO** is the same model across the whole life of the system, with the one-time costs placed in the years they fall. The table gives the three years, with the controls, mitigations, and residual loss held flat each year, although year 1 volume is lower, so year 1 is overstated for the items that scale with queries.

| Item | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|------|-------:|-------:|-------:|-------:|------:|
| Investment | $60,000 | | | | $60,000 |
| Running cost | | $30,000 | $35,000 | $35,000 | $100,000 |
| Retraining | | $15,300 | $5,400 | $5,400 | $26,100 |
| Change management | | $6,120 | $2,160 | | $8,280 |
| Controls | | $36,488 | $29,288 | $29,288 | $95,064 |
| Mitigations | | $5,588 | $5,588 | $5,588 | $16,764 |
| Technical debt paydown | | $10,800 | | | $10,800 |
| Model retirement | | | | $4,500 | $4,500 |
| Expected residual loss | | $27,261 | $27,261 | $27,261 | $81,783 |
| **Risk-adjusted cost** | **$60,000** | **$131,557** | **$104,697** | **$107,037** | **$403,291** |
| Realized benefit | | $41,310 | $55,080 | $55,080 | $151,470 |

Against the plan's $160,000 the risk-adjusted cost is $403,291, so the additions are $243,291. The benefit is $151,470, and the risk-adjusted ROI is \( (151{,}470 - 403{,}291) \div 403{,}291 = -62.4\% \), with an NPV at 10% of -$222,085, against -5.3% and -$18,037 before the additions and 37.5% in the plan. Moving the expected residual loss to half or to one and a half times changes the ROI only from -58.2% to -65.9%, because the controls, at $95,064, are larger than the residual loss and are not judgments. The result is insensitive to the risk assumptions, and it is sensitive to the size of the control program.

!!! mascot-thinking "When the Controls Cost More Than the System Earns"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what -62.4% does and does not say. It does not say that generative AI loses money, and it says that controls priced for an enterprise program, charged in full to a system that nets $20,080 a year, will outweigh that system. Either the controls are shared and tiered, or the use case is too small to carry them, and the report must put that choice in front of the decision maker.

Two readings of the number need to be kept apart. A fully allocated cost, which charges the system its share of every shared control, is the right basis for reporting. A decision to continue should use the incremental cost, which counts only what stops if the system is switched off. The board share, audit readiness, and incident drills, $5,400 of the $29,288, are paid whether or not the assistant runs. Sharing the access reviews, audit readiness, and drills across four systems would save \( (3{,}240 + 2{,}160 + 2{,}160) \times 3 \div 4 = \$5,670 \) a year. The incremental view improves the case by a few thousand dollars and does not change its sign.

The third specification lets the learner build the year-2 model.

#### Diagram: Risk-Adjusted Year Builder

<details markdown="1">
<summary>Risk-Adjusted Year Builder</summary>
Type: microsim
**sim-id:** risk-adjusted-year-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the recurring additions, the total additions, the risk-adjusted net, the break-even benefit, and its multiple of the realized benefit for the support assistant, to within the tolerance stated for each item.

**Prerequisites:** risk-adjusted cost model, residual loss, break-even benefit (defined in the section "The Risk-Adjusted Model and Its Total Cost" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The plan's benefit would cover the risk-adjusted cost. (2) Expected residual loss is the largest part of the additions. (3) Risk-adjusted cost per query is the vendor's price per query.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Building the year step by step shows that the controls, and not the risk judgments, dominate the additions, and the exploration shows how little the result moves when the judgments change.

**Content:**

Fixed inputs for year 2: realized benefit $55,080, planned running cost $35,000, retraining $5,400, change management $2,160, controls $29,288, mitigations not in the controls $5,588, expected residual loss $27,261, and 960,000 queries.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Net before additions | $20,080 | 1 | 55,080 − 35,000 = 20,080. |
| 2 | Recurring additions | $42,436 | 1 | 5,400 + 2,160 + 29,288 + 5,588 = 42,436. |
| 3 | Total additions | $69,697 | 1 | 42,436 + 27,261 = 69,697. |
| 4 | Risk-adjusted net | -$49,617 | 1 | 20,080 − 69,697 = −49,617. |
| 5 | Risk-adjusted cost per query | $0.109 | 0.001 | (35,000 + 69,697) ÷ 960,000 = 0.1091. |
| 6 | Break-even benefit | $104,697 | 1 | The benefit must equal 35,000 + 69,697. |
| 7 | Break-even benefit as a multiple of the realized benefit | 1.90 | 0.01 | 104,697 ÷ 55,080 = 1.901. |
| 8 | Share of the additions that is expected residual loss | 39.1% | 0.1 | 27,261 ÷ 69,697 = 0.391. |

**Provenance:** All values come from this chapter and from Chapters 10, 11, and 21. The sim must label the data "illustrative".

**Rules:** Additions = retraining + change management + controls + mitigations + residual loss. Net = benefit − running cost − additions. Break-even benefit = running cost + additions. Dollars are shown to the whole dollar, per-query cost to three decimals, multiples to two decimals, and percentages to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Expected residual loss as a share of the register | 0 | 150 | 10 | 100 | percent |
| Systems sharing the access reviews, audit readiness, and drills | 1 | 4 | 1 | 1 | systems |
| Realized benefit | 40,000 | 80,000 | 1 | 55,080 | dollars |

Controls = 29,288 − 7,560 × (1 − 1 ÷ systems), because the access reviews, audit readiness, and drills cost $7,560 a year in all and are divided among the systems that share them. The eight items use the defaults.

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the residual loss share, the number of sharing systems, and the realized benefit, and watches the net and the break-even benefit update.
4. The learner should notice that at the realized benefit of $55,080 the net stays negative even with 0% residual loss and 4 sharing systems, and that it turns positive only when the benefit also rises toward the plan's $80,000.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What does the assistant net in year 2 before any additions?"

**Chapter Anchors:** The chapter states a net before additions of $20,080, recurring additions of $42,436, total additions of $69,697, a risk-adjusted net of -$49,617, a cost of $0.109 a query, a break-even benefit of $104,697, a multiple of 1.90, and a residual loss share of 39.1%.
</details>

### Reporting Risk to Executives

The **risk reporting to executives** is the practice of presenting an initiative's risk in a form that lets a non-specialist decide, rather than a list of every risk found. An executive reads three things: the size of the exposure against appetite, what has changed since the last report, and what decision is requested. A one-page risk summary for the assistant would show the four largest residual losses (the data incident at $4,001, the update regression at $3,744, shadow AI use at $3,600, and overreliance at $3,456), the appetite status, which is two rules breached, and a trend. It would then state the three-way result in one table, the plan, the measured result, and the risk-adjusted result, and name the options. The options here are to restructure the controls so that platform costs are shared, to widen the use of the assistant until the benefit approaches the break-even benefit of $104,697, or to stop. Chapters 23 and 24 take that report further: who reads it, how to frame the result, and how to defend it.

| View | Chapter | Three-year cost | Three-year benefit | ROI |
|------|---------|----------------:|-------------------:|----:|
| Plan | 10 | $160,000 | $220,000 | 37.5% |
| Realized | 11 | $160,000 | $151,470 | -5.3% |
| Risk-adjusted | 22 | $403,291 | $151,470 | -62.4% |

### Summary and Quick Check

The hidden cost discovery checklist finds the costs a plan omits, in five stages. Retraining costs $9,900 at launch and $5,400 a year, and pays for itself only if it lifts adoption by 8.3 points. Change management adds $8,280 over three years, and skill erosion is priced through the cost of the fallback, $3,600 at a 10% slowdown, and held to $1,440 by a $1,800 drill. Governance overhead is $11,880 of the $29,288 of controls, maturity beyond level 3 costs more than the loss it removes in the illustration, and automating a policy check pays back in one year. Technical debt is paid down when the principal, $10,800, is below the interest over the remaining life, $19,656. Legacy integration costs $1,140 a year and retirement $4,500. The register carries $27,261 of residual loss after controls, with the data incident corrected to $4,001. A risk appetite statement turns that into a decision: the assistant breaches both rules and is escalated. The risk-adjusted model nets -$49,617 in year 2 and returns -62.4% over three years, because the controls, $95,064, dominate, and the result is insensitive to the risk judgments.

??? note "Quick check: why is the residual loss, and not the loss before controls, added to the model? - Click to expand"
    The loss before controls includes losses the controls remove. Adding both the control's cost and the unmitigated loss counts the same risk twice, and a data incident carried at $6,000 before controls is $4,001 after them.

??? note "Quick check: why can the risk-adjusted ROI barely move when the risk judgments change? - Click to expand"
    Of the $243,291 of additions, $95,064 is controls and $81,783 is expected residual loss. Halving the residual loss changes the ROI from -62.4% to -58.2%, because the larger part of the additions is certain spending and not a judgment.

??? note "Quick check: why does insurance not cure a breach of the 25% ratio rule? - Click to expand"
    Insurance moves a large single event to an insurer, which satisfies the single-event rule. It does not remove the expected residual loss from the system's cost, so the ratio of that loss to the benefit is unchanged.

!!! mascot-celebration "You Can Put the Risks Into the Number"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now run the hidden cost checklist, register and price residual risk without counting it twice, test a system against a risk appetite, and build a risk-adjusted cost for three years. That is the figure an executive will want, and the reason chapters 23 to 26 teach how to present it.
