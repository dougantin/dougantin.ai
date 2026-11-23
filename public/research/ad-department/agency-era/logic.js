/* Agency Era — game rules. Pure state machine, no DOM. Works in browser and Node. */
(function (root) {
  'use strict';

  const C = {
    MAX_Q: 16, ORDERS: 3, START_CAPITAL: 30, LAUNCH_GOAL: 300,
    SOLAR_E: 6, REACTOR_E: 30, HALL_C: 10,
    SLOTS: { solar: 6, hall: 8, reactor: 3 },
    COST: { solar: 8, hall: 14, reactor: 34 },
    GROWTH: { solar: 1.15, hall: 1.15, reactor: 1.2 },
    BUILD_TIME: { solar: 1, hall: 1, reactor: 2 },
    REV_PER_OUTPUT: 0.9, RP_PER_OUTPUT: 1, LAUNCH_PER_OUTPUT: 1,
    DRIFT_BASE: 0.05, DRIFT_PER_AGENT: 0.0025, DRIFT_MAX: 0.35, DIR_FLOOR: 0.2,
    EVENT_CHANCE: 0.75,
  };

  const BUILDINGS = {
    solar: { name: 'Solar field', gives: '+6 energy' },
    hall: { name: 'Data hall', gives: '+10 compute' },
    reactor: { name: 'Reactor', gives: '+30 energy, 2 quarters' },
  };

  const MISSIONS = {
    ventures: { name: 'Ventures', yields: 'capital' },
    research: { name: 'Research', yields: 'research' },
    launch: { name: 'Launch', yields: 'launch progress' },
  };

  const TECHS = {
    playbooks: { name: 'Playbooks', cost: 25, text: 'Direction drifts half as fast.' },
    storage: { name: 'Grid storage', cost: 30, text: 'Solar fields give +50% energy.' },
    moat: { name: 'Proprietary data', cost: 35, text: 'Ventures earn +40%.' },
    efficient: { name: 'Efficient models', cost: 40, text: 'Each rack runs 1.5 agents.' },
    boosters: { name: 'Reusable boosters', cost: 55, text: 'Launch work counts +40%.' },
    delegation: { name: 'Delegation', cost: 60, text: 'One more order every quarter.' },
  };

  const EVENTS = [
    { id: 'prices', title: 'Model prices fall again',
      text: 'The price of a unit of intelligence just dropped. Every lab matched it by lunch.',
      options: [
        { label: 'Run more agents per rack', note: '+25% agents per rack, for good', apply: (s) => { s.apcBonus *= 1.25; return 'Each rack now carries more agents.'; } },
        { label: 'Bank the savings', note: '+$12M', apply: (s) => { s.capital += 12; return 'You banked $12M.'; } },
      ] },
    { id: 'heat', title: 'Heat dome over the valley',
      text: 'The grid operator is curtailing industrial load for the coming quarter.',
      options: [
        { label: 'Buy peaker power', note: '−$8M, no outage', cost: 8, apply: (s) => { s.capital -= 8; return 'Peaker plants cover the gap.'; } },
        { label: 'Ride it out', note: '−35% energy next quarter', apply: (s) => { s.effects.push({ id: 'heat', turns: 1 }); return 'A third of your power goes dark for a quarter.'; } },
      ] },
    { id: 'rival', title: 'A rival ships your product',
      text: 'Same features, lower price, built by their swarm in a weekend.',
      options: [
        { label: 'Compete on taste', note: 'Needs direction 70%+. Ventures +10% for good', need: (s) => s.direction >= 0.7, apply: (s) => { s.revBonus *= 1.1; return 'Customers can tell the difference. They stay.'; } },
        { label: 'Compete on price', note: 'Ventures −25% for 2 quarters', apply: (s) => { s.effects.push({ id: 'pricewar', turns: 2 }); return 'Margins thin out for two quarters.'; } },
      ] },
    { id: 'name', title: 'The customer wants a name',
      text: 'An enterprise buyer will sign, but only if a human is accountable for the output.',
      options: [
        { label: 'Sign your name', note: '+$20M, one fewer order next quarter', apply: (s) => { s.capital += 20; s.orderPenalty += 1; return 'You signed. $20M lands, and next quarter you are in review meetings.'; } },
        { label: 'Decline', note: 'No change', apply: () => 'You pass on the contract.' },
      ] },
    { id: 'chips', title: 'Chip allocation opens',
      text: 'A fab has spare capacity for one buyer who commits today.',
      options: [
        { label: 'Commit', note: '−$10M, +8 compute', cost: 10, apply: (s) => { s.capital -= 10; s.bonusCompute += 8; return 'Eight more racks arrive on the next truck.'; } },
        { label: 'Pass', note: 'No change', apply: () => 'Someone else takes the allocation.' },
      ] },
    { id: 'halluc', title: 'Hallucination in production',
      text: 'An unreviewed agent shipped a confident, wrong answer to a client.',
      options: [
        { label: 'Open the incident report', note: 'Direction under 60% costs you $10M', apply: (s) => {
          if (s.direction < 0.6) { const loss = Math.min(10, s.capital); s.capital -= loss; return 'Nobody caught it. You refund $' + fmt(loss) + 'M.'; }
          return 'Your last review caught it before it shipped. No damage.'; } },
      ] },
    { id: 'queue', title: 'Interconnect queue clears',
      text: 'Your grid connection request, filed years ago, reaches the front of the line.',
      options: [
        { label: 'Energize', note: '+10 energy, for good', apply: (s) => { s.bonusEnergy += 10; return 'Ten more units of power flow into the valley.'; } },
        { label: 'Sell the slot', note: '+$14M', apply: (s) => { s.capital += 14; return 'A neighbor pays $14M for your place in line.'; } },
      ] },
    { id: 'window', title: 'An offer for your launch window',
      text: 'A larger firm will pay to take your slot on the pad.',
      options: [
        { label: 'Keep the window', note: 'No change', apply: () => 'The pad stays yours.' },
        { label: 'Sell it', note: '+$25M, launch −15%', apply: (s) => { s.capital += 25; s.launch = Math.max(0, s.launch - C.LAUNCH_GOAL * 0.15); return 'You take $25M and push the launch back.'; } },
      ] },
    { id: 'autonomy', title: 'The swarm asks for autonomy',
      text: 'Your agents propose to set their own goals for a quarter. Throughput would rise.',
      options: [
        { label: 'Keep the leash', note: 'No change', apply: () => 'The swarm keeps to your brief.' },
        { label: 'Let them run', note: '+40% output next quarter, direction −30', apply: (s) => { s.effects.push({ id: 'autonomy', turns: 1 }); s.direction = Math.max(C.DIR_FLOOR, s.direction - 0.3); return 'Output surges. So does the drift.'; } },
      ] },
    { id: 'open', title: 'Open-source windfall',
      text: 'A public release hands everyone the capability you spent a year chasing.',
      options: [
        { label: 'Read the paper', note: '+20 research', apply: (s) => { s.rp += 20; return 'Twenty research points, free to all. Including you.'; } },
      ] },
    { id: 'audit', title: 'Regulator wants an audit trail',
      text: 'Every agent decision must be traceable to a responsible person by next quarter.',
      options: [
        { label: 'Buy compliance tooling', note: '−$8M', cost: 8, apply: (s) => { s.capital -= 8; return 'The tooling handles it.'; } },
        { label: 'Write it yourself', note: 'One fewer order next quarter', apply: (s) => { s.orderPenalty += 1; return 'You spend part of next quarter on paperwork.'; } },
      ] },
    { id: 'permits', title: 'Permitting reform passes',
      text: 'New rules cut the approval time for nuclear builds.',
      options: [
        { label: 'File the paperwork', note: 'Reactors now finish in 1 quarter', apply: (s) => { s.fastReactors = true; return 'Reactors now come online a quarter sooner.'; } },
      ] },
  ];

  function fmt(n) { return (Math.round(n * 10) / 10).toString(); }

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function newGame(seed) {
    seed = (seed == null ? Math.floor(Math.random() * 1e9) : seed) >>> 0;
    const s = {
      seed, rngState: seed, q: 1, phase: 'orders', // orders | event | won | lost
      capital: C.START_CAPITAL, solar: 1, hall: 1, reactor: 0,
      queue: [], direction: 1, wings: ['ventures', 'ventures', 'ventures'],
      rp: 0, techs: [], launch: 0, ordersLeft: C.ORDERS, orderPenalty: 0,
      apcBonus: 1, revBonus: 1, bonusCompute: 0, bonusEnergy: 0, fastReactors: false,
      effects: [], deck: EVENTS.map((e) => e.id), event: null,
      built: { solar: 0, hall: 0, reactor: 0 },
      stats: { peakAgents: 0, reviews: 0, earned: 0 },
      log: [], lastReport: null,
    };
    s.log.push({ q: 1, text: 'You are one person on a ridge. The swarm below is as large as the compute you can power.' });
    return s;
  }

  function rand(s) { const r = rng(s.rngState)(); s.rngState = (s.rngState + 0x9e3779b9) >>> 0; return r; }
  const has = (s, t) => s.techs.indexOf(t) !== -1;
  const fx = (s, id) => s.effects.some((e) => e.id === id);

  function derive(s) {
    const solarE = s.solar * C.SOLAR_E * (has(s, 'storage') ? 1.5 : 1);
    let energy = solarE + s.reactor * C.REACTOR_E + s.bonusEnergy;
    if (fx(s, 'heat')) energy *= 0.65;
    energy = Math.floor(energy);
    const compute = s.hall * C.HALL_C + s.bonusCompute;
    const running = Math.min(energy, compute);
    const apc = (has(s, 'efficient') ? 1.5 : 1) * s.apcBonus;
    const agents = Math.floor(running * apc);
    let output = agents * s.direction;
    if (fx(s, 'autonomy')) output *= 1.4;
    const drift = Math.min(C.DRIFT_MAX, (C.DRIFT_BASE + C.DRIFT_PER_AGENT * agents) * (has(s, 'playbooks') ? 0.5 : 1));
    const per = output / 3;
    const count = (m) => s.wings.filter((w) => w === m).length;
    const revMult = C.REV_PER_OUTPUT * s.revBonus * (has(s, 'moat') ? 1.4 : 1) * (fx(s, 'pricewar') ? 0.75 : 1);
    const income = per * count('ventures') * revMult;
    const research = per * count('research') * C.RP_PER_OUTPUT;
    const launch = per * count('launch') * C.LAUNCH_PER_OUTPUT * (has(s, 'boosters') ? 1.4 : 1);
    let bottleneck = 'energy';
    if (s.direction < 0.6) bottleneck = 'direction';
    else if (energy < compute) bottleneck = 'energy';
    else if (compute < energy) bottleneck = 'compute';
    else bottleneck = 'balanced';
    return { energy, compute, running, agents, apc, output, drift, income, research, launch, bottleneck,
      darkRacks: Math.max(0, compute - energy), sparePower: Math.max(0, energy - compute),
      launchPct: Math.min(100, (s.launch / C.LAUNCH_GOAL) * 100), maxOrders: C.ORDERS + (has(s, 'delegation') ? 1 : 0) };
  }

  function costOf(s, type) {
    const pending = s.queue.filter((b) => b.type === type).length;
    return Math.round(C.COST[type] * Math.pow(C.GROWTH[type], s.built[type]));
  }
  function slotsUsed(s, type) { return s[type] + s.queue.filter((b) => b.type === type).length; }

  function canBuild(s, type) {
    if (s.phase !== 'orders') return { ok: false, why: 'Not now' };
    if (s.ordersLeft < 1) return { ok: false, why: 'No orders left this quarter' };
    if (slotsUsed(s, type) >= C.SLOTS[type]) return { ok: false, why: 'No sites left' };
    if (s.capital < costOf(s, type)) return { ok: false, why: 'Not enough capital' };
    return { ok: true };
  }

  function build(s, type) {
    if (!canBuild(s, type).ok) return false;
    s.capital -= costOf(s, type);
    s.built[type] += 1;
    const eta = type === 'reactor' && s.fastReactors ? 1 : C.BUILD_TIME[type];
    s.queue.push({ type, eta });
    s.ordersLeft -= 1;
    s.log.push({ q: s.q, text: 'Ordered: ' + BUILDINGS[type].name.toLowerCase() + (eta > 1 ? ', online in ' + eta + ' quarters.' : ', online next quarter.') });
    return true;
  }

  function canReview(s) {
    if (s.phase !== 'orders') return { ok: false, why: 'Not now' };
    if (s.ordersLeft < 1) return { ok: false, why: 'No orders left this quarter' };
    if (s.direction >= 0.995) return { ok: false, why: 'Direction is already at 100%' };
    return { ok: true };
  }
  function review(s) {
    if (!canReview(s).ok) return false;
    s.direction = 1; s.ordersLeft -= 1; s.stats.reviews += 1;
    s.log.push({ q: s.q, text: 'You reviewed the work and reset the brief. Direction back to 100%.' });
    return true;
  }

  function canAssign(s, i, mission) {
    if (s.phase !== 'orders') return { ok: false, why: 'Not now' };
    if (s.wings[i] === mission) return { ok: false, why: 'Already assigned' };
    if (s.ordersLeft < 1) return { ok: false, why: 'No orders left this quarter' };
    return { ok: true };
  }
  function assign(s, i, mission) {
    if (!MISSIONS[mission] || !canAssign(s, i, mission).ok) return false;
    s.wings[i] = mission; s.ordersLeft -= 1;
    s.log.push({ q: s.q, text: 'Wing ' + (i + 1) + ' redirected to ' + MISSIONS[mission].name.toLowerCase() + '.' });
    return true;
  }

  function canAdopt(s, id) {
    if (s.phase !== 'orders') return { ok: false, why: 'Not now' };
    if (has(s, id)) return { ok: false, why: 'Adopted' };
    if (s.rp < TECHS[id].cost) return { ok: false, why: 'Needs ' + TECHS[id].cost + ' research' };
    return { ok: true };
  }
  function adopt(s, id) {
    if (!TECHS[id] || !canAdopt(s, id).ok) return false;
    s.rp -= TECHS[id].cost; s.techs.push(id);
    if (id === 'delegation') s.ordersLeft += 1;
    s.log.push({ q: s.q, text: 'Adopted ' + TECHS[id].name.toLowerCase() + '. ' + TECHS[id].text });
    return true;
  }

  function endQuarter(s) {
    if (s.phase !== 'orders') return null;
    const d = derive(s);
    const rep = { q: s.q, agents: d.agents, direction: s.direction, income: d.income, research: d.research, launch: d.launch, completed: [], unusedOrders: s.ordersLeft };
    s.capital += d.income; s.rp += d.research; s.launch += d.launch;
    s.stats.earned += d.income; s.stats.peakAgents = Math.max(s.stats.peakAgents, d.agents);
    const parts = [d.agents + ' agents at ' + Math.round(s.direction * 100) + '% direction'];
    const made = [];
    if (d.income > 0) made.push('$' + fmt(d.income) + 'M');
    if (d.research > 0) made.push(fmt(d.research) + ' research');
    if (d.launch > 0) made.push(fmt((d.launch / C.LAUNCH_GOAL) * 100) + '% of the launch');
    s.log.push({ q: s.q, text: 'Quarter ' + s.q + ' closed: ' + parts[0] + (made.length ? ' produced ' + made.join(', ') + '.' : ' produced nothing.') });
    // drift
    s.direction = Math.max(C.DIR_FLOOR, s.direction - d.drift);
    // effects tick
    s.effects.forEach((e) => { e.turns -= 1; });
    s.effects = s.effects.filter((e) => e.turns > 0);
    // construction
    s.queue.forEach((b) => { b.eta -= 1; });
    s.queue.filter((b) => b.eta <= 0).forEach((b) => { s[b.type] += 1; rep.completed.push(b.type); });
    s.queue = s.queue.filter((b) => b.eta > 0);
    if (rep.completed.length) s.log.push({ q: s.q, text: 'Now online: ' + rep.completed.map((t) => BUILDINGS[t].name.toLowerCase()).join(', ') + '.' });
    s.lastReport = rep;
    if (s.launch >= C.LAUNCH_GOAL) { s.launch = C.LAUNCH_GOAL; s.phase = 'won'; s.log.push({ q: s.q, text: 'Ignition. The rocket clears the tower in quarter ' + s.q + '.' }); return rep; }
    if (s.q >= C.MAX_Q) { s.phase = 'lost'; s.log.push({ q: s.q, text: 'The launch window closes with the rocket still on the pad.' }); return rep; }
    // next quarter
    s.q += 1;
    const dn = derive(s);
    s.ordersLeft = Math.max(1, dn.maxOrders - s.orderPenalty); s.orderPenalty = 0;
    if (s.deck.length && rand(s) < C.EVENT_CHANCE) {
      const i = Math.floor(rand(s) * s.deck.length);
      s.event = s.deck.splice(i, 1)[0]; s.phase = 'event';
    }
    return rep;
  }

  function getEvent(s) { return s.event ? EVENTS.find((e) => e.id === s.event) : null; }
  function optionState(s, opt) {
    if (opt.cost && s.capital < opt.cost) return { ok: false, why: 'Not enough capital' };
    if (opt.need && !opt.need(s)) return { ok: false, why: 'Requirement not met' };
    return { ok: true };
  }
  function resolveEvent(s, idx) {
    const ev = getEvent(s); if (!ev || s.phase !== 'event') return null;
    const opt = ev.options[idx]; if (!opt || !optionState(s, opt).ok) return null;
    const outcome = opt.apply(s);
    s.log.push({ q: s.q, text: ev.title + ': ' + outcome });
    s.event = null; s.phase = 'orders';
    return outcome;
  }

  function rating(s) {
    if (s.phase !== 'won') return { title: 'Grounded', line: 'The window closed. The valley is still yours to rebuild.' };
    if (s.q <= 12) return { title: 'Sovereign', line: 'One person, one swarm, years ahead of schedule.' };
    if (s.q <= 14) return { title: 'Director', line: 'You kept the swarm pointed at the right thing.' };
    return { title: 'Operator', line: 'It flew. Tighter direction would have flown sooner.' };
  }

  function advice(s) {
    const d = derive(s);
    if (s.phase !== 'orders') return '';
    if (s.direction < 0.6) return 'The swarm is drifting. At ' + Math.round(s.direction * 100) + '% direction, much of its work is noise. Review it.';
    const left = C.MAX_Q - s.q + 1;
    const need = C.LAUNCH_GOAL - s.launch;
    if (d.launch === 0 && left <= 9) return left + ' quarters remain and no wing is working on the launch. Redirect one.';
    if (d.darkRacks > 0) return 'Energy is your bottleneck: ' + d.darkRacks + ' racks sit dark. Build power before more compute.';
    if (d.sparePower > 0 && slotsUsed(s, 'hall') < C.SLOTS.hall) return 'Compute is your bottleneck: ' + d.sparePower + ' units of power have nothing to run. Build a data hall.';
    if (d.launch > 0 && need / d.launch > left) return 'At this pace the launch misses the window. Add wings, agents, or direction.';
    if (d.sparePower > 0 && !has(s, 'efficient')) return 'Every hall site is taken and ' + d.sparePower + ' units of power sit idle. Efficient models would run more agents per rack.';
    if (d.sparePower > 0) return 'Every hall site is built, so compute is capped. From here the only lever left is direction.';
    return 'Energy and compute are in balance. What you point the swarm at is the question now.';
  }

  const api = { C, BUILDINGS, MISSIONS, TECHS, EVENTS, newGame, derive, costOf, slotsUsed, canBuild, build, canReview, review,
    canAssign, assign, canAdopt, adopt, endQuarter, getEvent, optionState, resolveEvent, rating, advice, fmt };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AgencyEra = api;
})(typeof window !== 'undefined' ? window : globalThis);
