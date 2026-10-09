// Request Routing Flow - Mermaid
// CANVAS_HEIGHT: 445
//
// Predict where each of five requests is answered in a cache -> small model ->
// quality check -> large model -> fallback pipeline, then see the traced path and cost.

const VIS_H = 230, PANEL_H = 215;
const NAMES = { A: 'Request received', B: 'Exact-match cache', C: 'Semantic cache', D: 'Small model', E: 'Quality check', F: 'Large model', H: 'Fallback model', G: 'Answer returned' };
const INFO = {
  A: 'Every request starts here. No cost yet.',
  B: 'Returns a stored answer if the request text is identical to a cached one. Cost $0.',
  C: 'Embeds the request and returns a stored answer if similarity >= 0.92. Cost about $0.000002 for the embedding.',
  D: 'Answers the request on the small model, $0.00044.',
  E: "Passes the small model's answer or sends the request on. Cost $0 (rule-based).",
  F: 'Answers the request on the large model, $0.00440.',
  H: "Answers on a second provider's large model, $0.0055, when the large model is unavailable.",
  G: 'The request ends here.'
};
const REQS = [
  { text: 'The exact question asked an hour ago.', at: 'Exact-match cache', path: 'ABG', cost: '$0', why: 'The text is identical, so a stored answer is returned.', trace: 'Exact-match cache hit → answer returned, $0.' },
  { text: 'The same question as request 1, reworded, with similarity 0.95.', at: 'Semantic cache', path: 'ABCG', cost: '$0.000002', why: '0.95 >= 0.92, so the stored answer is reused; only the embedding is paid.', trace: 'Exact-match miss → semantic cache hit ($0.000002 embedding) → answer returned.' },
  { text: 'A new, simple question that passes the quality check.', at: 'Small model', path: 'ABCDEG', cost: '$0.00044', why: "The small model's answer passes, so no escalation.", trace: 'Both caches miss → small model ($0.00044) → quality check passes → answer returned.' },
  { text: 'A new, hard question that fails the quality check.', at: 'Large model', path: 'ABCDEFG', cost: '$0.00484', why: 'The small model ($0.00044) is paid first, then the large model ($0.00440).', trace: 'Both caches miss → small model ($0.00044) → check fails → large model ($0.00440) → answer returned.' },
  { text: 'A new, hard question while the large model is rate-limited.', at: 'Fallback model', path: 'ABCDEFHG', cost: '$0.00594', why: 'The small model ($0.00044) fails the check, the large model is unavailable, and the fallback ($0.0055) answers.', trace: 'Both caches miss → small model ($0.00044) → check fails → large model unavailable → fallback ($0.0055) → answer returned.' }
];
const ANSWER_ID = { 'Exact-match cache': 'B', 'Semantic cache': 'C', 'Small model': 'D', 'Large model': 'F', 'Fallback model': 'H' };

let seq = 0, finished = false, infoEl;

function definition(path, ans) {
  const lbl = { A: 'Request<br/>received', B: 'Exact-match<br/>cache', C: 'Semantic<br/>cache', D: 'Small<br/>model', E: 'Quality<br/>check', F: 'Large<br/>model', H: 'Fallback<br/>model', G: 'Answer<br/>returned' };
  let d = 'flowchart LR\n' + Object.keys(lbl).map(k => `  ${k}["${lbl[k]}"]`).join('\n') + '\n';
  d += '  A --> B\n  B -->|miss| C\n  C -->|miss| D\n  D --> E\n  E -->|fail| F\n  F -.->|unavailable| H\n  B -->|hit| G\n  C -->|hit| G\n  E -->|pass| G\n  F --> G\n  H --> G\n';
  d += '  classDef base fill:#3949ab,stroke:#1a237e,color:#fff,font-size:13px\n  classDef path fill:#a5d6a7,stroke:#2e7d32,color:#000,font-size:13px\n  classDef ans fill:#2e7d32,stroke:#1b5e20,color:#fff,font-size:13px,stroke-width:3px\n';
  d += '  class A,B,C,D,E,F,H,G base\n';
  if (path) d += `  class ${path.split('').join(',')} path\n`;
  if (ans) d += `  class ${ans} ans\n`;
  Object.keys(lbl).forEach(k => { d += `  click ${k} call showInfo("${k}")\n`; });
  return d;
}

async function draw(vis, path, ans) {
  const my = ++seq;
  const { svg, bindFunctions } = await mermaid.render('flow' + my, definition(path, ans));
  if (my !== seq) return;
  vis.innerHTML = svg;
  const s = vis.querySelector('svg'); s.style.maxHeight = '100%'; s.style.maxWidth = '100%';
  if (bindFunctions) bindFunctions(vis);
}

window.showInfo = id => {
  if (!finished || !infoEl) return;
  infoEl.className = 'qk-fb info';
  infoEl.innerHTML = `<b>${NAMES[id]}:</b> ${INFO[id]}`;
};

window.addEventListener('DOMContentLoaded', async () => {
  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose', flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' } });
  const UI = QK.layout(VIS_H, PANEL_H);
  UI.vis.style.display = 'flex'; UI.vis.style.alignItems = 'center'; UI.vis.style.justifyContent = 'center';
  await draw(UI.vis);
  new QK.Runner({
    box: UI.panel, items: REQS, attempts: 1, mastery: 4, label: 'Correct',
    note: 'Illustrative prices; the negligible embedding cost on a semantic-cache miss is ignored',
    question: r => `Request: "${r.text}" Where is it answered?`,
    controls: (r, ctl) => QK.choice(ctl, Object.keys(ANSWER_ID)).get,
    onShow: () => draw(UI.vis),
    judge: (r, a) => ({ ok: a === r.at, okMsg: `answered at ${r.at}, total ${r.cost}. ${r.trace}`, why: `${r.why} Path: ${r.trace} Answered at ${r.at}, total ${r.cost}.`, reveal: r.at }),
    onResult: (r, i, res) => draw(UI.vis, r.path, ANSWER_ID[r.at]),
    onDone: run => {
      finished = true;
      const box = run.explore('Review: click any node in the diagram to read its description');
      draw(UI.vis);
      infoEl = QK.E('div', 'qk-fb info', 'Click a node above.'); infoEl.style.gridColumn = '1/-1'; box.append(infoEl);
    }
  });
});
