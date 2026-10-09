// Shift-Left Investment Judge - interactive judging exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 302
//
// For six AI investment options the learner judges Fund or Do not fund using the rule
// "saving >= 2 x cost", then changes the defects moved, the cost, and the production fix cost.

const FIX = { Requirements: 100, Design: 200, Coding: 400, Testing: 800, Production: 4000 };
const OPTS = [
  ['AI requirements review', 20, 'Testing', 'Requirements', 6000, 'The saving is more than twice the cost.'],
  ['AI test generation', 15, 'Production', 'Testing', 9000, 'Catching production defects early is the largest saving.'],
  ['AI code review', 25, 'Testing', 'Coding', 3600, 'A modest move per defect, repeated 25 times, still clears the bar.'],
  ['AI design review', 8, 'Coding', 'Design', 2000, 'Moving a defect from coding to design saves only $200 each.'],
  ['AI static analysis of legacy code', 12, 'Production', 'Coding', 24000, 'The saving is real but below twice the cost.'],
  ['AI requirements-to-test tracing', 10, 'Production', 'Requirements', 19500, 'The ratio is exactly 2.00, and the rule funds at 2.0 or more.']
].map(([name, n, from, to, cost, why]) => ({ name, n, from, to, cost, why }));
const saving = (o, fix = FIX) => o.n * (fix[o.from] - fix[o.to]);
const ratio = (o, fix) => saving(o, fix) / o.cost;
const verdict = r => (r >= 2 ? 'Fund' : 'Do not fund');
const U = n => QK.usd(n, 0);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 302);
  const fixTbl = QK.table(Object.keys(FIX), [Object.values(FIX).map(U)]);
  new QK.Runner({
    box: UI.panel, items: OPTS, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative data; fund when saving ÷ cost ≥ 2.0',
    question: () => 'Do the savings reach twice the cost?',
    controls: (o, ctl) => {
      const t = QK.E('div', '', `<b>Fix cost by phase:</b>${fixTbl}<b>${o.name}:</b> moves ${o.n} defects from ${o.from} to ${o.to}; option cost ${U(o.cost)}.`);
      t.style.flexBasis = '100%'; ctl.append(t);
      return QK.choice(ctl, ['Fund', 'Do not fund']).get;
    },
    judge: (o, v) => {
      const r = ratio(o), res = verdict(r), line = `Saving ${U(saving(o))} ÷ cost ${U(o.cost)} = ${r.toFixed(2)}. `;
      return { ok: v === res, okMsg: `${res}, ratio ${r.toFixed(2)}. ${line}${o.why}`, why: o.why, reveal: `${res}, ratio ${r.toFixed(2)}. ${line}` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the move, the defects, the cost, and the production fix cost');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const MOVES = [['Testing', 'Requirements'], ['Production', 'Testing'], ['Testing', 'Coding'], ['Coding', 'Design'], ['Production', 'Coding'], ['Production', 'Requirements']];
      const S = { n: 20, cost: 6000, prod: 4000, mv: 0 };
      const mvRow = QK.E('div'); mvRow.style.gridColumn = '1/-1';
      const mv = QK.choice(mvRow, MOVES.map((m, i) => ({ value: i, html: `${m[0]} → ${m[1]}` })), { onChange: v => { S.mv = v; up(); } });
      const up = () => {
        const [from, to] = MOVES[S.mv], o = { n: S.n, from, to, cost: S.cost }, fix = { ...FIX, Production: S.prod };
        const r = ratio(o, fix);
        out.innerHTML = QK.table(['Saving', 'Cost', 'Ratio', 'Verdict'], [[U(saving(o, fix)), U(S.cost), r.toFixed(2), `<b>${verdict(r)}</b>`]]) +
          '<i>A lower production fix cost removes the case for options that depend on production defects.</i>';
      };
      box.append(mvRow);
      QK.slider(box, 'Defects moved', 0, 50, 1, 20, v => v, v => { S.n = v; up(); });
      QK.slider(box, 'Option cost', 1000, 30000, 500, 6000, U, v => { S.cost = v; up(); });
      QK.slider(box, 'Production fix cost', 1000, 8000, 1000, 4000, U, v => { S.prod = v; up(); });
      box.append(out);
      mv.set(0);
      up();
    }
  });
});
