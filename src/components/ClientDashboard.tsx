import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, Disc, Film, FileText, Download, Share2, Sparkles, Filter, 
  Search, ShieldCheck, CheckCircle2, TrendingUp, HardDrive, Music, 
  Lock, Clock, ArrowUpRight, Zap, RefreshCw, Eye, Tag, Upload, FileUp, 
  FolderPlus, X, Check, Image, Package, FileCode, DollarSign, PenTool, Contrast
} from 'lucide-react';
import { AssetCompletionData } from './GenerationCompletionModal.js';
import { InvoicingTab } from './InvoicingTab.js';
import { CollaborativeWhiteboard } from './CollaborativeWhiteboard.js';

interface ProjectFolder {
  id: string;
  name: string;
  artist: string;
  category: 'AUDIO' | 'VIDEO' | 'ARTWORK' | 'DOCUMENT' | 'PACKAGE';
  fileCount: number;
  totalSize: string;
  color: string;
}

const DEFAULT_PROJECT_FOLDERS: ProjectFolder[] = [
  { id: 'f-1', name: 'Siren Beats / Midnight Echoes', artist: 'Siren Beats', category: 'AUDIO', fileCount: 8, totalSize: '412.5 MB', color: 'from-red-600 to-rose-700' },
  { id: 'f-2', name: 'Marcus Vance / Neon Odyssey 4K', artist: 'Marcus Vance', category: 'VIDEO', fileCount: 4, totalSize: '1.8 GB', color: 'from-amber-600 to-orange-700' },
  { id: 'f-3', name: 'Elena Rostova / Cyberpunk 8K Artwork', artist: 'Elena Rostova', category: 'ARTWORK', fileCount: 12, totalSize: '240.0 MB', color: 'from-purple-600 to-pink-700' },
  { id: 'f-4', name: 'Darius Thorne / ISRC Legal Contracts', artist: 'Darius Thorne', category: 'DOCUMENT', fileCount: 3, totalSize: '18.4 MB', color: 'from-emerald-600 to-teal-700' },
  { id: 'f-5', name: 'Kaelen Cross / VR Spatial Audio Stems', artist: 'Kaelen Cross', category: 'PACKAGE', fileCount: 6, totalSize: '890.2 MB', color: 'from-cyan-600 to-blue-700' }
];

interface ClientDeliverableItem {
  id: string;
  title: string;
  artist: string;
  category: 'AUDIO' | 'VIDEO' | 'ARTWORK' | 'DOCUMENT' | 'PACKAGE';
  format: string;
  size: string;
  specs: string;
  createdAt: string;
  status: 'Delivered' | 'Ready for Distro' | 'Pending QA';
  thumbnailUrl: string;
  isrc?: string;
}

