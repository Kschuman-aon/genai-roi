---
title: Vendor Pricing and Licensing Economics
description: How vendors price models and tools, per token, per seat, by commitment, by enterprise agreement, and how to compare offers on a total-cost basis that includes quality, support, switching, and the cost of staying flexible.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 15:03:00
version: 1.11
---

# Vendor Pricing and Licensing Economics

## Summary

Analyzes vendor and model pricing structures, licensing models, and the total-cost frameworks used to compare vendor offers on equal footing. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Build Vs Buy Decision | 40 |
| Open-Source Vs Proprietary Cost | 39 |
| Vendor Lock-In Risk | 1 |
| Multi-Vendor Strategy | 37 |
| Model Benchmarking For Selection | 1 |
| Vendor Pricing Comparison | 35 |
| Licensing Cost Structure | 34 |
| Enterprise License Agreement | 33 |
| Usage-Based Licensing | 32 |
| Seat-Based Licensing | 1 |
| Committed Spend Discount | 30 |
| Volume Discount Negotiation | 29 |
| Contract Term Length Tradeoff | 28 |
| Vendor SLA Review | 1 |
| Vendor Support Cost | 26 |
| Total Vendor Cost Model | 25 |
| Switching Cost Estimate | 24 |
| Model Portability | 23 |
| API Abstraction Layer | 22 |
| Multi-Model Orchestration | 21 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)
- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)

---

Chapters 17 and 18 priced what a team builds and runs itself. Most of the spend in a GenAI program goes somewhere else: to a vendor, under a price sheet and a contract. This chapter prices the vendor side with the support assistant of Chapters 9 and 10 in its second year, 960,000 queries a year, or 80,000 a month. Each query sends about 3,000 input tokens and receives about 800 output tokens, so the month uses 240 million input and 64 million output tokens. Chapter 10 modeled the fees as a round $0.0167 a query. Here they are rebuilt from vendor rate cards, which differ slightly, and the rate-card figures are the ones to use when comparing vendors. All vendors, prices, and accuracies are illustrative.

!!! mascot-welcome "A Price Sheet Is Not a Cost"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The vendor with the lowest price per token is often not the vendor with the lowest bill, and the lowest bill is often not the lowest cost. By the end of this chapter you can compare offers on a total basis, choose a licensing model that fits your usage, and negotiate with numbers in hand. Every token counts, and so does every clause.

### Whose Model, and Who Runs It

Two choices come before any price comparison. The **build vs buy decision** is the choice between running a model on infrastructure the organization operates and paying a vendor to run it. Buying converts the cost to a variable one, per query. Building converts it to a fixed one, the servers and the people to run them. For the assistant, buying from vendor A, at $2.50 per million input tokens and $10.00 per million output, costs \( 3{,}000 \times 2.50 \div 10^6 + 800 \times 10.00 \div 10^6 = \$0.0155 \) a query, $14,880 a year. Building means one GPU server at $4.00 an hour, \( 4.00 \times 8{,}640 = \$34{,}560 \), and 10 hours a month of operations work, $10,800, a fixed $45,360 a year. The break-even volume is \( 45{,}360 \div 0.0155 = 2.93 \) million queries a year, about 244,000 a month, three times today's volume. The server can in fact produce 800 tokens a second, over 2 billion a month, so at today's volume it would run at about 3% of its capacity. Building pays only when volume fills the fixed cost.

The **open-source vs proprietary cost** comparison is the comparison of models whose weights are freely licensed with models available only through a vendor's service. An open-weight license costs nothing, but running the model is not free, as the build figures show. The usual middle path is an open-weight model on a managed host, vendor C, at $0.90 per million tokens in and out: \( 3{,}000 \times 0.90 \div 10^6 + 800 \times 0.90 \div 10^6 = \$0.00342 \) a query, $3,283 a year, 78% below vendor A. Whether that saving is real depends on whether C answers well enough, which the next section measures.

The **vendor lock-in risk** is the risk that the cost and effort of leaving a vendor become high enough that the vendor can raise prices or reduce service without losing the customer. It is the gap between what the vendor could charge and what the customer would pay to leave. The switching cost estimate below puts that exit cost at $12,040 for the assistant. Over a 3-year horizon that is $4,013 a year, 27% of vendor A's $14,880, so if an equal-quality alternative exists, A can raise its price by up to about that much before moving pays.

### Choosing a Model: Benchmarks and Price Comparison

