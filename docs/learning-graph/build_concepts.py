#!/usr/bin/env python3
"""Build concept-list.md and learning-graph.csv (with TaxonomyID) for the
'Measuring GenAI ROI' learning graph. Deterministic (seeded), so re-runs are
stable. Categories are curated by topic cluster; dependencies combine an
in-category prerequisite chain with hand-curated cross-category links so the
graph is a connected DAG with multiple learning pathways, not a flat chain.
"""
import csv
import random

random.seed(20260820)

# (TaxonomyID, Category Name, [concept labels in pedagogical order])
CATEGORIES = [
("FOUND", "Generative AI & LLM Foundations", [
"Artificial Intelligence","Machine Learning","Deep Learning","Neural Network",
"Generative AI","Large Language Model","Foundation Model","Transformer Architecture",
"Attention Mechanism","Self-Attention","Pretraining","Fine-Tuning","Instruction Tuning",
"RLHF Alignment","Inference","Training Vs Inference Cost","Model Parameters",
"Model Parameter Count","Context Window","Multimodal Model","Open-Source Model",
"Proprietary Model","Model Provider","API Endpoint","Prompt","System Prompt",
"Prompt Engineering","Zero-Shot Prompting","Few-Shot Prompting","Chain-Of-Thought Prompting",
"Retrieval-Augmented Generation","Embedding","Vector Database","Model Hallucination",
"Model Latency","Model Throughput","Batch Inference","Streaming Response",
"Model Versioning","Model Deployment","On-Premises Deployment","Cloud-Hosted Model",
"Model Quantization","Knowledge Distillation","Model Right-Sizing",
]),
("TOKEN", "Tokenization & Token Economics", [
"Token","Tokenization","Subword Tokenization","Byte Pair Encoding","Token Vocabulary",
"Input Token","Output Token","Token Count","Token Limit","Context Length",
"Token-To-Word Ratio","Tokenizer Choice","Token Pricing Model","Per-Token Pricing",
"Input Token Pricing","Output Token Pricing","Blended Token Rate","Prompt Caching",
"Cached Token Discount","Batch API Discount","Token Budget","Token Consumption Rate",
"Token Efficiency","Prompt Length","System Prompt Overhead","Few-Shot Token Overhead",
"Context Window Cost","Long-Context Pricing","Token Truncation","Prompt Compression",
"Prompt Summarization","Semantic Caching","Redundant Token Usage","Token Wastage",
"Chunking Strategy","Retrieval Chunk Size","Multi-Turn Token Growth",
"Conversation History Cost","Token Metering","Usage Dashboard","Token Rate Limit",
"Provider Rate Card","Token Cost Benchmark","Cross-Provider Comparison","Token Efficiency Score",
"Tokenizer Version Drift",
]),
("INFRA", "Compute, Infrastructure & Pricing", [
"GPU Compute","CPU Inference","Compute Cost","Cloud Compute Pricing","On-Demand Pricing",
"Reserved Capacity Pricing","Spot Instance Pricing","Serverless Inference",
"Dedicated Endpoint","Multi-Tenant Endpoint","Autoscaling","Cold Start Latency",
"Warm Pool","Compute Utilization Rate","Idle Capacity Cost","Data Transfer Cost",
"Storage Cost","Vector Store Cost","Network Egress Cost","Load Balancing",
"Model Serving Framework","Inference Server","Hardware Accelerator",
"GPU Memory Constraint","Batch Size Tuning","Concurrency Limit",
"Throughput-Latency Tradeoff","Peak Load Provisioning","Capacity Planning",
"Infrastructure As Code","Multi-Region Deployment","Edge Deployment",
"Hybrid Cloud Strategy","Total Compute Footprint","Carbon Cost Of Compute",
"Energy Cost Per Query","Infrastructure Monitoring","Cost Alerting","Budget Threshold",
"Infrastructure Cost Dashboard",
]),
("EFFIC", "Token & Cost Efficiency Techniques", [
"Prompt Optimization","Prompt Template Design","Output Length Control","Max Tokens Parameter",
"Temperature Setting","Structured Output Format","JSON Mode Output","Function Calling",
"Tool Use Efficiency","Model Cascading","Model Routing","Small Model First Strategy",
"Fallback Model Strategy","Ensemble Cost Tradeoff","Response Caching",
"Deterministic Caching","Semantic Deduplication","Retrieval Optimization",
"RAG Cost Tradeoff","Embedding Reuse","Vector Index Tuning","Query Rewriting",
"Context Pruning","Context Compression","Summarization Preprocessing",
"Batch Processing Strategy","Asynchronous Processing","Off-Peak Scheduling",
"Prompt Reuse Library","Prompt Version Control","A/B Testing Prompts",
"Cost-Per-Task Benchmarking","Quality-Cost Tradeoff","Latency-Cost Tradeoff",
"Right-Sizing Review Cycle","Fine-Tuning Vs Prompting","Distillation For Cost Cutting",
"Quantization For Cost Cutting","Sparse Model Techniques","Mixture Of Experts",
"Speculative Decoding","KV Cache Optimization","Parallel Sampling Cost",
"Self-Consistency Cost","Guardrail Overhead Cost","Content Filtering Cost",
"Token Efficiency Audit","Continuous Cost Optimization","Cost Regression Testing",
"Efficiency Gain Tracking",
]),
("FINRO", "Financial & ROI Fundamentals", [
"Return On Investment","Total Cost Of Ownership","Net Present Value","Payback Period",
"Internal Rate Of Return","Cost-Benefit Analysis","Capital Expenditure",
"Operating Expenditure","Sunk Cost","Opportunity Cost","Depreciation","Amortization",
"Discount Rate","Time Value Of Money","Break-Even Analysis","Marginal Cost",
"Fixed Cost","Variable Cost","Cost Allocation","Cost Center","Chargeback Model",
"Showback Model","Unit Economics","Cost Per Transaction","Cost Per User",
"Cost Per Query","Cost Avoidance","Cost Reduction Vs Avoidance","Revenue Impact",
"Productivity Gain","Labor Cost Savings","Financial Statement Basics",
"Income Statement","Balance Sheet Basics","Budget Cycle","Business Case",
"Investment Appraisal","Hurdle Rate","Risk-Adjusted Return","Sensitivity Analysis",
"Scenario Analysis","Financial Forecasting","Baseline Cost Model",
"Counterfactual Cost Estimate","Financial KPI",
]),
("METRC", "ROI Metrics & KPIs", [
"GenAI ROI Metric","Adoption Rate Metric","Usage Frequency Metric","Task Completion Time",
"Time-To-Value Metric","Quality Score Metric","Error Rate Metric","Rework Rate Metric",
"Customer Satisfaction Metric","Employee Satisfaction Metric","Automation Rate Metric",
"Throughput Improvement Metric","Deflection Rate Metric","First-Contact Resolution Rate",
"Cycle Time Reduction","Defect Reduction Rate","Code Review Time Saved",
"Developer Velocity Metric","Story Points Delivered","Lead Time For Changes",
"Mean Time To Resolution","Model Accuracy Metric","Precision And Recall",
"Hallucination Rate Metric","User Retention Metric","Net Promoter Score",
"Cost Per Outcome","Value Realization Metric","Leading Vs Lagging Indicator",
"North Star Metric","Metric Instrumentation Plan","KPI Dashboard Design",
"Metric Baseline Capture","Metric Attribution","Confounding Factor",
"Statistical Significance Check","Control Group Comparison","Pre/Post Comparison Study",
"Longitudinal Tracking","Metric Reporting Cadence",
]),
("DATOP", "Data Collection, Instrumentation & Observability", [
"Usage Telemetry","Cost Attribution Tagging","Cost Tagging Taxonomy","Observability Platform",
"Logging Strategy","Distributed Tracing","API Call Logging","Token Usage Logging",
"Cost Dashboard Design","Real-Time Cost Monitoring","Anomaly Detection In Spend",
"Spend Forecasting","Budget Variance Analysis","Cost Data Warehouse",
"Data Pipeline For Cost Analytics","ETL For Usage Data","Data Quality For Cost Metrics",
"Sampling Strategy For Telemetry","Data Retention Policy","Multi-Tenant Cost Attribution",
"Departmental Cost Rollup","Project-Level Cost Tracking","Per-User Cost Tracking",
"Per-Feature Cost Tracking","Vendor Invoice Reconciliation","Billing API Integration",
"Cost Data Normalization","Cross-Provider Cost Aggregation","Alerting Threshold Design",
"Dashboard Refresh Cadence","Data Governance For Metrics","Audit Trail For Spend",
"Metric Definition Documentation","Single Source Of Truth","Instrumentation Maturity Model",
"Cost Observability Roadmap","Telemetry Sampling Bias","Real-Time Alert Fatigue",
"Data Lineage For Cost Metrics","Instrumentation Ownership Model",
]),
("SDLC", "Software Development Lifecycle Cost Optimization", [
"Software Development Lifecycle","Requirements Phase Cost","Design Phase Cost",
"Coding Phase Cost","Testing Phase Cost","Deployment Phase Cost","Maintenance Phase Cost",
"AI-Assisted Requirements","AI-Assisted Code Generation","Code Completion Tool Cost",
"AI Pair Programming","Automated Code Review","AI-Generated Test Cases",
"Test Coverage Automation","Automated Documentation","Technical Debt From AI Code",
"Code Quality Regression Risk","Refactoring Cost","Legacy Code Migration Cost",
"CI/CD Pipeline Cost","Build Time Reduction","Deployment Automation Cost",
"Incident Response Cost","Bug Triage Automation","Developer Onboarding Cost",
"Code Review Cycle Time","Pull Request Turnaround","Developer Productivity Index",
"Tooling License Cost","IDE Integration Cost","Prompt-Driven Development Cost",
"Vibe Coding Risk","Code Generation Quality Review","Security Review Of AI Code",
"License Compliance Of AI Code","Developer Time Reallocation","SDLC Automation Maturity",
"SDLC Cost Baseline","SDLC Cost Reduction Roadmap","Software Delivery Risk",
"Rollback Cost","Post-Deployment Monitoring Cost","Feature Flag Cost Management",
"Release Cadence Cost Impact","SDLC ROI Case Study",
]),
("DSLC", "Data Science Lifecycle Cost Optimization", [
"Data Science Lifecycle","Data Collection Cost","Data Labeling Cost",
"AI-Assisted Data Labeling","Data Cleaning Cost","Feature Engineering Cost",
"AI-Assisted Feature Engineering","Model Training Cost","Hyperparameter Tuning Cost",
"Experiment Tracking Cost","Model Evaluation Cost","Model Validation Cost",
"Model Deployment Cost","Model Monitoring Cost","Model Retraining Trigger",
"Model Drift Detection","Data Drift Detection","Retraining Cadence Tuning",
"Synthetic Data Generation","Synthetic Data Cost Tradeoff","Active Learning Cost Reduction",
"Data Annotation Quality Control","Annotation Vendor Management","Data Versioning Cost",
"Feature Store Cost","MLOps Pipeline Cost","Model Registry Cost",
"Champion-Challenger Testing","Shadow Deployment Cost","Canary Release For Models",
"Model Lifecycle Management","Model Deprecation Planning","Compute Reuse Across Experiments",
"Notebook Environment Cost","Data Science Team Utilization",
"Experiment Reproducibility Cost","Data Science Tooling Cost","DSLC Cost Baseline",
"DSLC Cost Reduction Roadmap","DSLC ROI Case Study","AutoML Cost Tradeoff",
"Transfer Learning Cost Savings","Pretrained Model Reuse","Data Science Technical Debt",
"Cross-Team Model Reuse",
]),
("VNDR", "Vendor, Model & Build-vs-Buy Economics", [
"Build Vs Buy Decision","Open-Source Vs Proprietary Cost","Vendor Lock-In Risk",
"Multi-Vendor Strategy","Model Benchmarking For Selection","Vendor Pricing Comparison",
"Licensing Cost Structure","Enterprise License Agreement","Usage-Based Licensing",
"Seat-Based Licensing","Committed Spend Discount","Volume Discount Negotiation",
"Contract Term Length Tradeoff","Vendor SLA Review","Vendor Support Cost",
"Total Vendor Cost Model","Switching Cost Estimate","Model Portability",
"API Abstraction Layer","Multi-Model Orchestration","Model Selection Criteria",
"Proof-Of-Concept Cost","Pilot Program Design","Vendor Risk Assessment",
"Vendor Due Diligence","Self-Hosted Model Economics","Managed Service Economics",
"Hybrid Sourcing Strategy","Procurement Cycle Impact","Total Addressable Cost Savings",
"Competitive Bidding Process","Vendor Consolidation Strategy",
"Community Support Risk","Model Update Cadence Risk","Vendor Deprecation Risk",
"Cost Predictability Assessment","Long-Term Contract Risk","Vendor Scorecard",
"Build Vs Buy Case Study","Sourcing Strategy Roadmap",
]),
("RISK", "Risk, Governance & Hidden Costs", [
"AI Governance Framework","Model Risk Management","Hidden Cost Of AI Systems",
"Shadow AI Usage Risk","Data Security Risk","Data Privacy Risk",
"Intellectual Property Risk","Compliance Risk","Regulatory Uncertainty Cost",
"Bias And Fairness Risk","Explainability Requirement Cost","Audit Requirement Cost",
"Model Governance Board","Responsible AI Policy","Third-Party Risk Assessment",
"Data Residency Requirement","Access Control Cost","Incident Response Planning",
"Reputational Risk","Overreliance Risk","Skill Erosion Risk","Staff Retraining Cost",
"Change Management Cost","Governance Overhead Cost","AI Risk Register",
"Risk Appetite Statement","Contingency Budget","Technical Debt Risk",
"Model Retirement Cost","Legacy Integration Risk","Security Incident Cost Estimate",
"Insurance Cost For AI Risk","Governance Maturity Model","Policy Enforcement Automation",
"Risk-Adjusted Cost Model","Hidden Cost Discovery Checklist","Risk-Adjusted TCO",
"Governance ROI Tradeoff","Risk Mitigation Cost-Benefit","Risk Reporting To Executives",
]),
("COMM", "Executive Communication & Financial Literacy", [
"Executive Audience Analysis","Financial Literacy For Engineers","Technical-Financial Translation",
"Jargon Reduction Technique","Executive Attention Span","Message Framing",
"Storytelling With Data","Narrative Arc For Reports","Key Message Development",
"So-What Statement","Elevator Pitch For Findings","Stakeholder Mapping",
"Audience-Specific Framing","CFO Perspective","CIO Perspective","CTO Perspective",
"Board-Level Communication","One-Page Summary Technique","Executive Summary Writing",
"Bottom-Line-Up-Front Principle","Assumption Transparency","Confidence Interval Framing",
"Uncertainty Communication","Risk Communication To Executives","Recommendation Framing",
"Actionable Insight Development","Objection Anticipation","Q&A Presentation Prep",
"Executive Presentation Design","Slide Design For Financial Data",
"Verbal Presentation Technique","Written Report Tone","Credibility Building Technique",
"Data-Driven Persuasion","Ethical Findings Communication","Avoiding Overstated Claims",
"Benchmarking Against Peers","Industry Comparison Framing","Communication Feedback Loop",
"Iterative Report Refinement",
]),
("RPRT", "Report Design, Visualization & Capstone", [
"Executive Report Structure","Report Scope Definition","Methodology Section Design",
"Findings Section Design","Recommendations Section Design","Appendix Design",
"Cover Page And Framing","Table Of Contents Design","Data Visualization Principles",
"Chart Type Selection","Bar Chart For Cost Comparison","Line Chart For Trend Analysis",
"Waterfall Cost Breakdown Chart","Cost Driver Tree Diagram","Sensitivity Analysis Chart",
"Scenario Comparison Table","Dashboard Mockup For Report","Color Use In Financial Charts",
"Chart Labeling Best Practice","Data Table Design","Footnote And Source Citation",
"Report Review Checklist","Peer Review Process","Report Editing Pass",
"Fact-Checking Financial Claims","Report Version Control","Report Template Library",
"Report Length Calibration","Report Accessibility","Report Distribution Strategy",
"Report Feedback Incorporation","Report Localization Note","Report Archiving Practice",
"Capstone Report Planning","Capstone Data Collection","Capstone Cost Model Build",
"Capstone ROI Calculation","Capstone Executive Summary Draft","Capstone Report Full Draft",
"Capstone Peer Critique","Capstone Presentation Delivery","Capstone Report Finalization",
"Post-Capstone Reflection","Continuous Improvement Plan","Career Application Of Skills",
]),
]

