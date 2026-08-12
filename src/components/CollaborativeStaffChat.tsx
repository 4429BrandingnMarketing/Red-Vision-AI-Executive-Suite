import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, Building2, Shirt, Palette, Globe, 
  Cpu, FileText, CheckCircle2, Shield, Loader2, MessageSquare, 
  Users, Zap, RefreshCw, Flame, ChevronRight, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';

export interface VirtualStaffAgent {
  id: string;
  name: string;
  department: 'Marketing' | 'Legal' | 'Engineering' | 'Creative' | 'Merch' | 'Operations';
  role: string;
  avatarIcon: any;
  avatarColor: string;
  badge: string;
  systemPrompt: string;
  initialGreeting: string;
}

export const VIRTUAL_STAFF_AGENTS: VirtualStaffAgent[] = [
  {
    id: 'agent-legal',
    name: 'Solomon Sterling, Esq.',
    department: 'Legal',
    role: 'Chief Entertainment Attorney & Licensing',
    avatarIcon: Shield,
    avatarColor: 'from-amber-600 to-amber-900',
    badge: 'Entertainment Legal & Royalty Protection',
    systemPrompt: 'You are Solomon Sterling, Esq., Jason Salvador’s lead entertainment lawyer. You specialize in record label licensing, door-split venue contracts, publishing copyright, and royalty distribution.',
    initialGreeting: 'Good day. I am reviewing all master licensing agreements and venue split clauses for your upcoming releases. What legal or contract terms need verification?'
  },
  {
    id: 'agent-marketing',
    name: 'Victor Vance',
    department: 'Marketing',
    role: 'Head of B2B Sponsorships & Playlist Pitching',
    avatarIcon: Building2,
    avatarColor: 'from-red-600 to-red-950',
    badge: '300M+ Contact B2B Database',
    systemPrompt: 'You are Victor Vance, B2B Marketing Lead at Red Vision. You oversee festival booking pitches, brand sponsorship decks, Spotify curator outreach, and radio syndication.',
    initialGreeting: 'Marketing engine is online. I have 300M+ verified festival, curator, and brand contacts loaded. Let’s outline your next promo campaign.'
  },
  {
    id: 'agent-engineering',
    name: 'Marcus Bell',
    department: 'Engineering',
    role: 'Chief Audio Engineer & Master Technician',
    avatarIcon: Cpu,
    avatarColor: 'from-cyan-600 to-blue-900',
    badge: '24-Bit Acoustic Sig Engine',
    systemPrompt: 'You are Marcus Bell, Chief Sound Engineer. You manage 24-bit waveform mastering, stem isolation, vocoder synthesis, and Dolby Atmos audio compliance.',
    initialGreeting: 'Audio console ready at 96kHz / 24-bit. Waveforms are balanced with crisp transient shaping. How can I optimize your mix or stem bouncing?'
  },
  {
    id: 'agent-creative',
    name: 'Elena Rostova',
    department: 'Creative',
    role: 'Creative Motion & 4K Cinema Director',
    avatarIcon: Palette,
    avatarColor: 'from-purple-600 to-rose-900',
    badge: '4K Cinema & AI Motion LUTs',
    systemPrompt: 'You are Elena Rostova, Creative Motion Director. You direct 4K music video trailers, claymation visualizers, color grading LUTs, and YouTube video cuts.',
    initialGreeting: 'Motion timeline synced. I’m ready to render 4K video cuts, storyboards, or claymation visualizers for your single.'
  },
  {
    id: 'agent-merch',
    name: 'Maya Lin',
    department: 'Merch',
    role: 'GiFTD N\' PrVLGD Apparel & Tech Pack Lead',
    avatarIcon: Shirt,
    avatarColor: 'from-emerald-600 to-teal-900',
    badge: '3D Apparel Mockups & Factory Spec',
    systemPrompt: 'You are Maya Lin, Merch & Apparel Lead. You design heavyweight streetwear, dad hats, vinyl box sets, and e-commerce tech packs.',
    initialGreeting: 'Streetwear & merch line active. I can draft 3D apparel specs, vinyl artwork layouts, or tour merch pricing matrices instantly.'
  },
  {
    id: 'agent-ops',
    name: 'Aria Cross',
    department: 'Operations',
    role: 'Executive Operations Assistant',
    avatarIcon: Zap,
    avatarColor: 'from-teal-600 to-cyan-900',
    badge: '24/7 Operations Engine',
    systemPrompt: 'You are Aria Cross, Executive Assistant to Jason Salvador. You manage daily schedule briefings, tour flight itineraries, and cross-department deliverables.',
    initialGreeting: 'Executive briefing loaded. All departments are synced and waiting on your command. How shall we allocate staff resources today?'
  }
];

export interface StaffChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  avatarIcon?: any;
  avatarUrl?: string;
  department?: string;
  text: string;
  timestamp: string;
  isAI: boolean;
}

interface CollaborativeStaffChatProps {
  currentUserAvatar?: string;
}

