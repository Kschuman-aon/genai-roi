---
title: AI-Assisted Coding Across the SDLC
description: Where AI assistance changes the cost of each phase of the software development lifecycle, from requirements through incident response, including tool pricing, the quality and technical-debt risks, and the pipeline and migration costs that surround the code.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 15:35:00
version: 1.11
---

# AI-Assisted Coding Across the SDLC

## Summary

Traces cost impact across the software development lifecycle as AI assists with requirements, code generation, review, and testing. This chapter covers 23 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Software Development Lifecycle | 57 |
| Requirements Phase Cost | 56 |
| Design Phase Cost | 1 |
| Coding Phase Cost | 54 |
| Testing Phase Cost | 53 |
| Deployment Phase Cost | 52 |
| Maintenance Phase Cost | 51 |
| AI-Assisted Requirements | 50 |
| AI-Assisted Code Generation | 49 |
| Code Completion Tool Cost | 48 |
| AI Pair Programming | 47 |
| Automated Code Review | 1 |
| AI-Generated Test Cases | 45 |
| Test Coverage Automation | 44 |
| Automated Documentation | 1 |
| Technical Debt From AI Code | 42 |
| Code Quality Regression Risk | 41 |
| Refactoring Cost | 40 |
| Legacy Code Migration Cost | 1 |
| CI/CD Pipeline Cost | 38 |
| Build Time Reduction | 1 |
| Deployment Automation Cost | 36 |
| Incident Response Cost | 35 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)
- [Chapter 2: Prompting, Deployment, and Model Optimization Basics](../02-prompting-deployment-optimization/index.md)

---

Chapter 11 measured an AI coding assistant for a team of 20 engineers and counted two hard benefits: $3,750 a quarter of review time and $4,500 a quarter of defect-fixing, against $12,000 a year of licences. It left most of the lifecycle unexamined: where the engineers' time goes, which phases an assistant actually touches, and what it costs in debt, risk, and pipeline load. This chapter maps the whole lifecycle for the same team. The team has 20 engineers, a loaded cost of $75 an hour, 450 productive hours each per quarter, and about 500 merged changes per quarter, which makes the quarterly engineering cost \( 20 \times 450 \times 75 = \$675{,}000 \). Every figure is illustrative.

!!! mascot-welcome "Follow the Engineering Dollar"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Code generation gets the headlines, but it is one phase of six, and the other five hold most of the cost. By the end of this chapter you can say where an assistant saves engineer time, where it adds cost, and what a fair net figure looks like. Every token counts, and so does every engineer-hour.

### The Lifecycle and Its Cost Map

The **software development lifecycle** (SDLC) is the sequence of phases through which software is planned, built, verified, released, and kept running. Six phases cover it, and each has a cost, which is the engineering time spent in it multiplied by the loaded labor rate, plus any tools or infrastructure it uses.

| Phase | What happens | Share of effort | Quarterly cost |
|-------|--------------|----------------:|---------------:|
| Requirements | Understand and write down what is needed | 8% | $54,000 |
| Design | Decide how it will be built | 12% | $81,000 |
| Coding | Write and review the code | 30% | $202,500 |
| Testing | Verify the code works | 20% | $135,000 |
| Deployment | Release it to users | 5% | $33,750 |
| Maintenance | Fix, support, and evolve it | 25% | $168,750 |
| **Total** | | **100%** | **$675,000** |

Read the table as six cost lines, each named for its phase: **requirements phase cost** ($54,000), **design phase cost** ($81,000), **coding phase cost** ($202,500), **testing phase cost** ($135,000), **deployment phase cost** ($33,750), and **maintenance phase cost** ($168,750). Coding is the largest single phase at 30%, but maintenance and testing together are 45%, which is more than coding. A tool aimed only at coding addresses less than a third of the spend.

The assistant touches the phases unevenly. Suppose the team estimates its effect on each phase's time as follows. The effects are assumptions to be tested with the methods of Chapter 12, not findings.

| Phase | Assumed time effect | Time value freed per quarter |
|-------|--------------------:|-----------------------------:|
| Requirements | −8% | $4,320 |
| Design | −3% | $2,430 |
| Coding | −10% | $20,250 |
| Testing | −12% | $16,200 |
| Deployment | −30% | $10,125 |
| Maintenance | −5% | $8,437.50 |
| **Total** | | **$61,762.50** |

