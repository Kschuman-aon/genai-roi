---
title: SDLC Productivity, Risk, and Cost Roadmapping
description: Developer-productivity measures, the quality, security, and licensing risks of AI-assisted coding, the delivery-risk costs of releases and rollbacks, and the roadmap and case study that turn them into an SDLC cost reduction plan.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 16:20:00
version: 1.11
---

# SDLC Productivity, Risk, and Cost Roadmapping

## Summary

Covers developer-productivity metrics, the risks of AI-assisted coding, and the roadmapping techniques used to plan and report SDLC cost reduction. This chapter covers 22 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Bug Triage Automation | 34 |
| Developer Onboarding Cost | 33 |
| Code Review Cycle Time | 32 |
| Pull Request Turnaround | 31 |
| Developer Productivity Index | 30 |
| Tooling License Cost | 1 |
| IDE Integration Cost | 28 |
| Prompt-Driven Development Cost | 27 |
| Vibe Coding Risk | 26 |
| Code Generation Quality Review | 25 |
| Security Review Of AI Code | 24 |
| License Compliance Of AI Code | 23 |
| Developer Time Reallocation | 22 |
| SDLC Automation Maturity | 1 |
| SDLC Cost Baseline | 20 |
| SDLC Cost Reduction Roadmap | 19 |
| Software Delivery Risk | 1 |
| Rollback Cost | 5 |
| Post-Deployment Monitoring Cost | 4 |
| Feature Flag Cost Management | 3 |
| Release Cadence Cost Impact | 2 |
| SDLC ROI Case Study | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Business Case Development and Financial Forecasting](../10-business-case-financial-forecasting/index.md)
- [Chapter 11: Productivity and Quality Metrics for GenAI](../11-productivity-quality-metrics/index.md)
- [Chapter 15: AI-Assisted Coding Across the SDLC](../15-ai-assisted-coding-sdlc/index.md)

---

Chapter 15 ended with a range and a warning. For the 20-engineer team the assistant frees $61,762.50 of engineer time a quarter, which is worth between about $6,500 and about $50,000 depending on how much of that time becomes value. This chapter closes the gap. It measures productivity with indices rather than anecdotes, prices the risks that AI-generated code carries, counts the cost of releasing and recovering, and assembles a roadmap and a one-year case study. The team and its figures continue unchanged: 20 engineers, $75 an hour, $675,000 a quarter, about 500 merged changes and 24 releases a quarter. Every figure is illustrative.

!!! mascot-welcome "From Hours Freed to a Plan You Can Fund"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A saving nobody can sequence, fund, or defend stays a saving on a slide. By the end of this chapter you can measure the team's productivity, put a price on the risks, and write a roadmap with paybacks a finance partner will recognise. Every token counts, and so does the order you spend them in.

### Measuring Developer Productivity

Chapter 11 introduced velocity, lead time, and review time as separate metrics. A team needs a small set that it can read together. Two measures describe how fast change flows through review. The **code review cycle time** is the elapsed time from a change being submitted for review to its approval, including every round of comments and fixes. The **pull request turnaround** is the elapsed time from a pull request being opened to its merge, which includes review, waiting, and any final checks. For the team, the review cycle time falls from 18 to 12 hours and the turnaround from 30 to 22 hours after adopting an automated reviewer, mostly because the first pass of comments arrives in minutes instead of hours.

Both are elapsed times, not labor. A shorter review cycle does not mean fewer hours of work; it means less waiting, and waiting costs money only through delay, context switching, or work in progress that sits unfinished. Value them with care, and prefer to report them as flow measures next to the labor measures.

The **developer productivity index** is a composite score that combines several delivery measures, each expressed relative to a baseline, into one number so that a team's trend can be tracked and compared. Four components suffice. Each is turned into an improvement ratio, which is baseline divided by current for measures where lower is better, and current divided by baseline where higher is better. The ratios are then weighted and multiplied by 100, so that the baseline scores 100.

