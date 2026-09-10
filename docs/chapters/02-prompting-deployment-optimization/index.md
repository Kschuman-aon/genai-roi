---
title: Prompting, Deployment, and Model Optimization Basics
description: How prompts are engineered, how models are given external knowledge and served in production, and the compression techniques used to make them cheaper to run.
generated_by: claude skill chapter-content-generator
date: 2026-09-10 11:06:17
version: 1.10
---

# Prompting, Deployment, and Model Optimization Basics

## Summary

Covers how prompts are engineered and models are deployed and optimized, from retrieval-augmented generation and hallucination through quantization and right-sizing. This chapter covers 21 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Prompt | 206 |
| System Prompt | 1 |
| Prompt Engineering | 204 |
| Zero-Shot Prompting | 154 |
| Few-Shot Prompting | 153 |
| Chain-Of-Thought Prompting | 152 |
| Retrieval-Augmented Generation | 151 |
| Embedding | 150 |
| Vector Database | 149 |
| Model Hallucination | 148 |
| Model Latency | 147 |
| Model Throughput | 146 |
| Batch Inference | 145 |
| Streaming Response | 144 |
| Model Versioning | 143 |
| Model Deployment | 142 |
| On-Premises Deployment | 21 |
| Cloud-Hosted Model | 20 |
| Model Quantization | 19 |
| Knowledge Distillation | 18 |
| Model Right-Sizing | 17 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Core Concepts of Large Language Models](../01-core-concepts-llms/index.md)

---

Chapter 1 gave you the vocabulary for what a large language model is and how it comes to exist. This chapter shifts to what you actually do with one once it is available to you: how you talk to it, how you keep it from making things up, how it gets served to real users at scale, and how it gets made smaller and cheaper without losing too much of what makes it useful. Every idea here is something you will personally decide about — or at least evaluate a vendor's claims about — long before you ever touch a training run.

!!! mascot-welcome "From Vocabulary to Practice"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Now that you can name the parts, let's put them to work. This chapter is where "knowing what an LLM is" turns into "knowing what it costs to actually run one well." Every token counts — let's see where they go.

### What Is a Prompt?

A **prompt** is the text you send to a language model to request a response — a question, an instruction, a partial document you want continued, or any combination of these. It is the entire interface between you and the model: everything the model knows about what you want, it knows because it appeared somewhere in the prompt. This sounds almost too simple to name as a distinct concept, but its simplicity is exactly the point. Unlike traditional software, where you write code that specifies exact behavior, a language model is *steered* by natural-language text, and the quality, structure, and content of that text has an outsized effect on the quality of what comes back — and, just as importantly for this book, on how many tokens you pay for.

Most real-world prompts are not one undifferentiated block of text; they are typically composed of at least two distinct parts. The **system prompt** is a special segment, usually invisible to the end user, that sets persistent instructions and context for the whole conversation — the model's role, tone, constraints, and any standing rules ("You are a customer support assistant for Acme Corp. Never discuss competitors."). It is set once by the application developer and typically resent with every request in that conversation, which matters directly for cost: a long system prompt is not a one-time expense, it is a recurring one, paid on every single turn. This is a narrow, mechanical concept — there is no deeper theory to it beyond knowing it exists and that it recurs — so it earns a brief definition here rather than an extended treatment.

**Prompt engineering** is the practice of deliberately designing prompts to reliably get better, more accurate, or more consistent output from a model. It sits at the intersection of writing clearly and understanding how a model tends to respond to certain patterns of instruction — being specific rather than vague, providing relevant context, specifying the desired output format, and iterating based on what the model actually returns. Prompt engineering is the single highest-leverage, lowest-cost lever available to reduce your GenAI spend: a well-engineered prompt that gets the right answer on the first try is nearly always cheaper than a vague one that requires three follow-up clarifications, each one a fresh, fully-priced request. Consider the difference between "Summarize this contract" and "Summarize this contract in 3 bullet points covering payment terms, termination clauses, and liability limits, for a non-lawyer executive." The first vague version often requires a follow-up round of clarifying questions — each one a fresh, billed request — while the second, more specific version is likely to get a usable answer on the first call, even though it costs a handful of extra input tokens to write.

<details markdown="1">
<summary>Quick check: system prompt or user prompt?</summary>
Type: markdown-list

