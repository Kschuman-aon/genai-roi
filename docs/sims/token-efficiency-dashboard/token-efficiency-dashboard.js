// Cross-Provider Token Efficiency Dashboard - Chart.js
// CANVAS_HEIGHT: 500
//
// Mixed bar/line chart: cost per task (bars, left axis) and token efficiency
// score (line, right axis) across three model tiers. A dropdown swaps in
// three workload presets so the "most efficient" tier visibly shifts.

const WORKLOADS = {
  'Simple Q&A': {
    Small: { inputTok: 1200, outputTok: 180, cost: 0.0009, score: 0.91, successRate: 0.95 },
    Standard: { inputTok: 1200, outputTok: 310, cost: 0.0038, score: 0.74, successRate: 0.93 },
    Large: { inputTok: 1200, outputTok: 520, cost: 0.0122, score: 0.58, successRate: 0.97 }
  },
  'Document Summarization': {
    Small: { inputTok: 2500, outputTok: 300, cost: 0.0020, score: 0.55, successRate: 0.70 },
    Standard: { inputTok: 2500, outputTok: 450, cost: 0.0065, score: 0.78, successRate: 0.90 },
    Large: { inputTok: 2500, outputTok: 600, cost: 0.0160, score: 0.72, successRate: 0.95 }
  },
  'Multi-Step Reasoning': {
    Small: { inputTok: 800, outputTok: 400, cost: 0.0014, score: 0.35, successRate: 0.45 },
    Standard: { inputTok: 800, outputTok: 700, cost: 0.0060, score: 0.68, successRate: 0.80 },
    Large: { inputTok: 800, outputTok: 950, cost: 0.0150, score: 0.85, successRate: 0.93 }
  }
};

const TIERS = ['Small', 'Standard', 'Large'];
let chart = null;
let currentWorkload = 'Simple Q&A';

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .te-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .te-chart-area { position:relative; height:430px; }
    .te-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .te-controls select { font-size:14px; padding:3px 6px; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="te-wrap">
      <div class="te-chart-area"><canvas id="te-canvas"></canvas></div>
      <div class="te-controls">
        <label for="te-workload">Workload type:</label>
        <select id="te-workload">
          <option value="Simple Q&A">Simple Q&amp;A</option>
          <option value="Document Summarization">Document Summarization</option>
          <option value="Multi-Step Reasoning">Multi-Step Reasoning</option>
        </select>
      </div>
    </div>
  `;

  document.getElementById('te-workload').addEventListener('change', function (e) {
    currentWorkload = e.target.value;
    updateChart();
  });
}

function updateChart() {
  const data = WORKLOADS[currentWorkload];
  chart.data.datasets[0].data = TIERS.map(t => data[t].cost);
  chart.data.datasets[1].data = TIERS.map(t => data[t].score);
  chart.update();
}

function renderChart() {
  const data = WORKLOADS[currentWorkload];
  const ctx = document.getElementById('te-canvas').getContext('2d');
  chart = new Chart(ctx, {
    data: {
      labels: TIERS,
      datasets: [
        {
          type: 'bar',
          label: 'Cost per task (USD)',
          data: TIERS.map(t => data[t].cost),
          backgroundColor: '#3949ab',
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Token efficiency score',
          data: TIERS.map(t => data[t].score),
          borderColor: '#ef6c00',
          backgroundColor: '#ef6c00',
          yAxisID: 'y1',
          pointRadius: 5,
          borderWidth: 3,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Cost vs. Token Efficiency by Model Tier', font: { size: 16 } },
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: (item) => {
              const d = WORKLOADS[currentWorkload][item.label];
              if (item.dataset.type === 'bar') {
                return 'Cost: $' + d.cost.toFixed(4) + '  (avg ' + d.inputTok + ' input / ' + d.outputTok + ' output tokens per task)';
              }
              return 'Efficiency score: ' + d.score.toFixed(2) + '  (task success rate: ' + Math.round(d.successRate * 100) + '%, cost: $' + d.cost.toFixed(4) + ')';
            }
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Model tier' } },
        y: {
          type: 'linear',
          position: 'left',
          title: { display: true, text: 'Cost per task (USD)' },
          beginAtZero: true
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Token efficiency score (0-1)' },
          min: 0,
          max: 1,
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