| Component | Weight | Baseline | Current | Improvement ratio |
|-----------|-------:|---------:|--------:|------------------:|
| Lead time for changes | 30% | 72 hours | 54 hours | 1.333 |
| Code review cycle time | 20% | 18 hours | 12 hours | 1.500 |
| Change failure rate | 30% | 15% | 12% | 1.250 |
| Throughput (story points per sprint) | 20% | 80 | 92 | 1.150 |

The index is \( 100 \times (0.30 \times 1.333 + 0.20 \times 1.500 + 0.30 \times 1.250 + 0.20 \times 1.150) = 130.5 \). If throughput had fallen to 76 points, the ratio would be 0.95 and the index 126.5, still above 100, because the other three improved. That is the weakness of a composite: it can hide a component moving the wrong way, so publish the components beside the index and treat a falling component as an alert.

!!! mascot-warning "A Single Index Can Be Gamed"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If a team is rewarded for the index, it will raise the easy component and let the hard one slide, and that happens because the index averages them. Show every component with its baseline, and judge change by the worst one as well as the average.

The first specification lets the learner compute the index.

#### Diagram: Developer Productivity Index Builder


<iframe src="../../sims/developer-productivity-index-builder/main.html" width="100%" height="370px" scrolling="no"></iframe>
[Run Developer Productivity Index Builder Fullscreen](../../sims/developer-productivity-index-builder/main.html)

<details markdown="1">
<summary>Developer Productivity Index Builder</summary>
Type: microsim
**sim-id:** developer-productivity-index-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate four improvement ratios and the weighted developer productivity index for the 20-engineer team, to within 0.01 for ratios and 0.1 for index points.

**Prerequisites:** developer productivity index, improvement ratio, lead time for changes, change failure rate, code review cycle time (defined in this chapter and Chapter 11).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) Lower is always better, so a lower throughput number is an improvement. (2) An index above 100 means every component improved. (3) Components with equal weights contribute equally.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Building the index from ratios shows that the direction of improvement differs by measure, and the item with falling throughput shows an index that stays above 100.

**Content:**

Weights: lead time 30%, review cycle time 20%, change failure rate 30%, throughput 20%. For lead time, review cycle time, and change failure rate, the ratio is baseline divided by current. For throughput, the ratio is current divided by baseline. Index = 100 × the weighted sum of ratios.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Lead time ratio (baseline 72, current 54) | 1.33 | 0.01 | Lower is better, so 72 ÷ 54 = 1.333. |
| 2 | Review cycle time ratio (baseline 18, current 12) | 1.50 | 0.01 | 18 ÷ 12 = 1.5. |
| 3 | Change failure rate ratio (baseline 15, current 12) | 1.25 | 0.01 | 15 ÷ 12 = 1.25. |
| 4 | Throughput ratio (baseline 80, current 92) | 1.15 | 0.01 | Higher is better, so 92 ÷ 80 = 1.15. |
| 5 | Developer productivity index | 130.5 | 0.1 | 100 × (0.30 × 1.333 + 0.20 × 1.5 + 0.30 × 1.25 + 0.20 × 1.15) = 130.5. |
| 6 | Index if throughput falls to 76 | 126.5 | 0.1 | The ratio 76 ÷ 80 = 0.95 contributes 19.0, and the index is 126.5. |
| 7 | Index points above 100 contributed by review cycle time | 10.0 | 0.1 | 100 × 0.20 × (1.5 − 1) = 10.0. |
| 8 | Share of the 30.5 points above 100 contributed by lead time | 32.8% | 0.1 points | 100 × 0.30 × 0.333 = 10.0 points, and 10.0 ÷ 30.5 = 0.328. |

**Provenance:** All values come from the chapter section "Measuring Developer Productivity" and Chapter 11. The sim must label the data "illustrative".

**Rules:** Ratio is baseline ÷ current for lead time, review cycle time, and change failure rate, and current ÷ baseline for throughput. Index = 100 × the sum of weight × ratio. Points above 100 for a component = 100 × weight × (ratio − 1), which is negative when the ratio is below 1. Index values are shown to one decimal and ratios to two. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Current lead time | 36 | 96 | 6 | 54 | hours |
| Current review cycle time | 6 | 24 | 2 | 12 | hours |
| Current change failure rate | 6 | 24 | 3 | 12 | percent |
| Current throughput | 60 | 110 | 2 | 92 | points |

