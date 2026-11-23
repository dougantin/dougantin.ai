/* Agency Era — painted valley scene: structures, steam, drone swarm, rocket. */
(function () {
  'use strict';
  const W = 1600, H = 900;
  const HAND = { x: 522, y: 256 };

  // [x, baseY, width] in 0..1 / px of the 1600-wide scene. Order = build order.
  const SLOTS = {
    solar: [[0.69, 0.785, 196], [0.815, 0.79, 196], [0.935, 0.795, 196], [0.362, 0.59, 132], [0.375, 0.462, 106], [0.805, 0.458, 106]],
    hall: [[0.625, 0.668, 196], [0.75, 0.672, 196], [0.50, 0.664, 196], [0.875, 0.676, 196], [0.565, 0.562, 164], [0.675, 0.564, 164], [0.455, 0.56, 164], [0.785, 0.566, 164]],
    reactor: [[0.585, 0.458, 150], [0.475, 0.456, 150], [0.695, 0.46, 150]],
  };
  const PAD = [0.912, 0.575, 224];
  const ORBITS = {
    ventures: { cx: 1010, cy: 215, rx: 500, ry: 62 },
    research: { cx: 1040, cy: 540, rx: 380, ry: 78 },
    launch: { cx: 1432, cy: 385, rx: 135, ry: 150 },
  };

  const names = ['valley', 'hall', 'solar', 'reactor', 'gantry', 'rocket'];
  const img = {}, dark = {};
  let ready = false;

  function load() {
    return Promise.all(names.map((n) => new Promise((res) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => { img[n] = im; res(); };
      im.onerror = () => res();
      im.src = './assets/' + n + '.webp';
    }))).then(() => {
      ['hall', 'solar', 'reactor'].forEach((n) => { if (img[n]) dark[n] = tint(img[n]); });
      ready = true;
    });
  }

  function tint(im) {
    const c = document.createElement('canvas');
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d');
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = 'source-atop';
    x.fillStyle = 'rgba(10,16,38,0.68)';
    x.fillRect(0, 0, c.width, c.height);
    return c;
  }

  const glow = (function () {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(255,236,170,1)'); g.addColorStop(0.25, 'rgba(255,190,80,0.75)'); g.addColorStop(1, 'rgba(255,150,40,0)');
    x.fillStyle = g; x.fillRect(0, 0, 32, 32);
    return c;
  })();

  const cloud = (function () {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,242,224,0.95)'); g.addColorStop(0.45, 'rgba(255,236,214,0.5)'); g.addColorStop(1, 'rgba(255,230,205,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return c;
  })();

  const view = { solar: 1, hall: 1, reactor: 0, queue: [], agents: 6, direction: 1, wings: ['ventures', 'ventures', 'ventures'], launchPct: 0, poweredHalls: 1, phase: 'orders' };
  const drones = [], puffs = [], smoke = [];
  let t = 0, liftoff = -1, reduced = false;

  function setView(v) { Object.assign(view, v); }
  function startLiftoff() { liftoff = 0; }
  function reset() { drones.length = 0; puffs.length = 0; smoke.length = 0; liftoff = -1; }

  function droneTarget() { return Math.max(6, Math.min(170, Math.round(6 + view.agents * 1.4))); }

  function update(dt) {
    t += dt;
    // swarm size
    const want = droneTarget();
    while (drones.length < want) {
      const i = drones.length;
      drones.push({ w: i % 3, a: Math.random() * Math.PI * 2, sp: (0.18 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : 1), jr: 0.45 + Math.random() * 0.95, ph: Math.random() * 10, x: HAND.x, y: HAND.y });
    }
    if (drones.length > want) drones.length = want;
    const chaos = Math.max(0, 1 - view.direction);
    for (let i = 0; i < drones.length; i++) {
      const d = drones[i];
      const o = ORBITS[view.wings[d.w]] || ORBITS.ventures;
      d.a += d.sp * dt;
      let tx = o.cx + Math.cos(d.a) * o.rx * d.jr;
      let ty = o.cy + Math.sin(d.a) * o.ry * d.jr + Math.sin(t * 1.3 + d.ph) * 5;
      if (chaos > 0.02) {
        tx += Math.sin(t * 0.9 + d.ph * 3.1) * 190 * chaos + Math.sin(t * 2.3 + d.ph) * 40 * chaos;
        ty += Math.cos(t * 1.1 + d.ph * 2.3) * 120 * chaos;
      }
      if (liftoff >= 0) { const sp = 1 + liftoff * 0.55; tx = o.cx + (tx - o.cx) * sp; ty = o.cy + (ty - o.cy) * sp - liftoff * 14; }
      const k = Math.min(1, dt * 1.6);
      d.x += (tx - d.x) * k; d.y += (ty - d.y) * k;
    }
    // steam
    if (!reduced) {
      for (let r = 0; r < view.reactor; r++) {
        if (Math.random() < dt * 4) {
          const s = SLOTS.reactor[r]; const w = s[2], h = w * 0.85;
          const left = Math.random() < 0.5;
          puffs.push({ x: s[0] * W - w / 2 + w * (left ? 0.24 : 0.6), y: s[1] * H - h + h * (left ? 0.1 : 0.03), r: 9, life: 0, max: 4.5 + Math.random() * 2, vx: 5 + Math.random() * 5 });
        }
      }
    }
    for (let i = puffs.length - 1; i >= 0; i--) { const p = puffs[i]; p.life += dt; p.y -= 12 * dt; p.x += p.vx * dt; p.r += 4.5 * dt; if (p.life > p.max) puffs.splice(i, 1); }
    // liftoff
    if (liftoff >= 0) {
      liftoff += dt;
      if (Math.random() < dt * 40) smoke.push({ x: PAD[0] * W - PAD[2] * 0.14 + (Math.random() - 0.5) * 30, y: PAD[1] * H - 40, r: 12, life: 0, max: 3.5, vx: (Math.random() - 0.5) * 70 });
    }
    for (let i = smoke.length - 1; i >= 0; i--) { const p = smoke[i]; p.life += dt; p.x += p.vx * dt; p.y -= 6 * dt; p.r += 26 * dt; if (p.life > p.max) smoke.splice(i, 1); }
  }

  function sprite(ctx, im, slot, alpha) {
    if (!im) return;
    const w = slot[2], iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, h = w * ih / iw;
    const x = slot[0] * W - w / 2, y = slot[1] * H - h;
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = '#1a0c05';
    ctx.beginPath(); ctx.ellipse(slot[0] * W + w * 0.04, slot[1] * H - h * 0.08, w * 0.52, w * 0.13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.drawImage(im, x, y, w, h);
    ctx.restore();
    return { x, y, w, h };
  }

  function render(ctx) {
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    if (liftoff >= 0 && liftoff < 2.2 && !reduced) ctx.translate(Math.sin(liftoff * 70) * 2.2, Math.cos(liftoff * 83) * 1.8);
    if (img.valley) ctx.drawImage(img.valley, 0, 0, W, H); else { ctx.fillStyle = '#152033'; ctx.fillRect(0, 0, W, H); }
    if (!ready) { ctx.restore(); return; }

    // collect structures, far to near
    const items = [];
    ['solar', 'hall', 'reactor'].forEach((type) => {
      const done = view[type];
      for (let i = 0; i < done; i++) items.push({ type, slot: SLOTS[type][i], state: type === 'hall' && i >= view.poweredHalls ? 'dark' : 'on' });
      const pend = view.queue.filter((b) => b.type === type).length;
      for (let i = 0; i < pend && done + i < SLOTS[type].length; i++) items.push({ type, slot: SLOTS[type][done + i], state: 'build' });
    });
    items.push({ type: 'pad', slot: PAD, state: 'on' });
    items.sort((a, b) => a.slot[1] - b.slot[1]);

    items.forEach((it) => {
      if (it.type === 'pad') { drawPad(ctx); return; }
      if (it.state === 'build') {
        const r = sprite(ctx, dark[it.type], it.slot, 0.55);
        if (r) {
          const blink = reduced ? 1 : 0.55 + 0.45 * Math.sin(t * 4 + it.slot[0] * 20);
          ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = blink;
          ctx.drawImage(glow, r.x + r.w / 2 - 13, r.y - 6, 26, 26);
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        }
      } else sprite(ctx, it.state === 'dark' ? dark[it.type] : img[it.type], it.slot, 1);
    });

    // steam
    ctx.save();
    puffs.forEach((p) => { ctx.globalAlpha = Math.sin(Math.min(1, p.life / p.max) * Math.PI) * 0.34; ctx.drawImage(cloud, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); });
    ctx.restore();

    // drones
    ctx.save();
    const dense = drones.length > 90 ? 0.72 : 0.92;
    for (let i = 0; i < drones.length; i++) {
      const d = drones[i]; const s = 1.0 + (d.y / H) * 1.3;
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.85; ctx.fillStyle = '#17110d';
      ctx.fillRect(d.x - 3.2 * s, d.y - 0.9 * s, 6.4 * s, 1.8 * s);
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = dense;
      const g = 10.5 * s; ctx.drawImage(glow, d.x - g / 2, d.y - g / 2, g, g);
    }
    ctx.restore();
    ctx.restore();
  }

  function drawPad(ctx) {
    const g = sprite(ctx, img.gantry, PAD, 1);
    if (!g || !img.rocket) return;
    const rh = g.h * 0.7, rw = rh * img.rocket.naturalWidth / img.rocket.naturalHeight;
    const rx = g.x + g.w * 0.36 - rw / 2, baseY = g.y + g.h * 0.83;
    let lift = 0;
    if (liftoff >= 0) lift = Math.pow(liftoff, 2.2) * 34;
    const pct = liftoff >= 0 ? 1 : Math.max(0, Math.min(1, view.launchPct / 100));
    // smoke behind rocket
    ctx.save();
    smoke.forEach((p) => { ctx.globalAlpha = (1 - p.life / p.max) * 0.7; ctx.drawImage(cloud, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); });
    ctx.restore();
    if (pct > 0) {
      const vis = rh * (0.12 + 0.88 * pct);
      ctx.save();
      ctx.beginPath(); ctx.rect(rx - 4, baseY - vis - lift, rw + 8, vis + 2); ctx.clip();
      ctx.drawImage(img.rocket, rx, baseY - rh - lift, rw, rh);
      ctx.restore();
    }
    if (liftoff >= 0) {
      const fx = rx + rw / 2, fy = baseY - lift - rh * 0.05, fl = 60 + Math.sin(t * 50) * 10 + Math.min(120, liftoff * 60);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const grd = ctx.createLinearGradient(fx, fy, fx, fy + fl);
      grd.addColorStop(0, 'rgba(255,250,220,0.95)'); grd.addColorStop(0.3, 'rgba(255,190,70,0.8)'); grd.addColorStop(1, 'rgba(255,90,20,0)');
      ctx.fillStyle = grd; ctx.beginPath(); ctx.moveTo(fx - 9, fy); ctx.lineTo(fx + 9, fy); ctx.lineTo(fx, fy + fl); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 0.9; ctx.drawImage(glow, fx - 60, fy - 50, 120, 120);
      ctx.restore();
    }
  }

  window.AgencyScene = { W, H, load, update, render, setView, startLiftoff, reset, setReduced: (v) => { reduced = v; }, get liftoff() { return liftoff; }, get drones() { return drones.length; } };
})();
