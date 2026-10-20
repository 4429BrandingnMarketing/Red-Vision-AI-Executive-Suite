import React, { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowLeft, Check, Clock3, Copy, Download, Film, Headphones, Mic2, Play, Radio, RotateCcw, Send, Sparkles, Tv, WandSparkles, Waves } from 'lucide-react';

type RundownSegment = { title: string; minutes: number };

const initialRundown: RundownSegment[] = [
  { title: 'Welcome + show intro', minutes: 3 },
  { title: 'Main conversation', minutes: 12 },
  { title: 'Guest spotlight', minutes: 10 },
  { title: 'Closing thoughts + next show', minutes: 5 },
];

const tvScenes = [
  { id: 'news', name: 'News desk', description: 'Red and charcoal newsroom', style: 'from-[#321012] via-[#100c10] to-[#050609]', icon: Activity },
  { id: 'daytime', name: 'Daytime talk', description: 'Warm, bright conversation set', style: 'from-[#49331f] via-[#221a18] to-[#08090c]', icon: Sparkles },
  { id: 'interview', name: 'Studio interview', description: 'Intimate, cinematic seating', style: 'from-[#132e37] via-[#10161c] to-[#06070a]', icon: Mic2 },
  { id: 'weather', name: 'Weather report', description: 'Clear forecast wall', style: 'from-[#173c5b] via-[#10253c] to-[#05090e]', icon: Waves },
];

async function generateOutline(prompt: string) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, provider: 'auto' }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'The writing assistant could not complete that request.');
  if (typeof data.text !== 'string' || !data.text.trim()) throw new Error('The writing assistant returned an empty outline.');
  return data.text.trim();
}