- "You are a helpful assistant that only answers questions about our product catalog." — **system prompt**
- "What's the return policy on the blue jacket?" — **user prompt** (part of the ongoing prompt, but not the persistent instruction layer)
- "Always respond in formal English and never use emoji." — **system prompt**
</details>

#### Diagram: Anatomy of a Prompt

<iframe src="../../sims/prompt-anatomy-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Anatomy of a Prompt</summary>
Type: infographic
**sim-id:** prompt-anatomy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: identify

Learning objective: Learners will be able to identify the system-prompt, user-instruction, and context segments of a real assembled prompt and explain how each segment affects token cost differently.

Purpose: Show one complete, realistic assembled prompt sent to a model, with its component segments color-coded and clickable to reveal what each one is and how it behaves cost-wise.

Visual elements:
- A single text block representing the full prompt as actually sent to the model, divided into three labeled, distinctly colored segments:
  1. System Prompt segment (blue background): "You are a customer support assistant for Acme Corp. Be concise and never discuss competitors."
  2. Context segment (green background): "Order #48213: blue jacket, size M, purchased 12 days ago."
  3. User Instruction segment (orange background): "What's the return policy on this item?"

Interactive controls:
- Click any segment to open an infobox below the prompt
- Toggle: "Send this prompt 100 times" — recalculates and displays a running token-cost estimate, making clear that the System Prompt segment's cost repeats on every one of the 100 calls while a one-off User Instruction does not persist unless resent

Click content:
- System Prompt segment: "Persistent across the whole conversation and resent on every request — its token cost recurs every single time."
- Context segment: "Task-specific background inserted for this particular request; may or may not recur depending on the application."
- User Instruction segment: "The specific ask for this turn; unique to this request."

Instructional Rationale: A single concrete, fully-worked prompt with click-to-reveal segments is appropriate for an Understand-level identify objective — it lets the learner see a real example rather than an abstract description, directly reinforcing the recurring-cost point made in the surrounding prose.

Canvas layout: Full width; prompt text block at top, infobox panel below; responsive, must reflow to a narrower single-column layout on small viewports

Implementation notes:
- Use p5.js for text layout, color-coded segment backgrounds, and click-region detection
- Token-cost estimates are pre-computed illustrative values, not a live tokenizer call
</details>

### Prompting Techniques

Beyond simply writing a clear prompt, a small set of well-established techniques change how much guidance you give the model before asking it to perform a task, and each one trades token cost against reliability differently.

**Zero-shot prompting** means asking the model to perform a task with no examples at all — just an instruction. "Translate this sentence into French" is a zero-shot prompt: it describes the task and trusts the model's existing training to know how to do it. Zero-shot is the cheapest possible prompting strategy in tokens, since it adds nothing beyond the instruction itself, and modern large language models handle a surprising range of tasks this way.

**Few-shot prompting** provides the model with a small number of worked examples of the task before asking it to perform the task itself — showing two or three sample input-output pairs, then presenting a new input and letting the model infer the pattern. Few-shot prompting reliably improves accuracy on tasks where the desired output format or style is unusual or hard to describe in words alone, but each example consumes real tokens on every single request, so the accuracy gain has a recurring, cumulative price tag. A five-example few-shot prompt sent a million times a month is five times the token cost of the same prompt sent zero-shot, before the model has even started generating a response.

**Chain-of-thought prompting** asks the model to work through a problem step by step, explicitly reasoning through intermediate stages before producing a final answer, rather than jumping straight to a conclusion. This measurably improves accuracy on tasks that require multi-step reasoning — arithmetic, logic puzzles, multi-part business questions — because it gives the model room to build toward the right answer instead of guessing it in one shot. The cost trade-off runs in the opposite direction from few-shot's added input tokens: chain-of-thought increases the length of the model's *output*, since the reasoning steps themselves are generated text the model produces and you pay for.