**Learner Activity:**

1. The learner reads the weights and baselines and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the four current values and watches the ratios, the index, and the points each component adds update.
4. The learner should notice that a component can fall below a ratio of 1 while the index stays above 100.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The weights and baselines are shown and item 1 has an empty answer box. The question on screen is "What improvement ratio does a fall in lead time from 72 to 54 hours give?"

**Chapter Anchors:** The chapter states weights of 30%, 20%, 30%, and 20%, ratios of 1.333, 1.500, 1.250, and 1.150, an index of 130.5, and an index of 126.5 if throughput fell to 76.
</details>

Two more measures cover the people side of productivity. The **bug triage automation** is the use of an AI system to classify, prioritise, and assign incoming bug reports to the right team or person. With 300 reports a quarter, manual triage takes 10 minutes each, 50 hours, $3,750. Assisted triage needs a 2-minute check per report, 10 hours or $750, plus $30 of tokens, a saving of $2,970. The assistant misroutes 8% of reports and people 4%, so 12 extra reports are reassigned at 30 minutes each, $450, and the net saving is $2,520. The method of Chapter 12 applies directly: the 8% is a measured misclassification rate, not an assumption.

The **developer onboarding cost** is the cost of bringing a new engineer to full productivity, made up of their reduced output during ramp-up and the time experienced engineers spend teaching them. Take a ramp of 12 weeks at 50% average productivity: lost output is \( 12 \times 40 \times 0.5 \times 75 = \$18{,}000 \), and 5 hours a week of mentoring is another \( 12 \times 5 \times 75 = \$4{,}500 \), for $22,500 per hire. An assistant that explains the codebase shortens the ramp to 9 weeks and mentoring to 3.5 hours a week: \( 9 \times 40 \times 0.5 \times 75 + 9 \times 3.5 \times 75 = \$15{,}862.50 \). The saving is $6,637.50 per hire, or $26,550 a year at four hires.

### The Cost of Using the Tools

Licences, integration, and the prompts themselves are the visible costs. The **tooling license cost** is the recurring fee charged for the seats or capacity of an AI development tool. Seats are paid for whether used or not, so measure seat utilization: if 17 of 20 seats are active, 3 are idle, costing \( 3 \times 19 \times 12 = \$684 \) a year at the Chapter 15 seat price. Reassign or drop idle seats at renewal.

The **IDE integration cost** is the engineering and administration cost of connecting AI tools to developers' editors and to the company's identity, network, and security controls, and of keeping them working through updates. In the example, setup takes 60 hours ($4,500) and upkeep 4 hours a month ($300, or $3,600 a year), so the first year costs $8,100. It is an easy line to leave out of an ROI case, and it is as real as the licence.

The **prompt-driven development cost** is the cost of building software mainly by instructing a model in natural language and iterating on its output, counting both tokens and the human time spent specifying, reviewing, and testing. Suppose a feature takes 35 iterations of 20,000 input and 3,000 output tokens, at $3 and $15 per million. Each costs \( 0.06 + 0.045 = \$0.105 \), so the feature's tokens cost $3.68. The people cost is 6 hours of specification, review, and testing, $450, against 10 hours, $750, by hand. Tokens are under 1% of the cost, and the number of iterations, which sets the hours, is what to manage.

### The Risks of AI-Generated Code

**Vibe coding risk** is the exposure created by accepting AI-generated code on the strength of its appearing to work, with little reading or testing and no real understanding of what it does. For a throwaway prototype that is a reasonable trade. For production code it moves cost from this week to a defect later. Take a feature with an expected 2 defects. Without review, assume 40% escape to production, and with review 10%. If an escaped defect costs $4,000, the expected cost of skipping review is \( 2 \times 0.40 \times 4{,}000 = \$3{,}200 \), against \( 2 \times 0.10 \times 4{,}000 = \$800 \) with it. Review saves $2,400 of expected loss and costs 2 hours, $150. The same arithmetic says an internal demo whose defects cost $50 each should skip it.

