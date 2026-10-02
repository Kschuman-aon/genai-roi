---
title: Compute Pricing and Scaling Fundamentals
description: The compute pricing models beneath every generative AI bill — on-demand, reserved, spot, and serverless — along with autoscaling, utilization, and the supporting infrastructure costs.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 08:30:00
version: 1.10
---

# Compute Pricing and Scaling Fundamentals

## Summary

Surveys the compute pricing models beneath every generative AI bill — on-demand, reserved, spot, and serverless — along with autoscaling and utilization tradeoffs. This chapter covers 20 concepts and builds directly on the concepts introduced in earlier chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| GPU Compute | 136 |
| CPU Inference | 135 |
| Compute Cost | 134 |
| Cloud Compute Pricing | 114 |
| On-Demand Pricing | 1 |
| Reserved Capacity Pricing | 98 |
| Spot Instance Pricing | 97 |
| Serverless Inference | 1 |
| Dedicated Endpoint | 95 |
| Multi-Tenant Endpoint | 94 |
| Autoscaling | 93 |
| Cold Start Latency | 1 |
| Warm Pool | 91 |
| Compute Utilization Rate | 90 |
| Idle Capacity Cost | 89 |
| Data Transfer Cost | 88 |
| Storage Cost | 87 |
| Vector Store Cost | 86 |
| Network Egress Cost | 53 |
| Load Balancing | 52 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Prompting, Deployment, and Model Optimization Basics](../02-prompting-deployment-optimization/index.md)

---

Chapters 3 and 4 priced the token layer: what you pay per unit of text, and how real usage patterns drive that layer up or down. But a provider's per-token rate card did not fall from the sky — it is built on top of actual compute, actual hardware, sitting somewhere, costing money whether or not anyone is sending it a request right now. This chapter goes one layer deeper, to the infrastructure economics that determine why rate cards look the way they do, and what levers are available to you if you run or choose your own deployment rather than only consuming someone else's managed API.