The **model benchmarking for selection** is the evaluation of candidate models on the organization's own task, using a gold set, a held-out set of examples with known right answers as in Chapter 17, and recording accuracy and cost together. Published leaderboards measure someone else's task. Suppose the three candidates are run on the same tickets, with measured accuracies of 92% for A, 85% for B, a cheaper proprietary model at $0.50 and $2.00 per million tokens, and 89% for C. A sample of 500 tickets gives each score a margin of about ±2.6 points at 95% confidence, so the 3-point gap between A and C is not settled; the 2,000-ticket gold set of Chapter 17 narrows the margin to ±1.3.

The **vendor pricing comparison** puts the offers on one basis, the cost of the same workload, instead of the rate on each price sheet. Rates quoted per million tokens are not comparable until the token counts per query are fixed, and vendors tokenize text differently, as Chapter 14 showed: if B counts 12% more tokens for the same text, its $2,976 becomes \( 2{,}976 \times 1.12 = \$3{,}333 \). The token-only comparison for the assistant is as follows.

| Vendor | Cost per query | Monthly | Annual | Accuracy | Token cost per correct answer |
|--------|---------------:|--------:|-------:|---------:|------------------------------:|
| A, proprietary large | $0.01550 | $1,240 | $14,880 | 92% | $0.01685 |
| B, proprietary small | $0.00310 | $248 | $2,976 | 85% | $0.00365 |
| C, open-weight, managed | $0.00342 | $274 | $3,283 | 89% | $0.00384 |

B looks best on cost per correct answer, and A looks worst, at more than four times B. That reading omits the cost of the wrong answers, which the total vendor cost model below adds.

!!! mascot-warning "Cost Per Token Hides the Cost of Being Wrong"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A cheap model that is wrong more often moves its cost to your agents, who fix the answers. Always put a price on a wrong answer before ranking vendors, and say what it is.

### How Vendors Charge

The **licensing cost structure** is the set of fee components that together make up a vendor's price for a product. Six appear repeatedly: a platform or subscription fee, charged whatever the use; a per-seat fee for each named user; a usage fee per token, request, or compute hour; a support fee for a faster or more senior response; an overage fee for use above an agreed quantity; and a one-time implementation fee. A quote is read by listing which of these it contains, since two offers with the same headline rate can differ by the fixed fees around it.

**Seat-based licensing** charges a fixed fee per named user per period, whether or not the user is active. The coding assistant of Chapter 15 is priced at $19 a seat a month, $228 a year, so 20 seats cost $4,560. Cost is predictable and does not rise with heavy use, but idle seats are paid for in full: Chapter 16's 3 idle seats cost $684 a year. **Usage-based licensing** charges for what is consumed, here tokens. It has no minimum, and it follows demand, which makes it right for a pilot and uncomfortable for a budget. If the assistant's volume tripled in a month, vendor A's bill would go from $1,240 to $3,720.

The **enterprise license agreement** is a negotiated, usually multi-year contract giving an organization a defined entitlement, such as up to 400 seats, for a fixed annual fee. Suppose the fee is $60,000 a year for up to 400 seats of the coding assistant. At the $228 list price, 300 active seats cost $68,400 and the agreement saves $8,400, or $200 a seat. The agreement breaks even at \( 60{,}000 \div 228 = 263.2 \) seats, so from 264 seats it is cheaper. With 200 active seats the list price is $45,600 and the agreement costs $14,400 more, $300 a seat, because the unused entitlement is paid for.

The **committed spend discount** is a reduction in unit prices in return for a promise to spend at least a stated amount over the contract period. Suppose vendor A offers 15% off in exchange for a $12,000 annual commitment. The organization pays the larger of $12,000 and 85% of its list-price usage. At the expected $14,880 of list usage it pays $12,648, saving $2,232. If usage falls to $10,000 of list it still pays $12,000, $2,000 more than list, and at $8,000 it pays $4,000 more. The commitment saves money only when list usage will exceed it, so set the commitment below the usage that is almost certain, not at the forecast.

!!! mascot-tip "Commit to the Floor, Not the Forecast"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Take the lowest monthly usage of the last 12 months, multiply by 12, and commit to no more than that. A commitment is paid even in a month when use falls, so the floor is the amount you can be sure of.

