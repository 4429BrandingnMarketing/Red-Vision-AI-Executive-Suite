import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Loader2, Sparkles, Sliders, Cpu, Disc, Film, 
  ShieldCheck, AlertCircle, Play, RotateCcw, ArrowRight, Zap 
} from 'lucide-react';

export interface GenerationStep {
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  estimatedSec: number;
}

const DEFAULT_STEPS: GenerationStep[] = [
  {
    id: 1,
    title: 'Prompt & Spec Validation',
    subtitle: 'Analyzing style, ISRCs & harmonic parameters',
    detail: 'Gemini 3.5 Flash is verifying BPM grid, acoustic frequency bounds, and ISRC metadata.',
    estimatedSec: 2,
  },
  {
    id: 2,
    title: 'Neural Model Cluster Sync',
    subtitle: 'Initializing Lyria-3 & Gemini Omni backend',
    detail: 'Allocating high-throughput GPU memory and initializing 24-bit audio / 4K cinema pipelines.',
    estimatedSec: 4,
  },
  {
    id: 3,
    title: 'Real-Time Synthesis',
    subtitle: 'Generating stems & rendering motion frames',
    detail: 'Synthesizing multi-track drum, bass, and synth stems or rendering 4K motion video keyframes.',
    estimatedSec: 6,
  },
  {
    id: 4,
    title: 'Master QC & Final Export',
    subtitle: 'Verifying spectrum & compiling download package',
    detail: 'Performing dynamic range analysis, transient shaping, and locking final release deliverables.',
    estimatedSec: 3,
  },
];

interface GenerationProgressStepperProps {
  isGenerating?: boolean;
  activePhaseIndex?: number;
  onComplete?: () => void;
  title?: string;
  className?: string;
}

export function GenerationProgressStepper({
  isGenerating = false,
  activePhaseIndex,
  onComplete,
  title = 'AI Generation Pipeline Progress',
  className = '',
}: GenerationProgressStepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(activePhaseIndex ?? 0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(0);

  // Sync prop if passed externally
  useEffect(() => {
    if (activePhaseIndex !== undefined) {
      setCurrentStep(activePhaseIndex);
      setProgressPercent(Math.min(100, Math.round(((activePhaseIndex + 1) / DEFAULT_STEPS.length) * 100)));
    }
  }, [activePhaseIndex]);

  // Handle live simulation when isGenerating is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let secInterval: NodeJS.Timeout;

    if (isGenerating || isSimulating) {
      setElapsedSec(0);
      secInterval = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);

      // Auto step sequence if simulated
      if (isSimulating) {
        setCurrentStep(0);
        setProgressPercent(15);

        const s1 = setTimeout(() => { setCurrentStep(1); setProgressPercent(40); }, 2000);
        const s2 = setTimeout(() => { setCurrentStep(2); setProgressPercent(75); }, 5000);
        const s3 = setTimeout(() => { 
          setCurrentStep(3); 
          setProgressPercent(100); 
          setIsSimulating(false);
          if (onComplete) onComplete();
        }, 9000);

        return () => {
          clearTimeout(s1);
          clearTimeout(s2);
          clearTimeout(s3);
          clearInterval(secInterval);
        };
      }
    } else {
      setElapsedSec(0);
    }

    return () => {
      clearInterval(timer);
      clearInterval(secInterval);
    };
  }, [isGenerating, isSimulating]);

  const handleStartSimulatedPipeline = () => {
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStep(0);
    setProgressPercent(0);
    setElapsedSec(0);
  };

  return (
    <div className={`w-full bg-zinc-950/90 border border-red-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-left font-sans relative overflow-hidden ${className}`}>
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 font-mono text-[10px] font-bold">
              PHASE {currentStep + 1} OF {DEFAULT_STEPS.length}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Real-time multi-stage telemetry tracking for AI master outputs.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {(isGenerating || isSimulating) && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black border border-red-500/40 text-red-400 font-mono text-xs font-bold">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
              <span>{elapsedSec}s elapsed</span>
            </div>
          )}

          {!isGenerating && !isSimulating && (
            <button
              onClick={handleStartSimulatedPipeline}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/20"
            >
              <Play className="w-3.5 h-3.5 text-white" />
              <span>Test Pipeline</span>
            </button>
          )}

          {(progressPercent === 100 || isSimulating) && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Reset Stepper"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-6">
        <div className="flex justify-between items-center text-[11px] font-mono">
          <span className="text-zinc-400">Total Generation Progress:</span>
          <span className="text-red-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800 relative">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full shadow-lg shadow-red-600/50"
          />
        </div>
      </div>

      {/* 4-Step Interactive Stepper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {DEFAULT_STEPS.map((step, idx) => {
          const isDone = idx < currentStep || (idx === currentStep && progressPercent === 100);
          const isActive = idx === currentStep && progressPercent < 100 && (isGenerating || isSimulating);
          const isPending = idx > currentStep;

          return (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.02 }}
              className={`p-3.5 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                  : isActive
                  ? 'bg-red-950/40 border-red-500 text-white shadow-xl shadow-red-950/50 ring-1 ring-red-500/30'
                  : 'bg-black/60 border-zinc-800/80 text-zinc-400'
              }`}
            >
              {/* Step Header */}
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-500 text-black'
                    : isActive
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/50 animate-pulse'
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-black" /> : step.id}
                </span>

                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {isDone ? 'Completed' : isActive ? 'Processing...' : 'Pending'}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold font-mono text-white leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {step.subtitle}
                </p>
              </div>

              {/* Active Step Details Drawer */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pt-2 border-t border-red-500/30 text-[10px] font-mono text-red-300 bg-red-950/50 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-1.5 mb-1 font-bold">
                    <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                    <span>ACTIVE TELEMETRY:</span>
                  </div>
                  <span>{step.detail}</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
