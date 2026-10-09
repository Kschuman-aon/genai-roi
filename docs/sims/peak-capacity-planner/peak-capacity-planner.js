// Peak Capacity Planner - p5.js
// CANVAS_HEIGHT: 480
//
// Calculate servers and monthly cost for a peak-provisioned fleet (3 scenarios),
// then compare with an elastic plan over a 24-hour day.

const VIS_H = 250, PANEL_H = 230;
const SCENARIOS = [
  { rate: 5, s: 4, c: 11520, why: '5 × 400 = 2,000 tokens/s; 2,000 ÷ (800 × 0.80 = 640) = 3.13, rounded up to 4; 4 × 720 × $4.00 = $11,520.' },
  { rate: 2, s: 2, c: 5760, why: '2 × 400 = 800 tokens/s; 800 ÷ 640 = 1.25, rounded up to 2; 2 × 720 × $4.00 = $5,760.' },
  { rate: 8, s: 5, c: 14400, why: '8 × 400 = 3,200 tokens/s; 3,200 ÷ 640 = 5.00, exactly 5; 5 × 720 × $4.00 = $14,400.' }
];
const servers = (rate, u) => rate === 0 ? 0 : Math.ceil(rate * 400 / (800 * u / 100) - 1e-9);

let UI, runner, mode = 'challenge', cur = null, revealed = false;
let P = { peak: 5, off: 1, hrs: 4, u: 80, price: 4 }, offS;

function setup() {
  UI = QK.layout(VIS_H, PANEL_H);
  createCanvas(UI.vis.clientWidth, UI.vis.clientHeight).parent(UI.vis);
  noLoop();
  describe('Servers needed for a peak request rate and the monthly cost of running them around the clock; later a 24-hour chart compares a peak-sized fleet with an elastic fleet.');
  runner = new QK.Runner({
    box: UI.panel, items: SCENARIOS, attempts: 2, mastery: 3, label: 'Scenarios correct on first attempt',
    note: 'Illustrative values: 800 tokens/s per server, 400-token responses, $4.00/hour, 720 hours/month, 80% ceiling',
    question: s => `How many servers do you need for a peak of ${s.rate} requests per second, and what do they cost per month if they run all month?`,
    controls: (s, ctl) => {
      const a = QK.num(ctl, 'Servers:'), b = QK.num(ctl, 'Monthly cost:', { prefix: '$' });
      return () => { const x = a.get(), y = b.get(); return isNaN(x) || isNaN(y) ? null : { s: x, c: y }; };
    },
    onShow: s => { cur = s; revealed = false; redraw(); },
    judge: (s, a) => ({ ok: a.s === s.s && Math.abs(a.c - s.c) <= 1, okMsg: `${s.s} servers, ${QK.usd(s.c, 0)} per month.`, why: s.why, reveal: `${s.s} servers, ${QK.usd(s.c, 0)} per month` }),
    onResult: (s, i, r) => { revealed = r.final; redraw(); },
    onDone: r => {
      mode = 'explore';
      const box = r.explore('Explore (not scored): compare a peak-sized fleet with an elastic fleet');
      const upd = () => redraw();
      const pk = QK.slider(box, 'Peak requests per second', 1, 10, 1, 5, v => v + ' /s', v => { P.peak = v; offS.el.max = v; if (offS.get() > v) { offS.set(v); P.off = v; } upd(); });
      offS = QK.slider(box, 'Off-peak requests per second', 0, 10, 1, 1, v => v + ' /s', v => { P.off = Math.min(v, P.peak); upd(); });
      QK.slider(box, 'Peak hours per day', 1, 12, 1, 4, v => v + ' h', v => { P.hrs = v; upd(); });
      QK.slider(box, 'Utilization ceiling', 50, 90, 10, 80, v => v + '%', v => { P.u = v; upd(); });
      QK.slider(box, 'Hourly price', 2, 8, 1, 4, v => '$' + v, v => { P.price = v; upd(); });
      redraw();
    }
  });
}

function windowResized() { resizeCanvas(UI.vis.clientWidth, UI.vis.clientHeight); redraw(); }

function draw() {
  background('aliceblue');
  textFont('Arial'); noStroke(); fill(0); textAlign(CENTER, TOP); textSize(14);
  text('Peak Capacity Planner (illustrative data)', width / 2, 6);
  if (mode === 'challenge') drawFleet(); else drawDay();
}

