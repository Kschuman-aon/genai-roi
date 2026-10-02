// Prompt Compression Before/After Comparator - p5.js
// CANVAS_HEIGHT: 400
//
// Side-by-side "Before" (verbose) and "After" (compressed) prompt text with
// live token counts and a comparison bar. Four preset pairs; a toggle shows
// per-token color boundaries using a precomputed token segmentation.

let canvasWidth = 800;
let drawHeight = 310;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let presetSelect, boundariesCheckbox;
let showBoundaries = false;
let presetIndex = 0;

const PRESETS = [
  {
    name: 'Verbose instruction vs. structured rewrite',
    before: 'Please provide a comprehensive and detailed summary of the following document , making sure to include all of the key points and important information contained within it .'.split(' '),
    after: 'Summarize the document . Include all key points .'.split(' ')
  },
  {
    name: 'Prose document vs. its summary',
    before: 'The quarterly report describes revenue growth across three regions , driven primarily by increased enterprise adoption of the platform , partially offset by higher support costs and a one-time infrastructure migration expense recorded in the final month of the quarter .'.split(' '),
    after: 'Revenue grew across three regions from enterprise adoption , offset by support costs and a one-time migration expense .'.split(' ')
  },
  {
    name: 'Repeated-context prompt vs. deduplicated version',
    before: 'Context : Order #48213 , blue jacket , size M . Context : Order #48213 , blue jacket , size M . What is the return policy on this item ?'.split(' '),
    after: 'Context : Order #48213 , blue jacket , size M . What is the return policy on this item ?'.split(' ')
  },
  {
    name: 'Few-shot with 5 examples vs. 2 curated examples',
    before: '[Ex1] Q : 2+2 ? A : 4 . [Ex2] Q : 3+3 ? A : 6 . [Ex3] Q : 4+4 ? A : 8 . [Ex4] Q : 5+5 ? A : 10 . [Ex5] Q : 6+6 ? A : 12 . Q : 7+7 ? A :'.split(' '),
    after: '[Ex1] Q : 2+2 ? A : 4 . [Ex2] Q : 3+3 ? A : 6 . Q : 7+7 ? A :'.split(' ')
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  presetSelect = createSelect();
  for (let i = 0; i < PRESETS.length; i++) presetSelect.option(PRESETS[i].name, i);
  presetSelect.position(170, drawHeight + 12);
  presetSelect.size(canvasWidth - 190 - margin);
  presetSelect.changed(() => { presetIndex = int(presetSelect.value()); });

  boundariesCheckbox = createCheckbox('Show token boundaries', false);
  boundariesCheckbox.position(10, drawHeight + 50);
  boundariesCheckbox.changed(() => { showBoundaries = boundariesCheckbox.checked(); });

  describe('Compare a verbose prompt against a compressed rewrite, with live token counts and optional per-token boundary shading.', LABEL);
}

function drawTokenBox(tokens, x, y, w, h, label) {
  noStroke();
  fill(255);
  stroke(220);
  rect(x, y, w, h, 6);
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  text(label + '  (' + tokens.length + ' tokens)', x + 8, y + 6);

  textSize(14);
  let tx = x + 8;
  let ty = y + 26;
  const maxX = x + w - 8;
  const lineH = 20;
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const tw = textWidth(tok) + (showBoundaries ? 8 : 4);
    if (tx + tw > maxX) { tx = x + 8; ty += lineH; }
    if (ty > y + h - lineH) break;
    if (showBoundaries) {
      noStroke();
      fill(i % 2 === 0 ? color(225, 235, 255) : color(255, 240, 210));
      rect(tx - 2, ty - 2, tw, lineH - 2, 2);
    }
    noStroke();
    fill(20);
    text(tok, tx, ty);
    tx += tw;
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
  text('Prompt Compression Before/After Comparator', canvasWidth / 2, 8);

  const preset = PRESETS[presetIndex];
  const colW = (canvasWidth - 3 * margin) / 2;
  const boxY = 42;
  const boxH = 190;

  drawTokenBox(preset.before, margin, boxY, colW, boxH, 'BEFORE');
  drawTokenBox(preset.after, margin * 2 + colW, boxY, colW, boxH, 'AFTER');

  // Comparison bar
  const barY = boxY + boxH + 16;
  const barAreaW = canvasWidth - 2 * margin;
  const maxTokens = Math.max(preset.before.length, preset.after.length);
  const beforeW = (preset.before.length / maxTokens) * barAreaW;
  const afterW = (preset.after.length / maxTokens) * barAreaW;
  const pctReduction = Math.round((1 - preset.after.length / preset.before.length) * 100);

  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  text('BEFORE: ' + preset.before.length + ' tokens', margin, barY);
  fill(183, 28, 28);
  rect(margin, barY + 16, beforeW, 16);

  noStroke();
  fill(60);
  text('AFTER: ' + preset.after.length + ' tokens  (-' + pctReduction + '%)', margin, barY + 38);
  fill(46, 125, 50);
  rect(margin, barY + 54, afterW, 16);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  presetSelect.size(canvasWidth - 190 - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
