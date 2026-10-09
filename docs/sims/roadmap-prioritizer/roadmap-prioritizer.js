// Roadmap Prioritizer - interactive prioritizing exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 394
//
// For six one-time budgets the learner selects the initiatives that the rule "fund in payback
// order, skipping any initiative that does not fit the remaining budget" produces, then changes
// the budget and watches the funded set.

const INI = [
  ['T', 'AI test generation with a coverage gate', 4000, 7220],
  ['R', 'Automated code review', 2000, 2850],
  ['B', 'Build time reduction', 12000, 7596],
  ['S', 'Release safeguards', 7500, 3764],
  ['G', 'Bug triage automation', 6000, 2520],
  ['D', 'Deployment automation', 9000, 3100]
].map(([code, name, cost, save]) => ({ code, name, cost, save, payback: cost / save }));
const BUDGETS = [
  [6000, 'T and R use the whole budget, and nothing else fits.'],
  [12000, 'B and S do not fit the remaining $6,000, but G does.'],
  [15000, 'B does not fit the remaining $9,000, S does, and G and D do not fit the remaining $1,500.'],
  [20000, 'Only $2,000 remains, which no other initiative fits.'],
  [27500, 'S fits the remaining $9,500, and G and D do not fit the remaining $2,000.'],
  [40500, 'The budget funds all six.']
].map(([budget, why]) => ({ budget, why }));
const U = n => QK.usd(n, 0);
function fund(budget) {
  let left = budget; const set = [], skipped = [];
  INI.forEach(i => { if (i.cost <= left) { left -= i.cost; set.push(i); } else skipped.push(i); });
  return { set, skipped, spent: budget - left, left, save: set.reduce((s, i) => s + i.save, 0) };
}
const codes = set => set.map(i => i.code).join(', ');

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 394);
  new QK.Runner({
    box: UI.panel, items: BUDGETS, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative data; fund in payback order, skip any that does not fit',
    question: b => `Which initiatives does a ${U(b.budget)} budget fund, in payback order?`,
    controls: (b, ctl) => {
      const picked = new Set();
      const t = QK.E('div'); t.style.flexBasis = '100%';
      const rows = INI.map(i => {
        const btn = QK.E('button', 'opt', i.code); btn.type = 'button';
        btn.setAttribute('aria-pressed', 'false');
        btn.onclick = () => { picked.has(i.code) ? picked.delete(i.code) : picked.add(i.code); btn.classList.toggle('sel', picked.has(i.code)); btn.setAttribute('aria-pressed', picked.has(i.code)); };
        return { btn, cells: [i.name, U(i.cost), U(i.save), i.payback.toFixed(2)] };
      });
      const tb = QK.table(['Select', 'Initiative', 'One-time cost', 'Quarterly net saving', 'Payback (quarters)'], rows.map(r => ['', ...r.cells]));
      t.innerHTML = tb;
      [...t.querySelectorAll('tr')].slice(1).forEach((tr, k) => tr.firstChild.append(rows[k].btn));
      ctl.append(t);
      return () => (picked.size ? [...picked] : null);
    },
    judge: (b, a) => {
      const r = fund(b.budget), want = r.set.map(i => i.code), ok = want.length === a.length && want.every(c => a.includes(c));
      const line = `Funded ${codes(r.set)}, spent ${U(r.spent)}, saving ${U(r.save)} a quarter.`;
      return { ok, okMsg: `${codes(r.set)}, saving ${U(r.save)} a quarter. ${line} ${b.why}`, why: b.why, reveal: `${codes(r.set)}. ${line}` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the budget');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const up = v => {
        const r = fund(v);
        out.innerHTML = QK.table(['Funded set', 'Spent', 'Left over', 'Quarterly net saving', 'Skipped'], [[`<b>${codes(r.set) || 'none'}</b>`, U(r.spent), U(r.left), U(r.save), codes(r.skipped) || 'none']]) +
          '<i>Adding $500 can change the set in a way that does not just add one at the end: a skipped initiative can be funded later, and a larger one can displace it.</i>';
      };
      QK.slider(box, 'Budget', 2000, 45000, 500, 20000, U, up);
      box.append(out);
      up(20000);
    }
  });
});
