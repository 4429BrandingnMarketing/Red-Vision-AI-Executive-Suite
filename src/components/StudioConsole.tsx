import React, { useState, useRef } from 'react';
import { 
  Music, Film, Calendar, Users, Key, Play, Pause, Volume2, Disc, Sparkles, 
  Plus, Check, X, Send, Shield, Loader2, ArrowRight, Download, Sliders, ChevronRight, Lock, Bot,
  LayoutGrid, TrendingUp, Zap, Eye, Box, Folder, UserPlus, ShieldCheck, Edit3, AlertCircle,
  Terminal, Youtube, Share2, Github, Cpu, Flame, Mic, Contrast
} from 'lucide-react';
import { ConsoleTab, ReleaseItem, TeamMember, TeamMessage, AudioSynthResult, UserAccessRole, CollaboratorInvite, QuickStartTemplate } from '../types/index.js';
import { INITIAL_RELEASES, TEAM_MEMBERS, INITIAL_MESSAGES, JASON_PORTRAIT_IMG, CLAY_STUDIO_IMG } from '../data/redVisionData.js';
import { ImageUploader } from './ImageUploader.js';
import { VideoOutput } from './VideoOutput.js';
import { ScrollRow } from './ScrollRow.js';
import { PRODUCTS, ATMOSPHERES, MediaSelection } from '../data.js';
import { toInlineImages, InlineImage } from '../images.js';
import { AIStaffRoster } from './AIStaffRoster.js';
import { AvatarCustomizer } from './AvatarCustomizer.js';
import { CollaborativeStaffChat } from './CollaborativeStaffChat.js';
import { CollaborativeCanvas } from './CollaborativeCanvas.js';
import { AudioReactiveCoach } from './AudioReactiveCoach.js';
import { AtAGlanceMetrics } from './AtAGlanceMetrics.js';
import { ProjectExporter } from './ProjectExporter.js';
import { VirtualRealityVRMode } from './VirtualRealityVRMode.js';
import { SocialProofTicker } from './SocialProofTicker.js';
import { GenerationProgressStepper } from './GenerationProgressStepper.js';
import { GenerationCompletionModal, AssetCompletionData } from './GenerationCompletionModal.js';
import { VoiceToTextInput } from './VoiceToTextInput.js';
import { ClientDashboard } from './ClientDashboard.js';
import { PublicShareModal, ShareConfig } from './PublicShareModal.js';
import { PublicClientPortal } from './PublicClientPortal.js';
import { InviteCollaboratorModal } from './InviteCollaboratorModal.js';
import { RBACManagementPanel } from './RBACManagementPanel.js';
import { QuickStartTemplates } from './QuickStartTemplates.js';
import { DeveloperHubIntegrations } from './DeveloperHubIntegrations.js';
import { YouTubeAdminConsole } from './YouTubeAdminConsole.js';
import { SocialMediaController } from './SocialMediaController.js';
import { ViralCredEngine } from './ViralCredEngine.js';
import { BulkCalendarView } from './BulkCalendarView.js';
import { OmniSearchBar } from './OmniSearchBar.js';
import { ProjectMilestoneGantt } from './ProjectMilestoneGantt.js';
import { VoiceoverEngine } from './VoiceoverEngine.js';
import { AdAgencySystem } from './AdAgencySystem.js';

type AppState = 'IDLE' | 'GENERATING_ATMOSPHERE' | 'GENERATING_PROMPT' | 'GENERATING_VIDEO' | 'VIDEO_READY';

interface VideoVersion {
  label: string;
  interactionId: string;
  videoUrl: string;
  prompt: string;
}

