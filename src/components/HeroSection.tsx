import React from 'react';
import { ArrowRight, Play, Globe, Disc, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';
import { AppView } from '../types/index.js';

interface HeroSectionProps {
  onViewChange: (view: AppView) => void;
  onOpenVSL: () => void;
}

export function HeroSection({ onViewChange, onOpenVSL }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-black">
      {/* Background kinetic red ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-rose-700/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow / URL Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs font-semibold tracking-wider shadow-xl backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span className="text-zinc-200">redvisionai.com</span>
              <span className="text-zinc-600">|</span>
              <span className="text-red-400 font-bold uppercase tracking-widest text-[11px]">FOUNDER WORKSPACE</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans"
            >
              The Visionary Creative Partner:{' '}
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-white bg-clip-text text-transparent drop-shadow-sm">
                Your Complete AI Executive Suite
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-2xl"
            >
              Engineered by <strong className="text-white font-semibold underline decoration-red-500 decoration-2 underline-offset-4">Jason Salvador</strong>. Features a 24-bit audio mixing studio, pro touring AI with built-in travel agency, website builder, 4K video editor, social media marketing, and a dedicated AI staff (Sales Agent with 300M+ leads, Merch Designer, and Web Designer).
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange('console')}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-2xl shadow-red-600/40 transition-all duration-300 flex items-center justify-center gap-3 border border-red-400/30"
              >
                <span>Launch Studio Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenVSL}
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/60 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2.5 shadow-xl backdrop-blur-md group"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/40 transition-colors">
                  <Play className="w-3 h-3 text-red-500 fill-current" />
                </div>
                <span>Watch Executive Demo Video</span>
              </motion.button>
            </motion.div>

            {/* Mini Trust Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4"
            >
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="text-2xl font-black font-mono text-white">25+ YRS</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Industry Authority</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-xl bg-white/5 border border-red-500/30 backdrop-blur-md"
              >
                <div className="text-2xl font-black font-mono text-red-500">10-in-1</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Tool Consolidation</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="text-2xl font-black font-mono text-white">4K / 24-BIT</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Pro Audio & Motion</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: 3D Claymation Jason Salvador Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-red-500/50 bg-white/5 backdrop-blur-md shadow-2xl shadow-red-950/80 group">
              <img
                src={JASON_PORTRAIT_IMG}
                alt="Jason Salvador 3D Claymation Portrait"
                className="w-full aspect-[16/10] lg:aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Floating Pill Badges */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <Disc className="w-4 h-4 text-red-500 animate-spin" />
                <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                  Jason Salvador (Executive)
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span className="font-mono text-xs font-bold uppercase text-red-400 tracking-wider">
                    Red Vision Music / Creative Studio
                  </span>
                </div>
                <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                  3D Claymation representation of Founder Jason Salvador (Black & Filipino heritage) in his futuristic AI studio.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

