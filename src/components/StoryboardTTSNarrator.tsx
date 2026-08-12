import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Mic, Play, Pause, Square, Sparkles, RefreshCw, 
  Radio, Check, Download, Layers, MessageSquare, Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface TTSVoicePersona {
  id: string;
  name: string;
  role: string;
  voiceStyle: string;
  pitch: number;
  rate: number;
  avatarIcon: string;
  badge: string;
}

export const VOICE_PERSONAS: TTSVoicePersona[] = [
  {
    id: 'jason-exec',
    name: 'Jason Salvador',
    role: 'Founder & Executive Producer',
    voiceStyle: 'Deep Baritone, Confident Executive',
    pitch: 0.9,
    rate: 0.95,
    avatarIcon: '🎙️',
    badge: 'Executive Voice'
  },
  {
    id: 'elena-cinema',
    name: 'Elena Rostova',
    role: 'Creative Motion Director',
    voiceStyle: 'Artistic, Crisp Cinematic Narrative',
    pitch: 1.1,
    rate: 1.0,
    avatarIcon: '🎬',
    badge: '4K Cinema Voice'
  },
  {
    id: 'marcus-audio',
    name: 'Marcus Bell',
    role: 'Chief Audio Engineer',
    voiceStyle: 'Calm Studio Precision & Harmonic Detail',
    pitch: 0.95,
    rate: 1.05,
    avatarIcon: '🎛️',
    badge: 'Acoustic Sig Voice'
  },
  {
    id: 'radio-dj',
    name: 'Red Vision Radio DJ',
    role: '24/7 Global Station Host',
    voiceStyle: 'High-Energy Broadcast Hype & FM Stereo',
    pitch: 1.0,
    rate: 1.15,
    avatarIcon: '📻',
    badge: 'Radio Host Persona'
  }
];

interface StoryboardTTSNarratorProps {
  selectedNodeTitle?: string;
  selectedNodeDescription?: string;
  onAttachNarrationToNode?: (nodeId: string, narrationText: string) => void;
  activeNodeId?: string;
}