**Code generation quality review** is the structured human and automated examination of AI-generated code against defined criteria before it is merged. Four checks carry most of the value: the code compiles and passes tests, the tests contain real assertions, the change matches the requirement it claims to meet, and it follows the team's conventions. A reviewer reads generated code more slowly than code they wrote, so budget the time rather than assuming a rubber stamp.

!!! mascot-tip "Match the Review to What an Escape Costs"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Multiply the defects you expect by 0.30, the share that review removes, then by what one escaped defect would cost, and compare the result with the review hours. If the review costs more than the loss it prevents, a lighter check is the cheaper choice.

The **security review of AI code** is the inspection of AI-generated changes for vulnerabilities such as injection flaws, insecure defaults, and leaked secrets, using automated scanners and human reviewers. Suppose 200 AI-assisted changes a quarter and 6% carry a vulnerability, which is 12. A scanner catches 90%, so 10.8 are fixed before merge at $300 each, $3,240. The 1.2 that escape cost $12,000 each in incident work and disclosure, $14,400. With the scanner's $1,500 a quarter the expected cost is $19,140; with no review at all, all 12 would escape at $144,000. The multiples are illustrative, and the pattern is not: finding a vulnerability before merge is a small fraction of the cost of finding it afterwards.

The **license compliance of AI code** is the verification that generated code does not reproduce material under licence terms the organization cannot or does not accept, such as copyleft terms that would require publishing its own source. Controls are a provenance filter in the tool, a scanner that matches code against known licensed snippets, and a legal review path. If scanning finds 2,000 copied lines before release, rewriting them at 30 lines an hour costs about 67 hours, $5,000. Found after release, the legal and remediation cost could be many times greater, and no amount of speed gain offsets a licence breach in the product.

### Turning Freed Time Into Value

Hours freed are not dollars. The **developer time reallocation** is the deliberate redirection of engineering hours freed by AI tools to higher-value work, or their removal from the cost base. It is the single factor that sets how much of the gross saving is real. In the team's case, the realization percentage \( r \) is applied to the gross time value of $61,762.50 a quarter, then the tools ($3,000) and debt ($9,000) of Chapter 15 are subtracted:

| Realization | Meaning | Net per quarter |
|------------:|---------|----------------:|
| 0% | Freed time is absorbed with nothing else changing | −$12,000 |
| 30% | Some backlog work is done that would otherwise wait | $6,528.75 |
| 50% | Half of the freed hours replace contractor or overtime spend | $18,881.25 |
| 70% | Most hours go to funded roadmap work | $31,233.75 |
| 100% | Every freed hour is turned into cash or value | $49,762.50 |

At 0% the assistant is a pure cost of $12,000, and the break-even is the realization at which the gross covers that cost, \( 12{,}000 \div 61{,}762.50 = 19.4\% \). The practical meaning is that the team must convert about one freed hour in five to break even, and the decision to do so is a management decision, made before the tool is bought, as in the gate suggested in Chapter 10.

!!! mascot-thinking "The Assistant Frees Hours, Management Spends Them"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that nothing in the tool changes the realization rate. It moves with how the hours are planned, which is why an ROI case with a stated reallocation plan is more credible than one that assumes the savings will take care of themselves.

### Baselines, Automation Maturity, and Delivery Risk

Every claim so far compares against a before. The **SDLC cost baseline** is the recorded cost and performance of the lifecycle before AI tools were introduced, captured over several periods, against which later results are compared. It applies the baseline capture of Chapter 12 to engineering. Four quarters of history smooth out a bad release or a holiday. The team's baseline holds the quarterly phase costs of Chapter 15 and the measures of this chapter.

| Baseline measure | Value before adoption |
|------------------|----------------------:|
| Engineering cost per quarter | $675,000 |
| Lead time for changes | 72 hours |
| Code review cycle time | 18 hours |
| Pull request turnaround | 30 hours |
| Change failure rate | 15% |
| Escaped defects per 100 changes | 8.0 |
| Production incidents per quarter | 12 |
| Releases per quarter | 24 |
| Story points per sprint | 80 |

