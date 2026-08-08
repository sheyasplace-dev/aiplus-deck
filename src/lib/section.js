/* ============================================================================
   SECTION HEAD — the label + counter pattern shared by sections 03 onward.
   Kept here so the rhythm (label → --s5 → heading) is defined once.
   ============================================================================ */

import { sectionCount } from '../data/content.js';

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
