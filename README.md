# Measuring GenAI ROI: Token Efficiency and Executive Financial Reporting

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://Kschuman-aon.github.io/genai-roi/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/ibook-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## View the Live Site

Visit the interactive textbook at: [https://Kschuman-aon.github.io/genai-roi/](https://Kschuman-aon.github.io/genai-roi/)

## Overview

Most IT organizations cannot answer a question their finance leadership will ask sooner or later: *is this generative
AI investment actually paying off, and where is the money going?* This intelligent textbook teaches IT professionals —
software engineers, data scientists, ML/AI engineers, DevOps/MLOps practitioners, and technical managers — how to
measure the return on investment (ROI) of generative AI systems, with a particular emphasis on **token economics**: how
tokens are counted, priced, and consumed, and how token-level decisions translate directly into operating cost.

The book builds from first principles. It assumes only a general data science background (basic statistics, familiarity
with data workflows, and comfort reading quantitative reports) and no prior exposure to LLMs, corporate finance, or
executive communication. Across 27 chapters it moves from LLM and tokenization fundamentals, through compute pricing,
infrastructure planning, and efficiency techniques (prompt routing, retrieval, model compression), to financial ROI
vocabulary, business cases, productivity and quality metrics, cost attribution, vendor economics, governance and risk,
and finally the design and presentation of a high-quality, executive-ready financial ROI report.

Built with MkDocs Material, the textbook uses a learning graph of concept dependencies for prerequisite sequencing and
follows the 2001 revision of Bloom's Taxonomy for learning outcomes. Content is generated and curated with Claude AI
skills and includes interactive MicroSims — such as break-even, NPV/payback, and benefit-realization calculators and a
BPE tokenizer explorer — that let you experiment with the numbers behind the concepts.

## Site Status and Metrics

Source: `docs/learning-graph/book-metrics.json` (generated October 9, 2026).

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 561 |
| Chapters | 27 |
| MicroSims | 38 |
| Glossary Terms | 561 |
| Diagrams | 84 |
| Quiz Questions | 20 |
| References | 20 |
| Words | 218,322 |
| Links | 446 |
| Equivalent Printed Pages | 913 |

**Completion status:** content generation is well underway. All 27 chapters, the 561-term glossary, and 38 MicroSims
are in place. The FAQ, appendices, stories, and per-chapter quizzes and references are still to come
(2 chapters currently have quizzes and references).

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Kschuman-aon/genai-roi.git
cd genai-roi
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs mkdocs-material
```

Check `mkdocs.yml` for any additional plugins listed under `plugins:` and install them as needed.

### Build and Serve Locally

```bash
mkdocs build   # build the static site into site/
mkdocs serve   # live-reload dev server
```

Then open `http://localhost:8000/genai-roi/` in your browser.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Using the Book

- **Navigation:** use the left sidebar to browse chapters, or the search icon to search all content.
- **MicroSims:** found under the MicroSims section; each runs standalone in the browser with sliders and controls.
- **Customization:** edit Markdown in `docs/`, adjust site structure in `mkdocs.yml`, and add new MicroSims under
  `docs/sims/`.

## Repository Structure

```
genai-roi/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 27 chapters (01-core-concepts-llms … 27-report-production-review-capstone)
│   │   └── NN-chapter-name/index.md
│   ├── sims/                      # Interactive MicroSims (p5.js, Chart.js, etc.)
│   │   └── break-even-calculator/ # Each sim: main.html + index.md
│   ├── learning-graph/            # Concept graph, taxonomy, quality reports, book metrics
│   │   ├── learning-graph.csv     # Concept dependencies
│   │   ├── learning-graph.json    # vis-network format
│   │   └── book-metrics.json      # Canonical site metrics
│   ├── instructors-guide/         # Guidance for instructors
│   ├── course-description.md      # Seed document for the learning graph
│   ├── glossary.md                # ISO 11179-style definitions
│   └── license.md                 # CC BY-NC-SA 4.0 terms
├── plugins/                       # MkDocs plugin overrides (social card metadata)
├── scripts/                       # Utility scripts (chapter validation, token usage)
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please open an issue:

[GitHub Issues](https://github.com/Kschuman-aon/genai-roi/issues)

When reporting issues, please include:

- A description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots (if applicable)
- Browser and environment details (for MicroSims)

## License

This work is licensed under the
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — give appropriate credit with a link to the original
- **NonCommercial** — no commercial use without permission
- **ShareAlike** — distribute contributions under the same license

See [docs/license.md](docs/license.md) for details.

## Acknowledgements

This project is built on the shoulders of the open source community:

- **[MkDocs](https://www.mkdocs.org/)** — static site generator for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — responsive theme
- **[p5.js](https://p5js.org/)** — creative coding library used for MicroSims
- **[vis-network](https://visjs.org/)** — network visualization for the learning graph viewer
- **[Python](https://www.python.org/)** — data processing and validation tooling
- **[Claude](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — free hosting for open source projects

## Contact

**Katie Jo Schuman**

- GitHub: [@Kschuman-aon](https://github.com/Kschuman-aon)

Questions, suggestions, or collaboration opportunities? Open an issue on GitHub.