The **volume discount negotiation** is the bargaining over tiered or negotiated reductions in unit price as the quantity bought rises. Suppose input tokens cost $2.50 per million for the first 100 million a month, $2.25 for the next 100 million, and $2.00 above 200 million. The assistant's 240 million input tokens cost \( 250 + 225 + 40 \times 2.00 = \$555 \), against $600 flat, and with the unchanged $640 of output the month is $1,195 instead of $1,240. The tiers save $540 a year, 3.6%. The larger levers are the commitment above and the forecast, since vendors discount for growth they can see, so bring the volume plan, not just the current volume.

The first specification lets the learner match situations to licensing models.

#### Diagram: Licensing Model Matcher

<details markdown="1">
<summary>Licensing Model Matcher</summary>
Type: microsim
**sim-id:** licensing-model-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate eight purchasing situations that call for seat-based licensing, an enterprise license agreement, a committed spend discount, or usage-based licensing by applying the chapter's decision rule.

**Prerequisites:** seat-based licensing, usage-based licensing, enterprise license agreement, committed spend discount (defined in the section "How Vendors Charge" above).

**Evidence of Mastery:** For each of eight situations the learner commits one of four licensing models before the answer is shown. A model is correct when it matches the correct model in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A discount for committing is always worth taking. (2) An enterprise agreement suits any large number of users. (3) A short history of steady usage is enough to commit.

**Instructional Rationale:** Analyze-level work separates cases by the features that matter. Situations placed on each side of the 264-seat and 6-month boundaries force the learner to apply the rule exactly instead of choosing by size.

**Content:**

Rule: If the product is priced per seat and active seats >= 264, choose Enterprise license. If priced per seat and active seats < 264, choose Seat-based. If priced by usage, the history is >= 6 months, and (highest month − lowest month) ÷ average month <= 0.10, choose Committed spend. Otherwise, for usage-priced products, choose Usage-based. The average month is the midpoint of the lowest and highest month.

| # | Situation | Correct model | Why (shown as feedback) |
|---|---|---|---|
| 1 | A coding assistant priced per seat, with 20 active seats | Seat-based | 20 seats is below 264, so the enterprise fee of $60,000 would cost more than 20 × $228 = $4,560. |
| 2 | A coding assistant priced per seat, with 263 active seats | Seat-based | 263 × 228 = $59,964, which is less than the $60,000 enterprise fee. |
| 3 | A coding assistant priced per seat, with 264 active seats | Enterprise license | 264 × 228 = $60,192, which is more than the $60,000 enterprise fee. |
| 4 | A coding assistant priced per seat, with 300 active seats | Enterprise license | 300 × 228 = $68,400, which is $8,400 more than the enterprise fee. |
| 5 | A model priced per token, 12 months of history, lowest month 78,000 queries and highest month 82,000 | Committed spend | The spread is (82,000 − 78,000) ÷ 80,000 = 0.05, which is <= 0.10, over >= 6 months. |
| 6 | A model priced per token, 12 months of history, lowest month 30,000 queries and highest month 90,000 | Usage-based | The spread is (90,000 − 30,000) ÷ 60,000 = 1.00, which is above 0.10, so a commitment would be paid in the low months. |
| 7 | A model priced per token, 4 months of history, lowest month 79,000 queries and highest month 81,000 | Usage-based | The spread is small, but 4 months is below 6, so the pattern may not hold. |
| 8 | A model priced per token, 6 months of history, lowest month 80,000 queries and highest month 88,000 | Committed spend | The spread is (88,000 − 80,000) ÷ 84,000 = 0.095, which is <= 0.10, over exactly 6 months. |

**Provenance:** The seat price of $228 a year and the enterprise fee of $60,000 come from the chapter section "How Vendors Charge". The query volumes are illustrative, and the sim must label the situations "illustrative".

**Rules:** Apply the rule in Content in the order written. Seat comparisons use >= 264 for the enterprise agreement. Committed spend requires history >= 6 months and a spread <= 0.10. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Pricing basis | Seat | Usage | one choice | Seat | choice |
| Active seats | 1 | 400 | 1 | 20 | seats |
| Months of history | 1 | 24 | 1 | 12 | months |
| Lowest month | 20,000 | 100,000 | 1,000 | 78,000 | queries |
| Highest month | 20,000 | 100,000 | 1,000 | 82,000 | queries |

The highest month is never below the lowest month. Active seats apply only to the seat basis, and the history and monthly range apply only to the usage basis.

**Learner Activity:**

