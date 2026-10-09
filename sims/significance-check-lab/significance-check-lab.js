// Significance Check Lab - interactive judging exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 320
//
// Judge eight comparisons of two rates as "Significant" or "Not significant" (|z| >= 1.96),
// then change the two rates and the sample size to see when z crosses the cutoff.

const CMP = [
  ['Reply errors, 500 per group', 15, 500, 20, 500, 'The gap is under one standard error wide.'],
  ['Reply errors, 5,000 per group', 150, 5000, 200, 5000, 'The same 3.0% and 4.0% rates are significant with ten times the sample.'],
  ['Rework, 2,000 tickets per group', 160, 2000, 180, 2000, '8% against 9% is within chance at this size.'],
  ['Hallucinations, 500 per group', 4, 500, 8, 500, 'Doubling a very small count is still within chance.'],
  ['Cohort retention, 22 agents per group', 15, 22, 20, 22, 'Twenty-two people is too few to confirm a 23-point gap.'],
  ['Deflection, 1,000 requests per group', 650, 1000, 700, 1000, 'A 5-point gap on 1,000 requests each exceeds chance.'],
  ['Reply errors, 2,500 per group', 75, 2500, 100, 2500, 'z is 1.92, just below the 1.96 cutoff.'],
  ['Reply errors, 5,300 per group', 159, 5300, 212, 5300, 'At about 5,300 per group the 3.0% and 4.0% rates are detectable.']
].map(([name, x1, n1, x2, n2, why]) => ({ name, x1, n1, x2, n2, why }));
const SIG = 'Significant', NOT = 'Not significant';
function stat(x1, n1, x2, n2) {
  const p = (x1 + x2) / (n1 + n2), se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2)), z = (x2 / n2 - x1 / n1) / se;
  return { p, se, z, verdict: Math.abs(z) >= 1.96 ? SIG : NOT };
}
const f2 = n => (n < 0 ? '−' : '') + Math.abs(n).toFixed(2);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 320);
  new QK.Runner({
    box: UI.panel, items: CMP, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data; significant means |z| ≥ 1.96',
    question: () => 'Could this difference plausibly be chance?',
    controls: (c, ctl) => {
      const t = QK.E('div', '', QK.table(['Comparison', 'Group 1 (baseline)', 'Group 2'], [[c.name, `${c.x1} of ${QK.int(c.n1)} (${(c.x1 / c.n1 * 100).toFixed(1)}%)`, `${c.x2} of ${QK.int(c.n2)} (${(c.x2 / c.n2 * 100).toFixed(1)}%)`]]));
      t.style.flexBasis = '100%';
      ctl.append(t);
      return QK.choice(ctl, [SIG, NOT]).get;
    },
    judge: (c, v) => {
      const s = stat(c.x1, c.n1, c.x2, c.n2);
      const detail = `pooled rate ${(s.p * 100).toFixed(2)}%, standard error ${s.se.toFixed(4)}, z = ${f2(s.z)}`;
      return { ok: v === s.verdict, okMsg: `${s.verdict}, z = ${f2(s.z)} (${detail}). ${c.why}`, why: c.why, reveal: `${s.verdict} (${detail})` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the two rates and the sample size');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { r1: 3, r2: 4, n: 500 };
      const up = () => {
        const s = stat(S.r1 / 100 * S.n, S.n, S.r2 / 100 * S.n, S.n);
        out.innerHTML = QK.table(['Pooled rate', 'Standard error', 'z', 'Verdict'], [[QK.pct(s.p * 100, 2), s.se.toFixed(4), `<b>${f2(s.z)}</b>`, `<b>${s.verdict}</b>`]]) +
          '<i>With 3% and 4% fixed, z crosses 1.96 only once the sample is large enough (about 5,300 per group).</i>';
      };
      QK.slider(box, 'Group 1 rate (%)', 1, 20, 1, 3, v => v + '%', v => { S.r1 = v; up(); });
      QK.slider(box, 'Group 2 rate (%)', 1, 20, 1, 4, v => v + '%', v => { S.r2 = v; up(); });
      QK.slider(box, 'Sample size per group', 100, 6000, 100, 500, v => QK.int(v), v => { S.n = v; up(); });
      box.append(out);
      up();
    }
  });
});
