import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, Flame, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUCCESS_STORIES, SuccessStory } from '../data/redVisionData.js';
import { AppView } from '../types/index.js';

interface SuccessStoriesProps {
  onViewChange: (view: AppView) => void;
}

export function SuccessStories({ onViewChange }: SuccessStoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Audio Architecture', 'Visual & Video Studio', 'Live & Routing', 'Publishing & IP', 'Full Multi-Department HQ'];

  const filteredStories = selectedCategory === 'All'
    ? SUCCESS_STORIES
    : SUCCESS_STORIES.filter(s => s.suiteCategory === selectedCategory);

  return (
    <section id="success-stories" className="py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-red-500" />
            CLIENT ROI & TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Success Stories Across the Studio Suites
          </h2>
          <p className="text-zinc-300 font-sans text-base leading-relaxed">
            Discover how producers, directors, tour managers, best-selling authors, and independent labels leverage Jason Salvador’s unified studio architecture.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all backdrop-blur-md border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredStories.map((story, idx) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="break-inside-avoid rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 shadow-xl group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600/0 via-red-500 to-rose-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header: Suite Category + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {story.suiteCategory}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {story.verifiedBadge}
                    </span>
                  </div>

                  {/* Impact Metric Hero Highlight */}
                  <div className="mb-4 p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xl font-extrabold font-mono text-white tracking-tight text-gradient bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                        {story.metric}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        {story.metricLabel}
                      </div>
                    </div>
                    <Flame className="w-6 h-6 text-red-500 opacity-80 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-red-500/20 absolute -top-2 -left-2 pointer-events-none" />
                    <p className="text-sm font-sans text-zinc-200 leading-relaxed italic relative z-10 pl-2">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                {/* Footer: Client Profile & Rating */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={story.avatar} 
                      alt={story.clientName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-red-500/40 shadow-md shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-sans text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                        {story.clientName}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400">
                        {story.clientRole} • <span className="text-zinc-300">{story.companyOrLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange('console')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-2xl shadow-red-600/30 transition-all inline-flex items-center gap-2 border border-red-400/30"
          >
            <span>Experience the Studio Suites Yourself</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
