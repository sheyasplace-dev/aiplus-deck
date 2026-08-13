/* ============================================================================
   04 WHY WE EXIST — manifesto, then a drifting rail. Ported from the Claude
   Design project "Scroll-driven manifesto with drifting cards".

   Two pinned beats: the manifesto resolves word by word out of blur, each word
   on its own ramp offset by index, so the sentence assembles left to right
   rather than fading in as a block; then the rail translates X, cards carrying
   fixed vertical offsets so they read as scattered rather than as a row, each
   sharpening as it crosses the centre of the viewport.

   The one section here whose motion is scrubbed rather than an entrance. Under
   ?static=1 or reduced motion neither pin is created — the manifesto renders
   sharp and the rail becomes a plain grid.
   ============================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { beliefs as B } from '../data/content.js';
import { sectionHead } from '../lib/section.js';
import { bindHorizontalInput } from '../lib/hscroll.js';
import { clamp, revealWords, focusCentre } from '../lib/blur.js';
import './04-beliefs.css';

function word(w) {
  const accent = B.accentWords.includes(w) ? ' is-accent' : '';
  return `<span class="bel__w${accent}">${w}</span>`;
}

function card(item, i) {
  const photo = item.image
    ? `<img class="bel__img" src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">`
    : '';
  return `
    <figure class="bel__card">
      <div class="bel__frame${item.image ? '' : ' is-empty'}" data-note="${item.note}">${photo}</div>
      <figcaption class="bel__cap">
        <p class="bel__index data">${B.cardLabel} / ${String(i + 1).padStart(2, '0')}</p>
        <h3 class="bel__title display">${item.title}</h3>
        <p class="bel__text caption">${item.text}</p>
      </figcaption>
    </figure>
  `;
}

function render() {
  const el = document.createElement('section');
  el.className = 'bel';
  el.id = 'why';

  el.innerHTML = `
    <div class="wrap bel__head">${sectionHead({ label: B.label, index: 4 })}</div>

    <div class="bel__manifesto">
      <div class="bel__stage">
        <p class="bel__eyebrow data">${B.eyebrow}</p>
        <!-- Joined with no whitespace: the gap between words is the span's own
             margin, so it stays one predictable value instead of a collapsed
             space stacked on top of it. Adjacent inline-blocks still wrap. -->
        <h2 class="bel__words display">${B.manifesto.split(/\s+/).map(word).join('')}</h2>
        <p class="bel__cue data mute">${B.cue}</p>
      </div>
    </div>

    <div class="bel__rail">
      <div class="bel__pin">
        <div class="bel__viewport">
          <div class="bel__track">${B.items.map(card).join('')}</div>
        </div>
        <div class="bel__progress"><span class="bel__fill"></span></div>
      </div>
    </div>
  `;

  el.querySelectorAll('.bel__img').forEach((img) =>
    img.addEventListener('error', (e) => {
      e.target.closest('.bel__frame').classList.add('is-empty');
      e.target.remove();
    }));

  return el;
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const words = [...el.querySelectorAll('.bel__w')];
  const cue = el.querySelector('.bel__cue');
  const track = el.querySelector('.bel__track');
  const viewport = el.querySelector('.bel__viewport');
  const cards = [...el.querySelectorAll('.bel__card')];
  const fill = el.querySelector('.bel__fill');

  if (staticMode) {
    el.classList.add('bel--static');
    return el;
  }

  revealWords(words, 0);

  ScrollTrigger.create({
    trigger: el.querySelector('.bel__manifesto'),
    start: 'top top',
    end: '+=80%',
    pin: el.querySelector('.bel__stage'),
    scrub: 0.4,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      revealWords(words, self.progress);
      cue.style.opacity = (1 - clamp(self.progress * 4)).toFixed(3);
    },
  });

  const overflow = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  const tween = gsap.to(track, {
    x: () => -overflow(),
    ease: 'none',
    scrollTrigger: {
      trigger: el.querySelector('.bel__rail'),
      start: 'top top',
      end: () => '+=' + Math.max(window.innerHeight * 1.4, overflow() * 1.5),
      pin: el.querySelector('.bel__pin'),
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(fill, { scaleX: self.progress }),
    },
    onUpdate: () => focusCentre(cards),
  });

  // As on the speakers rail, a swipe or drag routes back through page scroll.
  bindHorizontalInput(viewport, () => {
    const st = tween.scrollTrigger;
    return (st.end - st.start) / Math.max(1, overflow());
  });

  return el;
}
