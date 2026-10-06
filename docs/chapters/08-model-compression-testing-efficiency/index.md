---
title: Model Compression, Testing, and Continuous Efficiency
description: Testing-driven efficiency: batching and scheduling, prompt versioning and A/B tests, cost-per-task benchmarking, model compression and decoding techniques, and the audits and regression tests that keep savings from eroding.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 16:55:00
version: 1.11
---

# Model Compression, Testing, and Continuous Efficiency

## Summary

Covers testing-driven efficiency techniques — A/B testing, benchmarking, distillation, quantization, and speculative decoding — plus the continuous-optimization discipline that sustains savings. This chapter covers 25 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Batch Processing Strategy | 1 |
| Asynchronous Processing | 24 |
| Off-Peak Scheduling | 1 |
| Prompt Reuse Library | 1 |
| Prompt Version Control | 21 |
| A/B Testing Prompts | 20 |
| Cost-Per-Task Benchmarking | 19 |
| Quality-Cost Tradeoff | 18 |
| Latency-Cost Tradeoff | 17 |
| Right-Sizing Review Cycle | 16 |
| Fine-Tuning Vs Prompting | 1 |
| Distillation For Cost Cutting | 14 |
| Quantization For Cost Cutting | 13 |
| Sparse Model Techniques | 12 |
| Mixture Of Experts | 11 |
| Speculative Decoding | 10 |
| KV Cache Optimization | 9 |
| Parallel Sampling Cost | 1 |
| Self-Consistency Cost | 7 |
| Guardrail Overhead Cost | 6 |
| Content Filtering Cost | 5 |
| Token Efficiency Audit | 4 |
| Continuous Cost Optimization | 3 |
| Cost Regression Testing | 2 |
| Efficiency Gain Tracking | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)
- [Chapter 2: Prompting, Deployment, and Model Optimization Basics](../02-prompting-deployment-optimization/index.md)
- [Chapter 7: Prompt, Routing, and Retrieval Efficiency Techniques](../07-prompt-routing-retrieval-efficiency/index.md)

---

Chapter 7 gave you levers; this chapter teaches you to pull them safely and keep them pulled. Every technique so far trades something, usually a little quality or a little complexity, for money, and the trade is only a bargain if you can measure it. So this chapter starts with the cheapest lever of all (changing when work runs), moves to the testing and benchmarking that justify every other change, covers the model-level techniques that make inference itself cheaper, and ends with the practice that stops savings from quietly eroding.

The examples reuse the price card from Chapter 7, per million tokens: a small model at $0.20 input and $0.80 output, and a large model at $2.00 input and $8.00 output. A typical request of 1,000 input and 300 output tokens costs $0.00044 on the small model and $0.00440 on the large one. Where a GPU is rented, it costs $4.00 per hour, as in Chapter 6. All figures are illustrative.

!!! mascot-welcome "A Saving Nobody Measured Is a Rumor"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter is about proof: how to test a change, benchmark honestly, and keep a ledger of what you actually saved. That ledger is what turns an engineering win into a line a finance team will believe. Every token counts, and so does every test.

### When Work Runs: Asynchronous, Batch, and Off-Peak

Many requests do not need an answer in seconds. **Asynchronous processing** is a request-handling pattern in which a task is submitted and processed independently of the requester waiting, so the system can queue, group, or schedule it. Two practices follow from it. A **batch processing strategy** groups many tasks to process together, taking advantage of provider batch discounts and keeping hardware busy, which raises the utilization rate from Chapter 5. **Off-peak scheduling** deliberately delays non-urgent work to periods of low demand, when spot capacity is more available and batch queues are shorter.

The worked example is a nightly job that classifies 1 million documents, each 600 input tokens with a 50-token label, on the small model. Each document costs 600 × $0.20 ÷ 1,000,000 + 50 × $0.80 ÷ 1,000,000 = $0.00012 + $0.00004 = $0.00016, so the job costs $160 at the standard real-time rate. Providers commonly discount batch jobs in exchange for a relaxed completion window (about 50% is typical, so treat it as illustrative here), which brings the job to $80 and saves $80 every night, about $2,400 a month. The price of that saving is that results may arrive hours later, so the question for every workload is whether anyone is waiting.

| Workload | Does anyone wait for the answer? | Suitable for async and batch? |
|----------|----------------------------------|-------------------------------|
| Customer chat reply | Yes, within seconds | No |
| Nightly document classification | No, results needed by morning | Yes |
| Weekly embedding refresh for a search index | No | Yes |
| Overnight summaries of the day's tickets | No, read next morning | Yes |
| Fraud check on a payment in progress | Yes | No |

