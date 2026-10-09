---
title: Telemetry, Logging, and Cost Dashboards
description: How usage and cost telemetry is captured through logging, tracing, and tagging, moved through a pipeline into a cost data warehouse, and turned into real-time monitoring, anomaly detection, forecasts, and budget variance reports.
generated_by: claude skill chapter-content-generator
date: 2026-10-08 14:20:00
version: 1.11
---

# Telemetry, Logging, and Cost Dashboards

## Summary

Explains how usage and cost telemetry is captured through logging, tracing, and observability platforms, culminating in real-time cost dashboards. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Usage Telemetry | 51 |
| Cost Attribution Tagging | 39 |
| Cost Tagging Taxonomy | 38 |
| Observability Platform | 37 |
| Logging Strategy | 36 |
| Distributed Tracing | 35 |
| API Call Logging | 34 |
| Token Usage Logging | 33 |
| Cost Dashboard Design | 1 |
| Real-Time Cost Monitoring | 31 |
| Anomaly Detection In Spend | 1 |
| Spend Forecasting | 29 |
| Budget Variance Analysis | 28 |
| Cost Data Warehouse | 27 |
| Data Pipeline For Cost Analytics | 26 |
| ETL For Usage Data | 25 |
| Data Quality For Cost Metrics | 24 |
| Sampling Strategy For Telemetry | 23 |
| Data Retention Policy | 22 |
| Multi-Tenant Cost Attribution | 21 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Managing and Benchmarking Token Consumption](../04-managing-benchmarking-tokens/index.md)
- [Chapter 6: Infrastructure Planning and Cost Monitoring](../06-infrastructure-planning-monitoring/index.md)
- [Chapter 9: Core Financial and ROI Vocabulary](../09-core-financial-roi-vocabulary/index.md)

---

Chapter 9 split a shared GenAI platform costing $30,000 a month among three teams, Support, Sales, and HR, using an assumed 60%, 30%, and 10% share of token usage. The assumption was a stand-in. A provider invoice arrives as one line, and nothing on it says which team, feature, or request produced the spend. Chapter 12's instrumentation plan asked for measured data on every metric. This chapter builds the machinery that produces it: the records, the pipeline, the warehouse, and the dashboards, using the same shared platform as the running example. Every figure is illustrative.

!!! mascot-welcome "From One Invoice Line to Every Request"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Spend you cannot trace is spend you cannot manage, and the trace starts with a log line. By the end of this chapter you can design the records, the tags, and the checks that let finance see who spent what, and spot a runaway bill before the invoice does. Every token counts, and this chapter makes each one countable.

### Capturing the Data: Telemetry, Logs, and Traces

**Usage telemetry** is the automated collection and transmission of measurements about how a system is used, such as request counts, token counts, latency, and errors, from the running system to a place where they can be analysed. It is the raw material for every cost metric in this book. Three kinds of record carry it: logs (one record per event), metrics (numbers aggregated over time), and traces (the path of one request through several services).

**API call logging** is the practice of recording a structured entry for every call made to a model or other service, with enough fields to identify who made the call, what was called, and how it ended. A **structured log** is a record in a machine-readable format with named fields, rather than a free-text sentence, so a program can sum and filter it. **Token usage logging** is the recording of the input, output, and cached token counts of every model request, together with the price needed to turn them into dollars. A single call record for the Support team looks like this:

```json
{
  "request_id": "9f3c1a",
  "timestamp": "2026-09-14T10:42:07Z",
  "tenant": "support",
  "feature": "reply-draft",
  "env": "prod",
  "model": "model-large",
  "input_tokens": 3000,
  "output_tokens": 800,
  "cached_tokens": 0,
  "latency_ms": 2410,
  "status": 200,
  "cost_usd": 0.0031
}
```

Two fields need a word before you read on. `request_id` is a unique identifier for this one call, which lets you find it again and detect duplicates. `tenant` names the team that made the call, and it is the field that makes cost attribution possible later. The `cost_usd` value follows from Chapter 3: 3,000 input tokens at $0.50 per million plus 800 output tokens at $2.00 per million is \( 0.0015 + 0.0016 = \$0.0031 \). Notice that the record holds no prompt text, a choice explained next.

A **logging strategy** is the set of decisions about what to log, at what level of detail, in what format, and for how long, made so that the data answers the questions the business will ask without exposing more than it should. Four decisions matter most:

