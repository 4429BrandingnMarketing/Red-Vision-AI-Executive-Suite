import { VSLScriptBeat, ReleaseItem, TeamMember, TeamMessage } from '../types/index.js';

export const JASON_PORTRAIT_IMG = '/src/assets/images/jason_avatar_light_mustache_1784890643283.jpg';
export const CLAY_STUDIO_IMG = '/src/assets/images/jason_wide_slim_v4_1784887026570.jpg';
export const CLAY_CALENDAR_IMG = '/src/assets/images/clay_release_calendar_1784777220728.jpg';

export const CLAY_ICON_MANIFEST = '/src/assets/images/clay_icon_manifest_1784780713717.jpg';
export const CLAY_ICON_TOURING = '/src/assets/images/clay_icon_touring_1784780723282.jpg';
export const CLAY_ICON_STAFF = '/src/assets/images/clay_icon_staff_1784780732352.jpg';
export const CLAY_ICON_CINEMA = '/src/assets/images/clay_icon_cinema_1784780740568.jpg';

export const CLAY_RECORDING_STUDIO_IMG = '/src/assets/images/recording_studio_clay_1784888491121.jpg';
export const CLAY_FILM_EDITING_IMG = '/src/assets/images/film_editing_clay_1784888502082.jpg';
export const CLAY_TOUR_MANAGER_IMG = '/src/assets/images/tour_manager_clay_1784888512033.jpg';
export const CLAY_BOOK_PUBLISHING_IMG = '/src/assets/images/book_publishing_clay_1784888522025.jpg';
export const CLAY_VIRTUAL_3D_OFFICE_IMG = '/src/assets/images/virtual_3d_office_clay_1784888536048.jpg';

export interface StudioVisualSuite {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  features: string[];
  staffInvolved: string[];
  tooltipInsights: {
    specs: string;
    efficiency: string;
    proTip: string;
    roiHighlight: string;
  };
}