export function StoryboardTTSNarrator({
  selectedNodeTitle = 'Scene 1: High-Tech Studio Console',
  selectedNodeDescription = 'Jason Salvador at analog console under glowing crimson neon light. 24-bit audio meters pulsing.',
  onAttachNarrationToNode,
  activeNodeId
}: StoryboardTTSNarratorProps) {
  const [selectedPersona, setSelectedPersona] = useState<TTSVoicePersona>(VOICE_PERSONAS[0]);
  const [scriptText, setScriptText] = useState<string>(
    `Welcome to the Red Vision Creative Studio Suite. In this storyboard scene, ${selectedNodeDescription}`
  );
  const [isAiExpanding, setIsAiExpanding] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(selectedPersona.rate);
  const [speechPitch, setSpeechPitch] = useState<number>(selectedPersona.pitch);
  const [spokenWordIndex, setSpokenWordIndex] = useState<number>(0);

  // Sync script when selectedNodeDescription changes
  useEffect(() => {
    if (selectedNodeDescription) {
      setScriptText(
        `Welcome to Red Vision Creative Studio. Storyboard scene overview: ${selectedNodeTitle}. ${selectedNodeDescription}`
      );
    }
  }, [selectedNodeTitle, selectedNodeDescription]);

  // Speech Synthesis Logic
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop any ongoing speech

      if (isPlaying) {
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;

      // Find best available browser voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (selectedPersona.id === 'elena-cinema') {
          const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English'));
          if (femaleVoice) utterance.voice = femaleVoice;
        } else if (selectedPersona.id === 'radio-dj') {
          const radioVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Natural'));
          if (radioVoice) utterance.voice = radioVoice;
        } else {
          const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google US English'));
          if (maleVoice) utterance.voice = maleVoice;
        }
      }

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setSpokenWordIndex(event.charIndex);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech is supported natively in your browser.');
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // AI Script Enhancement using Gemini API
  const handleAiExpandScript = async () => {
    setIsAiExpanding(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Expand this storyboard scene into a 3-sentence professional voiceover script for a cinema trailer or studio showreel. Tone: ${selectedPersona.voiceStyle}. Raw Scene: "${selectedNodeTitle} - ${selectedNodeDescription}"`
        })
      });
      const data = await res.json();
      if (data.text) {
        setScriptText(data.text);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiExpanding(false);
    }
  };

  return (
    <div className="p-5 rounded-3xl bg-black/90 border border-red-500/30 backdrop-blur-2xl shadow-2xl space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white font-sans flex items-center gap-2">
              <span>AI Storyboard Voiceover TTS Engine</span>
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono text-[10px] uppercase">
                2027 Pro Audio
              </span>
            </h4>
            <p className="text-[11px] font-mono text-zinc-400">
              Generate studio-grade voiceover narrations for your canvas storyboards
            </p>
          </div>
        </div>

        <button
          onClick={handleAiExpandScript}
          disabled={isAiExpanding}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {isAiExpanding ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" /> : <Sparkles className="w-3.5 h-3.5 text-red-400" />}
          <span>{isAiExpanding ? 'Generating Script...' : 'AI Expand Script'}</span>
        </button>
      </div>

      {/* Voice Persona Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {VOICE_PERSONAS.map((p) => {
          const isSelected = selectedPersona.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPersona(p);
                setSpeechRate(p.rate);
                setSpeechPitch(p.pitch);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? 'bg-red-950/80 border-red-500 shadow-lg shadow-red-600/20' 
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">{p.avatarIcon}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  {p.badge}
                </span>
              </div>
              <div className="text-xs font-extrabold text-white font-sans">{p.name}</div>
              <div className="text-[10px] font-mono text-zinc-400 truncate">{p.role}</div>
            </button>
          );
        })}
      </div>

      {/* Narration Script Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Voiceover Script Content</span>
          <span className="text-red-400 font-bold">{scriptText.length} characters</span>
        </div>
        <textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          rows={3}
          className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs font-mono text-zinc-100 focus:outline-none focus:border-red-500 leading-relaxed"
          placeholder="Enter narration text for storyboard..."
        />
      </div>

      {/* Speech Control Bar & Audio Spectrum */}
      <div className="p-3.5 rounded-2xl bg-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Play/Pause/Stop Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause Narration' : 'Synthesize & Speak'}</span>
          </button>

          {isPlaying && (
            <button
              onClick={handleStop}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>

        {/* Animated Speech Spectrum Bar */}
        <div className="flex items-center gap-1.5 h-7 px-3 bg-zinc-950 rounded-xl border border-white/10 flex-1 max-w-xs justify-center">
          {Array.from({ length: 24 }).map((_, i) => {
            const barHeight = isPlaying ? Math.floor(Math.random() * 80) + 20 : 25;
            return (
              <div
                key={i}
                style={{ height: `${barHeight}%` }}
                className={`w-1 rounded-full transition-all duration-100 ${
                  isPlaying ? 'bg-gradient-to-t from-red-600 to-rose-400' : 'bg-zinc-800'
                }`}
              />
            );
          })}
        </div>

        {/* Sliders for Pitch & Rate */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>Rate:</span>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(Number(e.target.value))}
              className="w-16 accent-red-500 cursor-pointer"
            />
            <span className="text-white font-bold">{speechRate}x</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Pitch:</span>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={speechPitch}
              onChange={(e) => setSpeechPitch(Number(e.target.value))}
              className="w-16 accent-red-500 cursor-pointer"
            />
            <span className="text-white font-bold">{speechPitch}</span>
          </div>
        </div>

      </div>

      {/* Attach to Active Storyboard Node Button */}
      {activeNodeId && onAttachNarrationToNode && (
        <div className="pt-2 border-t border-white/10 flex justify-end">
          <button
            onClick={() => onAttachNarrationToNode(activeNodeId, scriptText)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-900 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Attach Narration to Selected Canvas Node</span>
          </button>
        </div>
      )}

    </div>
  );
}
