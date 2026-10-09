---
title: Infrastructure Planning and Cost Monitoring
description: How serving software, GPU memory, batching, and capacity planning set the cost of self-hosted inference, and how monitoring and alerting keep infrastructure spend visible.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 16:30:00
version: 1.11
---

# Infrastructure Planning and Cost Monitoring

## Summary

Moves from serving infrastructure and hardware accelerators to capacity planning, multi-region deployment, and the dashboards used to monitor infrastructure spend. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Model Serving Framework | 51 |
| Inference Server | 50 |
| Hardware Accelerator | 1 |
| GPU Memory Constraint | 48 |
| Batch Size Tuning | 1 |
| Concurrency Limit | 46 |
| Throughput-Latency Tradeoff | 45 |
| Peak Load Provisioning | 44 |
| Capacity Planning | 43 |
| Infrastructure As Code | 42 |
| Multi-Region Deployment | 41 |
| Edge Deployment | 40 |
| Hybrid Cloud Strategy | 39 |
| Total Compute Footprint | 38 |
| Carbon Cost Of Compute | 37 |
| Energy Cost Per Query | 36 |
| Infrastructure Monitoring | 35 |
| Cost Alerting | 34 |
| Budget Threshold | 2 |
| Infrastructure Cost Dashboard | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Compute Pricing and Scaling Fundamentals](../05-compute-pricing-scaling/index.md)

---

Chapter 5 told you what a GPU-hour costs and how pricing models, autoscaling, and utilization turn that rate into a monthly bill. It left one question open: how many GPU-hours do you actually need? That depends on how the model is served, how much memory it occupies, how many requests it handles at once, and how closely your provisioned capacity tracks real demand. This chapter works through those decisions in the order you would make them, then covers where to run the workload, what it consumes in energy, and how to keep watch on the spend once it is live.

!!! mascot-welcome "Sizing the Machine Before You Rent It"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A GPU-hour price tells you nothing until you know how many tokens each hour produces. By the end of this chapter you will be able to size a deployment, defend the number to a finance reviewer, and set the alarms that tell you when the bill drifts. Every token counts, and so does every idle GPU.

### The Serving Stack: From Weights to Answers

A trained model is a file of numbers, called weights. To answer requests it must be loaded onto a **hardware accelerator**: specialized processing hardware, such as a GPU, a TPU, or a custom AI chip, built to run the parallel matrix operations a neural network needs far faster than a general-purpose CPU. Chapter 5 priced GPUs and CPUs; the term "accelerator" simply covers the wider family, and the rest of this chapter says "GPU" whenever the reasoning applies to any of them.

Loading weights is only the first job. Something must also queue incoming requests, group them into efficient batches, run the model, and stream tokens back. A **model serving framework** is the software that does this work: it loads the model into accelerator memory, batches requests, and executes inference efficiently on the available hardware. An **inference server** is one running instance of that framework on provisioned hardware, the process that actually receives your traffic. In cost terms, the framework determines how many tokens per second a given GPU can produce, and therefore how many GPU-hours your workload needs. Two teams renting the identical GPU can pay very different amounts per million tokens purely because one framework batches more cleverly than the other.

<details markdown="1">
<summary>Quick check: framework or server?</summary>
Type: markdown-list

- "The software package we adopted because it batches requests continuously" is the **model serving framework**.
- "The three GPU nodes currently answering production traffic" are three **inference servers**, each running the framework.
</details>

#### What Fits in GPU Memory

Before any tuning, the model has to fit. A **GPU memory constraint** is the limit that the accelerator's finite memory places on model size, batch size, and context length, because the weights and the working data of every in-flight request must live in that memory at the same time. Two quantities consume it:

- **Weights**: parameter count multiplied by bytes per parameter. A 16-bit (FP16) weight takes 2 bytes, an 8-bit weight takes 1 byte, and a 4-bit weight takes half a byte.
- **KV cache**: the stored attention keys and values for every token of every active request, so the model does not recompute them for each new token. It grows with context length and with the number of concurrent requests.

The worked example below uses an 8-billion-parameter model whose architecture is similar to published open-weight models of that size (32 layers, 8 key-value heads, 128 values per head). The GPU has 80 GB of memory, and the example reserves 4 GB for the framework's own buffers. All figures use round numbers, and the GPU size is illustrative.

| Step | Calculation | Result |
|------|-------------|--------|
| Weights at FP16 | 8 billion parameters × 2 bytes | 16 GB |
| Memory left for the KV cache | 80 GB − 16 GB weights − 4 GB buffers | 60 GB |
| KV cache per token | 32 layers × 8 heads × 128 values × 2 (key and value) × 2 bytes | about 0.125 MB |
| KV cache per request at 4,000 tokens | 4,000 × 0.125 MB | 500 MB |
| Maximum simultaneous requests | 60 GB ÷ 500 MB | 120 |

