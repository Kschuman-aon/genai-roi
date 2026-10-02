// Compute Utilization and Idle Cost Explorer - Chart.js
// CANVAS_HEIGHT: 520
//
// Flat reserved-capacity cost vs. a rising on-demand-equivalent cost across
// utilization rate (0-100%). A discount slider (30-70%) moves the crossover
// point where reserved capacity becomes the cheaper option.

const ON_DEMAND_FULL_RATE = 10; // illustrative $/hour at 100% utilization
const UTIL_POINTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

let chart = null;
let discountPct = 50;

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .cu-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .cu-chart-area { position:relative; height:420px; }
    .cu-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .cu-controls input[type=range] { width:220px; }
    .cu-footnote { font-size:11px; color:#666; padding:0 0 6px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="cu-wrap">
      <div class="cu-chart-area"><canvas id="cu-canvas"></canvas></div>
      <div class="cu-controls">
        <label for="cu-discount">Reserved-capacity discount: <span id="cu-discount-val">50%</span> off on-demand</label>
        <input type="range" id="cu-discount" min="30" max="70" step="5" value="50">
      </div>
      <div class="cu-footnote">Illustrative figures for teaching purposes; actual rates vary by provider and instance type.</div>
    </div>
  `;

  document.getElementById('cu-discount').addEventListener('input', function (e) {
    discountPct = parseInt(e.target.value, 10);
    document.getElementById('cu-discount-val').textContent = discountPct + '%';
    updateChart();
  });
}

function crossoverUtil() {
  return 100 - discountPct;
}

const crossoverPlugin = {
  id: 'crossoverPlugin',
  afterDatasetsDraw(c) {
    const xScale = c.scales.x;
    const yScale = c.scales.y;
    const crossUtil = crossoverUtil();
    const xPixel = xScale.getPixelForValue(crossUtil);
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
    ctx.fillText('Crossover: ' + crossUtil + '% utilization', xPixel, yScale.top + 14);
    ctx.restore();
  }
};

function updateChart() {
  const reservedCost = ON_DEMAND_FULL_RATE * (1 - discountPct / 100);
  chart.data.datasets[0].data = UTIL_POINTS.map(u => ({ x: u, y: reservedCost }));
  chart.update();
}

function renderChart() {
  const reservedCost = ON_DEMAND_FULL_RATE * (1 - discountPct / 100);
  const ctx = document.getElementById('cu-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Reserved capacity effective cost',
          data: UTIL_POINTS.map(u => ({ x: u, y: reservedCost })),
          borderColor: '#1565c0',
          backgroundColor: '#1565c0',
          borderDash: [8, 4],
          pointRadius: 0,
          borderWidth: 3,
          fill: false
        },
        {
          label: 'On-demand equivalent cost',
          data: UTIL_POINTS.map(u => ({ x: u, y: ON_DEMAND_FULL_RATE * (u / 100) })),
          borderColor: '#ef6c00',
          backgroundColor: '#ef6c00',
          pointRadius: 3,
          borderWidth: 3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Reserved Capacity vs. On-Demand: Cost by Utilization', font: { size: 16 } },
        legend: { position: 'top', align: 'start' },
        tooltip: {
          callbacks: {
            label: (item) => item.dataset.label + ': $' + item.parsed.y.toFixed(2) + '/hour at ' + item.parsed.x + '% utilization'
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: 100,
          title: { display: true, text: 'Compute utilization rate' },
          ticks: { callback: (v) => v + '%' }
        },
        y: { beginAtZero: true, title: { display: true, text: 'Effective cost per hour (USD)' } }
      }
    },
    plugins: [crossoverPlugin]
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
