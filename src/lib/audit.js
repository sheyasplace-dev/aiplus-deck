/* ============================================================================
   AUDIT — dev-only provenance check.
   content.js tags unverified data [U] and missing data [T]. This walks the
   rendered page and reports anything still carrying a marker, so a placeholder
   price or a TBC date cannot quietly reach a sponsor.
   Runs only in `npm run dev`; stripped from production builds.
   ============================================================================ */

/**
 * Section 08 allocates dots strictly by percentage, so a breakdown that does
 * not total 100 silently drops that share of the room from the visualisation.
 * Nothing on screen looks broken — the field is just quietly wrong.
 */
export function auditBreakdowns(breakdowns) {
  breakdowns.forEach((b) => {
    const sum = b.segments.reduce((s, x) => s + x.pct, 0);
    if (sum === 100) return;
    console.warn(
      `%c⚠ "${b.title}" totals ${sum}%, not 100%`,
      'color:#0447FF;font-weight:600',
      `\n${100 - sum}% of the room is unaccounted for, so ${Math.round(
        (100 - sum) * 20,
      )} dots are missing from the field. Fix in src/data/content.js.`,
    );
  });
}

export function auditPlaceholders() {
  const markers = [];
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const hit = node.textContent.match(/\[[UT]\][^\n]*/);
      if (hit) markers.push({ text: hit[0].trim(), el: node.parentElement });
      return;
    }
    node.childNodes.forEach(walk);
  };
  walk(document.body);

  if (!markers.length) return;

  console.group(
    `%c⚠ ${markers.length} placeholder${markers.length > 1 ? 's' : ''} visible on the page`,
    'color:#0447FF;font-weight:600',
  );
  markers.forEach((m) => console.log(m.text, m.el));
  console.info('Fix these in src/data/content.js before sending this URL.');
  console.groupEnd();
}
