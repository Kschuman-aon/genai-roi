---
title: Cost Attribution, Governance, and Observability Maturity
description: Cost views by department, project, user, and feature; reconciliation against vendor invoices across providers; and the governance, alerting, lineage, and maturity practices that keep cost metrics trustworthy.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 14:55:00
version: 1.11
---

# Cost Attribution, Governance, and Observability Maturity

## Summary

Covers cost attribution across users, features, and departments, plus the data governance and instrumentation-maturity practices that keep cost data trustworthy. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Departmental Cost Rollup | 20 |
| Project-Level Cost Tracking | 19 |
| Per-User Cost Tracking | 18 |
| Per-Feature Cost Tracking | 17 |
| Vendor Invoice Reconciliation | 16 |
| Billing API Integration | 15 |
| Cost Data Normalization | 14 |
| Cross-Provider Cost Aggregation | 13 |
| Alerting Threshold Design | 1 |
| Dashboard Refresh Cadence | 11 |
| Data Governance For Metrics | 10 |
| Audit Trail For Spend | 9 |
| Metric Definition Documentation | 8 |
| Single Source Of Truth | 7 |
| Instrumentation Maturity Model | 6 |
| Cost Observability Roadmap | 5 |
| Telemetry Sampling Bias | 1 |
| Real-Time Alert Fatigue | 3 |
| Data Lineage For Cost Metrics | 2 |
| Instrumentation Ownership Model | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Telemetry, Logging, and Cost Dashboards](../13-telemetry-logging-cost-dashboards/index.md)

---

Chapter 13 ended with the shared platform's $30,000 a month attributed to three teams from measured data: Support $17,640, Sales $10,620, and HR $1,740. That is one view, by team. A finance partner will want the same money by department, a product owner will want it by feature, and an auditor will want to know who changed the allocation rules. Then comes the harder problem, trust: two reports that disagree by 2% end the conversation about cost and start one about whose report is right. This chapter slices the data further, reconciles it against what vendors bill, and adds the governance that makes the numbers believable. Every figure is illustrative and continues the shared-platform example.

!!! mascot-welcome "One Dataset, Many Honest Views"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Everyone asks the same question, where did the money go, from a different angle. By the end of this chapter you can answer by department, project, user, or feature from one dataset, prove it matches the invoice, and show how mature your measurement is. Every token counts, and now each one has an owner.

### Slicing the Spend: Department, Project, User, and Feature

All four views are the same rows of the Chapter 13 fact table grouped by a different tag, which is why a good taxonomy pays off.

A **departmental cost rollup** is the aggregation of costs from teams, projects, and features up to the department or business unit that owns them, following the organization's reporting hierarchy. Spend is recorded at the lowest level, the feature, and added upward: features into projects, projects into teams, teams into departments. A rollup is correct only when every cost lands in exactly one branch of the hierarchy, which is why an unallocated bucket must be shown, not hidden. In the example, Support's $17,640 rolls up to the Customer Operations department, Sales' $10,620 to Revenue, and HR's $1,740 to People.

**Per-feature cost tracking** is the measurement of the cost of each product capability, which links spend to the unit of value a user actually sees. Support runs three features on the platform with the following request volumes and measured token costs, and the $6,840 of Support's shared cost is divided by each feature's share of Support's requests.

| Feature | Requests | Token cost per request | Direct cost | Shared cost | Total | All-in cost per request |
|---------|---------:|-----------------------:|------------:|------------:|------:|------------------------:|
| reply-draft | 2,400,000 | $0.0035 | $8,400 | $4,560 | $12,960 | $0.0054 |
| ticket-triage | 900,000 | $0.0020 | $1,800 | $1,710 | $3,510 | $0.0039 |
| knowledge-search | 300,000 | $0.0020 | $600 | $570 | $1,170 | $0.0039 |
| **Support total** | **3,600,000** | | **$10,800** | **$6,840** | **$17,640** | |

Reply-draft is 73% of Support's spend, so a 10% saving there is worth more than eliminating knowledge search. Because the all-in cost per request is a unit cost, it feeds directly into the unit economics of Chapter 10.