export const STUDIO_SUITE_VISUALS: StudioVisualSuite[] = [
  {
    id: 'recording-studio',
    title: '24-Bit Audio Recording & Mixing Studio',
    category: 'Audio Architecture',
    image: CLAY_RECORDING_STUDIO_IMG,
    description: 'Analog-modeled 24-bit studio engine with vacuum tube microphone preamps, acoustic stem synthesis, automatic mix leveling, mastering, and surround sound output.',
    tags: ['24-Bit Audio', 'Stem Synthesizer', 'Mix & Master Engine', 'Dolby Atmos Preview'],
    features: ['Real-time 24-bit waveform mastering', 'Stem separation & vocoder synthesis', 'Automatic acoustic room tuning', 'ISRC tag embedding'],
    staffInvolved: ['Mix/Master Engineers', 'Songwriters', 'Sound Designers', 'Podcast Producers'],
    tooltipInsights: {
      specs: '96kHz / 24-Bit Lossless WAV Engine',
      efficiency: 'Reduces mixing workflow from 14 days to 45 minutes',
      proTip: 'Auto-embeds ISRC & ID3 metadata directly upon master export',
      roiHighlight: 'Saves $3,500 per album in traditional studio booking fees'
    }
  },
  {
    id: 'film-editing-studio',
    title: '4K Cinema TV & Film Motion Editing Suite',
    category: 'Visual & Video Studio',
    image: CLAY_FILM_EDITING_IMG,
    description: 'Professional 4K cinema timeline with color grading scopes, multi-camera sync, AI motion generation, trailer cuts, and music video post-production tools.',
    tags: ['4K Cinema', 'Color Grading', 'AI Motion Gen', 'Music Video Sync'],
    features: ['Multi-cam timeline synchronization', 'Custom color LUT presets', 'Automated music beat-to-cut video sync', 'YouTube & Cinema aspect exports'],
    staffInvolved: ['YouTube Experts', 'Designers', 'Brand Directors', 'Podcast Producers'],
    tooltipInsights: {
      specs: 'ProRes 422 HQ / 60FPS Render Pipeline',
      efficiency: 'Auto-syncs video cuts to audio beat transients in real-time',
      proTip: 'Generates anamorphic flare & plasticine cinematic grain LUTs',
      roiHighlight: 'Eliminates external post-production edit house costs'
    }
  },
  {
    id: 'tour-manager-app',
    title: 'Tour Manager & Travel Agency Command Hub',
    category: 'Live & Routing',
    image: CLAY_TOUR_MANAGER_IMG,
    description: 'Integrated live tour manager app with built-in travel agency booking engine, flight routing logistics, venue settlement calculators, and daily road itineraries.',
    tags: ['Built-In Travel Agency', 'Flight Logistics', 'Venue Settlement', 'Road Itinerary'],
    features: ['Automated flight & hotel deal finder', 'Per-diem & door split calculators', 'VIP guestlist portal', 'Live map routing GPS'],
    staffInvolved: ['Talent Managers', 'Personal Trainers', 'Chefs', 'Doctors', 'Lawyers'],
    tooltipInsights: {
      specs: 'Live IATA GDS Flight & Hotel API Matrix',
      efficiency: 'Auto-calculates door-splits, tax withholding, & crew per-diems',
      proTip: 'Direct 24/7 access to tour doctors & personal trainers for road wellness',
      roiHighlight: 'Saves 25% on group travel logistics & emergency re-bookings'
    }
  },
  {
    id: 'book-publishing-app',
    title: 'Author Book Publishing & Manuscript Suite',
    category: 'Publishing & IP',
    image: CLAY_BOOK_PUBLISHING_IMG,
    description: 'Complete publishing studio for authors. Write manuscripts, format e-books and hardcovers, design 3D book covers, generate audiobooks, and manage ISBN copyright.',
    tags: ['Manuscript Studio', '3D Cover Generator', 'Audiobook TTS', 'ISBN & Distribution'],
    features: ['AI manuscript editing & formatting', '3D plasticine hardcover jacket designer', '100+ voice audiobook synthesis', 'Global bookstore distribution portal'],
    staffInvolved: ['Book Authors', 'Licensing Agents', 'Brand Strategists', 'Designers'],
    tooltipInsights: {
      specs: 'EPUB3, Print PDF, & Audible 192kbps MP3 Output',
      efficiency: 'Transforms raw text into fully formatted e-book & audiobook in 1 hour',
      proTip: 'Automated legal copyright registration & ISBN assignment',
      roiHighlight: 'Keep 100% of book royalties without traditional publisher cuts'
    }
  },
  {
    id: 'virtual-3d-office',
    title: 'Virtual 3D Executive Office & AI Staff HQ',
    category: 'Full Multi-Department HQ',
    image: CLAY_VIRTUAL_3D_OFFICE_IMG,
    description: 'Virtual 3D office headquarters pre-loaded with a trained AI staff across 20+ specialized executive disciplines, working collaboratively in real-time.',
    tags: ['20+ AI Executives', 'Virtual 3D Office', 'Multi-User Collab', 'API Key Isolation'],
    features: ['24/7 dedicated specialist dispatch', 'Cross-department automated workflow sync', '300M+ B2B lead discovery', 'Direct legal & medical advisory pods'],
    staffInvolved: ['Lawyers', 'Doctors', 'Mentors', 'Personal Trainers', 'Chefs', 'YouTube Experts', 'Ecomm Pros', 'Website Builders', 'Licensing Agents', 'Marketing Leads'],
    tooltipInsights: {
      specs: '20+ Trained AI Specialist Pods with Isolated API Keys',
      efficiency: 'Executes cross-department tasks in parallel with zero friction',
      proTip: 'Trained on Jason Salvador’s 25-year executive playbook',
      roiHighlight: 'Replaces $40,000/month in agency & executive retainers'
    }
  },
  {
    id: 'red-vision-radio',
    title: 'Red Vision Radio 24/7 Broadcast Network',
    category: 'Global Broadcast & Syndication',
    image: CLAY_RECORDING_STUDIO_IMG,
    description: '24/7 global internet & satellite broadcast station powering live artist interviews, DJ mix shows, record premieres, and automated multi-platform radio syndication.',
    tags: ['24/7 Broadcast', 'Satellite Syndication', 'Live DJ Sets', 'Radio Interview Pod'],
    features: ['Automated 24/7 broadcast playlist scheduling', 'Live satellite audio feed distribution', 'On-air interview voice synthesis & recording', 'Billboard / BDS spin reporting'],
    staffInvolved: ['Radio Program Directors', 'DJs', 'On-Air Hosts', 'Station Engineers'],
    tooltipInsights: {
      specs: '320kbps HD Stereo Stream + Satellite Syndication Engine',
      efficiency: 'Auto-schedules 24 hours of radio programming in 5 minutes',
      proTip: 'Includes AI Radio DJ host drops with customizable voice personas',
      roiHighlight: 'Guarantees global spin reach across 45+ syndicated radio stations'
    }
  },
  {
    id: 'fashion-merch-dropship',
    title: 'Fashion Design, Merch & Drop-Shipping Division',
    category: 'Apparel & E-Commerce Logistics',
    image: CLAY_ICON_MANIFEST,
    description: 'Full-service fashion design studio & print-on-demand drop-shipping pipeline for artist apparel, tour merch, custom streetwear lines, and global e-commerce stores.',
    tags: ['Fashion Design', 'Drop-Shipping Engine', 'Tour Merch Booth', 'Global Fulfillment'],
    features: ['3D apparel mockup & tech-pack generator', 'Automated Shopify / WooCommerce drop-ship sync', 'Zero-upfront inventory print-on-demand', 'Tour VIP pop-up booth logistics'],
    staffInvolved: ['Apparel Designers', 'Ecomm Specialists', 'Fulfillment Managers', 'Brand Stylists'],
    tooltipInsights: {
      specs: 'Integrated Global 48-Hour Print-On-Demand API Matrix',
      efficiency: 'Launches full streetwear drop with zero upfront inventory capital',
      proTip: 'Auto-calculates venue merch splits and state sales tax compliance',
      roiHighlight: 'Generates $120k+ in passive merch profit per arena tour run'
    }
  },
  {
    id: 'talent-management-division',
    title: 'Executive Talent Management & Roster Representation',
    category: 'Executive Representation',
    image: CLAY_ICON_STAFF,
    description: 'Premier talent management division representing top-tier recording artists, record producers, showrunners, and creators with 360-degree career roadmaps.',
    tags: ['360 Artist Representation', 'Brand Deals', 'Contract Negotiation', 'Career Strategy'],
    features: ['Executive contract & royalty audit engine', 'Fortune 500 brand deal pairing algorithm', 'Personalized 5-year career roadmap tracking', 'VIP endorsement & sponsorship manager'],
    staffInvolved: ['Jason Salvador (Executive Lead)', 'Solomon Sterling, Esq.', 'Victor Vance', 'Talent Agents'],
    tooltipInsights: {
      specs: '360-Degree Career Roadmap & Brand Match Intelligence',
      efficiency: 'Negotiates non-exclusive master splits & multi-million dollar sponsorships',
      proTip: 'Direct line to Jason Salvador’s 25-year industry contact network',
      roiHighlight: 'Increases client gross contract value by an average of 340%'
    }
  }
];