1. The learner reads situation 1, chooses one of the four licensing models, and presses Commit.
2. The sim shows the correct model, the clause of the rule that decided it, and the "Why" text.
3. After eight situations, exploration unlocks: the learner changes the pricing basis and its quantities and watches the model chosen by the rule update.
4. The learner should notice that moving active seats from 263 to 264 changes the model, and that moving the history from 5 to 6 months can change it.

**Feedback:** Eight situations, fixed order, two attempts each. Correct: "Correct: <model>." Incorrect on the first attempt: the "Why" text without the model. After a second wrong attempt the model is shown and the situation counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The rule is shown with situation 1 and no model chosen. The question on screen is "Which licensing model does this situation call for?"

**Chapter Anchors:** The chapter states $228 per seat a year, a $60,000 enterprise fee for up to 400 seats, a break-even of 263.2 seats so that 264 seats is the first count at which the agreement is cheaper, and a commitment saving money only when list usage exceeds the commitment.
</details>

### The Contract

The **contract term length tradeoff** is the choice between a short contract, renewed at the price then current, and a long one that locks in a discount. It is a bet on how fast prices move. Model prices have fallen quickly, and a 3-year lock fixes today's price. Vendor A offers 20% off for 3 years. With list usage of $14,880 a year and list prices falling 20% a year, 1-year renewals cost \( 14{,}880 + 11{,}904 + 9{,}523 = \$36{,}307 \), against \( 3 \times 14{,}880 \times 0.80 = \$35{,}712 \) locked, so the lock wins by $595. If prices fall 30% a year, renewals cost $32,587 and the lock loses by $3,125. The break-even decline for a 20% discount is 21.5% a year: below it the lock wins, and above it renewals win. With a 30% discount the break-even is 33.8%.

!!! mascot-thinking "A Long Contract Is a Bet Against Falling Prices"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the discount you are offered is a known number and the price decline you are betting against is an estimate. Ask what annual decline would make the lock a loss, and whether you believe the market will fall faster than that.

The second specification lets the learner choose a term.

#### Diagram: Contract Term Chooser

<details markdown="1">
<summary>Contract Term Chooser</summary>
Type: microsim
**sim-id:** contract-term-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of six combinations of annual price decline and 3-year discount, whether three 1-year renewals or one 3-year lock has the lower 3-year cost.

**Prerequisites:** contract term length tradeoff, list price, price decline, 3-year discount (defined in the section "The Contract" above).

**Evidence of Mastery:** For each of six combinations the learner commits 1-year renewals or 3-year lock before the answer is shown. A choice is correct when it has the lower 3-year total in the Content table. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A bigger discount always favors the longer contract. (2) Price declines do not matter if the discount is more than 10%. (3) The best term is the same for every vendor.

**Instructional Rationale:** Evaluate-level work weighs two options against a criterion. Combinations on both sides of the break-even decline show that the answer depends on a market estimate, and not on the size of the discount alone.

**Content:**

List usage is $14,880 in year 1 and volume is constant. Three 1-year renewals pay list price each year, and list price falls by the price decline each year, so the total is 14,880 + 14,880 × (1 − decline) + 14,880 × (1 − decline)². The 3-year lock pays 3 × 14,880 × (1 − discount).

| # | Annual price decline | 3-year discount | Three 1-year renewals | 3-year lock | Lower | Why (shown as feedback) |
|---|---:|---:|---:|---:|---|---|
| 1 | 20% | 20% | $36,307 | $35,712 | 3-year lock | The decline is just below the 21.5% break-even for a 20% discount, so the lock wins by $595. |
| 2 | 30% | 20% | $32,587 | $35,712 | 1-year renewals | The decline is above 21.5%, so renewals win by $3,125. |
| 3 | 10% | 20% | $40,325 | $35,712 | 3-year lock | Slow declines make renewals dear, and the lock wins by $4,613. |
| 4 | 20% | 30% | $36,307 | $31,248 | 3-year lock | A 30% discount has a 33.8% break-even, so the lock wins by $5,059. |
| 5 | 40% | 30% | $29,165 | $31,248 | 1-year renewals | The decline is above 33.8%, so renewals win by $2,083. |
| 6 | 0% | 15% | $44,640 | $37,944 | 3-year lock | With no decline any discount beats renewing at list, by $6,696. |

