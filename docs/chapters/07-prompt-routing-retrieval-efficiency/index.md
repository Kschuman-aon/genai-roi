---
title: Prompt, Routing, and Retrieval Efficiency Techniques
description: Prompt design, output controls, model cascading and routing, caching, and retrieval tuning techniques that cut the tokens and compute each request needs without giving up quality.
generated_by: claude skill chapter-content-generator
date: 2026-10-06 16:40:00
version: 1.11
---

# Prompt, Routing, and Retrieval Efficiency Techniques

## Summary

Presents prompt optimization, model cascading and routing, and retrieval-tuning techniques that reduce token and compute cost without sacrificing quality. This chapter covers 25 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Prompt Optimization | 1 |
| Prompt Template Design | 49 |
| Output Length Control | 1 |
| Max Tokens Parameter | 47 |
| Temperature Setting | 46 |
| Structured Output Format | 1 |
| JSON Mode Output | 44 |
| Function Calling | 43 |
| Tool Use Efficiency | 42 |
| Model Cascading | 41 |
| Model Routing | 40 |
| Small Model First Strategy | 39 |
| Fallback Model Strategy | 38 |
| Ensemble Cost Tradeoff | 37 |
| Response Caching | 36 |
| Deterministic Caching | 35 |
| Semantic Deduplication | 34 |
| Retrieval Optimization | 1 |
| RAG Cost Tradeoff | 32 |
| Embedding Reuse | 31 |
| Vector Index Tuning | 30 |
| Query Rewriting | 1 |
| Context Pruning | 28 |
| Context Compression | 27 |
| Summarization Preprocessing | 26 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Prompting, Deployment, and Model Optimization Basics](../02-prompting-deployment-optimization/index.md)
- [Chapter 3: Tokenization and Token Pricing Fundamentals](../03-tokenization-pricing-fundamentals/index.md)
- [Chapter 5: Compute Pricing and Scaling Fundamentals](../05-compute-pricing-scaling/index.md)

---

Chapter 6 sized the machines. This chapter works on the other side of the equation: the requests those machines, or a provider's API, have to serve. Every technique here reduces the same bill from a different angle. Some shrink what you send, some shrink what comes back, some send the request to a cheaper model, and some avoid making the request at all. Each is worth only what it saves after it costs you something in quality or complexity, so the chapter works every technique through a number.

The worked examples share one illustrative price card, all per million tokens: a **small model** at $0.20 input and $0.80 output, a **large model** at $2.00 input and $8.00 output, and an **embedding model** (which turns text into the vectors used for search) at $0.02. A typical request has 1,000 input tokens and 300 output tokens, which costs $0.00044 on the small model and $0.00440 on the large one. At 100,000 requests a month, running everything on the large model costs $440. The prices are illustrative; the ratios are what matter.

!!! mascot-welcome "Spend Less Per Request, Not Less Per Answer"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    These techniques are the highest-return work in the book, because each saves money on every request, forever. By the end you will be able to price a cascade, set a cache threshold you can defend, and trim a retrieval pipeline without guessing. Every token counts!

### Prompt Design as a Cost Lever

**Prompt optimization** is the iterative work of revising a prompt's wording, structure, and length to improve quality, cut token count, or both, judged by testing rather than intuition. The techniques in this section are its main instruments.

A **prompt template** fixes the instructions that never change and leaves labeled slots for what does. **Prompt template design** is the craft of building these reusable structures so that every request carries the minimum scaffolding. It matters twice. First, every token in the fixed part is paid on every request. Second, a template whose fixed part sits at the start of the prompt and stays byte-for-byte identical is eligible for the prompt caching you met in Chapter 3. Compare the two versions below. The slots are written in braces.

```text
BEFORE (about 60 tokens of scaffolding):
You are a very helpful and friendly assistant working for Acme Corp. Please read
the customer's message below very carefully, think about it, and then write a
helpful reply that is polite and complete.

AFTER (about 25 tokens of scaffolding):
Role: Acme support agent. Task: reply to the message. Style: polite, under 80 words.
Message: {customer_message}
```

The saving is small per request and large at volume. Suppose the real scaffolding of a production prompt is trimmed from 1,200 tokens to 400 with no drop in measured quality. That removes 800 tokens a request; across 2 million requests a month on the large model it is 1.6 billion tokens at $2.00 per million, or $3,200 a month. Chapter 8 covers how to prove "no drop in measured quality" with A/B tests.