export function PodcastStudio() {
  const [showTitle, setShowTitle] = useState('The Red Vision Sessions');
  const [topic, setTopic] = useState('Creativity, ownership, and building a lasting independent brand');
  const [outline, setOutline] = useState('Your talking points will appear here. Keep this open as a gentle guide while you host.');
  const [writing, setWriting] = useState(false);
  const [error, setError] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [rundown, setRundown] = useState(initialRundown);
  const [activeSegment, setActiveSegment] = useState(0);
  const [remaining, setRemaining] = useState(initialRundown[0].minutes * 60);
  const [clockRunning, setClockRunning] = useState(false);
  const [activeCue, setActiveCue] = useState('');
  const [scene, setScene] = useState('On Air · The Red Vision Sessions');

  useEffect(() => {
    if (!clockRunning) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [clockRunning]);

  useEffect(() => {
    if (remaining === 0 && clockRunning) setClockRunning(false);
  }, [remaining, clockRunning]);

  const formattedTime = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;

  const makeGuestRoom = () => {
    const code = window.crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    setInviteUrl(`https://meet.jit.si/RedVisionRadio-${code}`);
    setCopied(false);
  };

  const copyGuestLink = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
    } catch {
      setError('Copy was blocked by your browser. Select and copy the guest link below.');
    }
  };

  const createOutline = async () => {
    setWriting(true);
    setError('');
    try {
      const text = await generateOutline(`Write an on-air podcast host's one-page bullet-point rundown for the show "${showTitle}" about: ${topic}. Use natural spoken language, 5 short talking-point bullets, 3 gentle redirect cues for when the host drifts off topic, a guest question, and a clear handoff to the next segment. Do not invent facts or claim research has been performed.`);
      setOutline(text);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The outline could not be generated.');
    } finally {
      setWriting(false);
    }
  };

  const playCue = (cue: 'intro' | 'transition' | 'outro') => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const notes = cue === 'intro' ? [392, 523, 659] : cue === 'transition' ? [587, 440] : [523, 392, 330];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.11, context.currentTime + index * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.18 + 0.3);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime + index * 0.18);
      oscillator.stop(context.currentTime + index * 0.18 + 0.31);
    });
    setActiveCue(cue);
    window.setTimeout(() => setActiveCue(''), 1000);
    window.setTimeout(() => void context.close(), 1200);
  };

  const transition = () => {
    const next = (activeSegment + 1) % rundown.length;
    setActiveSegment(next);
    setRemaining(rundown[next].minutes * 60);
    setClockRunning(true);
    playCue('transition');
  };

  return (
    <StudioShell eyebrow="RED VISION RADIO · LIVE PRODUCTION" title="Podcast Studio" description="Prepare the conversation, welcome a guest, and keep the show moving with a clear run of show." icon={Radio}>
      <div className="grid gap-6 2xl:grid-cols-[1.35fr_.85fr]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#07090d] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
              <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-zinc-500">Program preview</p><h3 className="mt-1 text-xl font-semibold text-white">{showTitle}</h3></div>
              <span className="flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-200"><span className="h-2 w-2 animate-pulse rounded-full bg-red-400" /> Studio preview</span>
            </div>
            <div className="relative aspect-video min-h-[260px] overflow-hidden bg-gradient-to-br from-[#270e17] via-[#11151e] to-[#050608] sm:min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,rgba(220,38,38,.23),transparent_52%)]" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-10 sm:top-9"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-red-200"><Headphones className="h-6 w-6" /></span><span><span className="block text-xs uppercase tracking-[.2em] text-red-200/80">Red Vision Radio</span><span className="mt-1 block text-lg font-semibold text-white sm:text-2xl">Studio A</span></span></div>
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4 sm:inset-x-10 sm:bottom-9"><div><p className="text-xs uppercase tracking-[.18em] text-zinc-400">Now prepared for</p><p className="mt-1 max-w-2xl text-xl font-semibold text-white sm:text-3xl">{scene}</p></div><div className="flex h-12 items-end gap-1.5" aria-label="Decorative sound visualization">{[32, 58, 40, 72, 48, 90, 64, 38, 76, 50, 28, 62].map((height, index) => <span key={index} className="w-1.5 rounded-t-full bg-gradient-to-t from-red-600 to-amber-300/80" style={{ height: `${height}%` }} />)}</div></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7"><label className="flex min-w-[240px] flex-1 items-center gap-3 text-sm text-zinc-400">Show title<input value={showTitle} onChange={(event) => { setShowTitle(event.target.value); setScene(`On Air · ${event.target.value || 'Red Vision Radio'}`); }} className="min-h-11 flex-1 rounded-xl border border-white/10 bg-black/60 px-3 text-sm text-white outline-none focus:border-red-300/50" /></label><button type="button" onClick={() => playCue('intro')} className="flex min-h-11 items-center gap-2 rounded-xl border border-red-300/25 bg-red-400/10 px-4 text-sm font-semibold text-red-100 hover:bg-red-400/20"><Play className="h-4 w-4" /> Preview intro cue</button></div>
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
              <SectionHeading icon={WandSparkles} title="On-air talking points" caption="A quick guide to help you find your way back to the topic." />
              <label className="mt-5 block text-sm font-semibold text-zinc-300">Conversation topic<input value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4 text-sm text-white outline-none focus:border-cyan-300/40" /></label>
              <button type="button" onClick={() => void createOutline()} disabled={writing || !topic.trim()} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:brightness-110 disabled:opacity-50"><Sparkles className="h-4 w-4" />{writing ? 'Writing your host notes…' : 'Create my bullet-point guide'}</button>
              <div className="mt-4 max-h-[320px] min-h-44 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/[.08] bg-black/35 p-4 text-sm leading-7 text-zinc-200">{outline}</div>
              {error && <p role="status" className="mt-3 text-sm text-amber-200">{error}</p>}
            </section>

            <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
              <SectionHeading icon={Clock3} title="Show clock & rundown" caption="Keep track of your segment and move to the next cue when you are ready." />
              <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/[.04] p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-200/70">Segment clock</p>
                <p className="font-telemetry mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">{formattedTime}</p>
                <p className="mt-2 text-sm text-zinc-400">{rundown[activeSegment]?.title}</p>
                <div className="mt-4 flex justify-center gap-2"><button type="button" onClick={() => setClockRunning((value) => !value)} className="flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15"><Play className="h-4 w-4" />{clockRunning ? 'Pause clock' : 'Start clock'}</button><button type="button" onClick={transition} className="flex min-h-11 items-center gap-2 rounded-xl border border-cyan-300/25 px-4 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10">Next segment <Send className="h-4 w-4" /></button><button type="button" onClick={() => { setClockRunning(false); setRemaining(rundown[activeSegment].minutes * 60); }} aria-label="Reset segment clock" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-400 hover:bg-white/10"><RotateCcw className="h-4 w-4" /></button></div>
              </div>
              <div className="mt-4 space-y-2">{rundown.map((segment, index) => <div key={segment.title} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${index === activeSegment ? 'bg-white/[.08]' : 'bg-black/20'}`}><span className={`font-telemetry w-12 text-xs ${index === activeSegment ? 'text-cyan-200' : 'text-zinc-500'}`}>{String(index + 1).padStart(2, '0')}</span><span className="flex-1 text-sm text-zinc-200">{segment.title}</span><span className="text-xs text-zinc-500">{segment.minutes} min</span></div>)}</div>
            </section>
          </div>

          <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
            <SectionHeading icon={Activity} title="Cue pads" caption="Original cue tones for intro, transition, and close. Preview plays locally in this studio." />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{([['intro', 'Show intro'], ['transition', 'Transition'], ['outro', 'Show close']] as const).map(([id, label]) => <button key={id} type="button" onClick={() => playCue(id)} className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 text-left text-sm font-semibold transition ${activeCue === id ? 'border-red-300/50 bg-red-400/15 text-white' : 'border-white/10 bg-black/30 text-zinc-200 hover:border-white/20 hover:bg-white/[.04]'}`}><span>{label}</span><Play className="h-4 w-4 text-red-200" /></button>)}</div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
            <SectionHeading icon={Mic2} title="Bring in a guest" caption="Create a fresh meeting room link to send your guest." />
            <button type="button" onClick={makeGuestRoom} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-4 text-sm font-semibold text-white hover:bg-white/10"><Radio className="h-4 w-4 text-cyan-200" />{inviteUrl ? 'Create a new guest room' : 'Create guest link'}</button>
            {inviteUrl && <div className="mt-4 space-y-3"><a href={inviteUrl} target="_blank" rel="noreferrer" className="block break-all rounded-xl border border-cyan-300/15 bg-black/40 p-3 text-sm leading-6 text-cyan-100 underline decoration-cyan-100/30 underline-offset-4">{inviteUrl}</a><button type="button" onClick={() => void copyGuestLink()} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[.06] text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? 'Link copied' : 'Copy guest link'}</button></div>}
            <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[.045] p-3 text-xs leading-5 text-amber-100/80">No password is added. This free Jitsi room link does not expire automatically, so anyone who has it may be able to reuse it. For a truly expiring guest link, Red Vision needs a meeting service configured to enforce link expiration. This guest call does not yet send a Red Vision broadcast.</div>
          </section>

          <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
            <SectionHeading icon={Film} title="Studio visuals" caption="Choose the look shown on your producer preview." />
            <div className="mt-4 grid gap-2">{['On Air · The Red Vision Sessions', 'Guest conversation', 'After Hours · Music & culture'].map((option) => <button key={option} type="button" onClick={() => setScene(option)} className={`min-h-12 rounded-xl border px-4 text-left text-sm font-semibold ${scene === option ? 'border-red-300/35 bg-red-400/10 text-red-100' : 'border-white/10 bg-black/25 text-zinc-300 hover:bg-white/[.04]'}`}>{option}</button>)}</div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#080a0e] p-5 sm:p-7">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.06] text-zinc-200"><Headphones className="h-5 w-5" /></span><div><p className="text-sm font-semibold text-white">Production status</p><p className="text-xs text-zinc-500">Local prep tools are ready</p></div></div>
            <div className="mt-5 space-y-3 text-sm"><StatusLine label="Show rundown" ready /><StatusLine label="Segment timer" ready /><StatusLine label="Guest room link" ready={Boolean(inviteUrl)} /><StatusLine label="Broadcast output" ready={false} /></div>
            <p className="mt-4 text-xs leading-5 text-zinc-500">To go live to an audience, connect a streaming or broadcast provider. This screen prepares your show and guest call.</p>
          </section>
        </aside>
      </div>
    </StudioShell>
  );
}

