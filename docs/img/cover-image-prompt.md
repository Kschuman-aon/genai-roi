# Cover Image Prompt

Please generate a professional-quality cover image for this textbook.
This image will be used in social media previews and must follow the
formatting guidelines for an Open Graph image preview.

**Required specifications:**
- Format: PNG
- Wide-landscape format
- Size: 1200x630 pixels (1.91:1 aspect ratio)
- This is the Open Graph standard for social media previews

The image has four layers, back to front: background montage, color
treatment, mascot, and title text.

## Subject & Tone

Measuring GenAI ROI is a textbook that teaches practicing IT professionals
(software engineers, data scientists, ML/AI engineers, DevOps/MLOps
practitioners, technical managers) how to measure and communicate the return
on investment of generative AI initiatives — from token economics and cost
optimization through to executive-ready financial reporting. The audience is
working technologists and finance-literate executives, not students. The
visual tone should be modern, professional, and financially credible — closer
to a fintech product's marketing page than a playful classroom textbook —
because the book's own premise is that GenAI cost claims must stand up to
scrutiny from finance leadership.

## Title

Place "Measuring GenAI ROI" in the center of the image, in a clean, highly
legible sans-serif font. Use a light/white font color with a subtle drop
shadow or dark scrim behind it so it stays readable against the montage
background. Keep the title at a large, confident size — simplify the
background directly behind the text rather than shrinking the title to fit.
A smaller subtitle line below it reads "Token Efficiency and Executive
Financial Reporting" in a lighter weight. These two lines are the only
legible text that should be large; every other label in the image is small
and decorative.

## Background Montage

Arrange a montage of the following 8 concepts in a loose ring around the
title, each rendered in a consistent illustration style (see Style below) so
the composition reads as one image rather than a collage. Items marked
(real) are drawn from the book's own MicroSims — if your tool accepts
reference images, attach the matching screenshot from `docs/sims/<name>/<name>.png`
and restyle it to match; otherwise recreate it from the description.

- Tokenization (real: bpe-tokenizer-explorer) — the word "tokenization"
  split into a row of small rounded letter-tiles, a few tiles merging into
  larger chips, flowing toward a glowing meter that counts tokens
- NPV and Payback (real: npv-payback-calculator) — a bar chart with grey
  cash-flow bars and green present-value bars over Years 0–3, the first bar
  below the axis in red, and a green "NPV +$38,272" callout
- Break-Even (real: break-even-calculator) — two crossing cost/benefit lines
  on a dark dashboard panel with a glowing marker at the crossover point
- Cost per Task (real: cost-per-task-benchmark-explorer) — a compact
  horizontal bar comparison of several models' cost per task, cheapest bar
  highlighted in amber
- Model Cascade / Routing (real: model-cascade-cost-calculator) — a small
  flow diagram where a request routes to a cheap model first and escalates
  to a larger one only when needed
- GPU Compute — a stylized data-center rack or GPU chip glowing amber,
  suggesting the hardware cost layer beneath every model
- Neural Network / Embeddings — a glowing layered node-and-edge diagram with
  a cluster of connected points, in cool blue tones
- Executive Report — a clean tablet showing a simple bar chart and a
  one-line financial summary, suggesting the executive-facing deliverable

## Mascot

Place the book's mascot, Ledger the Fox, in the lower-left corner, sized so
it does not overlap the title or subtitle. Ledger is a modern flat-vector fox
with warm rust-orange fur, small round wire-frame glasses, a slim indigo
necktie, and a brown satchel/ledger strap across one shoulder — professional
and sharp-eyed, not childish. Use the reference image at
`docs/img/mascot/welcome.png` (Ledger waving) for exact appearance and pose,
and keep Ledger's flat-vector style (no gradients on the character).

## Style & Composition

- Illustration style: flat vector / modern digital illustration — one style
  applied to every montage element for visual consistency.
- Color palette: deep indigo and dark navy as the dominant background, with
  rust-orange and amber accents (matching the book's theme and Ledger),
  plus green only for positive-return signals (the NPV callout).
- Lighting/mood: confident and polished, with a subtle glow on the data
  elements (tokens, GPU, network) to evoke premium enterprise software.
- Composition: title centered, montage cards arranged in a ring or grid
  around it at varied sizes, Ledger lower-left, generous negative space
  immediately behind the title. Keep important content away from the outer
  ~5% edge, since social platforms crop previews.

## Avoid

- Do not render paragraphs of text or tiny illegible numbers; chart labels
  should be minimal and decorative.
- Avoid generic stock-photo cliches (handshakes, isolated lightbulbs, people
  pointing at whiteboards, piles of coins).
- Avoid photorealistic human faces — this book has no human characters, only
  Ledger.
- Do not let montage elements overlap or compete with the title, subtitle,
  or Ledger.
- Avoid a playful/childish tone (bubble fonts, pastel rainbow colors,
  classroom clip-art).
- Do not reuse the generic "Intelligent Textbook" template layout (table of
  contents, graphic novel panel, circuit simulators); this cover must be
  specific to GenAI ROI.