The last row is the cost-relevant one: this GPU cannot serve more than 120 simultaneous 4,000-token conversations, whatever the traffic. Quantizing the weights to 8 bits (Chapter 2) frees 8 GB, which raises the ceiling to 136. Doubling the average context to 8,000 tokens halves it to 60. A 70-billion-parameter model at FP16 needs 140 GB for weights alone, so it cannot fit on one 80 GB GPU at all and must be split across at least two, which doubles the hourly cost before a single request is served.

!!! mascot-thinking "Memory, Not Compute, Often Sets the Ceiling"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the table never mentioned compute speed: the 120-request ceiling comes entirely from memory arithmetic. When someone says a GPU "can handle" a workload, ask which resource runs out first.

### Batching, Concurrency, and the Throughput-Latency Tradeoff

A GPU is most efficient when it works on many requests together. **Batch size tuning** is the choice of how many requests the server processes in a single inference pass. A larger batch spreads the fixed cost of reading the weights from memory across more requests, so aggregate output rises. It also makes each individual request slower, because every pass takes longer and uses more KV-cache memory.

A related control is the **concurrency limit**: the maximum number of simultaneous requests the inference server accepts, beyond which new requests queue or are rejected. The limit protects two things, the latency promised to users and the memory ceiling from the previous section. In our example no concurrency limit above 120 is safe at 4,000-token contexts.

These two controls produce the **throughput-latency tradeoff**: configuring a server for the most tokens per second generally raises the time each request waits, and the reverse. Before the table below, three terms. **Inter-token latency** is the time between consecutive output tokens for one request. **Aggregate throughput** is the total output tokens per second across all requests in the batch, equal to batch size divided by inter-token latency. **Cost per million tokens** is the GPU's hourly price converted to a per-second price and divided by aggregate throughput. The illustrative measurements below are for the 8-billion-parameter model on one GPU priced at $4.00 per hour, generating a 400-token response.

| Batch size | Inter-token latency | Aggregate throughput | Time for a 400-token response | Cost per million tokens |
|-----------:|--------------------:|---------------------:|------------------------------:|------------------------:|
| 1 | 20 ms | 50 tokens/s | 8 s | $22.22 |
| 8 | 25 ms | 320 tokens/s | 10 s | $3.47 |
| 32 | 40 ms | 800 tokens/s | 16 s | $1.39 |
| 64 | 70 ms | 914 tokens/s | 28 s | $1.22 |
| 128 | 140 ms | 914 tokens/s | 56 s | $1.22 |

Read down the throughput column: moving from batch 1 to batch 32 multiplies output sixteenfold while the response takes only twice as long, which is why the cost per million tokens falls by a factor of sixteen. Past batch 64 the GPU's compute is saturated, so throughput stops improving while latency keeps doubling. Batch 128 is also unusable here, since it exceeds the 120-request memory ceiling at 4,000-token contexts.

Suppose the product requires a 400-token response within 20 seconds. Batch 32 meets that limit (16 s) at $1.39 per million tokens; batch 64 is cheaper but takes 28 s and breaks it. The cheapest batch size is the largest one that still satisfies the latency limit and fits in memory.

!!! mascot-tip "Pick the Batch Size From the Latency Limit"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Write the latency limit down first, then choose the largest batch that meets it. Starting from "maximum throughput" and checking latency afterward is how teams ship a cheap service nobody can stand to use.

#### Diagram: Serving Batch Size Tuner

<iframe src="../../sims/serving-batch-tuner/main.html" width="100%" height="447px" scrolling="no"></iframe>

<details markdown="1">
<summary>Serving Batch Size Tuner</summary>
Type: microsim
**sim-id:** serving-batch-tuner<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** solve<br/>
**Learning Objective:** The learner will solve for the batch size that gives the lowest cost per million tokens while a 400-token response finishes within a stated latency limit and the batch fits in GPU memory.

**Prerequisites:** batch size tuning, concurrency limit, throughput-latency tradeoff, inter-token latency, aggregate throughput, cost per million tokens, GPU memory constraint (all defined in the sections "What Fits in GPU Memory" and "Batching, Concurrency, and the Throughput-Latency Tradeoff" above).

**Evidence of Mastery:** For each of four challenges the learner commits one batch size before any row is highlighted. A commitment is correct when it equals the batch size with the lowest cost per million tokens among the batch sizes that satisfy both the latency limit (response time <= limit) and the memory ceiling (batch size <= 120). When two batch sizes tie on cost, the smaller one is correct. Mastery is 3 of 4 correct on the first attempt. Exploration (changing the selected batch size and reading the readouts) is not evidence.

**Misconceptions:** (1) The largest batch is always the cheapest. (2) Cost keeps falling as batch size rises. (3) A batch that is fast enough on latency must also fit in memory.

**Instructional Rationale:** Apply-level solving needs a procedure practiced against a checkable answer. The learner commits a batch size first, and the exploration mode that follows lets them see why the saturated and memory-limited rows were wrong.

**Content:**

