// SDLC Phase Savings Calculator - interactive calculator (Chart.js + shared quiz kit)
// CANVAS_HEIGHT: 492
//
// Calculate a phase's quarterly cost, the time value freed in it, and the gross, net, and realized
// net value across six SDLC phases for the 20-engineer team, then change two time effects, the
// debt cost, and the realization while a bar chart of freed time updates.

const TEAM = 675000, TOOL = 3000, DEBT = 9000, REAL = 0.30;
const PH = [['Requirements', 0.08, 0.08], ['Design', 0.12, 0.03], ['Coding', 0.30, 0.10], ['Testing', 0.20, 0.12], ['Deployment', 0.05, 0.30], ['Maintenance', 0.25, 0.05]]
  .map(([name, share, eff]) => ({ name, share, eff }));
const cost = p => TEAM * p.share;
const freedOf = (p, eff = p.eff) => cost(p) * eff;
const gross = (ov = {}) => PH.reduce((s, p) => s + freedOf(p, ov[p.name] != null ? ov[p.name] : p.eff), 0);
const D2 = n => QK.usd(n, 2);

const ITEMS = [
  { q: 'How much does the coding phase cost each quarter?', v: () => cost(PH[2]), tol: 1, fmt: D2, why: '675,000 × 0.30 = 202,500.' },
  { q: 'How much time value does the testing phase free each quarter?', v: () => freedOf(PH[3]), tol: 1, fmt: D2, why: '675,000 × 0.20 × 0.12 = 16,200.' },
  { q: 'How much time value does the deployment phase free each quarter?', v: () => freedOf(PH[4]), tol: 1, fmt: D2, why: '675,000 × 0.05 × 0.30 = 10,125.' },
  { q: 'What is the total gross time value freed across the six phases?', v: () => gross(), tol: 1, fmt: D2, why: '4,320 + 2,430 + 20,250 + 16,200 + 10,125 + 8,437.50 = 61,762.50.' },
  { q: 'What share of the quarterly cost is the gross time value? (percent)', v: () => gross() / TEAM * 100, tol: 0.1, fmt: v => v.toFixed(1) + '%', unit: '%', why: '61,762.50 ÷ 675,000 = 0.0915, shown to one decimal as 9.2%.' },
  { q: 'What is the net time value after the tool and debt costs?', v: () => gross() - TOOL - DEBT, tol: 1, fmt: D2, why: '61,762.50 − 3,000 − 9,000 = 49,762.50.' },
  { q: 'What share of the gross time value comes from coding and testing combined? (percent)', v: () => (freedOf(PH[2]) + freedOf(PH[3])) / gross() * 100, tol: 0.1, fmt: v => v.toFixed(1) + '%', unit: '%', why: '(20,250 + 16,200) ÷ 61,762.50 = 0.590.' },
  { q: 'What is the net value if only 30% of the gross is realized?', v: () => REAL * gross() - TOOL - DEBT, tol: 1, fmt: D2, why: '0.30 × 61,762.50 − 3,000 − 9,000 = 6,528.75.' }
];

let chart;
const setBars = (label, vals, color) => {
  const ds = chart.data.datasets[0];
  ds.label = label; ds.data = vals; ds.backgroundColor = color;
  chart.update('none');
};

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(200, 292);
  UI.vis.style.padding = '4px 6px';
  const holder = QK.E('div'); holder.style.cssText = 'position:relative;height:100%;width:100%';
  const cv = document.createElement('canvas'); holder.append(cv); UI.vis.append(holder);
  chart = new Chart(cv, {
    type: 'bar',
    data: { labels: PH.map(p => p.name), datasets: [{ label: 'Quarterly phase cost ($)', data: PH.map(cost), backgroundColor: '#7986cb' }] },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { title: { display: true, text: 'Baseline Quarterly Cost by SDLC Phase (illustrative data)' }, legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v.toLocaleString('en-US') } } }
    }
  });
  const inputs = QK.table(['Phase', ...PH.map(p => p.name)], [
    ['Share of effort', ...PH.map(p => Math.round(p.share * 100) + '%')],
    ['Time effect', ...PH.map(p => Math.round(p.eff * 100) + '% less')]
  ]);
  const fixed = `<b>Fixed inputs:</b> 20 engineers × 450 hours × $75 = ${QK.usd(TEAM, 0)} a quarter; tool cost ${QK.usd(TOOL, 0)}; debt cost ${QK.usd(DEBT, 0)} a quarter.${inputs}`;
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', fixed); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', it.unit ? { suffix: '%' } : { prefix: '$' }).get;
    },
    judge: (it, v) => { const m = it.v(); return { ok: Math.abs(v - m) <= it.tol, okMsg: `${it.fmt(m)}. ${it.why}`, why: it.why, reveal: it.fmt(m) }; },
    onDone: run => {
      const box = run.explore('Explore (not scored): change two time effects, the debt cost, and the realization');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { Coding: 0.10, Testing: 0.12, debt: DEBT, real: 30 };
      const up = () => {
        const ov = { Coding: S.Coding, Testing: S.Testing };
        const g = gross(ov), net = g - TOOL - S.debt, rn = S.real / 100 * g - TOOL - S.debt;
        setBars('Time value freed ($)', PH.map(p => freedOf(p, ov[p.name] != null ? ov[p.name] : p.eff)), '#43a047');
        chart.options.plugins.title.text = 'Time Value Freed per Quarter by SDLC Phase (illustrative data)';
        chart.update('none');
        out.innerHTML = QK.table(['Gross time value', 'Net after tool and debt', `Net at ${S.real}% realization`], [[D2(g), D2(net), `<b>${D2(rn)}</b>`]]) +
          '<i>Realization moves the net far more than any single phase effect.</i>';
      };
      QK.slider(box, 'Coding time effect', 0, 30, 1, 10, v => v + '% less', v => { S.Coding = v / 100; up(); });
      QK.slider(box, 'Testing time effect', 0, 30, 1, 12, v => v + '% less', v => { S.Testing = v / 100; up(); });
      QK.slider(box, 'Debt cost per quarter', 0, 30000, 3000, 9000, v => QK.usd(v, 0), v => { S.debt = v; up(); });
      QK.slider(box, 'Realization', 0, 100, 10, 30, v => v + '%', v => { S.real = v; up(); });
      box.append(out);
      up();
    }
  });
});
