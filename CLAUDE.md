# AI+ Sponsorship Microsite

Scroll-driven single-page sponsorship pitch for AI+ (aiplus.dev). One cold URL sent to a
marketing lead, DevRel lead, or founder. 3–4 minutes on page → book a call or forward
internally. Target sponsorship $5,000+.

**The page has one job:** answer *who is in the room, and can these people deliver them* so
thoroughly it stops being a question. The argument is evidence — attendee numbers, audience
breakdown, named speakers, photos of real crowded rooms, sponsor testimonials — resolving
into a rate card with real prices. Polish buys credibility; specifics buy the cheque.

---

## Rule 1 — Content lives in exactly one file

**ALL copy, stats, speakers, logos, tiers, and prices live in `src/data/content.js`.**

Layout code never contains a hardcoded string. Not a heading, not a label, not a number,
not an alt attribute, not a CTA. Sections import from `content.js` and build their DOM from
it. `index.html` contains no copy.

The test: changing the event, the prices, or the speaker list means editing that one file
and nothing else. This site is re-skinned every season.

## Rule 2 — Type

- **Display:** Switzer (Fontshare), **weight 300**, tracking `-0.02em`, set very large.
  Hero at `clamp(3.5rem, 9vw, 8rem)`. Whisper-weight at huge scale is the entire move.
  **Never reach for bold.** No weight above 400 anywhere in display.
- **Body:** Inter 400/500, `1.05rem`, line-height `1.55`, max-width `62ch`.
- **Data:** Inter 500, uppercase, `0.72rem`, tracking `0.1em`. **Every** number, price, date,
  tier name, and section label uses this style.

## Rule 3 — Palette: exactly these seven, nothing else

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FDFCFC` | page |
| `--surface` | `#F4F5F8` | alternating bands, cards |
| `--ink` | `#0A0A0B` | primary type |
| `--ink-mute` | `#6E7078` | captions, secondary |
| `--rule` | `#E5E6EA` | hairlines |
| `--blue` | `#0447FF` | accent: CTA, links, active states, chart fills |
| `--blue-soft` | `#E8EDFF` | tints, badges, bar tracks |

No other colours. No `rgba()` improvisation, no opacity-faded ink to invent a new grey —
use `--ink-mute`. Blue appears on **under 5%** of the page.

## Rule 4 — Surface

- Hairline `1px` borders only. **No shadows. No gradients.**
- Cards `16px` radius. Buttons fully pilled.
- Section padding `clamp(96px, 14vh, 200px)`.

## Rule 5 — Motion

Tokens: `duration 1.1`, `ease power3.out`, `y 24`, `stagger 0.06`.

**Entrance only.** No parallax on text. No elastic, no bounce. No hover effect that shifts
layout. Headlines reveal **masked line-by-line** (clipped wrapper per line, inner translateY
out) — **never a plain fade**.

Two kill switches, both mandatory on every animated section:
- `prefers-reduced-motion: reduce`
- `?static=1` URL param

Under either, everything renders in its final state. Nothing depends on a scroll event to
become visible or readable.

**Section 10 (Pricing) is static.** One fade, nothing else. Readers are comparing and
screenshotting; motion fights that.

## Rule 6 — Stack

Vite vanilla JS · GSAP + ScrollTrigger · Lenis · plain CSS custom properties.

**No React. No Tailwind. No Three.js. Do not add a dependency without asking.**

## Rule 7 — Files

One file per section in `src/sections/`, each exporting `init()`. **Each under 150 lines.**
Co-located CSS (`01-hero.css` imported by `01-hero.js`). Shared primitives in `src/lib/`
(reveal, countup, motion guards) — if two sections need the same behaviour, it goes in
`lib/`, not copy-pasted.

```
index.html            shell only, no copy
src/
  main.js             Lenis + ScrollTrigger wiring, imports section init()s
  data/content.js     ← the only file with strings
  styles/             tokens.css, base.css
  lib/                smooth.js, reveal.js, countup.js, motion.js
  sections/           01-hero.{js,css} … 12-close.{js,css}
public/media/         photos, headshots, logos, video
```

## Rule 8 — How we work

Build **one section at a time and stop** so it can be checked in the browser. Section 01 is
the reference — everything inherits its type scale and reveal behaviour. Get it exactly
right before moving on.

## Notes

- Node is at `~/.nvm/versions/node/v24.19.0/bin/node` — not on the default sandbox PATH.
- `aiplus-sponsorship/index.html` is a superseded single-file prototype kept for reference.
  It does **not** follow this palette or type system. Do not copy from it uncritically.
