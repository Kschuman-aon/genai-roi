// Three Ways to Shrink a Model - Chart.js
// CANVAS_HEIGHT: 500
//
// Grouped bar chart comparing inference cost reduction vs. quality impact
// across three compression techniques, with a sort toggle.

const TECHNIQUES = [
  { name: 'Quantization', costReduction: 40, qualityImpact: 5, blurb: 'Stores weights at lower numerical precision.' },
  { name: 'Knowledge Distillation', costReduction: 60, qualityImpact: 15, blurb: 'Trains a smaller model to mimic a larger one.' },
  { name: 'Right-Sizing', costReduction: 70, qualityImpact: 10, blurb: 'Switches to the smallest model that still meets the task bar.' }
];

let chart = null;
let sortMode = 'cost'; // 'cost' (descending) or 'quality' (ascending)

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .mc-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .mc-chart-area { position:relative; height:430px; }
    .mc-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .mc-controls button { font-size:13px; padding:5px 10px; cursor:pointer; }
    .mc-footnote { font-size:11px; color:#666; padding:0 0 6px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="mc-wrap">
      <div class="mc-chart-area"><canvas id="mc-canvas"></canvas></div>
      <div class="mc-controls">
        <button id="mc-sort">Sort by Quality Impact (ascending)</button>
      </div>
      <div class="mc-footnote">Figures are illustrative for teaching purposes; actual results vary widely by model, task, and implementation.</div>
    </div>
  `;

  document.getElementById('mc-sort').addEventListener('click', function () {
    sortMode = (sortMode === 'cost') ? 'quality' : 'cost';
    this.textContent = (sortMode === 'cost') ? 'Sort by Quality Impact (ascending)' : 'Sort by Cost Reduction (descending)';
    updateChart();
  });
}

function sortedTechniques() {
  const copy = TECHNIQUES.slice();
  if (sortMode === 'cost') {
    copy.sort((a, b) => b.costReduction - a.costReduction);
  } else {
    copy.sort((a, b) => a.qualityImpact - b.qualityImpact);
  }
  return copy;
}

function updateChart() {
  const ordered = sortedTechniques();
  chart.data.labels = ordered.map(t => t.name);
  chart.data.datasets[0].data = ordered.map(t => t.costReduction);
  chart.data.datasets[1].data = ordered.map(t => t.qualityImpact);
  chart.options.plugins.tooltip.callbacks.afterLabel = (item) => ordered[item.dataIndex].blurb;
  chart.update();
}

function renderChart() {
  const ordered = sortedTechniques();
  const ctx = document.getElementById('mc-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ordered.map(t => t.name),
      datasets: [
        {
          label: 'Typical Inference Cost Reduction',
          data: ordered.map(t => t.costReduction),
          backgroundColor: '#3949ab'
        },
        {
          label: 'Typical Quality Impact (given up)',
          data: ordered.map(t => t.qualityImpact),
          backgroundColor: '#ef6c00'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Cost Savings vs. Quality Trade-off by Technique', font: { size: 16 } },
        legend: { position: 'top', align: 'end' },
        tooltip: {
          callbacks: {
            label: (item) => item.dataset.label + ': ' + item.parsed.y + '%',
            afterLabel: (item) => ordered[item.dataIndex].blurb
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Technique' } },
        y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percent (%)' } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
