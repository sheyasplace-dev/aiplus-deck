/* ============================================================================
   07 PROOF WALL — the signature section, and the only showy moment on the page.

   Pinned. 76 cells (40 speakers, 36 companies) assemble from scattered
   positions into a dense grid across the first 70% of the scrub, then recede
   so a single line resolves on top of them. Everything it claims is countable
   from the arrays it is built out of.
   ============================================================================ */

import { gsap } from 'gsap';
import { speakers, companies, proof } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import './07-proof.css';

const initials = (name) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

/** Interleave faces and wordmarks so neither clumps in one corner. */
function cells() {
  const faces = speakers.map((s) => ({ type: 'face', ...s }));
  const marks = companies.map((c) => ({ type: 'logo', name: c }));
  const out = [];
  const ratio = Math.ceil(faces.length / marks.length);
  let f = 0;
  let m = 0;
  while (f < faces.length || m < marks.length) {
    for (let i = 0; i < ratio && f < faces.length; i++) out.push(faces[f++]);
    if (m < marks.length) out.push(marks[m++]);
  }
  return out;
}

function cellHTML(cell) {
  if (cell.type === 'logo') {
    return `<li class="pw__cell pw__cell--logo"><span>${cell.name}</span></li>`;
  }
  const slug = cell.name.toLowerCase().replace(/[^a-z]+/g, '-');
  return `
    <li class="pw__cell pw__cell--face" title="${cell.name} — ${cell.title}, ${cell.company}">
      <span class="pw__initials" aria-hidden="true">${initials(cell.name)}</span>
      <img src="/media/speakers/${slug}.jpg" alt="${cell.name}, ${cell.company}"
           loading="lazy" decoding="async">
    </li>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'proof';
  el.id = 'proof';

  el.innerHTML = `
    <div class="pw__stage">
      <div class="wrap pw__head">${sectionHead({ label: proof.label, index: 7 })}</div>
      <ul class="pw__grid wrap">${cells().map(cellHTML).join('')}</ul>
      <p class="pw__resolve wrap">
        ${proof.resolve
          .map((part) => `<span class="line"><span class="data--lg">${part}</span></span>`)
          .join('<span class="pw__dot" aria-hidden="true">·</span>')}
      </p>
    </div>
  `;

  el.querySelectorAll('.pw__cell--face img').forEach((img) => {
    img.addEventListener('error', () => img.remove());
  });

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const grid = el.querySelector('.pw__grid');
  const tiles = [...el.querySelectorAll('.pw__cell')];
  const lines = [...el.querySelectorAll('.pw__resolve .line > span')];
  const dots = [...el.querySelectorAll('.pw__dot')];

  if (staticMode) {
    el.classList.add('proof--static');
    return el;
  }

  gsap.set(lines, { yPercent: 115 });
  gsap.set(dots, { opacity: 0 });

  // Scattered start. Offsets are per-cell so the grid does not assemble as one
  // rigid block sliding into place.
  const scatter = gsap.utils.random(-90, 90, 1, true);
  tiles.forEach((t) => gsap.set(t, { opacity: 0, x: scatter(), y: scatter() }));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: '+=260%',
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });

  // 0 → 0.62: assemble, filling outward from the centre of the grid.
  tl.to(tiles, {
    opacity: 1,
    x: 0,
    y: 0,
    ease: MOTION.ease,
    duration: 0.62,
    stagger: { each: 0.006, from: 'center', grid: 'auto' },
  }, 0);

  // 0.7 → 1: the grid steps back and the claim lands on top of it.
  tl.to(grid, { opacity: 0.12, duration: 0.2, ease: MOTION.ease }, 0.7)
    .to(lines, {
      yPercent: 0,
      duration: 0.25,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
    }, 0.74)
    .to(dots, { opacity: 1, duration: 0.15, ease: MOTION.ease }, 0.82);

  return el;
}
