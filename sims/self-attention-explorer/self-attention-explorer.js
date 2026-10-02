// Self-Attention, Qualitatively - p5.js
// CANVAS_HEIGHT: 310
//
// Click any word in one of two example sentences to see, qualitatively,
// which other words it "attends to" most strongly - no formulas, just
// relative shading. Weights are a hard-coded teaching illustration, not
// live model inference.

let canvasWidth = 800;
let drawHeight = 260;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 18;

let sentenceIndex = 0;
let clickedIndex = null;
let wordBoxes = [];
let toggleButton, resetButton;

const SENTENCES = [
  ["The", "trophy", "didn't", "fit", "in", "the", "suitcase", "because", "it", "was", "too", "big."],
  ["The", "city", "council", "refused", "the", "demonstrators", "a", "permit", "because", "they", "feared", "violence."]
];

// Function words get a low baseline attention weight by default.
const FUNCTION_WORDS = new Set(["the", "a", "in", "because", "was", "too", "didn't", "fit"]);

// The two pronoun resolutions the chapter calls out explicitly.
// Key: "<sentenceIndex>-<clicked word, lowercase, punctuation stripped>"
const SPECIAL = {
  "0-it": { "trophy": 0.95, "suitcase": 0.85 },
  "1-they": { "city": 0.55, "council": 0.95, "demonstrators": 0.2 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  toggleButton = createButton('Switch Sentence');
  toggleButton.position(10, drawHeight + 12);
  toggleButton.mousePressed(() => { sentenceIndex = 1 - sentenceIndex; clickedIndex = null; });

  resetButton = createButton('Reset');
  resetButton.position(170, drawHeight + 12);
  resetButton.mousePressed(() => { clickedIndex = null; });

  describe('Click a word in a sentence to see, through shading, which other words self-attention weighs most heavily when interpreting it.', LABEL);
}

function stripWord(w) {
  return w.toLowerCase().replace(/[^a-z']/g, '');
}

function computeWeight(sIdx, clickedWord, otherWord) {
  if (clickedWord === otherWord) return 1.0;
  const key = sIdx + '-' + clickedWord;
  if (SPECIAL[key] && SPECIAL[key][otherWord] !== undefined) return SPECIAL[key][otherWord];
  return FUNCTION_WORDS.has(otherWord) ? 0.12 : 0.4;
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
  text('Self-Attention, Qualitatively', canvasWidth / 2, 10);

  const words = SENTENCES[sentenceIndex];
  const clickedWord = (clickedIndex !== null) ? stripWord(words[clickedIndex]) : null;

  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  let x = margin;
  let y = 70;
  const lineHeight = 36;
  const maxWidth = canvasWidth - margin;
  wordBoxes = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const wWidth = textWidth(w) + 18;
    if (x + wWidth > maxWidth) { x = margin; y += lineHeight; }

    const isClicked = (i === clickedIndex);
    let shade = 40;
    if (clickedWord !== null) {
      const weight = computeWeight(sentenceIndex, clickedWord, stripWord(w));
      shade = isClicked ? 0 : round(230 - weight * 200);
    }

    noStroke();
    if (isClicked) {
      stroke('orange');
      strokeWeight(2);
      fill(255, 245, 200);
      rect(x - 4, y - 14, wWidth - 6, 28, 6);
      noStroke();
      strokeWeight(1);
    }
    fill(shade);
    text(w, x, y);
    wordBoxes.push({ x: x - 4, y: y - 14, w: wWidth - 6, h: 28, index: i });
    x += wWidth;
  }

  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(15);
  let caption = 'Click any word to see what it attends to.';
  if (sentenceIndex === 0 && clickedIndex === 8) {
    caption = '"it" is weighing "trophy" and "suitcase" most heavily to decide what it refers to.';
  } else if (sentenceIndex === 1 && clickedIndex === 9) {
    caption = '"they" attends most to "city council," not "demonstrators."';
  } else if (clickedIndex !== null) {
    caption = 'Darker words receive more attention from "' + words[clickedIndex] + '."';
  }
  text(caption, margin, drawHeight - 55, canvasWidth - 2 * margin);

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Sentence ' + (sentenceIndex + 1) + ' of 2', 330, drawHeight + 27);
}

function mousePressed() {
  if (mouseY < drawHeight) {
    for (const b of wordBoxes) {
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        clickedIndex = (clickedIndex === b.index) ? null : b.index;
        break;
      }
    }
  }
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
