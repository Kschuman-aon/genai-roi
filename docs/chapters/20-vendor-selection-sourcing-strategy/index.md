---
title: Vendor Selection and Sourcing Strategy
description: Structured vendor selection, from criteria and scorecards through proofs of concept, pilots, and bids, the economics of self-hosted, managed, and hybrid sourcing, the vendor risks that follow, and a build-versus-buy case study and sourcing roadmap.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 15:03:00
version: 1.11
---

# Vendor Selection and Sourcing Strategy

## Summary

Covers structured vendor-selection methods — benchmarking, pilots, due diligence, and scorecards — alongside the sourcing risks that accompany vendor decisions. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Model Selection Criteria | 1 |
| Proof-Of-Concept Cost | 19 |
| Pilot Program Design | 18 |
| Vendor Risk Assessment | 17 |
| Vendor Due Diligence | 16 |
| Self-Hosted Model Economics | 15 |
| Managed Service Economics | 14 |
| Hybrid Sourcing Strategy | 13 |
| Procurement Cycle Impact | 1 |
| Total Addressable Cost Savings | 11 |
| Competitive Bidding Process | 10 |
| Vendor Consolidation Strategy | 9 |
| Community Support Risk | 8 |
| Model Update Cadence Risk | 7 |
| Vendor Deprecation Risk | 6 |
| Cost Predictability Assessment | 5 |
| Long-Term Contract Risk | 1 |
| Vendor Scorecard | 3 |
| Build Vs Buy Case Study | 2 |
| Sourcing Strategy Roadmap | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Compute Pricing and Scaling Fundamentals](../05-compute-pricing-scaling/index.md)
- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 19: Vendor Pricing and Licensing Economics](../19-vendor-pricing-licensing-economics/index.md)

---

Chapter 19 priced the offers. This chapter is about the decision: how to choose among them with evidence, how much effort the choice deserves, which sourcing model to run, and which risks to price before signing. The case continues the support assistant of Chapters 9, 10, and 19, with vendors A, B, and C, a self-hosted model D, and the annual totals of Chapter 19: $58,680, $76,776, $59,083, and $111,360. The volumes are 720,000 queries in year 1 and 960,000 in each of years 2 and 3. All figures are illustrative.

!!! mascot-welcome "Spend on the Choice What the Choice Can Save"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A careful selection can cost more than it saves, and a careless one can cost the whole contract. By the end of this chapter you can score vendors on weighted criteria, decide whether a pilot or a bid is worth its price, and write a sourcing roadmap with its gates. Every token counts, and so does every hour spent choosing.

### Selecting With Criteria and a Scorecard

The **model selection criteria** are the stated requirements, with weights, against which candidate models and vendors are judged: answer quality, total cost, reliability, security and data handling, and portability, among others. Writing them down before looking at any vendor stops the decision from being rebuilt around whichever offer is in front of the team. The weights are the organization's priorities, and they are the part most worth arguing about, since the winner can change with them.

The **vendor scorecard** is the table that scores each candidate on each criterion and combines the scores with the weights into one number per vendor. The scores must come from evidence: here, quality from the benchmark of Chapter 19 (5 for accuracy of 92% or more, 4 for 88% to 91.9%, 3 for 84% to 87.9%), cost from the total vendor cost model (5 for a total within 1% of the lowest, 3 for one 31% above it), and reliability, security, and portability from the SLA review, due diligence, and portability findings, on a 1 to 5 scale.

| Criterion | Weight | Vendor A | Vendor B | Vendor C |
|-----------|-------:|---------:|---------:|---------:|
| Answer quality | 30% | 5 | 3 | 4 |
| Total annual cost | 30% | 5 | 3 | 5 |
| Reliability and SLA | 15% | 4 | 4 | 3 |
| Security and data handling | 15% | 4 | 4 | 3 |
| Portability | 10% | 2 | 2 | 4 |
| **Weighted score** | | **4.40** | **3.20** | **4.00** |

