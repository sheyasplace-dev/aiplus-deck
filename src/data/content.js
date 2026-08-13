/* ============================================================================
   AI+ SPONSORSHIP MICROSITE — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Every string, number, price, date and asset path on the page lives in this
   file. Layout code in src/sections/ contains no copy. Re-skinning the site for
   a new season means editing this file and nothing else.

   PROVENANCE LEGEND — check before you send this page to anyone.
   ----------------------------------------------------------------------------
   [V]  VERIFIED    Sourced from aiplus.dev, renaissance.aiplus.dev/speakers, or
                    the 9 Mar 2026 GlobeNewswire release. Safe to publish.
   [D]  DERIVED     Computed or counted from [V] data. Safe, but recheck the
                    arithmetic if you edit the underlying list.
   [U]  UNVERIFIED  Carried over from the earlier single-file prototype at
                    aiplus-sponsorship/index.html. These figures were invented
                    for that mockup and have NO source. Replace or delete before
                    this URL goes to a sponsor.
   [T]  TODO        No source exists anywhere. You must supply it.

   Search this file for "[U]" and "[T]" before every send.
   ============================================================================ */

export const meta = {
  title: 'AI+ — Sponsorship',                                          // [V]
  description:                                                          // [D]
    'AI+ convenes the founders, researchers and engineers building this ' +
    'generation of AI. Sponsorship for RenAIssance and the AI+ event series.',
};

// The booking page every "Book a call" on the page points at. One constant so
// a new scheduling link is a one-line change rather than a search.
export const BOOKING =                                                  // [V]
  'https://doodle.com/bp/shreyalahiri/30-mins-discovery-call';

// The enquiry form page. Every "Enquire" on the rate card lands here with the
// tier it came from pre-selected, so the reply already knows what was clicked.
export const ENQUIRY_PAGE = '/enquire.html';

export function enquiryHref(tier) {
  return `${ENQUIRY_PAGE}?tier=${encodeURIComponent(tier)}`;
}

export const brand = {
  name: 'AI+',                                                          // [V]
  // The wordmark, split so the symbol can be raised and scaled against the
  // word. `name` stays the plain-text form for titles and alt text; these two
  // must always concatenate back to it.
  mark: { word: 'AI', symbol: '+' },                                    // [V]
  url: 'aiplus.dev',                                                    // [V]
  email: 'team@aiplus.dev',                                             // [V]
  // [T] A dedicated sponsorship inbox reads better on a rate card than the
  // general team@ address. Create sponsor@aiplus.dev and swap it in here.
};

/* --- 01 HERO ------------------------------------------------------------- */
export const hero = {
  label: 'Partner prospectus',                                // [V]
  // One array element = one masked line. Keep to three lines at most.
  headline: ['The community', 'at the epicenter', 'of AI Renaissance.'], // [D] voice
  // Tinted --blue and set italic. Must match the source text exactly,
  // punctuation included, and sit inside a single line above.
  accent: 'AI Renaissance.',
  body:                                                                 // [V] claims
    '300 events hosted over the past 3 years, ' +
    '50,000+ founders, researchers and investors building and experimenting with AI, ' +
    'One community they all came back to.',
  ctaPrimary: { label: 'Book a call', href: BOOKING },
  ctaSecondary: { label: 'Partnership Tiers', href: '#pricing' },
  // Four-up strip along the fold. Keep to four; five crowds at 1280px.
  strip: [
    { value: '50,000+', label: 'Members' },                             // [V]
    { value: '300+',    label: 'Events run' },                          // [V]
    { value: '2,000+',  label: 'People Connected' },                   // [V]
    { value: '40+',      label: 'Speakers on stage' },                   // [V]
  ],
};

