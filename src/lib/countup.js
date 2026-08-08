/* ============================================================================
   COUNT-UP — numbers tick from 0 to their value on entry.
   Shared by 03 Numbers and the percentage figures in 08.
   ============================================================================ */

import { gsap } from 'gsap';
import { MOTION } from './motion.js';

const format = (n) => Math.round(n).toLocaleString('en-US');

/** Render the final value immediately — used in static mode and as the seed. */
export function setValue(el, value, suffix = '') {
  el.textContent = format(value) + suffix;
}

/**
 * Tween an element's text from 0 to `value` when `trigger` enters view.
 *
 * Counting is width-unstable — "9" is narrower than "50,000" — so the element
 * reserves its final width up front via a hidden sizing twin in the markup.
 * See .num__figure in 03-numbers.css.
 *
 * @param {HTMLElement} el
 * @param {object} opts
 * @param {number} opts.value
 * @param {string} [opts.suffix]
 * @param {HTMLElement} opts.trigger  element whose entry starts the count
 * @param {number} [opts.delay]
 */
export function countUp(el, { value, suffix = '', trigger, delay = 0 }) {
  const state = { n: 0 };
  setValue(el, 0, suffix);

  return gsap.to(state, {
    n: value,
    duration: MOTION.dur * 1.4, // a count needs longer than a move to read
    ease: MOTION.ease,
    delay,
    onUpdate: () => setValue(el, state.n, suffix),
    scrollTrigger: { trigger, start: 'top 80%', once: true },
  });
}
