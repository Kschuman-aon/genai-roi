// Developer Productivity Index Builder - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 368
//
// Calculate four improvement ratios and the weighted developer productivity index for the
// 20-engineer team, then change the four current values and watch the points each adds.

const BASE = { lead: 72, review: 18, cfr: 15, thru: 80 };
const CUR = { lead: 54, review: 12, cfr: 12, thru: 92 };
const W = { lead: 0.30, review: 0.20, cfr: 0.30, thru: 0.20 };
const NAMES = { lead: 'Lead time (hours)', review: 'Review cycle time (hours)', cfr: 'Change failure rate (%)', thru: 'Throughput (points)' };
const ratio = (k, c) => (k === 'thru' ? c[k] / BASE[k] : BASE[k] / c[k]);
const pts = (k, c) => 100 * W[k] * (ratio(k, c) - 1);
const index = c => 100 * Object.keys(W).reduce((s, k) => s + W[k] * ratio(k, c), 0);
const lowThru = { ...CUR, thru: 76 };
const above = c => index(c) - 100;

const ITEMS = [
  { q: 'What improvement ratio does a fall in lead time from 72 to 54 hours give?', v: () => ratio('lead', CUR), tol: 0.01, dec: 2, why: 'Lower is better, so 72 ÷ 54 = 1.333.' },
  { q: 'What is the review cycle time ratio (baseline 18, current 12)?', v: () => ratio('review', CUR), tol: 0.01, dec: 2, why: '18 ÷ 12 = 1.5.' },
  { q: 'What is the change failure rate ratio (baseline 15, current 12)?', v: () => ratio('cfr', CUR), tol: 0.01, dec: 2, why: '15 ÷ 12 = 1.25.' },
  { q: 'What is the throughput ratio (baseline 80, current 92)?', v: () => ratio('thru', CUR), tol: 0.01, dec: 2, why: 'Higher is better, so 92 ÷ 80 = 1.15.' },
  { q: 'What is the developer productivity index?', v: () => index(CUR), tol: 0.1, dec: 1, why: '100 × (0.30 × 1.333 + 0.20 × 1.5 + 0.30 × 1.25 + 0.20 × 1.15) = 130.5.' },
  { q: 'What is the index if throughput falls to 76?', v: () => index(lowThru), tol: 0.1, dec: 1, why: 'The ratio 76 ÷ 80 = 0.95 contributes 19.0, and the index is 126.5.' },
  { q: 'How many index points above 100 does review cycle time contribute?', v: () => pts('review', CUR), tol: 0.1, dec: 1, why: '100 × 0.20 × (1.5 − 1) = 10.0.' },
  { q: 'What share of the 30.5 points above 100 comes from lead time? (percent)', v: () => pts('lead', CUR) / above(CUR) * 100, tol: 0.1, dec: 1, unit: '%', why: '100 × 0.30 × 0.333 = 10.0 points, and 10.0 ÷ 30.5 = 0.328.' }
];
const f = (v, it) => v.toFixed(it.dec) + (it.unit || '');

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 368);
  const tbl = QK.table(['Measure', 'Weight', 'Baseline', 'Current', 'Direction'], Object.keys(W).map(k =>
    [NAMES[k], Math.round(W[k] * 100) + '%', BASE[k], CUR[k], k === 'thru' ? 'higher is better' : 'lower is better']));
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data; index = 100 × Σ weight × ratio',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', tbl); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', it.unit ? { suffix: '%' } : {}).get;
    },
    judge: (it, v) => { const m = it.v(); return { ok: Math.abs(v - m) <= it.tol + 1e-9, okMsg: `${f(m, it)}. ${it.why}`, why: it.why, reveal: f(m, it) }; },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the four current values');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { ...CUR };
      const up = () => {
        const rows = Object.keys(W).map(k => [NAMES[k], ratio(k, S).toFixed(2), (pts(k, S) >= 0 ? '+' : '−') + Math.abs(pts(k, S)).toFixed(1)]);
        out.innerHTML = QK.table(['Component', 'Ratio', 'Points vs 100'], rows) + `<b>Index: ${index(S).toFixed(1)}</b><br><i>A component can fall below a ratio of 1 while the index stays above 100.</i>`;
      };
      QK.slider(box, 'Current lead time', 36, 96, 6, 54, v => v + ' hours', v => { S.lead = v; up(); });
      QK.slider(box, 'Current review cycle time', 6, 24, 2, 12, v => v + ' hours', v => { S.review = v; up(); });
      QK.slider(box, 'Current change failure rate', 6, 24, 3, 12, v => v + '%', v => { S.cfr = v; up(); });
      QK.slider(box, 'Current throughput', 60, 110, 2, 92, v => v + ' points', v => { S.thru = v; up(); });
      box.append(out);
      up();
    }
  });
});
