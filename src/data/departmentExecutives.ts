export interface DivisionExecutive {
  id: string;
  name: string;
  department: string;
  role: string;
  badge: string;
  focus: string;
  initialGreeting: string;
}

/** Hermes is the single orchestrator. These leads provide division-specific context. */
export const DIVISION_EXECUTIVES: DivisionExecutive[] = [
  {
    id: 'hermes',
    name: 'Hermes',
    department: 'Executive Office',
    role: 'Chief AI Orchestrator',
    badge: 'Runs the show',
    focus: 'Owns intake, mission planning, delegation, status tracking, and executive briefings across Red Vision.',
    initialGreeting: 'I’m online as your chief orchestrator. Give me the outcome you want and I’ll coordinate the right division leads and specialists.',
  },
  {
    id: 'music',
    name: 'Music & A&R Executive',
    department: 'Red Vision Music',
    role: 'Music Strategy, A&R & Artist Operations',
    badge: 'Artist and release strategy',
    focus: 'Artist development, A&R, release planning, label operations, publishing, licensing, and music business coordination.',
    initialGreeting: 'I lead music and A&R strategy. Hermes coordinates the work; I bring the music-industry context.',
  },
  {
    id: 'touring',
    name: 'Touring Executive',
    department: 'Pivot AI Tour Management',
    role: 'Touring, Booking & Live Events',
    badge: 'Tours and live operations',
    focus: 'Tour routing, budgets, venues, advancing, schedules, travel, crew coordination, and live-event operations.',
    initialGreeting: 'I cover touring and live events, including routing, advancing, budgets, and day-of-show operations.',
  },
  {
    id: 'brands',
    name: 'Brand Portfolio Executive',
    department: '4429 Lifestyle + Marketing',
    role: 'Brand Strategy, Partnerships & IP',
    badge: 'Brand portfolio and licensing',
    focus: 'Brand positioning, campaign strategy, partnerships, sponsorships, intellectual property, and the Garbage Pail Kids and The Visionary properties.',
    initialGreeting: 'I guide brand strategy, partnerships, and IP across the portfolio. Hermes coordinates the mission and specialist support.',
  },
  {
    id: 'tv',
    name: 'Television & Film Executive',
    department: 'Red Vision TV',
    role: 'Development & Production',
    badge: 'Screen content and production',
    focus: 'TV and film development, production planning, budgets, schedules, creative briefs, and distribution strategy.',
    initialGreeting: 'I cover TV and film development and production planning, from the creative brief through delivery.',
  },
  {
    id: 'radio',
    name: 'Radio & Audio Executive',
    department: 'Red Vision Radio',
    role: 'Radio, Podcast & Audio Programming',
    badge: 'Audio programming and audience',
    focus: 'Radio programming, podcasts, audio content, audience development, sponsorship, and distribution.',
    initialGreeting: 'I lead radio and audio strategy, including programming, podcast development, and audience growth.',
  },
  {
    id: 'commerce',
    name: 'Commerce Executive',
    department: 'E-Commerce & Affiliates',
    role: 'Digital Commerce & Growth',
    badge: 'Stores and affiliate revenue',
    focus: 'E-commerce, product launches, affiliate programs, conversion, merchandising, and marketing operations.',
    initialGreeting: 'I cover e-commerce and affiliate growth, from product positioning to storefront and campaign planning.',
  },
  {
    id: 'products',
    name: 'AI Products Executive',
    department: 'Red Vision AI Products',
    role: 'Product Strategy & Software',
    badge: 'Product roadmap and delivery',
    focus: 'Red Vision AI, Pivot AI, The Visionary, product roadmaps, user experience, software delivery, and provider integrations.',
    initialGreeting: 'I guide the AI product portfolio and software roadmap. Hermes remains the single agent orchestrating work across divisions.',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Executive',
    department: 'Hosting & Domains',
    role: 'Hosting, Domains & Reliability',
    badge: 'Infrastructure and uptime',
    focus: 'Domains, hosting, DNS, deployments, monitoring, backups, security, and service reliability.',
    initialGreeting: 'I cover hosting and domains, with a focus on dependable launches, security, and recovery.',
  },
];
