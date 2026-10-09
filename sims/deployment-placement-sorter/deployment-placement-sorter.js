// Deployment Placement Sorter - interactive sorting exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 600
//
// Eight workload cards are sorted into four placement approaches.
// One scored commitment, one practice retry.

const CARDS = [
  { text: 'An internal summarizer used by one office in one country, tolerant of a delay of several seconds.', bin: 'Single region', why: 'No distance, residency or resilience requirement justifies a second always-on floor.' },
  { text: 'A bank must process customer data inside two countries, each of which forbids moving it abroad.', bin: 'Multi-region', why: 'Residency rules require processing in each jurisdiction, accepting two always-on floors.' },
  { text: 'A field-inspection app must classify photos with no network connection.', bin: 'Edge', why: 'Offline use requires the model on the device.' },
  { text: 'A retailer runs a steady 2 million queries a day on owned servers and sends only holiday spikes to a cloud provider.', bin: 'Hybrid cloud', why: 'Owned hardware is cheapest at steady load; cloud absorbs bursts.' },
  { text: 'A consumer app has users on three continents and needs the first token to appear quickly everywhere.', bin: 'Multi-region', why: 'Placing capacity near users cuts the delay before the first token.' },
  { text: "A hospital wants a 3-billion-parameter 4-bit model to run on clinicians' tablets so patient notes never leave the device.", bin: 'Edge', why: 'Data stays on the device and the model is small enough to fit.' },
  { text: 'A company wants to keep a credible exit from its single cloud vendor while retaining elasticity for new projects.', bin: 'Hybrid cloud', why: 'Spanning on-premises and cloud limits vendor dependence without giving up elasticity.' },
  { text: 'A prototype with 20 users, a weekly demo, and no data restrictions.', bin: 'Single region', why: 'Spending on duplicate capacity before demand exists is waste.' }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 600);
  new QK.Sorter({
    box: UI.panel, cards: CARDS, bins: ['Single region', 'Multi-region', 'Edge', 'Hybrid cloud'], seed: 7, mastery: 7,
    question: 'Which approach does each workload need?', note: 'Illustrative scenarios'
  });
});
