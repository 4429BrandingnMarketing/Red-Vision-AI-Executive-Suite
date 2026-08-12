import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  PenTool, Square, Circle, ArrowRight, Type, Eraser, Trash2, 
  Download, Share2, Users, Sparkles, Layers, Image as ImageIcon, 
  Check, RefreshCw, Eye, Move, Undo, Redo, Layout
} from 'lucide-react';

interface WhiteboardElement {
  id: string;
  type: 'pen' | 'rect' | 'circle' | 'arrow' | 'text' | 'sticky';
  points?: { x: number; y: number }[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
  strokeWidth: number;
  user: string;
}

interface Collaborator {
  id: string;
  name: string;
  color: string;
  cursorX: number;
  cursorY: number;
  activeTool: string;
}

const INITIAL_COLLABORATORS: Collaborator[] = [
  { id: 'c-1', name: 'Clayton (Chief Producer)', color: '#ef4444', cursorX: 240, cursorY: 180, activeTool: 'pen' },
  { id: 'c-2', name: 'Jason Salvador (Executive)', color: '#f59e0b', cursorX: 520, cursorY: 310, activeTool: 'sticky' },
  { id: 'c-3', name: 'Sarah Chen (DSP Director)', color: '#10b981', cursorX: 780, cursorY: 220, activeTool: 'rect' }
];

export function CollaborativeWhiteboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<'pen' | 'rect' | 'circle' | 'arrow' | 'text' | 'sticky' | 'eraser'>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [elements, setElements] = useState<WhiteboardElement[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // Template Preset
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');

  // Active Collaborators & Real-Time Sync State
  const [collaborators, setCollaborators] = useState<Collaborator[]>(INITIAL_COLLABORATORS);
  const [lastSavedMsg, setLastSavedMsg] = useState<string | null>(null);

  // Text / Sticky Note Input
  const [stickyText, setStickyText] = useState<string>('Hook Scene: 4K Drone shot over Hollywood Sign at dusk');

  // Redraw canvas whenever elements or template changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#09090b'; // dark zinc-950
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern if enabled
    drawGridPattern(ctx, canvas.width, canvas.height);

    // Draw Template guide lines if selected
    if (selectedTemplate === 'storyboard') {
      drawStoryboardTemplate(ctx, canvas.width, canvas.height);
    } else if (selectedTemplate === 'uiflow') {
      drawUiFlowTemplate(ctx, canvas.width, canvas.height);
    }

    // Draw all stored elements
    elements.forEach((el) => {
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.color;
      ctx.lineWidth = el.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (el.type === 'pen' && el.points && el.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(el.points[0].x, el.points[0].y);
        el.points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      } else if (el.type === 'rect' && el.x !== undefined && el.y !== undefined && el.width !== undefined && el.height !== undefined) {
        ctx.strokeRect(el.x, el.y, el.width, el.height);
      } else if (el.type === 'circle' && el.x !== undefined && el.y !== undefined && el.width !== undefined && el.height !== undefined) {
        ctx.beginPath();
        const radius = Math.sqrt(el.width * el.width + el.height * el.height) / 2;
        ctx.arc(el.x + el.width / 2, el.y + el.height / 2, Math.max(radius, 5), 0, 2 * Math.PI);
        ctx.stroke();
      } else if (el.type === 'sticky' && el.x !== undefined && el.y !== undefined) {
        ctx.fillStyle = '#18181b'; // zinc-900
        ctx.strokeStyle = el.color;
        ctx.fillRect(el.x, el.y, 180, 100);
        ctx.strokeRect(el.x, el.y, 180, 100);
        ctx.fillStyle = '#f4f4f5';
        ctx.font = '12px sans-serif';
        ctx.fillText(el.text || 'Sticky Note', el.x + 10, el.y + 30, 160);
      }
    });

    // Draw current drawing line in progress
    if (isDrawing && activeTool === 'pen' && currentPoints.length > 0) {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      currentPoints.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
  }, [elements, currentPoints, isDrawing, selectedColor, strokeWidth, selectedTemplate]);

