---
title: Core Concepts of Large Language Models
description: The foundational vocabulary of generative AI — AI, machine learning, deep learning, transformers, and large language models — that every later cost and ROI discussion in this book depends on.
generated_by: claude skill chapter-content-generator
date: 2026-09-10 08:48:31
version: 1.10
---

# Core Concepts of Large Language Models

## Summary

Introduces the vocabulary of generative AI systems — AI, machine learning, deep learning, transformers, and large language models — building the conceptual foundation every later cost discussion depends on. This chapter covers 24 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Artificial Intelligence | 424 |
| Machine Learning | 423 |
| Deep Learning | 422 |
| Neural Network | 421 |
| Generative AI | 420 |
| Large Language Model | 292 |
| Foundation Model | 249 |
| Transformer Architecture | 248 |
| Attention Mechanism | 1 |
| Self-Attention | 246 |
| Pretraining | 245 |
| Fine-Tuning | 244 |
| Instruction Tuning | 243 |
| RLHF Alignment | 242 |
| Inference | 241 |
| Training Vs Inference Cost | 240 |
| Model Parameters | 239 |
| Model Parameter Count | 238 |
| Context Window | 1 |
| Multimodal Model | 236 |
| Open-Source Model | 235 |
| Proprietary Model | 234 |
| Model Provider | 233 |
| API Endpoint | 207 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

Every dollar this book eventually helps you account for — every token, every API call, every GPU-hour of training — traces back to a small set of ideas about what these systems are and how they work. You cannot reason about the cost of a large language model until you know what "large," "language," and "model" actually mean in this context, and you cannot evaluate a vendor's pricing claims until you understand which stage of a model's life the price applies to. This chapter builds that vocabulary from the ground up, assuming no prior exposure to artificial intelligence. Every term introduced here will reappear, with a dollar sign attached, somewhere in Chapters 2 through 27.

!!! mascot-welcome "Meet Ledger"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hello — I'm Ledger, a fox who has spent a career translating what technology does into what technology costs. I'll be with you for every chapter of this book, and I only ever show up to do one of six jobs: welcome you into a new chapter, flag a mental model worth pausing on, hand you a shortcut, warn you about a common trap, cheer you through a hard stretch, or celebrate what you've just mastered. If I'm not doing one of those six things, I'm not in the chapter. Every token counts — let's get started.

### The AI Family Tree

**Artificial intelligence (AI)** is the broadest term in this chapter, and the easiest to define too loosely: it refers to any computer system that performs a task we would otherwise say requires human intelligence — recognizing a face, translating a sentence, recommending a product, or playing a board game at a competitive level. That definition is deliberately capability-based rather than mechanism-based, because AI has been built with wildly different techniques over its seventy-year history. A 1970s chess program that searched millions of possible moves using hand-written rules was AI. A modern system that writes a paragraph of prose is also AI. Both satisfy the definition; neither works the way the other does. For this course, the important consequence is economic rather than philosophical: "AI" tells you almost nothing about what a system costs to run, because the category includes everything from a simple rule-based script to a system with hundreds of billions of learned values. Every cost estimate in this book applies to a specific technique, not to "AI" as a whole.

**Machine learning (ML)** narrows that broad category considerably. It is the subfield of AI in which a system improves its performance on a task by learning patterns from data, rather than by following rules a programmer wrote by hand. A spam filter is a clean example: instead of a human enumerating every phrase that makes an email suspicious, an ML system is shown thousands of emails already labeled "spam" or "not spam" and learns, statistically, which word patterns correlate with each label. This shift — from hand-written rules to learned patterns — is the single most important dividing line in AI history, and it is the reason cost accounting in this book starts with ML rather than with AI generally. Once a system's behavior comes from data rather than from code a person wrote, its cost structure changes fundamentally: you now pay for the data, the computation needed to learn from it, and the computation needed to apply what it learned, none of which apply to a purely rule-based system.

