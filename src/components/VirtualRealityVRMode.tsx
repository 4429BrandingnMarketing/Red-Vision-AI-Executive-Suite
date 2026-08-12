import React, { useState, useRef, useEffect } from 'react';
import { 
  Eye, Compass, RotateCcw, Plus, Sparkles, Volume2, VolumeX, Maximize2, 
  Minimize2, Move, HelpCircle, X, Check, Mic, Layers, Radio, Sun, Flame, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CLAY_RECORDING_STUDIO_IMG, 
  CLAY_FILM_EDITING_IMG, 
  CLAY_VIRTUAL_3D_OFFICE_IMG,
  CLAY_TOUR_MANAGER_IMG 
} from '../data/redVisionData.js';

export interface SpatialVRNode {
  id: string;
  yaw: number; // 0 to 360 degrees horizontal placement
  pitch: number; // -30 to +30 degrees vertical placement
  title: string;
  category: string;
  description: string;
  author: string;
  color: string;
  audioNarration?: string;
  isAiSuggested?: boolean;
}

interface VirtualRealityVRModeProps {
  onClose?: () => void;
  isEmbeddedInCanvas?: boolean;
}

export function VirtualRealityVRMode({ onClose, isEmbeddedInCanvas = false }: VirtualRealityVRModeProps) {
  // 360 Panorama Camera orientation state
  const [yaw, setYaw] = useState<number>(180); // 0 to 360 degrees
  const [pitch, setPitch] = useState<number>(0); // -40 to 40 degrees
  const [fov, setFov] = useState<number>(90); // 60 to 110 field of view
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; startYaw: number; startPitch: number }>({ x: 0, y: 0, startYaw: 0, startPitch: 0 });
  
  // VR Features
  const [activeEnv, setActiveEnv] = useState<'recording' | 'cinema' | 'hq'>('recording');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [spatialAudioEnabled, setSpatialAudioEnabled] = useState<boolean>(false);
  const [showHeadsetGrid, setShowHeadsetGrid] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<SpatialVRNode | null>(null);

  // New Note Modal
  const [showAddNoteModal, setShowAddNoteModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newCat, setNewCat] = useState<string>('Creative Direction');

  // Pre-populated 360° Spatial Brainstorming Cards positioned at angles around room
  const [spatialNodes, setSpatialNodes] = useState<SpatialVRNode[]>([
    {
      id: 'vr-1',
      yaw: 180, // Center front
      pitch: 5,
      title: '24-Bit Acoustic Master Setup',
      category: 'Audio Architecture',
      description: 'Analog SSL console routing with 3.2dB vocal space cut at 2.5kHz and spatial Dolby Atmos height speakers.',
      author: 'Marcus Bell (Audio Director)',
      color: 'border-red-500/80 bg-red-950/90 text-red-100',
      audioNarration: '24-bit acoustic master configured with Dolby Atmos spatial orientation.'
    },
    {
      id: 'vr-2',
      yaw: 110, // Left side
      pitch: -8,
      title: 'Red Vision Claymation Ep 1 Frame Sync',
      category: '4K Cinema',
      description: '24 FPS claymation stop-motion stop light keyframes synced to sub-bass audio transients.',
      author: 'Elena Rostova (Creative Director)',
      color: 'border-purple-500/80 bg-purple-950/90 text-purple-100',
      audioNarration: 'Claymation stop-motion scene synced to sub-bass transient beats.'
    },
    {
      id: 'vr-3',
      yaw: 250, // Right side
      pitch: 10,
      title: '2027 Arena Tour Door-Split Settlement',
      category: 'Live Logistics',
      description: '70/30 Door-split calculation engine with automated state tax withholding & crew per-diems.',
      author: 'Victor Vance (Manager)',
      color: 'border-amber-500/80 bg-amber-950/90 text-amber-100',
      audioNarration: '70/30 door-split settlement terms locked across 18 world arenas.'
    },
    {
      id: 'vr-4',
      yaw: 30, // Far left back
      pitch: 0,
      title: 'Red Vision 24/7 Radio Syndication Feed',
      category: 'Global Broadcast',
      description: '320kbps HD Stereo Stream with AI voice DJ host drops and Billboard BDS spin tracking.',
      author: 'Program Director Pod',
      color: 'border-rose-500/80 bg-rose-950/90 text-rose-100',
      audioNarration: '24/7 Red Vision Radio satellite feed live broadcasting to 45 syndicated stations.'
    },
    {
      id: 'vr-5',
      yaw: 320, // Far right back
      pitch: -5,
      title: 'Fashion Streetwear 3D Drop-Shipping',
      category: 'Apparel Division',
      description: 'Zero-inventory print-on-demand Shopify pipeline with 48-hour global fulfillment.',
      author: 'Apparel Specialist',
      color: 'border-indigo-500/80 bg-indigo-950/90 text-indigo-100',
      audioNarration: 'Fashion streetwear drop-shipping pipeline connected to Shopify e-commerce.'
    }
  ]);

  // Environment Backgrounds Map
  const envBackgrounds = {
    recording: CLAY_RECORDING_STUDIO_IMG,
    cinema: CLAY_FILM_EDITING_IMG,
    hq: CLAY_VIRTUAL_3D_OFFICE_IMG
  };

  // Auto-rotate 360° effect when enabled
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setYaw((prev) => (prev + 0.3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Handle Mouse / Touch Dragging for 360° Pan
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      startYaw: yaw,
      startPitch: pitch
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // Convert pixel drag to angular rotation
    let newYaw = (dragStart.startYaw - deltaX * 0.25) % 360;
    if (newYaw < 0) newYaw += 360;

    let newPitch = dragStart.startPitch + deltaY * 0.2;
    newPitch = Math.max(-35, Math.min(35, newPitch)); // Clamp pitch angle

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Add new Spatial Note at current viewing Yaw & Pitch
  const handleAddSpatialNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNode: SpatialVRNode = {
      id: `vr-${Date.now()}`,
      yaw: Math.round(yaw),
      pitch: Math.round(pitch),
      title: newTitle,
      category: newCat,
      description: newDesc || 'Spatial 360 brainstorming note created in Red Vision VR Mode.',
      author: 'Jason Salvador (Executive)',
      color: 'border-red-500/90 bg-red-950/90 text-red-100',
      isAiSuggested: true
    };

    setSpatialNodes([...spatialNodes, newNode]);
    setNewTitle('');
    setNewDesc('');
    setShowAddNoteModal(false);
    setSelectedNode(newNode);
  };

  // Speak node audio narration
  const handleSpeakNarration = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.0;
      u.pitch = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl bg-black border-2 border-red-500/50 shadow-2xl overflow-hidden select-none font-sans">
      
      {/* 360 Panoramic Background Engine */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          backgroundImage: `url(${envBackgrounds[activeEnv]})`,
          backgroundSize: '220% 160%',
          backgroundPosition: `${(yaw / 360) * 100}% ${50 + (pitch / 40) * 30}%`,
          transition: isDragging ? 'none' : 'background-position 0.1s ease-out',
          filter: 'brightness(0.75) contrast(1.15) saturate(1.2)'
        }}
      >
        {/* Subtle Crimson VR Grid overlay effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(239, 68, 68, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Headset Reticle Crosshair Grid */}
        {showHeadsetGrid && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-40">
            <div className="w-16 h-16 border border-dashed border-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </div>
            {/* Horizon indicator line */}
            <div className="absolute w-48 h-[1px] bg-red-500/40" />
            <div className="absolute h-48 w-[1px] bg-red-500/40" />
          </div>
        )}

        {/* Floating 360° Spatial Brainstorming Cards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {spatialNodes.map((node) => {
            // Calculate relative angle difference between node yaw and camera yaw
            let diffYaw = ((node.yaw - yaw + 540) % 360) - 180; // range -180 to 180
            
            // Only render cards visible within the field of view angle (e.g. within -60 to +60 deg)
            const isVisible = Math.abs(diffYaw) < fov / 1.5;
            if (!isVisible) return null;

            // X-position percentage based on relative angular offset
            const xPercent = 50 + (diffYaw / (fov / 2)) * 45;
            
            // Y-position percentage based on pitch difference
            const diffPitch = node.pitch - pitch;
            const yPercent = 50 - (diffPitch / 40) * 35;

            // Scale & Depth Perspective calculation
            const distanceFactor = Math.cos((diffYaw * Math.PI) / 180);
            const scale = Math.max(0.75, Math.min(1.1, distanceFactor * 1.05));
            const opacity = Math.max(0.3, distanceFactor);

            return (
              <motion.div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(node);
                }}
                className={`absolute p-4 rounded-2xl border ${node.color} backdrop-blur-2xl pointer-events-auto shadow-2xl cursor-pointer hover:border-white transition-all transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 group`}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  scale: scale,
                  opacity: opacity,
                  zIndex: Math.round(distanceFactor * 100)
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                    {node.category}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 font-bold">
                    Angle: {node.yaw}°
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-white font-sans leading-tight mb-1 group-hover:text-red-300 transition-colors">
                  {node.title}
                </h4>

                <p className="text-xs text-zinc-200 font-sans leading-relaxed line-clamp-3 mb-2">
                  {node.description}
                </p>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <span className="truncate">{node.author}</span>
                  {node.audioNarration && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakNarration(node.audioNarration!);
                      }}
                      className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Audio</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* VR Top Status & Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/85 border border-red-500/40 backdrop-blur-xl text-white">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40">
            <Eye className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-sans uppercase tracking-wider text-white">
                VR 360° Panoramic Studio Environment
              </span>
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono text-[9px] uppercase font-bold">
                Spatial Yaw: {Math.round(yaw)}° | Pitch: {Math.round(pitch)}°
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 hidden sm:block">
              Drag mouse/touch to look 360° around the studio space and interact with spatial cards
            </p>
          </div>
        </div>

        {/* VR Controls Toolbar */}
        <div className="flex items-center gap-2">
          
          {/* Environment Switcher */}
          <select
            value={activeEnv}
            onChange={(e) => setActiveEnv(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-red-500"
          >
            <option value="recording">24-Bit Studio 360°</option>
            <option value="cinema">4K Cinema Stage 360°</option>
            <option value="hq">Executive HQ 360°</option>
          </select>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1 ${
              autoRotate ? 'bg-red-600 border-red-500 text-white' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Auto-rotate 360 camera"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Auto Pan</span>
          </button>

          {/* Add Spatial Note */}
          <button
            onClick={() => setShowAddNoteModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1 shadow-lg shadow-red-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Spatial Card</span>
          </button>

          {/* Exit VR Mode */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
              title="Exit VR 360 Mode"
            >
              <X className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

      {/* VR Bottom Compass & Angle Indicator */}
      <div className="absolute bottom-4 left-4 right-4 z-30 p-3 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300">
        
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Compass Angle: <strong className="text-white">{Math.round(yaw)}°</strong></span>
        </div>

        {/* FOV Zoom Slider */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase text-[10px]">FOV Zoom:</span>
          <input
            type="range"
            min="60"
            max="110"
            value={fov}
            onChange={(e) => setFov(Number(e.target.value))}
            className="w-24 accent-red-500 cursor-pointer"
          />
          <span className="text-white font-bold">{fov}°</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setYaw(180);
              setPitch(0);
            }}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-500 text-[11px] text-zinc-300 hover:text-white"
          >
            Reset Orientation
          </button>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Box className="w-3.5 h-3.5" /> 360° VR Active
          </span>
        </div>

      </div>

      {/* Modal: Add Spatial Brainstorming Note */}
      <AnimatePresence>
        {showAddNoteModal && (
          <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-zinc-950 border border-red-500/40 p-6 shadow-2xl space-y-4 text-white"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-sm font-extrabold font-sans text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span>Pin Spatial Card at {Math.round(yaw)}° Angle</span>
                </h4>
                <button onClick={() => setShowAddNoteModal(false)} className="text-zinc-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleAddSpatialNote} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">Card Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Spatial Audio Equalizer Concept"
                    className="w-full bg-black border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Audio Architecture">Audio Architecture</option>
                    <option value="4K Motion Cinema">4K Motion Cinema</option>
                    <option value="Live Logistics">Live Logistics</option>
                    <option value="Global Broadcast">Global Broadcast</option>
                    <option value="Apparel Division">Apparel Division</option>
                    <option value="Creative Direction">Creative Direction</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">Brainstorming Detail</label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Enter details for this 360° spatial node..."
                    className="w-full bg-black border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNoteModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold uppercase shadow-lg shadow-red-600/30"
                  >
                    Pin Card in 360° VR
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inspector Modal for Selected Spatial Node */}
      <AnimatePresence>
        {selectedNode && (
          <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-red-500/50 p-6 shadow-2xl space-y-4 text-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-red-400 font-bold tracking-wider">
                    Spatial 360 Node Inspector ({selectedNode.yaw}° Angle)
                  </span>
                  <h3 className="text-lg font-black font-sans text-white mt-0.5">
                    {selectedNode.title}
                  </h3>
                </div>
                <button onClick={() => setSelectedNode(null)} className="p-1 rounded-lg bg-white/10 text-zinc-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <p className="text-zinc-200 leading-relaxed">{selectedNode.description}</p>
                <div className="pt-2 border-t border-white/10 flex justify-between text-zinc-400">
                  <span>Author: <strong className="text-white">{selectedNode.author}</strong></span>
                  <span>Category: <strong className="text-red-400">{selectedNode.category}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {selectedNode.audioNarration && (
                  <button
                    onClick={() => handleSpeakNarration(selectedNode.audioNarration!)}
                    className="px-4 py-2 rounded-xl bg-red-950 border border-red-700 text-red-300 font-mono text-xs font-bold flex items-center gap-2 hover:bg-red-900"
                  >
                    <Volume2 className="w-4 h-4 text-red-400" />
                    <span>Synthesize Voiceover</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono text-xs font-bold uppercase shadow-lg"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
