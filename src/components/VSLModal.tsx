import React, { useState } from 'react';
import { X, Play, Pause, Volume2, Sparkles, Disc, Clapperboard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { VSL_SCRIPT, JASON_PORTRAIT_IMG, CLAY_STUDIO_IMG } from '../data/redVisionData.js';

interface VSLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchConsole: () => void;
}

export function VSLModal({ isOpen, onClose, onLaunchConsole }: VSLModalProps) {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const currentBeat = VSL_SCRIPT[activeBeatIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-md"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-black/80">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
              EXECUTIVE VSL DEMO: THE 25-YEAR STUDIO SECRET
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Video Frame with 3D Claymation Style Frame */}
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-red-600/50 bg-black shadow-2xl group">
            {/* Background clay scene preview */}
            <img
              src={activeBeatIndex === 0 ? JASON_PORTRAIT_IMG : CLAY_STUDIO_IMG}
              alt="Claymation studio setup"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Simulated Neon Soundwaves overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-red-500/40 backdrop-blur-md">
                <Disc className="w-3.5 h-3.5 text-red-500 animate-spin" />
                <span className="font-mono text-[10px] text-red-300 font-bold uppercase tracking-wider">
                  SCENE {activeBeatIndex + 1} / {VSL_SCRIPT.length}: {currentBeat.time}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-red-500/40 backdrop-blur-md">
                <Volume2 className="w-3.5 h-3.5 text-red-400" />
                <span className="font-mono text-[10px] text-zinc-300">24-BIT STEREO SYNTHESIS</span>
              </div>
            </div>

            {/* Voiceover Captions Display */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/90 border border-red-500/40 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="font-mono text-[11px] font-bold uppercase text-red-400 tracking-wider">
                  Jason Salvador (Executive Voiceover)
                </span>
              </div>
              <p className="text-sm font-sans text-zinc-100 font-medium leading-relaxed">
                "{currentBeat.voiceover}"
              </p>
            </div>

            {/* Play/Pause Center Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>

          {/* Script Timeline Beats Selection */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-red-500" />
              60-Second Storyboard & Transcript Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {VSL_SCRIPT.map((beat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveBeatIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeBeatIndex === idx
                      ? 'bg-red-950/80 border-red-500 text-white shadow-lg shadow-red-950'
                      : 'bg-black/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-red-400 mb-1">{beat.time}</div>
                  <div className="text-[11px] font-mono line-clamp-2">{beat.visual}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-zinc-900 bg-black/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white font-mono">Ready to experience the 25-Year Studio Secret?</div>
            <div className="text-xs text-zinc-400 font-mono">Launch Red Vision AI Studio Console now at redvisionai.com</div>
          </div>
          <button
            onClick={() => {
              onClose();
              onLaunchConsole();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
          >
            Get Exclusive Studio Access
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

