---
title: Data and Model Lifecycle Cost Drivers
description: The cost of each phase of the data science lifecycle, from data collection and labeling through training, evaluation, deployment, monitoring, drift detection, and retraining, and how generative AI changes each one.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 14:55:00
version: 1.11
---

# Data and Model Lifecycle Cost Drivers

## Summary

Follows generative AI's cost impact through the data science lifecycle, from data collection and labeling through model training, evaluation, and drift detection. This chapter covers 23 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Data Science Lifecycle | 57 |
| Data Collection Cost | 56 |
| Data Labeling Cost | 55 |
| AI-Assisted Data Labeling | 1 |
| Data Cleaning Cost | 53 |
| Feature Engineering Cost | 52 |
| AI-Assisted Feature Engineering | 51 |
| Model Training Cost | 50 |
| Hyperparameter Tuning Cost | 49 |
| Experiment Tracking Cost | 48 |
| Model Evaluation Cost | 47 |
| Model Validation Cost | 46 |
| Model Deployment Cost | 45 |
| Model Monitoring Cost | 44 |
| Model Retraining Trigger | 43 |
| Model Drift Detection | 42 |
| Data Drift Detection | 41 |
| Retraining Cadence Tuning | 40 |
| Synthetic Data Generation | 39 |
| Synthetic Data Cost Tradeoff | 38 |
| Active Learning Cost Reduction | 1 |
| Data Annotation Quality Control | 36 |
| Annotation Vendor Management | 35 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)

---

Chapters 15 and 16 priced the software lifecycle. Data science has a lifecycle of its own, with a different shape: far less of the money goes to computers, and far more to people preparing data and to keeping a model correct after it ships. This chapter follows one model from the first data export to its third retraining. The support organization of Chapter 9, with 120,000 tickets a year, wants a model that reads each incoming ticket and routes it to one of 12 queues. The team fine-tunes an 8-billion-parameter model of the size used in Chapter 6. The unit costs are: a data scientist at $90 an hour fully loaded, a ticket reviewer at $45 an hour, a GPU at $4.00 an hour, and tokens at $3 per million input and $15 per million output. About 10,000 tickets arrive a month, and a misrouted ticket costs $6 to reassign. Every figure is illustrative.

!!! mascot-welcome "Find the Money Before You Spend It"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Most teams budget for the GPU and are surprised by everything else. By the end of this chapter you can price every phase of a model's life, cut the biggest line with a measured method, and set a retraining schedule you can defend. Every token counts, and so does every label.

### The Lifecycle and Its Phases

The **data science lifecycle** is the sequence of phases a model passes through from the framing of the problem to its operation and renewal in production: data collection, cleaning, labeling, feature engineering, training, evaluation, validation, deployment, monitoring, and retraining. It is drawn as a loop, not a line, because monitoring produces the evidence that sends the team back to collect, label, and train again. A cost model that stops at deployment prices only the first lap.

Each phase has a different dominant cost. Early phases are mostly people reading and preparing records. Training is the only phase dominated by computers, and for a fine-tuned model it is small. The late phases are recurring: they are paid every month for as long as the model lives. The sections that follow take the phases in order and price each for the ticket-routing model.

### Preparing the Data

The **data collection cost** is the cost of finding, extracting, transferring, and storing the raw records the model will learn from, including the engineering time to build the export and any access approvals. The team exports 60,000 historical tickets. The engineering takes 40 hours, \( 40 \times 90 = \$3{,}600 \), and storage and transfer add $400, so collection costs $4,000. If the records were not already in a warehouse, as in Chapter 13, the cost would be many times higher.

The **data cleaning cost** is the cost of removing or repairing records that would mislead the model: duplicates, empty tickets, spam, and test entries. Here 18% of the 60,000 records are rejected, leaving 49,200 usable, and the work takes 50 hours, $4,500, about $0.09 per usable record. Cleaning is rarely glamorous and rarely skipped by teams that have been burned, since a model learns the duplicates as faithfully as the signal.

