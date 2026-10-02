// The RAG Pipeline - Mermaid
// CANVAS_HEIGHT: 420
//
// Five-step RAG pipeline plus a dashed "Without RAG" branch off the query
// node. Every node has a Mermaid click directive bound to showInfo().

const STEP_INFO = {
  A: { title: 'User Query', text: 'The question or task as typed by the user.' },
  B: { title: 'Embed Query', text: 'Converts the query into a numerical embedding so it can be compared for similarity. Skipping this means no way to search by meaning.' },
  C: { title: 'Vector Database Search', text: 'Finds the most relevant stored text by comparing embeddings. Skipping this means no retrieval happens at all.' },
  D: { title: 'Augment Prompt', text: 'Inserts the retrieved text into the prompt alongside the original query, at the cost of additional input tokens.' },
  E: { title: 'Grounded Answer', text: 'The model answers using both its training and the retrieved context, sharply reducing hallucination risk on covered topics.' },
  F: { title: 'Without RAG', text: 'The model answers from training memory alone. Cheaper per request (no retrieval step, shorter prompt) but far more exposed to hallucination on anything outside its training data.' }
};

const GRAPH_DEFINITION = `graph LR
    A["User Query"]:::main
    B["Embed Query"]:::main
    C["Vector Database<br/>Search"]:::main
    D["Augment Prompt"]:::main
    E["Grounded Answer"]:::main
    F["Without RAG"]:::branch

    A --> B --> C --> D --> E
    A -.-> F

    classDef main fill:#3949ab,stroke:#333,stroke-width:2px,color:#ffffff,font-size:16px
    classDef branch fill:#9e9e9e,stroke:#555555,stroke-width:2px,color:#ffffff,font-size:16px,stroke-dasharray: 5 5

    click A call showInfo("A")
    click B call showInfo("B")
    click C call showInfo("C")
    click D call showInfo("D")
    click E call showInfo("E")
    click F call showInfo("F")

    linkStyle default stroke:#999999,stroke-width:2px,font-size:16px
`;

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; }
    .rag-container { display:flex; width:100%; height:418px; font-family: Arial, Helvetica, sans-serif; }
    .rag-diagram { width:66.67%; height:100%; background-color:aliceblue; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .rag-diagram svg { max-width:95%; max-height:95%; }
    .rag-info-panel { width:33.33%; height:100%; box-sizing:border-box; padding:10px 12px; background:#ffffff; border-left:1px solid #cbd5e1; overflow:hidden; }
    .rag-legend { margin-bottom:12px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px; padding:8px 10px; background:#fff; }
    .rag-legend-item { display:flex; align-items:center; margin:3px 0; }
    .rag-swatch { width:14px; height:14px; margin-right:6px; display:inline-block; border:1px solid #333; }
    .rag-h3 { margin:0 0 8px 0; font-size:15px; }
    #rag-panel { background-color:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; line-height:1.4; min-height:170px; }
    #rag-panel .rag-title { font-weight:bold; display:block; margin-bottom:6px; color:#1a237e; }
    .node { cursor:pointer; }
    .rag-title-bar { text-align:center; font-size:18px; font-weight:bold; padding:8px 0 4px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="rag-title-bar">The RAG Pipeline</div>
    <div class="rag-container">
      <div class="rag-diagram" id="rag-diagram"></div>
      <div class="rag-info-panel">
        <div class="rag-legend">
          <div class="rag-legend-item"><span class="rag-swatch" style="background:#3949ab;"></span>Main pipeline</div>
          <div class="rag-legend-item"><span class="rag-swatch" style="background:#9e9e9e;"></span>Without RAG (alternative)</div>
        </div>
        <h3 class="rag-h3">Step Details</h3>
        <div id="rag-panel">Click any step (or the "Without RAG" branch) to see its role and what skipping it would cost.</div>
      </div>
    </div>
  `;
}

window.showInfo = function (nodeId) {
  const info = STEP_INFO[nodeId];
  const panel = document.getElementById('rag-panel');
  if (info && panel) {
    panel.innerHTML = '<span class="rag-title">' + info.title + '</span>' + info.text;
  }
};

async function renderDiagram() {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
  });

  const target = document.getElementById('rag-diagram');
  const { svg, bindFunctions } = await mermaid.render('rag-svg', GRAPH_DEFINITION);
  target.innerHTML = svg;
  if (bindFunctions) bindFunctions(target);
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderDiagram();
});
