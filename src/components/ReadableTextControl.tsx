import React, { useEffect, useState } from 'react';
import { Minus, Plus, RotateCcw, Type } from 'lucide-react';

const STORAGE_KEY = 'redvision.ui.text-size';
const MIN_SIZE = 18;
const MAX_SIZE = 26;
const STEP = 2;

function getSavedSize() {
  if (typeof window === 'undefined') return 22;
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(stored) && stored >= MIN_SIZE && stored <= MAX_SIZE ? stored : 22;
}

export function ReadableTextControl() {
  const [size, setSize] = useState(getSavedSize);

  useEffect(() => {
    // Scale text utilities only. Changing the root font size also scales every
    // rem-based layout measurement, which can push studio panels off-screen.
    document.documentElement.style.setProperty('--rv-text-scale', String(size / 16));
    document.documentElement.dataset.rvTextSize = String(size);
    window.localStorage.setItem(STORAGE_KEY, String(size));
  }, [size]);

  return (
    <section aria-label="Text size controls" className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 rounded-2xl border border-amber-300/70 bg-black/95 px-3 py-2.5 text-white shadow-[0_12px_50px_rgba(0,0,0,.65)] backdrop-blur-xl sm:bottom-6 sm:right-6 sm:gap-3 sm:px-4">
      <Type aria-hidden="true" className="hidden h-5 w-5 text-amber-300 sm:block" />
      <span className="text-sm font-semibold sm:text-base">Text size</span>
      <button type="button" onClick={() => setSize((value) => Math.max(MIN_SIZE, value - STEP))} disabled={size <= MIN_SIZE} aria-label="Decrease text size" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-35">
        <Minus className="h-4 w-4" />
      </button>
      <span aria-live="polite" className="font-telemetry min-w-[3.5rem] text-center text-sm font-bold sm:text-base">{size}px</span>
      <button type="button" onClick={() => setSize((value) => Math.min(MAX_SIZE, value + STEP))} disabled={size >= MAX_SIZE} aria-label="Increase text size" className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/40 bg-amber-300/20 text-amber-100 hover:bg-amber-300/35 disabled:opacity-35">
        <Plus className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => setSize(22)} aria-label="Reset text size" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-950 text-zinc-300 hover:bg-zinc-800">
        <RotateCcw className="h-4 w-4" />
      </button>
    </section>
  );
}
