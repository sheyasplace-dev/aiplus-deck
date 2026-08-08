/* ============================================================================
   MOTION — shared tokens and the two kill switches.
   Every animated section imports from here. Nothing hardcodes a duration.
   ============================================================================ */

export const MOTION = {
  dur: 1.1,
  ease: 'power3.out',
  y: 24,
  stagger: 0.06,
};

/**
 * True when all animation must be skipped and content rendered in final state.
 * Two triggers: the ?static=1 URL param, and prefers-reduced-motion.
 */
export function isStatic() {
  const param = new URLSearchParams(window.location.search).get('static');
  if (param === '1') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Stamp the result on <html> so CSS can respond too, and so sections can read
 * it without re-parsing the URL. Call once, before any section init().
 */
export function applyStaticFlag() {
  const staticMode = isStatic();
  document.documentElement.dataset.static = String(staticMode);
  return staticMode;
}

/**
 * Resolves once webfonts are ready, so masked reveals never measure or play
 * against fallback metrics. Falls back to a timeout on older browsers.
 */
export function fontsReady() {
  if (!document.fonts) return Promise.resolve();
  return Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
}
