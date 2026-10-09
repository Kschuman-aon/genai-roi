// Sensitivity Tornado Ranker - Chart.js
// CANVAS_HEIGHT: 580
//
// Rank four adverse changes by how much they reduce the running-example NPV and predict
// the sign of a combined case. One scored commitment, a practice retry, then exploration.

const VIS_H = 250, PANEL_H = 330;
const BEN = [60000, 80000, 80000], RUN = [30000, 35000, 35000], INV = 60000;
const flows = (b, c, i) => [-INV * (1 + i), ...BEN.map((v, t) => v * (1 + b) - RUN[t] * (1 + c))];
const npv = (f, r) => f.reduce((s, v, t) => s + v / Math.pow(1 + r, t), 0);
function irr(f) {
  let lo = -0.5, hi = 5; if (npv(f, lo) * npv(f, hi) > 0) return null;
  for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; if (npv(f, lo) * npv(f, m) <= 0) hi = m; else lo = m; }
  return (lo + hi) / 2;
}
const BASE = npv(flows(0, 0, 0), 0.10);
const CH = [
  { id: 'rate', label: 'Discount rate 5 points higher (15%)', n: npv(flows(0, 0, 0), 0.15), rank: 4, why: 'Discounting shrinks later cash flows, but 5 points changes them by less than a 20% change in the cash lines.' },
  { id: 'inv', label: 'Investment 20% higher', n: npv(flows(0, 0, 0.2), 0.10), rank: 3, why: 'The investment is paid at year 0 and is not discounted, but it is the smallest line.' },
  { id: 'ben', label: 'Benefits 20% lower', n: npv(flows(-0.2, 0, 0), 0.10), rank: 1, why: 'Benefits are the largest cash line, so a 20% change moves the NPV most.' },
  { id: 'cost', label: 'Running costs 20% higher', n: npv(flows(0, 0.2, 0), 0.10), rank: 2, why: 'Running costs are smaller than benefits, so the same percentage moves the NPV less.' }
];
const COMBO = npv(flows(-0.2, 0, 0), 0.15);
let chart, order = CH.map(c => c.id), part2 = null, scored = false, committed = false;
let S = { b: 0, c: 0, i: 0, r: 10 };

