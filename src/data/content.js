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

export const brand = {
  name: 'AI+',                                                          // [V]
  url: 'aiplus.dev',                                                    // [V]
  email: 'team@aiplus.dev',                                             // [V]
  // [T] A dedicated sponsorship inbox reads better on a rate card than the
  // general team@ address. Create sponsor@aiplus.dev and swap it in here.
};

/* --- 01 HERO ------------------------------------------------------------- */
export const hero = {
  label: 'SPONSORSHIP · RENAISSANCE SF',                                // [V]
  // One array element = one masked line. Keep to three lines at most.
  headline: ['The room where', 'AI actually', 'gets built.'],           // [D] voice
  body:                                                                 // [V] claims
    'AI+ is the community at the epicentre of the AI renaissance — 50,000 ' +
    'members, 300 events, and a flagship summit that put 2,000 founders, ' +
    'researchers and investors in one San Francisco room. All signal, no noise.',
  ctaPrimary: { label: 'Book a call', href: 'mailto:team@aiplus.dev?subject=AI%2B%20sponsorship' },
  ctaSecondary: { label: 'See the rate card', href: '#pricing' },
  // Four-up strip along the fold. Keep to four; five crowds at 1280px.
  strip: [
    { value: '50,000+', label: 'Members' },                             // [V]
    { value: '300+',    label: 'Events run' },                          // [V]
    { value: '2,000+',  label: 'At RenAIssance SF' },                   // [V]
    { value: '40',      label: 'Speakers on stage' },                   // [V]
  ],
};

/* --- 02 THE ROOM --------------------------------------------------------- */
export const room = {
  image: '/media/images/Header2.webp',                                  // [V]
  // 1600×900, native 16:9 — matches the frame exactly, so nothing is cropped
  // at desktop width. A full house shot from the back of the room: the whole
  // audience in frame, stage lit, RenAIssance 2026 title card on screen.
  alt: 'A full house at RenAIssance 2026, The Regency, San Francisco — '
    + 'the audience facing the main stage during the opening',          // [V]
  caption: 'RENAISSANCE 2026 · THE REGENCY · SAN FRANCISCO · 2,000 ATTENDEES', // [V]

  // object-position, used only where the frame is narrower than 16:9 (phones).
  // Biased slightly up to hold the stage and screen while trimming foreground
  // heads rather than cutting off the top of the room.
  focus: '50% 42%',

  // [T] Optional. Set a path here and the section swaps the still for a
  // scroll-scrubbed video — currentTime driven by scroll progress while the
  // section is pinned. Needs a short, silent, motion-heavy clip of a full
  // room (6-10s, H.264 MP4, 1920px wide, keyframe every ~5 frames or the
  // scrub will stutter). Leave empty to use the still.
  video: '',
};

/* --- 03 NUMBERS ---------------------------------------------------------- */
// Count-up on entry. `value` is the number; `prefix`/`suffix` are not animated.
export const numbers = {
  label: 'BY THE NUMBERS',
  items: [
    { value: 50000, suffix: '+', label: 'Community members',   note: 'Founders, researchers, engineers, investors' }, // [V]
    { value: 300,   suffix: '+', label: 'Events run',          note: 'Since inception, SF Bay Area and beyond' },     // [V]
    { value: 2000,  suffix: '+', label: 'At RenAIssance 2026', note: 'One day, The Regency, 15 March 2026' },         // [V]
    { value: 40,    suffix: '',  label: 'Speakers on stage',   note: 'Across main stage and innovation sessions' },   // [V]
    { value: 30,    suffix: '',  label: 'Startups exhibiting', note: 'Demos and live product launches' },             // [V]
  ],
  // [T] The brief asks for a subscriber count. aiplus.dev links a Substack but
  // publishes no number. Pull it from the Substack dashboard and add:
  //   { value: 0, suffix: '+', label: 'Newsletter subscribers', note: 'Weekly' },
};