- **Log metadata always, content rarely.** Tokens, latency, model, and tags are cheap and safe. Prompts and responses can contain customer data, so capture them only for a small sample or on error, and mask personal data first.
- **Use structured records.** Free text cannot be summed.
- **Carry a correlation identifier** such as `request_id` through every system a request touches.
- **Record the price with the usage.** Provider prices change, and a record that stores only tokens cannot be priced correctly after the fact.

!!! mascot-thinking "A Log Is a Ledger Entry"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of each log record as a ledger line: who, what, how much, and when. If the line is missing a field, no later analysis can recover it, which is why the design of the record matters more than the tool that stores it.

A support reply often touches several services, and a single call record cannot show where the time and money went. **Distributed tracing** is the technique of following one request across every service it touches, recording each step as a timed span linked to the others by a shared trace identifier. A span is one unit of work, with a start time, a duration, and any attributes you attach, including cost. A traced reply-draft request in the example breaks down as follows.

| Span | Duration | Cost |
|------|---------:|-----:|
| API gateway | 5 ms | $0.0000 |
| Retrieval from the vector store | 120 ms | $0.0004 |
| Model call (3,000 input, 800 output tokens) | 2,400 ms | $0.0031 |
| Safety filter on the output | 180 ms | $0.0002 |
| **Request total** | **2,705 ms** | **$0.0037** |

The model call is 84% of the cost ($0.0031 of $0.0037), but a trace also catches costs the call log cannot, such as a retrieval step that fires three times because of a retry, which would show as three retrieval spans under one trace.

An **observability platform** is a system that ingests logs, metrics, and traces from many sources, stores them, and lets you query, visualise, and alert on them together. You can buy one, assemble it from open components, or use the one your cloud provider offers. The cost question is easy to forget: the platform charges for the data you send it, so a decision to log every prompt is also a decision to pay to store them. The next section shows how to keep that in proportion.

### Sampling, Retention, and What It Costs to Watch

The platform serves 6,000,000 requests a month. Storing a full trace and payload for each is expensive, and for most requests unnecessary. A **sampling strategy for telemetry** is a rule for choosing which events to keep in full when keeping them all is too costly, such as always keeping errors and slow requests and keeping only a small fraction of the rest. In the example, 2% of requests are errors or unusually slow, which is 120,000. Keep all of them, and 1% of the remaining 5,880,000, which is 58,800. The platform keeps 178,800 traces, or 2.98% of traffic, and storage falls by about 97%.

Sampling has a trap when applied to cost data. Cost is dominated by a few large requests, and a sample can miss them. Consider 1,000 requests: 990 cost $0.003 each, and 10 "whale" requests with very long contexts cost $0.50 each. Total spend is \( 990 \times 0.003 + 10 \times 0.50 = \$7.97 \). A 1% sample takes about 10 requests, so there is a good chance of containing no whale at all. If it contains none, the estimate is \( 100 \times 10 \times 0.003 = \$3.00 \), which is 62% too low.

!!! mascot-warning "Never Sample the Meter"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Sample traces and payloads, but record every request's token and cost fields. A sampled cost log underestimates the expensive tail, and it happens because the whales are exactly the rare events a sample skips. Keep a complete usage record, and sample only the heavy detail around it.

A **data retention policy** states how long each class of data is kept, in which storage tier, and when it is deleted or archived. The classes have different jobs, so they have different lifetimes.

| Data class | Hot storage | Then | Why |
|------------|-------------|------|-----|
| Prompt and response payloads | 30 days | Delete | Privacy exposure and little long-term value |
| Per-request usage and cost records | 13 months | Archive 7 years | Year-over-year comparison and audit |
| Daily and monthly cost aggregates | Indefinitely | Not applicable | Small, and needed for trend and forecasting |
| Provider invoices | Per accounting policy | Archive | Reconciliation and finance records |

Storage cost rarely drives this table. If payloads average 20 KB, the platform produces \( 6{,}000{,}000 \times 20 \text{ KB} = 120 \text{ GB} \) a month. At $0.023 per GB-month, keeping 30 days costs about $2.76 a month, while keeping 7 years holds 10,080 GB and costs about $232 a month. The larger price of long retention is the risk of holding customer text for years, which is why payloads are deleted first.

### Tagging and Attribution

