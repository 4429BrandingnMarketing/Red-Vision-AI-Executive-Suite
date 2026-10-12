import React, { useEffect, useState } from 'react';
import { Brain, CheckCircle2, Database, Plus, RefreshCw, ShieldCheck, Trash2, XCircle } from 'lucide-react';

type MemoryKind = 'identity' | 'preference' | 'company' | 'project' | 'decision' | 'checkpoint';

interface MemoryEntry {
  id: string;
  kind: MemoryKind;
  title: string;
  content: string;
  tags: string[];
  approved: boolean;
  createdAt: string;
}

interface ProviderStatus {
  id: string;
  name: string;
  configured: boolean;
  verified: boolean;
  note: string;
}

export function OsidanMemoryCenter() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [kind, setKind] = useState<MemoryKind>('company');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [approved, setApproved] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    setBusy(true);
    setMessage('');
    try {
      const [memoryResponse, providerResponse] = await Promise.all([fetch('/api/memory'), fetch('/api/providers')]);
      if (!memoryResponse.ok || !providerResponse.ok) throw new Error('Command Center status request failed.');
      const memoryData = await memoryResponse.json();
      const providerData = await providerResponse.json();
      setEntries(memoryData.entries || []);
      setProviders(providerData.providers || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load Osidan.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { void refresh(); }, []);

  const verifyProvider = async (id: string) => {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/providers/${id}/verify`, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Provider verification failed.');
      setMessage(`${id} passed a live API verification.`);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Provider verification failed.');
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, title, content, approved }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Memory could not be saved.');
      setTitle('');
      setContent('');
      setMessage('Memory saved locally to Osidan.');
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Memory could not be saved.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setBusy(true);
    try {
      const response = await fetch(`/api/memory/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Memory could not be deleted.');
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Memory could not be deleted.');
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-red-500/30 bg-zinc-950/90 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-red-600/20 p-3 text-red-400"><Brain className="h-7 w-7" /></div>
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-amber-400">Osidan</p>
                <h2 className="text-2xl font-black text-white">Shared Memory Center</h2>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
              Approved facts are stored locally and supplied to whichever provider handles a request. Provider accounts do not share their private conversation history.
            </p>
          </div>
          <button onClick={() => void refresh()} disabled={busy} className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-900 disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {providers.map((provider) => (
          <div key={provider.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">{provider.name}</h3>
              {provider.verified ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <XCircle className="h-5 w-5 text-amber-400" />}
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-500">{provider.note}</p>
            <div className="mt-4 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {provider.verified ? 'Verified live' : provider.configured ? 'Configured · not live-tested' : 'Not configured'}
            </div>
            <button
              onClick={() => void verifyProvider(provider.id)}
              disabled={busy || !provider.configured}
              className="mt-4 w-full rounded-lg border border-zinc-700 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Run live verification
            </button>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={save} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 text-white"><Plus className="h-5 w-5 text-red-400" /><h3 className="font-bold">Add approved memory</h3></div>
          <select value={kind} onChange={(e) => setKind(e.target.value as MemoryKind)} className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white">
            {['identity','preference','company','project','decision','checkpoint'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} placeholder="Memory title" className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required maxLength={4000} rows={7} placeholder="The exact fact, preference, decision or checkpoint…" className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white" />
          <label className="flex items-center gap-3 text-sm text-zinc-300">
            <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} />
            Approved for provider context
          </label>
          <button disabled={busy} className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-500 disabled:opacity-50">Save to Osidan</button>
          {message && <p className="text-xs text-amber-300">{message}</p>}
        </form>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-4 flex items-center gap-2"><Database className="h-5 w-5 text-amber-400" /><h3 className="font-bold text-white">Approved company memory</h3></div>
          <div className="space-y-3">
            {!entries.length && <p className="rounded-xl border border-dashed border-zinc-700 p-6 text-sm text-zinc-500">No saved Osidan memories yet.</p>}
            {entries.map((entry) => (
              <article key={entry.id} className="rounded-2xl border border-zinc-800 bg-black/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">{entry.kind}</span>
                      {entry.approved && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
                    </div>
                    <h4 className="mt-1 font-bold text-white">{entry.title}</h4>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{entry.content}</p>
                  </div>
                  <button onClick={() => void remove(entry.id)} aria-label={`Delete ${entry.title}`} className="rounded-lg p-2 text-zinc-500 hover:bg-red-950 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
