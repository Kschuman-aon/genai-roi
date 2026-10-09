// Unit Cost Metrics Calculator - p5.js
// CANVAS_HEIGHT: 460
//
// Calculate cost per ticket, per query and per user from the running example, telling
// fully loaded cost from fees only; then explore four inputs.

const VIS_H = 235, PANEL_H = 225;
const DATA = [['Tickets', 120000, 160000], ['Queries', 720000, 960000], ['Agents (users)', 40, 40], ['Total running cost', 30000, 35000], ['Token and platform fees', 18000, 22000]];
const ITEMS = [
  { q: 'What did each ticket cost to handle with the assistant in year 1?', v: 30000 / 120000, tol: 0.0005, dec: 4, hl: [[0, 1], [3, 1]], why: '30,000 ÷ 120,000.' },
  { q: 'What was the year 1 cost per query, fully loaded?', v: 30000 / 720000, tol: 0.0005, dec: 4, hl: [[1, 1], [3, 1]], why: '30,000 ÷ 720,000 = 0.04167, using total running cost.' },
  { q: 'What was the year 2 cost per query, fully loaded?', v: 35000 / 960000, tol: 0.0005, dec: 4, hl: [[1, 2], [3, 2]], why: '35,000 ÷ 960,000 = 0.03646.' },
  { q: 'What was the year 2 cost per query, fees only?', v: 22000 / 960000, tol: 0.0005, dec: 4, hl: [[1, 2], [4, 2]], why: '22,000 ÷ 960,000 = 0.02292; this leaves out maintenance and governance cost.' },
  { q: 'What was the year 2 cost per user (per agent per year), fully loaded?', v: 35000 / 40, tol: 1, dec: 0, hl: [[2, 2], [3, 2]], why: '35,000 ÷ 40.' }
];
let UI, runner, mode = 'challenge', hl = [], X = { tickets: 120000, qpt: 6, agents: 40, cost: 30000 };

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('A table of tickets, queries, agents and costs for two years, with the cells used by the current question highlighted; later three tiles show unit costs.');
  runner = new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 4, label: 'Correct on first attempt',
    note: 'Illustrative running example from the chapter',
    question: it => it.q,
    controls: (it, ctl) => QK.num(ctl, 'Answer:', { prefix: '$' }).get,
    onShow: it => { hl = it.hl; redraw(); },
    judge: (it, v) => ({ ok: Math.abs(v - it.v) <= it.tol, okMsg: QK.usd(it.v, it.dec) + '.', why: it.why, reveal: QK.usd(it.v, it.dec) }),
    onResult: () => {},
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): change the volume, the cost, and the number of agents');
      const up = () => redraw();
      QK.slider(box, 'Tickets', 80000, 240000, 20000, 120000, v => QK.int(v), v => { X.tickets = v; up(); });
      QK.slider(box, 'Queries per ticket', 2, 10, 1, 6, v => v, v => { X.qpt = v; up(); });
      QK.slider(box, 'Agents', 20, 80, 10, 40, v => v, v => { X.agents = v; up(); });
      QK.slider(box, 'Total running cost', 20000, 60000, 5000, 30000, v => QK.usd(v, 0), v => { X.cost = v; up(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Unit Cost Metrics Calculator (illustrative data)', width / 2, 6);
  if (mode === 'explore') {
    const q = X.tickets * X.qpt, tiles = [['Cost per ticket', X.cost / X.tickets, 4], ['Cost per query (fully loaded)', X.cost / q, 4], ['Cost per user per year', X.cost / X.agents, 0]];
    const w = (width - 60) / 3;
    tiles.forEach(([n, v, d], i) => { const x = 15 + i * (w + 15); fill('white'); stroke('#cbd5e1'); rect(x, 50, w, 100, 6); noStroke(); fill(90); textSize(12); textAlign(CENTER, TOP); text(n, x + w / 2, 62); fill('#1a237e'); textSize(24); text(QK.usd(v, d), x + w / 2, 94); });
    fill(80); textSize(12); text(`${QK.int(X.tickets)} tickets × ${X.qpt} = ${QK.int(q)} queries; ${X.agents} agents; running cost ${QK.usd(X.cost, 0)}`, width / 2, 170);
    text('Raising tickets lowers cost per ticket and per query but leaves cost per user unchanged.', width / 2, 192);
    return;
  }
  const c0 = 20, cw = [190, 120, 120], rh = 30, y0 = 40;
  textAlign(LEFT, CENTER); textSize(13);
  ['', 'Year 1', 'Year 2'].forEach((h, j) => { fill(57, 73, 171); rect(c0 + cw.slice(0, j).reduce((a, b) => a + b, 0), y0, cw[j], rh); fill(255); text(h, c0 + cw.slice(0, j).reduce((a, b) => a + b, 0) + 8, y0 + rh / 2); });
  DATA.forEach((row, i) => row.forEach((val, j) => {
    const x = c0 + cw.slice(0, j).reduce((a, b) => a + b, 0), y = y0 + rh * (i + 1), on = hl.some(h => h[0] === i && h[1] === j);
    fill(on ? '#fff59d' : 'white'); stroke('#cbd5e1'); rect(x, y, cw[j], rh); noStroke(); fill(0);
    text(j === 0 ? val : (i >= 3 ? QK.usd(val, 0) : QK.int(val)), x + 8, y + rh / 2);
  }));
}