#### Controlling What Comes Back

Output tokens cost more than input tokens (four times more in our price card), so the response is the best place to look first. **Output length control** is the set of techniques that limit how much text a model generates. The simplest is an instruction in the prompt ("under 80 words"). The hard backstop is the **max tokens parameter**, an API setting that caps the number of output tokens the model may produce before it is forced to stop. Take a request with 500 input tokens on the large model. A verbose 600-token answer costs 500 × $2.00 ÷ 1,000,000 + 600 × $8.00 ÷ 1,000,000 = $0.0010 + $0.0048 = $0.0058. A 150-token answer costs $0.0010 + $0.0012 = $0.0022, a 62% reduction.

!!! mascot-tip "Set the Cap Above the Answer, Not at It"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Max tokens only stops generation; it does not make the model write shorter. Ask for brevity in the prompt, then set the cap generously above the longest legitimate answer, because a cap that cuts a JSON reply mid-object produces a retry that costs more than the tokens you saved.

The **temperature setting** controls the randomness of the model's token choices: low values make output more repeatable, high values more varied. It does not change the number of tokens, so it is not a direct cost lever. Its cost effect is indirect. Low temperature makes repeated requests more likely to produce the same answer, which is what makes the caching below effective, and an unnecessarily high temperature on a structured task raises the rate of malformed output and the retries that follow. Low temperature tends toward repeatability but does not guarantee identical output on every call.

### Structured Output, Function Calling, and Tool Use

A **structured output format** is a response shape, such as a fixed schema or key-value structure, that the model is told or configured to follow so that software can parse the reply without extra cleanup. **JSON mode output** is the most common form: the model is constrained to return syntactically valid JSON. The cost argument is about retries. If 8% of replies are malformed and each failure triggers one full resend, the average cost per successful result is 1 ÷ (1 − 0.08) = 1.087 times the single-request cost. If JSON mode cuts failures to 0.5%, the multiplier is 1 ÷ 0.995 = 1.005, and spend falls by about 7.5%. Note what JSON mode does not do: valid syntax does not make the content correct.

**Function calling** lets the model, given a list of described functions, reply with a structured request to run one (with its arguments) instead of free text. Your code runs the function and sends the result back. The sketch below defines one function; the model's reply to "Where is order 8841?" would name `get_order_status` and supply `"order_id": "8841"`.

```json
{
  "name": "get_order_status",
  "description": "Look up the shipping status of one order.",
  "parameters": { "order_id": "string" }
}
```

Every function description is input text paid on every request, and every call is another round trip. **Tool use efficiency** measures how well a model uses its tools: few, necessary calls, with little waste or repetition. The cost mechanism is that each round trip re-sends the whole conversation so far. Suppose the starting context is 2,000 tokens and each tool result adds 300. An agent that needs 2 calls reads 2,000, then 2,300 tokens, then 2,600 for the final answer, 6,900 input tokens in all. An agent that wanders through 6 calls reads 2,000, 2,300, 2,600, 2,900, 3,200 and 3,500, then 3,800 for the final answer: 20,300 tokens. That is 2.9 times as many, or $0.0406 against $0.0138 at the large model's input price.

| Technique | What it controls | Cost effect | Main risk |
|-----------|------------------|-------------|-----------|
| Prompt template design | Fixed scaffolding per request | Saves input tokens on every call | Over-trimming hurts quality |
| Output length control | Response length | Saves the expensive output tokens | Truncated or too-thin answers |
| Temperature setting | Randomness | Indirect: repeatability, fewer retries | Too low reduces useful variety |
| JSON mode output | Output validity | Fewer retries | Valid syntax, wrong content |
| Tool use efficiency | Number of tool round trips | Avoids re-reading context | Under-using tools lowers accuracy |

### Choosing the Model: Cascading, Routing, and Fallback

The next lever is which model answers. **Model routing** is the practice of directing each request to the model best suited to it by cost, capability, or latency. **Model cascading** is one sequential form: send the request to a cheaper model first and escalate to a larger one only when the first model's answer fails a quality check. The guiding principle is the **small model first strategy**: try the cheapest capable model before considering anything larger, and reserve the expensive model for requests that truly need it.

A cascade has a clear break-even. Every request pays for the small model, and the fraction \( 1 - p \) that fail the check also pay for the large model, where \( p \) is the pass rate (the fraction answered acceptably by the small model).

