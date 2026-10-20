import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, Sparkles, Building2, Globe, Cpu, Loader2, MessageSquare, Music,
  Calendar, Film, Radio, ShoppingBag, StopCircle, CircleAlert,
} from 'lucide-react';
import { JASON_PORTRAIT_IMG } from '../data/redVisionData.js';
import { DIVISION_EXECUTIVES, type DivisionExecutive } from '../data/departmentExecutives.js';

export interface VirtualStaffAgent extends DivisionExecutive {
  avatarIcon: React.ComponentType<{ className?: string }>;
  avatarColor: string;
}

const executiveIcons: Record<string, VirtualStaffAgent['avatarIcon']> = {
  hermes: Bot,
  music: Music,
  touring: Calendar,
  brands: Building2,
  tv: Film,
  radio: Radio,
  commerce: ShoppingBag,
  products: Cpu,
  infrastructure: Globe,
};

const executiveColors: Record<string, string> = {
  hermes: 'from-red-600 to-rose-900',
  music: 'from-amber-600 to-red-900',
  touring: 'from-cyan-600 to-blue-900',
  brands: 'from-purple-600 to-rose-900',
  tv: 'from-fuchsia-600 to-purple-900',
  radio: 'from-sky-600 to-indigo-900',
  commerce: 'from-emerald-600 to-teal-900',
  products: 'from-blue-600 to-cyan-900',
  infrastructure: 'from-orange-600 to-amber-900',
};

export const VIRTUAL_STAFF_AGENTS: VirtualStaffAgent[] = DIVISION_EXECUTIVES.map((executive) => ({
  ...executive,
  avatarIcon: executiveIcons[executive.id] || Sparkles,
  avatarColor: executiveColors[executive.id] || 'from-zinc-600 to-zinc-900',
}));

const SESSION_STORAGE_KEY = 'redvision.hermes.executive-session';

function getExecutiveSessionId() {
  const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (stored && /^redvision_[a-zA-Z0-9_-]{8,96}$/.test(stored)) return stored;
  const next = `redvision_${window.crypto.randomUUID().replace(/-/g, '')}`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, next);
  return next;
}

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

async function streamHermesRun(runId: string, onEvent: (event: any) => void) {
  const response = await fetch(`/api/hermes/runs/${encodeURIComponent(runId)}/events`);
  if (!response.ok || !response.body) throw new Error('Hermes mission stream could not be opened.');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finished = false;

  while (!finished) {
    const { value, done } = await reader.read();
    finished = done;
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    const frames = buffer.split(/\r?\n\r?\n/);
    buffer = frames.pop() || '';
    for (const frame of frames) {
      const eventType = frame.split(/\r?\n/).find((line) => line.startsWith('event:'))?.slice(6).trim();
      const data = frame.split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trim()).join('\n');
      if (!data || data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        onEvent(eventType ? { ...parsed, event: parsed.event || eventType } : parsed);
      } catch { /* Ignore malformed keepalive or partial frames. */ }
    }
  }
}

