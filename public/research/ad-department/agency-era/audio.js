/* Agency Era — synthesized score and sound effects (Web Audio, no files). */
(function () {
  'use strict';
  let ctx = null, master = null, musicBus = null, sfxBus = null, timer = null, on = true, step = 0, nextTime = 0;
  const CHORDS = [[146.83, 220.0, 261.63, 329.63], [116.54, 174.61, 220.0, 293.66], [174.61, 220.0, 261.63, 349.23], [130.81, 196.0, 246.94, 293.66]];
  const BAR = 7.2;

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = on ? 1 : 0; master.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = 0.5; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
    nextTime = ctx.currentTime + 0.1;
    timer = setInterval(schedule, 400);
    schedule();
  }

  function pad(freq, when, dur) {
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 620; f.Q.value = 0.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.05, when + dur * 0.35);
    g.gain.linearRampToValueAtTime(0.0001, when + dur + 1.2);
    [-5, 5].forEach((det) => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = freq; o.detune.value = det; o.connect(f); o.start(when); o.stop(when + dur + 1.3); });
    f.connect(g).connect(musicBus);
  }
  function pluck(freq, when, vol) {
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(vol, when + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, when + 2.2);
    o.connect(g).connect(musicBus); o.start(when); o.stop(when + 2.3);
  }
  function schedule() {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 1.2) {
      const ch = CHORDS[step % CHORDS.length];
      ch.forEach((f) => pad(f / 2, nextTime, BAR));
      for (let i = 0; i < 6; i++) {
        if (Math.random() < 0.72) pluck(ch[Math.floor(Math.random() * ch.length)] * (Math.random() < 0.3 ? 4 : 2), nextTime + i * (BAR / 6) + Math.random() * 0.08, 0.035);
      }
      nextTime += BAR; step++;
    }
  }

  function tone(freq, dur, type, vol, delay, slideTo) {
    if (!ctx) return;
    const when = ctx.currentTime + (delay || 0);
    const o = ctx.createOscillator(); o.type = type || 'triangle'; o.frequency.setValueAtTime(freq, when);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, when + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(vol || 0.2, when + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g).connect(sfxBus); o.start(when); o.stop(when + dur + 0.05);
  }
  function noise(dur, vol, freq) {
    if (!ctx) return;
    const n = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = ctx.createBufferSource(); s.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq || 900; f.Q.value = 0.7;
    const g = ctx.createGain(); g.gain.value = vol || 0.2;
    s.connect(f).connect(g).connect(sfxBus); s.start();
  }

  const sfx = {
    click: () => tone(520, 0.07, 'triangle', 0.12),
    deny: () => { tone(150, 0.14, 'square', 0.07); },
    build: () => { tone(98, 0.22, 'sine', 0.35); tone(131, 0.25, 'sine', 0.28, 0.11); noise(0.18, 0.12, 400); },
    review: () => { tone(440, 0.18, 'triangle', 0.16); tone(660, 0.3, 'triangle', 0.16, 0.12); },
    assign: () => { noise(0.35, 0.16, 1400); tone(330, 0.2, 'sine', 0.1, 0, 520); },
    adopt: () => { [392, 494, 587, 784].forEach((f, i) => tone(f, 0.28, 'triangle', 0.13, i * 0.07)); },
    quarter: () => { tone(196, 1.3, 'sine', 0.26); tone(293.66, 1.1, 'sine', 0.12, 0.02); },
    event: () => { tone(587, 0.16, 'triangle', 0.15); tone(440, 0.3, 'triangle', 0.15, 0.16); },
    win: () => { [262, 330, 392, 523, 659, 784].forEach((f, i) => tone(f, 0.7, 'triangle', 0.16, i * 0.14)); },
    lose: () => { [330, 294, 247, 196].forEach((f, i) => tone(f, 0.8, 'sine', 0.18, i * 0.28)); },
    rumble: () => { noise(3.2, 0.5, 140); tone(60, 3, 'sawtooth', 0.12, 0, 110); },
  };

  window.AgencyAudio = {
    init,
    play: (name) => { if (ctx && on && sfx[name]) { try { sfx[name](); } catch (e) { /* audio is optional */ } } },
    setOn: (v) => { on = v; if (master && ctx) master.gain.setTargetAtTime(v ? 1 : 0, ctx.currentTime, 0.05); },
    get on() { return on; },
    get started() { return !!ctx; },
  };
})();
