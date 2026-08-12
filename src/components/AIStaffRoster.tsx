import React, { useState } from 'react';
import { 
  Users, Sparkles, Building2, Shirt, Palette, Globe, Send, Search, 
  Check, ArrowRight, Download, RefreshCw, Layers, ShieldCheck, Mail, 
  TrendingUp, Radio, Calendar, Zap, Terminal, Copy, ExternalLink, Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { CLAY_ICON_STAFF } from '../data/redVisionData.js';

export interface StaffAgent {
  id: string;
  name: string;
  role: string;
  badge: string;
  avatarIcon: any;
  specialty: string;
  description: string;
  stats: { label: string; value: string }[];
  primaryColor: string;
}

export function AIStaffRoster() {
  const agents: StaffAgent[] = [
    {
      id: 'sales',
      name: 'Victor Vance',
      role: 'B2B Sales Agent',
      badge: '300M+ Verified Leads Database',
      avatarIcon: Building2,
      specialty: 'Sponsorships, Festivals, Radio & Curator Outreach',
      description: 'Access 300 million verified B2B industry contacts. Victor executes personalized high-volume pitch campaigns for festival slots, brand deals, radio airplay, and playlist placements.',
      stats: [
        { label: 'Verified Contacts', value: '304.2M' },
        { label: 'Avg Open Rate', value: '68.4%' },
        { label: 'Automated Sequences', value: 'Active' }
      ],
      primaryColor: 'from-amber-500/20 to-amber-900/10'
    },
    {
      id: 'merch',
      name: 'Maya Lin',
      role: 'GiFTD N\' PrVLGD Merch Designer',
      badge: '3D Apparel & E-Comm Tech Packs',
      avatarIcon: Shirt,
      specialty: 'Streetwear, Apparel Mockups & Production Specs',
      description: 'Designs custom heavyweight streetwear, dad hats, vinyl box sets, and tour merch. Generates factory-ready tech packs and syncs direct-to-garment e-commerce stores.',
      stats: [
        { label: 'Mockup Quality', value: 'Factory Spec' },
        { label: 'Turnaround', value: 'Instant' },
        { label: 'E-Comm Sync', value: 'Shopify / Amazon' }
      ],
      primaryColor: 'from-emerald-500/20 to-emerald-900/10'
    },
    {
      id: 'creative',
      name: 'Sol Rasheed',
      role: 'Executive Creative Director',
      badge: 'Visual Moodboards & Brand Identity',
      avatarIcon: Palette,
      specialty: 'Album Art Direction, Color Systems & Video Storyboards',
      description: 'Crafts high-concept visual directions, album artwork briefs, typography guidelines, and cinematic storyboards aligned with Red Vision creative standards.',
      stats: [
        { label: 'Visual Palette', value: 'Acoustic Modern' },
        { label: 'Brand Alignment', value: '100% Executive' },
        { label: 'Storyboard Output', value: '4K Ready' }
      ],
      primaryColor: 'from-purple-500/20 to-purple-900/10'
    },
    {
      id: 'assistant',
      name: 'Aria Cross',
      role: 'Executive Assistant',
      badge: '24/7 Ops & Briefings Engine',
      avatarIcon: Cpu,
      specialty: 'Daily Briefings, Email Automation & Workflow Oversight',
      description: 'Your 24/7 operational right hand. Aria generates morning executive summaries, organizes tour itineraries, drafts contract emails, and keeps studio deliverables on deadline.',
      stats: [
        { label: 'Tasks Managed', value: 'Automated' },
        { label: 'Response Time', value: '< 1 second' },
        { label: 'Sync Status', value: 'Live' }
      ],
      primaryColor: 'from-teal-500/20 to-teal-900/10'
    },
    {
      id: 'web',
      name: 'Nova Sterling',
      role: 'Web Designer & Hosting Architect',
      badge: 'Instant Artist Web Portals',
      avatarIcon: Globe,
      specialty: 'Custom Funnels, Tour Pass Sites & SSL Hosting',
      description: 'Builds responsive artist portals, tour ticket funnels, and merch web stores. Provides SSL hosting, custom domain mapping, and mobile-first speed optimization.',
      stats: [
        { label: 'Page Speed', value: '99/100' },
        { label: 'SSL Security', value: 'Encrypted' },
        { label: 'Deployment', value: 'Cloud Run' }
      ],
      primaryColor: 'from-blue-500/20 to-blue-900/10'
    }
  ];

  const [selectedAgentId, setSelectedAgentId] = useState<string>('sales');
  const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  // ================= 1. B2B SALES ENGINE STATE =================
  const [salesCategory, setSalesCategory] = useState<'festivals' | 'sponsors' | 'curators' | 'radio'>('festivals');
  const [salesQuery, setSalesQuery] = useState('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<{ subject: string; body: string; leadsCount: number } | null>({
    subject: 'Red Vision Artist Roster // 2026 World Tour & Mainstage Performance Opportunity',
    body: 'Dear Festival Booking Committee,\n\nWe are submitting Red Vision Creative Studio\'s headline electronic & hip-hop roster for your upcoming 2026 Mainstage lineup. Backed by 25+ years of executive artist management (Lupe Fiasco, Asher Roth, 1500 or Nothin\'), our artists consistently deliver top-tier ticket sales and massive social engagement.\n\nKey Metrics:\n- Monthly Streams: 4.2M+\n- Audience Demographic: 18-35 High Engagement\n- Live Production: Custom 4K Visuals & Live Acoustic DSP\n\nPlease let us know if you have availability for Q3/Q4 headline slots.\n\nBest regards,\nVictor Vance // Red Vision Executive Sales',
    leadsCount: 14200
  });

  const leadSamples = [
    { name: 'Electric Forest Booking Team', type: 'Festival', location: 'Rothbury, MI', reach: '50,000 Cap', verified: true },
    { name: 'Red Bull Music Sponsorships', type: 'Sponsor', location: 'Global HQ', reach: '$500k Budget', verified: true },
    { name: 'Spotify New Music Friday Curators', type: 'Curator', location: 'New York, NY', reach: '4.1M Followers', verified: true },
    { name: 'BBC Radio 1Xtra Program Directors', type: 'Radio', location: 'London, UK', reach: '2.5M Listeners', verified: true },
    { name: 'Coachella Valley Music & Arts', type: 'Festival', location: 'Indio, CA', reach: '125,000 Cap', verified: true },
    { name: 'Monster Energy Brand Partnerships', type: 'Sponsor', location: 'Corona, CA', reach: '$1.2M Budget', verified: true },
  ];

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Generate an executive B2B outreach pitch for ${salesCategory} campaign in the music industry. Target search query: "${salesQuery || 'Executive Artist Roster Outreach'}". Include subject line and persuasive email body.` })
      });
      const data = await res.json();
      const text = data.text || '';
      
      setGeneratedPitch({
        subject: `Executive B2B Outreach: ${salesCategory.toUpperCase()} Campaign`,
        body: text || 'Tailored B2B sales sequence generated across verified contacts.',
        leadsCount: Math.floor(Math.random() * (25000 - 8000 + 1)) + 8000
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // ================= 2. MERCH DESIGNER STATE =================
  const [merchItemType, setMerchItemType] = useState<'hoodie' | 'cap' | 'vinyl' | 'tee'>('hoodie');
  const [merchPrompt, setMerchPrompt] = useState('Red Vision Heavyweight Vintage Washed Oversized Streetwear Hoodie with Red Embroidery');
  const [isGeneratingMerch, setIsGeneratingMerch] = useState(false);
  const [generatedMerchImage, setGeneratedMerchImage] = useState<string | null>(null);

  const handleGenerateMerch = async () => {
    setIsGeneratingMerch(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `High-end product shot of GiFTD N' PrVLGD luxury streetwear merchandise item: ${merchPrompt}. Crisp focus, studio neutral lighting, clean product photography on dark slate background. No clutter.`,
          type: 'product'
        })
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedMerchImage(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingMerch(false);
    }
  };

  // ================= 3. CREATIVE DIRECTOR STATE =================
  const [albumTitle, setAlbumTitle] = useState('Cloth Talk: Chapter 2');
  const [albumGenre, setAlbumGenre] = useState('Cinematic Trap & Ambient Electronic');
  const [isGeneratingConcept, setIsGeneratingConcept] = useState(false);
  const [conceptBrief, setConceptBrief] = useState<string | null>(
    '### Visual Concept: "Architects of the Twilight"\n\n**Color Palette:** Emerald (#10B981), Obsidian (#090D0A), Matte Gold (#D4AF37), Crimson Accent (#E11D3C).\n\n**Aesthetic Direction:** Industrial stop-motion plasticine meets dark monolithic architecture. High dynamic contrast, heavy shadows, tactile clay textures, and sharp gold typography.\n\n**Video Teaser Outline:**\n1. *0:00 - 0:03*: Macro zoom on spinning gold vinyl disc with emerald laser refractions.\n2. *0:03 - 0:08*: Cut to clean-shaven clay executive in neon studio mixing console.\n3. *0:08 - 0:15*: Fast flashes of tour dates, wave spectrums, and GiFTD N\' PrVLGD apparel.'
  );

  const handleGenerateConcept = async () => {
    setIsGeneratingConcept(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Act as Executive Creative Director Sol Rasheed for Red Vision Music. Create a complete visual art direction brief and moodboard outline for album titled "${albumTitle}" in genre "${albumGenre}". Include color palette, aesthetic direction, and a 15-second promo video outline.`
        })
      });
      const data = await res.json();
      setConceptBrief(data.text || 'Visual concept synthesized.');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingConcept(false);
    }
  };

  // ================= 4. EXECUTIVE ASSISTANT STATE =================
  const [assistantTask, setAssistantTask] = useState('Generate morning executive briefing for Jason Salvador');
  const [isExecutingTask, setIsExecutingTask] = useState(false);
  const [taskOutput, setTaskOutput] = useState<string | null>(
    'Good morning, Jason.\n\nExecutive Daily Summary:\n1. Release Calendar: "Cloth Talk: Chapter 2" master approved and ISRC US-RV1-26-90421 registered.\n2. B2B Sales Engine: 14,200 festival booking pitches dispatched via Victor Vance.\n3. Studio Operations: All 4 Gemini API key vaults locked and operating at 100% health.\n4. Merch Line: GiFTD N\' PrVLGD pre-orders standing at 1,420 units.\n\nAll systems green for today\'s recording session.'
  );

  const handleRunAssistantTask = async () => {
    setIsExecutingTask(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Act as Aria Cross, 24/7 Executive Assistant for Jason Salvador at Red Vision Creative Studio. Execute task: "${assistantTask}". Respond with clear, highly professional executive bullet points.`
        })
      });
      const data = await res.json();
      setTaskOutput(data.text || 'Task executed.');
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecutingTask(false);
    }
  };

  // ================= 5. WEB DESIGNER STATE =================
  const [webTemplate, setWebTemplate] = useState<'portal' | 'tour' | 'merch'>('portal');
  const [customDomain, setCustomDomain] = useState('artist.redvisionai.com');
  const [isDeployingWeb, setIsDeployingWeb] = useState(false);
  const [webDeployed, setWebDeployed] = useState(true);

  return (
    <div className="space-y-8">
      
      {/* Roster Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-lg shrink-0 bg-black">
            <img src={CLAY_ICON_STAFF} alt="AI Staff Hub" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-1 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              SMALL AI STAFF HUBS
            </div>
            <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">
              Executive Specialized AI Roster
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              5 Dedicated AI Specialists: Sales (300M+ Leads), Merch Designer, Creative Director, Executive Assistant & Web Designer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-red-400 font-mono text-xs font-bold flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            5 / 5 Agents Online
          </span>
        </div>
      </motion.div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {agents.map((agent) => {
          const Icon = agent.avatarIcon;
          const isSelected = agent.id === selectedAgentId;
          return (
            <motion.button
              key={agent.id}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group backdrop-blur-md ${
                isSelected
                  ? 'bg-gradient-to-b from-red-950/40 to-black/80 border-red-500 shadow-xl ring-2 ring-red-500/20'
                  : 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/80"></span>
                  )}
                </div>

                <div className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-1">
                  {agent.role}
                </div>
                <h3 className="text-base font-extrabold text-white font-sans leading-tight mb-2">
                  {agent.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {agent.badge}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono font-bold text-red-300">
                <span>{isSelected ? 'ACTIVE WORKSPACE' : 'SELECT AGENT'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-red-400' : 'text-zinc-600'}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Specialized Active Agent Interactive Workspace */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md space-y-6"
      >
        
        {/* Active Agent Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-emerald-950">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg shrink-0">
              {React.createElement(activeAgent.avatarIcon, { className: "w-7 h-7" })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white font-sans">
                  {activeAgent.name}
                </h3>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950 border border-emerald-700/60 rounded-full">
                  {activeAgent.role}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-mono mt-0.5">
                {activeAgent.specialty}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {activeAgent.stats.map((s, i) => (
              <div key={i} className="text-right">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">{s.label}</div>
                <div className="text-sm font-mono font-bold text-emerald-400">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 1. VICTOR VANCE // B2B SALES AGENT WORKSPACE */}
        {activeAgent.id === 'sales' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 text-xs font-mono flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>300M+ B2B Leads Engine:</strong> Victor searches verified contacts across festival booking boards, corporate sponsor desks, radio station directors, and Spotify editorial curators.
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['festivals', 'sponsors', 'curators', 'radio'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSalesCategory(cat)}
                  className={`py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all ${
                    salesCategory === cat
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input & Campaign Trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={salesQuery}
                  onChange={(e) => setSalesQuery(e.target.value)}
                  placeholder={`Search ${salesCategory} leads (e.g., Electronic festivals, Energy drink brand deals)...`}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
              >
                {isGeneratingPitch ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating B2B Campaign...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Launch Outreach Pitch
                  </>
                )}
              </button>
            </div>

            {/* Sample Leads Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase flex items-center justify-between">
                <span>Verified Sample Contacts ({salesCategory.toUpperCase()})</span>
                <span className="text-amber-400">Database Live: 304,210,000 Contacts</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {leadSamples.map((lead, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-white font-bold">{lead.name}</div>
                      <div className="text-zinc-500 text-[11px]">{lead.location} • {lead.reach}</div>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated B2B Pitch Preview */}
            {generatedPitch && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                    <Mail className="w-4 h-4" />
                    B2B Email Campaign Preview ({generatedPitch.leadsCount.toLocaleString()} Contacts Targeted)
                  </div>
                  <button className="text-xs font-mono text-zinc-400 hover:text-amber-300 flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy Sequence
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 text-white font-mono text-xs font-bold">
                  Subject: {generatedPitch.subject}
                </div>
                <pre className="p-4 rounded-lg bg-zinc-900/80 text-zinc-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {generatedPitch.body}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 2. MAYA LIN // MERCH DESIGNER WORKSPACE */}
        {activeAgent.id === 'merch' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 text-xs font-mono flex items-center gap-3">
              <Shirt className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>GiFTD N' PrVLGD Apparel Engine:</strong> Maya renders factory-spec streetwear mockups and generates production tech packs ready for print-on-demand or bulk manufacture.
              </span>
            </div>

            {/* Garment Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'hoodie', label: 'Heavyweight Hoodie' },
                { id: 'cap', label: 'Tour Dad Hat' },
                { id: 'vinyl', label: 'Deluxe Vinyl Box' },
                { id: 'tee', label: 'World Tour Tee' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMerchItemType(item.id as any);
                    setMerchPrompt(`Red Vision GiFTD N' PrVLGD luxury ${item.label} in heavyweight charcoal with crimson embroidery`);
                  }}
                  className={`py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all ${
                    merchItemType === item.id
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Prompt & Render */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={merchPrompt}
                onChange={(e) => setMerchPrompt(e.target.value)}
                placeholder="Describe garment style, fabric weight, logo embroidery, print placements..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleGenerateMerch}
                disabled={isGeneratingMerch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0"
              >
                {isGeneratingMerch ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Rendering Garment...
                  </>
                ) : (
                  <>
                    <Shirt className="w-4 h-4" />
                    Render 3D Mockup
                  </>
                )}
              </button>
            </div>

            {/* Render Output Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl bg-zinc-950 border border-emerald-900/60 overflow-hidden flex items-center justify-center relative group">
                {generatedMerchImage ? (
                  <img src={generatedMerchImage} alt="GiFTD N' PrVLGD Merch" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 space-y-3 text-zinc-500 font-mono text-xs">
                    <Shirt className="w-12 h-12 mx-auto text-emerald-500/40" />
                    <div>Click "Render 3D Mockup" to synthesize luxury GiFTD N' PrVLGD apparel artwork</div>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Factory Tech Pack Specifications
                </div>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Fabric Weight</span>
                    <span>450 GSM Heavy French Terry</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Logo Print Technique</span>
                    <span>3D Puff Print & High-Density Embroidery</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Fit Specification</span>
                    <span>Boxy Oversized Executive Silhouette</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Colorway</span>
                    <span>Obsidian Charcoal / Crimson Red Vision Accent</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">E-Comm Pre-order Target</span>
                    <span className="text-emerald-400 font-bold">$120.00 / unit</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-950 text-emerald-300 font-mono text-xs font-bold uppercase border border-emerald-800/60 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Export Factory PDF Tech Pack
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. SOL RASHEED // CREATIVE DIRECTOR WORKSPACE */}
        {activeAgent.id === 'creative' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-purple-200 text-xs font-mono flex items-center gap-3">
              <Palette className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Visual Moodboard & Direction Engine:</strong> Sol synthesizes album artwork briefs, cinematic video storyboards, and brand identity systems aligned with executive aesthetic standards.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Project / Album Title</label>
                <input
                  type="text"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Genre & Atmospheric Mood</label>
                <input
                  type="text"
                  value={albumGenre}
                  onChange={(e) => setAlbumGenre(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateConcept}
              disabled={isGeneratingConcept}
              className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              {isGeneratingConcept ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Synthesizing Art Direction Brief...
                </>
              ) : (
                <>
                  <Palette className="w-4 h-4" />
                  Synthesize Executive Creative Brief
                </>
              )}
            </button>

            {conceptBrief && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-900/50 space-y-3 font-mono text-xs">
                <div className="text-purple-400 font-bold uppercase flex items-center justify-between">
                  <span>Executive Art Direction Brief</span>
                  <span className="text-zinc-500">Red Vision Standards</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/80 text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {conceptBrief}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. ARIA CROSS // EXECUTIVE ASSISTANT WORKSPACE */}
        {activeAgent.id === 'assistant' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-900/40 text-teal-200 text-xs font-mono flex items-center gap-3">
              <Cpu className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                <strong>24/7 Operations Assistant:</strong> Aria oversees tour flights, release deadlines, email drafts, and cross-module studio health.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={assistantTask}
                onChange={(e) => setAssistantTask(e.target.value)}
                placeholder="Instruct Aria (e.g., Draft flight schedule email, Summarize release progress)..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={handleRunAssistantTask}
                disabled={isExecutingTask}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 shrink-0"
              >
                {isExecutingTask ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing Task...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Run Executive Command
                  </>
                )}
              </button>
            </div>

            {taskOutput && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-teal-900/50 space-y-3 font-mono text-xs">
                <div className="text-teal-400 font-bold uppercase flex items-center justify-between">
                  <span>Aria Cross // Executive Daily Briefing</span>
                  <span className="text-emerald-400">STATUS: ALL SYSTEMS GREEN</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/80 text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {taskOutput}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. NOVA STERLING // WEB DESIGNER WORKSPACE */}
        {activeAgent.id === 'web' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-blue-200 text-xs font-mono flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong>Instant Website Synthesis & Hosting Engine:</strong> Nova generates high-speed artist portals, tour ticket landing pages, and merch stores with SSL domain binding.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'portal', label: 'Artist Main Portal' },
                { id: 'tour', label: 'Tour Tickets & Passes' },
                { id: 'merch', label: 'GiFTD N\' PrVLGD Store' },
              ].map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setWebTemplate(tpl.id as any)}
                  className={`py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase border transition-all ${
                    webTemplate === tpl.id
                      ? 'bg-blue-500 text-zinc-950 border-blue-400 shadow-md shadow-blue-500/20'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Globe className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="Enter custom artist domain (e.g., siren.redvisionai.com)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  setIsDeployingWeb(true);
                  setTimeout(() => {
                    setIsDeployingWeb(false);
                    setWebDeployed(true);
                  }, 1200);
                }}
                disabled={isDeployingWeb}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 shrink-0"
              >
                {isDeployingWeb ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deploying SSL Site...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Deploy Live Site
                  </>
                )}
              </button>
            </div>

            {/* Live Web Preview Simulation Box */}
            <div className="rounded-2xl border border-blue-900/50 bg-zinc-950 overflow-hidden space-y-0">
              <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="ml-2 text-zinc-200 font-bold">https://{customDomain}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold uppercase border border-emerald-800">
                  SSL Encrypted • Active
                </span>
              </div>

              <div className="p-8 text-center space-y-4 bg-gradient-to-b from-[#080d12] to-[#0a1218]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 font-mono text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  {webTemplate.toUpperCase()} LIVE SITE TEMPLATE
                </div>
                <h3 className="text-3xl font-extrabold text-white font-sans">
                  Red Vision Official Artist Portal
                </h3>
                <p className="text-zinc-400 font-sans text-sm max-w-lg mx-auto">
                  Stream the latest 24-bit audio masters, purchase VIP World Tour tickets, and pre-order GiFTD N' PrVLGD merchandise with instant checkout.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button className="px-5 py-2.5 rounded-xl bg-blue-500 text-zinc-950 font-mono text-xs font-bold uppercase">
                    Listen to Masters
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white border border-zinc-800 font-mono text-xs font-bold uppercase">
                    Get Tour Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </motion.div>

    </div>
  );
}
