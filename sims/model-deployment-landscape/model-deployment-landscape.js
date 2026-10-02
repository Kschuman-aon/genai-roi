// The GenAI Deployment Landscape - vis-network
// CANVAS_HEIGHT: 480
//
// Provider -> Model -> API Endpoint, left to right, with a Multimodal Model
// node attached to GPT-4 via a dashed "is a" edge. Overlay panels are built
// as SIBLINGS of the #network div (never children - vis-network replaces a
// container's innerHTML on init).

const DEFINITIONS = {
  1: 'Model Provider: the organization that trains or hosts a model and makes it available for use.',
  2: 'Model Provider: a cloud host running an open-weight model on its own infrastructure.',
  3: 'Model - Proprietary: a closed-weight model only accessible through its provider\'s own API.',
  4: 'Model - Open-Source: an open-weight model whose weights can be downloaded and self-hosted.',
  5: 'API Endpoint: the network address an application calls to send requests to a hosted model.',
  6: 'API Endpoint: a self-managed address exposing a self-hosted open-weight model.',
  7: 'Multimodal Model: a model that accepts more than one input type, such as text and images, not just text alone.'
};

const PINK = { background: '#f8bbd0', border: '#c2185b', font: '#4a0e2a' };
const BLUE_LIGHT = { background: '#bbdefb', border: '#1976d2', font: '#0d2b4e' };
const BLUE_DARK = { background: '#1565c0', border: '#0d47a1', font: '#0d2b4e' };
const ORANGE = { background: '#ffcc80', border: '#ef6c00', font: '#4a2800' };
const GREEN = { background: '#a5d6a7', border: '#2e7d32', font: '#0d3b12' };
const HIGHLIGHT = '#ff9800';

const NODE_DATA = [
  { id: 1, label: 'OpenAI', shape: 'box', x: -450, y: -80, color: PINK },
  { id: 2, label: 'A cloud host', shape: 'box', x: -450, y: 95, color: PINK },
  { id: 3, label: 'GPT-4\n(Proprietary)', shape: 'dot', size: 22, x: -150, y: -80, color: BLUE_DARK },
  { id: 4, label: 'Llama 3 70B\n(Open-Source)', shape: 'dot', size: 22, x: -150, y: 95, color: BLUE_LIGHT },
  { id: 5, label: 'api.openai.com/\nv1/chat/completions', shape: 'diamond', size: 20, x: 170, y: -80, color: ORANGE },
  { id: 6, label: 'a self-managed\nendpoint', shape: 'diamond', size: 20, x: 100, y: 45, color: ORANGE },
  { id: 7, label: 'Multimodal Model\n(+image)', shape: 'dot', size: 20, x: -150, y: -230, color: GREEN }
];

const EDGE_DATA = [
  { id: 'e1', from: 1, to: 3, label: 'hosts', dashes: false },
  { id: 'e2', from: 2, to: 4, label: 'hosts', dashes: false },
  { id: 'e3', from: 3, to: 5, label: 'exposed via', dashes: false },
  { id: 'e4', from: 4, to: 6, label: 'exposed via', dashes: false },
  { id: 'e5', from: 7, to: 3, label: 'is a', dashes: true }
];

let nodes, edges, network;
let highlightedChain = new Set();

