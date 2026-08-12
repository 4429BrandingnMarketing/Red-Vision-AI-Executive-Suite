import React, { useRef, useState, useEffect } from 'react';
import { 
  Pencil, Square, ArrowRight, Type, StickyNote, Eraser, Trash2, Download, 
  Sparkles, Bot, Shield, Building2, Palette, Cpu, Shirt, Zap, RefreshCw, 
  Layers, CheckCircle2, Plus, Move, LayoutGrid, Image as ImageIcon, Volume2, Mic, Eye, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VIRTUAL_STAFF_AGENTS } from './CollaborativeStaffChat.js';
import { StoryboardTTSNarrator } from './StoryboardTTSNarrator.js';
import { VirtualRealityVRMode } from './VirtualRealityVRMode.js';

interface CanvasNode {
  id: string;
  type: 'storyboard' | 'flow' | 'sticky' | 'legal';
  title: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  agentName?: string;
  status?: string;
  narration?: string;
}

export function CollaborativeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser' | 'sticky' | 'line'>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#ef4444');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-creative');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [showTtsNarrator, setShowTtsNarrator] = useState<boolean>(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('n1');
  const [isVrModeActive, setIsVrModeActive] = useState<boolean>(false);

  // Pre-populated Co-created Storyboard & Project Flow Nodes
  const [nodes, setNodes] = useState<CanvasNode[]>([
    {
      id: 'n1',
      type: 'storyboard',
      title: 'Scene 1: High-Tech Recording Studio',
      description: 'Jason Salvador at analog console under glowing crimson red neon light. 24-bit audio meters pulsing.',
      x: 40,
      y: 40,
      width: 220,
      height: 140,
      color: 'border-red-500/60 bg-red-950/40',
      agentName: 'Elena Rostova (Creative Director)',
      status: 'Storyboarding Approved'
    },
    {
      id: 'n2',
      type: 'storyboard',
      title: 'Scene 2: Tour Bus & Executive Suite',
      description: 'Claymation character reviewing 300M+ audience analytics on tablet while en route to festival headline.',
      x: 300,
      y: 40,
      width: 220,
      height: 140,
      color: 'border-purple-500/60 bg-purple-950/40',
      agentName: 'Elena Rostova (Creative Director)',
      status: 'Rendering Frame 120'
    },
    {
      id: 'n3',
      type: 'flow',
      title: 'Spotify Editorial & Radio Pitching',
      description: 'B2B outreach to top 50 global hip-hop/R&B playlist curators. Target: 15M initial stream impressions.',
      x: 40,
      y: 220,
      width: 220,
      height: 130,
      color: 'border-emerald-500/60 bg-emerald-950/40',
      agentName: 'Victor Vance (Marketing)',
      status: 'In Pitching Queue'
    },
    {
      id: 'n4',
      type: 'legal',
      title: 'Master & Publishing Split Agreement',
      description: '50/50 Master rights, ISRC registered with ASCAP/BMI. Door-split contract locked at 70/30 venue split.',
      x: 300,
      y: 220,
      width: 220,
      height: 130,
      color: 'border-amber-500/60 bg-amber-950/40',
      agentName: 'Solomon Sterling, Esq. (Legal)',
      status: 'Contracts Signed ✓'
    }
  ]);

  const colorPalette = [
    { label: 'Red Vision Crimson', value: '#ef4444' },
    { label: 'Executive Gold', value: '#f59e0b' },
    { label: '4K Cyan', value: '#06b6d4' },
    { label: 'Neon Emerald', value: '#10b981' },
    { label: 'Pure White', value: '#ffffff' },
    { label: 'Midnight Zinc', value: '#3f3f46' }
  ];

  // Draw setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution for sharp drawing
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'eraser') {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = brushSize * 4;
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearDrawingCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // AI Staff Co-creation helper
  const handleAiStaffGenerateNode = async (agentId: string) => {
    setIsAiGenerating(true);
    const agent = VIRTUAL_STAFF_AGENTS.find(a => a.id === agentId) || VIRTUAL_STAFF_AGENTS[0];

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a concise title and 1-sentence description for a music studio project flow step from department ${agent.department} led by ${agent.name}.`
        })
      });
      const data = await res.json();
      const text = data.text || 'Co-created executive milestone generated with Red Vision standards.';

      const newNode: CanvasNode = {
        id: `node-${Date.now()}`,
        type: agent.department === 'Creative' ? 'storyboard' : agent.department === 'Legal' ? 'legal' : 'flow',
        title: `${agent.department} Milestone: ${agent.name.split(' ')[0]}`,
        description: text.slice(0, 110) + '...',
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 180) + 120,
        width: 230,
        height: 135,
        color: agent.department === 'Legal' ? 'border-amber-500/60 bg-amber-950/40' :
               agent.department === 'Marketing' ? 'border-red-500/60 bg-red-950/40' :
               agent.department === 'Creative' ? 'border-purple-500/60 bg-purple-950/40' : 'border-cyan-500/60 bg-cyan-950/40',
        agentName: `${agent.name} (${agent.department})`,
        status: 'AI Co-Created Step'
      };

      setNodes(prev => [...prev, newNode]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'red-vision-storyboard-flow.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="rounded-3xl bg-zinc-950/95 border border-red-500/30 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col space-y-4">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
              <span>Collaborative Digital Storyboard & Flow Canvas</span>
              <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-800 text-red-400 font-mono text-[10px] uppercase">
                AI Staff Co-Creation
              </span>
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Sketch visual storyboards & project flows live alongside virtual AI staff members
            </p>
          </div>
        </div>

        {/* AI Co-Creator Quick Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase mr-1 hidden sm:inline">
            Request AI Staff Node:
          </span>
          {VIRTUAL_STAFF_AGENTS.slice(0, 4).map((agent) => {
            const Icon = agent.avatarIcon;
            return (
              <button
                key={agent.id}
                onClick={() => handleAiStaffGenerateNode(agent.id)}
                disabled={isAiGenerating}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Icon className="w-3.5 h-3.5 text-red-400" />
                <span>+ {agent.department}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas Toolbar & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/80 border border-white/10">
        
        {/* Drawing Tool Selectors */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTool('pen')}
            className={`p-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeTool === 'pen'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Sketch Pen</span>
          </button>

          <button
            onClick={() => setActiveTool('eraser')}
            className={`p-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeTool === 'eraser'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Eraser</span>
          </button>

          {/* Color Palette Picker */}
          <div className="flex items-center gap-1 pl-3 border-l border-white/10">
            {colorPalette.map((c) => (
              <button
                key={c.value}
                onClick={() => { setSelectedColor(c.value); setActiveTool('pen'); }}
                title={c.label}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  selectedColor === c.value ? 'scale-125 border-white' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Brush Size Slider */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>Stroke Size:</span>
          <input
            type="range"
            min="1"
            max="12"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20 accent-red-500 cursor-pointer"
          />
          <span className="text-white font-bold w-4">{brushSize}px</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearDrawingCanvas}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-red-400 hover:bg-white/10 font-mono text-xs font-bold transition-all flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Ink</span>
          </button>

          <button
            onClick={() => setIsVrModeActive(!isVrModeActive)}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
              isVrModeActive
                ? 'bg-red-600 border-red-400 text-white shadow-red-600/40'
                : 'bg-red-950/80 border-red-500/60 text-red-300 hover:bg-red-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>{isVrModeActive ? 'Exit VR 360°' : 'VR 360° Mode'}</span>
          </button>

          <button
            onClick={() => setShowTtsNarrator(!showTtsNarrator)}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
              showTtsNarrator
                ? 'bg-red-950 border-red-500 text-white shadow-red-600/20'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-red-400" />
            <span>AI Voiceover TTS</span>
          </button>

          <button
            onClick={handleDownloadCanvas}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Image</span>
          </button>
        </div>

      </div>

      {/* VR 360° Panoramic Mode Container Overlay */}
      {isVrModeActive ? (
        <VirtualRealityVRMode onClose={() => setIsVrModeActive(false)} isEmbeddedInCanvas={true} />
      ) : (
        /* Main Interactive Stage (Canvas + Overlay AI Nodes) */
        <div className="relative w-full h-[420px] rounded-2xl border-2 border-red-500/30 bg-black overflow-hidden shadow-inner group">
        
        {/* HTML5 Freehand Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute inset-0 w-full h-full z-10 cursor-crosshair"
        />

        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ef4444 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Co-created Storyboard & Project Flow Cards */}
        <div className="absolute inset-0 p-4 pointer-events-none z-20 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <motion.div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-2xl border ${
                    isSelected ? 'ring-2 ring-red-500 border-red-400 bg-red-950/60' : node.color
                  } backdrop-blur-xl pointer-events-auto shadow-2xl relative group/card transition-all cursor-pointer hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                      {node.status || 'Active Node'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNodes(prev => prev.filter(n => n.id !== node.id));
                      }}
                      className="text-zinc-500 hover:text-white text-xs opacity-0 group-hover/card:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>

                  <h4 className="font-extrabold text-xs sm:text-sm text-white font-sans leading-tight mb-1">
                    {node.title}
                  </h4>

                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-3">
                    {node.description}
                  </p>

                  {node.narration && (
                    <div className="p-2 mb-2 rounded-lg bg-red-950/80 border border-red-800 text-[10px] font-mono text-red-200 flex items-center gap-1.5">
                      <Volume2 className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{node.narration}</span>
                    </div>
                  )}

                  {node.agentName && (
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-red-400" />
                        <span>{node.agentName}</span>
                      </div>
                      {isSelected && <span className="text-red-400 font-bold">Selected for Voiceover</span>}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
      )}

      {/* Storyboard AI Text-to-Speech Voiceover Panel */}
      {showTtsNarrator && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-2"
        >
          <StoryboardTTSNarrator
            selectedNodeTitle={nodes.find(n => n.id === selectedNodeId)?.title}
            selectedNodeDescription={nodes.find(n => n.id === selectedNodeId)?.description}
            activeNodeId={selectedNodeId}
            onAttachNarrationToNode={(nodeId, text) => {
              setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, narration: text } : n));
            }}
          />
        </motion.div>
      )}

    </div>
  );
}
