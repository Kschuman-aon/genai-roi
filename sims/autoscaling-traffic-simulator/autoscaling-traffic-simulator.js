// Autoscaling and Warm Pool Behavior Over a Traffic Day - p5.js
// CANVAS_HEIGHT: 490
//
// Drag the time marker across a 24-hour traffic curve to see how many
// instances (warm pool + lagged autoscaling) are active, and where cold
// starts occur when demand outruns the 1-hour autoscaling lag.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;

// Hourly relative traffic load, 0-23h, each unit handled by one instance (10 units/instance).
const TRAFFIC = [10, 8, 7, 6, 6, 8, 15, 35, 60, 75, 80, 78, 70, 72, 78, 76, 65, 55, 40, 30, 22, 18, 14, 12];
const UNITS_PER_INSTANCE = 10;

let selectedHour = 9;
let warmPoolSlider, coldStartCheckbox;
let showColdStarts = false;
let draggingMarker = false;

let chartX, chartY, chartW, chartH;

function requiredInstances(hourIndex) {
  return Math.ceil(TRAFFIC[hourIndex] / UNITS_PER_INSTANCE);
}

function autoscaledInstances(hourIndex, warmPool) {
  const prevIndex = (hourIndex - 1 + 24) % 24;
  const prevRequired = requiredInstances(prevIndex);
  return Math.max(0, prevRequired - warmPool);
}

function isColdStart(hourIndex, warmPool) {
  const required = requiredInstances(hourIndex);
  const active = warmPool + autoscaledInstances(hourIndex, warmPool);
  return required > active;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  warmPoolSlider = createSlider(0, 10, 2, 1);
  warmPoolSlider.position(150, drawHeight + 12);
  warmPoolSlider.size(canvasWidth - 170 - margin);

  coldStartCheckbox = createCheckbox('Show cold-start events', false);
  coldStartCheckbox.position(10, drawHeight + 50);
  coldStartCheckbox.changed(() => { showColdStarts = coldStartCheckbox.checked(); });

  describe('Drag the time marker across a 24-hour traffic curve to see active instance count split between warm pool and lagged autoscaling, and where cold starts occur.', LABEL);
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
  text('Autoscaling and Warm Pool Behavior Over a Traffic Day', canvasWidth / 2, 8);

  const warmPool = warmPoolSlider.value();

  chartX = margin;
  chartY = 40;
  chartW = canvasWidth - 2 * margin;
  chartH = 150;
  drawTrafficChart(warmPool);
  drawInstanceBar(warmPool);

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Warm pool size: ' + warmPool, 10, drawHeight + 20);
}

function drawTrafficChart(warmPool) {
  noStroke();
  fill(255);
  stroke(220);
  rect(chartX, chartY, chartW, chartH, 6);

  // Axis labels
  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  text('Traffic (relative load)', chartX + 6, chartY + 4);

  // Line path
  stroke(63, 81, 181);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let h = 0; h <= 23; h++) {
    const px = chartX + (h / 23) * chartW;
    const py = chartY + chartH - 20 - (TRAFFIC[h] / 100) * (chartH - 40);
    vertex(px, py);
  }
  endShape();
  strokeWeight(1);

  // Hour ticks
  noStroke();
  fill(100);
  textAlign(CENTER, TOP);
  textSize(9);
  for (let h = 0; h <= 23; h += 3) {
    const px = chartX + (h / 23) * chartW;
    text(h + ':00', px, chartY + chartH - 16);
  }

  // Cold-start flags
  if (showColdStarts) {
    for (let h = 0; h <= 23; h++) {
      if (isColdStart(h, warmPool)) {
        const px = chartX + (h / 23) * chartW;
        const py = chartY + chartH - 20 - (TRAFFIC[h] / 100) * (chartH - 40);
        noStroke();
        fill(198, 40, 40);
        ellipse(px, py, 8, 8);
      }
    }
  }

  // Draggable marker
  const markerX = chartX + (selectedHour / 23) * chartW;
  stroke(239, 108, 0);
  strokeWeight(2);
  line(markerX, chartY + 18, markerX, chartY + chartH - 18);
  noStroke();
  strokeWeight(1);
  fill(239, 108, 0);
  ellipse(markerX, chartY + 18, 10, 10);
}

function drawInstanceBar(warmPool) {
  const barY = chartY + chartH + 24;
  const barH = chartH - 30;
  const hourIndex = floor(selectedHour) % 24;
  const auto = autoscaledInstances(hourIndex, warmPool);
  const required = requiredInstances(hourIndex);
  const active = warmPool + auto;
  const maxInstances = 14;

  noStroke();
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  text('ACTIVE INSTANCES AT ' + nf(hourIndex, 2) + ':00  (required: ' + required + ', active: ' + active + ')', chartX, barY - 18);

  const barAreaW = chartW - 60;
  const warmW = (warmPool / maxInstances) * barAreaW;
  const autoW = (auto / maxInstances) * barAreaW;

  noStroke();
  fill(25, 118, 210);
  rect(chartX, barY, warmW, 40);
  fill(255, 152, 0);
  rect(chartX + warmW, barY, autoW, 40);
  noFill();
  stroke(100);
  rect(chartX, barY, barAreaW, 40);
  noStroke();

  // Required-capacity reference line
  const reqX = chartX + (required / maxInstances) * barAreaW;
  stroke(198, 40, 40);
  strokeWeight(2);
  line(reqX, barY - 6, reqX, barY + 46);
  noStroke();
  strokeWeight(1);
  fill(198, 40, 40);
  textAlign(CENTER, TOP);
  textSize(10);
  text('required', reqX, barY + 46);

  fill(20);
  textAlign(LEFT, TOP);
  textSize(12);
  const coldNow = isColdStart(hourIndex, warmPool);
  text('Warm pool: ' + warmPool + '   Autoscaled (1hr lag): ' + auto, chartX, barY + 64);
  fill(coldNow ? color(198, 40, 40) : color(46, 125, 50));
  text(coldNow ? 'Cold start: capacity has not caught up to demand yet.' : 'No cold start: active capacity covers current demand.', chartX, barY + 84);
}

function mousePressed() {
  if (mouseY >= chartY && mouseY <= chartY + chartH && mouseX >= chartX && mouseX <= chartX + chartW) {
    draggingMarker = true;
    updateSelectedHour();
  }
}

function mouseDragged() {
  if (draggingMarker) updateSelectedHour();
}

function mouseReleased() {
  draggingMarker = false;
}

function updateSelectedHour() {
  const frac = constrain((mouseX - chartX) / chartW, 0, 1);
  selectedHour = frac * 23;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  warmPoolSlider.size(canvasWidth - 170 - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
