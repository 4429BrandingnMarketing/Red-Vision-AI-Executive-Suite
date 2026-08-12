import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Flame, Radio, Film, Music, Globe, Users, ShieldCheck, Sparkles } from 'lucide-react';

export interface ActivityNotification {
  id: string;
  clientName: string;
  role: string;
  city: string;
  action: string;
  category: 'AUDIO' | 'FILM' | 'STAFF' | 'ROADMAP' | 'WEB' | 'VR';
  timestamp: string;
  avatar: string;
}

const INITIAL_ACTIVITIES: ActivityNotification[] = [
  {
    id: 'act-1',
    clientName: 'Marcus Vance',
    role: 'A&R Executive',
    city: 'Los Angeles, CA',
    action: 'Just launched a new 4K motion cinema trailer project',
    category: 'FILM',
    timestamp: '2s ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'act-2',
    clientName: 'Siren Beats',
    role: 'Platinum Producer',
    city: 'Atlanta, GA',
    action: 'Synthesized 24-bit trap stems & 808 sub masters',
    category: 'AUDIO',
    timestamp: '7s ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'act-3',
    clientName: 'Elena Rostova',
    role: 'Creative Director',
    city: 'London, UK',
    action: 'Deployed custom artist portal at siren.redvisionai.com',
    category: 'WEB',
    timestamp: '14s ago',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'act-4',
    clientName: 'Darius Thorne',
    role: 'Tour Logistics Lead',
    city: 'Tokyo, JP',
    action: 'Calculated 18-city Asia arena tour settlement split',
    category: 'ROADMAP',
    timestamp: '22s ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'act-5',
    clientName: 'Maya Lin',
    role: 'Publishing Author',
    city: 'New York, NY',
    action: 'Exported 100+ voice audiobook & 3D book cover',
    category: 'STAFF',
    timestamp: '31s ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'act-6',
    clientName: 'Kaelen Cross',
    role: 'VR Experience Engineer',
    city: 'Berlin, DE',
    action: 'Entered VR 360° Studio Mode for immersive mixing',
    category: 'VR',
    timestamp: '45s ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }> = {
  AUDIO: { bg: 'bg-red-950/80', text: 'text-red-400', border: 'border-red-500/40', icon: Music },
  FILM: { bg: 'bg-rose-950/80', text: 'text-rose-400', border: 'border-rose-500/40', icon: Film },
  STAFF: { bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-500/40', icon: Users },
  ROADMAP: { bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-500/40', icon: ShieldCheck },
  WEB: { bg: 'bg-cyan-950/80', text: 'text-cyan-400', border: 'border-cyan-500/40', icon: Globe },
  VR: { bg: 'bg-purple-950/80', text: 'text-purple-400', border: 'border-purple-500/40', icon: Radio },
};

export function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showLogDrawer, setShowLogDrawer] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INITIAL_ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentActivity = INITIAL_ACTIVITIES[currentIndex];
  const CategoryIcon = CATEGORY_COLORS[currentActivity.category]?.icon || Activity;
  const categoryStyle = CATEGORY_COLORS[currentActivity.category];

  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-zinc-800/80 rounded-xl p-3 shadow-xl relative overflow-hidden font-sans">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-70" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>LIVE STUDIO ACTIVITY</span>
          </div>
        </div>

        {/* Animated Activity Message */}
        <div 
          className="flex-1 w-full overflow-hidden cursor-pointer py-0.5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setShowLogDrawer(!showLogDrawer)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActivity.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 justify-center sm:justify-start"
            >
              <img
                src={currentActivity.avatar}
                alt={currentActivity.clientName}
                className="w-7 h-7 rounded-full object-cover border border-red-500/40 shadow-sm shrink-0"
              />

              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-white font-mono">{currentActivity.clientName}</span>
                <span className="text-zinc-500 text-[11px] font-mono">({currentActivity.city})</span>
                <span className="text-zinc-300 font-sans">{currentActivity.action}</span>
              </div>

              <div className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded-md ${categoryStyle.bg} ${categoryStyle.border} ${categoryStyle.text} font-mono text-[9px] font-bold uppercase border shrink-0`}>
                <CategoryIcon className="w-3 h-3" />
                <span>{currentActivity.category}</span>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-auto">
                {currentActivity.timestamp}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Drawer Toggle Button */}
        <button
          onClick={() => setShowLogDrawer(!showLogDrawer)}
          className="text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors shrink-0 flex items-center gap-1"
        >
          <Activity className="w-3 h-3 text-red-500" />
          <span>{showLogDrawer ? 'Hide Feed' : 'All Activity'}</span>
        </button>
      </div>

      {/* Expanded Activity History Drawer */}
      <AnimatePresence>
        {showLogDrawer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 pt-3 border-t border-zinc-800 space-y-2 overflow-hidden"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              <span>RECENT GLOBAL CLIENT DISPATCHES</span>
              <span className="text-red-400 font-bold">REAL-TIME TELEMETRY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {INITIAL_ACTIVITIES.map((act) => {
                const Icon = CATEGORY_COLORS[act.category]?.icon || Activity;
                const style = CATEGORY_COLORS[act.category];
                return (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-3 text-left hover:border-zinc-700 transition-colors"
                  >
                    <img
                      src={act.avatar}
                      alt={act.clientName}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold text-white truncate">{act.clientName}</span>
                        <span className="text-[9px] font-mono text-zinc-500 shrink-0">{act.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-sans truncate">{act.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-zinc-500">{act.city}</span>
                        <span className={`px-1.5 py-0.2 rounded ${style.bg} ${style.text} font-mono text-[8px] font-bold uppercase`}>
                          {act.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
