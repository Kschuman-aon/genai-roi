// The AI Family Tree - vis-network
// CANVAS_HEIGHT: 600
//
// Seven terms from Chapter 1 arranged as a top-down chain of nested categories.
// Six of them nest ("contains" edges); Neural Network hangs off Deep Learning
// with a dashed "built on" edge because it is the mechanism, not a narrower scope.
//
// Interaction policy: mouse wheel zoom and drag-pan stay OFF when the sim is
// embedded in a chapter iframe so the page keeps scrolling normally. Navigation
// buttons are always available; wheel/drag turn on only when main.html is opened
// standalone (fullscreen link).

// ===========================================
// CONFIGURATION
// ===========================================

// Color deepens with specificity: pale blue (broadest) to dark teal (narrowest).
// Neural Network sits outside that scale - it is a mechanism, not a scope level.
const PALETTE = {
    ai:  { background: '#e3f2fd', border: '#64b5f6', font: '#0d3c61' },
    ml:  { background: '#bbdefb', border: '#42a5f5', font: '#0d3c61' },
    dl:  { background: '#90caf9', border: '#1e88e5', font: '#0d3c61' },
    nn:  { background: '#f3f0fa', border: '#8e7cc3', font: '#3d2e63' },
    gen: { background: '#80cbc4', border: '#26a69a', font: '#0b3b37' },
    fm:  { background: '#26a69a', border: '#00796b', font: '#ffffff' },
    llm: { background: '#00695c', border: '#004d40', font: '#ffffff' }
};

const HIGHLIGHT = { background: '#ff9800', border: '#e65100', font: '#3d2100' };
const DIMMED    = { background: '#f2f2f2', border: '#d0d0d0', font: '#9e9e9e' };

const EDGE_CONTAINS = '#222222';
const EDGE_BUILT_ON = '#888888';
const EDGE_DIMMED   = '#dcdcdc';

// Vertical spacing between levels of the chain, in graph units
const LEVEL_GAP = 78;
const CHAIN_X   = -130;   // chain runs down the left of the graph area
const BRANCH_X  = 170;    // Neural Network branches to the right of Deep Learning

// Screen space reserved around the graph so overlays never cover a node
const TITLE_BAND = 38;    // title strip across the top
const PANEL_GUTTER = 20;  // breathing room between graph and the right panel
const LEGEND_GUTTER = 16; // breathing room above the legend

// Definitions are one-sentence paraphrases of Chapter 1's own wording.
const TERMS = [
    {
        id: 'ai',
        label: 'Artificial Intelligence',
        scope: 'Broadest category',
        definition: 'Any computer system that performs a task we would otherwise say requires human intelligence - recognizing a face, translating a sentence, playing a board game well.',
        cost: 'Tells you almost nothing about cost: the category spans rule-based scripts and billion-parameter models alike.',
        x: CHAIN_X, y: -2.5 * LEVEL_GAP
    },
    {
        id: 'ml',
        label: 'Machine Learning',
        scope: 'Subset of Artificial Intelligence',
        definition: 'The subfield of AI in which a system improves at a task by learning patterns from data instead of following rules a programmer wrote by hand.',
        cost: 'Once behavior comes from data, you pay for the data, the compute to learn from it, and the compute to apply it.',
        x: CHAIN_X, y: -1.5 * LEVEL_GAP
    },
    {
        id: 'dl',
        label: 'Deep Learning',
        scope: 'Subset of Machine Learning',
        definition: 'The branch of machine learning built on neural networks - layers of simple units stacked deep enough to learn far more intricate patterns.',
        cost: 'This is the layer where GPU spend, training time, and model size actually live.',
        x: CHAIN_X, y: -0.5 * LEVEL_GAP
    },
    {
        id: 'nn',
        label: 'Neural Network',
        scope: 'The mechanism deep learning is built on',
        definition: 'Computing systems loosely inspired by how neurons connect in a brain: layers of simple mathematical units that each transform their input before passing it on.',
        cost: 'Depth and width set the parameter count - the single biggest driver of both training and inference cost.',
        x: BRANCH_X, y: -0.5 * LEVEL_GAP
    },
    {
        id: 'gen',
        label: 'Generative AI',
        scope: 'Subset of Deep Learning',
        definition: 'A model that learns the underlying pattern of a whole class of data well enough to produce new, original examples of that class.',
        cost: 'Generating a new output costs far more than sorting an input into a category.',
        x: CHAIN_X, y: 0.5 * LEVEL_GAP
    },
    {
        id: 'fm',
        label: 'Foundation Model',
        scope: 'Subset of Generative AI',
        definition: 'A generative model trained on a very large, broad dataset so that it develops broadly useful capabilities before anyone specializes it for a particular job.',
        cost: 'Broad pretraining often costs millions in compute, which is why most organizations buy access rather than build one.',
        x: CHAIN_X, y: 1.5 * LEVEL_GAP
    },
    {
        id: 'llm',
        label: 'Large Language Model',
        scope: 'Subset of Foundation Models',
        definition: 'A foundation model specialized in text: trained on enormous quantities of written language so it can read, summarize, translate, and generate more of it.',
        cost: 'The central object of this course - its tokens, inference cost, and deployment choice are what the rest of the book measures.',
        x: CHAIN_X, y: 2.5 * LEVEL_GAP
    }
];