/* --- 03 STATEMENT -------------------------------------------------------- */
// The proposition, stated once at full scale, over the room it describes.
export const statement = {
  eyebrow: 'OUR FLAGSHIP EVENT',  // [U] voice
  // One array element = one masked line. Authors own the breaks.
  headline: ['Connecting', 'the human', 'intelligence', 'behind AI.'],  // [V] verbatim
  // Rendered in --blue wherever it appears in the lines above. Must match the
  // source text exactly or it simply will not highlight.
  accent: 'AI.',
  body:                                                                 // [V] claims
    'Once a year we get everyone in one place in San Francisco — ' +
    'the people building the models, the people building on top of them, ' +
    'and the people funding both. This year that was 2,000 people and ' +
    '30+ speakers. 2027 we go bigger.',
  // This section is the evidence, not the ask — both CTAs send the reader to
  // the event itself and let it make the argument. The booking CTAs in 01 and
  // 12 carry the ask.
  ctaPrimary: {                                                         // [V]
    label: 'Watch the event',
    href: 'https://www.youtube.com/live/smL7H2Z2sTI?si=LX2HvpqlTS1afBQg',
  },
  ctaSecondary: {                                                       // [V]
    label: 'Event page',
    href: 'https://renaissance.aiplus.dev/',
  },
  // Three facts under a hairline. Keep to three; four crowds at 1280px.
  meta: ['15 MARCH 2026', 'THE REGENCY · SF', '2,000 ATTENDEES'],       // [V]

  media: {
    image: '/media/images/Header2.webp',                                // [V]
    // 1600×900. The frame is 21:9, so the crop trims ceiling and foreground
    // heads and holds the stage — which is the part that carries the claim.
    alt: 'A full house at RenAIssance 2026, The Regency, San Francisco — '
      + 'the audience facing the main stage during the opening',        // [V]
    focus: '50% 42%',
    caption: 'RENAISSANCE 2026 · THE REGENCY · 2,000 IN THE ROOM',      // [V]
  },
};

/* --- 02 NUMBERS ---------------------------------------------------------- */
// Count-up on entry. `value` is the number; `prefix`/`suffix` are not animated.
export const numbers = {
  label: 'BY THE NUMBERS',
  items: [
    { value: 50000, suffix: '+', label: 'Community members',   note: 'Founders, researchers, engineers, investors' }, // [V]
    { value: 300,   suffix: '+', label: 'Events run',          note: 'Since inception, SF Bay Area and beyond' },     // [V]
    { value: 2000,  suffix: '+', label: 'At RenAIssance 2026', note: 'One day, The Regency, 15 March 2026' },         // [V]
    { value: 30,    suffix: '+', label: 'Speakers on stage',   note: 'Across main stage and innovation sessions' },   // [U]
    { value: 20,    suffix: '+', label: 'Startups exhibiting', note: 'Demos and live product launches' },             // [U]
  ],
  // [T] The brief asks for a subscriber count. aiplus.dev links a Substack but
  // publishes no number. Pull it from the Substack dashboard and add:
  //   { value: 0, suffix: '+', label: 'Newsletter subscribers', note: 'Weekly' },
};

/* --- 04 WHY WE EXIST ----------------------------------------------------- */
// A manifesto that resolves word by word out of blur as it is scrolled, then
// four beliefs drifting past on a horizontal rail. Ported from the Claude
// Design project "Scroll-driven manifesto with drifting cards".
export const beliefs = {
  label: 'WHY WE EXIST',
  eyebrow: '',
  // Set as one string and split on whitespace — one word, one reveal step.
  // Keep it to about 22 words; past that the last word lands too late.
  manifesto:                                                            // [U] voice
    "We're not in the events business. We're building the room, curating " +
    'the people, the conversations, and the ideas that belong in it.',
  // Tinted --blue. Tokens must match the split word exactly, punctuation
  // included, or they simply will not highlight.
  accentWords: ['room,', 'people,', 'conversations,', 'ideas'],
  cue: '',
  cardLabel: 'WE BELIEVE',

  // ⚠ ALL FOUR ARE [U] — the editorial position, not a sourced claim. They
  // read as house voice and should be confirmed by AI+ before this URL goes
  // out, because a sponsor will quote them back in the call.
  items: [
    {
      title: 'The best talk is a debrief, not a demo',                  // [U]
      text:
        'What broke, what it cost, what you would do differently. ' +
        "That's the stuff people talk about later.",
      image: '/media/images/Renaissance2026_header3.webp',               // [V]
      note: '',
      alt: 'Panel session at RenAIssance 2026 — Video vs. Voice, '
        + 'The Next Default Interface',                                 // [V]
    },
    {
      title: 'Curation is the product',                                 // [U]
      text:
        'Who is in the room determines everything else. We would rather turn ' +
        'people away than dilute it.',
      // [D] Reused from section 09's format preview — the only crowd shot on
      // hand that is not already carrying section 03. Swap in its own frame.
      image: '/media/images/format-renaissance1.jpg',
      note: '',
      alt: 'The audience at RenAIssance 2026 during a main stage session',
    },
    {
      title: 'Small rooms make for the most transparent discussions',      // [U]
      text:
        "It's where an argument goes twenty minutes deep and you leave with " +
        'a better version of your own opinion.',
      image: '/media/images/format-renaissance3.jpg',                     // [V]
      note: '',
      alt: 'Two attendees talking closely at an AI+ event, mid-conversation',
    },
    {
      title: 'Builders set the agenda',                                 // [U]
      text:
        'The events are built from where the people shipping things are stuck ' +
        'on this month. Not a template.',
      // Paths are web roots, not repo paths: public/ IS the server root, so a
      // leading 'public/' here 404s and drops the card to its placeholder.
      image: '/media/images/format-page4.jpeg',                           // [V]
      note: '',
      alt: 'A small evening session in a high-rise room, the group standing '
        + 'against the window at dusk',
    },
  ],
};

