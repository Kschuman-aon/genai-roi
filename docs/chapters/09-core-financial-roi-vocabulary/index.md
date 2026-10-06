---
title: Core Financial and ROI Vocabulary
description: The financial vocabulary a technologist needs to write an ROI report: costs and their behavior, time value of money, NPV, payback, IRR, break-even, cost-benefit analysis, and how shared costs are allocated.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 17:15:00
version: 1.11
---

# Core Financial and ROI Vocabulary

## Summary

Builds the core financial vocabulary a technologist needs before writing any ROI report: ROI, TCO, NPV, payback period, and basic cost-accounting terms. This chapter covers 23 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Return On Investment | 305 |
| Total Cost Of Ownership | 304 |
| Net Present Value | 228 |
| Payback Period | 227 |
| Internal Rate Of Return | 226 |
| Cost-Benefit Analysis | 225 |
| Capital Expenditure | 1 |
| Operating Expenditure | 223 |
| Sunk Cost | 222 |
| Opportunity Cost | 221 |
| Depreciation | 1 |
| Amortization | 219 |
| Discount Rate | 218 |
| Time Value Of Money | 217 |
| Break-Even Analysis | 216 |
| Marginal Cost | 215 |
| Fixed Cost | 214 |
| Variable Cost | 1 |
| Cost Allocation | 212 |
| Cost Center | 210 |
| Chargeback Model | 171 |
| Showback Model | 170 |
| Unit Economics | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

The first eight chapters taught you where generative AI costs come from and how to reduce them. A finance leader will not ask about batch sizes; they will ask whether the money is worth spending. They ask in a specific vocabulary (return, ownership cost, present value, payback) in which each word has a precise meaning that differs from its everyday sense. This chapter teaches that vocabulary from scratch, one idea at a time, using a single running example so each new term attaches to numbers you have already seen.

**The running example.** A support organization considers a generative AI assistant that drafts replies for its agents. It needs a one-time investment of $60,000 in year 0 (integration, evaluation work, and a security review). After launch it has annual running costs and produces annual benefits in the value of agent time saved. The three-year plan, in US dollars:

| Year | Benefit (agent time saved) | Running cost | Net cash flow |
|-----:|---------------------------:|-------------:|--------------:|
| 0 | 0 | $60,000 (one-time investment) | −$60,000 |
| 1 | $60,000 | $30,000 | +$30,000 |
| 2 | $80,000 | $35,000 | +$45,000 |
| 3 | $80,000 | $35,000 | +$45,000 |

All figures are illustrative. Every definition below is applied to this table.

!!! mascot-welcome "Learn to Say It in Finance"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The vocabulary in this chapter is the difference between "the assistant saves a lot of time" and "it returns 37.5% over three years with a 20-month payback." By the end you can compute each of those figures yourself and say what they do and do not mean. Every token counts, and every dollar has a date on it.

### How Costs Behave: Fixed, Variable, and Marginal

Before counting total cost, notice how each cost responds to usage, because that response decides how the economics change as you scale. A **fixed cost** does not change with the volume of usage over the period you are looking at, such as a reserved-capacity commitment or a flat license fee. A **variable cost** rises in proportion to usage, such as per-token charges that scale with the number of tokens processed. The **marginal cost** is the extra cost of one more unit of output, here one more inference request. With per-token pricing the marginal cost per request is roughly constant; with a self-hosted server it is close to zero until the server is full, at which point it jumps by the price of the next server, a pattern called a stepped fixed cost.

| Cost | Behavior | GenAI example |
|------|----------|---------------|
| Fixed | Constant regardless of volume | One reserved GPU server, $2,880 a month (Chapter 6) |
| Variable | Proportional to volume | API fees of $0.0044 per request (Chapter 7) |
| Marginal | The next unit's added cost | $0.0044 for the next API request; about $0 on a server with spare capacity |

### Capital, Operating, and the Other Names for Spending

