---
title: MLOps Infrastructure and Reuse Economics
description: The cost of the shared platform that runs a portfolio of models, versioning, feature stores, pipelines, registries, and safe release patterns, and the reuse strategies, from caching to pretrained models, that spread that cost and cut it.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 15:03:00
version: 1.11
---

# MLOps Infrastructure and Reuse Economics

## Summary

Covers the MLOps infrastructure — feature stores, model registries, and deployment testing patterns — and reuse strategies that reduce data science cost. This chapter covers 22 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Data Versioning Cost | 34 |
| Feature Store Cost | 33 |
| MLOps Pipeline Cost | 32 |
| Model Registry Cost | 31 |
| Champion-Challenger Testing | 1 |
| Shadow Deployment Cost | 29 |
| Canary Release For Models | 28 |
| Model Lifecycle Management | 27 |
| Model Deprecation Planning | 26 |
| Compute Reuse Across Experiments | 25 |
| Notebook Environment Cost | 1 |
| Data Science Team Utilization | 23 |
| Experiment Reproducibility Cost | 22 |
| Data Science Tooling Cost | 21 |
| DSLC Cost Baseline | 20 |
| DSLC Cost Reduction Roadmap | 19 |
| DSLC ROI Case Study | 6 |
| AutoML Cost Tradeoff | 5 |
| Transfer Learning Cost Savings | 1 |
| Pretrained Model Reuse | 3 |
| Data Science Technical Debt | 2 |
| Cross-Team Model Reuse | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 17: Data and Model Lifecycle Cost Drivers](../17-data-model-lifecycle-cost-drivers/index.md)

---

Chapter 17 priced one model and found that its running phases, monitoring, hosting, and retraining, matter more than its training. A team rarely runs one model. This chapter widens the view to the team's portfolio: four models in production this year, the ticket router of Chapter 17, a priority classifier, a reply summarizer, and an escalation predictor, plus two retired models that are still being hosted. Six data scientists work on them, 2,000 hours each a year, which is 12,000 hours and $1,080,000 at the $90 an hour of Chapter 17. The question is no longer what a phase costs, but which costs can be shared, which can be avoided, and which are waiting to be removed. The figures are illustrative, and they continue Chapter 17's unit costs.

!!! mascot-welcome "A Platform Is a Fixed Cost Looking for a Denominator"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The right question about a tool is how many models share its cost. By the end of this chapter you can compute the break-even for shared infrastructure, choose how much to spend on testing a release, and write a roadmap whose payback finance will believe. Every token counts, and so does every model that shares the bill.

### The Shared Platform

The **data versioning cost** is the cost of storing, tracking, and managing immutable versions of datasets, so that any model can be tied to the exact data it learned from. Storing the changes between versions instead of full copies keeps storage small: across the portfolio, tooling and storage cost $2,640 a year ($2,400 and $240), and 2 hours a month of administration adds \( 2 \times 12 \times 90 = \$2{,}160 \), for $4,800 a year, $1,200 per model. Storage is the small part. The cost buys the ability to retrain on the same data, and to answer a regulator's question about it.

The **feature store cost** is the cost of the shared system that computes, stores, and serves the model inputs, called features, so that many models use one definition of each. Suppose each model needs the same 10 features. Building and maintaining one feature costs 20 hours, \( 20 \times 90 = \$1{,}800 \). Without a store, all four models build their own copies: \( 4 \times 10 \times 1{,}800 = \$72{,}000 \). With a store, each feature is built once, and each of the three further models that reuse it spends 4 hours, $360, connecting to it: \( 10 \times (1{,}800 + 3 \times 360) = \$28{,}800 \). The platform costs $12,000 a year and $10,800 to set up, so year 1 is \( 28{,}800 + 12{,}000 + 10{,}800 = \$51{,}600 \), a saving of $20,400. From year 2 on the saving is $31,200 a year, the $72,000 against $28,800 plus $12,000.

The saving depends on sharing. With one model the store costs \( 22{,}800 + 18{,}000 = \$40{,}800 \) against $18,000 without it, a loss of $22,800, and with two it is still a loss of $8,400. At three models the store saves $6,000. The break-even is three models, and it moves with the number of features and the platform fee.