**Provenance:** Combination 1 and the 21.5% and 33.8% break-evens come from the chapter section "The Contract". Combinations 2 to 6 are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Renewals total = 14,880 × (1 + (1 − decline) + (1 − decline)²). Lock total = 3 × 14,880 × (1 − discount). The lower total is correct, and no combination has a tie. Dollars are shown to the whole dollar. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Annual price decline | 0 | 40 | 5 | 20 | percent |
| 3-year discount | 10 | 30 | 5 | 20 | percent |

**Learner Activity:**

1. The learner reads combination 1, chooses 1-year renewals or 3-year lock, and presses Commit.
2. The sim shows both totals, which is lower, and the "Why" text.
3. After six combinations, exploration unlocks: the learner changes the decline and the discount and watches the two totals and the lower term update.
4. The learner should notice that at a 20% discount the choice flips between a 20% and a 25% decline.

**Feedback:** Six combinations, fixed order, two attempts each. Correct: "Correct: <term>, lower by <difference>." Incorrect on the first attempt: the "Why" text without the term. After a second wrong attempt the term is shown and the combination counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** Combination 1 is shown with no term chosen. The question on screen is "Which term has the lower 3-year cost?"

**Chapter Anchors:** The chapter states list usage of $14,880, renewals of $36,307 against a lock of $35,712 at a 20% decline and 20% discount, $32,587 at a 30% decline, and break-even declines of 21.5% for a 20% discount and 33.8% for a 30% discount.
</details>

Two clauses in any contract carry a price that is easy to overlook. The **vendor SLA review** is the reading of a vendor's service level agreement, its promised availability, response times, and the remedies if it misses them, against what an outage costs the organization. A 99.9% availability promise allows \( 30 \times 24 \times 60 \times 0.001 = 43.2 \) minutes of downtime a month. The remedy is usually a service credit, say 10% of the month's fee, $124 on vendor A's $1,240. Suppose an hour of full outage costs the support floor $1,500 of idle agent time. A 4-hour outage costs $6,000 and earns a $124 credit. The credit is a signal, not insurance, so what matters in the review is the promised availability and the resilience the organization builds around it.

The **vendor support cost** is the fee for faster or more senior help, and its worth is the downtime and delay it avoids. Premium support at $3,600 a year promises a 4-hour response against 24 hours. With 3 incidents a year, each 20 hours shorter, 60 hours at a $150 an hour cost of degraded service is $9,000 avoided for a net $5,400. The same calculation says to skip it for a workload where an hour of degraded service costs $50, since the 60 hours are then worth only $3,000.

### The Total Cost of a Vendor

The **total vendor cost model** is the structured estimate of everything a vendor choice costs per year: usage fees, support, integration spread over the contract, and the cost of the vendor's wrong answers. It is the comparison the price sheet cannot give. Suppose a wrong answer costs $0.50, about 40 seconds of an agent's time at $45 an hour. Integration costs $5,400 for an API and $10,800 for self-hosting, spread over 3 years. Option D is the self-hosted 8-billion-parameter model of the build calculation, with 87% accuracy.

| Vendor | Usage fees | Support | Integration | Wrong answers | Annual total |
|--------|-----------:|--------:|------------:|--------------:|-------------:|
| A, 92% accurate | $14,880 | $3,600 | $1,800 | $38,400 | $58,680 |
| B, 85% accurate | $2,976 | $0 | $1,800 | $72,000 | $76,776 |
| C, 89% accurate | $3,283 | $1,200 | $1,800 | $52,800 | $59,083 |
| D, self-hosted, 87% accurate | $45,360 | $0 | $3,600 | $62,400 | $111,360 |

The vendor with the highest price per token, A, has the lowest total, $58,680, and C is within $403 of it. B, the cheapest per token, is $18,096 dearer than A, since its 15% error rate costs $72,000 against A's $38,400. The ranking depends on the price of a wrong answer: at $0.25 each C is cheapest, at $32,683 against A's $39,480, and at $1.00 A is cheapest by a wide margin.

!!! mascot-thinking "Quality Is the Biggest Line on the Vendor Bill"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that usage fees are between 4% and 41% of the totals, while the wrong answers are 56% to 94%. When the cost of an error is the largest term, a one-point accuracy gain is worth more than a large cut in the rate per token.

The third specification lets the learner build the comparison.

#### Diagram: Vendor Total Cost Calculator

<details markdown="1">
<summary>Vendor Total Cost Calculator</summary>
Type: microsim
**sim-id:** vendor-total-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the usage fees, cost per correct answer, and annual total vendor cost for vendors A, B, and C for the 960,000-query support assistant, to within the tolerance stated for each item.

