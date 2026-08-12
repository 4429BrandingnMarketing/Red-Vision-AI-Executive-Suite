export type AppView = 'funnel' | 'console';

export type ConsoleTab = 'acoustic' | 'cinema' | 'calendar' | 'staff' | 'canvas' | 'metrics' | 'team' | 'vr' | 'dashboard' | 'templates' | 'integrations' | 'youtube' | 'socials' | 'viralcred' | 'gantt' | 'voiceover' | 'agency';

export interface AdAgencyCampaign {
  id: string;
  campaignTitle: string;
  niche: string;
  targetAudience: string;
  uniqueValueProp: string;
  suggestedRetainerPrice: string;
  adCopy: {
    hooks: Array<{ type: string; text: string; conversionScore: string }>;
    headlines: string[];
    primaryBodyCopy: string;
    ctaText: string;
    hashtags: string;
  };
  imageCreatives: Array<{
    title: string;
    aspectRatio: string;
    visualConcept: string;
    overlayHeadline: string;
    badgeText: string;
    imagePrompt: string;
    sampleUrl?: string;
  }>;
  videoCreatives: Array<{
    title: string;
    duration: string;
    aspectRatio: string;
    hookVisual: string;
    voiceoverScript: string;
    storyboard: Array<{ time: string; scene: string; voiceover: string }>;
    videoSampleUrl?: string;
  }>;
  clientOutreach: {
    coldEmailSubject: string;
    coldEmailBody: string;
    instagramDM: string;
    linkedInPitch: string;
    coldCallScript: string;
  };
  proposalSummary: {
    agencyPackageName: string;
    monthlyRetainer: string;
    includedDeliverables: string[];
    expectedROI: string;
  };
  createdAt: string;
}

export interface BrandMemory {
  brandName: string;
  websiteUrl: string;
  socialHandles: string;
  voiceTone: string;
  targetAudience: string;
  coreOffers: string;
  primaryColor: string;
  secondaryColor: string;
  defaultCTA: string;
  founderName: string;
  founderImageUrl: string;
  isTrained: boolean;
}

export interface TrendTopic {
  id: string;
  topic: string;
  category: string;
  volume: string;
  growth: string;
  provenAngle: string;
  hookCategory: string;
}

export interface ViralHook {
  id: string;
  category: 'Pattern Interrupt' | 'Storytelling' | 'Controversy / Hot Take' | 'Direct Value' | 'Myth vs Fact';
  hookText: string;
  engagementBoost: string;
}

export interface GeneratedAssetPack {
  id: string;
  originalIdea: string;
  facebookCaption: string;
  selectedHook: string;
  visualGraphicType: 'Quote Card' | 'Checklist' | 'Myth vs Fact' | 'Testimonial Spotlight' | 'Founder Face Overlay';
  visualGraphicText: string;
  reelScript: string;
  carouselSlides: string[];
  smartCTA: string;
  firstComment: string;
  status: 'Draft' | 'Approved' | 'Scheduled' | 'Auto-Published';
  scheduledDate?: string;
}

export interface DeveloperIntegrationState {
  githubConnected: boolean;
  githubAccount: string;
  githubToken: string;
  githubOrg: string;
  selectedRepo: string;
  huggingFaceConnected: boolean;
  huggingFaceAccount: string;
  huggingFaceToken: string;
  selectedModel: string;
}

export interface YouTubeChannel {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  views: string;
  avatar: string;
  banner: string;
  verified: boolean;
  contentIdProtected: boolean;
}

export interface SocialDivision {
  id: string;
  name: string;
  badge: string;
  facebookPage: string;
  instagramHandle: string;
  tikTokHandle: string;
  xHandle: string;
  linkedMetaStatus: 'Connected & Synced' | 'Pending Auth' | 'Action Required';
}

export interface QuickStartTemplate {
  id: string;
  title: string;
  category: 'Film Pre-Production' | 'Social Media Campaign' | 'Album & DSP Master' | 'Live Tour' | 'Brand & E-Commerce';
  badge: string;
  description: string;
  estimatedSetupTime: string;
  iconName: string;
  heroImage: string;
  presetAudioPrompt: string;
  presetVideoConcept: {
    productTitle: string;
    atmosphereTitle: string;
    vslScriptSummary: string;
  };
  presetReleases: {
    artist: string;
    title: string;
    isrc: string;
    releaseDate: string;
  }[];
  includedFeatures: string[];
  recommendedRole: UserAccessRole;
}

export interface VSLScriptBeat {
  time: string;
  visual: string;
  voiceover: string;
}

export interface ReleaseItem {
  id: string;
  artist: string;
  title: string;
  isrc: string;
  releaseDate: string;
  status: 'In Progress' | 'Mixed' | 'Mastered' | 'Released';
  checklist: {
    audioMaster: boolean;
    motionCinema: boolean;
    isrcRegistered: boolean;
    distributionApproved: boolean;
  };
  coverImage?: string;
}

export type UserAccessRole = 'Owner' | 'Editor' | 'Viewer';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  apiKeySet: boolean;
  email?: string;
  accessRole: UserAccessRole;
  department?: string;
}

export interface CollaboratorInvite {
  id: string;
  email: string;
  name: string;
  accessRole: UserAccessRole;
  department: string;
  invitedBy: string;
  invitedAt: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  inviteLink: string;
}

export interface TeamMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'audio' | 'video' | 'isrc';
    title: string;
  };
}

export interface AudioStem {
  name: string;
  type: 'Drums' | 'Bass' | 'Synths' | 'Vocals';
  level: number;
  muted: boolean;
  solo: boolean;
}

export interface AudioSynthResult {
  title: string;
  bpm: number;
  key: string;
  genre: string;
  summary: string;
  stems: AudioStem[];
}
