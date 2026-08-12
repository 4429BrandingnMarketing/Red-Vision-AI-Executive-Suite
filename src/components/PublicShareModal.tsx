import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Copy, Check, ShieldCheck, Lock, Eye, Sparkles, X, 
  ExternalLink, Bot, Mic, Cpu, Code2, Layers, Key, Clock, Zap, ArrowRight, Share2 
} from 'lucide-react';
import { AssetCompletionData } from './GenerationCompletionModal.js';

interface PublicShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetCompletionData | null;
  onOpenPublicPortal: (shareConfig: ShareConfig) => void;
}

export interface ShareConfig {
  asset: AssetCompletionData;
  shareUrl: string;
  shareCode: string;
  allowDownload: boolean;
  enableHermesAgent: boolean;
  enableBuzzEngine: boolean;
  enableOmniRoute: boolean;
  enableOpenCode: boolean;
  enableOpenDesign: boolean;
  expiration: '7_DAYS' | '30_DAYS' | 'NEVER';
  passcodeProtected: boolean;
  passcode?: string;
}

export function PublicShareModal({
  isOpen,
  onClose,
  asset,
  onOpenPublicPortal,
}: PublicShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [allowDownload, setAllowDownload] = useState(true);
  const [enableHermesAgent, setEnableHermesAgent] = useState(true);
  const [enableBuzzEngine, setEnableBuzzEngine] = useState(true);
  const [enableOmniRoute, setEnableOmniRoute] = useState(true);
  const [enableOpenCode, setEnableOpenCode] = useState(true);
  const [enableOpenDesign, setEnableOpenDesign] = useState(true);
  const [expiration, setExpiration] = useState<'7_DAYS' | '30_DAYS' | 'NEVER'>('30_DAYS');
  const [passcodeProtected, setPasscodeProtected] = useState(false);
  const [passcode, setPasscode] = useState('RED-2026');

  if (!isOpen || !asset) return null;

  const slug = asset.title.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-');
  const shareCode = `pub_${Math.random().toString(36).substring(2, 9)}`;
  const shareUrl = `https://redvisionai.com/client/share/${slug}?key=${shareCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLaunchPortal = () => {
    onClose();
    onOpenPublicPortal({
      asset,
      shareUrl,
      shareCode,
      allowDownload,
      enableHermesAgent,
      enableBuzzEngine,
      enableOmniRoute,
      enableOpenCode,
      enableOpenDesign,
      expiration,
      passcodeProtected,
      passcode: passcodeProtected ? passcode : undefined,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-zinc-950 border border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60 text-left font-sans overflow-hidden ring-1 ring-red-500/30"
        >
          {/* Top subtle glow header line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
              <Globe className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <Globe className="w-3 h-3 text-red-400" />
                <span>NO-LOGIN CLIENT PORTAL</span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white tracking-tight">
                Generate Public Share Link
              </h3>
            </div>
          </div>

          {/* Asset summary banner */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 mb-5">
            <div className="min-w-0">
              <span className="font-mono text-[10px] text-red-400 font-bold uppercase">
                TARGET ASSET: {asset.category}
              </span>
              <h4 className="text-xs font-bold text-white truncate font-sans">
                {asset.title}
              </h4>
              <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                {asset.specs} • {asset.format}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-black border border-zinc-800 font-mono text-[10px] text-emerald-400 font-bold shrink-0">
              Public Token Ready
            </span>
          </div>

          {/* Share Link Output Field */}
          <div className="space-y-1.5 mb-5">
            <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Shareable Public URL (Client Portal Access)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-red-400 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-red-600/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* AI Engines & Open Tooling Access Toggles */}
          <div className="space-y-3 mb-6">
            <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Embedded AI Engines & Open Studio Modules
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              {/* Hermes AI Executive Agent */}
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                enableHermesAgent ? 'bg-red-950/40 border-red-500/80 text-white' : 'bg-black/60 border-zinc-800 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Hermes AI Agent</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Strategic release assistant</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableHermesAgent}
                  onChange={(e) => setEnableHermesAgent(e.target.checked)}
                  className="accent-red-500 w-4 h-4"
                />
              </label>

              {/* Buzz Speech & Stems Engine */}
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                enableBuzzEngine ? 'bg-amber-950/40 border-amber-500/80 text-white' : 'bg-black/60 border-zinc-800 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Buzz Engine</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Lyrics & stem transcription</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableBuzzEngine}
                  onChange={(e) => setEnableBuzzEngine(e.target.checked)}
                  className="accent-amber-500 w-4 h-4"
                />
              </label>

              {/* OmniRoute Model Pipeline */}
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                enableOmniRoute ? 'bg-rose-950/40 border-rose-500/80 text-white' : 'bg-black/60 border-zinc-800 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">OmniRoute</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Gemini Omni Flash telemetry</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableOmniRoute}
                  onChange={(e) => setEnableOmniRoute(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              {/* Open Code Execution */}
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                enableOpenCode ? 'bg-cyan-950/40 border-cyan-500/80 text-white' : 'bg-black/60 border-zinc-800 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Open Code</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Inspect prompt/code payload</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableOpenCode}
                  onChange={(e) => setEnableOpenCode(e.target.checked)}
                  className="accent-cyan-500 w-4 h-4"
                />
              </label>

              {/* Open Design Canvas */}
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between sm:col-span-2 ${
                enableOpenDesign ? 'bg-purple-950/40 border-purple-500/80 text-white' : 'bg-black/60 border-zinc-800 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Open Design Canvas</span>
                    <span className="text-[9px] text-zinc-400 font-sans block">Visual layer breakdown, stems waveform, and 3D wireframes</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableOpenDesign}
                  onChange={(e) => setEnableOpenDesign(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Security & Access Controls */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[9px] uppercase block font-bold">LINK EXPIRATION:</span>
              <select
                value={expiration}
                onChange={(e: any) => setExpiration(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-1 text-xs focus:outline-none"
              >
                <option value="7_DAYS">7 Days Access</option>
                <option value="30_DAYS">30 Days Access</option>
                <option value="NEVER">Never Expires</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-[9px] uppercase block font-bold">PASSCODE LOCK:</span>
                <input
                  type="checkbox"
                  checked={passcodeProtected}
                  onChange={(e) => setPasscodeProtected(e.target.checked)}
                  className="accent-red-500"
                />
              </div>
              {passcodeProtected && (
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-red-400 rounded p-1 text-xs font-mono font-bold uppercase"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleLaunchPortal}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30"
            >
              <Eye className="w-4 h-4 text-white" />
              <span>Preview Public Client Portal (No Login)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
