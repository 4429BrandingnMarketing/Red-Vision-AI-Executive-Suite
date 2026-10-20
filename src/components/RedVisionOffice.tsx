import React, { useState } from 'react';
import { Building2, BookOpen, Radio, Music2, Film, Shirt, Cpu, Users, MessageSquare, X, ClipboardList, ShoppingBag, Megaphone } from 'lucide-react';
import officeImage from '../assets/red-vision-office-hq.png';
import { CollaborativeStaffChat, VIRTUAL_STAFF_AGENTS } from './CollaborativeStaffChat.js';

type ChatTarget = { title: string; agentId?: string; conferenceMode?: boolean };
const staff = [
  { id: 'agent-engineering', name: 'Marcus Bell', role: 'Chief Audio Engineer', room: 'Red Music' },
  { id: 'agent-merch', name: 'Maya Lin', role: 'Apparel & Merch Lead', room: 'Clothing Boutique + E-commerce' },
  { id: 'agent-marketing', name: 'Victor Vance', role: 'Marketing & Partnerships Lead', room: 'Marketing + Radio' },
  { id: 'agent-creative', name: 'Elena Rostova', role: 'Creative Director', room: 'Film & TV' },
  { id: 'agent-ops', name: 'Aria Cross', role: 'Executive Operations Assistant', room: 'Red Vision AI Campus' },
  { id: 'agent-legal', name: 'Solomon Sterling, Esq.', role: 'Entertainment Legal & Licensing', room: 'Conference Room' },
];
const rooms = [
  { name: 'The Room · Bookstore', sub: 'Publishing, books & product discovery', icon: BookOpen, color: 'text-amber-300', staffIds: [], open: ['Publishing Lead', 'Book & Product Specialist'], tools: 'Manuscripts · Book catalog · Amazon product research', agentId: 'agent-ops' },
  { name: 'Clothing · Luxury Boutique', sub: 'Premium retail, collections & e-commerce', icon: Shirt, color: 'text-rose-300', staffIds: ['agent-merch'], open: ['Affiliate Manager', 'E-commerce Product Manager'], tools: 'Collections · Store merchandising · Amazon product placements', agentId: 'agent-merch' },
  { name: 'Red Music · Recording Studio', sub: 'Artist development, recording & releases', icon: Music2, color: 'text-red-300', staffIds: ['agent-engineering'], open: ['Music Producer / A&R'], tools: 'Studio board · Release pipeline · Mix notes', agentId: 'agent-engineering' },
  { name: 'Marketing · Campaign Room', sub: 'Growth, launch campaigns & product strategy', icon: Megaphone, color: 'text-orange-300', staffIds: ['agent-marketing'], open: ['Campaign Manager', 'Product Manager'], tools: 'Campaign whiteboard · Owners · Due dates · KPIs', agentId: 'agent-marketing' },
  { name: 'Red Radio · Broadcast Station', sub: 'Programming, scheduling & on-air production', icon: Radio, color: 'text-cyan-300', staffIds: ['agent-marketing'], open: ['Radio Producer'], tools: 'Broadcast schedule · Show rundown · On-air checklist', agentId: 'agent-marketing' },
  { name: 'Film & TV · Production Set', sub: 'Scripts, cameras, production & edit bays', icon: Film, color: 'text-violet-300', staffIds: ['agent-creative'], open: ['Production Coordinator'], tools: 'Scripts · Shot lists · Production board', agentId: 'agent-creative' },
  { name: 'Red Vision AI · Innovation Campus', sub: 'Ideas, systems, automation & company priorities', icon: Cpu, color: 'text-sky-300', staffIds: ['agent-ops', 'agent-legal'], open: ['AI Product / Workflow Manager'], tools: 'Idea wall · Due dates · Missions · Approvals', agentId: 'agent-ops' },
];