/* --- 06 TRACK RECORD ----------------------------------------------------- */
// Horizontal rail, scrubs while pinned. Newest first.
export const trackRecord = {
  label: 'TRACK RECORD',
  // Shown on any card that carries a `link`. One label for all of them, so the
  // rail never reads as a list of differently-worded buttons.
  linkLabel: 'View on Luma',
  items: [
  {
    edition: 'RenAIssance 2026',                                        // [V]
    date: '15 MARCH 2026',                                              // [V]
    venue: 'The Regency, San Francisco',                                // [V]
    stat: '2,000+',                                                     // [V]
    statLabel: 'Attendees',
    detail: '40 speakers · 30 startups exhibiting · agents, multimodal, robotics', // [V]
    image: '/media/images/format-renaissance4.jpg',                                    // [T]
    link: 'https://luma.com/renaissance26',                             // [V]
  },
  {
    edition: 'Multimodal Day',                                          // [V]
    date: 'SF TECH WEEK 2025',                                          // [V]
    venue: 'San Francisco',
    stat: '1,500+',                                                     // [V]
    statLabel: 'Attendees',
    detail: 'Teams from 20 AI unicorns in the room',                    // [V]
    image: '/media/images/track-multimodal.jpg',                               // [T]
    link: 'https://luma.com/b98o42al',                                  // [V]
  },
  // The three below run continuously rather than as dated editions, so `date`
  // carries a cadence and `stat` carries access instead of an attendance
  // figure. A card with no `stat` simply omits that block — see 06-track.js.
  {
    edition: 'Industry discussions',                                    // [V]
    date: 'ONGOING',
    venue: 'SF Bay Area',                                               // [V]
    stat: 'Invite',
    statLabel: 'Only',
    detail:
      'Closed-door panels with engineers and scientists from the AI labs. ' +
      '',
    image: '/media/images/format-panels.jpg',                           // [T]
  },
  {
    edition: 'Founder dinners',                                         // [V]
    date: 'ONGOING',
    venue: 'SF Bay Area',                                               // [V]
    stat: 'Invite',
    statLabel: 'Only',
    detail:
      'Small curated tables on customer acquisition, enterprise partnerships ' +
      'and fundraising. Where the introductions that matter actually happen.',
    image: '/media/images/format-dinners.jpeg',                         // [T]
  },
  {
    edition: 'Hackathon',                                               // [V]
    date: 'EVERY QUARTER',                                              // [T] confirm cadence
    venue: 'Global',
    // [T] No attendance figure exists for these yet. Left empty so the card
    // omits the stat rather than printing an em dash at display size; fill it
    // in and the block returns on its own.
    stat: '',
    statLabel: '',
    detail:
      'A weekend of building, learning and networking. Teams compete to ship.',
    image: '/media/images/format-hackathon.jpg',                        // [T]
  },
  // [T] aiplus.dev cites 300+ events but publishes dated detail on only the
  // first two. Add more with real dates, venues and attendance as you have it.
  ],
};

