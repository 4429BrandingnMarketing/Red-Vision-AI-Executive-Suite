import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Check, Copy, Download, Globe, LayoutTemplate, Loader2, ShoppingBag, Sparkles, Target } from 'lucide-react';

type AssetKind = 'Website' | 'Landing page' | 'Sales page' | 'Sales funnel';

const assetKinds: Array<{ name: AssetKind; description: string; icon: typeof Globe }> = [
  { name: 'Website', description: 'Clear homepage structure and page copy', icon: Globe },
  { name: 'Landing page', description: 'One focused offer and call to action', icon: LayoutTemplate },
  { name: 'Sales page', description: 'Persuasive copy with proof and objections', icon: ShoppingBag },
  { name: 'Sales funnel', description: 'A step-by-step path from discovery to follow-up', icon: Target },
];

export function AgencyGrowthBuilder() {
  const [kind, setKind] = useState<AssetKind>('Website');
  const [brand, setBrand] = useState('Red Vision Creative Studio');
  const [offer, setOffer] = useState('AI-powered creative services for independent brands and creators');
  const [audience, setAudience] = useState('Artists, founders, and growing small businesses');
  const [goal, setGoal] = useState('Book a discovery call');
  const [result, setResult] = useState('Your finished plan will appear here. Start with a brand, offer, audience, and goal.');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const create = async () => {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'auto', prompt: `Act as a senior brand strategist, conversion copywriter, and practical web producer. Create a ${kind.toLowerCase()} for ${brand}. Offer: ${offer}. Audience: ${audience}. Primary conversion goal: ${goal}. Return a polished, implementation-ready plan with clear section headings, complete sample copy, calls to action, suggested imagery and layout notes, mobile considerations, and a short checklist. For a funnel include each step, the visitor's intent, message, next action, and follow-up. Do not invent testimonials, results, credentials, prices, guarantees, or customer counts; use clearly marked placeholders when information is missing. Keep the language confident, specific, accessible, and easy to scan.` }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.text !== 'string' || !data.text.trim()) throw new Error(data.error || 'The draft could not be created.');
      setResult(data.text.trim());
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : 'The draft could not be created.');
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(result); setMessage('Draft copied.'); }
    catch { setMessage('Copy is unavailable in this browser. Select the draft text to copy it.'); }
  };

  const download = () => {
    const file = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${kind.toLowerCase().replaceAll(' ', '-')}-draft.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-7 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-rose-300/15 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,.22),transparent_48%),linear-gradient(135deg,#151116,#090b10_60%,#111820)] p-6 shadow-2xl sm:p-9">
        <div className="absolute right-8 top-8 hidden h-28 w-28 items-center justify-center rounded-full border border-rose-300/15 bg-rose-400/[.04] sm:flex"><Globe className="h-12 w-12 text-rose-200/80" /></div>
        <p className="text-xs font-bold uppercase tracking-[.22em] text-rose-200">Agency growth studio</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Turn your offer into a clear customer journey.</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-300">Create a website outline, landing page, sales page, or full funnel plan. Review the copy, then copy it or download it to share with your web designer.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5 sm:p-7">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-200"><Sparkles className="h-5 w-5" /></span><div><h3 className="text-lg font-semibold text-white">What are we creating?</h3><p className="text-sm text-zinc-400">Choose a starting point.</p></div></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">{assetKinds.map((item) => { const Icon = item.icon; return <button key={item.name} type="button" onClick={() => setKind(item.name)} className={`rounded-2xl border p-4 text-left transition ${kind === item.name ? 'border-rose-300/40 bg-rose-400/[.09]' : 'border-white/10 bg-black/20 hover:bg-white/[.04]'}`}><Icon className={`h-5 w-5 ${kind === item.name ? 'text-rose-200' : 'text-zinc-400'}`} /><span className="mt-3 block font-semibold text-white">{item.name}</span><span className="mt-1 block text-xs leading-5 text-zinc-400">{item.description}</span></button>; })}</div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-zinc-200">Brand or business<input value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none focus:border-rose-300/50" /></label>
            <label className="block text-sm font-medium text-zinc-200">What are you offering?<textarea value={offer} onChange={(event) => setOffer(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base leading-6 text-white outline-none focus:border-rose-300/50" /></label>
            <label className="block text-sm font-medium text-zinc-200">Who is it for?<input value={audience} onChange={(event) => setAudience(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none focus:border-rose-300/50" /></label>
            <label className="block text-sm font-medium text-zinc-200">What should visitors do next?<input value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none focus:border-rose-300/50" /></label>
          </div>
          <button type="button" disabled={busy || !brand.trim() || !offer.trim() || !audience.trim()} onClick={() => void create()} className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 text-base font-bold text-white shadow-lg shadow-rose-900/30 transition hover:brightness-110 disabled:opacity-50">{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}{busy ? 'Building your draft…' : `Create my ${kind.toLowerCase()}`}</button>
          <p className="mt-3 text-xs leading-5 text-zinc-500">This creates planning and copy drafts. Publishing, domain setup, payments, email delivery, and analytics need their own connected services.</p>
        </section>

        <section className="flex min-h-[580px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080a0e]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">Your working draft</p><h3 className="mt-1 text-lg font-semibold text-white">{kind} · {brand || 'New brand'}</h3></div><div className="flex gap-2"><button type="button" onClick={() => void copy()} className="flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-zinc-200 hover:bg-white/[.06]"><Copy className="h-4 w-4" />Copy</button><button type="button" onClick={download} className="flex min-h-10 items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-300/[.06] px-3 text-sm font-semibold text-rose-100 hover:bg-rose-300/10"><Download className="h-4 w-4" />Download</button></div></div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-7"><div className="mb-4 flex items-center gap-2 text-sm text-zinc-400"><ArrowDown className="h-4 w-4 text-rose-200" />Review and refine before publishing</div><pre className="whitespace-pre-wrap font-sans text-base leading-7 text-zinc-200">{result}</pre>{message && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-rose-200"><Check className="h-4 w-4" />{message}</p>}</div>
          <div className="border-t border-white/10 bg-white/[.02] px-5 py-4 text-sm text-zinc-400 sm:px-7">Next step: refine the draft with Hermes, then hand it to your designer or publishing platform. <ArrowRight className="ml-1 inline h-4 w-4" /></div>
        </section>
      </div>
    </div>
  );
}
