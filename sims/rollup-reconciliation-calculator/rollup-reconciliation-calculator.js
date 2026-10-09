// Roll-Up and Reconciliation Calculator - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 390
//
// Calculate a feature's allocated shared cost and unit cost, the warehouse-versus-invoice
// reconciliation difference, and a normalized cost per million words for two providers.

const IN = { shared: 6840, teamReq: 3600000, rd: { req: 2400000, direct: 8400 }, tt: { req: 900000, direct: 1800 },
  wh: 18744, inv: 18600, A: { price: 0.50, tpw: 1330 }, B: { price: 0.60, tpw: 1490 } };
const alloc = r => r / IN.teamReq * IN.shared;
const perMWords = p => p.tpw / 1000 * p.price;       // dollars per million words
const D = (n, d = 0) => QK.usd(n, d);

const ITEMS = [
  { q: "How much of Support's shared cost belongs to reply-draft?", v: () => alloc(IN.rd.req), tol: 1, fmt: v => D(v), why: '2,400,000 ÷ 3,600,000 × 6,840 = 4,560.' },
  { q: 'What is the total cost of reply-draft (direct plus shared)?', v: () => IN.rd.direct + alloc(IN.rd.req), tol: 1, fmt: v => D(v), why: '8,400 + 4,560 = 12,960.' },
  { q: 'What is the total cost of ticket-triage?', v: () => IN.tt.direct + alloc(IN.tt.req), tol: 1, fmt: v => D(v), why: 'Shared 900,000 ÷ 3,600,000 × 6,840 = 1,710, plus 1,800 direct.' },
  { q: 'What is the all-in cost per request for reply-draft? (dollars)', v: () => (IN.rd.direct + alloc(IN.rd.req)) / IN.rd.req, tol: 0.0001, fmt: v => D(v, 4), why: '12,960 ÷ 2,400,000 = 0.0054.' },
  { q: 'What is the reconciliation difference, warehouse minus invoices? (dollars)', v: () => IN.wh - IN.inv, tol: 1, fmt: v => D(v), why: '18,744 − 18,600 = 144.' },
  { q: 'What is that difference as a percentage of the invoices?', v: () => (IN.wh - IN.inv) / IN.inv * 100, tol: 0.1, fmt: v => v.toFixed(1) + '%', unit: '%', why: '144 ÷ 18,600 = 0.0077, within the 1% tolerance.' },
  { q: 'What does Provider B cost per million words? (dollars)', v: () => perMWords(IN.B), tol: 0.001, fmt: v => D(v, 3), why: '1.49 million tokens × 0.60 = 0.894.' },
  { q: 'How much more does Provider B cost than Provider A for the same words? (percent)', v: () => (perMWords(IN.B) / perMWords(IN.A) - 1) * 100, tol: 0.1, fmt: v => '+' + v.toFixed(1) + '%', unit: '%', why: '0.894 ÷ 0.665 = 1.344.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 390);
  const inputs = QK.table(['Input', 'Value'], [
    ["Support's shared cost / Support requests", `${D(IN.shared)} / ${QK.int(IN.teamReq)}`],
    ['Reply-draft: requests, direct cost', `${QK.int(IN.rd.req)}, ${D(IN.rd.direct)}`],
    ['Ticket-triage: requests, direct cost', `${QK.int(IN.tt.req)}, ${D(IN.tt.direct)}`],
    ['Warehouse token cost / vendor invoices', `${D(IN.wh)} / ${D(IN.inv)}`],
    ['Provider A: price per million tokens, tokens per 1,000 words', `${D(IN.A.price)}, ${QK.int(IN.A.tpw)}`],
    ['Provider B: price per million tokens, tokens per 1,000 words', `${D(IN.B.price)}, ${QK.int(IN.B.tpw)}`]
  ]);
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', inputs); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', it.unit ? { suffix: '%' } : { prefix: '$' }).get;
    },
    judge: (it, v) => { const m = it.v(); return { ok: Math.abs(v - m) <= it.tol, okMsg: `${it.fmt(m)}. ${it.why}`, why: it.why, reveal: it.fmt(m) }; },
    onDone: run => {
      const box = run.explore('Explore (not scored): add errors to the warehouse total');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { dup: 36000, tz: 36 };
      const up = () => {
        const wh = IN.inv + S.dup * 0.003 + S.tz, diff = wh - IN.inv, p = diff / IN.inv * 100, ok = Math.abs(p) <= 1;
        out.innerHTML = QK.table(['Warehouse total', 'Difference', 'Percent of invoices', 'Verdict'], [[D(wh), D(diff), QK.pct(p, 2), `<b>${ok ? 'Within tolerance' : 'Investigate'}</b>`]]) +
          '<i>Each duplicated record adds $0.0030. At 360,000 duplicates the difference passes the 1% tolerance on its own.</i>';
      };
      QK.slider(box, 'Duplicated records', 0, 360000, 36000, 36000, v => QK.int(v), v => { S.dup = v; up(); });
      QK.slider(box, 'Time-zone cut-off error', 0, 300, 12, 36, v => D(v), v => { S.tz = v; up(); });
      box.append(out);
      up();
    }
  });
});