**Project-level cost tracking** is the recording and reporting of costs against a defined project with a start, an end, and a budget, usually by tagging every cost with a project identifier. It answers a different question from the feature view: not how much a capability costs to run, but whether a bounded piece of work is on budget. The $60,000 assistant investment of Chapters 9 to 11 is a project. After four of five months, integration has cost $28,000, evaluation work $12,000, and the security review $9,500, so $49,500 is spent and $10,500 remains planned. The forecast at completion is \( 49{,}500 + 10{,}500 = \$60{,}000 \), on budget, provided the remaining commitments hold.

**Per-user cost tracking** is the measurement of GenAI spend by individual user, normally through a user or service-account identifier on each request, used to find unusual consumption and to plan capacity. Of the 34 active agents the reply-draft cost averages \( 12{,}960 \div 34 = \$381 \) a month, and the three heaviest users account for 22%. Person-level cost is sensitive: use it to find broken integrations and to size licenses, not to rank staff, and apply access controls to the data. A script that calls the API in a loop under one agent's identity is exactly the case it exists to catch.

!!! mascot-tip "Add the Identifier at the Edge"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Stamp the user, project, and feature identifiers onto each request at the gateway, where every call passes, rather than asking each application to add them. One enforcement point gives complete tags with less engineering effort than twenty.

### Matching the Invoice: Billing Data, Normalization, and Reconciliation

Telemetry says what you think you used. The vendor's bill says what you owe. **Billing API integration** is the automated retrieval of cost and usage data directly from a vendor's or cloud provider's billing interface, in place of manually downloaded invoices. Three details cause most trouble: pagination, where large results arrive in pages that must all be fetched, late-arriving adjustments such as credits that change earlier days, and idempotence, meaning that loading the same day twice must not double the cost. Re-pull a rolling window of the last 7 days every day and overwrite it, so late adjustments correct themselves.

A **vendor invoice reconciliation** is the comparison of the cost recorded in your own telemetry and warehouse against the amounts the vendor invoiced, with each difference explained. The usual tolerance is 1%. In the example the warehouse holds $18,744 of token cost against vendor invoices totaling $18,600, a difference of $144, or 0.77%. It is within tolerance, and it is still explained: $108 is the Chapter 13 retry bug that wrote 36,000 Support records twice, and $36 is a time-zone cut-off, where the vendor closes its day at midnight UTC and the warehouse at local midnight. An unexplained difference of even 0.5% should be investigated, because it means a record or a price is wrong somewhere.

The bill also arrives in different shapes. **Cost data normalization** is the conversion of cost and usage data from different sources into one common structure, units, currency, and time basis so the records can be compared and added. Suppose Provider A, the primary, charges $0.50 per million input tokens, and Provider B charges $0.0006 per 1,000 input tokens, which is $0.60 per million. B looks 20% more expensive. But the two tokenize text differently: for the same 1,000 words, A counts 1,330 tokens and B counts 1,490. Normalize to a unit the business cares about, cost per million words:

| Provider | Price per million tokens | Tokens per 1,000 words | Cost per million words |
|----------|-------------------------:|-----------------------:|-----------------------:|
| A | $0.50 | 1,330 | $0.665 |
| B | $0.60 | 1,490 | $0.894 |

B is not 20% dearer but 34.4% dearer, because the tokenizer difference compounds the price difference. Without normalization, the cheaper-looking comparison would be wrong.

**Cross-provider cost aggregation** is the combination of normalized cost data from several vendors or clouds into one consolidated view of total spend. In the example Provider A bills $14,880 and Provider B $3,720, which sum to the $18,600 token cost and give A 80% of spend. The aggregated view can answer questions no single invoice can, such as the blended cost per request or whether moving a feature from one provider to the other lowers the bill after accounting for tokenizer differences.

The first specification practises the roll-up, the unit cost, and the reconciliation.

#### Diagram: Roll-Up and Reconciliation Calculator

<details markdown="1">
<summary>Roll-Up and Reconciliation Calculator</summary>
Type: microsim
**sim-id:** rollup-reconciliation-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate a feature's allocated shared cost and unit cost, the reconciliation difference between warehouse and invoices, and a normalized cost per million words for two providers, to the tolerances stated for each item.

