import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Github, Youtube, Share2, Cpu, FileCode2, MessageSquare, 
  Disc, Filter, ArrowRight, X, ExternalLink, Sparkles, Check, Copy, Terminal, ShieldCheck
} from 'lucide-react';

export interface OmniSearchResult {
  id: string;
  category: 'GitHub' | 'HuggingFace' | 'YouTube' | 'Social Media' | 'ISRC & Code';
  title: string;
  description: string;
  targetTab: 'integrations' | 'youtube' | 'socials' | 'calendar' | 'dashboard';
  codeSnippet?: string;
  metadata?: string;
  timestamp?: string;
}

const SEARCH_DATABASE: OmniSearchResult[] = [
  // GitHub Code Snippets & Repos
  {
    id: 'gh-1',
    category: 'GitHub',
    title: 'dsp_audio_engine.py (24-bit Mastering Script)',
    description: 'Python audio DSP script for LUFS normalization and 24-bit/96kHz WAV encoding.',
    targetTab: 'integrations',
    codeSnippet: 'import numpy as np\ndef normalize_lufs(signal, target_lufs=-14.0):\n    rms = np.sqrt(np.mean(signal**2))\n    gain = 10 ** ((target_lufs - 20 * np.log10(rms)) / 20)\n    return signal * gain',
    metadata: 'Repository: redvision/audio-mastering-dsp • Branch: main',
    timestamp: 'Updated 2 hours ago'
  },
  {
    id: 'gh-2',
    category: 'GitHub',
    title: 'ffmpeg_4k_motion_cinema.sh (GPU Video Render)',
    description: 'NVENC hardware acceleration script for 60fps 4K Motion Cinema visualizers.',
    targetTab: 'integrations',
    codeSnippet: 'ffmpeg -hwaccel cuda -i input.mov -c:v h264_nvenc -preset p7 -b:v 45M output_4k.mp4',
    metadata: 'Repository: redvision/visualizer-engine • Branch: release-v2.5',
    timestamp: 'Updated Yesterday'
  },
  {
    id: 'gh-3',
    category: 'GitHub',
    title: 'isrc_distribution_validator.rs (Rust Legal Check)',
    description: 'High-speed ISRC format validation and sound recording copyright checksum.',
    targetTab: 'integrations',
    codeSnippet: 'pub fn validate_isrc(code: &str) -> bool {\n    let re = Regex::new(r"^[A-Z]{2}-[A-Z0-9]{3}-\\d{2}-\\d{5}$").unwrap();\n    re.is_match(code)\n}',
    metadata: 'Repository: redvision/isrc-core • Commit: #a98f12c',
    timestamp: 'Updated Aug 10, 2026'
  },

  // HuggingFace Models & Weights
  {
    id: 'hf-1',
    category: 'HuggingFace',
    title: 'redvision/motion-cinema-v3-safetensors',
    description: 'Custom AI diffusion checkpoint for 8K hyper-realistic music visualizers.',
    targetTab: 'integrations',
    codeSnippet: '# HuggingFace Diffusers Pipeline\nfrom diffusers import StableDiffusionPipeline\npipe = StableDiffusionPipeline.from_pretrained("redvision/motion-cinema-v3")',
    metadata: '4.8 GB Safetensors • Model License: Creative ML Open RAIL-M',
    timestamp: 'Model Checkpoint Active'
  },
  {
    id: 'hf-2',
    category: 'HuggingFace',
    title: 'redvision/audio-808-subbass-synthesis',
    description: 'Neural DSP audio model trained on 50,000 clean 808 sub-bass stems.',
    targetTab: 'integrations',
    codeSnippet: 'import torch\nmodel = torch.hub.load("redvision/audio-808-subbass-synthesis", "generator")',
    metadata: 'PyTorch Checkpoint • 1.2 GB Weights',
    timestamp: 'Model Checkpoint Active'
  },

  // YouTube Videos & Comments
  {
    id: 'yt-1',
    category: 'YouTube',
    title: 'Clayton - Hyper-Clean 808 Trap (Official Video)',
    description: 'YouTube Official Video Upload • Premiere scheduled with Content ID protection.',
    targetTab: 'youtube',
    metadata: 'Channel: Red Vision Official • Content ID: Registered',
    timestamp: '42.8K Views • 15 mins ago'
  },
  {
    id: 'yt-2',
    category: 'YouTube',
    title: 'Comment by @AcousticHead99',
    description: '"That 808 drop at 1:12 is absolutely insane! Is the 24-bit audio available on Bandcamp?"',
    targetTab: 'youtube',
    metadata: 'Video: Clayton - Hyper-Clean 808 Trap • Status: Unreplied',
    timestamp: '15 mins ago'
  },
  {
    id: 'yt-3',
    category: 'YouTube',
    title: 'Red Vision World Tour 2026 Stadium Teaser',
    description: '4K Cinema Teaser Trailer with ambisonics spatial 3D audio.',
    targetTab: 'youtube',
    metadata: 'Channel: Red Vision Motion Cinema • 180K Views',
    timestamp: 'Published Aug 08, 2026'
  },

  // Social Media
  {
    id: 'sm-1',
    category: 'Social Media',
    title: 'Instagram Reel: 24-Bit Audio Compression Tutorial',
    description: '15-second viral reel breaking down sub-bass EQ for social media encoders.',
    targetTab: 'socials',
    metadata: 'Page: Red Vision IG • Reach: 184,200 Views • Engagement: 9.4%',
    timestamp: 'Posted 3 hours ago'
  },
  {
    id: 'sm-2',
    category: 'Social Media',
    title: 'Facebook Campaign: World Tour Presale Announcement',
    description: 'Meta Ad Campaign targeting music production & concert goers.',
    targetTab: 'socials',
    metadata: 'Page: Red Vision Music FB • CTR: 4.8% • Conversions: 1,240',
    timestamp: 'Active Campaign'
  },

  // ISRC & Releases
  {
    id: 'isrc-1',
    category: 'ISRC & Code',
    title: 'ISRC US-RED-26-00101 (Midnight Echoes)',
    description: 'Single Release Rollout • Track Master: 24-Bit / 96kHz WAV.',
    targetTab: 'calendar',
    metadata: 'Artist: Clayton • DSP Status: Delivered to Spotify & Apple Music',
    timestamp: 'Release Date: Aug 18, 2026'
  }
];