The **data labeling cost** is the cost of attaching the correct answer to each training example, here the correct queue for a ticket, by human reviewers following written guidelines. The model needs 20,000 labeled tickets. A reviewer takes 1.5 minutes per ticket, so each label costs \( 1.5 \div 60 \times 45 = \$1.125 \) and the set costs \( 20{,}000 \times 1.125 = \$22{,}500 \). It is the largest single line of the build, larger than collection, cleaning, and training combined, and the main target for savings.

**AI-assisted data labeling** uses a language model to propose the label, which a reviewer then confirms or corrects. The model reads about 700 tokens and writes about 20 per ticket, costing \( 700 \times 3 \div 10^6 + 20 \times 15 \div 10^6 = \$0.0024 \), or $48 for 20,000 tickets. Suppose the model is right 88% of the time. A reviewer takes 0.4 minutes to check a proposal, \( 0.4 \div 60 \times 45 = \$0.30 \), and the 12% that are wrong take the full 1.5 minutes to fix, \( 0.12 \times 1.125 = \$0.135 \). The cost per label is \( 0.0024 + 0.30 + 0.135 = \$0.4374 \) and the set costs $8,748, a saving of $13,752, or 61%.

!!! mascot-warning "A Reviewer Who Agrees Too Easily Hides the Errors"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    People shown a proposed label tend to accept it, so the labeling saving can turn into hidden label noise. Keep a sample of tickets labeled blind, with no proposal shown, and compare, which is the quality control described below.

Two more methods reduce the number of labels needed rather than the price of each. **Active learning cost reduction** is the practice of labeling only the examples a partly trained model is least sure about, so that fewer labels reach the same accuracy. Suppose 12,000 well-chosen tickets do the work of 20,000 random ones. At the manual price that is \( 12{,}000 \times 1.125 = \$13{,}500 \), plus $580 for scoring the unlabeled tickets, $40 of compute and 6 hours of engineering, a total of $14,080 against $22,500, a saving of $8,420. The 12,000 is a result to be measured, not assumed, and it is only found by training on both sets and comparing.

**Data annotation quality control** is the set of checks that measure whether labels are correct and consistent: a written guideline, a sample labeled by two people, a gold set of known answers, and a process for resolving disagreement. Suppose 2,000 tickets, 10% of the set, are labeled twice, costing \( 2{,}000 \times 1.125 = \$2{,}250 \), and the 15% on which the two disagree, 300 tickets, are settled in 3 minutes each, \( 300 \times 3 \div 60 \times 45 = \$675 \). The control costs $2,925, 13% of the labeling cost. Agreement is summarized by Cohen's kappa, the agreement beyond what chance would produce:

\[ \kappa = \frac{p_o - p_e}{1 - p_e} \]

where \( p_o \) is the observed agreement and \( p_e \) the agreement expected by chance. With 170 of 200 tickets agreed, \( p_o = 0.85 \), and with \( p_e = 0.20 \) from the label frequencies, \( \kappa = 0.65 \div 0.80 = 0.8125 \). What the control saves is harder to see but real: if 8% noisy labels cost the model two points of accuracy, then at $600 per point-month, derived in the cadence section below, the loss is \( 2 \times 600 \times 12 = \$14{,}400 \) a year, about five times the cost of the control.

The **annotation vendor management** is the work of selecting, briefing, auditing, and correcting an outside labeling provider, which is a cost on top of the vendor's per-label price. A vendor quotes $0.60 a label, $12,000 for 20,000, against $1.125 in house. Add 40 hours of guidelines and a pilot, $3,600; 12 weeks of 3-hour audits, $3,240; and in-house relabeling of the 5% of tickets that fail audit, 1,000 tickets at $1.125, $1,125. The all-in cost is $19,965, or $0.998 a label. The vendor saves 11%, not the 47% the quote suggests, and the saving disappears if audits are skipped and the failures reach training.

The last data source is manufactured. **Synthetic data generation** is the use of a model to write artificial training examples, here tickets for rare queues that real data covers thinly. Generating 5,000 tickets of 200 input and 300 output tokens costs \( 5{,}000 \times (0.0006 + 0.0045) = \$25.50 \). The **synthetic data cost tradeoff** is the comparison of that low price per example with the lower value of each example and the checking it needs. Suppose a reviewer checks 10% of the set, 500 tickets at 1.5 minutes, \( 500 \times 1.125 = \$562.50 \), so the total is $588. If the 5,000 synthetic tickets improve the rare queues as much as 1,500 real ones, the cost per real-equivalent example is \( 588 \div 1{,}500 = \$0.39 \), against $1.125 for a real label, or $1,687.50 for 1,500. The equivalence of 1,500 is the assumption that decides the case, and it should be measured on a held-out set of real tickets, never on synthetic ones.

