// Control Group Attribution Lab - interactive attribution exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 360
//
// For six scenarios the learner commits an attributable benefit (minutes saved) and a verdict on
// the pre/post comparison, then changes two "after" handle times to see the split move.

const SC = [
  [15.0, 14.0, 15.0, 14.6, 'The control group improved by 0.4 without the assistant, so only 0.6 is attributable.'],
  [15.0, 14.0, 15.0, 15.0, 'Nothing else changed, so the whole benefit is attributable.'],
  [15.0, 14.0, 15.0, 13.8, 'The control group improved more than the treated group, so the assistant appears to have slowed work.'],
  [15.0, 14.5, 15.0, 15.5, "Conditions got worse for everyone, which hid part of the assistant's benefit."],
  [15.0, 13.0, 15.0, 14.1, 'A large improvement is still inflated when the control group improved by 0.9.'],
  [14.0, 13.0, 14.0, 14.0, 'The control group did not change, so pre/post equals the attributable figure.']
].map(([tb, ta, cb, ca, why]) => ({ tb, ta, cb, ca, why }));
const VERDICTS = ['Pre/post overstates', 'Pre/post understates', 'Pre/post is about right'];
const calc = s => {
  const pp = +(s.tb - s.ta).toFixed(1), cg = +(s.cb - s.ca).toFixed(1), at = +(pp - cg).toFixed(1);
  return { pp, cg, at, verdict: cg > 0.1 ? VERDICTS[0] : cg < -0.1 ? VERDICTS[1] : VERDICTS[2] };
};
const mn = n => (n < 0 ? '−' : '') + Math.abs(n).toFixed(1);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 360);
  const runner = new QK.Runner({
    box: UI.panel, items: SC, attempts: 2, mastery: 5, label: 'Both correct on first attempt',
    note: 'Illustrative handle times, minutes per ticket',
    question: () => 'How many of the minutes saved can be credited to the assistant, and what does a pre/post study alone do?',
    controls: (s, ctl) => {
      const t = QK.E('div', '', QK.table(['', 'Before', 'After'], [['<b>Treated group</b>', s.tb.toFixed(1), s.ta.toFixed(1)], ['<b>Control group</b>', s.cb.toFixed(1), s.ca.toFixed(1)]]));
      t.style.flexBasis = '100%';
      ctl.append(t);
      const num = QK.num(ctl, 'Attributable benefit:', { suffix: 'minutes', placeholder: 'e.g. 0.6' });
      const row = QK.E('div'); row.style.flexBasis = '100%';
      ctl.append(row);
      const ch = QK.choice(row, VERDICTS);
      return () => { const b = num.get(), v = ch.get(); return isNaN(b) || v == null ? null : { b, v }; };
    },
    judge: (s, a) => {
      const r = calc(s), okB = Math.abs(a.b - r.at) <= 0.05, okV = a.v === r.verdict;
      return {
        ok: okB && okV,
        okMsg: `attributable benefit ${mn(r.at)} minutes; ${r.verdict}. Pre/post ${mn(r.pp)} − control ${mn(r.cg)} = ${mn(r.at)}.`,
        why: `${okB ? '' : 'The benefit is off. '}${okV ? '' : 'The verdict is off. '}${s.why}`,
        reveal: `${mn(r.at)} minutes; ${r.verdict}`
      };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the two "after" values (both groups start at 15.0)');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { tb: 15, cb: 15, ta: 14.0, ca: 14.6 };
      const up = () => {
        const r = calc(S);
        out.innerHTML = QK.table(['Pre/post benefit', 'Control benefit', 'Attributable benefit', 'Verdict'], [[mn(r.pp), mn(r.cg), `<b>${mn(r.at)}</b>`, r.verdict]]) +
          '<i>The attributable benefit depends on the control group\'s change, not on the treated group alone.</i>';
      };
      QK.slider(box, 'Treated group after (minutes)', 12, 17, 0.1, 14.0, v => v.toFixed(1), v => { S.ta = v; up(); });
      QK.slider(box, 'Control group after (minutes)', 12, 17, 0.1, 14.6, v => v.toFixed(1), v => { S.ca = v; up(); });
      box.append(out);
      up();
    }
  });
});
