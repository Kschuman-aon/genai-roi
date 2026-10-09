// Benefit Realization Calculator - p5.js
// CANVAS_HEIGHT: 480
//
// Calculate the year 1 realized benefit and three-year ROI of the running example from
// adoption, usage coverage, minutes saved and rework (6 items); then explore five inputs.

const VIS_H = 250, PANEL_H = 230;
const TICKETS = [120000, 160000, 160000], COST = [30000, 35000, 35000], INVEST = 60000, RATE = 30, TOTAL_COST = 160000;
let X = { adopt: 85, cov: 90, mins: 1, rw: 1, mpr: 10 };
function calcModel(p) {
  const a = p.adopt / 100, c = p.cov / 100;
  const gross = TICKETS.map(t => t * p.mins / 60 * RATE * a * c), rework = TICKETS.map(t => t * a * c * p.rw / 100 * p.mpr / 60 * RATE);
  const real = gross.map((g, i) => g - rework[i]), sum = real.reduce((s, v) => s + v, 0);
  const flows = [-INVEST, ...real.map((v, i) => v - COST[i])];
  return { plan: TICKETS[0] * p.mins / 60 * RATE, afterA: TICKETS[0] * p.mins / 60 * RATE * a, afterC: gross[0], rework1: rework[0], real, real1: real[0], sum, roi: (sum - TOTAL_COST) / TOTAL_COST * 100, npv: flows.reduce((s, f, t) => s + f / Math.pow(1.1, t), 0) };
}
const D = { adopt: 85, cov: 90, mins: 1, rw: 1, mpr: 10 };
const ITEMS = [
  { q: 'What would the year 1 benefit be if everything in the plan came true (100% adoption, 100% coverage, 1 minute saved per ticket)?', key: 'plan', why: '120,000 × 1 ÷ 60 × 30 = 60,000.' },
  { q: 'What is the year 1 benefit after 85% adoption?', key: 'afterA', why: '60,000 × 0.85 = 51,000.' },
  { q: 'What is the year 1 benefit after 85% adoption and 90% usage coverage?', key: 'afterC', why: '51,000 × 0.90 = 45,900.' },
  { q: 'What is the year 1 rework cost, with 1 point more rework and 10 minutes per rework?', key: 'rework1', why: 'Assisted tickets are 120,000 × 0.85 × 0.90 = 91,800; 91,800 × 0.01 × 10 ÷ 60 × 30 = 4,590.' },
  { q: 'What is the year 1 realized benefit (benefit after coverage minus rework cost)?', key: 'real1', why: '45,900 − 4,590 = 41,310.' },
  { q: 'What is the three-year ROI from realized benefits of $41,310, $55,080 and $55,080 against a total cost of $160,000? (percent)', key: 'roi', pct: true, why: 'Benefits total 151,470; (151,470 − 160,000) ÷ 160,000 = −0.0533.' }
];
let UI, runner, mode = 'challenge', upto = 0;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A waterfall chart steps from the plan benefit through adoption, coverage and rework to the realized year 1 benefit.');
  runner = new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative running example: investment $60,000; total three-year cost $160,000; labor $30/hour',
    question: it => it.q,
    controls: (it, ctl) => it.pct ? QK.num(ctl, 'ROI:', { suffix: '%' }).get : QK.num(ctl, 'Answer:', { prefix: '$' }).get,
    onShow: (it, i) => { upto = i; redraw(); },
    judge: (it, v) => {
      const m = calcModel(D)[it.key], ok = it.pct ? Math.abs(v - m) <= 0.1 : Math.abs(v - m) <= 1, f = it.pct ? QK.pct(m, 1) : QK.usd(m, 0);
      return { ok, okMsg: f + '.', why: it.why, reveal: f };
    },
    onResult: (it, i, r) => { if (r.final) { upto = i + 1; redraw(); } },
    onDone: run => {
      mode = 'explore';
      const box = run.explore('Explore (not scored): change adoption, coverage, savings, and rework');
      const up = () => redraw();
      QK.slider(box, 'Adoption', 50, 100, 5, 85, v => v + '%', v => { X.adopt = v; up(); });
      QK.slider(box, 'Usage coverage', 50, 100, 5, 90, v => v + '%', v => { X.cov = v; up(); });
      QK.slider(box, 'Minutes saved per ticket', 0.5, 2, 0.5, 1, v => v.toFixed(1), v => { X.mins = v; up(); });
      QK.slider(box, 'Rework increase', 0, 10, 1, 1, v => v + ' points', v => { X.rw = v; up(); });
      QK.slider(box, 'Minutes per rework', 5, 30, 5, 10, v => v + ' min', v => { X.mpr = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Benefit Realization Calculator (illustrative data)', width / 2, 6);
  const p = mode === 'explore' ? X : D, m = calcModel(p), n = mode === 'explore' ? 5 : upto;
  const steps = [['Plan benefit', 0, m.plan], ['Adoption', m.plan, m.afterA], ['Coverage', m.afterA, m.afterC], ['Rework', m.afterC, m.real1], ['Realized', 0, m.real1]];
  const x0 = 30, x1 = width - (mode === 'explore' ? 170 : 20), yB = VIS_H - 30, top = 56, mx = Math.max(m.plan, 1) * 1.05;
  const Y = v => yB - v / mx * (yB - top), bw = (x1 - x0) / 5;
  stroke(80); strokeWeight(1); line(x0, yB, x1, yB); noStroke();
  textAlign(LEFT, TOP); textSize(11); fill(90);
  text('Year 1: tickets 120,000 · plan 100% adoption, 100% coverage, minutes saved at $30/hour, no rework', x0, 26);
  steps.forEach(([name, a, b], i) => {
    const cx = x0 + bw * i + bw / 2;
    fill(0); textSize(11); textAlign(CENTER, TOP); text(name, cx, yB + 4);
    if (i >= n) return;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    fill(i === 0 || i === 4 ? '#3949ab' : '#ef6c00'); rect(cx - bw * 0.32, Y(hi), bw * 0.64, Math.max(1, Y(lo) - Y(hi)));
    fill(0); textAlign(CENTER, BOTTOM); text((b < a ? '−' : '') + QK.usd(Math.abs(b - a), 0), cx, Y(hi) - 2);
  });
  if (mode === 'explore') {
    const rx = x1 + 14, pos = v => (v >= 0 ? 'Positive' : 'Negative'); textAlign(LEFT, TOP);
    [['Year 1 realized benefit', QK.usd(m.real1, 0), m.real1], ['3-year ROI', QK.pct(m.roi, 1), m.roi], ['NPV at 10%', QK.usd(m.npv, 0), m.npv]].forEach(([l, v, s], i) => {
      const y = 50 + i * 62; fill(0); textSize(11); text(l, rx, y); fill(s >= 0 ? '#2e7d32' : '#c62828'); textSize(16); text(v, rx, y + 14); textSize(11); text(pos(s), rx, y + 34);
    });
  }
}