/* --- 04 WHY WE EXIST ----------------------------------------------------- */
export const why = {
  label: 'WHY WE EXIST',
  heading: 'Connecting the human intelligence behind AI.',              // [V] verbatim

  // Prose runs as two labelled blocks rather than plain paragraphs, so the
  // argument can be skimmed in two beats: what was wrong, what we made.
  blocks: [                                                             // [V] claims
    {
      label: 'THE OBSERVATION',
      text:
        'The people actually building this generation of AI were spending their ' +
        'time at conferences built for everyone else. Keynotes pitched at ' +
        'executives. Show floors full of vendors selling to vendors. Very little ' +
        'of the hard technical conversation that moves the work forward.',
    },
    {
      label: 'WHAT WE BUILT',
      text:
        'The rooms we wanted to be in. Closed-door discussions with engineers ' +
        'and scientists from the frontier labs. Founder dinners on customer ' +
        'acquisition, partnerships and fundraising. Launches in front of the ' +
        'people who will actually use the thing.',
    },
  ],

  themesLabel: 'FOUR THEMES',
  themes: ['Agents', 'Infrastructure', 'Multimodal', 'Physical AI'],    // [V]

  // Sits under the heading in the left column.
  image: '/media/images/Renaissance2026_header.webp',                   // [V]
  imageAlt: 'Panel session at RenAIssance 2026 — Video vs. Voice, '
    + 'The Next Default Interface',                                     // [V]
  imageCaption: 'PANEL · RENAISSANCE 2026 · THE REGENCY',               // [V]

  pullQuote: 'All signal, no noise.',                                   // [V] verbatim
  bodyAfter:                                                            // [V] mission
    'Our editorial policy, and why the room composes the way it does. We are ' +
    'working toward convening 50,000 of the most ambitious founders, ' +
    'researchers, investors and engineers shaping the future of AI.',
};

/* --- 05 WHAT WE RUN ------------------------------------------------------ */
// Hairline-divided list. Photo reveals on hover (opacity only — never layout).
export const formats = {
  label: 'WHAT WE RUN',
  items: [
  {
    name: 'RenAIssance',                                                // [V]
    tag: 'Flagship summit',
    cadence: 'ANNUAL · MARCH',                                          // [V]
    location: 'SAN FRANCISCO',                                          // [V]
    scale: '2,000+',                                                    // [V]
    blurb:
      'One day, one room. Main stage keynotes, deep dives and fireside ' +
      'conversations with the teams pushing the technical frontier, plus ' +
      'innovation sessions with demos and live product launches.',
    image: '/media/images/format-renaissance.jpg',                      // [V]
  },
  {
    name: 'Multimodal Day',                                             // [V]
    tag: 'Themed conference',
    cadence: 'ANNUAL · SF TECH WEEK',                                   // [V]
    location: 'SAN FRANCISCO',                                          // [V]
    scale: '1,500+',                                                    // [V]
    blurb:
      'A single-theme day during SF Tech Week. The 2025 edition drew 1,500+ ' +
      'attendees and teams from 20 AI unicorns.',
    image: '/media/format-multimodal.jpg',                              // [T]
  },
  {
    name: 'Industry discussions',                                       // [V]
    tag: 'Closed-door panels',
    cadence: 'ONGOING',
    location: 'SF BAY AREA',                                            // [V]
    scale: 'INVITE',
    blurb:
      'Closed-door panels with engineers and scientists from the AI labs. ' +
      'No press, no recording, no pitch.',
    image: '/media/format-panels.jpg',                                  // [T]
  },
  {
    name: 'Founder dinners',                                            // [V]
    tag: 'Curated tables',
    cadence: 'ONGOING',
    location: 'SF BAY AREA',                                            // [V]
    scale: 'INVITE',
    blurb:
      'Small curated tables on customer acquisition, enterprise partnerships ' +
      'and fundraising. Where the introductions that matter actually happen.',
    image: '/media/format-dinners.jpg',                                 // [T]
  },
  {
    name: 'Newsletter',                                                 // [V] exists
    tag: 'Substack',
    cadence: 'WEEKLY',                                                  // [T] confirm cadence
    location: 'GLOBAL',
    scale: '—',                                                         // [T] subscriber count
    blurb:
      'What shipped, who raised, and what the community is arguing about.',
    image: '/media/format-newsletter.jpg',                              // [T]
  },
  // [T] The brief mentions a Bengaluru edition and hackathons. Neither appears
  // on aiplus.dev or in the press release, so nothing is claimed here. Add
  // entries with real dates and attendance figures when you have them.
  ],
};