The total is 9.15% of the $675,000, a real number, and it is gross. Chapter 10 warned that saved time is not banked money, and this is saved time. Subtract the tools ($3,000 a quarter, from the $12,000 a year) and the debt the assistant creates later in this chapter ($9,000), and the net time value is $49,762.50. It becomes cash only if people are released or hours are redeployed to work that earns something, which Chapter 16 treats. At a 30% realization the figure is \( 0.30 \times 61{,}762.50 - 3{,}000 - 9{,}000 = \$6{,}528.75 \), and that range, from about $6,500 to about $50,000, is the honest answer to "what is it worth?".

The first specification lets the learner reproduce this arithmetic.

#### Diagram: SDLC Phase Savings Calculator


<iframe src="../../sims/sdlc-phase-savings-calculator/main.html" width="100%" height="494px" scrolling="no"></iframe>
[Run SDLC Phase Savings Calculator Fullscreen](../../sims/sdlc-phase-savings-calculator/main.html)

<details markdown="1">
<summary>SDLC Phase Savings Calculator</summary>
Type: chart
**sim-id:** sdlc-phase-savings-calculator<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the quarterly cost of an SDLC phase, the time value freed in it, and the total gross and net time value across six phases for the 20-engineer team, to within $1.

**Prerequisites:** software development lifecycle, the six phase costs, loaded labor rate, realization (defined in the section "The Lifecycle and Its Cost Map" above and in Chapter 10).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within $1 of the model value for dollar items, or within 0.1 percentage points for percentage items. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) Coding is where most engineering cost sits. (2) Time freed is the same as money saved. (3) An assistant's tool cost is the only cost it adds.

**Instructional Rationale:** Apply-level calculation needs a procedure and a check. Walking from the baseline cost map to the gross, the net, and the 30% realization case shows the learner how much each adjustment removes.

**Content:**

Fixed inputs: 20 engineers, 450 productive hours each per quarter, $75 per hour, giving a $675,000 quarterly cost. Phase shares of effort and assumed time effects:

| Phase | Share of effort | Assumed time effect |
|---|---|---|
| Requirements | 8% | 8% less |
| Design | 12% | 3% less |
| Coding | 30% | 10% less |
| Testing | 20% | 12% less |
| Deployment | 5% | 30% less |
| Maintenance | 25% | 5% less |

Tool cost is $3,000 per quarter and debt cost is $9,000 per quarter.

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Quarterly coding phase cost | $202,500 | 675,000 × 0.30 = 202,500. |
| 2 | Testing phase time value freed | $16,200 | 675,000 × 0.20 × 0.12 = 16,200. |
| 3 | Deployment phase time value freed | $10,125 | 675,000 × 0.05 × 0.30 = 10,125. |
| 4 | Total gross time value freed | $61,762.50 | 4,320 + 2,430 + 20,250 + 16,200 + 10,125 + 8,437.50 = 61,762.50. |
| 5 | Gross time value as a share of the quarterly cost | 9.2% | 61,762.50 ÷ 675,000 = 0.0915, shown to one decimal as 9.2%. |
| 6 | Net time value after tool and debt costs | $49,762.50 | 61,762.50 − 3,000 − 9,000 = 49,762.50. |
| 7 | Share of gross time value from coding and testing combined | 59.0% | (20,250 + 16,200) ÷ 61,762.50 = 0.590. |
| 8 | Net value if only 30% of the gross is realized | $6,528.75 | 0.30 × 61,762.50 − 3,000 − 9,000 = 6,528.75. |

**Provenance:** All values come from the chapter section "The Lifecycle and Its Cost Map". The sim must label the data "illustrative".

**Rules:** Phase cost = quarterly cost × share of effort. Time value freed = phase cost × time effect. Gross = sum over six phases. Net = gross − tool cost − debt cost, and may be negative. Realized net = realization × gross − tool cost − debt cost. Dollar values are shown to two decimals and percentages to one. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Coding time effect | 0 | 30 | 1 | 10 | percent less |
| Testing time effect | 0 | 30 | 1 | 12 | percent less |
| Debt cost | 0 | 30,000 | 3,000 | 9,000 | dollars per quarter |
| Realization | 0 | 100 | 10 | 30 | percent |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the effects, the debt cost, and the realization and watches a bar chart of freed time by phase and the net value update.
4. The learner should notice that realization moves the net far more than any single phase effect.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown with the baseline phase costs as bars and item 1 has an empty answer box. The question on screen is "How much does the coding phase cost each quarter?"