const INITIAL_CLIENT_DELIVERABLES: ClientDeliverableItem[] = [
  {
    id: 'del-1',
    title: 'Midnight Echoes 24-Bit Radio Master',
    artist: 'Siren Beats',
    category: 'AUDIO',
    format: 'WAV 24-Bit / 96kHz',
    size: '48.2 MB',
    specs: 'BPM: 128 | Key: F Minor | Dynamic Range: +14LUFS',
    createdAt: 'Today, 02:15 PM',
    status: 'Delivered',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    isrc: 'US-RED-26-00109'
  },
  {
    id: 'del-2',
    title: 'Neon Odyssey 4K Cinema Motion Trailer',
    artist: 'Marcus Vance',
    category: 'VIDEO',
    format: 'ProRes 422 HQ / 4K UHD',
    size: '1.2 GB',
    specs: 'Resolution: 3840x2160 | 60fps | HDR10',
    createdAt: 'Yesterday, 06:40 PM',
    status: 'Ready for Distro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    isrc: 'US-RED-26-00110'
  },
  {
    id: 'del-3',
    title: 'Acoustic Sig Stem Separated Package (Drums/Bass/Synths)',
    artist: 'Siren Beats',
    category: 'AUDIO',
    format: 'ZIP (4 Stems WAV)',
    size: '184.5 MB',
    specs: 'Isolated Stems: Drums, Sub-Bass, Synths, Vocals',
    createdAt: 'Aug 10, 2026',
    status: 'Delivered',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    isrc: 'US-RED-26-00111'
  },
  {
    id: 'del-4',
    title: 'Cyberpunk Album Artwork & 3D Claymerch Mockups',
    artist: 'Elena Rostova',
    category: 'ARTWORK',
    format: 'PNG 8K / OBJ 3D',
    size: '95.1 MB',
    specs: '8000x8000px CMYK 300DPI Print & Web Digital',
    createdAt: 'Aug 08, 2026',
    status: 'Delivered',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'del-5',
    title: 'Global Tour Rider & ISRC Legal Distribution Contract',
    artist: 'Darius Thorne',
    category: 'DOCUMENT',
    format: 'PDF Legal Watermarked',
    size: '4.8 MB',
    specs: 'Signed Executive Agreement & Licensing Rights',
    createdAt: 'Aug 05, 2026',
    status: 'Ready for Distro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'del-6',
    title: 'VR 360° Interactive Spatial Mix Audio Session',
    artist: 'Kaelen Cross',
    category: 'PACKAGE',
    format: 'Binaural VR Package',
    size: '620.0 MB',
    specs: 'Ambisonics 3D Audio & VR Scene Asset',
    createdAt: 'Aug 02, 2026',
    status: 'Pending QA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
  },
];

interface ClientDashboardProps {
  onSelectAssetForModal: (asset: AssetCompletionData) => void;
  onOpenShareModal: (asset: AssetCompletionData) => void;
}