**Prerequisites:** per-feature cost tracking, vendor invoice reconciliation, cost data normalization (all defined in the sections "Slicing the Spend" and "Matching the Invoice" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within the tolerance in the Content table. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) Shared costs belong to no feature. (2) A higher price per token always means a higher cost for the same work. (3) A small reconciliation difference needs no explanation.

**Instructional Rationale:** Apply-level work means carrying out procedures on new numbers. Three different calculations, an allocation, a reconciliation, and a normalization, appear in one sim so that the learner sees them as steps of one cost-integrity routine.

**Content:**

Fixed inputs: Support's shared cost is $6,840 and Support has 3,600,000 requests. Reply-draft has 2,400,000 requests and a direct cost of $8,400. Ticket-triage has 900,000 requests and a direct cost of $1,800. The warehouse token cost is $18,744 and vendor invoices total $18,600. Provider A charges $0.50 per million tokens and counts 1,330 tokens per 1,000 words. Provider B charges $0.60 per million tokens and counts 1,490 tokens per 1,000 words.

| # | Item | Model value | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Reply-draft shared cost | $4,560 | $1 | 2,400,000 ÷ 3,600,000 × 6,840 = 4,560. |
| 2 | Reply-draft total cost | $12,960 | $1 | 8,400 + 4,560 = 12,960. |
| 3 | Ticket-triage total cost | $3,510 | $1 | Shared 900,000 ÷ 3,600,000 × 6,840 = 1,710, plus 1,800 direct. |
| 4 | Reply-draft all-in cost per request | $0.0054 | $0.0001 | 12,960 ÷ 2,400,000 = 0.0054. |
| 5 | Reconciliation difference | $144 | $1 | 18,744 − 18,600 = 144. |
| 6 | Reconciliation difference as a percentage of the invoices | 0.8% | 0.1 points | 144 ÷ 18,600 = 0.0077, within the 1% tolerance. |
| 7 | Provider B cost per million words | $0.894 | $0.001 | 1.49 million tokens × 0.60 = 0.894. |
| 8 | Provider B cost relative to Provider A | +34.4% | 0.1 points | 0.894 ÷ 0.665 = 1.344. |

**Provenance:** All values come from the chapter sections "Slicing the Spend" and "Matching the Invoice". The sim must label the data "illustrative".

**Rules:** Shared allocation = feature requests ÷ team requests × shared cost. Total = direct + shared. All-in cost per request = total ÷ requests. Reconciliation difference = warehouse total − invoice total. A reconciliation is "Within tolerance" when the absolute difference ÷ invoice total <= 1%. Cost per million words = tokens per 1,000 words ÷ 1,000 × price per million tokens. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Duplicated records | 0 | 360,000 | 36,000 | 36,000 | records |
| Time-zone cut-off error | 0 | 300 | 12 | 36 | dollars |

Each duplicated record adds $0.0030 to the warehouse total. The warehouse total equals $18,600 plus the two errors, and the sim shows the difference, its percentage, and "Within tolerance" or "Investigate".

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the duplicated records and the cut-off error and watches the reconciliation difference and verdict update.
4. The learner should notice that 360,000 duplicated records alone push the difference past the 1% tolerance.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "How much of Support's shared cost belongs to reply-draft?"

**Chapter Anchors:** The chapter states reply-draft costs of $8,400 direct, $4,560 shared, and $12,960 total at $0.0054 per request, a warehouse total of $18,744 against $18,600 invoiced, a $144 difference of 0.77% made of $108 and $36, and provider costs of $0.665 and $0.894 per million words, 34.4% apart.
</details>

### Governing the Numbers

A calculation is only as good as the agreement about what it means. **Data governance for metrics** is the set of roles, policies, and processes that define who owns each metric, who may change its definition or data, and how quality is checked. Three roles carry most of it: a metric owner who is accountable for the definition, a data steward who maintains the pipeline and the checks, and consumers who raise questions and requests. Governance also covers change control: a change to a price table or to the allocation rule is proposed, reviewed, and dated, like a code change.