export function CollaborativeStaffChat({ currentUserAvatar }: CollaborativeStaffChatProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('all');
  const [messages, setMessages] = useState<StaffChatMessage[]>([
    {
      id: 'm1',
      senderId: 'agent-ops',
      senderName: 'Aria Cross',
      senderRole: 'Executive Operations Assistant',
      department: 'Operations',
      avatarIcon: Zap,
      text: 'Executive briefing active. Jason, your legal, marketing, engineering, creative, and merch staff are in the room and standing by for instructions.',
      timestamp: '10:00 AM',
      isAI: true
    },
    {
      id: 'm2',
      senderId: 'agent-legal',
      senderName: 'Solomon Sterling, Esq.',
      senderRole: 'Chief Entertainment Attorney',
      department: 'Legal',
      avatarIcon: Shield,
      text: 'I have finalized the master licensing agreement draft for the Midnight Echoes release. Copyrights and ISRC codes are locked.',
      timestamp: '10:02 AM',
      isAI: true
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = VIRTUAL_STAFF_AGENTS.find(a => a.id === selectedAgentId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsgText = inputPrompt.trim();
    setInputPrompt('');

    // Add user message
    const userMsg: StaffChatMessage = {
      id: `usr-${Date.now()}`,
      senderId: 'user-jason',
      senderName: 'Jason Salvador',
      senderRole: 'Executive Producer',
      avatarUrl: currentUserAvatar || JASON_PORTRAIT_IMG,
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Determine which agent(s) respond
      const targetAgent = activeAgent || VIRTUAL_STAFF_AGENTS[Math.floor(Math.random() * VIRTUAL_STAFF_AGENTS.length)];
      
      const promptContext = `System Instruction: ${targetAgent.systemPrompt}\nUser Query: "${userMsgText}"\nProvide a concise, highly professional executive response (2-3 sentences) outlining actionable steps, contract guidance, marketing stats, or technical deliverables.`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptContext })
      });

      const data = await res.json();
      const aiReplyText = data.text || `${targetAgent.name}: Executing task immediately under Red Vision standards. Detailed deliverable dispatched.`;

      const aiMsg: StaffChatMessage = {
        id: `ai-${Date.now()}`,
        senderId: targetAgent.id,
        senderName: targetAgent.name,
        senderRole: targetAgent.role,
        department: targetAgent.department,
        avatarIcon: targetAgent.avatarIcon,
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-950/95 border border-red-500/30 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col h-[650px]">
      
      {/* Header Bar */}
      <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
              <span>Collaborative AI Staff Command Room</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Direct real-time communication with your 6 virtual executive departments
            </p>
          </div>
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setInputPrompt("Solomon, review our venue door-split contract and copyright registration.")}
            className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[10px] font-bold shrink-0 hover:bg-amber-900"
          >
            ⚖️ Legal Contract Review
          </button>
          <button
            onClick={() => setInputPrompt("Victor, draft a 30-day festival sponsorship pitch deck.")}
            className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800 text-red-300 font-mono text-[10px] font-bold shrink-0 hover:bg-red-900"
          >
            📢 Marketing Pitch Deck
          </button>
          <button
            onClick={() => setInputPrompt("Marcus, check our 24-bit stem waveform frequency response.")}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-[10px] font-bold shrink-0 hover:bg-cyan-900"
          >
            🎛️ Audio Master Audit
          </button>
        </div>
      </div>

      {/* Staff Department Filter Tabs */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto border-b border-white/5">
        <button
          onClick={() => setSelectedAgentId('all')}
          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 ${
            selectedAgentId === 'all'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>All Departments (6)</span>
        </button>

        {VIRTUAL_STAFF_AGENTS.map((agent) => {
          const Icon = agent.avatarIcon;
          const isSel = selectedAgentId === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 border ${
                isSel
                  ? 'bg-red-950 border-red-500 text-white shadow-md'
                  : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-red-400" />
              <span>{agent.name.split(' ')[0]} ({agent.department})</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 my-2 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.isAI ? 'justify-start' : 'justify-end'}`}
          >
            {msg.isAI && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-red-400">
                  {msg.avatarIcon ? <msg.avatarIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
              </div>
            )}

            <div className={`max-w-xl space-y-1 ${msg.isAI ? 'text-left' : 'text-right'}`}>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 px-1">
                <span className="font-bold text-white">{msg.senderName}</span>
                <span>• {msg.senderRole}</span>
                <span className="text-zinc-500">{msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed shadow-lg ${
                  msg.isAI
                    ? 'bg-white/5 border border-white/10 text-zinc-200 backdrop-blur-md'
                    : 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium border border-red-400/30'
                }`}
              >
                {msg.text}
              </div>
            </div>

            {!msg.isAI && (
              <img
                src={msg.avatarUrl || JASON_PORTRAIT_IMG}
                alt="Jason Salvador"
                className="w-9 h-9 rounded-xl object-cover border-2 border-red-500/50 shadow-md shrink-0"
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 p-2 bg-white/5 rounded-xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            <span>Virtual AI Specialist is drafting response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder={
            activeAgent
              ? `Message ${activeAgent.name} (${activeAgent.department})...`
              : "Command all virtual AI staff (e.g. 'Legal, check distribution rights')..."
          }
          className="flex-1 px-4 py-3 rounded-xl bg-black/80 border border-white/20 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-red-500 placeholder-zinc-500"
        />

        <button
          type="submit"
          disabled={!inputPrompt.trim() || isTyping}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 disabled:opacity-50 transition-all flex items-center gap-2 shrink-0 border border-red-400/30"
        >
          <span>Transmit</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
