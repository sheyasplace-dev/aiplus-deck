/* ============================================================================
   08 SPEAKERS — scroll marquee.

   Ported from the Claude Design canvas "Speakers — Scroll Marquee". Pinned
   section; the portrait rail translates X across the scroll span, cards lift
   and fade by distance from the viewport centre, hairline progress bar below.

   Beyond the reference: the rail also takes direct horizontal input. A
   trackpad swipe or a drag on the rail is converted back into page scroll, so
   both gestures drive one position and never fight each other.
   ============================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakers, speakerShowcase as show } from '../data/content.js';
import { sectionHead } from '../lib/section.js';
import { maskLines, setLinesHidden, revealLines } from '../lib/reveal.js';
import { bindHorizontalInput } from '../lib/hscroll.js';
import './08-speakers.css';

const LIFT = 26;
const slug = (n) => n.toLowerCase().replace(/[^a-z]+/g, '-');

/** Featured cut, in the order content.js lists it. Falls back to all 40. */
function cast() {
  if (!show.feature?.length) return speakers;
  return show.feature
    .map((name) => speakers.find((s) => s.name === name))
    .filter(Boolean);
}

function card(s) {
  return `
    <article class="spk__card">
      <div class="spk__frame">
        <img src="/media/speakers/${slug(s.name)}.jpg" alt="${s.name}"
             loading="lazy" decoding="async">
      </div>
      <div class="spk__meta">
        <p class="spk__name">${s.name}</p>
        <span class="spk__rule"></span>
        <p class="spk__title data mute">${s.title}</p>
        <p class="spk__co data">${s.company}</p>
      </div>
    </article>
  `;
}

function render(list) {
  const el = document.createElement('section');
  el.className = 'spk';
  el.id = 'speakers';

  el.innerHTML = `
    <div class="spk__pin">
      <div class="wrap spk__head">
        ${sectionHead({ label: show.label, index: 8 })}
        <h2 class="spk__heading display t-d2"></h2>
      </div>

      <div class="spk__viewport">
        <div class="spk__track">${list.map(card).join('')}</div>
      </div>

      <div class="wrap spk__bar">
        <span class="data mute">${show.scrollLabel}</span>
        <span class="spk__rail"><span class="spk__fill"></span></span>
        <span class="spk__count data mute"></span>
      </div>
    </div>
  `;

  el.querySelectorAll('.spk__frame img').forEach((img) =>
    img.addEventListener('error', (e) => {
      e.target.closest('.spk__frame').classList.add('is-empty');
      e.target.remove();
    }));

  return el;
}

/** Cards lift, shrink and fade with distance from the centre of the viewport. */
function shapeCards(cards) {
  const mid = window.innerWidth / 2;
  cards.forEach((c) => {
    const b = c.getBoundingClientRect();
    const d = Math.min(1, Math.abs(b.left + b.width / 2 - mid) / (window.innerWidth * 0.62));
    c.style.transform = `translate3d(0,${(d * LIFT).toFixed(1)}px,0) scale(${(1 - d * 0.06).toFixed(3)})`;
    c.style.opacity = (1 - d * 0.55).toFixed(2);
  });
}

export function init(mount, staticMode) {
  const list = cast();
  if (!list.length) return null;

  const el = render(list);
  mount.appendChild(el);

  const heading = el.querySelector('.spk__heading');
  const lines = maskLines(heading, show.heading);
  const track = el.querySelector('.spk__track');
  const viewport = el.querySelector('.spk__viewport');
  const cards = [...el.querySelectorAll('.spk__card')];
  const fill = el.querySelector('.spk__fill');
  const count = el.querySelector('.spk__count');

  const total = String(list.length).padStart(2, '0');
  const setCount = (i) => { count.textContent = `${String(i).padStart(2, '0')} / ${total}`; };
  setCount(1);

  if (staticMode) {
    el.classList.add('spk--static');
    return el;
  }

  setLinesHidden(lines);
  revealLines(
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } }),
    lines,
  );

  const overflow = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  const tween = gsap.to(track, {
    x: () => -overflow(),
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => '+=' + Math.max(window.innerHeight, overflow()),
      pin: el.querySelector('.spk__pin'),
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(fill, { scaleX: self.progress });
        setCount(Math.min(list.length, Math.round(self.progress * (list.length - 1)) + 1));
      },
    },
    onUpdate: () => shapeCards(cards),
  });

  // Swipe or drag the rail directly; both route back through page scroll.
  bindHorizontalInput(viewport, () => {
    const st = tween.scrollTrigger;
    return (st.end - st.start) / Math.max(1, overflow());
  });

  return el;
}
