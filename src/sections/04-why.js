/* ============================================================================
   04 WHY WE EXIST — the only prose on the page.

   Two columns: heading and a session photo on the left, the argument on the
   right in two labelled blocks. A themes rail closes the top half, then a
   full-width rule, then the pull-quote and the mission sitting on one line.
   ============================================================================ */

import { gsap } from 'gsap';
import { why } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { sectionHead } from '../lib/section.js';
import {
  maskAutoLines,
  observeLines,
  setLinesHidden,
  revealLines,
  revealUp,
} from '../lib/reveal.js';
import './04-why.css';

function render() {
  const el = document.createElement('section');
  el.className = 'section section--surface why';
  el.id = 'why';

  el.innerHTML = `
    <div class="wrap">
      ${sectionHead({ label: why.label, index: 4 })}

      <div class="why__top">
        <div class="why__left">
          <h2 class="why__heading display t-d1">${why.heading}</h2>
          <figure class="why__figure">
            <img src="${why.image}" alt="${why.imageAlt}" loading="lazy" decoding="async">
            <figcaption class="why__figcap data mute">${why.imageCaption}</figcaption>
          </figure>
        </div>

        <div class="why__right">
          ${why.blocks
            .map(
              (b) => `
            <div class="why__block">
              <p class="why__block-label data">${b.label}</p>
              <p class="why__block-text body">${b.text}</p>
            </div>`,
            )
            .join('')}

          <div class="why__themes">
            <p class="why__themes-label data mute">${why.themesLabel}</p>
            <ul class="why__themes-list">
              ${why.themes.map((t) => `<li class="why__theme">${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="why__bottom">
        <blockquote class="why__quote display t-d2">${why.pullQuote}</blockquote>
        <p class="why__after body">${why.bodyAfter}</p>
      </div>
    </div>
  `;

  el.querySelector('.why__figure img').addEventListener('error', (e) => {
    e.target.closest('.why__figure').classList.add('is-empty');
    e.target.remove();
  });

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const heading = el.querySelector('.why__heading');
  const quote = el.querySelector('.why__quote');
  const figure = el.querySelector('.why__figure');
  const blocks = [...el.querySelectorAll('.why__block')];
  const themes = el.querySelector('.why__themes');
  const after = el.querySelector('.why__after');

  if (staticMode) return el;

  let headingLines = maskAutoLines(heading);
  let quoteLines = maskAutoLines(quote);

  setLinesHidden(headingLines);
  setLinesHidden(quoteLines);
  gsap.set([...blocks, themes, after], { opacity: 0 });

  // Re-split on width change, then land the new lines — a resize after the
  // reveal has played must not re-hide the text.
  const resettle = (next) => {
    gsap.set(next, { yPercent: 0 });
    return next;
  };
  observeLines(heading, (next) => (headingLines = resettle(next)));
  observeLines(quote, (next) => (quoteLines = resettle(next)));

  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start: 'top 70%', once: true },
  });
  revealLines(tl, headingLines, 0);
  revealUp(tl, blocks);
  revealUp(tl, themes, '-=0.9');
  tl.fromTo(
    figure,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: MOTION.dur, ease: MOTION.ease },
    '-=1.0',
  );

  // The bottom row sits far enough down to need its own trigger.
  const tlEnd = gsap.timeline({
    scrollTrigger: { trigger: el.querySelector('.why__bottom'), start: 'top 85%', once: true },
  });
  tlEnd.to(quoteLines, {
    yPercent: 0,
    duration: MOTION.dur,
    ease: MOTION.ease,
    stagger: MOTION.stagger,
  });
  revealUp(tlEnd, after);

  return el;
}
