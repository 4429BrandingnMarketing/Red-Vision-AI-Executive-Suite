import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, Move, ArrowRight, Check, RefreshCw, 
  Filter, Youtube, Facebook, Instagram, Share2, Disc, Layers, Plus, 
  ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Sparkles, Sliders
} from 'lucide-react';

export interface ScheduledChannelPost {
  id: string;
  title: string;
  channel: 'YouTube' | 'Facebook' | 'Instagram' | 'TikTok' | 'X' | 'Spotify DSP';
  scheduledDate: string; // YYYY-MM-DD
  timeSlot: string;
  status: 'Scheduled' | 'Published' | 'Pending Review';
  thumbnail?: string;
  color: string;
}

const INITIAL_SCHEDULED_POSTS: ScheduledChannelPost[] = [
  {
    id: 'post-101',
    title: 'Clayton - Hyper-Clean 808 Trap (Official Video)',
    channel: 'YouTube',
    scheduledDate: '2026-08-14',
    timeSlot: '12:00 PM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    color: '#ef4444'
  },
  {
    id: 'post-102',
    title: '24-Bit Sub-bass Audio Rule for Social Compression',
    channel: 'Instagram',
    scheduledDate: '2026-08-14',
    timeSlot: '03:00 PM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
    color: '#ec4899'
  },
  {
    id: 'post-103',
    title: 'Red Vision World Tour 2026 Presale Announcement',
    channel: 'Facebook',
    scheduledDate: '2026-08-15',
    timeSlot: '10:00 AM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80',
    color: '#3b82f6'
  },
  {
    id: 'post-104',
    title: '4K Motion Cinema Visualizer Breakdown (15s Reel)',
    channel: 'TikTok',
    scheduledDate: '2026-08-16',
    timeSlot: '06:00 PM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80',
    color: '#10b981'
  },
  {
    id: 'post-105',
    title: 'Midnight Echoes Single Drop on Spotify & Apple Music',
    channel: 'Spotify DSP',
    scheduledDate: '2026-08-18',
    timeSlot: '12:00 AM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
    color: '#22c55e'
  },
  {
    id: 'post-106',
    title: 'Unpopular Opinion: Major Labels vs Direct ISRC',
    channel: 'X',
    scheduledDate: '2026-08-19',
    timeSlot: '02:00 PM EST',
    status: 'Scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    color: '#38bdf8'
  }
];