**Chapter Anchors:** The chapter states a $675,000 quarterly cost, phase costs of $54,000, $81,000, $202,500, $135,000, $33,750, and $168,750, a gross of $61,762.50 (9.15%), a net of $49,762.50, and a net of $6,528.75 at 30% realization.
</details>

### Early Phases: Requirements, Design, and Where Defects Are Cheap

An error costs least when it is found earliest. The numbers vary by team, so the figures below are illustrative, but the pattern is widely observed: fixing a defect found in requirements costs $100, in design $200, in coding $400, in testing $800, and in production $4,000. The next table shows what a mix of 50 defects costs by where they are found.

| Where found | Defects | Fix cost each | Total |
|-------------|--------:|--------------:|------:|
| Requirements | 10 | $100 | $1,000 |
| Design | 10 | $200 | $2,000 |
| Coding | 10 | $400 | $4,000 |
| Testing | 10 | $800 | $8,000 |
| Production | 10 | $4,000 | $40,000 |
| **Total** | **50** | | **$55,000** |

The 10 production defects are 20% of the count and 72.7% of the cost. That asymmetry decides where AI assistance should be pointed.

**AI-assisted requirements** is the use of a language model to draft user stories and acceptance criteria, detect ambiguity and contradiction in specifications, and generate questions for stakeholders. Its value is not in typing fewer words but in moving defects earlier. A requirements review that finds 20 defects which would otherwise have surfaced in testing saves \( 20 \times (800 - 100) = \$14{,}000 \). The cost is a few hours of an analyst's time to review each AI draft, plus tokens, which are trivial at this scale. The risk is that a fluent but wrong requirement looks finished, so a human who owns the requirement must still approve it.

!!! mascot-thinking "Move the Defect, Not Just the Keystroke"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the biggest saving is not that a model writes faster, but that it finds a mistake at $100 that would have cost $800 or $4,000 later. When you evaluate an AI use case, ask which phase the defect moves from and to.

The second specification asks the learner to apply that test to six investment options.

#### Diagram: Shift-Left Investment Judge


<iframe src="../../sims/shift-left-investment-judge/main.html" width="100%" height="304px" scrolling="no"></iframe>
[Run Shift-Left Investment Judge Fullscreen](../../sims/shift-left-investment-judge/main.html)

<details markdown="1">
<summary>Shift-Left Investment Judge</summary>
Type: microsim
**sim-id:** shift-left-investment-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of six AI investment options, whether to fund it using the rule that savings from moving defects to an earlier phase must be at least twice the cost.

**Prerequisites:** the defect fix costs by phase, shift-left, benefit-cost ratio (defined in the section "Early Phases: Requirements, Design, and Where Defects Are Cheap" above).

**Evidence of Mastery:** For each of six options the learner commits "Fund" or "Do not fund" before the ratio is shown. A verdict is correct when it matches the Content table. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The option that moves the most defects is the best. (2) Any positive saving justifies funding. (3) The phase the defect moves to does not matter.

**Instructional Rationale:** Evaluate-level work is judgment against a criterion. Having to estimate whether savings reach twice the cost, with an option exactly at the boundary, makes the learner apply the criterion rather than the size of the headline saving.

**Content:**

Fix cost by phase: Requirements $100, Design $200, Coding $400, Testing $800, Production $4,000. Saving = defects moved × (fix cost in the old phase − fix cost in the new phase). Ratio = saving ÷ cost. Fund when ratio >= 2.0.

