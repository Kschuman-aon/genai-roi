// Speed Versus Quality Check - p5.js
// CANVAS_HEIGHT: 470
//
// Judge eight time-saving claims: report as stated, or restate net of rework when
// rework minutes exceed 25% of the claimed saving. Then explore three quantities.

const VIS_H = 235, PANEL_H = 235;
const CLAIMS = [
  { s: 1.0, r: 1, m: 10, why: 'Rework takes 10% of the saving, at or below 25%.' },
  { s: 1.0, r: 5, m: 10, why: 'Half the saving is consumed by rework, which is above 25%.' },
  { s: 2.0, r: 4, m: 15, why: 'The rework rate rise looks small, but 15 minutes per rework makes it 30% of the saving.' },
  { s: 3.0, r: 10, m: 20, why: 'A large saving can still be two-thirds consumed by costly rework.' },
  { s: 1.5, r: 2, m: 10, why: 'Rework takes 13.3% of the saving, below 25%.' },
  { s: 0.5, r: 3, m: 10, why: 'A small saving is easily consumed by a modest rework increase.' },
  { s: 4.0, r: 10, m: 10, why: 'The share is exactly 25%, and the rule restates only above 25%.' },
  { s: 1.0, r: 10, m: 10, why: 'Rework consumes the entire saving, so the net saving is zero.' }
];
const calc = (s, r, m) => { const rw = r / 100 * m, share = rw / s; return { rw, share, net: s - rw, verdict: share <= 0.25 + 1e-9 ? 'Report as stated' : 'Restate net of rework' }; };
let UI, runner, mode = 'challenge', cur = null, revealed = false, X = { s: 1.0, r: 1, m: 10 };

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A bar shows the claimed time saving per ticket; once revealed, the part consumed by rework is drawn against a 25 percent marker.');
  runner = new QK.Runner({
    box: UI.panel, items: CLAIMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative claims; rule: restate when rework > 25% of the saving',
    question: () => 'Can this time saving be reported as stated?',
    controls: (c, ctl) => QK.choice(ctl, ['Report as stated', 'Restate net of rework']).get,
    onShow: c => { cur = c; revealed = false; redraw(); },
    judge: (c, a) => { const x = calc(c.s, c.r, c.m); return { ok: a === x.verdict, okMsg: `${x.verdict}; net saving ${x.net.toFixed(2)} minutes.`, why: c.why, reveal: x.verdict }; },
    onResult: (c, i, r) => { if (r.final) { revealed = true; redraw(); } },
    onDone: run => {
      mode = 'explore';
      const box = run.explore('Explore (not scored): change the claimed saving, the rework rise, and the cost of each rework');
      const up = () => redraw();
      QK.slider(box, 'Claimed saving', 0.5, 4, 0.5, 1, v => v.toFixed(1) + ' min', v => { X.s = v; up(); });
      QK.slider(box, 'Rework increase', 0, 10, 1, 1, v => v + ' points', v => { X.r = v; up(); });
      QK.slider(box, 'Minutes per rework', 5, 30, 5, 10, v => v + ' min', v => { X.m = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Speed Versus Quality Check (illustrative data)', width / 2, 6);
  const c = mode === 'explore' ? X : cur; if (!c) return;
  const x = calc(c.s, c.r, c.m), show = mode === 'explore' || revealed;
  textAlign(LEFT, TOP); textSize(13); fill(0);
  text(`Claimed saving: ${c.s.toFixed(1)} min per assisted ticket`, 20, 34);
  text(`Rework increase: ${c.r} percentage point${c.r === 1 ? '' : 's'}`, 20, 54);
  text(`Minutes per rework: ${c.m}`, 20, 74);
  const x0 = 20, L = width - 40, y = 118, h = 40;
  fill('#3949ab'); rect(x0, y, L, h); fill(255); textAlign(CENTER, CENTER); text(`claimed saving ${c.s.toFixed(1)} min`, x0 + L / 2, y + h / 2);
  stroke('#2e7d32'); strokeWeight(2); line(x0 + L * 0.25, y - 8, x0 + L * 0.25, y + h + 8); noStroke(); fill('#2e7d32'); textSize(11); textAlign(CENTER, TOP); text('25% of saving', x0 + L * 0.25, y + h + 10);
  if (!show) { fill(80); textSize(12); textAlign(LEFT, TOP); text('The rework share is drawn after you decide.', 20, y + h + 34); return; }
  const rw = Math.min(1, x.share) * L, col = x.verdict === 'Report as stated' ? '#2e7d32' : '#c62828';
  fill(239, 108, 0); rect(x0, y, rw, h); fill(255); textSize(12); textAlign(LEFT, CENTER); if (rw > 70) text(`rework ${x.rw.toFixed(2)} min`, x0 + 6, y + h / 2);
  fill(0); textAlign(LEFT, TOP); textSize(13);
  text(`Rework minutes per ticket = ${c.r} ÷ 100 × ${c.m} = ${x.rw.toFixed(2)}.  Share consumed = ${(x.share * 100).toFixed(1)}%.  Net saving = ${x.net.toFixed(2)} min.`, 20, y + h + 34);
  fill(col); textSize(14); text(x.verdict, 20, y + h + 58);
}
