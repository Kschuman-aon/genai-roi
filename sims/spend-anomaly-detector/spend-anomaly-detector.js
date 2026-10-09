// Spend Anomaly Detector - interactive flagging exercise (Chart.js + shared quiz kit)
// CANVAS_HEIGHT: 580
//
// For days 8-21 of a synthetic spend series the learner commits Flag or No flag under the rule
// "spend > mean + 3 SD of the previous 7 days", then names the day where masking hides a spike,
// then changes the multiplier and the window length.

const SPEND = [980, 1010, 1000, 990, 1020, 1005, 995, 1015, 985, 1000, 1030, 1620, 1650, 1010, 1000, 990, 1025, 1060, 1005, 995, 1380];
const WHY = { 8: 'Within the usual range.', 9: 'Below the mean.', 10: 'Within the usual range.', 11: 'z is 2.23, high but below 3.',
  12: 'Far above the threshold.', 13: 'Masked: day 12 inflated the standard deviation.', 20: 'Normal spend.',
  21: 'The window has cleared, so the baseline is tight again.' };
const MASKED_DAY = 13, VIS_H = 250, PANEL_H = 330;

// Flag test for day d (1-based) with window w and multiplier k; returns null when the window is incomplete.
function test(d, w = 7, k = 3) {
  if (d - 1 < w) return null;
  const v = SPEND.slice(d - 1 - w, d - 1), mean = v.reduce((a, b) => a + b, 0) / w;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (w - 1)), thr = mean + k * sd;
  return { mean, sd, thr, flag: SPEND[d - 1] > thr };
}
const DAYS = Array.from({ length: 14 }, (_, i) => i + 8);
const why = d => WHY[d] || 'Normal spend.';
const f1 = n => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
let chart;

function setChart(sets, opts) {
  chart.data.datasets.forEach((s, i) => { s.data = sets[i] || []; });
  Object.assign(chart.options.scales.x, opts || {});
  chart.update('none');
}
const pts = (a, from = 1) => a.map((y, i) => ({ x: i + from, y }));

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(VIS_H, PANEL_H);
  UI.vis.style.padding = '4px 6px';
  const holder = QK.E('div'); holder.style.cssText = 'position:relative;height:100%;width:100%';
  const cv = document.createElement('canvas'); holder.append(cv); UI.vis.append(holder);
  const ds = (label, color, o) => Object.assign({ type: 'scatter', label, data: [], showLine: false, borderColor: color, backgroundColor: color, pointRadius: 3, borderWidth: 2 }, o);
  chart = new Chart(cv, {
    data: { datasets: [
      ds('Daily spend', '#3949ab', { showLine: true, pointRadius: 3 }),
      ds('Previous-days window / flagged day', '#ef6c00', { pointRadius: 6 }),
      ds('Threshold (mean + k SD)', '#c62828', { showLine: true, borderDash: [5, 4], borderWidth: 2, pointRadius: 4, pointStyle: 'triangle' })
    ] },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { title: { display: true, text: 'Daily Platform Spend (illustrative data)' }, legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { type: 'linear', min: 0, max: 22, title: { display: true, text: 'Day' }, ticks: { stepSize: 1 } },
        y: { min: 800, max: 2200, title: { display: true, text: 'Spend (USD)' }, ticks: { callback: v => '$' + v.toLocaleString('en-US') } }
      }
    }
  });

  const run = new QK.Runner({
    box: UI.panel, items: DAYS, attempts: 2, mastery: 12, label: 'Correct on first attempt',
    note: 'Illustrative series; rule: spend > mean + 3 SD of previous 7 days',
    question: d => `Day ${d}: spend ${QK.usd(SPEND[d - 1], 0)}. Is this day's spend an anomaly under the rule?`,
    controls: (d, ctl) => QK.choice(ctl, ['Flag', 'No flag']).get,
    onShow: d => setChart([pts(SPEND.slice(0, d))], { min: 0, max: 22 }),
    judge: (d, v) => {
      const r = test(d), res = r.flag ? 'Flag' : 'No flag';
      return { ok: v === res, okMsg: `${res}. Mean ${f1(r.mean)}, SD ${f1(r.sd)}, threshold ${f1(r.thr)}. ${why(d)}`, why: why(d), reveal: res };
    },
    onResult: (d, i, r) => {
      if (!r.final) return;
      const t = test(d);
      setChart([pts(SPEND.slice(0, d)), pts(SPEND.slice(d - 8, d - 1), d - 7), [{ x: d, y: t.thr }]]);
    },
    onDone: r => {
      const n = r.score;
      // One-attempt follow-up: which day does masking hide?
      r.q.textContent = 'Which one day did masking hide a real spike? (one attempt)';
      r.ctl.className = 'qk-ctl';
      r.say('info', `<b>Day flags: ${n} of 14 correct on the first attempt.</b>`);
      const sel = QK.choice(r.ctl, DAYS.map(String));
      const go = QK.E('button', '', 'Submit'); go.type = 'button'; r.ctl.append(go);
      go.onclick = () => {
        const v = sel.get(); if (v == null) return;
        go.disabled = true; r.ctl.classList.add('locked');
        const hit = Number(v) === MASKED_DAY;
        const mastered = n >= 12 && hit;
        r.say(hit ? 'ok' : 'bad', `<b>${hit ? 'Correct' : 'The masked day is day 13'}:</b> ${why(13)} Day 13 spend ${QK.usd(1650, 0)} was below its threshold of ${f1(test(13).thr)} because the spike on day 12 was in the baseline window. <b>Mastery (12 of 14 flags and the masked day): ${mastered ? 'reached.' : 'not yet reached.'}</b>`);
        setTimeout(() => explore(r), 0);
      };
    }
  });

  function explore(r) {
    const box = r.explore('Explore (not scored): change the multiplier and the window length');
    const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
    const S = { k: 3, w: 7 };
    const up = () => {
      const flagged = [], thr = [];
      for (let d = 1; d <= 21; d++) { const t = test(d, S.w, S.k); if (t) { thr.push({ x: d, y: t.thr }); if (t.flag) flagged.push({ x: d, y: SPEND[d - 1] }); } }
      setChart([pts(SPEND), flagged, thr], { min: 0, max: 22 });
      out.innerHTML = `Flagged days (with a full ${S.w}-day window): <b>${flagged.length ? flagged.map(p => p.x).join(', ') : 'none'}</b>. Days 1 to ${S.w} are marked "No baseline".<br><i>A lower multiplier flags day 11 too, at the price of false alarms. Day 13 stays masked unless the multiplier drops below about 2.4, because day 12 inflated the standard deviation.</i>`;
    };
    QK.slider(box, 'Multiplier on the standard deviation', 1, 5, 0.5, 3, v => v.toFixed(1) + ' SD', v => { S.k = v; up(); });
    QK.slider(box, 'Window length (days)', 3, 10, 1, 7, v => v + ' days', v => { S.w = v; up(); });
    box.append(out);
    up();
  }
});