/* --- 07 PROOF WALL — SIGNATURE SECTION ----------------------------------- */
// Every speaker below is verified against renaissance.aiplus.dev/speakers.
// `image` is a headshot at public/media/speakers/<slug>.jpg — [T] none supplied
// yet, so cells render as --surface tiles with initials until the files land.
export const speakers = [
  { name: 'Parag Agrawal',        title: 'Founder, CEO',            company: 'Parallel Web Systems' },
  { name: 'Michele Catasta',      title: 'President & Head of AI',  company: 'Replit' },
  { name: 'Matt White',           title: 'Global CTO of AI',        company: 'The Linux Foundation' },
  { name: 'Jeff Wang',            title: 'CEO',                     company: 'Windsurf' },
  { name: 'Tanay Kothari',        title: 'Co-founder, CEO',         company: 'Wispr Flow' },
  { name: 'Jorge Torres',         title: 'Co-founder, CEO',         company: 'MindsDB' },
  { name: 'Jason Lopatecki',      title: 'Founder, CEO',            company: 'Arize AI' },
  { name: 'Philip Rathle',        title: 'CTO',                     company: 'Neo4j' },
  { name: 'Lenjoy Lin',           title: 'Co-founder',              company: 'Genspark' },
  { name: 'Ryan Wang',            title: 'Co-founder, CEO',         company: 'Assembled' },
  { name: 'Hassaan Raza',         title: 'Co-founder, CEO',         company: 'Tavus' },
  { name: 'Michael Grinich',      title: 'Founder',                 company: 'WorkOS' },
  { name: 'Michelle Lim',         title: 'Co-founder, CEO',         company: 'Flint' },
  { name: 'Selin Kocalar',        title: 'Co-founder, COO',         company: 'Delve' },
  { name: 'Steve Frey',           title: 'Co-founder, Product',     company: 'AGI, Inc.' },
  { name: 'Josh Sirota',          title: 'Founder, CEO',            company: 'Eragon' },
  { name: 'Karan Vaidya',         title: 'Co-founder',              company: 'Composio' },
  { name: 'Andrew Dai',           title: 'Research Director',       company: 'Gemini' },
  { name: 'Sudheesh Nair',        title: 'Co-founder, CEO',         company: 'TinyFish' },
  { name: 'Nishkarsh Srivastava', title: 'Founder, CEO',            company: 'HydraDB' },
  { name: 'Emily Xue',            title: 'Head of Enterprise AI',   company: 'Scale AI' },
  { name: 'Ankur Bhatt',          title: 'Head of AI',              company: 'Rippling' },
  { name: 'Nathan Xu',            title: 'Co-founder, CEO',         company: 'PLAUD' },
  { name: 'Lynn Duan',            title: 'Founder',                 company: 'AI+' },
  { name: 'Huang Xia',            title: 'Founder of Agent Engine', company: 'Google Cloud AI' },
  { name: 'Sudarshan Kamath',     title: 'Co-founder, CEO',         company: 'Smallest.ai' },
  { name: 'Joshua Sum',           title: 'Co-founder',              company: 'AI+' },
  { name: 'Linda Sheng',          title: 'GM, Global Business',     company: 'Minimax' },
  { name: 'Akash Saraf',          title: 'Founder, CEO',            company: 'TheAgentic' },
  { name: 'Denise Umubyeyi',      title: 'Head of Partnerships',    company: 'AGI, Inc.' },
  { name: 'Aiswarya Sankar',      title: 'Founder, CEO',            company: 'Entelligence.AI' },
  { name: 'Spencer Liu',          title: 'Founder, CEO',            company: 'CloudMile' },
  { name: 'Mike Smith',           title: 'Staff Software Engineer', company: 'Google A2A' },
  { name: 'Wei Wei',              title: 'Managing Director',       company: 'Accenture' },
  { name: 'Vinod Joseph',         title: 'Investor',                company: 'Samsung NEXT' },
  { name: 'Peter Pan',            title: 'Founder, Managing Partner', company: 'Hat-Trick Capital' },
  { name: 'Shaheen Lavie-Rouse',  title: 'Forward Deployed Engineer', company: 'ElevenLabs' },
  { name: 'Brian Zhan',           title: 'General Partner',         company: 'Striker VC' },
  { name: 'Wanzheng Zhu',         title: 'Software Engineer',       company: 'Google DeepMind' },
  { name: 'Paula Vivas',          title: 'Head of US Marketing',    company: 'Freepik' },
]; // [V] all 40, verbatim from the official speakers page