Logs say what happened. **Cost attribution tagging** is the practice of attaching labels such as team, feature, environment, and cost center to every resource and request, so spend can be grouped by who or what caused it. A tag is useful only if people use the same words, so a **cost tagging taxonomy** is the agreed, controlled set of tag keys and allowed values, with naming rules and a list of which tags are mandatory.

| Tag key | Allowed values | Required | Example |
|---------|----------------|:--------:|---------|
| `team` | support, sales, hr, engineering | Yes | support |
| `feature` | Product feature name, lower case with hyphens | Yes | reply-draft |
| `env` | prod, stage, dev | Yes | prod |
| `cost_center` | CC- followed by four digits | Yes | CC-2210 |
| `owner` | Team mailing list | No | support-leads |

A taxonomy only works if untagged resources are visible. A tag compliance rate, the share of spend that carries all required tags, makes the gap measurable. If $24,600 of the $30,000 monthly spend is fully tagged, compliance is 82% and $5,400 sits in an "unallocated" bucket that no team owns, which is the first number to put on the dashboard.

**Multi-tenant cost attribution** is the assignment of the cost of a shared service to each tenant, meaning each team or customer that uses it, in proportion to the tenant's actual consumption. It separates two kinds of cost. Direct cost is spend that a request-level record ties to one tenant, such as tokens. Shared cost is spend that no single request causes, such as the vector database, the gateway, and the observability platform. In the example, 6,000,000 requests split 60%, 30%, and 10%, with these measured token costs per request.

| Tenant | Requests | Token cost per request | Direct token cost | Shared cost share (by requests) | Allocated total |
|--------|---------:|-----------------------:|------------------:|--------------------------------:|----------------:|
| Support | 3,600,000 | $0.0030 | $10,800 | $6,840 | $17,640 |
| Sales | 1,800,000 | $0.0040 | $7,200 | $3,420 | $10,620 |
| HR | 600,000 | $0.0010 | $600 | $1,140 | $1,740 |
| **Total** | **6,000,000** | | **$18,600** | **$11,400** | **$30,000** |

The Chapter 9 table assigned Support $18,000, Sales $9,000, and HR $3,000. Measured data moves Support to $17,640, Sales to $10,620, and HR to $1,740. The assumption that each team consumed tokens in proportion to its requests was wrong: Sales sends long documents and pays $0.0040 a request, while HR sends short questions and pays $0.0010. The measured token-cost shares are 58.1%, 38.7%, and 3.2%, so telemetry changed a decision, and under chargeback it would have moved $1,260 off HR's budget and onto Sales'.

The next specification lets the learner reproduce this allocation.

#### Diagram: Multi-Tenant Cost Allocator

<details markdown="1">
<summary>Multi-Tenant Cost Allocator</summary>
Type: microsim
**sim-id:** multi-tenant-cost-allocator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate each tenant's direct token cost, shared-cost allocation, and total allocated cost for the shared platform from request counts and per-request costs, to within $1.

**Prerequisites:** multi-tenant cost attribution, direct cost, shared cost, cost attribution tagging (all defined in the section "Tagging and Attribution" above).

**Evidence of Mastery:** For each of eight items the learner types a value before the answer is shown. A value is correct when it is within $1 of the model value for dollar items, or within 0.1 percentage points for the percentage item. Mastery is 7 of 8 correct on the first attempt. Exploration with the adjustable quantities is not evidence.

**Misconceptions:** (1) Teams with equal request shares should pay equal amounts. (2) Shared costs should be split equally per team. (3) An assumed usage share is as good as a measured one.

**Instructional Rationale:** Apply-level work means carrying a procedure out on given data. Splitting direct cost by measurement and shared cost by a stated key, then comparing with the earlier assumed split, shows the learner what telemetry changes.

**Content:**

Fixed inputs: 6,000,000 requests in the month, split 3,600,000 for Support, 1,800,000 for Sales, and 600,000 for HR. Token cost per request is $0.0030 for Support, $0.0040 for Sales, and $0.0010 for HR. Shared cost is $11,400, allocated by request share. The Chapter 9 assumed allocation by usage is $18,000 for Support, $9,000 for Sales, and $3,000 for HR.

