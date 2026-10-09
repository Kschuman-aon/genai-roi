// Retraining Cadence Tuner - interactive judging exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 322
//
// For six scenarios the learner recommends the retraining interval (1, 2, 3, 4, 6, or 12 months)
// with the lowest annual cost, then changes the four inputs and watches the six totals.

const KS = [1, 2, 3, 4, 6, 12];
// annual cost = (12 / k) x retraining cost + 12 x tickets x (decay x (k + 1) / 2 / 100) x cost per misroute
const annual = (s, k) => 12 / k * s.rc + 12 * s.tix * (s.decay * (k + 1) / 2 / 100) * s.mis;
const lowest = s => KS.reduce((b, k) => (annual(s, k) < annual(s, b) ? k : b), KS[0]);
const SC = [
  [10000, 6, 1.0, 3630, '4 months costs $28,890, which is $30 less than 3 months.'],
  [10000, 6, 1.0, 7260, 'Dearer retraining lengthens the interval, and 6 months costs $39,720, $60 less than 4.'],
  [10000, 6, 0.5, 3630, 'Slower decay lengthens the interval, and 6 months costs $19,860, $30 less than 4.'],
  [20000, 12, 1.0, 3630, 'Costly errors shorten the interval, and 2 months costs $64,980, against $72,120 at 3.'],
  [5000, 3, 1.0, 3630, 'Cheap errors lengthen the interval, and 6 months costs $13,560, against $15,330 at 12.'],
  [10000, 6, 2.0, 3630, 'Fast decay shortens the interval, and 3 months costs $43,320, $60 less than 2.']
].map(([tix, mis, decay, rc, why]) => ({ tix, mis, decay, rc, why }));
const U = n => QK.usd(n, 0);
const totals = (s, bars) => {
  const best = lowest(s), mx = Math.max(...KS.map(k => annual(s, k)));
  const bar = v => `<div style="background:#9fa8da;height:8px;width:${Math.round(v / mx * 100)}%"></div>`;
  return QK.table(['Interval', ...KS.map(k => k + (k === 1 ? ' month' : ' months'))],
    [['Annual total', ...KS.map(k => (k === best ? '<b>' + U(annual(s, k)) + ' ✔</b>' : U(annual(s, k))))]].concat(bars ? [['', ...KS.map(k => bar(annual(s, k)))]] : []));
};

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 322);
  new QK.Runner({
    box: UI.panel, items: SC, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative data; annual cost = retraining + cost of errors',
    question: () => 'Which retraining interval has the lowest annual cost?',
    controls: (s, ctl) => {
      const t = QK.E('div', '', QK.table(['Tickets per month', 'Cost per misroute', 'Decay (points a month)', 'Retraining cost'], [[QK.int(s.tix), U(s.mis), s.decay.toFixed(1), U(s.rc)]]) +
        '<i>Annual cost = (12 ÷ k) × retraining cost + 12 × tickets × decay × (k + 1) ÷ 2 ÷ 100 × cost per misroute.</i>');
      t.style.flexBasis = '100%'; ctl.append(t);
      return QK.choice(ctl, KS.map(k => ({ value: k, html: k + (k === 1 ? ' month' : ' months') }))).get;
    },
    judge: (s, v) => {
      const k = lowest(s);
      return { ok: v === k, okMsg: `${k} months at ${U(annual(s, k))}. ${s.why}${totals(s)}`, why: s.why, reveal: `${k} months at ${U(annual(s, k))}${totals(s)}` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the four quantities');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { tix: 10000, mis: 6, decay: 1.0, rc: 3630 };
      const up = () => {
        out.innerHTML = totals(S, true) + '<i>Totals at the two intervals nearest the lowest differ by a small share of the annual cost; those at 1 month and 12 months differ by a large share.</i>';
      };
      QK.slider(box, 'Tickets per month', 2500, 20000, 2500, 10000, QK.int, v => { S.tix = v; up(); });
      QK.slider(box, 'Cost per misrouted ticket', 3, 12, 3, 6, U, v => { S.mis = v; up(); });
      QK.slider(box, 'Decay', 0.5, 2.0, 0.5, 1.0, v => v.toFixed(1) + ' pts/month', v => { S.decay = v; up(); });
      QK.slider(box, 'Retraining cost', 3630, 10890, 3630, 3630, U, v => { S.rc = v; up(); });
      box.append(out);
      up();
    }
  });
});
