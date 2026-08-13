/* ============================================================================
   03 STATEMENT — the proposition at full scale, over the room it describes.

   Two halves on one line: the headline holds the left, the argument and the
   facts hold the right. Underneath, a 21:9 band of the room itself. The
   section is the deck's turn from figures to evidence, so the entrance runs as
   one timeline rather than three independent triggers — headline, then the
   right column, then the band wiping open under both.
   ============================================================================ */

import { gsap } from 'gsap';
import { statement as S } from '../data/content.js';
import { away } from '../lib/section.js';
import { MOTION } from '../lib/motion.js';
import {
  maskLines, accentLines, setLinesHidden, revealLines, revealUp,
} from '../lib/reveal.js';
import './03-statement.css';

function render() {
  const el = document.createElement('section');
  el.className = 'section stmt';
  el.id = 'statement';

  el.innerHTML = `
    <div class="wrap">
      <div class="stmt__top">
        <div class="stmt__lead">
          <p class="stmt__eyebrow data mute"><span class="stmt__dot"></span>${S.eyebrow}</p>
          <h2 class="stmt__headline display t-d1"></h2>
        </div>

        <div class="stmt__aside">
          <p class="stmt__body body">${S.body}</p>
          <div class="stmt__ctas">
            <a class="btn btn--primary" href="${S.ctaPrimary.href}"${away(S.ctaPrimary.href)}>${S.ctaPrimary.label}</a>
            <a class="btn btn--ghost" href="${S.ctaSecondary.href}"${away(S.ctaSecondary.href)}>${S.ctaSecondary.label}</a>
          </div>
          <span class="stmt__hr"></span>
          <ul class="stmt__meta">
            ${S.meta.map((m) => `<li class="data mute">${m}</li>`).join('')}
          </ul>
        </div>
      </div>

      <figure class="stmt__band">
        <div class="stmt__frame">
          <img class="stmt__img" src="${S.media.image}" alt="${S.media.alt}"
               style="object-position:${S.media.focus}" loading="lazy" decoding="async">
        </div>
        <figcaption class="stmt__caption data">${S.media.caption}</figcaption>
      </figure>
    </div>
  `;

  // No file on disk yet: drop to the placeholder ground rather than a broken
  // image, so the band still holds its ratio and the timing stays reviewable.
  el.querySelector('.stmt__img').addEventListener('error', (e) => {
    e.target.closest('.stmt__frame').classList.add('is-empty');
    e.target.remove();
  });

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const lines = accentLines(maskLines(el.querySelector('.stmt__headline'), S.headline), S.accent);
  const eyebrow = el.querySelector('.stmt__eyebrow');
  const body = el.querySelector('.stmt__body');
  const ctas = [...el.querySelector('.stmt__ctas').children];
  const hr = el.querySelector('.stmt__hr');
  const meta = [...el.querySelectorAll('.stmt__meta li')];
  const frame = el.querySelector('.stmt__frame');
  const img = el.querySelector('.stmt__img');
  const caption = el.querySelector('.stmt__caption');

  if (staticMode) return el;

  setLinesHidden(lines);
  gsap.set([eyebrow, body, ...ctas, ...meta, caption], { opacity: 0 });
  gsap.set(hr, { scaleX: 0, transformOrigin: 'left center' });

  const tl = gsap.timeline({
    defaults: { ease: MOTION.ease },
    scrollTrigger: { trigger: el, start: 'top 72%', once: true },
  });

  revealUp(tl, eyebrow, 0);
  revealLines(tl, lines, 0.08);
  revealUp(tl, body, 0.34);
  revealUp(tl, ctas, '-=0.85');
  // The rule draws before the facts land on it.
  tl.to(hr, { scaleX: 1, duration: MOTION.dur }, '-=0.9');
  revealUp(tl, meta, '-=0.8');

  // The band wipes open from its own bottom edge while the picture settles out
  // of a slight overscale — the frame never moves, so nothing below it shifts.
  tl.fromTo(frame,
    { clipPath: 'inset(0% 0% 100% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, '-=1.05')
    .fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.9 }, '<');
  revealUp(tl, caption, '-=1.2');

  return el;
}