!!! mascot-welcome "Beneath Every Rate Card Is a Server"
    ![Ledger waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Tokens were the unit of what you're buying. This chapter is about what you're actually buying it *with* — the compute, the capacity commitments, and the idle time nobody bills you for directly but somebody pays for anyway. Every token counts, and every token runs on a machine.

### The Hardware Underneath Inference

Running a model to produce a response — **inference** — can execute on two broadly different categories of hardware. **GPU compute** uses graphics processing units, which perform the many parallel matrix multiplications a neural network requires far faster than general-purpose processors, and is the default choice for any model of meaningful size. **CPU inference** uses general-purpose processors instead; it is slower per request for the same model but requires no specialized hardware, making it viable for small models, low-traffic workloads, or situations where GPU capacity is scarce or prohibitively expensive.

The combination of hardware type, how long a request occupies it, and the provider's rate for that hardware produces the **compute cost** of serving a request — the infrastructure-layer cost that, bundled with the provider's margin and amortized overhead, is what actually determines the per-token pricing you learned to read in Chapter 3. When you use a managed API, compute cost is hidden inside the token rate; when you deploy your own model, compute cost becomes a cost you manage directly.

!!! mascot-thinking "The Rate Card Is a Thin Wrapper Around This Chapter"
    ![Ledger thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Every per-token price in Chapter 3 is, underneath, a provider's compute cost plus margin, divided by expected token throughput. Understanding this chapter is what lets you sanity-check whether a rate card is reasonable rather than accepting it on faith.

Cloud providers publish **cloud compute pricing** — their rate schedules for renting GPU or CPU capacity by time — in several distinct models, each trading flexibility against cost:

- **On-demand pricing**: pay a published hourly (or per-second) rate for capacity with no upfront commitment and no long-term obligation; the most flexible and most expensive per-hour option.
- **Reserved capacity pricing**: commit to a fixed amount of capacity for a defined term (often 1 or 3 years) in exchange for a substantial discount off the on-demand rate — flexibility is traded for a lower rate, and the commitment is paid whether or not the capacity is fully used.
- **Spot instance pricing**: bid for unused provider capacity at a steep discount (often 60-90% off on-demand), with the tradeoff that the provider can reclaim that capacity with little notice if a higher-priority customer needs it — the deepest discount, paired with the least reliability.

<!-- bridge before table -->
The table below makes the tradeoff concrete across the three models.

| Pricing Model | Relative Cost | Commitment | Reliability | Best Fit |
|---|---|---|---|---|
| On-demand | Highest | None | High | Unpredictable or low-volume traffic |
| Reserved capacity | Lowest (steady use) | 1-3 year term | High | Stable, predictable baseline load |
| Spot instance | Lowest (opportunistic) | None | Low (can be reclaimed) | Fault-tolerant batch or background work |

!!! mascot-tip "Mix Pricing Models, Don't Pick One"
    ![Ledger with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Production deployments rarely use a single pricing model exclusively. A common pattern is reserved capacity for your predictable baseline load, with on-demand or spot capacity layered on top to absorb traffic spikes — covered next under autoscaling.

### Serverless, Dedicated, and Multi-Tenant Serving

Beyond raw capacity pricing, providers differ in *how* they let you deploy a model. **Serverless inference** charges purely per-request or per-token with no capacity to provision or manage at all — the provider handles all scaling invisibly, and you never reserve or pay for idle hardware directly (its cost is folded into the per-token rate). The tradeoff is **cold start latency**: when no instance is currently warm to handle your request, the provider must spin one up, adding a noticeable delay (often hundreds of milliseconds to several seconds) to that first request.

If serverless latency variance is unacceptable, you can instead provision a **dedicated endpoint**: hardware reserved exclusively for your workload, billed whether or not it is actively processing a request, which eliminates cold starts and multi-tenant interference at the cost of paying for capacity during idle periods. A cheaper middle ground is a **multi-tenant endpoint**: shared hardware serving multiple customers' requests, with the provider managing allocation across tenants — lower cost than a dedicated endpoint, at the cost of potential latency variance if another tenant's traffic spikes at the same time.

<details markdown="1">
<summary>Quick check: serverless, dedicated, or multi-tenant?</summary>
Type: markdown-list

- An internal tool used sporadically by a handful of employees, latency-tolerant — **serverless** (avoid paying for idle dedicated capacity)
- A customer-facing feature with a strict, consistent latency SLA — **dedicated endpoint**
- A mid-volume internal application where occasional latency variance is acceptable in exchange for lower cost — **multi-tenant endpoint**
</details>

To bridge serverless's elasticity with dedicated's consistency, providers use **autoscaling**: automatically adjusting the number of active compute instances up or down based on current demand, adding capacity as traffic rises and removing it as traffic falls. A **warm pool** — a small number of instances kept running and ready even during low-traffic periods — is the standard technique for avoiding cold-start latency on an autoscaled deployment: it costs a modest idle-capacity premium in exchange for guaranteeing at least some instant-response capacity at all times.

#### Diagram: Autoscaling and Warm Pool Behavior Over a Traffic Day

<iframe src="../../sims/autoscaling-traffic-simulator/main.html" width="100%" height="492px" scrolling="no"></iframe>

<details markdown="1">
<summary>Autoscaling and Warm Pool Behavior Over a Traffic Day</summary>
Type: microsim
**sim-id:** autoscaling-traffic-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4) — examine
Learning objective: Analyze how autoscaling instance count, warm pool size, and cold-start events relate to a fluctuating traffic pattern over a 24-hour period.

Canvas layout:
- Top (600x200): a traffic-volume line chart across a 24-hour x-axis, with a draggable time-of-day marker
- Bottom (600x250): a bar showing current active instance count, split into "warm pool" (always-on, distinct color) and "autoscaled" (demand-driven, distinct color) segments, updating as the time marker moves

Interactive controls:
- Draggable marker along the 24-hour traffic chart
- Slider: Warm pool size (0-10 instances)
- Toggle: "Show cold-start events" — flags a marker on the chart at every moment traffic exceeds current capacity before autoscaling can react

Default parameters: warm pool size = 2, time marker at 9:00 AM (a rising-traffic period)

Behavior: as the learner drags the time marker, the instance bar updates to reflect how many instances would be active at that moment; with warm pool size at 0, cold-start event markers appear far more often during sudden morning traffic ramps than with warm pool size at 2-3, making the cost/latency tradeoff of warm pool sizing directly visible.

Implementation: p5.js, precomputed traffic curve (e.g., a typical business-hours sine-like pattern) driving a simple autoscaling-lag model.
</details>

### Utilization, Idle Cost, and Load Balancing

A provisioned instance that sits unused is not free — this is the central economic fact autoscaling exists to manage. **Compute utilization rate** measures what fraction of provisioned compute capacity is actually processing requests versus sitting idle at any given moment. Low utilization directly produces **idle capacity cost**: money spent on reserved or dedicated capacity that was not doing useful work, the single largest source of waste in infrastructure spend that per-token pricing (where you only pay for what you use) was specifically designed to eliminate for API consumers — but which your own team still owns if you deploy your own infrastructure.

!!! mascot-warning "Reserved Capacity Discounts Can Become Idle Capacity Costs"
    ![Ledger warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is over-committing to reserved capacity based on peak traffic rather than average traffic. The discount is real, but if utilization averages 40%, you may be paying more overall than on-demand pricing would have cost for the same actual usage. Always size reserved commitments against sustained baseline load, not peak load.

When traffic is spread across multiple instances (whether dedicated, multi-tenant, or autoscaled), **load balancing** distributes incoming requests across them to keep utilization even and avoid overloading any single instance while others sit idle — a necessary complement to autoscaling, since adding instances only helps if traffic is actually routed to use them.

#### Diagram: Compute Utilization and Idle Cost Explorer

<iframe src="../../sims/compute-utilization-explorer/main.html" width="100%" height="522px" scrolling="no"></iframe>

<details markdown="1">
<summary>Compute Utilization and Idle Cost Explorer</summary>
Type: chart
**sim-id:** compute-utilization-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5) — justify
Learning objective: Evaluate whether a reserved-capacity commitment is cost-justified at a given sustained utilization rate compared to on-demand pricing.

Chart type: Line chart, two series over a utilization-rate x-axis (0%-100%)

Data to be plotted:
- Series 1 ("Reserved capacity effective cost"): flat per-hour commitment cost, shown as constant regardless of utilization
- Series 2 ("On-demand equivalent cost"): on-demand rate × utilization rate, rising linearly with utilization

X-axis: Compute utilization rate (0%-100%)
Y-axis: Effective cost per hour (USD)

Interactivity requirement: hovering either line at any utilization percentage shows the exact cost and highlights the crossover point where reserved capacity becomes cheaper than on-demand; a slider lets the learner adjust the reserved-capacity discount percentage (30%-70% off on-demand) to see the crossover utilization rate shift.

Implementation: Chart.js line chart with a discount-percentage slider re-rendering the reserved-capacity series.
</details>

### The Supporting Costs Around Compute

Compute is the largest infrastructure line item, but three supporting costs routinely surprise teams that only budget for inference hardware. **Data transfer cost** is the charge for moving data into, out of, or between a provider's services — distinct from compute time entirely. Within that category, **network egress cost** specifically covers data leaving the provider's network (for example, sending a large response payload back to your application across the public internet), which is frequently priced per gigabyte and billed separately from both compute and token charges.

**Storage cost** covers persisting data at rest — model weights, logs, cached responses, uploaded documents — typically billed per gigabyte per month. A specific and increasingly significant storage line item for generative AI systems is **vector store cost**: the cost of storing and querying the embedding vectors that power retrieval-augmented generation (Chapter 2), which scales with both the number of stored documents and the dimensionality of the embeddings, and which many teams omit from their initial cost model entirely because it is not a token charge or a compute charge — it is a distinct infrastructure line.

!!! mascot-encourage "Supporting Costs Are Easy to Forget, Not Hard to Understand"
    ![Ledger encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If data transfer, storage, and vector store costs feel like an afterthought compared to compute and tokens, that's a completely normal first reaction — and exactly why they're the line items most ROI analyses miss. None of the ideas here are individually hard; the discipline is remembering to look for all of them.

<!-- bridge before list -->
A complete infrastructure cost model for a generative AI deployment should therefore account for all of the following, not compute alone:

- GPU or CPU compute time (on-demand, reserved, or spot)
- Idle capacity cost from under-utilized reserved or dedicated endpoints
- Data transfer and network egress for request/response payloads
- Storage for logs, cached data, and model artifacts
- Vector store cost for any retrieval-augmented system

### Summary and Quick Check

Every per-token rate you read in Chapter 3 is built on the infrastructure economics covered here: a choice of hardware, a pricing model (on-demand, reserved, or spot), a serving pattern (serverless, dedicated, or multi-tenant), and an autoscaling strategy, all of which succeed or fail based on utilization — plus a set of supporting costs in data transfer, storage, and vector stores that are easy to omit from a first-pass budget. Chapter 6 builds directly on this foundation to cover the infrastructure planning and monitoring practices that keep these costs visible on an ongoing basis rather than discovered at invoice time.

??? note "Quick check: why can a reserved-capacity discount still end up costing more than on-demand pricing? - Click to expand"
    Because the reserved commitment is billed as a flat cost regardless of utilization. If actual utilization is low, the effective per-request cost of the reserved capacity can exceed what on-demand pricing would have charged for only the requests actually served — idle capacity cost erodes the discount.

!!! mascot-celebration "You Can Now Read the Layer Beneath the Rate Card"
    ![Ledger celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just connected token pricing to the actual compute, capacity, and supporting infrastructure decisions that produce it — the layer most IT professionals never see because a managed API hides it. That visibility is exactly what lets you question a vendor's numbers instead of accepting them.
