import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, UserPlus, Eye, Edit3, ShieldCheck, Lock, Users, 
  Trash2, Mail, Check, AlertCircle, Sparkles, RefreshCw, Copy, CheckCircle2, X 
} from 'lucide-react';
import { TeamMember, UserAccessRole, CollaboratorInvite } from '../types/index.js';

interface RBACManagementPanelProps {
  teamMembers: TeamMember[];
  onUpdateMemberRole: (memberId: string, newRole: UserAccessRole) => void;
  onRemoveMember: (memberId: string) => void;
  invites: CollaboratorInvite[];
  onOpenInviteModal: () => void;
  onRevokeInvite: (inviteId: string) => void;
  currentActiveUserRole: UserAccessRole;
  onSwitchActiveUserRole: (role: UserAccessRole) => void;
}

export function RBACManagementPanel({
  teamMembers,
  onUpdateMemberRole,
  onRemoveMember,
  invites,
  onOpenInviteModal,
  onRevokeInvite,
  currentActiveUserRole,
  onSwitchActiveUserRole,
}: RBACManagementPanelProps) {
  const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);

  const handleCopyInviteLink = async (invite: CollaboratorInvite) => {
    try {
      await navigator.clipboard.writeText(invite.inviteLink);
      setCopiedInviteId(invite.id);
      setTimeout(() => setCopiedInviteId(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const getRoleBadgeStyle = (role: UserAccessRole) => {
    switch (role) {
      case 'Owner':
        return 'bg-gradient-to-r from-red-950 to-rose-950 border-red-500/80 text-red-300 shadow-md shadow-red-950/50';
      case 'Editor':
        return 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-md shadow-amber-950/50';
      case 'Viewer':
        return 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300 shadow-md shadow-cyan-950/50';
      default:
        return 'bg-zinc-900 border-zinc-800 text-zinc-300';
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* 1. Active Context Persona Switcher */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-red-500/40 shadow-2xl space-y-4 relative overflow-hidden transition-all duration-300 hover:border-red-500/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
              <Shield className="w-3 h-3 text-red-400" />
              <span>ROLE-BASED ACCESS CONTROL (RBAC) CONTEXT</span>
            </div>
            <h3 className="text-xl font-bold font-mono text-white tracking-tight">
              Active Console Permissions Simulator
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Switch your active persona to test how Studio Console permissions adapt for Editors & Viewers.
            </p>
          </div>

          <button
            onClick={onOpenInviteModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-red-600/30 shrink-0"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>Invite Collaborator</span>
          </button>
        </div>

        {/* Persona Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          {/* Owner Role Switch */}
          <button
            onClick={() => onSwitchActiveUserRole('Owner')}
            className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
              currentActiveUserRole === 'Owner'
                ? 'bg-red-950/60 border-red-500 text-white shadow-xl shadow-red-950/60 ring-1 ring-red-500/50'
                : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-red-400">
                <ShieldCheck className="w-4 h-4" />
                <span>OWNER / ADMIN</span>
              </div>
              {currentActiveUserRole === 'Owner' && <Check className="w-4 h-4 text-red-400" />}
            </div>
            <p className="text-[10px] font-sans text-zinc-400">
              Unrestricted full studio access, AI generation, and collaborator role editing.
            </p>
          </button>

          {/* Editor Role Switch */}
          <button
            onClick={() => onSwitchActiveUserRole('Editor')}
            className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
              currentActiveUserRole === 'Editor'
                ? 'bg-amber-950/60 border-amber-500 text-white shadow-xl shadow-amber-950/60 ring-1 ring-amber-500/50'
                : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Edit3 className="w-4 h-4" />
                <span>EDITOR ROLE</span>
              </div>
              {currentActiveUserRole === 'Editor' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[10px] font-sans text-zinc-400">
              Can synthesize audio, render 4K video, update checklists & chat in channels.
            </p>
          </button>

          {/* Viewer Role Switch */}
          <button
            onClick={() => onSwitchActiveUserRole('Viewer')}
            className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
              currentActiveUserRole === 'Viewer'
                ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-500/50'
                : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                <Eye className="w-4 h-4" />
                <span>VIEWER ROLE</span>
              </div>
              {currentActiveUserRole === 'Viewer' && <Check className="w-4 h-4 text-cyan-400" />}
            </div>
            <p className="text-[10px] font-sans text-zinc-400">
              Read-only mode: preview deliverables & metrics. AI synthesis triggers restricted.
            </p>
          </button>
        </div>
      </div>

      {/* 2. Active Roster & Role Assignment Table */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wider">
            <Users className="w-4 h-4 text-red-500" />
            <span>Active Collaborators Roster ({teamMembers.length})</span>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {currentActiveUserRole === 'Owner' ? 'Role Editing Enabled' : 'Role Editing Restricted to Owner'}
          </span>
        </div>

        <div className="space-y-3">
          {teamMembers.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-black border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-10 h-10 rounded-xl object-cover border border-red-800/60 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono text-white">{m.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${getRoleBadgeStyle(m.accessRole)}`}>
                      {m.accessRole}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">
                    {m.role} • <span className="text-zinc-500">{m.email || 'jason@redvisionmusic.com'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Role Switcher Selector (Only editable if Owner) */}
                {currentActiveUserRole === 'Owner' && m.accessRole !== 'Owner' ? (
                  <select
                    value={m.accessRole}
                    onChange={(e) => onUpdateMemberRole(m.id, e.target.value as UserAccessRole)}
                    className="bg-zinc-900 border border-zinc-700 text-white font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500"
                  >
                    <option value="Editor">Editor Role</option>
                    <option value="Viewer">Viewer Role</option>
                  </select>
                ) : (
                  <span className="text-xs font-mono text-zinc-500 italic">
                    {m.accessRole === 'Owner' ? 'Workspace Owner' : `${m.accessRole} Permissions`}
                  </span>
                )}

                {/* Remove Member Button */}
                {currentActiveUserRole === 'Owner' && m.accessRole !== 'Owner' && (
                  <button
                    onClick={() => onRemoveMember(m.id)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950 hover:text-red-400 text-zinc-500 border border-zinc-800 transition-colors"
                    title="Remove Collaborator"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pending Collaborator Invitations */}
      {invites.length > 0 && (
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-amber-400 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Pending Collaborator Invitations ({invites.length})</span>
            </div>
          </div>

          <div className="space-y-3">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl bg-black border border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{inv.name}</span>
                    <span className="text-amber-400">({inv.email})</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300 font-bold uppercase text-[9px]">
                      {inv.accessRole}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    Department: {inv.department} • Invited by: {inv.invitedBy} ({inv.invitedAt})
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleCopyInviteLink(inv)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase transition-colors flex items-center gap-1"
                  >
                    {copiedInviteId === inv.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedInviteId === inv.id ? 'Copied' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => onRevokeInvite(inv.id)}
                    className="p-1.5 rounded-xl bg-zinc-900 hover:bg-red-950 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors"
                    title="Revoke Invitation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Granular RBAC Permissions Matrix Grid */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wider">
            <Lock className="w-4 h-4 text-red-500" />
            <span>Studio Console RBAC Capabilities Matrix</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <th className="py-3 px-4">Studio Feature / Module</th>
                <th className="py-3 px-4 text-red-400 font-bold">OWNER / ADMIN</th>
                <th className="py-3 px-4 text-amber-400 font-bold">EDITOR ROLE</th>
                <th className="py-3 px-4 text-cyan-400 font-bold">VIEWER ROLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">24-Bit Acoustic Sig Audio Synthesis</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Full Synthesis</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Full Synthesis</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Preview Only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Gemini Omni 4K Motion Cinema Render</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Render 4K Reels</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Render 4K Reels</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Preview Only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Release Calendar & Checklist Updates</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Full Edit Rights</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Full Edit Rights</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Read Only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Client Dashboard & Deliverable Exports</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Download & Share</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Download & Share</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Download Allowed</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Collaborator Management & Invites</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Invite & Change Roles</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Restricted</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Restricted</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Isolated API Key Vault Management</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">✓ Full Vault Control</td>
                <td className="py-3 px-4 text-amber-300 font-bold">🔑 Personal Key Only</td>
                <td className="py-3 px-4 text-zinc-500">🚫 Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