interface OmniSearchBarProps {
  onSelectResult: (targetTab: 'integrations' | 'youtube' | 'socials' | 'calendar' | 'dashboard') => void;
}

export function OmniSearchBar({ onSelectResult }: OmniSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSnippet, setSelectedSnippet] = useState<OmniSearchResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredResults = SEARCH_DATABASE.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery = 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.codeSnippet && item.codeSnippet.toLowerCase().includes(q)) ||
      (item.metadata && item.metadata.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full relative font-sans">
      {/* Omni-Search Trigger Bar */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full p-3 rounded-2xl bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-red-500/60 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-lg group"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors block truncate">
              {query ? `Search: "${query}"` : 'Omni-Search across GitHub, HuggingFace, YouTube, Socials & Codebase...'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 block">
              Query files, AI model weights, comments, & ISRC releases
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black border border-zinc-800 text-[10px] font-mono text-zinc-400 font-bold">
            <kbd className="text-red-400">⌘</kbd> K
          </span>
          <span className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-red-600/30">
            Search
          </span>
        </div>
      </div>

      {/* Full Modal Search Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-12 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-3xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden space-y-0 text-left font-sans"
            >
              {/* Search Header Bar */}
              <div className="p-4 border-b border-zinc-900 bg-black/80 flex items-center gap-3">
                <Search className="w-5 h-5 text-red-500 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search files, model safetensors, YouTube comments, ISRC codes..."
                  className="w-full bg-transparent text-white placeholder-zinc-500 text-sm font-mono focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-zinc-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono font-bold uppercase shrink-0"
                >
                  ESC
                </button>
              </div>

              {/* Platform Filter Chips */}
              <div className="p-3 bg-zinc-900/50 border-b border-zinc-900 flex items-center gap-2 overflow-x-auto scrollbar-none font-mono text-xs">
                <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1 shrink-0">Filter:</span>
                {['ALL', 'GitHub', 'HuggingFace', 'YouTube', 'Social Media', 'ISRC & Code'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results List Area */}
              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 divide-y divide-zinc-900">
                {filteredResults.map(res => (
                  <div
                    key={res.id}
                    className="pt-3 first:pt-0 group hover:bg-zinc-900/40 p-3 rounded-2xl transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            res.category === 'GitHub' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                            res.category === 'HuggingFace' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            res.category === 'YouTube' ? 'bg-red-950 text-red-400 border border-red-800' :
                            res.category === 'Social Media' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                            'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}>
                            {res.category}
                          </span>
                          <span className="text-zinc-500 font-mono text-[10px]">{res.timestamp}</span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors font-sans">
                          {res.title}
                        </h4>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {res.description}
                        </p>
                        {res.metadata && (
                          <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-zinc-600" />
                            <span>{res.metadata}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {res.codeSnippet && (
                          <button
                            onClick={() => setSelectedSnippet(selectedSnippet?.id === res.id ? null : res)}
                            className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <FileCode2 className="w-3 h-3 text-amber-400" />
                            <span>{selectedSnippet?.id === res.id ? 'Hide Code' : 'View Code'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onSelectResult(res.targetTab);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase flex items-center gap-1 shadow-md shadow-red-600/30"
                        >
                          <span>Go to Tab</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Code Snippet Drawer */}
                    {selectedSnippet?.id === res.id && res.codeSnippet && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-xl bg-black border border-zinc-800 space-y-2 font-mono text-xs text-amber-300/90 overflow-x-auto relative"
                      >
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-900 pb-1.5 mb-2">
                          <span className="uppercase font-bold text-zinc-400">Code Snippet / Configuration</span>
                          <button
                            onClick={() => handleCopyCode(res.codeSnippet || '')}
                            className="flex items-center gap-1 text-zinc-400 hover:text-white"
                          >
                            {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed text-[11px]">
                          {res.codeSnippet}
                        </pre>
                      </motion.div>
                    )}
                  </div>
                ))}

                {filteredResults.length === 0 && (
                  <div className="p-8 text-center text-zinc-500 font-mono text-xs space-y-2">
                    <Search className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p>No results found for "{query}" in {activeCategory}.</p>
                    <p className="text-[10px] text-zinc-600">Try searching for "24-bit", "safetensors", "808", "ISRC", or "4K".</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-zinc-900 bg-black/80 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Omni-Search Index Synced across 5 Platform APIs
                </span>
                <span>Press <kbd className="text-zinc-300">ESC</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
