// Prompt A/B Test Decision Lab - p5.js
// CANVAS_HEIGHT: 450
//
// Judge from a 95% interval for the quality difference whether to adopt, reject, or
// keep testing a shorter prompt (B) against a tolerance. Four results, then exploration.

const VIS_H = 250, PANEL_H = 200;
const sign1 = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1);
function analyze(n, pa, pb, tol) {
  const a = pa / 100, b = pb / 100, se = Math.sqrt(a * (1 - a) / n + b * (1 - b) / n) * 100;
  const diff = pb - pa, lo = diff - 1.96 * se, hi = diff + 1.96 * se;
  const dec = lo >= -tol ? 'Adopt B' : hi < -tol ? 'Reject B' : 'Keep testing';
  return { n, diff, se, lo, hi, dec, tol };
}
const RESULTS = [
  { n: 2000, pa: 82, pb: 81, why: 'The interval straddles −3, so the data cannot show B is within tolerance or outside it.' },
  { n: 3000, pa: 82, pb: 81.5, why: 'The whole interval is at or above −3, so B is within tolerance and saves 18% of tokens.' },
  { n: 3000, pa: 82, pb: 76, why: 'The whole interval is below −3, so the quality loss clearly exceeds the tolerance.' },
  { n: 3000, pa: 80, pb: 85, why: 'The whole interval is above −3; B is both cheaper and better.' }
];
let UI, runner, mode = 'challenge', cur = null, revealed = false, E = { n: 2000, pa: 82, pb: 81, tol: 3 };

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A number line of the quality difference between prompt B and prompt A with a 95 percent interval and a tolerance line at minus three points.');
  runner = new QK.Runner({
    box: UI.panel, items: RESULTS, attempts: 1, mastery: 3, label: 'Correct',
    note: 'Synthetic data; B uses 18% fewer tokens than A; tolerance 3 points',
    question: r => { const d = r.pb - r.pa; return `B saves 18% of tokens and resolved ${Math.abs(d)} point${Math.abs(d) === 1 ? '' : 's'} ${d < 0 ? 'fewer' : 'more'} tickets (A ${r.pa}%, B ${r.pb}%, ${QK.int(r.n)} requests each). Adopt, reject, or keep testing?`; },
    controls: (r, ctl) => QK.choice(ctl, ['Adopt B', 'Reject B', 'Keep testing']).get,
    onShow: r => { cur = r; revealed = false; redraw(); },
    judge: (r, a) => { const x = analyze(r.n, r.pa, r.pb, 3); return { ok: a === x.dec, okMsg: `${x.dec}. Interval ${sign1(x.lo)} to ${sign1(x.hi)}.`, why: `${r.why} Interval ${sign1(x.lo)} to ${sign1(x.hi)} against −3.`, reveal: x.dec }; },
    onResult: () => { revealed = true; redraw(); },
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): change the test size, the rates, and the tolerance');
      const up = () => redraw();
      QK.slider(box, 'Requests per variant', 500, 5000, 500, 2000, v => QK.int(v), v => { E.n = v; up(); });
      QK.slider(box, 'A resolution rate', 50, 95, 1, 82, v => v + '%', v => { E.pa = v; up(); });
      QK.slider(box, 'B resolution rate', 50, 95, 1, 81, v => v + '%', v => { E.pb = v; up(); });
      QK.slider(box, 'Tolerance', 1, 5, 1, 3, v => v + ' points', v => { E.tol = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Prompt A/B Test Decision Lab (synthetic data)', width / 2, 6);
  let x = null;
  if (mode === 'explore') x = analyze(E.n, E.pa, E.pb, E.tol);
  else if (revealed && cur) x = analyze(cur.n, cur.pa, cur.pb, 3);
  const tol = mode === 'explore' ? E.tol : 3;
  const lo = x ? Math.min(-10, Math.floor(x.lo - 2)) : -10, hi = x ? Math.max(8, Math.ceil(x.hi + 2)) : 8;
  const x0 = 30, x1 = width - 30, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0), yA = 150;
  fill(255, 205, 210, 150); rect(x0, 60, X(-tol) - x0, yA - 60 + 30);
  fill(200, 230, 201, 170); rect(X(-tol), 60, x1 - X(-tol), yA - 60 + 30);
  fill(120); textSize(11); textAlign(CENTER, TOP);
  text('quality loss beyond tolerance', (x0 + X(-tol)) / 2, 66); text('within tolerance or better', (X(-tol) + x1) / 2, 66);
  stroke(60); strokeWeight(1); line(x0, yA + 30, x1, yA + 30);
  noStroke(); fill(60); textSize(10);
  for (let v = Math.ceil(lo / 2) * 2; v <= hi; v += 2) { stroke(60); line(X(v), yA + 30, X(v), yA + 34); noStroke(); text(v, X(v), yA + 36); }
  text('B − A resolution rate (percentage points)', (x0 + x1) / 2, yA + 52);
  stroke('#c62828'); strokeWeight(2); drawingContext.setLineDash([5, 4]); line(X(-tol), 80, X(-tol), yA + 30); drawingContext.setLineDash([]);
  noStroke(); fill('#c62828'); textSize(11); text(`tolerance −${tol}`, X(-tol), 82);
  stroke(120); strokeWeight(1); line(X(0), 100, X(0), yA + 30);
  if (!x) { noStroke(); fill(80); textSize(13); textAlign(CENTER, CENTER); text('The interval is drawn after you decide.', width / 2, yA - 10); return; }
  const col = x.dec === 'Adopt B' ? '#2e7d32' : x.dec === 'Reject B' ? '#c62828' : '#ef6c00';
  stroke(col); strokeWeight(6); line(X(x.lo), yA, X(x.hi), yA); strokeWeight(2); line(X(x.lo), yA - 10, X(x.lo), yA + 10); line(X(x.hi), yA - 10, X(x.hi), yA + 10);
  noStroke(); fill(0); circle(X(x.diff), yA, 11);
  textSize(12); textAlign(CENTER, BOTTOM); fill(0);
  text(`${sign1(x.diff)}`, X(x.diff), yA - 12);
  textAlign(CENTER, TOP); fill(col); textSize(13);
  text(`95% interval ${sign1(x.lo)} to ${sign1(x.hi)}  →  ${x.dec}`, width / 2, 28);
  if (mode === 'explore') { fill(90); textSize(11); text(`standard error ${x.se.toFixed(2)} points`, width / 2, 44); }
}
