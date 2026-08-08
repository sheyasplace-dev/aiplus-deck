/* ============================================================================
   08 WHO'S IN THE ROOM — the section the cheque turns on.
   Three breakdowns share one canvas dot field: 2,000 dots, one per attendee,
   morphing between an unsorted cloud, a single ring, and clusters resolved by
   segment. Engine in lib/particles.js; this file is layout and controls.
   ============================================================================ */

import { gsap } from 'gsap';
import { audience, companies } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { countUp, setValue } from '../lib/countup.js';
import { sectionHead } from '../lib/section.js';
import { ParticleField, autoCycle } from '../lib/particles.js';
import './08-audience.css';

const V = audience.viz;

function render() {
  const el = document.createElement('section');
  el.className = 'section audience';
  el.id = 'audience';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: audience.label, index: 8, heading: audience.heading })}
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

      <div class="aud__logos">
        <p class="aud__logos-label data mute">${audience.logosLabel}</p>
        <ul class="aud__logo-list">${companies
          .map((c) => `<li class="aud__logo data">${c}</li>`).join('')}</ul>
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

  gsap.fromTo(el.querySelectorAll('.aud__logo'),
    { y: MOTION.y, opacity: 0 },
    {
      y: 0, opacity: 1, duration: MOTION.dur, ease: MOTION.ease, stagger: 0.02,
      scrollTrigger: { trigger: el.querySelector('.aud__logos'), start: 'top 82%', once: true },
    });

  return el;
}