\[ \text{cascade cost per request} = c_{small} + (1 - p)\, c_{large} \]

Using our card (\( c_{small} = \$0.00044 \), \( c_{large} = \$0.00440 \)) and a 70% pass rate, the cost is $0.00044 + 0.30 × $0.00440 = $0.00176 per request, or $176 per 100,000 requests against $440 for all-large, a 60% saving. The cascade beats all-large whenever \( p > c_{small} \div c_{large} \), here 0.10. At a pass rate of 10% it costs exactly $440, and below it the cascade costs more than not cascading at all, because it pays twice for the failures. The check itself also costs: a rule-based check is nearly free, while using a model to grade each answer adds its own tokens to \( c_{small} \).

!!! mascot-thinking "A Cascade Is a Bet on the Pass Rate"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the small model's price barely matters; the pass rate does. Measure it on real traffic before you build the cascade, because a cheap model that fails half the time is a surcharge.

Routing differs from cascading in when the decision is made. A router classifies the request up front and sends it to one model, so no request pays twice, but a misrouted hard request gets a poor answer from a model that was too small. A cascade pays twice for escalations but verifies the answer after the fact.

A **fallback model strategy** is different in purpose: a secondary model or provider is invoked automatically when the primary is unavailable, rate-limited, or returns an unacceptable response. A cascade escalates for quality by design, while a fallback triggers on failure to keep the service running. Its cost risk is the price of the fallback model: an outage that fails over to a more expensive provider can multiply spend for as long as it lasts, so price the fallback before you need it.

The **ensemble cost tradeoff** is the added compute and token cost of querying several models, or several samples from one, and combining their answers to raise reliability. Cost scales roughly with the number of queries: three samples from the small model with a majority vote costs 3 × $0.00044 = $0.00132, still cheaper than one large-model call at $0.00440. Whether it is a good trade depends on whether the voted small-model answer is as accurate as the large model's, which only measurement can say. Chapter 8 returns to this under self-consistency.

#### Diagram: Model Cascade Cost Calculator

<details markdown="1">
<summary>Model Cascade Cost Calculator</summary>
Type: microsim
**sim-id:** model-cascade-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the monthly cost of a small-model-first cascade for a stated pass rate and decide whether it is cheaper than sending every request to the large model.

**Prerequisites:** model cascading, small model first strategy, pass rate, per-request cost (all defined in the section "Choosing the Model: Cascading, Routing, and Fallback" above).

**Evidence of Mastery:** For each of four scenarios the learner types the cascade's monthly cost for 100,000 requests and selects "cascade" or "all-large" as the cheaper option, before the sim reveals the answer. A scenario is correct when the cost is within $1 of the model value and the selection matches. When the two plans cost the same, "all-large" is the correct selection. Mastery is 3 of 4 scenarios correct on the first attempt. Exploration is not evidence.

**Misconceptions:** (1) A cascade is always cheaper than using the large model. (2) The cascade cost is only the small model's cost. (3) Failed requests cost the large-model price only, not small plus large.

**Instructional Rationale:** Apply-level calculation needs a procedure checked against an answer. The fourth scenario sits below the break-even pass rate, so the learner commits to a plan before discovering that a cascade can lose.

**Content:**

Per-request costs: small model $0.00044, large model $0.00440. A month has 100,000 requests. The checker costs $0 per request in every challenge scenario.

| # | Pass rate | Model cascade cost per 100,000 requests | All-large cost | Correct selection | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | 70% | $176 | $440 | Cascade | 0.00044 + 0.30 × 0.00440 = $0.00176 per request, which is $176 per 100,000. |
| 2 | 50% | $264 | $440 | Cascade | 0.00044 + 0.50 × 0.00440 = $0.00264 per request, which is $264. |
| 3 | 10% | $440 | $440 | All-large | 0.00044 + 0.90 × 0.00440 = $0.00440, exactly the all-large cost, so the cascade adds complexity for no saving. |
| 4 | 5% | $462 | $440 | All-large | 0.00044 + 0.95 × 0.00440 = $0.00462: failures pay for both models, so the cascade costs more. |

**Provenance:** Illustrative price card from the chapter introduction; the sim must label it "illustrative". Costs are computed from the Rules and rounded to the dollar.

