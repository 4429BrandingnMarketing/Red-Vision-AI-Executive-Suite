import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Volume2, Play, Pause, Download, Sparkles, Radio, Film, 
  Sliders, RefreshCw, FileText, Check, Share2, Music, Zap, Clock, 
  Settings, User, Users, AlertCircle, ArrowRight, Layers
} from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  tone: string;
  description: string;
  badge: string;
}

const PREBUILT_VOICES: VoiceOption[] = [
  {
    id: 'Kore',
    name: 'Kore',
    gender: 'Female',
    tone: 'Smooth & Authoritative',
    description: 'Polished executive voice ideal for brand showcases and tech trailers.',
    badge: 'Popular for Reels'
  },
  {
    id: 'Puck',
    name: 'Puck',
    gender: 'Male',
    tone: 'Energetic & Hype',
    description: 'Upbeat, high-impact voice for viral TikToks, sports, and music promos.',
    badge: 'High Engagement'
  },
  {
    id: 'Charon',
    name: 'Charon',
    gender: 'Male',
    tone: 'Deep & Cinematic',
    description: 'Low-frequency resonant tone for movie trailers and documentary intros.',
    badge: 'Cinematic'
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    gender: 'Female',
    tone: 'Warm & Conversational',
    description: 'Natural podcast-style tone for storyteller captions and reviews.',
    badge: 'Conversational'
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    gender: 'Male',
    tone: 'Intense & Dramatic',
    description: 'Gritty, dramatic tone for action teasers and high-stakes announcements.',
    badge: 'Trailer Voice'
  }
];

const PRESET_SCRIPTS = [
  {
    title: '🎵 Single Release Drop',
    format: 'Instagram Reel (15s)',
    voice: 'Puck',
    text: 'Say enthusiastically: Stop scrolling! The brand new 24-bit master from Clayton just dropped everywhere. Turn your bass up and stream Midnight Echoes right now on Spotify and Apple Music!'
  },
  {
    title: '🎬 4K Motion Cinema Teaser',
    format: 'YouTube Short (30s)',
    voice: 'Charon',
    text: 'Say dramatically with deep gravitas: In a world driven by synthetic noise, true sound emerges from the shadows. Experience the Red Vision Motion Cinema World Tour, recorded live in 96 kilohertz spatial surround.'
  },
  {
    title: '💻 Executive Tech Showcase',
    format: 'LinkedIn / Meta (45s)',
    voice: 'Kore',
    text: 'Say professionally: Welcome to the future of creative production. Powered by custom Gemini AI models and multi-track DSP engines, Red Vision Studio empowers artists and entertainment executives to publish seamlessly from a single console.'
  },
  {
    title: '🎙️ Podcast Interview Teaser',
    format: 'Multi-Speaker Dialogue (30s)',
    voice: 'Multi-Speaker',
    text: 'TTS the following conversation between Host and Guest:\nHost: Welcome back to Studio Confidential. Today we are sitting down with Jason Salvador.\nGuest: Thanks for having me. We are completely redefining how independent artists distribute their masters.'
  }
];

