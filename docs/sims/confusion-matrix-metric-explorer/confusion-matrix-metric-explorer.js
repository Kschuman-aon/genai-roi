// Confusion Matrix Metric Explorer - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 360
//
// Calculate precision, recall, and accuracy from confusion-matrix counts for three cases
// (200 tickets, 50 truly urgent), then change true and false positives to see how the measures move.

const CASES = {
  A: { name: 'A: assistant as deployed', TP: 45, FP: 15 },
  B: { name: 'B: never flags anything', TP: 0, FP: 0 },
  C: { name: 'C: strict setting', TP: 30, FP: 2 }
};
const N = 200, URGENT = 50;
const counts = c => ({ TP: c.TP, FP: c.FP, FN: URGENT - c.TP, TN: (N - URGENT) - c.FP });
const prec = m => (m.TP + m.FP === 0 ? NaN : m.TP / (m.TP + m.FP) * 100);
const rec = m => m.TP / (m.TP + m.FN) * 100;
const acc = m => (m.TP + m.TN) / N * 100;

const ITEMS = [
  { c: 'A', q: 'Of the tickets the assistant flagged, what share were truly urgent? (precision)', f: prec, why: '45 ÷ (45 + 15) = 0.75.' },
  { c: 'A', q: 'Of the truly urgent tickets, what share did it flag? (recall)', f: rec, why: '45 ÷ (45 + 5) = 0.90.' },
  { c: 'A', q: 'What share of all 200 tickets did it classify correctly? (accuracy)', f: acc, why: '(45 + 135) ÷ 200 = 0.90.' },
  { c: 'B', q: 'What is the accuracy of a system that never flags anything?', f: acc, why: '(0 + 150) ÷ 200 = 0.75, high only because urgent tickets are rare.' },
  { c: 'B', q: 'What is the recall of the never-flag system?', f: rec, why: '0 ÷ (0 + 50) = 0, it finds none of the urgent tickets.' },
  { c: 'C', q: 'What is the precision of the strict setting?', f: prec, why: '30 ÷ (30 + 2) = 0.9375.' },
  { c: 'C', q: 'What is the recall of the strict setting?', f: rec, why: '30 ÷ (30 + 20) = 0.60.' },
  { c: 'C', q: 'What is the accuracy of the strict setting?', f: acc, why: '(30 + 148) ÷ 200 = 0.89.' }
];

const matrix = m => QK.table(['', 'Flagged', 'Not flagged'], [['<b>Truly urgent</b>', `TP = ${m.TP}`, `FN = ${m.FN}`], ['<b>Not urgent</b>', `FP = ${m.FP}`, `TN = ${m.TN}`]]);

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 360);
  let caseBox;
  const runner = new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative: 200 reviewed tickets, 50 truly urgent',
    question: it => `Case ${CASES[it.c].name}. ${it.q}`,
    controls: (it, ctl) => {
      caseBox = QK.E('div', '', matrix(counts(CASES[it.c])));
      caseBox.style.cssText = 'flex-basis:100%';
      ctl.append(caseBox);
      return QK.num(ctl, 'Your answer:', { suffix: '%', placeholder: 'e.g. 75.0' }).get;
    },
    judge: (it, v) => {
      const m = it.f(counts(CASES[it.c]));
      return { ok: Math.abs(v - m) <= 0.5, okMsg: `${m.toFixed(1)}%. ${it.why}`, why: it.why, reveal: `${m.toFixed(1)}%` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change true and false positives');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { TP: 45, FP: 15 };
      const up = () => {
        const m = counts(S), p = prec(m);
        out.innerHTML = matrix(m) + `Precision <b>${isNaN(p) ? 'undefined' : QK.pct(p)}</b> · Recall <b>${QK.pct(rec(m))}</b> · Accuracy <b>${QK.pct(acc(m))}</b>` +
          '<br><i>Try TP = 0 and FP = 0: accuracy stays 75.0% while recall falls to 0.0%.</i>';
      };
      QK.slider(box, 'True positives (urgent tickets flagged)', 0, 50, 1, 45, v => String(v), v => { S.TP = v; up(); });
      QK.slider(box, 'False positives (non-urgent tickets flagged)', 0, 150, 1, 15, v => String(v), v => { S.FP = v; up(); });
      box.append(out);
      up();
    }
  });
});
