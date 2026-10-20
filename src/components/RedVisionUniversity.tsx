import React, { useState } from 'react';
import { BookOpen, Download, GraduationCap, Loader2, Sparkles } from 'lucide-react';

export function RedVisionUniversity() {
  const [subject, setSubject] = useState('Building a music brand');
  const [audience, setAudience] = useState('Independent artists and creators');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('4 weeks');
  const [outcomes, setOutcomes] = useState('Create a clear artist identity, release plan, and audience growth routine');
  const [curriculum, setCurriculum] = useState('Your course outline will appear here. Choose a topic and learner, then create a draft.');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const createCurriculum = async () => {
    setBusy(true);
    setNotice('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'auto',
          prompt: `Act as an experienced instructional designer for Red Vision University. Create a practical ${duration} ${level.toLowerCase()} course about: ${subject}. Learners: ${audience}. Desired outcomes: ${outcomes}. Provide a concise course description, prerequisites, measurable learning outcomes, a week-by-week curriculum with lessons, key concepts, hands-on exercises, a short knowledge check for each week, a final project, suggested resources, and an assessment rubric. Keep the material original, accessible, and realistic. Distinguish established facts from suggestions and do not invent credentials or research citations. Format in clear Markdown.`,
        }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.text !== 'string' || !data.text.trim()) throw new Error(data.error || 'The curriculum draft could not be created.');
      setCurriculum(data.text.trim());
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The curriculum draft could not be created.');
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([curriculum], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${subject.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') || 'red-vision-course'}-curriculum.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header className="bg-glass-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-amber-300"><GraduationCap className="h-4 w-4" /> Red Vision University</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Turn your expertise into a course.</h2>
            <p className="mt-3 text-base leading-7 text-zinc-300">Build a clear curriculum for your students, artists, clients, and creative team. Start with an AI-generated outline, then review and shape it into your own teaching plan.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[.07] px-4 py-3 text-sm text-amber-100"><BookOpen className="h-4 w-4" /> Curriculum studio</div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(300px,.78fr)_minmax(0,1.22fr)]">
        <section className="bg-glass-card rounded-3xl p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-200"><Sparkles className="h-5 w-5" /></span><div><h3 className="text-lg font-semibold text-white">Course planner</h3><p className="text-sm text-zinc-400">Set the learning goal and format.</p></div></div>
          <div className="space-y-4">
            <Field label="Course topic"><input value={subject} onChange={(event) => setSubject(event.target.value)} className={inputClass} placeholder="What will students learn?" /></Field>
            <Field label="Who is it for?"><input value={audience} onChange={(event) => setAudience(event.target.value)} className={inputClass} placeholder="Describe your learners" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Experience level"><select value={level} onChange={(event) => setLevel(event.target.value)} className={inputClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Mixed experience</option></select></Field>
              <Field label="Course length"><select value={duration} onChange={(event) => setDuration(event.target.value)} className={inputClass}><option>1 week</option><option>2 weeks</option><option>4 weeks</option><option>6 weeks</option><option>8 weeks</option><option>12 weeks</option></select></Field>
            </div>
            <Field label="What should learners be able to do?"><textarea value={outcomes} onChange={(event) => setOutcomes(event.target.value)} className={`${inputClass} min-h-24 resize-y`} placeholder="Describe the practical result" /></Field>
            <button type="button" onClick={() => void createCurriculum()} disabled={busy || !subject.trim() || !audience.trim()} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 text-sm font-bold text-white shadow-lg shadow-amber-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">{busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating course outline…</> : <><Sparkles className="h-4 w-4" /> Create curriculum</>}</button>
          </div>
        </section>

        <section className="bg-glass-card min-h-[560px] rounded-3xl p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><h3 className="text-lg font-semibold text-white">Curriculum draft</h3><p className="text-sm text-zinc-400">Review and edit the outline before you teach it.</p></div>
            <button type="button" onClick={download} disabled={curriculum.startsWith('Your course outline')} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/[.08] disabled:opacity-40"><Download className="h-4 w-4" /> Download</button>
          </div>
          {notice && <p role="alert" className="mb-3 rounded-xl border border-rose-400/20 bg-rose-400/[.07] p-3 text-sm text-rose-200">{notice}</p>}
          <textarea aria-label="Editable curriculum draft" value={curriculum} onChange={(event) => setCurriculum(event.target.value)} className="min-h-[460px] w-full resize-y rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-zinc-200 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/10" />
        </section>
      </div>
    </div>
  );
}

const inputClass = 'min-h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/10';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</span>{children}</label>;
}