!!! mascot-tip "Start Cheap, Add Expense Only When Earned"
    ![Ledger giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A good default order to try: zero-shot first, few-shot only if accuracy genuinely needs it, chain-of-thought only for tasks that actually require multi-step reasoning. Each upgrade adds real, recurring tokens — reach for it because the task demands it, not out of habit.

#### Diagram: Same Task, Three Prompting Strategies

<iframe src="../../sims/prompting-technique-comparator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Same Task, Three Prompting Strategies</summary>
Type: microsim
**sim-id:** prompting-technique-comparator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze
Bloom Taxonomy Verb: compare

Learning objective: Learners will be able to compare zero-shot, few-shot, and chain-of-thought prompting on the same task by observing differences in prompt length, output length, and total token count.

Purpose: Show the same simple math word problem solved three ways, with the full prompt and response text visible for each, plus a running token-count tally.

Data Visibility Requirements:
  Stage 1 (Zero-shot tab): Show prompt "A store had 120 apples. It sold 45 in the morning and 38 in the afternoon. How many are left?" and a one-line answer "37 apples." Token count badge: prompt ~28 tokens, response ~4 tokens, total ~32.
  Stage 2 (Few-shot tab): Show two worked examples prepended to the same question, then the one-line answer. Token count badge: prompt ~95 tokens, response ~4 tokens, total ~99.
  Stage 3 (Chain-of-thought tab): Show the same zero-shot-length prompt plus the instruction "think step by step," followed by a multi-line reasoning trace ending in "37 apples." Token count badge: prompt ~34 tokens, response ~48 tokens, total ~82.
  Final: Side-by-side summary bar showing all three total token counts together.

Interaction: Three tabs (Zero-Shot / Few-Shot / Chain-of-Thought) to switch views; a "Compare All Three" toggle shows the summary bar

Instructional Rationale: A tabbed, step-through reveal is appropriate because the Analyze-level objective requires learners to directly compare concrete token counts across strategies, not watch an animation — the whole point is making the recurring per-request cost difference visible and comparable.

Canvas layout: Full width; tab bar at top, prompt/response text area in the middle, token-count badges pinned at the bottom of each tab; responsive, must reflow to a stacked layout on narrow viewports

Implementation notes:
- Use p5.js for layout and tab switching; token counts are pre-computed illustrative values, not a live tokenizer call
- Store each strategy's example text and token counts in a simple lookup object
</details>

### Grounding the Model: RAG, Embeddings, Vector Databases, and Hallucination

A language model's knowledge is frozen at the end of its training — it knows nothing about events after that point, nothing about your company's private documents, and it does not "look anything up" by default. When asked something it does not actually know, a model does not reliably say "I don't know." Instead it can produce **model hallucination**: a confident, fluent, plausible-sounding response that is factually wrong or entirely fabricated. Hallucination is not a bug in the traditional sense — it is a direct consequence of how these models generate text, predicting statistically likely next words rather than consulting a source of truth, and it is one of the most consequential risks this book will ask you to price into any GenAI deployment.

**Retrieval-augmented generation (RAG)** is the primary architectural technique for reducing hallucination on tasks that depend on specific, current, or private information. Instead of relying solely on what the model memorized during training, a RAG system first retrieves relevant text from an external source — your company's documentation, a product catalog, recent news — and inserts that retrieved text directly into the prompt before asking the model to answer. The model is now grounded in real, current, verifiable source material rather than working from memory alone, which sharply reduces (though does not eliminate) hallucination on retrieval-covered topics.

Making retrieval fast enough to run on every request requires two supporting pieces of infrastructure. An **embedding** is a numerical representation of a piece of text — a list of numbers that captures its meaning in a form a computer can compare mathematically, such that texts with similar meaning end up with similar embeddings even if they share no exact words in common. A **vector database** is a specialized data store built to hold millions of these embeddings and answer, in milliseconds, the question "which stored pieces of text are most similar in meaning to this new query?" Together, an embedding model and a vector database are what let a RAG system search an entire knowledge base for relevant context fast enough to insert it into a prompt before the user notices any delay.

Before moving to how models are served, it helps to see how the whole pipeline connects.

| Step | What happens | Who/what performs it |
|------|--------------|------------------------|
| 1. Query arrives | User asks a question | End user |
| 2. Query embedded | Question converted to an embedding | Embedding model |
| 3. Similarity search | Vector database returns the most relevant stored text | Vector database |
| 4. Prompt augmented | Retrieved text inserted into the prompt alongside the question | RAG system |
| 5. Grounded answer | Model answers using both its training and the retrieved text | Large language model |

!!! mascot-thinking "RAG Reduces Hallucination — It Doesn't Eliminate It"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what RAG actually changes: it gives the model better source material to work from, not a guarantee of truthfulness. The model can still misread or misstate the retrieved text. Budgeting for hallucination risk — through review processes, not just RAG — stays necessary even after RAG is in place.

#### Diagram: The RAG Pipeline

<iframe src="../../sims/rag-pipeline-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The RAG Pipeline</summary>
Type: workflow
**sim-id:** rag-pipeline-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: summarize

Learning objective: Learners will be able to summarize the five-step RAG pipeline and explain, for each step, what would go wrong (in cost or accuracy) if that step were skipped.

Purpose: Show the query-to-grounded-answer pipeline as a left-to-right flowchart, with each step's role and failure-if-skipped explained on click, and a branch showing what happens without RAG.

Steps (main pipeline, left to right):
1. "User Query" — click reveals: "The question or task as typed by the user."
2. "Embed Query" — click reveals: "Converts the query into a numerical embedding so it can be compared for similarity. Skipping this means no way to search by meaning."
3. "Vector Database Search" — click reveals: "Finds the most relevant stored text by comparing embeddings. Skipping this means no retrieval happens at all."
4. "Augment Prompt" — click reveals: "Inserts the retrieved text into the prompt alongside the original query, at the cost of additional input tokens."
5. "Grounded Answer" — click reveals: "The model answers using both its training and the retrieved context, sharply reducing hallucination risk on covered topics."

Branch node (dashed, off to the side): "Without RAG" — click reveals: "The model answers from training memory alone. Cheaper per request (no retrieval step, shorter prompt) but far more exposed to hallucination on anything outside its training data."

Every node MUST include a Mermaid `click` directive that opens the corresponding infobox text.

Color coding:
- Main pipeline: indigo
- "Without RAG" branch: gray, dashed border to signal it is an alternative path, not part of the main flow

Implementation: Mermaid flowchart syntax (`graph LR`) with `click` bindings on every node, including the branch node, to a JavaScript callback that populates an infobox below the diagram
</details>

### Serving Speed: Latency and Throughput

Once a model can be prompted reliably, the next question is how fast and how efficiently it can actually respond to real traffic. Two related but distinct measurements describe this. **Model latency** is the time between sending a request and receiving the response — what an individual user actually experiences waiting for an answer. **Model throughput** is a different measurement entirely: the total number of requests (or tokens) a system can process across all users in a given period of time, which describes system-wide capacity rather than any one person's wait.

These two measurements often trade against each other, and understanding that trade-off is directly relevant to cost. **Batch inference** processes multiple requests together in a single pass through the model rather than one at a time, which dramatically improves throughput — more total work gets done per unit of GPU time — but typically increases the latency any individual request experiences, since a request may sit waiting for a batch to fill before processing begins. This is precisely why batch inference is attractive for cost-sensitive, latency-tolerant workloads (overnight report generation, bulk document summarization) and unattractive for anything requiring an instant response.

**Streaming response** addresses the felt experience of latency without actually reducing the total time to generate a full answer: rather than waiting for the entire response to finish generating before showing anything, the model's output is sent to the user token by token as it is produced, the way ChatGPT's interface visibly "types" its answer. The total generation time is unchanged, but the user perceives the system as responsive because words start appearing almost immediately, which is why nearly every consumer-facing chat product uses streaming even though it does nothing to lower the underlying compute cost.

<details markdown="1">
<summary>Quick check: latency or throughput?</summary>
Type: markdown-list

- "This request took 800 milliseconds to get a response." — **latency**
- "This deployment can handle 5,000 requests per second across all users." — **throughput**
- "Turning on batch inference doubled our capacity but slowed individual responses." — describes a **throughput** gain traded against **latency**
</details>

#### Diagram: The Batch-Size Trade-Off

<iframe src="../../sims/latency-throughput-tradeoff-chart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The Batch-Size Trade-Off</summary>
Type: chart
**sim-id:** latency-throughput-tradeoff-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze
Bloom Taxonomy Verb: examine

Learning objective: Learners will be able to examine how increasing batch size affects throughput and per-request latency in opposite directions.

Chart type: Dual-axis line chart

Purpose: Show throughput rising and latency rising together as batch size increases, making the trade-off visible on one chart rather than two separate ones.

X-axis: Batch size (1, 4, 8, 16, 32, 64)
Left Y-axis: Throughput (requests processed per second)
Right Y-axis: Per-request latency (milliseconds)

Data series:
1. Throughput (solid indigo line, left axis), illustrative figures:
 - Batch 1: 12 req/s
 - Batch 4: 40 req/s
 - Batch 8: 68 req/s
 - Batch 16: 105 req/s
 - Batch 32: 150 req/s
 - Batch 64: 190 req/s

2. Latency (dashed orange line, right axis), illustrative figures:
 - Batch 1: 80ms
 - Batch 4: 110ms
 - Batch 8: 160ms
 - Batch 16: 240ms
 - Batch 32: 380ms
 - Batch 64: 620ms

Title: "Batch Size: More Throughput, More Latency"
Legend: Position top-left, labeled by axis

Annotations:
- Footnote: "Figures are illustrative for teaching purposes, not benchmarked hardware results."

Interactive features:
- Hover any point on either line to see exact values for that batch size
- Toggle to highlight a "sweet spot" band (batch size 8-16) where throughput gains are still steep but latency has not yet risen sharply

Implementation: Chart.js line chart with two Y-axes (dual-axis configuration)
</details>

### Getting Models Into Production

A model that works well in testing still has to be deployed — made available to run against real traffic — and kept that way as it changes over time. **Model deployment** is the general process of taking a trained or configured model and making it available to serve real requests: provisioning the necessary compute, exposing an interface (recall the API endpoint from Chapter 1), and monitoring that it continues to behave correctly. **Model versioning** is the practice of tracking distinct, identifiable releases of a model over time — v1, v2, a specific dated snapshot — so that behavior changes can be traced to a specific version, responses can be reproduced, and a team can roll back to a previous version if a new one regresses in quality or introduces unexpected cost.

Deployment also involves a genuine choice about where the model physically runs. **On-premises deployment** means running the model on infrastructure your own organization owns and operates, typically inside your own data center. It maximizes control over data privacy and lets you fully own hardware costs, but it requires significant upfront capital investment and in-house expertise to operate reliably. **Cloud-hosted model** deployment means running the model on a third-party cloud provider's infrastructure instead — whether that is a provider's own proprietary model behind an API, or your own model running on rented cloud compute. Cloud hosting trades upfront capital cost for ongoing operating expense and shifts most infrastructure management responsibility onto the provider, at the cost of somewhat less control and an ongoing dependency on that provider's availability and pricing.

!!! mascot-warning "Versioning Silently Changes Your Bill"
    ![Ledger warning the reader](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A provider upgrading a model to a new version behind the same API name can quietly change both its behavior and its price — sometimes for the better, sometimes not. Pin and track the specific version you are billed against, and re-test before letting an auto-upgrade take effect in production.

#### Diagram: Where Should This Model Run?

<iframe src="../../sims/deployment-model-landscape/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Where Should This Model Run?</summary>
Type: graph-model
**sim-id:** deployment-model-landscape<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze
Bloom Taxonomy Verb: differentiate

Learning objective: Learners will be able to differentiate on-premises and cloud-hosted deployment by their cost structure, control, and operational burden.

Purpose: Present a Model node branching into two deployment paths, each annotated with cost-structure, control, and operational-burden properties revealed on click.

Node types:
1. "Deployed Model" (center, orange rounded rectangle) — the model version being deployed
2. "On-Premises Deployment" (left branch, blue circle)
3. "Cloud-Hosted Model" (right branch, green circle)

Edge types:
- "deployed via" (solid black arrows) from Deployed Model to each of the two deployment options

Node click content:
- "On-Premises Deployment" click reveals: "Cost structure: high upfront capital, lower marginal cost at scale. Control: full data and hardware control. Operational burden: high — your team runs everything."
- "Cloud-Hosted Model" click reveals: "Cost structure: low upfront cost, ongoing operating expense that scales with usage. Control: shared with the provider. Operational burden: low — the provider manages most infrastructure."

Layout: Model node centered at top, two branches fanning down-left and down-right

Interactive features:
- Hover either branch node: show a one-sentence summary
- Click either branch node: open the full comparison text above in a side panel
- Drag, zoom, and pan supported

Visual styling:
- Distinct colors per deployment path (blue vs. green) with a legend explaining what each color represents

Implementation: vis-network JavaScript library, hierarchical top-down layout
Canvas size: responsive, minimum 600x400px, must reflow on window resize
</details>

### Shrinking Models Without Losing Too Much

The final cluster of concepts in this chapter addresses a direct cost lever: making a model smaller, faster, and cheaper to run without sacrificing more capability than necessary. These three techniques are closely related, and organizations often combine more than one.

**Model quantization** reduces the numerical precision used to store a model's parameters — for example, representing each parameter with fewer bits than it was trained with — which shrinks the model's memory footprint and speeds up inference, usually at a small, carefully managed cost to output quality. Because a model's size in memory directly drives the hardware needed to run it, quantization is one of the most immediately available cost levers available to a team already using a specific model: the same capability, running on cheaper or fewer GPUs.

**Knowledge distillation** takes a different approach: instead of compressing an existing model's own parameters, it trains an entirely new, smaller "student" model to mimic the behavior of a larger "teacher" model, using the teacher's outputs as training signal. The result is a smaller model that approximates the larger one's behavior on the tasks it was distilled for, often at a fraction of the original's inference cost, though typically with some gap in capability on tasks outside that focus.

**Model right-sizing** is the broader discipline these two techniques serve: deliberately choosing the smallest, cheapest model that still meets your accuracy and latency requirements for a given task, rather than defaulting to the largest, most capable (and most expensive) model available. A customer-facing chatbot answering simple FAQ questions rarely needs the same model as a system drafting complex legal analysis, and right-sizing means matching model choice to task difficulty rather than using one model for everything.

!!! mascot-encourage "Compression Vocabulary Piles Up Fast — That's Normal"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Quantization, distillation, right-sizing — three new terms in quick succession. You don't need to implement any of these yourself for this course; you need to recognize them on a vendor's feature list and know, roughly, what cost lever each one pulls. That recognition is the actual skill.

#### Diagram: Three Ways to Shrink a Model

<iframe src="../../sims/model-compression-tradeoffs-chart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Three Ways to Shrink a Model</summary>
Type: chart
**sim-id:** model-compression-tradeoffs-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Evaluate
Bloom Taxonomy Verb: assess

Learning objective: Learners will be able to assess the relative cost-reduction and quality-impact trade-offs of quantization, distillation, and right-sizing.

Chart type: Grouped bar chart

Purpose: Compare three compression approaches on two dimensions at once — inference cost reduction and typical quality impact — so learners see that bigger savings tend to come with bigger (though still often acceptable) quality trade-offs.

X-axis: Technique (Quantization, Knowledge Distillation, Right-Sizing)
Y-axis: Percentage (0-100%)

Data series (two bars per technique), illustrative figures:
1. "Typical Inference Cost Reduction" (indigo bars):
 - Quantization: 40%
 - Knowledge Distillation: 60%
 - Right-Sizing: 70%

2. "Typical Quality Impact" (orange bars, framed as "quality given up," not gained):
 - Quantization: 5%
 - Knowledge Distillation: 15%
 - Right-Sizing: 10%

Title: "Cost Savings vs. Quality Trade-off by Technique"
Legend: Position top-right

Annotations:
- Footnote: "Figures are illustrative for teaching purposes; actual results vary widely by model, task, and implementation."

Interactive features:
- Hover any bar to see its exact percentage and a one-sentence reminder of what the technique does
- Toggle button: sort bars by cost reduction (descending) or by quality impact (ascending)

Implementation: Chart.js grouped bar chart
</details>

### Key Takeaways

This chapter moved from vocabulary into practice: how you actually interact with a deployed model, keep it grounded in truth, serve it at scale, and shrink it to control cost.

- A prompt is your entire interface to the model; the system prompt is its persistent instruction layer, and prompt engineering is the highest-leverage, lowest-cost way to improve results.
- Zero-shot, few-shot, and chain-of-thought prompting trade token cost for reliability in different directions — few-shot spends more input tokens, chain-of-thought spends more output tokens.
- Hallucination is a structural risk of how language models generate text; retrieval-augmented generation, built on embeddings and a vector database, reduces but never eliminates that risk by grounding responses in retrieved source material.
- Latency (individual wait time) and throughput (system-wide capacity) trade against each other, most visibly through batch inference; streaming response improves the felt experience without changing total generation time or cost.
- Model deployment and versioning determine how a model reaches production and how its behavior — and its price — can change over time; on-premises and cloud-hosted deployment split that cost between upfront capital and ongoing operating expense.
- Quantization, knowledge distillation, and model right-sizing are three distinct levers for the same goal: doing the job with the smallest, cheapest model that still meets the bar.

Chapter 3 moves from these deployment and optimization ideas into the layer that turns all of this into a literal, itemized bill: how text becomes tokens, and how those tokens are counted and priced.

!!! mascot-celebration "From Practice to Price"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You now know how prompts are engineered, how models stay grounded and get served in production, and how they're shrunk to save money. That's the full practical toolkit — next, we put a price tag on every piece of it.
