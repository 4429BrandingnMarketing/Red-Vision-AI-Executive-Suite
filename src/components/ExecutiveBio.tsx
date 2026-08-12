import React from 'react';
import { Award, ShieldCheck, UserCheck, Layers, Terminal, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';
import { AppView } from '../types/index.js';

interface ExecutiveBioProps {
  onViewChange: (view: AppView) => void;
}

export function ExecutiveBio({ onViewChange }: ExecutiveBioProps) {
  return (
    <section className="py-16 md:py-24 bg-black border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bio Image & Badge */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="lg:col-span-4 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-2xl shadow-red-950/60 group">
                <img
                  src={JASON_PORTRAIT_IMG}
                  alt="Jason Salvador Executive Bio"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-sans font-extrabold text-lg text-white">Jason Salvador</div>
                  <div className="font-mono text-xs text-red-400 font-bold">Founder & Executive Producer</div>
                  <div className="font-mono text-[11px] text-zinc-300 mt-0.5 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-red-500" />
                    redvisionai.com
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Authority Copy */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                TESTED IN THE FIELD. BUILT FOR REAL ROLLOUTS.
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans leading-snug">
                "After 25 years leading entertainment rollouts, managing top artists, and producing content, I knew the traditional studio workflow needed an overhaul."
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
                "We built Red Vision AI Studio at <strong className="text-white">redvisionai.com</strong> to give artists, producers, and labels an end-to-end command center that turns creative prompts into release-ready assets — without bouncing between 10 fragmented SaaS tools, losing ISRCs, or leaking API keys."
              </p>

              {/* 3 Executive Authority Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors backdrop-blur-md"
                >
                  <Award className="w-5 h-5 text-red-500 mb-2" />
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">Hit Record Rollouts</div>
                  <div className="font-sans text-xs text-zinc-400 mt-1">25 years of managing client deliveries, mixes, and masters on strict deadlines.</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors backdrop-blur-md"
                >
                  <Layers className="w-5 h-5 text-red-500 mb-2" />
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">10-in-1 Integration</div>
                  <div className="font-sans text-xs text-zinc-400 mt-1">Replaces separate DAWs, video editors, release planners, and chat threads.</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors backdrop-blur-md"
                >
                  <UserCheck className="w-5 h-5 text-red-500 mb-2" />
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">API Key Isolation</div>
                  <div className="font-sans text-xs text-zinc-400 mt-1">Multi-user team workspace with individual quota security per roster member.</div>
                </motion.div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewChange('console')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <Terminal className="w-4 h-4" />
                  Explore Executive Workspace
                </motion.button>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

