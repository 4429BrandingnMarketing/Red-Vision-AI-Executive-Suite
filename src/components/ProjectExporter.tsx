import React, { useState } from 'react';
import { 
  Download, FileText, Table, CheckSquare, Square, X, Sparkles, 
  CheckCircle2, Layers, Calendar, BarChart3, Users, Building2, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_SUITE_VISUALS, INITIAL_RELEASES } from '../data/redVisionData.js';

interface ProjectExporterProps {
  onClose: () => void;
}

export function ProjectExporter({ onClose }: ProjectExporterProps) {
  const [includeStoryboards, setIncludeStoryboards] = useState(true);
  const [includeReleaseCalendar, setIncludeReleaseCalendar] = useState(true);
  const [includeGanttMilestones, setIncludeGanttMilestones] = useState(true);
  const [includeExecutiveRoster, setIncludeExecutiveRoster] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  // Generate CSV File Download
  const handleExportCSV = () => {
    setIsExporting(true);

    let csvContent = 'RED VISION CREATIVE STUDIO SUITE - CONSOLIDATED PROJECT REPORT (2027)\n';
    csvContent += `Generated Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
    csvContent += `Executive Lead: Jason Salvador / Red Vision Music\n\n`;

    if (includeReleaseCalendar) {
      csvContent += '--- 2027 RELEASE & ISRC DELIVERY CALENDAR ---\n';
      csvContent += 'ID,Artist,Title,ISRC,Target Release Date,Status,Audio Master,Motion Reel,ISRC Registered,Distribution Approved\n';
      INITIAL_RELEASES.forEach(rel => {
        csvContent += `"${rel.id}","${rel.artist}","${rel.title}","${rel.isrc}","${rel.releaseDate}","${rel.status}","${rel.checklist.audioMaster}","${rel.checklist.motionCinema}","${rel.checklist.isrcRegistered}","${rel.checklist.distributionApproved}"\n`;
      });
      csvContent += '\n';
    }

    if (includeGanttMilestones) {
      csvContent += '--- ACTIVE CREATIVE SUITES & GANTT MILESTONE SCHEDULES ---\n';
      csvContent += 'Suite ID,Suite Title,Category,Features\n';
      STUDIO_SUITE_VISUALS.forEach(s => {
        csvContent += `"${s.id}","${s.title}","${s.category}","${s.features.join(' | ')}"\n`;
      });
      csvContent += '\n';
    }

    if (includeExecutiveRoster) {
      csvContent += '--- AI EXECUTIVE STAFF ROSTER & DEPARTMENT COVERAGE ---\n';
      csvContent += 'Department,Key Lead,Capabilities\n';
      csvContent += 'Audio Architecture,Marcus Bell,24-Bit Mastering & Acoustic Sig AI\n';
      csvContent += 'Visual & Cinema,Elena Rostova,Gemini Omni 4K Motion Cinema\n';
      csvContent += 'Live & Routing,Victor Vance,IATA Flight & Venue Settlement Engine\n';
      csvContent += 'Legal & IP,Solomon Sterling Esq.,Copyright & ISRC Registry\n';
      csvContent += 'Radio Broadcast,Program Director,24/7 Red Vision Radio Network\n';
      csvContent += 'Fashion & Merch,Apparel Designer,3D Print-On-Demand Drop-Shipping\n';
      csvContent += 'Talent Management,Jason Salvador,360 Artist Representation & Sponsorships\n\n';
    }

    // Trigger CSV download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `red_vision_consolidated_project_report_2027.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExporting(false);
    setExportSuccessMsg('Consolidated CSV project report downloaded successfully!');
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  // Generate Styled Executive PDF Print Document
  const handleExportPDF = () => {
    setIsExporting(true);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to open the printable PDF document view.');
      setIsExporting(false);
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Red Vision Studio Suite - Executive Project Report (2027)</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #111; background: #fff; line-height: 1.5; }
            .header { border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 900; color: #dc2626; text-transform: uppercase; letter-spacing: 1px; }
            .title { font-size: 20px; font-weight: 800; margin-top: 5px; }
            .meta { font-size: 12px; color: #666; margin-top: 5px; }
            h2 { font-size: 16px; border-left: 4px solid #dc2626; padding-left: 10px; margin-top: 30px; text-transform: uppercase; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: 700; text-transform: uppercase; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: #fee2e2; color: #991b1b; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Red Vision Creative Studio Suite</div>
            <div class="title">Consolidated Executive Project & Delivery Report (2027)</div>
            <div class="meta">Generated for Jason Salvador / Red Vision Music • Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>

          ${includeReleaseCalendar ? `
            <h2>1. 2027 Release & Delivery Calendar</h2>
            <table>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Title / Track</th>
                  <th>ISRC Code</th>
                  <th>Target Release Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${INITIAL_RELEASES.map(r => `
                  <tr>
                    <td><strong>${r.artist}</strong></td>
                    <td>${r.title}</td>
                    <td><code style="color: #b91c1c;">${r.isrc}</code></td>
                    <td>${r.releaseDate}</td>
                    <td><span class="badge">${r.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          ${includeGanttMilestones ? `
            <h2>2. Active Creative Suites & Operational Infrastructure</h2>
            <table>
              <thead>
                <tr>
                  <th>Suite Title</th>
                  <th>Category</th>
                  <th>Key Features & Specifications</th>
                </tr>
              </thead>
              <tbody>
                ${STUDIO_SUITE_VISUALS.map(s => `
                  <tr>
                    <td><strong>${s.title}</strong></td>
                    <td>${s.category}</td>
                    <td>${s.features.join(', ')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          ${includeExecutiveRoster ? `
            <h2>3. AI Executive Staff Divisions</h2>
            <table>
              <thead>
                <tr>
                  <th>Division / Suite</th>
                  <th>Specialist Lead</th>
                  <th>Operational Coverage</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Audio Architecture</td><td>Marcus Bell</td><td>24-Bit Audio Mastering & Stem Separation</td></tr>
                <tr><td>Visual & Motion Cinema</td><td>Elena Rostova</td><td>Gemini Omni 4K Stop-Motion Rendering</td></tr>
                <tr><td>Live & Tour Routing</td><td>Victor Vance</td><td>IATA Flight Matrix & Venue Door Settlements</td></tr>
                <tr><td>Global Radio Network</td><td>Radio Program Director</td><td>24/7 Red Vision Radio & Satellite Syndication</td></tr>
                <tr><td>Fashion & Merch Division</td><td>3D Apparel Specialist</td><td>Zero-Upfront Print-On-Demand Drop Shipping</td></tr>
                <tr><td>Talent Management</td><td>Jason Salvador & Solomon Sterling Esq.</td><td>360 Roster Representation & Contract Audit</td></tr>
              </tbody>
            </table>
          ` : ''}

          <div class="footer">
            Official Red Vision Creative Studio Suite Executive Document • Confidential & Proprietary • 2027 All Rights Reserved
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    setIsExporting(false);
    setExportSuccessMsg('PDF Report preview launched! Select "Save as PDF" in your print dialog.');
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl rounded-3xl bg-zinc-950 border border-red-500/40 p-6 shadow-2xl space-y-6 relative overflow-hidden"
      >
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-sans flex items-center gap-2">
                <span>Export Executive Project Report</span>
                <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono text-[10px]">
                  2027 PDF & CSV
                </span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Consolidate your storyboards, releases, gantt schedules, and staff metrics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {exportSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 font-mono text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportSuccessMsg}</span>
          </div>
        )}

        {/* Section Inclusion Checkboxes */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            Select Sections to Include in Document
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            <button
              onClick={() => setIncludeReleaseCalendar(!includeReleaseCalendar)}
              className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                includeReleaseCalendar ? 'bg-red-950/60 border-red-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs font-bold font-sans">2027 Release Calendar</div>
                  <div className="text-[10px] font-mono text-zinc-400">ISRC codes & rollouts</div>
                </div>
              </div>
              {includeReleaseCalendar ? <CheckSquare className="w-4 h-4 text-red-400" /> : <Square className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIncludeGanttMilestones(!includeGanttMilestones)}
              className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                includeGanttMilestones ? 'bg-red-950/60 border-red-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs font-bold font-sans">Creative Suite Gantt</div>
                  <div className="text-[10px] font-mono text-zinc-400">All 8 suite schedules</div>
                </div>
              </div>
              {includeGanttMilestones ? <CheckSquare className="w-4 h-4 text-red-400" /> : <Square className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIncludeStoryboards(!includeStoryboards)}
              className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                includeStoryboards ? 'bg-red-950/60 border-red-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs font-bold font-sans">Canvas Storyboards</div>
                  <div className="text-[10px] font-mono text-zinc-400">Visual scenes & flows</div>
                </div>
              </div>
              {includeStoryboards ? <CheckSquare className="w-4 h-4 text-red-400" /> : <Square className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIncludeExecutiveRoster(!includeExecutiveRoster)}
              className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                includeExecutiveRoster ? 'bg-red-950/60 border-red-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs font-bold font-sans">AI Staff Roster</div>
                  <div className="text-[10px] font-mono text-zinc-400">20+ Executive divisions</div>
                </div>
              </div>
              {includeExecutiveRoster ? <CheckSquare className="w-4 h-4 text-red-400" /> : <Square className="w-4 h-4" />}
            </button>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
          >
            <Table className="w-4 h-4 text-emerald-400" />
            <span>Download CSV Data</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Executive PDF</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
