import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, Facebook, Instagram, Send, Sparkles, Check, RefreshCw, 
  Layers, Sliders, MessageSquare, Heart, Repeat, Eye, Calendar, 
  ArrowUpRight, ShieldCheck, Film, Image as ImageIcon, Users, Zap,
  Clock, ThumbsUp, MessageCircle, BarChart3, Filter, Plus, Trash2,
  CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Radio, ExternalLink,
  Globe, Hash, Play, Smartphone, Monitor, Lock, ArrowRight, CornerDownRight,
  TrendingUp, Download, EyeOff, Sparkle
} from 'lucide-react';
import { SocialDivision } from '../types/index.js';

interface MetaAccountPair {
  id: string;
  divisionName: string;
  badge: string;
  facebookPage: string;
  facebookPageLikes: string;
  instagramHandle: string;
  instagramFollowers: string;
  avatarUrl: string;
  isSynced: boolean;
  autoReelsSync: boolean;
  autoStoriesSync: boolean;
  unifiedInboxActive: boolean;
  lastSyncedAt: string;
  healthStatus: 'Excellent' | 'Needs Reauth' | 'Syncing';
}

interface ScheduledMetaPost {
  id: string;
  title: string;
  text: string;
  mediaType: 'image' | 'video' | 'carousel';
  mediaUrl: string;
  aspectRatio: '1:1' | '9:16' | '16:9';
  divisionId: string;
  divisionName: string;
  facebookPage: string;
  instagramHandle: string;
  status: 'Scheduled' | 'Published Live' | 'Draft';
  scheduledTime: string;
  postToFacebook: boolean;
  postToInstagram: boolean;
  postToTikTok?: boolean;
  postToX?: boolean;
  engagementStats?: {
    fbReach: string;
    fbLikes: string;
    fbComments: string;
    igReach: string;
    igLikes: string;
    igComments: string;
    reelViews?: string;
  };
}

interface MetaInboxComment {
  id: string;
  platform: 'facebook' | 'instagram';
  author: string;
  avatar: string;
  content: string;
  postTitle: string;
  timestamp: string;
  isReplied: boolean;
}

