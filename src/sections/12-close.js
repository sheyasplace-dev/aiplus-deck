/* ============================================================================
   13 CLOSE — last screen. Back on white, mirroring the hero, so the page ends
   where it started and the evidence in between reads as the middle of an
   argument rather than a scroll of assets.
   ============================================================================ */

import { gsap } from 'gsap';
import { brand, close } from '../data/content.js';
import { away } from '../lib/section.js';
import { MOTION } from '../lib/motion.js';
import { maskLines, setLinesHidden, revealLines, revealUp } from '../lib/reveal.js';
import './12-close.css';

/**
 * Google Calendar template link. Returns null unless a real start date exists —
 * a button that drops the wrong date into a sponsor's calendar is worse than
 * no button, so the CTA simply does not render until content.js has one.
 */
function calendarHref() {
  const c = close.calendar;
  if (!c.start || !c.end) return null;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: c.title,
    dates: `${c.start}/${c.end}`,
    details: c.details,
    location: c.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section close';
  el.id = 'close';

  const cal = calendarHref();

  el.innerHTML = `
    <div class="wrap close__inner">
      <h2 class="close__headline display t-hero"></h2>

      <dl class="close__when">
        <dt class="sr-only">Date</dt>
        <dd class="close__date data">${close.date}</dd>
        <dt class="sr-only">Venue</dt>
        <dd class="close__venue data mute">${close.venue}</dd>
      </dl>

      <p class="close__body body mute">${close.body}</p>

      <div class="close__ctas">
        <a class="btn btn--primary" href="${close.ctaPrimary.href}"${away(close.ctaPrimary.href)}>${close.ctaPrimary.label}</a>
        ${cal ? `<a class="btn btn--ghost" href="${cal}" target="_blank" rel="noopener">${close.calendar.label}</a>` : ''}
        <a class="link" href="${close.ctaSecondary.href}">${close.ctaSecondary.label}</a>
      </div>
    </div>

    <div class="wrap close__foot">
      <span class="data mute">${close.footer}</span>
      <a class="data close__site" href="https://${brand.url}" target="_blank" rel="noopener">${brand.url}</a>
    </div>
  `;

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const headline = el.querySelector('.close__headline');
  const lines = maskLines(headline, close.headline);

  const when = el.querySelector('.close__when');
  const body = el.querySelector('.close__body');
  const ctas = [...el.querySelector('.close__ctas').children];
  const foot = el.querySelector('.close__foot');

  if (staticMode) return el;

  gsap.set([when, body, ...ctas, foot], { opacity: 0 });
  setLinesHidden(lines);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start: 'top 65%', once: true },
  });

  revealLines(tl, lines, 0);
  revealUp(tl, when);
  revealUp(tl, body);
  revealUp(tl, ctas);
  revealUp(tl, foot);

  return el;
}