  // Helper grid background
  const drawGridPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#27272a'; // zinc-800
    ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawStoryboardTemplate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    // 3 Storyboard Frames
    const frameW = 260;
    const frameH = 150;
    const startY = 120;
    [60, 360, 660].forEach((startX, i) => {
      ctx.strokeRect(startX, startY, frameW, frameH);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`SCENE 0${i + 1}: 4K MOTION FRAME`, startX + 10, startY - 10);
    });
    ctx.setLineDash([]);
  };

  const drawUiFlowTemplate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    // UI Flow boxes
    ctx.strokeRect(80, 140, 200, 280);
    ctx.fillText('VIEW 1: CLIENT VAULT', 90, 130);
    ctx.strokeRect(380, 140, 200, 280);
    ctx.fillText('VIEW 2: MOTION CINEMA', 390, 130);
    ctx.strokeRect(680, 140, 200, 280);
    ctx.fillText('VIEW 3: GANTT INVOICE', 690, 130);
    ctx.setLineDash([]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    if (activeTool === 'pen') {
      setCurrentPoints([{ x, y }]);
    } else if (activeTool === 'sticky') {
      const newEl: WhiteboardElement = {
        id: `el-${Date.now()}`,
        type: 'sticky',
        x,
        y,
        text: stickyText,
        color: selectedColor,
        strokeWidth,
        user: 'Clayton'
      };
      setElements(prev => [...prev, newEl]);
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'pen') {
      setCurrentPoints(prev => [...prev, { x, y }]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (activeTool === 'pen' && currentPoints.length > 0) {
      const newEl: WhiteboardElement = {
        id: `el-${Date.now()}`,
        type: 'pen',
        points: currentPoints,
        color: selectedColor,
        strokeWidth,
        user: 'Clayton'
      };
      setElements(prev => [...prev, newEl]);
      setCurrentPoints([]);
    } else if ((activeTool === 'rect' || activeTool === 'circle') && startPos) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      const newEl: WhiteboardElement = {
        id: `el-${Date.now()}`,
        type: activeTool,
        x: Math.min(startPos.x, endX),
        y: Math.min(startPos.y, endY),
        width: Math.abs(endX - startPos.x),
        height: Math.abs(endY - startPos.y),
        color: selectedColor,
        strokeWidth,
        user: 'Clayton'
      };
      setElements(prev => [...prev, newEl]);
    }
  };

  const handleClearCanvas = () => {
    setElements([]);
    setCurrentPoints([]);
  };

  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `redvision_whiteboard_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setLastSavedMsg('Exported whiteboard as high-res PNG image!');
    setTimeout(() => setLastSavedMsg(null), 3500);
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-900 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
              <span>REAL-TIME MULTI-USER COLLABORATIVE CANVAS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase">
              Creative Storyboard & Whiteboard
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5">
              Sketch out music video storyboards, UI wireframes, and stage rigging layouts alongside studio team members in real-time.
            </p>
          </div>

          {/* Active Collaborator Avatars */}
          <div className="flex items-center gap-2 bg-black p-2.5 rounded-2xl border border-zinc-800 shrink-0 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 uppercase mr-1">Live Team:</span>
            <div className="flex -space-x-2">
              {collaborators.map(c => (
                <div
                  key={c.id}
                  title={`${c.name} (${c.activeTool})`}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold text-white text-[11px] shadow-md"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-emerald-400 font-bold ml-2 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              3 Active
            </span>
          </div>
        </div>

        {/* Whiteboard Toolbar Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs bg-black p-3 rounded-2xl border border-zinc-900">
          
          {/* Drawing Tools Selector */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTool('pen')}
              className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-amber-400 focus:outline-none ${activeTool === 'pen' ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
              title="Freehand Pen"
            >
              <PenTool className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('rect')}
              className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-amber-400 focus:outline-none ${activeTool === 'rect' ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
              title="Rectangle Frame"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('circle')}
              className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-amber-400 focus:outline-none ${activeTool === 'circle' ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
              title="Circle Shape"
            >
              <Circle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('sticky')}
              className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-amber-400 focus:outline-none ${activeTool === 'sticky' ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
              title="Add Sticky Note"
            >
              <Type className="w-4 h-4" />
            </button>
          </div>

          {/* Color Palette Picker */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Color:</span>
            {['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#a855f7', '#ffffff'].map(col => (
              <button
                key={col}
                onClick={() => setSelectedColor(col)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${selectedColor === col ? 'scale-125 border-amber-400' : 'border-black'}`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>

          {/* Stroke Width Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Stroke:</span>
            {[2, 4, 8].map(w => (
              <button
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`px-2 py-1 rounded text-[10px] font-bold ${strokeWidth === w ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-400'}`}
              >
                {w === 2 ? 'Thin' : w === 4 ? 'Med' : 'Thick'}
              </button>
            ))}
          </div>

          {/* Template Preset Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Template:</span>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white px-2.5 py-1 rounded-lg text-xs font-mono focus:outline-none focus:border-red-500"
            >
              <option value="blank">Blank Grid Canvas</option>
              <option value="storyboard">4K Storyboard Grid (3 Frames)</option>
              <option value="uiflow">UI Flow Diagram Layout</option>
            </select>
          </div>

          {/* Clear & Save Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearCanvas}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
              title="Clear Whiteboard"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>

            <button
              onClick={handleDownloadCanvas}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold uppercase flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export PNG</span>
            </button>
          </div>
        </div>

        {/* Sticky Note Content Input Field when sticky tool selected */}
        {activeTool === 'sticky' && (
          <div className="p-3 rounded-2xl bg-zinc-900 border border-amber-500/50 flex items-center gap-3 font-mono text-xs">
            <span className="text-amber-400 font-bold uppercase shrink-0">Sticky Note Text:</span>
            <input
              type="text"
              value={stickyText}
              onChange={(e) => setStickyText(e.target.value)}
              placeholder="Type sticky note content..."
              className="flex-1 bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-amber-500 font-sans"
            />
            <span className="text-[10px] text-zinc-500">Click anywhere on canvas to place</span>
          </div>
        )}

        {lastSavedMsg && (
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
            {lastSavedMsg}
          </div>
        )}
      </div>

      {/* Main Interactive Canvas Drawing Stage */}
      <div className="p-2 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={980}
          height={520}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-[520px] rounded-2xl cursor-crosshair block"
        />

        {/* Overlay Cursors of Live Collaborators */}
        {collaborators.map(c => (
          <div
            key={c.id}
            className="absolute pointer-events-none transition-all duration-300 flex items-center gap-1"
            style={{ left: `${c.cursorX}px`, top: `${c.cursorY}px` }}
          >
            <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: c.color }} />
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white shadow-md" style={{ backgroundColor: c.color }}>
              {c.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