const TERM_BY_ID = {};
TERMS.forEach(function (t) { TERM_BY_ID[t.id] = t; });

// "contains" edges: each broader category to the next-narrower one it contains
const CONTAINS = [
    { from: 'ai',  to: 'ml'  },
    { from: 'ml',  to: 'dl'  },
    { from: 'dl',  to: 'gen' },
    { from: 'gen', to: 'fm'  },
    { from: 'fm',  to: 'llm' }
];

// The one "built on" edge
const BUILT_ON = { from: 'dl', to: 'nn' };

// Lookup tables for chain highlighting
const PARENT_OF = { ml: 'ai', dl: 'ml', gen: 'dl', fm: 'gen', llm: 'fm', nn: 'dl' };
const CHILD_OF  = { ai: 'ml', ml: 'dl', dl: 'gen', gen: 'fm', fm: 'llm' };

// Reveal order for the step-through. Neural Network appears with Deep Learning.
const REVEAL_ORDER = [['ai'], ['ml'], ['dl', 'nn'], ['gen'], ['fm'], ['llm']];
const TOTAL_STEPS = REVEAL_ORDER.length;

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let selectedId = null;    // node whose chain is highlighted (click)
let hoveredId = null;     // node under the cursor
let step = TOTAL_STEPS;   // TOTAL_STEPS means "show all"

// ===========================================
// ENVIRONMENT DETECTION
// ===========================================

// True when running inside a chapter iframe (where wheel zoom would hijack scroll)
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true; // cross-origin iframe
    }
}

// Editor mode: main.html?enable-save=true lets you drag nodes and dump positions
function isSaveEnabled() {
    const params = new URLSearchParams(window.location.search);
    return params.get('enable-save') === 'true';
}

// ===========================================
// VISIBILITY (step-through)
// ===========================================

function visibleIds() {
    const shown = [];
    for (let i = 0; i < step && i < TOTAL_STEPS; i++) {
        REVEAL_ORDER[i].forEach(function (id) { shown.push(id); });
    }
    return shown;
}

function isVisible(id) {
    return visibleIds().indexOf(id) !== -1;
}

// ===========================================
// CHAIN HIGHLIGHTING
// ===========================================

// The chain for a node: every ancestor up to Artificial Intelligence, plus every
// narrower category below it that is currently on the graph.
function chainFor(id) {
    const chain = [id];

    let up = PARENT_OF[id];
    while (up) {
        chain.push(up);
        up = PARENT_OF[up];
    }

    let down = CHILD_OF[id];
    while (down && isVisible(down)) {
        chain.push(down);
        down = CHILD_OF[down];
    }

    return chain;
}

// ===========================================
// RENDERING
// ===========================================

function nodeStyle(id, chain) {
    const highlighting = chain !== null;
    const inChain = highlighting && chain.indexOf(id) !== -1;

    if (highlighting && !inChain) {
        return DIMMED;
    }
    if (inChain) {
        return HIGHLIGHT;
    }
    return PALETTE[id];
}

