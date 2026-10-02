---
title: Tokenization and Token Pricing Fundamentals
description: How text becomes tokens, how providers count them, and how per-token pricing turns usage into a bill.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 08:30:00
version: 1.10
---

# Tokenization and Token Pricing Fundamentals

## Summary

Explains how text becomes tokens and how providers count and price them, establishing the vocabulary needed to read any generative AI usage bill. This chapter covers 23 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Token | 147 |
| Tokenization | 146 |
| Subword Tokenization | 145 |
| Byte Pair Encoding | 144 |
| Token Vocabulary | 143 |
| Input Token | 142 |
| Output Token | 1 |
| Token Count | 140 |
| Token Limit | 139 |
| Context Length | 138 |
| Token-To-Word Ratio | 137 |
| Tokenizer Choice | 136 |
| Token Pricing Model | 135 |
| Per-Token Pricing | 134 |
| Input Token Pricing | 133 |
| Output Token Pricing | 132 |
| Blended Token Rate | 1 |
| Prompt Caching | 130 |
| Cached Token Discount | 129 |
| Batch API Discount | 128 |
| Token Budget | 127 |
| Token Consumption Rate | 1 |
| Token Efficiency | 125 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

Chapter 1 told you that a large language model reads and writes tokens, not words. Chapter 2 showed you what you actually say to a model — the prompt — and how that interacts with deployment choices. This chapter stops treating "token" as a vocabulary word and starts treating it as a unit of currency. Every generative AI bill you will ever read is, underneath the dashboard and the invoice formatting, a token count multiplied by a rate. If you cannot see the token count, you cannot see the cost.

!!! mascot-welcome "Every Bill Is a Token Count in Disguise"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This is the chapter where the vocabulary turns into arithmetic. By the end, you'll be able to open a provider's pricing page and know exactly what you're looking at — and why the same sentence can cost different amounts depending on what language it's written in. Every token counts!

### From Text to Tokens

A **token** is the atomic unit of text that a language model actually reads, writes, and is billed on — not a character, and usually not a whole word. A **tokenizer** converts raw text into a sequence of tokens before the model ever sees it, and converts the model's output tokens back into readable text afterward. This conversion step, called **tokenization**, happens on every single request, invisibly, and it is the reason a sentence's cost cannot be estimated by counting words.

Most modern tokenizers use **subword tokenization**: rather than treating each whole word as one unit (which would struggle with rare words, typos, and new terms) or each character as one unit (which would produce enormous sequences), they break text into frequently-occurring chunks that are smaller than words but larger than characters. The word "tokenization" itself might become two or three subword pieces rather than one. This matters for cost because it means common English words are usually cheap (often a single token) while rare words, code identifiers, and non-English text are routinely more expensive — the same idea can cost more tokens to express depending on which pieces of it the tokenizer already recognizes.

The dominant algorithm for building this set of chunks is **Byte Pair Encoding (BPE)**: starting from individual characters, it repeatedly merges the most frequently adjacent pair of symbols into a new, single symbol, building up a vocabulary of chunks from the ground up based on how often they co-occur in a large training corpus. The result of running BPE over a training corpus is the tokenizer's **token vocabulary** — the fixed, finite list of every chunk the tokenizer is allowed to produce, typically ranging from 32,000 to over 200,000 entries depending on the model family.

Before we look at how this plays out on a real sentence, let's trace one step at a time.

!!! mascot-thinking "Merges, Not Magic"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that BPE never "understands" language — it just counts co-occurring symbol pairs and merges the most frequent ones, over and over. The vocabulary is a byproduct of statistics on a training corpus, not a dictionary someone wrote by hand.

#### Diagram: Byte Pair Encoding Step-Through

<iframe src="../../sims/bpe-tokenizer-explorer/main.html" width="100%" height="382px" scrolling="no"></iframe>

<details markdown="1">
<summary>Byte Pair Encoding Step-Through</summary>
Type: microsim
**sim-id:** bpe-tokenizer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2) — explain
Learning objective: Explain how Byte Pair Encoding builds a token vocabulary by repeatedly merging the most frequent adjacent symbol pair.

Instructional Rationale: Step-through with worked examples is appropriate because this is an Understand-level objective requiring learners to trace a deterministic process with concrete data. Continuous animation would hide which pair got merged and why.

