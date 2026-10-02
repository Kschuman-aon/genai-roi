// Context Window Budget Allocation - Chart.js
// CANVAS_HEIGHT: 420
//
// Single stacked horizontal bar showing how a token limit is divided among
// system prompt, retrieved docs, conversation history, input headroom, and
// reserved output. A dropdown switches the total limit; the system prompt
// stays a fixed 500 tokens while the other segments scale proportionally.

const BASELINE_TOTAL = 32000;
const BASELINE = {
  'System prompt': 500,
  'Retrieved documents': 4000,
  'Conversation history': 2500,
  'Remaining input headroom': 15000,
  'Reserved output budget': 10000
};
const DESCRIPTIONS = {
  'System prompt': 'Persistent instructions resent every request - a fixed cost regardless of window size.',
  'Retrieved documents': 'Context pulled in by retrieval-augmented generation for this request.',
  'Conversation history': 'Prior turns resent so the model keeps context across a multi-turn chat.',
  'Remaining input headroom': "Space left for the user's next message.",
  'Reserved output budget': 'Tokens set aside for the model\'s response.'
};
const COLORS = ['#1a237e', '#3949ab', '#7986cb', '#c5cae9', '#ef6c00'];

let chart = null;
let currentTotal = BASELINE_TOTAL;

function computeBreakdown(total) {
  const system = Math.min(BASELINE['System prompt'], total);
  const remaining = total - system;
  const otherBaselineSum = BASELINE_TOTAL - BASELINE['System prompt'];
  const result = { 'System prompt': system };
  let allocated = 0;
  const keys = Object.keys(BASELINE).filter(k => k !== 'System prompt');
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      result[k] = remaining - allocated;
    } else {
      const share = Math.round(remaining * (BASELINE[k] / otherBaselineSum));
      result[k] = share;
      allocated += share;
    }
  });
  return result;
}

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .cw-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .cw-chart-area { position:relative; height:260px; }
    .cw-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .cw-controls select { font-size:14px; padding:3px 6px; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="cw-wrap">
      <div class="cw-chart-area"><canvas id="cw-canvas"></canvas></div>
      <div class="cw-controls">
        <label for="cw-limit">Model token limit:</label>
        <select id="cw-limit">
          <option value="8000">8,000</option>
          <option value="32000" selected>32,000</option>
          <option value="128000">128,000</option>
        </select>
      </div>
    </div>
  `;

  document.getElementById('cw-limit').addEventListener('change', function (e) {
    currentTotal = parseInt(e.target.value, 10);
    updateChart();
  });
}

function updateChart() {
  const breakdown = computeBreakdown(currentTotal);
  const keys = Object.keys(breakdown);
  chart.data.datasets.forEach((ds, i) => { ds.data = [breakdown[keys[i]]]; });
  chart.options.scales.x.max = currentTotal;
  chart.update();
}

function renderChart() {
  const breakdown = computeBreakdown(currentTotal);
  const keys = Object.keys(breakdown);
  const ctx = document.getElementById('cw-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Token budget'],
      datasets: keys.map((k, i) => ({
        label: k,
        data: [breakdown[k]],
        backgroundColor: COLORS[i]
      }))
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Context Window Budget Allocation', font: { size: 16 } },
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (item) => {
              const pct = ((item.parsed.x / currentTotal) * 100).toFixed(1);
              return item.dataset.label + ': ' + item.parsed.x.toLocaleString() + ' tokens (' + pct + '%) - ' + DESCRIPTIONS[item.dataset.label];
            }
          }
        }
      },
      scales: {
        x: { stacked: true, max: currentTotal, title: { display: true, text: 'Tokens' } },
        y: { stacked: true }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
