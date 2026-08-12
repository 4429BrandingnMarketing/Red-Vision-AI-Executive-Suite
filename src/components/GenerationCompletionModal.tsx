import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Download, Share2, Sparkles, X, Disc, Film, Music, 
  ExternalLink, Copy, Check, ShieldCheck, ArrowRight, LayoutGrid 
} from 'lucide-react';

export interface AssetCompletionData {
  title: string;
  category: 'AUDIO' | 'VIDEO' | 'ARTWORK' | 'DOCUMENT' | 'PACKAGE';
  format: string;
  size: string;
  specs: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
}

interface GenerationCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetCompletionData | null;
  onNavigateToDashboard?: () => void;
}

export function GenerationCompletionModal({
  isOpen,
  onClose,
  asset,
  onNavigateToDashboard
}: GenerationCompletionModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !asset) return null;

  const shareUrl = `https://redvisionai.com/deliverables/${encodeURIComponent(
    asset.title.toLowerCase().replace(/\s+/g, '-')
  )}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Red Vision AI Deliverable: ${asset.title}`,
          text: `Check out this AI master asset generated at Red Vision Creative Studio: ${asset.title}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard copy
      }
    }
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy share link', err);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    // Simulate instant secure asset packaging & download trigger
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);

      // Trigger browser blob download simulation
      const element = document.createElement('a');
      const file = new Blob([`Red Vision AI Executive Master File: ${asset.title}\nSpecs: ${asset.specs}\nGenerated at: ${new Date().toISOString()}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${asset.title.toLowerCase().replace(/\s+/g, '_')}_master.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-red-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60 text-left font-sans overflow-hidden ring-1 ring-red-500/40"
        >
          {/* Top ambient red glow accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/40 shrink-0">
              {asset.category === 'AUDIO' ? (
                <Disc className="w-6 h-6 animate-spin-slow" />
              ) : asset.category === 'VIDEO' ? (
                <Film className="w-6 h-6" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>AI GENERATION COMPLETE</span>
              </div>
              <h3 className="text-lg font-bold font-mono text-white tracking-tight">
                Your Asset is Mastered & Ready!
              </h3>
            </div>
          </div>

          {/* Asset Summary Card */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3 mb-6 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                  {asset.category} DELIVERABLE
                </span>
                <h4 className="text-base font-bold text-white leading-snug mt-0.5">
                  {asset.title}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-black border border-zinc-800 font-mono text-[11px] text-zinc-300 font-bold shrink-0">
                {asset.format}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-zinc-800/80">
              <div className="bg-black/60 p-2 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">SPECIFICATIONS:</span>
                <span className="text-zinc-200 font-bold text-[11px]">{asset.specs}</span>
              </div>
              <div className="bg-black/60 p-2 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">FILE SIZE / FORMAT:</span>
                <span className="text-zinc-200 font-bold text-[11px]">{asset.size}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Download & Share */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border shadow-lg ${
                  downloadSuccess
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-600/30'
                    : 'bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-red-600/30'
                } disabled:opacity-50`}
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Packaging...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Download Started!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Master</span>
                  </>
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-red-400" />
                    <span>Share Deliverable</span>
                  </>
                )}
              </button>
            </div>

            {/* Dashboard Navigation Secondary Link */}
            {onNavigateToDashboard && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToDashboard();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-red-400" />
                <span>View in Client Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISRC Lock & Watermark Protection Active</span>
            </span>
            <button onClick={onClose} className="hover:text-zinc-300 underline">
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