function applyStyles() {
    const chain = selectedId ? chainFor(selectedId) : null;
    const shown = visibleIds();

    nodes.update(TERMS.map(function (t) {
        const style = nodeStyle(t.id, chain);
        return {
            id: t.id,
            hidden: shown.indexOf(t.id) === -1,
            color: {
                background: style.background,
                border: style.border,
                highlight: { background: style.background, border: style.border },
                hover: { background: style.background, border: style.border }
            },
            font: { color: style.font }
        };
    }));

    edges.update(edgeDefinitions().map(function (e) {
        const bothShown = shown.indexOf(e.from) !== -1 && shown.indexOf(e.to) !== -1;
        const inChain = chain && chain.indexOf(e.from) !== -1 && chain.indexOf(e.to) !== -1;

        let color;
        if (chain && !inChain) {
            color = EDGE_DIMMED;
        } else if (inChain) {
            color = HIGHLIGHT.border;
        } else {
            color = e.builtOn ? EDGE_BUILT_ON : EDGE_CONTAINS;
        }

        return {
            id: e.id,
            hidden: !bothShown,
            color: { color: color, highlight: color, hover: color },
            width: inChain ? 4 : (e.builtOn ? 2 : 3)
        };
    }));
}

function edgeDefinitions() {
    const list = CONTAINS.map(function (e) {
        return { id: e.from + '-' + e.to, from: e.from, to: e.to, builtOn: false, label: 'contains' };
    });
    list.push({
        id: BUILT_ON.from + '-' + BUILT_ON.to,
        from: BUILT_ON.from,
        to: BUILT_ON.to,
        builtOn: true,
        label: 'built on'
    });
    return list;
}

// ===========================================
// INFO PANEL
// ===========================================

function showTerm(id) {
    const term = TERM_BY_ID[id];
    if (!term) { return; }

    document.getElementById('info-term').textContent = term.label;
    document.getElementById('info-content').innerHTML =
        '<div class="info-scope">' + term.scope + '</div>' +
        '<div>' + term.definition + '</div>' +
        '<div class="info-cost"><strong>Cost angle:</strong> ' + term.cost + '</div>';
}

function showPlaceholder() {
    document.getElementById('info-term').textContent =
        step < TOTAL_STEPS ? 'Keep narrowing' : 'Start anywhere';
    document.getElementById('info-content').innerHTML =
        '<p class="info-placeholder">Hover or click any term to see its definition, ' +
        'or step down the tree one level at a time.</p>';
}

function updateStats() {
    const stats = document.getElementById('stats');
    const nextBtn = document.getElementById('next-btn');

    if (step >= TOTAL_STEPS) {
        stats.textContent = 'All 7 terms shown';
        // At full tree the button restarts the walkthrough rather than sitting disabled
        nextBtn.innerHTML = 'Start &#9654;';
    } else {
        const label = TERM_BY_ID[REVEAL_ORDER[step - 1][0]].label;
        stats.textContent = 'Level ' + step + ' of ' + TOTAL_STEPS + ': ' + label;
        nextBtn.innerHTML = 'Narrow &#9654;';
    }

    document.getElementById('back-btn').disabled = (step <= 1);
}

// ===========================================
// EVENT HANDLERS
// ===========================================

function handleClick(params) {
    if (params.nodes.length > 0) {
        const id = params.nodes[0];
        selectedId = (selectedId === id) ? null : id;  // click again to clear
        if (selectedId) {
            showTerm(selectedId);
        } else {
            showPlaceholder();
        }
    } else {
        selectedId = null;
        showPlaceholder();
    }
    applyStyles();
}

function handleHover(params) {
    hoveredId = params.node;
    showTerm(hoveredId);
}

function handleBlur() {
    hoveredId = null;
    if (selectedId) {
        showTerm(selectedId);
    } else {
        showPlaceholder();
    }
}

function stepForward() {
    if (step >= TOTAL_STEPS) {
        // Full tree is showing: restart the walkthrough at the broadest term
        step = 1;
        selectedId = null;
    } else {
        step += 1;
    }
    showTerm(REVEAL_ORDER[step - 1][0]);
    applyStyles();
    updateStats();
}

function stepBack() {
    if (step > 1) {
        // Clear a highlight that would point at a term no longer on the graph
        step -= 1;
        if (selectedId && !isVisible(selectedId)) {
            selectedId = null;
        }
        showTerm(REVEAL_ORDER[step - 1][0]);
        applyStyles();
        updateStats();
    }
}

function showAll() {
    step = TOTAL_STEPS;
    selectedId = null;
    showPlaceholder();
    applyStyles();
    updateStats();
}