How a cost is recorded affects how it appears in the financial statements, and finance teams care. **Operating expenditure** (opex) is ongoing spending on things consumed in the current accounting period, such as monthly cloud API fees, and is expensed immediately on the income statement. **Capital expenditure** (capex) is spending on assets that provide value over multiple periods, such as owned hardware or a multi-year license, and is recorded on the balance sheet and then spread out. The spreading has two names. **Depreciation** allocates the cost of a physical asset over its useful life; **amortization** does the same for an intangible one, such as a capitalized software license or a fine-tuning investment. In straight-line form, the yearly charge is the cost divided by the years of useful life.

Two examples. A $120,000 GPU server depreciated over 4 years charges $30,000 a year ($2,500 a month). The $60,000 integration investment in our running example, if capitalized and amortized over its 3-year life, charges $20,000 a year. Notice that the cash left the bank on day one in both cases; depreciation and amortization change when the cost *appears* on the income statement, not when it is paid. Cloud API usage is opex almost by definition, which is one reason finance teams sometimes find it easier to approve than a hardware purchase of the same size.

**Total cost of ownership** (TCO) is the complete cost of acquiring, operating, and maintaining a system over its full useful life, including direct fees and the indirect costs of infrastructure, labor, and governance. TCO is the cost side of the return calculation. For the running example over three years:

| TCO component | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|---------------|-------:|-------:|-------:|-------:|------:|
| Integration, evaluation, security review (one-time) | $60,000 | | | | $60,000 |
| Token and platform fees | | $18,000 | $22,000 | $22,000 | $62,000 |
| Maintenance labor | | $8,000 | $8,000 | $8,000 | $24,000 |
| Governance and review | | $4,000 | $5,000 | $5,000 | $14,000 |
| **Total** | **$60,000** | **$30,000** | **$35,000** | **$35,000** | **$160,000** |

The tempting mistake is to report only the token and platform fees ($62,000) as the cost, which understates the ownership cost by almost 60%. Chapter 17 and later chapters extend this list with the data, training, and risk costs that also belong in TCO.

### Costs That Should Not (and Should) Shape a Decision

Two cost ideas concern which numbers belong in a decision at all. A **sunk cost** is money already spent that cannot be recovered whatever you decide next. Standard financial reasoning says it should not influence a forward-looking choice. Suppose a pilot cost $25,000 and the forward-looking numbers for continuing now show costs of $50,000 against $40,000 of benefit. The $25,000 spent is gone either way; "we have already put $25,000 in" is not a reason to spend $50,000 for $40,000.

An **opportunity cost** is the value of the next-best alternative given up when resources go to one option. It never appears on an invoice, and a careful reviewer will still ask about it. If the two engineers who build the assistant for 3 months could instead have shipped a feature projected to earn $90,000, then $90,000 is the opportunity cost of building the assistant, and a complete case should show that the assistant beats it.

!!! mascot-tip "Ask Two Questions of Every Cost"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    For any number in a business case, ask "can I still change this by deciding differently?" (if not, it is sunk and out of the decision) and "what is the best thing this money or time could otherwise do?" (that is the opportunity cost). Two questions, and most arguments about what to include get shorter.

#### Diagram: Cost Concept Classifier

<details markdown="1">
<summary>Cost Concept Classifier</summary>
Type: microsim
**sim-id:** cost-concept-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of eight spending descriptions as capital expenditure, operating expenditure, sunk cost, or opportunity cost.

**Prerequisites:** capital expenditure, operating expenditure, sunk cost, opportunity cost (all defined in the sections "Capital, Operating, and the Other Names for Spending" and "Costs That Should Not (and Should) Shape a Decision" above).

**Evidence of Mastery:** The learner places each of eight cards in one of four bins and commits. A placement is correct when it matches the "Correct bin" column. Mastery is 7 of 8 correct on the first attempt.

