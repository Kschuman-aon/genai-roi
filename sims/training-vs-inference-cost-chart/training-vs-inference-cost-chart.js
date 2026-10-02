// One-Time Training vs. Recurring Inference - Chart.js
// CANVAS_HEIGHT: 500
//
// Flat one-time training cost vs. a cumulative inference cost that grows
// with monthly query volume. A toggle changes the illustrative per-query
// rate and a custom plugin redraws the crossover annotation.

const TRAINING_COST = 2000000; // illustrative, flat
const MAX_QUERIES_M = 50; // millions

let perQueryRate = 0.05;
let chart = null;

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .tc-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .tc-chart-area { position:relative; height:440px; }
    .tc-controls { display:flex; align-items:center; gap:10px; padding:8px 0 6px 0; }
    .tc-controls label { font-size:14px; }
    .tc-controls select { font-size:14px; padding:3px 6px; }
    .tc-footnote { font-size:11px; color:#666; padding:0 0 6px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="tc-wrap">
      <div class="tc-chart-area"><canvas id="tc-canvas"></canvas></div>
      <div class="tc-controls">
        <label for="tc-rate">Illustrative cost per query:</label>
        <select id="tc-rate">
          <option value="0.02">$0.02</option>
          <option value="0.05" selected>$0.05</option>
          <option value="0.10">$0.10</option>
        </select>
      </div>
      <div class="tc-footnote">Figures are illustrative for teaching purposes, not vendor-specific pricing.</div>
    </div>
  `;

  document.getElementById('tc-rate').addEventListener('change', function (e) {
    perQueryRate = parseFloat(e.target.value);
    renderChart();
  });
}

function crossoverMillions(rate) {
  return TRAINING_COST / (rate * 1000000);
}

function formatQueries(m) {
  if (m === 0) return '0';
  return m + 'M';
}

function formatDollars(v) {
  return '$' + Math.round(v).toLocaleString();
}

const crossoverPlugin = {
  id: 'crossoverPlugin',
  afterDatasetsDraw(c) {
    const xCross = crossoverMillions(perQueryRate);
    if (xCross > MAX_QUERIES_M) return;
    const xScale = c.scales.x;
    const yScale = c.scales.y;
    const xPixel = xScale.getPixelForValue(xCross);
    const ctx = c.ctx;
    ctx.save();
    ctx.strokeStyle = '#555555';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xPixel, yScale.top);
    ctx.lineTo(xPixel, yScale.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#222222';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Past this point, inference', xPixel, yScale.top + 14);
    ctx.fillText('is the bigger line item', xPixel, yScale.top + 28);
    ctx.restore();
  }
};

function renderChart() {
  const trainingData = [
    { x: 0, y: TRAINING_COST },
    { x: MAX_QUERIES_M, y: TRAINING_COST }
  ];
  const queryPoints = [0, 1, 5, 10, 20, 50];
  const inferenceData = queryPoints.map(q => ({ x: q, y: q * 1000000 * perQueryRate }));

  if (chart) {
    chart.data.datasets[0].data = trainingData;
    chart.data.datasets[1].data = inferenceData;
    chart.update();
    return;
  }

  const ctx = document.getElementById('tc-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Training Cost (one-time)',
          data: trainingData,
          borderColor: '#e65100',
          backgroundColor: '#e65100',
          borderDash: [8, 4],
          pointRadius: 0,
          borderWidth: 3,
          fill: false
        },
        {
          label: 'Cumulative Inference Cost',
          data: inferenceData,
          borderColor: '#283593',
          backgroundColor: '#283593',
          pointRadius: 4,
          borderWidth: 3,
          fill: false,
          tension: 0.15
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Where the Crossover Happens: Training vs. Inference Cost', font: { size: 16 } },
        legend: { position: 'top', align: 'start' },
        tooltip: {
          callbacks: {
            title: (items) => formatQueries(items[0].parsed.x) + ' queries/month',
            label: (item) => item.dataset.label + ': ' + formatDollars(item.parsed.y)
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: MAX_QUERIES_M,
          title: { display: true, text: 'Queries per month' },
          ticks: { callback: (v) => formatQueries(v) }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Cumulative cost (USD)' },
          ticks: { callback: (v) => formatDollars(v) }
        }
      }
    },
    plugins: [crossoverPlugin]
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
