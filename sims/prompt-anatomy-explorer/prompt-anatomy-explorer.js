// Anatomy of a Prompt - p5.js
// CANVAS_HEIGHT: 400
//
// One realistic assembled prompt, split into System Prompt / Context /
// User Instruction segments. Click a segment for its cost behavior; toggle
// "send 100 times" to see which segment's cost actually recurs.

let canvasWidth = 800;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let sendManyTimes = false;
let selectedIndex = null;
let segmentBoxes = [];
let toggleCheckbox;

const SEGMENTS = [
  {
    label: 'System Prompt',
    text: 'You are a customer support assistant for Acme Corp. Be concise and never discuss competitors.',
    bg: [187, 222, 251],
    border: [25, 118, 210],
    tokens: 24,
    info: 'Persistent across the whole conversation and resent on every request - its token cost recurs every single time.'
  },
  {
    label: 'Context',
    text: 'Order #48213: blue jacket, size M, purchased 12 days ago.',
    bg: [200, 230, 201],
    border: [56, 142, 60],
    tokens: 16,
    info: 'Task-specific background inserted for this particular request; may or may not recur depending on the application.'
  },
  {
    label: 'User Instruction',
    text: "What's the return policy on this item?",
    bg: [255, 224, 178],
    border: [239, 108, 0],
    tokens: 11,
    info: 'The specific ask for this turn; unique to this request.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  toggleCheckbox = createCheckbox('Send this prompt 100 times', false);
  toggleCheckbox.position(10, drawHeight + 15);
  toggleCheckbox.changed(() => { sendManyTimes = toggleCheckbox.checked(); });

  describe('Click a segment of this assembled prompt to see how its token cost behaves, and toggle to see the cost of sending it 100 times.', LABEL);
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
  text('Anatomy of a Prompt', canvasWidth / 2, 10);

  textSize(15);
  const boxWidth = canvasWidth - 2 * margin;
  let y = 42;
  segmentBoxes = [];

  for (let i = 0; i < SEGMENTS.length; i++) {
    const seg = SEGMENTS[i];
    const isSelected = (i === selectedIndex);
    const boxHeight = 56;

    noStroke();
    if (isSelected) { stroke('black'); strokeWeight(2); } else { stroke(seg.border); strokeWeight(1); }
    fill(seg.bg[0], seg.bg[1], seg.bg[2]);
    rect(margin, y, boxWidth, boxHeight, 8);
    noStroke();
    strokeWeight(1);

    fill(seg.border[0], seg.border[1], seg.border[2]);
    textAlign(LEFT, TOP);
    textSize(12);
    text(seg.label.toUpperCase() + '  (' + seg.tokens + ' tokens)', margin + 10, y + 6);

    fill(20);
    textSize(15);
    textAlign(LEFT, TOP);
    text(seg.text, margin + 10, y + 24, boxWidth - 20, boxHeight - 24);

    segmentBoxes.push({ x: margin, y: y, w: boxWidth, h: boxHeight, index: i });
    y += boxHeight + 10;
  }

  // Infobox
  noStroke();
  fill(245);
  stroke(200);
  rect(margin, y + 4, boxWidth, drawHeight - y - 10, 6);
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(14);
  let infoText = 'Click a segment above to see how its token cost behaves.';
  if (selectedIndex !== null) {
    infoText = SEGMENTS[selectedIndex].label + ': ' + SEGMENTS[selectedIndex].info;
  }
  text(infoText, margin + 10, y + 14, boxWidth - 20, drawHeight - y - 20);

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(13);
  if (sendManyTimes) {
    const total = SEGMENTS.reduce((s, seg) => s + seg.tokens, 0);
    const rate = 0.50 / 1000000;
    const line = 'x100 calls: System Prompt resends ' + (SEGMENTS[0].tokens * 100) + ' tokens total. Prompt total: ' + total + ' tok/call (~$' + (total * rate).toFixed(6) + ')  ->  x100: ' + (total * 100) + ' tok (~$' + (total * 100 * rate).toFixed(5) + ')';
    text(line, 230, drawHeight + 25, canvasWidth - 240);
  }
}

function mousePressed() {
  for (const b of segmentBoxes) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      selectedIndex = (selectedIndex === b.index) ? null : b.index;
      break;
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