**Rules:** Cascade cost per request = small cost + checker cost + (1 − pass rate) × large cost. Monthly cost = per-request cost × requests. The cascade is cheaper only when its cost is strictly below the all-large cost; at equality, all-large is correct. Break-even pass rate = (small cost + checker cost) ÷ large cost. In exploration the learner changes:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Pass rate | 0 | 100 | 5 | 70 | percent |
| Large-to-small price ratio | 2 | 20 | 2 | 10 | times |
| Requests per month | 10,000 | 500,000 | 10,000 | 100,000 | requests |
| Checker cost per request | 0 | 0.0010 | 0.0001 | 0 | USD |

The large model's per-request cost stays at $0.00440; the small model's cost is the large cost ÷ the ratio. At a pass rate of 0 the cascade cost is small + checker + large.

**Learner Activity:**

1. The learner reads a scenario's pass rate, types the monthly cascade cost, and selects the cheaper plan.
2. The learner presses Check; the sim shows the cascade cost, the all-large cost, and the "Why" text.
3. After four scenarios, exploration unlocks: the learner changes the four quantities and watches both monthly costs and the break-even pass rate update.
4. The learner should notice that raising the checker cost or lowering the price ratio raises the break-even pass rate.

**Feedback:** Four scenarios, fixed order, two attempts each. Correct: "Correct: cascade $<a>, all-large $<b>, <selection> is cheaper." Incorrect first attempt: the "Why" text. After a second wrong attempt the model answer is shown and the scenario counts as missed. A running count "Correct on first attempt: n of 4" is shown.

**Starting State:** Scenario 1 with empty cost box and no selection. The question on screen is "At a 70% pass rate, what does the cascade cost per month, and is it cheaper than all-large?"

**Chapter Anchors:** The chapter states small $0.00044 and large $0.00440 per request, 100,000 requests, a 70% pass rate giving $0.00176 per request ($176 against $440, a 60% saving), a break-even pass rate of 0.10, and $440 at a 10% pass rate.
</details>

### Not Paying Twice: Caching and Deduplication

The cheapest request is the one you never send. **Response caching** stores a previous model output so that a repeated or similar request is served from storage instead of triggering a new, billable inference. It has two main forms. **Deterministic caching** returns a stored answer only when the new request is an exact match for a cached one; it needs no similarity computation, but it only catches identical text. Hence its connection to temperature: caching an answer is only sensible when a repeat should return the same answer.

**Semantic deduplication** identifies requests that mean the same thing although their text differs, so one stored answer can serve them all. It is the technique behind the semantic caching of Chapter 4: both requests are turned into embedding vectors, and if their similarity score is at or above a chosen threshold, the stored answer is reused. That threshold is the whole design problem. Set it high and few paraphrases match; set it low and the cache returns answers to questions that were similar but not the same.

Take 100,000 requests a month at $0.00440 each ($440). Suppose 18% are exact repeats, which deterministic caching serves for free, saving 18% × $440 = $79.20. The remaining traffic contains near-duplicates, and the table below shows what semantic matching catches at different thresholds. The hit-rate and error figures are illustrative.

| Similarity threshold | Extra hit rate | Wrong answers among those hits | Wrong answers per 100,000 requests | Extra saving per 100,000 requests |
|---------------------:|---------------:|-------------------------------:|-----------------------------------:|----------------------------------:|
| 0.98 | 4% | 0.2% | 8 | $17.60 |
| 0.95 | 8% | 0.8% | 64 | $35.20 |
| 0.92 | 12% | 2% | 240 | $52.80 |
| 0.88 | 16% | 5% | 800 | $70.40 |
| 0.85 | 20% | 9% | 1,800 | $88.00 |
| 0.80 | 27% | 16% | 4,320 | $118.80 |

Each step down in threshold buys a modest saving and a steep rise in wrong answers. At 0.92 the total hit rate is 30%, and the combined saving is $79.20 + $52.80 = $132, 30% of the $440 bill. The cost of the lookup itself, embedding a 100-token query at $0.02 per million tokens, is about $0.20 a month, so it is negligible beside the saving.

!!! mascot-warning "A Cache Hit Can Be a Wrong Answer"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A semantic cache saves money by answering a question that was not exactly asked. Set the threshold from the number of wrong answers the use case can tolerate, not from the saving, and sample cache hits for review each week.

#### Diagram: Semantic Cache Threshold Explorer

