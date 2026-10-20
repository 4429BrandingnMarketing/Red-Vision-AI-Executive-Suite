import React, { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Bot, Building2, Code2, Film, Music2, Radio, RefreshCw, Shirt, Tv, Users } from 'lucide-react';
import officeImage from '../assets/red-vision-office-hq.png';
import type { ConsoleTab } from '../types/index.js';

interface OfficeJob {
  id: string;
  title: string;
  department: string;
  assignedAgent: string;
  status: 'queued' | 'running' | 'blocked' | 'completed';
}

const rooms: Array<{ name: string; detail: string; icon: React.ElementType; tab: ConsoleTab; accent: string }> = [
  { name: 'Red Vision TV', detail: 'Production, editing, broadcast concepts, and video workflows.', icon: Tv, tab: 'cinema', accent: 'text-rose-300' },
  { name: 'Red Vision Radio', detail: 'Recording, audio creation, voiceover, and podcast production.', icon: Radio, tab: 'acoustic', accent: 'text-cyan-300' },
  { name: 'Executive Office', detail: 'Give Hermes a mission and follow live agent activity.', icon: Bot, tab: 'staff', accent: 'text-amber-300' },
  { name: 'Command Matrix', detail: 'See agency divisions and the current operations snapshot.', icon: Building2, tab: 'matrix', accent: 'text-violet-300' },
  { name: 'AI Development Lab', detail: 'Review connected providers and technical integrations.', icon: Code2, tab: 'integrations', accent: 'text-blue-300' },
  { name: 'Fashion & Product Studio', detail: 'Plan product concepts and campaign creative.', icon: Shirt, tab: 'agency', accent: 'text-fuchsia-300' },
];

export function RedVisionOffice({ onNavigate }: { onNavigate: (tab: ConsoleTab) => void }) {
  const [jobs, setJobs] = useState<OfficeJob[]>([]);
  const [hermesOnline, setHermesOnline] = useState<boolean | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      const [jobsResponse, statusResponse] = await Promise.all([
        fetch('/api/operations'),
        fetch('/api/hermes/api-status'),
      ]);
      if (jobsResponse.ok) setJobs((await jobsResponse.json()).jobs || []);
      if (statusResponse.ok) setHermesOnline((await statusResponse.json()).state === 'online');
      setLastUpdated(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    } catch {
      setHermesOnline(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 10000);
    return () => window.clearInterval(timer);
  }, []);

  const running = jobs.filter((job) => job.status === 'running').length;
  const needsAttention = jobs.filter((job) => job.status === 'blocked').length;
  const roomsOpen = rooms.length;

  return (
    <div className="space-y-6">
      <section className="bg-glass-card relative overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,.4)]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-red-600/15 blur-[90px]" />
        <div className="relative z-10 flex flex-col gap-5 border-b border-white/[.08] px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-amber-300"><Building2 className="h-4 w-4" /> Red Vision Headquarters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Your agency, in one place.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-300">Choose a department to open its workspace, or send a mission to Hermes from anywhere using the Ask Hermes button.</p>
          </div>
          <button type="button" onClick={() => void refresh()} disabled={refreshing} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh office status
          </button>
        </div>

        <div className="relative grid gap-px bg-white/[.08] sm:grid-cols-2 xl:grid-cols-4">
          <OfficeMetric icon={Bot} label="Hermes executive" value={hermesOnline == null ? 'Checking' : hermesOnline ? 'Connected' : 'Standby'} detail="Mission orchestration" tone={hermesOnline ? 'green' : 'amber'} />
          <OfficeMetric icon={Activity} label="Missions running" value={String(running)} detail={`${jobs.length} total in your workspace`} tone="cyan" />
          <OfficeMetric icon={Users} label="Workspaces" value={String(roomsOpen)} detail="Creative and operations rooms" tone="violet" />
          <OfficeMetric icon={Activity} label="Needs attention" value={String(needsAttention)} detail={needsAttention ? 'Review blocked work' : 'No blocked missions'} tone={needsAttention ? 'amber' : 'green'} />
        </div>

        <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[1.25fr_.75fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#08090c] sm:min-h-[480px]">
            <img src={officeImage} alt="Illustrated overhead view of the Red Vision creative studio headquarters" className="absolute inset-0 h-full w-full object-contain" />
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-lg">HEADQUARTERS FLOOR PLAN</div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/75 p-3 backdrop-blur-lg">
              <span className="text-xs text-zinc-300">Select a department to open its live workspace</span>
              <span className="hidden items-center gap-1.5 text-[11px] text-zinc-500 sm:flex">Updated {lastUpdated || '—'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-1">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-500">Department directory</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Choose a room</h3>
            </div>
            {rooms.map(({ name, detail, icon: Icon, tab, accent }) => (
              <button key={name} type="button" onClick={() => onNavigate(tab)} className="group flex min-h-[76px] items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/[.06]">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 ${accent}`}><Icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">{name}</span>
                  <span className="mt-1 block text-xs leading-5 text-zinc-400">{detail}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <p className="px-2 text-xs text-zinc-500">This headquarters screen works inside Red Vision HQ; it does not depend on a second app running at localhost.</p>
    </div>
  );
}

function OfficeMetric({ icon: Icon, label, value, detail, tone }: { icon: React.ElementType; label: string; value: string; detail: string; tone: 'green' | 'amber' | 'cyan' | 'violet' }) {
  const color = { green: 'text-emerald-200', amber: 'text-amber-200', cyan: 'text-cyan-200', violet: 'text-violet-200' }[tone];
  return <div className="flex items-center gap-3 bg-[#08090d]/95 px-5 py-4 sm:px-6">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.035]"><Icon className={`h-4 w-4 ${color}`} /></span>
    <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-500">{label}</span><span className={`mt-0.5 block text-lg font-semibold ${color}`}>{value}</span><span className="block truncate text-[10px] text-zinc-500">{detail}</span></span>
  </div>;
}
