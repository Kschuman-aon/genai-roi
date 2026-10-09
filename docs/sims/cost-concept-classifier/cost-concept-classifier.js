// Cost Concept Classifier - interactive sorting exercise (DOM, shared quiz kit)
// CANVAS_HEIGHT: 600
//
// Eight spending descriptions are sorted into capital expenditure, operating
// expenditure, sunk cost, and opportunity cost. One scored commitment, one practice retry.

const CARDS = [
  { text: 'The monthly bill for per-token API usage, $18,000.', bin: 'Operating expenditure', why: 'Ongoing spending consumed in the current period is opex.' },
  { text: 'Purchase of a $120,000 GPU server that will be owned for four years.', bin: 'Capital expenditure', why: 'It is an asset providing value over several periods, so it is capitalized and depreciated.' },
  { text: '$25,000 already spent on a pilot that cannot be recovered, now being weighed in a continue-or-stop decision.', bin: 'Sunk cost', why: 'It is spent and unrecoverable, so it should not influence the forward-looking choice.' },
  { text: 'The $90,000 feature the two engineers could have shipped instead.', bin: 'Opportunity cost', why: 'It is the value of the next-best alternative given up, never paid out of pocket.' },
  { text: 'A three-year software license bought up front and amortized each year.', bin: 'Capital expenditure', why: 'It provides value over several periods, so it is capitalized and spread by amortization.' },
  { text: 'Monthly cloud GPU rental charges.', bin: 'Operating expenditure', why: 'Rental consumed this period is expensed immediately.' },
  { text: 'A vendor evaluation paid for last quarter that led to no purchase and cannot be refunded.', bin: 'Sunk cost', why: 'The money is gone whatever is decided next.' },
  { text: 'The value of the next-best project the data-science team gave up to work on this one.', bin: 'Opportunity cost', why: "The forgone alternative's value is the cost of choosing this option." }
];

window.addEventListener('DOMContentLoaded', () => {
  const UI = QK.layout(0, 600);
  new QK.Sorter({
    box: UI.panel, cards: CARDS, bins: ['Capital expenditure', 'Operating expenditure', 'Sunk cost', 'Opportunity cost'], seed: 11, mastery: 7,
    question: 'What kind of cost is each of these?', note: 'Illustrative scenarios'
  });
});
