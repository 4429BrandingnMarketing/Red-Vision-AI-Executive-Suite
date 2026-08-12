import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronRight, 
  Sparkles, Filter, Search, Layers, Play, Music, Film, Bus, BookOpen, Building2,
  Sliders, ArrowUpRight, Check, UserCheck, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_SUITE_VISUALS } from '../data/redVisionData.js';

export interface MilestonePhase {
  id: string;
  name: string;
  startWeek: number; // 1 to 12
  endWeek: number;   // 1 to 12
  progress: number;  // 0 to 100
  status: 'completed' | 'in_progress' | 'review' | 'pending';
  assignedStaff: string;
  deliverables: string[];
}

export interface SuiteGanttProject {
  suiteId: string;
  suiteTitle: string;
  suiteCategory: string;
  suiteIcon: any;
  suiteColor: string;
  projectName: string;
  projectLead: string;
  overallProgress: number;
  targetDate: string;
  milestones: MilestonePhase[];
}

export function ProjectMilestoneGantt() {
  const [selectedSuiteFilter, setSelectedSuiteFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSuite, setExpandedSuite] = useState<string | null>('recording-studio');
  const [activeMilestoneModal, setActiveMilestoneModal] = useState<{ suiteTitle: string; milestone: MilestonePhase } | null>(null);

  const timelineWeeks = Array.from({ length: 12 }, (_, i) => `Wk ${i + 1}`);

  const ganttProjects: SuiteGanttProject[] = [
    {
      suiteId: 'recording-studio',
      suiteTitle: '24-Bit Audio Recording & Mixing Studio',
      suiteCategory: 'Audio Architecture',
      suiteIcon: Music,
      suiteColor: 'border-red-500/60 bg-red-950/40 text-red-400',
      projectName: 'Midnight Echoes - 12 Track LP',
      projectLead: 'Jason Salvador & Marcus Bell',
      overallProgress: 88,
      targetDate: 'Aug 15, 2027',
      milestones: [
        {
          id: 'm1-1',
          name: 'Beat Selection & Stem Separation',
          startWeek: 1,
          endWeek: 3,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Acoustic AI & Marcus Bell',
          deliverables: ['12 High-fidelity stem files', 'BPM & key signature tagging', 'Frequency conflict scan']
        },
        {
          id: 'm1-2',
          name: 'Vocal Recording & Vocoder Tuning',
          startWeek: 3,
          endWeek: 6,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Jason Salvador (Executive Producer)',
          deliverables: ['Lead vocal comping', '3.2dB space cut at 2.5kHz', 'Harmonic vocoder layer']
        },
        {
          id: 'm1-3',
          name: '24-Bit Mastering & Acoustic EQ Tuning',
          startWeek: 5,
          endWeek: 9,
          progress: 90,
          status: 'in_progress',
          assignedStaff: 'Elena Rostova & Master AI',
          deliverables: ['24-bit/96kHz WAV render', '-12.4 LUFS club mix', '+0.8dB 10k air boost']
        },
        {
          id: 'm1-4',
          name: 'ISRC Code Tagging & Dolby Atmos Export',
          startWeek: 8,
          endWeek: 11,
          progress: 50,
          status: 'in_progress',
          assignedStaff: 'Solomon Sterling, Esq.',
          deliverables: ['Global ISRC registration', 'Dolby Atmos surround mix', 'Metadata embedding']
        },
        {
          id: 'm1-5',
          name: 'DSP Distribution & Radio Pitching',
          startWeek: 10,
          endWeek: 12,
          progress: 15,
          status: 'pending',
          assignedStaff: 'Victor Vance (Marketing Lead)',
          deliverables: ['Spotify editorial pitching', 'Apple Music Spatial feature', 'Top 50 radio push']
        }
      ]
    },
    {
      suiteId: 'film-editing-studio',
      suiteTitle: '4K Cinema TV & Film Motion Editing Suite',
      suiteCategory: 'Visual & Video Studio',
      suiteIcon: Film,
      suiteColor: 'border-purple-500/60 bg-purple-950/40 text-purple-400',
      projectName: 'Red Vision Claymation Docu-Series (Ep 1-4)',
      projectLead: 'Elena Rostova (Creative Director)',
      overallProgress: 76,
      targetDate: 'Sept 01, 2027',
      milestones: [
        {
          id: 'm2-1',
          name: 'Script Beat Breakdown & Storyboarding',
          startWeek: 1,
          endWeek: 3,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Elena Rostova & AI Storyboard Pod',
          deliverables: ['40 Shot-list storyboards', 'Character expression maps', 'Scene lighting cues']
        },
        {
          id: 'm2-2',
          name: '3D Plasticine Character Modeling',
          startWeek: 3,
          endWeek: 6,
          progress: 100,
          status: 'completed',
          assignedStaff: '3D Plasticine Engine',
          deliverables: ['Jason Salvador clay model', 'Studio console backdrop', 'Aviator glasses asset']
        },
        {
          id: 'm2-3',
          name: '4K ProRes 422 Frame Rendering',
          startWeek: 6,
          endWeek: 9,
          progress: 80,
          status: 'in_progress',
          assignedStaff: 'GPU Synthesis Node',
          deliverables: ['Frame 120/120 renders', '24 FPS stop-motion timing', '4K ProRes export']
        },
        {
          id: 'm2-4',
          name: 'Beat-to-Cut Audio Sync & Anamorphic LUTs',
          startWeek: 9,
          endWeek: 11,
          progress: 30,
          status: 'review',
          assignedStaff: 'Marcus Bell & Video Pod',
          deliverables: ['Transient audio auto-cut', 'Crimson neon color LUT', 'Grain texture overlay']
        },
        {
          id: 'm2-5',
          name: 'Cinema Premiere & YouTube 4K Launch',
          startWeek: 11,
          endWeek: 12,
          progress: 0,
          status: 'pending',
          assignedStaff: 'YouTube Growth Specialist',
          deliverables: ['YouTube 4K upload', 'Trailer teaser campaign', 'IMDb series page']
        }
      ]
    },
    {
      suiteId: 'tour-manager-app',
      suiteTitle: 'Tour Manager & Travel Agency Command Hub',
      suiteCategory: 'Live & Routing',
      suiteIcon: Bus,
      suiteColor: 'border-amber-500/60 bg-amber-950/40 text-amber-400',
      projectName: '2027 Red Vision World Arena Tour',
      projectLead: 'Victor Vance & Travel Agency Pod',
      overallProgress: 82,
      targetDate: 'Oct 10, 2027',
      milestones: [
        {
          id: 'm3-1',
          name: 'Venue Booking & Date Reservations',
          startWeek: 1,
          endWeek: 4,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Victor Vance (Talent Manager)',
          deliverables: ['18 Arena date holds', 'Capacity 15k-25k locks', 'Deposit escrow transfers']
        },
        {
          id: 'm3-2',
          name: 'Flight & Hotel Logistics Routing',
          startWeek: 4,
          endWeek: 7,
          progress: 90,
          status: 'in_progress',
          assignedStaff: 'Travel Agency API Matrix',
          deliverables: ['Charter flight schedules', '45 Crew hotel rooms', 'Ground transport vans']
        },
        {
          id: 'm3-3',
          name: 'Venue Door-Split & Tax Settlement Calc',
          startWeek: 7,
          endWeek: 9,
          progress: 70,
          status: 'in_progress',
          assignedStaff: 'Solomon Sterling, Esq.',
          deliverables: ['70/30 Door-split terms', 'State tax withholding setup', 'Insurance bond locks']
        },
        {
          id: 'm3-4',
          name: 'VIP Guestlist & Crew Per-Diem Setup',
          startWeek: 9,
          endWeek: 11,
          progress: 40,
          status: 'review',
          assignedStaff: 'Road Manager Pod',
          deliverables: ['VIP portal activation', 'Daily per-diem cards', 'Tour doctor wellness kit']
        },
        {
          id: 'm3-5',
          name: 'Opening Night Arena Launch',
          startWeek: 11,
          endWeek: 12,
          progress: 0,
          status: 'pending',
          assignedStaff: 'Jason Salvador & Full Crew',
          deliverables: ['Soundcheck verification', 'Door opening 7:00 PM', 'Live venue settlement']
        }
      ]
    },
    {
      suiteId: 'book-publishing-app',
      suiteTitle: 'Author Book Publishing & Manuscript Suite',
      suiteCategory: 'Publishing & IP',
      suiteIcon: BookOpen,
      suiteColor: 'border-cyan-500/60 bg-cyan-950/40 text-cyan-400',
      projectName: 'The Modern Music Mogul - Hardcover & Audiobook',
      projectLead: 'Jason Salvador & Publishing Specialist',
      overallProgress: 91,
      targetDate: 'Nov 05, 2027',
      milestones: [
        {
          id: 'm4-1',
          name: 'Manuscript Editing & Formatting',
          startWeek: 1,
          endWeek: 4,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Publishing AI & Jason Salvador',
          deliverables: ['12 Chapter manuscript', 'Executive quote highlights', 'EPUB3 formatting']
        },
        {
          id: 'm4-2',
          name: '3D Plasticine Hardcover Jacket Design',
          startWeek: 4,
          endWeek: 6,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Elena Rostova (Design)',
          deliverables: ['3D Jacket render', 'Embossed gold foil title', 'Back cover endorsements']
        },
        {
          id: 'm4-3',
          name: '100+ Voice Audiobook Voiceover Synthesis',
          startWeek: 6,
          endWeek: 8,
          progress: 95,
          status: 'review',
          assignedStaff: 'TTS Audio Engine',
          deliverables: ['8 Hour narration audio', '192kbps MP3 exports', 'Chapter cue markers']
        },
        {
          id: 'm4-4',
          name: 'ISBN Copyright & Legal Registration',
          startWeek: 8,
          endWeek: 10,
          progress: 85,
          status: 'in_progress',
          assignedStaff: 'Solomon Sterling, Esq.',
          deliverables: ['US Copyright filing', 'ISBN assignment', 'Bar code registration']
        },
        {
          id: 'm4-5',
          name: 'Global Bookstore & Amazon EPUB3 Push',
          startWeek: 10,
          endWeek: 12,
          progress: 20,
          status: 'pending',
          assignedStaff: 'E-commerce & Distribution Pod',
          deliverables: ['Amazon Kindle listing', 'Barnes & Noble distribution', 'Author website pre-orders']
        }
      ]
    },
    {
      suiteId: 'virtual-3d-office',
      suiteTitle: 'Virtual 3D Executive Office & AI Staff HQ',
      suiteCategory: 'Full Multi-Department HQ',
      suiteIcon: Building2,
      suiteColor: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-400',
      projectName: 'AI Specialist Pod Deployment & B2B Lead Engine',
      projectLead: 'Jason Salvador & 20+ AI Executive Pods',
      overallProgress: 85,
      targetDate: 'Ongoing 2027',
      milestones: [
        {
          id: 'm5-1',
          name: 'AI Specialist Persona & Key Isolation',
          startWeek: 1,
          endWeek: 3,
          progress: 100,
          status: 'completed',
          assignedStaff: 'AI System Architecture',
          deliverables: ['20 Specialist personas', 'AES-256 Key isolation', 'Permission boundaries']
        },
        {
          id: 'm5-2',
          name: 'Cross-Department Automated Workflow Sync',
          startWeek: 3,
          endWeek: 6,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Workflow Engine',
          deliverables: ['Real-time staff chat', 'Automated trigger rules', 'Task delegation matrix']
        },
        {
          id: 'm5-3',
          name: '300M+ Curator & B2B Lead Scraping',
          startWeek: 6,
          endWeek: 9,
          progress: 88,
          status: 'in_progress',
          assignedStaff: 'Victor Vance & Lead Pod',
          deliverables: ['Verified email contact db', 'Playlister outreach queue', 'CRM integration']
        },
        {
          id: 'm5-4',
          name: 'Medical & Legal Advisory Pod Activation',
          startWeek: 9,
          endWeek: 11,
          progress: 75,
          status: 'in_progress',
          assignedStaff: 'Solomon Sterling, Esq. & Dr. Pod',
          deliverables: ['24/7 Contract auditor', 'Wellness advice engine', 'Compliance logs']
        },
        {
          id: 'm5-5',
          name: 'Full HQ System Live Operations',
          startWeek: 11,
          endWeek: 12,
          progress: 50,
          status: 'in_progress',
          assignedStaff: 'Jason Salvador (CEO)',
          deliverables: ['Autonomous task dispatch', 'Daily executive briefings', 'Live analytics feed']
        }
      ]
    },
    {
      suiteId: 'red-vision-radio',
      suiteTitle: 'Red Vision Radio 24/7 Broadcast Network',
      suiteCategory: 'Global Broadcast',
      suiteIcon: Flame,
      suiteColor: 'border-rose-500/60 bg-rose-950/40 text-rose-400',
      projectName: '24/7 Satellite Stream & On-Air Syndication',
      projectLead: 'Radio Program Directors & DJ Pod',
      overallProgress: 92,
      targetDate: 'Sept 15, 2027',
      milestones: [
        {
          id: 'm6-1',
          name: 'Station Stream Engine & Audio Processing',
          startWeek: 1,
          endWeek: 4,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Station Audio Engineer',
          deliverables: ['320kbps HD stereo encoder', 'Optimod audio compressor', 'Automated failover backup']
        },
        {
          id: 'm6-2',
          name: 'AI DJ Host Voice Persona & Jingle Drops',
          startWeek: 4,
          endWeek: 7,
          progress: 95,
          status: 'review',
          assignedStaff: 'TTS Radio Host & Sound Pod',
          deliverables: ['Station sweeper idents', 'Voiceover drop generator', 'Hourly news update synth']
        },
        {
          id: 'm6-3',
          name: '45-Station Satellite Syndication Lock',
          startWeek: 7,
          endWeek: 12,
          progress: 80,
          status: 'in_progress',
          assignedStaff: 'Victor Vance (Syndication Lead)',
          deliverables: ['Billboard BDS spin tracking', 'FM/DAB+ carriage deals', 'Live web player widget']
        }
      ]
    },
    {
      suiteId: 'fashion-merch-dropship',
      suiteTitle: 'Fashion Design, Merch & Drop-Shipping Division',
      suiteCategory: 'Apparel & E-Commerce',
      suiteIcon: Flame,
      suiteColor: 'border-indigo-500/60 bg-indigo-950/40 text-indigo-400',
      projectName: 'Red Vision Streetwear Fall Collection & Tour Pop-Up',
      projectLead: 'Fashion Lead & E-Commerce Pod',
      overallProgress: 88,
      targetDate: 'Oct 01, 2027',
      milestones: [
        {
          id: 'm7-1',
          name: '3D Apparel Tech-Packs & Vector Graphics',
          startWeek: 1,
          endWeek: 3,
          progress: 100,
          status: 'completed',
          assignedStaff: '3D Apparel Designer',
          deliverables: ['Heavyweight hoodie tech-packs', 'Embroidered crest graphics', 'Size grading specs']
        },
        {
          id: 'm7-2',
          name: 'Print-On-Demand Drop-Shipping API Pipeline',
          startWeek: 3,
          endWeek: 8,
          progress: 90,
          status: 'in_progress',
          assignedStaff: 'Ecomm API Developer',
          deliverables: ['Shopify auto-fulfillment', '48-Hour global print nodes', 'Custom poly-mailer bags']
        },
        {
          id: 'm7-3',
          name: 'Arena Tour VIP Merch Booth & POS Hardware',
          startWeek: 8,
          endWeek: 12,
          progress: 75,
          status: 'in_progress',
          assignedStaff: 'Tour Logistics Coordinator',
          deliverables: ['Wireless Square POS terminals', 'Inventory RFID scanners', 'Venue split audit sheet']
        }
      ]
    },
    {
      suiteId: 'talent-management-division',
      suiteTitle: 'Executive Talent Management & Roster Representation',
      suiteCategory: 'Executive Representation',
      suiteIcon: UserCheck,
      suiteColor: 'border-orange-500/60 bg-orange-950/40 text-orange-400',
      projectName: '360 Roster Expansion & Brand Sponsorship Engine',
      projectLead: 'Jason Salvador (CEO) & Solomon Sterling, Esq.',
      overallProgress: 94,
      targetDate: 'Dec 01, 2027',
      milestones: [
        {
          id: 'm8-1',
          name: 'Roster Contract Audit & Royalty Optimization',
          startWeek: 1,
          endWeek: 4,
          progress: 100,
          status: 'completed',
          assignedStaff: 'Solomon Sterling, Esq.',
          deliverables: ['15 Artist contract reviews', 'Unclaimed royalty collection', 'Master ownership audit']
        },
        {
          id: 'm8-2',
          name: 'Fortune 500 Brand Sponsorship Pairing',
          startWeek: 4,
          endWeek: 9,
          progress: 92,
          status: 'in_progress',
          assignedStaff: 'Jason Salvador & Brand Pod',
          deliverables: ['$2.4M Sponsorship holds', 'Custom ambassador deals', 'Press announcement release']
        }
      ]
    }
  ];

  // Filtering logic
  const filteredProjects = ganttProjects.filter(project => {
    if (selectedSuiteFilter !== 'all' && project.suiteId !== selectedSuiteFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = project.projectName.toLowerCase().includes(q);
      const matchSuite = project.suiteTitle.toLowerCase().includes(q);
      const matchMilestone = project.milestones.some(m => m.name.toLowerCase().includes(q));
      if (!matchName && !matchSuite && !matchMilestone) return false;
    }
    return true;
  });

  const getStatusBadge = (status: MilestonePhase['status']) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Done (100%)</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-400 font-mono text-[10px] font-bold flex items-center gap-1"><Flame className="w-3 h-3 animate-pulse" /> Active</span>;
      case 'review':
        return <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-400 font-mono text-[10px] font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> In Review</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[10px]">Queued</span>;
    }
  };

  const getBarColor = (status: MilestonePhase['status']) => {
    switch (status) {
      case 'completed':
        return 'from-emerald-600 to-teal-500 border-emerald-400';
      case 'in_progress':
        return 'from-red-600 to-rose-500 border-red-400';
      case 'review':
        return 'from-amber-600 to-yellow-500 border-amber-400';
      default:
        return 'from-zinc-700 to-zinc-800 border-zinc-600';
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-950/95 border border-red-500/30 p-6 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
              <span>Project Milestone Gantt Timeline</span>
              <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-800 text-red-400 font-mono text-[10px] uppercase">
                Active Suite Status Data
              </span>
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Interactive Gantt-style progress tracker pulling real-time status across 5 creative suites
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search milestone or suite..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500 w-44 sm:w-56"
            />
          </div>

          {/* Suite Select */}
          <select
            value={selectedSuiteFilter}
            onChange={(e) => setSelectedSuiteFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-zinc-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All 5 Creative Suites</option>
            {STUDIO_SUITE_VISUALS.map((s) => (
              <option key={s.id} value={s.id}>{s.title.slice(0, 28)}...</option>
            ))}
          </select>

        </div>
      </div>

      {/* Gantt Schedule Header Legend & Timeline Scale */}
      <div className="p-3 rounded-2xl bg-black/80 border border-white/10 grid grid-cols-12 items-center gap-2 font-mono text-[11px] text-zinc-400">
        <div className="col-span-12 md:col-span-4 flex items-center gap-2 text-white font-bold">
          <Layers className="w-4 h-4 text-red-400" />
          <span>CREATIVE SUITE & MILESTONE STAGE</span>
        </div>

        <div className="col-span-12 md:col-span-8 hidden md:grid grid-cols-12 gap-1 text-center font-bold text-zinc-400">
          {timelineWeeks.map((wk, idx) => (
            <div key={wk} className={`py-1 rounded ${idx >= 4 && idx <= 8 ? 'bg-red-950/40 text-red-300' : ''}`}>
              {wk}
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Projects Accordion List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const Icon = project.suiteIcon;
          const isExpanded = expandedSuite === project.suiteId;

          return (
            <div
              key={project.suiteId}
              className={`rounded-2xl border ${project.suiteColor} bg-zinc-950/80 transition-all overflow-hidden shadow-lg`}
            >
              {/* Main Suite Card Bar */}
              <div
                onClick={() => setExpandedSuite(isExpanded ? null : project.suiteId)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-white/5 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <button className="p-1 rounded-lg bg-white/5 text-zinc-400 hover:text-white">
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-red-400" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-red-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        {project.suiteCategory}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        Target: {project.targetDate}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-white font-sans flex items-center gap-2">
                      <span>{project.suiteTitle}</span>
                    </h4>

                    <p className="text-xs text-red-300 font-mono font-medium">
                      Project: {project.projectName} • <span className="text-zinc-400">{project.projectLead}</span>
                    </p>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-40 sm:w-48 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-300">
                      <span>Overall Progress</span>
                      <span className="font-bold text-white">{project.overallProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black border border-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-500"
                        style={{ width: `${project.overallProgress}%` }}
                      />
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 font-bold">
                    {project.milestones.length} Milestones
                  </span>
                </div>
              </div>

              {/* Milestone Sub-tasks Gantt Visualization */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 border-t border-white/10 bg-black/60 space-y-3"
                  >
                    <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      <span>Granular Milestone Phases (Gantt Schedule Bar Grid)</span>
                    </div>

                    {project.milestones.map((m) => {
                      // Calculate grid columns for Gantt Bar (12 total columns)
                      const colStart = m.startWeek;
                      const colSpan = m.endWeek - m.startWeek + 1;

                      return (
                        <div
                          key={m.id}
                          onClick={() => setActiveMilestoneModal({ suiteTitle: project.suiteTitle, milestone: m })}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all grid grid-cols-12 items-center gap-2 cursor-pointer group"
                        >
                          {/* Left Title & Status */}
                          <div className="col-span-12 md:col-span-4 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-white font-sans group-hover:text-red-300 transition-colors">
                                {m.name}
                              </span>
                              {getStatusBadge(m.status)}
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400">
                              Assigned: <strong className="text-zinc-200">{m.assignedStaff}</strong>
                            </div>
                          </div>

                          {/* Right Gantt Progress Bar spanning 12-week grid */}
                          <div className="col-span-12 md:col-span-8 grid grid-cols-12 gap-1 items-center h-8 relative">
                            
                            {/* Grid lines background */}
                            {Array.from({ length: 12 }).map((_, idx) => (
                              <div key={idx} className="h-full border-r border-white/5" />
                            ))}

                            {/* Actual Milestone Gantt Bar */}
                            <div
                              className={`absolute h-7 rounded-lg border bg-gradient-to-r ${getBarColor(m.status)} shadow-md flex items-center justify-between px-2.5 text-[10px] font-mono text-white font-bold overflow-hidden transition-all`}
                              style={{
                                left: `${((colStart - 1) / 12) * 100}%`,
                                width: `${(colSpan / 12) * 100}%`
                              }}
                            >
                              <span className="truncate">{m.progress}%</span>
                              <span className="opacity-80 text-[9px]">Wk {m.startWeek}-{m.endWeek}</span>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* Detailed Milestone Inspector Modal */}
      <AnimatePresence>
        {activeMilestoneModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-red-500/40 p-6 shadow-2xl space-y-5 relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-red-400 font-bold tracking-wider">
                    {activeMilestoneModal.suiteTitle}
                  </span>
                  <h3 className="text-lg font-black text-white font-sans mt-0.5">
                    {activeMilestoneModal.milestone.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveMilestoneModal(null)}
                  className="p-1 rounded-lg bg-white/10 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/80 border border-white/10">
                  <span className="text-zinc-500 uppercase text-[10px]">Timeline Span</span>
                  <p className="text-white font-bold mt-0.5">
                    Week {activeMilestoneModal.milestone.startWeek} to Week {activeMilestoneModal.milestone.endWeek}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/80 border border-white/10">
                  <span className="text-zinc-500 uppercase text-[10px]">Assigned Specialist</span>
                  <p className="text-red-300 font-bold mt-0.5 truncate">
                    {activeMilestoneModal.milestone.assignedStaff}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-bold font-mono text-zinc-300 uppercase tracking-wider mb-2">
                  Key Deliverables & Verification Checklist
                </h4>
                <div className="space-y-2">
                  {activeMilestoneModal.milestone.deliverables.map((d, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => setActiveMilestoneModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg"
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