export function ClientDashboard({ onSelectAssetForModal, onOpenShareModal }: ClientDashboardProps) {
  const [activeClientTab, setActiveClientTab] = useState<'vault' | 'invoicing' | 'whiteboard'>('vault');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [deliverables, setDeliverables] = useState<ClientDeliverableItem[]>(INITIAL_CLIENT_DELIVERABLES);
  const [folders, setFolders] = useState<ProjectFolder[]>(DEFAULT_PROJECT_FOLDERS);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('f-1');

  // Drag and Drop state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadingFiles, setUploadingFiles] = useState<{ name: string; progress: number; size: string; folderName: string }[]>([]);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProcessFiles = (files: FileList | File[], targetFolderId?: string) => {
    const destFolderId = targetFolderId || selectedFolderId;
    const destFolder = folders.find(f => f.id === destFolderId) || folders[0];

    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    fileList.forEach((file) => {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = `${fileSizeMB} MB`;

      // Determine category from file extension
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let category: 'AUDIO' | 'VIDEO' | 'ARTWORK' | 'DOCUMENT' | 'PACKAGE' = 'AUDIO';
      let format = 'WAV 24-Bit / 96kHz';
      let thumb = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

      if (['mp4', 'mov', 'mkv', 'webm', 'avi'].includes(ext)) {
        category = 'VIDEO';
        format = `ProRes 422 / ${ext.toUpperCase()}`;
        thumb = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80';
      } else if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'psd'].includes(ext)) {
        category = 'ARTWORK';
        format = `8K Image / ${ext.toUpperCase()}`;
        thumb = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
      } else if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
        category = 'DOCUMENT';
        format = `PDF Document / ${ext.toUpperCase()}`;
        thumb = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80';
      } else if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
        category = 'PACKAGE';
        format = `Archive Stems Package / ${ext.toUpperCase()}`;
        thumb = 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80';
      }

      // Simulate Upload Progress
      setUploadingFiles(prev => [...prev, { name: file.name, progress: 10, size: sizeStr, folderName: destFolder.name }]);

      let currentProg = 10;
      const interval = setInterval(() => {
        currentProg += 30;
        if (currentProg >= 100) {
          clearInterval(interval);
          setUploadingFiles(prev => prev.filter(f => f.name !== file.name));

          // Create new deliverable
          const newDeliverable: ClientDeliverableItem = {
            id: `del-${Date.now()}-${Math.floor(Math.random()*1000)}`,
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: destFolder.artist,
            category,
            format,
            size: sizeStr,
            specs: `Uploaded Raw Asset | Folder: ${destFolder.name}`,
            createdAt: 'Just Now',
            status: 'Delivered',
            thumbnailUrl: thumb,
            isrc: category === 'AUDIO' || category === 'VIDEO' ? `US-RED-26-${Math.floor(Math.random()*90000+10000)}` : undefined
          };

          setDeliverables(prev => [newDeliverable, ...prev]);

          // Update folder file count
          setFolders(prev => prev.map(f => f.id === destFolder.id ? { ...f, fileCount: f.fileCount + 1 } : f));

          setUploadSuccessMsg(`Successfully uploaded "${file.name}" to folder "${destFolder.name}"`);
          setTimeout(() => setUploadSuccessMsg(null), 4000);
        } else {
          setUploadingFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress: currentProg } : f));
        }
      }, 300);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, targetFolderId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files, targetFolderId);
    }
  };

  const filteredDeliverables = deliverables.filter((item) => {
    const matchesCategory = activeCategoryFilter === 'ALL' || item.category === activeCategoryFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.isrc && item.isrc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`w-full space-y-8 text-left font-sans transition-all ${isHighContrast ? 'contrast-125 bg-black p-4 rounded-3xl border-2 border-amber-400' : ''}`}>
      
      {/* Top Navigation & WCAG Accessibility Sub-Tab Bar */}
      <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 font-mono text-xs" role="tablist" aria-label="Client Dashboard Navigation Tabs">
          <button
            role="tab"
            aria-selected={activeClientTab === 'vault'}
            onClick={() => setActiveClientTab('vault')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black ${
              activeClientTab === 'vault'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Deliverables & Ingestion Vault</span>
          </button>

          <button
            role="tab"
            aria-selected={activeClientTab === 'invoicing'}
            onClick={() => setActiveClientTab('invoicing')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black ${
              activeClientTab === 'invoicing'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400'
                : 'bg-black text-amber-400 hover:text-white border border-amber-500/30'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Invoicing & PDF Payments</span>
          </button>

          <button
            role="tab"
            aria-selected={activeClientTab === 'whiteboard'}
            onClick={() => setActiveClientTab('whiteboard')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black ${
              activeClientTab === 'whiteboard'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-black text-purple-400 hover:text-white border border-purple-500/30'
            }`}
          >
            <PenTool className="w-4 h-4 text-purple-400" />
            <span>Collaborative Whiteboard</span>
          </button>
        </div>

        {/* WCAG High Contrast Toggle */}
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className={`px-3.5 py-2 rounded-2xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 shrink-0 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
            isHighContrast
              ? 'bg-amber-400 text-black ring-2 ring-white font-extrabold shadow-xl'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
          }`}
          aria-label="Toggle High Contrast Mode for WCAG Accessibility"
        >
          <Contrast className="w-4 h-4 text-amber-400" />
          <span>{isHighContrast ? 'HIGH CONTRAST: ON' : 'HIGH CONTRAST: OFF'}</span>
        </button>
      </div>

      {/* Render Active Sub-Tab */}
      {activeClientTab === 'invoicing' && (
        <InvoicingTab />
      )}

      {activeClientTab === 'whiteboard' && (
        <CollaborativeWhiteboard />
      )}

      {activeClientTab === 'vault' && (
        <>
      {/* Top Banner & High-Level Client Metrics */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-red-500/40 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-red-500/80 hover:shadow-red-600/20 hover:ring-1 hover:ring-red-500/30">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">
                EXECUTIVE CLIENT PORTAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono uppercase">
              CLIENT DELIVERABLES & ASSETS VAULT
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
              Centralized command dashboard for 24-bit audio masters, 4K motion cinema trailers, ISRC legal locks, and album assets.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-red-500" />
              <span>STORAGE: <strong className="text-white">84.2 GB / 500 GB</strong></span>
            </div>
          </div>
        </div>

        {/* 4 Metric Counter Cards with Hover Glow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-950/40 hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">ACTIVE PROJECTS</span>
              <Folder className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">6 Releases</div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+2 Releases added this month</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-950/40 hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">AUDIO & FILM DELIVERABLES</span>
              <Disc className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">148 Master Files</div>
            <div className="text-[10px] font-mono text-zinc-400 mt-1">24-Bit WAV / ProRes 4K</div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-950/40 hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">ISRC LEGAL LOCKS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-400">100% Cleared</div>
            <div className="text-[10px] font-mono text-zinc-400 mt-1">Watermark & Copyright Protected</div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-950/40 hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">ESTIMATED STREAM SYNC</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-amber-300">$142,850</div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">+18.4% Sync Revenue Tracked</div>
          </div>
        </div>
      </div>

      {/* Interactive Project Folders & Drag and Drop Raw Asset Ingestion Zone */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              <Upload className="w-4 h-4 text-red-500 animate-pulse" />
              <span>RAW ASSET INGESTION & PROJECT FOLDERS</span>
            </div>
            <h3 className="text-xl font-bold font-mono text-white">
              Direct Drag-and-Drop Vault Upload
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Drag raw audio masters, video trailers, 8K artwork, or contracts directly onto a project folder card or dropzone below.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-red-950 border border-red-500/50 text-red-300 text-xs font-mono font-bold uppercase shrink-0">
            {folders.length} Project Folders Active
          </span>
        </div>

        {/* Project Folder Cards Strip (Supports Drag & Drop Directly onto Each Folder!) */}
        <div className="space-y-3 font-mono text-xs">
          <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1">
            <Folder className="w-3.5 h-3.5 text-amber-400" /> Target Project Folders (Drop files directly onto any folder)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, folder.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 relative group ${
                  selectedFolderId === folder.id
                    ? 'bg-zinc-900 border-red-500 shadow-lg shadow-red-500/20 ring-1 ring-red-500/50'
                    : 'bg-black border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${folder.color} flex items-center justify-center text-white shadow-md`}>
                    <Folder className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold">{folder.fileCount} Files</span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-white text-xs truncate group-hover:text-red-400 transition-colors">
                    {folder.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans">{folder.artist}</p>
                </div>

                <div className="flex items-center justify-between text-[9px] text-zinc-500 border-t border-zinc-900 pt-1.5">
                  <span className="uppercase text-amber-400 font-bold">{folder.category}</span>
                  <span>{folder.totalSize}</span>
                </div>

                {selectedFolderId === folder.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Drag-and-Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e)}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center space-y-4 relative overflow-hidden ${
            isDragging
              ? 'bg-red-950/40 border-red-500 shadow-2xl shadow-red-500/30 scale-[1.01]'
              : 'bg-black/80 border-zinc-800 hover:border-red-500/60 hover:bg-zinc-950/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleProcessFiles(e.target.files);
              }
            }}
          />

          <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 shadow-xl group-hover:scale-110 transition-transform">
            <Upload className={`w-8 h-8 ${isDragging ? 'animate-bounce text-red-400' : ''}`} />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-mono uppercase">
              {isDragging ? 'DROP FILES TO INGEST NOW' : 'DRAG & DROP RAW ASSETS HERE'}
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans">
              Drop 24-bit WAV masters, 4K ProRes videos, 8K PNG artwork, or legal PDFs. Or <span className="text-red-400 font-bold underline">click to browse computer</span>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 font-mono text-[10px] text-zinc-500 pt-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">Target Folder: <strong className="text-amber-400">{folders.find(f => f.id === selectedFolderId)?.name}</strong></span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">Auto-ISRC Detection</span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">Watermark Protected</span>
          </div>
        </div>

        {/* Upload Progress & Success Toast Notifications */}
        <AnimatePresence>
          {uploadingFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-black border border-red-500/40 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-red-400 font-bold">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Uploading Raw Assets into Vault...
                </span>
                <span>{uploadingFiles.length} File(s) Processing</span>
              </div>

              {uploadingFiles.map((uf, idx) => (
                <div key={idx} className="space-y-1 bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white font-bold truncate">{uf.name} ({uf.size})</span>
                    <span className="text-amber-400 font-bold">{uf.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                      style={{ width: `${uf.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {uploadSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between gap-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{uploadSuccessMsg}</span>
              </div>
              <button
                onClick={() => setUploadSuccessMsg(null)}
                className="text-emerald-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['ALL', 'AUDIO', 'VIDEO', 'ARTWORK', 'DOCUMENT', 'PACKAGE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all shrink-0 border ${
                activeCategoryFilter === cat
                  ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30'
                  : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deliverable, artist, ISRC..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-500 font-sans text-xs focus:outline-none focus:border-red-500 transition-all"
          />
        </div>
      </div>

      {/* Deliverables Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeliverables.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-2xl bg-zinc-950 border border-zinc-800/80 overflow-hidden shadow-xl hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-950/50 hover:ring-1 hover:ring-red-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Media Preview Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  {item.category}
                </div>

                {/* Top Status Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{item.status}</span>
                </div>

                {item.isrc && (
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/90 border border-zinc-800 font-mono text-[9px] text-zinc-400">
                    ISRC: <span className="text-white font-bold">{item.isrc}</span>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                    ARTIST: {item.artist}
                  </span>
                  <h3 className="text-sm font-bold font-sans text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>SPECS:</span>
                    <span className="text-zinc-200 font-bold">{item.format}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate">{item.specs}</p>
                </div>
              </div>
            </div>

            {/* Footer Actions Bar */}
            <div className="p-4 pt-0 border-t border-zinc-900/60 mt-2 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-zinc-500">
                {item.size} • {item.createdAt}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onOpenShareModal({
                      title: item.title,
                      category: item.category,
                      format: item.format,
                      size: item.size,
                      specs: item.specs,
                      thumbnailUrl: item.thumbnailUrl,
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  title="Generate Public Share Link"
                >
                  <Share2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Public Share</span>
                </button>

                <button
                  onClick={() =>
                    onSelectAssetForModal({
                      title: item.title,
                      category: item.category,
                      format: item.format,
                      size: item.size,
                      specs: item.specs,
                      thumbnailUrl: item.thumbnailUrl,
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDeliverables.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-xs">
          No deliverables match your search criteria.
        </div>
      )}
        </>
      )}

      {/* Security & Activity Log Panel */}
      <SecurityActivityLogPanel />
    </div>
  );
}

function SecurityActivityLogPanel() {
  const [logFilter, setLogFilter] = useState<'ALL' | 'DOWNLOAD' | 'SHARE_LINK' | 'COLLABORATOR_EDIT'>('ALL');
  const [logSearch, setLogSearch] = useState('');

  const logs = [
    {
      id: 'log-101',
      timestamp: 'Today, 11:10 AM',
      type: 'DOWNLOAD',
      actor: 'Marcus Vance (Client Owner)',
      ipLocation: 'Miami, FL (IP: 192.168.1.42)',
      assetName: 'Midnight Echoes 24-Bit Radio Master',
      actionDetails: 'Downloaded WAV 24-Bit / 96kHz Master File (48.2 MB)',
      securityStatus: '2FA Verified',
    },
    {
      id: 'log-102',
      timestamp: 'Today, 09:45 AM',
      type: 'SHARE_LINK',
      actor: 'Public Share Link (ID: share-7729)',
      ipLocation: 'London, UK (IP: 86.14.22.109)',
      assetName: 'Neon Odyssey 4K Cinema Motion Trailer',
      actionDetails: 'Streamed 4K Video Preview via Watermarked Share Portal',
      securityStatus: 'Watermarked & Legal Locked',
    },
    {
      id: 'log-103',
      timestamp: 'Yesterday, 06:15 PM',
      type: 'COLLABORATOR_EDIT',
      actor: 'Clayton (Executive Director)',
      ipLocation: 'Atlanta, GA (IP: 68.22.104.18)',
      assetName: 'Acoustic Sig Stem Separated Package',
      actionDetails: 'Edited ISRC legal metadata & updated stem mix levels',
      securityStatus: 'Role Authorized',
    },
    {
      id: 'log-104',
      timestamp: 'Aug 10, 2026, 04:30 PM',
      type: 'DOWNLOAD',
      actor: 'Elena Rostova (Label Manager)',
      ipLocation: 'Los Angeles, CA (IP: 172.56.21.90)',
      assetName: 'Cyberpunk Album Artwork & 3D Claymerch Mockups',
      actionDetails: 'Downloaded 8K Print Package PNG (95.1 MB)',
      securityStatus: 'Role Authorized',
    },
    {
      id: 'log-105',
      timestamp: 'Aug 08, 2026, 02:12 PM',
      type: 'SHARE_LINK',
      actor: 'Public Share Link (ID: share-3104)',
      ipLocation: 'Tokyo, JP (IP: 210.140.10.22)',
      assetName: 'Global Tour Rider & ISRC Legal Distribution Contract',
      actionDetails: 'Viewed Legal PDF Contract (Read-Only Access)',
      securityStatus: 'Password Protected Access',
    },
    {
      id: 'log-106',
      timestamp: 'Aug 05, 2026, 11:05 AM',
      type: 'COLLABORATOR_EDIT',
      actor: 'Jason Vance (Senior Audio Engineer)',
      ipLocation: 'New York, NY (IP: 24.180.40.11)',
      assetName: 'VR 360° Interactive Spatial Mix Audio Session',
      actionDetails: 'Re-calibrated ambisonics 3D spatial pan & audio stems',
      securityStatus: 'Role Authorized',
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesFilter = logFilter === 'ALL' || log.type === logFilter;
    const matchesSearch = log.actor.toLowerCase().includes(logSearch.toLowerCase()) ||
                          log.assetName.toLowerCase().includes(logSearch.toLowerCase()) ||
                          log.actionDetails.toLowerCase().includes(logSearch.toLowerCase()) ||
                          log.ipLocation.toLowerCase().includes(logSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
              CLIENT DASHBOARD SECURITY & AUDIT LOGS
            </span>
          </div>
          <h3 className="text-xl font-bold font-mono text-white">
            Security & Activity Accountability Ledger
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Real-time timestamped audit logs for all asset downloads, public share link views, and collaborator edits.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold uppercase flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Audit Verified
        </span>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { key: 'ALL', label: 'All Logs' },
            { key: 'DOWNLOAD', label: 'Asset Downloads' },
            { key: 'SHARE_LINK', label: 'Share Link Access' },
            { key: 'COLLABORATOR_EDIT', label: 'Collaborator Edits' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setLogFilter(f.key as any)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap border ${
                logFilter === f.key
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                  : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={logSearch}
          onChange={(e) => setLogSearch(e.target.value)}
          placeholder="Search activity logs..."
          className="w-full sm:w-64 bg-black border border-zinc-800 text-white px-3 py-1.5 rounded-xl focus:border-emerald-500 focus:outline-none text-xs font-mono"
        />
      </div>

      {/* Logs Table */}
      <div className="space-y-3">
        {filteredLogs.map(log => (
          <div key={log.id} className="p-4 rounded-2xl bg-black border border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  log.type === 'DOWNLOAD' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                  log.type === 'SHARE_LINK' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                  'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {log.type.replace('_', ' ')}
                </span>
                <span className="text-zinc-500 text-[10px]">{log.timestamp}</span>
                <span className="text-zinc-600 text-[10px]">• {log.ipLocation}</span>
              </div>

              <div className="flex items-center gap-2">
                <strong className="text-white text-sm font-bold font-sans">{log.assetName}</strong>
              </div>

              <p className="text-xs font-sans text-zinc-300">
                {log.actionDetails} by <strong className="text-emerald-400">{log.actor}</strong>
              </p>
            </div>

            <div className="shrink-0 font-mono text-right">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-[10px] font-bold uppercase block">
                {log.securityStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

