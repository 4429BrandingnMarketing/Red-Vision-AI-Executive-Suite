import React from 'react';
import { Terminal, Disc, ArrowRight, Globe } from 'lucide-react';
import { AppView } from '../types/index.js';
import { Newsletter } from './Newsletter.js';

interface FooterProps {
  onViewChange: (view: AppView) => void;
}

export function Footer({ onViewChange }: FooterProps) {
  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 font-sans">
      
      {/* Newsletter Subscription Component */}
      <Newsletter />

      {/* High-Contrast Red & Black Call to Action Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-red-600/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-red-400/30">
          
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Disc className="w-3.5 h-3.5 text-red-500 animate-spin" />
              EXECUTIVE ACCESS OPEN
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Supercharge Your Music, Content & Rollouts
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-200 font-medium max-w-xl">
              Access the studio suite designed by Jason Salvador / Red Vision Music. Start synthesizing masters, rendering 4K motion cinema, and managing rollouts today at <strong className="text-white underline">redvisionai.com</strong>.
            </p>
          </div>

          <button
            onClick={() => onViewChange('console')}
            className="w-full md:w-auto px-8 py-4 rounded-xl bg-black hover:bg-zinc-900 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-2xl shrink-0 hover:scale-[1.02] active:scale-[0.98] border border-red-500/40"
          >
            <Terminal className="w-4 h-4 text-red-500" />
            <span>Access Studio Workspace</span>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </button>

        </div>
      </div>

      {/* Footer Info & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>redvisionai.com</span>
          </div>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">FOUNDER: JASON SALVADOR</span>
        </div>

        <div className="text-zinc-500 text-[11px] text-center md:text-right">
          © {new Date().getFullYear()} Red Vision Music / Creative Studio. Powered by Gemini Omni Flash & Flash Lite.
        </div>
      </div>
    </footer>
  );
}