| # | Item | Model value | Why (shown as feedback) |
|---|---|---|---|
| 1 | Support direct token cost | $10,800 | 3,600,000 × 0.0030 = 10,800. |
| 2 | Sales direct token cost | $7,200 | 1,800,000 × 0.0040 = 7,200. |
| 3 | HR direct token cost | $600 | 600,000 × 0.0010 = 600. |
| 4 | Support shared-cost allocation | $6,840 | Support has 60% of requests, and 0.60 × 11,400 = 6,840. |
| 5 | Sales total allocated cost | $10,620 | 7,200 direct plus 0.30 × 11,400 = 3,420 shared. |
| 6 | HR total allocated cost | $1,740 | 600 direct plus 0.10 × 11,400 = 1,140 shared. |
| 7 | Support share of total token cost | 58.1% | 10,800 ÷ 18,600 = 0.581. |
| 8 | HR allocated cost minus the Chapter 9 assumed allocation | −$1,260 | 1,740 − 3,000 = −1,260. |

**Provenance:** All values come from the chapter section "Tagging and Attribution" and the Chapter 9 allocation table. The sim must label the data "illustrative".

**Rules:** Direct token cost = requests × token cost per request. Shared allocation = tenant requests ÷ total requests × shared cost. Allocated total = direct token cost + shared allocation. Totals across tenants must equal $30,000. Percentages are shown to one decimal place. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Support token cost per request | 0.0010 | 0.0060 | 0.0005 | 0.0030 | dollars |
| Sales token cost per request | 0.0010 | 0.0060 | 0.0005 | 0.0040 | dollars |
| HR token cost per request | 0.0010 | 0.0060 | 0.0005 | 0.0010 | dollars |

Request counts and shared cost stay fixed. When the learner changes a token cost the allocated totals and the comparison with the Chapter 9 split update, and the platform total changes from $30,000 accordingly.

**Learner Activity:**

1. The learner reads the fixed inputs and item 1, types a value, and presses Check.
2. The sim shows the model value, the arithmetic, and the "Why" text.
3. After eight items, exploration unlocks: the learner changes the three token costs per request and watches the allocated totals and the difference from the Chapter 9 split update.
4. The learner should notice that equal request shares produce unequal totals once per-request costs differ.

**Feedback:** Eight items, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect on the first attempt: the "Why" text without the model value. After a second wrong attempt the model value is shown and the item counts as missed. A running count "Correct on first attempt: n of 8" is shown.

**Starting State:** The fixed inputs are shown and item 1 has an empty answer box. The question on screen is "What did Support's requests cost in tokens this month?"

**Chapter Anchors:** The chapter states 6,000,000 requests, $0.0030, $0.0040, and $0.0010 per request, direct token costs of $10,800, $7,200, and $600, shared cost of $11,400, allocated totals of $17,640, $10,620, and $1,740, token-cost shares of 58.1%, 38.7%, and 3.2%, and a $1,260 change for HR.
</details>

!!! mascot-tip "Make Missing Tags Fail Loudly"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Reject the creation of any resource or key that lacks the required tags, and report the tag compliance rate every week. It is far cheaper to refuse an untagged resource on day one than to reconstruct its owner from a bill six months later.

### From Logs to a Warehouse: The Cost Data Pipeline

Records scattered across logs and invoices need a path to one place. A **data pipeline for cost analytics** is the sequence of automated steps that collects usage and billing data from its sources, cleans and enriches it, stores it, and serves it to reports and alerts. Four stages cover it:

1. **Collect:** gather the records from application logs, gateways, and provider billing interfaces.
2. **Transform:** clean, deduplicate, price, and tag them.
3. **Load:** write them to storage in the shape analysts need.
4. **Serve:** feed dashboards, alerts, and reports.

**ETL for usage data** is the extract, transform, and load process that pulls raw usage records out of their sources, reshapes and prices them, and loads the result into the warehouse. A common alternative, ELT, loads raw data first and transforms inside the warehouse, which keeps the raw records for reprocessing when a price or a tag mapping changes. The transform step does most of the work for cost data: it multiplies tokens by the price in effect on the request date, drops duplicates that share a `request_id`, and maps tag variants such as `supp` and `Support` to one value.

A **cost data warehouse** is a central analytical store that holds cleaned, joined usage and cost data from all sources in a structure designed for aggregation and trend queries. A common design is a star schema: one fact table of request-level costs, surrounded by dimension tables that describe the dates, tenants, models, and features. Before reading the query below, note what each part does: `SUM(cost_usd)` adds the cost of every row in the group, `WHERE` limits the rows to September, and `GROUP BY tenant` produces one result row per tenant.