The first specification lets the learner compare labeling strategies.

#### Diagram: Labeling Strategy Cost Calculator


<iframe src="../../sims/labeling-strategy-cost-calculator/main.html" width="100%" height="310px" scrolling="no"></iframe>
[Run Labeling Strategy Cost Calculator Fullscreen](../../sims/labeling-strategy-cost-calculator/main.html)

<details markdown="1">
<summary>Labeling Strategy Cost Calculator</summary>
Type: microsim
**sim-id:** labeling-strategy-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the cost of labeling 20,000 tickets by manual labeling, AI-assisted labeling, active learning, and an outside vendor, to within the tolerance stated for each item.

**Prerequisites:** data labeling cost, AI-assisted data labeling, active learning cost reduction, annotation vendor management (defined in the section "Preparing the Data" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) A vendor's quoted price per label is its true cost. (2) AI-assisted labeling cost is mostly the token charge. (3) AI-assisted labeling saves the same amount whatever the reviewer's check time.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Pricing four strategies on one set shows that the visible price is a small part of each, and the exploration shows which input moves the assisted cost.

**Content:**

Fixed inputs: a reviewer costs $45 an hour. A manual label takes 1.5 minutes. The language model reads 700 tokens and writes 20 per ticket, at $3 and $15 per million tokens. Active learning needs 12,000 labels at the manual price plus $580 of scoring. The vendor quotes $0.60 per label for 20,000 labels, with $3,600 of guidelines and pilot, $3,240 of audits, and 1,000 labels redone in house at the manual price.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Manual cost of one label | $1.125 | 0.005 | 1.5 ÷ 60 × 45 = 1.125. |
| 2 | Manual cost of 20,000 labels | $22,500 | 1 | 20,000 × 1.125 = 22,500. |
| 3 | Token cost of proposing one label | $0.0024 | 0.0001 | 700 × 3 ÷ 1,000,000 + 20 × 15 ÷ 1,000,000 = 0.0024. |
| 4 | AI-assisted cost of one label at 88% accuracy and 0.4 minutes of checking | $0.44 | 0.01 | 0.0024 + 0.30 + 0.12 × 1.125 = 0.4374. |
| 5 | AI-assisted cost of 20,000 labels | $8,748 | 1 | 20,000 × 0.4374 = 8,748. |
| 6 | Saving of AI-assisted labeling over manual | $13,752 | 1 | 22,500 − 8,748 = 13,752. |
| 7 | Active learning cost for 20,000 tickets' worth of accuracy | $14,080 | 1 | 12,000 × 1.125 + 580 = 14,080. |
| 8 | Vendor all-in cost of one label | $1.00 | 0.01 | (12,000 + 3,600 + 3,240 + 1,125) ÷ 20,000 = 0.998. |

**Provenance:** All values come from the chapter section "Preparing the Data". The sim must label the data "illustrative".

**Rules:** Manual cost per label = minutes ÷ 60 × 45. Assisted cost per label = 0.0024 + check minutes ÷ 60 × 45 + (1 − accuracy ÷ 100) × manual cost per label. Assisted total = labels × assisted cost per label. Dollar values are shown to the dollar for totals and to four decimals for token cost. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tickets to label | 5,000 | 40,000 | 5,000 | 20,000 | tickets |
| Language model label accuracy | 70 | 96 | 2 | 88 | percent |
| Reviewer check time | 0.2 | 1.0 | 0.1 | 0.4 | minutes |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the number of tickets, the accuracy, and the check time and watches the manual cost, assisted cost, and saving update.
4. The learner should notice that moving the check time from 0.4 to 1.0 minutes at 70% accuracy raises the assisted cost per label to $1.09, against $1.125 manual, so the saving nearly disappears.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What does one manually labeled ticket cost?"