**Misconceptions:** (1) A large payment is always capital expenditure. (2) Money already spent should count in a continue-or-stop decision. (3) Opportunity cost is a cash payment.

**Instructional Rationale:** Understand-level classification means assigning each case to a concept by its defining feature; the feedback names that feature for every wrong placement.

**Content:**

| # | Card shown to the learner | Correct bin | Why (shown as feedback) |
|---|---|---|---|
| 1 | The monthly bill for per-token API usage, $18,000. | Operating expenditure | Ongoing spending consumed in the current period is opex. |
| 2 | Purchase of a $120,000 GPU server that will be owned for four years. | Capital expenditure | It is an asset providing value over several periods, so it is capitalized and depreciated. |
| 3 | $25,000 already spent on a pilot that cannot be recovered, now being weighed in a continue-or-stop decision. | Sunk cost | It is spent and unrecoverable, so it should not influence the forward-looking choice. |
| 4 | The $90,000 feature the two engineers could have shipped instead. | Opportunity cost | It is the value of the next-best alternative given up, never paid out of pocket. |
| 5 | A three-year software license bought up front and amortized each year. | Capital expenditure | It provides value over several periods, so it is capitalized and spread by amortization. |
| 6 | Monthly cloud GPU rental charges. | Operating expenditure | Rental consumed this period is expensed immediately. |
| 7 | A vendor evaluation paid for last quarter that led to no purchase and cannot be refunded. | Sunk cost | The money is gone whatever is decided next. |
| 8 | The value of the next-best project the data-science team gave up to work on this one. | Opportunity cost | The forgone alternative's value is the cost of choosing this option. |

**Provenance:** Illustrative scenarios from the chapter; the sim must label them "illustrative".

**Rules:** Each card goes to exactly one of four bins: Capital expenditure, Operating expenditure, Sunk cost, Opportunity cost. Card order is shuffled with fixed seed 11. The learner commits only after all eight are placed.

**Learner Activity:**

1. The learner reads each card and places it in a bin.
2. After all eight are placed, the learner presses Commit.
3. The sim marks each card correct or incorrect and shows the "Why" text for each incorrect card.
4. One optional retry returns incorrect cards to the pool; it does not count toward mastery.

**Feedback:** One scored commitment; one practice retry. Correct cards show "Correct: <why>". Incorrect cards show the "Why" text for the correct bin. The score "n of 8 correct on the first attempt" is shown after the commitment.

**Starting State:** All eight cards are in the pool and the four bins are empty. The question on screen is "What kind of cost is each of these?"

**Chapter Anchors:** The chapter states a $120,000 GPU server depreciated over four years, a $25,000 pilot as a sunk cost, and a $90,000 forgone feature as an opportunity cost.
</details>

### Money Has a Date: Time Value, Discounting, and NPV

The ideas so far add up costs. To compare a cost today with a benefit next year you need the **time value of money**: a given amount available today is worth more than the same amount later, because today's money can be invested to earn a return. The rate that converts a future amount into today's terms is the **discount rate**. It reflects both the time value of money and the risk of the investment, and organizations usually set it, often as a minimum acceptable return. To find the **present value** of an amount \( C \) received \( t \) years from now at discount rate \( r \), divide:

\[ PV = \frac{C}{(1 + r)^t} \]

At a 10% discount rate, the $30,000 received in year 1 of the running example is worth $30,000 ÷ 1.10 = $27,273 today. The **net present value** (NPV) sums the present values of all cash flows, including the initial investment, so a positive NPV means the investment is expected to create value after accounting for time and risk:

\[ NPV = \sum_{t=0}^{T} \frac{C_t}{(1 + r)^t} \]

For the running example at 10%:

| Year | Net cash flow | Divide by (1.10)^t | Present value |
|-----:|--------------:|-------------------:|--------------:|
| 0 | −$60,000 | 1.000 | −$60,000 |
| 1 | +$30,000 | 1.100 | +$27,273 |
| 2 | +$45,000 | 1.210 | +$37,190 |
| 3 | +$45,000 | 1.331 | +$33,809 |
| **NPV** | | | **+$38,272** |

