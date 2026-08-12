import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, Sparkles, Film, Zap, Disc, LayoutGrid, Check, ArrowRight, 
  Clock, Shield, Eye, Edit3, Plus, Search, Info, Sliders, Play, FileText, CheckCircle2, X
} from 'lucide-react';
import { QuickStartTemplate, ReleaseItem } from '../types/index.js';
import { QUICK_START_TEMPLATES } from '../data/templateData.js';

interface QuickStartTemplatesProps {
  onApplyTemplate: (
    template: QuickStartTemplate, 
    options: { loadAudioPrompt: boolean; loadVideoConcept: boolean; loadReleases: boolean }
  ) => void;
  onNavigateToTab: (tab: 'acoustic' | 'cinema' | 'calendar' | 'dashboard') => void;
}

export function QuickStartTemplates({
  onApplyTemplate,
  onNavigateToTab,
}: QuickStartTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<QuickStartTemplate | null>(null);
  const [loadAudioPrompt, setLoadAudioPrompt] = useState<boolean>(true);
  const [loadVideoConcept, setLoadVideoConcept] = useState<boolean>(true);
  const [loadReleases, setLoadReleases] = useState<boolean>(true);
  const [appliedTemplateTitle, setAppliedTemplateTitle] = useState<string | null>(null);

  // Filter templates
  const categories = ['All', 'Film Pre-Production', 'Social Media Campaign', 'Album & DSP Master', 'Live Tour', 'Brand & E-Commerce'];

  const filteredTemplates = QUICK_START_TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConfirmApply = (template: QuickStartTemplate) => {
    onApplyTemplate(template, {
      loadAudioPrompt,
      loadVideoConcept,
      loadReleases,
    });
    setAppliedTemplateTitle(template.title);
    setPreviewTemplate(null);

    setTimeout(() => {
      setAppliedTemplateTitle(null);
    }, 5000);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-5 h-5 text-red-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-rose-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5 text-emerald-400" />;
      default:
        return <Rocket className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      {/* Toast Notification for Template Applied */}
      <AnimatePresence>
        {appliedTemplateTitle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-zinc-950 border border-emerald-500/80 text-white flex items-center justify-between shadow-2xl shadow-emerald-950/80 font-mono text-xs ring-1 ring-emerald-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-emerald-400 font-bold uppercase block text-[10px]">
                  WORKFLOW PRESET LOADED
                </span>
                <span className="font-bold text-sm">"{appliedTemplateTitle}" initialized!</span>
                <p className="text-[11px] font-sans text-zinc-300">
                  Pre-configured audio prompts, video concepts, and calendar milestones have been populated.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateToTab('acoustic')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold uppercase transition-colors"
              >
                Go to Acoustic Suite
              </button>
              <button
                onClick={() => onNavigateToTab('cinema')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase transition-colors"
              >
                Go to Cinema
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40 border border-red-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/50 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5 text-red-400" />
              <span>TURNKEY WORKFLOW ACCELERATORS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              Quick Start Template Library
            </h2>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Launch pre-configured studio workflows for film pre-production, viral short-form video, executive album masters, or live tours in under 60 seconds.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-black/80 border border-zinc-800 text-center font-mono">
              <span className="text-xl font-bold text-red-400 block">{QUICK_START_TEMPLATES.length}</span>
              <span className="text-[10px] text-zinc-500 uppercase">Pre-Built Suites</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates (e.g. Cinema, TikTok, Radio Master)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-white font-sans text-xs focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-red-500/60 overflow-hidden flex flex-col justify-between shadow-xl transition-all group"
          >
            {/* Template Card Header Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={t.heroImage}
                alt={t.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-red-500/40 text-red-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                  {t.badge}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md text-zinc-300 font-mono text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{t.estimatedSetupTime}</span>
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-black/90 border border-zinc-800">
                  {getCategoryIcon(t.iconName)}
                </div>
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  {t.category}
                </span>
              </div>
            </div>

            {/* Template Card Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-mono text-white group-hover:text-red-400 transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs font-sans text-zinc-400 leading-relaxed line-clamp-3">
                  {t.description}
                </p>

                {/* Features Checklist Preview */}
                <div className="space-y-1.5 pt-2 font-sans text-xs">
                  {t.includedFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-300 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-2 font-mono text-xs font-bold uppercase">
                <button
                  onClick={() => setPreviewTemplate(t)}
                  className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => {
                    setPreviewTemplate(t);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Load Preset</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Detail Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/80 text-left font-sans overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Header Title */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-600/30">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {previewTemplate.badge}
                    </span>
                    <h3 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
                      {previewTemplate.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {previewTemplate.description}
                </p>

                {/* Pre-configured Parameters Breakdown */}
                <div className="space-y-3 p-4 rounded-2xl bg-black border border-zinc-800 font-mono text-xs">
                  <div className="text-zinc-400 text-[10px] font-bold uppercase block border-b border-zinc-900 pb-2">
                    PRE-CONFIGURED PARAMETERS TO LOAD
                  </div>

                  {/* Audio Prompt */}
                  <div className="space-y-1">
                    <span className="text-red-400 font-bold block text-[11px]">🎵 24-BIT ACOUSTIC PROMPT</span>
                    <p className="p-2.5 rounded-xl bg-zinc-900 text-zinc-200 text-xs font-sans border border-zinc-800">
                      "{previewTemplate.presetAudioPrompt}"
                    </p>
                  </div>

                  {/* Motion Cinema Concept */}
                  <div className="space-y-1 pt-1">
                    <span className="text-amber-400 font-bold block text-[11px]">🎬 MOTION CINEMA PRESET</span>
                    <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-sans space-y-1 border border-zinc-800">
                      <div>Product Title: <strong className="text-white">{previewTemplate.presetVideoConcept.productTitle}</strong></div>
                      <div>Atmosphere Title: <strong className="text-white">{previewTemplate.presetVideoConcept.atmosphereTitle}</strong></div>
                      <div className="text-zinc-400 text-[11px]">Script: {previewTemplate.presetVideoConcept.vslScriptSummary}</div>
                    </div>
                  </div>

                  {/* Release Items */}
                  <div className="space-y-1 pt-1">
                    <span className="text-rose-400 font-bold block text-[11px]">📅 RELEASE CALENDAR MILESTONES</span>
                    <div className="space-y-1">
                      {previewTemplate.presetReleases.map((rel, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-zinc-900 text-zinc-200 text-xs flex items-center justify-between border border-zinc-800">
                          <div>
                            <span className="font-bold text-white">{rel.title}</span>
                            <span className="text-zinc-400 text-[10px] block">{rel.artist}</span>
                          </div>
                          <span className="text-[10px] font-mono text-red-400 uppercase">{rel.isrc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Configuration Toggles */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-zinc-400 text-[10px] font-bold uppercase block">
                    CUSTOMIZE LOAD OPTIONS
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 cursor-pointer text-zinc-200">
                      <input
                        type="checkbox"
                        checked={loadAudioPrompt}
                        onChange={(e) => setLoadAudioPrompt(e.target.checked)}
                        className="accent-red-500 rounded"
                      />
                      <span>Load Audio Prompt</span>
                    </label>

                    <label className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 cursor-pointer text-zinc-200">
                      <input
                        type="checkbox"
                        checked={loadVideoConcept}
                        onChange={(e) => setLoadVideoConcept(e.target.checked)}
                        className="accent-red-500 rounded"
                      />
                      <span>Load Cinema Preset</span>
                    </label>

                    <label className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 cursor-pointer text-zinc-200">
                      <input
                        type="checkbox"
                        checked={loadReleases}
                        onChange={(e) => setLoadReleases(e.target.checked)}
                        className="accent-red-500 rounded"
                      />
                      <span>Add Release Items</span>
                    </label>
                  </div>
                </div>

                {/* Confirm Apply Button */}
                <button
                  onClick={() => handleConfirmApply(previewTemplate)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl shadow-red-600/40"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Confirm & Apply Pre-Configured Workflow</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
