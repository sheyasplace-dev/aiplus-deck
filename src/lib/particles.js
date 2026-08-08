/* ============================================================================
   PARTICLE FIELD — canvas dot cloud that morphs between three arrangements.

   Ported from the Claude Design canvas "By Role — Particle Convergence".
   Same algorithm: proportional particle allocation, three layouts, cubic
   in-out transitions with a per-dot stagger, sine idle drift, hover dimming.

   Two deliberate departures from the source:
   · Colour. The original ramps six literal blues (#1B44F5 … #ccd5fd). The
     palette here allows exactly seven values, so the ramp is one --blue at
     descending alpha instead. On white this is visually near-identical and
     costs no new tokens.
   · Lifecycle. The loop only runs while the canvas is on screen, so a page
     with eleven other sections is not paying for a RAF it cannot see.
   ============================================================================ */

const PHASE_DUR = { cloud: 1400, ring: 1600, clusters: 1800 };
const STAGGER = 420;
const DRIFT = 2.5;

/** cubic in-out, matching the source's inline easing */
const ease = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function blueRGB() {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue('--blue')
    .trim()
    .replace('#', '');
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Advances through `count` steps forever, moving on once each transition has
 * settled and then rested for `hold`. Returns a handle so a click can jump
 * the sequence without stopping it.
 */
export function autoCycle(field, count, { hold = 2600, onChange }) {
  let i = 0;
  let until = performance.now() + hold;

  const go = (next, now = performance.now()) => {
    i = ((next % count) + count) % count;
    until = now + hold;
    onChange(i);
  };

  field.onSettled = (now) => {
    if (now < until) return;
    go(i + 1, now);
  };

  return { goTo: go, get index() { return i; } };
}

export class ParticleField {
  constructor(canvas, { dots = 2000, dotSize = 1.7 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dots = dots;
    this.dotSize = dotSize;
    this.phase = 'clusters';
    this.active = null;
    this.transStart = -9999;
    this.rgb = blueRGB();
    this.running = false;
    this.loop = this.loop.bind(this);
    this.onResize = () => this.measure(true);
    window.addEventListener('resize', this.onResize);
  }

  /** Alpha ramp standing in for the source's six-step blue scale. */
  alphaFor(i, n) {
    return n <= 1 ? 0.92 : 0.92 - (i / (n - 1)) * 0.66;
  }

  /**
   * Swap in a new breakdown and its bound arrangement in one move.
   *
   * Dot count is constant (one per attendee) across every breakdown, so the
   * same physical dots are re-labelled rather than rebuilt. Each keeps its
   * current position as the transition's start point, which is what makes one
   * breakdown appear to reorganise into the next instead of cutting to it.
   */
  setData(segments, phase) {
    const prev = this.parts;
    this.segments = segments;
    if (phase) this.phase = phase;

    this.parts = [];
    segments.forEach((seg, ri) => {
      const n = Math.round((this.dots * seg.pct) / 100);
      for (let k = 0; k < n; k++) {
        const carry = prev && prev[this.parts.length];
        this.parts.push({
          role: ri,
          k,
          n,
          // Carrying seed and angle keeps each dot's stagger and drift phase
          // continuous across a swap; a reroll makes the field twitch.
          seed: carry ? carry.seed : Math.random(),
          a: carry ? carry.a : Math.random() * Math.PI * 2,
          rr: carry ? carry.rr : Math.sqrt(Math.random()),
          x: 0, y: 0, fx: 0, fy: 0,
        });
      }
    });

    this.measure();
    const L = this.layouts[this.phase];
    this.parts.forEach((p, i) => {
      const carry = prev && prev[i];
      const from = carry ? [carry.x, carry.y] : L[i];
      p.x = p.fx = from[0];
      p.y = p.fy = from[1];
    });

    this.transStart = performance.now();
    this.draw(performance.now());
  }

  measure(keep) {
    const c = this.canvas;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = c.clientWidth;
    this.h = c.clientHeight;
    c.width = this.w * dpr;
    c.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.R = Math.min(this.w, this.h) * 0.44;
    if (!this.parts) return;
    this.layouts = {
      cloud: this.layoutCloud(),
      ring: this.layoutRing(),
      clusters: this.layoutClusters(),
    };
    if (keep) {
      this.parts.forEach((p) => { p.fx = p.x; p.fy = p.y; });
      this.transStart = -9999;
    }
  }

  cx() { return this.w / 2; }
  cy() { return this.h / 2; }

  /** Unsorted: an elliptical scatter, no structure to read. */
  layoutCloud() {
    const R = this.R * 1.24;
    return this.parts.map((p) => [
      this.cx() + Math.cos(p.a) * p.rr * R * 1.22,
      this.cy() + Math.sin(p.a) * p.rr * R * 0.92,
    ]);
  }

  /** One room: a single ring, arc length proportional to share. */
  layoutRing() {
    let acc = 0;
    const starts = this.segments.map((s) => {
      const v = acc;
      acc += s.pct;
      return v / 100;
    });
    return this.parts.map((p) => {
      const seg = this.segments[p.role];
      const gap = 0.006;
      const frac = (p.k + 0.5) / p.n;
      const a =
        (starts[p.role] + gap + frac * (seg.pct / 100 - gap * 2)) * Math.PI * 2 -
        Math.PI / 2;
      const band = this.R * (0.8 + 0.2 * ((p.seed * 7919) % 1));
      return [this.cx() + Math.cos(a) * band, this.cy() + Math.sin(a) * band];
    });
  }

  /** Resolved: one disc per segment, area proportional to share. */
  layoutClusters() {
    const orbit = this.R * 0.66;
    const n = this.segments.length;
    const centers = this.segments.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return [this.cx() + Math.cos(a) * orbit, this.cy() + Math.sin(a) * orbit];
    });
    const rad = this.segments.map((s) => Math.sqrt(s.pct / 100) * this.R * 0.5);
    return this.parts.map((p) => {
      const c = centers[p.role];
      const rr = p.rr * rad[p.role];
      return [c[0] + Math.cos(p.a) * rr, c[1] + Math.sin(p.a) * rr];
    });
  }

  setActive(i) { this.active = i; }

  draw(now, drift = true) {
    const L = this.layouts && this.layouts[this.phase];
    if (!L) return;
    const ctx = this.ctx;
    const dur = PHASE_DUR[this.phase];
    const total = this.segments.length;
    ctx.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.parts.length; i++) {
      const p = this.parts[i];
      const tgt = L[i];
      const raw = (now - this.transStart - p.seed * STAGGER) / dur;
      const t = raw <= 0 ? 0 : raw >= 1 ? 1 : ease(raw);
      let x = p.fx + (tgt[0] - p.fx) * t;
      let y = p.fy + (tgt[1] - p.fy) * t;

      if (drift) {
        const ph = p.seed * 6.283;
        x += Math.sin(now / 1400 + ph) * DRIFT;
        y += Math.cos(now / 1600 + ph * 1.7) * DRIFT;
      }
      p.x = x;
      p.y = y;

      const dim = this.active !== null && this.active !== p.role;
      const alpha = dim ? 0.08 : this.alphaFor(p.role, total);
      ctx.fillStyle = `rgba(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, this.dotSize, 0, 6.283);
      ctx.fill();
    }
  }

  loop(now) {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    this.draw(now);
    if (this.onSettled && now - this.transStart > PHASE_DUR[this.phase] + 500) {
      this.onSettled(now);
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
  }
}