# Hand-curated cross-category anchor links: for the FIRST concept of a
# category (other than the very first category), list dependency labels
# (must exist earlier in CATEGORIES) that motivate why this new subject area
# is being opened up.
FIRST_CONCEPT_EXTRA_DEPS = {
    "TOKEN": [],  # Token is foundational on its own -> 0 deps (2nd entry point)
    "INFRA": ["Model Deployment"],
    "EFFIC": ["Token Efficiency", "Compute Cost"],
    "FINRO": [],  # Financial fundamentals stand on their own -> 0 deps (3rd entry point)
    "METRC": ["Return On Investment", "Productivity Gain"],
    "DATOP": ["Token Metering", "Usage Dashboard"],
    "SDLC": ["Generative AI"],
    "DSLC": ["Generative AI", "Machine Learning"],
    "VNDR": ["Total Cost Of Ownership", "Model Provider"],
    "RISK": ["Total Cost Of Ownership"],
    "COMM": ["GenAI ROI Metric"],
    "RPRT": ["Executive Summary Writing", "GenAI ROI Metric"],
}

# Additional hand-curated cross-links: concept label -> list of extra
# dependency labels (beyond the automatic in-category chain), to connect
# clusters into a richer DAG. Only added if both labels resolve.
EXTRA_LINKS = {
    "GenAI ROI Metric": ["Return On Investment", "Generative AI"],
    "AI-Assisted Code Generation": ["Large Language Model", "Prompt Engineering"],
    "AI-Assisted Data Labeling": ["Large Language Model"],
    "AI-Assisted Feature Engineering": ["Large Language Model"],
    "AI-Assisted Requirements Analysis": ["Prompt Engineering"],
    "SDLC Cost Baseline": ["Baseline Cost Model"],
    "DSLC Cost Baseline": ["Baseline Cost Model"],
    "SDLC ROI Case Study": ["GenAI ROI Metric"],
    "DSLC ROI Case Study": ["GenAI ROI Metric"],
    "Build Vs Buy Case Study": ["GenAI ROI Metric", "Total Cost Of Ownership"],
    "Total Vendor Cost Model": ["Total Cost Of Ownership"],
    "Self-Hosted Model Economics": ["GPU Compute", "Compute Cost"],
    "Managed Service Economics": ["Cloud Compute Pricing"],
    "Model Right-Sizing": ["Model Latency"],
    "Right-Sizing Review Cycle": ["Model Right-Sizing"],
    "Fine-Tuning Vs Prompting": ["Fine-Tuning", "Prompt Engineering"],
    "Distillation For Cost Cutting": ["Knowledge Distillation"],
    "Quantization For Cost Cutting": ["Model Quantization"],
    "RAG Cost Tradeoff": ["Retrieval-Augmented Generation", "Vector Store Cost"],
    "Cost Attribution Tagging": ["Cost Allocation"],
    "Cost Tagging Taxonomy": ["Cost Center"],
    "Real-Time Cost Monitoring": ["Cost Alerting"],
    "Metric Instrumentation Plan": ["Usage Telemetry"],
    "KPI Dashboard Design": ["Cost Dashboard Design"],
    "Statistical Significance Check": ["Sensitivity Analysis"],
    "Control Group Comparison": ["Scenario Analysis"],
    "Model Governance Board": ["AI Governance Framework"],
    "Responsible AI Policy": ["Bias And Fairness Risk"],
    "Risk Reporting To Executives": ["Executive Audience Analysis", "AI Risk Register"],
    "Governance ROI Tradeoff": ["GenAI ROI Metric"],
    "Executive Audience Analysis": ["Financial Statement Basics"],
    "Financial Literacy For Engineers": ["Return On Investment"],
    "Executive Summary Writing": ["Bottom-Line-Up-Front Principle", "Key Message Development"],
    "Slide Design For Financial Data": ["Chart Type Selection"],
    "Data Visualization Principles": ["KPI Dashboard Design"],
    "Chart Type Selection": ["Data Visualization Principles"],
    "Waterfall Cost Breakdown Chart": ["Cost Allocation"],
    "Sensitivity Analysis Chart": ["Sensitivity Analysis"],
    "Scenario Comparison Table": ["Scenario Analysis"],
    "Methodology Section Design": ["Metric Instrumentation Plan"],
    "Findings Section Design": ["Storytelling With Data"],
    "Recommendations Section Design": ["Recommendation Framing"],
    "Fact-Checking Financial Claims": ["Avoiding Overstated Claims"],
    "Capstone Report Planning": ["Executive Report Structure", "SDLC Cost Reduction Roadmap", "DSLC Cost Reduction Roadmap"],
    "Capstone Data Collection": ["Usage Telemetry", "Metric Baseline Capture"],
    "Capstone Cost Model Build": ["Baseline Cost Model", "Total Cost Of Ownership"],
    "Capstone ROI Calculation": ["GenAI ROI Metric", "Net Present Value"],
    "Capstone Executive Summary Draft": ["Executive Summary Writing"],
    "Capstone Report Full Draft": ["Capstone Executive Summary Draft"],
    "Capstone Peer Critique": ["Peer Review Process"],
    "Capstone Presentation Delivery": ["Executive Presentation Design"],
    "Capstone Report Finalization": ["Report Editing Pass", "Fact-Checking Financial Claims"],
    "Vibe Coding Risk": ["Prompt-Driven Development Cost"],
    "Security Review Of AI Code": ["AI-Assisted Code Generation"],
    "License Compliance Of AI Code": ["AI-Assisted Code Generation"],
    "Model Drift Detection": ["Model Monitoring Cost"],
    "Data Drift Detection": ["Model Monitoring Cost"],
    "Shadow AI Usage Risk": ["Hidden Cost Of AI Systems"],
    "Hidden Cost Of AI Systems": ["Total Cost Of Ownership"],
    "Vendor Lock-In Risk": ["Model Provider"],
    "Model Portability": ["API Abstraction Layer"],
}

