/* ============================================================================
   MAIN — boots smooth scroll, applies the static-mode flag, and mounts each
   section in order. Sections are the only thing that touch content.js.
   ============================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/base.css';
import { meta } from './data/content.js';
import { applyStaticFlag } from './lib/motion.js';
import { initSmoothScroll } from './lib/smooth.js';

import * as hero from './sections/01-hero.js';
import * as room from './sections/02-room.js';
import * as numbers from './sections/03-numbers.js';
import * as why from './sections/04-why.js';
import * as audience from './sections/05-audience.js';
import * as track from './sections/06-track.js';
import * as proof from './sections/07-proof.js';
import * as speakers from './sections/08-speakers.js';
import * as formats from './sections/09-formats.js';
import * as testimonials from './sections/10-testimonials.js';
import * as pricing from './sections/11-pricing.js';
import * as faq from './sections/12-faq.js';
import * as close from './sections/13-close.js';

gsap.registerPlugin(ScrollTrigger);

function applyMeta() {
  document.title = meta.title;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = meta.description;
}

function boot() {
  applyMeta();

  const staticMode = applyStaticFlag();
  initSmoothScroll(staticMode);

  const mount = document.getElementById('app');

  // Order here is the order on the page. A section may return null to opt out
  // of rendering entirely — see 09, which hides itself when it has no quotes.
  const sections = [
    hero, room, numbers, why, audience, track, proof,
    speakers, formats, testimonials, pricing, faq, close,
  ];
  sections.forEach((section) => section.init(mount, staticMode));

  // Dev-only: flag [U]/[T] placeholders on the page, and any audience
  // breakdown whose percentages do not total 100.
  if (import.meta.env.DEV) {
    Promise.all([import('./lib/audit.js'), import('./data/content.js')]).then(
      ([audit, content]) => {
        audit.auditPlaceholders();
        audit.auditBreakdowns(content.audience.breakdowns);
      },
    );
  }

  // Sections mount synchronously but webfonts settle after; one refresh once
  // metrics are final keeps every trigger position honest.
  if (!staticMode) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() =>
      ScrollTrigger.refresh(),
    );
  }
}

boot();
