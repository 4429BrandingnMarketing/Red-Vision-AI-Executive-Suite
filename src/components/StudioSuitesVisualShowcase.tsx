import React, { useState, useRef } from 'react';
import { 
  Disc, Clapperboard, Globe, BookOpen, Building2, Sparkles, Check, 
  ArrowRight, Users, Play, Shield, Flame, Layers, Info, Zap, TrendingUp, Award, Rotate3D, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_SUITE_VISUALS, StudioVisualSuite } from '../data/redVisionData.js';
import { AppView } from '../types/index.js';
import { Studio3DViewport } from './Studio3DViewport.js';

interface StudioSuitesVisualShowcaseProps {
  onViewChange: (view: AppView) => void;
  onOpenVSL: () => void;
}

const SUITE_ICONS: Record<string, React.ElementType> = {
  'recording-studio': Disc,
  'film-editing-studio': Clapperboard,
  'tour-manager-app': Globe,
  'book-publishing-app': BookOpen,
  'virtual-3d-office': Building2
};

interface ParallaxSuiteCardProps {
  key?: string | number;
  suite: StudioVisualSuite;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ParallaxSuiteCard({
  suite,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}: ParallaxSuiteCardProps) {
  const Icon = SUITE_ICONS[suite.id] || Building2;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 9; // degrees max 3D tilt
    const rX = -(y / (rect.height / 2)) * maxTilt;
    const rY = (x / (rect.width / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);

    // Parallax depth translation offset
    setParallaxX((x / (rect.width / 2)) * 6);
    setParallaxY((y / (rect.height / 2)) * 6);
  };

  const handleMouseLeaveCard = () => {
    setRotateX(0);
    setRotateY(0);
    setParallaxX(0);
    setParallaxY(0);
    onMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveCard}
      className="relative perspective-1000"
    >
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.04 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 22,
          mass: 0.5
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`w-full h-full p-4 rounded-2xl border text-left transition-colors backdrop-blur-md flex flex-col justify-between relative overflow-hidden ${
          isActive
            ? 'bg-gradient-to-b from-red-950/70 via-black/90 to-black border-red-500/90 text-white shadow-2xl shadow-red-600/30 ring-1 ring-red-500/40'
            : isHovered
            ? 'bg-gradient-to-b from-zinc-900/90 to-black/90 border-red-500/60 text-white shadow-2xl shadow-red-950/50'
            : 'bg-white/5 border-white/10 text-zinc-400'
        }`}
      >
        {/* Subtle dynamic ambient lighting highlight */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/15 to-transparent pointer-events-none"
          />
        )}

        <div
          style={{
            transform: `translate3d(${parallaxX}px, ${parallaxY}px, 15px)`,
            transformStyle: 'preserve-3d'
          }}
          className="transition-transform duration-100 ease-out"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-300 ${
              isActive
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/60 scale-105'
                : isHovered
                ? 'bg-red-900/80 text-red-200 border border-red-500/50 shadow-md'
                : 'bg-white/5 text-zinc-400 border border-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">
            {suite.category}
          </div>
          <div className="font-sans text-xs font-bold leading-snug line-clamp-2">
            {suite.title}
          </div>
        </div>

        {isActive && (
          <motion.div
            layoutId="activeTabGlow"
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-600"
          />
        )}
      </motion.button>

      {/* Interactive Floating Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 bottom-full left-0 right-0 mb-3 p-4 rounded-2xl bg-zinc-950/95 border border-red-500/60 text-white shadow-2xl backdrop-blur-xl pointer-events-none min-w-[240px]"
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2 pb-1.5 border-b border-white/10">
              <Zap className="w-3.5 h-3.5 text-red-500" />
              <span>QUICK SERVICE INSIGHT</span>
            </div>
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex items-start gap-1.5 text-zinc-200 font-medium">
                <span className="text-red-400 font-bold shrink-0">Specs:</span>
                <span className="text-[11px] text-zinc-300">{suite.tooltipInsights.specs}</span>
              </div>
              <div className="flex items-start gap-1.5 text-zinc-200 font-medium">
                <span className="text-emerald-400 font-bold shrink-0">Speed:</span>
                <span className="text-[11px] text-zinc-300">{suite.tooltipInsights.efficiency}</span>
              </div>
              <div className="flex items-start gap-1.5 text-zinc-200 font-medium">
                <span className="text-amber-400 font-bold shrink-0">ROI:</span>
                <span className="text-[11px] text-zinc-300">{suite.tooltipInsights.roiHighlight}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StudioSuitesVisualShowcase({ onViewChange, onOpenVSL }: StudioSuitesVisualShowcaseProps) {
  const [activeSuiteId, setActiveSuiteId] = useState<string>('recording-studio');
  const [hoveredSuiteId, setHoveredSuiteId] = useState<string | null>(null);
  const [activeFeatureHover, setActiveFeatureHover] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'clay'>('3d');

  const activeSuite: StudioVisualSuite = 
    STUDIO_SUITE_VISUALS.find(s => s.id === activeSuiteId) || STUDIO_SUITE_VISUALS[0];

  const IconComp = SUITE_ICONS[activeSuite.id] || Building2;

  return (
    <section id="visual-studios" className="py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

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
            3D CLAYMATION VISUAL SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Visualizing the Complete Red Vision Ecosystem
          </h2>
          <p className="text-zinc-300 font-sans text-base leading-relaxed">
            Visual is everything. Explore the dedicated 3D claymation environments for our audio studio, film suite, tour manager, book publishing app, and virtual office staff HQ. Hover over cards for 3D parallax insights.
          </p>
        </motion.div>

        {/* Studio Selector Tabs with Parallax Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8 relative">
          {STUDIO_SUITE_VISUALS.map((suite) => (
            <ParallaxSuiteCard
              key={suite.id}
              suite={suite}
              isActive={suite.id === activeSuiteId}
              isHovered={suite.id === hoveredSuiteId}
              onClick={() => setActiveSuiteId(suite.id)}
              onMouseEnter={() => setHoveredSuiteId(suite.id)}
              onMouseLeave={() => setHoveredSuiteId(null)}
            />
          ))}
        </div>

        {/* Featured Visual Display Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSuite.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
                  DISPLAY MODE:
                </span>
                <span className="text-xs text-zinc-400 font-sans">
                  Inspect studio assets in real-time 3D or high-res claymation
                </span>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-black/80 border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    viewMode === '3d'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Rotate3D className="w-3.5 h-3.5 text-white" />
                  <span>Interactive 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('clay')}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    viewMode === 'clay'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                  <span>Clay Render</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive 3D Three.js Viewport or Claymation Image */}
              <div className="lg:col-span-7 relative">
                {viewMode === '3d' ? (
                  <Studio3DViewport 
                    activeSuiteId={activeSuite.id} 
                    suiteTitle={activeSuite.title} 
                  />
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video rounded-2xl overflow-hidden border-2 border-red-500/40 bg-black shadow-2xl shadow-red-950/80 group"
                  >
                    <img
                      src={activeSuite.image}
                      alt={activeSuite.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md shadow-lg z-10">
                      <IconComp className="w-4 h-4 text-red-500 animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {activeSuite.category}
                      </span>
                    </div>

                    {/* Top Right Tooltip Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md z-10">
                      <Info className="w-3 h-3 text-red-400" />
                      <span>Hover tags for specs</span>
                    </div>

                    {/* Bottom Captions Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md z-10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                            {activeSuite.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                          PRO STUDIO ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {activeSuite.description}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Tags below frame with Interactive Hover Tooltips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {activeSuite.tags.map((tag, idx) => (
                    <div key={idx} className="relative group/tag">
                      <span 
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] font-bold text-zinc-300 backdrop-blur-md hover:bg-red-950/80 hover:border-red-500/60 hover:text-red-300 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>#{tag}</span>
                      </span>

                      {/* Floating tooltip on tag hover */}
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tag:block w-48 p-2.5 rounded-xl bg-black/95 border border-red-500/60 text-[11px] font-mono text-zinc-200 shadow-2xl backdrop-blur-xl z-20 pointer-events-none">
                        <div className="text-red-400 font-bold uppercase mb-0.5">#{tag}</div>
                        <div className="text-[10px] text-zinc-400">Integrated into Red Vision unified pipeline.</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Suite Specifications & Staff Integration */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                    <Layers className="w-3.5 h-3.5 text-red-500" />
                    EXECUTIVE VIRTUAL ENVIRONMENT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                    {activeSuite.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed mt-2">
                    {activeSuite.description}
                  </p>
                </div>

                {/* Pro Insights Tooltip Highlight Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-black to-zinc-950 border border-red-500/30 space-y-2 relative overflow-hidden hover:border-red-500/60 shadow-lg hover:shadow-red-950/30 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span>EXECUTIVE SPECIFICATIONS & ROI:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[10px] text-zinc-400 block">PROCESSING:</span>
                      <span className="text-white font-bold text-[11px]">{activeSuite.tooltipInsights.specs}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[10px] text-zinc-400 block">ESTIMATED ROI:</span>
                      <span className="text-emerald-400 font-bold text-[11px]">{activeSuite.tooltipInsights.roiHighlight}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Features Checklist with hover states */}
                <div className="space-y-2.5">
                  <div className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                    BUILT-IN AUTOMATION FEATURES:
                  </div>
                  {activeSuite.features.map((feat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 6, scale: 1.01 }}
                      onMouseEnter={() => setActiveFeatureHover(feat)}
                      onMouseLeave={() => setActiveFeatureHover(null)}
                      className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-default"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-xs text-zinc-200 font-sans font-medium">
                        {feat}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Staff Roster Involved */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:border-red-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                    <Users className="w-4 h-4 text-red-500" />
                    <span>INTEGRATED SPECIALIST STAFF PODS:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSuite.staffInvolved.map((staff, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-red-950/80 border border-red-800/60 text-red-300 font-mono text-[10px] font-bold uppercase hover:bg-red-900 hover:border-red-500 transition-colors cursor-pointer"
                      >
                        {staff}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Action */}
                <div className="pt-2 flex items-center gap-3">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onViewChange('console')}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 border border-red-400/30"
                  >
                    <span>Launch {activeSuite.title.split(' ')[0]} Environment</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}


