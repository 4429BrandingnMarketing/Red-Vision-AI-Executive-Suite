import React from 'react';
import { XCircle, CheckCircle, Flame, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPARISON_ITEMS } from '../data/redVisionData.js';
import { AppView } from '../types/index.js';

interface ComparisonMatrixProps {
  onViewChange: (view: AppView) => void;
}

export function ComparisonMatrix({ onViewChange }: ComparisonMatrixProps) {
  return (
    <section id="matrix" className="py-20 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Flame className="w-4 h-4 text-red-500" />
            WORKFLOW ROI COMPARISON
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
            Fragmented Software vs. Red Vision Studio
          </h2>
          <p className="text-zinc-400 font-sans text-base leading-relaxed">
            See why entertainment executives, producers, and labels are switching to Jason Salvador’s unified architecture at redvisionai.com.
          </p>
        </motion.div>

        {/* Matrix Table / Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
        >
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/60">
                <th className="p-5 font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider w-1/4">
                  STUDIO CAPABILITY
                </th>
                <th className="p-5 font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider w-3/8 bg-black/40 border-r border-white/10">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-zinc-500" />
                    Traditional Fragmented Tools
                  </div>
                </th>
                <th className="p-5 font-mono text-xs font-bold text-red-400 uppercase tracking-wider w-3/8 bg-red-950/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                    Red Vision AI Studio
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm font-sans">
              {COMPARISON_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-mono font-bold text-white text-xs uppercase tracking-wider">
                    {item.feature}
                  </td>
                  <td className="p-5 text-zinc-400 bg-black/20 border-r border-white/10 text-xs sm:text-sm">
                    {item.traditional}
                  </td>
                  <td className="p-5 text-zinc-200 font-medium bg-red-950/10 text-xs sm:text-sm">
                    {item.redVision}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA Banner beneath matrix */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange('console')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-2xl shadow-red-600/30 transition-all inline-flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            Switch to Red Vision AI Studio Today
          </motion.button>
        </div>

      </div>
    </section>
  );
}

