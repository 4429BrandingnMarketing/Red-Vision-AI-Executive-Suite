import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, Building2, Cpu, Globe2, Maximize2, Radio, ShieldCheck, Sparkles } from 'lucide-react';

type MatrixMode = 'split' | 'globe' | 'city';

interface MatrixJob {
  id: string;
  title: string;
  department: string;
  assignedAgent: string;
  status: 'queued' | 'running' | 'blocked' | 'completed';
  updatedAt: string;
}

interface MatrixTelemetry {
  cpu: { loadPercent: number; cores: number };
  memory: { usedPercent: number };
  disk: { usedPercent: number | null };
  platform: { hostname: string; arch: string };
}

const departments = [
  { name: 'Music', accent: '#ef4444' },
  { name: 'TV & Video', accent: '#f59e0b' },
  { name: 'Fashion', accent: '#d946ef' },
  { name: 'Marketing', accent: '#06b6d4' },
  { name: 'Engineering', accent: '#3b82f6' },
  { name: 'Publishing', accent: '#22c55e' },
];

export function CommandMatrix() {
  const [mode, setMode] = useState<MatrixMode>('split');
  const [jobs, setJobs] = useState<MatrixJob[]>([]);
  const [telemetry, setTelemetry] = useState<MatrixTelemetry | null>(null);
  const [hermesOnline, setHermesOnline] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      try {
        const [jobsResponse, telemetryResponse, hermesResponse] = await Promise.all([
          fetch('/api/operations'),
          fetch('/api/system/telemetry'),
          fetch('/api/hermes/status'),
        ]);
        if (jobsResponse.ok) setJobs((await jobsResponse.json()).jobs || []);
        if (telemetryResponse.ok) setTelemetry(await telemetryResponse.json());
        if (hermesResponse.ok) {
          const status = await hermesResponse.json();
          setHermesOnline(status.online === true);
        }
      } catch {
        setHermesOnline(false);
      }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const liveJobs = useMemo(() => jobs.filter((job) => job.status === 'running' || job.status === 'queued'), [jobs]);
  const blockedJobs = useMemo(() => jobs.filter((job) => job.status === 'blocked'), [jobs]);

  return (
    <div className="relative min-h-[780px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070b] text-white shadow-[0_30px_100px_rgba(0,0,0,.55)]">
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.08) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(to bottom, black, transparent 80%)' }} />
      <div className="pointer-events-none absolute -left-32 -top-36 h-[440px] w-[440px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <header className="relative z-10 flex flex-col gap-6 border-b border-white/[.08] bg-black/40 px-6 py-6 backdrop-blur-2xl xl:flex-row xl:items-end xl:justify-between sm:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.28em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" /> RED VISION <span className="text-zinc-700">/</span> EXECUTIVE OPERATIONS
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden h-12 w-12 items-center justify-center rounded-2xl border border-red-400/25 bg-gradient-to-br from-red-500/20 to-black sm:flex">
              <Sparkles className="h-5 w-5 text-red-300" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-.04em] sm:text-3xl">The Command Matrix</h2>
              <p className="mt-1 max-w-xl text-sm text-zinc-400">One view of your AI-powered agency: missions, specialist divisions, and the Hermes orchestration layer.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[.07] bg-white/[.025] p-1.5">
          {([
            ['split', 'Overview', Maximize2],
            ['globe', "God's Eye", Globe2],
            ['city', 'Agent City', Building2],
          ] as const).map(([value, label, Icon]) => (
            <button key={value} onClick={() => setMode(value)} aria-pressed={mode === value} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${mode === value ? 'border-white/15 bg-white/10 text-white shadow-lg' : 'border-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>
      </header>

      <section className="relative z-10 grid grid-cols-2 gap-px border-b border-white/[.07] bg-white/[.07] sm:grid-cols-4">
        <SnapshotCard label="Mission pipeline" value={String(jobs.length)} detail={`${liveJobs.length} queued or running`} tone="cyan" />
        <SnapshotCard label="Specialist divisions" value={String(departments.length)} detail="Creative · growth · operations" tone="red" />
        <SnapshotCard label="Hermes orchestration" value={hermesOnline ? 'Connected' : 'Standby'} detail={hermesOnline ? 'Local gateway responding' : 'Connect gateway to run missions'} tone={hermesOnline ? 'green' : 'amber'} />
        <SnapshotCard label="Needs attention" value={String(blockedJobs.length)} detail={blockedJobs.length ? 'Blocked missions' : 'No blocked missions'} tone={blockedJobs.length ? 'amber' : 'neutral'} />
      </section>

      <div className={`relative z-10 grid min-h-[570px] ${mode === 'split' ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
        {mode !== 'city' && (
          <section className={`relative overflow-hidden border-white/[.07] ${mode === 'split' ? 'border-b xl:border-b-0 xl:border-r' : ''}`}>
            <GlobeViewport />
            <div className="pointer-events-none absolute left-5 top-5 max-w-xs rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl sm:left-7 sm:top-7">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-200"><Globe2 className="h-4 w-4" /> God's Eye · Global View</div>
              <p className="mt-2 text-xs leading-5 text-zinc-400">A spatial command surface for touring, releases, and market intelligence.</p>
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/[.06] p-2.5 text-[10px] leading-4 text-amber-200/80"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />Live route and ticket data can be connected when those feeds are ready.</div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
              <HudMetric label="Active missions" value={String(liveJobs.length)} />
              <HudMetric label="Blocked" value={String(blockedJobs.length)} warning={blockedJobs.length > 0} />
              <HudMetric label="Gateway" value={hermesOnline ? 'ONLINE' : 'OFFLINE'} active={hermesOnline} />
            </div>
          </section>
        )}

        {mode !== 'globe' && (
          <section className="relative min-h-[570px] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,rgba(8,145,178,.11),transparent_55%)] p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-fuchsia-300">Division activity · live mission data</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">Agent City</h3>
              </div>
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold ${hermesOnline ? 'status-badge-active' : 'border border-amber-500/30 bg-amber-950/35 text-amber-200'}`}>
                <Radio className="h-3.5 w-3.5" />{hermesOnline ? 'HERMES LINKED' : 'HERMES STANDBY'}
              </div>
            </div>

            <div className="grid h-[380px] grid-cols-2 items-end gap-3 sm:grid-cols-3">
              {departments.map((department, index) => {
                const departmentJobs = jobs.filter((job) => job.department.toLowerCase().includes(department.name.split(' ')[0].toLowerCase()));
                const activeCount = departmentJobs.filter((job) => job.status === 'running').length;
                const height = 150 + Math.min(110, departmentJobs.length * 22 + index * 7);
                const litWindows = Math.min(12, activeCount * 3 + departmentJobs.filter((job) => job.status === 'queued').length * 2);
                return (
                  <div key={department.name} className="group flex h-full flex-col justify-end">
                    <div className="relative mx-auto w-full max-w-[130px] transition-transform duration-500 group-hover:-translate-y-2" style={{ height }}>
                      <div className="absolute inset-0 rounded-t-2xl border border-white/[.12] bg-gradient-to-b from-white/[.09] via-[#11151b]/90 to-black/95 shadow-[0_20px_45px_rgba(0,0,0,.4)]" />
                      <div className="absolute inset-x-0 top-0 h-12 rounded-t-2xl opacity-30" style={{ background: `linear-gradient(180deg, ${department.accent}55, transparent)` }} />
                      <div className="absolute inset-x-3 top-3 grid grid-cols-3 gap-2">
                        {Array.from({ length: 12 }).map((_, windowIndex) => <span key={windowIndex} className={`h-2 rounded-sm transition-colors ${windowIndex < litWindows ? 'bg-cyan-200 shadow-[0_0_9px_#67e8f9]' : 'bg-white/[.08]'}`} />)}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: department.accent, boxShadow: '0 0 20px ' + department.accent }} />
                      <div className="absolute -left-2 -right-2 bottom-8 h-9 rounded-[50%] border opacity-60" style={{ borderColor: department.accent, boxShadow: '0 0 16px ' + department.accent }} />
                      <div className="absolute inset-x-2 bottom-3 text-center font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-300">{activeCount ? `${activeCount} running` : departmentJobs.length ? `${departmentJobs.length} queued` : 'standing by'}</div>
                    </div>
                    <p className="mt-3 text-center text-[11px] font-bold text-zinc-300">{department.name}</p>
                    <p className="text-center font-mono text-[9px] text-zinc-600">{departmentJobs.length} missions</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-glass-card hover-glow-cyan mt-5 rounded-2xl p-4">
              <div className="mb-3 flex items-center justify-between"><span className="text-[9px] font-semibold uppercase tracking-[.2em] text-zinc-500">Mission activity</span><Activity className="h-4 w-4 text-cyan-300" /></div>
              <div className="space-y-2">
                {!liveJobs.length && <p className="text-xs text-zinc-600">No queued or running missions.</p>}
                {liveJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0"><span className="text-cyan-400">●</span><span className="ml-2 truncate text-zinc-300">{job.title}</span></div>
                    <span className="shrink-0 font-mono text-[9px] uppercase text-zinc-600">{job.assignedAgent}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="relative z-10 grid gap-px border-t border-white/[.07] bg-white/[.07] sm:grid-cols-2 xl:grid-cols-5">
        <FooterMetric icon={Radio} label="Hermes link" value={hermesOnline ? 'Connected' : 'Standby'} active={hermesOnline} />
        <FooterMetric icon={Activity} label="Running" value={String(jobs.filter((job) => job.status === 'running').length)} />
        <FooterMetric icon={ShieldCheck} label="Completed" value={String(jobs.filter((job) => job.status === 'completed').length)} />
        <FooterMetric icon={Building2} label="Divisions" value={String(departments.length)} />
        <FooterMetric icon={Cpu} label="System load" value={telemetry ? `${telemetry.cpu.loadPercent}% CPU · ${telemetry.memory.usedPercent}% memory` : '—'} />
      </footer>
    </div>
  );
}

function GlobeViewport() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 4.3);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x02070d, transparent: true, opacity: 0.92 }),
    );
    globe.add(sphere);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.37, 24, 16)),
      new THREE.LineBasicMaterial({ color: 0x0891b2, transparent: true, opacity: 0.35 }),
    );
    globe.add(wire);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.48, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.035, side: THREE.BackSide }),
    );
    globe.add(halo);

    const ringMaterial = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 });
    [-0.5, 0.15, 0.65].forEach((rotation, index) => {
      const curve = new THREE.EllipseCurve(0, 0, 1.55 - index * 0.12, 0.55 + index * 0.08, 0, Math.PI * 2);
      const points = curve.getPoints(120).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, ringMaterial);
      line.rotation.x = rotation;
      line.rotation.y = index * 0.7;
      globe.add(line);
    });

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 900 }, () => (Math.random() - 0.5) * 18), 3)),
      new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.012, transparent: true, opacity: 0.65 }),
    );
    scene.add(stars);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    let frame = 0;
    const animate = () => {
      globe.rotation.y += 0.0018;
      globe.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;
      stars.rotation.y -= 0.00015;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      sphere.geometry.dispose();
      wire.geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="h-[570px] w-full" aria-label="Animated Red Vision global command visualization" />;
}