### Prompts as Managed Assets

Once a prompt is a cost lever, it needs the same care as code. A **prompt reuse library** is a curated, version-controlled collection of vetted prompt templates (Chapter 7) shared across teams, which prevents ten teams from paying for ten differently wasteful versions of the same instruction. **Prompt version control** tracks every change to a template with a version identifier, a change history, and rollback, as source control does for code. Its payoff is practical: when a cost spike or quality drop appears, you can see which prompt version was live and revert it in minutes.

**A/B testing prompts** runs two or more prompt variants concurrently on comparable traffic and measures the difference in quality, token count, or downstream results before one is adopted broadly. The cost side of a test is easy to see (the shorter prompt uses fewer tokens). The quality side is the hard part, because quality differences are measured on a sample and samples are noisy. Statistics supply the fix: a **95% confidence interval** is a range of plausible values for the true difference, wide when the sample is small.

Suppose variant B trims the prompt by 18% in tokens, and the team will accept a loss of up to 3 percentage points of resolution rate. The first test sends 2,000 requests to each variant. Variant A resolves 82% and variant B 81%, a difference of −1 point. The standard error of that difference is √(0.82 × 0.18 ÷ 2,000 + 0.81 × 0.19 ÷ 2,000) = 0.0123, so the 95% interval is −1 point ± 1.96 × 1.23 points, or −3.4 to +1.4 points. The interval's low end sits below the −3 limit, so the test cannot yet show that B is within tolerance. It does not show B is worse either; it needs more data. Keeping the same rates, roughly 2,900 requests per variant would narrow the interval enough to settle it. Chapter 12 develops the measurement rigor behind this in full.

| Test result (interval for B minus A) | Decision |
|--------------------------------------|----------|
| Entire interval is at or above −3 points | Adopt B, within tolerance |
| Entire interval is below −3 points | Reject B, clearly too costly in quality |
| Interval straddles −3 points | Keep testing, the data cannot decide |

#### Diagram: Prompt A/B Test Decision Lab

<details markdown="1">
<summary>Prompt A/B Test Decision Lab</summary>
Type: microsim
**sim-id:** prompt-ab-test-decision-lab<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, from a 95% interval for the quality difference, whether to adopt, reject, or keep testing a shorter prompt variant against a 3-point quality tolerance.

**Prerequisites:** A/B testing prompts, prompt version control, 95% confidence interval, quality tolerance (all defined in the section "Prompts as Managed Assets" above).

**Evidence of Mastery:** For each of four test results the learner selects Adopt B, Reject B, or Keep testing before the interval is drawn. A selection is correct when it matches the decision rule in Rules for that result. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A smaller difference in the sample means the variants are equal. (2) If the interval includes zero the test proves B is fine. (3) More tokens saved justifies adopting regardless of the interval.

**Instructional Rationale:** Evaluate-level judgment applies a criterion to evidence. The learner must compare the interval to the tolerance, not read the headline difference, and the fourth result shows that an improvement can also be adopted.

**Content:**

Every variant B uses 18% fewer tokens than A. The tolerance is 3 percentage points. Each result gives resolution rates and the requests per variant:

| # | Requests per variant | A resolution rate | B resolution rate | Difference (B − A) | 95% interval for B − A | Correct decision | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|
| 1 | 2,000 | 82% | 81% | −1.0 | −3.4 to +1.4 | Keep testing | The interval straddles −3, so the data cannot show B is within tolerance or outside it. |
| 2 | 3,000 | 82% | 81.5% | −0.5 | −2.5 to +1.5 | Adopt B | The whole interval is at or above −3, so B is within tolerance and saves 18% of tokens. |
| 3 | 3,000 | 82% | 76% | −6.0 | −8.1 to −3.9 | Reject B | The whole interval is below −3, so the quality loss clearly exceeds the tolerance. |
| 4 | 3,000 | 80% | 85% | +5.0 | +3.1 to +6.9 | Adopt B | The whole interval is above −3; B is both cheaper and better. |

**Provenance:** Synthetic data with the rates above; the sim must label it "synthetic". Intervals are computed from the Rules and rounded to 0.1 point.