```sql
SELECT tenant, SUM(cost_usd) AS token_cost
FROM usage_cost
WHERE usage_date >= '2026-09-01' AND usage_date < '2026-10-01'
GROUP BY tenant
ORDER BY token_cost DESC;
```

This single query reproduces the direct-cost column of the allocation table, which the invoice alone cannot.

**Data quality for cost metrics** is the set of checks that confirm cost data is complete, accurate, unique, valid, and fresh enough to trust. The pipeline should run them on every load.

| Check | Question | Example failure |
|-------|----------|-----------------|
| Completeness | Is every expected source and day present? | No records for one gateway on Tuesday |
| Accuracy | Does the warehouse total match the invoice within a tolerance, such as 1%? | Warehouse $29,100 against an invoice of $30,000 (−3.0%) |
| Uniqueness | Does any `request_id` appear twice? | A retry logged twice |
| Validity | Are values in range? | A negative token count |
| Freshness | Did the latest load arrive on time? | Yesterday's data not loaded by 08:00 |

The duplicate failure is the one that quietly inflates spend. Suppose a retry bug writes 36,000 Support records twice. At $0.0030 each that adds \( 36{,}000 \times 0.0030 = \$108 \) of phantom cost, small in dollars but visible as a mismatch against the invoice, which is why the accuracy check exists.

The next specification checks whether the learner can place each pipeline task in its stage.

#### Diagram: Pipeline Stage Sorter

<details markdown="1">
<summary>Pipeline Stage Sorter</summary>
Type: microsim
**sim-id:** pipeline-stage-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of ten cost-analytics pipeline tasks under the one of four stages (Collect, Transform, Load, Serve) in which it occurs, with at least 8 of 10 correct on the first attempt.

**Prerequisites:** data pipeline for cost analytics, ETL for usage data, cost data warehouse, data quality for cost metrics (all defined in the section "From Logs to a Warehouse: The Cost Data Pipeline" above).

**Evidence of Mastery:** For each task the learner chooses one stage and commits. A choice is correct when it matches the "Correct stage" column in Content. Mastery is 8 of 10 correct on the first attempt. Reading the stage definitions is exploration, not evidence.

**Misconceptions:** (1) Cleaning and deduplicating happen after storage. (2) Alerting is part of data collection. (3) Retention management belongs in the transform stage.

**Instructional Rationale:** Classifying concrete tasks under stage definitions is how an Understand objective is shown. Items such as deduplication and tag mapping, which look like storage work, test whether the learner knows where cleaning belongs.

**Content:**

Stage definitions, always visible to the learner:

| Stage | Definition shown |
|---|---|
| Collect | Gather raw usage and billing records from their sources. |
| Transform | Clean, validate, deduplicate, price, and tag the records. |
| Load | Write the cleaned records to storage and manage how long they are kept. |
| Serve | Deliver the stored data to dashboards, alerts, and reports. |

| # | Task shown | Correct stage | Why (shown as feedback) |
|---|---|---|---|
| 1 | Write a call record with a request ID and tenant to the application log. | Collect | It creates the raw record at the source. |
| 2 | Pull yesterday's usage from the provider's billing interface. | Collect | It gathers raw data from an outside source. |
| 3 | Multiply input and output tokens by the price in effect on the request date. | Transform | Pricing enriches the raw record. |
| 4 | Drop records that share a request ID with an earlier record. | Transform | Deduplication cleans the data before storage. |
| 5 | Map the tag values "supp" and "Support" to the single value "support". | Transform | Normalizing tags is cleaning. |
| 6 | Reject a record with a negative token count. | Transform | Validation is a cleaning step. |
| 7 | Append the day's cleaned records to the fact table, partitioned by date. | Load | It writes the cleaned data to storage. |
| 8 | Move payload logs to cheaper storage after 30 days. | Load | Retention management is a storage step. |
| 9 | Refresh the dashboard panel that shows cost by team. | Serve | It delivers stored data to a report. |
| 10 | Send an alert when daily spend passes the anomaly threshold. | Serve | It delivers a signal from stored data to people. |

**Provenance:** The stages and tasks come from the chapter section "From Logs to a Warehouse: The Cost Data Pipeline". The sim must label the data "illustrative".