<details markdown="1">
<summary>Semantic Cache Threshold Explorer</summary>
Type: chart
**sim-id:** semantic-cache-threshold-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend the similarity threshold that gives the largest saving without exceeding a stated tolerance for wrong cached answers per 100,000 requests.

**Prerequisites:** response caching, deterministic caching, semantic deduplication, similarity threshold (all defined in the section "Not Paying Twice: Caching and Deduplication" above).

**Evidence of Mastery:** For each of four business situations the learner commits one threshold from the six values before the sim reveals the answer. A commitment is correct when it is the lowest threshold (largest saving) whose wrong answers per 100,000 requests are <= the situation's tolerance. Mastery is 3 of 4 correct on the first attempt. Hovering a threshold to read its values is exploration, not evidence.

**Misconceptions:** (1) The lowest threshold is best because it saves the most. (2) A higher threshold is always safer without cost. (3) Hit rate and wrong-answer rate move together in proportion.

**Instructional Rationale:** Evaluate-level judgment means choosing against a criterion and defending the choice. Each situation supplies a criterion (the tolerance), and the learner must apply it to the data rather than pick the largest saving.

**Content:**

The chart plots, for each of six thresholds, the extra saving (bars) and the wrong answers per 100,000 requests (line). Values:

| Threshold | Extra hit rate | Wrong answers among hits | Wrong answers per 100,000 | Extra saving per 100,000 (USD) |
|---|---|---|---|---|
| 0.98 | 4% | 0.2% | 8 | 17.60 |
| 0.95 | 8% | 0.8% | 64 | 35.20 |
| 0.92 | 12% | 2% | 240 | 52.80 |
| 0.88 | 16% | 5% | 800 | 70.40 |
| 0.85 | 20% | 9% | 1,800 | 88.00 |
| 0.80 | 27% | 16% | 4,320 | 118.80 |

The four situations:

| # | Business situation | Tolerance (wrong answers per 100,000) | Correct threshold | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Medication-dose questions answered by a clinical assistant. | 10 | 0.98 | Only 0.98 stays at or below 10 (it gives 8); 0.95 gives 64. |
| 2 | Employee questions about a legal policy. | 100 | 0.95 | 0.95 gives 64, within 100; 0.92 gives 240 and exceeds it. |
| 3 | Internal IT help-desk answers. | 1,000 | 0.88 | 0.88 gives 800, within 1,000; 0.85 gives 1,800 and exceeds it. |
| 4 | Brainstorming ideas for marketing copy. | 5,000 | 0.80 | 0.80 gives 4,320, within 5,000, and it is the lowest threshold offered. |

**Provenance:** Synthetic, illustrative values from the chapter section "Not Paying Twice"; the sim must label them "synthetic and illustrative". Extra saving = requests × extra hit rate × $0.00440. Wrong answers per 100,000 = 100,000 × extra hit rate × wrong rate among hits.

**Rules:** The correct threshold is the lowest of the six whose wrong answers per 100,000 are <= the tolerance. If none qualifies, the answer is "no semantic caching" (does not occur with the four tolerances above). In exploration the learner may set any tolerance from 0 to 5,000 in steps of 100 (default 100) and see which threshold qualifies; at a tolerance below 8 the sim reports "no semantic caching".

**Learner Activity:**

1. The learner reads a business situation and its tolerance and commits a threshold.
2. The sim reveals the correct threshold, highlights it on the chart, and shows the "Why" text.
3. After four situations, exploration unlocks: the learner changes the tolerance and sees which threshold qualifies and what the saving and wrong-answer count would be.
4. The learner should notice that the saving gained per step shrinks while the wrong-answer count grows faster.

**Feedback:** Four situations, fixed order, one attempt each (a commitment is evidence). Correct: "Correct: threshold <t> gives <w> wrong answers per 100,000 and saves $<s>." Incorrect: the "Why" text for that situation, with the correct threshold highlighted. A running count "Correct: n of 4" is shown.

**Starting State:** The chart is shown with all six thresholds and no selection. The question on screen is "A clinical assistant tolerates 10 wrong cached answers per 100,000 requests. Which threshold do you recommend?"

**Chapter Anchors:** The chapter states six thresholds from 0.98 to 0.80, 18% exact repeats saving $79.20, a combined saving of $132 at 0.92 (a 30% hit rate), and 240 wrong answers per 100,000 at 0.92.
</details>