The model is the 8-billion-parameter model on one GPU at $4.00 per hour, generating 400 output tokens per response with a 4,000-token context. The batch sizes the learner can choose are 1, 8, 32, 64 and 128, with these values:

| Batch size | Inter-token latency (ms) | Aggregate throughput (tokens/s) | Response time for 400 tokens (s) | Cost per million tokens (USD) | Fits in memory at 4,000-token context |
|---|---|---|---|---|---|
| 1 | 20 | 50 | 8 | 22.22 | Yes |
| 8 | 25 | 320 | 10 | 3.47 | Yes |
| 32 | 40 | 800 | 16 | 1.39 | Yes |
| 64 | 70 | 914 | 28 | 1.22 | Yes |
| 128 | 140 | 914 | 56 | 1.22 | No (ceiling is 120) |

The four challenges, in this order:

| # | Latency limit for a 400-token response | Correct batch size | Why (shown as feedback) |
|---|---|---|---|
| 1 | 10 s | 8 | Batch 8 takes 10 s, which meets a limit of 10 s or less; batch 32 takes 16 s and breaks it. |
| 2 | 20 s | 32 | Batch 32 takes 16 s and costs $1.39; batch 64 is cheaper but takes 28 s and breaks the limit. |
| 3 | 30 s | 64 | Batch 64 takes 28 s and costs $1.22, the lowest cost among batch sizes that meet the limit. |
| 4 | 60 s | 64 | Batch 128 meets the latency limit at 56 s but does not fit in memory, and it costs the same $1.22 because throughput is already saturated. |

**Provenance:** Illustrative values, which the sim must label "illustrative", chosen to be consistent with the arithmetic in the chapter section "Batching, Concurrency, and the Throughput-Latency Tradeoff". Cost per million tokens is computed from the Rules and rounded to the cent. The memory ceiling of 120 comes from the chapter's worked example in "What Fits in GPU Memory".

**Rules:** Aggregate throughput = batch size ÷ inter-token latency (in seconds). Response time = 400 × inter-token latency. Cost per million tokens = ($4.00 ÷ 3,600) ÷ aggregate throughput × 1,000,000. A batch size is feasible when response time <= the latency limit and batch size <= 120. The correct answer is the feasible batch size with the lowest cost; ties go to the smaller batch size. If no batch size is feasible, the sim reports "no feasible batch size" (cannot occur with the four limits above because batch size 1 takes 8 s).

**Learner Activity:**

1. The learner reads the latency limit for the current challenge and the table of five batch sizes with all readouts visible.
2. The learner chooses one batch size and presses Commit.
3. The sim marks the chosen row and shows whether it was correct, with the feedback text.
4. After four challenges, exploration mode unlocks: the learner picks any latency limit from 8 s to 60 s in steps of 1 s (default 20 s) and any context length from 2,000 to 8,000 tokens in steps of 2,000 (default 4,000); the sim marks every batch size as feasible or not and highlights the correct answer. The memory ceiling is 240 at 2,000 tokens, 120 at 4,000, 80 at 6,000 and 60 at 8,000.
5. The learner should notice that raising the context length removes the larger batch sizes from the feasible set even when the latency limit is generous.

**Feedback:** Four challenges, fixed order, two attempts each. Correct: "Correct: batch <n> takes <t> s and costs $<c> per million tokens." Incorrect on the first attempt: the "Why" text for that challenge. After a second wrong attempt the correct row is highlighted with the "Why" text and the challenge counts as missed. A running count "Challenges correct on first attempt: n of 4" is shown.

**Starting State:** Challenge 1 is shown with no row selected. The question on screen is "Which batch size is cheapest while a 400-token response still finishes within 10 seconds?"

**Chapter Anchors:** The chapter states a $4.00 per hour GPU, a 400-token response, five batch sizes (1, 8, 32, 64, 128), a cost of $22.22 at batch 1 and $1.22 at batches 64 and 128, a 20-second example whose answer is batch 32 at $1.39, and a memory ceiling of 120 simultaneous 4,000-token requests.
</details>

### Sizing for Demand: Peak Provisioning and Capacity Planning

Knowing what one inference server can do, you can ask how many you need. **Peak load provisioning** is the practice of sizing capacity for the highest expected demand rather than the average, so that service quality holds during spikes. It is safe and expensive: every instance you add for the peak sits idle the rest of the day, which is the idle capacity cost from Chapter 5. **Capacity planning** is the wider, forward-looking process of estimating future compute, storage, and throughput needs, then provisioning to balance idle cost against the risk of running short. It draws on historical utilization and on spend forecasts, a technique Chapter 10 develops.

The worked example below chains the earlier arithmetic into a sizing decision. Each inference server runs at batch 32, producing 800 tokens per second (from the previous table). An average response is 400 tokens, so one server completes two responses per second. The team keeps utilization at or below 80% at peak, so a latency spike does not become an outage. Demand is 5 requests per second for 4 hours each day, and 1 request per second the other 20 hours.

