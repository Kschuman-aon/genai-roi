// Multi-Tenant Cost Allocator - interactive calculator (DOM, shared quiz kit)
// CANVAS_HEIGHT: 390
//
// Calculate each tenant's direct token cost, shared-cost allocation, and allocated total from
// request counts and per-request costs, then change the per-request costs to see the split move.

const T = [
  { name: 'Support', req: 3600000, price: 0.0030, assumed: 18000 },
  { name: 'Sales', req: 1800000, price: 0.0040, assumed: 9000 },
  { name: 'HR', req: 600000, price: 0.0010, assumed: 3000 }
];
const TOTAL_REQ = 6000000, SHARED = 11400;
// model(prices) -> per-tenant direct, shared, total, token-cost share
function model(prices) {
  const rows = T.map((t, i) => {
    const direct = t.req * prices[i], shared = t.req / TOTAL_REQ * SHARED;
    return { name: t.name, direct, shared, total: direct + shared, assumed: t.assumed };
  });
  const dsum = rows.reduce((a, r) => a + r.direct, 0);
  rows.forEach(r => { r.share = r.direct / dsum * 100; r.diff = r.total - r.assumed; });
  return rows;
}
const BASE = T.map(t => t.price);
const D = (n, d = 0) => QK.usd(n, d);

const ITEMS = [
  { q: "What did Support's requests cost in tokens this month?", f: m => m[0].direct, tol: 1, fmt: v => D(v), why: '3,600,000 × 0.0030 = 10,800.' },
  { q: 'What did Sales requests cost in tokens?', f: m => m[1].direct, tol: 1, fmt: v => D(v), why: '1,800,000 × 0.0040 = 7,200.' },
  { q: 'What did HR requests cost in tokens?', f: m => m[2].direct, tol: 1, fmt: v => D(v), why: '600,000 × 0.0010 = 600.' },
  { q: "How much of the $11,400 shared cost is allocated to Support (by request share)?", f: m => m[0].shared, tol: 1, fmt: v => D(v), why: 'Support has 60% of requests, and 0.60 × 11,400 = 6,840.' },
  { q: 'What is the total allocated cost for Sales (direct plus shared)?', f: m => m[1].total, tol: 1, fmt: v => D(v), why: '7,200 direct plus 0.30 × 11,400 = 3,420 shared.' },
  { q: 'What is the total allocated cost for HR?', f: m => m[2].total, tol: 1, fmt: v => D(v), why: '600 direct plus 0.10 × 11,400 = 1,140 shared.' },
  { q: "What is Support's share of total token cost? (percent)", f: m => m[0].share, tol: 0.1, fmt: v => v.toFixed(1) + '%', unit: '%', why: '10,800 ÷ 18,600 = 0.581.' },
  { q: "How does HR's allocated cost compare with the Chapter 9 assumed allocation of $3,000? (allocated minus assumed; use a minus sign if lower)", f: m => m[2].diff, tol: 1, fmt: v => D(v), why: '1,740 − 3,000 = −1,260.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 390);
  const inputs = QK.table(['Tenant', 'Requests', 'Token cost / request'], T.map(t => [t.name, QK.int(t.req), D(t.price, 4)])) + `<div class="qk-note">6,000,000 requests; shared cost ${D(SHARED)} allocated by request share. Chapter 9 assumed split: Support $18,000, Sales $9,000, HR $3,000.</div>`;
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative data',
    question: it => it.q,
    controls: (it, ctl) => {
      const t = QK.E('div', '', inputs); t.style.flexBasis = '100%'; ctl.append(t);
      return QK.num(ctl, 'Your answer:', it.unit ? { suffix: '%' } : { prefix: '$' }).get;
    },
    judge: (it, v) => {
      const m = it.f(model(BASE));
      return { ok: Math.abs(v - m) <= it.tol, okMsg: `${it.fmt(m)}. ${it.why}`, why: it.why, reveal: it.fmt(m) };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the token cost per request');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const P = BASE.slice();
      const up = () => {
        const m = model(P), tot = m.reduce((a, r) => a + r.total, 0);
        out.innerHTML = QK.table(['Tenant', 'Direct', 'Shared', 'Allocated total', 'Token-cost share', 'Minus Ch. 9 split'],
          m.map(r => [r.name, D(r.direct), D(r.shared), `<b>${D(r.total)}</b>`, QK.pct(r.share), D(r.diff)])) +
          `Platform total <b>${D(tot)}</b>. <i>Equal request shares give unequal totals once per-request costs differ.</i>`;
      };
      T.forEach((t, i) => QK.slider(box, `${t.name} token cost per request`, 0.001, 0.006, 0.0005, t.price, v => D(v, 4), v => { P[i] = v; up(); }));
      box.append(out);
      up();
    }
  });
});