Canvas layout:
- Top (400x80): the current symbol sequence for the input word, rendered as boxes
- Middle (400x200): a frequency table of adjacent symbol pairs in the current sequence, sorted descending
- Bottom (400x100): control panel

Data Visibility Requirements:
  Stage 1: Show the input word "tokenization" split into characters: t-o-k-e-n-i-z-a-t-i-o-n
  Stage 2: Show the pair-frequency table computed from this single word plus a small shared corpus
  Stage 3: Highlight the most frequent pair (e.g., "t"+"i") and show it merging into "ti"
  Stage 4: Show the updated sequence with the new merged symbol
  Stage 5: Repeat for 4-5 merges until the word is a small number of subword chunks
  Final: Show the final token sequence for "tokenization" alongside its token count

Interactive controls:
- Text input: type any word (max 20 characters) to re-run the trace
- Button: "Next Merge" / "Previous Merge"
- Button: "Reset"
- Display: running token count as merges proceed

Default parameters: input word "tokenization", 0 merges applied

Behavior: each "Next Merge" click performs exactly one BPE merge step and updates all three panels; the pair table recomputes live from the current sequence state.

Implementation: p5.js, state machine over an array of symbols, no external tokenizer library required for this illustrative version.
</details>

### Counting Tokens: Inputs, Outputs, and Limits

Every request to a model produces two separately-counted token streams. The **input token** count is everything you send: the system prompt, the user's message, any retrieved documents, and conversation history. The **output token** count is everything the model generates in response. Providers count and price these two streams independently, and — as you will see in the next section — almost always at different rates.

The sum of input and output tokens for a single request is its **token count**, and every model has a **token limit** (sometimes called a **context length**): the maximum number of combined input and output tokens the model can process in one request. Exceed it and the request fails outright, or the application silently truncates your input — neither of which is a failure mode you want to discover in production. Context length is a hard technical ceiling, not a pricing tier, though as you'll see in Chapter 4, providers do charge differently as you approach it.

Because subword tokenization does not map cleanly onto words, every piece of text has a **token-to-word ratio** — a rough multiplier (commonly 1.3-1.5 tokens per English word) that lets you convert a word count estimate into a token count estimate. This ratio is not fixed: dense code, non-English text, and text full of rare proper nouns routinely run 2x or higher, while simple repetitive English text can run below 1.3.

Before we compare ratios across content types, note that different providers use different tokenizers, and your **tokenizer choice** is not something you select independently of your model choice — it is bundled with it. Switching model providers can silently change your token counts for identical text, which is exactly the kind of hidden cost swing this course trains you to catch before it shows up on an invoice.

<!-- bridge sentence before table -->
The table below shows why the token-to-word ratio is not a universal constant you can assume away.

| Content Type | Approx. Tokens per Word | Why |
|---|---|---|
| Plain English prose | 1.3 | Common words are frequent single-vocabulary entries |
| Source code | 1.6-2.0 | Identifiers, punctuation, and indentation fragment into more subwords |
| Non-English (e.g., many Asian languages) | 2.0-3.5+ | Training corpora are English-majority, so vocabulary entries favor English chunks |
| Text with many rare proper nouns | 1.8-2.2 | Uncommon names rarely match a single vocabulary entry |

!!! mascot-tip "Estimate Before You Build"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before committing to a prompt design, run a handful of representative samples through the actual provider's tokenizer — never estimate from word count alone. A 20% ratio miss on a high-volume endpoint compounds into a real budget variance by month's end.

#### Diagram: Context Window Budget Allocation

<iframe src="../../sims/context-window-budget-chart/main.html" width="100%" height="422px" scrolling="no"></iframe>

<details markdown="1">
<summary>Context Window Budget Allocation</summary>
Type: chart
**sim-id:** context-window-budget-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4) — examine
Learning objective: Analyze how system prompt, retrieved context, conversation history, and available output share a fixed token limit.

Chart type: Stacked horizontal bar, single bar representing one model's token limit