| Step | Calculation | Result |
|------|-------------|--------|
| Peak token demand | 5 requests/s × 400 tokens | 2,000 tokens/s |
| Usable capacity per server | 800 tokens/s × 80% | 640 tokens/s |
| Servers for the peak | 2,000 ÷ 640 = 3.13, rounded up | 4 |
| Servers for off-peak | 1 request/s × 400 = 400 tokens/s; 400 ÷ 640 = 0.63, rounded up | 1 |
| Cost, 4 servers around the clock | 4 × 720 hours × $4.00 | $11,520 per month |
| Cost, 1 server always on plus 3 added for peak hours | 1 × 720 × $4.00 + 3 × (4 hours × 30 days) × $4.00 = $2,880 + $1,440 | $4,320 per month |
| Average utilization if provisioned for the peak all day | mean demand 667 tokens/s ÷ (4 × 800 = 3,200 tokens/s) | about 21% |

Provisioning for the peak around the clock costs $7,200 a month more than adding capacity only when it is needed, which is 62.5% of the peak-provisioned bill, and runs at about 21% utilization. The elastic plan is not free of risk: the three added servers must start before the spike (a warm pool, from Chapter 5), and the team must confirm that traffic really follows the schedule.

!!! mascot-warning "Peak Is the Right Size Only for the Peak"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A fleet sized for the busiest hour will look wasteful on every utilization report for the other twenty. Pair the peak number with a schedule or an autoscaling rule from day one, so finance sees a plan rather than a surprise.

#### Diagram: Peak Capacity Planner

<iframe src="../../sims/peak-capacity-planner/main.html" width="100%" height="482px" scrolling="no"></iframe>

<details markdown="1">
<summary>Peak Capacity Planner</summary>
Type: microsim
**sim-id:** peak-capacity-planner<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the number of inference servers needed for a stated peak request rate and utilization ceiling, and the monthly cost of provisioning for the peak around the clock, to the nearest whole server and dollar.

**Prerequisites:** inference server, peak load provisioning, capacity planning, idle capacity cost, utilization (all defined above or in Chapter 5).

**Evidence of Mastery:** For each of three scenarios the learner types the number of servers and the monthly cost of running that many servers around the clock before the sim reveals the model answer. A response is correct when the server count equals the model count and the cost equals the model cost within $1. Mastery is 3 of 3 correct on the first attempt. Exploration of the elastic plan is not evidence.

**Misconceptions:** (1) Servers needed = peak tokens ÷ raw capacity, with no utilization ceiling. (2) Rounding down is acceptable. (3) A peak-sized fleet has high average utilization.

**Instructional Rationale:** Apply-level calculation needs a checked procedure. Committing numbers before the reveal surfaces the rounding and headroom errors, and the exploration mode then lets the learner see how schedule changes alter the elastic plan.

**Content:**

Fixed facts shown in every scenario: each server produces 800 tokens per second, an average response is 400 tokens, a server costs $4.00 per hour, a month has 30 days of 24 hours (720 hours).

| # | Peak requests per second | Utilization ceiling | Model server count | Model monthly cost (peak-provisioned) | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | 5 | 80% | 4 | $11,520 | 5 × 400 = 2,000 tokens/s; 2,000 ÷ (800 × 0.80 = 640) = 3.13, rounded up to 4; 4 × 720 × $4.00 = $11,520. |
| 2 | 2 | 80% | 2 | $5,760 | 2 × 400 = 800 tokens/s; 800 ÷ 640 = 1.25, rounded up to 2; 2 × 720 × $4.00 = $5,760. |
| 3 | 8 | 80% | 5 | $14,400 | 8 × 400 = 3,200 tokens/s; 3,200 ÷ 640 = 5.00, exactly 5; 5 × 720 × $4.00 = $14,400. |

**Provenance:** Server throughput of 800 tokens per second comes from the chapter's batch table (batch 32). The other values are illustrative and the sim must label them "illustrative". Costs are computed from the Rules.

**Rules:** Servers = ceiling(peak requests per second × 400 ÷ (800 × utilization ceiling)). Peak-provisioned monthly cost = servers × 720 × hourly price. In exploration, the elastic monthly cost = off-peak servers × 720 × hourly price + (peak servers − off-peak servers) × peak hours per day × 30 × hourly price, where off-peak servers is computed by the same formula from the off-peak rate. Quantities the learner can change in exploration:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Peak requests per second | 1 | 10 | 1 | 5 | requests/s |
| Off-peak requests per second | 0 | peak value | 1 | 1 | requests/s |
| Peak hours per day | 1 | 12 | 1 | 4 | hours |
| Utilization ceiling | 50 | 90 | 10 | 80 | percent |
| Hourly price | 2 | 8 | 1 | 4 | USD per hour |

If the off-peak rate is 0, off-peak servers is 0 and the elastic plan has no always-on server (the sim notes that this gives cold starts).

