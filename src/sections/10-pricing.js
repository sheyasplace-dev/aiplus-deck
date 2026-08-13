/* ============================================================================
   11 PRICING — STATIC BY DESIGN.
   Readers are comparing tiers side by side and screenshotting to forward
   internally. Motion fights both. One opacity fade on the whole block on
   entry, and nothing else: no stagger, no y, no per-card animation, no hover
   that moves anything.
   ============================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricing } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import './10-pricing.css';

function tierCard(tier) {
  return `
    <article class="tier${tier.featured ? ' tier--featured' : ''}">
      <div class="tier__top">
        <span class="data">${tier.name}</span>
        ${tier.badge ? `<span class="tier__badge data">${tier.badge}</span>` : ''}
      </div>

      <p class="tier__price display t-d2">${tier.price}</p>
      <p class="tier__unit data mute">${tier.unit}</p>

      <p class="tier__summary">${tier.summary}</p>

      <ul class="tier__list">
        ${tier.includes.map((item) => `<li class="tier__item">${item}</li>`).join('')}
      </ul>

      <a class="btn ${tier.featured ? 'btn--primary' : 'btn--ghost'} tier__cta"
         href="${tier.cta.href}">${tier.cta.label}</a>
    </article>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section pricing';
  el.id = 'pricing';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: pricing.label, index: 10, heading: pricing.heading })}

      ${pricing.detail ? `<p class="pricing__detail lead mute">${pricing.detail}</p>` : ''}

      <div class="pricing__grid">
        ${pricing.tiers.map(tierCard).join('')}
      </div>

      <p class="pricing__footnote caption">${pricing.footnote}</p>
    </div>
  `;

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  if (staticMode) return el;

  // The single permitted animation on this section.
  gsap.fromTo(
    el.querySelector('.wrap'),
    { opacity: 0 },
    {
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        once: true,
      },
    },
  );

  return el;
}
