# Instructor's Guide: Measuring GenAI ROI

Welcome to the instructor's guide for *Measuring GenAI ROI: Token Efficiency and Executive Financial Reporting*. This guide explains every feature of the textbook, how to use it in a corporate training or workshop setting, and how to customize it for your own organization or cohort. No prior technical knowledge of the underlying tooling is assumed — every technical term is defined before it is used.

!!! note "This book is under active development"
    This guide describes the textbook's full planned structure (27 chapters) and features. As of this writing, full chapter content, quizzes, and references exist for **Chapters 1–2 only**; the remaining 25 chapters have finished outlines but not yet finished prose. There is no FAQ page yet. Sections below note current coverage where it matters for planning a session.

## About This Interactive Intelligent Textbook

### What is an Intelligent Textbook?

An **intelligent textbook** is a digital textbook that goes beyond static text and images. It includes interactive simulations, self-grading quizzes, a searchable glossary, and a structured map of how concepts relate to each other. The goal is to give learners a richer, more engaging experience than a traditional PDF or slide deck.

### The Five Levels of Intelligent Textbooks

Not all digital textbooks are created equal. Intelligent textbooks are categorized into five levels based on how interactive and adaptive they are:

| Level | Name | Description | Example Features |
|-------|------|-------------|-----------------|
| **Level 1** | Static Digital | A PDF or basic web version of a print textbook | Text and images only, no interactivity |
| **Level 2** | Interactive | Adds interactive elements like simulations, quizzes, and searchable glossaries | MicroSims, self-check quizzes, concept search |
| **Level 3** | Adaptive | Adjusts content based on learner performance | Personalized learning paths, difficulty adjustment |
| **Level 4** | AI-Assisted | Includes an AI tutor that can answer learner questions | Chatbot integration, automated feedback |
| **Level 5** | Fully Adaptive AI | Continuously learns from learner interactions and optimizes the experience | Real-time content generation, predictive analytics |

**This textbook targets Level 2 (Interactive).** It has a searchable glossary of 561 terms and self-check quizzes; the interactive MicroSims are mostly still specifications awaiting implementation (see "Using the MicroSims" below for current status).

### What Makes This Textbook Different

- **Interactive MicroSims** (once built) let learners manipulate models directly in their browser — no software installation required
- **Critical thinking emphasis** — chapters help readers evaluate vendor claims about GenAI cost savings and separate real, measured ROI from marketing
- **Learning graph** — a visual map showing how all 561 concepts connect and build on each other, so no concept is introduced before its prerequisites
- **Ledger** — a mascot (a "pedagogical agent") who flags key insights, warns about common pitfalls, and celebrates milestones as readers work through each chapter
- **Completely free and open** — licensed under Creative Commons for non-commercial use

## Using the Chapters

### Chapter Structure

The textbook is designed around **27 chapters**, organized into a deliberate sequence that respects the underlying concept dependency graph — no chapter assumes something a later chapter introduces. Learners should work through them in order:

| Chapters | Topic Area |
|----------|-----------|
| 1–2 | Foundations of generative AI and LLMs (what a model is, how it's prompted and deployed) |
| 3–4 | Tokenization and token pricing |
| 5–6 | Compute infrastructure and pricing |
| 7–8 | Token and cost efficiency techniques |
| 9–10 | Financial and ROI fundamentals (ROI, TCO, NPV, payback period) |
| 11–12 | ROI metrics and KPIs |
| 13–14 | Data collection, instrumentation, and observability |
| 15–16 | Cost optimization across the software development lifecycle |
| 17–18 | Cost optimization across the data science lifecycle |
| 19–20 | Vendor, model, and build-vs-buy economics |
| 21–22 | Risk, governance, and hidden costs |
| 23–24 | Executive communication and financial literacy |
| 25–27 | Executive report design, data visualization, and the capstone project |

### What Each Chapter Contains

Every chapter follows a consistent structure:

1. **YAML front matter** — Metadata at the top of each chapter file (title, description, version). Readers don't see this; it's used by search engines and the website builder.
2. **Summary** — A brief overview of what the chapter covers and what readers will learn.
3. **Concepts covered** — A table of the specific concepts addressed in the chapter, drawn from the learning graph, each with a Concept Impact Score (a measure of how much of the rest of the book depends on it).
4. **Prerequisites** — Links to prior chapters that should be completed first.
5. **Welcome from Ledger** — A mascot admonition that introduces the chapter topic in Ledger's voice.
6. **Main content** — The core instructional material, written at a College/Professional Development reading level for practicing IT professionals. Includes tables, worked examples, and (once built) embedded MicroSims.
7. **Mascot admonitions** — Throughout the chapter, Ledger appears a handful of times (fewer than ten, and fewer still in shorter chapters) to highlight key insights (thinking), offer practical shortcuts (tip), provide encouragement on harder concepts (encourage), and warn about common pitfalls (warning).
8. **Key takeaways** — A summary of the most important concepts, preceded by a celebration from Ledger.

### Suggested Use in Training

- **Before a session**: Assign the chapter as pre-reading. The self-check quiz makes a good gauge of whether the cohort is ready to move on.
- **During a session**: Walk through a chapter's worked examples together; once MicroSims are built, they're designed to be demonstrated live and then explored hands-on.
- **After a session**: Assign the quiz and encourage learners to explore the glossary and references for anything that didn't fully land.
- **Pacing**: Each chapter's word count scales with how foundational its concepts are — early chapters (1–2) run long (5,000–7,000 words) because nearly the whole book depends on their vocabulary; later, more specialized chapters will generally run shorter. Budget roughly one chapter per session for a weekly cohort, or two for a denser bootcamp-style schedule.

## Using the MicroSims

### What is a MicroSim?

A **MicroSim** (short for "micro-simulation") is a small, interactive simulation that runs directly in a web browser. Learners don't need to install any software — MicroSims work on any device with a modern web browser.

Each MicroSim lets learners manipulate one or more variables (using sliders, buttons, clicks, or hovers) and immediately see how the model responds, or explore a diagram that reveals detail on interaction. This "learn by doing" approach helps build intuition for abstract concepts like token cost trade-offs or the training-vs-inference cost split.

### Current Status

The book currently has **one live MicroSim**: the [Learning Graph Viewer](../sims/graph-viewer/index.md), an interactive vis-network graph of all 561 concepts and their dependencies. Chapters 1 and 2 additionally contain **12 detailed MicroSim specifications** — a vis-network "AI Family Tree," a p5.js self-attention explorer, a clickable Mermaid training-lifecycle workflow, Chart.js cost/scale charts, and a vendor-deployment graph model, among others — each fully specified (learning objective, visual elements, interactivity, Bloom's Taxonomy level) but not yet implemented. They currently render as empty embed areas in the chapter text. Building them is a separate step (the `microsim-generator` skill) from writing chapter content.

### How MicroSims Are Embedded

Once built, MicroSims appear within chapter text as rectangular interactive areas, embedded using **iframes** — a web technology that displays one web page inside another. You don't need to understand how iframes work; they load automatically when a reader views the chapter page.

!!! mascot-tip "Ledger's Tip: Embed MicroSims Anywhere!"
    ![Ledger giving a tip](../img/mascot/tip.png){ class="mascot-admonition-img" }
    Once a MicroSim is built, you can add it to **any web page** — an internal wiki, an LMS, or a plain HTML file — with one line:

    ```html
    <iframe src="https://Kschuman-aon.github.io/genai-roi/sims/YOUR-MICROSIM-NAME/main.html"
        width="100%" height="450px"
        scrolling="no">
    </iframe>
    ```

    Replace `YOUR-MICROSIM-NAME` with the name of any MicroSim from the [MicroSims list](../sims/index.md). One line of HTML, and your cohort has an interactive simulation on any page you control.

### MicroSim Specifications

Within each chapter, you'll find a collapsible **details** section below each MicroSim labeled with its name. Click to expand and see the full specification, including:

- **Bloom's Taxonomy level** — What cognitive level the MicroSim targets (Remember, Understand, Apply, Analyze, Evaluate, Create)
- **Learning objective** — What learners should be able to do after using it
- **Interactive controls** — What sliders, buttons, or click/hover interactions are available
- **Default parameters** — The starting values when it loads

These specifications are useful for session planning even before the sim itself is built — they tell you exactly what the eventual interaction will teach.

## Using the Glossary

### What is the Glossary?

The **glossary** is an alphabetical list of all 561 key terms used in the textbook, each with a precise, concise, ISO 11179-style definition. It serves as a quick-reference dictionary for anyone encountering unfamiliar vocabulary — from "Token" to "Risk-Adjusted TCO."

### How to Access the Glossary

- Click **"Glossary"** in the left navigation sidebar from any page
- Use the site-wide **search bar** at the top of any page to search for a term across the entire textbook

### Tips for Using the Glossary in Training

- **Vocabulary preview** — Before a new chapter, point learners at the relevant glossary terms to build familiarity.
- **Quick reference during discussion** — When a term comes up in a working session and someone's unsure, the glossary is faster than re-reading the chapter.
- **Onboarding new team members** — The glossary alone is a reasonable standalone reference for someone joining a GenAI cost-governance conversation mid-stream.

## Using the Quizzes

### What Are the Quizzes?

Each finished chapter has an accompanying **quiz page** with 10 multiple-choice questions for self-assessment, aligned to specific concepts from the learning graph and distributed across Bloom's Taxonomy levels.

**Current coverage:** quizzes exist for Chapters 1 and 2 only, matching the chapters with finished content.

### How Quizzes Work

- Quizzes are accessed via the **"Quiz"** link under each finished chapter in the left navigation
- Questions are presented as expandable sections — learners click to reveal the answer and explanation after attempting the question
- Quizzes are **not graded automatically** — they are formative self-check tools, not summative assessments

### Tips for Using Quizzes in Training

- **Pre-session check** — Assign the quiz before a session to see what the cohort already knows.
- **Post-session review** — Use it after a session to identify concepts that need a follow-up.
- **Custom assessments** — The questions are openly licensed (see "Understanding the License" below) and can seed your own internal assessment bank.

### Bloom's Taxonomy Levels

Each quiz question is tagged with a **Bloom's Taxonomy** level — a framework that classifies thinking skills from simple to complex:

| Level | Name | What It Means | Example Verb |
|-------|------|--------------|-------------|
| L1 | Remember | Recall facts and definitions | Define, list, name |
| L2 | Understand | Explain concepts in your own words | Explain, describe, compare |
| L3 | Apply | Use concepts to solve problems | Calculate, demonstrate, solve |
| L4 | Analyze | Break down and examine relationships | Differentiate, organize, compare |
| L5 | Evaluate | Make judgments based on criteria | Assess, argue, justify |
| L6 | Create | Produce original work or solutions | Design, construct, propose |

The Chapter 1 and 2 quizzes are weighted toward L1–L2 (Remember/Understand), since both are introductory chapters; expect later chapters to shift toward L3–L5 as the material gets more applied.

## Using the References

### What Are the References?

Each finished chapter has an accompanying **references page** with 10 curated sources: 3 Wikipedia articles, 2 credited-textbook citations (naming the specific author and teaching innovation they're known for), and 5 verified online resources.

**Current coverage:** references exist for Chapters 1 and 2 only.

### A Note About Link Rot

**Link rot** is when a URL stops working because a page has moved or been deleted. During generation of these references, several candidate URLs (a Hugging Face course page, an NVIDIA glossary page, an OpenAI docs page) turned out to be unreachable and were replaced with verified alternatives before publishing — a reminder that even freshly-generated links should be spot-checked periodically, not just at creation time.

If you or a learner encounters a broken link, try the [Wayback Machine](https://web.archive.org/) for an archived version, or report it via GitHub Issues (see "Feedback" below).

## Feedback

### Reporting Issues and Suggestions

This textbook is an open-source project hosted on **GitHub**. You don't need to be a programmer to report a problem or suggest an improvement.

### How to Submit Feedback

1. Go to the repository: [Kschuman-aon/genai-roi](https://github.com/Kschuman-aon/genai-roi)
2. Click the **"Issues"** tab, then **"New issue"**
3. Give it a clear title (e.g., "Broken link in Chapter 2 references" or "Suggestion: cover FinOps tagging conventions")
4. Describe which page has the problem and what you expected vs. saw

You'll need a free GitHub account to submit issues, or you can email the author via the contact page.

## Understanding the License

### What is a Creative Commons License?

A **license** is a legal document that explains what others are allowed to do with a piece of work. A **Creative Commons (CC) license** is a standardized, easy-to-understand license used for educational and creative content.

### This Textbook's License

This textbook uses the **CC BY-NC-SA 4.0** license:

| Code | Full Name | What It Means |
|------|-----------|---------------|
| **CC** | Creative Commons | A standard open license |
| **BY** | Attribution | You must give credit to the original author |
| **NC** | Non-Commercial | You cannot use the material to make money |
| **SA** | Share-Alike | If you modify the material, you must share it under the same license |
| **4.0** | Version 4.0 | The current version of the license |

### What You CAN Do

- **Use** the textbook for internal training at your organization, free of charge to learners
- **Share** the link with other trainers, teams, or learners
- **Modify** the content — add your own examples, remove sections, reorder chapters
- **Create derivative works** — build your own internal version based on this one

### What You CANNOT Do

- **Sell** the textbook or charge learners for access
- **Remove attribution** — you must credit Katie Jo Schuman as the original author
- **Use a different license** if you modify and share — it must remain CC BY-NC-SA 4.0
- **Claim it as your own original work**

For the full legal text, see the [Creative Commons License](../license.md) page.

## Customizing Your Own Version

One of the most powerful features of this textbook is that you can create your own customized version for your organization. This section explains how.

### Key Technical Terms

- **Repository (repo)** — A folder on GitHub containing all the files for a project.
- **Git** — A version control tool that tracks changes to files.
- **Clone** — Making a complete copy of a repository on your own computer.
- **Fork** — Making a complete copy of a repository on your own GitHub account.
- **MkDocs** — The software that converts the textbook's markdown files into a website.
- **Markdown** — A simple text formatting language. `**bold**` makes **bold**, `# Heading` makes a heading, `-` makes a bullet.
- **mkdocs.yml** — The main configuration file: site title, navigation, colors, enabled features.

### Step 1: Create a GitHub Account

If you don't already have one, go to [github.com](https://github.com) and create a free account.

### Step 2: Fork or Clone the Repository

**Option A: Fork (easier, stays on GitHub)** — go to [Kschuman-aon/genai-roi](https://github.com/Kschuman-aon/genai-roi) and click **"Fork"**.

**Option B: Clone (works on your own computer)**:

```bash
git clone https://github.com/Kschuman-aon/genai-roi.git
```

### Step 3: Make Changes

All content lives in the `docs/` folder as Markdown (`.md`) files — plain text with simple formatting, editable with any text editor.

```yaml
site_name: "Your Custom Title"
site_description: "Your description here"
site_author: "Your Name"
```

In `mkdocs.yml`, the theme palette (`primary: indigo`, `accent: orange` by default) can be changed to any Material color: red, pink, purple, deep purple, indigo, blue, light blue, cyan, teal, green, light green, lime, yellow, amber, orange, deep orange, brown, grey, blue grey.

### Step 4: Preview Locally

```bash
pip install mkdocs mkdocs-material
cd genai-roi
mkdocs serve
```

Open `http://127.0.0.1:8000/genai-roi/` to see your version. The preview server refreshes automatically when you save a file.

### Step 5: Publish Your Version

```bash
mkdocs gh-deploy
```

This builds and publishes to `https://YOUR-USERNAME.github.io/genai-roi/`, typically within 1–2 minutes.

## Customizing Your Analytics

### What is Web Analytics?

**Web analytics** measures how visitors use a website — which pages they visit, how long they stay. For an internal training deployment, this can help you see which chapters get the most engagement and where cohorts might be getting stuck.

### Google Analytics

If you deploy your own fork, you'll want your own Google Analytics property rather than reusing the author's:

1. Go to [analytics.google.com](https://analytics.google.com/) and create a new property
2. Google gives you a **Measurement ID** (`G-XXXXXXXXXX`)
3. In `mkdocs.yml`:

```yaml
extra:
  analytics:
    provider: google
    property: G-YOUR-MEASUREMENT-ID
```

4. Rebuild and deploy. Data starts appearing within 24–48 hours.

### A Note on Learner Privacy for Internal Training Deployments

If you deploy this textbook internally and want to track individual learner progress (not just aggregate page views), be aware this is now **employee data**, not anonymous web traffic. FERPA and COPPA — the two regulations most textbook privacy guidance cites — do not actually apply here: FERPA governs K-12/higher-education records, and COPPA governs children under 13, neither of which describes an adult professional-development audience. What *does* apply depends on your organization and where your learners are located — most relevantly the **GDPR** if any learners are in the EU/UK, and your own company's employee-data-handling policy everywhere else. The Google Analytics setup above is aggregate and anonymous by default, which is the safest starting point; consult your organization's data privacy or HR team before adding any individually-identifiable learner tracking (e.g., an LMS integration that ties quiz scores to named employees).

## The Learning Graph

### What is a Learning Graph?

A **learning graph** is a visual map showing how concepts in the textbook depend on each other. It is structured as a **DAG** (Directed Acyclic Graph) — a diagram where arrows show which concepts must be understood before others.

### How Trainers Can Use the Learning Graph

- **Prerequisite checking** — Before covering a concept in a live session, verify the cohort has covered its prerequisites.
- **Remediation** — If a learner struggles with a concept, trace back through the graph to find the actual gap.
- **Curriculum mapping** — Compare the learning graph to your organization's existing training plan to spot coverage gaps.
- **Enrichment** — Advanced learners can follow the graph forward to preview concepts ahead of the current chapter.

The interactive [Learning Graph Viewer](../sims/graph-viewer/index.md) is available in the "Learning Graph" section of the left navigation.

## Ledger: Your Pedagogical Agent

### What is a Pedagogical Agent?

A **pedagogical agent** is a character that appears throughout a textbook to guide readers. Research shows pedagogical agents improve engagement and perceived learning — a phenomenon called the **persona effect**.

### How Ledger Appears

Ledger is a fox — precise, resourceful, and quick-witted, with a running catchphrase of "Every token counts!" Ledger appears as colored callout boxes (called **admonitions**) throughout each chapter. There are seven types:

| Type | Purpose | Frequency |
|------|---------|-----------|
| Welcome | Introduces the chapter | Exactly one per chapter |
| Thinking | Highlights a key mental-model insight | 1–4 per chapter |
| Tip | Shares a practical shortcut | As the material warrants |
| Warning | Alerts to a common pitfall | As the material warrants |
| Encourage | Supports readers through harder material | Where a topic is known to be tough |
| Celebration | Closes out the chapter | Exactly one per chapter |
| Neutral | General aside | Rarely |

Ledger appears fewer than ten times in any chapter, and appears less often in shorter chapters. Mascot admonitions are never placed back-to-back, and only Chapter 1's very first appearance is a self-introduction — every other chapter opens with a normal, chapter-specific welcome.

### Tips for Trainers

- **Read Ledger's tips aloud in a session** — they're written conversationally and work well spoken.
- **Use "thinking" admonitions as discussion prompts** — they flag the single most important mental-model shift in that section.
- **Point frustrated learners at "encourage" admonitions** — they exist specifically for the parts of the book known to be conceptually harder.