!!! mascot-thinking "Shared Cost Falls Only When Something Is Shared"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the store's cost is nearly the same for one model as for four, while the cost it replaces grows with every model. The question to ask before buying any platform is how many models will use it in its first year, not how good it is.

The first specification lets the learner find that break-even.

#### Diagram: Feature Store Break-Even Calculator

<details markdown="1">
<summary>Feature Store Break-Even Calculator</summary>
Type: microsim
**sim-id:** feature-store-break-even-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the year 1 cost with and without a feature store for 1, 2, 3, and 4 models, and the smallest number of models for which the store saves money, to within $1.

**Prerequisites:** feature store cost, feature, year 1 saving (defined in the section "The Shared Platform" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within $1 of the model value. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A feature store saves money for any team that adopts it. (2) The store's cost grows with the number of models as fast as the cost it replaces. (3) The break-even depends only on the platform fee.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Pricing the same platform at several model counts shows a fixed cost being spread, and the negative savings at one and two models make the break-even visible.

**Content:**

Fixed inputs: 10 features; building a feature costs $1,800; each further model that reuses a stored feature costs $360; the platform costs $12,000 a year; setup costs $10,800.

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Year 1 cost without a store, 4 models | $72,000 | 4 × 10 × 1,800 = 72,000. |
| 2 | Feature work with a store, 4 models | $28,800 | 10 × (1,800 + 3 × 360) = 28,800. |
| 3 | Year 1 cost with a store, 4 models | $51,600 | 28,800 + 12,000 + 10,800 = 51,600. |
| 4 | Year 1 saving, 4 models | $20,400 | 72,000 − 51,600 = 20,400. |
| 5 | Year 1 cost without a store, 1 model | $18,000 | 1 × 10 × 1,800 = 18,000. |
| 6 | Year 1 cost with a store, 1 model | $40,800 | 10 × 1,800 + 12,000 + 10,800 = 40,800. |
| 7 | Year 1 saving, 2 models | −$8,400 | Without: 36,000. With: 10 × (1,800 + 360) + 22,800 = 44,400. The saving is 36,000 − 44,400 = −8,400. |
| 8 | Smallest number of models with a positive year 1 saving | 3 models | At 3 models: without 54,000, with 48,000, saving 6,000. At 2 models the saving is negative. |

**Provenance:** All values come from the chapter section "The Shared Platform". The sim must label the data "illustrative".

**Rules:** Without a store = features × 1,800 × models. With a store = 12 × monthly platform fee + 10,800 + features × (1,800 + 360 × (models − 1)). Saving = without − with, and may be negative. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Models | 1 | 6 | 1 | 4 | models |
| Features | 5 | 20 | 5 | 10 | features |
| Monthly platform fee | 500 | 2,000 | 500 | 1,000 | dollars |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the models, features, and platform fee and watches the two costs, the saving, and the smallest number of models with a positive saving update.
4. The learner should notice that with 5 features and 4 models the saving is negative, at −$1,200.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What do four models spend building their own copies of 10 features?"

**Chapter Anchors:** The chapter states $72,000 without a store and $28,800 of feature work with one for 4 models, a year 1 cost of $51,600, a saving of $20,400, a loss of $22,800 at one model, a loss of $8,400 at two, a saving of $6,000 at three, and a break-even of three models.
</details>

The **MLOps pipeline cost** is the cost of building and running automated workflows that take a model from new data through training, testing, and deployment without hand-built steps. In Chapter 17 a retraining cost $3,630, of which 12 hours of evaluation and 8 hours of redeployment, 20 hours in all, were manual. A pipeline brings that to 6 hours, saving 14 hours, $1,260, per retraining. The portfolio retrains 12 times a year, a saving of $15,120. Building the pipeline takes 160 hours, $14,400, and keeping it running takes 4 hours a month, $4,320 a year, so the net saving is \( 15{,}120 - 4{,}320 = \$10{,}800 \) a year and the payback is 16 months. In year 1 it is a net cost of $3,600, which is why it is justified by the run of years, not the first.

The **model registry cost** is the cost of the catalog that records each model version, its data, metrics, owner, and stage, and controls which version is in production. A registry costs $1,800 a year, plus 24 hours of setup, $2,160. Its value is avoided confusion: one wrong-version incident a year, taking 30 hours to untangle, costs $2,700, more than the registry.

### Releasing a Model Safely

A new model version is a change, and Chapter 16 priced the cost of a change failing. Three terms organize the practice. **Champion-challenger testing** is the comparison of the model currently in production, the champion, with a candidate replacement, the challenger, on the same live inputs, with a rule for when the challenger takes over. The comparison itself has a cost: labeling a sample of 350 tickets, \( 350 \times 1.5 \div 60 \times 45 = \$393.75 \), and 6 hours of analysis, $540, about $934.

There are two ways to run the challenger. In a **shadow deployment** the challenger receives a copy of every request and its answers are recorded and compared but never shown to users. The **shadow deployment cost** is the comparison cost plus running a second copy of the model, here $400 for a month, so $1,334, and no ticket is ever misrouted by the challenger. In a **canary release for models** the challenger serves a small share of live traffic, 5% here, and the share is widened if it performs. It costs the comparison plus 8 hours to build the traffic split, $720, so $1,654, and it exposes 5% of tickets to the challenger's mistakes.

To compare them with releasing directly, price the loss. Suppose a challenger is worse by 5 points with probability 0.2. Over a month that would cost \( 10{,}000 \times 0.05 \times 6 = \$3{,}000 \) at full traffic. Released directly, the expected loss is \( 0.2 \times 3{,}000 = \$600 \). Under a canary the expected loss is \( 0.2 \times 0.05 \times 3{,}000 = \$30 \), so the total is \( 1{,}654 + 30 = \$1{,}684 \). The shadow total is $1,334. For the router, with a $6 misroute, the cheapest choice is the direct release at $600, because testing costs more than the harm it prevents. For a model whose mistakes cost $60, direct release has an expected loss of $6,000, a canary $1,954, and a shadow deployment $1,334, so the shadow wins. Shadow requires that the challenger's outputs can be suppressed, which is not true if it sends emails or changes records; then the choice is the canary.

!!! mascot-tip "Price the Test Against the Loss It Prevents"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Multiply the chance that the challenger is worse by the monthly loss if it were, and compare the product with the test's cost. If the loss is smaller, release directly and watch the monitoring.

The second specification lets the learner choose a release pattern.

#### Diagram: Release Testing Pattern Selector

<details markdown="1">
<summary>Release Testing Pattern Selector</summary>
Type: microsim
**sim-id:** release-testing-pattern-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of eight model releases, the direct release, shadow deployment, or canary release with the lowest expected total cost.

**Prerequisites:** champion-challenger testing, shadow deployment cost, canary release for models, expected loss (defined in the section "Releasing a Model Safely" above).

**Evidence of Mastery:** For each of eight releases the learner commits one pattern before the answer is shown. A pattern is correct when it has the lowest expected total cost among the feasible patterns in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Every model release should be tested before it is released. (2) A canary is always safer and therefore better than a shadow deployment. (3) The test should be chosen by how good the model looks, not by what an error costs.

**Instructional Rationale:** Evaluate-level work judges options against a criterion. Putting one release at each side of the break-even, and removing the shadow option when outputs cannot be suppressed, makes the learner compare totals instead of defaulting to the most careful pattern.

**Content:**

Fixed inputs: a challenger that is worse is worse by 5 accuracy points. The monthly loss if it is worse, at full traffic, is L = tickets per month × 0.05 × cost per misrouted ticket. Direct release costs nothing to test. Shadow deployment costs $1,334 and is possible only when the challenger's outputs can be suppressed. Canary release costs $1,654 and exposes 5% of traffic.

| # | Tickets per month | Cost per misroute | Chance the challenger is worse | Outputs can be suppressed | Expected total cost: direct; shadow; canary | Lowest | Why (shown as feedback) |
|---|---:|---:|---:|---|---|---|---|
| 1 | 10,000 | $6 | 0.2 | Yes | $600; $1,334; $1,684 | Direct | A bad challenger costs little, so any test costs more than the harm it prevents. |
| 2 | 10,000 | $60 | 0.2 | Yes | $6,000; $1,334; $1,954 | Shadow | Costly errors justify a test, and shadow exposes no tickets. |
| 3 | 10,000 | $60 | 0.2 | No | $6,000; not possible; $1,954 | Canary | Shadow is not possible, and canary limits exposure to 5% of traffic. |
| 4 | 10,000 | $6 | 0.2 | No | $600; not possible; $1,684 | Direct | Without shadow, canary still costs more than the $600 expected loss. |
| 5 | 50,000 | $6 | 0.1 | Yes | $1,500; $1,334; $1,729 | Shadow | High volume makes the expected loss $1,500, which is $166 more than shadow. |
| 6 | 5,000 | $24 | 0.3 | No | $1,800; not possible; $1,744 | Canary | A 0.3 chance of a bad challenger makes canary $56 cheaper than direct. |
| 7 | 2,500 | $12 | 0.2 | Yes | $300; $1,334; $1,669 | Direct | Low volume keeps the expected loss at $300. |
| 8 | 20,000 | $30 | 0.1 | Yes | $3,000; $1,334; $1,804 | Shadow | The $3,000 expected loss exceeds the $1,334 shadow cost. |

**Provenance:** Item 1 and the costs of the patterns come from the chapter section "Releasing a Model Safely". Items 2 to 8 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Direct = chance × L. Shadow = 1,334 when outputs can be suppressed, and not available otherwise. Canary = 1,654 + chance × 0.05 × L. The lowest feasible total is correct, and no item has a tie. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tickets per month | 2,500 | 50,000 | 2,500 | 10,000 | tickets |
| Cost per misrouted ticket | 6 | 60 | 6 | 6 | dollars |
| Chance the challenger is worse | 0.1 | 0.5 | 0.1 | 0.2 | probability |
| Outputs can be suppressed | No | Yes | one choice | Yes | choice |

**Learner Activity:**

1. The learner reads release 1 and its inputs, chooses direct release, shadow deployment, or canary release, and presses Commit.
2. The sim shows the totals for each feasible pattern, marks the lowest, and shows the "Why" text.
3. After eight releases, exploration unlocks: the learner changes the four quantities and watches the totals and the lowest pattern update.
4. The learner should notice that raising the cost per misroute from $6 to $60 moves the lowest pattern away from direct release.

**Feedback:** Eight releases, fixed order, two attempts each. Correct: "Correct: <pattern> at <total>." Incorrect on the first attempt: the "Why" text without the pattern. After a second wrong attempt the pattern is shown and the release counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Release 1 is shown with its inputs and no pattern chosen. The question on screen is "Which release pattern has the lowest expected total cost?"

**Chapter Anchors:** The chapter states a comparison cost of about $934, a shadow total of $1,334, a canary total of $1,654, a monthly loss of $3,000 for the router, an expected loss of $600 for direct release, a canary total of $1,684, and totals of $6,000, $1,954, and $1,334 for a $60 misroute.
</details>

### Managing a Model Through Its Life

The **model lifecycle management** is the practice of governing each model through defined stages, development, validation, deployment, monitoring, and retirement, with a named owner, a version history, and criteria for moving between stages. It is the organizational counterpart of the registry. If each model gets 4 hours of review a quarter, the portfolio spends \( 4 \times 4 \times 4 \times 90 = \$5{,}760 \) a year. What that spending prevents is a model that outlives its use.

The **model deprecation planning** is the planning of a model's retirement: announcing a date, moving the systems that call it to a replacement, archiving the artifacts and data version, and switching off its hosting. The portfolio has two retired models still hosted at $4,800 a year each, $9,600. Retiring one takes 20 hours to plan, archive, and shut down, $1,800, and 24 hours for three calling systems to migrate, $2,160, a total of $3,960. The payback is \( 3{,}960 \div 4{,}800 \times 12 = 9.9 \) months, and for the two models the one-time cost is $7,920 against $9,600 a year. An unused model is also an unmonitored model that still holds data, a risk Chapter 21 prices.

### The Everyday Costs

Four costs sit in every team's day and rarely in any business case. The **notebook environment cost** is the cost of the interactive servers on which data scientists explore data and run experiments, which are often left running while idle. Six servers at $1.00 an hour, always on, cost \( 6 \times 720 = \$4{,}320 \) a month, $51,840 a year, and each is used 216 of the 720 hours. Stopping a server after 30 idle minutes leaves 216 hours plus 20 sessions of half an hour, 226 hours each, $1,356 a month for all six, $16,272 a year. The saving is $35,568 a year for 20 hours of setup, $1,800.

The **compute reuse across experiments** is the saving of caching intermediate results, such as tokenized data and computed embeddings, so that experiments that need them do not compute them again. If each of 300 experiments a year repeats 2 GPU-hours of preprocessing at $4.00 an hour, the cost is \( 300 \times 8 = \$2{,}400 \). Computed once per data version, 12 times a year, plus $240 of storage, it is \( 96 + 240 = \$336 \). The saving is $2,064 for 30 hours of setup, $2,700, a payback of 15.7 months. A cached result must be keyed to its data version and code version, or it will be reused after it has gone stale.

The **experiment reproducibility cost** is the cost of recreating a past result from its recorded data, code, environment, and settings, including the cost of failing to. Chapter 17 priced it: 4 reconstructions a year at 24 hours each, $8,640, falling to 2 hours each, $720, with tracking and a pinned environment. The **data science team utilization** is the share of paid hours spent on project work that advances a product. At 55% the team spends 6,600 of its 12,000 hours there, and each point of utilization is 120 hours, $10,800. Time lost to idle waiting, rebuilding features, and manual releases is the reservoir that the platform draws from.

The **data science tooling cost** is the recurring cost of the platforms and services the team uses, which should be read as one figure for the portfolio and not tool by tool.

| Tool | Annual cost | Chapter section |
|------|------------:|-----------------|
| Notebook servers, with auto-stop | $16,272 | The Everyday Costs |
| Feature store platform | $12,000 | The Shared Platform |
| Data versioning, with administration | $4,800 | The Shared Platform |
| MLOps pipeline upkeep | $4,320 | The Shared Platform |
| Experiment tracking | $3,600 | Chapter 17 |
| Model registry | $1,800 | The Shared Platform |
| **Total** | **$42,792** | |

The total is $10,698 per model and 4.0% of the team's $1,080,000. The test of the whole table is whether it frees more than 4% of the team's time, which the case study below checks.

The **data science technical debt** is the future cost created by shortcuts taken to deliver a model sooner, such as logic in notebooks, undocumented pipelines, and hard-coded paths, which makes every later change slower. Like financial debt it has a principal, the cost of fixing it, and interest, the extra cost paid each time until it is fixed. If undocumented steps add 8 hours, $720, to each of 12 retrainings, the interest is $8,640 a year. A clean-up of 160 hours, $14,400, repays it in 20 months, an annual interest rate of 60% on the principal. The interest is what makes debt expensive, and it is not in the original estimate.

### Reuse: Buying Less Than You Build

Every model built from nothing pays for data, labeling, and training. Reuse trades that cost against fit. The **AutoML cost tradeoff** compares an automated search over model types and settings with a person doing the same search. An AutoML run on 8 GPUs for 12 hours costs \( 8 \times 12 \times 4 = \$384 \), and the license is $1,200, so $1,584, against 40 hours, $3,600, by hand: a saving of $2,016 once. If it lands one accuracy point lower than a hand-tuned model, then at 10,000 tickets a month, with a point worth $7,200 a year, it loses $5,184 net in year 1 (the $7,200 against the $2,016 saved), and it pays only below about 2,800 tickets a month.

The **transfer learning cost savings** are the labeled data and compute avoided by starting from a model already trained on broad data and adapting it, instead of training from scratch. Suppose from-scratch training would need 10 times the labels, 200,000 against 20,000. The 180,000 extra labels cost \( 180{,}000 \times 0.4374 = \$78{,}732 \) even with AI-assisted labeling, before any compute. The multiple of 10 is illustrative, and a learning curve, accuracy against the number of labels, measures it for a real task.

The **pretrained model reuse** is the use of an existing trained model as it is, through a prompt and an API, with no training at all. Take the router with a prompt only. The costs are 40 hours of prompt design, $3,600, the evaluation set $4,500, validation $3,600, integration $5,400, tokens \( 120{,}000 \times 0.0024 = \$288 \), and monitoring $11,580, a total of $28,968, against $68,498 for the fine-tuned path of Chapter 17. Suppose prompting reaches 88% and the fine-tuned model 91%. The 3-point gap is worth \( 3 \times 7{,}200 = \$21{,}600 \) a year, so the prompt route costs \( 28{,}968 + 21{,}600 = \$50{,}568 \) in year 1, $17,930 less. The fine-tune needs to beat the prompt by \( (68{,}498 - 28{,}968) \div 7{,}200 = 5.49 \) points to win in year 1. After two years the prompt route is still $15,332 cheaper in this case, as the fine-tuned model's lower running cost recovers only part of the difference.

!!! mascot-warning "Benchmark the No-Training Baseline First"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Teams often fine-tune before measuring how far a prompt gets, and the fine-tune then needs a gap it may not have. Run the prompt on your gold set first, and compare the gap to the break-even before you label a single ticket.

The third specification lets the learner judge the choice.

#### Diagram: Fine-Tune or Reuse Judge

<details markdown="1">
<summary>Fine-Tune or Reuse Judge</summary>
Type: microsim
**sim-id:** fine-tune-or-reuse-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight cases, whether a fine-tuned model or a pretrained model used through a prompt has the lower year 1 total cost.

**Prerequisites:** pretrained model reuse, accuracy point, year 1 cost, break-even gap (defined in the section "Reuse: Buying Less Than You Build" above).

**Evidence of Mastery:** For each of eight cases the learner commits Fine-tune or Use pretrained before the answer is shown. A choice is correct when it matches the lower year 1 total in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A fine-tuned model is always more accurate enough to be worth it. (2) A larger accuracy gap always favors fine-tuning whatever the volume. (3) Token cost makes the prompt route expensive at high volume.

**Instructional Rationale:** Evaluate-level work weighs two options against a criterion. Cases built around the break-even gap, including one that clears it by $70, make the learner compare dollars instead of accuracy alone.

**Content:**

Fixed inputs: the fine-tuned path costs $68,498 in year 1 whatever the volume. The prompt path costs 28,680 + 0.0288 × tickets per month, which is $28,968 at 10,000 tickets. A point of accuracy is worth tickets per month × 0.01 × cost per misroute × 12 dollars a year. The gap is the number of accuracy points by which the fine-tuned model beats the prompt. The fine-tuned path wins when gap × value of a point > 68,498 − the prompt path cost.

| # | Tickets per month | Cost per misroute | Gap (points) | Value of the gap; fine-tune advantage over the prompt path's cost | Lower year 1 total | Why (shown as feedback) |
|---|---:|---:|---:|---|---|---|
| 1 | 10,000 | $6 | 3.0 | $21,600 against $39,530 | Use pretrained | The gap is worth $17,930 less than the extra cost of fine-tuning. |
| 2 | 10,000 | $6 | 6.0 | $43,200 against $39,530 | Fine-tune | The gap is worth $3,670 more than the extra cost. |
| 3 | 10,000 | $6 | 5.5 | $39,600 against $39,530 | Fine-tune | The gap is worth $70 more than the extra cost, so fine-tuning wins narrowly. |
| 4 | 10,000 | $6 | 5.0 | $36,000 against $39,530 | Use pretrained | The gap is worth $3,530 less than the extra cost. |
| 5 | 2,500 | $6 | 8.0 | $14,400 against $39,746 | Use pretrained | At low volume a point is worth only $1,800 a year, so even 8 points do not pay. |
| 6 | 40,000 | $6 | 3.0 | $86,400 against $38,666 | Fine-tune | At high volume a point is worth $28,800 a year, so 3 points pay easily. |
| 7 | 10,000 | $1.50 | 6.0 | $10,800 against $39,530 | Use pretrained | Cheap errors make a point worth $1,800 a year. |
| 8 | 20,000 | $12 | 2.0 | $57,600 against $39,242 | Fine-tune | Costly errors at volume make a point worth $28,800 a year. |

**Provenance:** Items 1 to 4 use the figures in the chapter section "Reuse: Buying Less Than You Build" and Chapter 17. Items 5 to 8 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Prompt path cost = 28,680 + 0.0288 × tickets per month. Value of a point = tickets per month × 0.01 × cost per misroute × 12. Fine-tune wins when gap × value of a point > 68,498 − prompt path cost, and the prompt path wins otherwise, including when the two are equal. Break-even gap = (68,498 − prompt path cost) ÷ value of a point. Dollars are shown to the whole dollar and the break-even gap to two decimals. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tickets per month | 2,500 | 40,000 | 2,500 | 10,000 | tickets |
| Cost per misrouted ticket | 1.50 | 12.00 | 1.50 | 6.00 | dollars |
| Gap | 0.0 | 10.0 | 0.5 | 3.0 | points |

**Learner Activity:**

1. The learner reads case 1, chooses Fine-tune or Use pretrained, and presses Commit.
2. The sim shows both totals, the break-even gap, and the "Why" text.
3. After eight cases, exploration unlocks: the learner changes the volume, cost, and gap and watches the totals and the break-even gap update.
4. The learner should notice that at 10,000 tickets and $6 the break-even gap is 5.49 points, and that it falls as volume rises.

**Feedback:** Eight cases, fixed order, two attempts each. Correct: "Correct: <choice>." Incorrect on the first attempt: the "Why" text without the choice. After a second wrong attempt the choice is shown and the case counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Case 1 is shown with its inputs and no choice made. The question on screen is "Which path has the lower year 1 total cost?"

**Chapter Anchors:** The chapter states $28,968 for the prompt path at 10,000 tickets, $68,498 for the fine-tuned path, a point worth $7,200 a year, a 3-point gap giving $50,568 for the prompt path and $17,930 less, a break-even gap of 5.49 points, and a prompt route $15,332 cheaper after two years.
</details>

The last reuse idea moves a model between teams. The **cross-team model reuse** is the adaptation of a model one team built to serve another team's similar task, instead of building again. A second team with its own tickets labels 2,000 of them with AI assistance, \( 2{,}000 \times 0.4374 = \$875 \), spends 20 hours adapting the model, $1,800, builds its own evaluation set, $4,500, validates it, $3,600, and integrates it in 30 hours, $2,700. The total is $13,475 against $37,628 for a new build with the assisted methods of Chapter 17, a saving of $24,153, 64%. The costs that remain are ownership: someone must own the shared model, and a change made for one team must be tested against both.

### Baseline, Roadmap, and Case Study

The **DSLC cost baseline** is the recorded annual cost of the data science lifecycle before any of the improvements, split by cause, the data science version of the baselines of Chapters 12 and 16. The portfolio's baseline is as follows.

| Baseline cost | Annual amount |
|---------------|--------------:|
| Notebook servers, always on | $51,840 |
| Feature building and upkeep, 40 copies at $1,800 | $72,000 |
| Retraining operations, 12 at $3,630 | $43,560 |
| Monitoring, 4 models at $11,580 | $46,320 |
| Hosting of live models, 4 at $4,800 | $19,200 |
| Hosting of retired models, 2 at $4,800 | $9,600 |
| Reconstructing past results | $8,640 |
| Experiment preprocessing compute | $2,400 |
| **Baseline total** | **$253,560** |

The **DSLC cost reduction roadmap** is the prioritized, time-sequenced plan of initiatives to lower that baseline, each with a one-time cost, a net annual saving after its own running costs, and a payback, ordered so the earliest returns fund the later work. The six initiatives of this chapter, in payback order, are these.

| Initiative | One-time cost | Net annual saving | Payback (months) | Saving type |
|------------|--------------:|------------------:|-----------------:|-------------|
| Notebook auto-stop | $1,800 | $35,568 | 0.6 | Cash |
| Feature store | $10,800 | $31,200 | 4.2 | Time |
| Experiment tracking | $1,800 | $4,320 | 5.0 | Time |
| Model deprecation, two models | $7,920 | $9,600 | 9.9 | Cash |
| Compute reuse | $2,700 | $2,064 | 15.7 | Cash |
| MLOps pipeline | $14,400 | $10,800 | 16.0 | Time |

The feature store's saving is $43,200 of feature work less its $12,000 fee, tracking's is $7,920 less $3,600, and the pipeline's is $15,120 less $4,320. The one-time costs total $39,420 and the net annual savings $93,552, which is 36.9% of the baseline. The time savings are 736 hours, 480 for features, 88 for reconstruction, and 168 for releases, worth $66,240 gross and $46,320 after the platform costs of $19,920. They raise utilization by \( 736 \div 12{,}000 = 6.1 \) points, from 55% to 61.1%, if every hour is put to project work.

The **DSLC ROI case study** assembles the roadmap into a year 1 return. The cash savings, $47,232, are real whatever the team does. The time savings, $46,320, become value only to the extent that the hours are spent on funded work, the realization of Chapter 16.

| Realization of time savings | Benefit | Net after $39,420 | ROI |
|----------------------------:|--------:|------------------:|----:|
| 0% | $47,232 | $7,812 | 19.8% |
| 25% | $58,812 | $19,392 | 49.2% |
| 50% | $70,392 | $30,972 | 78.6% |
| 100% | $93,552 | $54,132 | 137.3% |

The return is positive even at 0% realization because the cash savings alone, $47,232, exceed the one-time costs. That is a stronger case than Chapter 16's, where the same arithmetic needed 26.4% realization to break even, and it comes from removing waste that was paid for in cash. The ordering is the lesson: fund the cash savings first, since they need no management decision, and fund the time savings behind a plan for the hours.

!!! mascot-warning "Do Not Add Chapter 17's Savings a Second Time"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The router's $10,890 of retraining and $11,580 of monitoring are already inside this baseline, and so is the $8,640 of reconstruction that tracking reduces. Use the portfolio figures or the per-model figures of Chapter 17 in one case, never both, and say which.

### Summary and Quick Check

A portfolio changes the arithmetic of Chapter 17, because shared costs fall as models share them. Data versioning, a feature store, a pipeline, and a registry are fixed costs: the store costs $51,600 in year 1 against $72,000 and breaks even at three models, and the pipeline pays back in 16 months. A release can be tested as champion against challenger, in shadow with no user exposed, or as a canary with 5%, and the right amount of testing is set by the loss an error causes, so the router should release directly at $600 expected loss. Model lifecycle management and deprecation planning stop unused models from costing $4,800 a year each. Notebooks, caching, reproducibility, utilization, and tooling are everyday costs worth $35,568 and more. Reuse, in the forms of AutoML, transfer learning, pretrained models, and cross-team models, can avoid a build, and a pretrained model that is 3 points less accurate beats the fine-tuned router by $17,930 in year 1. The baseline of $253,560 and a six-initiative roadmap give a year 1 ROI between 19.8% and 137.3%, positive even if no time is converted. Chapter 19 turns to what the vendors behind these choices charge.

??? note "Quick check: why does a feature store lose money for one or two models? - Click to expand"
    Its cost is mostly fixed, $22,800 in year 1 for the platform and setup, while the cost it replaces grows with each model. At one model the store costs $40,800 against $18,000, and it first saves money at three models.

??? note "Quick check: why is releasing the router directly cheaper than a canary? - Click to expand"
    A bad challenger would cost $3,000 a month at full traffic, so with a 0.2 chance the expected loss is $600. The canary's total of $1,684 is higher, because it costs more than the loss it prevents.

??? note "Quick check: why is the ROI of the roadmap positive at 0% realization? - Click to expand"
    The cash savings, notebook servers, retired-model hosting, and caching, total $47,232, which exceeds the $39,420 of one-time costs. The time savings add to the return only as the hours are spent on funded work.

!!! mascot-celebration "You Can Fund a Platform and Defend Its Break-Even"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now price the shared infrastructure of a model portfolio, choose a release pattern from the loss it prevents, judge whether to build or reuse, and show a roadmap whose return does not depend on one assumption. That is how a platform becomes a budget line.
