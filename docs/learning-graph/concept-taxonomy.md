# Concept Taxonomy

This taxonomy organizes the 561 concepts in the *Measuring GenAI ROI* learning
graph into 13 categories. Categories follow the three natural clusters in the
course description — generative AI & token mechanics, financial/lifecycle
cost analysis, and executive reporting — while keeping any single category
under 30% of the total (the largest, EFFIC, is 8.9%).

| TaxonomyID | Category Name | Concept Count | % of Total |
|---|---|---|---|
| FOUND | Generative AI & LLM Foundations | 45 | 8.0% |
| TOKEN | Tokenization & Token Economics | 46 | 8.2% |
| INFRA | Compute, Infrastructure & Pricing | 40 | 7.1% |
| EFFIC | Token & Cost Efficiency Techniques | 50 | 8.9% |
| FINRO | Financial & ROI Fundamentals | 45 | 8.0% |
| METRC | ROI Metrics & KPIs | 40 | 7.1% |
| DATOP | Data Collection, Instrumentation & Observability | 40 | 7.1% |
| SDLC | Software Development Lifecycle Cost Optimization | 45 | 8.0% |
| DSLC | Data Science Lifecycle Cost Optimization | 45 | 8.0% |
| VNDR | Vendor, Model & Build-vs-Buy Economics | 40 | 7.1% |
| RISK | Risk, Governance & Hidden Costs | 40 | 7.1% |
| COMM | Executive Communication & Financial Literacy | 40 | 7.1% |
| RPRT | Report Design, Visualization & Capstone | 45 | 8.0% |

## Category Descriptions

### FOUND — Generative AI & LLM Foundations

The baseline vocabulary of generative AI systems: what an LLM is, how it is
trained and run, and the deployment concepts (context window, latency,
quantization, right-sizing) that later cost discussions build on. This is
the entry point of the graph — it assumes only general data science
knowledge.

### TOKEN — Tokenization & Token Economics

How text becomes tokens, how providers count and price tokens, and the
vocabulary needed to read a usage bill: input/output pricing, context-window
cost, caching discounts, and cross-provider token comparison.

### INFRA — Compute, Infrastructure & Pricing

The compute and infrastructure layer beneath token pricing: GPU/CPU
inference, cloud pricing models, autoscaling, storage/network cost, and the
monitoring and alerting needed to see infrastructure spend.

### EFFIC — Token & Cost Efficiency Techniques

Concrete techniques for lowering token and compute cost: prompt
optimization, caching, model cascading/routing, retrieval tuning,
quantization/distillation, and the benchmarking discipline needed to prove a
technique actually saved money.

### FINRO — Financial & ROI Fundamentals

The financial vocabulary a technologist needs before writing an ROI report:
ROI, TCO, NPV, payback period, cost allocation, budgeting, and business-case
fundamentals — taught from first principles with no accounting background
assumed.

### METRC — ROI Metrics & KPIs

The metrics that connect technical activity to financial outcomes:
adoption, quality, productivity, and cost-per-outcome metrics, plus the
measurement discipline (baselines, control groups, statistical significance)
needed to trust them.

### DATOP — Data Collection, Instrumentation & Observability

How to actually capture the usage and cost data an ROI analysis depends on:
telemetry, cost tagging, observability platforms, dashboards, and data
governance for metrics.

### SDLC — Software Development Lifecycle Cost Optimization

Where generative AI changes the cost of building software — requirements
through maintenance — including AI-assisted coding, code review, testing,
and the risks (technical debt, security review of generated code) that
accompany those savings.

### DSLC — Data Science Lifecycle Cost Optimization

The parallel cost story for the data science lifecycle: data collection and
labeling, feature engineering, training, evaluation, deployment, monitoring,
and retraining — including MLOps and reuse strategies that reduce cost.

### VNDR — Vendor, Model & Build-vs-Buy Economics

The economics of choosing among models and providers: build-vs-buy,
open-source-vs-proprietary, licensing structures, contract risk, and
vendor-selection methods (benchmarking, pilots, scorecards).

### RISK — Risk, Governance & Hidden Costs

Costs that do not show up on a token invoice: governance overhead,
compliance, security, bias/fairness risk, skill erosion, and the
risk-adjusted TCO framing needed to represent them honestly in a report.

### COMM — Executive Communication & Financial Literacy

The audience-facing skills that connect technical findings to a
finance-background executive: message framing, storytelling with data,
executive summary writing, and handling uncertainty and objections.

### RPRT — Report Design, Visualization & Capstone

The step-by-step mechanics of assembling the final deliverable: report
structure, chart selection for financial data, review/fact-checking
discipline, and the capstone sequence that produces a complete,
executive-ready GenAI ROI report.
