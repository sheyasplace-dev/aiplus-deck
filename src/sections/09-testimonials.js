/* ============================================================================
   10 TESTIMONIALS — large display type on white. No cards, no quote marks.
   The words are the design; a card would make them look like a widget and
   quote marks would make them look like stock copy.

   Renders nothing at all while the array is empty. An invented testimonial in
   a cold pitch asking for five figures is a liability, so the section simply
   does not exist until real attributed quotes are supplied.
   ============================================================================ */

import { gsap } from 'gsap';
import { testimonials } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import { maskAutoLines, observeLines, setLinesHidden, revealLines } from '../lib/reveal.js';
import './09-testimonials.css';

function item(t) {
  return `
    <figure class="quo__item">
      <blockquote class="quo__text display t-d1">${t.quote}</blockquote>
      <figcaption class="quo__by">
        <span class="quo__name data">${t.name}</span>
        <span class="quo__role data mute">${t.role}, ${t.company}</span>
      </figcaption>
    </figure>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section quo';
  el.id = 'testimonials';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: testimonials.label, index: 9 })}
      <div class="quo__list">${testimonials.items.map(item).join('')}</div>
    </div>
  `;

  return el;
}

export function init(mount, staticMode) {
  if (!testimonials.items.length) {
    if (import.meta.env.DEV) {
      console.info(
        '%c09 Testimonials — hidden',
        'color:#0447FF;font-weight:600',
        '\nNo quotes in content.js. Add real attributed ones to testimonials.items ' +
          'and the section appears. Nothing is invented to fill it.',
      );
    }
    return null;
  }

  const el = render();
  mount.appendChild(el);

  const quotes = [...el.querySelectorAll('.quo__text')];
  const bys = [...el.querySelectorAll('.quo__by')];

  if (staticMode) return el;

  quotes.forEach((q, i) => {
    let lines = maskAutoLines(q);
    setLinesHidden(lines);

    observeLines(q, (next) => {
      gsap.set(next, { yPercent: 0 });
      lines = next;
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: q, start: 'top 78%', once: true },
    });
    revealLines(tl, lines, 0);
    tl.fromTo(
      bys[i],
      { y: MOTION.y, opacity: 0 },
      { y: 0, opacity: 1, duration: MOTION.dur, ease: MOTION.ease },
      '-=0.7',
    );
  });

  return el;
}
