// The Batch-Size Trade-Off - Chart.js
// CANVAS_HEIGHT: 500
//
// Dual-axis line chart: throughput (left axis) and per-request latency
// (right axis) both rise with batch size. A toggle shades the batch 8-16
// "sweet spot" band where throughput gains are still steep but latency
// hasn't risen sharply yet.

const BATCH_SIZES = [1, 4, 8, 16, 32, 64];
const THROUGHPUT = [12, 40, 68, 105, 150, 190];
const LATENCY = [80, 110, 160, 240, 380, 620];

let chart = null;
let showSweetSpot = false;

function buildLayout() {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    html, body { margin:0; padding:0; overflow:hidden; font-family: Arial, Helvetica, sans-serif; }
    .bt-wrap { width:100%; box-sizing:border-box; padding:6px 14px 0 14px; }
    .bt-chart-area { position:relative; height:430px; }
    .bt-controls { display:flex; align-items:center; gap:10px; padding:8px 0 4px 0; }
    .bt-controls button { font-size:13px; padding:5px 10px; cursor:pointer; }
    .bt-footnote { font-size:11px; color:#666; padding:0 0 6px 0; }
  `;
  document.head.appendChild(style);

  main.innerHTML = `
    <div class="bt-wrap">
      <div class="bt-chart-area"><canvas id="bt-canvas"></canvas></div>
      <div class="bt-controls">
        <button id="bt-toggle">Highlight Sweet Spot (Batch 8-16)</button>
      </div>
      <div class="bt-footnote">Figures are illustrative for teaching purposes, not benchmarked hardware results.</div>
    </div>
  `;

  document.getElementById('bt-toggle').addEventListener('click', function () {
    showSweetSpot = !showSweetSpot;
    this.textContent = showSweetSpot ? 'Hide Sweet Spot' : 'Highlight Sweet Spot (Batch 8-16)';
    chart.update();
  });
}

const sweetSpotPlugin = {
  id: 'sweetSpotPlugin',
  beforeDatasetsDraw(c) {
    if (!showSweetSpot) return;
    const xScale = c.scales.x;
    const yScale = c.scales.y;
    const i8 = BATCH_SIZES.indexOf(8);
    const i16 = BATCH_SIZES.indexOf(16);
    const xStart = xScale.getPixelForTick(i8);
    const xEnd = xScale.getPixelForTick(i16);
    const ctx = c.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(76, 175, 80, 0.15)';
    ctx.fillRect(xStart, yScale.top, xEnd - xStart, yScale.bottom - yScale.top);
    ctx.fillStyle = '#2e7d32';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Sweet spot', (xStart + xEnd) / 2, yScale.top + 14);
    ctx.restore();
  }
};

function renderChart() {
  const ctx = document.getElementById('bt-canvas').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: BATCH_SIZES.map(String),
      datasets: [
        {
          label: 'Throughput (req/s)',
          data: THROUGHPUT,
          borderColor: '#283593',
          backgroundColor: '#283593',
          yAxisID: 'y',
          pointRadius: 4,
          borderWidth: 3,
          tension: 0.2
        },
        {
          label: 'Latency (ms)',
          data: LATENCY,
          borderColor: '#e65100',
          backgroundColor: '#e65100',
          borderDash: [8, 4],
          yAxisID: 'y1',
          pointRadius: 4,
          borderWidth: 3,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Batch Size: More Throughput, More Latency', font: { size: 16 } },
        legend: { position: 'top', align: 'start' },
        tooltip: {
          callbacks: {
            label: (item) => item.dataset.label + ': ' + item.parsed.y + (item.dataset.yAxisID === 'y' ? ' req/s' : ' ms')
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Batch size' } },
        y: {
          type: 'linear',
          position: 'left',
          title: { display: true, text: 'Throughput (requests/sec)' },
          beginAtZero: true
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Per-request latency (ms)' },
          beginAtZero: true,
          grid: { drawOnChartArea: false }
        }
      }
    },
    plugins: [sweetSpotPlugin]
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildLayout();
  renderChart();
});
