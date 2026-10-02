// Same Task, Three Prompting Strategies - p5.js
// CANVAS_HEIGHT: 410
//
// Three tabs (Zero-Shot / Few-Shot / Chain-of-Thought) show the same math
// problem solved three ways, each with a token-count badge. A toggle swaps
// in a side-by-side summary bar comparing all three totals.

let canvasWidth = 800;
let drawHeight = 360;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let selectedTab = 0;
let compareAll = false;
let tabBoxes = [];
let compareButton;

const STRATEGIES = [
  {
    name: 'Zero-Shot',
    prompt: 'A store had 120 apples. It sold 45 in the morning and 38 in the afternoon. How many are left?',
    response: '37 apples.',
    promptTokens: 28,
    responseTokens: 4
  },
  {
    name: 'Few-Shot',
    prompt: '[Example 1: Q: A bakery had 50 rolls, sold 20. How many left? A: 30 rolls.]\n[Example 2: Q: A lot had 80 cars, sold 15. How many left? A: 65 cars.]\nA store had 120 apples. It sold 45 in the morning and 38 in the afternoon. How many are left?',
    response: '37 apples.',
    promptTokens: 95,
    responseTokens: 4
  },
  {
    name: 'Chain-of-Thought',
    prompt: 'A store had 120 apples. It sold 45 in the morning and 38 in the afternoon. How many are left? Think step by step.',
    response: '120 - 45 = 75.\n75 - 38 = 37.\nTherefore, 37 apples remain.',
    promptTokens: 34,
    responseTokens: 48
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  compareButton = createButton('Compare All Three');
  compareButton.position(10, drawHeight + 15);
  compareButton.mousePressed(() => { compareAll = !compareAll; });

  describe('Switch between zero-shot, few-shot, and chain-of-thought prompting tabs to compare prompt length, response length, and total token count for the same task.', LABEL);
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
  text('Same Task, Three Prompting Strategies', canvasWidth / 2, 10);

  // Tab bar
  const tabWidth = (canvasWidth - 2 * margin) / 3;
  tabBoxes = [];
  for (let i = 0; i < STRATEGIES.length; i++) {
    const x = margin + i * tabWidth;
    const isActive = (i === selectedTab) && !compareAll;
    noStroke();
    fill(isActive ? color(63, 81, 181) : color(224, 224, 224));
    rect(x, 42, tabWidth - 4, 32, 4);
    fill(isActive ? 255 : 40);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(STRATEGIES[i].name, x + (tabWidth - 4) / 2, 58);
    tabBoxes.push({ x: x, y: 42, w: tabWidth - 4, h: 32, index: i });
  }

  if (compareAll) {
    drawComparison();
  } else {
    drawTabContent(STRATEGIES[selectedTab]);
  }
}

function drawTabContent(s) {
  const boxWidth = canvasWidth - 2 * margin;
  noStroke();
  fill(255);
  stroke(220);
  rect(margin, 86, boxWidth, 190, 6);
  noStroke();

  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  text('PROMPT', margin + 10, 94);
  fill(20);
  textSize(14);
  text(s.prompt, margin + 10, 110, boxWidth - 20, 90);

  fill(60);
  textSize(12);
  text('RESPONSE', margin + 10, 206);
  fill(20);
  textSize(14);
  text(s.response, margin + 10, 222, boxWidth - 20, 50);

  // Token badge
  const total = s.promptTokens + s.responseTokens;
  noStroke();
  fill(230, 240, 255);
  stroke(63, 81, 181);
  rect(margin, 286, boxWidth, 50, 6);
  noStroke();
  fill(20, 20, 80);
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Prompt: ' + s.promptTokens + ' tok   Response: ' + s.responseTokens + ' tok   Total: ' + total + ' tok', margin + 12, 311);
}

function drawComparison() {
  const boxWidth = canvasWidth - 2 * margin;
  noStroke();
  fill(255);
  stroke(220);
  rect(margin, 86, boxWidth, 250, 6);
  noStroke();

  fill(20);
  textAlign(LEFT, TOP);
  textSize(14);
  text('Total tokens per request, side by side:', margin + 10, 96);

  const maxTokens = Math.max(...STRATEGIES.map(s => s.promptTokens + s.responseTokens));
  const barAreaWidth = boxWidth - 180;
  let y = 130;
  for (const s of STRATEGIES) {
    const total = s.promptTokens + s.responseTokens;
    const barWidth = (total / maxTokens) * barAreaWidth;

    fill(20);
    textAlign(LEFT, CENTER);
    textSize(13);
    text(s.name, margin + 10, y + 14);

    noStroke();
    fill(63, 81, 181);
    rect(margin + 150, y, barWidth, 26, 3);

    fill(20);
    textAlign(LEFT, CENTER);
    text(total + ' tok (' + s.promptTokens + ' prompt + ' + s.responseTokens + ' response)', margin + 160 + barWidth, y + 14);

    y += 50;
  }
}

function mousePressed() {
  if (!compareAll) {
    for (const b of tabBoxes) {
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        selectedTab = b.index;
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
