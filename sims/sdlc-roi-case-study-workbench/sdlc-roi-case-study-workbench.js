// SDLC ROI Case Study Workbench - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 316
//
// Calculate the year 1 costs, benefit, net, ROI, and break-even realization of the 20-engineer
// SDLC case, then change the realization, the debt clean-up, and the one-time costs.

const GROSS_Q = 61762.50, GROSS = GROSS_Q * 4, TOOLS = 12000, IDE = 3600, DEBT_Q = 9000, ONE = 13500;
const running = (debtQ = DEBT_Q) => TOOLS + IDE + 4 * debtQ;
const total = (debtQ = DEBT_Q, one = ONE) => running(debtQ) + one;
const benefit = r => r * GROSS;
const net = (r, debtQ, one) => benefit(r) - total(debtQ, one);
const roi = (r, debtQ, one) => net(r, debtQ, one) / total(debtQ, one) * 100;
const U = n => QK.usd(n, 0);
const P = n => QK.pct(n, 1);

const ITEMS = [
  { q: "What is a year of the team's gross time value?", v: () => GROSS, tol: 1, fmt: U, why: '61,762.50 × 4 = 247,050.' },
  { q: 'What are the annual running costs?', v: () => running(), tol: 1, fmt: U, why: '12,000 + 3,600 + 4 × 9,000 = 51,600.' },
  { q: 'What is the total year 1 cost?', v: () => total(), tol: 1, fmt: U, why: '51,600 + 13,500 = 65,100.' },
  { q: 'What is the benefit at 50% realization?', v: () => benefit(0.5), tol: 1, fmt: U, why: '0.50 × 247,050 = 123,525.' },
  { q: 'What is the year 1 net at 50% realization?', v: () => net(0.5), tol: 1, fmt: U, why: '123,525 − 65,100 = 58,425.' },
  { q: 'What is the year 1 ROI at 50% realization? (percent)', v: () => roi(0.5), tol: 0.1, fmt: P, unit: '%', why: '58,425 ÷ 65,100 = 0.897.' },
  { q: 'What is the break-even realization? (percent)', v: () => total() / GROSS * 100, tol: 0.1, fmt: P, unit: '%', why: '65,100 ÷ 247,050 = 0.2635, shown as 26.4%.' },
  { q: 'What is the year 1 ROI at 30% realization? (percent)', v: () => roi(0.3), tol: 0.1, fmt: P, unit: '%', why: '(0.30 × 247,050 − 65,100) ÷ 65,100 = 9,015 ÷ 65,100 = 0.138.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 316);
  const tbl = QK.table(['Fixed input', 'Amount'], [
    ['Gross time value per quarter', QK.usd(GROSS_Q, 2)],
    ['Tool licences and usage, per year', U(TOOLS)],
    ['IDE integration upkeep, per year', U(IDE)],
    ['Debt clean-up, per quarter', U(DEBT_Q)],
    ['One-time costs (integration setup $4,500 + deployment automation $9,000)', U(ONE)]
  ]);
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', tbl); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', it.unit ? { suffix: '%' } : { prefix: '$' }).get;
    },
    judge: (it, v) => { const m = it.v(); return { ok: Math.abs(v - m) <= it.tol + 1e-9, okMsg: `${it.fmt(m)}. ${it.why}`, why: it.why, reveal: it.fmt(m) }; },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the realization, the debt clean-up, and the one-time costs');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { r: 50, d: DEBT_Q, o: ONE };
      const up = () => {
        out.innerHTML = QK.table(['Total year 1 cost', 'Benefit', 'Net', 'ROI', 'Break-even realization'],
          [[U(total(S.d, S.o)), U(benefit(S.r / 100)), U(net(S.r / 100, S.d, S.o)), `<b>${P(roi(S.r / 100, S.d, S.o))}</b>`, P(total(S.d, S.o) / GROSS * 100)]]) +
          '<i>The ROI changes far more with realization than with either cost line.</i>';
      };
      QK.slider(box, 'Realization', 0, 100, 10, 50, v => v + '%', v => { S.r = v; up(); });
      QK.slider(box, 'Debt clean-up per quarter', 0, 18000, 3000, 9000, U, v => { S.d = v; up(); });
      QK.slider(box, 'One-time costs', 0, 27000, 4500, 13500, U, v => { S.o = v; up(); });
      box.append(out);
      up();
    }
  });
});