**Rules:** Ten items, each with exactly one correct stage. Stage counts in the item list are two for Collect, four for Transform, two for Load, and two for Serve. Score is the count correct on the first attempt; mastery is >= 8.

**Learner Activity:**

1. The learner reads task 1 and selects one of the four stages, then presses Commit.
2. The sim marks the choice correct or incorrect and shows the "Why" text.
3. The learner continues through all ten tasks.
4. At the end the learner sees every task under its correct stage, and should notice which cleaning tasks were mistaken for storage tasks.

**Feedback:** Ten items, fixed order, two attempts each. Correct: "Correct: <stage>. <Why>". Incorrect on the first attempt: "Not quite. <Why>" without naming the stage. After a second wrong attempt the correct stage and the "Why" are shown and the item counts as missed. A running count "Correct on first attempt: n of 10" is shown.

**Starting State:** The four definitions are visible and task 1 is shown with nothing selected. The question on screen is "At which stage of the pipeline does this task happen?"

**Chapter Anchors:** The chapter names four stages, Collect, Transform, Load, and Serve, and lists pricing, deduplication, and tag mapping as transform tasks.
</details>

### Watching the Spend: Monitoring, Anomalies, Forecasts, and Variance

Chapter 6 introduced cost alerts and budget thresholds on cumulative spend. This section adds the signals that need the warehouse behind them.

**Real-time cost monitoring** is the continuous measurement and display of spend as it happens, with a delay of minutes rather than a day, so a problem can be stopped while it is still small. It costs more than a nightly load, since it needs a streaming path, so ask what an hour of delay costs. Suppose a retry loop adds $60 an hour. A nightly batch detects it after 12 hours on average, which is \( 12 \times 60 = \$720 \) of waste. A streaming pipeline with a 5-minute delay and a 10-minute alert path stops it after about 15 minutes, a waste of \( 60 \times 0.25 = \$15 \). If the streaming path costs $400 a month more, it pays for itself if it prevents one such incident a year, and not otherwise.

**Anomaly detection in spend** is the automated identification of spend that deviates from its normal pattern by more than chance would explain. A simple rule compares each day to a baseline built from recent days. Flag a day when its spend exceeds the mean of the previous 7 days by more than 3 standard deviations of those days. The standard deviation measures how much the days normally vary, so 3 of them is a spike that the usual wobble is very unlikely to produce. In the example, daily spend is near $1,000 with a standard deviation of about $13, so the threshold is about $1,040, and a day at $1,620 stands out at a z-score near 40.

There is a trap in the rule. The next day, at $1,650, is not flagged. The previous 7 days now include the $1,620 spike, which inflated the standard deviation to $233 and raised the threshold to $1,791. Continuing anomalies hide behind the first one, which is called masking. The remedy is to compute baselines from days already judged normal, or to use a robust measure such as the median.

The following specification lets the learner apply the rule to 14 days.

#### Diagram: Spend Anomaly Detector

<details markdown="1">
<summary>Spend Anomaly Detector</summary>
Type: microsim
**sim-id:** spend-anomaly-detector<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish, for each of 14 days of platform spend, the days flagged by the rule "spend greater than the mean plus 3 standard deviations of the previous 7 days" from the days not flagged, and will identify the day on which masking hides a real spike.

**Prerequisites:** anomaly detection in spend, standard deviation, z-score, masking (all defined in the section "Watching the Spend" above).

**Evidence of Mastery:** For each of 14 days the learner commits "Flag" or "No flag" before the baseline is shown. A choice is correct when it matches the "Rule result" column in Content. After the 14 days the learner selects the one day on which masking hides a real spike, which is correct when it is day 13. Mastery is 12 of 14 day choices correct on the first attempt and the masked day identified. Exploration is not evidence.

**Misconceptions:** (1) A day that looks very high to a person will always be flagged. (2) A flagged spike is followed by another flag if spend stays high. (3) A threshold of 3 standard deviations is a fixed dollar amount.

**Instructional Rationale:** Analyze-level work breaks a result into its parts. Predicting each flag before the baseline appears makes the learner estimate what is normal, and the masked day forces them to see that the baseline itself is built from the data being judged.

**Content:**

Daily platform spend in dollars, days 1 to 21: 980, 1010, 1000, 990, 1020, 1005, 995, 1015, 985, 1000, 1030, 1620, 1650, 1010, 1000, 990, 1025, 1060, 1005, 995, 1380. Days 1 to 7 are the first baseline window only. Days 8 to 21 are the 14 days judged.