// Companies in the room. `domain` is the logo lookup key.
//
// Each company resolves to public/media/logos/<domain>.png, fetched once by
// `node scripts/fetch-logos.mjs`. No file → the name renders as a wordmark, so
// the wall is never broken and never has a gap.
//
// To use a hand-made vector instead, add `logo: 'name.svg'` to that company
// and drop the file in the same folder.
export const companies = [                                              // [V]
  { name: 'Google DeepMind',      domain: 'deepmind.google' },
  { name: 'Replit',               domain: 'replit.com' },
  { name: 'Scale AI',             domain: 'scale.com' },
  { name: 'Salesforce',           domain: 'salesforce.com' },
  { name: 'Cisco',                domain: 'cisco.com' },
  { name: 'Accenture',            domain: 'accenture.com' },
  { name: 'ElevenLabs',           domain: 'elevenlabs.io' },
  { name: 'Neo4j',                domain: 'neo4j.com' },
  { name: 'Rippling',             domain: 'rippling.com' },
  { name: 'WorkOS',               domain: 'workos.com' },
  { name: 'Windsurf',             domain: 'windsurf.com' },
  { name: 'Andreessen Horowitz',  domain: 'a16z.com' },
  { name: 'Parallel Web Systems', domain: 'parallel.ai' },
  { name: 'The Linux Foundation', domain: 'linuxfoundation.org' },
  { name: 'Composio',             domain: 'composio.dev' },
  { name: 'MindsDB',              domain: 'mindsdb.com' },
  { name: 'Genspark',             domain: 'genspark.ai' },
  { name: 'Assembled',            domain: 'assembled.com' },
  { name: 'Tavus',                domain: 'tavus.io' },
  { name: 'Wispr Flow',           domain: 'wisprflow.ai' },
  { name: 'Delve',                domain: 'getdelve.com' },
  { name: 'AGI, Inc.',            domain: 'agi.inc' },
  { name: 'Minimax',              domain: 'minimax.io' },
  { name: 'PLAUD',                domain: 'plaud.ai' },
  { name: 'TinyFish',             domain: 'tinyfish.ai' },
  { name: 'Smallest.ai',          domain: 'smallest.ai' },
  { name: 'Entelligence.AI',      domain: 'entelligence.ai' },
  { name: 'CloudMile',            domain: 'mile.cloud' },
  { name: 'Flint',                domain: 'flintk12.com' },
  { name: 'TheAgentic',           domain: 'theagentic.ai' },
  { name: 'Freepik',              domain: 'freepik.com' },
  { name: 'Samsung NEXT',         domain: 'samsungnext.com' },
  { name: 'NVIDIA',               domain: 'nvidia.com' },
  { name: 'Rho',                  domain: 'rho.co' },
  { name: 'Fireworks AI',         domain: 'fireworks.ai' },
  { name: 'Bespoke Labs',         domain: 'bespokelabs.ai' },
  { name: 'LangChain',            domain: 'langchain.com' },
  // Domains below were not confirmed against the speaker list, so they are
  // marked so no possibly-unrelated mark is ever fetched for them. Confirm the
  // domain and delete `unconfirmed` to let a logo load.
  { name: 'HydraDB',              domain: 'hydradb.com',          unconfirmed: true },
  { name: 'Eragon',               domain: 'eragon.ai',            unconfirmed: true },
  { name: 'Emergence Capital',    domain: 'emcap.com',            unconfirmed: true },
];

/* --- 08 SPEAKERS — scroll marquee ---------------------------------------- */
// A horizontal gallery of portraits drawn from the `speakers` array above, so
// there is one speaker list on the site and no chance of the two disagreeing.
//
// `feature` picks which of the 40 appear here. A rail of all 40 would run to
// roughly 13,000px and swallow the middle of the page; 07 already shows the
// full set as a dense grid, and this section is the close-up. Add or remove
// names to change the cut — with none flagged it falls back to all 40.
export const speakerShowcase = {
  label: 'NETWORK',
  // One array element = one masked line. Authors own the breaks, so the comma
  // belongs at the end of the first line — not at the head of the second.
  heading: ['The world’s top AI leaders,', 'under one roof.'],
  sub:                                                                  // [D] voice
    'Founders, product leaders, and researchers from the labs and companies ' +
    'actually shipping it.',
  scrollLabel: 'SCROLL',
  // The first 13 of the 40, in the order renaissance.aiplus.dev/speakers runs
  // them — which is the order the event itself bills them in. Every one has a
  // portrait on disk; the rail is only as good as its weakest photo, so add a
  // name here only once its file exists.
  feature: [                                                            // [V]
    'Parag Agrawal',
    'Michele Catasta',
    'Matt White',
    'Jeff Wang',
    'Tanay Kothari',
    'Jorge Torres',
    'Jason Lopatecki',
    'Philip Rathle',
    'Lenjoy Lin',
    'Ryan Wang',
    'Hassaan Raza',
    'Michael Grinich',
    'Michelle Lim',
  ],
  // Portraits live at public/media/speakers/<slug>.jpg, slug derived from the
  // name — e.g. parag-agrawal.jpg. All 13 above are in place, sourced from the
  // official speakers page and cropped to the card's 3:4 at 600×800. [V]
  // A missing file falls back to a labelled placeholder card rather than a
  // broken image, so the rail survives a name added ahead of its photo.
};

export const proof = {
  label: 'ECOSYSTEM',
  heading: 'Companies we have worked with.',
  // The line the wall resolves into. Counts are [D] — 41 is companies.length
  // and 40 is speakers.length. Recount if you edit either array.
  resolve: ['41+ COMPANIES', '40+ SPEAKERS', '2,000+ PEOPLE CONNECTED'],
  footnote: '',

  logos: {
    // Marks are self-hosted in public/media/logos/, fetched once by
    // `node scripts/fetch-logos.mjs`. Re-run it after adding companies.
    //
    // Remote lookup stays off: it would mean third-party requests firing from
    // a page you send cold to sponsors, and every free logo API either needs a
    // key or has been shut down. Leave this false unless you have a key.
    useRemote: false,
    remote: [],
    // Anything resolving smaller than this is rejected — an upscaled 16px
    // favicon in a 32px slot looks worse than the wordmark.
    minPx: 32,
  },
};

