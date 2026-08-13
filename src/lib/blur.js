/* ============================================================================
   BLUR FOCUS — the two scrubbed paints used by the manifesto rail.

   Both write style directly rather than tweening: they run off a ScrollTrigger
   progress value, so every frame is a function of scroll position and there is
   no timeline state to fall out of sync. Neither is called under ?static=1.
   ============================================================================ */

export const BLUR = 14;

export const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (t) => t * t * (3 - 2 * t);

/**
 * Resolve a run of words out of blur, one ramp per word offset by index, so
 * the sentence assembles in reading order instead of fading in as a block.
 *
 * @param {HTMLElement[]} words  one element per word
 * @param {number} p             pin progress, 0…1
 * @param {number} span          share of the pin the whole run occupies
 * @param {number} win           length of a single word's ramp
 */
export function revealWords(words, p, span = 0.62, win = 0.16) {
  const step = span / words.length;
  words.forEach((w, i) => {
    const e = smooth(clamp((p - i * step) / win));
    w.style.opacity = (0.08 + 0.92 * e).toFixed(3);
    w.style.filter = `blur(${((1 - e) * BLUR).toFixed(2)}px)`;
    w.style.transform = `translateY(${((1 - e) * 10).toFixed(2)}px)`;
    w.classList.toggle('is-lit', e > 0.6);
  });
}

/**
 * Bring elements forward as they cross the centre of the screen.
 *
 * Presence only — no blur. The reference blurs the off-centre cards, but these
 * are photographs of the room doing the arguing: a sponsor scanning the rail
 * has to be able to read every one of them, including the two waiting at the
 * edges. Scale goes out as a custom property so the caller's CSS owns the
 * transform and any fixed offset on the element survives it.
 */
export function focusCentre(els, reach = 0.72) {
  const mid = window.innerWidth / 2;
  els.forEach((c) => {
    const b = c.getBoundingClientRect();
    const e = smooth(1 - clamp(Math.abs(b.left + b.width / 2 - mid) / (window.innerWidth * reach)));
    c.style.opacity = (0.62 + 0.38 * e).toFixed(3);
    c.style.setProperty('--s', (0.98 + 0.02 * e).toFixed(4));
  });
}
