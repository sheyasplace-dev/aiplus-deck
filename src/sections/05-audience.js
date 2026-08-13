/* ============================================================================
   05 WHO'S IN THE ROOM — the section the cheque turns on.
   Three breakdowns share one canvas dot field: 2,000 dots, one per attendee,
   morphing between an unsorted cloud, a single ring, and clusters resolved by
   segment. Engine in lib/particles.js; this file is layout and controls.
   ============================================================================ */

import { gsap } from 'gsap';
import { audience } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { countUp, setValue } from '../lib/countup.js';
import { revealMasked, revealUp } from '../lib/reveal.js';
import { sectionHead } from '../lib/section.js';
import { ParticleField, autoCycle } from '../lib/particles.js';
import './05-audience.css';

const V = audience.viz;
const T = audience.themes;

// The cloud reads on two channels, both derived from the counts rather than
// authored per item: size ramps linearly across the range, and the louder half
// takes --ink while the quieter half drops to --ink-mute. No third grey.
const COUNTS = T.items.map((t) => t.count);
const [MIN, MAX] = [Math.min(...COUNTS), Math.max(...COUNTS)];
const MEDIAN = [...COUNTS].sort((a, b) => a - b)[COUNTS.length >> 1];

function theme(t) {
  const scale = MAX === MIN ? 1 : (t.count - MIN) / (MAX - MIN);
  return `
    <li class="thm__item${t.count >= MEDIAN ? ' is-loud' : ''}"
        style="--t:${scale.toFixed(3)}" data-count="${t.count}">
      <span class="thm__inner"><span class="thm__name display">${t.label}</span
        ><span class="thm__count data">${t.count}</span></span>
    </li>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section audience';
  el.id = 'audience';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: audience.label, index: 5, heading: audience.heading })}
      <p class="aud__source caption">${audience.source}</p>

      <div class="aud__viz">
        <div class="aud__panel">
          <div class="aud__tabs" role="tablist">
            ${audience.breakdowns
              .map((b, i) => `<button class="aud__tab data" role="tab" data-i="${i}">${b.title}</button>`)
              .join('')}
          </div>
          <p class="aud__note caption"></p>
          <ul class="aud__legend"></ul>
        </div>

        <div class="aud__stage">
          <div class="aud__frame">
            <canvas class="aud__canvas"></canvas>
          </div>
        </div>
      </div>

      <div class="aud__themes">
        <p class="thm__label data mute">${T.label}</p>
        <ul class="thm__cloud">${T.items.map(theme).join('')}</ul>
        <p class="thm__footnote data mute">${T.footnote}</p>
      </div>
    </div>
  `;
  return el;
}

/** Rebuild the legend for one breakdown and hand it to the field. */
function showBreakdown(el, field, index, staticMode) {
  const b = audience.breakdowns[index];
  el.querySelector('.aud__note').textContent = b.note || '';
  el.querySelectorAll('.aud__tab').forEach((t) =>
    t.classList.toggle('is-on', +t.dataset.i === index));

  const list = el.querySelector('.aud__legend');
  list.innerHTML = b.segments
    .map((s, i) => `<li class="aud__row" style="--a:${field.alphaFor(i, b.segments.length)}">
        <span class="aud__swatch"></span>
        <span class="aud__row-label data">${s.label}</span>
        <span class="aud__row-pct data"></span></li>`)
    .join('');

  field.setData(b.segments, b.layout);

  [...list.children].forEach((row, i) => {
    const pct = row.querySelector('.aud__row-pct');
    if (staticMode) setValue(pct, b.segments[i].pct, '%');
    else countUp(pct, {
      value: b.segments[i].pct, suffix: '%', trigger: row, delay: i * MOTION.stagger,
    });
    row.addEventListener('mouseenter', () => field.setActive(i));
    row.addEventListener('mouseleave', () => field.setActive(null));
  });
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const field = new ParticleField(el.querySelector('.aud__canvas'), { dots: V.dots });
  const show = (i) => showBreakdown(el, field, i, staticMode);

  // Canvas must be laid out before the field can measure it.
  requestAnimationFrame(() => {
    show(0);
    if (!staticMode) field.start();
  });

  if (staticMode) {
    el.classList.add('audience--static');
    return el;
  }

  // Runs continuously from the moment the section mounts. Clicking a title
  // jumps the sequence and resets the rest interval — it never stops it.
  const cycle = autoCycle(field, audience.breakdowns.length, {
    hold: V.hold,
    onChange: show,
  });
  el.querySelectorAll('.aud__tab').forEach((tab) =>
    tab.addEventListener('click', () => cycle.goTo(+tab.dataset.i)));

  // Only run the loop while the field is on screen.
  new IntersectionObserver(([e]) => (e.isIntersecting ? field.start() : field.stop()),
    { rootMargin: '200px' }).observe(el.querySelector('.aud__frame'));

  revealThemes(el);
  return el;
}

/* --- Themes entrance -------------------------------------------------------
   The cloud arrives in count order — loudest first, down to the quiet ones —
   so the hierarchy is stated by the sequence before a single size has been
   read. Label leads, footnote lands last.                                   */
function revealThemes(el) {
  const items = [...el.querySelectorAll('.thm__item')]
    .sort((a, b) => b.dataset.count - a.dataset.count);
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el.querySelector('.aud__themes'), start: 'top 78%', once: true },
  });

  revealUp(tl, el.querySelector('.thm__label'), 0);
  revealMasked(tl, items, items.map((i) => i.querySelector('.thm__inner')), 0.15);
  revealUp(tl, el.querySelector('.thm__footnote'), '-=0.7');
}