export function SocialMediaController() {
  // Master 1-Click Sync Toggle State
  const [masterSyncEnabled, setMasterSyncEnabled] = useState<boolean>(true);
  
  // Selected Division / Account Pair State
  const [selectedAccountPairId, setSelectedAccountPairId] = useState<string>('pair-music');
  
  // Active Main Sub-Tab: 'command-center' | 'previewer' | 'scheduler' | 'inbox' | 'analytics'
  const [activeSubTab, setActiveSubTab] = useState<'command-center' | 'previewer' | 'scheduler' | 'inbox' | 'analytics'>('command-center');

  // Preview Mode: 'side-by-side' | 'facebook-only' | 'instagram-only'
  const [previewMode, setPreviewMode] = useState<'side-by-side' | 'facebook-only' | 'instagram-only'>('side-by-side');
  
  // Preview Format: 'feed' | 'reel' | 'story'
  const [previewFormat, setPreviewFormat] = useState<'feed' | 'reel' | 'story'>('reel');
  
  // Preview Device: 'mobile' | 'desktop'
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Post Composer State
  const [composerFormat, setComposerFormat] = useState<'reel' | 'feed' | 'story' | 'carousel'>('reel');
  const [postCaption, setPostCaption] = useState<string>(
    '🚀 EXCLUSIVE DROPPING TONIGHT! "Hyper-Clean 808 Trap" Official Motion Visualizer is live across Meta. Watch in 4K on IG Reels & FB Reels. Tap link in bio to stream full track on Spotify & Apple Music! 🔥 #RedVision #TrapBeats #MusicProducer #Reels #4KVisualizer'
  );
  const [firstCommentText, setFirstCommentText] = useState<string>('#StudioLife #ProducerLife #DSPRelease #MusicVideo #RedVisionMusic #MetaReels');
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>(
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'
  );
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('9:16');
  
  // Target Platform Toggles
  const [targetFB, setTargetFB] = useState<boolean>(true);
  const [targetIG, setTargetIG] = useState<boolean>(true);
  const [targetTikTok, setTargetTikTok] = useState<boolean>(true);
  const [targetX, setTargetX] = useState<boolean>(true);
  
  // Scheduling Options
  const [publishMode, setPublishMode] = useState<'now' | 'schedule' | 'draft'>('now');
  const [scheduledDateTime, setScheduledDateTime] = useState<string>('2026-08-12T20:30');

  // Interactive UI Loading & Toast States
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddAccountModal, setShowAddAccountModal] = useState<boolean>(false);
  
  // New Account Modal Form State
  const [newFbPage, setNewFbPage] = useState<string>('');
  const [newIgHandle, setNewIgHandle] = useState<string>('');
  const [newDivisionName, setNewDivisionName] = useState<string>('');

  // Sample Media Library Options for Fast Selection
  const sampleMediaLibrary = [
    {
      title: 'Studio Neon Visualizer',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      type: 'video',
      aspect: '9:16',
    },
    {
      title: 'Cyberpunk Album Artwork',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      type: 'image',
      aspect: '1:1',
    },
    {
      title: 'Live Arena Stage Lighting',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      type: 'video',
      aspect: '16:9',
    },
    {
      title: 'Apparel Merch Line Showcase',
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
      type: 'image',
      aspect: '9:16',
    }
  ];

  // Linked Meta Accounts Data
  const [metaAccountPairs, setMetaAccountPairs] = useState<MetaAccountPair[]>([
    {
      id: 'pair-music',
      divisionName: 'Red Vision Music Division',
      badge: 'RECORD LABEL & DSP',
      facebookPage: 'Red Vision Music Official Page',
      facebookPageLikes: '184.2K',
      instagramHandle: '@redvisionmusic',
      instagramFollowers: '342.8K',
      avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80',
      isSynced: true,
      autoReelsSync: true,
      autoStoriesSync: true,
      unifiedInboxActive: true,
      lastSyncedAt: 'Just now (Live WebSocket)',
      healthStatus: 'Excellent',
    },
    {
      id: 'pair-cinema',
      divisionName: 'Red Vision Cinema & Motion Studio',
      badge: 'FILM & VSL STUDIO',
      facebookPage: 'Red Vision Cinema Studios',
      facebookPageLikes: '92.4K',
      instagramHandle: '@redvisioncinema',
      instagramFollowers: '128.5K',
      avatarUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=150&q=80',
      isSynced: true,
      autoReelsSync: true,
      autoStoriesSync: true,
      unifiedInboxActive: true,
      lastSyncedAt: '2 mins ago',
      healthStatus: 'Excellent',
    },
    {
      id: 'pair-apparel',
      divisionName: 'Red Vision Apparel & Atelier',
      badge: 'BRAND & MERCH',
      facebookPage: 'Red Vision Atelier',
      facebookPageLikes: '64.1K',
      instagramHandle: '@redvisionatelier',
      instagramFollowers: '210.9K',
      avatarUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=150&q=80',
      isSynced: true,
      autoReelsSync: true,
      autoStoriesSync: false,
      unifiedInboxActive: true,
      lastSyncedAt: '12 mins ago',
      healthStatus: 'Excellent',
    },
    {
      id: 'pair-tour',
      divisionName: 'Red Vision Arena Tour Ops',
      badge: 'LIVE EVENTS',
      facebookPage: 'Red Vision World Tour',
      facebookPageLikes: '412.0K',
      instagramHandle: '@redvisionlive',
      instagramFollowers: '589.2K',
      avatarUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80',
      isSynced: true,
      autoReelsSync: true,
      autoStoriesSync: true,
      unifiedInboxActive: true,
      lastSyncedAt: '1 hour ago',
      healthStatus: 'Excellent',
    }
  ]);

  const activeAccountPair = metaAccountPairs.find(p => p.id === selectedAccountPairId) || metaAccountPairs[0];

  // Scheduled & Published Posts Data
  const [postsList, setPostsList] = useState<ScheduledMetaPost[]>([
    {
      id: 'post-101',
      title: 'Cyber Odyssey OST - Motion Cinema Reel',
      text: 'Cyber Odyssey OST (Original Film Score) now streaming everywhere! Check out the 4K Motion Cinema visualizer on IG Reels & FB Reels. Tap link in bio to listen.',
      mediaType: 'video',
      mediaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '9:16',
      divisionId: 'pair-cinema',
      divisionName: 'Red Vision Cinema & Motion Studio',
      facebookPage: 'Red Vision Cinema Studios',
      instagramHandle: '@redvisioncinema',
      status: 'Published Live',
      scheduledTime: 'Today at 10:00 AM',
      postToFacebook: true,
      postToInstagram: true,
      engagementStats: {
        fbReach: '64.2K',
        fbLikes: '8.4K',
        fbComments: '412',
        igReach: '142.8K',
        igLikes: '18.2K',
        igComments: '1.2K',
        reelViews: '382.4K'
      }
    },
    {
      id: 'post-102',
      title: 'World Tour Stadium Ticket Presale',
      text: 'Red Vision World Tour 2026 stadium dates announced! Presale tickets live this Friday at 10 AM EST. Sign up for early access codes.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '1:1',
      divisionId: 'pair-tour',
      divisionName: 'Red Vision Arena Tour Ops',
      facebookPage: 'Red Vision World Tour',
      instagramHandle: '@redvisionlive',
      status: 'Published Live',
      scheduledTime: 'Yesterday at 3:00 PM',
      postToFacebook: true,
      postToInstagram: true,
      engagementStats: {
        fbReach: '120.5K',
        fbLikes: '19.4K',
        fbComments: '890',
        igReach: '289.4K',
        igLikes: '42.1K',
        igComments: '3.4K',
        reelViews: 'N/A'
      }
    },
    {
      id: 'post-103',
      title: 'Atelier Fall Collection Teaser',
      text: 'Limited edition Studio Heavyweight Hoodies dropping this Sunday. Crafted with organic French terry cotton. Direct shop tags active on IG & FB Shop.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '9:16',
      divisionId: 'pair-apparel',
      divisionName: 'Red Vision Apparel & Atelier',
      facebookPage: 'Red Vision Atelier',
      instagramHandle: '@redvisionatelier',
      status: 'Scheduled',
      scheduledTime: 'Today at 8:30 PM (Peak Engagement)',
      postToFacebook: true,
      postToInstagram: true
    }
  ]);

  // Unified Inbox Comments
  const [inboxComments, setInboxComments] = useState<MetaInboxComment[]>([
    {
      id: 'comment-1',
      platform: 'instagram',
      author: 'marcus_beats_23',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      content: 'That 808 drop at 0:42 is unreal!! Is this drum kit available in the studio store?',
      postTitle: 'Cyber Odyssey OST - Motion Cinema Reel',
      timestamp: '5 mins ago',
      isReplied: false,
    },
    {
      id: 'comment-2',
      platform: 'facebook',
      author: 'David Harrison',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      content: 'Just bought 4 VIP arena tickets for the Los Angeles show! Can’t wait for Red Vision Live!',
      postTitle: 'World Tour Stadium Ticket Presale',
      timestamp: '18 mins ago',
      isReplied: true,
    },
    {
      id: 'comment-3',
      platform: 'instagram',
      author: 'elena.cinema',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      content: 'Color grading on this Reel is cinema quality. What LUT pack did you use?',
      postTitle: 'Cyber Odyssey OST - Motion Cinema Reel',
      timestamp: '42 mins ago',
      isReplied: false,
    }
  ]);

  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});

  // Trigger Master One-Click Sync Toggle
  const handleToggleMasterSync = () => {
    const nextState = !masterSyncEnabled;
    setMasterSyncEnabled(nextState);
    setMetaAccountPairs(prev => prev.map(p => ({
      ...p,
      isSynced: nextState,
      autoReelsSync: nextState,
      autoStoriesSync: nextState,
      unifiedInboxActive: nextState,
      lastSyncedAt: nextState ? 'Just synced via 1-Click Master Toggle' : 'Sync Paused'
    })));

    triggerToast(
      nextState 
        ? '⚡ 1-Click Master Sync ENABLED! All Facebook Pages & Instagram Business profiles are linked and mirroring live.'
        : '⏸️ Master Sync PAUSED across all linked Meta accounts.'
    );
  };

  // Trigger Individual Account Pair Sync Toggle
  const handleTogglePairSync = (pairId: string) => {
    setMetaAccountPairs(prev => prev.map(p => {
      if (p.id === pairId) {
        const updatedSync = !p.isSynced;
        return {
          ...p,
          isSynced: updatedSync,
          autoReelsSync: updatedSync,
          autoStoriesSync: updatedSync,
          lastSyncedAt: updatedSync ? 'Just synced' : 'Sync Paused'
        };
      }
      return p;
    }));
  };

  // AI Generator for Captions & Hashtags
  const handleGenerateAICaptions = () => {
    const aiCaptions = [
      '🔥 BREAKING: Studio secret unveiled! The ultimate audio & visual experience is finally here. Produced in 8K Spatial Surround at Red Vision Studios. Tap link in bio to stream now & watch the full Reel! ⚡ #RedVision #MusicProducer #AudioVisual #ReelsViral #DSPDrop #FBReels',
      '💎 Heavy 808s meets cinematic brass. "Cyber Odyssey Part II" is streaming on all DSPs. Don\'t miss out on the official visualizer on Facebook & Instagram Reels! Drop a 🔥 if you\'re bumping this today. #RedVisionStudios #BeatsForSale #CinematicScore #MetaMusic',
      '🚀 Arena Tour 2026 is officially 90% SOLD OUT. Thank you Red Vision family! Extra dates added for LA, NY, & London. Link in bio for presale access codes! 🎟️ #RedVisionLive #ArenaTour #LiveMusic #MetaEvents'
    ];
    const randomIndex = Math.floor(Math.random() * aiCaptions.length);
    setPostCaption(aiCaptions[randomIndex]);
    triggerToast('✨ AI generated high-engagement Meta caption & viral hashtags!');
  };

  // Publish / Schedule Action
  const handleExecutePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      
      const newPost: ScheduledMetaPost = {
        id: `post-${Date.now()}`,
        title: composerFormat.toUpperCase() + ' - ' + activeAccountPair.divisionName,
        text: postCaption,
        mediaType: composerFormat === 'reel' ? 'video' : 'image',
        mediaUrl: selectedMediaUrl,
        aspectRatio: selectedAspectRatio,
        divisionId: activeAccountPair.id,
        divisionName: activeAccountPair.name || activeAccountPair.divisionName,
        facebookPage: activeAccountPair.facebookPage,
        instagramHandle: activeAccountPair.instagramHandle,
        status: publishMode === 'now' ? 'Published Live' : publishMode === 'schedule' ? 'Scheduled' : 'Draft',
        scheduledTime: publishMode === 'now' ? 'Just Now' : scheduledDateTime.replace('T', ' at '),
        postToFacebook: targetFB,
        postToInstagram: targetIG,
        postToTikTok: targetTikTok,
        postToX: targetX,
        engagementStats: publishMode === 'now' ? {
          fbReach: '1.2K (Live)',
          fbLikes: '184',
          fbComments: '12',
          igReach: '3.8K (Live)',
          igLikes: '492',
          igComments: '38',
          reelViews: composerFormat === 'reel' ? '5.1K' : 'N/A'
        } : undefined
      };

      setPostsList([newPost, ...postsList]);

      triggerToast(
        publishMode === 'now'
          ? `🚀 PUBLISHED LIVE! Simultaneously cross-posted to Facebook (${activeAccountPair.facebookPage}) & Instagram (${activeAccountPair.instagramHandle})!`
          : `📅 POST SCHEDULED! Set for ${scheduledDateTime.replace('T', ' at ')} across linked Meta business profiles.`
      );
    }, 1500);
  };

  // Send Comment Reply
  const handleSendCommentReply = (commentId: string) => {
    const text = replyInputMap[commentId];
    if (!text || !text.trim()) return;

    setInboxComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, isReplied: true };
      }
      return c;
    }));

    setReplyInputMap(prev => ({ ...prev, [commentId]: '' }));
    triggerToast('💬 Reply published to Meta live comment thread!');
  };

  // Add Custom Account Pair
  const handleAddNewAccountPair = () => {
    if (!newFbPage || !newIgHandle) return;

    const newPair: MetaAccountPair = {
      id: `pair-${Date.now()}`,
      divisionName: newDivisionName || 'Custom Studio Brand',
      badge: 'CUSTOM BUSINESS',
      facebookPage: newFbPage,
      facebookPageLikes: '0',
      instagramHandle: newIgHandle.startsWith('@') ? newIgHandle : `@${newIgHandle}`,
      instagramFollowers: '0',
      avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80',
      isSynced: true,
      autoReelsSync: true,
      autoStoriesSync: true,
      unifiedInboxActive: true,
      lastSyncedAt: 'Just connected',
      healthStatus: 'Excellent'
    };

    setMetaAccountPairs([...metaAccountPairs, newPair]);
    setSelectedAccountPairId(newPair.id);
    setShowAddAccountModal(false);
    setNewFbPage('');
    setNewIgHandle('');
    setNewDivisionName('');
    triggerToast(`✅ Successfully linked ${newFbPage} ↔ ${newPair.instagramHandle}!`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="w-full space-y-8 text-left font-sans">
      
      {/* Global Animated Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-zinc-950 border border-blue-500/80 text-white flex items-center justify-between shadow-2xl font-mono text-xs ring-2 ring-blue-500/50 relative z-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-blue-400 font-bold uppercase block text-[10px] tracking-wider">
                  META COMMAND CENTER NOTIFICATION
                </span>
                <span className="font-bold text-sm text-white">{toastMessage}</span>
              </div>
            </div>

            <button 
              onClick={() => setToastMessage(null)}
              className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 font-mono text-[10px] font-bold"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner with Master 1-Click Sync Toggle */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/50 border border-blue-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/50 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Facebook className="w-3.5 h-3.5 text-blue-400" />
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>CENTRALIZED META SOCIAL COMMAND CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              Facebook Pages & Instagram Accounts Controller
            </h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
              Simultaneously manage, compose, preview, and synchronize Facebook Pages and Instagram Business handles. Cross-post video Reels, Feed posts, and Stories with real-time Meta API webhook sync and unified audience analytics.
            </p>
          </div>

          {/* MASTER 1-CLICK SYNCHRONIZATION TOGGLE BUTTON */}
          <div className="p-4 rounded-2xl bg-black/90 border border-blue-500/50 flex flex-col sm:flex-row items-center gap-4 shrink-0 shadow-2xl ring-1 ring-blue-500/30">
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">1-CLICK MASTER SYNC TOGGLE</span>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className={`w-4 h-4 ${masterSyncEnabled ? 'text-emerald-400' : 'text-amber-400'}`} />
                {masterSyncEnabled ? 'META SYNC: LIVE & AUTOMATED' : 'META SYNC: PAUSED'}
              </span>
            </div>

            <button
              onClick={handleToggleMasterSync}
              className={`px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                masterSyncEnabled
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700'
              }`}
            >
              {masterSyncEnabled ? (
                <>
                  <ToggleRight className="w-5 h-5 text-emerald-200 animate-pulse" />
                  <span>MASTER SYNC ACTIVE</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-5 h-5 text-amber-400" />
                  <span>ACTIVATE MASTER SYNC</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Linked Business Account Matrix Selector */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-3 relative z-10">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              LINKED META BUSINESS ACCOUNTS ({metaAccountPairs.length})
            </span>

            <button
              onClick={() => setShowAddAccountModal(true)}
              className="px-3 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-500/50 text-blue-300 font-bold text-[10px] uppercase flex items-center gap-1 transition-all"
            >
              <Plus className="w-3 h-3 text-blue-400" />
              <span>Link New FB Page & IG Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {metaAccountPairs.map((pair) => (
              <div
                key={pair.id}
                onClick={() => setSelectedAccountPairId(pair.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  selectedAccountPairId === pair.id
                    ? 'bg-blue-950/80 border-blue-500 text-white shadow-xl ring-1 ring-blue-500/50'
                    : 'bg-black/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-blue-400 uppercase">
                    {pair.badge}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePairSync(pair.id);
                    }}
                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase transition-all flex items-center gap-1 ${
                      pair.isSynced ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-zinc-900 text-zinc-500'
                    }`}
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${pair.isSynced ? 'animate-spin text-emerald-400' : ''}`} />
                    <span>{pair.isSynced ? 'Synced' : 'Paused'}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{pair.facebookPage}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <Instagram className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{pair.instagramHandle}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>FB: {pair.facebookPageLikes}</span>
                  <span>IG: {pair.instagramFollowers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Command Center Secondary Navigation Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs relative z-10" role="tablist" aria-label="Social Command Center Subtabs">
          <button
            role="tab"
            aria-selected={activeSubTab === 'command-center'}
            onClick={() => setActiveSubTab('command-center')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeSubTab === 'command-center'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Composer & Fast Sync</span>
          </button>

          <button
            role="tab"
            aria-selected={activeSubTab === 'previewer'}
            onClick={() => setActiveSubTab('previewer')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeSubTab === 'previewer'
                ? 'bg-gradient-to-r from-blue-600 to-rose-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Eye className="w-4 h-4 text-rose-400" />
            <span>Cross-Platform Previewer</span>
          </button>

          <button
            role="tab"
            aria-selected={activeSubTab === 'scheduler'}
            onClick={() => setActiveSubTab('scheduler')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeSubTab === 'scheduler'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Bulk Calendar Queue ({postsList.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeSubTab === 'inbox'}
            onClick={() => setActiveSubTab('inbox')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeSubTab === 'inbox'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Unified Meta Inbox ({inboxComments.filter(c => !c.isReplied).length} Unread)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeSubTab === 'analytics'}
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition-all flex items-center gap-2 ${
              activeSubTab === 'analytics'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Meta Analytics Matrix</span>
          </button>
        </div>
      </div>

      {/* ==================== SUB-TAB 1: COMPOSER & FAST SYNC ==================== */}
      {activeSubTab === 'command-center' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Post Creator & Media Configurator (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-400" />
                  Meta Cross-Platform Content Creator
                </h3>
                <p className="text-xs text-zinc-400">
                  Target Pair: <strong className="text-blue-400">{activeAccountPair.facebookPage}</strong> ↔ <strong className="text-rose-400">{activeAccountPair.instagramHandle}</strong>
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 font-mono text-[10px] font-bold uppercase border border-blue-500/40">
                1-Click Cross-Post
              </span>
            </div>

            {/* Post Format Selector */}
            <div className="space-y-2 font-mono text-xs">
              <label className="text-[10px] text-zinc-400 uppercase font-bold block">1. Select Meta Content Format</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => { setComposerFormat('reel'); setSelectedAspectRatio('9:16'); }}
                  className={`p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all ${
                    composerFormat === 'reel' ? 'bg-gradient-to-r from-rose-600 to-purple-600 border-rose-400 text-white shadow-lg' : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Film className="w-4 h-4 text-rose-300" />
                  <span>FB & IG Reel (9:16)</span>
                </button>

                <button
                  onClick={() => { setComposerFormat('feed'); setSelectedAspectRatio('1:1'); }}
                  className={`p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all ${
                    composerFormat === 'feed' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-lg' : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-blue-300" />
                  <span>Feed Image (1:1)</span>
                </button>

                <button
                  onClick={() => { setComposerFormat('story'); setSelectedAspectRatio('9:16'); }}
                  className={`p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all ${
                    composerFormat === 'story' ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-400 text-white shadow-lg' : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>Meta Story (9:16)</span>
                </button>

                <button
                  onClick={() => { setComposerFormat('carousel'); setSelectedAspectRatio('1:1'); }}
                  className={`p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all ${
                    composerFormat === 'carousel' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400 text-white shadow-lg' : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4 text-emerald-300" />
                  <span>Multi-Slide Carousel</span>
                </button>
              </div>
            </div>

            {/* Media Asset Picker */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-zinc-400 uppercase font-bold">2. Select Studio Media Asset</label>
                <span className="text-[10px] text-zinc-500">Aspect Ratio: {selectedAspectRatio}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sampleMediaLibrary.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedMediaUrl(item.url);
                      setSelectedAspectRatio(item.aspect as any);
                    }}
                    className={`p-2 rounded-xl border cursor-pointer space-y-1.5 transition-all relative group overflow-hidden ${
                      selectedMediaUrl === item.url ? 'bg-blue-950 border-blue-500 ring-2 ring-blue-500/50' : 'bg-black border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-16 object-cover rounded-lg" />
                    <span className="text-[10px] font-bold text-white block truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption & AI Assistant */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <label className="text-[10px] text-zinc-400 uppercase font-bold">3. Facebook & Instagram Caption</label>
                
                <button
                  onClick={handleGenerateAICaptions}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-[10px] uppercase flex items-center gap-1 transition-all shadow-md"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Generate AI Caption</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white p-3.5 rounded-2xl focus:border-blue-500 focus:outline-none font-sans text-xs leading-relaxed"
                placeholder="Write your Meta caption..."
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Character Count: {postCaption.length} / 2,200</span>
                <span>Hashtags: {(postCaption.match(/#/g) || []).length} / 30</span>
              </div>
            </div>

            {/* First Comment Hashtags Field */}
            <div className="space-y-1 font-mono text-xs">
              <label className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-rose-400" />
                <span>Instagram First Comment (Auto-Posted Hashtags)</span>
              </label>
              <input
                type="text"
                value={firstCommentText}
                onChange={(e) => setFirstCommentText(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white px-3.5 py-2.5 rounded-xl focus:border-rose-500 focus:outline-none text-xs"
              />
            </div>

            {/* Target Cross-Posting Platforms */}
            <div className="space-y-2 font-mono text-xs">
              <label className="text-[10px] text-zinc-400 uppercase font-bold block">4. Target Destinations</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${targetFB ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  <input type="checkbox" checked={targetFB} onChange={(e) => setTargetFB(e.target.checked)} className="accent-blue-500" />
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook Page</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${targetIG ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  <input type="checkbox" checked={targetIG} onChange={(e) => setTargetIG(e.target.checked)} className="accent-rose-500" />
                  <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  <span>Instagram Business</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${targetTikTok ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  <input type="checkbox" checked={targetTikTok} onChange={(e) => setTargetTikTok(e.target.checked)} className="accent-purple-500" />
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>TikTok Sync</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${targetX ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black border-zinc-800 text-zinc-500'}`}>
                  <input type="checkbox" checked={targetX} onChange={(e) => setTargetX(e.target.checked)} className="accent-blue-400" />
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>X / Twitter</span>
                </label>
              </div>
            </div>

            {/* Publish Timing & Execution */}
            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setPublishMode('now')}
                    className={`px-3.5 py-2 rounded-xl font-bold uppercase ${publishMode === 'now' ? 'bg-blue-600 text-white' : 'bg-black border border-zinc-800 text-zinc-400'}`}
                  >
                    Publish Now
                  </button>
                  <button
                    onClick={() => setPublishMode('schedule')}
                    className={`px-3.5 py-2 rounded-xl font-bold uppercase ${publishMode === 'schedule' ? 'bg-indigo-600 text-white' : 'bg-black border border-zinc-800 text-zinc-400'}`}
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => setPublishMode('draft')}
                    className={`px-3.5 py-2 rounded-xl font-bold uppercase ${publishMode === 'draft' ? 'bg-amber-600 text-white' : 'bg-black border border-zinc-800 text-zinc-400'}`}
                  >
                    Save Draft
                  </button>
                </div>

                {publishMode === 'schedule' && (
                  <input
                    type="datetime-local"
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.target.value)}
                    className="bg-black border border-zinc-800 text-white px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
                  />
                )}
              </div>

              <button
                onClick={handleExecutePublish}
                disabled={isPublishing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-600/30 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Executing Meta Cross-Posting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-white" />
                    <span>
                      {publishMode === 'now' ? 'Cross-Post Live to Facebook & Instagram' : publishMode === 'schedule' ? 'Schedule Meta Campaign' : 'Save Meta Draft'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Quick Side-by-Side Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-rose-400" />
                  Live Meta Cross-Preview
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">● Live Rendering</span>
              </div>

              <div className="space-y-4">
                {/* Facebook Preview Box */}
                <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2 text-left">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-blue-400 flex items-center gap-1">
                      <Facebook className="w-3.5 h-3.5" />
                      {activeAccountPair.facebookPage}
                    </span>
                    <span className="text-zinc-500">Facebook Feed / Reel</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900">
                    <img src={selectedMediaUrl} alt="Preview" className={`w-full ${selectedAspectRatio === '9:16' ? 'h-48' : 'h-36'} object-cover`} />
                    {composerFormat === 'reel' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-white/80" />
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-sans text-zinc-300 line-clamp-3 leading-relaxed">
                    {postCaption}
                  </p>
                </div>

                {/* Instagram Preview Box */}
                <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2 text-left">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" />
                      {activeAccountPair.instagramHandle}
                    </span>
                    <span className="text-zinc-500">Instagram Reel / Post</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900">
                    <img src={selectedMediaUrl} alt="Preview" className={`w-full ${selectedAspectRatio === '9:16' ? 'h-48' : 'h-36'} object-cover`} />
                    {composerFormat === 'reel' && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-full">
                        <Film className="w-3 h-3 text-rose-400" />
                        <span>IG Reel Player</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-sans text-zinc-300 line-clamp-2 leading-relaxed">
                    {postCaption}
                  </p>
                  {firstCommentText && (
                    <p className="text-[10px] font-mono text-zinc-500 truncate">
                      First Comment: {firstCommentText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== SUB-TAB 2: CROSS-PLATFORM PREVIEWER ==================== */}
      {activeSubTab === 'previewer' && (
        <div className="space-y-6">
          {/* Previewer Controls Toolbar */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-xl">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">View Mode:</span>
              <button
                onClick={() => setPreviewMode('side-by-side')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                  previewMode === 'side-by-side' ? 'bg-blue-600 text-white' : 'bg-black text-zinc-400 border border-zinc-800'
                }`}
              >
                Side-By-Side Simultaneous
              </button>

              <button
                onClick={() => setPreviewMode('facebook-only')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                  previewMode === 'facebook-only' ? 'bg-blue-600 text-white' : 'bg-black text-zinc-400 border border-zinc-800'
                }`}
              >
                Facebook Only
              </button>

              <button
                onClick={() => setPreviewMode('instagram-only')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                  previewMode === 'instagram-only' ? 'bg-rose-600 text-white' : 'bg-black text-zinc-400 border border-zinc-800'
                }`}
              >
                Instagram Only
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-[10px] uppercase font-bold">Format:</span>
              <button
                onClick={() => setPreviewFormat('reel')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${previewFormat === 'reel' ? 'bg-rose-950 text-rose-300 border border-rose-500/50' : 'bg-black text-zinc-500'}`}
              >
                9:16 Reel
              </button>
              <button
                onClick={() => setPreviewFormat('feed')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${previewFormat === 'feed' ? 'bg-blue-950 text-blue-300 border border-blue-500/50' : 'bg-black text-zinc-500'}`}
              >
                1:1 Feed
              </button>
            </div>
          </div>

          {/* Interactive Phone & Desktop Mockups Canvas */}
          <div className="p-8 rounded-3xl bg-black border border-zinc-800 shadow-2xl flex items-center justify-center min-h-[500px]">
            
            {/* SIDE BY SIDE PREVIEW */}
            {(previewMode === 'side-by-side' || previewMode === 'facebook-only') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                
                {/* Facebook Phone Shell */}
                <div className="w-full max-w-sm mx-auto rounded-[40px] bg-zinc-950 border-4 border-zinc-800 p-4 shadow-2xl space-y-3 font-sans text-xs text-left">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2 font-mono text-[10px] text-zinc-400">
                    <span className="font-bold text-blue-400 flex items-center gap-1">
                      <Facebook className="w-3.5 h-3.5" /> Facebook Page Feed
                    </span>
                    <span>100% Meta Synced</span>
                  </div>

                  {/* FB Author Info */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      F
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">{activeAccountPair.facebookPage}</span>
                      <span className="text-[10px] text-zinc-500">Sponsored • Studio DSP Release</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-xs text-zinc-200 leading-relaxed line-clamp-4">
                    {postCaption}
                  </p>

                  {/* Media Frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img src={selectedMediaUrl} alt="FB Media" className="w-full h-64 object-cover" />
                    {previewFormat === 'reel' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white fill-white/80" />
                      </div>
                    )}
                  </div>

                  {/* FB Engagement Footer */}
                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-zinc-400 font-mono text-[10px]">
                    <div className="flex items-center gap-1 text-blue-400">
                      <ThumbsUp className="w-3.5 h-3.5" /> 1.4K Likes
                    </div>
                    <div>182 Comments • 482 Shares</div>
                  </div>
                </div>

                {/* Instagram Phone Shell */}
                {(previewMode === 'side-by-side' || previewMode === 'instagram-only') && (
                  <div className="w-full max-w-sm mx-auto rounded-[40px] bg-zinc-950 border-4 border-zinc-800 p-4 shadow-2xl space-y-3 font-sans text-xs text-left">
                    {/* IG Phone Header */}
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2 font-mono text-[10px] text-zinc-400">
                      <span className="font-bold text-rose-400 flex items-center gap-1">
                        <Instagram className="w-3.5 h-3.5" /> Instagram Professional
                      </span>
                      <span>9:16 Reel Player</span>
                    </div>

                    {/* IG Author Info */}
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center font-bold text-sm">
                        IG
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">{activeAccountPair.instagramHandle}</span>
                        <span className="text-[10px] text-zinc-500">Audio: Red Vision - Original Sound</span>
                      </div>
                    </div>

                    {/* Media Frame with Reel Safe Zone Overlay */}
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                      <img src={selectedMediaUrl} alt="IG Reel Media" className="w-full h-64 object-cover" />
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md p-2 rounded-xl text-[10px] text-white">
                        <p className="line-clamp-2 font-sans">{postCaption}</p>
                        <span className="text-rose-400 font-mono text-[9px] block mt-1">{firstCommentText}</span>
                      </div>
                    </div>

                    {/* IG Engagement Footer */}
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-zinc-400 font-mono text-[10px]">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <MessageCircle className="w-4 h-4 text-zinc-400" />
                        <Send className="w-4 h-4 text-zinc-400" />
                      </div>
                      <span className="text-rose-400 font-bold">3.2K Likes</span>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 3: BULK CALENDAR QUEUE ==================== */}
      {activeSubTab === 'scheduler' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Meta Scheduled Posts & Live Feed History
              </h3>
              <p className="text-xs text-zinc-400">
                Manage upcoming cross-platform Meta campaigns, scheduled Reels, and published posts.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/40">
              {postsList.length} Campaign Items
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {postsList.map((post) => (
              <div key={post.id} className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={post.mediaUrl} alt={post.title} className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0" />
                  
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{post.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        post.status === 'Published Live' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-indigo-950 text-indigo-300 border border-indigo-500/50'
                      }`}>
                        {post.status}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-zinc-300 line-clamp-1">{post.text}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                      <span>Division: <strong className="text-blue-400">{post.divisionName}</strong></span>
                      <span>Time: {post.scheduledTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right Engagement Badges or Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  {post.engagementStats ? (
                    <div className="text-right text-[10px] space-y-0.5">
                      <span className="text-blue-400 block font-bold">FB: {post.engagementStats.fbReach} Reach • {post.engagementStats.fbLikes} Likes</span>
                      <span className="text-rose-400 block font-bold">IG: {post.engagementStats.igReach} Reach • {post.engagementStats.igLikes} Likes</span>
                    </div>
                  ) : (
                    <span className="text-zinc-500 text-[10px]">Pending Scheduled Auto-Release</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 4: UNIFIED META INBOX ==================== */}
      {activeSubTab === 'inbox' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Unified Meta Audience Comments & DMs
              </h3>
              <p className="text-xs text-zinc-400">
                Respond to incoming Facebook Page comments and Instagram DMs from a single centralized console.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
              {inboxComments.filter(c => !c.isReplied).length} Action Required
            </span>
          </div>

          <div className="space-y-4 font-sans text-xs">
            {inboxComments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-white text-xs block">{comment.author}</span>
                      <span className="text-[10px] font-mono text-zinc-500">Post: {comment.postTitle} • {comment.timestamp}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase flex items-center gap-1 ${
                    comment.platform === 'facebook' ? 'bg-blue-950 text-blue-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    {comment.platform === 'facebook' ? <Facebook className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                    {comment.platform}
                  </span>
                </div>

                <p className="text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  "{comment.content}"
                </p>

                {comment.isReplied ? (
                  <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Replied & Synced Live to {comment.platform}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1 font-mono">
                    <input
                      type="text"
                      value={replyInputMap[comment.id] || ''}
                      onChange={(e) => setReplyInputMap({ ...replyInputMap, [comment.id]: e.target.value })}
                      placeholder={`Write official ${comment.platform} reply...`}
                      className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => handleSendCommentReply(comment.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase transition-all"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 5: META ANALYTICS MATRIX ==================== */}
      {activeSubTab === 'analytics' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl text-left">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Cross-Platform Meta Campaign Analytics
              </h3>
              <p className="text-xs text-zinc-400">
                Combined Facebook & Instagram performance metrics, audience reach, and Reel view velocity.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
              Live API Aggregated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Total Combined Reach</span>
              <span className="text-2xl font-bold text-blue-400 block">1.82M</span>
              <span className="text-[10px] text-emerald-400 font-bold">+28.4% vs last week</span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">IG Reels Plays</span>
              <span className="text-2xl font-bold text-rose-400 block">942.5K</span>
              <span className="text-[10px] text-emerald-400 font-bold">Meta Reel Engine Peak</span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">FB Page Engagements</span>
              <span className="text-2xl font-bold text-indigo-400 block">348.1K</span>
              <span className="text-[10px] text-emerald-400 font-bold">+14.2% Growth</span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Unified Followers</span>
              <span className="text-2xl font-bold text-amber-400 block">1.27M</span>
              <span className="text-[10px] text-emerald-400 font-bold">4 Divisions Synced</span>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ADD NEW ACCOUNT PAIR MODAL ==================== */}
      <AnimatePresence>
        {showAddAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-left"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-blue-500/50 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  Link New Meta Business Accounts
                </h3>

                <button
                  onClick={() => setShowAddAccountModal(false)}
                  className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">
                    Studio Division / Brand Name
                  </label>
                  <input
                    type="text"
                    value={newDivisionName}
                    onChange={(e) => setNewDivisionName(e.target.value)}
                    placeholder="e.g. Red Vision Latin Division"
                    className="w-full bg-black border border-zinc-800 text-white p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">
                    Facebook Page Name
                  </label>
                  <input
                    type="text"
                    value={newFbPage}
                    onChange={(e) => setNewFbPage(e.target.value)}
                    placeholder="e.g. Red Vision Latin Official"
                    className="w-full bg-black border border-zinc-800 text-white p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={newIgHandle}
                    onChange={(e) => setNewIgHandle(e.target.value)}
                    placeholder="e.g. @redvisionlatin"
                    className="w-full bg-black border border-zinc-800 text-white p-3 rounded-xl focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 font-mono text-xs">
                <button
                  onClick={() => setShowAddAccountModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-bold uppercase"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddNewAccountPair}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-rose-600 text-white font-bold uppercase shadow-lg shadow-blue-600/30"
                >
                  Authorize & Link Meta Pair
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
