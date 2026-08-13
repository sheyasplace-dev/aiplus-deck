/* ============================================================================
   07 PROOF — the logo wall, and the only showy moment on the page.

   Pinned. Every company whose people took the stage assembles from scattered
   positions into a grid across the first 62% of the scrub, then recedes so a
   single line resolves on top. Speakers have their own gallery in 08; this
   section is companies alone.

   Logo resolution per card, in order: self-hosted SVG, optional remote
   candidates, then the company name as type. The wall is never empty.
   ============================================================================ */

import { gsap } from 'gsap';
import { companies, proof } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import './07-proof.css';

const L = proof.logos;

/**
 * Candidate URLs for one company, best first.
 *
 * The filename is exact rather than probed across extensions: a missing file
 * does not 404 under the dev server's SPA fallback, it returns index.html with
 * a 200, so guessing extensions means feeding HTML to an <img> once per miss.
 * Set `logo` on a company to point at a hand-made vector instead.
 */
function sources(c) {
  const local = [`/media/logos/${c.logo || `${c.domain}.png`}`];
  if (!L.useRemote || c.unconfirmed) return local;
  return local.concat(L.remote.map((t) => t.replace('{d}', c.domain)));
}

function cell(c) {
  return `
    <li class="pw__cell">
      <span class="pw__logo">
        <img alt="${c.name}" decoding="async">
      </span>
      <span class="pw__name">${c.name}</span>
    </li>
  `;
}

/**
 * Walk the candidate list until one loads at a usable size. Anything that
 * fails or resolves too small falls through; if all fail the slot stays empty
 * and the name below carries the card on its own.
 */
function wireLogo(img, list) {
  let i = -1;
  const next = () => {
    i += 1;
    if (i >= list.length) { img.remove(); return; }
    img.src = list[i];
  };
  img.addEventListener('error', next);
  img.addEventListener('load', () => {
    // naturalWidth 0 means the bytes did not decode as an image — treat it as
    // a miss, never as an unknown to be trusted.
    if (!img.naturalWidth || img.naturalWidth < L.minPx) next();
    else img.classList.add('is-on');
  });
  next();
}

function render() {
  const el = document.createElement('section');
  el.className = 'proof';
  el.id = 'proof';

  el.innerHTML = `
    <div class="pw__stage">
      <div class="wrap pw__head">
        ${sectionHead({ label: proof.label, index: 7 })}
        <div class="pw__head-row">
          <h2 class="pw__heading display t-d3">${proof.heading}</h2>
        </div>
      </div>

      <ul class="pw__grid wrap">${companies.map(cell).join('')}</ul>

      <p class="pw__resolve wrap">
        ${proof.resolve
          .map((part) => `<span class="line"><span class="data--lg">${part}</span></span>`)
          .join('<span class="pw__dot" aria-hidden="true">·</span>')}
      </p>

      <p class="wrap pw__foot caption">${proof.footnote}</p>
    </div>
  `;

  [...el.querySelectorAll('.pw__logo img')].forEach((img, i) =>
    wireLogo(img, sources(companies[i])));

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

  // Scattered start. Offsets are per-cell so the wall does not assemble as one
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
    stagger: { each: 0.008, from: 'center', grid: 'auto' },
  }, 0);

  // 0.7 → 1: the wall steps back and the claim lands on top of it.
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
