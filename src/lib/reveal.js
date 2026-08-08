/* ============================================================================
   REVEAL — masked line-by-line headline entrance. Never a plain fade.
   Each line gets a clipping wrapper; the inner span translates out of it.
   ============================================================================ */

import { gsap } from 'gsap';
import { MOTION } from './motion.js';

/**
 * Build masked-line markup from an explicit array of lines.
 * Authors control the line breaks from content.js, which keeps the template
 * honest — no measuring, no reflow surprises at odd viewport widths.
 *
 * @param {HTMLElement} el   container to fill
 * @param {string[]} lines   one string per visual line
 * @returns {HTMLElement[]}  the inner (moving) spans, in order
 */
export function maskLines(el, lines) {
  el.innerHTML = '';
  return lines.map((text) => {
    const mask = document.createElement('span');
    mask.className = 'line';
    const inner = document.createElement('span');
    inner.textContent = text;
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

/**
 * Wrap a single-string heading into masked lines by measuring where the
 * browser actually broke it. Re-run on resize via observeLines().
 */
export function maskAutoLines(el) {
  const text = el.dataset.text || el.textContent.trim();
  el.dataset.text = text;
  el.innerHTML = text
    .split(/\s+/)
    .map((w) => `<span class="w">${w}</span>`)
    .join(' ');

  const words = [...el.querySelectorAll('.w')];
  const rows = new Map();
  words.forEach((w) => {
    const top = Math.round(w.offsetTop);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(w.textContent);
  });

  return maskLines(el, [...rows.values()].map((r) => r.join(' ')));
}

/** Re-split an auto-masked heading when the viewport changes width. */
export function observeLines(el, onResplit) {
  let last = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === last) return;
    last = window.innerWidth;
    onResplit(maskAutoLines(el));
  });
}

/**
 * Place masked lines below their clip, ready to rise. Call before building a
 * timeline so there is no flash of positioned text on first paint.
 */
export function setLinesHidden(inners) {
  gsap.set(inners, { yPercent: 115 });
}

/** Standard entrance for a block of masked lines. */
export function revealLines(tl, inners, position = 0) {
  return tl.to(
    inners,
    {
      yPercent: 0,
      duration: MOTION.dur,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
    },
    position,
  );
}

/** Standard entrance for anything that is not a headline. */
export function revealUp(tl, targets, position = '-=0.85') {
  return tl.fromTo(
    targets,
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
    },
    position,
  );
}