**Prerequisites:** vendor pricing comparison, total vendor cost model, cost per correct answer, cost of a wrong answer (defined in the sections "Choosing a Model: Benchmarks and Price Comparison" and "The Total Cost of a Vendor" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) The vendor with the lowest price per token has the lowest total cost. (2) Support and integration are the main differences between vendors. (3) The cheapest vendor is the same at every cost of a wrong answer.

**Instructional Rationale:** Apply-level calculation needs a procedure and an immediate check. Moving from a price per token to a total that includes wrong answers shows the ranking changing, and the exploration shows it changing again with the price of an error.

**Content:**

Fixed inputs: each query has 3,000 input tokens and 800 output tokens, and the assistant handles 960,000 queries a year. A wrong answer costs $0.50. Integration is $5,400 spread over 3 years, $1,800 a year, for each vendor.

| Vendor | Input price per million | Output price per million | Accuracy | Annual support |
|---|---:|---:|---:|---:|
| A | $2.50 | $10.00 | 92% | $3,600 |
| B | $0.50 | $2.00 | 85% | $0 |
| C | $0.90 | $0.90 | 89% | $1,200 |

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Vendor A cost per query | $0.0155 | 0.0001 | 3,000 × 2.50 ÷ 1,000,000 + 800 × 10.00 ÷ 1,000,000 = 0.0155. |
| 2 | Vendor A annual usage fees | $14,880 | 1 | 0.0155 × 960,000 = 14,880. |
| 3 | Vendor C annual usage fees | $3,283 | 1 | (3,000 × 0.90 + 800 × 0.90) ÷ 1,000,000 = 0.00342, and 0.00342 × 960,000 = 3,283. |
| 4 | Vendor B token cost per correct answer | $0.0036 | 0.0001 | Cost per query 0.0031 ÷ accuracy 0.85 = 0.00365. |
| 5 | Vendor A annual cost of wrong answers | $38,400 | 1 | 960,000 × (1 − 0.92) × 0.50 = 38,400. |
| 6 | Vendor A annual total | $58,680 | 1 | 14,880 + 3,600 + 1,800 + 38,400 = 58,680. |
| 7 | Vendor C annual total | $59,083 | 1 | 3,283 + 1,200 + 1,800 + 52,800 = 59,083. |
| 8 | Vendor B annual total | $76,776 | 1 | 2,976 + 0 + 1,800 + 72,000 = 76,776. |

**Provenance:** All values come from the chapter sections "Choosing a Model: Benchmarks and Price Comparison" and "The Total Cost of a Vendor". The sim must label the data "illustrative".

**Rules:** Cost per query = (3,000 × input price + 800 × output price) ÷ 1,000,000. Usage fees = cost per query × queries. Cost of wrong answers = queries × (1 − accuracy) × cost of a wrong answer. Annual total = usage fees + support + 1,800 + cost of wrong answers. The vendor with the lowest annual total is marked. Dollars are shown to the whole dollar for totals and to four decimals for cost per query. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Cost of a wrong answer | 0.25 | 1.00 | 0.25 | 0.50 | dollars |
| Queries per year | 240,000 | 2,880,000 | 240,000 | 960,000 | queries |

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the cost of a wrong answer and the number of queries and watches the three totals and the lowest-cost vendor update.
4. The learner should notice that the lowest-cost vendor is C at $0.25 a wrong answer and A at $0.50 and $1.00.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What does one query cost on vendor A?"

**Chapter Anchors:** The chapter states $0.0155 per query and $14,880 a year for vendor A, $3,283 for vendor C, totals of $58,680, $76,776, and $59,083 for A, B, and C, a $0.50 cost of a wrong answer, and C cheapest at $0.25 with totals of $32,683 for C and $39,480 for A.
</details>

### Leaving, Staying Flexible, and Mixing Vendors

The **switching cost estimate** is the estimated one-time cost of moving a workload from one vendor to another. For the assistant, moving from A to C takes 60 hours to rework prompts, $5,400; 20 hours to re-run the evaluation, $1,800; 40 hours of integration changes, $3,600; and a month of paying both vendors while the new one is checked, $1,240. The total is $12,040. This is the exit cost that bounds a vendor's pricing power, as the lock-in section showed, and it should be estimated before signing, when the answer can still change what is signed.

