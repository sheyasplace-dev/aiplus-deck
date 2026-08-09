/* ============================================================================
   HORIZONTAL INPUT — lets a pinned rail be driven by sideways gestures as well
   as by page scroll.

   Both gestures resolve to the same number. A horizontal swipe or drag is
   converted into page scroll rather than moving the rail directly, so the pin
   remains the single source of position — two independent offsets would drift
   apart the moment someone used both.
   ============================================================================ */

import { getLenis } from './smooth.js';

/** Move the page by `dy` pixels, through Lenis when it is running. */
function scrollBy(dy) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(lenis.scroll + dy, { immediate: true, force: true });
  else window.scrollTo(0, window.scrollY + dy);
}

/**
 * @param {HTMLElement} el       element that receives the gestures
 * @param {() => number} ratio   page-pixels per rail-pixel, read per event so
 *                               it stays correct across resizes
 */
export function bindHorizontalInput(el, ratio) {
  const nudge = (dx) => scrollBy(dx * ratio());

  // Only claim clearly-horizontal wheel deltas; anything else is page scroll.
  el.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    nudge(e.deltaX);
  }, { passive: false });

  let last = null;
  el.addEventListener('pointerdown', (e) => {
    last = e.clientX;
    el.setPointerCapture?.(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (last === null) return;
    nudge(last - e.clientX);
    last = e.clientX;
  });
  ['pointerup', 'pointercancel'].forEach((ev) =>
    el.addEventListener(ev, () => { last = null; }));
}
