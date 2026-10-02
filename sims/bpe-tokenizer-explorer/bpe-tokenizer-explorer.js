// Byte Pair Encoding Step-Through - p5.js
// CANVAS_HEIGHT: 380
//
// Step through BPE merges on "tokenization" using a curated rule list (so
// the trace matches the chapter's narrative exactly). Any other typed word
// falls back to a simple leftmost-pair-first reduction.

let canvasWidth = 800;
let drawHeight = 280;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Curated merge order for the default word, chosen to land on
// ["token", "iz", "ation"] - a plausible, teachable subword split.
const CURATED_RULES = [
  ['t', 'i'], ['ti', 'o'], ['tio', 'n'], ['a', 'tion'], ['i', 'z'],
  ['t', 'o'], ['to', 'k'], ['tok', 'e'], ['toke', 'n']
];

let wordInput;
let currentWord = 'tokenization';
let sequence = [];
let mergeStep = 0;
let maxSteps = 0;
let lastMergedPair = null;

function resetTrace() {
  sequence = currentWord.toLowerCase().split('');
  mergeStep = 0;
  lastMergedPair = null;
  maxSteps = (currentWord.toLowerCase() === 'tokenization') ? CURATED_RULES.length : sequence.length - 1;
}

function pairCounts(seq) {
  const counts = {};
  for (let i = 0; i < seq.length - 1; i++) {
    const key = seq[i] + '+' + seq[i + 1];
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function nextRule() {
  if (currentWord.toLowerCase() === 'tokenization') {
    return mergeStep < CURATED_RULES.length ? CURATED_RULES[mergeStep] : null;
  }
  return sequence.length > 1 ? [sequence[0], sequence[1]] : null;
}

function applyMerge(rule) {
  const [a, b] = rule;
  const next = [];
  let i = 0;
  let merged = false;
  while (i < sequence.length) {
    if (!merged && i < sequence.length - 1 && sequence[i] === a && sequence[i + 1] === b) {
      next.push(a + b);
      i += 2;
      merged = true;
    } else {
      next.push(sequence[i]);
      i += 1;
    }
  }
  sequence = next;
  lastMergedPair = rule;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  wordInput = createInput(currentWord);
  wordInput.position(90, drawHeight + 10);
  wordInput.size(140);
  wordInput.input(() => {
    const v = wordInput.value().trim();
    if (v.length > 0 && v.length <= 20 && /^[a-zA-Z]+$/.test(v)) {
      currentWord = v;
      resetTrace();
    }
  });

  const nextBtn = createButton('Next Merge');
  nextBtn.position(10, drawHeight + 45);
  nextBtn.mousePressed(() => {
    const rule = nextRule();
    if (rule) { applyMerge(rule); mergeStep++; }
  });

  const prevBtn = createButton('Previous');
  prevBtn.position(110, drawHeight + 45);
  prevBtn.mousePressed(() => {
    if (mergeStep > 0) { mergeStep--; rebuildFromStep(); }
  });

  const resetBtn = createButton('Reset');
  resetBtn.position(205, drawHeight + 45);
  resetBtn.mousePressed(() => { resetTrace(); });

  resetTrace();
  describe('Step through Byte Pair Encoding merges on a word, watching the symbol sequence and pair table update one merge at a time.', LABEL);
}

function rebuildFromStep() {
  const word = currentWord.toLowerCase();
  sequence = word.split('');
  lastMergedPair = null;
  const steps = (word === 'tokenization') ? CURATED_RULES : null;
  for (let s = 0; s < mergeStep; s++) {
    const rule = steps ? steps[s] : [sequence[0], sequence[1]];
    applyMerge(rule);
  }
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Byte Pair Encoding Step-Through', canvasWidth / 2, 8);

  // Sequence boxes
  textSize(16);
  let x = margin;
  const boxY = 42;
  const boxH = 32;
  for (const sym of sequence) {
    const w = textWidth(sym) + 18;
    const isNew = lastMergedPair && sym === lastMergedPair[0] + lastMergedPair[1];
    noStroke();
    fill(isNew ? color(255, 224, 130) : color(224, 224, 255));
    stroke(isNew ? color(239, 108, 0) : color(100, 100, 200));
    rect(x, boxY, w, boxH, 5);
    noStroke();
    fill(20);
    textAlign(CENTER, CENTER);
    text(sym, x + w / 2, boxY + boxH / 2);
    x += w + 6;
  }

  // Pair frequency table
  const tableY = 90;
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  text('ADJACENT PAIRS IN CURRENT SEQUENCE (count within this word)', margin, tableY);

  const pairs = pairCounts(sequence);
  const rule = nextRule();
  const nextKey = rule ? rule[0] + '+' + rule[1] : null;
  let rowY = tableY + 20;
  textSize(14);
  for (const [key, count] of pairs.slice(0, 6)) {
    const isNext = (key === nextKey);
    if (isNext) {
      noStroke();
      fill(255, 243, 205);
      rect(margin - 4, rowY - 2, 300, 20, 3);
    }
    noStroke();
    fill(isNext ? color(180, 95, 6) : 40);
    textAlign(LEFT, TOP);
    text(key.replace('+', '  +  ') + '   (count: ' + count + ')' + (isNext ? '  <- next merge' : ''), margin, rowY);
    rowY += 22;
  }
  if (pairs.length === 0) {
    fill(100);
    text('Fully merged - no adjacent pairs remain.', margin, rowY);
  }

  // Token count readout
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Word:', 10, drawHeight + 20);
  text('Token count: ' + sequence.length, 260, drawHeight + 20);
  text('Tokens: ' + sequence.join(' | '), 10, drawHeight + 80, canvasWidth - 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