**Learner Activity:**

1. The learner reads the scenario and types a server count and a monthly cost.
2. The learner presses Check. The sim shows the model answer and the "Why" text beside the learner's numbers.
3. After three scenarios, exploration unlocks. The learner changes the five quantities and watches the peak-provisioned cost, the elastic cost, the saving, and the average utilization of the peak-provisioned fleet update together.
4. The learner should notice that shortening the peak window widens the gap between the two plans.

**Feedback:** Three scenarios, fixed order, two attempts each. Correct: "Correct: <servers> servers, $<cost> per month." Incorrect first attempt: the "Why" text with the arithmetic. After the second wrong attempt the model answer is shown and the scenario counts as missed. A running count "Scenarios correct on first attempt: n of 3" is shown.

**Starting State:** Scenario 1 with empty answer boxes. The question on screen is "How many servers do you need for a peak of 5 requests per second, and what do they cost per month if they run all month?"

**Chapter Anchors:** The chapter states 800 tokens per second per server at batch 32, 400-token responses, an 80% utilization ceiling, a peak of 5 requests per second for 4 hours and 1 request per second otherwise, 4 servers for the peak at $11,520 per month, an elastic plan at $4,320 per month, a saving of $7,200 per month (62.5%), and about 21% average utilization.
</details>

#### Infrastructure as Code

Capacity decisions only help if every environment actually matches them. **Infrastructure as code** is the practice of defining compute, network, and storage resources in machine-readable configuration files, rather than clicking through a console, so deployments are repeatable and version-controlled. For cost control its value is direct: the instance type, minimum and maximum counts, region, and cost-allocation tags live in a file that is reviewed like any other change, so a sizing decision becomes a code review rather than an undocumented console edit.

The fragment below is illustrative YAML, not the syntax of any particular tool. Four fields matter for cost: `accelerator` selects the hardware, `min_instances` and `max_instances` bound the autoscaler (the minimum is your always-on floor, billed whether or not traffic arrives), and `tags.cost_center` tells the billing system whom to charge.

```yaml
inference_service: support-assistant
accelerator: gpu-80gb
region: us-east
min_instances: 1
max_instances: 4
max_utilization: 0.80
tags:
  cost_center: customer-support
  environment: production
```

This file encodes the elastic plan from the previous section: one always-on server, three more available for peaks, and a charge-back tag. Changing `min_instances` from 1 to 4 is a one-line diff that adds $7,200 a month, which is exactly the kind of change a reviewer should see before it ships.

### Where to Run It: Regions, Edge, and Hybrid

So far the workload has lived in one data center. Three alternatives change both the cost and the risk profile.

**Multi-region deployment** runs the same model in more than one geographic region at once. Teams choose it to cut latency for distributed users or to satisfy data residency obligations that require data to be processed in a given jurisdiction. Its costs are structural: every region needs its own always-on floor, so two regions double the minimum bill, and replicating data and models between regions adds data transfer charges. In our example, a floor of one server per region across two regions costs $5,760 a month against $2,880 for one. Latency is a weaker reason than it appears: a trans-Atlantic network round trip adds on the order of 100 milliseconds, small beside the 16-second generation time in the batch table, though it matters more for the delay before the first token appears. Residency rules are the more common real driver.

**Edge deployment** runs inference near where data is produced or consumed, for example on a user's device or a local gateway, instead of in a central data center. A 3-billion-parameter model quantized to 4 bits is about 1.5 GB (3 billion × 0.5 byte), small enough for a laptop or phone, and it removes the per-query cloud charge and the network egress for that traffic. The limits are the mirror image: edge hardware is much smaller than a data-center accelerator, so only compact models fit, and the team must distribute and update model files across many devices.

**Hybrid cloud strategy** combines on-premises hardware with cloud resources and routes each workload to whichever suits it. A common pattern runs the steady baseline on owned or reserved capacity, where the fixed cost is amortized over high utilization, and bursts into cloud capacity for spikes. Organizations also adopt it to limit dependence on a single vendor while keeping cloud elasticity.

| Approach | Main reason to choose it | Main added cost or limit |
|----------|-------------------------|--------------------------|
| Single region | Simplest and cheapest | One geography, one failure domain |
| Multi-region | Latency for distant users, data residency, resilience | Duplicate always-on floors, data transfer |
| Edge | Offline use, data stays on device, no per-query cloud charge | Small models only, fleet updates |
| Hybrid cloud | Cheap steady baseline plus elastic bursts, less vendor dependence | Operating two environments |

#### Diagram: Deployment Placement Sorter

<iframe src="../../sims/deployment-placement-sorter/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Deployment Placement Sorter</summary>
Type: microsim
**sim-id:** deployment-placement-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish which of four placement approaches (single region, multi-region, edge, hybrid cloud) best fits each of eight workload descriptions, by matching the deciding requirement in each description.

