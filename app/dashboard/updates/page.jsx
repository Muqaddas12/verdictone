"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle2, Clock, Circle, Bell, ChevronRight, Briefcase } from "lucide-react";

const cases = [
  {
    id: "SC/2026/1024",
    title: "State of Gujarat vs. Ahmed Khan",
    court: "Supreme Court of India",
    updates: [
      { id: 1, action: "Hearing Scheduled", detail: "Next hearing confirmed for 22 July 2026 at 10:30 AM before Supreme Court", date: "15 Jun 2026", time: "2:15 PM", type: "hearing" },
      { id: 2, action: "Document Uploaded", detail: "Hearing_Notice.pdf added to your documents", date: "10 Mar 2026", time: "11:30 AM", type: "document" },
      { id: 3, action: "Status Changed", detail: "Case status updated to 'Awaiting Hearing'", date: "15 Mar 2026", time: "4:00 PM", type: "status" },
      { id: 4, action: "Notice Issued", detail: "Notice served to the respondent on 15 March 2026", date: "15 Mar 2026", time: "10:00 AM", type: "legal" },
      { id: 5, action: "Documents Submitted", detail: "All supporting affidavits and evidence uploaded", date: "28 Feb 2026", time: "3:45 PM", type: "document" },
      { id: 6, action: "Petition Filed", detail: "Writ petition filed under Article 32 in Supreme Court", date: "12 Jan 2026", time: "9:30 AM", type: "legal" },
      { id: 7, action: "Advocate Assigned", detail: "Adv. Priya Sharma assigned to your case", date: "10 Jan 2026", time: "11:00 AM", type: "assignment" },
      { id: 8, action: "Case Created", detail: "Your case SC/2026/1024 registered in the system", date: "08 Jan 2026", time: "2:00 PM", type: "system" },
    ],
  },
  {
    id: "HC/2026/0891",
    title: "Ahmed Khan vs. Municipal Corp.",
    court: "High Court of Gujarat",
    updates: [
      { id: 101, action: "Hearing Scheduled", detail: "Next hearing confirmed for 05 August 2026 at 11:00 AM", date: "01 Jun 2026", time: "10:00 AM", type: "hearing" },
      { id: 102, action: "Notice Served", detail: "Notice served to Municipal Corporation on 20 Feb 2026", date: "20 Feb 2026", time: "3:00 PM", type: "legal" },
      { id: 103, action: "Appeal Filed", detail: "Civil Appeal filed against Municipal Corporation order", date: "03 Feb 2026", time: "2:30 PM", type: "legal" },
    ],
  },
  {
    id: "DL/2025/4523",
    title: "Property Dispute — Khan Family",
    court: "District Court, Ahmedabad",
    updates: [
      { id: 201, action: "Case Closed", detail: "Case resolved through mutual settlement. Final decree passed.", date: "10 Mar 2026", time: "4:00 PM", type: "status" },
      { id: 202, action: "Final Arguments", detail: "Final arguments heard by the District Court", date: "20 Feb 2026", time: "11:30 AM", type: "legal" },
      { id: 203, action: "Evidence Presented", detail: "All evidence presented before the court", date: "15 Nov 2025", time: "10:00 AM", type: "document" },
      { id: 204, action: "Suit Filed", detail: "Civil suit filed regarding property dispute", date: "18 Sep 2025", time: "9:00 AM", type: "legal" },
    ],
  },
];

const typeIcons = {
  hearing: Bell,
  document: CheckCircle2,
  status: Clock,
  legal: CheckCircle2,
  assignment: RefreshCw,
  system: Circle,
};

function getMonthGroup(month) {
  const map = {
    "Jun": "June 2026", "Mar": "March 2026", "Feb": "February 2026", "Jan": "January 2026",
    "Aug": "August 2026", "Nov": "November 2025", "Sep": "September 2025",
  };
  return map[month] || month;
}

export default function UpdatesPage() {
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0].id);

  const currentCase = cases.find((c) => c.id === selectedCaseId);

  // Group updates by month
  const grouped = {};
  (currentCase?.updates || []).forEach((u) => {
    const month = u.date.split(" ")[0]; // "15" -> but need month
    const monthName = u.date.split(" ")[1]; // "Jun"
    const key = getMonthGroup(monthName);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(u);
  });

  const monthOrder = ["August 2026", "June 2026", "March 2026", "February 2026", "January 2026", "November 2025", "September 2025"];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Updates</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">Case-wise activity timeline</p>
      </motion.div>

      {/* Case Selector */}
      <motion.div
        className="flex gap-2 md:gap-3 overflow-x-auto pb-2 mt-6 mb-8 -mx-4 md:-mx-8 px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCaseId(c.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
              c.id === selectedCaseId
                ? "bg-[#0f172a] text-white border-[#0f172a]"
                : "bg-white text-slate-500 border-slate-100 hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{c.title.length > 25 ? c.title.slice(0, 25) + "…" : c.title}</span>
            <span className="sm:hidden">{c.id}</span>
          </button>
        ))}
      </motion.div>

      {/* Updates Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCaseId}
          className="mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {currentCase && (
            <div className="mb-6">
              <h2 className="text-base md:text-xl font-bold text-[#0f172a]">{currentCase.title}</h2>
              <p className="text-xs md:text-sm text-slate-400">{currentCase.court} • {currentCase.id}</p>
            </div>
          )}

          {monthOrder.map((month) => {
            const monthUpdates = grouped[month];
            if (!monthUpdates) return null;
            return (
              <div key={month} className="mb-8 md:mb-10">
                <h3 className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4 md:mb-6">
                  {month}
                </h3>
                <div className="relative">
                  <div className="absolute left-[9px] md:left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />
                  <div className="space-y-0">
                    {monthUpdates.map((u, idx) => {
                      const Icon = typeIcons[u.type] || Circle;
                      return (
                        <motion.div
                          key={u.id}
                          className="flex gap-4 md:gap-5 pb-6 md:pb-8 last:pb-0"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 }}
                        >
                          <div className="relative z-10 w-[18px] h-[18px] md:w-[22px] md:h-[22px] rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mt-0.5">
                            <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#1d4ed8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className="text-xs md:text-sm font-semibold text-[#0f172a]">{u.action}</h4>
                              <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400">
                                <span>{u.date}</span>
                                <span>•</span>
                                <span>{u.time}</span>
                              </div>
                            </div>
                            <p className="text-[10px] md:text-sm text-slate-500 mt-1">{u.detail}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {(!currentCase || currentCase.updates.length === 0) && (
            <div className="text-center py-16">
              <RefreshCw className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-sm text-slate-400">No updates for this case</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