**Rules:** Standard error = square root of (pA × (1 − pA) ÷ n + pB × (1 − pB) ÷ n). Interval = difference ± 1.96 × standard error. Decision: Adopt B when the interval's low end >= −3 points; Reject B when the interval's high end < −3 points; otherwise Keep testing. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Requests per variant | 500 | 5,000 | 500 | 2,000 | requests |
| A resolution rate | 50 | 95 | 1 | 82 | percent |
| B resolution rate | 50 | 95 | 1 | 81 | percent |
| Tolerance | 1 | 5 | 1 | 3 | percentage points |

**Learner Activity:**

1. The learner reads a test result and selects Adopt B, Reject B, or Keep testing.
2. The sim draws the interval against the tolerance line and shows the "Why" text.
3. After four results, exploration unlocks: the learner changes the four quantities and watches the interval and the decision update.
4. The learner should notice that raising the number of requests narrows the interval without changing the difference.

**Feedback:** Four results, fixed order, one attempt each. Correct: "Correct: <decision>. Interval <low> to <high>." Incorrect: the "Why" text with the interval drawn. A running count "Correct: n of 4" is shown.

**Starting State:** Result 1 is shown with no interval drawn. The question on screen is "B saves 18% of tokens and resolved 1 point fewer tickets. Adopt, reject, or keep testing?"

**Chapter Anchors:** The chapter states 18% fewer tokens, a 3-point tolerance, 2,000 requests per variant with 82% and 81%, a standard error of 0.0123, an interval of −3.4 to +1.4 points, and about 2,900 requests per variant to settle it.
</details>

### Benchmarking and the Tradeoffs You Are Buying

**Cost-per-task benchmarking** measures the total cost of completing one instance of a defined task, counting tokens, compute, and any human review, so that models, prompts, and designs can be compared on equal footing. The point of including human review is that a cheap answer that must be redone is not cheap. Take a support-ticket task. The large model costs $0.0044 per attempt and 90% of answers are accepted; the small model costs $0.00044 and 75% are accepted. Each rejected answer goes to a person at a cost of $2.00. The cost per task is the attempt cost plus the rejected fraction times the review cost.

| Model | Attempt cost | Accepted | Rejected share × $2.00 review | Cost per task |
|-------|-------------:|---------:|------------------------------:|--------------:|
| Large | $0.0044 | 90% | 0.10 × $2.00 = $0.200 | $0.2044 |
| Small | $0.00044 | 75% | 0.25 × $2.00 = $0.500 | $0.5004 |

The model that costs a tenth as much per attempt costs about 2.4 times as much per task. The result flips when review is cheap. Setting the two costs equal, $0.00044 + 0.25R = $0.0044 + 0.10R, gives R = $0.0264: if a rejected answer costs less than 2.6 cents to fix, the small model wins; above that, the large one does.

!!! mascot-thinking "The Unit of Comparison Is the Task, Not the Token"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A per-token price compares models by what they bill. Cost per task compares them by what the business pays to get a finished job. Notice that the break-even review cost, $0.0264, depends on the acceptance gap and the price gap, not on the review cost you happen to have today.

That same 2.6 cents is the **quality-cost tradeoff** in numbers. This is the principle that better output (from a larger model, a longer prompt, step-by-step reasoning, or ensembling) generally costs more, so someone must decide how much quality is worth paying for. Moving from the small to the large model buys 15 more accepted answers per hundred for $0.00396 more per request, or $0.0264 per additional accepted answer. Whether that is a good price depends on what a rejected answer costs you, which the benchmark already told us.

The **latency-cost tradeoff** is the same shape on a different axis: reducing response time, through dedicated capacity, warm pools, or smaller batches, generally raises cost. Chapter 6's batch table is a direct example. Cutting a 400-token response from 16 seconds to 10 seconds by moving from batch 32 to batch 8 raises the cost per million tokens from $1.39 to $3.47, about 2.5 times.

Choices made today decay as prices, models, and usage change. The **right-sizing review cycle** is a recurring, scheduled reassessment of whether the deployed models, infrastructure, and prompts are still the most cost-effective choice. A quarterly review should ask four questions: has a cheaper model reached the quality bar, has traffic changed enough to change the cascade pass rate or the cache hit rate, is reserved capacity still well used, and has any prompt grown since its last review?

