import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Flame, Zap, Target, BookOpen, Layers, MessageSquare, 
  Send, RefreshCw, CheckCircle2, ShieldCheck, Share2, Globe, User, 
  Image as ImageIcon, Sliders, ArrowRight, Eye, Calendar, Clock, 
  Copy, Check, FileText, Video, LayoutGrid, Award, Lightbulb, Play, Search, Plus, Filter
} from 'lucide-react';
import { BrandMemory, TrendTopic, ViralHook, GeneratedAssetPack } from '../types/index.js';

export function ViralCredEngine() {
  const [activeSubTab, setActiveSubTab] = useState<'scout' | 'brand' | 'generator' | 'hooks' | 'approval'>('generator');

  // Brand Memory State
  const [brandMemory, setBrandMemory] = useState<BrandMemory>({
    brandName: 'Red Vision Music & Entertainment',
    websiteUrl: 'https://redvisionmusic.com',
    socialHandles: '@redvisionmusic (Instagram, Facebook, TikTok, YouTube)',
    voiceTone: 'High-Energy, Authoritative, Cinematic, Premium, Visionary',
    targetAudience: 'Music Producers, Executive Label Managers, Artists, Film Creators',
    coreOffers: '24-Bit Studio Audio Synthesis, Motion Cinema Renders, Global DSP Release',
    primaryColor: '#ef4444',
    secondaryColor: '#f59e0b',
    defaultCTA: 'Stream "Hyper-Clean 808 Trap" on Spotify or claim your studio session at redvisionmusic.com',
    founderName: 'Clayton (Executive Director)',
    founderImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    isTrained: true,
  });

  const [importUrl, setImportUrl] = useState<string>('https://redvisionmusic.com');
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  // Automation Mode Toggle
  const [automationMode, setAutomationMode] = useState<'reviewable' | 'automated'>('reviewable');

  // CredScout Trending Search Queries
  const [scoutSearchQuery, setScoutSearchQuery] = useState<string>('Hip Hop Audio Synthesis & Motion Graphics');
  const [scoutTrends, setScoutTrends] = useState<TrendTopic[]>([
    {
      id: 'trend-1',
      topic: '24-Bit Lossless vs MP3 Audio Masters in 2026',
      category: 'Audio Production',
      volume: '184.2K searches',
      growth: '+310% viral spike',
      provenAngle: 'Demonstrate side-by-side waveform dynamics showing how low-quality MP3 loses sub-bass energy.',
      hookCategory: 'Pattern Interrupt',
    },
    {
      id: 'trend-2',
      topic: 'AI Motion Cinema Trailers vs Traditional Music Videos',
      category: 'Video Production',
      volume: '420.5K searches',
      growth: '+520% viral spike',
      provenAngle: 'Compare production cost and turnaround time: $50k 3-day shoot vs 10-minute Motion Cinema render.',
      hookCategory: 'Myth vs Fact',
    },
    {
      id: 'trend-3',
      topic: 'How Independent Artists Keep 100% Master Royalties',
      category: 'Music Business',
      volume: '95.8K searches',
      growth: '+140% viral spike',
      provenAngle: 'Expose major label contract traps vs direct-to-fan distribution portals.',
      hookCategory: 'Controversy / Hot Take',
    }
  ]);

  // Viral Hook Library
  const [selectedHookCategory, setSelectedHookCategory] = useState<string>('All');
  const hooksLibrary: ViralHook[] = [
    {
      id: 'hook-1',
      category: 'Pattern Interrupt',
      hookText: 'Stop making this $10,000 mistake when exporting your final audio masters...',
      engagementBoost: '4.8x Higher Retention',
    },
    {
      id: 'hook-2',
      category: 'Myth vs Fact',
      hookText: 'Myth: You need a $50,000 music video budget to go viral in 2026. Here’s what actually happens...',
      engagementBoost: '3.9x Comments',
    },
    {
      id: 'hook-3',
      category: 'Controversy / Hot Take',
      hookText: 'Unpopular opinion: Most record labels don’t want you to know how easy Content ID protection really is.',
      engagementBoost: '5.2x Shares',
    },
    {
      id: 'hook-4',
      category: 'Storytelling',
      hookText: 'How Clayton went from a bedroom studio with 0 views to generating 184M streams in 12 months:',
      engagementBoost: '4.1x Save Rate',
    },
    {
      id: 'hook-5',
      category: 'Direct Value',
      hookText: 'The exact 5-step checklist we use to render 4K Motion Cinema visualizers in under 10 minutes:',
      engagementBoost: '3.7x Click Rate',
    }
  ];

  // Generator State (1 Idea to 10 Assets)
  const [inputIdea, setInputIdea] = useState<string>('How 24-bit audio synthesis and Motion Cinema visualizers double fan engagement on Facebook & Instagram');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPack, setGeneratedPack] = useState<GeneratedAssetPack | null>({
    id: 'pack-101',
    originalIdea: 'How 24-bit audio synthesis and Motion Cinema visualizers double fan engagement',
    facebookCaption: `Most artists focus 90% of their energy on recording the track, and only 10% on how it actually looks when scrolling through Facebook and Instagram feeds.\n\nIn 2026, the scroll speed is under 1.2 seconds. If your audio doesn't hit with 24-bit sub-bass punch and your visuals aren't Motion Cinema grade within the first 3 seconds, listeners keep scrolling.\n\nAt Red Vision Music, we built a 1-click pipeline that converts raw audio into 4K Motion Cinema visualizers with embedded ISRC metadata.\n\nHere is how to upgrade your upcoming releases instantly:`,
    selectedHook: 'Stop making this $10,000 mistake when exporting your final audio masters...',
    visualGraphicType: 'Myth vs Fact',
    visualGraphicText: 'MYTH: You need a 5-figure budget for a cinematic video.\nFACT: Motion Cinema AI renders 4K visuals in minutes.',
    reelScript: '0:00 - 0:03: [Fast panning visualizer] "Stop making this $10,000 studio mistake..."\n0:03 - 0:08: [Clayton holding studio headphones] "If your audio isn\'t 24-bit, Facebook compression will ruin your sub-bass."\n0:08 - 0:15: [Final result + CTA] "Click the link below to test our 1-click studio pipeline."',
    carouselSlides: [
      'Slide 1: Why 90% of Independent Releases Get Lost in the Feed',
      'Slide 2: The 24-Bit Audio Rule for Facebook & IG Compression',
      'Slide 3: Motion Cinema AI vs Traditional Video Production',
      'Slide 4: Step-by-Step 1-Click Release Checklist',
      'Slide 5: Claim Your Studio Demo at RedVisionMusic.com'
    ],
    smartCTA: '🚀 Drop "SYNTH" in the comments below or tap the link in bio to get our free 24-bit studio release checklist!',
    firstComment: '📌 Stream our latest 24-bit master "Hyper-Clean 808 Trap" on Spotify & YouTube: https://redvisionmusic.com/release/hyper-clean-808',
    status: 'Approved',
    scheduledDate: 'Tomorrow at 10:00 AM EST',
  });

  const [copysuccess, setCopySuccess] = useState<string | null>(null);

  const handleImportBrand = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      setBrandMemory(prev => ({
        ...prev,
        isTrained: true,
      }));
      setTimeout(() => setImportSuccess(false), 4000);
    }, 1800);
  };

  const handleGenerateAssets = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPack({
        id: `pack-${Date.now()}`,
        originalIdea: inputIdea,
        facebookCaption: `Here is the truth about "${inputIdea}":\n\nIf you want maximum engagement across Facebook, Instagram, and TikTok, you need content that stops the scroll instantly.\n\nBy leveraging ViralCredAI brand memory and Red Vision 24-bit studio DSP, every post you publish reflects ${brandMemory.voiceTone} voice tone and directly promotes "${brandMemory.coreOffers}".\n\nTake action today before your competitors adapt.`,
        selectedHook: 'Stop making this $10,000 mistake when exporting your final audio masters...',
        visualGraphicType: 'Checklist',
        visualGraphicText: `5-STEP VIRAL REASONING:\n1. Hook in first 2 seconds\n2. 24-Bit Sub-bass audio punch\n3. 4K Motion Cinema visualizer\n4. Clear CTA in first comment\n5. ${brandMemory.defaultCTA}`,
        reelScript: `0:00 - 0:03: [High energy intro] "${inputIdea}"\n0:03 - 0:10: [Founder Clayton on camera] "Here is how Red Vision executes this in under 10 minutes..."\n0:10 - 0:15: [CTA screen] "${brandMemory.defaultCTA}"`,
        carouselSlides: [
          `Slide 1: ${inputIdea}`,
          `Slide 2: The Core Problem Most Creators Face`,
          `Slide 3: The ViralCredAI 1-to-10 Multi-Asset Strategy`,
          `Slide 4: Real Case Study Results (184M+ Views)`,
          `Slide 5: ${brandMemory.defaultCTA}`
        ],
        smartCTA: `🔥 Ready to double your reach? ${brandMemory.defaultCTA}`,
        firstComment: `💬 Drop a comment below or visit ${brandMemory.websiteUrl} to train your brand memory!`,
        status: automationMode === 'automated' ? 'Auto-Published' : 'Draft',
        scheduledDate: 'Scheduled for Today at 6:00 PM EST',
      });
      setActiveSubTab('approval');
    }, 2000);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2500);
  };

  return (
    <div className="space-y-8 text-left font-sans">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/40 border border-amber-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-500/50 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>VIRALCREDAI & CREDSCOUT ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              1 Idea to 10 Assets & Viral Content Engine
            </h2>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Discover real-time hot trends with CredScout, train Smart Brand Memory, generate scroll-stopping hooks, and instantly repurpose 1 single idea into 10 multi-format Facebook, Reel, and Carousel assets.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Automation Mode Switcher */}
            <div className="p-1.5 rounded-2xl bg-black border border-zinc-800 flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setAutomationMode('reviewable')}
                className={`px-3 py-2 rounded-xl font-bold transition-all ${
                  automationMode === 'reviewable'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Fully Reviewable
              </button>
              <button
                onClick={() => setAutomationMode('automated')}
                className={`px-3 py-2 rounded-xl font-bold transition-all ${
                  automationMode === 'automated'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Fully Automated
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none font-mono text-xs relative z-10">
          <button
            onClick={() => setActiveSubTab('generator')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'generator'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>1 Idea → 10 Assets Generator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('scout')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'scout'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span>CredScout Trending & Hot Searches</span>
          </button>

          <button
            onClick={() => setActiveSubTab('brand')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'brand'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Smart Brand Memory & Voice Trainer</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hooks')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'hooks'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-emerald-400" />
            <span>Viral Hook Library</span>
          </button>

          <button
            onClick={() => setActiveSubTab('approval')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'approval'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-rose-400" />
            <span>Content Approval & Calendar</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {copysuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/80 text-emerald-300 font-mono text-xs flex items-center gap-2 shadow-xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Copied {copysuccess} to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== SUB-TAB 1: 1 IDEA TO 10 ASSETS GENERATOR ==================== */}
      {activeSubTab === 'generator' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Unlimited Idea Generator & Hook Adaptor
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Enter any rough thought, topic, or product offer to automatically generate 10 brand-matched content assets.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-mono font-bold uppercase">
                Brand Memory Active
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Rough Thought, Topic, or Offer Concept
                </label>
                <textarea
                  rows={3}
                  value={inputIdea}
                  onChange={(e) => setInputIdea(e.target.value)}
                  placeholder="e.g., Why 24-bit studio masters double social media engagement for music artists..."
                  className="w-full bg-black border border-zinc-800 text-white p-3.5 rounded-2xl focus:border-amber-500 focus:outline-none font-sans text-xs leading-relaxed"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerateAssets}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-amber-500 hover:from-amber-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-600/30"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>ViralCredAI Adapting Idea to 10 Brand Assets...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate 10 Multi-Format Assets from 1 Idea</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Display Generated Pack */}
          {generatedPack && (
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10 Brand-Matched Assets Ready
                </span>
                <span className="text-zinc-500">Status: {generatedPack.status}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Facebook Long-Form Caption */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" /> Facebook Long-Form Caption Writer
                    </span>
                    <button
                      onClick={() => handleCopyText(generatedPack.facebookCaption, 'Facebook Caption')}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                    {generatedPack.facebookCaption}
                  </p>
                </div>

                {/* 2. Scroll-Stopping Hook */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" /> Scroll-Stopping Opening Hook
                    </span>
                    <button
                      onClick={() => handleCopyText(generatedPack.selectedHook, 'Hook')}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 font-mono text-xs font-bold">
                    "{generatedPack.selectedHook}"
                  </div>
                </div>

                {/* 3. AI Visual Creator (Myth vs Fact / Graphic) */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400" /> AI Visual Graphic ({generatedPack.visualGraphicType})
                    </span>
                    <button
                      onClick={() => handleCopyText(generatedPack.visualGraphicText, 'Visual Text')}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-purple-950 border border-purple-500/40 text-center font-mono text-xs text-white space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-900 text-purple-300 text-[10px] uppercase font-bold">
                      {generatedPack.visualGraphicType}
                    </span>
                    <p className="whitespace-pre-line text-sm font-bold leading-snug">
                      {generatedPack.visualGraphicText}
                    </p>
                  </div>
                </div>

                {/* 4. Reel & Short Script Builder */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-400" /> Reel & Short Script Builder
                    </span>
                    <button
                      onClick={() => handleCopyText(generatedPack.reelScript, 'Reel Script')}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 whitespace-pre-line leading-relaxed bg-black p-3 rounded-xl border border-zinc-900">
                    {generatedPack.reelScript}
                  </p>
                </div>

                {/* 5. Carousel Builder (Slide-by-Slide) */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-cyan-400" /> Carousel Builder (5 Slides)
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {generatedPack.carouselSlides.map((slide, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black border border-zinc-900 text-xs text-zinc-200 font-mono">
                        {slide}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Smart CTA & First Comment */}
                <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400" /> Smart CTA & First Comment
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-black border border-zinc-900">
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1">Post CTA</span>
                      <p className="text-zinc-200">{generatedPack.smartCTA}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-black border border-zinc-900">
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1">First Comment</span>
                      <p className="text-emerald-300">{generatedPack.firstComment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== SUB-TAB 2: CREDSCOUT TRENDING & HOT SEARCHES ==================== */}
      {activeSubTab === 'scout' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-400" />
                  CredScout AI Trend & Competitor Finder
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Discover viral search queries, competitor angles, and proven hook frameworks.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={scoutSearchQuery}
                  onChange={(e) => setScoutSearchQuery(e.target.value)}
                  placeholder="Search niche or competitor..."
                  className="bg-black border border-zinc-800 text-white text-xs px-3 py-2 rounded-xl focus:border-cyan-500 focus:outline-none font-mono"
                />
                <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold uppercase shrink-0">
                  Scout Trends
                </button>
              </div>
            </div>

            {/* Trends List */}
            <div className="space-y-4">
              {scoutTrends.map((trend) => (
                <div key={trend.id} className="p-5 rounded-2xl bg-black border border-zinc-900 space-y-3 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-500" />
                      <span className="font-bold text-white text-sm">{trend.topic}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-400 font-bold">
                        {trend.volume}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-bold border border-rose-800">
                        {trend.growth}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-0.5">
                        Proven Competitor Angle
                      </span>
                      <p className="text-zinc-300">{trend.provenAngle}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="font-mono text-[10px] text-zinc-400">
                        Hook Category: <strong className="text-amber-400">{trend.hookCategory}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setInputIdea(trend.topic);
                          setActiveSubTab('generator');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-900 font-mono text-[10px] font-bold uppercase transition-colors"
                      >
                        Adapt Trend to Brand →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 3: SMART BRAND MEMORY & TRAINER ==================== */}
      {activeSubTab === 'brand' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  ViralCredAI Smart Brand Memory
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Import brand details from websites and social profiles to lock in voice, audience, offers, colors, and founder assets.
                </p>
              </div>

              {brandMemory.isTrained && (
                <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-400 border border-purple-800 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Brand Memory Active
                </span>
              )}
            </div>

            {/* Quick Import Form */}
            <div className="p-4 rounded-2xl bg-black border border-zinc-900 space-y-3 font-mono text-xs">
              <span className="text-purple-400 font-bold uppercase block text-[10px]">
                Import Brand Details from Website or Social Profile URL
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-3 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={handleImportBrand}
                  disabled={isImporting}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase transition-all flex items-center gap-2"
                >
                  {isImporting ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Globe className="w-4 h-4" />}
                  <span>Scrape & Train Memory</span>
                </button>
              </div>

              {importSuccess && (
                <div className="text-emerald-400 text-[11px] font-sans">
                  ✓ Scraped brand profile from {importUrl}. Voice tone, colors, and offers updated!
                </div>
              )}
            </div>

            {/* Brand Fields Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandMemory.brandName}
                  onChange={(e) => setBrandMemory({ ...brandMemory, brandName: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Voice & Tone Persona</label>
                <input
                  type="text"
                  value={brandMemory.voiceTone}
                  onChange={(e) => setBrandMemory({ ...brandMemory, voiceTone: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Target Audience Persona</label>
                <input
                  type="text"
                  value={brandMemory.targetAudience}
                  onChange={(e) => setBrandMemory({ ...brandMemory, targetAudience: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Core Offers & Products</label>
                <input
                  type="text"
                  value={brandMemory.coreOffers}
                  onChange={(e) => setBrandMemory({ ...brandMemory, coreOffers: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Founder Name & Face Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={brandMemory.founderName}
                    onChange={(e) => setBrandMemory({ ...brandMemory, founderName: e.target.value })}
                    className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                  />
                  <img src={brandMemory.founderImageUrl} alt="Founder" className="w-10 h-10 rounded-xl object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Primary Call-to-Action (CTA)</label>
                <input
                  type="text"
                  value={brandMemory.defaultCTA}
                  onChange={(e) => setBrandMemory({ ...brandMemory, defaultCTA: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 4: VIRAL HOOK LIBRARY ==================== */}
      {activeSubTab === 'hooks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-emerald-400" />
                  Unlimited Viral Hook Library
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Stop the scroll and capture more attention using pre-tested viral openings across multiple content styles.
                </p>
              </div>
            </div>

            {/* Hook List */}
            <div className="space-y-3">
              {hooksLibrary.map((hook) => (
                <div key={hook.id} className="p-4 rounded-2xl bg-black border border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 uppercase">
                        {hook.category}
                      </span>
                      <span className="text-zinc-500 text-[10px]">{hook.engagementBoost}</span>
                    </div>
                    <p className="text-white font-bold text-sm">"{hook.hookText}"</p>
                  </div>

                  <button
                    onClick={() => {
                      setInputIdea(`Use hook: "${hook.hookText}"`);
                      setActiveSubTab('generator');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase transition-colors shrink-0 text-[10px]"
                  >
                    Use in Idea Generator →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 5: CONTENT APPROVAL & CALENDAR ==================== */}
      {activeSubTab === 'approval' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-rose-400" />
                  Content Preview, Approval & Calendar Publisher
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Review generated asset packs, approve messaging, and publish instantly or schedule across channels.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold uppercase">
                Mode: {automationMode === 'automated' ? 'Fully Automated' : 'Fully Reviewable'}
              </span>
            </div>

            {generatedPack ? (
              <div className="p-6 rounded-2xl bg-black border border-zinc-900 space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 font-mono">
                  <span className="font-bold text-white uppercase text-sm">Asset Pack: "{generatedPack.originalIdea}"</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold border border-amber-800">
                    {generatedPack.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 uppercase block mb-1">Caption Length</span>
                    <span className="text-white font-bold">142 words (Long-Form Facebook)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 uppercase block mb-1">Visual Format</span>
                    <span className="text-purple-400 font-bold">{generatedPack.visualGraphicType}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 uppercase block mb-1">Scheduled Time</span>
                    <span className="text-emerald-400 font-bold">{generatedPack.scheduledDate}</span>
                  </div>
                </div>

                {/* Approve & Schedule Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setGeneratedPack({ ...generatedPack, status: 'Auto-Published' });
                    }}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>Approve & Publish Live Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setGeneratedPack({ ...generatedPack, status: 'Scheduled' });
                    }}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Schedule to Content Calendar</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-xs font-mono">No asset pack generated yet. Use the 1 Idea → 10 Assets Generator tab.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
