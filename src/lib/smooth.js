/* ============================================================================
   SMOOTH SCROLL — Lenis at lerp 0.08, driven by the GSAP ticker so Lenis and
   ScrollTrigger share one RAF loop and never disagree about scroll position.
   ============================================================================ */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let instance = null;

/** The live Lenis instance, or null in static mode. */
export function getLenis() {
  return instance;
}

export function initSmoothScroll(staticMode) {
  // In static mode we leave native scrolling alone entirely.
  if (staticMode) return null;

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    // Touch devices keep native momentum; smoothing it fights the OS.
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Anchor links (#pricing) need to go through Lenis, not native jump.
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: 0 });
  });

  instance = lenis;
  return lenis;
}