export interface SuccessStory {
  id: string;
  clientName: string;
  clientRole: string;
  companyOrLabel: string;
  avatar: string;
  suiteUsed: string;
  suiteCategory: string;
  metric: string;
  metricLabel: string;
  quote: string;
  verifiedBadge: string;
  rating: number;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    clientName: 'Marcus "Vibe" Vance',
    clientRole: 'Platinum Record Producer',
    companyOrLabel: 'Def Jam & Universal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    suiteUsed: '24-Bit Audio Recording & Mixing Studio',
    suiteCategory: 'Audio Architecture',
    metric: '4x Faster',
    metricLabel: 'Master Delivery Speed',
    quote: "Red Vision's 24-bit audio engine reduced our master turnaround from 2 weeks to 48 hours. The stem synthesis and automatic acoustic leveling saved us $35,000 in studio time across our 12-track album.",
    verifiedBadge: 'Verified Producer',
    rating: 5
  },
  {
    id: 'story-2',
    clientName: 'Elena Rostova',
    clientRole: 'Executive Film Director & Showrunner',
    companyOrLabel: 'Apex Cinema Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    suiteUsed: '4K Cinema TV & Film Motion Editing Suite',
    suiteCategory: 'Visual & Video Studio',
    metric: '100% In-House',
    metricLabel: 'Post-Production Saved',
    quote: "We edited our 6-part documentary series trailers entirely in Red Vision's Cinema Suite. Beat-to-cut video sync automatically locked our clips to the soundtrack seamlessly. Game changer!",
    verifiedBadge: 'Verified Director',
    rating: 5
  },
  {
    id: 'story-3',
    clientName: 'Derrick "D-Mac" McCloud',
    clientRole: 'Global Tour Manager & Booking Agent',
    companyOrLabel: 'WorldStage Live Touring',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    suiteUsed: 'Tour Manager & Travel Agency Command Hub',
    suiteCategory: 'Live & Routing',
    metric: '$1.4M Revenue',
    metricLabel: '28-City North American Tour',
    quote: "Having an integrated travel agency engine right inside our tour manager app saved us hundreds of hours on flight re-routings and door-split settlements. Our 30-person crew stayed on budget effortlessly.",
    verifiedBadge: 'Verified Tour Manager',
    rating: 5
  },
  {
    id: 'story-4',
    clientName: 'Dr. Sarah Lin, PhD',
    clientRole: 'Best-Selling Author & Executive Coach',
    companyOrLabel: 'Crown & Anchor Publishing',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    suiteUsed: 'Author Book Publishing & Manuscript Suite',
    suiteCategory: 'Publishing & IP',
    metric: '#1 Amazon Bestseller',
    metricLabel: 'Hardcover & Audiobook Launch',
    quote: "The 3D cover generator and 100+ voice audiobook synthesizer formatted my 320-page manuscript into global digital formats in one afternoon. The automated ISBN copyright filing was seamless.",
    verifiedBadge: 'Verified Author',
    rating: 5
  },
  {
    id: 'story-5',
    clientName: 'Tariq "T-Raww" Thorne',
    clientRole: 'Artist Manager & Independent Label Founder',
    companyOrLabel: 'Redline Music Empire',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    suiteUsed: 'Virtual 3D Executive Office & AI Staff HQ',
    suiteCategory: 'Full Multi-Department HQ',
    metric: '20 AI Specialists',
    metricLabel: 'Replaced $40k/Mo Retainers',
    quote: "Jason Salvador's trained AI staff gave us an instant 20-person team—lawyers, doctors, YouTube experts, sound engineers, and mentors. We run a full label operations suite with zero overhead.",
    verifiedBadge: 'Verified Label Owner',
    rating: 5
  },
  {
    id: 'story-6',
    clientName: 'Chloe Bennett',
    clientRole: 'YouTube Creator & Lifestyle Brand Owner',
    companyOrLabel: 'Studio Bennett Media',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    suiteUsed: '4K Cinema TV & Film Motion Editing Suite',
    suiteCategory: 'Visual & Video Studio',
    metric: '+380% Growth',
    metricLabel: 'YouTube Subscriber Engagement',
    quote: "The 4K motion tools and YouTube optimization experts in the virtual office transformed our channel aesthetic. Output tripled while maintaining cinema-grade production quality.",
    verifiedBadge: 'Verified Creator',
    rating: 5
  }
];

