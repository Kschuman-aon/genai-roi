// Semantic Cache Threshold Explorer - Chart.js
// CANVAS_HEIGHT: 495
//
// Recommend the lowest similarity threshold whose wrong answers stay within a
// stated tolerance. Four committed situations, then a tolerance slider.

const VIS_H = 290, PANEL_H = 205;
const TH = [0.98, 0.95, 0.92, 0.88, 0.85, 0.80];
const WRONG = [8, 64, 240, 800, 1800, 4320];
const SAVE = [17.60, 35.20, 52.80, 70.40, 88.00, 118.80];
const SIT = [
  { text: 'Medication-dose questions answered by a clinical assistant.', tol: 10, why: 'Only 0.98 stays at or below 10 (it gives 8); 0.95 gives 64.' },
  { text: 'Employee questions about a legal policy.', tol: 100, why: '0.95 gives 64, within 100; 0.92 gives 240 and exceeds it.' },
  { text: 'Internal IT help-desk answers.', tol: 1000, why: '0.88 gives 800, within 1,000; 0.85 gives 1,800 and exceeds it.' },
  { text: 'Brainstorming ideas for marketing copy.', tol: 5000, why: '0.80 gives 4,320, within 5,000, and it is the lowest threshold offered.' }
];
const pick = tol => { for (let i = TH.length - 1; i >= 0; i--) if (WRONG[i] <= tol) return i; return -1; };

let chart, runner, selIdx = -1, rightIdx = -1, graded = null, tol = 100, readout;

function colors() {
  return TH.map((t, i) => {
    if (i === rightIdx) return '#2e7d32';
    if (i === selIdx) return graded === 'bad' ? '#c62828' : '#3949ab';
    return '#9fa8da';
  });
}
function refresh() {
  chart.data.datasets[0].backgroundColor = colors();
  chart.data.datasets[2].data = TH.map(() => (tol >= 1 ? tol : null));
  chart.update('none');
}

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(VIS_H, PANEL_H);
  UI.vis.style.padding = '4px 6px';
  const cv = document.createElement('canvas');
  const holder = QK.E('div'); holder.style.cssText = 'position:relative;height:100%;width:100%'; holder.append(cv); UI.vis.append(holder);
  chart = new Chart(cv, {
    data: {
      labels: TH.map(t => t.toFixed(2)),
      datasets: [
        { type: 'bar', label: 'Extra saving per 100,000 requests (USD)', data: SAVE, backgroundColor: colors(), yAxisID: 'y', order: 3 },
        { type: 'line', label: 'Wrong answers per 100,000 (log scale)', data: WRONG, borderColor: '#c62828', backgroundColor: '#c62828', yAxisID: 'y2', order: 1, tension: 0, pointRadius: 5 },
        { type: 'line', label: 'Tolerance', data: TH.map(() => null), borderColor: '#2e7d32', borderDash: [6, 4], pointRadius: 0, yAxisID: 'y2', order: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { title: { display: true, text: 'Semantic Cache Threshold Explorer (synthetic, illustrative data)' }, legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { title: { display: true, text: 'Similarity threshold (lower = more cache hits)' } },
        y: { position: 'left', beginAtZero: true, title: { display: true, text: 'Extra saving (USD)' } },
        y2: { position: 'right', type: 'logarithmic', min: 1, max: 10000, grid: { drawOnChartArea: false }, title: { display: true, text: 'Wrong answers (log)' } }
      }
    }
  });
  runner = new QK.Runner({
    box: UI.panel, items: SIT, attempts: 1, mastery: 3, label: 'Correct',
    note: 'Extra saving = requests × extra hit rate × $0.00440',
    question: s => `${s.text} It tolerates ${QK.int(s.tol)} wrong cached answers per 100,000 requests. Which threshold do you recommend?`,
    controls: (s, ctl) => QK.choice(ctl, TH.map(t => t.toFixed(2)), { onChange: v => { selIdx = TH.findIndex(t => t.toFixed(2) === v); refresh(); } }).get,
    onShow: () => { selIdx = -1; rightIdx = -1; graded = null; tol = 0; refresh(); },
    judge: (s, v) => {
      const i = pick(s.tol);
      return { ok: TH[i].toFixed(2) === v, okMsg: `threshold ${TH[i].toFixed(2)} gives ${QK.int(WRONG[i])} wrong answers per 100,000 and saves ${QK.usd(SAVE[i])}.`, why: s.why, reveal: `threshold ${TH[i].toFixed(2)}` };
    },
    onResult: (s, i, r) => { rightIdx = pick(s.tol); graded = r.ok ? 'good' : 'bad'; tol = s.tol; refresh(); },
    onDone: r => {
      const box = r.explore('Explore (not scored): set a tolerance and see which threshold qualifies');
      selIdx = -1; rightIdx = -1; graded = null;
      readout = QK.E('div', 'qk-fb info'); readout.style.gridColumn = '1/-1';
      const upd = v => {
        tol = v; const i = pick(v); rightIdx = i;
        readout.innerHTML = i < 0 ? `Tolerance ${QK.int(v)}: <b>no semantic caching</b> — even 0.98 gives 8 wrong answers per 100,000.` : `Tolerance ${QK.int(v)}: threshold <b>${TH[i].toFixed(2)}</b> qualifies — ${QK.int(WRONG[i])} wrong answers per 100,000, extra saving ${QK.usd(SAVE[i])} per 100,000 requests.`;
        refresh();
      };
      QK.slider(box, 'Tolerance (wrong answers per 100,000)', 0, 5000, 100, 100, v => QK.int(v), upd);
      box.append(readout);
      upd(100);
    }
  });
});
