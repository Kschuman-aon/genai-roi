// Serving Batch Size Tuner - p5.js
// CANVAS_HEIGHT: 445
//
// Pick the cheapest batch size that meets a latency limit and fits in GPU memory.
// Four committed challenges, then an exploration mode (limit and context length).

const VIS_H = 240, PANEL_H = 205;
const BATCHES = [1, 8, 32, 64, 128];
const ITL = { 1: 20, 8: 25, 32: 40, 64: 70, 128: 140 };   // inter-token latency, ms
const rowOf = b => {
  const tp = b / (ITL[b] / 1000);
  return { b, tp, t: 400 * ITL[b] / 1000, cost: Math.round((4 / 3600) / tp * 1e8) / 100 };
};
const ceilingFor = ctx => 480000 / ctx;                    // 120 at 4,000 tokens
function best(limit, ceil) {
  let out = null;
  BATCHES.forEach(b => { const r = rowOf(b); if (r.t <= limit && b <= ceil && (!out || r.cost < out.cost)) out = r; });
  return out;
}
const CHALLENGES = [
  { limit: 10, why: 'Batch 8 takes 10 s, which meets a limit of 10 s or less; batch 32 takes 16 s and breaks it.' },
  { limit: 20, why: 'Batch 32 takes 16 s and costs $1.39; batch 64 is cheaper but takes 28 s and breaks the limit.' },
  { limit: 30, why: 'Batch 64 takes 28 s and costs $1.22, the lowest cost among batch sizes that meet the limit.' },
  { limit: 60, why: 'Batch 128 meets the latency limit at 56 s but does not fit in memory, and it costs the same $1.22 because throughput is already saturated.' }
];

let UI, runner, mode = 'challenge', limit = 10, ctx = 4000, sel = null, graded = null, showBest = false;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A table of five batch sizes showing response time, cost per million tokens and memory fit against a latency limit. The learner commits the cheapest feasible batch size.');
  runner = new QK.Runner({
    box: UI.panel, items: CHALLENGES, attempts: 2, mastery: 3,
    label: 'Challenges correct on first attempt', note: 'Illustrative values: 8B model, one $4.00/hour GPU',
    question: c => `Which batch size is cheapest while a 400-token response still finishes within ${c.limit} seconds?`,
    controls: (c, ctl) => { const ch = QK.choice(ctl, BATCHES, { onChange: v => { sel = v; redraw(); } }); return ch.get; },
    onShow: c => { limit = c.limit; sel = null; graded = null; showBest = false; redraw(); },
    judge: (c, b) => {
      const right = best(c.limit, 120), r = rowOf(b);
      return { ok: b === right.b, okMsg: `batch ${b} takes ${r.t} s and costs ${QK.usd(r.cost)} per million tokens.`, why: c.why, reveal: `batch ${right.b}` };
    },
    onResult: (c, i, res) => { const right = best(c.limit, 120); graded = res.ok ? 'good' : 'bad'; showBest = res.final && !res.ok; redraw(); },
    onDone: r => {
      mode = 'explore'; limit = 20; sel = null; graded = null;
      const box = r.explore('Explore (not scored): change the latency limit and the context length');
      QK.slider(box, 'Latency limit for a 400-token response', 8, 60, 1, 20, v => v + ' s', v => { limit = v; redraw(); });
      QK.slider(box, 'Average context length', 2000, 8000, 2000, 4000, v => QK.int(v) + ' tokens', v => { ctx = v; redraw(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  const w = width, xT = 78, tw = w * 0.36, xC = w * 0.52, cw = w * 0.28, xM = w * 0.84;
  const ceil = mode === 'explore' ? ceilingFor(ctx) : 120;
  const right = best(limit, ceil);
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Serving Batch Size Tuner (illustrative data)', w / 2, 6);
  textSize(11); textAlign(LEFT, TOP); fill(70);
  text('Batch', 12, 28); text('Response time (limit = dashed line)', xT, 28); text('Cost per million tokens', xC, 28); text(`Memory (ceiling ${ceil})`, xM, 28);
  BATCHES.forEach((b, i) => {
    const r = rowOf(b), y = 44 + i * 38, fits = b <= ceil, fast = r.t <= limit, ok = fits && fast;
    let fillC = 'white', strokeC = '#cbd5e1', sw = 1;
    if (mode === 'explore') { fillC = ok ? '#e8f5e9' : '#eceff1'; if (right && right.b === b) { strokeC = '#2e7d32'; sw = 3; } }
    if (b === sel) { strokeC = graded === 'good' ? '#2e7d32' : graded === 'bad' ? '#c62828' : '#3949ab'; sw = 3; }
    if (showBest && right && right.b === b) { strokeC = '#2e7d32'; sw = 3; fillC = '#e8f5e9'; }
    stroke(strokeC); strokeWeight(sw); fill(fillC); rect(6, y, w - 12, 33, 4);
    noStroke(); fill(0); textSize(14); textAlign(LEFT, CENTER); text(b, 14, y + 17);
    fill(fast ? '#3949ab' : '#c62828'); rect(xT, y + 8, max(2, r.t / 60 * tw), 17);
    fill(0); textSize(11); text(r.t + ' s', xT + max(2, r.t / 60 * tw) + 4, y + 17);
    fill('#ef6c00'); rect(xC, y + 8, max(2, r.cost / 22.22 * cw * 0.78), 17);
    fill(0); text(QK.usd(r.cost), xC + max(2, r.cost / 22.22 * cw * 0.78) + 4, y + 17);
    fill(fits ? '#2e7d32' : '#c62828'); text(fits ? '✓ fits' : '✗ too big', xM, y + 17);
    if (mode === 'explore' && right && right.b === b) { fill('#2e7d32'); textSize(14); text('★', w - 24, y + 17); }
  });
  stroke('#c62828'); strokeWeight(2); drawingContext.setLineDash([5, 4]);
  const lx = xT + min(limit, 60) / 60 * tw; line(lx, 40, lx, 44 + 5 * 38); drawingContext.setLineDash([]);
  if (mode === 'explore' && !right) { noStroke(); fill('#c62828'); textSize(12); textAlign(CENTER, TOP); text('No feasible batch size', w / 2, VIS_H - 22); }
}
