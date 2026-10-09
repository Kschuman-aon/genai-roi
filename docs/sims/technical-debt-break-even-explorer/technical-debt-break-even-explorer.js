// Technical Debt Break-Even Explorer - interactive judging exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 290
//
// For eight scenarios per 100 changes the learner judges whether an AI saving can be reported as
// stated, must be restated net of debt, or is net negative, then changes the saving, the debt rate,
// and the hours per refactoring.

const SC = [
  [40, 8, 3, 'The debt consumes more than a quarter of the saving.'],
  [40, 2, 3, 'The debt is within a quarter of the saving.'],
  [30, 10, 3, 'The debt equals the saving, so nothing is left.'],
  [50, 5, 5, 'A low rate with costly refactorings still consumes half.'],
  [60, 4, 3, 'The share is under a quarter.'],
  [20, 10, 4, 'The debt is twice the saving.'],
  [40, 5, 2, 'The share is exactly 25%, and the rule restates only above 25%.'],
  [48, 6, 3, 'The share is above 25% and below 100%.']
].map(([gross, rate, hrs, why]) => ({ gross, rate, hrs, why }));
const VERDICTS = ['Report as stated', 'Restate net of debt', 'Net negative'];
const calc = (gross, rate, hrs) => {
  const debt = rate * hrs, share = debt / gross * 100;
  return { debt, share, net: gross - debt, verdict: share >= 100 ? VERDICTS[2] : share > 25 ? VERDICTS[1] : VERDICTS[0] };
};
const mn = n => (n < 0 ? '−' : '') + Math.abs(n);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 290);
  new QK.Runner({
    box: UI.panel, items: SC, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data, per 100 changes; debt hours = debt rate × hours per refactoring',
    question: () => 'How much of this saving will the debt use up?',
    controls: (s, ctl) => {
      const t = QK.E('div', '', QK.table(['Gross hours saved', 'Debt rate', 'Hours per refactoring'], [[s.gross, s.rate + '% of changes', s.hrs]]) +
        '<i>Report as stated: share ≤ 25%. Restate net of debt: above 25% and below 100%. Net negative: 100% or more.</i>');
      t.style.flexBasis = '100%'; ctl.append(t);
      return QK.choice(ctl, VERDICTS).get;
    },
    judge: (s, v) => {
      const r = calc(s.gross, s.rate, s.hrs);
      const line = `Debt hours ${r.debt}, share consumed ${r.share.toFixed(1)}%, net ${mn(r.net)} hours.`;
      return { ok: v === r.verdict, okMsg: `${r.verdict}; net hours ${mn(r.net)}. ${line} ${s.why}`, why: s.why, reveal: `${r.verdict}. ${line}` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the saving, the debt rate, and the hours per refactoring');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { g: 40, r: 8, h: 3 };
      const up = () => {
        const r = calc(S.g, S.r, S.h);
        out.innerHTML = QK.table(['Debt hours', 'Share consumed', 'Net hours', 'Verdict'], [[r.debt, r.share.toFixed(1) + '%', mn(r.net), `<b>${r.verdict}</b>`]]) +
          '<i>The debt rate and the hours per refactoring multiply, so doubling either doubles the debt.</i>';
      };
      QK.slider(box, 'Gross hours saved per 100 changes', 10, 80, 10, 40, v => v + ' hours', v => { S.g = v; up(); });
      QK.slider(box, 'Debt rate', 0, 20, 1, 8, v => v + '% of changes', v => { S.r = v; up(); });
      QK.slider(box, 'Hours per refactoring', 1, 8, 1, 3, v => v + ' hours', v => { S.h = v; up(); });
      box.append(out);
      up();
    }
  });
});