**Chapter Anchors:** The chapter states $1.125 per manual label, $22,500 for 20,000, $0.0024 of tokens per ticket, $8,748 and $0.4374 for assisted labeling, a saving of $13,752 or 61%, $14,080 for active learning, and a vendor all-in cost of $19,965 or $0.998 a label.
</details>

### Building the Model

The **feature engineering cost** is the cost of turning cleaned records into the inputs a model learns from: choosing fields, building text representations, creating derived values, and testing that they are computed the same way in training and in production. For the router it takes 80 hours, \( 80 \times 90 = \$7{,}200 \). **AI-assisted feature engineering** has a coding assistant draft the transformation code and its tests. If the work falls to 50 hours of review and integration, $4,500, and $20 of tokens, the cost is $4,520 and the saving $2,680, about 37%. The assistant drafts quickly, but the check that training and production compute each value identically is still a person's job, since a mismatch there degrades the model silently.

The **model training cost** is the cost of the compute, and the people supervising it, used to fit the model's parameters to the training data. Compute is the number of GPUs times the hours times the hourly price. One full fine-tuning run on 4 GPUs for 5 hours costs \( 4 \times 5 \times 4.00 = \$80 \). The **hyperparameter tuning cost** is the cost of the repeated training runs used to choose settings such as the learning rate and the number of epochs. Suppose a trial is a shortened run costing $20, one quarter of a full run. A grid of 72 combinations costs \( 72 \times 20 = \$1{,}440 \). A random search of 24 trials costs $480. Random search with early stopping, which abandons a trial that is clearly behind, lets 12 trials finish at $20 and 12 stop at 20% of the cost, \( 12 \times 20 + 12 \times 4 = \$288 \). The final run adds $80.

!!! mascot-thinking "Training Is the Cheap Phase"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the whole search and the final run cost $368 here, while labeling cost $22,500 by hand. Engineers tend to optimize the GPU bill because it is visible, but the money sits in people's hours, and that is where a saving moves the total.

The **experiment tracking cost** is the cost of the software, setup, and discipline needed to record, for every training run, the data version, code, settings, and results. Suppose setup takes 20 hours, $1,800, and the tool costs $300 a month, $3,600 a year. Without tracking, about 4 times a year someone must reconstruct which data and settings produced a model in use, 24 hours at $90 each time, $8,640. With tracking each reconstruction takes 2 hours, $720 in all. The $7,920 saved less $3,600 and $1,800 leaves $2,520 in year 1, and more later, since the setup is not repeated.

### Proving the Model Works

Two costs sit between a trained model and its release, and they are often confused. The **model evaluation cost** is the cost of measuring how well the model performs against a held-out set of labeled examples, using the metrics of Chapter 12. The team builds a gold set of 2,000 tickets, each labeled by two reviewers, \( 2{,}000 \times 2 \times 1.5 \div 60 \times 45 = \$4,500 \). The set is built once, and reused on every later model, so it is an asset and the cost of each later evaluation is small.

The **model validation cost** is the cost of confirming that the model is fit for its intended use and acceptable to the people accountable for it, including error analysis by queue, checks of rare and sensitive cases, and formal sign-off. Evaluation says the model is 91% accurate. Validation asks whether 91% is enough, which tickets it fails on, and who accepts the risk. Here 40 hours, $3,600, is spent on that review. Validation is the phase that Chapters 21 and 22 grow as regulation and risk appetite increase.

### Running the Model

The **model deployment cost** is the cost of packaging the model, connecting it to the ticketing system, testing the integration, and hosting it. Packaging and integration take 60 hours, $5,400, one time. Hosting on shared inference capacity costs $400 a month, $4,800 a year. The **model monitoring cost** is the recurring cost of watching a deployed model's inputs, outputs, and accuracy. For the router it is 6 hours of dashboard upkeep, $540, labeling a sample of 200 live tickets, 5 hours or $225, and $200 of tooling, a total of $965 a month, $11,580 a year. It is the largest running cost of the model, and it is easy to omit from a business case.

!!! mascot-encourage "Drift Sounds Harder Than It Is"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If statistics on distributions feel like a lot, that is normal, and you already know the idea from Chapter 12: compare today to a baseline. Work the small example below by hand once, and the rest is the same arithmetic.