An **audit trail for spend** is a tamper-resistant record of who changed which cost data, tag, allocation rule, budget, or alert, and when. It matters most for the changes that move money without anyone noticing. A record might read: on 12 September at 14:03, a finance analyst changed the shared-cost allocation key from requests to token cost, with a reference to a change ticket, and the change reallocated $2,300 between teams. Append-only storage means the record cannot be edited afterwards.

**Metric definition documentation** is the written, versioned specification of a metric: its name, plain-language definition, formula, data sources, owner, refresh schedule, and known limitations. One page for cost per resolved ticket would state:

| Field | Entry |
|-------|-------|
| Name | Cost per resolved ticket |
| Definition | Total assistant cost in the period divided by tickets resolved with assistant help |
| Formula | (Direct token cost + shared cost + amortized investment) ÷ assisted resolved tickets |
| Sources | `usage_cost` fact table, ticketing system |
| Owner | Finance partner for Support |
| Refresh | Monthly, on the fifth working day |
| Limitations | Excludes agent labor; assisted means at least one assistant draft was used |
| Version | 1.2, effective 1 October |

Documenting the definition is what lets Chapter 12's warning, "write the definition of outcome next to the number", be followed in practice.

A **single source of truth** is the one authoritative system or dataset designated for each metric, so every report draws on the same data and any difference is a bug and not a disagreement. Without it, Finance reports $29,400 for September, from invoices closed at midnight UTC and net of a $600 credit, while Engineering's dashboard shows $30,000 from request logs, and each is right by its own rules. The remedy is to name the warehouse's reconciled monthly table as the source for the cost metrics, publish the reconciliation, and retire the others.

A **data lineage for cost metrics** is the documented path of data from its original sources through every transformation to the metric or dashboard tile that reports it. It answers two questions. Upstream: where did this number come from? Downstream: if this input changes, what else is affected? The second is the one that prevents surprises. The lineage of the cost metrics in the example is shown in the specification below, where each arrow points from a source to something computed from it.

#### Diagram: Cost Metric Lineage Explorer

<details markdown="1">
<summary>Cost Metric Lineage Explorer</summary>
Type: graph-model
**sim-id:** cost-metric-lineage-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine a 19-node lineage graph to identify every downstream node affected when one source, table, or metric changes, for six change scenarios, matching the affected set exactly.

**Prerequisites:** data lineage for cost metrics, cost data warehouse, single source of truth, metric definition documentation (all defined in the section "Governing the Numbers" above).

**Evidence of Mastery:** For each of six scenarios the learner selects the nodes they believe are affected and commits the selection before the answer is shown. A selection is correct when it equals the "Affected nodes" set in Content exactly, with no missing and no extra nodes. Mastery is 5 of 6 scenarios correct on the first attempt. Clicking nodes to read their descriptions is exploration, not evidence.

**Misconceptions:** (1) A change in one source affects only the metric named after it. (2) A change to a price table affects every dashboard. (3) A change to a metric definition changes the data underneath it.

**Instructional Rationale:** Analyze-level work examines how parts connect. Tracing which nodes sit downstream of a change is the examination that lineage exists to support, and requiring an exact set prevents guessing by selecting everything.

**Content:**

Arrows point from a source to the node computed from it. The 19 nodes, by layer:

| Id | Layer | Name | Description shown on click |
|---|---|---|---|
| S1 | Source | Provider A invoice | Monthly invoice from Provider A. |
| S2 | Source | Provider B invoice | Monthly invoice from Provider B. |
| S3 | Source | Gateway request log | One record per model request with tenant, tokens, and tags. |
| S4 | Source | Tag registry | The list of allowed tag keys and values. |
| S5 | Source | Ticketing system | Tickets resolved, with the assistant-used flag. |
| T1 | Staging | Normalized usage table | Request records cleaned, deduplicated, and priced. |
| T2 | Staging | Price table | Price per million tokens by model and date. |
| W1 | Warehouse | usage_cost fact table | Priced request-level cost, the main cost table. |
| W2 | Warehouse | invoice_cost table | Vendor invoice lines, combined across providers. |
| W3 | Warehouse | tag_audit table | Per-request tag completeness, with no prices. |
| W4 | Warehouse | resolved_tickets table | Daily resolved and assisted ticket counts. |
| M1 | Metric | Cost by team | Spend grouped by the team tag. |
| M2 | Metric | Cost per resolved ticket | Assistant cost divided by assisted resolved tickets. |
| M3 | Metric | Reconciliation difference | Warehouse cost minus invoice cost. |
| M4 | Metric | Tag compliance rate | Share of requests carrying every required tag. |
| D1 | Dashboard | Finance: month-to-date spend | Tile showing M1. |
| D2 | Dashboard | Finance: cost per resolved ticket | Tile showing M2. |
| D3 | Dashboard | Operations: reconciliation | Tile showing M3. |
| D4 | Dashboard | Operations: tag compliance | Tile showing M4. |