function HudMetric({ label, value, active, warning }: { label: string; value: string; active?: boolean; warning?: boolean }) {
  return <div className="rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-xl"><p className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-600">{label}</p><p className={`mt-1 text-sm font-black ${active ? 'text-emerald-300' : warning ? 'text-amber-300' : 'text-white'}`}>{value}</p></div>;
}

function FooterMetric({ icon: Icon, label, value, active }: { icon: React.ElementType; label: string; value: string; active?: boolean }) {
  return <div className="flex items-center gap-3 bg-[#05070b]/90 px-5 py-4"><Icon className={`h-4 w-4 ${active ? 'text-emerald-300' : 'text-cyan-300'}`} /><div><p className="text-[8px] font-semibold uppercase tracking-[.16em] text-zinc-600">{label}</p><p className="mt-0.5 truncate text-xs font-semibold text-zinc-200">{value}</p></div></div>;
}

function SnapshotCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: 'cyan' | 'red' | 'green' | 'amber' | 'neutral' }) {
  const colors = {
    cyan: 'text-cyan-200', red: 'text-red-200', green: 'text-emerald-200', amber: 'text-amber-200', neutral: 'text-white',
  };
  return <div className="bg-glass-card px-5 py-4 sm:px-7">
    <p className="text-[8px] font-semibold uppercase tracking-[.18em] text-zinc-600">{label}</p>
    <p className={`font-telemetry mt-1.5 text-lg font-semibold tracking-tight ${colors[tone]}`}>{value}</p>
    <p className="mt-1 text-[10px] text-zinc-500">{detail}</p>
  </div>;
}