/* --- 08 WHO'S IN THE ROOM — most important section ----------------------- */
export const audience = {
  label: "WHO'S IN THE ROOM",
  heading: 'Why this audience matters.',
  // ⚠ EVERY PERCENTAGE BELOW IS [U] — invented for the earlier prototype and
  // carried forward only so the bars have something to animate. aiplus.dev
  // publishes no audience breakdown. This is the most load-bearing evidence on
  // the page and the first thing a sponsor will interrogate. Export the real
  // split from your RenAIssance 2026 registration data before sending.
  source: '',
  breakdowns: [
    {
      title: 'By role',
      // Each breakdown is bound to one arrangement of the dot field. The
      // section cycles these in order, continuously.
      layout: 'cloud',
      segments: [
        { label: 'Founder / CEO',           pct: 41 },                  // [U]
        { label: 'Engineering / Research',  pct: 28 },                  // [U]
        { label: 'Product leaders',         pct: 20 },                  // [U]
        { label: 'Investor',                pct: 11 },                  // [U]                 // [U]
      ],
    },
    {
      title: 'By company stage',
      layout: 'ring',
      segments: [                 // [U]
        { label: 'Series A',                pct: 24 }, 
        { label: 'Series B / C',            pct: 22 },                 // [U]
        { label: 'Enterprise / Fortune',    pct: 17 },
        { label: 'Pre-seed / Seed',         pct: 17 },                  // [U]                  // [U]
        { label: 'Series D+ / Public',      pct: 12 },                  // [U]
        { label: 'Frontier labs',           pct: 8 },                   // [U]
      ],
    },
    {
      title: 'By seniority',
      layout: 'clusters',
      segments: [
        { label: 'C-suite / Founder',       pct: 38 },                  // [U]
        { label: 'Director / Lead',         pct: 22 },                  // [U]
        { label: 'VP / Head of',            pct: 18 },                  // [U]
        { label: 'Senior IC',               pct: 15 },                  // [U]
        { label: 'Junior / Student',        pct: 7 },                   // [U]
      ],
    },
  ],
  // --- What the room talked about ------------------------------------------
  // Sits at the foot of the section, where the company pill list used to be.
  // The logo evidence now lives once, in section 07, rather than twice.
  //
  // ⚠ EVERY COUNT BELOW IS [U] — placeholder weights so the cloud has a
  // hierarchy. Derive the real ones by tagging the RenAIssance 2026 talk and
  // panel titles, then update `footnote` with the true number of sessions.
  themes: {
    label: 'THEMES THAT COME UP FREQUENTLY',
    footnote: '',                // [U]
    items: [
      { label: 'Agent reliability',        count: 14 },                  // [U]
      { label: 'Long-horizon memory',      count: 12 },                  // [U]
      { label: 'Evals that matter',        count: 11 },                  // [U]
      { label: 'Cost per task',            count: 10 },                  // [U]
      { label: 'Tool-use protocols',       count: 9 },                   // [U]
      { label: 'Multi-agent orchestration', count: 8 },                  // [U]
      { label: 'Human-in-the-loop',        count: 7 },                   // [U]
      { label: 'Open weights',             count: 7 },                   // [U]
      { label: 'Security & permissions',   count: 6 },                   // [U]
      { label: 'Latency budgets',          count: 5 },                   // [U]
      { label: 'Synthetic data',           count: 4 },                   // [U]
      { label: 'Regulation & policy',      count: 4 },                   // [U]
    ],
  },

  // --- Particle field ------------------------------------------------------
  // The breakdowns render as a canvas dot field, one dot per attendee, so
  // `dots` should match the room size in `numbers` — 2,000 at RenAIssance
  // 2026. Change one, change the other.
  //
  // The field cycles the breakdowns continuously, morphing into each one's
  // bound `layout`. There are no controls; `hold` is how long each breakdown
  // rests after its transition settles.
  viz: {
    dots: 2000,                                                         // [V]
    hold: 2600,
    // Shown instead of the canvas under reduced-motion / ?static=1.
    staticNote: 'Animation disabled. Percentages below are the same data.',
  },
};

