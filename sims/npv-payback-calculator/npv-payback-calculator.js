// NPV and Payback Calculator - p5.js
// CANVAS_HEIGHT: 475
//
// Calculate the net present value of the running-example cash flows at four discount
// rates and decide whether to accept; then explore rate and cash flows.

const VIS_H = 245, PANEL_H = 230;
const npv = (f, r) => f.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
function payback(f) {
  let cum = f[0];
  for (let t = 1; t < f.length; t++) { if (cum + f[t] >= 0) return t - 1 + (-cum) / f[t]; cum += f[t]; }
  return null;
}
function irr(f) {
  if (npv(f, 0) < 0) return null;
  let lo = 0, hi = 1; if (npv(f, hi) > 0) return Infinity;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (npv(f, m) > 0) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const BASE = [-60000, 30000, 45000, 45000];
const RATES = [
  { r: 10, why: '−60,000 + 30,000 ÷ 1.10 + 45,000 ÷ 1.21 + 45,000 ÷ 1.331 = 38,272, which is positive.' },
  { r: 20, why: '25,000 + 31,250 + 26,042 − 60,000 = 22,292, which is positive.' },
  { r: 40, why: '21,429 + 22,959 + 16,399 − 60,000 = 787; positive but close to zero, since the IRR is about 41%.' },
  { r: 50, why: '20,000 + 20,000 + 13,333 − 60,000 = −6,667, which is negative: the rate exceeds the IRR.' }
];
let UI, runner, mode = 'challenge', cur = null, revealed = false, F = BASE.slice(), rate = 10, inv = 60000, y1 = 30000, y23 = 45000;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('Bars show the cash flow in each year and, once revealed, its present value at the chosen discount rate.');
  runner = new QK.Runner({
    box: UI.panel, items: RATES, attempts: 2, mastery: 3, label: 'Correct on first attempt',
    note: 'Illustrative cash flows: −$60,000, +$30,000, +$45,000, +$45,000',
    question: r => `What is the NPV at a ${r.r}% discount rate, and should we accept?`,
    controls: (r, ctl) => {
      const n = QK.num(ctl, 'NPV:', { prefix: '$' }), c = QK.choice(ctl, ['Accept', 'Reject']);
      return () => { const v = n.get(), k = c.get(); return isNaN(v) || !k ? null : { v, k }; };
    },
    onShow: r => { cur = r; revealed = false; redraw(); },
    judge: (r, a) => {
      const m = npv(BASE, r.r / 100), dec = m >= 0 ? 'Accept' : 'Reject';
      return { ok: Math.abs(a.v - m) <= 5 && a.k === dec, okMsg: `NPV ${QK.usd(m, 0)}, ${dec}.`, why: r.why, reveal: `NPV ${QK.usd(m, 0)}, ${dec}` };
    },
    onResult: (r, i, res) => { if (res.final) { revealed = true; redraw(); } },
    onDone: run => {
      mode = 'explore';
      const box = run.explore('Explore (not scored): change the discount rate and the cash flows');
      const up = () => { F = [-inv, y1, y23, y23]; redraw(); };
      QK.slider(box, 'Discount rate', 0, 60, 5, 10, v => v + '%', v => { rate = v; up(); });
      QK.slider(box, 'Year 0 investment', 40000, 80000, 10000, 60000, v => QK.usd(v, 0), v => { inv = v; up(); });
      QK.slider(box, 'Year 1 net cash flow', 10000, 50000, 10000, 30000, v => QK.usd(v, 0), v => { y1 = v; up(); });
      QK.slider(box, 'Years 2 and 3 net cash flow (each)', 20000, 60000, 5000, 45000, v => QK.usd(v, 0), v => { y23 = v; up(); });
      up();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('NPV and Payback Calculator (illustrative data)', width / 2, 6);
  const flows = mode === 'explore' ? F : BASE, r = (mode === 'explore' ? rate : cur ? cur.r : 10) / 100;
  const show = mode === 'explore' || revealed, x0 = 50, x1 = width - 190, yZ = 140, scale = 65 / 80000;
  stroke(80); strokeWeight(1); line(x0, yZ, x1, yZ);
  const bw = (x1 - x0) / 4;
  flows.forEach((c, t) => {
    const cx = x0 + bw * t + bw / 2, pv = c / Math.pow(1 + r, t);
    noStroke(); fill(176, 190, 197); rect(cx - 42, c >= 0 ? yZ - c * scale : yZ, 40, Math.abs(c) * scale);
    if (show) { fill(c >= 0 ? '#2e7d32' : '#c62828'); rect(cx + 2, pv >= 0 ? yZ - pv * scale : yZ, 40, Math.abs(pv) * scale); }
    fill(0); textSize(11); textAlign(CENTER, TOP); text('Year ' + t, cx, VIS_H - 18);
    textAlign(CENTER, BOTTOM); fill(90); textSize(10); if (c >= 0) text(QK.usd(c, 0), cx - 22, yZ - c * scale - 2);
    if (show && pv >= 0) { fill('#1b5e20'); text(QK.usd(pv, 0), cx + 22, yZ - pv * scale - 2); }
    if (c < 0) { textAlign(CENTER, TOP); fill(90); text(QK.usd(c, 0), cx - 22, yZ + Math.abs(c) * scale + 2); if (show) { fill('#b71c1c'); text(QK.usd(pv, 0), cx + 22, yZ + Math.abs(pv) * scale + 2); } }
  });
  textAlign(LEFT, TOP); textSize(10); fill(176, 190, 197); rect(x0, 26, 10, 10); fill(90); text('cash flow', x0 + 14, 26);
  fill('#2e7d32'); rect(x0 + 80, 26, 10, 10); fill(90); text(`present value at ${(r * 100).toFixed(0)}%`, x0 + 94, 26);
  const rx = x1 + 14; textSize(12); fill(0);
  if (show) {
    const n = npv(flows, r); text('NPV', rx, 50); textSize(17); fill(n >= 0 ? '#2e7d32' : '#c62828'); text(QK.usd(n, 0), rx, 66);
    textSize(11); text(n >= 0 ? 'Positive: accept' : 'Negative: reject', rx, 90);
  } else { fill(90); textSize(11); text('NPV appears after you check', rx, 56); }
  if (mode === 'explore') {
    const pb = payback(flows), ir = irr(flows);
    fill(0); textSize(12); text('Payback', rx, 120); textSize(15); text(pb == null ? 'not within 3 years' : pb.toFixed(2) + ' years', rx, 136);
    textSize(12); text('IRR', rx, 165); textSize(15); text(ir == null ? 'below 0%' : ir === Infinity ? 'above 100%' : (ir * 100).toFixed(1) + '%', rx, 181);
  }
}