function drawFleet() {
  textAlign(LEFT, TOP); textSize(13); fill(60);
  text(`Peak rate: ${cur.rate} requests/s    Utilization ceiling: 80%    Response: 400 tokens    Server: 800 tokens/s at $4.00/hour`, 12, 34);
  text('Servers needed to cover the peak (shown after you check):', 12, 70);
  if (!revealed) return;
  for (let i = 0; i < cur.s; i++) { fill('#3949ab'); rect(14 + i * 60, 96, 50, 60, 5); fill('white'); textAlign(CENTER, CENTER); text('GPU', 39 + i * 60, 126); }
  fill(0); textAlign(LEFT, TOP); textSize(14);
  text(`${cur.s} servers × 720 hours × $4.00 = ${QK.usd(cur.c, 0)} per month`, 12, 176);
  textSize(12); fill(90); text('Raw need ÷ (800 × 0.80), rounded UP: a fraction of a server still needs a whole server.', 12, 204);
}

function drawDay() {
  const S = servers(P.peak, P.u), So = servers(P.off, P.u), x0 = 44, x1 = width - 190, yB = VIS_H - 28, yT = 54;
  const ymax = max(S, 1) + 1, X = h => x0 + h / 24 * (x1 - x0), Y = v => yB - v / ymax * (yB - yT);
  const hs = 12, he = 12 + P.hrs, dem = h => (h >= hs && h < he ? P.peak : P.off) * 400 / (800 * P.u / 100);
  noStroke();
  for (let h = 0; h < 24; h++) { fill(255, 180, 160, 150); rect(X(h), Y(S), X(h + 1) - X(h), Y(dem(h)) - Y(S)); }
  for (let h = 0; h < 24; h++) { fill(57, 73, 171, 170); rect(X(h), Y(dem(h)), X(h + 1) - X(h) - 0.5, yB - Y(dem(h))); }
  stroke('#c62828'); strokeWeight(2); line(x0, Y(S), x1, Y(S));
  stroke('#2e7d32'); noFill(); beginShape();
  for (let h = 0; h < 24; h++) { const v = h >= hs && h < he ? S : So; vertex(X(h), Y(v)); vertex(X(h + 1), Y(v)); }
  endShape();
  stroke(60); strokeWeight(1); line(x0, yT - 4, x0, yB); line(x0, yB, x1, yB);
  noStroke(); fill(60); textSize(10); textAlign(CENTER, TOP);
  [0, 6, 12, 18, 24].forEach(h => text(h + ':00', X(h), yB + 3));
  textAlign(RIGHT, CENTER); for (let v = 0; v <= ymax; v++) text(v, x0 - 4, Y(v));
  textAlign(LEFT, TOP); textSize(11); fill('#c62828'); text(`Peak-sized fleet: ${S} servers`, x0 + 4, 28);
  fill('#2e7d32'); text(`Elastic fleet: ${So} off-peak, ${S} at peak`, x0 + 190, 28);
  const peakCost = S * 720 * P.price, el = So * 720 * P.price + (S - So) * P.hrs * 30 * P.price;
  const util = (P.peak * P.hrs + P.off * (24 - P.hrs)) / 24 * 400 / (S * 800) * 100;
  const rx = x1 + 14; fill(0); textSize(12);
  text('Peak-sized, all month', rx, 56); textSize(15); fill('#c62828'); text(QK.usd(peakCost, 0), rx, 71);
  textSize(12); fill(0); text('Elastic plan', rx, 100); textSize(15); fill('#2e7d32'); text(QK.usd(el, 0), rx, 115);
  textSize(12); fill(0); text('Saving', rx, 144); textSize(15); text(`${QK.usd(peakCost - el, 0)} (${QK.pct((peakCost - el) / peakCost * 100, 1)})`, rx, 159);
  textSize(12); text('Avg utilization of', rx, 188); text('peak-sized fleet', rx, 202); textSize(15); text(QK.pct(util, 0), rx, 217);
  if (P.off === 0) { textSize(11); fill('#ef6c00'); text('Off-peak 0: no always-on server, so cold starts', x0 + 4, 42); }
}
