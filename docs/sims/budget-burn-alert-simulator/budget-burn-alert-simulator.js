// Budget Burn Alert Simulator - p5.js
// CANVAS_HEIGHT: 470
//
// Calculate the day each of four cost alerts fires for a month with runaway daily
// spend, watch the month play, then explore with adjustable budget and spend.

const VIS_H = 260, PANEL_H = 210;
let M = { budget: 12000, norm: 330, run: 700, start: 10 };
const cum = d => M.norm * Math.min(d, M.start - 1) + M.run * Math.max(0, d - (M.start - 1));
const RULES = {
  forecast: { name: 'Forecast alert', f: d => cum(d) / d * 30 >= M.budget, color: '#ef6c00' },
  t50: { name: '50% threshold', f: d => cum(d) >= 0.5 * M.budget, color: '#3949ab' },
  t80: { name: '80% threshold', f: d => cum(d) >= 0.8 * M.budget, color: '#8e24aa' },
  t100: { name: '100% threshold', f: d => cum(d) >= M.budget, color: '#c62828' }
};
const fireDay = k => { for (let d = 1; d <= 30; d++) if (RULES[k].f(d)) return d; return null; };
const ITEMS = [
  { k: 'forecast', ask: 'the forecast alert (cumulative ÷ day × 30 ≥ budget)', why: 'Day 11 projects $11,918, below $12,000; day 12 projects $12,675, which is at or above it.' },
  { k: 't50', ask: 'the 50% threshold alert (cumulative ≥ $6,000)', why: 'Day 13 totals $5,770, below $6,000; day 14 totals $6,470.' },
  { k: 't80', ask: 'the 80% threshold alert (cumulative ≥ $9,600)', why: 'Day 18 totals $9,270, below $9,600; day 19 totals $9,970.' },
  { k: 't100', ask: 'the 100% threshold alert (cumulative ≥ $12,000)', why: 'Day 21 totals $11,370, below $12,000; day 22 totals $12,070.' }
];

let UI, runner, playDay = 0, timer = null, mode = 'challenge';

function play() { clearInterval(timer); playDay = 0; timer = setInterval(() => { playDay++; redraw(); if (playDay >= 30) clearInterval(timer); }, 110); }

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A 30-day cumulative spend chart against a $12,000 budget with 50, 80 and 100 percent thresholds and a month-end forecast alert.');
  runner = new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 4, label: 'Alerts correct',
    note: 'Synthetic data: $12,000 budget; $330/day on days 1–9, $700/day from day 10',
    question: it => `On which day does ${it.ask} fire?`,
    controls: (it, ctl) => { const n = QK.num(ctl, 'Day (1–30):'); return n.get; },
    judge: (it, d) => {
      const day = fireDay(it.k);
      return { ok: d === day, okMsg: `day ${day}, cumulative spend ${QK.usd(cum(day), 0)}.`, why: it.why, reveal: `day ${day}` };
    },
    onResult: () => play(),
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): change the budget and the spend pattern');
      const go = () => { clearInterval(timer); playDay = 30; redraw(); };
      QK.slider(box, 'Monthly budget', 6000, 24000, 1000, 12000, v => QK.usd(v, 0), v => { M.budget = v; go(); });
      QK.slider(box, 'Normal daily spend', 100, 600, 10, 330, v => QK.usd(v, 0), v => { M.norm = v; go(); });
      QK.slider(box, 'Runaway daily spend', 100, 1200, 100, 700, v => QK.usd(v, 0), v => { M.run = v; go(); });
      QK.slider(box, 'Runaway start day', 2, 28, 1, 10, v => 'day ' + v, v => { M.start = v; go(); });
      go();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  const x0 = 56, x1 = width - 190, yT = 40, yB = VIS_H - 26, ymax = Math.max(cum(30), M.budget) * 1.05;
  const X = d => x0 + (d - 1) / 29 * (x1 - x0), Y = v => yB - v / ymax * (yB - yT);
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Budget Burn Alert Simulator (synthetic data)', width / 2, 6);
  stroke(60); strokeWeight(1); line(x0, yT - 6, x0, yB); line(x0, yB, x1, yB);
  noStroke(); fill(60); textSize(10); textAlign(CENTER, TOP);
  [1, 5, 10, 15, 20, 25, 30].forEach(d => text(d, X(d), yB + 3));
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) { const v = ymax / 4 * i; text(QK.usd(v, 0), x0 - 4, Y(v)); }
  drawingContext.setLineDash([4, 4]); strokeWeight(1);
  [[0.5, '50%'], [0.8, '80%'], [1, 'Budget']].forEach(([f, l]) => { stroke(f === 1 ? '#c62828' : '#94a3b8'); line(x0, Y(f * M.budget), x1, Y(f * M.budget)); noStroke(); fill(90); textAlign(RIGHT, BOTTOM); text(l, x1 - 3, Y(f * M.budget) - 1); });
  drawingContext.setLineDash([]);
  const upto = playDay;
  if (upto >= 1) {
    noFill(); stroke('#1a237e'); strokeWeight(2); beginShape(); for (let d = 1; d <= upto; d++) vertex(X(d), Y(cum(d))); endShape();
    Object.keys(RULES).forEach((k, i) => {
      const d = fireDay(k);
      if (d && d <= upto) { stroke(RULES[k].color); strokeWeight(2); line(X(d), yT - 6, X(d), yB); noStroke(); fill(RULES[k].color); circle(X(d), Y(cum(d)), 8); }
    });
    noStroke(); fill(0); textAlign(LEFT, TOP); textSize(11);
    text(`Day ${upto}: spent ${QK.usd(cum(upto), 0)}`, x0 + 6, yT - 2);
    text(`Projected month-end: ${QK.usd(cum(upto) / upto * 30, 0)}`, x0 + 6, yT + 11);
  }
  textAlign(LEFT, TOP); textSize(11); let y = 56; const rx = x1 + 44 + 0;
  fill(0); text('Alert fires on', rx - 38, y - 14);
  Object.keys(RULES).forEach(k => {
    const d = fireDay(k), shown = d && d <= upto, show = mode === 'explore' || shown;
    fill(RULES[k].color); rect(rx - 38, y + 2, 8, 8);
    fill(0); text(RULES[k].name.replace(' alert', '').replace(' threshold', ''), rx - 26, y);
    fill(90); text(show ? (d ? `day ${d}` : 'does not fire') : '—', rx - 26, y + 13); y += 34;
  });
  if (mode === 'explore' || upto >= 30) { fill(0); textSize(11); text(`Month-end: ${QK.usd(cum(30), 0)}`, rx - 38, y + 4); text(cum(30) > M.budget ? `${QK.usd(cum(30) - M.budget, 0)} over budget` : 'within budget', rx - 38, y + 17); }
}
