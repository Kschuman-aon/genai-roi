// Cost Metric Lineage Explorer - interactive lineage graph (vis-network + shared quiz kit)
// CANVAS_HEIGHT: 580
//
// For six change scenarios the learner clicks the nodes of a 19-node lineage graph that would be
// affected downstream, commits the set, and compares it with the exact reachable set.

const LAYERS = ['Source', 'Staging', 'Warehouse', 'Metric', 'Dashboard'];
const COLORS = { Source: '#c5cae9', Staging: '#b2dfdb', Warehouse: '#ffe0b2', Metric: '#f8bbd0', Dashboard: '#dcedc8' };
// id, layer, name, description, column position (x layer index, y row)
const NODES = [
  ['S1', 0, 'Provider A invoice', 'Monthly invoice from Provider A.', 0],
  ['S2', 0, 'Provider B invoice', 'Monthly invoice from Provider B.', 1],
  ['S3', 0, 'Gateway request log', 'One record per model request with tenant, tokens, and tags.', 2.4],
  ['S4', 0, 'Tag registry', 'The list of allowed tag keys and values.', 3.6],
  ['S5', 0, 'Ticketing system', 'Tickets resolved, with the assistant-used flag.', 4.8],
  ['T2', 1, 'Price table', 'Price per million tokens by model and date.', 1.4],
  ['T1', 1, 'Normalized usage table', 'Request records cleaned, deduplicated, and priced.', 2.4],
  ['W2', 2, 'invoice_cost table', 'Vendor invoice lines, combined across providers.', 0.5],
  ['W1', 2, 'usage_cost fact table', 'Priced request-level cost, the main cost table.', 2.0],
  ['W3', 2, 'tag_audit table', 'Per-request tag completeness, with no prices.', 3.4],
  ['W4', 2, 'resolved_tickets table', 'Daily resolved and assisted ticket counts.', 4.8],
  ['M3', 3, 'Reconciliation difference', 'Warehouse cost minus invoice cost.', 0.5],
  ['M1', 3, 'Cost by team', 'Spend grouped by the team tag.', 1.7],
  ['M2', 3, 'Cost per resolved ticket', 'Assistant cost divided by assisted resolved tickets.', 3.0],
  ['M4', 3, 'Tag compliance rate', 'Share of requests carrying every required tag.', 4.2],
  ['D3', 4, 'Operations: reconciliation', 'Tile showing M3.', 0.5],
  ['D1', 4, 'Finance: month-to-date spend', 'Tile showing M1.', 1.7],
  ['D2', 4, 'Finance: cost per resolved ticket', 'Tile showing M2.', 3.0],
  ['D4', 4, 'Operations: tag compliance', 'Tile showing M4.', 4.2]
];
const EDGES = 'S3>T1 T2>T1 T1>W1 S1>W2 S2>W2 S3>W3 S4>W3 S5>W4 W1>M1 W1>M2 W4>M2 W1>M3 W2>M3 W3>M4 M1>D1 M2>D2 M3>D3 M4>D4'.split(' ').map(e => e.split('>'));
const SCEN = [
  { at: 'T2', text: 'The price table is corrected.', why: 'Prices flow into priced costs, so every cost metric and its tile changes, while tag compliance does not use prices.' },
  { at: 'S1', text: 'Provider A reissues its invoice.', why: 'The invoice feeds only the reconciliation.' },
  { at: 'S4', text: 'The tag registry adds a new allowed value.', why: 'The registry is used only to audit tags.' },
  { at: 'S3', text: 'The gateway request log format changes.', why: 'The request log feeds both the priced table and the tag audit, so almost everything downstream changes.' },
  { at: 'S5', text: 'The ticketing system changes its assisted flag.', why: 'Only cost per resolved ticket uses ticket counts.' },
  { at: 'M2', text: 'The definition of cost per resolved ticket is revised.', why: "The metric's tile changes, but the data tables underneath are unchanged." }
];
const kids = {}, parents = {};
NODES.forEach(n => { kids[n[0]] = []; parents[n[0]] = []; });
EDGES.forEach(([a, b]) => { kids[a].push(b); parents[b].push(a); });
const reach = (id, map) => { const seen = new Set(), st = [id]; while (st.length) for (const k of map[st.pop()]) if (!seen.has(k)) { seen.add(k); st.push(k); } return seen; };
const nodeName = id => NODES.find(n => n[0] === id)[2];
const nodeDesc = id => NODES.find(n => n[0] === id)[3];
const VIS_H = 330, PANEL_H = 250;
let net, nodes, runner, sel = new Set(), locked = false, mode = 'challenge', info;