function isInIframe() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .dl-container { position:relative; width:100%; height:478px; }
    #dl-network { width:100%; height:100%; background-color:aliceblue; }
    .dl-title { position:absolute; top:8px; left:50%; transform:translateX(-50%); font-size:18px; font-weight:bold; z-index:10; }
    .dl-legend { position:absolute; bottom:8px; left:10px; padding:8px 10px; background:rgba(255,255,255,0.95); border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.15); font-size:11px; z-index:10; }
    .dl-legend-item { display:flex; align-items:center; margin:2px 0; }
    .dl-swatch { width:14px; height:14px; margin-right:6px; display:inline-block; border:1px solid #333; }
    .dl-right-panel { position:absolute; top:40px; right:10px; width:230px; z-index:10; }
    .dl-info { background:rgba(255,255,255,0.97); border-radius:8px; padding:10px; box-shadow:0 2px 4px rgba(0,0,0,0.15); font-size:13px; min-height:90px; }
    .dl-info-title { font-weight:bold; margin-bottom:4px; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="dl-container">
      <div id="dl-network"></div>
      <div class="dl-title">The GenAI Deployment Landscape</div>
      <div class="dl-legend">
        <div class="dl-legend-item"><span class="dl-swatch" style="background:#f8bbd0;"></span>Model Provider</div>
        <div class="dl-legend-item"><span class="dl-swatch" style="background:#1565c0;"></span>Model - Proprietary</div>
        <div class="dl-legend-item"><span class="dl-swatch" style="background:#bbdefb;"></span>Model - Open-Source</div>
        <div class="dl-legend-item"><span class="dl-swatch" style="background:#ffcc80;"></span>API Endpoint</div>
        <div class="dl-legend-item"><span class="dl-swatch" style="background:#a5d6a7;"></span>Multimodal Model</div>
        <div class="dl-legend-item">Click an endpoint to trace its full path.</div>
      </div>
      <div class="dl-right-panel">
        <div class="dl-info" id="dl-info">Hover or click a node for details.</div>
      </div>
    </div>
  `;
}

function colorFor(color, isHighlighted) {
  if (isHighlighted) {
    return { background: HIGHLIGHT, border: '#e65100', font: { color: '#3d2100', size: 14 } };
  }
  return { background: color.background, border: color.border, font: { color: color.font, size: 14 } };
}

function applyHighlight() {
  const updates = NODE_DATA.map(n => ({
    id: n.id,
    color: colorFor(n.color, highlightedChain.has(n.id))
  }));
  nodes.update(updates);
  const edgeUpdates = EDGE_DATA.map(e => ({
    id: e.id,
    color: { color: (highlightedChain.has(e.from) && highlightedChain.has(e.to)) ? HIGHLIGHT : '#555555' },
    width: (highlightedChain.has(e.from) && highlightedChain.has(e.to)) ? 3 : 1.5
  }));
  edges.update(edgeUpdates);
}

function tracePathToEndpoint(endpointId) {
  // Walk backwards: endpoint -> model -> provider, plus any multimodal tag.
  const chain = new Set([endpointId]);
  const toEdge = EDGE_DATA.find(e => e.to === endpointId);
  if (toEdge) {
    chain.add(toEdge.from);
    const hostEdge = EDGE_DATA.find(e => e.to === toEdge.from && e.label === 'hosts');
    if (hostEdge) chain.add(hostEdge.from);
    const isaEdge = EDGE_DATA.find(e => e.to === toEdge.from && e.label === 'is a');
    if (isaEdge) chain.add(isaEdge.from);
  }
  return chain;
}

function handleClick(params) {
  if (params.nodes.length === 0) {
    highlightedChain = new Set();
    applyHighlight();
    return;
  }
  const nodeId = params.nodes[0];
  const node = NODE_DATA.find(n => n.id === nodeId);
  if (node.shape === 'diamond') {
    highlightedChain = tracePathToEndpoint(nodeId);
  } else {
    highlightedChain = new Set([nodeId]);
  }
  applyHighlight();
}

function handleHover(params) {
  const info = document.getElementById('dl-info');
  info.innerHTML = '<div class="dl-info-title">' + NODE_DATA.find(n => n.id === params.node).label.replace('\n', ' ') + '</div>' + DEFINITIONS[params.node];
}

function handleBlur() {
  document.getElementById('dl-info').innerHTML = 'Hover or click a node for details.';
}

function initializeNetwork() {
  const initialNodes = NODE_DATA.map(n => ({
    id: n.id,
    label: n.label,
    shape: n.shape,
    size: n.size,
    x: n.x,
    y: n.y,
    color: colorFor(n.color, false),
    font: { color: n.color.font, size: 14 }
  }));
  const initialEdges = EDGE_DATA.map(e => ({
    id: e.id,
    from: e.from,
    to: e.to,
    label: e.label,
    dashes: e.dashes,
    arrows: { to: { enabled: true, scaleFactor: 0.9 } },
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

  const container = document.getElementById('dl-network');
  network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
  network.on('click', handleClick);
  network.on('hoverNode', handleHover);
  network.on('blurNode', handleBlur);

  network.once('afterDrawing', function () {
    const pos = network.getViewPosition();
    network.moveTo({ position: { x: pos.x - 40, y: pos.y }, animation: false });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  initializeNetwork();
});