Arrows (18): S3→T1, T2→T1, T1→W1, S1→W2, S2→W2, S3→W3, S4→W3, S5→W4, W1→M1, W1→M2, W4→M2, W1→M3, W2→M3, W3→M4, M1→D1, M2→D2, M3→D3, M4→D4.

| # | Change scenario | Affected nodes | Why (shown as feedback) |
|---|---|---|---|
| 1 | The price table is corrected | T1, W1, M1, M2, M3, D1, D2, D3 | Prices flow into priced costs, so every cost metric and its tile changes, while tag compliance does not use prices. |
| 2 | Provider A reissues its invoice | W2, M3, D3 | The invoice feeds only the reconciliation. |
| 3 | The tag registry adds a new allowed value | W3, M4, D4 | The registry is used only to audit tags. |
| 4 | The gateway request log format changes | T1, W1, W3, M1, M2, M3, M4, D1, D2, D3, D4 | The request log feeds both the priced table and the tag audit, so almost everything downstream changes. |
| 5 | The ticketing system changes its assisted flag | W4, M2, D2 | Only cost per resolved ticket uses ticket counts. |
| 6 | The definition of cost per resolved ticket is revised | D2 | The metric's tile changes, but the data tables underneath are unchanged. |

**Provenance:** The graph is illustrative and was written for this chapter. The sim must label it "illustrative".

**Rules:** The affected set for a change at a node is every node reachable by following the arrows forward from it, excluding the node itself, except for scenario 6, where the changed node is the metric M2 itself and the answer is the nodes forward of it. A selection is correct only when it equals the set exactly.

**Learner Activity:**

1. The learner reads the scenario and clicks nodes to toggle them as affected, then presses Commit.
2. The sim highlights the correct set, marks any missing or extra node, and shows the "Why" text.
3. After six scenarios, exploration unlocks: the learner clicks any node and sees its upstream and downstream paths highlighted.
4. The learner should notice that the request log has the widest downstream reach and the invoice has the narrowest.

**Feedback:** Six scenarios, fixed order, two attempts each. Correct: "Correct: <count> nodes affected." Incorrect on the first attempt: the "Why" text and the number of missing and extra nodes, without naming them. After a second wrong attempt the correct set is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** The graph is shown with no node selected and scenario 1 stated. The question on screen is "Which nodes would change if this changed?"

**Chapter Anchors:** The chapter states that arrows point from a source to what is computed from it, and names the nodes for the price table, invoices, request log, tag registry, ticketing system, and the four cost metrics.
</details>

### Alerts, Refreshes, and Bias

Alerts and dashboards also need design, because poor settings produce either silence or noise.

**Alerting threshold design** is the choice of the levels, rules, and recipients that decide when a cost signal becomes a notification, balancing the cost of a missed event against the cost of a false alarm. A threshold needs four attributes: a trigger rule (for example, spend more than 3 standard deviations above the 7-day mean), a severity, an owner who can act, and a response that is written down. The balance has a number behind it. Under a normal pattern, the chance that a given day exceeds 3 standard deviations is 0.135%, but the platform tracks 200 tenant, feature, and model series at once, so the false alerts expected in a week are \( 200 \times 7 \times 0.00135 = 1.9 \). At 2 standard deviations the chance is 2.275%, giving \( 200 \times 7 \times 0.02275 = 31.9 \) false alerts a week.