| Day | Spend | Previous 7 days mean | Previous 7 days SD | Threshold (mean + 3 SD) | Rule result | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 8 | 1,015 | 1,000.0 | 13.2 | 1,039.7 | No flag | Within the usual range. |
| 9 | 985 | 1,005.0 | 10.8 | 1,037.4 | No flag | Below the mean. |
| 10 | 1,000 | 1,001.4 | 12.8 | 1,039.9 | No flag | Within the usual range. |
| 11 | 1,030 | 1,001.4 | 12.8 | 1,039.9 | No flag | z is 2.23, high but below 3. |
| 12 | 1,620 | 1,007.1 | 15.5 | 1,053.7 | Flag | Far above the threshold. |
| 13 | 1,650 | 1,092.9 | 232.9 | 1,791.5 | No flag | Masked: day 12 inflated the standard deviation. |
| 14 | 1,010 | 1,185.0 | 307.9 | 2,108.6 | No flag | Normal spend. |
| 15 | 1,000 | 1,187.1 | 306.4 | 2,106.3 | No flag | Normal spend. |
| 16 | 990 | 1,185.0 | 307.8 | 2,108.5 | No flag | Normal spend. |
| 17 | 1,025 | 1,185.7 | 307.3 | 2,107.6 | No flag | Normal spend. |
| 18 | 1,060 | 1,189.3 | 304.9 | 2,104.0 | No flag | Normal spend. |
| 19 | 1,005 | 1,193.6 | 302.5 | 2,101.1 | No flag | Normal spend. |
| 20 | 995 | 1,105.7 | 241.1 | 1,829.0 | No flag | Normal spend. |
| 21 | 1,380 | 1,012.1 | 24.0 | 1,084.0 | Flag | The window has cleared, so the baseline is tight again. |

**Provenance:** The spend series is synthetic and illustrative, written for this chapter, and the sim must label it "illustrative". The mean and standard deviation are computed from the Rules.

**Rules:** For day d from 8 to 21, mean = average of days d−7 to d−1 as recorded, and SD = sample standard deviation (divisor n − 1) of the same seven values. Threshold = mean + 3 × SD. A day is flagged when spend > threshold. Only increases are flagged. Values are shown to one decimal place. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Multiplier on the standard deviation | 1 | 5 | 0.5 | 3 | standard deviations |
| Window length | 3 | 10 | 1 | 7 | days |

With the changes the flags are recomputed for the days that have a full window, and days without one are marked "No baseline".

**Learner Activity:**

1. The learner sees the spend of day 8 and chooses Flag or No flag, then presses Commit.
2. The sim shows the previous-days mean, the standard deviation, the threshold, and the "Why" text.
3. After 14 days, the learner selects the one day where masking hides a real spike.
4. Exploration unlocks: the learner changes the multiplier and the window and watches which days are flagged.
5. The learner should notice that a lower multiplier flags day 11 but also raises false alarms, and that day 13 is flagged only when the window contains no recent spike.

**Feedback:** Fourteen days, fixed order, two attempts each. Correct: "Correct: <result>." Incorrect on the first attempt: the "Why" text without the result. After a second wrong attempt the result is shown and the day counts as missed. The masked-day question allows one attempt, with the "Why" text for day 13 shown afterwards. A running count "Correct on first attempt: n of 14" is shown.

**Starting State:** Day 8 is shown with the 21-day spend series visible up to that day and no choice made. The question on screen is "Is this day's spend an anomaly under the rule?"

**Chapter Anchors:** The chapter states daily spend near $1,000 with a standard deviation near $13, a threshold near $1,040, a spike of $1,620 with a z-score near 40, a following day of $1,650 with an inflated standard deviation of $233 and a threshold of $1,791, and masking as the cause.
</details>

!!! mascot-encourage "Statistics Without the Fear"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If standard deviations and z-scores feel like a lot at once, that is normal, and you already used the same idea in Chapter 12. Try the rule on the day 8 to 12 numbers by hand first, then let the tool check you.

**Spend forecasting** is the projection of future spend from past usage, prices, and planned changes, used to compare the expected month-end or year-end total with the budget. Two simple methods bracket the answer. The run-rate method multiplies the average daily spend so far by the days in the month. The recent-trend method adds the cumulative spend to the average of the last 7 days times the days remaining. Suppose that after 12 days of a 30-day month the platform has spent $12,600, a daily average of $1,050, and the last 7 days averaged $1,120.

