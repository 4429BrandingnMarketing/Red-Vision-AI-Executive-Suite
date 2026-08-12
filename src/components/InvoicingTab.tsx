import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, DollarSign, Download, CheckCircle2, Clock, AlertCircle, 
  Send, Plus, Filter, Search, Printer, ShieldCheck, Sparkles, Sliders, 
  ChevronRight, Calendar, User, Building, ArrowUpRight, Check, X
} from 'lucide-react';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  projectName: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  lineItems: {
    description: string;
    milestoneSuite: string;
    hours: number;
    hourlyRate: number;
    amount: number;
  }[];
  subtotal: number;
  taxRate: number; // percentage
  taxAmount: number;
  totalAmount: number;
  paymentMethod?: string;
  notes?: string;
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'RED-INV-2026-001',
    projectName: 'Midnight Echoes (24-Bit Album Master & 4K Cinema Trailer)',
    clientName: 'Siren Beats / Atlantic Records',
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    status: 'PAID',
    lineItems: [
      { description: '24-Bit / 96kHz Analog Mastering & Spatial Audio Mix', milestoneSuite: '24-Bit Acoustic Recording Suite', hours: 42, hourlyRate: 175, amount: 7350 },
      { description: '4K Motion Cinema Visualizer & Color Grading', milestoneSuite: '4K Motion Cinema Suite', hours: 38, hourlyRate: 150, amount: 5700 },
      { description: 'ISRC Global Distribution Validation & Metadata Lock', milestoneSuite: 'World Tour & Distro Hub', hours: 12, hourlyRate: 125, amount: 1500 }
    ],
    subtotal: 14550,
    taxRate: 8.5,
    taxAmount: 1236.75,
    totalAmount: 15786.75,
    paymentMethod: 'Wire Transfer (ACH)',
    notes: 'Payment received on Aug 05, 2026 via Chase Bank Wire.'
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'RED-INV-2026-002',
    projectName: 'Neon Odyssey 4K World Tour Teaser & VR Mix',
    clientName: 'Marcus Vance / Sony Music',
    issueDate: '2026-08-05',
    dueDate: '2026-08-20',
    status: 'PENDING',
    lineItems: [
      { description: '360° Ambisonics Spatial Audio Mix & VR Scene Rigging', milestoneSuite: '3D Executive & VR Suite', hours: 28, hourlyRate: 185, amount: 5180 },
      { description: 'NVENC GPU Cinema Video Rendering & Multi-Format Edits', milestoneSuite: '4K Motion Cinema Suite', hours: 24, hourlyRate: 150, amount: 3600 }
    ],
    subtotal: 8780,
    taxRate: 8.5,
    taxAmount: 746.30,
    totalAmount: 9526.30,
    paymentMethod: 'Net 15 Corporate Credit Card',
    notes: 'Invoice sent via client portal. Pending payment approval.'
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'RED-INV-2026-003',
    projectName: 'Cyberpunk 8K Merch Artwork & Studio Production Book',
    clientName: 'Elena Rostova / Red Vision Publishing',
    issueDate: '2026-07-15',
    dueDate: '2026-07-30',
    status: 'OVERDUE',
    lineItems: [
      { description: '8K CMYK Print Artwork & 3D Claymerch Physical Prototypes', milestoneSuite: 'Studio Hardcover Publishing', hours: 30, hourlyRate: 140, amount: 4200 },
      { description: 'Hardcover Collector Book Typesetting & Layout', milestoneSuite: 'Studio Hardcover Publishing', hours: 25, hourlyRate: 130, amount: 3250 }
    ],
    subtotal: 7450,
    taxRate: 8.5,
    taxAmount: 633.25,
    totalAmount: 8083.25,
    notes: 'Second reminder sent to accounts payable on Aug 10, 2026.'
  }
];