**Prerequisites:** multi-region deployment, edge deployment, hybrid cloud strategy, data residency, always-on floor (all defined in the section "Where to Run It: Regions, Edge, and Hybrid" above).

**Evidence of Mastery:** The learner assigns each of eight scenario cards to one of four bins and commits the assignment. An assignment is correct when it matches the answer column in Content. Mastery is 7 of 8 correct on the first attempt.

**Misconceptions:** (1) Multi-region is the default choice for reliability and always worth its cost. (2) Edge deployment is suitable for any model size. (3) Hybrid cloud is only about cost, not control or vendor dependence.

**Instructional Rationale:** Analyze-level distinction requires the learner to pick out the deciding requirement in a description and match it to an approach, which a sorting task with explained feedback makes explicit.

**Content:**

| # | Scenario card shown to the learner | Correct bin | Why (shown as feedback) |
|---|---|---|---|
| 1 | An internal summarizer used by one office in one country, tolerant of a delay of several seconds. | Single region | No distance, residency or resilience requirement justifies a second always-on floor. |
| 2 | A bank must process customer data inside two countries, each of which forbids moving it abroad. | Multi-region | Residency rules require processing in each jurisdiction, accepting two always-on floors. |
| 3 | A field-inspection app must classify photos with no network connection. | Edge | Offline use requires the model on the device. |
| 4 | A retailer runs a steady 2 million queries a day on owned servers and sends only holiday spikes to a cloud provider. | Hybrid cloud | Owned hardware is cheapest at steady load; cloud absorbs bursts. |
| 5 | A consumer app has users on three continents and needs the first token to appear quickly everywhere. | Multi-region | Placing capacity near users cuts the delay before the first token. |
| 6 | A hospital wants a 3-billion-parameter 4-bit model to run on clinicians' tablets so patient notes never leave the device. | Edge | Data stays on the device and the model is small enough to fit. |
| 7 | A company wants to keep a credible exit from its single cloud vendor while retaining elasticity for new projects. | Hybrid cloud | Spanning on-premises and cloud limits vendor dependence without giving up elasticity. |
| 8 | A prototype with 20 users, a weekly demo, and no data restrictions. | Single region | Spending on duplicate capacity before demand exists is waste. |

**Provenance:** Scenarios are illustrative and the sim must label them "illustrative". The reasons follow the chapter section "Where to Run It: Regions, Edge, and Hybrid".

**Rules:** Each card goes to exactly one bin. Four bins: Single region, Multi-region, Edge, Hybrid cloud. Card order is shuffled with a fixed seed (7) so every learner sees the same order. A commitment is final only after all eight cards are placed and the learner presses Commit.

**Learner Activity:**

1. The learner reads each card and places it in one of the four bins.
2. After placing all eight, the learner presses Commit.
3. The sim marks each card correct or incorrect and shows the "Why" text for every incorrect card.
4. The learner may then press Retry once; incorrect cards return to the pool and are re-placed, and the retry does not count toward mastery.

**Feedback:** One commitment (first attempt) is scored; one retry is allowed for practice. Correct cards show "Correct: <why>". Incorrect cards show the "Why" text for the correct bin. The score "n of 8 correct on the first attempt" is shown after the commitment.

**Starting State:** All eight cards are in the pool with the four bins empty. The question on screen is "Which approach does each workload need?"

**Chapter Anchors:** The chapter states four approaches (single region, multi-region, edge, hybrid cloud), a floor of $2,880 versus $5,760 for two regions, a 100-millisecond trans-Atlantic round trip, and a 3-billion-parameter 4-bit model of about 1.5 GB.
</details>

### Footprint: Compute, Energy, and Carbon

Dollars are not the only unit infrastructure produces. The **total compute footprint** is the aggregate volume of compute your GenAI workloads consume, measured in GPU-hours or CPU-hours across training, fine-tuning, and inference. It is the physical counterpart of the dollar figures: in the capacity example, the peak-provisioned plan consumes 4 × 720 = 2,880 GPU-hours a month, while the elastic plan consumes 720 + 3 × 120 = 1,080 GPU-hours. The two plans differ in cost and in footprint by the same 62.5%.

Footprint becomes energy through **energy cost per query**, the electricity expense of processing one inference request, found by dividing the system's power consumption by the number of queries it serves. **Carbon cost of compute** then converts that electricity into estimated greenhouse-gas emissions, using the carbon intensity of the power grid (kilograms of carbon dioxide equivalent per kilowatt-hour). Organizations increasingly report it beside financial cost in sustainability disclosures.

Three inputs are needed beyond throughput: the GPU's power draw, the data center's overhead factor (called power usage effectiveness, or PUE, the ratio of total facility power to the power reaching the computing equipment), and the electricity price. The example uses 700 W for the GPU under load, a PUE of 1.3, 0.4 kg CO₂e per kWh, and $0.10 per kWh, all illustrative and ignoring the host server's own draw.

