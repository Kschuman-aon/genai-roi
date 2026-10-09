// Model Cascade Cost Calculator - p5.js
// CANVAS_HEIGHT: 470
//
// Calculate the monthly cost of a small-model-first cascade for a stated pass rate
// and decide whether it beats sending every request to the large model.

const VIS_H = 220, PANEL_H = 250;
const LARGE = 0.0044;
let P = { pass: 70, ratio: 10, reqs: 100000, chk: 0 };
const costs = (pass, ratio, reqs, chk) => {
  const small = LARGE / ratio;
  const per = small + chk + (1 - pass / 100) * LARGE;
  return { small, per, cascade: per * reqs, large: LARGE * reqs, breakEven: (small + chk) / LARGE };
};
const SCEN = [
  { pass: 70, sel: 'Cascade', why: '0.00044 + 0.30 × 0.00440 = $0.00176 per request, which is $176 per 100,000.' },
  { pass: 50, sel: 'All-large', why: '' },
  { pass: 10, sel: 'All-large', why: '0.00044 + 0.90 × 0.00440 = $0.00440, exactly the all-large cost, so the cascade adds complexity for no saving.' },
  { pass: 5, sel: 'All-large', why: '0.00044 + 0.95 × 0.00440 = $0.00462: failures pay for both models, so the cascade costs more.' }
];
SCEN[1].sel = 'Cascade'; SCEN[1].why = '0.00044 + 0.50 × 0.00440 = $0.00264 per request, which is $264.';

let UI, runner, mode = 'challenge', shown = null;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('Two bars compare the monthly cost of a small-model-first cascade with sending all requests to the large model.');
  runner = new QK.Runner({
    box: UI.panel, items: SCEN, attempts: 2, mastery: 3, label: 'Correct on first attempt',
    note: 'Illustrative price card: small $0.00044, large $0.00440 per request; 100,000 requests/month',
    question: s => `At a ${s.pass}% pass rate, what does the cascade cost per month, and is it cheaper than all-large?`,
    controls: (s, ctl) => {
      const n = QK.num(ctl, 'Cascade cost per month:', { prefix: '$' });
      const c = QK.choice(ctl, ['Cascade', 'All-large']);
      return () => { const v = n.get(), k = c.get(); return isNaN(v) || !k ? null : { v, k }; };
    },
    onShow: () => { shown = null; redraw(); },
    judge: (s, a) => {
      const c = costs(s.pass, 10, 100000, 0), cheaper = c.cascade < c.large - 1e-9 ? 'Cascade' : 'All-large';
      return { ok: Math.abs(a.v - c.cascade) <= 1 && a.k === cheaper, okMsg: `cascade ${QK.usd(c.cascade, 0)}, all-large ${QK.usd(c.large, 0)}, ${cheaper.toLowerCase()} is cheaper.`, why: s.why + ` (Cascade ${QK.usd(c.cascade, 0)} against all-large ${QK.usd(c.large, 0)}.)`, reveal: `cascade ${QK.usd(c.cascade, 0)}, ${cheaper.toLowerCase()} is cheaper` };
    },
    onResult: (s, i, r) => { if (r.final) { shown = s; redraw(); } },
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): change the pass rate, price ratio, volume and checker cost');
      const up = () => redraw();
      QK.slider(box, 'Pass rate (small model accepted)', 0, 100, 5, 70, v => v + '%', v => { P.pass = v; up(); });
      QK.slider(box, 'Large-to-small price ratio', 2, 20, 2, 10, v => v + '×', v => { P.ratio = v; up(); });
      QK.slider(box, 'Requests per month', 10000, 500000, 10000, 100000, v => QK.int(v), v => { P.reqs = v; up(); });
      QK.slider(box, 'Checker cost per request', 0, 0.001, 0.0001, 0, v => '$' + v.toFixed(4), v => { P.chk = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Model Cascade Cost Calculator (illustrative data)', width / 2, 6);
  let c, pass;
  if (mode === 'explore') { c = costs(P.pass, P.ratio, P.reqs, P.chk); pass = P.pass; }
  else if (shown) { c = costs(shown.pass, 10, 100000, 0); pass = shown.pass; }
  else { textSize(13); fill(80); textAlign(CENTER, CENTER); text('Both monthly costs appear after you check your answer.', width / 2, VIS_H / 2); return; }
  const x0 = 150, bw = width - x0 - 150, maxC = Math.max(c.cascade, c.large) * 1.05, y = [60, 130], h = 44;
  const W = v => v / maxC * bw;
  textAlign(RIGHT, CENTER); textSize(13); fill(0);
  text('All-large', x0 - 10, y[0] + h / 2); text(`Cascade (${pass}% pass)`, x0 - 10, y[1] + h / 2);
  fill('#c62828'); rect(x0, y[0], W(c.large), h);
  const smallPart = c.small * (mode === 'explore' ? P.reqs : 100000) + (mode === 'explore' ? P.chk * P.reqs : 0);
  fill('#3949ab'); rect(x0, y[1], W(smallPart), h);
  fill('#ef6c00'); rect(x0 + W(smallPart), y[1], W(c.cascade - smallPart), h);
  fill(0); textAlign(LEFT, CENTER);
  text(QK.usd(c.large, 0), x0 + W(c.large) + 8, y[0] + h / 2);
  text(QK.usd(c.cascade, 0), x0 + W(c.cascade) + 8, y[1] + h / 2);
  textSize(11); fill('#3949ab'); rect(x0, 190, 10, 10); fill(0); text('small model on every request (plus checker)', x0 + 14, 195);
  fill('#ef6c00'); rect(x0 + 270, 190, 10, 10); fill(0); text('large model on failed requests', x0 + 284, 195);
  if (mode === 'explore') { textSize(12); textAlign(RIGHT, TOP); fill(0); text(`Break-even pass rate: ${(c.breakEven * 100).toFixed(1)}%  —  cascade is ${c.cascade < c.large - 1e-9 ? 'cheaper' : 'not cheaper'}`, width - 10, 28); }
}