const base = id => ({ background: COLORS[LAYERS[NODES.find(n => n[0] === id)[1]]], border: '#5c6bc0' });
function paint(state) {   // state: id -> {bg, border, bw}
  nodes.update(NODES.map(n => {
    const s = state[n[0]] || {}, b = base(n[0]);
    return { id: n[0], color: { background: s.bg || b.background, border: s.border || b.border }, borderWidth: s.bw || 1 };
  }));
}
function paintSelection(changed) {
  const st = {};
  sel.forEach(id => { st[id] = { bg: '#ffcc80', border: '#e65100', bw: 3 }; });
  if (changed) st[changed] = { bg: '#bbdefb', border: '#0d47a1', bw: 4 };
  paint(st);
}
function paintResult(changed, exp) {
  const st = {};
  NODES.forEach(([id]) => {
    const inSel = sel.has(id), inExp = exp.has(id);
    if (inSel && inExp) st[id] = { bg: '#a5d6a7', border: '#2e7d32', bw: 3 };
    else if (!inSel && inExp) st[id] = { bg: '#ef9a9a', border: '#c62828', bw: 3 };
    else if (inSel && !inExp) st[id] = { bg: '#fff59d', border: '#c62828', bw: 3 };
  });
  st[changed] = { bg: '#bbdefb', border: '#0d47a1', bw: 4 };
  paint(st);
}
function paintTrace(id) {
  const up = reach(id, parents), down = reach(id, kids), st = {};
  up.forEach(u => { st[u] = { bg: '#90caf9', border: '#1565c0', bw: 3 }; });
  down.forEach(d => { st[d] = { bg: '#ffcc80', border: '#e65100', bw: 3 }; });
  st[id] = { bg: '#fff59d', border: '#000', bw: 4 };
  paint(st);
  return { up, down };
}

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(VIS_H, PANEL_H);
  const holder = QK.E('div'); holder.style.cssText = 'position:absolute;inset:0';
  UI.vis.append(holder);
  nodes = new vis.DataSet(NODES.map(([id, l, name, , y]) => ({
    id, label: `${id}\n${name}`, x: l * 190, y: y * 62, fixed: true, shape: 'box', margin: 5,
    font: { size: 11, face: 'Arial' }, widthConstraint: { maximum: 128 }, color: base(id), borderWidth: 1, chosen: false
  })));
  const edges = new vis.DataSet(EDGES.map(([from, to]) => ({ from, to, arrows: 'to', color: { color: '#78909c' }, smooth: false })));
  net = new vis.Network(holder, { nodes, edges }, {
    physics: false, interaction: { dragNodes: false, dragView: false, zoomView: false, selectable: true, hover: false },
    layout: { improvedLayout: false }
  });
  net.once('afterDrawing', () => net.fit({ animation: false }));
  window.addEventListener('resize', () => net.fit({ animation: false }));
  net.on('click', p => {
    net.unselectAll();
    const id = p.nodes[0];
    if (!id) return;
    info.innerHTML = `<b>${id} ${nodeName(id)}:</b> ${nodeDesc(id)}`;
    if (mode === 'explore') {
      const t = paintTrace(id);
      info.innerHTML += `<br>Upstream (blue): ${[...t.up].join(', ') || 'none'}. Downstream (orange): ${[...t.down].join(', ') || 'none'}.`;
      return;
    }
    if (locked) return;
    sel.has(id) ? sel.delete(id) : sel.add(id);
    paintSelection(runner.item.at);
  });

  runner = new QK.Runner({
    box: UI.panel, items: SCEN, attempts: 2, mastery: 5, label: 'Correct on first attempt',
    note: 'Illustrative graph; arrows point from a source to what is computed from it',
    question: s => `${s.text} Which nodes would change if this changed? (Click nodes to mark them; the changed node is blue.)`,
    controls: (s, ctl) => {
      info = QK.E('div', 'qk-note', 'Click any node to read its description.');
      info.style.flexBasis = '100%';
      ctl.append(info);
      return () => [...sel];
    },
    onShow: s => { sel = new Set(); locked = false; paintSelection(s.at); },
    judge: (s, a) => {
      const exp = reach(s.at, kids), got = new Set(a);
      const miss = [...exp].filter(x => !got.has(x)), extra = [...got].filter(x => !exp.has(x));
      return {
        ok: !miss.length && !extra.length, okMsg: `${exp.size} node${exp.size === 1 ? '' : 's'} affected. ${s.why}`,
        why: `${s.why} You have ${miss.length} missing and ${extra.length} extra node${extra.length === 1 ? '' : 's'}.`,
        reveal: `${[...exp].join(', ')}`
      };
    },
    onResult: (s, i, r) => { if (r.final) { locked = true; paintResult(s.at, reach(s.at, kids)); } },
    onDone: run => {
      mode = 'explore';
      run.q.textContent = 'Explore (not scored): click any node to trace its upstream (blue) and downstream (orange) paths';
      run.ctl.className = 'qk-ctl';
      info = QK.E('div', 'qk-fb info', 'The request log (S3) has the widest downstream reach; an invoice (S1, S2) has the narrowest.');
      run.ctl.append(info);
      paint({});
    }
  });
});