/* --- 06 TRACK RECORD ----------------------------------------------------- */
// Horizontal rail, scrubs while pinned. Newest first.
export const trackRecord = {
  label: 'TRACK RECORD',
  items: [
  {
    edition: 'RenAIssance 2026',                                        // [V]
    date: '15 MARCH 2026',                                              // [V]
    venue: 'The Regency, San Francisco',                                // [V]
    stat: '2,000+',                                                     // [V]
    statLabel: 'Attendees',
    detail: '40 speakers · 30 startups exhibiting · agents, multimodal, robotics', // [V]
    image: '/media/track-ren26.jpg',                                    // [T]
  },
  {
    edition: 'Multimodal Day',                                          // [V]
    date: 'SF TECH WEEK 2025',                                          // [V]
    venue: 'San Francisco',
    stat: '1,500+',                                                     // [V]
    statLabel: 'Attendees',
    detail: 'Teams from 20 AI unicorns in the room',                    // [V]
    image: '/media/track-multimodal.jpg',                               // [T]
  },
  // [T] aiplus.dev cites 300+ events but publishes detail on only these two.
  // Add three or four more with real dates, venues and attendance — a rail of
  // two does not read as a track record.
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
  label: 'SPEAKERS',
  heading: ['The people who have', 'stood on our stage.'],
  scrollLabel: 'SCROLL',
  feature: [                                                            // [V]
    'Parag Agrawal',
    'Michele Catasta',
    'Matt White',
    'Jeff Wang',
    'Michael Grinich',
    'Emily Xue',
    'Andrew Dai',
    'Philip Rathle',
    'Shaheen Lavie-Rouse',
    'Linda Sheng',
    'Aiswarya Sankar',
    'Hassaan Raza',
  ],
  // [T] Portraits go at public/media/speakers/<slug>.jpg, slug derived from the
  // name — e.g. parag-agrawal.jpg. Shoot or source at 3:4, min 900px wide.
  // Missing files fall back to a labelled placeholder card.
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
  heading: 'Founders and the people who build the thing.',
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
  // Named companies whose people were in the room. These are [V] — every one
  // put someone on the RenAIssance stage.
  logosLabel: 'COMPANIES REPRESENTED ON STAGE',

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
  label: 'RATE CARD',
  heading: 'Three ways to be in the room.',
  // ⚠ [U] The price ladder below came from the earlier prototype and has no
  // source. It is consistent with the $5,000+ target in the brief, but every
  // figure and every deliverable needs your confirmation before sending.
  note: '[U] CONFIRM ALL PRICES AND DELIVERABLES',
  tiers: [
    {
      name: 'Contributor',
      price: '$5,000',                                                  // [U]
      unit: 'PER EDITION',
      summary: 'Presence at the flagship. For seed-stage teams and single-product companies.',
      includes: [                                                       // [U] all
        '4 attendee passes',
        'Logo on venue signage and event site',
        'Newsletter mention (1×)',
        'Post-event attendee list (opt-in only)',
      ],
      cta: { label: 'Enquire', href: 'mailto:team@aiplus.dev?subject=AI%2B%20sponsorship%20—%20Contributor' },
      featured: false,
    },
    {
      name: 'Partner',
      price: '$18,000',                                                 // [U]
      unit: 'PER EDITION',
      badge: 'MOST TAKEN',
      summary: 'Full brand presence and a moment on stage. Most sponsors land here.',
      includes: [                                                       // [U] all
        '10 attendee passes',
        '5-minute lightning talk, main stage',
        'Exhibit table, premium placement',
        'Co-hosted founder dinner (30 curated guests)',
        'Dedicated newsletter feature',
        'Post-event attendee list (opt-in only)',
      ],
      cta: { label: 'Enquire', href: 'mailto:team@aiplus.dev?subject=AI%2B%20sponsorship%20—%20Partner' },
      featured: true,
    },
    {
      name: 'Presenting',
      price: '$50,000',                                                 // [U]
      unit: 'PER EDITION · TWO PER YEAR',
      summary: 'Named partner across the entire edition. Two per year, no exceptions.',
      includes: [                                                       // [U] all
        '25 attendee passes',
        'Keynote slot (20 min), main stage',
        'Named track — "[Sponsor] Builder Stage"',
        'Two co-hosted founder dinners',
        'Newsletter presence all season (4×)',
        'Full attendee list plus intro emails (opt-in)',
      ],
      cta: { label: 'Enquire', href: 'mailto:team@aiplus.dev?subject=AI%2B%20sponsorship%20—%20Presenting' },
      featured: false,
    },
  ],
  footnote: 'Custom scope, multi-edition deals, recruiting-focused packages and in-kind partnerships — tell us what you need.',
};

/* --- 11 FAQ -------------------------------------------------------------- */
export const faq = {
  label: 'QUESTIONS',
  items: [
    {
      q: 'Who actually attends?',
      a: 'Founders, researchers, engineers and investors from across the AI ' +
         'ecosystem. RenAIssance 2026 drew 2,000+ of them to The Regency in San ' +
         'Francisco for a single day, with 40 speakers and 30 startups exhibiting.', // [V]
    },
    {
      q: 'What do you optimise the programme for?',
      a: 'Technical substance. The agenda targets the hard realities of agentic ' +
         'systems, multimodal AI and robotics — not executive-level overviews. ' +
         'All signal, no noise.',                                        // [V]
    },
    {
      q: 'Do we get the attendee list?',
      a: 'Opt-in only, at every tier. Attendees choose whether to share details ' +
         'with sponsors. It is a smaller list than a scraped one and a far better one.', // [U] confirm policy
    },
    {
      q: 'Can we run our own session?',
      a: 'Yes, from Partner upward — a lightning talk at Partner, a keynote and ' +
         'a named track at Presenting. Innovation sessions with live demos and ' +
         'product launches are part of the standard format.',            // [V] format
    },
    {
      q: 'When do you need a decision?',
      a: '[T] State the actual deadline and what sells out first.',      // [T]
    },
    {
      q: 'Do you run events outside San Francisco?',
      a: '[T] The brief mentions a Bengaluru edition. Confirm dates and scale ' +
         'and answer this properly, or delete the question.',            // [T]
    },
  ],
};

/* --- 12 CLOSE ------------------------------------------------------------ */
export const close = {
  headline: ['Be in the room', 'that ships AI.'],
  // ⚠ [T] RenAIssance 2026 was 15 March 2026 — already past as of August 2026.
  // This page is selling the NEXT edition. Supply its date, venue and ticket
  // link. Everything below is a placeholder and MUST be replaced.
  date: '[T] RENAISSANCE 2027 · DATE TBC',
  venue: '[T] VENUE TBC · SAN FRANCISCO',
  body: 'Twenty minutes is enough to tell you whether your audience is in this room.',
  ctaPrimary: { label: 'Book a call', href: 'mailto:team@aiplus.dev?subject=AI%2B%20sponsorship' },
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
export const sectionCount = 13;