| # | Option | Defects moved | From to | Cost | Saving | Ratio | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|
| 1 | AI requirements review | 20 | Testing to Requirements | $6,000 | $14,000 | 2.33 | Fund | The saving is more than twice the cost. |
| 2 | AI test generation | 15 | Production to Testing | $9,000 | $48,000 | 5.33 | Fund | Catching production defects early is the largest saving. |
| 3 | AI code review | 25 | Testing to Coding | $3,600 | $10,000 | 2.78 | Fund | A modest move per defect, repeated 25 times, still clears the bar. |
| 4 | AI design review | 8 | Coding to Design | $2,000 | $1,600 | 0.80 | Do not fund | Moving a defect from coding to design saves only $200 each. |
| 5 | AI static analysis of legacy code | 12 | Production to Coding | $24,000 | $43,200 | 1.80 | Do not fund | The saving is real but below twice the cost. |
| 6 | AI requirements-to-test tracing | 10 | Production to Requirements | $19,500 | $39,000 | 2.00 | Fund | The ratio is exactly 2.00, and the rule funds at 2.0 or more. |

**Provenance:** Option 1 comes from the chapter section "Early Phases"; the others are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Saving = defects moved × (old phase fix cost − new phase fix cost). Ratio = saving ÷ cost, shown to two decimals. The verdict is "Fund" when ratio >= 2.0 and "Do not fund" otherwise. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Defects moved | 0 | 50 | 1 | 20 | defects |
| Option cost | 1,000 | 30,000 | 500 | 6,000 | dollars |
| Production fix cost | 1,000 | 8,000 | 1,000 | 4,000 | dollars |

**Learner Activity:**

1. The learner reads option 1 with its defects, move, and cost, and chooses Fund or Do not fund, then presses Commit.
2. The sim shows the saving, the ratio, and the "Why" text.
3. After six options, exploration unlocks: the learner changes the defects moved, the cost, and the production fix cost and watches the ratio and verdict update.
4. The learner should notice that a lower production fix cost removes the case for options that depend on production defects.

**Feedback:** Six options, fixed order, two attempts each. Correct: "Correct: <verdict>, ratio <value>." Incorrect on the first attempt: the "Why" text without the verdict. After a second wrong attempt the verdict is shown and the option counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** Option 1 is shown with no verdict chosen. The question on screen is "Do the savings reach twice the cost?"

**Chapter Anchors:** The chapter states fix costs of $100, $200, $400, $800, and $4,000 by phase, a mix of 50 defects costing $55,000, and a $14,000 saving from 20 defects moved from testing to requirements.
</details>

The **design phase cost** is the engineering time spent deciding architecture, interfaces, and data models, and at $81,000 a quarter it is the second-largest early line. Assistants help here less than anywhere, at the assumed 3%, because design is mostly a judgment about trade-offs the team must own. A model can draft alternatives and list risks, which is useful for review, but it cannot know the constraints that make a design right for this organization.

### The Coding Phase: Generation, Completion, and Pairing

**AI-assisted code generation** is the production of code from a natural-language instruction or a partial context by a language model, whose output a developer then reviews, edits, and accepts. Its economics are time saved writing minus time spent reading. Writing a 200-line module takes 4 hours by hand. With generation, the developer spends 1 hour specifying and 1.5 hours reviewing and correcting, a total of 2.5, which saves 1.5 hours, worth \( 1.5 \times 75 = \$112.50 \). The review hours are the cost people forget, and they rise with the quantity of code generated.

The **code completion tool cost** is the price of an inline suggestion tool, usually a fixed monthly fee per developer seat, sometimes with a usage charge. For the team it is $19 per seat per month, or \( 20 \times 19 \times 12 = \$4{,}560 \) a year. At $75 an hour, the seat pays for itself if it saves \( 19 \div 75 \times 60 = 15.2 \) minutes a month, which is less than one minute a working day. The low break-even is why seat licences are easy to justify and why the harder question is the quality of what the seats produce.

**AI pair programming** is a developer working with a conversational assistant that answers questions, explains code, suggests approaches, and drafts changes in a dialogue about the current task. It is usage-priced, because each turn resends the conversation and code context. Take one session a day per engineer, 21 working days, so 420 sessions a month, each of 120,000 input and 12,000 output tokens on a model priced at $3 and $15 per million. A session costs \( 0.36 + 0.18 = \$0.54 \), or $226.80 a month for the team. Together with about $93 of test generation tokens, usage costs $320 a month, or $3,840 a year. The three annual items, seats $4,560, a review tool $3,600, and usage $3,840, sum to the $12,000 of Chapter 11.

!!! mascot-tip "Cap Context, Not Curiosity"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Chat cost grows with the context resent each turn, so start a new session for a new task and send only the files that matter. Developers keep their curiosity, and the bill stops growing with the length of the conversation.