export const VSL_SCRIPT: VSLScriptBeat[] = [
  {
    time: "0:00 - 0:10",
    visual: "Claymation animation of Jason Salvador in a dimly lit studio surrounded by floating chaotic papers, hard drives, and glowing screens.",
    voiceover: "For 25 years in the entertainment industry, I’ve managed hit records, client rollouts, mix deliveries, and visual content. The biggest problem? Bouncing between ten different disconnected tools."
  },
  {
    time: "0:10 - 0:22",
    visual: "The chaos morphs into a sleek glowing red & frosted glass control console (Manifest Control). Clay Jason snaps his fingers, turning soundwaves into vibrant music masters.",
    voiceover: "That’s why I built the Red Vision Creative Studio Suite — the single all-in-one AI powered workspace built around my exact executive workflow."
  },
  {
    time: "0:22 - 0:38",
    visual: "UI Showcase overlays: Acoustic Sig generating stems, Motion Cinema rendering 4K video clips, and Release Calendar checking off delivery items.",
    voiceover: "From instant 24-bit audio master synthesis and motion video creation, to our integrated Release Calendar that keeps track of artists, mixes, ISRCs, and client deliverables on deadline."
  },
  {
    time: "0:38 - 0:50",
    visual: "Clay characters representing artists and mixing engineers joining a multi-user messenger hub, each snapping in their own glowing API key module.",
    voiceover: "And for team collaboration? Your entire roster can jump into the Team Workspace — complete with real-time messenger channels and independent API key management so everyone owns their quota."
  },
  {
    time: "0:50 - 1:10",
    visual: "Clay Jason puts on studio headphones with a confident smile. Red Vision Creative Studio logo glows on screen with a bold CTA button.",
    voiceover: "Stop juggling broken tools. Supercharge your music, content, and releases with the platform designed by Jason Salvador / Red Vision Music. Access the suite today."
  }
];

