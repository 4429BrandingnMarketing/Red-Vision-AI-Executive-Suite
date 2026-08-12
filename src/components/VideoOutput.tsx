import React, { useRef, useState, useEffect } from 'react';
import { Loader2, AlertTriangle, Volume2, VolumeX } from 'lucide-react';

type AppState = 'IDLE' | 'GENERATING_ATMOSPHERE' | 'GENERATING_PROMPT' | 'GENERATING_VIDEO' | 'VIDEO_READY';
type LogType = 'info' | 'success' | 'warn' | 'error';
interface LogEntry { id: string; message: string; type: LogType; image?: string }

interface VideoOutputProps {
  appState: AppState;
  videoUrl: string | null;
  logs: LogEntry[];
}

const logColor = (type: LogType) =>
  type === 'error' ? 'text-red-500' :
  type === 'warn' ? 'text-yellow-500' :
  type === 'success' ? 'text-emerald-400' :
  'text-zinc-400';

const readableError = (raw: string): string => {
  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      const message = parsed?.error?.message ?? parsed?.message;
      if (typeof message === 'string' && message.trim()) return message;
    } catch {
      // fall through to the raw string
    }
  }
  return raw.replace(/^Error:\s*/, '').trim();
};

export function VideoOutput({ appState, videoUrl, logs }: VideoOutputProps) {
  const generating = appState === 'GENERATING_ATMOSPHERE' || appState === 'GENERATING_PROMPT' || appState === 'GENERATING_VIDEO';
  const lastLog = logs[logs.length - 1];
  const recentLogs = logs.slice(-6);
  const hasError = lastLog?.type === 'error';

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 1.0;
    }
  }, [isMuted, videoUrl]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className={`w-full relative flex items-center justify-center transition-all ${
      hasError 
        ? 'min-h-[220px] h-auto py-6 overflow-y-auto border border-zinc-800 bg-zinc-950/40 rounded-lg' 
        : 'aspect-video overflow-hidden rounded-xl bg-black group'
    }`}>
      {appState === 'VIDEO_READY' && videoUrl ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            controlsList="nodownload"
            autoPlay
            loop
            playsInline
            className="w-full h-full object-contain bg-black"
          />

          {/* Quick Sound Control Overlay Badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-lg transition-all ${
                isMuted
                  ? 'bg-red-950/80 border-red-500/60 text-red-300 hover:bg-red-900'
                  : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span>Unmute Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Audio Enabled (100%)</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : generating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-6 overflow-hidden">
          <Loader2 className="w-9 h-9 text-zinc-500 animate-spin shrink-0" />
          <div className="font-mono text-sm uppercase tracking-widest text-white shrink-0">
            {appState === 'GENERATING_ATMOSPHERE' ? 'Generating atmosphere' : appState === 'GENERATING_PROMPT' ? 'Writing prompt' : 'Rendering'}
          </div>
          <div className="w-full max-w-md min-h-0 space-y-1.5 font-mono text-[11px] text-left">
            {recentLogs.map((log) => (
              <div key={log.id} className={logColor(log.type)}>
                <div className="truncate"><span className="text-zinc-600">›</span> {log.message}</div>
                {log.image && (
                  <img
                    src={log.image}
                    alt="Generated atmosphere"
                    className="mt-2 h-40 md:h-52 w-auto border border-zinc-800 bg-zinc-900"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center px-6 w-full max-w-md">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-700">Awaiting render</div>
          {lastLog?.type === 'error' && (
            <div className="mt-4 w-full flex items-start gap-3 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-left">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
              <p className="font-mono text-xs leading-relaxed text-red-200 break-words">
                {readableError(lastLog.message)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}