**Automated code review** is the use of an AI or rule-based tool to examine proposed changes for defects, style violations, and security issues before or alongside human review. From Chapter 11, the team merges 500 changes a quarter and human review time falls from 30 to 24 minutes, a saving of 3,000 minutes, or $3,750. The tool costs $3,600 a year, $900 a quarter, so the net is $2,850. Human review stays: the tool shortens it, and does not replace the accountability of a person who approves the change.

### Testing and Documentation

**AI-generated test cases** are automated tests drafted by a language model from code, requirements, or specifications, and reviewed by a developer. Writing one by hand takes about 20 minutes. With AI, the draft appears in seconds, and a developer needs about 5 minutes to review and fix it. For 400 test cases a quarter the manual cost is \( 400 \times 20 \div 60 \times 75 = \$10{,}000 \). The assisted cost is \( 400 \times 5 \div 60 \times 75 = \$2{,}500 \) of review plus about $280 of tokens, so $2,780 and a saving of $7,220. The danger is a test that always passes: it counts toward coverage and checks nothing. Review each generated test for a meaningful assertion, and sample with mutation testing, which deliberately breaks the code to see whether any test notices.

**Test coverage automation** is the automatic measurement and enforcement of how much of the code the tests exercise, typically as a pipeline step that fails a change if coverage falls below a threshold. A gate of 75% line coverage stops coverage from decaying as the codebase grows. Coverage is a floor, not a measure of quality: 100% of lines can run with no assertion about the result, which is why it pairs with the quality checks above.

**Automated documentation** is the AI-assisted generation of code comments, interface descriptions, and user guides from the source. Writing a module's documentation takes about 45 minutes by hand and about 10 minutes to review a draft. For 30 modules a quarter the saving is \( 30 \times 35 \div 60 \times 75 = \$1{,}312.50 \). The risk is documentation that describes what the code says instead of why, or that drifts out of date, so regenerate it in the pipeline rather than once.

### The Cost That Arrives Later: Debt, Regression, and Refactoring

**Technical debt from AI code** is the extra future cost of change created when AI-generated code is accepted without the structure, consistency, or clarity a human author would have supplied, so it must be corrected later. Like a loan, it buys speed now and charges interest, here in the form of refactoring hours. Suppose AI-assisted changes save 40 hours per 100 changes in the writing, and 8% of them need a 3-hour clean-up within two quarters. The debt is \( 8 \times 3 = 24 \) hours per 100 changes, which consumes 60% of the gross saving. Across the team's 500 changes, the gross saving is 200 hours ($15,000), the debt is 120 hours ($9,000), and the net is $6,000.

The **refactoring cost** is the engineering time required to restructure existing code without changing its behavior, so it is cheaper to read, test, and change. It is the repayment of the debt. The $9,000 above is 40 refactorings at 3 hours and $75 an hour. Pay it as you go, because deferred debt compounds as more code is built on top.

The **code quality regression risk** is the probability and cost that changes assisted by AI make measurable quality worse, such as higher defect density, more complexity, or more duplicated code, even while speed improves. Chapter 11's defect reduction (8.0 to 6.0 per 100 changes) shows the favorable case. The risk is that quality falls in dimensions you are not watching, so track one guardrail for each of defect rate, complexity, and duplication, and compare them with the pre-adoption baseline of Chapter 12.

!!! mascot-warning "Speed Gains Hide Their Own Bills"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A faster team that merges more code can quietly pile up clean-up work, and it happens because the saving shows up this quarter and the debt two quarters later. Book a debt reserve of refactoring hours against the gross saving, and revisit it when the rework data arrives.

The third specification asks the learner to judge how much of a saving the debt consumes.

#### Diagram: Technical Debt Break-Even Explorer


<iframe src="../../sims/technical-debt-break-even-explorer/main.html" width="100%" height="292px" scrolling="no"></iframe>
[Run Technical Debt Break-Even Explorer Fullscreen](../../sims/technical-debt-break-even-explorer/main.html)

<details markdown="1">
<summary>Technical Debt Break-Even Explorer</summary>
Type: microsim
**sim-id:** technical-debt-break-even-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** assess<br/>
**Learning Objective:** The learner will assess, for each of eight scenarios, whether an AI saving can be reported as stated, must be restated net of debt, or is net negative, using thresholds on the share of the gross saving that the debt consumes.