| Step | Calculation | Result |
|------|-------------|--------|
| GPU time per 400-token response | 400 tokens ÷ 800 tokens/s | 0.5 s |
| Energy at the GPU | 700 W × 0.5 s = 350 J = 350 ÷ 3,600 Wh | 0.097 Wh |
| Energy including facility overhead | 0.097 Wh × 1.3 | 0.126 Wh per query |
| Electricity cost per 10 million queries | 0.126 Wh × 10,000,000 = 1,264 kWh × $0.10 | about $126 |
| Carbon per 10 million queries | 1,264 kWh × 0.4 kg per kWh | about 506 kg CO₂e |
| GPU rental for the same queries | 4 billion tokens × $1.39 per million | about $5,560 |

The comparison in the last row is the point. Electricity is about 2% of what the rented GPU costs, so for a team renting cloud capacity, energy is not a lever on the dollar bill. It matters for an on-premises fleet, where you pay the electric bill directly, and for any organization that reports emissions; there, the number you can act on is the footprint, because fewer GPU-hours means proportionally less energy and carbon.

### Watching the Spend: Monitoring, Alerts, and Dashboards

A well-sized deployment still drifts: traffic grows, a retry loop multiplies requests, a developer leaves a test fleet running. **Infrastructure monitoring** is the continuous collection and display of operational metrics for the systems that run your workloads. For a GenAI deployment the most useful signals are:

- GPU utilization and GPU memory in use, the direct measures of idle capacity and of how close you are to the memory ceiling
- Request queue depth and 95th-percentile latency, which show whether the concurrency limit is being hit
- Error and timeout rates, which often rise before a capacity problem becomes visible to users
- Instance count over time, the number that most closely tracks the compute bill

Monitoring tells you what the system is doing. **Cost alerting** turns spending into a signal: automated notifications that fire when spend or usage crosses a defined level, so people respond before costs run further. That level is the **budget threshold**, a predefined spend or usage figure that triggers a notification or an automated control such as throttling. Thresholds are usually set as percentages of an approved budget, for example 50%, 80%, and 100%.

Absolute thresholds have a blind spot, shown by the worked example below. A team has a monthly infrastructure budget of $12,000 and normally spends $330 a day. On day 10 a runaway batch job pushes daily spend to $700 and nobody notices. Cumulative spend is $2,970 through day 9, and $700 more each day after.

| Alert | Fires when | Day it fires | Cumulative spend that day |
|-------|-----------|-------------:|--------------------------:|
| Forecast alert | Projected month-end spend (cumulative ÷ day × 30) reaches $12,000 | 12 | $5,070 |
| 50% threshold | Cumulative spend reaches $6,000 | 14 | $6,470 |
| 80% threshold | Cumulative spend reaches $9,600 | 19 | $9,970 |
| 100% threshold | Cumulative spend reaches $12,000 | 22 | $12,070 |

The 100% alert fires on day 22, with 8 days left and the budget already gone. By month end the team would have spent $17,670, which is $5,670 over. The forecast alert, which extrapolates the current average to the month's end, fires on day 12, ten days earlier, because it reacts to the rate rather than the total. On day 11 the projection is $11,918, just under the line; on day 12 it is $12,675.

!!! mascot-warning "A Total Alone Is Always Late"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    An alert on cumulative spend can only fire after the money is spent. Add at least one rate-based alert, such as a forecast against the month-end budget, and make sure each alert names an owner who can act on it.

#### Diagram: Budget Burn Alert Simulator

<iframe src="../../sims/budget-burn-alert-simulator/main.html" width="100%" height="472px" scrolling="no"></iframe>

<details markdown="1">
<summary>Budget Burn Alert Simulator</summary>
Type: microsim
**sim-id:** budget-burn-alert-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the day on which each of four cost alerts (50%, 80%, 100% of budget, and month-end forecast) fires for a month with a runaway daily spend, to the exact day.

**Prerequisites:** cost alerting, budget threshold, cumulative spend, projected month-end spend (all defined in the section "Watching the Spend" above).

**Evidence of Mastery:** For each of the four alerts the learner types a day number before the sim plays the month. An answer is correct when it equals the day computed by the Rules. Mastery is 4 of 4 correct, with at most one wrong attempt across the four. Exploration is not evidence.

**Misconceptions:** (1) The 100% alert gives enough warning. (2) A forecast alert fires at the same time as the 50% alert. (3) Spend that is normal for 9 days means the month is on budget.

**Instructional Rationale:** Apply-level calculation requires the learner to run the threshold and forecast rules on a series. Committing days first exposes the difference between a total-based and a rate-based alert, and playing the month afterward shows the consequence.

**Content:**

A 30-day month with a $12,000 budget. Daily spend is $330 on days 1 through 9 and $700 on days 10 through 30. Cumulative spend is $2,970 at the end of day 9, so cumulative spend on day d >= 10 is 2,970 + 700 × (d − 9).

