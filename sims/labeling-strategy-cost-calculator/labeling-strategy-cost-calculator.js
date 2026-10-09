// Labeling Strategy Cost Calculator - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 308
//
// Calculate the cost of labeling 20,000 tickets by manual labeling, AI-assisted labeling, active
// learning, and an outside vendor, then change the ticket count, accuracy, and reviewer check time.

const RATE = 45, MIN_LABEL = 1.5, TOK = 0.0024;
const manual = (mins = MIN_LABEL) => mins / 60 * RATE;
const assisted = (acc = 88, chk = 0.4) => TOK + chk / 60 * RATE + (1 - acc / 100) * manual();
const active = () => 12000 * manual() + 580;
const vendor = () => (12000 + 3600 + 3240 + 1000 * manual()) / 20000;
const D = (n, d = 2) => QK.usd(n, d);

const ITEMS = [
  { q: 'What does one manually labeled ticket cost?', v: () => manual(), tol: 0.005, d: 3, why: '1.5 ÷ 60 × 45 = 1.125.' },
  { q: 'What does manual labeling of 20,000 tickets cost?', v: () => 20000 * manual(), tol: 1, d: 0, why: '20,000 × 1.125 = 22,500.' },
  { q: 'What is the token cost of proposing one label?', v: () => TOK, tol: 0.0001, d: 4, why: '700 × 3 ÷ 1,000,000 + 20 × 15 ÷ 1,000,000 = 0.0024.' },
  { q: 'What is the AI-assisted cost of one label at 88% accuracy and 0.4 minutes of checking?', v: () => assisted(), tol: 0.01, d: 2, why: '0.0024 + 0.30 + 0.12 × 1.125 = 0.4374.' },
  { q: 'What is the AI-assisted cost of 20,000 labels?', v: () => 20000 * assisted(), tol: 1, d: 0, why: '20,000 × 0.4374 = 8,748.' },
  { q: 'How much does AI-assisted labeling save over manual labeling of 20,000 tickets?', v: () => 20000 * (manual() - assisted()), tol: 1, d: 0, why: '22,500 − 8,748 = 13,752.' },
  { q: "What does active learning cost for 20,000 tickets' worth of accuracy?", v: () => active(), tol: 1, d: 0, why: '12,000 × 1.125 + 580 = 14,080.' },
  { q: "What is the vendor's all-in cost of one label?", v: () => vendor(), tol: 0.01, d: 2, why: '(12,000 + 3,600 + 3,240 + 1,125) ÷ 20,000 = 0.998.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 308);
  const fixed = '<b>Fixed inputs:</b><ul style="margin:2px 0 0 16px;padding:0;font-size:13px">' +
    '<li>Reviewer: $45 an hour. A manual label takes 1.5 minutes.</li>' +
    '<li>AI-assisted: the model reads 700 tokens and writes 20 per ticket, at $3 and $15 per million tokens. At 88% accuracy the reviewer checks each proposal for 0.4 minutes and relabels the 12% it gets wrong by hand.</li>' +
    '<li>Active learning: 12,000 labels at the manual price plus $580 of scoring.</li>' +
    '<li>Vendor: $0.60 per label for 20,000 labels, $3,600 of guidelines and pilot, $3,240 of audits, and 1,000 labels redone in house at the manual price.</li></ul>';
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', fixed); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', { prefix: '$' }).get;
    },
    judge: (it, v) => { const m = it.v(); return { ok: Math.abs(v - m) <= it.tol + 1e-9, okMsg: `${D(m, it.d)}. ${it.why}`, why: it.why, reveal: D(m, it.d) }; },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the tickets, the accuracy, and the check time');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { n: 20000, acc: 88, chk: 0.4 };
      const up = () => {
        const a = assisted(S.acc, S.chk), man = manual(), tm = S.n * man, ta = S.n * a, sv = tm - ta;
        out.innerHTML = QK.table(['Manual total', 'Assisted per label', 'Assisted total', 'Saving'], [[D(tm, 0), D(a, 4), D(ta, 0), `<b>${D(sv, 0)}</b> (${(sv / tm * 100).toFixed(0)}%)`]]) +
          '<i>At 70% accuracy and 1.0 minute of checking, an assisted label costs $1.09 against $1.125 manual, so the saving nearly disappears.</i>';
      };
      QK.slider(box, 'Tickets to label', 5000, 40000, 5000, 20000, QK.int, v => { S.n = v; up(); });
      QK.slider(box, 'Language model label accuracy', 70, 96, 2, 88, v => v + '%', v => { S.acc = v; up(); });
      QK.slider(box, 'Reviewer check time', 0.2, 1.0, 0.1, 0.4, v => v.toFixed(1) + ' min', v => { S.chk = v; up(); });
      box.append(out);
      up();
    }
  });
});
