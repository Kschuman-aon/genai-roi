// Metric Matcher - classification quiz (DOM, shared quiz kit)
// CANVAS_HEIGHT: 560
//
// Ten situations, each matched to the one of eight productivity metrics it measures.
// Two attempts per item; the review table at the end shows which near-neighbours caused errors.

const METRICS = [
  ['Adoption Rate', 'Active users divided by eligible users.'],
  ['Usage Frequency', 'How often adopted users engage, measured in queries per active user per week.'],
  ['Task Completion Time', 'Elapsed time for a user to finish one defined task.'],
  ['Cycle Time Reduction', 'Percentage decrease in total elapsed time of a whole process, including waiting.'],
  ['Throughput Improvement', 'Percentage increase in work completed per unit of time.'],
  ['Deflection Rate', 'Requests fully resolved by automation with no escalation to a human.'],
  ['First-Contact Resolution Rate', 'Inquiries fully resolved in the first interaction, with or without a human.'],
  ['Rework Rate', 'Share of assisted outputs that had to be corrected, redone, or escalated.']
];
const ITEMS = [
  { t: '34 of the 40 eligible agents used the assistant at least once in the last 30 days.', m: 'Adoption Rate', why: 'It is the share of eligible users who are active.' },
  { t: 'Agents who use the assistant send it 324 queries a week on average, against 360 planned.', m: 'Usage Frequency', why: 'It measures how often adopted users engage, not how many started.' },
  { t: 'The average time an agent spends on one ticket fell from 15 to 14 minutes.', m: 'Task Completion Time', why: 'It is the elapsed time of a single defined task.' },
  { t: 'A refund runs through intake, review, approval and payment, and its elapsed time fell from 6 days to 5.', m: 'Cycle Time Reduction', why: 'It is the elapsed time of a whole multi-step process.' },
  { t: 'Agents now complete 4.29 tickets per working hour, up from 4.00.', m: 'Throughput Improvement', why: 'It is work completed per unit of time, increased.' },
  { t: 'The self-service bot resolved 700 of 1,000 requests and none of those customers contacted an agent within three days.', m: 'Deflection Rate', why: 'Automation resolved the requests with no escalation to a human.' },
  { t: "75% of tickets are fully resolved in the customer's first interaction, with the assistant helping the human agent.", m: 'First-Contact Resolution Rate', why: 'A human was involved, so it cannot be deflection.' },
  { t: '9% of assisted tickets had to be corrected or reopened.', m: 'Rework Rate', why: 'It is the share of assisted outputs needing correction.' },
  { t: 'Ticket open-to-close time fell from 240 to 239 minutes.', m: 'Cycle Time Reduction', why: 'It covers the whole elapsed time of the ticket, including waiting.' },
  { t: 'Only 40% of staff who tried the assistant once now use it more than five times a week.', m: 'Usage Frequency', why: 'It measures continued engagement among those who started.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 560);
  new QK.Runner({
    box: UI.panel, items: ITEMS, attempts: 2, mastery: 8, checkLabel: 'Commit', label: 'Correct on first attempt',
    note: 'Illustrative situations from the chapter running example',
    question: it => `${it.t} Which metric does this situation measure?`,
    controls: (it, ctl) => {
      ctl.style.display = 'grid'; ctl.style.gridTemplateColumns = 'repeat(auto-fit,minmax(300px,1fr))';
      const ch = QK.choice(ctl, METRICS.map(([n, d]) => ({ value: n, html: `<b>${n}</b><br><span style="font-weight:normal;font-size:11px">${d}</span>` })));
      ctl.querySelectorAll('button').forEach(b => { b.style.textAlign = 'left'; });
      return ch.get;
    },
    judge: (it, a) => ({ ok: a === it.m, okMsg: `${it.m}. ${it.why}`, why: 'Not quite. ' + it.why, reveal: it.m }),
    onDone: r => {
      const box = r.explore('Review: every situation, its metric, and the reason');
      box.style.display = 'block';
      const rows = ITEMS.map((it, i) => [i + 1, it.t, `<b>${it.m}</b>`, it.why, r.firstMiss.includes(i) ? '✗ missed first try' : '✓']);
      const d = QK.E('div', '', QK.table(['#', 'Situation', 'Metric', 'Reason', 'First try'], rows));
      d.style.fontSize = '11px'; box.append(d);
    }
  });
});
