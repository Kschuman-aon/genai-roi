// Cost Per Task Benchmark Explorer - p5.js
// CANVAS_HEIGHT: 445
//
// Compare cost per completed task of a small and a large model, including human review
// of rejected answers, at four review costs; then explore acceptance rates.

const VIS_H = 235, PANEL_H = 210;
const LARGE_ATT = 0.0044, SMALL_ATT = 0.00044;
let P = { review: 2.00, accS: 75, accL: 90 };
const per = (att, acc, rev) => att + (1 - acc / 100) * rev;
const REVIEWS = [
  { r: 2.00, why: "Review dominates: the small model's extra 15% of rejections cost $0.30 in review, far more than its $0.00396 attempt saving." },
  { r: 0.10, why: '0.25 × $0.10 = $0.025 exceeds 0.10 × $0.10 = $0.010 by more than the $0.00396 attempt saving.' },
  { r: 0.02, why: 'At $0.02, the extra rejections cost $0.003, less than the $0.00396 attempt saving.' },
  { r: 0.0264, why: 'Exactly the break-even review cost; the costs are equal, so the large model\'s higher quality wins the tie.' }
];
let UI, runner, mode = 'challenge', shown = null;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('Stacked bars compare the attempt cost and human review cost per task of a small and a large model.');
  runner = new QK.Runner({
    box: UI.panel, items: REVIEWS, attempts: 1, mastery: 3, label: 'Correct',
    note: 'Illustrative: large $0.0044 at 90% acceptance; small $0.00044 at 75%',
    question: r => `A rejected answer costs ${r.r === 0.0264 ? '$0.0264' : QK.usd(r.r)} to fix. Which model is cheaper per task?`,
    controls: (r, ctl) => QK.choice(ctl, ['Small model', 'Large model']).get,
    onShow: () => { shown = null; redraw(); },
    judge: (r, a) => {
      const s = per(SMALL_ATT, 75, r.r), l = per(LARGE_ATT, 90, r.r), right = s < l - 1e-9 ? 'Small model' : 'Large model';
      const c = right === 'Small model' ? s : l;
      return { ok: a === right, okMsg: `${right} costs ${QK.usd(c, 5)} per task.`, why: `${r.why} (Small ${QK.usd(s, 5)}, large ${QK.usd(l, 5)} per task.)`, reveal: right };
    },
    onResult: (r) => { shown = r.r; redraw(); },
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): change the review cost and the acceptance rates');
      const up = () => redraw();
      QK.slider(box, 'Review cost per rejected answer', 0, 2, 0.01, 2, v => QK.usd(v), v => { P.review = v; up(); });
      QK.slider(box, 'Small model acceptance', 50, 95, 5, 75, v => v + '%', v => { P.accS = v; up(); });
      QK.slider(box, 'Large model acceptance', 70, 99, 1, 90, v => v + '%', v => { P.accL = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Cost Per Task Benchmark Explorer (illustrative data)', width / 2, 6);
  const accS = mode === 'explore' ? P.accS : 75, accL = mode === 'explore' ? P.accL : 90;
  const rev = mode === 'explore' ? P.review : shown;
  const x0 = 120, bw = width - x0 - 130, M = [['Small model', SMALL_ATT, accS], ['Large model', LARGE_ATT, accL]];
  textAlign(RIGHT, TOP); textSize(12);
  M.forEach(([n, att, acc], i) => { const y = 44 + i * 66; fill(0); textAlign(RIGHT, TOP); text(n, x0 - 8, y + 4); fill(90); textSize(10); text(`attempt ${QK.usd(att, 5)}`, x0 - 8, y + 20); text(`${acc}% accepted`, x0 - 8, y + 32); textSize(12); });
  if (rev == null) { fill(80); textSize(13); textAlign(CENTER, CENTER); text('Cost per task appears after you choose.', width / 2 + 40, VIS_H / 2 + 6); return; }
  const tot = M.map(([n, att, acc]) => per(att, acc, rev)), maxT = Math.max(...tot) * 1.02;
  M.forEach(([n, att, acc], i) => {
    const y = 44 + i * 66, wa = att / maxT * bw, wr = (1 - acc / 100) * rev / maxT * bw;
    fill('#3949ab'); rect(x0, y, wa, 40); fill('#ef6c00'); rect(x0 + wa, y, wr, 40);
    fill(0); textAlign(LEFT, CENTER); textSize(12); text(QK.usd(tot[i], 5), x0 + wa + wr + 6, y + 20);
  });
  textSize(11); fill('#3949ab'); rect(x0, VIS_H - 56, 10, 10); fill(0); textAlign(LEFT, TOP); text('attempt cost', x0 + 14, VIS_H - 57);
  fill('#ef6c00'); rect(x0 + 100, VIS_H - 56, 10, 10); fill(0); text('expected human review of rejected answers', x0 + 114, VIS_H - 57);
  const gap = (1 - accS / 100) - (1 - accL / 100);
  if (mode === 'explore') {
    fill(0); textSize(12);
    text(gap > 0 ? `Break-even review cost: ${QK.usd((LARGE_ATT - SMALL_ATT) / gap, 4)} — above it the large model is cheaper per task.` : 'Small model acceptance ≥ large: the small model is cheaper at every review cost.', x0, VIS_H - 36);
    const win = tot[0] < tot[1] - 1e-9 ? 'Small model' : 'Large model';
    textAlign(CENTER, TOP); fill('#1a237e'); textSize(12); text(`Cheaper per task: ${win}`, width / 2, 26);
  }
}
