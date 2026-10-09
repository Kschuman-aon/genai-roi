// Fixed Versus Variable Break-Even Calculator - Chart.js
// CANVAS_HEIGHT: 520
//
// Calculate the monthly request volume at which a fixed-cost server and a per-request
// API cost the same (3 scenarios), then drag a volume marker to compare the two.

const VIS_H = 300, PANEL_H = 220, CAP = 5184000;
const SCEN = [
  { F: 2880, a: 0.0044, why: '2,880 ÷ 0.0044 = 654,545 requests.' },
  { F: 5760, a: 0.0044, why: 'Two servers double the fixed cost, so the break-even volume doubles: 5,760 ÷ 0.0044.' },
  { F: 2880, a: 0.0088, why: 'A pricier API halves the break-even volume: 2,880 ÷ 0.0088.' }
];
const be = (F, a) => Math.round(F / a);
const fixedCost = (F, v) => F * Math.max(1, Math.ceil(v / CAP));
let chart, runner, mode = 'challenge', S = { F: 2000, a: 0.004, v: 600000 }, readout;

function lines(F, a, xmax) {
  const fx = [], n = Math.ceil(xmax / CAP);
  for (let k = 0; k < n; k++) { fx.push({ x: k * CAP, y: F * (k + 1) }, { x: Math.min((k + 1) * CAP, xmax), y: F * (k + 1) }); }
  return { fx, api: [{ x: 0, y: 0 }, { x: xmax, y: a * xmax }] };
}
function plot(F, a, xmax, marker) {
  const d = chart.data.datasets;
  if (F == null) { d.forEach(s => { s.data = []; }); chart.options.scales.x.max = xmax; chart.options.scales.y.max = undefined; chart.update('none'); return; }
  const L = lines(F, a, xmax), b = be(F, a);
  d[0].data = L.fx; d[1].data = L.api; d[2].data = b <= xmax ? [{ x: b, y: F }] : [];
  d[3].data = marker == null ? [] : [{ x: marker, y: 0 }, { x: marker, y: Math.max(a * xmax, F * Math.ceil(xmax / CAP)) }];
  chart.options.scales.x.max = xmax;
  chart.options.scales.y.max = Math.max(F * Math.ceil(xmax / CAP), a * xmax) * 1.05;
  chart.update('none');
}

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(VIS_H, PANEL_H);
  UI.vis.style.padding = '4px 6px';
  const holder = QK.E('div'); holder.style.cssText = 'position:relative;height:100%;width:100%';
  const cv = document.createElement('canvas'); holder.append(cv); UI.vis.append(holder);
  const ds = (label, color, extra) => Object.assign({ type: 'scatter', label, data: [], showLine: true, borderColor: color, backgroundColor: color, borderWidth: 3, pointRadius: 0, tension: 0 }, extra);
  chart = new Chart(cv, {
    data: { datasets: [ds('Fixed server cost (steps up past capacity)', '#3949ab'), ds('API cost (per request × volume)', '#ef6c00'), ds('Break-even', '#2e7d32', { showLine: false, pointRadius: 8 }), ds('Volume marker', '#6d4c41', { borderDash: [5, 4], borderWidth: 2 })] },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { title: { display: true, text: 'Fixed Versus Variable Break-Even (illustrative data)' }, legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { type: 'linear', min: 0, max: 2000000, title: { display: true, text: 'Requests per month' }, ticks: { callback: v => (v / 1e6).toFixed(1) + 'M' } },
        y: { min: 0, title: { display: true, text: 'Monthly cost (USD)' }, ticks: { callback: v => '$' + v.toLocaleString('en-US') } }
      }
    }
  });
  plot(null, null, 2000000);
  runner = new QK.Runner({
    box: UI.panel, items: SCEN, attempts: 2, mastery: 3, label: 'Correct on first attempt',
    note: 'Illustrative: $2,880 = 720 h × $4.00; $0.0044 per request',
    question: s => `At what monthly volume does a ${QK.usd(s.F, 0)} server cost the same as an API at ${QK.usd(s.a, 4)} per request?`,
    controls: (s, ctl) => QK.num(ctl, 'Break-even volume:', { suffix: 'requests / month' }).get,
    onShow: () => plot(null, null, 2000000),
    judge: (s, v) => { const m = be(s.F, s.a); return { ok: Math.abs(v - m) <= 1000, okMsg: `break-even at ${QK.int(m)} requests per month.`, why: s.why, reveal: `${QK.int(m)} requests per month` }; },
    onResult: (s, i, r) => { if (r.final) plot(s.F, s.a, 2000000); },
    onDone: run => {
      mode = 'explore';
      const box = run.explore('Explore (not scored): change the two costs and drag the volume marker');
      readout = QK.E('div', 'qk-fb info'); readout.style.gridColumn = '1/-1';
      const up = () => {
        const b = be(S.F, S.a), fc = fixedCost(S.F, S.v), ac = S.a * S.v;
        readout.innerHTML = `Break-even: <b>${QK.int(b)}</b> requests/month (${(b / CAP * 100).toFixed(0)}% of one server's ${QK.int(CAP)}-request capacity). At ${QK.int(S.v)} requests: fixed ${QK.usd(fc, 0)} vs API ${QK.usd(ac, 0)} → <b>${fc <= ac ? 'fixed server' : 'API'}</b> is cheaper.`;
        plot(S.F, S.a, 6000000, S.v);
      };
      QK.slider(box, 'Fixed monthly cost', 1000, 12000, 1000, 2000, v => QK.usd(v, 0), v => { S.F = v; up(); });
      QK.slider(box, 'API cost per request', 0.001, 0.01, 0.001, 0.004, v => QK.usd(v, 4), v => { S.a = v; up(); });
      QK.slider(box, 'Monthly requests (marker)', 0, 6000000, 100000, 600000, v => QK.int(v), v => { S.v = v; up(); });
      box.append(readout);
      up();
    }
  });
});