Vendor A scores \( 0.30 \times 5 + 0.30 \times 5 + 0.15 \times 4 + 0.15 \times 4 + 0.10 \times 2 = 4.40 \). The ranking depends on the weights. If portability is raised to 30% and quality and cost are lowered to 20% each, A falls to 3.80 and C rises to 3.90, and C wins. If cost is raised to 45%, with quality at 20% and reliability at 10%, A scores 4.45 and C 4.20. A scorecard should always be shown with that sensitivity, since a ranking that flips on a reasonable change of weights is a close call and should be reported as one.

The first specification lets the learner compute the scorecard.

#### Diagram: Weighted Vendor Scorecard Calculator

<details markdown="1">
<summary>Weighted Vendor Scorecard Calculator</summary>
Type: microsim
**sim-id:** weighted-vendor-scorecard-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the weighted scores of vendors A, B, and C under three weight sets, to within 0.01.

**Prerequisites:** model selection criteria, vendor scorecard, weighted score (defined in the section "Selecting With Criteria and a Scorecard" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within 0.01 of the model value. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The vendor with the best score on the most criteria wins. (2) The weights do not change the ranking. (3) A score gap of 0.1 is a decisive win.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Computing the same scores under three weight sets shows the ranking change, and the exploration lets the learner find the change for a single score.

**Content:**

Criteria in order: answer quality, total annual cost, reliability and SLA, security and data handling, portability. Scores on a 1 to 5 scale:

| Vendor | Quality | Cost | Reliability | Security | Portability |
|---|---:|---:|---:|---:|---:|
| A | 5 | 5 | 4 | 4 | 2 |
| B | 3 | 3 | 4 | 4 | 2 |
| C | 4 | 5 | 3 | 3 | 4 |

Weight sets, in the same criteria order: Balanced 30%, 30%, 15%, 15%, 10%. Portability first 20%, 20%, 15%, 15%, 30%. Cost first 20%, 45%, 10%, 15%, 10%.

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Vendor A, Balanced | 4.40 | 0.30 × 5 + 0.30 × 5 + 0.15 × 4 + 0.15 × 4 + 0.10 × 2 = 4.40. |
| 2 | Vendor B, Balanced | 3.20 | 0.30 × 3 + 0.30 × 3 + 0.15 × 4 + 0.15 × 4 + 0.10 × 2 = 3.20. |
| 3 | Vendor C, Balanced | 4.00 | 0.30 × 4 + 0.30 × 5 + 0.15 × 3 + 0.15 × 3 + 0.10 × 4 = 4.00. |
| 4 | Vendor A, Portability first | 3.80 | 0.20 × 5 + 0.20 × 5 + 0.15 × 4 + 0.15 × 4 + 0.30 × 2 = 3.80. |
| 5 | Vendor C, Portability first | 3.90 | 0.20 × 4 + 0.20 × 5 + 0.15 × 3 + 0.15 × 3 + 0.30 × 4 = 3.90. |
| 6 | Vendor A minus vendor C, Balanced | 0.40 | 4.40 − 4.00 = 0.40. |
| 7 | Vendor A, Cost first | 4.45 | 0.20 × 5 + 0.45 × 5 + 0.10 × 4 + 0.15 × 4 + 0.10 × 2 = 4.45. |
| 8 | Vendor C, Cost first | 4.20 | 0.20 × 4 + 0.45 × 5 + 0.10 × 3 + 0.15 × 3 + 0.10 × 4 = 4.20. |

**Provenance:** All values come from the chapter section "Selecting With Criteria and a Scorecard". The sim must label the data "illustrative".

**Rules:** Weighted score = the sum over the five criteria of weight × score. Each weight set sums to 100%. Scores are shown to two decimals. The vendor with the highest weighted score under the chosen weight set is marked. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Weight set | Balanced | Cost first | one choice | Balanced | choice |
| Vendor A portability score | 1 | 5 | 1 | 2 | score |
| Vendor C reliability score | 1 | 5 | 1 | 3 | score |

**Learner Activity:**

1. The learner reads the scores, the weight sets, and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner chooses a weight set, changes the two scores, and watches the three weighted scores and the marked vendor update.
4. The learner should notice that under Portability first vendor C leads, and that raising vendor A's portability score from 2 to 3 changes the leader under that set.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The scores and weight sets are shown and item 1 has an empty answer box. The question on screen is "What is vendor A's weighted score under the Balanced weights?"

**Chapter Anchors:** The chapter states weighted scores of 4.40, 3.20, and 4.00 for A, B, and C under the balanced weights, 3.80 and 3.90 for A and C under portability-first weights, and 4.45 and 4.20 under cost-first weights.
</details>

### Proving Before Committing

A scorecard is a judgment about evidence, and the evidence is bought. The **proof-of-concept cost** is the cost of a small, time-boxed build that shows whether a candidate can do the task at all. For the assistant it is 80 hours of engineering, \( 80 \times 90 = \$7{,}200 \), $200 of tokens, and the labeling of a 500-ticket evaluation set, \( 500 \times 1.5 \div 60 \times 45 = \$562.50 \), a total of $7,962.50, about $7,963. A proof of concept answers one question: can it work?

The **pilot program design** is the plan for a limited trial on real work, with a defined scope, duration, comparison group, and success criteria fixed before it starts. The pilot answers a different question: does it work for us, at the stated cost? Suppose 10 of the 40 agents use the candidate for 8 weeks. Tokens for a quarter of the traffic over two months are \( 20{,}000 \times 2 \times 0.0155 = \$620 \), integration is $5,400, analysis takes 40 hours, $3,600, and agent training 10 people for 3 hours at $45 an hour is $1,350, for a total of $10,970. Whether it is worth that depends on what a failed full rollout would cost. Suppose the failure is the integration plus a locked 3-year contract, \( 5{,}400 + 35{,}712 \approx \$41{,}000 \). The pilot pays when the chance that the vendor does not deliver, multiplied by that loss, is above its cost: \( 10{,}970 \div 41{,}000 = 26.8\% \). At a 30% chance the expected loss avoided is $12,300 and the pilot is worth running. At 20% it is $8,200 and it is not.

!!! mascot-tip "Write the Pass Mark Before the Pilot Starts"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Put the accuracy, cost per ticket, and agent-satisfaction thresholds in writing, with the decision each result triggers, before the first query runs. A criterion chosen after the results is a story, not a test.

The **competitive bidding process** is a formal request to several vendors to quote against the same written requirements, scored with the criteria above. It has a price too: 60 hours of evaluation work, $5,400, and $3,000 of legal review, $8,400. Suppose bidding wins a 12% lower price on a 3-year contract. Then it pays when \( 3 \times 0.12 \times \text{annual spend} > 8{,}400 \), which is an annual spend above $23,333. On vendor A's $14,880 the saving is $5,357 and the bid loses money, and on a $60,000 program it saves $21,600. The **procurement cycle impact** is the cost of the time a purchase takes. Onboarding a new vendor takes 12 weeks, against 2 for one already under contract, and if the assistant's benefit is $1,000 a week, the 10 extra weeks cost $10,000, which a new vendor's saving must overcome before anything else counts.

The second specification lets the learner judge whether a pilot or a bid is worth its price.

#### Diagram: Selection Effort Judge

<details markdown="1">
<summary>Selection Effort Judge</summary>
Type: microsim
**sim-id:** selection-effort-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight cases, whether a pilot or a competitive bid is worth its cost, by comparing the expected benefit with the cost.

**Prerequisites:** pilot program design, competitive bidding process, expected loss avoided (defined in the section "Proving Before Committing" above).

**Evidence of Mastery:** For each of eight cases the learner commits Do it or Skip it before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A pilot is always worth running before a rollout. (2) A competitive bid is always worth running for a large contract. (3) The decision depends on the size of the vendor and not on the stakes.

**Instructional Rationale:** Evaluate-level work weighs a cost against a benefit. Cases placed just either side of each break-even force the learner to compute the comparison and not to follow a rule of thumb.

**Content:**

Fixed inputs: a pilot costs $10,970. A bid costs $8,400 and wins a 12% lower price over a 3-year contract. A pilot is worth running when the chance of failure × the loss from a failed rollout > 10,970. A bid is worth running when 3 × 0.12 × annual spend > 8,400.

| # | Case | Benefit compared with cost | Correct choice | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Pilot: 30% chance of failure, $41,000 loss | $12,300 against $10,970 | Do it | The expected loss avoided is $1,330 more than the pilot costs. |
| 2 | Pilot: 20% chance of failure, $41,000 loss | $8,200 against $10,970 | Skip it | The expected loss avoided is $2,770 less than the pilot costs. |
| 3 | Pilot: 30% chance of failure, $30,000 loss | $9,000 against $10,970 | Skip it | A smaller loss lowers the benefit to $1,970 less than the cost. |
| 4 | Pilot: 10% chance of failure, $150,000 loss | $15,000 against $10,970 | Do it | A large loss justifies a pilot even at a low chance of failure. |
| 5 | Bid: annual spend $23,000 | $8,280 against $8,400 | Skip it | 3 × 0.12 × 23,000 is $120 less than the cost of the bid. |
| 6 | Bid: annual spend $24,000 | $8,640 against $8,400 | Do it | 3 × 0.12 × 24,000 is $240 more than the cost of the bid. |
| 7 | Bid: annual spend $15,000 | $5,400 against $8,400 | Skip it | The saving is $3,000 less than the cost of the bid. |
| 8 | Bid: annual spend $60,000 | $21,600 against $8,400 | Do it | The saving is $13,200 more than the cost of the bid. |

**Provenance:** The pilot cost, the bid cost, and the break-evens come from the chapter section "Proving Before Committing". The cases are illustrative, and the sim must label them "illustrative".

**Rules:** For a pilot, Do it when chance × loss > 10,970, and Skip it otherwise, including when they are equal. For a bid, Do it when 3 × 0.12 × annual spend > 8,400, and Skip it otherwise. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Step | Pilot | Bid | one choice | Pilot | choice |
| Chance of failure | 0.05 | 0.50 | 0.05 | 0.30 | probability |
| Loss from a failed rollout | 10,000 | 150,000 | 1,000 | 41,000 | dollars |
| Annual spend | 10,000 | 70,000 | 1,000 | 15,000 | dollars |

**Learner Activity:**

1. The learner reads case 1, chooses Do it or Skip it, and presses Commit.
2. The sim shows the benefit, the cost, the difference, and the "Why" text.
3. After eight cases, exploration unlocks: the learner chooses a step, changes its quantities, and watches the benefit, the cost, and the choice update.
4. The learner should notice that a pilot with a 26.8% chance of failure and a $41,000 loss is close to its break-even, and that a bid breaks even near $23,333 of annual spend.

**Feedback:** Eight cases, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the case counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Case 1 is shown with no choice made. The question on screen is "Is this pilot worth its cost?"

**Chapter Anchors:** The chapter states a pilot cost of $10,970, a bid cost of $8,400, a 12% saving over 3 years, a pilot break-even chance of 26.8% at a $41,000 loss, expected loss avoided of $12,300 at 30% and $8,200 at 20%, and a bid break-even spend of $23,333.
</details>

### Self-Hosted, Managed, and Hybrid Sourcing

The **self-hosted model economics** are the costs of running a model on infrastructure the organization operates: a mostly fixed cost, whatever the volume. Using Chapter 19's figures, one server and its operations cost $45,360 a year. Suppose one server practically serves 10 million queries a year of the assistant's size, which leaves headroom for peaks below the roughly 31 million that its raw speed allows. The cost per query then depends on how full the server is.

| Utilization of one server | Queries a year | Cost per query |
|--------------------------:|---------------:|---------------:|
| 10% | 1.0 million | $0.04536 |
| 29.3% | 2.93 million | $0.01548 |
| 50% | 5.0 million | $0.00907 |
| 100% | 10.0 million | $0.00454 |

At today's 960,000 queries the server is 9.6% used and each query costs $0.04725, three times vendor A's price. The break-even against A is the 2.93 million queries of the 29.3% row. Against C, at $0.00342, a single server never breaks even, even full at $0.00454. The **managed service economics** are the opposite shape: cost per query is flat and the bill scales to zero when use stops, with the vendor carrying the idle capacity and the upgrades and charging for it in the rate. Managed service wins at low and uncertain volume, and a self-hosted server must be compared with the cheapest managed model that is good enough, not the dearest.

!!! mascot-thinking "Compare Self-Hosting With the Cheapest Good-Enough Managed Option"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the same server looks economical against vendor A and uneconomical against vendor C. The break-even moves by a factor of more than four depending on which managed price you hold it against, so choose the comparison before computing the saving.

The **hybrid sourcing strategy** is the use of different sourcing models for different parts of the workload, chosen by the requirements of each part. Suppose 15% of tickets, 144,000 queries, contain data that policy says may not leave a region. The first option is a self-hosted model for that segment, $45,360 a year, $0.315 a query. The second is a managed model hosted in the region, at a 20% premium on C, \( 144{,}000 \times 0.00342 \times 1.20 = \$591 \), plus $3,000 of second-vendor support and integration, $3,591. Self-hosting the segment costs $41,769 more. A constraint on a small segment is usually cheapest to meet with a managed option that offers the right residency, and costliest to meet by building.

The **vendor consolidation strategy** is the reduction of the number of vendors to gain volume discounts and simplify management. Suppose five vendors share $180,000 of spend, and consolidating to two earns 15%, $27,000 a year. Moving three workloads costs \( 3 \times 12{,}040 = \$36{,}120 \), a payback of 16.1 months. Consolidation also concentrates the lock-in of Chapter 19, so it is worth doing to two vendors, and not to one. The **total addressable cost savings** are the ceiling on what a sourcing action can save: the spend it can touch, times the reduction it can achieve. If 60% of the $180,000 is on workloads where a cheaper model meets the quality bar, the addressable spend is $108,000, and a 20% reduction gives $21,600, 12% of total spend. This overlaps with the consolidation saving, since both act on the same spend, and the two should not be added.

### The Risks That Come With the Vendor

The **vendor risk assessment** is the identification of the ways a vendor relationship can cost more than planned, each with a chance per year and an impact, so that the risks can be ranked by expected annual loss and compared with the cost of reducing them. The **vendor due diligence** is the investigation that feeds it, before signing: the vendor's financial stability, security certifications and their evidence, data retention and subprocessors, incident history, and references from similar customers. It takes 30 hours, $2,700, and $3,000 of legal review, $5,700. The most expensive item it examines is a vendor data incident, with a 5% yearly chance and an impact of $120,000 for response and notification, an expected loss of $6,000; Chapter 21 prices such incidents.

Four risks are specific to the sourcing choice. The **community support risk** is the risk that an open-weight model has no vendor obliged to fix its defects, so the organization depends on forums and its own engineers. If 6 issues a year take 20 hours each, the cost is \( 6 \times 20 \times 90 = \$10,800 \). The **model update cadence risk** is the risk that a vendor changes its model often enough to break prompts and shift quality. With 4 updates a year, each needing 20 hours, $1,800, to re-run the evaluation and half needing 12 hours, $1,080, of prompt repair, the cost is \( 4 \times (1{,}800 + 0.5 \times 1{,}080) = \$9{,}360 \) a year.

The **vendor deprecation risk** is the risk that a vendor retires a model the organization depends on, forcing a migration on the vendor's timetable. If there is a 20% yearly chance of a forced move costing the $12,040 of Chapter 19, the expected loss is $2,408 a year. The **long-term contract risk** is the risk of being bound to a vendor that no longer fits. Suppose leaving a locked contract early costs 50% of the remaining fees. Leaving after year 1 of the $35,712 contract means paying half of $23,808, $11,904, and a 25% yearly chance of wanting to leave is $2,976. The **cost predictability assessment** is the measurement of how far a vendor's bills vary from month to month, using the coefficient of variation, the standard deviation divided by the mean. The assistant's usage bills run between $1,150 and $1,310 for eleven months and spike to $2,300 once, a mean of $1,317 and a coefficient of variation of 22.7%, with the peak month 1.75 times the average. A fixed fee has a coefficient of 0, and a budget built on usage pricing needs a reserve for the spike.

The risks together form a register, each with a mitigation, the cost of the mitigation, and the share of the expected loss it removes.

| Risk | Chance a year | Impact | Expected loss | Mitigation | Cost | Share removed |
|------|--------------:|-------:|--------------:|------------|-----:|--------------:|
| Price rise at renewal, 25% on vendor A | 0.40 | $3,720 | $1,488 | Price-cap clause | $600 | 100% |
| Outage beyond the SLA, 4 hours | 0.50 | $6,000 | $3,000 | Failover vendor | $3,000 | 80% |
| Model deprecation | 0.20 | $12,040 | $2,408 | Notice clause and saved evaluation set | $500 | 50% |
| Update regression | 1.00 | $9,360 | $9,360 | Version pinning and pre-upgrade tests | $1,200 | 60% |
| Community support | 1.00 | $10,800 | $10,800 | Paid support contract | $4,800 | 70% |
| Vendor data incident | 0.05 | $120,000 | $6,000 | Redact personal data before sending | $2,400 | 80% |
| Vendor business failure | 0.02 | $60,000 | $1,200 | Escrow and a standby vendor | $3,000 | 50% |
| Early exit from a long contract | 0.25 | $11,904 | $2,976 | Negotiated exit clause | $1,500 | 50% |

The expected losses total $37,232 a year across a portfolio with vendor A and one self-hosted open model. A mitigation is worth buying when the loss it removes is more than it costs. For the price cap that is $1,488 against $600, and for the failover $2,400 against $3,000, which is not.

The third specification lets the learner decide which risks to mitigate.

#### Diagram: Vendor Risk Mitigation Chooser

<details markdown="1">
<summary>Vendor Risk Mitigation Chooser</summary>
Type: microsim
**sim-id:** vendor-risk-mitigation-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight vendor risks, whether to mitigate or accept it, by comparing the expected loss removed with the cost of the mitigation.

**Prerequisites:** vendor risk assessment, expected loss, mitigation (defined in the section "The Risks That Come With the Vendor" above).

**Evidence of Mastery:** For each of eight risks the learner commits Mitigate or Accept before the answer is shown. A choice is correct when it matches the correct choice in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The largest impact should always be mitigated. (2) A risk with a low chance can be ignored. (3) Any mitigation that removes most of a risk is worth buying.

**Instructional Rationale:** Evaluate-level work weighs a cost against a benefit. Risks whose benefit is close to the mitigation cost, one by $12 on the accept side, make the learner compute the comparison.

**Content:**

Expected loss = chance a year × impact. Benefit = expected loss × share removed. Mitigate when the benefit > the mitigation cost, and Accept otherwise.

| # | Risk | Chance a year | Impact | Mitigation cost | Share removed | Benefit | Correct choice | Why (shown as feedback) |
|---|---|---:|---:|---:|---:|---:|---|---|
| 1 | Price rise at renewal | 0.40 | $3,720 | $600 | 100% | $1,488 | Mitigate | The benefit is $888 more than the cost. |
| 2 | Outage beyond the SLA | 0.50 | $6,000 | $3,000 | 80% | $2,400 | Accept | The benefit is $600 less than the cost. |
| 3 | Model deprecation | 0.20 | $12,040 | $500 | 50% | $1,204 | Mitigate | The benefit is $704 more than the cost. |
| 4 | Update regression | 1.00 | $9,360 | $1,200 | 60% | $5,616 | Mitigate | The benefit is $4,416 more than the cost. |
| 5 | Community support | 1.00 | $10,800 | $4,800 | 70% | $7,560 | Mitigate | The benefit is $2,760 more than the cost. |
| 6 | Vendor data incident | 0.05 | $120,000 | $2,400 | 80% | $4,800 | Mitigate | A low chance does not make the risk ignorable: the benefit is $2,400 more than the cost. |
| 7 | Vendor business failure | 0.02 | $60,000 | $3,000 | 50% | $600 | Accept | The benefit is $2,400 less than the cost. |
| 8 | Early exit from a long contract | 0.25 | $11,904 | $1,500 | 50% | $1,488 | Accept | The benefit is $12 less than the cost. |

**Provenance:** All values come from the register in the chapter section "The Risks That Come With the Vendor". The sim must label the data "illustrative".

**Rules:** Benefit = chance × impact × share removed ÷ 100. Mitigate when benefit > cost, and Accept otherwise, including when they are equal. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Chance a year | 0.01 | 1.00 | 0.01 | 0.20 | probability |
| Impact | 1,000 | 120,000 | 1,000 | 12,000 | dollars |
| Mitigation cost | 500 | 5,000 | 100 | 500 | dollars |
| Share removed | 10 | 100 | 10 | 50 | percent |

**Learner Activity:**

1. The learner reads risk 1, chooses Mitigate or Accept, and presses Commit.
2. The sim shows the expected loss, the benefit, the cost, and the "Why" text.
3. After eight risks, exploration unlocks: the learner changes the four quantities and watches the benefit and the choice update.
4. The learner should notice that the choice changes when the benefit passes the cost, and that raising the share removed from 50% to 60% changes risk 8 to Mitigate.

**Feedback:** Eight risks, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the risk counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Risk 1 is shown with no choice made. The question on screen is "Is this mitigation worth its cost?"

**Chapter Anchors:** The chapter states expected losses of $1,488, $3,000, $2,408, $9,360, $10,800, $6,000, $1,200, and $2,976, a total of $37,232, a price-cap benefit of $1,488 against $600, and a failover benefit of $2,400 against $3,000.
</details>

### The Case Study and the Roadmap

The **build vs buy case study** applies the chapter to the assistant over three years, with 720,000, 960,000, and 960,000 queries, 2.64 million in all, and the unit figures of Chapter 19: wrong answers at $0.50, integration $5,400 for the API options and $10,800 for self-hosting, support $3,600 a year for A and $1,200 for C.

| Option | Usage or fixed fees | Support | Integration | Wrong answers | 3-year total |
|--------|--------------------:|--------:|------------:|--------------:|-------------:|
| A, buy | $40,920 | $10,800 | $5,400 | $105,600 | $162,720 |
| C, buy | $9,029 | $3,600 | $5,400 | $145,200 | $163,229 |
| D, build | $136,080 | $0 | $10,800 | $171,600 | $318,480 |

Building costs $155,760 more than buying from A, since three years of fixed server and operations cost, $136,080, fall on a volume that never fills the server, and the model is also less accurate. A and C differ by $509, 0.3%, so cost does not decide between them. The scorecard does: A leads under the balanced weights, 4.40 to 4.00, while C leads when portability carries 30%. The recommendation is to buy from A on a 1-year term, to commit at the floor of observed usage, and to build portability so that C remains a real alternative at renewal.

!!! mascot-warning "Do Not Spend More on the Search Than the Search Can Save"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The full process of a proof of concept, a pilot, and diligence costs $24,633 plus scorecard time, about 16% of this $162,720 decision, to separate options $509 apart. Cap selection effort at about 10% of the contract value, and spend it where the options differ most.

The **sourcing strategy roadmap** is the time-sequenced plan that turns the decision into steps, each with a cost and a gate that must be passed before the next. The assistant's roadmap is as follows.

| Step | Timing | Cost | Gate |
|------|--------|-----:|------|
| Write the criteria and weights, and score the vendors | Weeks 0 to 2 | $900 | Weights agreed by finance and engineering before any quote is read |
| Proof of concept on A and C with the 2,000-ticket gold set | Weeks 2 to 6 | $7,963 | Accuracy at or above the pass mark in the criteria |
| Due diligence and contract review for the leading vendor | Weeks 4 to 8 | $5,700 | No unmitigated risk with an expected loss above its mitigation cost |
| Sign a 1-year term, commit at the floor of observed usage | Week 8 | $0 | Price cap and 12-month deprecation notice in the contract |
| Make prompts vendor-neutral and save the evaluation set | Months 3 to 6 | $2,160 | The switching estimate falls from $12,040 toward $8,800 |
| Re-benchmark A, B, and C at renewal | Months 9 to 10 | within the above | A competitive bid only if annual spend exceeds $23,333 |
| Revisit self-hosting | At each review | $0 | Volume above 2.93 million queries a year, or a residency rule |

The selection steps, the first three, cost $14,563, 9.0% of the $162,720 contract, inside the 10% cap, and the pilot, at $10,970, is skipped because its break-even chance of failure, 26.8%, is above the team's estimate of 20% once the proof of concept has passed. The portability work, $2,160 for 24 hours, is an investment in the switching estimate, not part of the selection cost.

### Summary and Quick Check

Selection starts with weighted criteria and a scorecard whose scores come from evidence, and whose ranking is shown with its sensitivity: A leads at 4.40 to 4.00 under balanced weights and trails at 3.80 to 3.90 when portability carries 30%. The evidence has a price. A proof of concept costs about $7,963, a pilot $10,970, which pays only when the chance of failure times the loss exceeds it, 26.8% at a $41,000 loss, and a competitive bid $8,400, which pays above $23,333 of annual spend. Self-hosting is a fixed cost that beats vendor A at 2.93 million queries a year and never beats vendor C with one server, and a constrained segment is cheaper to serve with an in-region managed model than a self-hosted one by $41,769. Consolidation, addressable savings, and procurement time adjust the picture. Eight risks total $37,232 of expected annual loss, and each is mitigated only when the loss removed exceeds its cost. The case study gives A $162,720 against C $163,229 and D $318,480, and the roadmap spends 9.0% of the contract on selection. Chapter 21 prices the governance, compliance, and security risks that no price sheet shows.

??? note "Quick check: why is a pilot not always worth running? - Click to expand"
    A pilot pays only when the chance of failure times the loss from a failed rollout exceeds its $10,970 cost. At a 20% chance and a $41,000 loss, the expected loss avoided is $8,200, so the pilot costs more than it protects.

??? note "Quick check: why does the same self-hosted server look good against A and bad against C? - Click to expand"
    Its cost per query is $0.00454 when full, which is well below vendor A's $0.0155 and above vendor C's $0.00342. The break-even moves with the managed price it is held against.

??? note "Quick check: why is the early-exit risk accepted although it has an expected loss of $2,976? - Click to expand"
    A negotiated exit clause costs $1,500 and removes 50% of the loss, $1,488. The benefit is $12 below the cost, so the mitigation does not pay.

!!! mascot-celebration "You Can Choose a Vendor and Defend the Choice"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now score vendors on weighted criteria and show the sensitivity, price a pilot, a bid, and a procurement delay, compare self-hosted, managed, and hybrid sourcing, and rank vendor risks by what they would cost. That makes a sourcing decision a documented investment.