**Real-time alert fatigue** is the loss of attention to alerts that follows when too many are false or non-actionable, so the people who receive them start ignoring all of them, including the real ones. If the team receives 32 alerts a week and 2 are real, alert precision, the share of alerts that matter, is 6%, and an agent who has acted on 30 false alarms will not run to the 31st. The remedies are higher thresholds, grouping related alerts into one, routing by severity, and retiring alerts nobody acts on.

The next specification lets the learner choose thresholds against a false-alarm limit.

#### Diagram: Alert Threshold Tuner

<details markdown="1">
<summary>Alert Threshold Tuner</summary>
Type: microsim
**sim-id:** alert-threshold-tuner<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend, for each of six monitoring scenarios, the smallest threshold multiplier from 2, 2.5, 3, 3.5, and 4 standard deviations that keeps the expected false alerts per week at or below the stated limit.

**Prerequisites:** alerting threshold design, real-time alert fatigue, anomaly detection in spend, standard deviation (defined in this chapter and in Chapter 13).

**Evidence of Mastery:** For each of six scenarios the learner selects one multiplier and commits before the expected false alerts are shown. A selection is correct when it is the smallest multiplier whose expected false alerts per week are <= the limit. Mastery is 5 of 6 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The same threshold suits every number of monitored series. (2) A stricter threshold is always better. (3) False alerts are only a nuisance and do not reduce response to real ones.

**Instructional Rationale:** Evaluate-level work is a judgment against a criterion with a trade-off. The criterion here is the false alert limit, and the trade-off is that a higher multiplier misses smaller real spikes, so choosing the smallest acceptable multiplier is a reasoned recommendation.

**Content:**

Expected false alerts per week = number of series × 7 × P(z greater than k), one-sided, under a normal pattern, where P is 0.02275 for k = 2, 0.00621 for k = 2.5, 0.00135 for k = 3, 0.000233 for k = 3.5, and 0.0000317 for k = 4.

| # | Monitored series | False alert limit per week | Expected false alerts at k = 2 / 2.5 / 3 / 3.5 / 4 | Correct multiplier | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | 20 | 2 | 3.19 / 0.87 / 0.19 / 0.03 / 0.00 | 2.5 | k = 2 gives 3.19, above the limit, and k = 2.5 gives 0.87. |
| 2 | 200 | 2 | 31.85 / 8.69 / 1.89 / 0.33 / 0.04 | 3 | k = 2.5 gives 8.69, and k = 3 gives 1.89 within the limit. |
| 3 | 1,000 | 2 | 159.25 / 43.47 / 9.45 / 1.63 / 0.22 | 3.5 | k = 3 gives 9.45, and k = 3.5 gives 1.63. |
| 4 | 1,000 | 0.5 | 159.25 / 43.47 / 9.45 / 1.63 / 0.22 | 4 | The tighter limit of 0.5 needs k = 4, which gives 0.22. |
| 5 | 50 | 5 | 7.96 / 2.17 / 0.47 / 0.08 / 0.01 | 2.5 | k = 2 gives 7.96, above the limit, and k = 2.5 gives 2.17. |
| 6 | 5 | 1 | 0.80 / 0.22 / 0.05 / 0.01 / 0.00 | 2 | Even the most sensitive setting gives 0.80, within the limit. |

**Provenance:** Scenario 2 uses the 200 series and the false alert figures from the chapter section "Alerts, Refreshes, and Bias". The other scenarios are illustrative values computed from the Rules. The sim must label all data "illustrative".

**Rules:** Expected false alerts per week = series × 7 × P(k). A multiplier is acceptable when expected false alerts <= the limit. The correct answer is the smallest acceptable multiplier. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Monitored series | 5 | 1,000 | 5 | 200 | series |
| Threshold multiplier | 2 | 4 | 0.5 | 3 | standard deviations |

The sim shows the expected false alerts per week and the smallest spike, in standard deviations, that would still be detected.

**Learner Activity:**

1. The learner reads scenario 1 with its series count and limit, selects a multiplier, and presses Commit.
2. The sim shows the expected false alerts for all five multipliers and the "Why" text.
3. After six scenarios, exploration unlocks: the learner changes the series count and the multiplier and watches the expected false alerts change.
4. The learner should notice that the right multiplier rises with the number of series.