The **SDLC automation maturity** is a staged description of how much of the lifecycle is automated and how reliably, from manual work at the bottom to policy-governed automation at the top. A five-step scale mirrors the observability model of Chapter 14: manual builds and releases (1), continuous integration with automated tests (2), continuous delivery with automated release (3), AI assistance with guardrails and measured quality (4), and AI-driven workflows operating under policy with human approval at defined points (5). The team's assistants sit at level 4 in coding and review, but its releases are at level 2, which is why deployment automation appears in the roadmap.

The **software delivery risk** is the probability and cost of a release failing, degrading service, or introducing defects, which together set the expected cost of shipping change. Its expected cost per quarter is the number of releases, times the change failure rate, times the cost of one failure. The next four ideas are the parts of that product.

The **rollback cost** is the cost of reverting a failed release to a known good state, including engineer time, retesting, and any downtime or customer impact in the interval. With a 15% change failure rate on 24 releases, 3.6 releases fail a quarter. A rollback takes 4 engineers about 1.5 hours, $450, and one failure in three is customer-facing, costing 30 minutes of downtime at $200 a minute, $6,000, which is $2,000 on average. The expected cost per failure is $2,450 and per quarter \( 3.6 \times 2{,}450 = \$8{,}820 \). Lowering the failure rate to 12% gives 2.88 failures and $7,056, a saving of $1,764.

The **post-deployment monitoring cost** is the labor and tooling cost of watching a new release in production for problems during the period after it ships. Manually, an engineer watches each release for 2 hours: \( 24 \times 2 \times 75 = \$3,600 \) a quarter. Automated canary analysis, which compares the new version's error rates with the old automatically, needs 30 minutes of review per release, \( 24 \times 0.5 \times 75 = \$900 \), and a $200 tool, so it saves $2,500 a quarter.

The **feature flag cost management** is the control of the platform, labor, and complexity cost of feature flags, switches that turn code paths on or off without redeploying. A flag turns a rollback from a 6-hour redeploy, $450, into a 5-minute switch, about $6. But flags accumulate. With 120 flags in the code and 40% stale, 48 flags each cost an hour of review a quarter, $3,600, on top of a $500 platform fee. The cost-managed policy is to give each flag an owner and an expiry date, and remove it within 30 days of full release.

The **release cadence cost impact** is the change in total release cost, fixed and failure-related, when the number of releases per period changes. Doubling releases from 24 to 48 a quarter doubles a manual release's fixed cost, from \( 24 \times 150 = \$3,600 \) to \( 48 \times 150 = \$7,200 \), but with automation the cost is nearly flat, about $498 against $546, because the $450 of upkeep does not scale with releases and each extra release adds about $2. Failure cost behaves differently: twice the releases means twice the failures, 5.76 against 2.88, but each release carries half the changes, so each failure costs about half, $1,225 against $2,450, and the expected failure cost stays $7,056. Under these assumptions a higher cadence does not raise failure cost, and what limits it is the fixed cost, so automate before you accelerate.

!!! mascot-warning "Do Not Count a Rollback Saving Twice"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The $1,764 rollback saving and the $2,500 monitoring saving sit inside the deployment and maintenance lines of Chapter 15's phase table. Use the phase totals or the itemised savings in one case, never both, and say which you used.

### The Cost Reduction Roadmap

The **SDLC cost reduction roadmap** is a prioritised, time-sequenced plan of the initiatives that will lower lifecycle cost, each with its one-time cost, expected recurring saving, payback, and risk, ordered so that the earliest returns fund the later work. The team has six candidates, each priced with the methods above.

| Initiative | One-time cost | Quarterly net saving | Payback (quarters) |
|------------|--------------:|---------------------:|-------------------:|
| AI test generation with a coverage gate | $4,000 | $7,220 | 0.55 |
| Automated code review | $2,000 | $2,850 | 0.70 |
| Build time reduction | $12,000 | $7,596 | 1.58 |
| Release safeguards (feature flags and canary analysis) | $7,500 | $3,764 | 1.99 |
| Bug triage automation | $6,000 | $2,520 | 2.38 |
| Deployment automation | $9,000 | $3,100 | 2.90 |