Models decay because the world changes. **Data drift detection** is the measurement of whether the inputs now arriving differ from those the model was trained on. One common measure is the population stability index, PSI, which compares the share of records in each group between a baseline and the present:

\[ \mathrm{PSI} = \sum_i (c_i - b_i) \ln \frac{c_i}{b_i} \]

where \( b_i \) is the baseline share and \( c_i \) the current share of group \( i \). Take four ticket groups with baseline shares of 40%, 30%, 20%, and 10%, and current shares of 25%, 30%, 25%, and 20%. The terms are 0.0705, 0.0, 0.0112, and 0.0693, so the PSI is 0.151. A common rule of thumb reads below 0.10 as stable, 0.10 to 0.25 as a moderate shift, and 0.25 or more as a significant one. Data drift is a warning about the inputs. It does not prove the model is worse.

**Model drift detection** is the measurement of whether the model's own performance has declined, by labeling a sample of live cases and computing accuracy. A sample of 200 has a standard error of \( \sqrt{0.91 \times 0.09 \div 200} = 2.0 \) points, so a single reading is only accurate to about ±4 points at 95% confidence. To see a 3-point fall reliably the sample needs about 350 tickets, which raises the monthly labeling cost from $225 to about $394.

!!! mascot-tip "Size the Monitoring Sample for the Drop You Care About"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before choosing a sample, write down the smallest accuracy drop that would change a decision, then size the sample so its margin of error is smaller than that drop. A 200-ticket sample cannot confirm a 3-point drop, and a 350-ticket one can.

The **model retraining trigger** is the rule that decides when drift calls for action: the thresholds on measured accuracy and input shift, and the number of readings required, that start an investigation or a retraining. The team's rule is: retrain now if this month's accuracy is below 85.0%, or if both last month's and this month's are below 88.0%; investigate if this month's is below 88.0% or the PSI is 0.25 or more; otherwise do nothing. Requiring two readings below the floor avoids retraining on one noisy sample.

The second specification lets the learner apply the rule.

#### Diagram: Retraining Trigger Classifier


<iframe src="../../sims/retraining-trigger-classifier/main.html" width="100%" height="324px" scrolling="no"></iframe>
[Run Retraining Trigger Classifier Fullscreen](../../sims/retraining-trigger-classifier/main.html)

<details markdown="1">
<summary>Retraining Trigger Classifier</summary>
Type: microsim
**sim-id:** retraining-trigger-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate eight monthly monitoring readings that call for retraining, investigation, or no action by applying the team's retraining trigger rule.

**Prerequisites:** model retraining trigger, data drift detection, model drift detection, PSI (defined in the section "Running the Model" above).

**Evidence of Mastery:** For each of eight readings the learner commits one of three actions before the answer is shown. An action is correct when it matches the correct action in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A high PSI means the model must be retrained. (2) A single reading below the accuracy floor means retrain. (3) A reading exactly on a threshold is below it.

**Instructional Rationale:** Analyze-level work separates cases by the features that matter. Readings that sit on a threshold, or that show one signal without the other, force the learner to apply the rule exactly instead of reacting to the number that looks worst.

**Content:**

Rule: Retrain now when this month's accuracy < 85.0, or when last month's accuracy < 88.0 and this month's accuracy < 88.0. Otherwise Investigate when this month's accuracy < 88.0 or PSI >= 0.25. Otherwise No action. Accuracy is in percent.

