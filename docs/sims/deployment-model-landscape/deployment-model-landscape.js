// Where Should This Model Run? - vis-network
// CANVAS_HEIGHT: 460
//
// Deployed Model branching into On-Premises vs. Cloud-Hosted deployment.
// Box-shaped nodes (label rendered inside, unlike 'dot') for readability.

const HOVER_SUMMARY = {
  2: 'Full control, high upfront cost, high operational burden.',
  3: 'Low upfront cost, shared control, low operational burden.'
};

const CLICK_DETAIL = {
  2: 'Cost structure: high upfront capital, lower marginal cost at scale. Control: full data and hardware control. Operational burden: high - your team runs everything.',
  3: 'Cost structure: low upfront cost, ongoing operating expense that scales with usage. Control: shared with the provider. Operational burden: low - the provider manages most infrastructure.'
};

const ORANGE = { background: '#ffcc80', border: '#ef6c00', font: '#4a2800' };
const BLUE = { background: '#90caf9', border: '#1565c0', font: '#0d2b4e' };
const GREEN = { background: '#a5d6a7', border: '#2e7d32', font: '#0d3b12' };

const NODE_DATA = [
  { id: 1, label: 'Deployed Model', x: 0, y: -160, color: ORANGE, shapeProps: { shape: 'box' } },
  { id: 2, label: 'On-Premises\nDeployment', x: -220, y: 40, color: BLUE, shapeProps: { shape: 'box' } },
  { id: 3, label: 'Cloud-Hosted\nModel', x: 220, y: 40, color: GREEN, shapeProps: { shape: 'box' } }
];

const EDGE_DATA = [
  { id: 'e1', from: 1, to: 2, label: 'deployed via' },
  { id: 'e2', from: 1, to: 3, label: 'deployed via' }
];

let nodes, edges, network;

function isInIframe() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .dm-container { position:relative; width:100%; height:458px; }
    #dm-network { width:100%; height:100%; background-color:aliceblue; }
    .dm-title { position:absolute; top:8px; left:50%; transform:translateX(-50%); font-size:18px; font-weight:bold; z-index:10; }
    .dm-legend { position:absolute; top:40px; left:10px; padding:8px 10px; background:rgba(255,255,255,0.95); border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.15); font-size:12px; z-index:10; }
    .dm-legend-item { display:flex; align-items:center; margin:2px 0; }
    .dm-swatch { width:14px; height:14px; margin-right:6px; display:inline-block; border:1px solid #333; }
    .dm-info-panel { position:absolute; top:40px; right:10px; width:260px; z-index:10; }
    .dm-info { background:rgba(255,255,255,0.97); border-radius:8px; padding:10px; box-shadow:0 2px 4px rgba(0,0,0,0.15); font-size:13px; min-height:100px; }
    .dm-info-title { font-weight:bold; margin-bottom:4px; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="dm-container">
      <div id="dm-network"></div>
      <div class="dm-title">Where Should This Model Run?</div>
      <div class="dm-legend">
        <div class="dm-legend-item"><span class="dm-swatch" style="background:#90caf9;"></span>On-Premises Deployment</div>
        <div class="dm-legend-item"><span class="dm-swatch" style="background:#a5d6a7;"></span>Cloud-Hosted Model</div>
      </div>
      <div class="dm-info-panel">
        <div class="dm-info" id="dm-info">Hover or click a branch for its cost, control, and operational-burden profile.</div>
      </div>
    </div>
  `;
}

function handleHover(params) {
  const info = document.getElementById('dm-info');
  if (HOVER_SUMMARY[params.node]) {
    const node = NODE_DATA.find(n => n.id === params.node);
    info.innerHTML = '<div class="dm-info-title">' + node.label.replace('\n', ' ') + '</div>' + HOVER_SUMMARY[params.node];
  }
}

function handleBlur() {
  document.getElementById('dm-info').innerHTML = 'Hover or click a branch for its cost, control, and operational-burden profile.';
}

function handleClick(params) {
  if (params.nodes.length === 0) return;
  const nodeId = params.nodes[0];
  if (!CLICK_DETAIL[nodeId]) return;
  const node = NODE_DATA.find(n => n.id === nodeId);
  const info = document.getElementById('dm-info');
  info.innerHTML = '<div class="dm-info-title">' + node.label.replace('\n', ' ') + '</div>' + CLICK_DETAIL[nodeId];
}

function initializeNetwork() {
  const initialNodes = NODE_DATA.map(n => ({
    id: n.id,
    label: n.label,
    shape: n.shapeProps.shape,
    x: n.x,
    y: n.y,
    margin: 10,
    color: { background: n.color.background, border: n.color.border },
    font: { color: n.color.font, size: 14 }
  }));
  const initialEdges = EDGE_DATA.map(e => ({
    id: e.id,
    from: e.from,
    to: e.to,
    label: e.label,
    arrows: { to: { enabled: true, scaleFactor: 1 } },
    color: { color: '#555555' },
    font: { size: 11, color: '#555555', strokeWidth: 3, strokeColor: '#f0f8ff' }
  }));

  nodes = new vis.DataSet(initialNodes);
  edges = new vis.DataSet(initialEdges);

  const enableMouse = !isInIframe();
  const options = {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: {
      selectConnectedEdges: false,
      zoomView: enableMouse,
      dragView: enableMouse,
      dragNodes: true,
      navigationButtons: true,
      keyboard: { enabled: true, bindToWindow: false, speed: { x: 2, y: 2, zoom: 0.01 } }
    }
  };

  const container = document.getElementById('dm-network');
  network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
  network.on('click', handleClick);
  network.on('hoverNode', handleHover);
  network.on('blurNode', handleBlur);

  network.once('afterDrawing', function () {
    const pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x, y: pos.y - 20 }, animation: false });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  initializeNetwork();
});