The payback is the one-time cost divided by the quarterly saving. Release safeguards combine the $1,764 rollback saving and the $2,500 monitoring saving, less the $500 flag platform fee. Build time reduction is the $7,500 of waiting time plus $96 of compute. Fund the initiatives in payback order within the available budget, skipping any that does not fit and continuing with the next. With $20,000, the roadmap funds the first three, spending $18,000 and returning $17,666 a quarter. With a larger budget it adds safeguards, triage, and deployment automation, and returns $27,050 a quarter for $40,500.

Payback is only one lens. Test generation heads the list but carries the most quality risk, since weak tests give false assurance, so pair it with the review checks above. Deployment automation has the longest payback and also unlocks higher release cadence. Roadmaps are sequenced by return and risk together.

The second specification lets the learner build a funded roadmap.

#### Diagram: Roadmap Prioritizer


<iframe src="../../sims/roadmap-prioritizer/main.html" width="100%" height="396px" scrolling="no"></iframe>
[Run Roadmap Prioritizer Fullscreen](../../sims/roadmap-prioritizer/main.html)

<details markdown="1">
<summary>Roadmap Prioritizer</summary>
Type: microsim
**sim-id:** roadmap-prioritizer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** prioritize<br/>
**Learning Objective:** The learner will prioritize six SDLC initiatives for each of six one-time budgets by selecting the set that the rule "fund in payback order, skipping any initiative that does not fit the remaining budget" produces.

**Prerequisites:** SDLC cost reduction roadmap, payback, one-time cost, quarterly net saving (defined in the section "The Cost Reduction Roadmap" above).

**Evidence of Mastery:** For each of six budgets the learner selects the initiatives to fund and commits before the answer is shown. A selection is correct when it equals the "Funded set" in Content exactly. Mastery is 5 of 6 budgets correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The largest saving should always be funded first. (2) An unfunded initiative always blocks later ones. (3) A larger budget only adds initiatives at the end of the list.

**Instructional Rationale:** Evaluate-level work ranks options against a criterion under a constraint. Skipping an initiative that does not fit while still funding a later one is the part that requires judgement, and the tied-out budgets expose it.

**Content:**

Initiatives in payback order, with one-time cost and quarterly net saving:

| Code | Initiative | One-time cost | Quarterly net saving | Payback (quarters) |
|---|---|---|---|---|
| T | AI test generation with a coverage gate | $4,000 | $7,220 | 0.55 |
| R | Automated code review | $2,000 | $2,850 | 0.70 |
| B | Build time reduction | $12,000 | $7,596 | 1.58 |
| S | Release safeguards | $7,500 | $3,764 | 1.99 |
| G | Bug triage automation | $6,000 | $2,520 | 2.38 |
| D | Deployment automation | $9,000 | $3,100 | 2.90 |

| # | Budget | Funded set | Spent | Quarterly net saving | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | $6,000 | T, R | $6,000 | $10,070 | T and R use the whole budget, and nothing else fits. |
| 2 | $12,000 | T, R, G | $12,000 | $12,590 | B and S do not fit the remaining $6,000, but G does. |
| 3 | $15,000 | T, R, S | $13,500 | $13,834 | B does not fit the remaining $9,000, S does, and G and D do not fit the remaining $1,500. |
| 4 | $20,000 | T, R, B | $18,000 | $17,666 | Only $2,000 remains, which no other initiative fits. |
| 5 | $27,500 | T, R, B, S | $25,500 | $21,430 | S fits the remaining $9,500, and G and D do not fit the remaining $2,000. |
| 6 | $40,500 | T, R, B, S, G, D | $40,500 | $27,050 | The budget funds all six. |

**Provenance:** The costs and savings come from the chapter section "The Cost Reduction Roadmap" and are illustrative. The sim must label the data "illustrative".

**Rules:** Order the initiatives by payback, shortest first. For each in order, fund it when its one-time cost <= the remaining budget, and otherwise skip it and continue. Quarterly net saving = the sum of the funded initiatives' savings. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Budget | 2,000 | 45,000 | 500 | 20,000 | dollars |

