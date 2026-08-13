/* ============================================================================
   SECTION HEAD — the label + counter pattern shared by sections 03 onward.
   Kept here so the rhythm (label → --s5 → heading) is defined once.
   ============================================================================ */

import { sectionCount } from '../data/content.js';

/**
 * Attributes for a link that leaves the page. The booking page opens in a new
 * tab: this deck gets forwarded and re-read, and a sponsor who books should
 * still have it behind them. Returns nothing for in-page anchors and mailto,
 * so the same call site works whatever content.js points at.
 */
export function away(href) {
  return /^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : '';
}

/**
 * @param {object} opts
 * @param {string} opts.label   section label, e.g. 'RATE CARD'
 * @param {number} opts.index   1-based position on the page
 * @param {string} [opts.heading] display heading; omit for label-only heads
 */
export function sectionHead({ label, index, heading }) {
  const counter = `${String(index).padStart(2, '0')} / ${sectionCount}`;
  return `
    <div class="s-head">
      <div class="s-head__meta">
        <span class="data mute">${label}</span>
        <span class="data mute">${counter}</span>
      </div>
      ${heading ? `<h2 class="s-head__heading display t-d1">${heading}</h2>` : ''}
    </div>
  `;
}
