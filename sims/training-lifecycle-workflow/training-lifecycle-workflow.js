// From Raw Text to Helpful Assistant - Mermaid
// CANVAS_HEIGHT: 420
//
// Four-stage training lifecycle flowchart. Every node has a Mermaid `click`
// directive bound to showInfo(), which populates the right-hand info panel -
// the diagram is rendered programmatically via mermaid.render() so the
// returned bindFunctions() can wire up those click handlers.

const STAGE_INFO = {
  A: {
    title: 'Pretraining',
    text: "Learns general language patterns from a massive, broad corpus. By far the largest compute cost; usually a one-time cost borne by the foundation-model builder."
  },
  B: {
    title: 'Fine-Tuning',
    text: "Adjusts the pretrained model toward a specific domain using a much smaller, focused dataset. A fraction of pretraining's cost; realistic for many organizations."
  },
  C: {
    title: 'Instruction Tuning',
    text: "Teaches the model to treat prompts as instructions to fulfill rather than text to merely continue. A specialized form of fine-tuning."
  },
  D: {
    title: 'RLHF Alignment',
    text: "Refines behavior using human preference comparisons rather than fixed example answers, favoring helpful and safe responses."
  }
};

const GRAPH_DEFINITION = `graph LR
    A["Pretraining"]:::stage1
    B["Fine-Tuning"]:::stage2
    C["Instruction Tuning"]:::stage3
    D["RLHF Alignment"]:::stage4
    A --> B --> C --> D

    classDef stage1 fill:#1a237e,stroke:#333,stroke-width:2px,color:#ffffff,font-size:16px
    classDef stage2 fill:#3949ab,stroke:#333,stroke-width:2px,color:#ffffff,font-size:16px
    classDef stage3 fill:#7986cb,stroke:#333,stroke-width:2px,color:#222222,font-size:16px
    classDef stage4 fill:#c5cae9,stroke:#333,stroke-width:2px,color:#222222,font-size:16px

    click A call showInfo("A")
    click B call showInfo("B")
    click C call showInfo("C")
    click D call showInfo("D")

    linkStyle default stroke:#999999,stroke-width:2px,font-size:16px
`;

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; }
    main { display:block; }
    .workflow-container { display:flex; width:100%; height:418px; font-family: Arial, Helvetica, sans-serif; }
    .diagram-panel { width:66.67%; height:100%; background-color:aliceblue; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .diagram-panel svg { max-width:95%; max-height:95%; }
    .info-panel { width:33.33%; height:100%; box-sizing:border-box; padding:10px 12px; background:#ffffff; border-left:1px solid #cbd5e1; overflow:hidden; }
    .wf-legend { margin-bottom:12px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px; padding:8px 10px; background:#fff; }
    .wf-legend-title { font-weight:bold; margin-bottom:4px; }
    .wf-h3 { margin:0 0 8px 0; font-size:15px; }
    #wf-panel { background-color:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; line-height:1.4; min-height:160px; }
    #wf-panel .wf-title { font-weight:bold; display:block; margin-bottom:6px; color:#1a237e; }
    .node { cursor:pointer; }
    .title-bar { text-align:center; font-size:18px; font-weight:bold; padding:8px 0 4px 0; font-family: Arial, Helvetica, sans-serif; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="title-bar">From Raw Text to Helpful Assistant</div>
    <div class="workflow-container">
      <div class="diagram-panel" id="wf-diagram"></div>
      <div class="info-panel">
        <div class="wf-legend">
          <div class="wf-legend-title">Color Key</div>
          <div>Darker shade = larger relative compute cost</div>
        </div>
        <h3 class="wf-h3">Stage Details</h3>
        <div id="wf-panel">Click any stage to see what happens there and how its cost compares to the others.</div>
      </div>
    </div>
  `;
}

window.showInfo = function (nodeId) {
  const info = STAGE_INFO[nodeId];
  const panel = document.getElementById('wf-panel');
  if (info && panel) {
    panel.innerHTML = '<span class="wf-title">' + info.title + '</span>' + info.text;
  }
};

async function renderDiagram() {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
  });

  const target = document.getElementById('wf-diagram');
  const { svg, bindFunctions } = await mermaid.render('wf-svg', GRAPH_DEFINITION);
  target.innerHTML = svg;
  if (bindFunctions) bindFunctions(target);
};

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderDiagram();
});
