// Pipeline Stage Sorter - interactive classification exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 400
//
// Classify ten cost-analytics pipeline tasks under Collect, Transform, Load, or Serve.

const STAGES = ['Collect', 'Transform', 'Load', 'Serve'];
const DEFS = [
  ['Collect', 'Gather raw usage and billing records from their sources.'],
  ['Transform', 'Clean, validate, deduplicate, price, and tag the records.'],
  ['Load', 'Write the cleaned records to storage and manage how long they are kept.'],
  ['Serve', 'Deliver the stored data to dashboards, alerts, and reports.']
];
const TASKS = [
  ['Write a call record with a request ID and tenant to the application log.', 'Collect', 'It creates the raw record at the source.'],
  ["Pull yesterday's usage from the provider's billing interface.", 'Collect', 'It gathers raw data from an outside source.'],
  ['Multiply input and output tokens by the price in effect on the request date.', 'Transform', 'Pricing enriches the raw record.'],
  ['Drop records that share a request ID with an earlier record.', 'Transform', 'Deduplication cleans the data before storage.'],
  ['Map the tag values "supp" and "Support" to the single value "support".', 'Transform', 'Normalizing tags is cleaning.'],
  ['Reject a record with a negative token count.', 'Transform', 'Validation is a cleaning step.'],
  ["Append the day's cleaned records to the fact table, partitioned by date.", 'Load', 'It writes the cleaned data to storage.'],
  ['Move payload logs to cheaper storage after 30 days.', 'Load', 'Retention management is a storage step.'],
  ['Refresh the dashboard panel that shows cost by team.', 'Serve', 'It delivers stored data to a report.'],
  ['Send an alert when daily spend passes the anomaly threshold.', 'Serve', 'It delivers a signal from stored data to people.']
].map(([task, stage, why]) => ({ task, stage, why }));

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 400);
  new QK.Runner({
    box: UI.panel, items: TASKS, attempts: 2, mastery: 8, checkLabel: 'Commit', label: 'Correct on first attempt',
    note: 'Illustrative tasks',
    question: t => `${t.task}  At which stage of the pipeline does this task happen?`,
    controls: (t, ctl) => {
      const d = QK.E('div', '', QK.table(['Stage', 'Definition'], DEFS.map(([s, x]) => [`<b>${s}</b>`, x])));
      d.style.flexBasis = '100%';
      ctl.append(d);
      return QK.choice(ctl, STAGES).get;
    },
    judge: (t, v) => ({ ok: v === t.stage, okMsg: `${t.stage}. ${t.why}`, why: 'Not quite. ' + t.why, reveal: t.stage }),
    onDone: run => {
      run.ctl.className = 'qk-ctl';
      run.ctl.innerHTML = QK.table(STAGES, [0].map(() => STAGES.map(s => TASKS.filter(t => t.stage === s).map(t => '• ' + t.task).join('<br>'))));
      run.q.textContent = 'Every task under its correct stage. Note which cleaning tasks look like storage work but happen in Transform.';
    }
  });
});