**Feedback:** Six scenarios, fixed order, two attempts each. Correct: "Correct: k = <value>." Incorrect on the first attempt: the "Why" text without the answer. After a second wrong attempt the correct multiplier is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 6" is shown.

**Starting State:** Scenario 1 is shown with no multiplier selected. The question on screen is "What is the lowest threshold that keeps false alerts within the limit?"

**Chapter Anchors:** The chapter states 200 series, a 3-standard-deviation false alert chance of 0.135%, 1.9 false alerts a week at k = 3, and 31.9 false alerts a week at k = 2.
</details>

A **dashboard refresh cadence** is the interval at which a dashboard's underlying data and visuals are updated. It should match how fast the data arrives and how fast anyone can act on it. Refreshing is not free, because each refresh runs queries. If the dashboard has 12 panels and each query costs $0.02, refreshing every minute costs \( 12 \times 1{,}440 \times 0.02 \times 30 = \$10{,}368 \) a month, while refreshing hourly costs \( 12 \times 24 \times 0.02 \times 30 = \$172.80 \). A finance dashboard that is read once a day gains nothing from a minute-by-minute refresh, but an operations panel guarding a runaway loop may justify it.

**Telemetry sampling bias** is a systematic error in a metric that arises when the sampled records are not representative of all records, so estimates from the sample are consistently too high or too low. The Chapter 13 policy keeps every error and slow request and 1% of the rest. That is good for diagnosis and bad for averages. Suppose errors and slow requests (120,000 of them) cost $0.0100 each and the other 5,880,000 cost $0.0029. The true average is \( (120{,}000 \times 0.0100 + 5{,}880{,}000 \times 0.0029) \div 6{,}000{,}000 = \$0.00304 \). The average of the kept records is \( (120{,}000 \times 0.0100 + 58{,}800 \times 0.0029) \div 178{,}800 = \$0.00767 \), 2.5 times too high. Give each sampled record a weight equal to the inverse of its sampling probability, 1 for the always-kept requests and 100 for the 1% sample, and the weighted average returns $0.00304.

!!! mascot-warning "Averages From a Biased Sample Look Like a Cost Crisis"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A dashboard built on the kept traces will report a cost per request two and a half times too high, and that happens because the sample over-represents expensive cases. Store the sampling weight with each record and use weighted averages, or compute cost metrics from the unsampled cost log of Chapter 13.

### Maturity, Roadmap, and Ownership

Everything above can be done well or badly, and an organization needs a way to say where it stands. The **instrumentation maturity model** is a staged scale that describes how completely and reliably an organization measures a capability, so it can assess itself and plan the next improvement. For cost observability five levels are common.

| Level | Name | What is true |
|:-----:|------|--------------|
| 1 | Ad hoc | Spend is known only from the monthly invoice, at total level, with no tags. |
| 2 | Tagged | Required tags exist, compliance is at least 80%, and teams receive a monthly showback. |
| 3 | Measured | Request-level logs feed a warehouse, reconciliation is within 1%, and reports by feature and project are weekly. |
| 4 | Managed | Alerts have owners and runbooks, metric definitions and lineage are documented, and chargeback is in use. |
| 5 | Optimized | Unit cost drives routing and capacity decisions, with automated actions and forecasts within 5%. |

Score each dimension separately and take the overall level to be the lowest. The shared platform scores as follows.

| Dimension | Evidence | Level |
|-----------|----------|:-----:|
| Tagging | 82% compliance with a defined taxonomy | 2 |
| Logging | Request-level token and cost records | 3 |
| Reconciliation | 0.77% difference, explained | 3 |
| Alerting | Thresholds exist but no owners or runbooks | 2 |
| Governance | No documented definitions or audit trail | 2 |
| **Overall** | Lowest dimension | **2** |

!!! mascot-thinking "A Chain Is as Mature as Its Weakest Link"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the platform has Level 3 data and Level 2 governance, and the lower score is the honest one. Excellent logs behind an undocumented metric still produce a number nobody can defend, so effort should go to the lowest dimension, not the one that is easiest to improve.

A **cost observability roadmap** is a sequenced plan that moves an organization from its current maturity level to a target level, with each step's effort, owner, and timing, ordered by the value each step unlocks. For the platform, moving from Level 2 to Level 4 has six steps.