# ---- build label -> id map deterministically ----
all_rows = []  # (id, label, category_taxonomy, category_name)
label_to_id = {}
cid = 1
for tax_id, cat_name, labels in CATEGORIES:
    seen = set()
    for label in labels:
        if label in seen:
            raise SystemExit(f"Duplicate within category {cat_name}: {label}")
        seen.add(label)
        if label in label_to_id:
            raise SystemExit(f"Duplicate label across categories: {label}")
        label_to_id[label] = cid
        all_rows.append([cid, label, tax_id, cat_name])
        cid += 1

total_concepts = len(all_rows)

# ---- length / title-case sanity check ----
violations = [(r[0], r[1], len(r[1])) for r in all_rows if len(r[1]) > 32]
if violations:
    print("LENGTH VIOLATIONS (>32 chars):")
    for v in violations:
        print(v)

# ---- build dependencies ----
deps_by_id = {r[0]: [] for r in all_rows}

cat_start_id = {}
running = 1
for tax_id, cat_name, labels in CATEGORIES:
    cat_start_id[tax_id] = running
    running += len(labels)

for idx, (cid_, label, tax_id, cat_name) in enumerate(all_rows):
    start_id = cat_start_id[tax_id]
    pos_in_cat = cid_ - start_id  # 0-based position within category
    deps = set()
    if pos_in_cat == 0:
        # first concept in category: use hand-curated anchors (may be empty -> foundational entry point)
        for dep_label in FIRST_CONCEPT_EXTRA_DEPS.get(tax_id, []):
            if dep_label in label_to_id and label_to_id[dep_label] < cid_:
                deps.add(label_to_id[dep_label])
    else:
        # chain: depend on immediately previous concept in category
        deps.add(cid_ - 1)
        # branch: ~35% of the time also depend on an earlier concept in the
        # same category (2-4 back) to avoid a pure linear chain
        if pos_in_cat >= 3 and random.random() < 0.35:
            back = random.choice([2, 3, 4])
            candidate = cid_ - back
            if candidate >= start_id:
                deps.add(candidate)
    # hand-curated cross-category links
    for dep_label in EXTRA_LINKS.get(label, []):
        if dep_label in label_to_id and label_to_id[dep_label] < cid_:
            deps.add(label_to_id[dep_label])
    deps_by_id[cid_] = sorted(deps)

