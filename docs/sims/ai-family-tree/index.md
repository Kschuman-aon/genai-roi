---
title: The AI Family Tree
description: An interactive vis-network diagram showing how Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Generative AI, Foundation Models, and Large Language Models nest inside one another.
image: /sims/ai-family-tree/ai-family-tree.png
og:image: /sims/ai-family-tree/ai-family-tree.png
twitter:image: /sims/ai-family-tree/ai-family-tree.png
social:
   cards: false
quality_score: 85
---

# The AI Family Tree

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run The AI Family Tree MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Seven terms that get used interchangeably in vendor marketing are not
interchangeable at all: they nest inside one another like Russian dolls.
This MicroSim lays out that nesting as a top-down chain, from **Artificial
Intelligence** at the broadest end down to **Large Language Model** at the
narrowest, with **Neural Network** attached to the side as the *mechanism*
deep learning is built on rather than as another level of scope.

Node color deepens as scope narrows — pale blue for the broadest category,
dark teal for the narrowest — so the nesting is visible before a single
label is read. Each term carries the one-sentence definition used in
Chapter 1 plus a short note on why that level of the tree matters for cost.

The economic point behind the diagram: "AI" tells you almost nothing about
what a system costs to run, because the category stretches from a rule-based
script to a model with hundreds of billions of learned values. Every cost
estimate in this book attaches to a specific level of this tree.

## How to Use

- **Hover** any term to read its definition and its cost angle in the right-hand panel.
- **Click** a term to highlight the whole chain in orange — every broader category above it, and every narrower category below it. Click it again to clear.
- **Narrow ▶** reveals the tree one level at a time, starting at Artificial Intelligence. Use it to predict what comes next before you see it.
- **◀ Back** steps back up a level; **Show All** returns to the full tree.
- Use the on-screen navigation arrows to pan and zoom. Mouse-wheel zoom and drag-panning are deliberately disabled in the chapter embed so the page keeps scrolling normally; both are enabled when you open the MicroSim fullscreen.

## Graph Structure

A single "contains" chain runs top to bottom, with one branch off the side.

### Nodes

| Term | Scope | Color |
|------|-------|-------|
| Artificial Intelligence | Broadest category | Palest blue |
| Machine Learning | Subset of Artificial Intelligence | Light blue |
| Deep Learning | Subset of Machine Learning | Medium blue |
| Neural Network | The mechanism deep learning is built on | Lavender (off the scope scale) |
| Generative AI | Subset of Deep Learning | Teal |
| Foundation Model | Subset of Generative AI | Deep teal |
| Large Language Model | Subset of Foundation Models | Darkest teal |

### Edges

- **contains** — solid dark arrows linking each broader category to the next-narrower one it contains: AI → ML → DL → Generative AI → Foundation Model → LLM.
- **built on** — one dashed gray arrow from Deep Learning to Neural Network. It is drawn differently on purpose: a neural network is not a narrower kind of deep learning, it is the thing deep learning is made of.

## Key Concepts

- The nesting is strictly one-directional: every LLM is a foundation model, every foundation model is generative AI, every generative AI system is deep learning — and none of those statements reverse.
- Not every foundation model is an LLM. Some are trained primarily on images, audio, or a mix of data types.
- The dashed edge marks a category error worth avoiding: "built on" is a different relationship from "is a subset of."
- Cost lives at specific levels. GPU spend and training time belong to the deep learning level; token pricing and inference cost belong to the LLM level.

## Lesson Plan

### Grade Level

Undergraduate / professional (business and finance audiences, no technical prerequisites)

### Duration

10-15 minutes

### Prerequisites

None. This MicroSim is the entry point to the chapter's vocabulary.

### Learning Objectives

After using this visualization, students will be able to:

1. Classify all seven terms according to their nested "is-a-subset-of" relationships.
2. Explain why "every LLM is a foundation model" is true while the reverse is not.
3. Distinguish the "built on" relationship (Deep Learning → Neural Network) from the "contains" relationship that links the other six terms.
4. Identify which level of the tree a given cost claim actually applies to.

### Activities

1. **Predict, then reveal** (5 min): Start at Artificial Intelligence and use **Narrow ▶**. Before each click, ask students to name the next-narrower category and defend the guess. Reveal, then compare.
2. **Trace a chain** (5 min): Click Large Language Model and read the highlighted chain aloud from bottom to top: "an LLM is a foundation model, which is generative AI, which is deep learning, which is machine learning, which is AI."
3. **Spot the odd edge** (3 min): Ask why the arrow to Neural Network is dashed. Students should articulate that it marks a mechanism, not a narrower scope.
4. **Read a vendor claim** (5 min): Give students a marketing line such as "our AI-powered platform." Ask which node on this tree the claim actually pins down, and what they would need to ask to pin it down further.

### Assessment

- Can students place all seven terms in the correct nesting order without the diagram?
- Can students produce a counterexample to "every foundation model is an LLM"?
- Can students explain why "AI-powered" is not enough information to estimate a running cost?
- Given a cost statement (for example, "training cost millions in GPU compute"), can students name the level of the tree it belongs to?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://Kschuman-aon.github.io/genai-roi/sims/ai-family-tree/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Editing Node Positions

To adjust the layout:

1. Open `main.html` with the `?enable-save=true` parameter.
2. Drag nodes to the desired positions.
3. Read the updated coordinates from the network and copy them into the `TERMS` array in `ai-family-tree.js`.

## References

1. [Chapter 1: Core Concepts of LLMs](../../chapters/01-core-concepts-llms/index.md) — the source of every definition in this MicroSim.
2. [Glossary](../../glossary.md) — formal definitions of all seven terms.
3. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) — the graph library used here.