export function CollaborativeStaffChat({ currentUserAvatar }: CollaborativeStaffChatProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('hermes');
  const [gatewayState, setGatewayState] = useState('checking');
  const [gatewayMessage, setGatewayMessage] = useState('Checking Hermes connection…');
  const [messages, setMessages] = useState<StaffChatMessage[]>([
    {
      id: 'hermes-welcome',
      senderId: 'hermes',
      senderName: 'Hermes',
      senderRole: 'Chief AI Orchestrator',
      department: 'Executive Office',
      avatarIcon: Bot,
      text: 'Hermes runs the show. Assign a division lead for its expertise, or leave me selected to coordinate across the whole agency. I’ll report what I actually did and what still needs your direction.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: true
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);
  const [missionActivity, setMissionActivity] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>('');

  const activeAgent = VIRTUAL_STAFF_AGENTS.find((agent) => agent.id === selectedAgentId) || VIRTUAL_STAFF_AGENTS[0];

  useEffect(() => {
    sessionIdRef.current = getExecutiveSessionId();
    let current = true;
    fetch('/api/hermes/api-status')
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!current) return;
        setGatewayState(response.ok ? data.state || 'unavailable' : 'unavailable');
        setGatewayMessage(data.message || 'Hermes connection status is unavailable.');
      })
      .catch(() => {
        if (!current) return;
        setGatewayState('offline');
        setGatewayMessage('Red Vision could not check the Hermes gateway.');
      });
    return () => { current = false; };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isTyping) return;

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

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setMissionActivity([]);

    try {
      const response = await fetch('/api/hermes/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: userMsgText,
          leadId: activeAgent.id,
          sessionId: sessionIdRef.current,
          requestId: window.crypto.randomUUID().replace(/-/g, ''),
        }),
      });

      const data = await response.json();
      if (!response.ok || typeof data.runId !== 'string') {
        throw new Error(data.error || `Hermes did not accept the mission (HTTP ${response.status}).`);
      }
      const runId = data.runId as string;
      const assistantMessageId = `hermes-${runId}`;
      setCurrentRunId(runId);
      setGatewayState('online');
      setGatewayMessage('Hermes accepted the mission and is coordinating work.');

      const aiMsg: StaffChatMessage = {
        id: assistantMessageId,
        senderId: 'hermes',
        senderName: 'Hermes',
        senderRole: `Chief AI Orchestrator · ${activeAgent.name}`,
        department: activeAgent.department,
        avatarIcon: Bot,
        text: 'Mission accepted. Hermes is coordinating the work…',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      };
      setMessages(prev => [...prev, aiMsg]);

      let streamedText = '';
      let terminalStatus = '';
      await streamHermesRun(runId, (event) => {
        const eventType = String(event.event || event.type || '');
        const payload = event.data && typeof event.data === 'object' ? event.data : event;
        const delta = typeof payload.delta === 'string' ? payload.delta : typeof payload.text === 'string' ? payload.text : '';
        if (eventType === 'message.delta' && delta) {
          streamedText += delta;
          setMessages((prev) => prev.map((message) => message.id === assistantMessageId ? { ...message, text: streamedText } : message));
        } else if (eventType === 'tool.started' || eventType === 'tool.completed') {
          const toolName = typeof payload.tool === 'string' ? payload.tool : 'Hermes tool';
          const failed = eventType === 'tool.completed' && payload.error === true;
          setMissionActivity((prev) => [...prev.slice(-5), `${failed ? 'Issue' : eventType === 'tool.started' ? 'Using' : 'Finished'}: ${toolName}`]);
        } else if (eventType === 'subagent.start' || eventType === 'subagent.complete') {
          const agentName = typeof payload.name === 'string' ? payload.name : 'specialist agent';
          setMissionActivity((prev) => [...prev.slice(-5), `${eventType === 'subagent.start' ? 'Delegated to' : 'Received report from'}: ${agentName}`]);
        } else if (eventType === 'run.completed') {
          terminalStatus = 'completed';
          const output = typeof payload.output === 'string' ? payload.output.trim() : '';
          const finalText = output || streamedText || 'Hermes completed the run without a text report.';
          setMessages((prev) => prev.map((message) => message.id === assistantMessageId ? { ...message, text: finalText } : message));
        } else if (eventType === 'run.failed' || eventType === 'run.cancelled' || eventType === 'run.interrupted') {
          terminalStatus = eventType;
          const detail = typeof payload.error === 'string' ? payload.error : 'Hermes did not complete this mission.';
          setMessages((prev) => prev.map((message) => message.id === assistantMessageId ? { ...message, text: `${eventType === 'run.failed' ? 'Mission failed' : 'Mission stopped'}: ${detail}` } : message));
        }
      });

      if (!terminalStatus) {
        setMessages((prev) => prev.map((message) => message.id === assistantMessageId ? { ...message, text: streamedText || 'The progress stream ended before Hermes confirmed a final result. Check the Hermes run before treating this mission as complete.' } : message));
      }
    } catch (err) {
      const failureMessage = err instanceof Error ? err.message : 'Unknown agent error';
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        senderId: 'hermes',
        senderName: 'Hermes connection',
        senderRole: 'Mission monitor',
        avatarIcon: CircleAlert,
        text: `Task was not executed: ${failureMessage}. No deliverable was created or dispatched.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true
      }]);
      setGatewayState('offline');
      setGatewayMessage(failureMessage);
    } finally {
      setIsTyping(false);
      setCurrentRunId(null);
    }
  };

  const handleStopMission = async () => {
    if (!currentRunId) return;
    try {
      const response = await fetch(`/api/hermes/runs/${encodeURIComponent(currentRunId)}/stop`, { method: 'POST' });
      if (!response.ok) throw new Error();
      setGatewayMessage('Stop requested from Hermes; waiting for the run to settle.');
      setMissionActivity((prev) => [...prev.slice(-5), 'Stop requested by Jason.']);
    } catch {
      setGatewayMessage('Hermes did not confirm the stop request.');
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
              <span>Hermes Executive Office</span>
              <span className={`w-2 h-2 rounded-full ${gatewayState === 'online' ? 'bg-emerald-400' : gatewayState === 'checking' ? 'bg-amber-400 animate-pulse' : 'bg-red-500'}`} />
            </h3>
            <p className="text-xs font-mono text-zinc-400" title={gatewayMessage}>
              Hermes runs the show · {gatewayState === 'online' ? 'Connected' : gatewayState === 'checking' ? 'Checking connection' : 'Not connected'}
            </p>
          </div>
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => { setSelectedAgentId('music'); setInputPrompt('Build a release plan for a Red Vision artist, including audience, timeline, budget assumptions, and next actions.'); }}
            className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[10px] font-bold shrink-0 hover:bg-amber-900"
          >
            🎵 Music release plan
          </button>
          <button
            onClick={() => { setSelectedAgentId('touring'); setInputPrompt('Create a practical tour plan for Pivot AI: routing approach, venue targets, budget categories, schedule, and open decisions.'); }}
            className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800 text-red-300 font-mono text-[10px] font-bold shrink-0 hover:bg-red-900"
          >
            🚌 Pivot AI tour plan
          </button>
          <button
            onClick={() => { setSelectedAgentId('brands'); setInputPrompt('Develop a 30-day campaign concept for 4429 Lifestyle + Marketing, with audience, channels, content, and measurable goals.'); }}
            className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-[10px] font-bold shrink-0 hover:bg-purple-900"
          >
            ✦ 4429 campaign
          </button>
        </div>
      </div>

      {/* Executive and division selection */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto border-b border-white/5">
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

      <div className="px-1 pt-3 text-[11px] font-mono text-zinc-400">
        <span className="text-white font-bold">{activeAgent.name}</span> · {activeAgent.badge}. Hermes remains the orchestrator for every mission.
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

        {missionActivity.length > 0 && (
          <div className="ml-12 space-y-1 text-[10px] font-mono text-zinc-400" aria-live="polite">
            {missionActivity.slice(-4).map((activity, index) => <div key={`${activity}-${index}`}>• {activity}</div>)}
          </div>
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 p-2 bg-white/5 rounded-xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            <span>Hermes is coordinating this mission…</span>
            {currentRunId && <button type="button" onClick={handleStopMission} className="ml-2 inline-flex items-center gap-1 text-zinc-300 hover:text-white"><StopCircle className="w-3.5 h-3.5" /> Stop</button>}
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
          placeholder={selectedAgentId === 'hermes' ? 'Give Hermes a mission to coordinate across Red Vision…' : `Give Hermes a mission with ${activeAgent.name} expertise…`}
          className="flex-1 px-4 py-3 rounded-xl bg-black/80 border border-white/20 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-red-500 placeholder-zinc-500"
        />

        <button
          type="submit"
          disabled={!inputPrompt.trim() || isTyping}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 disabled:opacity-50 transition-all flex items-center gap-2 shrink-0 border border-red-400/30"
        >
          <span>Start mission</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
