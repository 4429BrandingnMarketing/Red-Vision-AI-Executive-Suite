import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, Mail, Shield, Eye, Edit3, ShieldCheck, X, Check, 
  Copy, Send, Sparkles, Building, Key, AlertCircle, ArrowRight 
} from 'lucide-react';
import { UserAccessRole, CollaboratorInvite } from '../types/index.js';

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (invite: Omit<CollaboratorInvite, 'id' | 'invitedAt' | 'status' | 'inviteLink'>) => void;
}

export function InviteCollaboratorModal({
  isOpen,
  onClose,
  onSendInvite,
}: InviteCollaboratorModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accessRole, setAccessRole] = useState<UserAccessRole>('Editor');
  const [department, setDepartment] = useState('Acoustic Audio Suite');
  const [note, setNote] = useState('Welcome to the Red Vision Creative Studio Console!');
  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [generatedInviteUrl, setGeneratedInviteUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    const token = `inv_${Math.random().toString(36).substring(2, 9)}`;
    const inviteUrl = `https://redvisionai.com/invite/${token}?role=${accessRole.toLowerCase()}`;
    setGeneratedInviteUrl(inviteUrl);

    onSendInvite({
      email,
      name,
      accessRole,
      department,
      invitedBy: 'Jason Salvador (Owner)',
    });

    setInviteSent(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedInviteUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setAccessRole('Editor');
    setDepartment('Acoustic Audio Suite');
    setInviteSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60 text-left font-sans overflow-hidden ring-1 ring-red-500/30"
        >
          {/* Header Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>

          {!inviteSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Header Title */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    <Shield className="w-3 h-3 text-red-400" />
                    <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white tracking-tight">
                    Invite Studio Collaborator
                  </h3>
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Collaborator Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Bell"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-white font-sans text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Collaborator Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marcus@defjam.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-white font-sans text-xs focus:outline-none focus:border-red-500"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Access Role Radio Cards */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Assign Permissions Role
                </label>
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  {/* Editor Role Option */}
                  <div
                    onClick={() => setAccessRole('Editor')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                      accessRole === 'Editor'
                        ? 'bg-amber-950/40 border-amber-500/80 text-white shadow-lg shadow-amber-950/40'
                        : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>EDITOR</span>
                      </div>
                      {accessRole === 'Editor' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-[10px] font-sans text-zinc-400 leading-tight">
                      Can synthesize 24-bit audio, render 4K video, edit release checklists & chat.
                    </p>
                  </div>

                  {/* Viewer Role Option */}
                  <div
                    onClick={() => setAccessRole('Viewer')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                      accessRole === 'Viewer'
                        ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-lg shadow-cyan-950/40'
                        : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                        <Eye className="w-3.5 h-3.5" />
                        <span>VIEWER</span>
                      </div>
                      {accessRole === 'Viewer' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-[10px] font-sans text-zinc-400 leading-tight">
                      Read-only access: preview renders, inspect metrics & deliverables without edit rights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Selector */}
              <div>
                <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Department Assignment
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                >
                  <option value="Acoustic Audio Suite">Acoustic Audio Suite</option>
                  <option value="Motion Cinema Studio">Motion Cinema Studio</option>
                  <option value="Live Tour Logistics">Live Tour Logistics</option>
                  <option value="Publishing & IP Licensing">Publishing & IP Licensing</option>
                  <option value="Executive HQ">Executive HQ (Full Access)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 mt-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Send Collaborator Invitation</span>
              </button>
            </form>
          ) : (
            /* Invite Success State */
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-950/60">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  INVITATION DISPATCHED
                </span>
                <h3 className="text-xl font-bold font-mono text-white tracking-tight mt-1">
                  Collaborator Invited Successfully!
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-1">
                  An invitation email and access token have been issued to <strong className="text-white">{email}</strong> as an <strong className="text-amber-400 uppercase">{accessRole}</strong>.
                </p>
              </div>

              {/* Generated Invite Link Field */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 text-left space-y-2 font-mono text-xs">
                <span className="text-zinc-500 text-[10px] font-bold uppercase block">
                  DIRECT ACCESS INVITATION LINK
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedInviteUrl}
                    className="w-full bg-zinc-900 border border-zinc-800 text-red-400 p-2 rounded-lg text-xs font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase shrink-0 transition-colors flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-mono text-xs font-bold uppercase transition-all"
              >
                Close & Return to Studio Console
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