The NPV is positive, so the initiative clears a 10% requirement with $38,272 to spare. Raise the discount rate and the future cash flows shrink: at 20% the NPV is $22,292; at 40% it is $787; at 50% it is −$6,667. The rate at which NPV is exactly zero is the **internal rate of return** (IRR), the investment's implied annual percentage return. Here the NPV crosses zero at about 41%, so the IRR is about 41%: the initiative earns a 41% annual return on the money tied up. IRR lets you compare investments of different sizes on one scale, and an investment is attractive when its IRR exceeds the organization's required rate.

!!! mascot-encourage "NPV and IRR Feel Backward at First"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If discounting feels odd, you have already done it: you know a $100 payment next year is worth less than $100 today. Work the table above by hand once, and keep in mind that IRR is simply "the discount rate at which NPV hits zero."

The simplest of the time-based measures is the **payback period**: how long until cumulative benefits equal the initial cost. Cumulative net cash flow in the example is −$60,000 at year 0, −$30,000 after year 1 and +$15,000 after year 2, so the break-even falls during year 2, after 1 + $30,000 ÷ $45,000 = 1.67 years, or 20 months (assuming cash arrives evenly through the year). Payback is easy to explain to anyone, and unlike NPV it ignores the time value of money and everything after the break-even point, so an initiative with a short payback can still have a poor NPV and vice versa.

#### Diagram: NPV and Payback Calculator

<details markdown="1">
<summary>NPV and Payback Calculator</summary>
Type: microsim
**sim-id:** npv-payback-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the net present value of the running-example cash flows at a stated discount rate to within $5, and decide whether the investment should be accepted.

**Prerequisites:** time value of money, discount rate, present value, net present value, internal rate of return (all defined in the section "Money Has a Date" above).

**Evidence of Mastery:** For each of four discount rates the learner types the NPV and selects Accept or Reject before the answer is shown. The NPV is correct when within $5 of the model value, and the decision is correct when it is Accept for NPV >= 0 and Reject for NPV < 0. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A higher discount rate raises NPV. (2) A short payback means a positive NPV. (3) The initial investment should not be discounted, or should be discounted like future flows.

**Instructional Rationale:** Apply-level calculation needs a procedure practiced against a checked result. Four rates that walk the NPV from large and positive to negative let the learner see the sign change that defines the IRR.

**Content:**

Cash flows: year 0 −$60,000; year 1 +$30,000; year 2 +$45,000; year 3 +$45,000.

| # | Discount rate | Model NPV | Decision | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | 10% | $38,272 | Accept | −60,000 + 30,000 ÷ 1.10 + 45,000 ÷ 1.21 + 45,000 ÷ 1.331 = 38,272, which is positive. |
| 2 | 20% | $22,292 | Accept | 25,000 + 31,250 + 26,042 − 60,000 = 22,292, which is positive. |
| 3 | 40% | $787 | Accept | 21,429 + 22,959 + 16,399 − 60,000 = 787; positive but close to zero, since the IRR is about 41%. |
| 4 | 50% | −$6,667 | Reject | 20,000 + 20,000 + 13,333 − 60,000 = −6,667, which is negative: the rate exceeds the IRR. |

**Provenance:** Cash flows from the chapter's running example; the sim must label them "illustrative". NPV values are computed from the Rules and rounded to the dollar.

**Rules:** NPV = sum over years t = 0..3 of net cash flow ÷ (1 + rate)^t. Payback = the first point at which cumulative undiscounted net cash flow >= 0, interpolated linearly within the year (1.67 years for the base flows). IRR = the rate at which NPV = 0, found by bisection between 0% and 100% (about 41%). In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Discount rate | 0 | 60 | 5 | 10 | percent |
| Year 0 investment | 40,000 | 80,000 | 10,000 | 60,000 | USD |
| Year 1 net cash flow | 10,000 | 50,000 | 10,000 | 30,000 | USD |
| Year 2 and 3 net cash flow (each) | 20,000 | 60,000 | 5,000 | 45,000 | USD |