The **model portability** is the degree to which prompts, evaluation sets, fine-tuned models, and data can be moved to another model without rework. Prompts written around one vendor's special features, a fine-tuned model whose weights cannot be exported, and evaluation sets that were never saved all lower it. Prompts written as plain, vendor-neutral templates, with a saved evaluation set, cut the rework from 60 hours to 24, saving \( 36 \times 90 = \$3{,}240 \) and lowering the switching cost to $8,800. A model fine-tuned on a vendor's platform adds the cost of retraining elsewhere, about $3,630 per retraining in Chapter 17, plus the labeled data, which must be kept in the organization's hands.

An **API abstraction layer** is a thin internal interface between the applications and the vendors' interfaces, so that applications call one internal function and the layer translates for each vendor. Building it takes 80 hours, $7,200, and keeping it current 2 hours a month, $2,160 a year. It reduces the integration work of a switch from 40 hours to 8, saving $2,880. On that saving alone it does not pay: after one switch the organization is still $4,320 behind. It pays when it is used for the two ideas that follow.

The **multi-vendor strategy** is the use of two or more vendors for the same kind of work, to gain bargaining leverage and resilience. It has real costs: a second integration, a second contract and support fee, and a split volume that loses tier discounts and delays any commitment discount. Suppose C is kept as a failover for A, costing $1,200 of support and $1,800 of integration a year, $3,000. If A is unavailable 6 hours a year, the failover avoids \( 6 \times 1{,}500 = \$9{,}000 \) of idle agent time, a net $6,000, and the same figures say it is not worth doing for a workload where an outage hour costs $300.

The **multi-model orchestration** is the routing of each request to the model best suited to it, usually a cheap one first and an expensive one for hard cases, as in Chapter 7's cascade. Suppose 80% of queries go to B and 20% to A. The token cost is \( 960{,}000 \times (0.8 \times 0.0031 + 0.2 \times 0.0155) = \$5{,}357 \), against $14,880, a saving of $9,523. Suppose the mix is 91% accurate, a point below A alone, which costs \( 960{,}000 \times 0.01 \times 0.50 = \$4{,}800 \) more in wrong answers. The net is $4,723, and the abstraction layer costs \( 7{,}200 \div 3 + 2{,}160 = \$4{,}560 \) a year, so the net is $163. At three times the volume the token saving is $28,570, the quality cost $14,400, and the net after the layer $9,610. Flexibility is a fixed cost, and it needs volume to pay.

### Summary and Quick Check

Vendor spending begins with two choices: whether to build or buy, where building needs about 244,000 queries a month to beat buying at $14,880 a year, and whether open weights are cheaper once someone has to run them. Benchmarks on the organization's own tasks, and a price comparison that normalizes tokens, replace the headline rate. Vendors charge by seat, usage, enterprise agreement, or commitment, and the right one follows the pattern of use: 264 seats for an agreement to pay, and a commitment set at the floor of usage. Term length is a bet on price declines, with a break-even of 21.5% a year for a 20% discount. SLA credits do not insure against outages, and support pays only where an hour of downtime is costly. The total vendor cost model, with wrong answers at $0.50, makes vendor A the cheapest at $58,680 though its token price is five times B's. Leaving costs $12,040, portability and an abstraction layer lower that, and multi-vendor and multi-model designs pay when volume covers their fixed costs. Chapter 20 turns from pricing to the process of selecting a vendor.

??? note "Quick check: why can the most expensive vendor per token have the lowest total cost? - Click to expand"
    The wrong answers cost more than the tokens. Vendor A's 8% error rate costs $38,400 a year, against $72,000 for B's 15%, so A's higher usage fees of $14,880 are outweighed by the quality gap.

??? note "Quick check: why does a 3-year lock lose when prices fall 30% a year? - Click to expand"
    The 20% discount is fixed at today's price, while renewals follow the market down. At a 30% decline the renewals cost $32,587 against $35,712 locked, because the decline is above the 21.5% break-even.

??? note "Quick check: why does a committed spend discount cost money in a quiet month? - Click to expand"
    The commitment is paid whatever is used. With a $12,000 commitment and only $10,000 of list usage, the organization pays $12,000, which is $2,000 more than it would have paid at list price.

!!! mascot-celebration "You Can Compare Vendors on What They Really Cost"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now price build against buy, match a licensing model to a usage pattern, test a contract term against price declines, and rank vendors on total cost including the price of a wrong answer. That is a comparison finance will accept.