**Deep learning (DL)** narrows the category again. It is the branch of machine learning built specifically on **neural networks** — computing systems loosely inspired by how neurons connect in a biological brain, organized into layers of simple mathematical units that each transform their input slightly before passing it to the next layer. "Deep" refers to the number of layers stacked on top of each other; a network with dozens or hundreds of layers can learn far more intricate patterns than one with only two or three, at the cost of needing far more data and far more computation to train. Deep learning is what made modern generative AI possible: the language models this course studies are, underneath everything else, very deep neural networks trained on enormous quantities of text. Every time this book discusses GPU costs, training time, or model size, it is implicitly discussing the deep learning layer of this family tree.

Before looking at how these four ideas relate to one another, it helps to see them side by side.

| Term | Scope | Defining trait | Example |
|------|-------|-----------------|---------|
| Artificial Intelligence | Broadest | Performs tasks associated with human intelligence | A rule-based tax-filing assistant |
| Machine Learning | Subset of AI | Learns patterns from data instead of hand-written rules | A spam filter trained on labeled emails |
| Deep Learning | Subset of ML | Uses multi-layer neural networks | An image classifier with 50 layers |
| Neural Network | The mechanism DL is built on | Layers of simple units that transform data | The architecture underneath a deep learning model |

!!! mascot-thinking "Nesting, Not Synonyms"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice these four terms nest inside one another like Russian dolls — every neural network is deep learning, every deep learning system is machine learning, every machine learning system is AI, but the reverse is never true. Vendors sometimes blur this on purpose, since "AI-powered" sounds more impressive than "a fine-tuned neural network," and knowing the real nesting lets you ask sharper questions about what you're actually paying for.

#### Diagram: The AI Family Tree

<iframe src="../../sims/ai-family-tree/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The AI Family Tree</summary>
Type: graph-model
**sim-id:** ai-family-tree<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: classify

Learning objective: Learners will be able to classify Artificial Intelligence, Machine Learning, Deep Learning, Neural Network, Generative AI, Foundation Model, and Large Language Model according to their nested "is-a-subset-of" relationships.

Purpose: Show that these seven terms form a chain of nested categories rather than seven unrelated buzzwords.

Node types (all same shape, concentric sizing to suggest nesting; color deepens with specificity):
1. Artificial Intelligence (outermost, lightest blue)
2. Machine Learning (nested inside AI, medium blue)
3. Deep Learning (nested inside ML, deeper blue)
4. Neural Network (labeled as the mechanism DL is built on; connects to Deep Learning with a "built on" edge rather than nesting further)
5. Generative AI (nested inside Deep Learning, deep teal)
6. Foundation Model (nested inside Generative AI, darker teal)
7. Large Language Model (nested inside Foundation Model, darkest teal)

Edge types:
- "contains" edges (solid black arrows) linking each broader category to the next-narrower one it contains
- One "built on" edge (dashed gray arrow) from Deep Learning to Neural Network

Layout: Hierarchical, top-down, with Artificial Intelligence at the top and Large Language Model at the bottom

Interactive features:
- Hover any node: show its one-sentence definition from this chapter in a tooltip
- Click any node: highlight the full chain from that node up to Artificial Intelligence and down to its narrowest descendant already on the graph
- Zoom: mouse wheel
- Pan: click and drag background

Visual styling:
- Node size constant; color intensity increases with specificity (lightest = broadest category)
- Highlighted chain rendered in orange when a node is clicked
- Legend explaining "contains" vs. "built on" edge styles

Implementation: vis-network JavaScript library, hierarchical layout mode
Canvas size: responsive, minimum 600x450px, must reflow on window resize
</details>

### From Deep Learning to Generative AI