export function RedVisionOffice() {
  const [activeChat, setActiveChat] = useState<ChatTarget | null>(null);
  const [showImage, setShowImage] = useState(true);
  const openStaff = (agentId: string, title?: string) => setActiveChat({ title: title || VIRTUAL_STAFF_AGENTS.find(a => a.id === agentId)?.name || 'Staff chat', agentId });
  const openConference = () => setActiveChat({ title: 'Red Vision Conference Room', conferenceMode: true });

  return <div className="space-y-6 text-zinc-100">
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 shadow-2xl">
      <div className="flex flex-col gap-4 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.16),transparent_48%)] p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div><div className="mb-3 flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-red-300"><Building2 className="h-4 w-4" /> Red Vision Headquarters <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] text-emerald-300">WORKSPACE</span></div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A room for every division.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">A practical creative headquarters with frosted-glass depth, subtle motion, division-specific rooms, direct staff chats, and a shared conference room.</p></div>
        <div className="flex flex-wrap gap-2"><button onClick={openConference} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-500"><Users className="h-4 w-4" /> Enter conference room</button><button onClick={() => setShowImage(v => !v)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 backdrop-blur-xl hover:bg-white/10">{showImage ? 'Hide office image' : 'Show office image'}</button></div>
      </div>
      {showImage && <div className="relative border-t border-white/10"><img src={officeImage} alt="Original Red Vision headquarters office concept" className="max-h-[500px] w-full object-cover object-center" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-16"><p className="text-xs font-mono uppercase tracking-[0.2em] text-red-200">Original office concept</p><p className="mt-1 text-lg font-semibold">The visual anchor for the interactive headquarters</p></div></div>}
    </section>

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {rooms.map(({ name, sub, icon: Icon, color, staffIds, open, tools: roomTools, agentId }) => <article key={name} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.065] to-white/[0.015] p-5 shadow-lg shadow-black/20 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl">
        <div className="flex items-start justify-between gap-3"><div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/25 ${color}`}><Icon className="h-5 w-5" /></div><span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-zinc-500">{staffIds.length} assigned · {open.length} open</span></div>
        <h3 className="mt-4 text-lg font-semibold text-white">{name}</h3><p className="mt-1 text-sm text-zinc-400">{sub}</p><p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-zinc-500">{roomTools}</p>
        <div className="mt-4 space-y-2">{staff.filter(person => staffIds.includes(person.id)).map(person => <button key={person.id} onClick={() => openStaff(person.id, person.name)} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-3 text-left transition hover:border-red-400/40 hover:bg-white/[0.06]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-950 text-xs font-bold">{person.name.split(' ').map(part => part[0]).slice(0,2).join('')}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{person.name}</span><span className="block truncate text-xs text-zinc-500">{person.role}</span></span><MessageSquare className="h-4 w-4 text-zinc-500 group-hover:text-red-300" /></button>)}
          {open.map(role => <div key={role} className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-black/10 px-3 py-2.5 text-xs text-zinc-400"><span className="h-2 w-2 rounded-full bg-amber-300/80" /><span className="flex-1">{role}</span><span className="text-[9px] font-mono uppercase tracking-wider text-amber-300/80">Open seat</span></div>)}</div>
        <button onClick={() => openStaff(agentId, name)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-200"><MessageSquare className="h-4 w-4" /> Open room chat ↗</button>
      </article>)}
    </section>

    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-2xl"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-red-300"><Users className="h-5 w-5" /></div><div><h3 className="font-semibold">Team on the floor</h3><p className="text-xs text-zinc-500">Click any person to open a private chat.</p></div></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">{staff.map(person => <button key={person.id} onClick={() => openStaff(person.id, person.name)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-left transition hover:border-red-400/40 hover:bg-white/[0.05]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500/70 to-zinc-900 text-xs font-bold">{person.name.split(' ').map(part => part[0]).slice(0,2).join('')}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{person.name}</span><span className="block truncate text-xs text-zinc-500">{person.role}</span><span className="mt-1 block truncate text-[10px] uppercase tracking-wider text-zinc-600">{person.room}</span></span><MessageSquare className="h-4 w-4 text-zinc-500" /></button>)}</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-2xl"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-300"><ClipboardList className="h-5 w-5" /></div><div><h3 className="font-semibold">Whiteboards that move work forward</h3><p className="text-xs text-zinc-500">Useful, visible, and accountable.</p></div></div>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300"><li className="flex gap-2"><ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />Ideas and decisions captured in one place.</li><li className="flex gap-2"><ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />Every task gets an owner, a due date, and a visible status.</li><li className="flex gap-2"><ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />Product and affiliate roles support divisions where products make sense.</li><li className="flex gap-2"><Users className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />The conference room brings departments into one shared discussion.</li></ul>
        <button onClick={openConference} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"><Users className="h-4 w-4" /> Start a team discussion</button>
      </div>
    </section>

    {activeChat && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label={activeChat.title}><div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 shadow-2xl"><div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.035] px-4 py-3 sm:px-6"><div className="min-w-0"><p className="truncate text-sm font-semibold">{activeChat.title}</p><p className="mt-0.5 text-xs text-zinc-500">{activeChat.conferenceMode ? 'Shared room · all available AI staff can contribute' : 'Private staff conversation'}</p></div><button onClick={() => setActiveChat(null)} aria-label="Close chat" className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 hover:bg-white/10"><X className="h-4 w-4" /></button></div><div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5"><CollaborativeStaffChat key={activeChat.agentId || 'conference'} initialAgentId={activeChat.agentId} conferenceMode={activeChat.conferenceMode} /></div></div></div>}
  </div>;
}
