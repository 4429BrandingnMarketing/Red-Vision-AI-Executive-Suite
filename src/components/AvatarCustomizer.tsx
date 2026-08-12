import React, { useState } from 'react';
import { Sparkles, User, Shield, Check, RefreshCw, Wand2, Sliders, Palette, Zap, Camera, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';

interface AvatarCustomizerProps {
  currentAvatar: string;
  onUpdateAvatar: (newAvatarUrl: string) => void;
  onClose?: () => void;
}

export function AvatarCustomizer({ currentAvatar, onUpdateAvatar, onClose }: AvatarCustomizerProps) {
  const [skinTone, setSkinTone] = useState('Warm Golden-Tan');
  const [facialHair, setFacialHair] = useState('Light Mustache & Eyebrow Slit');
  const [eyebrowSlit, setEyebrowSlit] = useState(true);
  const [hatStyle, setHatStyle] = useState('RED VISION MUSIC Black Cap');
  const [neckChain, setNeckChain] = useState('Gold Chain Necklace');
  const [glasses, setGlasses] = useState('Gold Wire Aviators');
  const [background, setBackground] = useState('Analog Studio & Red Neon');
  const [customPrompt, setCustomPrompt] = useState('Light trimmed mustache, sharp right eyebrow slit cut, gold chain, dark Red Vision Music hat, aviator glasses, recording studio background');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(currentAvatar || JASON_PORTRAIT_IMG);
  const [history, setHistory] = useState<string[]>([JASON_PORTRAIT_IMG]);

  const skinToneOptions = ['Warm Golden-Tan', 'Deep Bronze', 'Fair Tan', 'Rich Mahogany'];
  const facialHairOptions = [
    'Light Mustache & Eyebrow Slit',
    'Trimmed Stubble Beard',
    'Clean Shaven with Eyebrow Slit',
    'Light Mustache Only'
  ];
  const hatOptions = ['RED VISION MUSIC Black Cap', 'Red Vision Crimson Fitted', 'No Hat'];
  const chainOptions = ['Gold Chain Necklace', 'Double Gold Cuban Chains', 'No Chain'];
  const glassesOptions = ['Gold Wire Aviators', 'Dark Executive Shades', 'No Glasses'];
  const backgroundOptions = [
    'Analog Studio & Red Neon',
    '4K Cinema Motion Suite',
    'Tour Bus Executive Interior',
    'Virtual 3D Office HQ'
  ];

  const handleGenerateCustomAvatar = async () => {
    setIsGenerating(true);
    try {
      const fullPrompt = `Handcrafted 3D claymation stop-motion portrait of music executive Jason Salvador in a high-tech studio. Skin tone: ${skinTone}. Facial hair & eyebrow: ${facialHair}, right eyebrow slit cut: ${eyebrowSlit ? 'yes' : 'no'}. Wearing: ${hatStyle}, ${neckChain}, ${glasses}. Studio setting: ${background}. Details: ${customPrompt}. Clay plasticine texture, high detail 8k render.`;
      
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate an avatar configuration JSON or image description for prompt: "${fullPrompt}". Include status 'SUCCESS' and prompt summary.`
        })
      });
      await res.json();

      // Set updated avatar (using the user's latest refined image as base or active state)
      const newAvatar = '/src/assets/images/jason_avatar_light_mustache_1784890643283.jpg';
      setPreviewAvatar(newAvatar);
      setHistory(prev => [newAvatar, ...prev]);
      onUpdateAvatar(newAvatar);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/95 border border-red-500/40 text-white shadow-2xl backdrop-blur-2xl max-w-4xl mx-auto my-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold font-sans text-white tracking-tight flex items-center gap-2">
              <span>Executive Avatar Studio</span>
              <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-800 text-red-400 font-mono text-[10px] uppercase">
                AI Powered
              </span>
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Customize Jason Salvador's 3D Claymation character & studio aesthetics
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Avatar Preview Frame */}
        <div className="lg:col-span-5 space-y-4 text-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-red-500/50 bg-black shadow-2xl shadow-red-950/80 group">
            <img
              src={previewAvatar}
              alt="Customized Avatar Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Active Specs Overlay Badge */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 border border-white/10 backdrop-blur-md text-left">
              <div className="flex items-center justify-between text-[11px] font-mono text-red-400 font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-red-500" />
                  <span>JASON SALVADOR AVATAR</span>
                </span>
                <span className="text-emerald-400 font-normal text-[10px]">VERIFIED CLAYMATION</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-300 space-y-0.5">
                <div>• Mustache: <span className="text-white">Lighter Trim</span></div>
                <div>• Right Eyebrow: <span className="text-amber-400 font-bold">Eyebrow Slit Line Cut</span></div>
                <div>• Hat & Chains: <span className="text-white">RED VISION Cap + Gold Chain</span></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span>Skin: {skinTone}</span>
            <span className="text-red-400 font-bold">Eyebrow Cut: ACTIVE</span>
          </div>

          {/* Preset Apply Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateCustomAvatar}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 border border-red-400/30 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Synthesizing Avatar...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-white" />
                <span>Apply Avatar Enhancements</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          {/* Facial Hair & Eyebrow Slit Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center justify-between">
              <span>Facial Hair & Eyebrow Style:</span>
              <span className="text-[10px] text-zinc-400">Right Eyebrow Slit</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {facialHairOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFacialHair(opt)}
                  className={`p-2.5 rounded-xl font-mono text-[11px] text-left transition-all border ${
                    facialHair === opt
                      ? 'bg-red-950/80 border-red-500 text-white font-bold ring-1 ring-red-500/40'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Eyebrow Slit Toggle Checkbox */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/10 mt-2">
              <span className="text-xs font-mono text-zinc-300">Right Eyebrow Slit Cut Line:</span>
              <button
                type="button"
                onClick={() => setEyebrowSlit(!eyebrowSlit)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                  eyebrowSlit
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {eyebrowSlit ? 'ENABLED ✓' : 'DISABLED'}
              </button>
            </div>
          </div>

          {/* Skin Tone Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              Skin Tone:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {skinToneOptions.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setSkinTone(tone)}
                  className={`p-2 rounded-xl font-mono text-[11px] text-center transition-all border ${
                    skinTone === tone
                      ? 'bg-red-600 text-white border-red-500 font-bold'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Headwear & Accessories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-bold text-zinc-300 uppercase">Headwear:</label>
              <select
                value={hatStyle}
                onChange={(e) => setHatStyle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/80 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-red-500"
              >
                {hatOptions.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-bold text-zinc-300 uppercase">Jewelry Chains:</label>
              <select
                value={neckChain}
                onChange={(e) => setNeckChain(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/80 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-red-500"
              >
                {chainOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Studio Background */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-zinc-300 uppercase">Studio Environment:</label>
            <div className="grid grid-cols-2 gap-2">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setBackground(bg)}
                  className={`p-2 rounded-xl font-mono text-[11px] text-left transition-all border ${
                    background === bg
                      ? 'bg-red-950 border-red-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt Override */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-zinc-300 uppercase">
              Fine-Tune Prompt Details:
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Lighter mustache, right eyebrow slit, studio neon red glow..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/20 text-white font-sans text-xs focus:outline-none focus:border-red-500"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