| Step | Work | Effort (person-weeks) | Quarter | What it enables |
|:----:|------|----------------------:|:-------:|-----------------|
| 1 | Enforce required tags at the gateway | 3 | Q1 | Tag compliance toward 95% |
| 2 | Automate the billing pull and monthly reconciliation | 4 | Q1 | A trusted match to the invoice |
| 3 | Publish definitions for the six core metrics and name owners | 2 | Q1 | One meaning per metric |
| 4 | Anomaly alerts with owners and runbooks for the 20 largest series | 5 | Q2 | Early warning that is acted on |
| 5 | Lineage documentation and an audit trail on allocation rules | 4 | Q2 | Safe change control |
| 6 | Real-time panel for operations | 6 | Q3 | Minutes instead of hours to detect |

The total is 24 person-weeks, about $48,000 at an assumed $2,000 a week. Against $360,000 of annual platform spend, that is 13%. Steps 1 to 3 cost 9 person-weeks, or $18,000 (5%), and they close the Level 2 gaps in tagging, reconciliation, and governance, so they come first. Steps 4 to 6 are worth their cost when spend, and therefore the cost of an undetected incident, is larger. Chapter 13's retry-loop example gave $720 against $15 per incident, so the real-time panel needs several incidents a year, or higher spend, to pay back.

Finally, someone has to do the work. An **instrumentation ownership model** is the agreed division of responsibility for creating, maintaining, and acting on telemetry among central and product teams. Three patterns exist: centralized, where one platform team instruments everything, which keeps standards high and creates a bottleneck; decentralized, where each product team instruments its own system, which moves fast and drifts apart; and federated, where the platform team owns the standards and shared infrastructure while product teams own what only they understand. The federated split for the platform is shown as responsible (R, does the work), accountable (A, owns the outcome), and consulted (C).

| Activity | Platform team | Product teams | Finance partner |
|----------|:-------------:|:-------------:|:---------------:|
| Gateway tagging and request log | R, A | C | C |
| Feature and project tag values | C | R, A | C |
| Warehouse, pipeline, and quality checks | R, A | C | C |
| Metric definitions and documentation | C | C | R, A |
| Invoice reconciliation | C | | R, A |
| Responding to cost alerts | C | R, A | I |

### Summary and Quick Check

The same fact table answers questions by department, project, user, and feature, provided every cost lands in one branch of the hierarchy and the unallocated share is visible. Billing API integration, normalization, and reconciliation tie the warehouse to the invoices across providers, and an unexplained difference above 1% is a defect. Governance supplies owners, an audit trail, documented definitions, a single source of truth, and lineage. Alert thresholds must be set against the number of series watched, dashboards refreshed no faster than anyone can act, and sampled data weighted before averaging. The maturity model gives the score, the roadmap the order of work, and the ownership model the division of it. The platform scores Level 2 overall, and three inexpensive steps would fix its weakest dimensions. Chapter 15 turns from the platform's cost data to a specific consumer of GenAI, the software development lifecycle.

??? note "Quick check: why can a provider with a lower price per token cost more for the same text? - Click to expand"
    Providers tokenize text differently. A provider that splits the same 1,000 words into 1,490 tokens instead of 1,330 charges for more tokens, so a 20% higher token price becomes a 34.4% higher cost per million words once normalized.

??? note "Quick check: how can more series make the same alert threshold noisier? - Click to expand"
    Each series has its own small chance of a false alert, and the chances add. At 3 standard deviations, 20 series give about 0.19 false alerts a week and 1,000 series give about 9.4, so the multiplier must rise with the number of series.

??? note "Quick check: why does the platform score Level 2 although its logging is Level 3? - Click to expand"
    The overall level is the lowest dimension, and alerting and governance are at Level 2. The score is honest because strong logs behind undocumented metrics and ownerless alerts still produce numbers that cannot be defended.

!!! mascot-celebration "You Can Prove Your Cost Numbers Are Trustworthy"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now roll cost up and down the hierarchy, reconcile it against vendor invoices across providers, tune alerts that people will actually trust, and score and plan your cost observability. That is the difference between a report and a system.
