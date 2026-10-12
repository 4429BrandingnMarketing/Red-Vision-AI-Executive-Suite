import React, { useState } from 'react';
import { Building2, Code2, ExternalLink, Film, Music2, Shirt, Users } from 'lucide-react';
import officeImage from '../assets/red-vision-office-hq.png';

const HERMES_OFFICE_URL = 'http://127.0.0.1:3000/office';

const rooms = [
  { name: 'TV + AI Video Studio', detail: 'Editing, video generation, broadcast control and virtual production', icon: Film },
  { name: 'Music + Audio Lab', detail: 'Recording, mixing, mastering, vocal removal and stem splitting', icon: Music2 },
  { name: 'AI Development Lab', detail: 'Google AI Studio, GitHub, Hugging Face and model workflows', icon: Code2 },
  { name: 'Fashion Studio', detail: 'Red Vision Apparel, GiFTD N’ PrVLGD and print-on-demand production', icon: Shirt },
];

export function RedVisionOffice() {
  const [liveOffice, setLiveOffice] = useState(false);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-red-500/30 bg-zinc-950 shadow-2xl">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.22em] text-amber-400">
              <Building2 className="h-4 w-4" /> Red Vision Headquarters
            </div>
            <h2 className="mt-2 text-3xl font-black text-white">Production Office</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">The visual headquarters and optional live Hermes3D office share one workspace.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setLiveOffice((value) => !value)} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-500">
              {liveOffice ? 'Show Office Map' : 'Enter Live Office'}
            </button>
            <button onClick={() => window.open(HERMES_OFFICE_URL, '_blank', 'noopener,noreferrer')} className="rounded-xl border border-zinc-700 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-900">
              <ExternalLink className="mr-2 inline h-4 w-4" />Full screen
            </button>
          </div>
        </div>
        {liveOffice ? (
          <iframe title="Hermes3D Red Vision Office" src={HERMES_OFFICE_URL} className="h-[720px] w-full border-t border-zinc-800 bg-black" allow="microphone" />
        ) : (
          <img src={officeImage} alt="Top-down Red Vision production headquarters" className="aspect-square w-full object-cover" />
        )}
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {rooms.map(({ name, detail, icon: Icon }) => (
          <article key={name} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <Icon className="h-6 w-6 text-red-400" />
            <h3 className="mt-4 font-bold text-white">{name}</h3>
            <p className="mt-2 text-xs leading-5 text-zinc-500">{detail}</p>
          </article>
        ))}
      </section>
      <div className="flex items-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200">
        <Users className="h-4 w-4" /> Live agent presence is shown only after the Hermes3D gateway responds.
      </div>
    </div>
  );
}
