import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, ShieldCheck, Download, Bot, Mic, Zap, Code2, Layers, 
  Disc, Film, Sparkles, CheckCircle2, Play, Pause, Volume2, ArrowLeft, 
  Send, RefreshCw, Eye, Share2, Copy, Check, MessageSquare, Terminal, 
  Lock, AlertCircle, FileText, CheckSquare, Sparkle, ExternalLink
} from 'lucide-react';
import { ShareConfig } from './PublicShareModal.js';

interface PublicClientPortalProps {
  shareConfig: ShareConfig;
  onBackToConsole: () => void;
}

export function PublicClientPortal({
  shareConfig,
  onBackToConsole,
}: PublicClientPortalProps) {
  const { asset, allowDownload, enableHermesAgent, enableBuzzEngine, enableOmniRoute, enableOpenCode, enableOpenDesign } = shareConfig;

  const [activeTab, setActiveTab] = useState<'overview' | 'hermes' | 'buzz' | 'omniroute' | 'opencode' | 'opendesign'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<'PENDING' | 'APPROVED' | 'REVISION_REQUESTED'>('PENDING');

  // Hermes Agent Chat State
  const [hermesMessages, setHermesMessages] = useState<Array<{ sender: 'HERMES' | 'CLIENT'; text: string; time: string }>>([
    {
      sender: 'HERMES',
      text: `Greetings! I am Hermes, the Red Vision Executive AI Agent. I have audited "${asset.title}". ISRC metadata and 24-bit audio frequency grids are 100% verified for worldwide distribution. How can I assist with your release strategy?`,
      time: 'Just now',
    },
  ]);
  const [inputHermes, setInputHermes] = useState('');
  const [isHermesTyping, setIsHermesTyping] = useState(false);

  // Buzz Engine Lyrics/Speech State
  const [buzzTranscript] = useState([
    { time: '00:04', line: 'Echoes in the dark, neon shadows fall' },
    { time: '00:12', line: 'Red Vision AI driving through the wall' },
    { time: '00:22', line: 'Synthesized sub bass, 808s in control' },
    { time: '00:35', line: 'Worldwide distribution locked for the soul' },
  ]);

  // Handle Hermes Chat Submission
  const handleSendHermes = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputHermes.trim()) return;

    const userMsg = inputHermes;
    setHermesMessages((prev) => [...prev, { sender: 'CLIENT', text: userMsg, time: 'Just now' }]);
    setInputHermes('');
    setIsHermesTyping(true);

    setTimeout(() => {
      const hermesResponses = [
        `Analysis complete for "${asset.title}". Based on current Spotify and Apple Music streaming algorithms, I recommend scheduling distribution for Friday midnight EST.`,
        `The dynamic range of ${asset.specs} matches top-tier radio broadcast specs (+14 LUFS). I have drafted a sync licensing pitch for film & TV trailers.`,
        `I have updated the release roadmap. All stems and metadata for ${asset.format} are queued for distribution via Red Vision's global API.`,
      ];
      const reply = hermesResponses[Math.floor(Math.random() * hermesResponses.length)];
      setHermesMessages((prev) => [...prev, { sender: 'HERMES', text: reply, time: 'Just now' }]);
      setIsHermesTyping(false);
    }, 1200);
  };

  const handleCopyPublicLink = async () => {
    try {
      await navigator.clipboard.writeText(shareConfig.shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white pb-16">
      
      {/* Top Zero-Login Public Header Banner */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToConsole}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              title="Return to Studio Console"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
              <span>Studio Console</span>
            </button>

            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                RED VISION PUBLIC PORTAL
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold uppercase">
                NO LOGIN REQUIRED
              </span>
            </div>
          </div>

          {/* Quick Actions & Approval Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyPublicLink}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/60 text-zinc-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-red-400" />}
              <span>{copiedLink ? 'Link Copied' : 'Share URL'}</span>
            </button>

            {allowDownload && (
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading master package for: ${asset.title}`);
                }}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-red-600/30"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download Master</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8 text-left">
        
        {/* Deliverable Hero Banner Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-red-500/40 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-red-500/80">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Asset Media Frame */}
            <div className="lg:col-span-5 relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group">
              <img
                src={asset.thumbnailUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Play / Preview Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/60 transition-transform hover:scale-110"
              >
                {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-zinc-300 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-zinc-800">
                <span className="text-red-400 font-bold">{asset.category} MASTER</span>
                <span>{asset.format}</span>
              </div>
            </div>

            {/* Asset Details & Sign-Off Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 font-mono text-[10px] text-red-400 font-bold uppercase">
                    ISRC CLEARED & WATERMARKED
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">
                    TOKEN: {shareConfig.shareCode}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight uppercase leading-snug">
                  {asset.title}
                </h1>
                
                <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2">
                  Public Executive Master deliverable synthesized with 24-bit audio frequency optimization, 4K motion cinema keyframes, and full multi-stem alignment.
                </p>
              </div>

              {/* Specifications Box */}
              <div className="p-3.5 rounded-2xl bg-black/80 border border-zinc-800 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">FORMAT</span>
                  <span className="text-white font-bold">{asset.format}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">FILE SIZE</span>
                  <span className="text-white font-bold">{asset.size}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-[10px] block uppercase">TECHNICAL SPECS</span>
                  <span className="text-emerald-400 font-bold">{asset.specs}</span>
                </div>
              </div>

              {/* Client Executive Approval Sign-Off Bar */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs font-mono">
                  <span className="text-zinc-400 block font-bold">CLIENT SIGN-OFF STATUS:</span>
                  <span className={`font-bold ${
                    approvalStatus === 'APPROVED' ? 'text-emerald-400' : approvalStatus === 'REVISION_REQUESTED' ? 'text-amber-400' : 'text-zinc-300'
                  }`}>
                    {approvalStatus === 'APPROVED' ? '✓ APPROVED FOR DISTRIBUTION' : approvalStatus === 'REVISION_REQUESTED' ? '⚠ REVISION REQUESTED' : 'PENDING REVIEW'}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setApprovalStatus('APPROVED')}
                    className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                      approvalStatus === 'APPROVED'
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-zinc-800 hover:bg-emerald-950 hover:text-emerald-400 border border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Approve Asset</span>
                  </button>

                  <button
                    onClick={() => setApprovalStatus('REVISION_REQUESTED')}
                    className={`px-3 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                      approvalStatus === 'REVISION_REQUESTED'
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : 'bg-zinc-800 hover:bg-amber-950 hover:text-amber-400 border border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <span>Request Revision</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Public Navigation Tabs for AI Tooling & Open Engines */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Eye className="w-4 h-4 text-red-400" />
            <span>Master Overview</span>
          </button>

          {enableHermesAgent && (
            <button
              onClick={() => setActiveTab('hermes')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'hermes'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Bot className="w-4 h-4 text-red-400" />
              <span>Hermes Agent</span>
            </button>
          )}

          {enableBuzzEngine && (
            <button
              onClick={() => setActiveTab('buzz')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'buzz'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Buzz Engine</span>
            </button>
          )}

          {enableOmniRoute && (
            <button
              onClick={() => setActiveTab('omniroute')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'omniroute'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Zap className="w-4 h-4 text-rose-400" />
              <span>OmniRoute Pipeline</span>
            </button>
          )}

          {enableOpenCode && (
            <button
              onClick={() => setActiveTab('opencode')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'opencode'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Open Code</span>
            </button>
          )}

          {enableOpenDesign && (
            <button
              onClick={() => setActiveTab('opendesign')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'opendesign'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Open Design Canvas</span>
            </button>
          )}
        </div>

        {/* TAB 1: HERMES AI EXECUTIVE AGENT */}
        {activeTab === 'hermes' && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-red-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/40">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">HERMES EXECUTIVE AI AGENT</h3>
                  <p className="text-xs text-zinc-400 font-sans">Strategic Release Guidance, Radio Playlists & ISRC Rights Consultation</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-500/40 font-mono text-[10px] text-red-400 font-bold uppercase">
                AGENT ONLINE
              </span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 h-64 overflow-y-auto p-4 rounded-2xl bg-black border border-zinc-800 font-sans text-xs">
              {hermesMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'CLIENT' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mb-1">
                    <span>{msg.sender === 'HERMES' ? 'Hermes AI Agent' : 'External Client'}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                    msg.sender === 'CLIENT'
                      ? 'bg-red-600 text-white font-mono'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isHermesTyping && (
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Hermes AI is analyzing studio telemetry...</span>
                </div>
              )}
            </div>

            {/* Hermes Input Bar */}
            <form onSubmit={handleSendHermes} className="flex gap-2">
              <input
                type="text"
                value={inputHermes}
                onChange={(e) => setInputHermes(e.target.value)}
                placeholder="Ask Hermes about streaming strategy, licensing, or release dates..."
                className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white font-sans text-xs focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-red-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: BUZZ ENGINE (SPEECH, LYRICS & STEMS) */}
        {activeTab === 'buzz' && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-lg shadow-amber-600/40">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">BUZZ ENGINE TELEMETRY</h3>
                  <p className="text-xs text-zinc-400 font-sans">Vocal Speech-to-Text Transcription & Stem Alignment</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-950 border border-amber-500/40 font-mono text-[10px] text-amber-400 font-bold uppercase">
                BUZZ 2.0 ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
              {/* Lyrics & Speech Transcript */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <span className="text-amber-400 font-bold block uppercase text-[10px]">TRANSCRIBED LYRICS & VOCAL MARKS</span>
                <div className="space-y-2">
                  {buzzTranscript.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <span className="text-red-400 font-bold text-[11px]">{t.time}</span>
                      <span className="text-zinc-200 font-sans text-xs">{t.line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution Metadata & ISRC Registry */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <span className="text-amber-400 font-bold block uppercase text-[10px]">GLOBAL MUSIC METADATA REGISTRY</span>
                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                    <span className="text-zinc-400">ISRC Code:</span>
                    <span className="text-white font-bold">US-RED-26-00109</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                    <span className="text-zinc-400">Master Rights Holder:</span>
                    <span className="text-white font-bold">Red Vision Creative Studio LLC</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between">
                    <span className="text-zinc-400">Publishing Split:</span>
                    <span className="text-emerald-400 font-bold">50% Producer / 50% Writer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OMNIROUTE MULTI-MODEL ROUTE TELEMETRY */}
        {activeTab === 'omniroute' && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-rose-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-600/40">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">OMNIROUTE MULTI-MODEL TELEMETRY</h3>
                  <p className="text-xs text-zinc-400 font-sans">Real-time AI Model Routing Topology & Infrastructure Performance</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-950 border border-rose-500/40 font-mono text-[10px] text-rose-400 font-bold uppercase">
                LATENCY: 42ms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase block">ROUTED AI MODEL</span>
                <span className="text-rose-400 font-bold text-sm block">Gemini 3.5 Flash</span>
                <span className="text-[10px] text-zinc-400">Prompt spec validation & ISRC lock</span>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase block">MEDIA SYNTHESIS MODEL</span>
                <span className="text-amber-400 font-bold text-sm block">Lyria-3 + Gemini Omni</span>
                <span className="text-[10px] text-zinc-400">24-Bit audio & 4K motion render</span>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase block">THROUGHPUT RATE</span>
                <span className="text-emerald-400 font-bold text-sm block">124 tokens/sec</span>
                <span className="text-[10px] text-zinc-400">0.00% frame drop rate</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OPEN CODE EXECUTION INSPECTOR */}
        {activeTab === 'opencode' && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-cyan-500/40 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-600/40">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">OPEN CODE TELEMETRY PAYLOAD</h3>
                  <p className="text-xs text-zinc-400 font-sans">Transparent TypeScript SDK Execution & Request Inspection</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-bold uppercase text-[10px]">
                OPEN CODE ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-zinc-800 overflow-x-auto text-cyan-300 space-y-2">
              <div className="flex justify-between text-zinc-500 text-[10px] pb-2 border-b border-zinc-800">
                <span>FILE: /src/services/redVisionAI.ts</span>
                <span>STATUS: 200 OK</span>
              </div>
              <pre className="text-[11px] leading-relaxed">
{`// Red Vision AI Studio Master Generation SDK Call
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateExecutiveDeliverable() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: "Synthesize 24-bit audio master for: ${asset.title}" }]
      }
    ],
    config: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    }
  });

  return response;
}`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 5: OPEN DESIGN CANVAS */}
        {activeTab === 'opendesign' && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-purple-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-600/40">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">OPEN DESIGN CANVAS & STEM BREAKDOWN</h3>
                  <p className="text-xs text-zinc-400 font-sans">Layer Stack, Color Palette Swatches, & Waveform Stems</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-950 border border-purple-500/40 font-mono text-[10px] text-purple-400 font-bold uppercase">
                CANVAS LAYERS READY
              </span>
            </div>

            {/* Stems & Layers Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <span className="text-purple-400 font-bold block uppercase text-[10px]">ISOLATED AUDIO STEMS</span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>1. Drum & Percussion Stem</span>
                    <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>2. Sub-Bass & 808 Stem</span>
                    <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>3. Synth & Lead Melody Stem</span>
                    <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                    <span>4. Vocal Chops Stem</span>
                    <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <span className="text-purple-400 font-bold block uppercase text-[10px]">DESIGN COLOR SWATCHES & PALETTE</span>
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <div className="h-16 rounded-xl bg-red-600 flex flex-col justify-end p-2 text-[9px] text-white font-bold">
                    #DC2626
                  </div>
                  <div className="h-16 rounded-xl bg-rose-600 flex flex-col justify-end p-2 text-[9px] text-white font-bold">
                    #E11D48
                  </div>
                  <div className="h-16 rounded-xl bg-amber-500 flex flex-col justify-end p-2 text-[9px] text-black font-bold">
                    #F59E0B
                  </div>
                  <div className="h-16 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-end p-2 text-[9px] text-white font-bold">
                    #09090B
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