**Prerequisites:** technical debt from AI code, refactoring cost, gross saving, net saving (defined in the section "The Cost That Arrives Later" above).

**Evidence of Mastery:** For each of eight scenarios the learner commits one of three verdicts before the arithmetic is shown. A verdict is correct when it matches the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A positive gross saving means a positive result. (2) A small debt rate is always negligible. (3) Hours per refactoring do not matter if the rate is low.

**Instructional Rationale:** Evaluate-level work is judging against criteria. The three-way verdict and the boundary scenario at exactly 25% require the learner to compare the debt with the saving rather than to look at either alone.

**Content:**

All scenarios are per 100 changes. Debt hours = debt rate in percent × hours per refactoring (the number of changes needing refactoring is the rate, since there are 100 changes). Share consumed = debt hours ÷ gross hours saved. The verdict is "Report as stated" when share consumed <= 25%, "Restate net of debt" when share consumed > 25% and < 100%, and "Net negative" when share consumed >= 100%.

| # | Gross hours saved | Debt rate (%) | Hours per refactoring | Debt hours | Share consumed | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|
| 1 | 40 | 8 | 3 | 24 | 60.0% | Restate net of debt | The debt consumes more than a quarter of the saving. |
| 2 | 40 | 2 | 3 | 6 | 15.0% | Report as stated | The debt is within a quarter of the saving. |
| 3 | 30 | 10 | 3 | 30 | 100.0% | Net negative | The debt equals the saving, so nothing is left. |
| 4 | 50 | 5 | 5 | 25 | 50.0% | Restate net of debt | A low rate with costly refactorings still consumes half. |
| 5 | 60 | 4 | 3 | 12 | 20.0% | Report as stated | The share is under a quarter. |
| 6 | 20 | 10 | 4 | 40 | 200.0% | Net negative | The debt is twice the saving. |
| 7 | 40 | 5 | 2 | 10 | 25.0% | Report as stated | The share is exactly 25%, and the rule restates only above 25%. |
| 8 | 48 | 6 | 3 | 18 | 37.5% | Restate net of debt | The share is above 25% and below 100%. |

**Provenance:** Scenario 1 comes from the chapter section "The Cost That Arrives Later"; the others are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Debt hours = debt rate × hours per refactoring. Share consumed = debt hours ÷ gross hours saved, shown to one decimal. Net hours = gross hours − debt hours. Thresholds are as given in Content. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Gross hours saved per 100 changes | 10 | 80 | 10 | 40 | hours |
| Debt rate | 0 | 20 | 1 | 8 | percent of changes |
| Hours per refactoring | 1 | 8 | 1 | 3 | hours |

**Learner Activity:**

1. The learner reads scenario 1 and selects a verdict, then presses Commit.
2. The sim shows the debt hours, the share consumed, the net hours, and the "Why" text.
3. After eight scenarios, exploration unlocks: the learner changes the three quantities and watches the share consumed and verdict update.
4. The learner should notice that the debt rate and the hours per refactoring multiply, so doubling either doubles the debt.

**Feedback:** Eight scenarios, fixed order, two attempts each. Correct: "Correct: <verdict>; net hours <value>." Incorrect on the first attempt: the "Why" text without the verdict. After a second wrong attempt the verdict is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** Scenario 1 is shown with no verdict chosen. The question on screen is "How much of this saving will the debt use up?"

**Chapter Anchors:** The chapter states 40 hours saved per 100 changes, 8% needing a 3-hour clean-up, 24 debt hours per 100 changes consuming 60%, and a net of $6,000 over 500 changes.
</details>

### Moving and Shipping: Migration, Pipelines, and Incidents

**Legacy code migration cost** is the total cost of converting existing software to a new language, framework, or platform, including conversion, testing, and parallel running. It is where generation is most helpful, because the task is large, well defined, and checkable. Take a 120,000-line system. By hand at 30 lines an hour it takes 4,000 hours, or $300,000. With AI-assisted conversion, 70% of the lines (84,000) are accepted after review at 100 lines an hour, 840 hours, and the other 30% (36,000) are rewritten by hand at 30 lines an hour, 1,200 hours: a total of 2,040 hours, or $153,000. Add $6,000 of tokens and $18,000 of parallel-run verification, and the cost is $177,000, a saving of $123,000, or 41%. The verification line is not optional, since a converted system that behaves differently is worse than none.

