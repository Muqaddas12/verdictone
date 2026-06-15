"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Gavel, ArrowUpRight, X, Scale, Clock, FileText, CheckCircle2, MapPin, Phone, Mail, User } from "lucide-react";

const allCases = [
  {
    id: "SC/2026/1024",
    title: "State of Gujarat vs. Ahmed Khan",
    court: "Supreme Court of India",
    type: "Writ Petition",
    status: "Active",
    nextHearing: "22 July 2026",
    hearingTime: "10:30 AM",
    filedOn: "12 Jan 2026",
    advocate: "Adv. Priya Sharma",
    advocatePhone: "+91 98765 43210",
    advocateEmail: "priya.sharma@legalfirm.com",
    caseDetails: "Writ petition filed under Article 32 of the Constitution of India challenging the detention order passed by the Gujarat authorities. The case involves questions of fundamental rights and personal liberty.",
    opposingParty: "State of Gujarat",
    courtRoom: "Court Room No. 3, Supreme Court",
    lastUpdated: "15 Jun 2026",
    statusHistory: [
      { label: "Petition Filed", date: "12 Jan 2026", status: "completed" },
      { label: "Documents Submitted", date: "28 Feb 2026", status: "completed" },
      { label: "Notice Issued", date: "15 Mar 2026", status: "completed" },
      { label: "Awaiting Hearing", date: "22 Jul 2026", status: "in-progress" },
    ],
  },
  {
    id: "HC/2026/0891",
    title: "Ahmed Khan vs. Municipal Corp.",
    court: "High Court of Gujarat",
    type: "Civil Appeal",
    status: "Active",
    nextHearing: "05 Aug 2026",
    hearingTime: "11:00 AM",
    filedOn: "03 Feb 2026",
    advocate: "Adv. Priya Sharma",
    advocatePhone: "+91 98765 43210",
    advocateEmail: "priya.sharma@legalfirm.com",
    caseDetails: "Appeal against the order of the Municipal Corporation regarding property tax assessment. Dispute involves valuation of commercial property in Paldi, Ahmedabad.",
    opposingParty: "Ahmedabad Municipal Corporation",
    courtRoom: "Court Room No. 7, High Court",
    lastUpdated: "01 Jun 2026",
    statusHistory: [
      { label: "Appeal Filed", date: "03 Feb 2026", status: "completed" },
      { label: "Notice Served", date: "20 Feb 2026", status: "completed" },
      { label: "Awaiting Hearing", date: "05 Aug 2026", status: "in-progress" },
    ],
  },
  {
    id: "DL/2025/4523",
    title: "Property Dispute — Khan Family",
    court: "District Court, Ahmedabad",
    type: "Civil Suit",
    status: "Closed",
    nextHearing: "—",
    hearingTime: "—",
    filedOn: "18 Sep 2025",
    advocate: "Adv. Rohan Mehta",
    advocatePhone: "+91 98765 11223",
    advocateEmail: "rohan.mehta@legalfirm.com",
    caseDetails: "Property dispute regarding ancestral property in the Khan family. Case resolved through mutual settlement. Final decree passed by the District Court.",
    opposingParty: "Khan Family Members",
    courtRoom: "Court Room No. 2, District Court",
    lastUpdated: "10 Mar 2026",
    statusHistory: [
      { label: "Suit Filed", date: "18 Sep 2025", status: "completed" },
      { label: "Evidence Presented", date: "15 Nov 2025", status: "completed" },
      { label: "Final Arguments", date: "20 Feb 2026", status: "completed" },
      { label: "Case Closed", date: "10 Mar 2026", status: "completed" },
    ],
  },
];

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const openDetail = (c) => {
    setSelectedCase(c);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setTimeout(() => setSelectedCase(null), 300);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">My Cases</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Track all your legal matters in one place</p>
          </div>
          <span className="px-3 py-1.5 bg-[#1d4ed8]/10 text-[#1d4ed8] text-xs md:text-sm font-semibold rounded-full self-start">
            {allCases.filter((c) => c.status === "Active").length} Active
          </span>
        </div>
      </motion.div>

      {/* Case List */}
      <div className="space-y-4 md:space-y-6">
        {allCases.map((c, idx) => (
          <motion.div
            key={c.id}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => openDetail(c)}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-1 text-[10px] md:text-xs font-semibold rounded-full ${
                    c.status === "Active" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono text-slate-400">{c.id}</span>
                </div>
                <h3 className="text-base md:text-xl font-bold text-[#0f172a] leading-tight">{c.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">{c.type} • {c.court}</p>
              </div>
              <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next: <strong className="text-[#0f172a]">{c.nextHearing}</strong></span>
                </div>
                <button className="p-2 md:p-2.5 bg-[#0f172a] text-white rounded-xl hover:bg-[#1e293b] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100 flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Gavel className="w-3.5 h-3.5 text-slate-400" /> {c.advocate}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Filed: {c.filedOn}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Case Detail Overlay ─── */}
      <AnimatePresence>
        {showDetail && selectedCase && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-0 md:pt-10 px-0 md:px-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={closeDetail} />

            {/* Detail Card */}
            <motion.div
              className="relative z-10 w-full md:max-w-3xl bg-white md:rounded-3xl shadow-2xl min-h-screen md:min-h-0 overflow-y-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 md:px-8 py-4 md:py-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#0f172a]">Case Details</h2>
                    <p className="text-xs text-slate-400">{selectedCase.id}</p>
                  </div>
                </div>
                <button onClick={closeDetail} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {/* Status + Title */}
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                  selectedCase.status === "Active" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-slate-100 text-slate-500"
                }`}>
                  {selectedCase.status}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] leading-tight">{selectedCase.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedCase.type} • {selectedCase.court}</p>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: Calendar, label: "Next Hearing", value: selectedCase.nextHearing !== "—" ? `${selectedCase.nextHearing} at ${selectedCase.hearingTime}` : "N/A" },
                    { icon: Calendar, label: "Filed On", value: selectedCase.filedOn },
                    { icon: Gavel, label: "Opposing Party", value: selectedCase.opposingParty },
                    { icon: MapPin, label: "Court Room", value: selectedCase.courtRoom },
                    { icon: User, label: "Advocate", value: selectedCase.advocate },
                    { icon: Phone, label: "Advocate Phone", value: selectedCase.advocatePhone },
                    { icon: Mail, label: "Advocate Email", value: selectedCase.advocateEmail },
                    { icon: Clock, label: "Last Updated", value: selectedCase.lastUpdated },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400">{item.label}</p>
                          <p className="text-xs md:text-sm font-medium text-[#0f172a] truncate">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Case Details */}
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-[#0f172a] mb-3">Case Description</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{selectedCase.caseDetails}</p>
                </div>

                {/* Status History */}
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-[#0f172a] mb-4">Status History</h4>
                  <div className="relative">
                    <div className="absolute left-[9px] top-1 bottom-1 w-0.5 bg-slate-100" />
                    <div className="space-y-0">
                      {selectedCase.statusHistory.map((s, i) => {
                        const isCompleted = s.status === "completed";
                        return (
                          <div key={i} className="flex gap-4 pb-5 last:pb-0">
                            <div className={`relative z-10 w-[18px] h-[18px] rounded-full flex items-center justify-center ${isCompleted ? "bg-[#10b981]/10" : "bg-[#f59e0b]/10"}`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                              <div className="flex items-center justify-between gap-2">
                                <h5 className={`text-xs font-semibold ${isCompleted ? "text-[#10b981]" : "text-[#f59e0b]"}`}>{s.label}</h5>
                                <span className="text-[10px] text-slate-400">{s.date}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Order_Copy.pdf", "Hearing_Notice.pdf", "Case_Brief.pdf"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-xs text-slate-600">
                      <FileText className="w-3.5 h-3.5 text-red-500" />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