Deep learning systems come in two broad flavors depending on what they are trained to do. A *discriminative* model learns to sort inputs into categories — is this email spam, is this X-ray showing a tumor, is this transaction fraudulent. A **generative AI** model learns something different: the underlying pattern of a whole class of data well enough to produce new, original examples of that class. A generative image model does not just recognize a cat photo; it can produce a photo of a cat that never existed. This distinction matters financially because generation is a fundamentally more expensive task than classification — sorting an input into one of a few categories requires far less computation than constructing an entirely new, coherent output token by token, and that added cost is a running theme throughout this book.

A **foundation model** is a specific kind of generative deep learning system: one trained on a very large, broad dataset — general web text, images, code — so that it develops broadly useful capabilities before anyone specializes it for a particular job. The name reflects its role: it is the foundation other, more specific systems are built on top of, the same way a general contractor pours a foundation before anyone decides whether the building above it will be a house or an office. This upfront, general-purpose training is enormously expensive, often costing millions of dollars in compute for the largest models, which is precisely why relatively few organizations build foundation models from scratch and why the economics of "buying access to one" versus "building your own" become a central topic in Chapter 19.

A **large language model (LLM)** is a foundation model specialized in text: it has been trained on enormous quantities of written language and can read, summarize, translate, answer questions about, and generate more of it. GPT-4, Claude, and Llama are all LLMs. Every LLM is a foundation model, and every foundation model is a piece of generative AI, but not every foundation model is an LLM — some are trained primarily on images, audio, or a mix of data types, a distinction this chapter returns to later when it introduces multimodal models. For this course, the LLM is the central object of study: it is the system whose token consumption, inference cost, and deployment choices the rest of this book is built to help you measure.

<details markdown="1">
<summary>Quick check: is it generative or discriminative?</summary>
Type: markdown-list

- A model that flags a credit card transaction as likely fraudulent — **discriminative** (sorts into a category)
- A model that writes a first draft of a customer email — **generative** (produces new content)
- A model that predicts whether a support ticket will be escalated — **discriminative**
- A model that answers a technical question in complete sentences — **generative**
</details>

### Inside the Transformer

Every major LLM in production today, including the ones referenced throughout this book, is built on the same underlying architecture: the **transformer**. Introduced in 2017, the transformer architecture solved a problem that had limited earlier language models — understanding how words in a sentence relate to one another regardless of how far apart they sit. Consider the sentence "The trophy didn't fit in the suitcase because it was too big." Does "it" refer to the trophy or the suitcase? A human resolves this instantly using context spread across the whole sentence, not just the words immediately next to "it." Older architectures struggled with exactly this kind of long-range dependency; the transformer was built specifically to handle it well, and that capability is a large part of why transformer-based models write text that reads as coherent rather than locally plausible but globally confused.

The mechanism that gives the transformer this ability is called **self-attention**. In plain terms, self-attention lets every word in a passage "look at" every other word and decide how much weight to give each one when interpreting its own meaning — so when the model processes "it," self-attention lets it weigh "trophy" and "suitcase" against each other using signals like "too big" to resolve the ambiguity correctly. This course deliberately does not walk through the mathematics behind how those weights are calculated; that level of detail belongs to a course on model architecture, not one on cost and ROI. What matters here is a single economic consequence: because self-attention compares every word against every other word, the amount of computation it requires grows much faster than the length of the text does. A passage twice as long does not cost twice as much to process under self-attention — it costs substantially more than twice as much. That single fact is the root cause behind context-window pricing, a topic Chapter 3 covers in detail, and it is worth remembering now as the first place where an architectural choice turns directly into a line item on an invoice.

A related, much narrower term is the **attention mechanism** itself — the general technique of computing these weighted relationships between elements of a sequence, of which self-attention (relating a sequence to itself) is the specific form transformers use. You will encounter "attention" most often as shorthand for self-attention in casual usage, and this book follows that convention outside of this section.

!!! mascot-encourage "Architecture Talk Is Supposed to Feel Abstract"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If self-attention feels hard to picture, that's normal — you don't need to be able to derive it to reason about its cost. Hang on to one idea: longer input, disproportionately more computation. That's the piece this book will keep using.

