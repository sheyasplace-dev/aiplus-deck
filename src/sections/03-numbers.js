/* ============================================================================
   03 NUMBERS — the evidence, stated plainly.
   A hairline-divided list rather than a card grid: five figures at display
   scale need room to land, and rows let "50,000+" be genuinely large instead
   of shrinking to fit a five-column track.
   ============================================================================ */

import { gsap } from 'gsap';
import { numbers } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { countUp, setValue } from '../lib/countup.js';
import { sectionHead } from '../lib/section.js';
import './03-numbers.css';

function row(item, i) {
  const index = String(i + 1).padStart(2, '0');
  return `
    <li class="num__row">
      <span class="num__index data mute">${index}</span>

      <p class="num__figure display t-figure">
        <span class="num__value"></span>
        <span class="num__sizer" aria-hidden="true">${item.value.toLocaleString('en-US')}${item.suffix}</span>
      </p>

      <div class="num__meta">
        <p class="num__label data">${item.label}</p>
        <p class="num__note caption">${item.note}</p>
      </div>
    </li>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section numbers';
  el.id = 'numbers';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: numbers.label, index: 3 })}
      <ul class="num__list">
        ${numbers.items.map(row).join('')}
      </ul>
    </div>
  `;

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const rows = [...el.querySelectorAll('.num__row')];

  if (staticMode) {
    rows.forEach((r, i) => {
      const item = numbers.items[i];
      setValue(r.querySelector('.num__value'), item.value, item.suffix);
    });
    return el;
  }

  rows.forEach((r, i) => {
    const item = numbers.items[i];

    // Each row enters on its own trigger, so a long list does not fire all at
    // once when only the top of it is on screen.
    gsap.fromTo(
      r,
      { y: MOTION.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.dur,
        ease: MOTION.ease,
        scrollTrigger: { trigger: r, start: 'top 88%', once: true },
      },
    );

    countUp(r.querySelector('.num__value'), {
      value: item.value,
      suffix: item.suffix,
      trigger: r,
      delay: 0.15,
    });
  });

  return el;
}
