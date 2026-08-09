/* ============================================================================
   FETCH LOGOS — one-time asset grab into public/media/logos/<domain>.png
   ----------------------------------------------------------------------------
   Run:  node scripts/fetch-logos.mjs
   Re-run any time you add companies to src/data/content.js; existing files are
   kept unless you pass --force.

   Self-hosting rather than hot-linking is deliberate. A sponsorship page
   should not fire third-party requests at load, should not break when a logo
   CDN changes its terms, and should not depend on an API key to render.
   ============================================================================ */

import { writeFile, mkdir, readdir } from 'node:fs/promises';
import { companies } from '../src/data/content.js';

const OUT = new URL('../public/media/logos/', import.meta.url);
const MIN_BYTES = 700;
const force = process.argv.includes('--force');

// All are tried and the largest result wins — favicon services vary wildly in
// what they return per domain, so first-hit would leave 16px marks on the wall.
// apple-touch-icon comes off the company's own origin and is usually 180px+.
const sources = (d) => [
  `https://${d}/apple-touch-icon.png`,
  `https://${d}/apple-touch-icon-precomposed.png`,
  `https://unavatar.io/${d}?fallback=false`,
  `https://www.google.com/s2/favicons?sz=256&domain=${d}`,
  `https://icons.duckduckgo.com/ip3/${d}.ico`,
];

/** Pixel width from a PNG IHDR, else 0 — enough to rank candidates. */
function pngWidth(buf) {
  const isPng = buf.length > 24 && buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG';
  return isPng ? buf.readUInt32BE(16) : 0;
}

async function grab(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(12000) });
    if (!res.ok) return null;
    if (!(res.headers.get('content-type') || '').startsWith('image/')) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.length >= MIN_BYTES ? buf : null;
  } catch {
    return null;
  }
}

/** Best of every source that responded, ranked by pixel width then weight. */
async function best(domain) {
  const got = (await Promise.all(sources(domain).map(grab))).filter(Boolean);
  if (!got.length) return null;
  return got.sort((a, b) => pngWidth(b) - pngWidth(a) || b.length - a.length)[0];
}

await mkdir(OUT, { recursive: true });
const existing = new Set(await readdir(OUT).catch(() => []));

let saved = 0;
const missing = [];

for (const c of companies) {
  const file = `${c.domain}.png`;

  // Never fetch a mark for a domain we only guessed — the wrong company's
  // logo on a sponsorship page is worse than no logo at all.
  if (c.unconfirmed) {
    console.log(`  skip ${c.name} (unconfirmed domain)`);
    continue;
  }
  if (!force && existing.has(file)) { saved++; continue; }

  const buf = await best(c.domain);

  if (buf) {
    await writeFile(new URL(file, OUT), buf);
    saved++;
    console.log(`  ok   ${c.name}`);
  } else {
    missing.push(c.name);
    console.log(`  --   ${c.name} (wordmark fallback)`);
  }
}

console.log(`\n${saved}/${companies.length} logos on disk.`);
if (missing.length) {
  console.log(`No mark found for: ${missing.join(', ')}`);
  console.log('These render as wordmarks. Drop a file at public/media/logos/<domain>.png or .svg to fix.');
}