| Method | Calculation | Month-end forecast | Against the $30,000 budget |
|--------|-------------|-------------------:|---------------------------:|
| Run rate | \( 12{,}600 \div 12 \times 30 \) | $31,500 | $1,500 over |
| Recent trend | \( 12{,}600 + 18 \times 1{,}120 \) | $32,760 | $2,760 over |

The two methods differ by $1,260, which is itself useful: a wide gap says the spend is accelerating and the forecast is uncertain. Add known events, such as a planned launch, rather than hoping a trend will capture them.

**Budget variance analysis** is the comparison of actual spend with the budget, with the difference, called the variance, explained by its causes. A variance is favorable when spend is below budget and unfavorable when it is above. The explanation matters more than the total. Split the variance into a volume part, caused by more or fewer requests than planned, and a rate part, caused by a different cost per request. Take Support, budgeted at 3,600,000 requests at $0.0030, which is $10,800, with an actual of 3,900,000 requests at $0.0033, which is $12,870.

| Component | Calculation | Variance |
|-----------|-------------|---------:|
| Volume | \( (3{,}900{,}000 - 3{,}600{,}000) \times 0.0030 \) | $900 unfavorable |
| Rate | \( 3{,}900{,}000 \times (0.0033 - 0.0030) \) | $1,170 unfavorable |
| **Total** | \( 12{,}870 - 10{,}800 \) | **$2,070 unfavorable** |

The larger part, $1,170, is the rate: each request cost 10% more than planned, perhaps because prompts grew. A manager who sees only "$2,070 over" will ask for fewer requests, which is the wrong remedy.

**Cost dashboard design** applies the KPI dashboard principles of Chapter 12 to spend: one audience per dashboard, every figure against a budget or baseline, and drill-down from the total to the cause. The panels for the finance sponsor would be month-to-date spend against budget with the forecast line, cost by tenant, cost per resolved ticket against baseline, tag compliance rate, and the variance split by volume and rate. Operations would add the anomaly flags and the real-time panel.

!!! mascot-warning "A Dashboard Nobody Trusts Gets Replaced by a Spreadsheet"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If the dashboard total disagrees with the invoice, people stop looking at it, and that happens quickly. Show the reconciliation difference on the dashboard itself, and investigate any gap above 1% before you publish a new panel.

### Summary and Quick Check

Usage telemetry starts with structured API call and token usage records, kept under a logging strategy that favors metadata over content, and distributed tracing shows where cost arises inside one request. An observability platform stores them, a sampling strategy keeps the detail affordable but never samples the cost meter, and a retention policy sets how long each class is kept. Cost attribution tagging with a controlled taxonomy and multi-tenant attribution turn one invoice line into a cost per team. A pipeline of collect, transform, load, and serve, with ETL and data quality checks, fills the cost data warehouse. Real-time monitoring, anomaly detection, forecasting, variance analysis, and dashboard design turn it into action. In the example, measured data changed the Chapter 9 allocation by as much as $1,260 for one team. Chapter 14 takes the same data and builds departmental, project, user, and feature views, plus the governance that keeps them trustworthy.

??? note "Quick check: why should the cost fields never be sampled? - Click to expand"
    A few very large requests produce much of the spend, and a small sample is likely to miss them. The estimate then comes out too low, so sample traces and payloads and keep every request's token and cost fields.

??? note "Quick check: why was day 13's $1,650 not flagged although day 12's $1,620 was? - Click to expand"
    The 7-day window for day 13 contained day 12's spike, which inflated the standard deviation from about $15 to $233 and raised the threshold to $1,791. This masking effect is avoided by building baselines from days already judged normal.

??? note "Quick check: what does a volume and rate split of a budget variance tell you that the total does not? - Click to expand"
    It says whether you spent more because you ran more requests or because each request cost more. In the example $900 of the $2,070 overspend is volume and $1,170 is rate, which points at prompt growth rather than demand.

!!! mascot-celebration "You Can Trace a Dollar to Its Request"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now design the log record, the tags, and the pipeline that turn one invoice line into spend by team, and read the anomaly, forecast, and variance signals that follow. That is the foundation every cost report in the rest of this book stands on.