function barColors(neg) { return neg.map(v => (v < 0 ? '#c62828' : '#2e7d32')); }
function showBase() {
  chart.data.labels = ['Base NPV at 10%'];
  chart.data.datasets[0].data = [BASE]; chart.data.datasets[0].backgroundColor = ['#3949ab'];
  chart.options.plugins.title.text = `Base NPV ${QK.usd(BASE, 0)}. Rank the four adverse changes, then Commit.`;
  chart.update('none');
}
function showTornado() {
  const s = CH.slice().sort((a, b) => a.rank - b.rank);
  chart.data.labels = s.map(c => c.label);
  chart.data.datasets[0].data = s.map(c => BASE - c.n); chart.data.datasets[0].backgroundColor = s.map(() => '#c62828');
  chart.options.plugins.title.text = `NPV reduction from the base ${QK.usd(BASE, 0)} (largest first)`;
  chart.update('none');
}
function showScenario() {
  const f = flows(S.b / 100, S.c / 100, S.i / 100), n = npv(f, S.r / 100);
  chart.data.labels = ['Base NPV', 'Your scenario'];
  chart.data.datasets[0].data = [BASE, n]; chart.data.datasets[0].backgroundColor = ['#3949ab', n >= 0 ? '#2e7d32' : '#c62828'];
  chart.options.plugins.title.text = 'Base NPV against your scenario';
  chart.update('none');
  return { n, ir: irr(f) };
}

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(VIS_H, PANEL_H), E = QK.E;
  UI.vis.style.padding = '4px 6px';
  const holder = E('div'); holder.style.cssText = 'position:relative;height:100%;width:100%';
  const cv = document.createElement('canvas'); holder.append(cv); UI.vis.append(holder);
  chart = new Chart(cv, {
    type: 'bar', data: { labels: [], datasets: [{ label: 'USD', data: [], backgroundColor: [] }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { legend: { display: false }, title: { display: true, text: '' } },
      scales: { x: { ticks: { callback: v => '$' + v.toLocaleString('en-US') } } } }
  });
  showBase();

  const P = UI.panel;
  const head = E('div', 'qk-head'), score = E('span', 'qk-score', 'Commit once for the scored result'), note = E('span', 'qk-note', 'Illustrative running example: base NPV at 10%');
  head.append(score, note);
  const q = E('div', 'qk-q', 'Which change hurts the NPV most? Rank them (most damaging first), then predict the sign of the combined case.');
  const rank = E('div'), combo = E('div', 'qk-ctl'), btns = E('div', 'qk-btns'), fb = E('div', 'qk-fb'), explore = E('div');
  const commitB = E('button', '', 'Commit'), retryB = E('button', 'alt', 'Retry (practice, not scored)');
  retryB.style.display = 'none'; btns.append(commitB, retryB);
  P.append(head, q, rank, combo, btns, fb, explore);

  function drawRank() {
    rank.innerHTML = '';
    order.forEach((id, k) => {
      const c = CH.find(x => x.id === id), row = E('div', 'qk-ctl');
      row.style.margin = '1px 0';
      const lab = E('span', '', `<b>${k + 1}.</b> ${c.label}`); lab.style.flex = '1';
      const up = E('button', 'alt', '▲'), dn = E('button', 'alt', '▼');
      up.disabled = k === 0 || committed; dn.disabled = k === order.length - 1 || committed;
      up.setAttribute('aria-label', 'Move up'); dn.setAttribute('aria-label', 'Move down');
      up.onclick = () => { [order[k - 1], order[k]] = [order[k], order[k - 1]]; drawRank(); };
      dn.onclick = () => { [order[k + 1], order[k]] = [order[k], order[k + 1]]; drawRank(); };
      row.append(lab, up, dn); rank.append(row);
    });
  }
  function drawCombo() {
    combo.innerHTML = '';
    combo.append(E('span', '', '<b>Combined case:</b> benefits 20% lower at a 15% discount rate. The NPV will be:'));
    const ch = QK.choice(combo, ['Positive', 'Negative'], { onChange: v => { part2 = v; } });
    if (part2) ch.set(part2);
  }
  function reset(practice) {
    order = CH.map(c => c.id); part2 = null; committed = false;
    rank.style.display = ''; combo.style.display = ''; commitB.style.display = ''; retryB.style.display = 'none';
    fb.className = 'qk-fb'; fb.innerHTML = ''; explore.innerHTML = '';
    q.style.display = ''; drawRank(); drawCombo(); showBase();
    if (practice) { score.textContent = 'Practice retry (the scored result is kept)'; }
  }
  commitB.onclick = () => {
    if (!part2) { fb.className = 'qk-fb info'; fb.textContent = 'Predict the sign of the combined case first.'; return; }
    const wrong = order.filter((id, k) => CH.find(c => c.id === id).rank !== k + 1);
    const ok1 = wrong.length === 0, ok2 = part2 === 'Negative';
    committed = true;
    const first = !scored; scored = true;
    let html = `<b>Part 1: ${ok1 ? 'correct' : 'incorrect'}; part 2: ${ok2 ? 'correct' : 'incorrect'}.</b>` + (first ? (ok1 && ok2 ? ' Mastery shown on the first attempt.' : '') : ' (practice; the first attempt is the scored one)');
    html += '<ul style="margin:3px 0 0 16px;padding:0">';
    if (ok1) html += '<li>Correct order: ' + CH.slice().sort((a, b) => a.rank - b.rank).map(c => `${c.label} (−${QK.usd(BASE - c.n, 0)})`).join(', ') + '.</li>';
    else wrong.forEach(id => { const c = CH.find(x => x.id === id); html += `<li><b>${c.label}</b> belongs at rank ${c.rank} (−${QK.usd(BASE - c.n, 0)}). ${c.why}</li>`; });
    html += `<li>Combined case: NPV <b>${QK.usd(COMBO, 0)}</b> (${COMBO >= 0 ? 'Positive' : 'Negative'}). Benefits and costs move the NPV in opposite directions, and benefits dominate.</li></ul>`;
    fb.className = 'qk-fb ' + (ok1 && ok2 ? 'ok' : 'bad'); fb.innerHTML = html;
    if (first) score.textContent = `First attempt — part 1: ${ok1 ? 'correct' : 'incorrect'}; part 2: ${ok2 ? 'correct' : 'incorrect'}`;
    rank.style.display = 'none'; combo.style.display = 'none'; commitB.style.display = 'none'; retryB.style.display = ''; q.style.display = 'none';
    showTornado();
    buildExplore();
  };
  retryB.onclick = () => reset(true);

  function buildExplore() {
    explore.innerHTML = '';
    const t = E('div', 'qk-q', 'Explore (not scored): change the four quantities'); t.style.marginTop = '6px';
    const grid = E('div', 'qk-grid'), out = E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
    const up = () => { const r = showScenario(); out.innerHTML = `NPV <b>${QK.usd(r.n, 0)}</b> (${r.n >= 0 ? 'Positive' : 'Negative'}); IRR ${r.ir == null ? 'not defined' : (r.ir * 100).toFixed(1) + '%'}.`; };
    S = { b: 0, c: 0, i: 0, r: 10 };
    QK.slider(grid, 'Benefit change', -40, 40, 10, 0, v => (v > 0 ? '+' : '') + v + '%', v => { S.b = v; up(); });
    QK.slider(grid, 'Running cost change', -40, 40, 10, 0, v => (v > 0 ? '+' : '') + v + '%', v => { S.c = v; up(); });
    QK.slider(grid, 'Investment change', -40, 40, 10, 0, v => (v > 0 ? '+' : '') + v + '%', v => { S.i = v; up(); });
    QK.slider(grid, 'Discount rate', 5, 30, 5, 10, v => v + '%', v => { S.r = v; up(); });
    grid.append(out); explore.append(t, grid);
  }
  drawRank(); drawCombo();
});
