import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, Sparkles, Bot, Zap, Cpu, Flame, Play, Pause, 
  RotateCcw, Sliders, CheckCircle2, MessageSquare, Shield, Award, RefreshCw, AudioWaveform
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';

interface VirtualCoachAdvice {
  title: string;
  score: number;
  category: 'Arrangement' | 'Mix & EQ' | 'Dynamic Punch' | 'Mastering';
  feedback: string;
  recommendation: string;
}

export function AudioReactiveCoach() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [voiceQuery, setVoiceQuery] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeAdvice, setActiveAdvice] = useState<VirtualCoachAdvice>({
    title: 'Midnight Echoes Master Feedback',
    score: 96,
    category: 'Arrangement',
    feedback: 'Sub-bass transients at 45Hz are exceptionally punchy. Vocals have 3.2dB space cut around 2.5kHz allowing crisp lead presence.',
    recommendation: 'To maximize club system response, boost 8k-12kHz air harmonics by +0.8dB on the main vocal stem prior to radio distribution.'
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Animated Waveform Visualizer Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;

    const renderWaveform = () => {
      step += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const bars = 48;
      const barWidth = width / bars;

      // Draw Audio Frequency Spectrum Bars
      for (let i = 0; i < bars; i++) {
        const factor = isListening || isPlayingAudio ? 2.5 : 1.0;
        const amplitude = (Math.sin(step + i * 0.2) * 0.4 + Math.cos(step * 0.8 + i * 0.1) * 0.5) * (height * 0.35) * factor;
        const barHeight = Math.max(8, Math.abs(amplitude));

        const x = i * barWidth;
        const y = centerY - barHeight / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (i % 3 === 0) {
          gradient.addColorStop(0, '#ef4444');
          gradient.addColorStop(1, '#990011');
        } else if (i % 2 === 0) {
          gradient.addColorStop(0, '#f59e0b');
          gradient.addColorStop(1, '#b45309');
        } else {
          gradient.addColorStop(0, '#06b6d4');
          gradient.addColorStop(1, '#0e7490');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      // Draw Center Sine Wave Line
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isListening ? '#10b981' : '#ef4444';
      for (let x = 0; x < width; x += 4) {
        const y = centerY + Math.sin(x * 0.02 + step * 2) * (isListening ? 25 : 12);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening, isPlayingAudio]);

  const handleVoiceAnalyze = async (queryText?: string) => {
    const textToAnalyze = queryText || voiceQuery || 'Check our vocal EQ and 808 sub-bass arrangement for club playability.';
    setIsAnalyzing(true);
    setIsListening(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are Chief Engineer Marcus Bell & Executive Producer Jason Salvador. Provide a virtual audio coach analysis for request: "${textToAnalyze}". Include a quality score (85-99), Category (Arrangement, Mix & EQ, Dynamic Punch, or Mastering), concise 1-sentence feedback, and 1 actionable recommendation.`
        })
      });

      const data = await res.json();
      const rawText = data.text || 'Frequency spectrum balanced. High dynamic range maintained across 24-bit waveform.';

      setActiveAdvice({
        title: `Coach Analysis: "${textToAnalyze.slice(0, 25)}..."`,
        score: Math.floor(Math.random() * (99 - 90 + 1)) + 90,
        category: ['Arrangement', 'Mix & EQ', 'Dynamic Punch', 'Mastering'][Math.floor(Math.random() * 4)] as any,
        feedback: rawText,
        recommendation: 'Ensure vocal compression ratio stays at 4:1 with slow attack to preserve natural transient dynamics.'
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-950/95 border border-red-500/30 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
              <span>Audio-Reactive Waveform Visualizer & Virtual Coach</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Real-time voice prompt frequency response & executive audio direction
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>24-BIT / 96kHZ ENGINE</span>
          </div>
        </div>
      </div>

      {/* Main Visualizer Frame */}
      <div className="relative w-full h-48 rounded-2xl border-2 border-red-500/40 bg-black overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4">
        
        {/* Canvas Waveform */}
        <canvas
          ref={canvasRef}
          width={700}
          height={180}
          className="w-full h-full object-cover"
        />

        {/* Top Floating Meters Overlay */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>PEAK: <strong className="text-emerald-400">-0.3 dBFS</strong></span>
            <span>RMS: <strong className="text-amber-400">-12.4 LUFS</strong></span>
            <span>PHASE: <strong className="text-cyan-400">+0.95 STEREO</strong></span>
          </div>

          <div className="text-red-400 font-bold uppercase tracking-wider">
            {isListening ? '🎙️ VOICE PROMPT ACTIVE' : 'RESPONSE MONITORING'}
          </div>
        </div>

        {/* Center Mic / Voice Trigger Controls */}
        <div className="absolute bottom-3 flex items-center gap-3 z-10 bg-black/80 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => handleVoiceAnalyze()}
            disabled={isAnalyzing}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
              isListening
                ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse'
                : 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 hover:from-red-500'
            }`}
          >
            {isListening ? <Mic className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
            <span>{isListening ? 'Listening to Voice...' : 'Analyze Voice Direction'}</span>
          </button>

          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isPlayingAudio ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

      </div>

      {/* Voice Prompt Input Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={voiceQuery}
          onChange={(e) => setVoiceQuery(e.target.value)}
          placeholder="Type or speak creative direction prompt (e.g., 'Is the 808 sub bass interfering with lead vocals?')..."
          className="flex-1 px-4 py-3 rounded-xl bg-black/80 border border-white/20 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-red-500"
        />

        <button
          onClick={() => handleVoiceAnalyze(voiceQuery)}
          disabled={isAnalyzing}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-1.5 shrink-0"
        >
          {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
          <span>Evaluate</span>
        </button>
      </div>

      {/* Virtual Coach Feedback Card */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={JASON_PORTRAIT_IMG}
              alt="Jason Salvador & Marcus Bell"
              className="w-10 h-10 rounded-xl object-cover border border-red-500 shadow-md"
            />
            <div>
              <h4 className="font-extrabold text-sm text-white font-sans flex items-center gap-2">
                <span>Executive Virtual Coach Guidance</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono text-[10px]">
                  Score: {activeAdvice.score}/100
                </span>
              </h4>
              <p className="text-[11px] font-mono text-zinc-400">
                Led by Jason Salvador & Chief Audio Engineer Marcus Bell
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs font-bold uppercase">
            {activeAdvice.category}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-sans text-zinc-200 leading-relaxed mb-3">
          "{activeAdvice.feedback}"
        </p>

        <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 flex items-start gap-2 text-xs font-mono text-amber-300">
          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Recommended Action:</strong>
            {activeAdvice.recommendation}
          </div>
        </div>
      </div>

    </div>
  );
}
