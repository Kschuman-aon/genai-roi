// Token Budget Governance Workflow - Mermaid
// CANVAS_HEIGHT: 420
//
// Decision flow for monitoring token spend against budget. Every node has
// a Mermaid click directive bound to showInfo().

const STEP_INFO = {
  A: { title: 'Token Consumption Rate Measured', text: 'Usage dashboards aggregate token counts across requests over a rolling window.' },
  B: { title: 'Rate Within Budget Pace?', text: 'Compare consumption rate x remaining period length against remaining token budget.' },
  C: { title: 'Continue Monitoring', text: 'No action needed; recheck at next interval.' },
  D: { title: 'Identify Largest Driver', text: 'Break down consumption by endpoint, team, or prompt pattern to find the outlier.' },
  E: { title: 'Apply Efficiency Lever', text: 'Candidates: prompt caching eligibility, batch API for non-urgent work, prompt compression, or model right-sizing (Chapter 2).' },
  F: { title: 'Re-measure Consumption Rate', text: 'Confirm the lever reduced the rate before closing the loop.' }
};

const GRAPH_DEFINITION = `graph LR
    A["Token Consumption<br/>Rate Measured"]:::measure
    B{"Rate Within<br/>Budget Pace?"}:::decision
    C["Continue Monitoring"]:::resolve
    D["Identify Largest Driver"]:::resolve
    E["Apply Efficiency Lever"]:::resolve
    F["Re-measure<br/>Consumption Rate"]:::measure

    A --> B
    B -->|Yes| C
    B -->|No| D --> E --> F

    classDef measure fill:#1565c0,stroke:#333,stroke-width:2px,color:#ffffff,font-size:16px
    classDef decision fill:#fdd835,stroke:#333,stroke-width:2px,color:#333333,font-size:16px
    classDef resolve fill:#2e7d32,stroke:#333,stroke-width:2px,color:#ffffff,font-size:16px

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
    .tg-container { display:flex; width:100%; height:418px; font-family: Arial, Helvetica, sans-serif; }
    .tg-diagram { width:66.67%; height:100%; background-color:aliceblue; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .tg-diagram svg { max-width:95%; max-height:95%; }
    .tg-info-panel { width:33.33%; height:100%; box-sizing:border-box; padding:10px 12px; background:#ffffff; border-left:1px solid #cbd5e1; overflow:hidden; }
    .tg-legend { margin-bottom:12px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px; padding:8px 10px; background:#fff; }
    .tg-legend-item { display:flex; align-items:center; margin:3px 0; }
    .tg-swatch { width:14px; height:14px; margin-right:6px; display:inline-block; border:1px solid #333; }
    .tg-h3 { margin:0 0 8px 0; font-size:15px; }
    #tg-panel { background-color:#f8fafc; color:#334155; border:1px solid #e2e8f0; border-radius:6px; padding:10px; font-size:14px; line-height:1.4; min-height:170px; }
    #tg-panel .tg-title { font-weight:bold; display:block; margin-bottom:6px; color:#1a237e; }
    .node { cursor:pointer; }
    .tg-title-bar { text-align:center; font-size:18px; font-weight:bold; padding:8px 0 4px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="tg-title-bar">Token Budget Governance Workflow</div>
    <div class="tg-container">
      <div class="tg-diagram" id="tg-diagram"></div>
      <div class="tg-info-panel">
        <div class="tg-legend">
          <div class="tg-legend-item"><span class="tg-swatch" style="background:#1565c0;"></span>Measurement</div>
          <div class="tg-legend-item"><span class="tg-swatch" style="background:#fdd835;"></span>Decision</div>
          <div class="tg-legend-item"><span class="tg-swatch" style="background:#2e7d32;"></span>Resolution</div>
        </div>
        <h3 class="tg-h3">Step Details</h3>
        <div id="tg-panel">Click any step to see what happens there.</div>
      </div>
    </div>
  `;
}

window.showInfo = function (nodeId) {
  const info = STEP_INFO[nodeId];
  const panel = document.getElementById('tg-panel');
  if (info && panel) {
    panel.innerHTML = '<span class="tg-title">' + info.title + '</span>' + info.text;
  }
};

async function renderDiagram() {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
  });

  const target = document.getElementById('tg-diagram');
  const { svg, bindFunctions } = await mermaid.render('tg-svg', GRAPH_DEFINITION);
  target.innerHTML = svg;
  if (bindFunctions) bindFunctions(target);
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderDiagram();
});