If cumulative cash flow never reaches 0 within three years, payback is reported as "not within 3 years".

**Learner Activity:**

1. The learner reads the discount rate and types an NPV, then selects Accept or Reject.
2. The sim shows each year's present value, the NPV, and the "Why" text.
3. After four rates, exploration unlocks: the learner changes the discount rate and the cash flows and watches the NPV, payback, and IRR update.
4. The learner should notice that payback does not change when the discount rate does, while NPV does.

**Feedback:** Four rates, fixed order, two attempts each. Correct: "Correct: NPV $<n>, <decision>." Incorrect first attempt: the "Why" text. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 4" is shown.

**Starting State:** The cash flows are shown with a discount rate of 10% and no answer given. The question on screen is "What is the NPV at a 10% discount rate, and should we accept?"

**Chapter Anchors:** The chapter states the cash flows (−$60,000, +$30,000, +$45,000, +$45,000), NPVs of $38,272 at 10%, $22,292 at 20%, $787 at 40% and −$6,667 at 50%, an IRR of about 41%, and a payback of 1.67 years (20 months).
</details>

### Break-Even: How Much Volume Pays for Fixed Costs

**Break-even analysis** finds the volume of usage at which total costs and total benefits are exactly equal, the point where an option neither gains nor loses. It differs from payback, which asks *when*; break-even asks *how much*. The classic GenAI use compares a fixed-cost option with a variable-cost one. A self-hosted server costs $2,880 a month regardless of volume (Chapter 6). An API costs $0.0044 per request. The API's monthly cost is \( 0.0044 \times N \) for \( N \) requests, so the break-even volume is:

\[ N^{*} = \frac{\text{fixed cost}}{\text{variable cost per request}} = \frac{2{,}880}{0.0044} \approx 654{,}545 \text{ requests per month} \]

Below about 655,000 requests a month the API is cheaper; above it the server is. The server can handle about 5.2 million requests a month at 2 requests per second, so break-even sits at about 13% of its capacity. Above that capacity a second server is needed and the fixed cost steps up. If the deployment needs two servers from the start, for resilience or a second region (Chapter 6), the fixed cost is $5,760 and the break-even against the API doubles to 1,309,091 requests. A fixed-cost option wins only when volume is high and steady, which is why Chapter 5 warns about reserved capacity sized for a peak.

!!! mascot-warning "A Short Payback Is Not the Whole Story"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Payback ignores both the time value of money and everything after the break-even date, so a project that returns its cost in a year and then stops can look better than one that pays back in two and earns for ten. Report payback beside NPV, never instead of it.

#### Diagram: Fixed Versus Variable Break-Even Calculator

<details markdown="1">
<summary>Fixed Versus Variable Break-Even Calculator</summary>
Type: chart
**sim-id:** break-even-calculator<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the monthly request volume at which a fixed-cost server and a per-request API cost the same, to within 1,000 requests.

**Prerequisites:** fixed cost, variable cost, marginal cost, break-even analysis (all defined above).

**Evidence of Mastery:** For each of three scenarios the learner types the break-even volume before the chart reveals it. An answer is correct when within 1,000 requests of the model value. Mastery is 3 of 3 correct on the first attempt. Dragging the volume marker is exploration, not evidence.

**Misconceptions:** (1) Break-even depends on the benefits only. (2) The break-even volume does not change when the fixed cost changes. (3) The fixed-cost option is always cheaper at high volume, regardless of its capacity.

**Instructional Rationale:** Apply-level calculation uses a one-step formula, and the chart makes the crossing visible after the learner commits a number.

**Content:**

