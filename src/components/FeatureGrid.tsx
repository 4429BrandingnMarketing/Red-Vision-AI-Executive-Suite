import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { 
  CLAY_STUDIO_IMG, 
  CLAY_CALENDAR_IMG, 
  CLAY_ICON_MANIFEST, 
  CLAY_ICON_TOURING, 
  CLAY_ICON_STAFF, 
  CLAY_ICON_CINEMA 
} from '../data/redVisionData.js';
import { AppView } from '../types/index.js';

interface FeatureGridProps {
  onViewChange: (view: AppView) => void;
}

export function FeatureGrid({ onViewChange }: FeatureGridProps) {
  const pillars = [
    {
      id: 'acoustic',
      title: 'Mixing & Mastering Studio Engine',
      subtitle: 'Pro Level 24-Bit Audio & Acoustic Sig DSP',
      description: 'A complete pro audio mixing and mastering studio powered by Acoustic Sig AI. Synthesize radio-ready 24-bit audio masters, isolate multi-track drums, bass, synths, and vocal stems, and shape transient dynamics in real time.',
      clayIcon: CLAY_ICON_MANIFEST,
      badge: '24-Bit Mastering Studio',
      image: CLAY_STUDIO_IMG,
      highlights: ['AI Multi-Track Stem Separation', 'Radio-Ready Mastering & Frequency DSP', 'Live Audio Spectrum Visualizer']
    },
    {
      id: 'touring',
      title: 'Pro Touring AI & Travel Agency',
      subtitle: 'Full Tour Logistics & Built-In Travel Agency',
      description: 'Your 24/7 AI Tour Manager & Travel Agency. Automatically generates tour flight itineraries, hotel bookings, venue riders, and distribution delivery schedules with embedded ISRC tracking.',
      clayIcon: CLAY_ICON_TOURING,
      badge: 'Touring & Travel Agency AI',
      image: CLAY_CALENDAR_IMG,
      highlights: ['Flight & Hotel Itinerary Booking', 'Automated ISRC Code Registration', 'Venue Logistics & Client Delivery Checklists']
    },
    {
      id: 'staff',
      title: 'Dedicated AI Staff & Sales Engine',
      subtitle: 'Assistant, 300M+ Leads Agent, Merch & Web Designers',
      description: 'Equipped with an elite AI team: Executive Assistant, B2B Sales Agent with over 300 million leads database access, GiFTD N\' PrVLGD Merch Designer, Creative Director, and Web Designer with hosting.',
      clayIcon: CLAY_ICON_STAFF,
      badge: '300M+ Leads Sales Engine',
      image: null,
      highlights: ['B2B Sales Agent with 300M+ Verified Leads', 'GiFTD N\' PrVLGD Merch & Apparel Designer', 'Web Designer with Hosting & Per-User Key Vault']
    },
    {
      id: 'cinema',
      title: 'Motion Cinema, Video & Site Synthesis',
      subtitle: '4K AI Video Generator, Editor & Website Builder',
      description: 'Full-stack video generator and stateful editor powered by Gemini Omni Flash. Render 4K teaser reels, launch marketing campaigns, and build custom web funnels with instant site hosting.',
      clayIcon: CLAY_ICON_CINEMA,
      badge: '4K Motion & Web Builder',
      image: null,
      highlights: ['4K Promo Reel Video Generator', 'Social Media Campaign Manager', 'Instant Website Synthesis & Hosting']
    }
  ];

  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden">
      {/* Background kinetic ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-red-500/40 text-red-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg shadow-red-950/40">
            <Sparkles className="w-4 h-4 text-red-500" />
            THE VISIONARY CREATIVE PARTNER
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            The Executive AI Studio Architecture
          </h2>
          <p className="text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
            Replaces fragmented SaaS tools with an all-in-one executive partner. Complete with a mixing studio, touring travel agency, 300M+ leads sales agent, and 4K cinema generator.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            return (
              <div
                key={pillar.id}
                className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-red-500/50 transition-all duration-300 shadow-2xl group relative overflow-hidden hover:shadow-red-950/40 hover:-translate-y-1"
              >
                <div>
                  {/* Top Header with 3D Claymation Icon */}
                  <div className="flex items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform duration-500 shrink-0 bg-black">
                        <img 
                          src={pillar.clayIcon} 
                          alt={pillar.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/70 border border-red-800/60 rounded-full inline-block mb-1">
                          {pillar.badge}
                        </span>
                        <h3 className="text-xl font-extrabold text-white font-sans leading-tight group-hover:text-red-400 transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-zinc-300 text-sm font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Optional Image Graphic */}
                  {pillar.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800/80 aspect-[16/9] relative group-hover:border-red-500/40 transition-colors">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-6 bg-black/60 p-4 rounded-xl border border-zinc-900">
                    {pillar.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-zinc-200">
                        <Check className="w-4 h-4 text-red-500 shrink-0 stroke-[2.5]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Console Link */}
                <button
                  onClick={() => onViewChange('console')}
                  className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/60 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-rose-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-600/30"
                >
                  <span>Launch {pillar.subtitle.split('&')[0]} Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Additional Artist Portal & Multi-Domain Ecosystem Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-red-500/40 shadow-2xl backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 md:col-span-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              FULL ARTIST PORTAL & E-COMMERCE HUB
            </div>
            <h3 className="text-2xl font-extrabold text-white font-sans">
              Control Images, Merchandising, Finances, Publishing & Amazon/Alibaba E-Comm
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed">
              Complete creative sovereignty: Manage artwork, logo design, wellness routines, book publishing (Scripts N Scribbles), blogging, and e-commerce integrations straight from your executive command center at <strong className="text-white">redvisionai.com</strong>.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onViewChange('console')}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 hover:scale-105"
            >
              <span>Explore Artist Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