# ---- pruning pass: promote ~15% of low-indegree interior concepts to
# terminal (leaf) nodes so terminal-node % lands in the 5-40% healthy range.
# For a chosen concept X with indegree exactly 1 (only its immediate chain
# successor Y depends on it), reroute Y to depend on deps(X) instead of X.
# X keeps its own upstream dependencies (still connected, still reachable)
# but nothing depends on it anymore -> it becomes a genuine terminal /
# specialization node. Operates on a deterministic shuffled candidate order
# so re-runs are stable.
last_in_category_ids = {cat_start_id[tax_id] + len(labels) - 1 for tax_id, _, labels in CATEGORIES}

def indegree_map():
    ind = {cid_: 0 for cid_ in deps_by_id}
    for cid_, deps in deps_by_id.items():
        for d in deps:
            ind[d] += 1
    return ind

target_prune_count = round(total_concepts * 0.15)
candidates = [cid_ for cid_ in deps_by_id
              if cid_ not in last_in_category_ids and deps_by_id[cid_]]
random.shuffle(candidates)

pruned = 0
for x in candidates:
    if pruned >= target_prune_count:
        break
    ind = indegree_map()
    if ind[x] != 1:
        continue
    # find the sole Y that depends on x
    y = next(cid_ for cid_, deps in deps_by_id.items() if x in deps)
    x_deps = deps_by_id[x]
    if not x_deps:
        continue  # x is foundational; leave it as a real entry point
    new_y_deps = sorted(set(deps_by_id[y]) - {x} | set(x_deps))
    # keep it valid: every new dep must be < y (guaranteed, since x_deps < x < y)
    if all(d < y for d in new_y_deps) and new_y_deps:
        deps_by_id[y] = new_y_deps
        pruned += 1