// ===========================================
// VIEW POSITIONING
// ===========================================

// Bounding box of the whole tree in canvas coordinates, measured once while
// every node is visible so the framing never shifts during the step-through.
let contentBox = null;

function measureContent() {
    let box = null;
    TERMS.forEach(function (t) {
        const b = network.getBoundingBox(t.id);
        if (!b) { return; }
        box = box ? {
            left:   Math.min(box.left, b.left),
            right:  Math.max(box.right, b.right),
            top:    Math.min(box.top, b.top),
            bottom: Math.max(box.bottom, b.bottom)
        } : { left: b.left, right: b.right, top: b.top, bottom: b.bottom };
    });
    contentBox = box;
}

// Frame the tree inside the space the overlays leave free: below the title,
// left of the right panel, above the legend. vis-network's own fit() would
// expand the graph under those overlays, so the camera is placed explicitly.
function positionView() {
    if (!network) { return; }
    if (!contentBox) { measureContent(); }
    if (!contentBox) { return; }

    const container = document.getElementById('network');
    const panel = document.querySelector('.right-panel');
    const legend = document.querySelector('.legend');

    const W = container.clientWidth;
    const H = container.clientHeight;
    const panelBand = (panel ? panel.offsetWidth + PANEL_GUTTER : 292) + 10;
    const legendBand = (legend ? legend.offsetHeight + LEGEND_GUTTER : 100) + 10;

    // The rectangle the graph may occupy
    const availW = Math.max(160, W - panelBand - 10);
    const availH = Math.max(160, H - TITLE_BAND - legendBand);
    const targetX = 10 + availW / 2;
    const targetY = TITLE_BAND + availH / 2;

    const contentW = contentBox.right - contentBox.left;
    const contentH = contentBox.bottom - contentBox.top;
    const scale = Math.min(1.0, availW / contentW, availH / contentH);

    // screenX = W/2 + (worldX - camX) * scale, solved for camX
    const centerX = (contentBox.left + contentBox.right) / 2;
    const centerY = (contentBox.top + contentBox.bottom) / 2;

    network.moveTo({
        position: {
            x: centerX + (W / 2 - targetX) / scale,
            y: centerY + (H / 2 - targetY) / scale
        },
        scale: scale,
        animation: false
    });
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================

function initializeNetwork() {
    const saveEnabled = isSaveEnabled();
    const mouseNav = saveEnabled || !isInIframe();  // never hijack chapter scrolling

    nodes = new vis.DataSet(TERMS.map(function (t) {
        return { id: t.id, label: t.label, x: t.x, y: t.y };
    }));

    edges = new vis.DataSet(edgeDefinitions().map(function (e) {
        return {
            id: e.id,
            from: e.from,
            to: e.to,
            dashes: e.builtOn ? [6, 5] : false,
            label: e.builtOn ? 'built on' : ''
        };
    }));

    const options = {
        layout: {
            improvedLayout: false   // fixed positions below stand in for a hierarchy
        },
        physics: {
            enabled: false          // nothing should drift once drawn
        },
        interaction: {
            hover: true,
            selectConnectedEdges: false,
            zoomView: mouseNav,
            dragView: mouseNav,
            dragNodes: saveEnabled,
            navigationButtons: true,
            keyboard: { enabled: true, bindToWindow: false, speed: { x: 2, y: 2, zoom: 0.01 } }
        },
        nodes: {
            shape: 'box',
            margin: 10,
            widthConstraint: { minimum: 190, maximum: 190 },
            font: { size: 15, face: 'Arial', multi: false },
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            width: 3,
            smooth: false,
            font: { size: 11, color: '#666666', strokeWidth: 4, strokeColor: '#f0f8ff', align: 'top' }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    network.on('click', handleClick);
    network.on('hoverNode', handleHover);
    network.on('blurNode', handleBlur);

    // vis-network auto-centers after init, so pan only once it has drawn
    network.once('afterDrawing', positionView);

    applyStyles();
    updateStats();
}

// ===========================================
// STARTUP
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    initializeNetwork();

    document.getElementById('next-btn').addEventListener('click', stepForward);
    document.getElementById('back-btn').addEventListener('click', stepBack);
    document.getElementById('reset-btn').addEventListener('click', showAll);

    // Keep the tree framed when the iframe is resized
    let resizeTimer = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionView, 120);
    });
});
