import React, { useEffect, useMemo, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Cpu, HardDrive, Loader2, Play, Plus, Radio, RefreshCw, ShieldCheck } from 'lucide-react';

type JobStatus = 'queued' | 'running' | 'blocked' | 'completed';

interface OperationsJob {
  id: string;
  title: string;
  description: string;
  department: string;
  assignedAgent: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  logs: Array<{ id: string; at: string; level: string; message: string }>;
  artifacts: Array<{ label: string; url?: string; description?: string }>;
}

interface HermesStatus {
  online: boolean;
  checkedAt: string;
  baseUrl: string;
  note: string;
}

interface Telemetry {
  cpu: { loadPercent: number; cores: number };
  memory: { usedPercent: number };
  disk: { usedPercent: number | null };
  platform: { hostname: string; type: string; release: string; arch: string };
  checkedAt: string;
}

const statusStyle: Record<JobStatus, string> = {
  queued: 'border-zinc-700 bg-zinc-900 text-zinc-300',
  running: 'border-cyan-500/50 bg-cyan-950/50 text-cyan-300',
  blocked: 'border-amber-500/50 bg-amber-950/50 text-amber-300',
  completed: 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300',
};

export function OperationsMissionControl() {
  const [jobs, setJobs] = useState<OperationsJob[]>([]);
  const [hermes, setHermes] = useState<HermesStatus | null>(null);
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Operations');
  const [assignedAgent, setAssignedAgent] = useState('ARCHON');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const refresh = async (quiet = false) => {
    if (!quiet) setBusy(true);
    try {
      const [jobsResponse, hermesResponse, telemetryResponse] = await Promise.all([
        fetch('/api/operations'),
        fetch('/api/hermes/status'),
        fetch('/api/system/telemetry'),
      ]);
      if (!jobsResponse.ok || !hermesResponse.ok || !telemetryResponse.ok) throw new Error('Operations status could not be loaded.');
      setJobs((await jobsResponse.json()).jobs || []);
      setHermes(await hermesResponse.json());
      setTelemetry(await telemetryResponse.json());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Operations status could not be loaded.');
    } finally {
      if (!quiet) setBusy(false);
    }
  };

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(true), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const counts = useMemo(() => ({
    running: jobs.filter((job) => job.status === 'running').length,
    blocked: jobs.filter((job) => job.status === 'blocked').length,
    completed: jobs.filter((job) => job.status === 'completed').length,
  }), [jobs]);

  const createJob = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, department, assignedAgent }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Job could not be created.');
      setTitle('');
      setDescription('');
      setMessage('Mission created. It is queued, not yet executed.');
      await refresh(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Job could not be created.');
    } finally {
      setBusy(false);
    }
  };

  const updateJob = async (job: OperationsJob, status: JobStatus) => {
    setBusy(true);
    setMessage('');
    try {
      const evidenceText = evidence[job.id]?.trim();
      const body: Record<string, unknown> = { status };
      if (status === 'completed') {
        body.artifact = { label: 'Completion evidence', description: evidenceText || '' };
      }
      const response = await fetch('/api/operations/' + job.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Job could not be updated.');
      setEvidence((current) => ({ ...current, [job.id]: '' }));
      await refresh(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Job could not be updated.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-500/30 bg-zinc-950/95 p-6 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">Operations Core</p>
            <h2 className="mt-2 text-3xl font-black text-white">ARCHON Mission Control</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
              Persistent missions, live status, local hardware telemetry, and evidence-gated completion. A mission cannot be marked complete without a recorded artifact or evidence description.
            </p>
          </div>
          <button onClick={() => void refresh()} disabled={busy} className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-900 disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} /> Refresh systems
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatusCard icon={Radio} label="Hermes Gateway" value={hermes?.online ? 'ONLINE' : 'OFFLINE'} detail={hermes?.note || 'Checking gateway…'} active={Boolean(hermes?.online)} />
        <StatusCard icon={Cpu} label="CPU Load" value={telemetry ? telemetry.cpu.loadPercent + '%' : '—'} detail={telemetry ? telemetry.cpu.cores + ' logical cores' : 'Checking…'} active />
        <StatusCard icon={Activity} label="Memory" value={telemetry ? telemetry.memory.usedPercent + '%' : '—'} detail="Local machine use" active />
        <StatusCard icon={HardDrive} label="Disk" value={telemetry?.disk.usedPercent == null ? '—' : telemetry.disk.usedPercent + '%'} detail={telemetry?.platform.arch || 'Checking…'} active />
        <StatusCard icon={ShieldCheck} label="Verified Missions" value={String(counts.completed)} detail={counts.running + ' running · ' + counts.blocked + ' blocked'} active={counts.blocked === 0} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <form onSubmit={createJob} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 text-white"><Plus className="h-5 w-5 text-cyan-400" /><h3 className="font-bold">Create an accountable mission</h3></div>
          <input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={160} placeholder="What must be accomplished?" className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white" />
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white">
              {['Operations','Marketing','Creative','Music','TV & Video','Fashion','Engineering','Publishing','Legal'].map((item) => <option key={item}>{item}</option>)}
            </select>
            <input value={assignedAgent} onChange={(event) => setAssignedAgent(event.target.value)} maxLength={100} placeholder="Assigned agent" className="rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white" />
          </div>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={6} maxLength={4000} placeholder="Instructions, requirements and expected deliverable…" className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-sm text-white" />
          <button disabled={busy} className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-3 text-sm font-black text-white hover:from-cyan-500 hover:to-blue-600 disabled:opacity-50">Queue mission</button>
          {message && <p className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 text-xs text-amber-200">{message}</p>}
        </form>

        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center justify-between"><h3 className="font-bold text-white">Mission ledger</h3><span className="font-mono text-xs text-zinc-500">{jobs.length} total</span></div>
          {!jobs.length && <p className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center text-sm text-zinc-500">No missions yet. Create the first command on the left.</p>}
          {jobs.map((job) => (
            <article key={job.id} className="rounded-2xl border border-zinc-800 bg-black/60 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${statusStyle[job.status]}`}>{job.status}</span>
                    <span className="font-mono text-[10px] uppercase text-cyan-400">{job.department}</span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold text-white">{job.title}</h4>
                  <p className="mt-1 text-xs text-zinc-500">Assigned to {job.assignedAgent}</p>
                  {job.description && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{job.description}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  {job.status !== 'completed' && <button onClick={() => void updateJob(job, 'running')} disabled={busy} className="rounded-lg border border-cyan-700 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-950"><Play className="mr-1 inline h-3 w-3" />Start</button>}
                  {job.status !== 'completed' && <button onClick={() => void updateJob(job, 'blocked')} disabled={busy} className="rounded-lg border border-amber-700 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-950"><AlertTriangle className="mr-1 inline h-3 w-3" />Block</button>}
                </div>
              </div>
              {job.status !== 'completed' && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input value={evidence[job.id] || ''} onChange={(event) => setEvidence((current) => ({ ...current, [job.id]: event.target.value }))} placeholder="Artifact URL or exact evidence description required…" className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 p-2.5 text-xs text-white" />
                  <button onClick={() => void updateJob(job, 'completed')} disabled={busy || !(evidence[job.id] || '').trim()} className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-40"><CheckCircle2 className="mr-1 inline h-4 w-4" />Complete with evidence</button>
                </div>
              )}
              <div className="mt-4 rounded-xl border border-zinc-900 bg-zinc-950 p-3 font-mono text-[11px] leading-5 text-zinc-500">
                {job.logs.slice(-4).map((log) => <div key={log.id}><span className="text-zinc-600">{new Date(log.at).toLocaleTimeString()}</span> · {log.message}</div>)}
              </div>
              {job.artifacts.length > 0 && <div className="mt-3 text-xs text-emerald-300">{job.artifacts.map((artifact) => <div key={artifact.label + artifact.description}>{artifact.label}: {artifact.url || artifact.description}</div>)}</div>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, detail, active }: { icon: React.ElementType; label: string; value: string; detail: string; active: boolean }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-cyan-400" /><span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]' : 'bg-amber-400'}`} /></div>
      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
      <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-zinc-500">{detail}</p>
    </div>
  );
}