#### Diagram: Request Routing Flow

<details markdown="1">
<summary>Request Routing Flow</summary>
Type: workflow
**sim-id:** request-routing-flow<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain which path through cache, small model, quality check, large model, and fallback model each of five example requests takes and what it costs.

**Prerequisites:** deterministic caching, semantic deduplication, model cascading, small model first strategy, fallback model strategy (all defined above).

**Evidence of Mastery:** For each of five requests the learner selects, before the trace is shown, the node where the request is answered. A selection is correct when it matches the "Answered at" column. Mastery is 4 of 5 correct on the first attempt. Opening a node's description is exploration, not evidence.

**Misconceptions:** (1) Every request reaches a model. (2) Escalated requests pay only for the large model. (3) A fallback model is used whenever the small model is wrong.

**Instructional Rationale:** Understand-level explanation is shown by predicting the route and cost of concrete requests before the step-through reveals them, with the actual per-step values visible.

**Content:**

The flow has these nodes, in the order a request meets them: Request received; Exact-match cache; Semantic cache; Small model; Quality check; Large model; Fallback model; Answer returned. Each node has a description the learner can open:

| Node | Description shown |
|---|---|
| Request received | Every request starts here. No cost yet. |
| Exact-match cache | Returns a stored answer if the request text is identical to a cached one. Cost $0. |
| Semantic cache | Embeds the request and returns a stored answer if similarity >= 0.92. Cost about $0.000002 for the embedding. |
| Small model | Answers the request on the small model, $0.00044. |
| Quality check | Passes the small model's answer or sends the request on. Cost $0 (rule-based). |
| Large model | Answers the request on the large model, $0.00440. |
| Fallback model | Answers on a second provider's large model, $0.0055, when the large model is unavailable. |
| Answer returned | The request ends here. |

The five requests:

| # | Request | Answered at | Total cost | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | The exact question asked an hour ago. | Exact-match cache | $0 | The text is identical, so a stored answer is returned. |
| 2 | The same question as request 1, reworded, with similarity 0.95. | Semantic cache | $0.000002 | 0.95 >= 0.92, so the stored answer is reused; only the embedding is paid. |
| 3 | A new, simple question that passes the quality check. | Small model | $0.00044 | The small model's answer passes, so no escalation. |
| 4 | A new, hard question that fails the quality check. | Large model | $0.00484 | The small model ($0.00044) is paid first, then the large model ($0.00440). |
| 5 | A new, hard question while the large model is rate-limited. | Fallback model | $0.00594 | The small model ($0.00044) fails the check, the large model is unavailable, and the fallback ($0.0055) answers. |

**Provenance:** Costs from the chapter's illustrative price card; the fallback price and similarity values are illustrative. The sim must label all of them "illustrative".

**Rules:** Total cost = the sum of the cost of every node the request passes through and is charged at. A request that fails the quality check is charged for the small model and the model that answers. A request answered by a cache pays nothing for any model.

**Learner Activity:**

1. The learner reads a request and selects the node where they think it is answered.
2. The sim reveals the path node by node with the running cost, and shows the "Why" text.
3. After five requests, the learner can open any node's description to review it.

**Feedback:** Five requests, fixed order, one attempt each. Correct: "Correct: answered at <node>, total $<cost>." Incorrect: the "Why" text with the full path shown. A running count "Correct: n of 5" is shown.

**Starting State:** The flow is shown with no request traced. The question on screen is "Request 1 is the exact question asked an hour ago. Where is it answered?"

**Chapter Anchors:** The chapter states a small-model cost of $0.00044, large-model cost of $0.00440, a cascade escalation cost of $0.00484, and a semantic threshold of 0.92 as the example setting.
</details>

### Retrieval Without Waste

Chapter 2 introduced retrieval-augmented generation (RAG), in which relevant documents are fetched and added to the prompt. **Retrieval optimization** is the umbrella for the techniques that make that retrieval more relevant and cheaper, so fewer and better tokens enter the prompt. First, the economics of RAG itself. The **RAG cost tradeoff** is the balance between what RAG adds to every request (embedding the query, searching the index, and the extra context tokens) and what it saves by avoiding fine-tuning or reducing hallucination-driven rework. The extra context is usually the largest part. Retrieving 5 passages of 500 tokens adds 2,500 input tokens, which at $2.00 per million costs $0.005 per request, slightly more than the entire $0.0044 base request.