| Alert | Rule | Correct day | Cumulative spend on that day | Why (shown as feedback) |
|---|---|---|---|---|
| Forecast | cumulative ÷ d × 30 >= 12,000 | 12 | $5,070 | Day 11 projects $11,918, below $12,000; day 12 projects $12,675, which is at or above it. |
| 50% threshold | cumulative >= 6,000 | 14 | $6,470 | Day 13 totals $5,770, below $6,000; day 14 totals $6,470. |
| 80% threshold | cumulative >= 9,600 | 19 | $9,970 | Day 18 totals $9,270, below $9,600; day 19 totals $9,970. |
| 100% threshold | cumulative >= 12,000 | 22 | $12,070 | Day 21 totals $11,370, below $12,000; day 22 totals $12,070. |

End-of-month total with no action: $17,670, which is $5,670 over budget.

**Provenance:** Synthetic data from the generating rule above (no random element); the sim must label it "synthetic". The numbers match the chapter section "Watching the Spend".

**Rules:** An alert fires on the first day d for which its rule is true (>=). Forecast projection = cumulative ÷ d × 30, rounded to the dollar for display. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Monthly budget | 6,000 | 24,000 | 1,000 | 12,000 | USD |
| Normal daily spend | 100 | 600 | 10 | 330 | USD per day |
| Runaway daily spend | 100 | 1,200 | 100 | 700 | USD per day |
| Runaway start day | 2 | 28 | 1 | 10 | day |

If an alert never fires in the month, the sim shows "does not fire this month".

**Learner Activity:**

1. The learner reads the month's description and types a day for each of the four alerts.
2. The learner presses Check; the sim plays the month day by day, marking each alert on the day it fires, beside the learner's answers.
3. After the four checks, exploration unlocks: the learner changes the four quantities and sees all four firing days and the end-of-month total update.
4. The learner should notice that the forecast alert moves earlier than every threshold alert whenever spend rises mid-month.

**Feedback:** Four alerts, fixed order, two attempts each. Correct: "Correct: day <d>, cumulative spend $<s>." Incorrect first attempt: the "Why" text for that alert. After a second wrong attempt the correct day is shown with the "Why" text and the alert counts as missed. A running count "Alerts correct: n of 4" is shown.

**Starting State:** The month is shown unplayed, with the budget and the spend pattern stated. The question on screen is "On which day does the forecast alert fire?"

**Chapter Anchors:** The chapter states a $12,000 monthly budget, $330 normal daily spend, $700 runaway spend from day 10, firing days of 12 (forecast), 14, 19 and 22, a month-end total of $17,670 and an overspend of $5,670.
</details>

#### Dashboards

An **infrastructure cost dashboard** is the visual interface for compute, storage, and networking spend, distinct from the broader cost dashboards of Chapter 13 that also show token and vendor-fee spend. Its job is to support the operational decisions in this chapter. A useful one answers four questions at a glance:

| Panel | Question it answers | Decision it supports |
|-------|--------------------|----------------------|
| Instances and GPU-hours over time | Is the fleet size tracking demand? | Capacity planning, autoscaling limits |
| Utilization by service | Where is capacity idle? | Right-sizing, reserved commitments |
| Spend against budget, with forecast | Will the month end on budget? | Cost alerting, threshold settings |
| Spend by cost-center tag | Who is responsible for this spend? | Attribution, showback (Chapter 9) |

The last panel depends on the tags written in the infrastructure-as-code file, which is why the cost-center tag in that fragment matters more than it appears.

### Summary and Quick Check

A self-hosted deployment's bill follows from a chain of decisions: the framework and hardware set tokens per GPU-hour; GPU memory sets the ceiling on batch size and concurrency; batch size trades latency for cost; capacity planning turns peak and off-peak demand into server counts; infrastructure as code makes those decisions reviewable; and placement (single region, multi-region, edge, hybrid) adds fixed floors or removes network cost. The footprint translates into energy and carbon, a small dollar cost for cloud renters but a real reporting dimension. Monitoring, rate-based alerts at sensible thresholds, and a tagged dashboard keep the result visible. Chapter 7 turns from the infrastructure to the requests it serves, covering prompt, routing, and retrieval techniques that reduce the tokens each request needs.

??? note "Quick check: why can a cheaper batch size be the wrong choice? - Click to expand"
    Because cost per million tokens is only one constraint. A larger batch lowers the cost but raises each request's response time, and past the memory ceiling it cannot run at all. The right batch size is the cheapest one that still meets the latency limit and fits in GPU memory.

??? note "Quick check: why does a forecast alert fire before a 100% threshold alert? - Click to expand"
    A threshold alert reacts to the total already spent, so it fires only after the money is gone. A forecast extrapolates the current daily rate to month end, so it fires as soon as the rate is high enough to exceed the budget, which is days earlier.

!!! mascot-celebration "You Can Size and Watch a Deployment"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now work from GPU memory to a batch size, a server count, and a monthly cost, and then set the alerts that catch drift. That is the full chain from a hardware spec to a number a finance reviewer can check.