/* --- 09 TESTIMONIALS ----------------------------------------------------- */
// [T] NO SPONSOR TESTIMONIALS EXIST. The earlier prototype contained three
// invented quotes attributed to "[Sponsor name]". They are deliberately NOT
// carried forward — fabricated testimonials in a cold sponsorship pitch are a
// real liability. Add real, attributed quotes here or the section stays hidden.
// The section renders nothing while this array is empty.
export const testimonials = {
  label: 'WHAT SPONSORS SAY',
  items: [
    // { quote: '…', name: '…', role: '…', company: '…' },
    // Keep quotes short. They are set at display scale, so anything over about
    // 140 characters stops reading as a quote and starts reading as a
    // paragraph. Three is the right number; two reads thin, four repeats.
  ],
};

/* --- 10 PRICING — STATIC ------------------------------------------------- */
export const pricing = {
  label: 'PARTNERSHIP TIERS',
  heading: 'Ways to partner with us.',
  // ⚠ [U] The price ladder below came from the earlier prototype and has no
  // source. It is consistent with the $5,000+ target in the brief, but every
  // figure and every deliverable needs your confirmation before sending.
  note: '[U] CONFIRM ALL PRICES AND DELIVERABLES',
  // Sub-heading under the section heading. Scopes which edition the ladder
  // applies to, so nobody assumes one price covers every city.
  detail:
    'Pricing below is subject to change and availability.',
  tiers: [
    {
      name: 'Co-host',
      price: '$3,000+',                                                  // [U]
      unit: 'PER EDITION',
      summary: 'You host. We fill the room and promote the event better.',
      includes: [                                                       // [U] all
        // <strong> is the one tag allowed in a deliverable line. It sets Inter
        // 500 — the weight the type system reserves for figures — so the number
        // carries without reaching for a bold the palette does not have.
        'Listed and promoted on our Luma — <strong>70,000+ followers</strong>',
        'Featured in On the Record, our newsletter — <strong>43,000+ subscribers</strong>',
        'Pushed through our community WhatsApp groups and social channels',
        'Help attracting attendees through your own network and channels',
        'Pricing depends on the size of the room and the number of co-hosts. Reach out for a quote.',
      ],
      cta: { label: 'Enquire', href: enquiryHref('Co-host') },
      featured: false,
    },
    {
      name: 'Programming Partner',
      price: '$10,000+',                                                // [U]
      unit: 'PER EDITION',
      badge: 'MOST TAKEN',
      summary: 'You pick the topic. We build the entire event around it. Most companies land here.',
      includes: [                                                       // [U] all
        'Full production: venue, catering, seating, format design and on-site run',
        'Guest list built to your spec — researchers, developers, investors, founders, or a deliberate mix',
        'Topic and format shaped with you, so the conversation lands where your product does',
        'Promoted across Luma, the newsletter, LinkedIn and community channels, before and after',
        'Post-event follow-up: warm intros from the room',
        'Attendee list post-event (opt-in only)',
      ],
      cta: { label: 'Enquire', href: enquiryHref('Programming Partner') },
      featured: true,
    },
    {
      name: 'Custom',
      // No figure to show, but the line still renders so all three cards keep
      // the same internal rhythm. Never leave this empty — it collapses the row
      // and knocks the summaries and lists out of alignment.
      price: 'On request',
      unit: 'LIMITED · SCOPED WITH YOU',
      summary: 'If you have something else in mind, we build a custom package around it. Limited availability.',
      includes: [                                                       // [U] all
        'An event that doesn’t fit the shapes above — we design and build it with you',
        'Or you come in as a sponsor for RenAIssance 2027, our San Francisco flagship',
        'Last edition: 30+ speakers, 2,000+ attendees, 20+ sponsors. 2027 is being built bigger',
        'Best for teams buying category presence, not a single evening',
      ],
      cta: { label: 'Enquire', href: enquiryHref('Custom') },
      featured: false,
    },
  ],
  footnote: '',
};

/* --- ENQUIRY FORM (enquire.html) -----------------------------------------
   Standalone page, not a section. Every "Enquire" on the rate card lands here.

   ⚠ DELIVERY: a static site cannot send mail on its own. With `endpoint` null,
   submitting opens the sender's mail client with a pre-filled message to
   `to` — reliable everywhere, but it only leaves their outbox if they press
   send in that client, and it will not work for someone with no mail client
   configured (a webmail-only browser).

   To make it a true background submit, stand up a form endpoint (Formspree,
   Basin, a Worker — anything that accepts a JSON POST) and put the URL in
   `endpoint`. The page then POSTs and shows the success state inline, with the
   mailto path kept as the fallback if the POST fails.                       */