#### Diagram: Self-Attention, Qualitatively

<iframe src="../../sims/self-attention-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Self-Attention, Qualitatively</summary>
Type: infographic
**sim-id:** self-attention-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: explain

Learning objective: Learners will be able to explain, without using formulas, why self-attention lets a model relate any two words in a passage regardless of the distance between them.

Purpose: Let the learner click a word in a sentence and see, qualitatively, which other words it "attends to" most strongly — no numbers, no formulas, just relative emphasis.

Data Visibility Requirements:
  Stage 1: Show the full sentence "The trophy didn't fit in the suitcase because it was too big." rendered as individually clickable words.
  Stage 2 (on clicking "it"): Highlight "it" in yellow, then fade every other word to a shade of gray proportional to a pre-set qualitative relevance score, so "trophy" and "suitcase" stay dark/bold while filler words like "the" and "was" fade almost to background gray.
  Stage 3: Display a short caption beneath the sentence: "it" is weighing "trophy" and "suitcase" most heavily to decide what it refers to.
  Stage 4 (on clicking a second example sentence toggle): Swap in "The city council refused the demonstrators a permit because they feared violence." and repeat, showing that "they" attends most to "city council," not "demonstrators."

Interactive controls:
- Click any word to see what it attends to
- Toggle button: switch between the two example sentences
- Reset button: clear highlighting

Visual elements:
- Single row of word "chips," left to right
- Clicked word outlined in yellow
- Attended-to words rendered in bold black; low-relevance words rendered in light gray
- Caption text area below the sentence

Instructional Rationale: A step-through, click-driven reveal is appropriate because the Understand-level objective requires learners to see the *result* of attention (which words matter to which) without being distracted by the underlying computation, which this course explicitly excludes from scope.

Canvas layout:
- Full width, single row for the sentence, caption area below (responsive; must reflow on window resize, wrapping the sentence to a second line on narrow viewports)

Implementation notes:
- Use p5.js for text layout and click-region detection
- Store per-sentence attention weights as a simple hard-coded lookup table (no real model inference required — this is a teaching illustration, not a live model)
</details>

### Teaching a Model Its Job

A foundation model, fresh out of its initial training, is a remarkably capable but somewhat undirected system — it has absorbed patterns from enormous amounts of text but has not yet been taught to behave like a helpful assistant. Turning it into something like ChatGPT or Claude's user-facing product happens in stages, and understanding those stages matters because each one has a distinct cost profile and a distinct effect on what the model can safely be used for.

**Pretraining** is the first and by far the most expensive stage: the model is exposed to a massive, general corpus of text — much of the public internet, digitized books, code repositories — and learns, through nothing more sophisticated than repeatedly predicting the next word in a sequence, an enormous amount about grammar, facts, reasoning patterns, and writing styles. Pretraining is where the millions of dollars of compute cost mentioned earlier in this chapter are actually spent, and it typically happens once, by the organization that builds the foundation model, not by each downstream customer.

**Fine-tuning** comes next, and it operates on a fundamentally smaller scale: instead of learning from scratch, an already-pretrained model is further trained on a smaller, more specific dataset to adjust its behavior toward a particular domain or task — a legal-document model fine-tuned on contracts, or a customer-support model fine-tuned on a company's own support transcripts. Because fine-tuning starts from a model that already understands language broadly, it requires vastly less data and compute than pretraining, which is exactly why fine-tuning, not pretraining, is the option realistically available to most of the organizations this book is written for.

**Instruction tuning** is a particular flavor of fine-tuning aimed at a specific problem: a raw pretrained model is good at continuing text, but continuing text is not the same as following an instruction. Instruction tuning trains the model on examples that pair an instruction ("Summarize this article in three sentences") with a correct response, teaching it to treat prompts as requests to fulfill rather than as text to merely extend.

