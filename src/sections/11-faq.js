/* ============================================================================
   11 FAQ — quiet accordion on hairline dividers.
   Multiple panels may be open at once. Single-open accordions collapse the
   thing you just read the moment you open the next one, which is exactly
   wrong for a reader scanning objections before a call.
   ============================================================================ */

import { gsap } from 'gsap';
import { faq } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import './11-faq.css';

// Disclosure is a UI response, not an entrance. At the page's 1.1s it feels
// broken; this is the one place the global duration is deliberately not used.
const TOGGLE_DUR = 0.42;

function item(f, i) {
  return `
    <div class="faq__item">
      <h3>
        <button class="faq__q" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
          <span class="faq__q-text display t-d3">${f.q}</span>
          <span class="faq__mark" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
        <p class="faq__a-inner body">${f.a}</p>
      </div>
    </div>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section section--surface faq';
  el.id = 'faq';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: faq.label, index: 11 })}
      <div class="faq__list">${faq.items.map(item).join('')}</div>
    </div>
  `;

  return el;
}

function wireToggles(el, staticMode) {
  el.querySelectorAll('.faq__item').forEach((row) => {
    const button = row.querySelector('.faq__q');
    const panel = row.querySelector('.faq__a');

    gsap.set(panel, { height: 0 });

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      row.classList.toggle('is-open', !open);

      if (staticMode) {
        gsap.set(panel, { height: open ? 0 : 'auto' });
        return;
      }

      gsap.to(panel, {
        // 'auto' lets GSAP measure the natural height, so a long answer and a
        // one-liner both open correctly and stay correct if the text changes.
        height: open ? 0 : 'auto',
        duration: TOGGLE_DUR,
        ease: MOTION.ease,
      });
    });
  });
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  wireToggles(el, staticMode);

  if (staticMode) return el;

  gsap.fromTo(
    el.querySelectorAll('.faq__item'),
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: el.querySelector('.faq__list'), start: 'top 80%', once: true },
    },
  );

  return el;
}