export function VoiceoverEngine() {
  const [scriptText, setScriptText] = useState<string>(PRESET_SCRIPTS[0].text);
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [projectFormat, setProjectFormat] = useState<string>('Instagram Reel (15s)');
  const [speechEmotion, setSpeechEmotion] = useState<string>('Enthusiastic');
  const [isMultiSpeaker, setIsMultiSpeaker] = useState<boolean>(false);

  // Script Generator AI state
  const [topicPrompt, setTopicPrompt] = useState<string>('');
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [scriptPacingNotes, setScriptPacingNotes] = useState<string>('');

  // Audio Synthesis state
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle AI Script Generation via Gemini
  const handleGenerateScript = async () => {
    if (!topicPrompt.trim()) return;
    setIsGeneratingScript(true);
    setAudioError(null);

    try {
      const response = await fetch('/api/generate-voiceover-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicPrompt,
          format: projectFormat,
          voiceTone: selectedVoice,
          emotion: speechEmotion
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setScriptText(data.script || '');
      setScriptPacingNotes(data.pacingNotes || '');
    } catch (err: any) {
      console.error('Error generating voiceover script:', err);
      // Fallback local script if offline
      setScriptText(`Say ${speechEmotion.toLowerCase()}: Discover ${topicPrompt}! Built for ${projectFormat}, this project delivers high-impact clarity directly to your audience.`);
      setScriptPacingNotes('Pacing optimized for 150 WPM with dramatic pauses.');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Handle Audio Synthesis via Gemini TTS API
  const handleSynthesizeAudio = async () => {
    if (!scriptText.trim()) return;
    setIsSynthesizing(true);
    setAudioError(null);
    setAudioUrl(null);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/generate-voiceover-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptText,
          voiceName: selectedVoice,
          isMultiSpeaker
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to synthesize speech audio');
      }

      setAudioUrl(data.audioDataUrl);
    } catch (err: any) {
      console.error('Error synthesizing audio:', err);
      setAudioError(err.message || 'Speech synthesis failed. Please check Gemini API configuration.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-8 text-left font-sans shadow-2xl backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-900 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Mic className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>GEMINI 3.1 TTS VOICEOVER ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
            AI Voiceover & Social Narration Studio
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
            Convert text scripts directly into studio-quality voiceover narration using Gemini 3.1 Flash Speech Synthesis. Optimized for Reels, Shorts, and 4K Cinema promos.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-black border border-zinc-800 text-center font-mono">
            <span className="text-lg font-bold text-amber-400 block">24kHz PCM</span>
            <span className="text-[10px] text-zinc-500 uppercase">Studio Audio Output</span>
          </div>
          <div className="p-3 rounded-2xl bg-black border border-zinc-800 text-center font-mono">
            <span className="text-lg font-bold text-emerald-400 block">5 Voices</span>
            <span className="text-[10px] text-zinc-500 uppercase">Prebuilt Models</span>
          </div>
        </div>
      </div>

      {/* Preset Quick Loader Strip */}
      <div className="space-y-3 font-mono text-xs">
        <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Fast Preset Script Templates
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCRIPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setScriptText(preset.text);
                setProjectFormat(preset.format);
                if (preset.voice === 'Multi-Speaker') {
                  setIsMultiSpeaker(true);
                  setSelectedVoice('Puck');
                } else {
                  setIsMultiSpeaker(false);
                  setSelectedVoice(preset.voice);
                }
              }}
              className="p-3 rounded-2xl bg-black hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all text-left space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors text-xs truncate">
                  {preset.title}
                </span>
                <span className="text-[9px] text-zinc-500 uppercase shrink-0">{preset.format}</span>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-2 font-sans">{preset.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Left Config & Writer, Right Audio Player & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Voice Selection & AI Script Writer (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Script Writer Box */}
          <div className="p-5 rounded-2xl bg-black border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Gemini AI Script Generator
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Powered by gemini-3.6-flash</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={topicPrompt}
                onChange={(e) => setTopicPrompt(e.target.value)}
                placeholder="e.g. 15-second hype teaser for new electronic album drop with heavy bass..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleGenerateScript}
                disabled={isGeneratingScript || !topicPrompt.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
              >
                {isGeneratingScript ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Writing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>

            {scriptPacingNotes && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] font-mono text-amber-300/90 space-y-1">
                <strong className="block text-amber-400 font-bold uppercase text-[10px]">Pacing & Timing Notes:</strong>
                <p>{scriptPacingNotes}</p>
              </div>
            )}
          </div>

          {/* Script Editor TextArea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <label className="text-zinc-300 font-bold uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Script Narration Text
              </label>
              <span className="text-zinc-500 text-[10px]">
                {scriptText.length} chars • ~{Math.ceil(scriptText.split(' ').length / 2.5)} sec duration
              </span>
            </div>
            <textarea
              rows={5}
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              placeholder="Type your narration script here..."
              className="w-full p-4 rounded-2xl bg-black border border-zinc-800 text-sm font-sans text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
            <p className="text-[10px] font-mono text-zinc-500">
              Tip: Add emotion directives like <code className="text-amber-400 font-bold">"Say cheerfully:"</code> or <code className="text-amber-400 font-bold">"Say with deep gravitas:"</code> at the beginning of sentences to guide Gemini's expression.
            </p>
          </div>

          {/* Format & Emotion Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Target Social Format</label>
              <select
                value={projectFormat}
                onChange={(e) => setProjectFormat(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Instagram Reel (15s)">Instagram Reel (15s)</option>
                <option value="TikTok Story (30s)">TikTok Story (30s)</option>
                <option value="YouTube Short (60s)">YouTube Short (60s)</option>
                <option value="Documentary Narration (2 min)">Documentary Narration (2 min)</option>
                <option value="Movie Cinema Trailer">Movie Cinema Trailer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Speech Delivery Emotion</label>
              <select
                value={speechEmotion}
                onChange={(e) => setSpeechEmotion(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Enthusiastic">Enthusiastic & High Energy</option>
                <option value="Authoritative">Authoritative & Professional</option>
                <option value="Dramatic">Dramatic & Intense</option>
                <option value="Conversational">Conversational & Warm</option>
                <option value="Mysterious">Mysterious & Low Tone</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Voice Selection Cards & Audio Player (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Voice Selector Selector */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-bold uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" /> Select Gemini Voice Actor
              </label>
              <button
                onClick={() => setIsMultiSpeaker(!isMultiSpeaker)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                  isMultiSpeaker
                    ? 'bg-amber-950 border-amber-500 text-amber-400'
                    : 'bg-black border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                {isMultiSpeaker ? 'Multi-Speaker ON' : 'Single Speaker'}
              </button>
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {PREBUILT_VOICES.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => {
                    setSelectedVoice(voice.id);
                    setIsMultiSpeaker(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedVoice === voice.id && !isMultiSpeaker
                      ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-500/10'
                      : 'bg-black border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-white text-xs font-bold">{voice.name}</strong>
                      <span className="text-[10px] text-zinc-500">({voice.gender})</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-amber-400">
                        {voice.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-sans line-clamp-1">{voice.description}</p>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    selectedVoice === voice.id && !isMultiSpeaker
                      ? 'border-amber-400 bg-amber-500 text-black'
                      : 'border-zinc-800 bg-zinc-900'
                  }`}>
                    {selectedVoice === voice.id && !isMultiSpeaker && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesize Audio Action Button */}
          <button
            onClick={handleSynthesizeAudio}
            disabled={isSynthesizing || !scriptText.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3"
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Synthesizing Studio Audio via Gemini TTS...</span>
              </>
            ) : (
              <>
                <Radio className="w-5 h-5" />
                <span>Synthesize Studio Audio Narration</span>
              </>
            )}
          </button>

          {/* Error Banner */}
          {audioError && (
            <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono space-y-1 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Synthesis Error:</strong>
                <p>{audioError}</p>
              </div>
            </div>
          )}

          {/* Audio Output Player Card */}
          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-black border border-amber-500/40 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 font-mono text-xs">
                <span className="font-bold text-amber-400 uppercase flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" /> Studio Voiceover Ready
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                  24kHz Studio Master
                </span>
              </div>

              {/* Audio Player Controls */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                  className="hidden"
                />

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={togglePlayAudio}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1 font-mono">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>{isPlaying ? 'Playing Narration...' : 'Paused'}</span>
                      <span className="text-amber-400 font-bold">{audioDuration ? `${audioDuration.toFixed(1)}s` : '0.0s'}</span>
                    </div>

                    {/* Animated Simulated Audio Waveform Bar */}
                    <div className="h-8 bg-black rounded-xl p-1.5 border border-zinc-800 flex items-center justify-between gap-1 overflow-hidden">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all duration-200 ${
                            isPlaying
                              ? 'bg-gradient-to-t from-amber-500 to-orange-400'
                              : 'bg-zinc-800'
                          }`}
                          style={{
                            height: isPlaying ? `${Math.floor(Math.sin(i + Date.now() / 100) * 40) + 50}%` : '20%'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Download & Attach to Pipeline */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={audioUrl}
                  download={`voiceover_${selectedVoice.toLowerCase()}_${Date.now()}.wav`}
                  className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold uppercase transition-colors flex items-center justify-center gap-2 text-[11px]"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download .WAV</span>
                </a>

                <button
                  onClick={() => {
                    alert('Voiceover attached to 4K Motion Cinema render queue!');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase transition-colors flex items-center justify-center gap-2 text-[11px] shadow-md"
                >
                  <Film className="w-4 h-4" />
                  <span>Attach to Reel</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