| # | Last month's accuracy | This month's accuracy | PSI | Correct action | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | 91.0 | 90.5 | 0.04 | No action | Accuracy is above 88.0 and PSI is below 0.25. |
| 2 | 90.0 | 89.0 | 0.31 | Investigate | PSI >= 0.25 shows the inputs have shifted, but accuracy has not fallen below 88.0, so find which groups moved before retraining. |
| 3 | 89.0 | 87.5 | 0.12 | Investigate | This is the first reading below 88.0, and one sampled reading can be noise, so it triggers a check and not a retrain. |
| 4 | 87.6 | 87.2 | 0.18 | Retrain now | Both last month's and this month's accuracy are below 88.0. |
| 5 | 90.0 | 84.5 | 0.08 | Retrain now | 84.5 < 85.0 is a breach of the hard floor in a single reading, although the inputs look stable, so also check the monitoring labels. |
| 6 | 88.0 | 88.0 | 0.10 | No action | 88.0 is not below 88.0, and PSI 0.10 is below 0.25. |
| 7 | 91.0 | 90.8 | 0.25 | Investigate | PSI = 0.25 meets the threshold PSI >= 0.25. |
| 8 | 87.5 | 88.5 | 0.15 | No action | This month's accuracy is back above 88.0, and both months must be below the floor to retrain. |

**Provenance:** The rule and the PSI bands come from the chapter section "Running the Model". The readings are illustrative, and the sim must label them "illustrative".

**Rules:** Apply the rule in Content in the order written: Retrain now first, then Investigate, then No action. Comparisons use < for accuracy and >= for PSI. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Last month's accuracy | 80.0 | 94.0 | 0.5 | 91.0 | percent |
| This month's accuracy | 80.0 | 94.0 | 0.5 | 90.5 | percent |
| PSI | 0.00 | 0.50 | 0.05 | 0.10 | index |

**Learner Activity:**

1. The learner reads reading 1, chooses Retrain now, Investigate, or No action, and presses Commit.
2. The sim shows the correct action, which clause of the rule decided it, and the "Why" text.
3. After eight readings, exploration unlocks: the learner changes the three quantities and watches the action recommended by the rule update.
4. The learner should notice that moving accuracy from 88.0 to 87.5 changes the action, and that moving PSI from 0.20 to 0.25 changes it too.

**Feedback:** Eight readings, fixed order, two attempts each. Correct: "Correct: <action>." Incorrect on the first attempt: the "Why" text without the action. After a second wrong attempt the correct action is shown and the reading counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The rule is shown with reading 1 and no action chosen. The question on screen is "What does this month's reading call for?"

**Chapter Anchors:** The chapter states thresholds of 85.0 and 88.0 for accuracy, a PSI threshold of 0.25, a PSI band of 0.10 to 0.25 as a moderate shift, and the rule "retrain now / investigate / do nothing".
</details>

**Retraining cadence tuning** is the choice of how often to retrain on a schedule, balancing the cost of each retraining against the cost of the errors a decaying model makes while it waits. Retraining a model costs the data it needs plus the work to ship it. For the router, 4,000 new tickets labeled with AI assistance cost \( 4{,}000 \times 0.4374 = \$1,749.60 \), a training run is $80, re-running the evaluation takes 12 hours, $1,080, and redeployment 8 hours, $720. A retraining costs about $3,630.

Suppose accuracy starts at 91% and falls by 1.0 point a month after each retraining, so a month \( m \) after retraining is \( m \) points down. A point of accuracy on 10,000 tickets is 100 tickets, each costing $6 to reassign, so one point-month costs $600. Retraining every \( k \) months, the average shortfall is \( (k+1)/2 \) points, and the annual cost is

\[ \text{cost}(k) = \frac{12}{k} \times 3{,}630 + 12 \times 600 \times \frac{k+1}{2} \]

| Retrain every | Retraining cost | Cost of errors | Annual total |
|--------------:|----------------:|---------------:|-------------:|
| 1 month | $43,560 | $7,200 | $50,760 |
| 2 months | $21,780 | $10,800 | $32,580 |
| 3 months | $14,520 | $14,400 | $28,920 |
| 4 months | $10,890 | $18,000 | $28,890 |
| 6 months | $7,260 | $25,200 | $32,460 |
| 12 months | $3,630 | $46,800 | $50,430 |

The cheapest cadence is every 4 months at $28,890, and 3 months costs only $30 more. The curve is flat near its bottom, so exactness matters little, but the ends are expensive: monthly retraining costs $21,870 more a year, and yearly retraining $21,540 more. The minimum moves with the inputs. Cheaper retraining, a faster decay, or costlier errors all shorten the interval, and the table is recomputed whenever they change.