export function TelevisionStudio() {
  const [sceneId, setSceneId] = useState('news');
  const [topic, setTopic] = useState('Red Vision Creative Studio launch');
  const [script, setScript] = useState('Choose a studio backdrop, enter your segment topic, and draft a script for the host.');
  const [writing, setWriting] = useState(false);
  const [error, setError] = useState('');
  const [lowerThird, setLowerThird] = useState('RED VISION TV  ·  YOUR STORY, IN FOCUS');

  const scene = useMemo(() => tvScenes.find((item) => item.id === sceneId) || tvScenes[0], [sceneId]);
  const SceneIcon = scene.icon;

  const createScript = async () => {
    setWriting(true);
    setError('');
    try {
      const result = await generateOutline(`Write a concise 90-second ${scene.name} studio host script on: ${topic}. Include an opening, short fact-safe body, one transition cue, and a close. Clearly mark any missing facts as [VERIFY] rather than inventing them. Use natural spoken language and on-camera direction in brackets.`);
      setScript(result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The script could not be generated.');
    } finally {
      setWriting(false);
    }
  };

  return (
    <StudioShell eyebrow="RED VISION TV · VIRTUAL PRODUCTION" title="Broadcast Studio" description="Build news, talk, interview, and weather segments against a full-width studio preview." icon={Tv}>
      <div className="grid gap-6 2xl:grid-cols-[1.4fr_.72fr]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#07090d] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-zinc-500">Virtual set preview · 16:9</p><h3 className="mt-1 text-xl font-semibold text-white">{scene.name}</h3></div><span className="rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-3 py-2 text-xs font-semibold text-cyan-100">1920 × 1080 layout</span></div>
            <div className={`relative aspect-video min-h-[300px] overflow-hidden bg-gradient-to-br ${scene.style} sm:min-h-[450px]`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,.12),transparent_58%)]" />
              <div className="absolute inset-x-10 top-[13%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute inset-x-[14%] bottom-[22%] h-[24%] rounded-t-[50%] border border-white/10 bg-black/25 shadow-[0_-20px_70px_rgba(255,255,255,.06)]" />
              {sceneId === 'weather' && <div className="absolute right-[10%] top-[17%] flex h-[46%] w-[42%] items-center justify-center rounded-[40%] border border-sky-100/15 bg-sky-300/[.06] text-[10px] font-bold uppercase tracking-[.22em] text-sky-100/60 sm:text-sm">Forecast canvas</div>}
              {sceneId === 'news' && <div className="absolute right-[12%] top-[20%] h-2 w-[30%] rounded-full bg-red-400/50 shadow-[0_0_45px_rgba(248,113,113,.35)]" />}
              {sceneId === 'daytime' && <div className="absolute inset-x-[28%] bottom-[19%] h-[10%] rounded-full bg-amber-100/[.08] blur-lg" />}
              <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-9 sm:top-8"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-white"><SceneIcon className="h-5 w-5" /></span><span><span className="block text-xs font-bold uppercase tracking-[.2em] text-white/65">Red Vision TV</span><span className="mt-1 block text-lg font-semibold text-white sm:text-2xl">{scene.name}</span></span></div>
              <div className="absolute inset-x-0 bottom-[9%] bg-gradient-to-r from-red-700/95 via-red-700/90 to-transparent px-5 py-3 sm:px-9 sm:py-4"><p className="text-xs font-bold tracking-[.12em] text-white sm:text-base">{lowerThird || 'RED VISION TV'}</p><p className="mt-1 text-[10px] text-red-100/75 sm:text-xs">Studio graphics preview · not currently broadcasting</p></div>
            </div>
          </section>

          <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
            <SectionHeading icon={WandSparkles} title="Write the segment" caption="Generate a natural host script and mark details that need checking." />
            <label className="mt-5 block text-sm font-semibold text-zinc-300">Segment topic<input value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4 text-sm text-white outline-none focus:border-cyan-300/40" /></label>
            <label className="mt-4 block text-sm font-semibold text-zinc-300">Lower third title<input value={lowerThird} onChange={(event) => setLowerThird(event.target.value)} maxLength={72} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4 text-sm text-white outline-none focus:border-cyan-300/40" /></label>
            <button type="button" onClick={() => void createScript()} disabled={writing || !topic.trim()} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:brightness-110 disabled:opacity-50"><Sparkles className="h-4 w-4" />{writing ? 'Writing your script…' : 'Write host script'}</button>
            <div className="mt-4 min-h-64 whitespace-pre-wrap rounded-2xl border border-white/[.08] bg-black/35 p-5 text-sm leading-7 text-zinc-200">{script}</div>
            {error && <p role="status" className="mt-3 text-sm text-amber-200">{error}</p>}
          </section>
        </div>

        <aside className="space-y-6">
          <TrailerMaker />
          <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
            <SectionHeading icon={Tv} title="Choose a backdrop" caption="Switch the virtual scene for the type of show you are making." />
            <div className="mt-5 space-y-3">{tvScenes.map(({ id, name, description, style, icon: Icon }) => <button key={id} type="button" onClick={() => setSceneId(id)} className={`group w-full overflow-hidden rounded-2xl border text-left transition ${sceneId === id ? 'border-cyan-200/40 ring-1 ring-cyan-200/20' : 'border-white/10 hover:border-white/25'}`}><span className={`flex h-20 items-center justify-between bg-gradient-to-r ${style} px-4`}><span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/30 text-white"><Icon className="h-5 w-5" /></span><span><span className="block text-sm font-semibold text-white">{name}</span><span className="mt-1 block text-xs text-white/60">{description}</span></span></span>{sceneId === id && <span className="rounded-full bg-cyan-100/15 p-1.5 text-cyan-100"><Check className="h-3.5 w-3.5" /></span>}</span></button>)}</div>
          </section>
          <section className="rounded-3xl border border-white/10 bg-[#080a0e] p-5 sm:p-7">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.06] text-zinc-200"><Film className="h-5 w-5" /></span><div><p className="text-sm font-semibold text-white">Studio production</p><p className="text-xs text-zinc-500">Picture and graphics preview</p></div></div>
            <div className="mt-5 space-y-3 text-sm"><StatusLine label="Studio backdrop" ready /><StatusLine label="Host script" ready /><StatusLine label="Broadcast output" ready={false} /></div>
            <p className="mt-4 text-xs leading-5 text-zinc-500">The set and lower third are a visual production preview. A connected streaming provider is needed to broadcast them to viewers.</p>
          </section>
        </aside>
      </div>
    </StudioShell>
  );
}

