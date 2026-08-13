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
 * Tint one phrase inside already-masked lines. Runs after maskLines so the
 * clip structure is untouched — only the text inside a line is rewritten.
 * The phrase must sit inside a single line; a phrase spanning a line break
 * is highlighted on each line it appears in, which is what the break was for.
 *
 * @param {HTMLElement[]} inners  the spans returned by maskLines
 * @param {string} phrase         exact substring to wrap in .accent
 */
export function accentLines(inners, phrase) {
  if (!phrase) return inners;
  inners.forEach((inner) => {
    const text = inner.textContent;
    if (!text.includes(phrase)) return;
    inner.textContent = '';
    text.split(phrase).forEach((part, i) => {
      if (i) {
        const em = document.createElement('em');
        em.className = 'accent';
        em.textContent = phrase;
        inner.appendChild(em);
      }
      inner.appendChild(document.createTextNode(part));
    });
  });
  return inners;
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

/**
 * Masked entrance for elements that have to keep their layout baseline. The
 * clip is a clip-path on the element and the motion is on an inner wrapper —
 * overflow:hidden would take the baseline from the box's bottom edge, which
 * breaks any row of mixed-size items sitting on a shared line.
 *
 * @param {gsap.core.Timeline} tl
 * @param {Element[]} items    the clipped elements
 * @param {Element[]} inners   the wrapper inside each item, in the same order
 */
export function revealMasked(tl, items, inners, position = 0) {
  const step = { duration: MOTION.dur, ease: MOTION.ease, stagger: MOTION.stagger };
  tl.fromTo(items,
    { clipPath: 'inset(0% 0% 100% 0%)' },
    { clipPath: 'inset(0% 0% -20% 0%)', ...step }, position);
  return tl.fromTo(inners, { yPercent: 115 }, { yPercent: 0, ...step }, position);
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
