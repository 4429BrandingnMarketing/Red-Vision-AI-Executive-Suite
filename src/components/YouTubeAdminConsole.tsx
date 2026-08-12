import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, Play, Upload, ShieldCheck, DollarSign, Eye, Users, 
  Clock, CheckCircle2, AlertTriangle, Sparkles, Film, Plus, Share2, 
  TrendingUp, Radio, Music, ArrowUpRight, RefreshCw, BarChart2, MessageSquare
} from 'lucide-react';
import { YouTubeChannel } from '../types/index.js';

export function YouTubeAdminConsole() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('yt-chan-1');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Form State
  const [videoTitle, setVideoTitle] = useState<string>('Clayton - Hyper-Clean 808 Trap (Official Motion Cinema Video)');
  const [videoDescription, setVideoDescription] = useState<string>('Official 24-bit studio audio and 4K Motion Cinema visualizer for "Hyper-Clean 808 Trap". Produced by Red Vision Executive Studio.');
  const [videoTags, setVideoTags] = useState<string>('Clayton, Red Vision Music, 808 Trap, Motion Cinema, 24Bit Audio, VSL Visualizer');
  const [enableMonetization, setEnableMonetization] = useState<boolean>(true);
  const [enableContentId, setEnableContentId] = useState<boolean>(true);
  const [formatAsShorts, setFormatAsShorts] = useState<boolean>(false);

  const channels: YouTubeChannel[] = [
    {
      id: 'yt-chan-1',
      name: 'Red Vision Music Official',
      handle: '@redvisionmusic',
      subscribers: '1.24M',
      views: '184.2M',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      verified: true,
      contentIdProtected: true,
    },
    {
      id: 'yt-chan-2',
      name: 'Red Vision Cinema & VSL Trailers',
      handle: '@redvisioncinema',
      subscribers: '450K',
      views: '52.8M',
      avatar: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      verified: true,
      contentIdProtected: true,
    },
    {
      id: 'yt-chan-3',
      name: 'Clayton Official VEVO',
      handle: '@claytonvevo',
      subscribers: '890K',
      views: '112.4M',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      verified: true,
      contentIdProtected: true,
    }
  ];

  const activeChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

  // Mock Uploaded Videos
  const [recentVideos, setRecentVideos] = useState([
    {
      id: 'vid-101',
      title: 'Red Vision World Tour 2026 - Stadium Teaser',
      views: '428.5K',
      likes: '38.2K',
      status: 'Monetized & Content ID Active',
      uploadedAt: '2 days ago',
      isShorts: false,
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-102',
      title: 'Sub-Zero Hook (Viral 15s Edit)',
      views: '1.8M',
      likes: '210.4K',
      status: 'Monetized',
      uploadedAt: '5 days ago',
      isShorts: true,
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
    }
  ]);

  const handlePublishVideo = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);

      const newVid = {
        id: `vid-${Date.now()}`,
        title: videoTitle,
        views: '1',
        likes: '0',
        status: enableContentId ? 'Monetized & Content ID Active' : 'Monetized',
        uploadedAt: 'Just now',
        isShorts: formatAsShorts,
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
      };

      setRecentVideos([newVid, ...recentVideos]);

      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    }, 2000);
  };

  // Mock Comments State
  const [comments, setComments] = useState([
    {
      id: 'c-1',
      author: 'AcousticHead99',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: 'That 808 drop at 1:12 is absolutely insane! Is the 24-bit audio available on Bandcamp?',
      videoTitle: 'Clayton - Hyper-Clean 808 Trap',
      timestamp: '15 mins ago',
      replied: false,
      replyText: '',
    },
    {
      id: 'c-2',
      author: 'CinemaVisuals_Official',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      text: 'The color grading on this Motion Cinema 4K visualizer is top tier. What camera lens setup?',
      videoTitle: 'Red Vision World Tour 2026 - Stadium Teaser',
      timestamp: '2 hours ago',
      replied: true,
      replyText: 'Thanks! Shot on Anamorphic 35mm with Red Vision Motion Cinema rendering engine.',
    }
  ]);

  const [activeTab, setActiveTab] = useState<'UPLOAD' | 'ANALYTICS' | 'COMMENTS'>('UPLOAD');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-08-15');
  const [scheduledTime, setScheduledTime] = useState<string>('12:00');

  const handleSendReply = (commentId: string, text: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, replied: true, replyText: text };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 text-left font-sans">
      {/* Toast Alert */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-rose-950 to-zinc-950 border border-red-500/80 text-white flex items-center justify-between shadow-2xl font-mono text-xs ring-1 ring-red-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <span className="text-red-400 font-bold uppercase block text-[10px]">
                  YOUTUBE PUBLISHED SUCCESSFULLY
                </span>
                <span className="font-bold text-sm">"{videoTitle}" is Live!</span>
                <p className="text-[11px] font-sans text-zinc-300">
                  Content ID fingerprinting registered. Scheduled for {scheduledDate} at {scheduledTime}.
                </p>
              </div>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold uppercase transition-colors flex items-center gap-1"
            >
              <span>View on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40 border border-red-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/50 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>OFFICIAL YOUTUBE ADMINISTRATION HUB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              YouTube Channel & Content ID Manager
            </h2>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Publish Motion Cinema renders, schedule video uploads, manage comment replies across studio channels, and view channel analytics with Content ID protection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-black/80 border border-zinc-800 text-center font-mono">
              <span className="text-xl font-bold text-red-400 block">{activeChannel.subscribers}</span>
              <span className="text-[10px] text-zinc-500 uppercase">Total Subscribers</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-black/80 border border-zinc-800 text-center font-mono">
              <span className="text-xl font-bold text-emerald-400 block">{activeChannel.views}</span>
              <span className="text-[10px] text-zinc-500 uppercase">Channel Views</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar & Channel Switcher */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs relative z-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { key: 'UPLOAD', label: 'Upload & Schedule', icon: Upload },
              { key: 'ANALYTICS', label: 'Channel Analytics', icon: BarChart2 },
              { key: 'COMMENTS', label: `Comments Inbox (${comments.filter(c => !c.replied).length})`, icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-black/80 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">Channel:</span>
            {channels.map((chan) => (
              <button
                key={chan.id}
                onClick={() => setSelectedChannelId(chan.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedChannelId === chan.id
                    ? 'bg-zinc-800 text-white border border-red-500/80'
                    : 'bg-black/60 border border-zinc-900 text-zinc-500 hover:text-white'
                }`}
              >
                <img src={chan.avatar} alt={chan.name} className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span>{chan.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional Sub-View Render */}
      {activeTab === 'ANALYTICS' && (
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-red-500" /> Channel Analytics Overview ({activeChannel.name})
            </h3>
            <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              Last 28 Days (+18.4% Growth)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-black border border-zinc-900">
              <span className="text-2xl font-bold text-white block">1.84M</span>
              <span className="text-[10px] text-zinc-500 uppercase">Watch Hours</span>
            </div>
            <div className="p-4 rounded-2xl bg-black border border-zinc-900">
              <span className="text-2xl font-bold text-red-400 block">42.8K</span>
              <span className="text-[10px] text-zinc-500 uppercase">New Subscribers</span>
            </div>
            <div className="p-4 rounded-2xl bg-black border border-zinc-900">
              <span className="text-2xl font-bold text-emerald-400 block">$18,420</span>
              <span className="text-[10px] text-zinc-500 uppercase">Est. Revenue</span>
            </div>
            <div className="p-4 rounded-2xl bg-black border border-zinc-900">
              <span className="text-2xl font-bold text-amber-400 block">94.2%</span>
              <span className="text-[10px] text-zinc-500 uppercase">Audience Retention</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'COMMENTS' && (
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-500" /> Studio YouTube Comments Inbox
            </h3>
            <span className="text-zinc-500 text-xs">Viewing all channel comments</span>
          </div>

          <div className="space-y-4 font-sans">
            {comments.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-black border border-zinc-900 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                    <div>
                      <strong className="text-white text-sm block">{c.author}</strong>
                      <span className="text-[10px] text-zinc-500">Video: {c.videoTitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500">{c.timestamp}</span>
                </div>

                <p className="text-xs text-zinc-200 bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                  "{c.text}"
                </p>

                {c.replied ? (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-200 font-mono">
                    <strong className="text-red-400 uppercase text-[10px] block mb-1">Studio Replied:</strong>
                    {c.replyText}
                  </div>
                ) : (
                  <div className="space-y-2 pt-1 font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase block">1-Click AI Suggested Replies:</span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[10px]">
                      {[
                        'Thanks for listening! Stream 24-bit audio on Spotify now 🔥',
                        'Appreciate the love! Motion Cinema visualizer rendering specs in bio 🎬',
                        'Drop a 🔥 if you want the full studio stem pack!'
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendReply(c.id, preset)}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white text-zinc-300 border border-zinc-800 text-left shrink-0 transition-colors"
                        >
                          "{preset}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'UPLOAD' && (
      /* Main Grid: Upload Studio Left, Channel Stats & Claims Right */
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ==================== 1. PUBLISH / UPLOAD STUDIO (7 Cols) ==================== */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-mono text-white">
                  Publish Video / Premiere to YouTube
                </h3>
                <p className="text-xs font-sans text-zinc-400">
                  Target Channel: <span className="text-red-400 font-bold">{activeChannel.name}</span>
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Content ID Ready
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 font-sans text-xs">
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Video Title
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white p-3 rounded-xl focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Video Description & Links
              </label>
              <textarea
                rows={3}
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-zinc-200 p-3 rounded-xl focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Schedule Premiere Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-red-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Schedule Premiere Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-red-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                SEO Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={videoTags}
                onChange={(e) => setVideoTags(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-zinc-300 p-3 rounded-xl focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            {/* Options Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] pt-2">
              <label className="p-3 rounded-xl bg-black border border-zinc-900 flex items-center gap-2 cursor-pointer text-zinc-200">
                <input
                  type="checkbox"
                  checked={enableMonetization}
                  onChange={(e) => setEnableMonetization(e.target.checked)}
                  className="accent-red-500 rounded"
                />
                <span>Enable Monetization</span>
              </label>

              <label className="p-3 rounded-xl bg-black border border-zinc-900 flex items-center gap-2 cursor-pointer text-zinc-200">
                <input
                  type="checkbox"
                  checked={enableContentId}
                  onChange={(e) => setEnableContentId(e.target.checked)}
                  className="accent-red-500 rounded"
                />
                <span>Register Content ID</span>
              </label>

              <label className="p-3 rounded-xl bg-black border border-zinc-900 flex items-center gap-2 cursor-pointer text-zinc-200">
                <input
                  type="checkbox"
                  checked={formatAsShorts}
                  onChange={(e) => setFormatAsShorts(e.target.checked)}
                  className="accent-red-500 rounded"
                />
                <span>Auto-Format 9:16 Shorts</span>
              </label>
            </div>

            {/* Publish Button */}
            <button
              onClick={handlePublishVideo}
              disabled={isUploading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 mt-4"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Scheduling Premiere for {activeChannel.name}...</span>
                </>
              ) : (
                <>
                  <Youtube className="w-4 h-4" />
                  <span>Schedule Upload & Register Content ID Protection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ==================== 2. CHANNEL RECENT VIDEOS & COPYRIGHT CLAIMS (5 Cols) ==================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Channel Monetization Card */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 font-mono">
              <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" /> YouTube Partner Program
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                100% Monetized
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 rounded-2xl bg-black border border-zinc-900">
                <span className="text-lg font-bold text-white block">$14,280</span>
                <span className="text-[10px] text-zinc-500 uppercase">Est. Monthly RPM</span>
              </div>
              <div className="p-3 rounded-2xl bg-black border border-zinc-900">
                <span className="text-lg font-bold text-red-400 block">0 Active Claims</span>
                <span className="text-[10px] text-zinc-500 uppercase">Content ID Health</span>
              </div>
            </div>
          </div>

          {/* Recent Channel Uploads */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase">
                Recent Channel Videos ({recentVideos.length})
              </h4>
              <span className="text-[10px] font-mono text-zinc-500">Auto-Synced</span>
            </div>

            <div className="space-y-3">
              {recentVideos.map((vid) => (
                <div key={vid.id} className="p-3 rounded-2xl bg-black border border-zinc-900 flex items-center gap-3">
                  <img src={vid.thumbnail} alt={vid.title} className="w-16 h-12 rounded-xl object-cover border border-zinc-800 shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 space-y-1">
                    <h5 className="text-xs font-mono font-bold text-white line-clamp-1">{vid.title}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                      <span>👁 {vid.views}</span>
                      <span>❤️ {vid.likes}</span>
                      <span className="text-emerald-400">{vid.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}
