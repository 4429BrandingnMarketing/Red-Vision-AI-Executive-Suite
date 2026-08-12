import { QuickStartTemplate } from '../types/index.js';

export const QUICK_START_TEMPLATES: QuickStartTemplate[] = [
  {
    id: 'tmpl-film-preprod',
    title: 'Film Pre-Production & Motion Cinema Suite',
    category: 'Film Pre-Production',
    badge: 'CINEMATIC WORKFLOW',
    description: 'Pre-configured workflow for directors and producers. Includes 4K sci-fi visual prompts, surround orchestral acoustic briefs, and ISRC soundtrack release milestones.',
    estimatedSetupTime: '< 60 Seconds',
    iconName: 'Film',
    heroImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    presetAudioPrompt: 'Cinematic orchestral score with suspenseful sub-bass pulses, brass swells, and 24-bit surround acoustics',
    presetVideoConcept: {
      productTitle: 'Gemini Omni 4K Motion Cinema Reel',
      atmosphereTitle: 'Sci-Fi Cyberpunk Neo-Tokyo Street',
      vslScriptSummary: 'Opening shot captures glowing neon reflections in rainwater as intense brass swells build cinematic tension.',
    },
    presetReleases: [
      {
        artist: 'Red Vision Cinema',
        title: 'Cyber Odyssey OST (Original Film Score)',
        isrc: 'US-RV1-26-00901',
        releaseDate: '2026-10-15',
      },
      {
        artist: 'Clayton & Orchestral Sig',
        title: 'Neo-Tokyo Theme (Director Cut)',
        isrc: 'US-RV1-26-00902',
        releaseDate: '2026-11-01',
      }
    ],
    includedFeatures: [
      'Pre-configured 4K Motion Cinema Prompt & VSL Script',
      '24-Bit Surround Sound Score Stems (Drums, Bass, Synths, Brass)',
      'ISRC Soundtrack Copyright Clearance Registration',
      'Hermes AI Director Release Advisor Integration'
    ],
    recommendedRole: 'Owner',
  },
  {
    id: 'tmpl-social-campaign',
    title: 'Viral TikTok & Reels Content Campaign',
    category: 'Social Media Campaign',
    badge: 'HIGH-ENGAGEMENT',
    description: 'Accelerated setup for viral short-form video releases. Pre-loaded with punchy 15-second audio hooks, high-octane stage visual concepts, and automated DSP delivery dates.',
    estimatedSetupTime: 'Instant Load',
    iconName: 'Zap',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    presetAudioPrompt: 'High-energy 808 trap hook with crisp vocal chops and sub-bass drop optimized for mobile audio',
    presetVideoConcept: {
      productTitle: 'Red Vision Signature Headphones',
      atmosphereTitle: 'High-Octane Concert Mainstage Lightshow',
      vslScriptSummary: 'Ultra-fast cuts synced to the 808 beat drop showing laser light arrays and audience reaction clips.',
    },
    presetReleases: [
      {
        artist: 'Clayton',
        title: 'Sub-Zero Hook (Viral Short Edit)',
        isrc: 'US-RV1-26-00903',
        releaseDate: '2026-08-20',
      }
    ],
    includedFeatures: [
      '15-Second Short-Form Video Cut Presets',
      'Mobile-Optimized 808 Hook Audio Prompt',
      'Automated DSP Release Calendar Checklist',
      'Buzz Speech & Lyric Alignment Engine'
    ],
    recommendedRole: 'Editor',
  },
  {
    id: 'tmpl-album-radio-master',
    title: 'Executive Album & Worldwide Radio Master',
    category: 'Album & DSP Master',
    badge: '24-BIT AUDIOPHILE',
    description: 'Full executive release pipeline for major artists and music labels. Configures warm analog tape saturation prompts, ISRC metadata watermarking, and Spotify/Apple Music release calendars.',
    estimatedSetupTime: '< 2 Minutes',
    iconName: 'Disc',
    heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    presetAudioPrompt: 'Radio-ready Master with warm tube-saturation, 24-bit dynamic range, punchy kicks and crystal-clear vocal space',
    presetVideoConcept: {
      productTitle: 'Clay Studio 24-Bit Acoustic Synthesizer',
      atmosphereTitle: 'Vintage Mahogany Recording Studio',
      vslScriptSummary: 'Close-up studio camera pan across warm analog vacuum tubes and glowing VU meters as master audio plays.',
    },
    presetReleases: [
      {
        artist: 'Jason Salvador',
        title: 'Red Vision Vol. 3 Executive LP',
        isrc: 'US-RV1-26-00904',
        releaseDate: '2026-09-01',
      },
      {
        artist: 'Jason Salvador ft. Marcus Bell',
        title: 'Acoustic Horizon (Lead Single)',
        isrc: 'US-RV1-26-00905',
        releaseDate: '2026-08-25',
      }
    ],
    includedFeatures: [
      '24-Bit Audiophile Master Quality Audio Synthesis',
      'ISRC Legal Watermarking & Metadata Registration',
      'Full DSP Release Calendar Milestones & Distribution Approval',
      'Public Share Link Client Portal Generator'
    ],
    recommendedRole: 'Owner',
  },
  {
    id: 'tmpl-live-tour',
    title: 'Live Arena Tour & Festival Stage Suite',
    category: 'Live Tour',
    badge: '3D STAGE & SPATIAL',
    description: 'Complete touring package for live performances. Includes 3D stage backdrop visual concepts, spatial stadium acoustic prompts, tour schedule milestones, and VR 360° stage inspection.',
    estimatedSetupTime: '< 90 Seconds',
    iconName: 'Sparkles',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    presetAudioPrompt: 'Stadium spatial acoustic mix with audience resonance, heavy bass drops and live synth solos',
    presetVideoConcept: {
      productTitle: 'OmniRoute AI Multi-Model Telemetry',
      atmosphereTitle: 'Festival Mainstage Visual Wall',
      vslScriptSummary: '360 degree camera sweep across 50,000 festival fans with synchronized pyro visual effects.',
    },
    presetReleases: [
      {
        artist: 'Red Vision Live',
        title: 'Red Vision World Tour 2026 (Live Stadium Edit)',
        isrc: 'US-RV1-26-00906',
        releaseDate: '2026-12-01',
      }
    ],
    includedFeatures: [
      '3D Visual Stage Backdrop Render Preset',
      'Stadium Spatial Audio & Audience Resonance Cues',
      'Tour Dates & Venue Release Calendar Integration',
      'VR 360° Stage Preview Inspection Mode'
    ],
    recommendedRole: 'Editor',
  },
  {
    id: 'tmpl-brand-launch',
    title: 'Luxury Brand Identity & Merch Launch',
    category: 'Brand & E-Commerce',
    badge: 'LUXURY BRANDING',
    description: 'Turnkey workflow for luxury apparel, tech hardware, and product drops. Configures sleek architectural product visuals, ambient sonic signatures, and client approval share portals.',
    estimatedSetupTime: 'Instant Load',
    iconName: 'LayoutGrid',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    presetAudioPrompt: 'Minimalist ambient chillout lounge with slick synth pads and subtle organic percussion',
    presetVideoConcept: {
      productTitle: 'Red Vision Signature Headphones',
      atmosphereTitle: 'Minimalist Architectural Gallery',
      vslScriptSummary: 'Smooth macro camera zoom over matte black aluminum textures in a museum gallery space.',
    },
    presetReleases: [
      {
        artist: 'Red Vision Atelier',
        title: 'Signature Brand Identity Sonic Logo',
        isrc: 'US-RV1-26-00907',
        releaseDate: '2026-09-10',
      }
    ],
    includedFeatures: [
      'Architectural Product Video Presentation',
      'Slick Ambient Audio Signature Stings',
      'Client Approval Share Link Portal',
      'Open Design Stem & Color Inspector'
    ],
    recommendedRole: 'Viewer',
  }
];
