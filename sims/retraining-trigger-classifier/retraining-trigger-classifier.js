// Retraining Trigger Classifier - interactive classification exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 322
//
// For eight monthly monitoring readings the learner chooses Retrain now, Investigate, or No action
// under the team's retraining trigger rule, then changes the readings and PSI.

const RD = [
  [91.0, 90.5, 0.04, 'Accuracy is above 88.0 and PSI is below 0.25.'],
  [90.0, 89.0, 0.31, 'PSI >= 0.25 shows the inputs have shifted, but accuracy has not fallen below 88.0, so find which groups moved before retraining.'],
  [89.0, 87.5, 0.12, 'This is the first reading below 88.0, and one sampled reading can be noise, so it triggers a check and not a retrain.'],
  [87.6, 87.2, 0.18, "Both last month's and this month's accuracy are below 88.0."],
  [90.0, 84.5, 0.08, '84.5 < 85.0 is a breach of the hard floor in a single reading, although the inputs look stable, so also check the monitoring labels.'],
  [88.0, 88.0, 0.10, '88.0 is not below 88.0, and PSI 0.10 is below 0.25.'],
  [91.0, 90.8, 0.25, 'PSI = 0.25 meets the threshold PSI >= 0.25.'],
  [87.5, 88.5, 0.15, "This month's accuracy is back above 88.0, and both months must be below the floor to retrain."]
].map(([last, now, psi, why]) => ({ last, now, psi, why }));
const ACTS = ['Retrain now', 'Investigate', 'No action'];
function rule(last, now, psi) {
  if (now < 85.0) return { a: ACTS[0], c: 'this month < 85.0 (hard floor)' };
  if (last < 88.0 && now < 88.0) return { a: ACTS[0], c: 'both months < 88.0' };
  if (now < 88.0) return { a: ACTS[1], c: 'this month < 88.0' };
  if (psi >= 0.25) return { a: ACTS[1], c: 'PSI >= 0.25' };
  return { a: ACTS[2], c: 'no clause fired' };
}
const band = p => (p >= 0.25 ? 'major shift' : p >= 0.10 ? 'moderate shift' : 'stable');

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 322);
  const ruleHtml = '<b>Rule, in order:</b> <b>Retrain now</b> when this month\'s accuracy < 85.0, or when last month\'s and this month\'s accuracy are both < 88.0. Otherwise <b>Investigate</b> when this month\'s accuracy < 88.0 or PSI ≥ 0.25. Otherwise <b>No action</b>.';
  new QK.Runner({
    box: UI.panel, items: RD, attempts: 2, mastery: 7, label: 'Correct on first attempt',
    note: 'Illustrative readings; accuracy in percent',
    question: () => "What does this month's reading call for?",
    controls: (r, ctl) => {
      const t = QK.E('div', '', ruleHtml + QK.table(["Last month's accuracy", "This month's accuracy", 'PSI'], [[r.last.toFixed(1), r.now.toFixed(1), r.psi.toFixed(2)]]));
      t.style.flexBasis = '100%'; ctl.append(t);
      return QK.choice(ctl, ACTS).get;
    },
    judge: (r, v) => {
      const res = rule(r.last, r.now, r.psi);
      return { ok: v === res.a, okMsg: `${res.a}. Decided by: ${res.c}. ${r.why}`, why: r.why, reveal: `${res.a} (decided by: ${res.c})` };
    },
    onDone: run => {
      const box = run.explore('Explore (not scored): change the readings');
      const out = QK.E('div', 'qk-fb info'); out.style.gridColumn = '1/-1';
      const S = { last: 91.0, now: 90.5, psi: 0.10 };
      const up = () => {
        const r = rule(S.last, S.now, S.psi);
        out.innerHTML = QK.table(['Recommended action', 'Decided by', 'PSI band'], [[`<b>${r.a}</b>`, r.c, band(S.psi)]]) +
          '<i>Moving accuracy from 88.0 to 87.5 changes the action, and so does moving PSI from 0.20 to 0.25.</i>';
      };
      QK.slider(box, "Last month's accuracy", 80, 94, 0.5, 91, v => v.toFixed(1), v => { S.last = v; up(); });
      QK.slider(box, "This month's accuracy", 80, 94, 0.5, 90.5, v => v.toFixed(1), v => { S.now = v; up(); });
      QK.slider(box, 'PSI', 0, 0.5, 0.05, 0.1, v => v.toFixed(2), v => { S.psi = v; up(); });
      box.append(out);
      up();
    }
  });
});
