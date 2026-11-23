/* Agency Era — interface: wires the rules, the scene and the sound together. */
(function () {
  'use strict';
  const G = window.AgencyEra, Scene = window.AgencyScene, Audio = window.AgencyAudio;
  const $ = (id) => document.getElementById(id);
  const fmt = G.fmt;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Scene.setReduced(reduced);

  let state = null, screen = 'title', endShown = false, reportTimer = null, endTimer = null;
  const KEYS = { solar: 'S', hall: 'D', reactor: 'N' };

  /* ---------- canvas loop ---------- */
  const canvas = $('scene'), ctx = canvas.getContext('2d');
  let raf = 0, last = 0, frames = 0, fpsT = 0, fps = 0, ft = 0;
  function fit() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(320, Math.round(r.width * dpr)), h = Math.round(w * 9 / 16);
    if (canvas.width !== w) { canvas.width = w; canvas.height = h; }
  }
  function draw() {
    ctx.setTransform(canvas.width / Scene.W, 0, 0, canvas.height / Scene.H, 0, 0);
    Scene.render(ctx);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const s = canvas.width / 800;
    ctx.fillStyle = 'rgba(8,12,24,.6)'; ctx.fillRect(0, 0, 92 * s, 15 * s);
    ctx.font = (9 * s) + 'px monospace'; ctx.fillStyle = fps && fps < 30 ? '#f66' : '#9fd49f'; ctx.textBaseline = 'middle';
    ctx.fillText('FPS ' + fps.toFixed(0) + '  ' + ft.toFixed(1) + 'ms', 5 * s, 8 * s);
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (screen !== 'game') { last = now; return; }
    const dt = Math.min(0.1, (now - (last || now)) / 1000); ft = now - (last || now); last = now;
    frames++; if (now - fpsT >= 1000) { fps = frames * 1000 / (now - fpsT); frames = 0; fpsT = now; }
    Scene.update(dt); draw();
  }
  window.advanceTime = (ms) => { const n = Math.max(1, Math.round(ms / (1000 / 60))); for (let i = 0; i < n; i++) Scene.update(1 / 60); draw(); };

  /* ---------- number tweens ---------- */
  const shown = {};
  function setNum(key, value, dec) {
    const el = document.querySelector('[data-num="' + key + '"]'); if (!el) return;
    const from = shown[key] == null ? value : shown[key]; shown[key] = value;
    const put = (v) => { el.textContent = dec ? (Math.round(v * 10) / 10).toFixed(1) : Math.round(v).toString(); };
    if (reduced || from === value) { put(value); return; }
    const t0 = performance.now(), dur = 520;
    (function tick(now) { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); put(from + (value - from) * e); if (k < 1 && shown[key] === value) requestAnimationFrame(tick); })(t0);
  }

  /* ---------- render ---------- */
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function render() {
    if (!state) return;
    const d = G.derive(state), live = state.phase === 'orders';
    $('q-label').textContent = 'Quarter ' + state.q + ' of ' + G.C.MAX_Q;
    $('q-fill').style.width = (state.q / G.C.MAX_Q * 100) + '%';

    setNum('energy', d.energy); setNum('compute', d.compute); setNum('agents', d.agents);
    setNum('direction', state.direction * 100); setNum('capital', state.capital, true); setNum('launch', Math.floor(d.launchPct));
    const sub = (k, t) => { document.querySelector('[data-sub="' + k + '"]').textContent = t; };
    sub('energy', d.sparePower > 0 ? d.sparePower + ' unused' : 'all in use');
    sub('compute', d.darkRacks > 0 ? d.darkRacks + ' racks dark' : 'all powered');
    sub('agents', 'unlimited supply');
    sub('capital', d.income > 0 ? '+$' + fmt(d.income) + 'M a quarter' : 'no income');
    $('stat-energy').classList.toggle('is-short', d.bottleneck === 'energy');
    $('stat-compute').classList.toggle('is-short', d.bottleneck === 'compute');
    $('stat-direction').classList.toggle('is-short', d.bottleneck === 'direction');
    const md = document.querySelector('[data-meter="direction"]'); md.style.width = (state.direction * 100) + '%'; md.classList.toggle('is-low', state.direction < 0.6);
    document.querySelector('[data-meter="launch"]').style.width = d.launchPct + '%';

    // pips
    const pips = $('pips'); pips.textContent = '';
    const max = Math.max(d.maxOrders, state.ordersLeft);
    for (let i = 0; i < max; i++) pips.appendChild(el('span', 'pip' + (i < state.ordersLeft ? '' : ' is-spent')));
    pips.appendChild(el('span', 'pips__n', state.ordersLeft + ' left'));
    pips.setAttribute('aria-label', state.ordersLeft + ' of ' + max + ' orders left this quarter');

    // builds
    const builds = $('builds'); builds.textContent = '';
    Object.keys(G.BUILDINGS).forEach((type) => {
      const can = G.canBuild(state, type), b = el('button', 'act'); b.type = 'button'; b.dataset.build = type; b.disabled = !can.ok;
      const main = el('span', 'act__main');
      main.appendChild(el('span', 'act__name', G.BUILDINGS[type].name));
      main.appendChild(el('span', 'act__sub', can.ok || !live ? G.BUILDINGS[type].gives + ' · ' + G.slotsUsed(state, type) + '/' + G.C.SLOTS[type] + ' sites' : can.why));
      const side = el('span', 'act__side'); side.appendChild(el('span', 'act__cost', '$' + G.costOf(state, type) + 'M')); side.appendChild(el('kbd', null, KEYS[type]));
      b.appendChild(main); b.appendChild(side); builds.appendChild(b);
    });

    // review
    const cr = G.canReview(state); $('btn-review').disabled = !cr.ok;
    $('review-sub').textContent = state.direction >= 0.999 ? 'Direction is at 100%. Drifts −' + Math.round(d.drift * 100) + ' a quarter' : cr.ok || !live ? 'Direction ' + Math.round(state.direction * 100) + '% → 100%. Drifts −' + Math.round(d.drift * 100) + ' a quarter' : cr.why;

    // wings
    const wings = $('wings'); wings.textContent = '';
    state.wings.forEach((w, i) => {
      const row = el('div', 'wing'); row.appendChild(el('span', 'wing__name', 'Wing ' + (i + 1)));
      const seg = el('div', 'seg'); seg.setAttribute('role', 'radiogroup'); seg.setAttribute('aria-label', 'Mission for wing ' + (i + 1));
      Object.keys(G.MISSIONS).forEach((m) => {
        const b = el('button', null, G.MISSIONS[m].name); b.type = 'button'; b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', String(w === m)); b.dataset.wing = i; b.dataset.mission = m;
        if (w !== m) b.disabled = !G.canAssign(state, i, m).ok;
        seg.appendChild(b);
      });
      row.appendChild(seg); wings.appendChild(row);
    });

    // research
    $('rp').textContent = Math.floor(state.rp);
    const techs = $('techs'); techs.textContent = '';
    Object.keys(G.TECHS).forEach((id) => {
      const T = G.TECHS[id], owned = state.techs.indexOf(id) !== -1, can = G.canAdopt(state, id);
      const b = el('button', 'tech' + (owned ? ' is-owned' : can.ok ? ' is-ready' : '')); b.type = 'button'; b.dataset.tech = id;
      if (owned) b.setAttribute('aria-disabled', 'true'); else b.disabled = !can.ok;
      const top = el('span', 'tech__top'); top.appendChild(el('span', null, T.name)); top.appendChild(el('span', 'tech__cost', owned ? 'Adopted' : String(T.cost)));
      b.appendChild(top); b.appendChild(el('span', 'tech__text', T.text)); techs.appendChild(b);
    });

    // forecast
    const f = $('forecast'); f.textContent = '';
    f.appendChild(document.createTextNode('This quarter: '));
    const parts = ['+$' + fmt(d.income) + 'M', '+' + fmt(d.research) + ' research', '+' + fmt(d.launch / G.C.LAUNCH_GOAL * 100) + '% launch'];
    parts.forEach((p, i) => { f.appendChild(el('b', null, p)); if (i < 2) f.appendChild(document.createTextNode(' · ')); });
    if (live && state.ordersLeft > 0) f.appendChild(document.createTextNode(' · ' + state.ordersLeft + ' order' + (state.ordersLeft === 1 ? '' : 's') + ' unused'));
    $('btn-end').disabled = !live;

    // advice + log
    $('advice').textContent = G.advice(state);
    const log = $('log'); log.textContent = '';
    state.log.slice(-40).reverse().forEach((e) => { const li = el('li'); li.appendChild(el('span', 'log__q', 'Q' + e.q)); li.appendChild(el('span', null, e.text)); log.appendChild(li); });

    Scene.setView({ solar: state.solar, hall: state.hall, reactor: state.reactor, queue: state.queue, agents: d.agents, direction: state.direction,
      wings: state.wings, launchPct: d.launchPct, poweredHalls: Math.ceil(Math.max(0, Math.min(d.compute, d.energy) - state.bonusCompute) / G.C.HALL_C), phase: state.phase });
  }

  /* ---------- actions ---------- */
  function act(fn, sound) {
    if (!state || state.phase !== 'orders') return;
    const ok = fn();
    Audio.play(ok ? sound : 'deny');
    render();
  }

  function endQuarter() {
    if (!state || state.phase !== 'orders') return;
    const rep = G.endQuarter(state); if (!rep) return;
    Audio.play('quarter');
    showReport('Q' + rep.q + ' closed · +$' + fmt(rep.income) + 'M · +' + fmt(rep.research) + ' research · +' + fmt(rep.launch / G.C.LAUNCH_GOAL * 100) + '% launch');
    render();
    if (state.phase === 'event') setTimeout(openEvent, reduced ? 0 : 650);
    else if (state.phase === 'won') { Scene.startLiftoff(); Audio.play('rumble'); endTimer = setTimeout(openEnd, reduced ? 200 : 3600); }
    else if (state.phase === 'lost') endTimer = setTimeout(openEnd, reduced ? 200 : 900);
  }

  function showReport(text) {
    const r = $('report'); r.textContent = text; r.classList.add('is-on');
    clearTimeout(reportTimer); reportTimer = setTimeout(() => r.classList.remove('is-on'), 3200);
  }

  /* ---------- dialogs ---------- */
  function open(d) { if (!d.open) d.showModal(); }
  function close(d) { if (d.open) d.close(); }

  function openEvent() {
    if (!state || state.phase !== 'event') return;
    const ev = G.getEvent(state); if (!ev) return;
    Audio.play('event');
    $('ev-eyebrow').textContent = 'Dispatch · Quarter ' + state.q;
    $('ev-title').textContent = ev.title; $('ev-text').textContent = ev.text;
    const box = $('ev-options'); box.textContent = ''; box.hidden = false;
    $('ev-outcome').hidden = true; $('ev-continue').hidden = true;
    ev.options.forEach((o, i) => {
      const st = G.optionState(state, o), b = el('button', 'act'); b.type = 'button'; b.dataset.option = i; b.disabled = !st.ok;
      const main = el('span', 'act__main'); main.appendChild(el('span', 'act__name', o.label)); main.appendChild(el('span', 'act__sub', st.ok ? o.note : o.note + ' · ' + st.why));
      b.appendChild(main); box.appendChild(b);
    });
    open($('dlg-event'));
    const first = box.querySelector('button:not([disabled])'); if (first) first.focus();
  }
  function chooseOption(i) {
    const out = G.resolveEvent(state, i); if (out == null) { Audio.play('deny'); return; }
    Audio.play('click');
    $('ev-options').hidden = true;
    const o = $('ev-outcome'); o.textContent = out; o.hidden = false;
    const c = $('ev-continue'); c.hidden = false; c.focus();
    render();
  }

  function openEnd() {
    if (!state || endShown) return; endShown = true;
    const won = state.phase === 'won', r = G.rating(state), d = G.derive(state);
    Audio.play(won ? 'win' : 'lose');
    const art = $('end-art'); art.src = './assets/' + (won ? 'win' : 'lose') + '.webp';
    art.alt = won ? 'A rocket climbs on a column of flame above the lit valley while the lone figure watches from the ridge.' : 'The valley at dusk, dark and silent, an unfinished rocket still in its gantry.';
    $('end-eyebrow').textContent = won ? 'Launched in quarter ' + state.q + ' of ' + G.C.MAX_Q : 'The window closed at ' + Math.floor(d.launchPct) + '%';
    $('end-title').textContent = r.title; $('end-line').textContent = r.line;
    const stats = $('end-stats'); stats.textContent = '';
    [['Peak swarm', state.stats.peakAgents + ' agents'], ['Humans', '1'], ['Reviews', String(state.stats.reviews)], ['Earned', '$' + Math.round(state.stats.earned) + 'M']].forEach((p) => {
      const w = el('div'); w.appendChild(el('dt', null, p[0])); w.appendChild(el('dd', null, p[1])); stats.appendChild(w);
    });
    open($('dlg-end')); $('end-again').focus();
  }

  /* ---------- lifecycle ---------- */
  function newGame(seed) {
    clearTimeout(endTimer); clearTimeout(reportTimer);
    ['dlg-event', 'dlg-end', 'dlg-new', 'dlg-help'].forEach((id) => close($(id)));
    state = G.newGame(seed); endShown = false; Scene.reset();
    Object.keys(shown).forEach((k) => delete shown[k]);
    $('report').classList.remove('is-on');
    render();
  }
  function start() {
    Audio.init();
    $('title').hidden = true; $('game').hidden = false; screen = 'game';
    newGame(); fit(); Audio.play('quarter');
    $('orders').focus({ preventScroll: true });
  }

  /* ---------- events ---------- */
  $('start').addEventListener('click', start);
  $('builds').addEventListener('click', (e) => { const b = e.target.closest('[data-build]'); if (b && !b.disabled) act(() => G.build(state, b.dataset.build), 'build'); });
  $('btn-review').addEventListener('click', () => act(() => G.review(state), 'review'));
  $('wings').addEventListener('click', (e) => { const b = e.target.closest('[data-mission]'); if (b && !b.disabled && b.getAttribute('aria-checked') !== 'true') act(() => G.assign(state, +b.dataset.wing, b.dataset.mission), 'assign'); });
  $('techs').addEventListener('click', (e) => { const b = e.target.closest('[data-tech]'); if (b && !b.disabled && !b.classList.contains('is-owned')) act(() => G.adopt(state, b.dataset.tech), 'adopt'); });
  $('btn-end').addEventListener('click', endQuarter);
  $('ev-options').addEventListener('click', (e) => { const b = e.target.closest('[data-option]'); if (b && !b.disabled) chooseOption(+b.dataset.option); });
  $('ev-continue').addEventListener('click', () => { close($('dlg-event')); $('orders').focus({ preventScroll: true }); });
  $('dlg-event').addEventListener('cancel', (e) => e.preventDefault());
  $('dlg-end').addEventListener('cancel', (e) => e.preventDefault());
  $('btn-help').addEventListener('click', () => { Audio.play('click'); open($('dlg-help')); });
  $('help-close').addEventListener('click', () => close($('dlg-help')));
  $('btn-new').addEventListener('click', () => { Audio.play('click'); open($('dlg-new')); });
  $('new-cancel').addEventListener('click', () => close($('dlg-new')));
  $('new-ok').addEventListener('click', () => { newGame(); Audio.play('quarter'); });
  $('end-again').addEventListener('click', () => { newGame(); Audio.play('quarter'); });
  $('btn-sound').addEventListener('click', () => {
    const v = !Audio.on; Audio.setOn(v); const b = $('btn-sound'); b.textContent = v ? 'Sound on' : 'Sound off'; b.setAttribute('aria-pressed', String(v));
    if (v) Audio.play('click');
  });

  document.addEventListener('keydown', (e) => {
    if (screen !== 'game' || e.metaKey || e.ctrlKey || e.altKey || document.querySelector('dialog[open]')) return;
    const k = e.key.toLowerCase();
    if (k === 's') act(() => G.build(state, 'solar'), 'build');
    else if (k === 'd') act(() => G.build(state, 'hall'), 'build');
    else if (k === 'n') act(() => G.build(state, 'reactor'), 'build');
    else if (k === 'r') act(() => G.review(state), 'review');
    else if (k === 'e') endQuarter();
    else return;
    e.preventDefault();
  });

  window.addEventListener('resize', fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(canvas);

  /* ---------- test hooks ---------- */
  window.render_game_to_text = () => {
    if (!state) return JSON.stringify({ screen: 'title', note: 'Click #start to begin.' });
    const d = G.derive(state), ev = G.getEvent(state);
    return JSON.stringify({
      screen, phase: state.phase, quarter: state.q, maxQuarter: G.C.MAX_Q, ordersLeft: state.ordersLeft,
      capital: +fmt(state.capital), energy: d.energy, compute: d.compute, agents: d.agents, direction: Math.round(state.direction * 100),
      launchPct: +fmt(d.launchPct), research: +fmt(state.rp), bottleneck: d.bottleneck, wings: state.wings,
      built: { solar: state.solar, hall: state.hall, reactor: state.reactor }, queue: state.queue, techs: state.techs,
      forecast: { income: +fmt(d.income), research: +fmt(d.research), launchPct: +fmt(d.launch / G.C.LAUNCH_GOAL * 100), drift: Math.round(d.drift * 100) },
      costs: { solar: G.costOf(state, 'solar'), hall: G.costOf(state, 'hall'), reactor: G.costOf(state, 'reactor') },
      event: ev ? { title: ev.title, options: ev.options.map((o) => ({ label: o.label, note: o.note, enabled: G.optionState(state, o).ok })) } : null,
      advice: G.advice(state), drones: Scene.drones, endShown,
      note: 'Turn-based. No coordinates: act via buttons or keys S/D/N/R/E.',
    });
  };
  window.__agencyEra = { get state() { return state; }, newGame };

  Scene.load().then(() => { fit(); if (screen === 'game') draw(); });
  raf = requestAnimationFrame(loop);
})();
