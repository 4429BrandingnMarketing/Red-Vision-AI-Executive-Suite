import React from 'react';
import { Terminal, Play, Disc, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { AppView } from '../types/index.js';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onOpenVSL: () => void;
}

export function Header({ currentView, onViewChange, onOpenVSL }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md shadow-2xl shadow-red-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & URL Badge */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange('funnel')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-rose-600 to-red-900 p-0.5 shadow-lg shadow-red-600/30 group-hover:shadow-red-500/50 transition-all duration-300">
            <div className="w-full h-full bg-black/90 rounded-[10px] flex items-center justify-center">
              <Disc className="w-6 h-6 text-red-500 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base font-mono bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-400">
                RED VISION
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 bg-white/5 border border-white/10 rounded-full shadow-inner flex items-center gap-1 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                AI STUDIO
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3 h-3 text-red-500/80" />
              <span className="text-[11px] text-zinc-300 font-mono font-medium tracking-wide block hover:text-red-400 transition-colors">
                redvisionai.com
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onViewChange('funnel')}
            className={`text-xs font-mono tracking-wider transition-all ${
              currentView === 'funnel' 
                ? 'text-red-500 font-bold border-b-2 border-red-500 pb-1' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            OVERVIEW
          </button>
          <motion.button 
            whileHover={{ y: -2 }}
            onClick={onOpenVSL}
            className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-zinc-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/40 hover:bg-white/10 backdrop-blur-md"
          >
            <Play className="w-3 h-3 fill-current text-red-500" />
            DEMO VSL
          </motion.button>
          <a 
            href="#features" 
            onClick={() => currentView !== 'funnel' && onViewChange('funnel')}
            className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            PILLARS
          </a>
          <a 
            href="#matrix" 
            onClick={() => currentView !== 'funnel' && onViewChange('funnel')}
            className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            COMPARISON
          </a>
        </nav>

        {/* Console Action Button */}
        <div className="flex items-center gap-3">
          {currentView === 'funnel' ? (
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('console')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-600/30 hover:shadow-red-500/50 transition-all duration-300 border border-red-400/30"
            >
              <Terminal className="w-4 h-4 text-white" />
              Launch Studio Console
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('funnel')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-mono text-xs hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Back to Overview
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}