The first lever is how much to retrieve. Dropping from 5 passages to 3 removes 1,000 tokens, saving $0.002 per request, or $200 per 100,000 requests, provided answer quality holds in testing. Three more techniques shrink what is retrieved after it is fetched:

- **Context pruning** removes the least relevant parts of the context, such as low-scoring passages or older conversation turns, by relevance judgment rather than by position.
- **Context compression** is the broader practice of reducing the token count of the supplied context while retaining its task-relevant meaning, whether by pruning, summarizing, or denser encoding.
- **Summarization preprocessing** uses a model to condense long source material once, before it enters later prompts. A 20,000-token document summarized on the small model into 1,000 tokens costs 20,000 × $0.20 ÷ 1,000,000 + 1,000 × $0.80 ÷ 1,000,000 = $0.0048 once. Each later request that uses the summary instead of the document saves 19,000 input tokens, or $0.038 on the large model. The summary pays for itself on the first reuse.

**Query rewriting** reformulates a user's raw query into a clearer, retrieval-friendly form before searching. It adds one small inference call, and in return the search returns more relevant passages, which lets you retrieve fewer of them.

Two further levers sit on the retrieval infrastructure rather than the prompt. **Embedding reuse** stores computed embedding vectors and recomputes only what changed. Embedding 1 million chunks of 500 tokens is 500 million tokens, or $10 at $0.02 per million. Re-embedding everything nightly costs $300 a month; re-embedding only the 2% that changed costs 10 million tokens, or $0.20 a night and $6 a month. **Vector index tuning** adjusts the configuration of the vector database's similarity-search index, such as its algorithm, vector dimension, and search settings, to balance accuracy, speed, and storage cost. Dimension is the easiest to price: 1 million vectors of 1,536 numbers at 4 bytes each take 6.1 GB, halving the dimension to 768 takes 3.1 GB, and storing the 1,536-dimension vectors as 8-bit numbers takes 1.5 GB. Each reduction cuts the vector store cost from Chapter 5 and may reduce retrieval accuracy, so each should be tested.

| Technique | Where it acts | Worked saving |
|-----------|---------------|---------------|
| Retrieve fewer passages (5 to 3) | Input tokens per request | $0.002 per request |
| Summarization preprocessing | Input tokens on every reuse | $0.038 per reuse after a $0.0048 one-time cost |
| Query rewriting | Retrieval relevance | Enables retrieving fewer passages |
| Embedding reuse | Embedding spend | $300 to $6 per month |
| Vector index tuning (dimension) | Vector storage | 6.1 GB to 3.1 GB or 1.5 GB |

!!! mascot-warning "Test Retrieval Changes Against Answer Quality"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Fewer passages, smaller vectors, and compressed context all save money and all risk dropping the one fact the answer needed. Keep a fixed set of test questions with known answers, and rerun it after every change before the saving counts.

### Summary and Quick Check

Prompts, outputs, models, caches, and retrieval pipelines each offer a lever. Trim the template and cap and control the output length; use structured output to avoid retries and watch the tool round trips; cascade or route to the cheapest model that passes; price a fallback before an outage; cache exact repeats and semantic near-duplicates with a threshold set from your error tolerance; and shrink retrieval by retrieving less, compressing, summarizing once, and reusing embeddings. In every case the saving is real only if quality holds, which is why Chapter 8 turns to testing, benchmarking, and the compression techniques that complete the efficiency toolkit.

??? note "Quick check: why can a cascade cost more than using the large model for everything? - Click to expand"
    Because every request pays for the small model first, and requests that fail the check pay for both models. When the pass rate falls below the small model's cost divided by the large model's cost (0.10 in our example), the extra small-model calls cost more than the escalations avoid.

??? note "Quick check: what separates deterministic caching from semantic caching? - Click to expand"
    Deterministic caching returns a stored answer only for an exact text match, so it is safe but catches few repeats. Semantic caching returns an answer when an embedding similarity score is at or above a threshold, so it catches more repeats but risks returning a wrong answer, which is why the threshold must be set from the tolerable error rate.

!!! mascot-celebration "You Can Price Every Lever Between Request and Answer"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now put a number on a trimmed template, a cascade's break-even pass rate, a semantic cache threshold, and a retrieval cut. That is the toolkit for telling a real saving from a hopeful one.
