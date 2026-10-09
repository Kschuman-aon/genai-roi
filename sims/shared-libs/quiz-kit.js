// quiz-kit.js - shared helpers for the commit-then-explore MicroSims.
// Library-agnostic (used with p5.js, Chart.js, Mermaid, or plain DOM).
//
//   QK.layout(visHeight, panelHeight) -> { vis, panel }   fixed-height page frame
//   new QK.Runner({...})                                  sequential challenge flow
//   new QK.Sorter({...})                                  click-to-place card sorter
//   QK.num / QK.choice / QK.slider                        small input builders
//   QK.usd / QK.int / QK.pct                              number formatting
const QK = (() => {
  const css = `
  html,body{margin:0;padding:0;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1f2937}
  .qk-vis{background:aliceblue;border:1px solid silver;box-sizing:border-box;position:relative;overflow:hidden}
  .qk{box-sizing:border-box;padding:8px 12px;overflow-y:auto;background:#fff;border:1px solid #e2e8f0;font-size:14px;line-height:1.35}
  .qk-head{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#475569;margin-bottom:4px}
  .qk-score{font-weight:bold;color:#1a237e}
  .qk-q{font-weight:bold;margin:2px 0 6px}
  .qk-ctl{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;margin-bottom:6px}
  .qk-ctl.locked{pointer-events:none;opacity:.65}
  .qk-btns{display:flex;gap:8px;margin-bottom:6px}
  .qk button{font:inherit;font-size:13px;padding:4px 12px;border:1px solid #3949ab;background:#3949ab;color:#fff;border-radius:4px;cursor:pointer}
  .qk button:disabled{background:#cbd5e1;border-color:#cbd5e1;cursor:default}
  .qk button.alt{background:#fff;color:#3949ab}
  .qk button.opt{background:#fff;color:#1f2937;border-color:#94a3b8}
  .qk button.opt.sel{background:#e8eaf6;border-color:#3949ab;font-weight:bold}
  .qk input[type=text]{font:inherit;width:110px;padding:3px 6px;border:1px solid #94a3b8;border-radius:4px}
  .qk label{font-size:13px}
  .qk-fb{padding:6px 8px;border-radius:4px;background:#f8fafc;min-height:20px}
  .qk-fb.ok{background:#e8f5e9;color:#1b5e20}.qk-fb.bad{background:#fdecea;color:#7f1d1d}.qk-fb.info{background:#fff8e1;color:#5d4037}
  .qk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:6px 18px}
  .qk-sl{display:grid;grid-template-columns:1fr auto;gap:0 8px;align-items:center;font-size:13px}
  .qk-sl input{grid-column:1/3;width:100%}
  .qk-sl b{color:#1a237e}
  .qk table{border-collapse:collapse;font-size:12px;margin:4px 0}
  .qk td,.qk th{border:1px solid #cbd5e1;padding:2px 6px;text-align:left}
  .qk th{background:#eef2ff}
  .qk button.qk-card{display:block;width:100%;text-align:left;margin:2px 0;padding:4px 8px;font-size:13px;border:1px solid #94a3b8;border-radius:4px;background:#fff;color:#1f2937}
  .qk button.qk-card.sel{outline:2px solid #3949ab;background:#e8eaf6}
  .qk button.qk-card.good{background:#e8f5e9;border-color:#2e7d32}.qk button.qk-card.miss{background:#fdecea;border-color:#c62828}
  .qk-bins{display:grid;gap:6px;margin-top:6px}
  .qk-bin{border:2px dashed #94a3b8;border-radius:6px;padding:4px;min-height:60px;cursor:pointer;background:#f8fafc}
  .qk-bin h4{margin:0 0 3px;font-size:12px;color:#1a237e}
  .qk-note{font-style:italic}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const E = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const usd = (n, d = 2) => (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const int = n => Math.round(n).toLocaleString('en-US');
  const pct = (n, d = 1) => (n < 0 ? '−' : '') + Math.abs(n).toFixed(d) + '%';

  function layout(visH, panelH) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const vis = E('div', 'qk-vis');
    vis.style.height = visH + 'px';
    const panel = E('div', 'qk');
    panel.style.height = panelH + 'px';
    if (visH) main.append(vis);
    main.append(panel);
    return { vis, panel };
  }

  function num(parent, label, o = {}) {
    const w = E('label', '', label + ' ' + (o.prefix || ''));
    const i = E('input');
    i.type = 'text';
    i.inputMode = 'decimal';
    if (o.placeholder) i.placeholder = o.placeholder;
    w.append(i);
    if (o.suffix) w.append(' ' + o.suffix);
    parent.append(w);
    return {
      el: i,
      get: () => { const t = i.value.replace(/[,$%\s]/g, '').replace('−', '-'); return t === '' || isNaN(Number(t)) ? NaN : Number(t); }
    };
  }

  function choice(parent, options, o = {}) {
    let val = null;
    const btns = options.map(opt => {
      const v = typeof opt === 'object' ? opt.value : opt;
      const b = E('button', 'opt', typeof opt === 'object' ? opt.html : String(opt));
      b.type = 'button';
      b.onclick = () => { val = v; btns.forEach(x => x.classList.remove('sel')); b.classList.add('sel'); if (o.onChange) o.onChange(v); };
      b._v = v;
      parent.append(b);
      return b;
    });
    return {
      get: () => val,
      set: v => { val = v; btns.forEach(x => x.classList.toggle('sel', x._v === v)); }
    };
  }

  function slider(parent, label, min, max, step, val, fmt, cb) {
    const w = E('div', 'qk-sl');
    const t = E('span');
    const v = E('b');
    const i = E('input');
    i.type = 'range'; i.min = min; i.max = max; i.step = step; i.value = val;
    i.setAttribute('aria-label', label);
    const show = () => { v.textContent = fmt(Number(i.value)); };
    i.oninput = () => { show(); cb(Number(i.value)); };
    t.textContent = label;
    w.append(t, v, i);
    parent.append(w);
    show();
    return { el: i, get: () => Number(i.value), set: x => { i.value = x; show(); } };
  }

  // Sequential challenge flow: question -> controls -> Check -> feedback -> Next -> ... -> onDone.
  class Runner {
    constructor(o) {
      Object.assign(this, { attempts: 1, checkLabel: 'Check', label: 'Correct on first attempt', note: '' }, o);
      this.i = 0; this.score = 0; this.tries = 0; this.missed = []; this.firstMiss = [];
      const b = this.box;
      b.innerHTML = '';
      const head = E('div', 'qk-head');
      this.scoreEl = E('span', 'qk-score');
      head.append(this.scoreEl, E('span', 'qk-note', this.note));
      this.q = E('div', 'qk-q');
      this.ctl = E('div', 'qk-ctl');
      const btns = E('div', 'qk-btns');
      this.checkB = E('button', '', this.checkLabel);
      this.nextB = E('button', 'alt', 'Next');
      this.checkB.onclick = () => this.check();
      this.nextB.onclick = () => this.next();
      btns.append(this.checkB, this.nextB);
      this.fb = E('div', 'qk-fb');
      b.append(head, this.q, this.ctl, btns, this.fb);
      this.ctl.addEventListener('keydown', e => { if (e.key === 'Enter' && !this.checkB.disabled) this.check(); });
      this.show();
    }
    get item() { return this.items[this.i]; }
    updateScore() { this.scoreEl.textContent = `${this.label}: ${this.score} of ${this.items.length}`; }
    say(cls, html) { this.fb.className = 'qk-fb ' + cls; this.fb.innerHTML = html; }
    show() {
      this.tries = 0;
      this.q.textContent = `(${this.i + 1} of ${this.items.length}) ` + this.question(this.item, this.i);
      this.ctl.innerHTML = '';
      this.ctl.classList.remove('locked');
      this.get = this.controls(this.item, this.ctl, this.i);
      this.checkB.disabled = false;
      this.nextB.style.display = 'none';
      this.say('', '');
      this.updateScore();
      if (this.onShow) this.onShow(this.item, this.i);
    }
    check() {
      const a = this.get();
      if (a == null || (typeof a === 'number' && isNaN(a))) { this.say('info', 'Enter or choose an answer first.'); return; }
      const r = this.judge(this.item, a, this.i);
      this.tries++;
      if (!r.ok && this.tries === 1) this.firstMiss.push(this.i);
      if (r.ok) {
        if (this.tries === 1) this.score++;
        this.say('ok', '<b>Correct:</b> ' + r.okMsg);
        this.finish(true, a);
      } else if (this.tries < this.attempts) {
        this.say('bad', r.why + ' <i>Try again.</i>');
        if (this.onResult) this.onResult(this.item, this.i, { ok: false, final: false, answer: a });
      } else {
        this.missed.push(this.i);
        this.say('bad', (r.reveal ? `<b>Answer:</b> ${r.reveal}. ` : '') + r.why);
        this.finish(false, a);
      }
      this.updateScore();
    }
    finish(ok, a) {
      this.checkB.disabled = true;
      this.ctl.classList.add('locked');
      this.nextB.textContent = this.i === this.items.length - 1 ? 'Finish' : 'Next';
      this.nextB.style.display = '';
      if (this.onResult) this.onResult(this.item, this.i, { ok, final: true, answer: a });
    }
    next() {
      this.i++;
      if (this.i < this.items.length) { this.show(); return; }
      this.q.textContent = '';
      this.ctl.innerHTML = '';
      this.checkB.style.display = 'none';
      this.nextB.style.display = 'none';
      const n = this.items.length;
      const m = this.mastery ? ` Mastery threshold: ${this.mastery} of ${n} — ${this.score >= this.mastery ? 'reached.' : 'not yet reached; reload to try again.'}` : '';
      this.say('info', `<b>Finished: ${this.score} of ${n} correct on the first attempt.</b>${m}`);
      this.updateScore();
      if (this.onDone) this.onDone(this);
    }
    // Replace the challenge UI with an exploration panel; returns the container.
    explore(title) {
      this.q.textContent = title || 'Explore (not scored)';
      this.ctl.innerHTML = '';
      this.ctl.className = 'qk-grid';
      this.ctl.style.marginTop = '4px';
      return this.ctl;
    }
  }

  // Click-to-place sorter. Click a card, then click a bin; click a placed card to return it.
  class Sorter {
    constructor(o) {
      Object.assign(this, { label: 'Correct on first attempt' }, o);
      const rnd = (() => { let s = this.seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
      this.cards = this.cards.map((c, id) => ({ ...c, id, place: null, locked: false }));
      this.order = this.cards.map(c => c.id);
      for (let k = this.order.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [this.order[k], this.order[j]] = [this.order[j], this.order[k]]; }
      this.sel = null; this.committed = false; this.retry = false;
      const b = this.box;
      b.innerHTML = '';
      const head = E('div', 'qk-head');
      this.scoreEl = E('span', 'qk-score');
      head.append(this.scoreEl, E('span', 'qk-note', this.note || ''));
      this.q = E('div', 'qk-q', this.question);
      this.poolEl = E('div');
      this.binsEl = E('div', 'qk-bins');
      this.binsEl.style.gridTemplateColumns = `repeat(${this.bins.length > 4 ? 3 : this.bins.length}, 1fr)`;
      const btns = E('div', 'qk-btns');
      this.commitB = E('button', '', 'Commit');
      this.retryB = E('button', 'alt', 'Retry incorrect cards (practice)');
      this.retryB.style.display = 'none';
      this.commitB.onclick = () => this.commit();
      this.retryB.onclick = () => this.retryWrong();
      btns.append(this.commitB, this.retryB);
      this.fb = E('div', 'qk-fb');
      b.append(head, this.q, this.poolEl, this.binsEl, btns, this.fb);
      this.render();
    }
    cardEl(c) {
      const d = E('button', 'qk-card', c.text);
      d.type = 'button';
      if (this.sel === c.id) d.classList.add('sel');
      if (c.res === true) d.classList.add('good');
      if (c.res === false) d.classList.add('miss');
      d.onclick = ev => {
        if (c.place != null && this.sel != null && !this.committed) return;   // let the bin place the current card
        ev.stopPropagation();
        if (c.locked || (this.committed && !this.retry)) return;
        if (c.place != null) { c.place = null; this.sel = null; } else { this.sel = this.sel === c.id ? null : c.id; }
        this.render();
      };
      return d;
    }
    render() {
      this.poolEl.innerHTML = '';
      const pool = this.order.map(i => this.cards[i]).filter(c => c.place == null);
      if (pool.length && (this.sel == null || this.cards[this.sel].place != null)) this.sel = pool[0].id;
      if (!pool.length) this.sel = null;
      this.poolEl.append(E('div', 'qk-note', pool.length ? `Cards left to place: ${pool.length}. Click a bin to place this card.` : 'All cards placed. Click a placed card to move it back, or press Commit.'));
      if (pool.length) this.poolEl.append(this.cardEl(this.cards[this.sel]));
      this.binsEl.innerHTML = '';
      this.bins.forEach(name => {
        const bin = E('div', 'qk-bin');
        bin.append(E('h4', '', name));
        this.order.map(i => this.cards[i]).filter(c => c.place === name).forEach(c => bin.append(this.cardEl(c)));
        bin.onclick = () => {
          if (this.sel == null || (this.committed && !this.retry)) return;
          const c = this.cards[this.sel];
          if (c.locked) return;
          c.place = name; this.sel = null;
          this.render();
        };
        this.binsEl.append(bin);
      });
      this.commitB.disabled = pool.length > 0 || (this.committed && !this.retry);
      this.scoreEl.textContent = this.scored != null ? `${this.label}: ${this.scored} of ${this.cards.length}` : `Placed: ${this.cards.length - pool.length} of ${this.cards.length}`;
    }
    commit() {
      const wrong = [];
      this.cards.forEach(c => { if (!c.locked) { c.res = c.place === c.bin; if (!c.res) wrong.push(c); } });
      if (!this.committed) this.scored = this.cards.length - wrong.length;
      const first = !this.committed;
      this.committed = true; this.retry = false; this.sel = null;
      this.cards.forEach(c => { if (c.res) c.locked = true; });
      let html = first ? `<b>${this.scored} of ${this.cards.length} correct on the first attempt.</b>` + (this.mastery ? ` Mastery threshold: ${this.mastery} — ${this.scored >= this.mastery ? 'reached.' : 'not yet reached.'}` : '') : `<b>Practice retry: ${this.cards.length - wrong.length} of ${this.cards.length} now correct</b> (does not change the scored result).`;
      html += '<ul style="margin:4px 0 0 16px;padding:0">' + this.order.map(i => this.cards[i]).filter(c => c.res === false || (first && c.res)).map(c => c.res ? `<li><b>Correct:</b> ${c.why}</li>` : `<li><b>Should be ${c.bin}:</b> ${c.why}</li>`).join('') + '</ul>';
      this.fb.className = 'qk-fb ' + (wrong.length ? 'bad' : 'ok');
      this.fb.innerHTML = html;
      this.retryB.style.display = first && wrong.length ? '' : 'none';
      this.render();
    }
    retryWrong() {
      this.cards.forEach(c => { if (!c.locked) { c.place = null; c.res = undefined; } });
      this.retry = true; this.retryB.style.display = 'none';
      this.fb.className = 'qk-fb info';
      this.fb.textContent = 'Practice retry: place the returned cards again, then press Commit.';
      this.render();
    }
  }

  const table = (head, rows) => '<table><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr>' + rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</table>';

  return { E, usd, int, pct, layout, num, choice, slider, Runner, Sorter, table };
})();