**Learner Activity:**

1. The learner reads budget 1 and the initiative table, selects the initiatives to fund, and presses Commit.
2. The sim shows the funded set, the amount spent, the quarterly net saving, and the "Why" text.
3. After six budgets, exploration unlocks: the learner changes the budget and watches the funded set and saving update.
4. The learner should notice that adding $500 can change which initiatives are funded in a way that does not just add one at the end.

**Feedback:** Six budgets, fixed order, two attempts each. Correct: "Correct: <set>, saving <value> a quarter." Incorrect on the first attempt: the "Why" text without the set. After a second wrong attempt the set is shown and the budget counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** The six initiatives are shown with budget 1 and nothing selected. The question on screen is "Which initiatives does this budget fund, in payback order?"

**Chapter Anchors:** The chapter states paybacks of 0.55, 0.70, 1.58, 1.99, 2.38, and 2.90 quarters, a $20,000 budget funding the first three for $18,000 and $17,666 a quarter, and all six costing $40,500 for $27,050 a quarter.
</details>

### The Case Study: One Year for the 20-Engineer Team

The **SDLC ROI case study** assembles the whole chapter into a one-year investment case for the team. It uses the phase totals of Chapter 15, so that the itemised savings of the roadmap are not counted again.

| Line | Amount |
|------|-------:|
| Gross time value freed, 4 quarters × $61,762.50 | $247,050 |
| Tool licences and usage | $12,000 |
| IDE integration upkeep | $3,600 |
| Debt clean-up, 4 quarters × $9,000 | $36,000 |
| Running costs | $51,600 |
| One-time costs: integration setup $4,500, deployment automation $9,000 | $13,500 |
| **Total year 1 cost** | **$65,100** |

The benefit is the gross multiplied by the realization of the section "Turning Freed Time Into Value". At 50% it is \( 0.50 \times 247{,}050 = \$123{,}525 \). The net is \( 123{,}525 - 65{,}100 = \$58{,}425 \), and the ROI is \( 58{,}425 \div 65{,}100 = 89.7\% \). The break-even realization is \( 65{,}100 \div 247{,}050 = 26.4\% \).

| Realization | Benefit | Net | ROI |
|------------:|--------:|----:|----:|
| 20% | $49,410 | −$15,690 | −24.1% |
| 30% | $74,115 | $9,015 | 13.8% |
| 50% | $123,525 | $58,425 | 89.7% |
| 70% | $172,935 | $107,835 | 165.6% |

The ROI swings from −24.1% to 165.6% on one assumption, which is the case study's main message. The tool, the debt, and the risk controls are all real, but the answer is dominated by whether the team converts the freed hours, and the evidence it should collect is the reallocation plan itself. Compare Chapter 11's support assistant, where adoption and rework moved the ROI by 43 points; here a single management decision moves it by nearly 190.

The last specification lets the learner build the case.

#### Diagram: SDLC ROI Case Study Workbench


<iframe src="../../sims/sdlc-roi-case-study-workbench/main.html" width="100%" height="318px" scrolling="no"></iframe>
[Run SDLC ROI Case Study Workbench Fullscreen](../../sims/sdlc-roi-case-study-workbench/main.html)

<details markdown="1">
<summary>SDLC ROI Case Study Workbench</summary>
Type: microsim
**sim-id:** sdlc-roi-case-study-workbench<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the year 1 costs, benefit, net, ROI, and break-even realization of the 20-engineer SDLC case, to within $1 for dollar values and 0.1 percentage points for percentages.

**Prerequisites:** gross time value, realization, one-time cost, running cost, ROI, break-even (defined in this chapter, Chapter 9, and Chapter 15).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance stated above. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The tool licence is the main cost of an AI coding assistant. (2) The ROI depends mainly on how fast the tool is. (3) A positive gross saving implies a positive ROI.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Moving from the cost lines through the benefit at one realization to the break-even shows which input the answer depends on most.

**Content:**

