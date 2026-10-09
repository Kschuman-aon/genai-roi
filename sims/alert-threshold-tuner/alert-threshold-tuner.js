// Alert Threshold Tuner - interactive judging exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 300
//
// Recommend the smallest threshold multiplier (2, 2.5, 3, 3.5, or 4 SD) that keeps expected false
// alerts per week at or below a limit, then change the series count and the multiplier.

const KS = [2, 2.5, 3, 3.5, 4];
const P = { 2: 0.02275, 2.5: 0.00621, 3: 0.00135, 3.5: 0.000233, 4: 0.0000317 };
const expected = (series, k) => series * 7 * P[k];
const best = (series, limit) => KS.find(k => expected(series, k) <= limit);
const SC = [
  [20, 2, 'k = 2 gives 3.19, above the limit, and k = 2.5 gives 0.87.'],
  [200, 2, 'k = 2.5 gives 8.69, and k = 3 gives 1.89 within the limit.'],
  [1000, 2, 'k = 3 gives 9.45, and k = 3.5 gives 1.63.'],
  [1000, 0.5, 'The tighter limit of 0.5 needs k = 4, which gives 0.22.'],
  [50, 5, 'k = 2 gives 7.96, above the limit, and k = 2.5 gives 2.17.'],
  [5, 1, 'Even the most sensitive setting gives 0.80, within the limit.']
].map(([series, limit, why]) => ({ series, limit, why }));
const f2 = n => n.toFixed(2);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 300);
  new QK.Runner({
    box: UI.panel, items: SC, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative; one-sided normal tail, false alerts = series × 7 × P(z > k)',
    question: s => `${QK.int(s.series)} monitored series, limit ${s.limit} false alerts per week. What is the lowest threshold that keeps false alerts within the limit?`,
    controls: (s, ctl) => QK.choice(ctl, KS.map(k => ({ value: k, html: `k = ${k}` }))).get,
    judge: (s, v) => {
      const k = best(s.series, s.limit);
      const row = QK.table(KS.map(x => `k = ${x}`), [KS.map(x => f2(expected(s.series, x)))]);
      return { ok: v === k, okMsg: `k = ${k}. ${s.why}${row}`, why: s.why, reveal: `k = ${k}${row}` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the number of series and the multiplier');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { n: 200, k: 3 };
      const up = () => {
        const e = expected(S.n, S.k);
        out.innerHTML = QK.table(['Expected false alerts / week', 'Smallest spike still detected'], [[`<b>${f2(e)}</b>`, `${S.k} standard deviations above normal`]]) +
          '<i>The right multiplier rises with the number of series; a higher multiplier misses smaller real spikes.</i>';
      };
      QK.slider(box, 'Monitored series', 5, 1000, 5, 200, v => QK.int(v), v => { S.n = v; up(); });
      QK.slider(box, 'Threshold multiplier', 2, 4, 0.5, 3, v => v.toFixed(1) + ' SD', v => { S.k = v; up(); });
      box.append(out);
      up();
    }
  });
});
