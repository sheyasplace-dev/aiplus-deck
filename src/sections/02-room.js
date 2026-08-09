/* ============================================================================
   02 THE ROOM — the first evidence, landing straight after a section with no
   image at all. An inset rounded panel rather than a full bleed: held in from
   the page margins, capped short of --maxw, photo sitting on a --surface mat.

   Two media paths, chosen by content.js:
   · room.video set → scroll-scrubbed video, currentTime driven by progress
   · otherwise      → still image, revealed with a clip wipe
   Neither asset present → a --surface block at the right ratio, so layout and
   timing stay reviewable before the photography lands.
   ============================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { room } from '../data/content.js';
import { MOTION } from '../lib/motion.js';
import './02-room.css';

function media() {
  if (room.video) {
    return `<video class="room__media" src="${room.video}"
              muted playsinline preload="auto" aria-label="${room.alt}"></video>`;
  }
  return `<img class="room__media" src="${room.image}" alt="${room.alt}"
            style="object-position:${room.focus}"
            decoding="async" fetchpriority="high">`;
}

function render() {
  const el = document.createElement('section');
  el.className = 'section-bleed room';
  el.id = 'room';

  el.innerHTML = `
    <figure class="room__panel">
      <div class="room__frame">
        ${media()}
        <figcaption class="room__caption data">${room.caption}</figcaption>
      </div>
    </figure>
  `;

  // No asset on disk yet: fall back to the placeholder ground rather than a
  // broken-image icon.
  const asset = el.querySelector('.room__media');
  asset.addEventListener('error', () => {
    el.classList.add('room--placeholder');
    asset.remove();
  });

  return el;
}

/** Drives video.currentTime from scroll progress while the section is pinned. */
function scrubVideo(el) {
  const video = el.querySelector('video');
  if (!video) return;

  const seek = (progress) => {
    if (!video.duration) return;
    video.currentTime = video.duration * progress;
  };

  ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    end: '+=150%',
    pin: true,
    scrub: 0.4,
    onUpdate: (self) => seek(self.progress),
  });
}

export function init(mount, staticMode) {
  const el = render();
  mount.appendChild(el);

  const panel = el.querySelector('.room__panel');
  const asset = el.querySelector('.room__media');
  const caption = el.querySelector('.room__caption');

  if (staticMode) return el;

  // Panel arrives first, on the standard y/opacity entrance — the mat is the
  // frame the wipe then plays inside.
  gsap.fromTo(
    panel,
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );

  // Clip wipe rather than a fade — same masked vocabulary as the headlines.
  // Runs on the media, not the frame, so the frame's radius keeps clipping
  // the corners while the inset animates.
  gsap.fromTo(
    asset || panel,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: MOTION.dur,
      ease: MOTION.ease,
      delay: 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );

  gsap.fromTo(
    caption,
    { y: MOTION.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.dur,
      ease: MOTION.ease,
      delay: 0.25,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );

  scrubVideo(el);

  return el;
}