!!! mascot-thinking "The Best Schedule Is a Valley, Not a Cliff"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that two forces pull in opposite directions, retraining cost falling as the gap grows and error cost rising, so the total has a flat valley. Anywhere near the bottom is a good answer, which leaves room to choose the schedule that fits the team's calendar.

The third specification lets the learner choose the cadence.

#### Diagram: Retraining Cadence Tuner


<iframe src="../../sims/retraining-cadence-tuner/main.html" width="100%" height="324px" scrolling="no"></iframe>
[Run Retraining Cadence Tuner Fullscreen](../../sims/retraining-cadence-tuner/main.html)

<details markdown="1">
<summary>Retraining Cadence Tuner</summary>
Type: microsim
**sim-id:** retraining-cadence-tuner<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of six scenarios, the retraining interval of 1, 2, 3, 4, 6, or 12 months that has the lowest annual cost.

**Prerequisites:** retraining cadence tuning, retraining cost, error cost, point-month (defined in the section "Running the Model" above).

**Evidence of Mastery:** For each of six scenarios the learner commits one interval before the answer is shown. An interval is correct when it has the lowest annual total in the Content table. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) Retraining as often as possible is safest. (2) The cheapest model update is the cheapest schedule. (3) The best interval is the same for every model.

**Instructional Rationale:** Evaluate-level work judges options against a criterion. Scenarios whose runner-up costs almost the same, and scenarios in which the winner is at an end of the range, make the learner judge from the totals instead of from habit.

**Content:**

Annual cost for interval \( k \) months = (12 ÷ k) × retraining cost + 12 × tickets per month × (decay × (k + 1) ÷ 2 ÷ 100) × cost per misrouted ticket. Decay is in accuracy points lost per month.

| # | Tickets per month | Cost per misroute | Decay (points a month) | Retraining cost | Cost at 1, 2, 3, 4, 6, 12 months | Lowest | Why (shown as feedback) |
|---|---:|---:|---:|---:|---|---|---|
| 1 | 10,000 | $6 | 1.0 | $3,630 | $50,760; $32,580; $28,920; $28,890; $32,460; $50,430 | 4 months | 4 months costs $28,890, which is $30 less than 3 months. |
| 2 | 10,000 | $6 | 1.0 | $7,260 | $94,320; $54,360; $43,440; $39,780; $39,720; $54,060 | 6 months | Dearer retraining lengthens the interval, and 6 months costs $39,720, $60 less than 4. |
| 3 | 10,000 | $6 | 0.5 | $3,630 | $47,160; $27,180; $21,720; $19,890; $19,860; $27,030 | 6 months | Slower decay lengthens the interval, and 6 months costs $19,860, $30 less than 4. |
| 4 | 20,000 | $12 | 1.0 | $3,630 | $72,360; $64,980; $72,120; $82,890; $108,060; $190,830 | 2 months | Costly errors shorten the interval, and 2 months costs $64,980, against $72,120 at 3. |
| 5 | 5,000 | $3 | 1.0 | $3,630 | $45,360; $24,480; $18,120; $15,390; $13,560; $15,330 | 6 months | Cheap errors lengthen the interval, and 6 months costs $13,560, against $15,330 at 12. |
| 6 | 10,000 | $6 | 2.0 | $3,630 | $57,960; $43,380; $43,320; $46,890; $57,660; $97,230 | 3 months | Fast decay shortens the interval, and 3 months costs $43,320, $60 less than 2. |

**Provenance:** Scenario 1 comes from the chapter section "Running the Model". Scenarios 2 to 6 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** The annual cost formula is in Content. The lowest interval is the one with the smallest annual cost among the six intervals, and no scenario has a tie. Costs are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tickets per month | 2,500 | 20,000 | 2,500 | 10,000 | tickets |
| Cost per misrouted ticket | 3 | 12 | 3 | 6 | dollars |
| Decay | 0.5 | 2.0 | 0.5 | 1.0 | points per month |
| Retraining cost | 3,630 | 10,890 | 3,630 | 3,630 | dollars |

**Learner Activity:**

1. The learner reads scenario 1 with its inputs, chooses an interval, and presses Commit.
2. The sim shows the six annual totals, marks the lowest, and shows the "Why" text.
3. After six scenarios, exploration unlocks: the learner changes the four quantities and watches the six totals and the lowest interval update.
4. The learner should notice that the totals at the two intervals nearest the lowest differ by a small share of the annual cost, while the totals at 1 month and 12 months differ by a large share.

