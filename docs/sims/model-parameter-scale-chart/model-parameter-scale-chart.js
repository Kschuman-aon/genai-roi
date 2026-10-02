// Model Scale Across Five Years - Chart.js
// CANVAS_HEIGHT: 500
//
// Bar chart of publicly documented model parameter counts, 2019-2024, with
// a toggle between logarithmic and linear Y-axis so the learner can feel
// the difference a log scale makes across two orders of magnitude.

const MODELS = [
  { name: 'GPT-2', params: 1.5, year: 2019, color: '#bbdefb' },
  { name: 'GPT-3', params: 175, year: 2020, color: '#5c6bc0' },
  { name: 'Llama 3 8B', params: 8, year: 2024, color: '#303f9f' },
  { name: 'Llama 3 70B', params: 70, year: 2024, color: '#1a237e' }
];

let chart = null;
let currentScale = 'logarithmic';

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .mp-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .mp-chart-area { position:relative; height:420px; }
    .mp-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .mp-controls button { font-size:13px; padding:5px 10px; cursor:pointer; }
    .mp-footnote { font-size:11px; color:#666; padding:0 0 6px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="mp-wrap">
      <div class="mp-chart-area"><canvas id="mp-canvas"></canvas></div>
      <div class="mp-controls">
        <button id="mp-toggle">Switch to Linear Scale</button>
      </div>
      <div class="mp-footnote">All figures from publicly available model documentation or research papers, not vendor marketing claims.</div>
    </div>
  `;

  document.getElementById('mp-toggle').addEventListener('click', function () {
    currentScale = (currentScale === 'logarithmic') ? 'linear' : 'logarithmic';
    this.textContent = (currentScale === 'logarithmic') ? 'Switch to Linear Scale' : 'Switch to Logarithmic Scale';
    chart.options.scales.y.type = currentScale;
    chart.update();
  });
}

function renderChart() {
  const ctx = document.getElementById('mp-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MODELS.map(m => m.name),
      datasets: [{
        label: 'Parameter count (billions)',
        data: MODELS.map(m => m.params),
        backgroundColor: MODELS.map(m => m.color),
        borderColor: '#222222',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Publicly Documented Model Sizes, 2019-2024', font: { size: 16 } },
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            generateLabels: () => MODELS.map(m => ({
              text: m.name + ' (' + m.year + ')',
              fillStyle: m.color,
              strokeStyle: '#222222'
            }))
          }
        },
        tooltip: {
          callbacks: {
            label: (item) => MODELS[item.dataIndex].name + ': ' + MODELS[item.dataIndex].params + 'B params (' + MODELS[item.dataIndex].year + ')'
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Model' } },
        y: {
          type: currentScale,
          title: { display: true, text: 'Parameter count (billions)' },
          min: currentScale === 'logarithmic' ? 1 : 0
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