| # | Fixed monthly cost | API cost per request | Model break-even volume | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | $2,880 | $0.0044 | 654,545 | 2,880 ÷ 0.0044 = 654,545 requests. |
| 2 | $5,760 | $0.0044 | 1,309,091 | Two servers double the fixed cost, so the break-even volume doubles: 5,760 ÷ 0.0044. |
| 3 | $2,880 | $0.0088 | 327,273 | A pricier API halves the break-even volume: 2,880 ÷ 0.0088. |

The chart plots two lines against monthly requests: the fixed cost (flat) and the API cost (rising); the crossing marks the break-even. One server handles 5,184,000 requests a month; beyond that the fixed line steps up by the server price.

**Provenance:** The $2,880 server cost is from Chapter 6 (720 hours at $4.00); the $0.0044 request cost is from Chapter 7. The $0.0088 and $5,760 values are illustrative. The sim must label all of them "illustrative".

**Rules:** Break-even volume = fixed cost ÷ API cost per request, rounded to the nearest whole request. Server capacity = 2 requests per second × 2,592,000 seconds = 5,184,000 requests per month; at volumes above capacity the fixed cost adds another server price for each further 5,184,000 requests (or part thereof). In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Fixed monthly cost | 1,000 | 12,000 | 1,000 | 2,000 | USD |
| API cost per request | 0.0010 | 0.0100 | 0.0010 | 0.0040 | USD |
| Monthly requests (marker) | 0 | 6,000,000 | 100,000 | 600,000 | requests |

**Learner Activity:**

1. The learner reads the fixed cost and the API price and types the break-even volume.
2. The sim draws the two lines and marks the crossing beside the learner's answer, with the "Why" text.
3. After three scenarios, exploration unlocks: the learner changes the two costs and drags the volume marker and reads which option is cheaper at that volume.
4. The learner should notice that halving the API price doubles the break-even volume.

**Feedback:** Three scenarios, fixed order, two attempts each. Correct: "Correct: break-even at <n> requests per month." Incorrect first attempt: the "Why" text. After a second wrong attempt the model value is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 3" is shown.

**Starting State:** Scenario 1 with the chart axes drawn but no lines. The question on screen is "At what monthly volume does a $2,880 server cost the same as an API at $0.0044 per request?"

**Chapter Anchors:** The chapter states a $2,880 monthly server cost, a $0.0044 API request cost, a break-even of 654,545 requests (about 655,000), a capacity of about 5.2 million requests per month, about 13% of capacity at break-even, and 1,309,091 for two servers.
</details>

### Putting It Together: Cost-Benefit Analysis and ROI

A **cost-benefit analysis** is a structured comparison of all expected costs and benefits of a proposed initiative, expressed in comparable (usually monetary) terms, to support a go or no-go decision. For the running example the monetary side is complete: $220,000 of benefit over three years against $160,000 of TCO. The analysis should also list benefits that are real but hard to price, such as faster first responses and lower agent turnover, so reviewers can see what the monetary figure leaves out, and the costs that are not on an invoice, such as the $90,000 opportunity cost.

The summary figure the course builds toward is **return on investment** (ROI), the net benefit of an investment as a percentage of its cost:

\[ ROI = \frac{\text{total gain} - \text{total cost}}{\text{total cost}} \]

For the running example, \( (220{,}000 - 160{,}000) \div 160{,}000 = 37.5\% \) over three years. That figure needs context to mean anything. It uses undiscounted totals; it covers a stated three-year period (a 37.5% ROI over three years is not 37.5% a year); and its denominator is TCO, so a version that counted only the $62,000 of token and platform fees would report a far higher and misleading 255% (computed as 158,000 ÷ 62,000, where the gain is the $220,000 of benefit less that $62,000). ROI shows how much you get per dollar spent; NPV shows the dollar value created after time and risk; payback shows how soon the cash returns; IRR shows the annual return rate. They answer different questions, so a good business case reports several.