**Feedback:** Six scenarios, fixed order, two attempts each. Correct: "Correct: <interval> months at <total>." Incorrect on the first attempt: the "Why" text without the interval. After a second wrong attempt the interval is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** Scenario 1 is shown with its inputs and no interval chosen. The question on screen is "Which retraining interval has the lowest annual cost?"

**Chapter Anchors:** The chapter states a retraining cost of $3,630, a cost of $600 per point-month, annual totals of $50,760, $32,580, $28,920, $28,890, $32,460, and $50,430 for 1, 2, 3, 4, 6, and 12 months, and a lowest cost of $28,890 at 4 months.
</details>

### The Year-1 Bill

Adding the phases gives the cost of the router's first year. The figures below use the 4-month cadence, so three retrainings, and compare the manual path with the path that uses AI-assisted labeling and feature engineering.

| Phase | Manual path | AI-assisted path |
|-------|------------:|-----------------:|
| Data collection | $4,000 | $4,000 |
| Data cleaning | $4,500 | $4,500 |
| Data labeling | $22,500 | $8,748 |
| Feature engineering | $7,200 | $4,520 |
| Hyperparameter search and training | $560 | $560 |
| Experiment tracking, setup and year | $5,400 | $5,400 |
| Evaluation set | $4,500 | $4,500 |
| Validation | $3,600 | $3,600 |
| Deployment, one time and hosting | $10,200 | $10,200 |
| Monitoring | $11,580 | $11,580 |
| Retraining, three times | $10,890 | $10,890 |
| **Year 1 total** | **$84,930** | **$68,498** |

The two assisted methods save $16,432, 19.3% of the year. GPU compute, the training of $560 and hosting of $4,800, is $5,360, 6.3% of the manual total. The three largest lines are labeling, monitoring, and retraining, all of which are driven by human review of data, and the assisted methods act on the first of them. The running lines will recur in year 2, which is why Chapter 18 turns to the infrastructure and reuse that spread them across more than one model.

### Summary and Quick Check

The data science lifecycle is a loop of ten phases whose costs differ in kind. Collection, cleaning, and labeling are people reading records, and labeling is the biggest line: $22,500 by hand, $8,748 with AI-assisted labeling, $14,080 with active learning, and $19,965 through a vendor once its management cost is counted. Quality control costs 13% of labeling and protects against noisy labels, and synthetic data is cheap per example but must be proved on real data. Training is the small phase, $368 for the search and final run. Evaluation and validation are different costs, a measurement and a judgment of fitness. Deployment, monitoring, and retraining recur, and monitoring is the largest running cost. Drift is detected in the inputs by PSI and in the outputs by sampled accuracy, a trigger rule turns the readings into actions, and the best cadence, every 4 months at $28,890 a year, sits in a flat valley. Chapter 18 shows how infrastructure and reuse reduce these costs across a portfolio of models.

??? note "Quick check: why does a vendor's quote of $0.60 a label not give a 47% saving? - Click to expand"
    The quote omits the guidelines and pilot, the audits, and the in-house relabeling of failed labels. Those add $7,965 to the $12,000, an all-in $0.998 a label, 11% below the $1.125 in-house cost.

??? note "Quick check: why does a PSI of 0.31 not mean the model must be retrained? - Click to expand"
    PSI measures a shift in the inputs, not in the model's accuracy. If sampled accuracy is still above the floor, the rule says to investigate which groups moved and whether the model is affected.

??? note "Quick check: why can retraining every 3 months and every 4 months cost almost the same? - Click to expand"
    The retraining cost falls as the interval grows while the cost of errors rises, and the two nearly balance near the minimum. At $28,920 and $28,890 the totals differ by $30, about 0.1%.

!!! mascot-celebration "You Can Price a Model From First Export to Third Retraining"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now cost every phase of the data science lifecycle, compare four ways to label data, apply a retraining trigger to monitoring data, and choose a cadence from the total cost. That turns a model from a project into a line you can budget.
