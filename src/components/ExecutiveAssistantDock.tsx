import React, { useState } from 'react';
import { Bot, ChevronDown, X } from 'lucide-react';
import { CollaborativeStaffChat } from './CollaborativeStaffChat.js';

export function ExecutiveAssistantDock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <aside aria-label="Hermes executive assistant" className="fixed bottom-20 right-4 z-[90] flex w-[min(42rem,calc(100vw-2rem))] flex-col rounded-3xl border border-red-400/25 bg-[#08090c]/95 p-2 shadow-[0_24px_90px_rgba(0,0,0,.75)] backdrop-blur-2xl sm:bottom-24 sm:right-6 sm:p-3">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white"><Bot className="h-4 w-4 text-red-300" /> Hermes · Executive Assistant</div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Hermes assistant" className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
          <div className="[&>div]:h-[min(650px,calc(100dvh-10rem))] [&>div]:p-4 sm:[&>div]:p-5">
            <CollaborativeStaffChat />
          </div>
        </aside>
      ) : null}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="fixed bottom-5 left-4 z-[90] flex min-h-12 items-center gap-2 rounded-full border border-red-300/40 bg-gradient-to-r from-red-600 to-rose-600 px-5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(220,38,38,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_38px_rgba(220,38,38,.5)] sm:bottom-6 sm:left-6 sm:min-h-14 sm:px-6 sm:text-base">
        <Bot className="h-5 w-5" /> {open ? 'Hide Hermes' : 'Ask Hermes'} {open ? <ChevronDown className="h-4 w-4" /> : null}
      </button>
    </>
  );
}
