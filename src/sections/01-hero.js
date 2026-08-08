/* ============================================================================
   01 HERO — type only on white. No image, so the full-bleed photo in 02 lands
   as a contrast. This section defines the type scale and the reveal behaviour
   every other section inherits.
   ============================================================================ */

import { gsap } from 'gsap';
import { brand, hero } from '../data/content.js';
import { MOTION, fontsReady } from '../lib/motion.js';
import { maskLines, setLinesHidden, revealLines, revealUp } from '../lib/reveal.js';
import './01-hero.css';

function render() {
  const el = document.createElement('section');
  el.className = 'hero';
  el.id = 'hero';

  el.innerHTML = `
    <header class="hero__bar">
      <span class="hero__brand data">${brand.name}</span>
      <a class="btn btn--primary hero__bar-cta" href="${hero.ctaPrimary.href}">
        ${hero.ctaPrimary.label}
      </a>
    </header>

    <div class="hero__body">
      <p class="hero__label data mute"></p>
      <h1 class="hero__headline display t-hero"></h1>
      <p class="hero__lead body mute">${hero.body}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${hero.ctaPrimary.href}">${hero.ctaPrimary.label}</a>
        <a class="link" href="${hero.ctaSecondary.href}">${hero.ctaSecondary.label} <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>

    <dl class="hero__strip">
      ${hero.strip
        .map(
          (item) => `
        <div class="hero__stat">
          <dt class="data mute">${item.label}</dt>
          <dd class="hero__stat-value data">${item.value}</dd>
        </div>`,
        )
        .join('')}
    </dl>
  `;

  // Label text is set here rather than in the template so the masked-line
  // helper owns every animated string in one place.
  el.querySelector('.hero__label').textContent = hero.label;
  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const headline = el.querySelector('.hero__headline');
  const lines = maskLines(headline, hero.headline);

  const label = el.querySelector('.hero__label');
  const lead = el.querySelector('.hero__lead');
  const ctas = [...el.querySelector('.hero__ctas').children];
  const stats = [...el.querySelectorAll('.hero__stat')];
  const bar = [...el.querySelector('.hero__bar').children];

  if (staticMode) return el;

  // Hide before first paint so nothing flashes in place.
  gsap.set([label, lead, ...ctas, ...stats, ...bar], { opacity: 0 });
  setLinesHidden(lines);

  // The hero fires on load, not on scroll — it is already in view.
  fontsReady().then(() => {
    const tl = gsap.timeline({ defaults: { ease: MOTION.ease } });

    revealUp(tl, bar, 0);
    revealUp(tl, label, 0.1);
    revealLines(tl, lines, 0.2);
    revealUp(tl, lead);
    revealUp(tl, ctas);
    revealUp(tl, stats);
  });

  return el;
}