export function InvoicingTab() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

  // Form for creating a new invoice based on Gantt hours
  const [newProjectName, setNewProjectName] = useState('World Tour 2026 Stadium Teaser');
  const [newClientName, setNewClientName] = useState('Clayton / Red Vision Live');
  const [newHoursRecording, setNewHoursRecording] = useState(35);
  const [newHoursCinema, setNewHoursCinema] = useState(20);

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter === 'ALL') return true;
    return inv.status === statusFilter;
  });

  const totalRevenuePaid = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.totalAmount, 0);
  const totalPending = invoices.filter(i => i.status === 'PENDING').reduce((sum, i) => sum + i.totalAmount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'OVERDUE').reduce((sum, i) => sum + i.totalAmount, 0);

  const handleCreateInvoice = () => {
    const rateRec = 175;
    const rateCin = 150;
    const recAmt = newHoursRecording * rateRec;
    const cinAmt = newHoursCinema * rateCin;
    const subtotal = recAmt + cinAmt;
    const taxAmount = subtotal * 0.085;
    const totalAmount = subtotal + taxAmount;

    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `RED-INV-2026-00${invoices.length + 1}`,
      projectName: newProjectName,
      clientName: newClientName,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'PENDING',
      lineItems: [
        { description: 'Tracked Gantt Milestone: 24-Bit Audio Recording & Mixing', milestoneSuite: '24-Bit Acoustic Recording Suite', hours: newHoursRecording, hourlyRate: rateRec, amount: recAmt },
        { description: 'Tracked Gantt Milestone: 4K Motion Cinema Visuals', milestoneSuite: '4K Motion Cinema Suite', hours: newHoursCinema, hourlyRate: rateCin, amount: cinAmt }
      ],
      subtotal,
      taxRate: 8.5,
      taxAmount,
      totalAmount,
      notes: 'Generated automatically from Studio Console Gantt timeline tracked hours.'
    };

    setInvoices([newInv, ...invoices]);
    setShowNewInvoiceModal(false);
  };

  const handleDownloadPdf = (inv: InvoiceItem) => {
    // Generate a printable/downloadable HTML PDF blob or trigger print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open and print/download the PDF invoice.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${inv.invoiceNumber} - Red Vision Studio</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #dc2626; letter-spacing: 2px; }
            .invoice-title { text-align: right; }
            .details { display: flex; justify-content: space-between; margin: 30px 0; }
            table { w-full; width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-size: 12px; text-transform: uppercase; }
            .totals { margin-top: 30px; float: right; width: 300px; }
            .totals table { border: none; }
            .totals td { border: none; padding: 6px 12px; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; }
            .paid { background-color: #dcfce7; color: #166534; }
            .pending { background-color: #fef3c7; color: #92400e; }
            .overdue { background-color: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">RED VISION STUDIO</div>
              <div style="font-size: 12px; color: #64748b;">Hollywood Entertainment & High-Fidelity Audio DSP</div>
            </div>
            <div class="invoice-title">
              <h2 style="margin: 0; color: #0f172a;">INVOICE</h2>
              <div style="font-family: monospace; font-size: 14px; color: #dc2626; font-weight: bold;">${inv.invoiceNumber}</div>
            </div>
          </div>

          <div class="details">
            <div>
              <strong>Billed To:</strong><br />
              ${inv.clientName}<br />
              Project: ${inv.projectName}
            </div>
            <div style="text-align: right;">
              <strong>Issue Date:</strong> ${inv.issueDate}<br />
              <strong>Due Date:</strong> ${inv.dueDate}<br />
              <strong>Status:</strong> <span class="badge ${inv.status.toLowerCase()}">${inv.status}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Milestone / Description</th>
                <th>Suite</th>
                <th>Tracked Hours</th>
                <th>Hourly Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${inv.lineItems.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.milestoneSuite}</td>
                  <td>${item.hours} hrs</td>
                  <td>$${item.hourlyRate}/hr</td>
                  <td>$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <table>
              <tr>
                <td>Subtotal:</td>
                <td style="text-align: right; font-weight: bold;">$${inv.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td>Tax (${inv.taxRate}%):</td>
                <td style="text-align: right; font-weight: bold;">$${inv.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr style="font-size: 18px; color: #dc2626;">
                <td><strong>Total:</strong></td>
                <td style="text-align: right;"><strong>$${inv.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></td>
              </tr>
            </table>
          </div>

          <div style="clear: both; margin-top: 60px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p><strong>Payment Terms:</strong> Net 14 Days. Please remit payment via ACH Wire Transfer or Red Vision Client Portal.</p>
            <p>Red Vision Studio Inc. • 100 Executive Studio Way, Hollywood, CA • support@redvision.studio</p>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8 font-sans text-left">
      {/* Top Section Banner */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <DollarSign className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>GANTT-INTEGRATED INVOICING & PAYMENTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase">
              Financial Control & PDF Invoicing
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
              Auto-generate professional PDF invoices from project hours tracked in the Gantt Timeline. Monitor payments and revenue locks.
            </p>
          </div>

          <button
            onClick={() => setShowNewInvoiceModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 shrink-0 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            aria-label="Create New Invoice from Gantt Hours"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Invoice from Gantt</span>
          </button>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-2xl bg-black border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Total Paid Revenue
            </span>
            <div className="text-2xl font-bold text-white">
              ${totalRevenuePaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-zinc-500">100% Cleared via ACH / Card</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-amber-500/30 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Pending Invoices
            </span>
            <div className="text-2xl font-bold text-white">
              ${totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-zinc-500">Awaiting Client Approval</span>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-red-500/30 space-y-1">
            <span className="text-[10px] text-red-400 font-bold uppercase flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Overdue Invoices
            </span>
            <div className="text-2xl font-bold text-white">
              ${totalOverdue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-zinc-500">Net 14 Days Expired</span>
          </div>
        </div>
      </div>

      {/* Invoice Filter Strip */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 font-mono text-xs flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-[10px] uppercase font-bold mr-2">Filter Status:</span>
          {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                statusFilter === st
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-black border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <span className="text-zinc-500 text-[11px]">
          Showing <strong>{filteredInvoices.length}</strong> invoice statement(s)
        </span>
      </div>

      {/* Invoices Grid / Table */}
      <div className="space-y-4">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id}
            className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 hover:border-red-500/60 transition-all space-y-4 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-red-400">{inv.invoiceNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    inv.status === 'PAID' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    inv.status === 'PENDING' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-sans">{inv.projectName}</h3>
                <p className="text-xs text-zinc-400 font-sans">Client: <strong className="text-zinc-200">{inv.clientName}</strong></p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase block">Total Statement</span>
                  <span className="text-2xl font-bold text-white">${inv.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase border border-zinc-800 flex items-center gap-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    aria-label={`View itemized details for invoice ${inv.invoiceNumber}`}
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPdf(inv)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-md shadow-red-600/30 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    aria-label={`Download PDF invoice for ${inv.invoiceNumber}`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Line Items Preview */}
            <div className="bg-black/80 rounded-2xl p-4 border border-zinc-900 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Tracked Milestone Breakdown:</span>
              <div className="divide-y divide-zinc-900 space-y-2 pt-1">
                {inv.lineItems.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between gap-4 text-[11px]">
                    <div className="truncate">
                      <strong className="text-zinc-200 font-sans block truncate">{item.description}</strong>
                      <span className="text-[10px] text-zinc-500">{item.milestoneSuite} • {item.hours} hrs @ ${item.hourlyRate}/hr</span>
                    </div>
                    <span className="text-amber-400 font-bold shrink-0">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Details Inspector Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 text-left font-sans shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-red-400">{selectedInvoice.invoiceNumber}</span>
                  <h3 className="text-xl font-bold text-white">{selectedInvoice.projectName}</h3>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs bg-black p-4 rounded-2xl border border-zinc-900">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Client Name</span>
                  <strong className="text-white">{selectedInvoice.clientName}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Payment Method</span>
                  <strong className="text-amber-400">{selectedInvoice.paymentMethod || 'ACH Wire Transfer'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Issue Date</span>
                  <span className="text-zinc-300">{selectedInvoice.issueDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Due Date</span>
                  <span className="text-zinc-300">{selectedInvoice.dueDate}</span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Itemized Hours & Milestones</span>
                <div className="bg-black rounded-2xl p-4 border border-zinc-900 space-y-2">
                  {selectedInvoice.lineItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0">
                      <div>
                        <strong className="text-white block font-sans">{item.description}</strong>
                        <span className="text-[10px] text-zinc-500">{item.hours} hrs @ ${item.hourlyRate}/hr</span>
                      </div>
                      <span className="text-white font-bold">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-900 pt-4 font-mono text-xs space-y-1 text-right">
                <div className="text-zinc-400">Subtotal: <strong className="text-white">${selectedInvoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></div>
                <div className="text-zinc-400">Tax ({selectedInvoice.taxRate}%): <strong className="text-white">${selectedInvoice.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></div>
                <div className="text-lg font-bold text-red-400 pt-2">Total Amount: ${selectedInvoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-mono font-bold uppercase"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadPdf(selectedInvoice)}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase flex items-center gap-2 shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create Invoice Modal */}
        {showNewInvoiceModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-5 text-left font-sans shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h3 className="text-lg font-bold text-white font-mono uppercase">Generate Invoice from Gantt Hours</h3>
                <button onClick={() => setShowNewInvoiceModal(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold uppercase text-[10px]">Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-bold uppercase text-[10px]">Client / Record Label</label>
                  <input
                    type="text"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-bold uppercase text-[10px]">Audio Recording Hours ($175/hr)</label>
                    <input
                      type="number"
                      value={newHoursRecording}
                      onChange={(e) => setNewHoursRecording(Number(e.target.value))}
                      className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-bold uppercase text-[10px]">4K Cinema Hours ($150/hr)</label>
                    <input
                      type="number"
                      value={newHoursCinema}
                      onChange={(e) => setNewHoursCinema(Number(e.target.value))}
                      className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateInvoice}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-mono text-xs font-bold uppercase shadow-md"
                >
                  Generate Statement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
