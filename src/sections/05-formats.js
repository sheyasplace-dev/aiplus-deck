/* ============================================================================
   05 WHAT WE RUN — formats as a hairline-divided list.
   Hovering a row swaps a sticky preview beside it. The preview is a fixed
   frame with the images stacked and crossfaded on opacity alone, so nothing
   in the list moves and no layout is disturbed by a pointer.
   ============================================================================ */

import { gsap } from 'gsap';
import { formats } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import './05-formats.css';

function row(f, i) {
  return `
    <li class="fmt__row" data-index="${i}" tabindex="0">
      <div class="fmt__name-wrap">
        <h3 class="fmt__name display t-d3">${f.name}</h3>
        <p class="fmt__tag data mute">${f.tag}</p>
      </div>
      <p class="fmt__blurb caption">${f.blurb}</p>
      <dl class="fmt__meta">
        <dt class="sr-only">Cadence</dt><dd class="data mute">${f.cadence}</dd>
        <dt class="sr-only">Location</dt><dd class="data mute">${f.location}</dd>
        <dt class="sr-only">Scale</dt><dd class="data">${f.scale}</dd>
      </dl>
    </li>
  `;
}

function preview(f, i) {
  return `<img class="fmt__img${i === 0 ? ' is-active' : ''}" data-index="${i}"
            src="${f.image}" alt="${f.name}" loading="lazy" decoding="async">`;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section formats';
  el.id = 'formats';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: formats.label, index: 5 })}
      <div class="fmt__grid">
        <ul class="fmt__list">${formats.items.map(row).join('')}</ul>
        <div class="fmt__preview">
          <div class="fmt__frame">${formats.items.map(preview).join('')}</div>
        </div>
      </div>
    </div>
  `;

  // Any image with no file on disk drops out and reveals the placeholder
  // ground behind the stack, rather than showing a broken-image icon.
  el.querySelectorAll('.fmt__img').forEach((img) => {
    img.addEventListener('error', () => img.remove());
  });

  return el;
}

function wireHover(el) {
  const rows = [...el.querySelectorAll('.fmt__row')];
  const imgs = [...el.querySelectorAll('.fmt__img')];

  const activate = (index) => {
    rows.forEach((r) => r.classList.toggle('is-active', +r.dataset.index === index));
    imgs.forEach((i) => i.classList.toggle('is-active', +i.dataset.index === index));
  };

  rows.forEach((r) => {
    const index = +r.dataset.index;
    r.addEventListener('mouseenter', () => activate(index));
    r.addEventListener('focusin', () => activate(index));
  });

  // Leaving the list returns to the first format rather than going blank —
  // an empty frame reads as a loading failure.
  el.querySelector('.fmt__list').addEventListener('mouseleave', () => activate(0));
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  wireHover(el);

  if (staticMode) return el;

  gsap.fromTo(
    el.querySelectorAll('.fmt__row'),
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: el.querySelector('.fmt__list'), start: 'top 78%', once: true },
    },
  );

  return el;
}
