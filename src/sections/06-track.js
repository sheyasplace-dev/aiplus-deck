/* ============================================================================
   06 TRACK RECORD — horizontal rail that scrubs while the section is pinned.

   The rail only pins when there is genuinely more content than viewport. With
   a short list — which is the current state — pinning would hold the page
   still for a scroll distance of roughly zero, which reads as a broken page.
   Below the threshold it falls back to a plain row, and on narrow screens to
   native horizontal scroll.
   ============================================================================ */

import { gsap } from 'gsap';
import { trackRecord } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import { away, sectionHead } from '../lib/section.js';
import './06-track.css';

function card(item, i) {
  return `
    <article class="rail__card">
      <div class="rail__frame">
        <img class="rail__img" src="${item.image}" alt="${item.edition}"
             loading="lazy" decoding="async">
      </div>
      <p class="rail__index data mute">${String(i + 1).padStart(2, '0')}</p>
      <h3 class="rail__edition display t-d3">${item.edition}</h3>
      <p class="rail__date data">${item.date}</p>
      <p class="rail__venue caption">${item.venue}</p>
      ${item.stat ? `
      <div class="rail__stat">
        <span class="rail__stat-value display t-d3">${item.stat}</span>
        <span class="data mute">${item.statLabel}</span>
      </div>` : ''}
      <p class="rail__detail caption">${item.detail}</p>
      ${item.link ? `<a class="rail__link link" href="${item.link}"${away(item.link)}>${trackRecord.linkLabel}</a>` : ''}
    </article>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section rail';
  el.id = 'track';

  el.innerHTML = `
    <div class="wrap">${sectionHead({ label: trackRecord.label, index: 6 })}</div>
    <div class="rail__viewport">
      <div class="rail__track">${trackRecord.items.map(card).join('')}</div>
    </div>
    <div class="wrap"><div class="rail__progress"><span class="rail__progress-fill"></span></div></div>
  `;

  el.querySelectorAll('.rail__img').forEach((img) => {
    img.addEventListener('error', () => img.remove());
  });

  return el;
}

/** Pins the section and scrubs the track sideways by its overflow distance. */
function pinRail(el) {
  const track = el.querySelector('.rail__track');
  const viewport = el.querySelector('.rail__viewport');
  const fill = el.querySelector('.rail__progress-fill');

  const overflow = () => track.scrollWidth - viewport.clientWidth;

  // Not enough content to be worth pinning. Leave it as a static row.
  if (overflow() <= 120) {
    el.classList.add('rail--short');
    gsap.set(fill, { scaleX: 1 });
    return;
  }

  gsap.to(track, {
    x: () => -overflow(),
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => '+=' + overflow(),
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(fill, { scaleX: self.progress }),
    },
  });
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  if (staticMode) {
    el.classList.add('rail--native');
    return el;
  }

  gsap.fromTo(
    el.querySelectorAll('.rail__card'),
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: el, start: 'top 78%', once: true },
    },
  );

  // Pinning a horizontal rail on a phone hijacks the only scroll axis the
  // reader has. Native swipe is better there.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => pinRail(el));
  mm.add('(max-width: 899px)', () => {
    el.classList.add('rail--native');
    return () => el.classList.remove('rail--native');
  });

  return el;
}