export function StudioConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('agency');
  const [isConsoleHighContrast, setIsConsoleHighContrast] = useState<boolean>(false);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>(JASON_PORTRAIT_IMG);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState<boolean>(false);

  // Completion Confirmation Modal State
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completedAssetData, setCompletedAssetData] = useState<AssetCompletionData | null>(null);

  // Public Share Link & Client Portal State
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareAssetTarget, setShareAssetTarget] = useState<AssetCompletionData | null>(null);
  const [publicPortalConfig, setPublicPortalConfig] = useState<ShareConfig | null>(null);

  // ==================== RBAC & COLLABORATOR STATE ====================
  const [currentAccessRole, setCurrentAccessRole] = useState<UserAccessRole>('Owner');
  const [teamMembersList, setTeamMembersList] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [collaboratorInvites, setCollaboratorInvites] = useState<CollaboratorInvite[]>([
    {
      id: 'inv-101',
      email: 'sarah.lin@defjam.com',
      name: 'Dr. Sarah Lin',
      accessRole: 'Editor',
      department: 'Publishing & IP Licensing',
      invitedBy: 'Jason Salvador (Owner)',
      invitedAt: '10 mins ago',
      status: 'Pending',
      inviteLink: 'https://redvisionai.com/invite/inv_defjam_001?role=editor',
    }
  ]);
  const [rbacRoleWarning, setRbacRoleWarning] = useState<string | null>(null);

  const handleUpdateMemberRole = (memberId: string, newRole: UserAccessRole) => {
    setTeamMembersList(prev => prev.map(m => m.id === memberId ? { ...m, accessRole: newRole } : m));
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembersList(prev => prev.filter(m => m.id !== memberId));
  };

  const handleSendInvite = (inviteData: Omit<CollaboratorInvite, 'id' | 'invitedAt' | 'status' | 'inviteLink'>) => {
    const newInvite: CollaboratorInvite = {
      ...inviteData,
      id: `inv-${Date.now().toString(36)}`,
      invitedAt: 'Just now',
      status: 'Pending',
      inviteLink: `https://redvisionai.com/invite/token_${Math.random().toString(36).substring(2, 8)}?role=${inviteData.accessRole.toLowerCase()}`,
    };
    setCollaboratorInvites(prev => [newInvite, ...prev]);

    const newMember: TeamMember = {
      id: `tm-${Date.now().toString(36)}`,
      name: inviteData.name,
      role: `${inviteData.accessRole} (${inviteData.department})`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'offline',
      apiKeySet: false,
      email: inviteData.email,
      accessRole: inviteData.accessRole,
      department: inviteData.department,
    };
    setTeamMembersList(prev => [...prev, newMember]);
  };

  const handleRevokeInvite = (inviteId: string) => {
    setCollaboratorInvites(prev => prev.filter(inv => inv.id !== inviteId));
  };

  // ==================== 1. ACOUSTIC SIG STATE ====================
  const [audioPrompt, setAudioPrompt] = useState('Hyper-clean 808 trap beat with ambient vocal chops and 24-bit radio master response');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthResult, setSynthResult] = useState<AudioSynthResult | null>({
    title: 'Midnight Echoes Master',
    bpm: 128,
    key: 'F Minor',
    genre: 'Cinematic Ambient Trap',
    summary: 'Pro-grade 24-bit audio master generated with high dynamic range, punchy sub-bass transient shaping, and airy high-end vocal shimmer.',
    stems: [
      { name: '808 Sub Drums', type: 'Drums', level: 85, muted: false, solo: false },
      { name: 'Sub Bass synth', type: 'Bass', level: 90, muted: false, solo: false },
      { name: 'Atmospheric Synths', type: 'Synths', level: 75, muted: false, solo: false },
      { name: 'Vocal Chops & Reverb', type: 'Vocals', level: 80, muted: false, solo: false },
    ]
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSynthesizeAudio = async () => {
    if (currentAccessRole === 'Viewer') {
      setRbacRoleWarning('Viewer Role Protection: Read-only mode enabled. You cannot trigger AI 24-bit audio synthesis in Viewer mode. Switch to Editor or Owner role in the Team tab.');
      setTimeout(() => setRbacRoleWarning(null), 6000);
      return;
    }
    if (!audioPrompt.trim()) return;
    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Analyze and outline an AI music synthesis master for prompt: "${audioPrompt}". Provide BPM, Key, Genre, and audio stem details.` })
      });
      const data = await res.json();
      
      const newBpm = Math.floor(Math.random() * (140 - 90 + 1)) + 90;
      const newKey = ['C Minor', 'F Minor', 'A Major', 'G Minor', 'D Minor'][Math.floor(Math.random() * 5)];

      setSynthResult({
        title: audioPrompt.slice(0, 24) + '...',
        bpm: newBpm,
        key: newKey,
        genre: 'Executive Audio Master',
        summary: data.text || 'Synthesized 24-bit audio master with balanced stem separation and optimized frequency spectrum.',
        stems: [
          { name: 'Primary Rhythm & Percussion', type: 'Drums', level: 85, muted: false, solo: false },
          { name: 'Low-Frequency Sub & Bass', type: 'Bass', level: 88, muted: false, solo: false },
          { name: 'Lead Melodics & Synths', type: 'Synths', level: 78, muted: false, solo: false },
          { name: 'Harmonic Vocal Stems', type: 'Vocals', level: 82, muted: false, solo: false },
        ]
      });

      // Trigger completion confirmation modal!
      setCompletedAssetData({
        title: `${audioPrompt.slice(0, 28)}... 24-Bit Master`,
        category: 'AUDIO',
        format: 'WAV 24-Bit / 96kHz',
        size: '52.4 MB',
        specs: `BPM: ${newBpm} | Key: ${newKey} | 4 Isolated Stems`,
      });
      setShowCompletionModal(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const toggleStemMute = (index: number) => {
    if (!synthResult) return;
    const newStems = [...synthResult.stems];
    newStems[index].muted = !newStems[index].muted;
    setSynthResult({ ...synthResult, stems: newStems });
  };

  // ==================== 2. MOTION CINEMA STATE ====================
  const [product, setProduct] = useState<MediaSelection | null>(null);
  const [atmosphere, setAtmosphere] = useState<MediaSelection | null>(null);
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [submittedImages, setSubmittedImages] = useState<string[]>([]);
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [versions, setVersions] = useState<VideoVersion[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const versionCount = useRef(0);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [promptOpen, setPromptOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [logs, setLogs] = useState<{ id: string; timestamp: string; message: string; type: 'info' | 'success' | 'warn' | 'error'; image?: string }[]>([]);

  const addLog = (message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info', image?: string) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString().split('T')[1].substring(0, 12),
      message,
      type,
      image
    }]);
  };

  const usingGenerate = !atmosphere && generatePrompt.trim().length > 0;
  const hasAtmosphere = !!atmosphere || usingGenerate;
  const isGenerating = appState === 'GENERATING_ATMOSPHERE' || appState === 'GENERATING_PROMPT' || appState === 'GENERATING_VIDEO';

  const selectAtmosphere: React.Dispatch<React.SetStateAction<MediaSelection | null>> = (value) => {
    setAtmosphere(value);
    if (typeof value !== 'function' && value) {
      setGeneratePrompt('');
    }
  };

  const selectedVersion = versions.find(v => v.label === selectedLabel) ?? null;

  const addVersion = (interactionId: string, fileId: string, promptText: string) => {
    const label = `V${++versionCount.current}`;
    setVersions(prev => [...prev, { label, interactionId, videoUrl: `/api/video/${fileId}`, prompt: promptText }]);
    setSelectedLabel(label);
  };

  const pollVideoStatus = (fileId: string, interactionId: string, promptText: string, isInitial: boolean) => {
    addLog('Polling Omni backend for 4K video render...', 'warn');
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/file-status/${fileId}`);
        const data = await res.json();
        if (data.state === 'ACTIVE') {
          clearInterval(interval);
          addLog('Render complete. Video ready.', 'success');
          addVersion(interactionId, fileId, promptText);
          setAppState('VIDEO_READY');

          // Trigger completion confirmation modal!
          setCompletedAssetData({
            title: promptText ? `${promptText.slice(0, 28)}... 4K Render` : 'Motion Cinema 4K Render',
            category: 'VIDEO',
            format: 'ProRes 422 HQ / 4K UHD',
            size: '1.2 GB',
            specs: 'Resolution: 3840x2160 | 60fps | HDR10',
          });
          setShowCompletionModal(true);

          if (isInitial) {
            setProduct(null);
            setAtmosphere(null);
            setGeneratePrompt('');
          }
        } else if (data.state === 'FAILED') {
          clearInterval(interval);
          addLog('Omni backend reported render failed.', 'error');
          setAppState(isInitial ? 'IDLE' : 'VIDEO_READY');
        }
      } catch (e: any) {
        addLog(`Polling error: ${e.message}`, 'error');
      }
    }, 5000);
  };

  const handleVideoSubmit = async () => {
    if (currentAccessRole === 'Viewer') {
      setRbacRoleWarning('Viewer Role Protection: Read-only mode enabled. Motion Cinema video renders are restricted in Viewer mode. Switch to Editor or Owner role in the Team tab.');
      setTimeout(() => setRbacRoleWarning(null), 6000);
      return;
    }
    if (!product || !hasAtmosphere) {
      addLog('Please add a product and an atmosphere.', 'error');
      return;
    }
    const settingInput = generatePrompt.trim();
    versionCount.current = 0;
    setVersions([]);
    setSelectedLabel(null);

    try {
      const productImages = await toInlineImages(product.images);
      let atmosphereImages: InlineImage[];
      let atmosphereDesc: string;
      let atmosphereSources: string[];

      if (usingGenerate) {
        setAppState('GENERATING_ATMOSPHERE');
        addLog(`Generating atmosphere setting: "${settingInput}"`);
        const atmoRes = await fetch('/api/generate-atmosphere', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: settingInput })
        });
        const atmoData = await atmoRes.json();
        if (!atmoRes.ok) throw new Error(atmoData.error || 'Failed to generate atmosphere');
        const atmoDataUrl = `data:${atmoData.image.mimeType};base64,${atmoData.image.data}`;
        atmosphereImages = [{ data: atmoData.image.data, mimeType: atmoData.image.mimeType }];
        atmosphereDesc = (atmoData.prompt as string) || settingInput;
        atmosphereSources = [atmoDataUrl];
      } else {
        setAppState('GENERATING_PROMPT');
        atmosphereImages = await toInlineImages(atmosphere!.images);
        atmosphereDesc = atmosphere!.description;
        atmosphereSources = atmosphere!.images;
      }

      setSubmittedImages([...product.images, ...atmosphereSources]);
      setAppState('GENERATING_PROMPT');
      addLog('Requesting Gemini Flash prompt translation...', 'warn');
      const promptRes = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productDesc: product.description, atmosphereDesc, productImages, atmosphereImages })
      });
      const promptData = await promptRes.json();
      if (!promptRes.ok) throw new Error(promptData.error || 'Failed to generate prompt');

      const generatedPrompt = promptData.prompt as string;
      setAppState('GENERATING_VIDEO');
      addLog('Transmitting payload to Gemini Omni Flash...', 'warn');

      const videoRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: generatedPrompt, productImages, atmosphereImages })
      });
      const videoData = await videoRes.json();
      if (!videoRes.ok) throw new Error(videoData.error || 'Video generation failed');

      pollVideoStatus(videoData.fileId, videoData.interactionId, generatedPrompt, true);
    } catch (e: any) {
      setAppState('IDLE');
      addLog(`Error: ${e.message}`, 'error');
    }
  };

  // ==================== 3. RELEASE CALENDAR STATE ====================
  const [calendarSubTab, setCalendarSubTab] = useState<'bulkCalendar' | 'ganttTimeline' | 'isrcList'>('bulkCalendar');
  const [releases, setReleases] = useState<ReleaseItem[]>(INITIAL_RELEASES);
  const [newArtist, setNewArtist] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newIsrc, setNewIsrc] = useState('US-RV1-27-' + Math.floor(10000 + Math.random() * 90000));
  const [newDate, setNewDate] = useState('2027-09-15');
  const [showProjectExporter, setShowProjectExporter] = useState(false);

  const handleAddRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAccessRole === 'Viewer') {
      setRbacRoleWarning('Viewer Role Protection: Read-only mode enabled. Adding new releases to calendar is restricted in Viewer mode.');
      setTimeout(() => setRbacRoleWarning(null), 6000);
      return;
    }
    if (!newArtist.trim() || !newTitle.trim()) return;
    const item: ReleaseItem = {
      id: `rel-${Date.now()}`,
      artist: newArtist,
      title: newTitle,
      isrc: newIsrc,
      releaseDate: newDate,
      status: 'In Progress',
      checklist: {
        audioMaster: true,
        motionCinema: false,
        isrcRegistered: true,
        distributionApproved: false,
      }
    };
    setReleases([item, ...releases]);
    setNewArtist('');
    setNewTitle('');
    setNewIsrc('US-RV1-27-' + Math.floor(10000 + Math.random() * 90000));
  };

  const toggleChecklist = (releaseId: string, key: keyof ReleaseItem['checklist']) => {
    if (currentAccessRole === 'Viewer') {
      setRbacRoleWarning('Viewer Role Protection: Read-only mode enabled. Release checklist modification is restricted in Viewer mode.');
      setTimeout(() => setRbacRoleWarning(null), 6000);
      return;
    }
    setReleases(releases.map(r => {
      if (r.id === releaseId) {
        const updatedChecklist = { ...r.checklist, [key]: !r.checklist[key] };
        const allDone = Object.values(updatedChecklist).every(Boolean);
        return {
          ...r,
          checklist: updatedChecklist,
          status: allDone ? 'Released' : 'In Progress'
        };
      }
      return r;
    }));
  };

  const handleApplyTemplate = (
    template: QuickStartTemplate, 
    options: { loadAudioPrompt: boolean; loadVideoConcept: boolean; loadReleases: boolean }
  ) => {
    if (options.loadAudioPrompt && template.presetAudioPrompt) {
      setAudioPrompt(template.presetAudioPrompt);
    }

    if (options.loadVideoConcept && template.presetVideoConcept) {
      setProduct({
        id: `prod-${template.id}`,
        source: 'suggestion',
        images: [template.heroImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
        description: template.presetVideoConcept.productTitle,
      });

      setAtmosphere({
        id: `atmos-${template.id}`,
        source: 'suggestion',
        images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80'],
        description: template.presetVideoConcept.atmosphereTitle,
      });

      if (template.presetVideoConcept.vslScriptSummary) {
        setGeneratePrompt(template.presetVideoConcept.vslScriptSummary);
      }
    }

    if (options.loadReleases && template.presetReleases.length > 0) {
      const newReleaseItems: ReleaseItem[] = template.presetReleases.map((r, i) => ({
        id: `rel-tmpl-${Date.now()}-${i}`,
        artist: r.artist,
        title: r.title,
        isrc: r.isrc,
        releaseDate: r.releaseDate,
        status: 'In Progress',
        checklist: {
          audioMaster: true,
          motionCinema: true,
          isrcRegistered: true,
          distributionApproved: false,
        },
        coverImage: template.heroImage,
      }));

      setReleases(prev => [...newReleaseItems, ...prev]);
    }
  };

  // ==================== 4. TEAM HUB & API KEY VAULT STATE ====================
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [messages, setMessages] = useState<TeamMessage[]>(INITIAL_MESSAGES);
  const [newMessageText, setNewMessageText] = useState('');
  const [userApiKey, setUserApiKey] = useState('AIzaSyD-********************');
  const [keySaved, setKeySaved] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    const msg: TeamMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'tm-1',
      senderName: 'Jason Salvador',
      senderAvatar: JASON_PORTRAIT_IMG,
      text: newMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, msg]);
    setNewMessageText('');
  };

  if (publicPortalConfig) {
    return (
      <PublicClientPortal
        shareConfig={publicPortalConfig}
        onBackToConsole={() => setPublicPortalConfig(null)}
      />
    );
  }

  return (
    <div className={`w-full bg-black min-h-screen py-10 font-sans transition-all ${
      isConsoleHighContrast ? 'contrast-125 bg-black text-white [&_*]:border-amber-400/80 [&_button]:focus:ring-2 [&_button]:focus:ring-amber-400' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Global Omni-Search Bar */}
        <OmniSearchBar
          onSelectResult={(targetTab) => {
            setActiveTab(targetTab);
          }}
        />

        {/* Top Console Title & Tabs Bar */}
        <div className="p-6 rounded-2xl bg-zinc-950/90 border border-red-500/30 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-900 p-0.5 shadow-lg shadow-red-600/30">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-red-500">
                <Disc className="w-6 h-6 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white font-mono uppercase tracking-tight">
                  RED VISION CONSOLE
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800/60 rounded-full">
                  EXECUTIVE v2.5
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">
                redvisionai.com — Integrated Executive Command Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* WCAG High Contrast Mode Toggle */}
            <button
              onClick={() => setIsConsoleHighContrast(!isConsoleHighContrast)}
              className={`px-3 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                isConsoleHighContrast
                  ? 'bg-amber-400 text-black font-extrabold ring-2 ring-white shadow-xl'
                  : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white'
              }`}
              aria-label="Toggle High Contrast Mode for WCAG Accessibility"
            >
              <Contrast className="w-4 h-4 text-amber-400" />
              <span>{isConsoleHighContrast ? 'WCAG HIGH CONTRAST: ON' : 'HIGH CONTRAST: OFF'}</span>
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-black/80 border border-zinc-800" role="tablist" aria-label="Studio Console Main Tabs">
            <button
              onClick={() => setActiveTab('agency')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'agency'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-lg shadow-amber-500/40 ring-1 ring-amber-400'
                  : 'text-amber-400 hover:text-white hover:bg-zinc-900 border border-amber-500/40'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>AI Ad Agency OS (1-Prompt)</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/40 ring-1 ring-amber-400'
                  : 'text-amber-400 hover:text-white hover:bg-zinc-900 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Quick Start Templates</span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'integrations'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-cyan-400 hover:text-white hover:bg-zinc-900 border border-cyan-500/30'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>GitHub & Hugging Face</span>
            </button>

            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-red-400 hover:text-white hover:bg-zinc-900 border border-red-500/30'
              }`}
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube Admin</span>
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'socials'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-blue-400 hover:text-white hover:bg-zinc-900 border border-blue-500/30'
              }`}
            >
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Socials & Meta (FB/IG)</span>
            </button>

            <button
              onClick={() => setActiveTab('viralcred')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'viralcred'
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400'
                  : 'text-amber-400 hover:text-white hover:bg-zinc-900 border border-amber-500/30'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>ViralCredAI & CredScout</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Folder className="w-4 h-4 text-amber-400" />
              Client Dashboard
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'metrics'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              At-a-Glance Metrics
            </button>

            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'canvas'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              Digital Canvas
            </button>

            <button
              onClick={() => setActiveTab('acoustic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'acoustic'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Music className="w-4 h-4" />
              Acoustic Sig
            </button>

            <button
              onClick={() => setActiveTab('cinema')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'cinema'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Film className="w-4 h-4" />
              Motion Cinema
            </button>

            <button
              onClick={() => setActiveTab('voiceover')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'voiceover'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400'
                  : 'text-amber-400 hover:text-white hover:bg-zinc-900 border border-amber-500/30'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-400" />
              Voiceover Studio
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'calendar'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Release Calendar
            </button>

            <button
              onClick={() => setActiveTab('gantt')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'gantt'
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/40 ring-1 ring-amber-400'
                  : 'text-rose-400 hover:text-white hover:bg-zinc-900 border border-rose-500/30'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              Gantt Timeline
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'staff'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Bot className="w-4 h-4 text-rose-400" />
              AI Staff Roster
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'team'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Users className="w-4 h-4" />
              Team & API Keys
            </button>

            <button
              onClick={() => setActiveTab('vr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'vr'
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400'
                  : 'text-red-400 hover:text-white hover:bg-red-950/50'
              }`}
            >
              <Eye className="w-4 h-4 text-red-400 animate-pulse" />
              <span>VR 360° Mode</span>
            </button>

            {/* VR Mode Quick Toggle Header Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'vr' ? 'canvas' : 'vr')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border transition-all shadow-md ${
                activeTab === 'vr'
                  ? 'bg-red-600 border-red-400 text-white shadow-red-600/40'
                  : 'bg-red-950/80 border-red-500/60 hover:bg-red-900 text-red-200'
              }`}
            >
              <Box className="w-4 h-4 text-red-400" />
              <span className="font-mono text-xs font-bold uppercase">
                {activeTab === 'vr' ? 'Exit VR View' : 'VR 360° Mode'}
              </span>
            </button>

            {/* Export Project PDF/CSV Button */}
            <button
              onClick={() => setShowProjectExporter(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-md shadow-red-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Export Project</span>
            </button>

            {/* Avatar Customizer Quick Toggle Button */}
            <button
              onClick={() => setShowAvatarCustomizer(!showAvatarCustomizer)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 hover:bg-red-900 text-white font-mono text-xs font-bold uppercase transition-all shadow-md"
            >
              <img
                src={currentUserAvatar}
                alt="Jason Salvador Avatar"
                className="w-6 h-6 rounded-md object-cover border border-red-500"
              />
              <span className="text-red-300">Customize Avatar</span>
            </button>
          </div>
        </div>

        {/* Modal Render for ProjectExporter */}
        {showProjectExporter && (
          <ProjectExporter onClose={() => setShowProjectExporter(false)} />
        )}

        {/* Modal / Inline Render for AvatarCustomizer */}
        {showAvatarCustomizer && (
          <AvatarCustomizer
            currentAvatar={currentUserAvatar}
            onUpdateAvatar={(newUrl) => {
              setCurrentUserAvatar(newUrl);
            }}
            onClose={() => setShowAvatarCustomizer(false)}
          />
        )}

        {/* Generation Completion Confirmation Modal */}
        <GenerationCompletionModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          asset={completedAssetData}
          onNavigateToDashboard={() => setActiveTab('dashboard')}
        />

        {/* Public Share Link Generator Modal */}
        <PublicShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          asset={shareAssetTarget}
          onOpenPublicPortal={(config) => setPublicPortalConfig(config)}
        />

        {/* Invite Collaborator RBAC Modal */}
        <InviteCollaboratorModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onSendInvite={handleSendInvite}
        />

        {/* RBAC Role Restriction Protection Toast Banner */}
        {rbacRoleWarning && (
          <div className="p-4 rounded-2xl bg-cyan-950/95 border border-cyan-500/80 text-cyan-200 flex items-center justify-between gap-3 shadow-2xl font-mono text-xs ring-1 ring-cyan-500/40">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>{rbacRoleWarning}</span>
            </div>
            <button
              onClick={() => setRbacRoleWarning(null)}
              className="p-1.5 rounded-lg bg-cyan-900 hover:bg-cyan-800 text-cyan-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Real-time Global Client Activity Ticker */}
        <SocialProofTicker />

        {/* AI Multi-Step Generation Progress Stepper Indicator */}
        <GenerationProgressStepper 
          isGenerating={isSynthesizing || isGenerating}
          title={
            activeTab === 'acoustic' 
              ? 'Acoustic Sig 24-Bit Audio Synthesis Pipeline'
              : activeTab === 'cinema' 
              ? 'Motion Cinema 4K Video Generation Pipeline' 
              : 'Red Vision AI Studio Master Generation Pipeline'
          }
        />

        {/* TAB -3: ONE-PROMPT AI AD AGENCY OPERATING SYSTEM */}
        {activeTab === 'agency' && (
          <AdAgencySystem />
        )}

        {/* TAB -2: QUICK START TEMPLATE LIBRARY */}
        {activeTab === 'templates' && (
          <QuickStartTemplates
            onApplyTemplate={handleApplyTemplate}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* TAB -1.8: DEVELOPER HUB & AI MODEL INTEGRATIONS (GITHUB & HUGGING FACE) */}
        {activeTab === 'integrations' && (
          <DeveloperHubIntegrations />
        )}

        {/* TAB -1.5: YOUTUBE ADMINISTRATION & CONTENT ID HUB */}
        {activeTab === 'youtube' && (
          <YouTubeAdminConsole />
        )}

        {/* TAB -1.2: MULTI-DIVISION SOCIAL CONTROLLER & META (FB/IG) RELATIONSHIP */}
        {activeTab === 'socials' && (
          <SocialMediaController />
        )}

        {/* TAB -1.1: VIRALCREDAI & CREDSCOUT ENGINE */}
        {activeTab === 'viralcred' && (
          <ViralCredEngine />
        )}

        {/* TAB -1: CLIENT DASHBOARD DELIVERABLES & VAULT */}
        {activeTab === 'dashboard' && (
          <ClientDashboard
            onSelectAssetForModal={(asset) => {
              setCompletedAssetData(asset);
              setShowCompletionModal(true);
            }}
            onOpenShareModal={(asset) => {
              setShareAssetTarget(asset);
              setShowShareModal(true);
            }}
          />
        )}

        {/* TAB 0: AT-A-GLANCE RECHARTS METRICS PANEL */}
        {activeTab === 'metrics' && (
          <AtAGlanceMetrics />
        )}

        {/* TAB 0.5: COLLABORATIVE DIGITAL STORYBOARD & FLOW CANVAS */}
        {activeTab === 'canvas' && (
          <CollaborativeCanvas />
        )}

        {/* TAB 0.8: VIRTUAL REALITY 360 PANORAMIC BRAINSTORMING MODE */}
        {activeTab === 'vr' && (
          <VirtualRealityVRMode onClose={() => setActiveTab('canvas')} />
        )}

        {/* TAB 1: ACOUSTIC SIG AUDIO SYNTHESIS & AUDIO-REACTIVE COACH */}
        {activeTab === 'acoustic' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Prompt Input & Presets */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-6 transition-all duration-300 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-950/50 hover:ring-1 hover:ring-red-500/30">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  ACOUSTIC SIG PRO AUDIO SYNTHESIZER
                </div>
                <h2 className="text-xl font-bold text-white font-sans">
                  24-Bit Radio Master & Stem Synthesizer
                </h2>
                <p className="text-xs font-sans text-zinc-400 mt-1">
                  Describe your desired creative vision using voice or text or select an executive preset below.
                </p>
              </div>

              {/* Microphone-Based Voice-to-Text Input Field */}
              <VoiceToTextInput
                label="Voice & Text Audio Prompt / Creative Brief"
                currentValue={audioPrompt}
                onTranscriptChange={(text) => setAudioPrompt(text)}
                placeholder="Click microphone to describe your audio track aesthetic or type here..."
              />

              {/* Presets */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Executive Presets</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Hyper-clean 808 Trap Beat',
                    'Atmospheric R&B Master',
                    'Radio-Ready Pop Vocals',
                    'Acoustic Warm Studio Live'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setAudioPrompt(preset)}
                      className="px-3 py-1.5 rounded-lg bg-black border border-zinc-800 hover:border-red-500/60 text-[11px] font-mono text-zinc-300 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSynthesizeAudio}
                disabled={isSynthesizing || !audioPrompt.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white font-mono text-xs font-bold uppercase tracking-wider hover:from-red-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 disabled:opacity-50"
              >
                {isSynthesizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synthesizing 24-Bit Audio Stems...
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4" />
                    Synthesize Master & Separate Stems
                  </>
                )}
              </button>
            </div>

            {/* Audio Stem Separator & Spectrum Output */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-6">
              {synthResult ? (
                <>
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">Synthesized Output</span>
                      <h3 className="text-lg font-bold text-white font-sans">{synthResult.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-[11px] font-mono text-red-300 font-bold">
                        {synthResult.bpm} BPM
                      </span>
                      <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-[11px] font-mono text-red-300 font-bold">
                        {synthResult.key}
                      </span>
                    </div>
                  </div>

                  {/* Simulated Waveform Visualizer */}
                  <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>Frequency Spectrum (20Hz - 20kHz)</span>
                      <span className="text-red-400 font-bold">24-BIT / 48kHz WAV</span>
                    </div>
                    <div className="h-16 flex items-end gap-1 px-2 pt-2 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-900">
                      {Array.from({ length: 48 }).map((_, idx) => {
                        const h = isPlayingAudio 
                          ? Math.floor(Math.random() * 80) + 15
                          : Math.floor(Math.sin(idx) * 35) + 35;
                        return (
                          <div
                            key={idx}
                            style={{ height: `${h}%` }}
                            className="flex-1 bg-gradient-to-t from-red-700 via-red-500 to-rose-400 rounded-t transition-all duration-150"
                          />
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono text-xs font-bold uppercase hover:from-red-500 hover:to-rose-500 transition-colors shadow-lg shadow-red-600/30"
                      >
                        {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        {isPlayingAudio ? 'Pause Master Preview' : 'Play 24-Bit Master'}
                      </button>
                      <span className="text-xs font-mono text-zinc-500">Acoustic Sig DSP Engine</span>
                    </div>
                  </div>

                  {/* Stems Multi-Track Control */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-red-400" />
                      Isolated Audio Stems
                    </h4>
                    <div className="space-y-2">
                      {synthResult.stems.map((stem, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-black border border-zinc-900 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <div>
                              <div className="text-xs font-mono font-bold text-white">{stem.name}</div>
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">{stem.type} Stem</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 flex-1 max-w-xs">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={stem.muted ? 0 : stem.level}
                              onChange={(e) => {
                                const newStems = [...synthResult.stems];
                                newStems[idx].level = Number(e.target.value);
                                setSynthResult({ ...synthResult, stems: newStems });
                              }}
                              className="w-full accent-red-500 bg-zinc-800 rounded-lg h-1.5"
                            />
                            <span className="text-[10px] font-mono text-zinc-400 w-8">{stem.muted ? 'Mute' : `${stem.level}%`}</span>
                          </div>

                          <button
                            onClick={() => toggleStemMute(idx)}
                            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors ${
                              stem.muted ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {stem.muted ? 'Muted' : 'Mute'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-zinc-500 font-mono text-xs space-y-2">
                  <Music className="w-8 h-8 text-zinc-800" />
                  <span>Synthesize an audio prompt to view isolated stems and frequency spectra.</span>
                </div>
              )}
            </div>
            </div>

            {/* Audio-Reactive Waveform Visualizer & Virtual Coach Component */}
            <AudioReactiveCoach />
          </div>
        )}

        {/* TAB 2: MOTION CINEMA & GEMINI OMNI FLASH */}
        {activeTab === 'cinema' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-6 transition-all duration-300 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-950/50 hover:ring-1 hover:ring-red-500/30">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2">
                  <Film className="w-4 h-4 text-red-500" />
                  MOTION CINEMA ENGINE
                </div>
                <h2 className="text-xl font-bold text-white font-sans">
                  Gemini Omni Flash 4K Reel Generator
                </h2>
                <p className="text-xs font-sans text-zinc-400 mt-1">
                  Upload a product or music asset photo, select an atmosphere or speak your custom video vision.
                </p>
              </div>

              <ImageUploader
                title="1. Product / Music Asset"
                type="product"
                suggestions={PRODUCTS}
                selection={product}
                onSelect={setProduct}
                disabled={isGenerating}
              />

              <ImageUploader
                title="2. Atmosphere Reference"
                type="atmosphere"
                suggestions={ATMOSPHERES}
                selection={atmosphere}
                onSelect={selectAtmosphere}
                disabled={isGenerating}
              />

              {/* Director's Custom Voice Prompt */}
              <VoiceToTextInput
                label="Director's Custom Voice Prompt / Video Direction"
                currentValue={generatePrompt}
                onTranscriptChange={(text) => {
                  setGeneratePrompt(text);
                  setAtmosphere(null);
                }}
                placeholder="Or speak your custom scene direction (e.g. Cyberpunk neon rain with slow motion bass drop...)"
              />

              <button
                onClick={handleVideoSubmit}
                disabled={!product || !hasAtmosphere || isGenerating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white font-mono text-xs font-bold uppercase tracking-wider hover:from-red-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Rendering Motion Reel...
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4" />
                    Render 4K Motion Reel
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">Motion Cinema Output</span>
                  <h3 className="text-lg font-bold text-white font-sans">
                    {selectedVersion ? `Render ${selectedVersion.label}` : 'Gemini Omni Preview'}
                  </h3>
                </div>
                {versions.length > 0 && (
                  <div className="flex items-center gap-2">
                    {versions.map(v => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedLabel(v.label)}
                        className={`px-3 py-1 rounded-lg font-mono text-xs font-bold ${
                          selectedLabel === v.label ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <VideoOutput appState={appState} videoUrl={selectedVersion?.videoUrl ?? null} logs={logs} />
            </div>
          </div>
        )}

        {/* TAB 3: RELEASE CALENDAR & ISRC TRACKER */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* View Mode Sub-Header Switcher */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono text-xs shadow-xl flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCalendarSubTab('bulkCalendar')}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
                    calendarSubTab === 'bulkCalendar'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-black border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Bulk Calendar View (Drag & Drop)</span>
                </button>

                <button
                  onClick={() => setCalendarSubTab('ganttTimeline')}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
                    calendarSubTab === 'ganttTimeline'
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/40 ring-1 ring-amber-400'
                      : 'bg-black border border-zinc-800 text-amber-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Milestone Gantt Timeline</span>
                </button>

                <button
                  onClick={() => setCalendarSubTab('isrcList')}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
                    calendarSubTab === 'isrcList'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-black border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Disc className="w-4 h-4 text-white" />
                  <span>Artist Rollout & ISRC Manager</span>
                </button>
              </div>

              <span className="text-zinc-500 text-[10px] uppercase font-bold hidden sm:inline-block">
                Multi-Channel Release Scheduler
              </span>
            </div>

            {calendarSubTab === 'bulkCalendar' ? (
              <BulkCalendarView />
            ) : calendarSubTab === 'ganttTimeline' ? (
              <ProjectMilestoneGantt />
            ) : (
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-1">
                      <Calendar className="w-4 h-4 text-red-500" />
                      RELEASE & DELIVERY CALENDAR
                    </div>
                    <h2 className="text-xl font-bold text-white font-sans">
                      Artist Rollout & ISRC Code Manager
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-800/60 text-xs font-mono text-red-300 font-bold">
                    {releases.length} Active Rollouts
                  </span>
                </div>

            {/* Add New Release Form */}
            <form onSubmit={handleAddRelease} className="p-4 rounded-xl bg-black border border-zinc-900 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Artist Name</label>
                <input
                  type="text"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  placeholder="e.g. Siren & The Waves"
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs font-mono rounded-lg focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Track / Album Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Midnight Echoes"
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs font-mono rounded-lg focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">ISRC Code</label>
                <input
                  type="text"
                  value={newIsrc}
                  onChange={(e) => setNewIsrc(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-red-400 px-3 py-2 text-xs font-mono rounded-lg focus:border-red-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Target Release Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs font-mono rounded-lg focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30"
              >
                <Plus className="w-4 h-4" />
                Add Rollout
              </button>
            </form>

            {/* Release Items Table */}
            <div className="space-y-4">
              {releases.map((rel) => (
                <div key={rel.id} className="p-5 rounded-xl bg-black border border-zinc-900 hover:border-zinc-800 transition-colors space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-base text-white font-sans">{rel.title}</span>
                        <span className="text-xs font-mono text-zinc-400">by {rel.artist}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          rel.status === 'Released' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-zinc-900 text-yellow-400 border border-zinc-800'
                        }`}>
                          {rel.status}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-red-400 mt-1 font-bold">
                        ISRC: {rel.isrc} | Date: {rel.releaseDate}
                      </div>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="pt-2 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: 'audioMaster' as const, label: '24-Bit Audio Master' },
                      { key: 'motionCinema' as const, label: '4K Motion Teaser' },
                      { key: 'isrcRegistered' as const, label: 'ISRC Registered' },
                      { key: 'distributionApproved' as const, label: 'Distro Approved' },
                    ].map((item) => {
                      const checked = rel.checklist[item.key];
                      return (
                        <button
                          key={item.key}
                          onClick={() => toggleChecklist(rel.id, item.key)}
                          className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                            checked ? 'bg-red-950/60 border-red-800/60 text-red-300' : 'bg-zinc-900/60 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-white ${checked ? 'bg-red-600' : 'bg-zinc-800'}`}>
                            {checked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-[11px] font-mono font-semibold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          </div>
        )}

        {/* TAB: VOICE OVER ENGINE */}
        {activeTab === 'voiceover' && (
          <VoiceoverEngine />
        )}

        {/* TAB: PROJECT MILESTONE GANTT TIMELINE */}
        {activeTab === 'gantt' && (
          <ProjectMilestoneGantt />
        )}

        {/* TAB 4: AI SPECIALIZED STAFF ROSTER & REAL-TIME COLLABORATIVE CHAT */}
        {activeTab === 'staff' && (
          <div className="space-y-8">
            <CollaborativeStaffChat currentUserAvatar={currentUserAvatar} />
            <AIStaffRoster />
          </div>
        )}

        {/* TAB 5: TEAM WORKSPACE & API KEY ISOLATION */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            {/* RBAC Role-Based Access Control & Collaborator Invites Manager */}
            <RBACManagementPanel
              teamMembers={teamMembersList}
              onUpdateMemberRole={handleUpdateMemberRole}
              onRemoveMember={handleRemoveMember}
              invites={collaboratorInvites}
              onOpenInviteModal={() => setShowInviteModal(true)}
              onRevokeInvite={handleRevokeInvite}
              currentActiveUserRole={currentAccessRole}
              onSwitchActiveUserRole={setCurrentAccessRole}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Isolated API Key Vault */}
              <div className="lg:col-span-5 space-y-6">
                {/* API Key Vault Card */}
                <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    <Key className="w-4 h-4 text-red-500" />
                    API KEY ISOLATION & QUOTA VAULT
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Per-User Gemini Credentials
                  </h3>
                  <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                    Your team members keep their personal Google Gemini API keys isolated. No shared accounts, zero secret exposure across roster channels.
                  </p>

                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block">Your Personal Gemini API Key</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={userApiKey}
                        onChange={(e) => {
                          setUserApiKey(e.target.value);
                          setKeySaved(false);
                        }}
                        className="flex-1 bg-black border border-zinc-800 text-red-400 px-3 py-2 text-xs font-mono rounded-lg focus:border-red-500 focus:outline-none"
                      />
                      <button
                        onClick={() => setKeySaved(true)}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-colors"
                      >
                        {keySaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                    {keySaved && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400">
                        <Lock className="w-3 h-3" />
                        Encrypted & Isolated to your session.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Real-Time Messenger Hub */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl flex flex-col h-[520px]">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    <Users className="w-4 h-4 text-red-500" />
                    TEAM ROLLOUT MESSENGER
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Real-Time Channel #rollout-ops</span>
                </div>

                {/* Messages list */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <img src={msg.senderAvatar} alt={msg.senderName} className="w-8 h-8 rounded-lg object-cover shrink-0 border border-red-800/60" referrerPolicy="no-referrer" />
                      <div className="flex-1 bg-black border border-zinc-900 p-3 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-red-400">{msg.senderName}</span>
                          <span className="text-[10px] font-mono text-zinc-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs font-sans text-zinc-200">{msg.text}</p>
                        {msg.attachment && (
                          <div className="mt-2 p-2 rounded-lg bg-red-950/60 border border-red-800/60 flex items-center gap-2 text-[11px] font-mono text-red-300">
                            <Disc className="w-3.5 h-3.5" />
                            <span>Attachment: {msg.attachment.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-zinc-900 flex gap-2">
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Type a team rollout message..."
                    className="flex-1 bg-black border border-zinc-900 text-white px-3.5 py-2.5 text-xs font-mono rounded-xl focus:border-red-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center shadow-lg shadow-red-600/30"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