export const enquiry = {
  endpoint: null,                                                       // [T]
  to: brand.email,
  label: 'PARTNERSHIP ENQUIRY',
  heading: 'Tell us what you need.',
  body:
    'What you’re building, who you want in the room, what you want them ' +
    'thinking when they leave. We’d love to hear from you, and we reply ' +
    'within two working days.',
  back: { label: 'Back to the prospectus', href: '/' },
  // `key` is the field name in the email body; `name` is the form control name.
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, autocomplete: 'name' },
    { name: 'email', label: 'Work email', type: 'email', required: true, autocomplete: 'email' },
    { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization' },
    {
      name: 'query',
      label: 'What are you looking for?',
      type: 'textarea',
      required: true,
      rows: 6,
      placeholder:
        'Which edition, roughly what budget, and what a good outcome looks like for you.',
    },
  ],
  // Rendered as a read-only line when the page is opened from a tier CTA.
  tierLabel: 'TIER',
  tierFallback: 'Not specified',
  submit: 'Send enquiry',
  sending: 'Sending…',
  subject: 'AI+ sponsorship enquiry',
  success: {
    heading: 'Thanks — that’s with us.',
    body: 'We reply within two working days. If it’s urgent, book a call instead.',
    cta: { label: 'Book a call', href: BOOKING },
  },
  // Shown when the mail client is the delivery path, so nobody assumes the
  // form sent something it did not.
  handoff: {
    heading: 'One more step.',
    body:
      'Your mail client is opening with the message filled in. Press send there ' +
      'and it reaches us. If nothing opened, email us directly.',
  },
  error: 'That didn’t go through. Email us directly and we’ll pick it up.',
  required: 'This field is required.',
  invalidEmail: 'Enter a valid email address.',
};

/* --- 11 FAQ -------------------------------------------------------------- */
export const faq = {
  label: 'QUESTIONS',
  items: [
    {
      q: 'Who actually attends?',
      a: 'Founders, researchers, engineers, product managers and investors ' +
         'from across the AI ecosystem.',                                 // [V]
    },
    {
      q: 'What do we optimise our programmes for?',
      a: 'Enterprise pipeline · Developer adoption · Hiring · Launch ' +
         'visibility · Category positioning · Peer networking · Something ' +
         'else, as the need calls for it.',                               // [V]
    },
    {
      q: 'Do we get the attendee list?',
      a: 'Opt-in only, at every tier. Attendees choose whether to share details ' +
         'with sponsors. It is a smaller list than a scraped one and a far better one.', // [U] confirm policy
    },
    {
      q: 'Can we run our own session?',
      a: 'Yes — that\'s the whole point of Programming Partner. You bring the ' +
   'topic and we build the event around it: format, speakers, guest list. ' +
   'Co-hosts run their own programming and we help fill the room to an extent by marketing it to our community. ' +
   'Curated Product launches are always welcome — just tell us what ' +
   'you\'re launching so we can build the audience for it.',      // [V] format
    },
    {
      q: 'Do you run events outside San Francisco?',
      a: 'We are expanding our reach and planning events in other cities. We are pre-dominantly based out of SF at the momentbut have hosted events in Bengaluru too. ',            // [T]
    },
  ],
};

/* --- 12 CLOSE ------------------------------------------------------------ */
export const close = {
  headline: ['Be in the room', 'that ships AI.'],
  // ⚠ [T] RenAIssance 2026 was 15 March 2026 — already past as of August 2026.
  // This page is selling the NEXT edition. Supply its date, venue and ticket
  // link. Everything below is a placeholder and MUST be replaced.
  date: ' RENAISSANCE 2027 · DATE - March, 2027',
  venue: 'VENUE TBC · SAN FRANCISCO',
  body: 'Tell me what you\'re trying to pull off and I\'ll tell you honestly whether we\'re the right room for it.',
  ctaPrimary: { label: 'Book a call', href: BOOKING },
  ctaSecondary: { label: 'team@aiplus.dev', href: 'mailto:team@aiplus.dev' },

  // [T] Fill `start` and `end` and an "Add to calendar" button appears next to
  // the CTAs automatically. Leave `start` empty and it stays hidden — better no
  // button than one that adds a wrong date to a sponsor's calendar.
  // Format: UTC, YYYYMMDDTHHMMSSZ. e.g. '20270315T160000Z'
  calendar: {
    label: 'Add to calendar',
    start: '',
    end: '',
    title: 'AI+ RenAIssance — sponsorship hold',
    location: 'San Francisco',
    details: 'Sponsorship conversation with AI+. https://aiplus.dev',
  },

  footer: `© ${new Date().getFullYear()} AI+ · aiplus.dev`,
};

/* --- Section labels for the 01/12 counters ------------------------------- */
export const sectionCount = 12;
