import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar 
} from 'recharts';
import { 
  TrendingUp, ShieldCheck, Film, Music, Globe, Users, Flame, 
  Award, RefreshCw, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectMilestoneGantt } from './ProjectMilestoneGantt.js';

// Data 1: 4K Cinema & Claymation Rendering Status
const renderingData = [
  { scene: 'Scene 1: Studio Console', progress: 100, fps: 24, gpuLoad: 42 },
  { scene: 'Scene 2: Tour Bus Interior', progress: 88, fps: 24, gpuLoad: 78 },
  { scene: 'Scene 3: Concert Arena', progress: 72, fps: 24, gpuLoad: 85 },
  { scene: 'Scene 4: Claymation Cut', progress: 95, fps: 24, gpuLoad: 60 },
  { scene: 'Scene 5: Audio Master Sync', progress: 100, fps: 24, gpuLoad: 30 },
];

// Data 2: Legal Document Sign-off Progress
const legalSignoffData = [
  { name: 'Master Rights Licensing', value: 100, color: '#10b981' },
  { name: 'Publishing Split Agreements', value: 88, color: '#06b6d4' },
  { name: 'Venue Door-Split Contracts', value: 92, color: '#f59e0b' },
  { name: 'Mechanical Royalty Clearance', value: 100, color: '#ef4444' },
  { name: 'ISRC Global Registration', value: 100, color: '#8b5cf6' },
];

// Data 3: Marketing Campaign Reach Growth (300M+ Contact Target)
const marketingReachData = [
  { week: 'Week 1', spotify: 12, radio: 18, youtube: 25, b2b: 40, total: 95 },
  { week: 'Week 2', spotify: 22, radio: 32, youtube: 48, b2b: 65, total: 167 },
  { week: 'Week 3', spotify: 35, radio: 50, youtube: 70, b2b: 90, total: 245 },
  { week: 'Week 4', spotify: 45, radio: 68, youtube: 92, b2b: 115, total: 320 },
];

export function AtAGlanceMetrics() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rendering' | 'legal' | 'marketing'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="rounded-3xl bg-zinc-950/95 border border-red-500/30 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
              <span>Executive At-a-Glance Metrics Panel</span>
              <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-800 text-red-400 font-mono text-[10px] uppercase">
                Recharts Real-Time Analytics
              </span>
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Live status tracking for 4K video rendering, legal sign-offs, & 300M+ marketing reach
            </p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-red-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Live Metrics</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Total Campaign Reach</span>
            <Globe className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            320M+
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+106% vs Target Goal</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Legal Sign-off Status</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            96% Clear
          </div>
          <div className="text-[10px] font-mono text-amber-300 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>4 of 5 Contracts Locked</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">4K Video Rendering</span>
            <Film className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            91% Overall
          </div>
          <div className="text-[10px] font-mono text-cyan-400 mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Claymation Frame 120/120</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Audio Master Spec</span>
            <Music className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            24-Bit / 96k
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>ISRC & Radio Certified</span>
          </div>
        </div>

      </div>

      {/* Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Chart 1: Marketing Audience Reach Growth (AreaChart) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-black/80 border border-white/10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-white font-sans flex items-center gap-2">
                <span>Marketing Campaign Reach Growth (300M+ Contact Target)</span>
              </h4>
              <p className="text-[11px] font-mono text-zinc-400">
                Audience impressions across Spotify, Radio, YouTube, & B2B Curator Contacts (Millions)
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-mono text-[10px] font-bold">
              320M TOTAL
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketingReachData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorB2B" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="week" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '12px', fontSize: '12px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Total Campaign Reach (M)" />
                <Area type="monotone" dataKey="b2b" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorB2B)" name="B2B Curator Network (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Legal Document Sign-off Progress (Pie / Bar Chart) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/80 border border-white/10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-white font-sans flex items-center gap-2">
                <span>Legal Sign-off Progress</span>
              </h4>
              <p className="text-[11px] font-mono text-zinc-400">
                Contract clearance & ISRC compliance %
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
              96% CLEAR
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={legalSignoffData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} width={130} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '12px', fontSize: '12px', color: '#fff' }} 
                  formatter={(value) => [`${value}% Approved`, 'Progress']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {legalSignoffData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: 4K Cinema Scene Rendering Status (BarChart) */}
        <div className="lg:col-span-12 p-5 rounded-2xl bg-black/80 border border-white/10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-white font-sans flex items-center gap-2">
                <span>4K Cinema Scene Rendering Status & GPU Load</span>
              </h4>
              <p className="text-[11px] font-mono text-zinc-400">
                Real-time completion percentage vs GPU synthesis compute load across 5 scene modules
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono text-[10px] font-bold">
              24 FPS CLAYMATION
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={renderingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="scene" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '12px', fontSize: '12px', color: '#fff' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="progress" name="Render Progress (%)" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="gpuLoad" name="GPU Compute Load (%)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Gantt-Style Project Milestone Timeline */}
      <ProjectMilestoneGantt />

    </div>
  );
}