export function BulkCalendarView() {
  const [posts, setPosts] = useState<ScheduledChannelPost[]>(INITIAL_SCHEDULED_POSTS);
  const [channelFilter, setChannelFilter] = useState<string>('ALL');
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [selectedPostForEdit, setSelectedPostForEdit] = useState<ScheduledChannelPost | null>(null);
  const [rescheduleNotice, setRescheduleNotice] = useState<string | null>(null);

  // Calendar dates generation for mid-August 2026
  const calendarDays = [
    { date: '2026-08-10', dayName: 'Mon', dayNum: '10' },
    { date: '2026-08-11', dayName: 'Tue', dayNum: '11' },
    { date: '2026-08-12', dayName: 'Wed', dayNum: '12' },
    { date: '2026-08-13', dayName: 'Thu', dayNum: '13' },
    { date: '2026-08-14', dayName: 'Fri', dayNum: '14' },
    { date: '2026-08-15', dayName: 'Sat', dayNum: '15' },
    { date: '2026-08-16', dayName: 'Sun', dayNum: '16' },
    { date: '2026-08-17', dayName: 'Mon', dayNum: '17' },
    { date: '2026-08-18', dayName: 'Tue', dayNum: '18' },
    { date: '2026-08-19', dayName: 'Wed', dayNum: '19' },
    { date: '2026-08-20', dayName: 'Thu', dayNum: '20' },
    { date: '2026-08-21', dayName: 'Fri', dayNum: '21' },
    { date: '2026-08-22', dayName: 'Sat', dayNum: '22' },
    { date: '2026-08-23', dayName: 'Sun', dayNum: '23' },
  ];

  const filteredPosts = posts.filter(p => channelFilter === 'ALL' || p.channel === channelFilter);

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedPostId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnDate = (e: React.DragEvent, targetDate: string) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (!postId) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, scheduledDate: targetDate };
      }
      return p;
    }));

    const movedPost = posts.find(p => p.id === postId);
    if (movedPost) {
      setRescheduleNotice(`Rescheduled "${movedPost.title}" to ${targetDate}`);
      setTimeout(() => setRescheduleNotice(null), 3500);
    }
    setDraggedPostId(null);
  };

  // Bulk Reschedule Shift Actions (+1 Day, +1 Week)
  const handleBulkShift = (daysToAdd: number) => {
    setPosts(prev => prev.map(p => {
      const parts = p.scheduledDate.split('-');
      const current = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      current.setDate(current.getDate() + daysToAdd);
      const newY = current.getFullYear();
      const newM = String(current.getMonth() + 1).padStart(2, '0');
      const newD = String(current.getDate()).padStart(2, '0');
      return { ...p, scheduledDate: `${newY}-${newM}-${newD}` };
    }));

    setRescheduleNotice(`Bulk shifted all ${posts.length} posts by ${daysToAdd > 0 ? `+${daysToAdd}` : daysToAdd} days!`);
    setTimeout(() => setRescheduleNotice(null), 3500);
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Reschedule Toast */}
      <AnimatePresence>
        {rescheduleNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border border-red-500/80 text-white font-mono text-xs flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{rescheduleNotice}</span>
            </div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Auto-Synced</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Controls Bar */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-1">
              <CalendarIcon className="w-4 h-4 text-red-500" />
              BULK MULTI-CHANNEL CALENDAR VIEW
            </div>
            <h2 className="text-xl font-bold text-white font-sans">
              Drag-and-Drop Social & Release Rescheduler
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Drag post cards between calendar days to instantly update publishing schedules across YouTube, Meta, TikTok, X, and DSPs.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bulk Shift Buttons */}
            <button
              onClick={() => handleBulkShift(1)}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold uppercase transition-colors"
            >
              +1 Day All
            </button>
            <button
              onClick={() => handleBulkShift(7)}
              className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-colors shadow-lg shadow-red-600/30"
            >
              +1 Week All
            </button>
          </div>
        </div>

        {/* Channel Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
          <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">Channel Filter:</span>
          {['ALL', 'YouTube', 'Facebook', 'Instagram', 'TikTok', 'X', 'Spotify DSP'].map(ch => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
                channelFilter === ch
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-black border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {calendarDays.map(day => {
            const daysPosts = filteredPosts.filter(p => p.scheduledDate === day.date);
            const isToday = day.date === '2026-08-12';

            return (
              <div
                key={day.date}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnDate(e, day.date)}
                className={`p-3 rounded-2xl border min-h-[160px] flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-red-950/20 border-red-500/60 ring-1 ring-red-500/30'
                    : 'bg-black border-zinc-900 hover:border-zinc-800'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-zinc-400 uppercase">{day.dayName}</span>
                    <span className={`font-mono text-sm font-bold ${isToday ? 'text-red-400 font-extrabold' : 'text-white'}`}>
                      {day.dayNum}
                    </span>
                  </div>
                  {isToday && (
                    <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-mono font-bold uppercase">
                      TODAY
                    </span>
                  )}
                </div>

                {/* Day Posts List */}
                <div className="space-y-2 flex-1">
                  {daysPosts.map(post => (
                    <motion.div
                      key={post.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, post.id)}
                      onClick={() => setSelectedPostForEdit(post)}
                      whileHover={{ scale: 1.02 }}
                      className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-red-500/80 cursor-grab active:cursor-grabbing space-y-1 shadow-md group"
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span
                          className="px-1.5 py-0.5 rounded font-bold text-white uppercase"
                          style={{ backgroundColor: post.color }}
                        >
                          {post.channel}
                        </span>
                        <span className="text-zinc-500 text-[9px]">{post.timeSlot}</span>
                      </div>

                      <p className="text-[11px] font-sans text-zinc-200 line-clamp-2 font-medium leading-snug">
                        {post.title}
                      </p>

                      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-1 border-t border-zinc-800/80">
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Move className="w-2.5 h-2.5 text-zinc-500" /> Drag to move
                        </span>
                        <span className="text-emerald-400 font-bold">{post.status}</span>
                      </div>
                    </motion.div>
                  ))}

                  {daysPosts.length === 0 && (
                    <div className="h-full flex items-center justify-center text-[10px] font-mono text-zinc-700 border border-dashed border-zinc-900 rounded-xl p-2 text-center">
                      Drop post here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal / Quick Details Drawer */}
      {selectedPostForEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-md w-full space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-white uppercase text-sm">Reschedule Post Details</span>
              <button onClick={() => setSelectedPostForEdit(null)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Post Title</label>
                <input
                  type="text"
                  value={selectedPostForEdit.title}
                  onChange={(e) => setSelectedPostForEdit({ ...selectedPostForEdit, title: e.target.value })}
                  className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-red-500 focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={selectedPostForEdit.scheduledDate}
                    onChange={(e) => setSelectedPostForEdit({ ...selectedPostForEdit, scheduledDate: e.target.value })}
                    className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-red-500 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={selectedPostForEdit.timeSlot}
                    onChange={(e) => setSelectedPostForEdit({ ...selectedPostForEdit, timeSlot: e.target.value })}
                    className="w-full bg-black border border-zinc-800 text-white p-2.5 rounded-xl focus:border-red-500 focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setPosts(prev => prev.map(p => p.id === selectedPostForEdit.id ? selectedPostForEdit : p));
                  setSelectedPostForEdit(null);
                  setRescheduleNotice(`Updated schedule for "${selectedPostForEdit.title}"`);
                  setTimeout(() => setRescheduleNotice(null), 3000);
                }}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold uppercase transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
