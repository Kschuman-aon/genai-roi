// Per-Request Token Cost Calculator - p5.js
// CANVAS_HEIGHT: 430
//
// Four sliders (input tokens, output tokens, input rate, output rate) on
// the left; a live stacked cost bar and blended-rate readout on the right.

let canvasWidth = 800;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let leftColWidth = 300;

let inputTokensSlider, outputTokensSlider, inputRateSlider, outputRateSlider;
let resetButton;

const DEFAULTS = { inputTokens: 3000, outputTokens: 800, inputRate: 0.50, outputRate: 2.00 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  inputTokensSlider = createSlider(0, 50000, DEFAULTS.inputTokens, 100);
  inputTokensSlider.position(130, 48);
  inputTokensSlider.size(leftColWidth - 150);

  outputTokensSlider = createSlider(0, 10000, DEFAULTS.outputTokens, 50);
  outputTokensSlider.position(130, 108);
  outputTokensSlider.size(leftColWidth - 150);

  inputRateSlider = createSlider(0.10, 10.00, DEFAULTS.inputRate, 0.05);
  inputRateSlider.position(130, 168);
  inputRateSlider.size(leftColWidth - 150);

  outputRateSlider = createSlider(0.10, 20.00, DEFAULTS.outputRate, 0.05);
  outputRateSlider.position(130, 228);
  outputRateSlider.size(leftColWidth - 150);

  resetButton = createButton('Reset to Defaults');
  resetButton.position(10, drawHeight + 12);
  resetButton.mousePressed(() => {
    inputTokensSlider.value(DEFAULTS.inputTokens);
    outputTokensSlider.value(DEFAULTS.outputTokens);
    inputRateSlider.value(DEFAULTS.inputRate);
    outputRateSlider.value(DEFAULTS.outputRate);
  });

  describe('Adjust input tokens, output tokens, input rate, and output rate to see a request\'s total dollar cost and implied blended rate update live.', LABEL);
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
  text('Per-Request Token Cost Calculator', canvasWidth / 2, 8);

  const inputTokens = inputTokensSlider.value();
  const outputTokens = outputTokensSlider.value();
  const inputRate = inputRateSlider.value();
  const outputRate = outputRateSlider.value();

  const inputCost = inputTokens * (inputRate / 1000000);
  const outputCost = outputTokens * (outputRate / 1000000);
  const totalCost = inputCost + outputCost;
  const totalTokens = inputTokens + outputTokens;
  const blendedRate = totalTokens > 0 ? (totalCost / totalTokens) * 1000000 : 0;

  // Left column labels
  noStroke();
  fill(20);
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Input tokens: ' + inputTokens.toLocaleString(), 10, 40);
  text('Output tokens: ' + outputTokens.toLocaleString(), 10, 100);
  text('Input rate: $' + inputRate.toFixed(2) + '/M', 10, 160);
  text('Output rate: $' + outputRate.toFixed(2) + '/M', 10, 220);

  // Right column: stacked cost bar
  const rx = leftColWidth + 20;
  const rw = canvasWidth - rx - margin;
  const barY = 60;
  const barH = 50;
  const maxCost = Math.max(totalCost, 0.0001);
  const inputW = (inputCost / maxCost) * rw;
  const outputW = (outputCost / maxCost) * rw;

  fill(60);
  textAlign(LEFT, TOP);
  textSize(13);
  text('COST BREAKDOWN', rx, barY - 20);

  noStroke();
  fill(63, 81, 181);
  rect(rx, barY, inputW, barH);
  fill(239, 108, 0);
  rect(rx + inputW, barY, outputW, barH);
  noFill();
  stroke(100);
  rect(rx, barY, rw, barH);
  noStroke();

  fill(20);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Input cost: $' + inputCost.toFixed(4), rx, barY + barH + 14);
  text('Output cost: $' + outputCost.toFixed(4), rx, barY + barH + 34);

  fill(20, 20, 80);
  textSize(18);
  text('Total cost: $' + totalCost.toFixed(4), rx, barY + barH + 64);

  fill(60);
  textSize(13);
  text('Blended rate: $' + blendedRate.toFixed(3) + ' per million tokens', rx, barY + barH + 94);
  text('(workload-dependent - not a provider-set number)', rx, barY + barH + 112);
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