function TrailerMaker() {
  const [title, setTitle] = useState('The Red Vision Story');
  const [genre, setGenre] = useState('Cinematic documentary');
  const [duration, setDuration] = useState('60 seconds');
  const [tone, setTone] = useState('Bold, emotional, and inspiring');
  const [draft, setDraft] = useState('Your trailer script and shot-by-shot plan will appear here.');
  const [writing, setWriting] = useState(false);
  const [error, setError] = useState('');

  const createTrailer = async () => {
    setWriting(true);
    setError('');
    try {
      const result = await generateOutline(`Create a ${duration} trailer production plan for "${title}". Genre/style: ${genre}. Tone: ${tone}. Deliver: (1) a strong opening hook, (2) a timed shot-by-shot sequence with visual direction, voiceover or dialogue, on-screen text, and sound/music cues, (3) a rising midpoint, (4) a memorable final image, and (5) a clear end-card call to action. Keep all shots practical to create. Do not invent awards, reviews, real events, cast, plot details, or factual claims; use [ADD APPROVED DETAIL] placeholders wherever needed. Label the output as a draft for review.`);
      setDraft(result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The trailer plan could not be created.');
    } finally {
      setWriting(false);
    }
  };

  const copyDraft = async () => {
    try { await navigator.clipboard.writeText(draft); }
    catch { setError('Copy is unavailable here. Select the trailer plan text to copy it.'); }
  };

  const downloadDraft = () => {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'trailer'}-trailer-plan.md`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="bg-glass-card rounded-3xl p-5 sm:p-7">
      <SectionHeading icon={Film} title="Trailer Maker" caption="Create the hook, voiceover, shot list, and end card for a cinematic trailer." />
      <label className="mt-5 block text-sm font-semibold text-zinc-300">Project title<input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-rose-300/40" /></label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold text-zinc-300">Style<select value={genre} onChange={(event) => setGenre(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-[#101116] px-3 text-sm text-white outline-none focus:border-rose-300/40"><option>Cinematic documentary</option><option>Feature film</option><option>Music video</option><option>Sports event</option><option>Daytime show</option><option>News special</option></select></label>
        <label className="block text-sm font-semibold text-zinc-300">Length<select value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-[#101116] px-3 text-sm text-white outline-none focus:border-rose-300/40"><option>30 seconds</option><option>60 seconds</option><option>90 seconds</option><option>2 minutes</option></select></label>
      </div>
      <label className="mt-3 block text-sm font-semibold text-zinc-300">Creative direction<input value={tone} onChange={(event) => setTone(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none focus:border-rose-300/40" /></label>
      <button type="button" onClick={() => void createTrailer()} disabled={writing || !title.trim()} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 text-sm font-bold text-white shadow-lg shadow-rose-950/30 transition hover:brightness-110 disabled:opacity-50"><Sparkles className="h-4 w-4" />{writing ? 'Creating trailer plan…' : 'Create trailer plan'}</button>
      <div className="mt-4 max-h-[420px] min-h-40 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/[.08] bg-black/35 p-4 text-sm leading-7 text-zinc-200">{draft}</div>
      <div className="mt-3 flex gap-2"><button type="button" onClick={() => void copyDraft()} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-semibold text-zinc-200 hover:bg-white/[.05]"><Copy className="h-4 w-4" />Copy plan</button><button type="button" onClick={downloadDraft} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/[.06] text-sm font-semibold text-rose-100 hover:bg-rose-300/10"><Download className="h-4 w-4" />Download</button></div>
      {error && <p role="status" className="mt-3 text-sm text-amber-200">{error}</p>}
      <p className="mt-3 text-xs leading-5 text-zinc-500">This creates a production-ready script and plan. Build the finished video in Motion Cinema; review all factual details and rights before publishing.</p>
    </section>
  );
}

function StudioShell({ eyebrow, title, description, icon: Icon, children }: { eyebrow: string; title: string; description: string; icon: React.ElementType; children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1800px] space-y-6">
    <header className="bg-glass-card relative overflow-hidden rounded-3xl p-6 shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-[80px]" />
      <div className="relative flex items-start gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-300/20 bg-gradient-to-br from-red-500/20 to-black/40 text-red-100"><Icon className="h-6 w-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-red-200/80">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base">{description}</p></div></div>
    </header>
    {children}
  </div>;
}

function SectionHeading({ icon: Icon, title, caption }: { icon: React.ElementType; title: string; caption: string }) {
  return <div className="flex items-start gap-3"><span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[.04] text-red-200"><Icon className="h-4 w-4" /></span><span><span className="block text-lg font-semibold text-white">{title}</span><span className="mt-1 block text-xs leading-5 text-zinc-400">{caption}</span></span></div>;
}

function StatusLine({ label, ready }: { label: string; ready: boolean }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-zinc-300">{label}</span><span className={`flex items-center gap-2 text-xs font-semibold ${ready ? 'text-emerald-200' : 'text-amber-200'}`}><span className={`h-1.5 w-1.5 rounded-full ${ready ? 'bg-emerald-300' : 'bg-amber-300'}`} />{ready ? 'Ready' : 'Needs connection'}</span></div>;
}