export const INITIAL_RELEASES: ReleaseItem[] = [
  {
    id: 'rel-1',
    artist: 'Siren & The Waves',
    title: 'Midnight Echoes (Deluxe)',
    isrc: 'US-RV1-27-00109',
    releaseDate: '2027-08-15',
    status: 'In Progress',
    checklist: {
      audioMaster: true,
      motionCinema: true,
      isrcRegistered: true,
      distributionApproved: false,
    }
  },
  {
    id: 'rel-2',
    artist: 'Kaelen Vance',
    title: 'Neon Horizon Single',
    isrc: 'US-RV1-27-00110',
    releaseDate: '2027-08-28',
    status: 'Mixed',
    checklist: {
      audioMaster: true,
      motionCinema: false,
      isrcRegistered: true,
      distributionApproved: false,
    }
  },
  {
    id: 'rel-3',
    artist: 'Red Vision Roster Vol. 4',
    title: 'Executive Compilation',
    isrc: 'US-RV1-27-00111',
    releaseDate: '2027-09-04',
    status: 'Mastered',
    checklist: {
      audioMaster: true,
      motionCinema: true,
      isrcRegistered: true,
      distributionApproved: true,
    }
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Jason Salvador',
    role: 'Founder & Executive Producer',
    avatar: JASON_PORTRAIT_IMG,
    status: 'online',
    apiKeySet: true,
    email: 'jason@redvisionmusic.com',
    accessRole: 'Owner',
    department: 'Executive HQ',
  },
  {
    id: 'tm-2',
    name: 'Marcus Bell',
    role: 'Chief Audio Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    apiKeySet: true,
    email: 'marcus@redvisionmusic.com',
    accessRole: 'Editor',
    department: 'Acoustic Audio Suite',
  },
  {
    id: 'tm-3',
    name: 'Elena Rostova',
    role: 'Creative Motion Director',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'busy',
    apiKeySet: true,
    email: 'elena@redvisionmusic.com',
    accessRole: 'Editor',
    department: 'Motion Cinema Studio',
  },
  {
    id: 'tm-4',
    name: 'Guest Client Reviewer',
    role: 'External Licensing Auditor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    apiKeySet: false,
    email: 'reviewer@defjam.com',
    accessRole: 'Viewer',
    department: 'Client Auditing',
  }
];

export const INITIAL_MESSAGES: TeamMessage[] = [
  {
    id: 'msg-1',
    senderId: 'tm-1',
    senderName: 'Jason Salvador',
    senderAvatar: JASON_PORTRAIT_IMG,
    text: 'Team, the Midnight Echoes rollout is set for Aug 15. Marcus, how are the 24-bit stems sounding on Acoustic Sig?',
    timestamp: '10:14 AM'
  },
  {
    id: 'msg-2',
    senderId: 'tm-2',
    senderName: 'Marcus Bell',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: 'Stems are balanced and mastered! The bass response on the sub-frequencies is clean.',
    timestamp: '10:16 AM',
    attachment: {
      type: 'audio',
      title: 'Midnight_Echoes_24Bit_Master.wav'
    }
  },
  {
    id: 'msg-3',
    senderId: 'tm-3',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    text: 'Motion Cinema just finished rendering the 4K teaser reel. I locked the ISRC code to the video metadata.',
    timestamp: '10:20 AM',
    attachment: {
      type: 'video',
      title: 'Midnight_Echoes_4K_Teaser.mp4'
    }
  }
];

export const COMPARISON_ITEMS = [
  {
    feature: 'Tool Architecture',
    traditional: '10+ disconnected apps (DAWs, cloud drives, Trello, video editors, email threads)',
    redVision: 'Single All-In-One Executive Workspace engineered by Jason Salvador'
  },
  {
    feature: 'Monthly Subscriptions',
    traditional: '$1,200+ / month in stacked SaaS fees and plugin licenses',
    redVision: 'Unified suite access with direct API key cost transparency'
  },
  {
    feature: 'Audio Synthesis & Stems',
    traditional: 'Manual stem bouncing, external cloud uploads, 4-hour render turnarounds',
    redVision: 'Instant 24-bit Acoustic Sig AI synthesis with real-time multi-track stem separation'
  },
  {
    feature: 'Promo Video Creation',
    traditional: 'Hiring motion agencies for $3k-$5k per 15-second teaser clip',
    redVision: 'Gemini Omni 4K Motion Cinema rendering in seconds directly from track concepts'
  },
  {
    feature: 'Release & ISRC Tracking',
    traditional: 'Lost metadata, Excel spreadsheets, missed distribution deadlines',
    redVision: 'Interactive Release Calendar with automated ISRC & deliverable checklists'
  },
  {
    feature: 'Team API Key Management',
    traditional: 'Shared account logins, security leaks, rate-limit crashes',
    redVision: 'Isolated Gemini API Key management per roster member with quota safety'
  }
];