Data to be plotted (illustrative, a 32,000-token limit example):
- System prompt: 500 tokens
- Retrieved documents: 4,000 tokens
- Conversation history: 2,500 tokens
- Remaining input headroom: 15,000 tokens (user's next message)
- Reserved output budget: 10,000 tokens

X-axis: Tokens (0 to the model's token limit)
Legend: one color per segment, positioned below the chart

Interactivity requirement: hovering any segment shows its exact token count, percentage of the total limit, and a one-line description of what occupies that segment; a dropdown lets the learner switch between 3 preset token limits (8,000 / 32,000 / 128,000) to see how fixed-size segments (system prompt) shrink as a share of a larger window while reserved output stays proportionally similar.

Implementation: Chart.js horizontal stacked bar with a dropdown control re-rendering the dataset.
</details>

### How Providers Price Tokens

Every generative AI provider publishes a **token pricing model**: the rule set that converts a request's token counts into a dollar cost. The near-universal form of this rule is **per-token pricing** — a fixed dollar rate per token (usually quoted per 1,000 or per 1,000,000 tokens for readability), applied by multiplying the rate by the token count.

Because input and output tokens are counted separately, providers almost always publish two separate rates: **input token pricing** and **output token pricing**. Output tokens are routinely priced 2-5x higher than input tokens of the same model, because generating a token requires a full forward pass through the model while processing an input token can be batched and cached far more efficiently. This asymmetry is one of the single most consequential facts in this entire course: a chatty, verbose model response is not merely annoying, it is disproportionately expensive compared to the prompt that produced it.

When you need a single number to compare two requests or two models at a glance — say, in a dashboard or an executive summary — you compute a **blended token rate**: a weighted average of the input and output rates based on your actual observed mix of input-to-output tokens for a representative workload. A blended rate is a reporting convenience, not a billing mechanism; providers never bill you at a blended rate, they always apply the separate input and output rates to the separate counts.

!!! mascot-thinking "Why the Asymmetry Matters More Than the Headline Rate"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Two models with the same advertised "price per token" on a marketing page can have wildly different real costs for your workload if their input:output pricing ratios differ. Always compare the pair of rates, never a single headline number.

Let's work through a concrete request. Suppose a model prices input tokens at \\(\$0.50\\) per million tokens and output tokens at \\(\$2.00\\) per million tokens. A request sends 3,000 input tokens and receives 800 output tokens back. The cost is:

\[
\text{cost} = \left(3{,}000 \times \frac{0.50}{1{,}000{,}000}\right) + \left(800 \times \frac{2.00}{1{,}000{,}000}\right) = \$0.0015 + \$0.0016 = \$0.0031
\]

A single request costs a fraction of a cent — which is exactly why organizations lose track of GenAI spend until volume multiplies it into a six- or seven-figure line item. The formula never changes; only the volume does.

#### Diagram: Per-Request Token Cost Calculator

<iframe src="../../sims/token-cost-calculator/main.html" width="100%" height="432px" scrolling="no"></iframe>

<details markdown="1">
<summary>Per-Request Token Cost Calculator</summary>
Type: microsim
**sim-id:** token-cost-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3) — calculate
Learning objective: Apply the per-token pricing formula to compute the dollar cost of a single request from its input/output token counts and rates.

Canvas layout:
- Left (300): four sliders and a numeric readout
- Right (300): a live-updating cost breakdown bar (input cost vs output cost, stacked)

Interactive controls:
- Slider: Input tokens (0-50,000)
- Slider: Output tokens (0-10,000)
- Slider: Input rate per million tokens ($0.10-$10.00)
- Slider: Output rate per million tokens ($0.10-$20.00)
- Display: total cost to 4 decimal places, plus the blended rate per million tokens implied by this mix

Default parameters: 3,000 input tokens, 800 output tokens, $0.50 input rate, $2.00 output rate

Behavior: every slider movement recomputes and redraws the cost bar instantly; the blended-rate readout updates to show how it shifts as the input:output mix changes, reinforcing that blended rate is workload-dependent, not a fixed provider number.

Implementation: p5.js, pure arithmetic, no external dependencies.
</details>

### Discounts, Budgets, and Efficiency

Per-token pricing is the baseline, but most providers offer mechanisms that reduce the effective rate under specific conditions — and knowing these is where real savings live.

**Prompt caching** lets a provider reuse the internal computation for a portion of your input that was already processed in a recent prior request — typically a long, unchanging system prompt or a large retrieved document — instead of recomputing it from scratch. When a request qualifies, the provider applies a **cached token discount**: the cached portion of the input is billed at a steep discount (often 50-90% off the standard input rate) rather than full price. This only works when the cached segment is byte-for-byte identical and submitted within a provider-specific time window, so a prompt that changes even slightly at the front will miss the cache and pay full price.

!!! mascot-warning "The Cache Only Forgives Exact Matches"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common and costly mistake is inserting a timestamp or a per-user value at the *start* of a system prompt. That single changed character invalidates the entire cached prefix. Keep anything that varies per-request at the *end* of your prompt, after the stable, cacheable portion.

A separate discount applies to work that does not need an immediate response: the **batch API discount**. Providers that offer asynchronous batch processing — submit a large set of requests, receive results within a window of minutes to 24 hours — typically price batch requests at roughly half the standard rate, since the provider can schedule the compute during idle capacity rather than guaranteeing instant latency. Batch discounts and caching discounts are independent levers and can often be combined.

To manage spend proactively rather than discovering it after the invoice, organizations set a **token budget**: a planned ceiling on tokens (and therefore dollars) a team, application, or project is allowed to consume over a period, and track their **token consumption rate** — tokens used per unit time — against that ceiling to catch overruns while there is still time to act. A budget with no consumption-rate tracking is just a number on a slide; the rate is what turns it into an operational control.

All of this rolls up into a single, book-wide goal: **token efficiency** — getting the result you need using the fewest tokens the task genuinely requires, across prompt design, caching eligibility, batching, and model choice simultaneously. Token efficiency is not one trick; it's the discipline of noticing every lever in this chapter at once.

!!! mascot-encourage "This Is the Densest Vocabulary in the Book"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the discount mechanics feel like a lot to hold at once, that's normal — this chapter packs in more distinct, interacting levers than any other. You don't need to memorize every discount percentage; you need to recognize *when* each lever applies, and that comes with practice in Chapter 4.

#### Diagram: Token Budget Governance Workflow

<iframe src="../../sims/token-budget-governance-workflow/main.html" width="100%" height="422px" scrolling="no"></iframe>

<details markdown="1">
<summary>Token Budget Governance Workflow</summary>
Type: workflow
**sim-id:** token-budget-governance-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Level: Apply (L3) — implement
Learning objective: Apply token budget and consumption-rate tracking to decide when an application's usage requires intervention.

Purpose: Show the decision flow a team follows when monitoring token spend against a budget.

Visual style: Flowchart with decision diamonds

Steps:
1. Start: "Token Consumption Rate Measured" — click reveals "Usage dashboards aggregate token counts across requests over a rolling window."
2. Decision: "Rate Within Budget Pace?" — click reveals "Compare consumption rate × remaining period length against remaining token budget."
3a. Process (if yes): "Continue Monitoring" — click reveals "No action needed; recheck at next interval."
3b. Process (if no): "Identify Largest Driver" — click reveals "Break down consumption by endpoint, team, or prompt pattern to find the outlier."
4. Process: "Apply Efficiency Lever" — click reveals "Candidates: prompt caching eligibility, batch API for non-urgent work, prompt compression, or model right-sizing (Chapter 2)."
5. End: "Re-measure Consumption Rate" — click reveals "Confirm the lever reduced the rate before closing the loop."

Mermaid requirement: every node MUST have a `click NodeId call showInfo("...")` directive bound to its reveal text above — no node may be left without a click handler.

Color coding: blue for measurement steps, yellow for the decision diamond, green for resolution steps.

Implementation: Mermaid flowchart with click directives wired to an infobox panel.
</details>

### Summary and Quick Check

You now have the full vocabulary to read a token-based usage bill end to end: text becomes tokens through subword tokenization built by Byte Pair Encoding; every request produces separately-counted input and output tokens bounded by a context length; providers apply separate per-token rates to each stream; and caching, batching, and budget tracking are the levers that bring the effective rate down. Chapter 4 builds directly on this foundation to show how real application patterns — long conversations, retrieval, and repeated prompts — drive consumption up or down in practice.

??? note "Quick check: which costs more, 1,000 input tokens or 1,000 output tokens on the same model? - Click to expand"
    Output tokens, almost always — typically 2-5x the input rate, because generating each one requires a full forward pass through the model rather than a batchable read.

!!! mascot-celebration "You Can Now Read a Token Bill"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just connected tokenization mechanics to real pricing arithmetic — the single most load-bearing skill in this entire course. Every later chapter on efficiency techniques and ROI reporting builds directly on what you did here.