Fixed inputs: gross time value per quarter $61,762.50; tool licences and usage $12,000 a year; IDE integration upkeep $3,600 a year; debt clean-up $9,000 a quarter; one-time costs $13,500 (integration setup $4,500 and deployment automation $9,000).

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Annual gross time value | $247,050 | 61,762.50 × 4 = 247,050. |
| 2 | Annual running costs | $51,600 | 12,000 + 3,600 + 4 × 9,000 = 51,600. |
| 3 | Total year 1 cost | $65,100 | 51,600 + 13,500 = 65,100. |
| 4 | Benefit at 50% realization | $123,525 | 0.50 × 247,050 = 123,525. |
| 5 | Year 1 net at 50% realization | $58,425 | 123,525 − 65,100 = 58,425. |
| 6 | Year 1 ROI at 50% realization | 89.7% | 58,425 ÷ 65,100 = 0.897. |
| 7 | Break-even realization | 26.4% | 65,100 ÷ 247,050 = 0.2635, shown as 26.4%. |
| 8 | Year 1 ROI at 30% realization | 13.8% | (0.30 × 247,050 − 65,100) ÷ 65,100 = 9,015 ÷ 65,100 = 0.138. |

**Provenance:** All values come from the chapter sections "The Case Study" and "Turning Freed Time Into Value" and from Chapter 15. The sim must label the data "illustrative".

**Rules:** Benefit = realization × annual gross. Total year 1 cost = running costs + one-time costs. Net = benefit − total cost, and may be negative. ROI = net ÷ total cost. Break-even realization = total cost ÷ annual gross. Dollars are shown to the whole dollar and percentages to one decimal. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Realization | 0 | 100 | 10 | 50 | percent |
| Debt clean-up per quarter | 0 | 18,000 | 3,000 | 9,000 | dollars |
| One-time costs | 0 | 27,000 | 4,500 | 13,500 | dollars |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the realization, the debt clean-up, and the one-time costs and watches the net, ROI, and break-even realization update.
4. The learner should notice that the ROI changes far more with realization than with either cost line.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What is a year of the team's gross time value?"

**Chapter Anchors:** The chapter states $247,050 of annual gross, $51,600 of running costs, $13,500 of one-time costs, $65,100 of total cost, a net of $58,425 and an ROI of 89.7% at 50% realization, a break-even realization of 26.4%, and an ROI of 13.8% at 30%.
</details>

### Summary and Quick Check

Productivity is measured with a handful of flow and delivery measures read together, the code review cycle time, the pull request turnaround, and a developer productivity index of 130.5, with the components shown beside it. Costs include tools, integration, and prompting, where tokens are a rounding error next to people time. The risks of AI code, vibe coding, weak review, vulnerabilities, and licences, are priced by expected loss against the cost of the check. Delivery risk adds rollback, monitoring, flag, and cadence costs. A baseline, a maturity scale, a payback-ordered roadmap, and a one-year case study bring them together, and the case turns on one number, the share of freed time that becomes value, whose break-even for the team is 26.4%. Chapter 17 leaves software delivery for the lifecycle cost of the data and models themselves.

??? note "Quick check: why can an index above 100 hide a problem? - Click to expand"
    The index is a weighted average of ratios, so a large gain in one component can offset a loss in another. With throughput at 76 points the index is still 126.5, which is why every component must be shown against its baseline.

??? note "Quick check: when is it rational to skip review of AI-generated code? - Click to expand"
    When the expected loss prevented by review, defects times 0.30 times the cost of an escaped defect, is smaller than the cost of the review. An internal demo whose defects cost $50 each is such a case, and a production billing feature is not.

??? note "Quick check: why does the ROI swing from −24.1% to 165.6%? - Click to expand"
    The costs are fixed at $65,100, while the benefit scales directly with the realization percentage applied to $247,050 of gross time value. At 20% the benefit is $49,410 and at 70% it is $172,935.

!!! mascot-celebration "You Can Turn Hours Saved Into a Funded Plan"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now measure developer productivity, price the risks of AI-generated code and risky releases, sequence initiatives by payback, and show a one-year case whose answer rests on one stated assumption. That is the kind of ROI that survives the finance review.