One strategic choice recurs in these reviews: **fine-tuning versus prompting**. Fine-tuning adapts the model through an upfront training investment that can shorten every later prompt; prompting alone has no training cost but may carry a longer prompt on every request. Suppose a $5,000 fine-tune lets you drop 800 tokens of instructions from each request on the large model. That saves 800 × $2.00 ÷ 1,000,000 = $0.0016 per request, so the fine-tune pays back after 5,000 ÷ 0.0016 = 3.1 million requests, a little over three months at 1 million requests a month. This ignores any premium for serving a fine-tuned model, which you should check against your provider's price list.

#### Diagram: Cost Per Task Benchmark Explorer

<details markdown="1">
<summary>Cost Per Task Benchmark Explorer</summary>
Type: microsim
**sim-id:** cost-per-task-benchmark-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the cost per completed task of a small and a large model, including human review of rejected answers, and identify which is cheaper at four review costs.

**Prerequisites:** cost-per-task benchmarking, quality-cost tradeoff, acceptance rate, review cost (all defined in the section "Benchmarking and the Tradeoffs You Are Buying" above).

**Evidence of Mastery:** For each of four review costs the learner selects the model with the lower cost per task before the costs are shown. A selection is correct when it matches the "Cheaper model" column; at a tie the large model is correct. Mastery is 3 of 4 correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) The model with the lower attempt cost always has the lower cost per task. (2) Human review cost can be ignored when comparing models. (3) The break-even depends on traffic volume.

**Instructional Rationale:** Analyze-level comparison means breaking a total into parts and seeing how they combine. The learner decides before the breakdown appears, then sees which part dominated.

**Content:**

Large model: attempt cost $0.0044, acceptance 90%. Small model: attempt cost $0.00044, acceptance 75%. Cost per task = attempt cost + (1 − acceptance) × review cost.

| # | Review cost per rejected answer | Small cost per task | Large cost per task | Cheaper model | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | $2.00 | $0.50044 | $0.20440 | Large | Review dominates: the small model's extra 15% of rejections cost $0.30 in review, far more than its $0.00396 attempt saving. |
| 2 | $0.10 | $0.02544 | $0.01440 | Large | 0.25 × $0.10 = $0.025 exceeds 0.10 × $0.10 = $0.010 by more than the $0.00396 attempt saving. |
| 3 | $0.02 | $0.00544 | $0.00640 | Small | At $0.02, the extra rejections cost $0.003, less than the $0.00396 attempt saving. |
| 4 | $0.0264 | $0.00704 | $0.00704 | Large (tie) | Exactly the break-even review cost; the costs are equal, so the large model's higher quality wins the tie. |

**Provenance:** Illustrative values from the chapter section; the sim must label them "illustrative". Costs are computed from the Rules.

**Rules:** Break-even review cost = (large attempt − small attempt) ÷ (small rejection share − large rejection share) = $0.00396 ÷ 0.15 = $0.0264. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Review cost | 0 | 2.00 | 0.01 | 2.00 | USD per rejected answer |
| Small model acceptance | 50 | 95 | 5 | 75 | percent |
| Large model acceptance | 70 | 99 | 1 | 90 | percent |

If the small model's acceptance is greater than or equal to the large model's, the sim reports that the small model is cheaper at every review cost.

**Learner Activity:**

1. The learner reads a review cost and selects the model they think is cheaper per task.
2. The sim shows both cost-per-task breakdowns (attempt cost and review cost) and the "Why" text.
3. After four review costs, exploration unlocks: the learner changes the three quantities and watches the break-even review cost move.
4. The learner should notice that a larger acceptance gap lowers the review cost at which the small model stops being cheaper.

**Feedback:** Four review costs, fixed order, one attempt each. Correct: "Correct: <model> costs $<c> per task." Incorrect: the "Why" text with both breakdowns shown. A running count "Correct: n of 4" is shown.

**Starting State:** The small and large models are shown with attempt costs and acceptance rates and no costs per task. The question on screen is "A rejected answer costs $2.00 to fix. Which model is cheaper per task?"

**Chapter Anchors:** The chapter states attempt costs of $0.0044 and $0.00044, acceptance rates of 90% and 75%, a $2.00 review cost, costs per task of $0.2044 and $0.5004, and a break-even review cost of $0.0264.
</details>

### Making the Model Itself Cheaper

The techniques so far change how you use a model. The next ones change the model, or how it is run, so each token costs less to produce.