print(f"Pruned {pruned} concepts into terminal/leaf nodes "
      f"(target was {target_prune_count}).")

# ---- write concept-list.md ----
with open("concept-list.md", "w") as f:
    f.write("# Concept List\n\n")
    f.write(
        f"This is the numbered list of {total_concepts} concepts for the "
        "*Measuring GenAI ROI* learning graph, generated by the "
        "learning-graph-generator skill. Concepts are grouped below by "
        "taxonomy category for readability; the authoritative ConceptID "
        "order matches [learning-graph.csv](./learning-graph.csv).\n\n"
    )
    for tax_id, cat_name, labels in CATEGORIES:
        start_id = cat_start_id[tax_id]
        f.write(f"## {cat_name} ({tax_id})\n\n")
        for i, label in enumerate(labels):
            f.write(f"{start_id + i}. {label}\n")
        f.write("\n")

# ---- write learning-graph.csv ----
with open("learning-graph.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["ConceptID", "ConceptLabel", "Dependencies", "TaxonomyID"])
    for cid_, label, tax_id, cat_name in all_rows:
        dep_str = "|".join(str(d) for d in deps_by_id[cid_])
        writer.writerow([cid_, label, dep_str, tax_id])

print(f"Total concepts: {total_concepts}")
print("Category sizes:")
for tax_id, cat_name, labels in CATEGORIES:
    print(f"  {tax_id:6s} {cat_name:55s} {len(labels)}")
zero_dep = sum(1 for cid_ in deps_by_id if not deps_by_id[cid_])
print(f"Zero-dependency (foundational) concepts: {zero_dep}")