**RLHF alignment** — Reinforcement Learning from Human Feedback — goes a step further still, refining the model's behavior using human preference judgments rather than fixed example answers. Human reviewers compare pairs of model responses and indicate which one they prefer, and the model is adjusted to produce more responses like the preferred ones — favoring helpfulness, honesty, and safety over responses that are merely fluent. This is the stage most responsible for the difference in feel between a raw pretrained model, which can ramble or produce unhelpful continuations, and a polished assistant that stays on task and declines harmful requests.

!!! mascot-warning "Fine-Tuning Is Not the Same as Prompting"
    ![Ledger warning the reader](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common and costly mix-up: fine-tuning permanently updates a model's internal weights through additional training, while writing a clever prompt or attaching reference documents at request time changes nothing about the model itself. If your actual need is "make the model behave consistently for this one task," a well-designed prompt is almost always cheaper and faster than fine-tuning — this book returns to that trade-off directly in Chapter 7.

#### Diagram: From Raw Text to Helpful Assistant

<iframe src="../../sims/training-lifecycle-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>From Raw Text to Helpful Assistant</summary>
Type: workflow
**sim-id:** training-lifecycle-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: summarize

Learning objective: Learners will be able to summarize the four-stage process that turns a raw foundation model into a deployable assistant, and identify which stage a given cost belongs to.

Purpose: Show Pretraining, Fine-Tuning, Instruction Tuning, and RLHF Alignment as sequential stages, each with a click-revealed explanation of what happens and what it typically costs relative to the others.

Steps (rendered as a left-to-right flowchart with four boxes and arrows between them):
1. "Pretraining" — click reveals: "Learns general language patterns from a massive, broad corpus. By far the largest compute cost; usually a one-time cost borne by the foundation-model builder."
2. "Fine-Tuning" — click reveals: "Adjusts the pretrained model toward a specific domain using a much smaller, focused dataset. A fraction of pretraining's cost; realistic for many organizations."
3. "Instruction Tuning" — click reveals: "Teaches the model to treat prompts as instructions to fulfill rather than text to merely continue. A specialized form of fine-tuning."
4. "RLHF Alignment" — click reveals: "Refines behavior using human preference comparisons rather than fixed example answers, favoring helpful and safe responses."

Every node MUST include a Mermaid `click` directive that opens the corresponding infobox text above.

Color coding:
- Pretraining: darkest shade (signals highest cost)
- Fine-Tuning, Instruction Tuning, RLHF Alignment: progressively lighter shades (signals progressively smaller, though still real, cost)

Implementation: Mermaid flowchart syntax (`graph LR`) with `click` bindings on every node to a JavaScript callback that populates an infobox below the diagram
</details>

### Running the Model: Inference and Its Cost

Everything described so far happens before a model is ever used by an end customer. **Inference** is the term for that actual use: running the already-trained model on a new input to produce an output — a single chat response, a single translated sentence, a single generated image. Inference is where the model earns its keep, and it is also where the vast majority of this book's cost-optimization advice is aimed, because unlike training, which happens rarely, inference happens every single time a user sends a request.

This distinction produces one of the most important economic facts in the entire course, captured by the concept of **training versus inference cost**: training is typically a large, one-time (or infrequent) expense, while inference is a small, per-request expense that recurs without limit as usage grows. A foundation model that costs ten million dollars to pretrain might cost a fraction of a cent to answer a single question — but if that model answers ten million questions a month, the cumulative inference cost soon dwarfs the one-time training cost. Many organizations new to generative AI focus their cost anxiety on the eye-catching training number reported in the press, when the number that will actually appear on their own monthly bill is overwhelmingly an inference number. Recognizing which side of this split a given cost belongs to is the single most useful diagnostic skill this chapter can hand you.

!!! mascot-thinking "The Real Cost Lives in the Long Tail"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the insight worth sitting with: training happens once, but inference happens every time someone hits "send." At meaningful usage volume, that recurring, unglamorous inference cost — not the headline training number — is almost always where the real money goes. Keep this in your back pocket; it's the engine behind most of Part Two of this book.

#### Diagram: One-Time Training vs. Recurring Inference

<iframe src="../../sims/training-vs-inference-cost-chart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>One-Time Training vs. Recurring Inference</summary>
Type: chart
**sim-id:** training-vs-inference-cost-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze
Bloom Taxonomy Verb: differentiate

Learning objective: Learners will be able to differentiate a fixed, one-time training cost from a variable, recurring inference cost by observing how cumulative spend behaves as usage volume grows.

Chart type: Line chart

Purpose: Show a flat, one-time training cost alongside a cumulative inference cost that grows with query volume, crossing over at a realistic usage level.

X-axis: Number of user queries per month (0, 1M, 5M, 10M, 20M, 50M)
Y-axis: Cumulative cost in US dollars (linear scale)

Data series:
1. Training Cost (flat dashed orange line):
 - Constant at $2,000,000 regardless of query volume (illustrative figure representing a mid-size fine-tuning/training effort, not any specific vendor's real price)

2. Cumulative Inference Cost (rising solid indigo line), assuming an illustrative $0.05 average cost per query:
 - 0 queries: $0
 - 1M queries: $50,000
 - 5M queries: $250,000
 - 10M queries: $500,000
 - 20M queries: $1,000,000
 - 50M queries: $2,500,000

Title: "Where the Crossover Happens: Training vs. Inference Cost"
Legend: Position top-left

Annotations:
- Marker at the point where the two lines cross (~40M queries at these illustrative rates): "Past this point, inference is the bigger line item"
- Footnote text in the chart caption: "Figures are illustrative for teaching purposes, not vendor-specific pricing."

Interactive features:
- Hover any point on either line to see the exact cumulative dollar figure and query count in a tooltip
- Toggle to change the illustrative per-query cost ($0.02 / $0.05 / $0.10) and watch the crossover point shift

Implementation: Chart.js line chart with two datasets and a custom crossover annotation plugin
</details>

### How Big Is "Big"? Parameters and Context

Two related ideas describe the scale of a model: how much it has learned, and how much it can consider at once. **Model parameters** are the individual learned numerical values inside a neural network — the adjustable settings that were tuned during training and that collectively encode everything the model "knows." A single parameter in isolation is meaningless; a model's capability comes from the pattern across all of them together, refined over the course of training on enormous datasets. The **model parameter count** — simply how many of these values a model has — is the crudest but most widely cited proxy for a model's scale and, roughly, its capability and cost to run. It is crude because two models with the same parameter count can differ substantially in quality depending on their architecture and training data, but it remains the number vendors reach for first when describing a model's size, and it correlates strongly enough with compute cost to be worth tracking.

Publicly documented examples make the scale differences concrete: GPT-2, released in 2019, had roughly 1.5 billion parameters. Meta's open-weight Llama 3 family, released in 2024, spans from an 8-billion-parameter version suitable for a single high-end GPU up to a 70-billion-parameter version requiring substantially more hardware. GPT-3, whose architecture was described in a public research paper, had 175 billion parameters. These are not merely trivia; parameter count drives GPU memory requirements, inference latency, and — central to this book — the per-query dollar cost you will pay a provider or incur running the model yourself.

The **context window** is a different kind of scale entirely: it is the maximum amount of text — measured in tokens, a unit Chapter 3 defines precisely — that a model can consider at once when generating a response, encompassing both the prompt you send and the model's own reply. A larger context window lets a model reason over longer documents, longer conversations, or more reference material in a single request, but recall the self-attention cost fact from earlier in this chapter: because attention cost grows faster than input length, a larger context window is not a free upgrade. It is one of the most direct architectural levers on your bill, and Chapter 3 is built around exactly that connection.

Before moving on, it is worth comparing these size figures directly.

| Model | Parameter count | Released |
|-------|------------------|----------|
| GPT-2 | ~1.5 billion | 2019 |
| Llama 3 8B | ~8 billion | 2024 |
| Llama 3 70B | ~70 billion | 2024 |
| GPT-3 | ~175 billion | 2020 |

#### Diagram: Model Scale Across Five Years

<iframe src="../../sims/model-parameter-scale-chart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Model Scale Across Five Years</summary>
Type: chart
**sim-id:** model-parameter-scale-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand
Bloom Taxonomy Verb: compare

Learning objective: Learners will be able to compare the parameter counts of several publicly documented models spanning 2019-2024 and connect larger scale to greater compute and cost demands.

Chart type: Bar chart, logarithmic Y-axis (parameter counts span two orders of magnitude)

Purpose: Make the scale difference between a small, single-GPU-friendly model and a frontier-scale model visually obvious.

X-axis: Model name (GPT-2, Llama 3 8B, Llama 3 70B, GPT-3)
Y-axis: Parameter count (logarithmic scale, billions)

Data series (single series, bars colored by release year — earlier years lighter, later years darker):
- GPT-2: 1.5 billion (2019, lightest)
- Llama 3 8B: 8 billion (2024, dark)
- Llama 3 70B: 70 billion (2024, darker)
- GPT-3: 175 billion (2020, medium — shown out of chronological color order deliberately to reinforce that scale and release date are independent facts)

Title: "Publicly Documented Model Sizes, 2019-2024"
Legend: Release year color key, position top-right

Annotations:
- Footnote: "All figures from publicly available model documentation or research papers, not vendor marketing claims."

Interactive features:
- Hover any bar to see the exact parameter count and release year
- Toggle button: switch Y-axis between logarithmic and linear scale to feel the difference a log scale makes when values span this range

Implementation: Chart.js bar chart with logarithmic scale plugin
</details>

### The Deployment Landscape

The final cluster of concepts in this chapter concerns how models actually reach the people who use them, and this is where licensing, hosting, and interface choices start to shape cost directly.

A **multimodal model** is one that can process or generate more than one type of data — text and images together, for instance, rather than text alone. Multimodal capability generally increases both the model's training complexity and its inference cost, since the model must learn relationships across data types rather than within a single one; a system that accepts an image and answers questions about it is doing meaningfully more computational work than a text-only model answering an equivalent text question.

Models also differ in who controls them and how they can be used. An **open-source model** ships with its parameter weights publicly available for anyone to download, run, and modify, often under a permissive or research-friendly license — Llama 3 is again a useful example. A **proprietary model** is controlled entirely by its creator, accessible only through the provider's own interface, with its internal weights kept private. This is not a minor licensing footnote; it is a fork in your cost structure. An open-source model shifts cost toward infrastructure you must provision and operate yourself, while a proprietary model shifts cost toward a provider's per-request pricing, with far less operational burden but far less control. Chapters 19 and 20 build an entire framework around exactly this build-versus-buy decision.

A **model provider** is the organization that makes a model available for use — OpenAI, Anthropic, Google, or a cloud platform hosting an open-source model on your behalf. And the practical door through which you actually reach a provider's model is the **API endpoint**: a specific network address that accepts your request — your prompt, plus configuration settings — and returns the model's response. You do not need to write or train anything to use an API endpoint; you send data to an address the provider publishes, and the provider's infrastructure runs inference and sends a response back. Nearly every dollar figure discussed later in this book is, at the mechanical level, the price attached to a single call to one of these endpoints.

!!! mascot-tip "A Quick Gut-Check for Open-Source vs. Proprietary"
    ![Ledger giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Ask one question first: do you have the engineering capacity to host and maintain infrastructure yourselves? If yes, open-source weights can shift cost toward infrastructure you control and often shrink at scale. If no, a proprietary API endpoint trades a higher per-call price for zero hosting burden — and for most teams just getting started, that trade is worth it.

#### Diagram: The GenAI Deployment Landscape

<iframe src="../../sims/model-deployment-landscape/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The GenAI Deployment Landscape</summary>
Type: graph-model
**sim-id:** model-deployment-landscape<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze
Bloom Taxonomy Verb: differentiate

Learning objective: Learners will be able to differentiate the roles of a model provider, an open-source or proprietary model, an API endpoint, and a multimodal model by tracing how a request flows through this graph.

Purpose: Illustrate how a Model Provider hosts a Model (Open-Source or Proprietary), exposes it through an API Endpoint, and how that model may or may not be Multimodal.

Node types:
1. Model Provider (pink rounded rectangles) — e.g., "OpenAI," "Anthropic," "A cloud host running an open-weight model"
2. Model — Open-Source (light blue circles) and Model — Proprietary (dark blue circles), each a sub-type of "Model"
3. API Endpoint (orange diamonds)
4. Multimodal Model (green circles with a small "+image" badge) — shown as a specialization that either kind of Model may or may not have

Edge types:
- "hosts" (solid black arrow): Model Provider → Model
- "exposed via" (solid black arrow): Model → API Endpoint
- "is a" (dashed gray arrow): Multimodal Model → Model (either open-source or proprietary example)

Sample data to display:
- "OpenAI" hosts "GPT-4 (Proprietary)" exposed via "api.openai.com/v1/chat/completions"
- "A cloud host" hosts "Llama 3 70B (Open-Source)" exposed via "a self-managed endpoint"
- "GPT-4 (Proprietary)" is also tagged Multimodal (accepts images)

Layout: Left-to-right flow (Provider → Model → Endpoint), with the Multimodal badge attached to whichever Model node applies

Interactive features:
- Hover any node: show its one-sentence definition from this chapter
- Click "API Endpoint": highlight the full path from Provider through Model to Endpoint
- Drag nodes to rearrange; zoom and pan supported

Visual styling:
- Distinct shapes per node type (rounded rectangle, circle, diamond) so the legend can explain shape rather than only color
- Legend explaining node shapes, edge labels, and the multimodal badge

Implementation: vis-network JavaScript library, left-to-right hierarchical layout
Canvas size: responsive, minimum 600x450px, must reflow on window resize
</details>

### Key Takeaways

This chapter built the vocabulary layer everything else in the book stands on. Before moving forward, it is worth holding onto a short list of the ideas most likely to resurface with a dollar figure attached.

- AI, machine learning, deep learning, and neural networks nest inside one another — narrower terms describe more specific techniques, not synonyms for "impressive software."
- Generative AI, foundation models, and large language models form a further, narrower chain: an LLM is a foundation model, specialized for text, that produces new content rather than only classifying existing content.
- The transformer architecture, and specifically self-attention, is what lets modern LLMs relate distant words to one another — at a computational cost that grows faster than input length, which is the root cause of context-window pricing.
- A model moves through pretraining, fine-tuning, instruction tuning, and RLHF alignment on its way from raw text predictor to helpful assistant, and each stage has a distinct and very different cost profile.
- Inference — not training — is where most organizations' generative AI bills actually accumulate, because it recurs on every single request while training happens rarely.
- Parameter count is a rough proxy for a model's scale, cost, and capability; context window is the amount of text a model can consider at once, and it is one of the most direct levers on your bill.
- Whether a model is open-source or proprietary, and how you reach it through a provider's API endpoint, determines whether your cost shows up as infrastructure you operate or as a per-request price you pay someone else.

With this vocabulary in place, Chapter 2 turns to the practical side of working with these models day to day — prompting, deployment choices, and the optimization techniques that sit right on top of the foundations built here.

!!! mascot-celebration "Foundations: Built"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just went from zero to fluent in the vocabulary that every remaining chapter of this book will assume you know — AI's family tree, the transformer's cost-driving self-attention, the training-versus-inference split, and the deployment landscape. That's this book's hardest conceptual chapter, done.