**Quantization for cost cutting** applies model quantization, storing each parameter in fewer bits, as a deliberate cost reduction. It shrinks the memory footprint and lets a model run on fewer or cheaper GPUs, and it needs no new training data. Chapter 6's memory arithmetic shows the effect. A 70-billion-parameter model needs 140 GB at 16 bits, so it takes two 80 GB GPUs, or $8.00 an hour. At 8 bits it needs 70 GB and fits on one GPU, but with only about 6 GB left for the KV cache, which limits concurrency. At 4 bits it needs 35 GB, leaving about 41 GB for the cache, on one GPU at $4.00 an hour. The cost is some loss of quality, small for many tasks but never zero, so it must be benchmarked.

**Distillation for cost cutting** applies knowledge distillation, training a smaller student model to imitate a larger teacher, to produce a cheaper model for one task. It trades an upfront project for a lower per-request cost. Suppose the project costs $40,000 and the student replaces the large model at the small model's price, saving $0.0044 − $0.00044 = $0.00396 per request. Break-even arrives after 40,000 ÷ 0.00396 = 10.1 million requests, or just over 5 months at 2 million requests a month. Unlike quantization it needs training data and effort, but it can yield a much smaller model.

!!! mascot-encourage "Three Techniques, One Idea"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Sparse models, speculative decoding, and KV cache tuning all sound exotic, and it is normal to need two passes at them. Each is just a way to do less work per token, so read each one asking only "what work does this skip, and what does it risk?"

**Sparse model techniques** activate only a subset of a model's parameters for each input, so the compute per call is lower than for a dense model of the same total size. **Mixture of experts** is the most prominent: the model contains many specialized sub-networks (experts), and a routing mechanism activates a few for each token. One published open-weight design has about 47 billion total parameters but activates about 13 billion per token. The cost consequence has two sides. Compute per token resembles a 13-billion-parameter model, but memory must still hold all 47 billion parameters, about 94 GB at 16 bits, which is more than one 80 GB GPU.

**Speculative decoding** speeds generation by letting a small, fast draft model propose several tokens, which the large target model then verifies in a single pass. Because the target checks every proposed token, the output is the one the target would have produced. If each verification pass yields an average of 2.5 tokens instead of 1, a 400-token answer needs 160 target passes instead of 400, 60% fewer. The draft model's work is not free: if it adds work equal to 15% of the original total, the net saving is about 45%. The gain depends on how often the draft's guesses are accepted.

**KV cache optimization** reduces the cost of the key-value cache, the stored attention results introduced in Chapter 6, by shrinking it or reusing it, so they need not be recomputed for every new token. In Chapter 6's example the cache takes about 0.125 MB per token, or 500 MB for a 4,000-token request, which capped the GPU at 120 concurrent requests. Storing the cache in 8 bits instead of 16 halves it to 250 MB per request and doubles the ceiling to 240. Sharing the cache for an identical prompt prefix across requests, a form of reuse, saves both memory and the recomputation. Note that this is distinct from the prompt caching of Chapter 3, which is a provider billing feature.

| Technique | What work it skips | Main risk |
|-----------|--------------------|-----------|
| Quantization | Moving and storing high-precision numbers | Some quality loss |
| Distillation | Running a large model for a narrow task | Upfront project; student can miss rare cases |
| Mixture of experts | Computing unused experts | Memory still holds all experts |
| Speculative decoding | Sequential large-model passes | Gain falls if drafts are often rejected |
| KV cache optimization | Recomputing or storing attention results | Quality loss if the cache is compressed |

### Hidden Multipliers: Sampling and Safety Overhead

Some quality techniques multiply the bill. **Parallel sampling cost** is the added tokens and compute from generating several independent outputs for one input and choosing or combining them. **Self-consistency cost** is its application to reasoning: generate several step-by-step answers and pick the most common one. If five samples raise accuracy from 78% to 85%, the cost per request rises from $0.0044 to $0.022. The cost per accepted answer rises from $0.0044 ÷ 0.78 = $0.0056 to $0.022 ÷ 0.85 = $0.0259, about 4.6 times for 7 more points of accuracy. That can be right for a high-stakes decision and wrong for a routine one, which is exactly the quality-cost tradeoff again.

Safety checks add cost too. **Guardrail overhead cost** is the extra tokens, latency, and compute added by safety and policy checks on inputs or outputs. **Content filtering cost** is the part of it attributable to automated screening for unsafe content, policy violations, or sensitive information. If a screening model at the small model's input price checks the 1,000-token input and the 300-token output, it costs 1,000 × $0.20 ÷ 1,000,000 + 300 × $0.20 ÷ 1,000,000 = $0.00026 per request, or $26 per 100,000 requests, about 6% of the $440 large-model bill. It also adds latency to every request. This is a necessary expense, and it belongs in any complete ROI calculation rather than being left out because it is not on the model invoice.