The **CI/CD pipeline cost** is the compute, licensing, and maintenance cost of the continuous integration and delivery system that builds, tests, and releases each change. Generated tests and extra changes make the pipeline run more. At 500 changes a quarter, 6 builds a change, and 12 minutes a build, the team uses 36,000 runner minutes, and at $0.008 a minute that is $288. Adding 400 generated tests that lengthen each build by 3 minutes adds 9,000 minutes, or $72. Compute is small.

**Build time reduction** is the shortening of the elapsed time to build and test a change, through caching, parallel test execution, and running only the tests that a change can affect. The money is in the waiting engineers, not the machines. Cutting builds from 12 to 8 minutes saves 4 minutes on each of 3,000 builds, 12,000 minutes or 200 hours. If half of each wait is lost to context switching, 100 hours are lost at $75, $7,500 a quarter, compared with $96 of runner compute. Build time reduction is therefore a developer-productivity investment first and a compute one a distant second.

**Deployment automation cost** is the cost of building and running tooling that releases software without manual steps, weighed against the labor and errors it removes. Manual release takes 2 engineer-hours, and the team ships twice a week, 24 releases a quarter: 48 hours, $3,600. Automation costs about 6 hours of upkeep ($450) and $50 of compute a quarter, saving $3,100. If building it costs $9,000, payback takes \( 9{,}000 \div 3{,}100 = 2.9 \) quarters. Its larger benefit is fewer failed releases, which Chapter 16 prices.

The **incident response cost** is the labor, downtime, and customer impact cost of detecting, diagnosing, and resolving a production failure. The team has 12 incidents a quarter, each needing 4 engineers for 90 minutes: \( 4 \times 1.5 \times 75 = \$450 \) of labor. An assistant that shortens diagnosis to 70 minutes lowers it to about $350, a saving of $100 per incident and $1,200 a quarter. The counter-risk is one extra incident caused by AI-generated code, which would cost the $450 plus any downtime and offset the saving of four incidents. That is why quality guardrails belong in a cost model.

!!! mascot-encourage "Eight Cost Lines Is a Lot at Once"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the sections on pipelines, deployment, and incidents feel like a pile of separate sums, that is normal, and each of them is the same move you already know: hours or minutes saved times a rate, minus the cost of the tool. Pick one line from your own team and work it through before reading on.

### Summary and Quick Check

The lifecycle has six cost lines, and coding is the largest at 30% but less than half of maintenance and testing combined. AI assistance changes them unevenly. It moves defects to earlier, cheaper phases, which is its largest effect, speeds generation, completion, pairing, review, test writing, and documentation, and lowers migration and release costs. It also adds seat and usage cost, debt that must be refactored, a regression risk that needs guardrails, and a heavier pipeline. For the 20-engineer team, the gross time value is $61,762.50 a quarter, the net after tools and debt is $49,762.50, and at 30% realization it is $6,528.75. Which of those figures a finance reader accepts depends on whether the freed time is turned into value, and on the productivity, risk, and roadmapping measures of Chapter 16.

??? note "Quick check: why is the largest saving from AI often not in the coding phase? - Click to expand"
    A defect found in requirements costs $100 to fix, while one found in testing costs $800 and one found in production $4,000. Moving defects earlier saves more than typing code faster, and coding is only 30% of the effort anyway.

??? note "Quick check: how can a positive gross saving turn negative? - Click to expand"
    Technical debt charges its interest later. If the clean-up hours for the share of changes that need it equal or exceed the hours saved writing them, the net is zero or less, as in the scenario where 10% of changes need a 3-hour refactoring against a 30-hour saving per 100.

??? note "Quick check: why is build time reduction mostly about people? - Click to expand"
    The compute is cheap, $96 a quarter in the example, but 3,000 builds that each keep an engineer waiting 4 minutes longer waste 200 hours, and half of that is lost to context switching, worth $7,500.

!!! mascot-celebration "You Can Price Every Phase of an AI-Assisted Build"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now map engineering cost across the six lifecycle phases, find where an assistant moves defects and time, and net its gross saving against tools, debt, and risk. That is a defensible software ROI, not a headline.