| Measure | Question it answers | Running-example value |
|---------|---------------------|-----------------------|
| ROI | How much net benefit per dollar of cost? | 37.5% over three years |
| TCO | What does it cost to own? | $160,000 over three years |
| NPV | How much value after time and risk (10%)? | +$38,272 |
| IRR | What annual return does it earn? | about 41% |
| Payback | How soon is the cost recovered? | 1.67 years (20 months) |

!!! mascot-thinking "Every Ratio Hides a Choice"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice how much the headline ROI depends on what you count as cost and over what period: the same project reports 37.5% or 255% depending on the denominator. Always state the period, the discounting, and what is in TCO beside any ROI you quote.

### Who Pays: Cost Allocation, Cost Centers, and Unit Economics

The last group of terms is about assigning costs to the people who cause them. A **cost center** is an organizational unit, such as a department or product team, to which costs are tracked for accounting without a requirement that it earn revenue. **Cost allocation** is the process of assigning shared or indirect costs, such as a common vector database or platform license, to the cost center, project, or team that consumes them. The method matters, because the same total can be split very differently. Suppose a shared GenAI platform costs $30,000 a month and three teams use it:

| Team | Share of token usage | Allocation by usage | Allocation by headcount (equal thirds) |
|------|---------------------:|--------------------:|---------------------------------------:|
| Support | 60% | $18,000 | $10,000 |
| Sales | 30% | $9,000 | $10,000 |
| HR | 10% | $3,000 | $10,000 |
| **Total** | 100% | **$30,000** | **$30,000** |

Allocating by usage assigns Support $8,000 more than an equal split does, and gives each team an incentive to economize on what it actually consumes. Two models decide what happens once costs are allocated. A **chargeback model** formally bills the allocated cost to the consuming cost center's budget, creating direct accountability. A **showback model** reports the same allocated cost to each team without moving any budget, giving visibility and influence at lower friction. Many organizations start with showback to build trust in the numbers and move to chargeback once teams believe them. Chapter 14 returns to this in detail.

Finally, **unit economics** is the analysis of revenue and cost per unit, such as per ticket, per user, or per query, to see whether an activity pays at the level of a single unit before scale and fixed costs enter. In the running example, year 1 has 10,000 tickets a month. Running cost is $30,000 ÷ 12 = $2,500 a month, or $0.25 per ticket, and the benefit is $60,000 ÷ 12 = $5,000 a month, or $0.50 per ticket, leaving a $0.25 margin per ticket. Chapter 10 builds the per-unit measures (cost per query, cost per user, cost per transaction) on this idea.

### Summary and Quick Check

Costs are fixed, variable, or marginal, recorded as opex or capex, and spread by depreciation or amortization; TCO adds them all across the system's life, while sunk costs stay out of the decision and opportunity costs belong in it. The time value of money, through a discount rate, turns future cash into present value, which gives NPV and its zero point, IRR; payback and break-even answer when and how much; cost-benefit analysis assembles the case and ROI summarizes it. Cost allocation, chargeback, and showback say who pays, and unit economics checks that each unit earns its keep. Chapter 10 uses this vocabulary to build a business case and forecast.

??? note "Quick check: why can a project have a short payback and a negative NPV? - Click to expand"
    Payback counts only how long cumulative cash takes to recover the cost and ignores both discounting and anything after the break-even date. A project that recovers its cost quickly but earns little afterward, or whose cash arrives far enough in the future that discounting shrinks it, can have a short payback and still a negative NPV.

??? note "Quick check: what is the difference between chargeback and showback? - Click to expand"
    Both attribute shared cost to consuming teams. Chargeback moves the money by billing the team's budget; showback only reports the cost to the team and moves no budget, so it is lower friction but carries less accountability.

!!! mascot-celebration "You Can Now Speak Finance"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can compute ROI, TCO, NPV, IRR, payback, and a break-even volume for one initiative, and say what each does and does not tell a finance leader. That is the vocabulary every later chapter in this half of the book builds on.