### Keeping the Savings

Savings decay. Prompts grow, traffic shifts, a new feature adds tokens, and a model version changes behavior. Four practices guard against it, in the order a team would adopt them.

A **token efficiency audit** is a systematic review of an application's prompts, caching, and model choices to find sources of waste and quantify the potential saving. A first audit usually checks the following, ranked by dollars:

- Which prompts are longest, and how many tokens of each are fixed scaffolding?
- What are the cache hit rates, and which repeated requests are not cached?
- Which requests go to the large model although a small one would pass?
- Where do retries, malformed outputs, or tool-call loops multiply requests?

**Continuous cost optimization** is the ongoing practice of finding and shipping cost-saving changes, rather than treating optimization as a one-time project; it runs on repeated audits. **Cost regression testing** is the automated check that a change to code, prompt, or model has not raised token count, compute cost, or latency against an established baseline, the cost analog of a functional regression test. For example, a prompt change adds 120 tokens of instruction to a 1,000-token input on the large model. That adds 120 × $2.00 ÷ 1,000,000 = $0.00024 to a $0.0044 request, a 5.5% rise. A test that fails any change above 5% blocks the change until someone justifies it.

!!! mascot-tip "Gate on Cost the Way You Gate on Tests"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Add a cost check to the same pipeline that runs your unit tests, and fail the build on a rise above a threshold you pick, such as 5% per task. A prompt that grows quietly by a few percent a month costs more over a year than most of the optimizations in this chapter save.

**Efficiency gain tracking** is the ongoing record of the savings each initiative actually achieved, used to show the cumulative value of the optimization work. It is the evidence behind an ROI claim. A simple ledger records each initiative, when it shipped, how the saving was verified, and the monthly figure. The illustrative ledger below uses savings worked out in Chapters 6 and 7; each is at its own stated volume.

| Initiative | Source | Verified by | Monthly saving |
|------------|--------|-------------|---------------:|
| Elastic capacity instead of peak-sized fleet | Chapter 6 | GPU-hour billing, before and after | $7,200 |
| Prompt template trim (800 tokens, 2 million requests) | Chapter 7 | Token counts from request logs | $3,200 |
| Small-model-first cascade (100,000 requests, 70% pass) | Chapter 7 | Cost per request from the billing export | $264 |
| Exact and semantic caching (100,000 requests) | Chapter 7 | Cache hit counts | $132 |
| **Ledger total** | | | **$10,796** |

In practice savings on the same traffic overlap (a cached request never reaches the cascade), so a real ledger measures each saving after the earlier ones are already in place rather than adding standalone estimates.

!!! mascot-warning "Never Change a Live Prompt Without a Version"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A prompt edited in place leaves no record of what was live when cost or quality shifted, so you cannot revert or even explain the change. Store every prompt under a version identifier, and tag each request log with the version that served it.

### Summary and Quick Check

Move non-urgent work to asynchronous, batch, and off-peak runs. Treat prompts as versioned assets, and change them only through A/B tests judged against a stated tolerance. Compare options by cost per task, including human review, and recognize quality-cost and latency-cost as the two prices you are always paying. Make the model itself cheaper through quantization, distillation, sparse models, speculative decoding, and KV cache work, each tested. Count sampling and safety overhead as part of the real cost. Finally, audit, regression-test, and track gains so that the savings last and can be shown to finance. Chapter 9 begins the financial half of the book, giving you the vocabulary to turn these savings into the language of ROI.

??? note "Quick check: why might the cheaper model cost more per task? - Click to expand"
    Because cost per task includes the human review of rejected answers. A model that is a tenth of the price per attempt but rejected 25% of the time instead of 10% costs more per task whenever a rejected answer costs more than the break-even amount ($0.0264 in our example).

??? note "Quick check: what does an A/B test interval that straddles the tolerance tell you? - Click to expand"
    That the sample cannot settle the question. The true difference could be inside or outside the tolerance, so the right move is to keep testing with more traffic rather than adopt or reject the variant.

!!! mascot-celebration "You Can Test a Saving and Keep It"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now judge a prompt change with a confidence interval, benchmark models by cost per task, price a distillation project's payback, and set a regression gate that protects the savings. That is the discipline that makes the next part's ROI claims credible.
