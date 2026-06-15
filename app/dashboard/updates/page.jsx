"use client";

import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, Clock, Circle, Bell, ArrowUpRight } from "lucide-react";

const updates = [
  { id: 1, action: "Hearing Scheduled", detail: "Next hearing confirmed for 22 July 2026 at 10:30 AM before Supreme Court", date: "15 Jun 2026", time: "2:15 PM", type: "hearing" },
  { id: 2, action: "Document Uploaded", detail: "Hearing_Notice.pdf has been added to your documents", date: "10 Mar 2026", time: "11:30 AM", type: "document" },
  { id: 3, action: "Status Changed", detail: "Case status updated to 'Awaiting Hearing'", date: "15 Mar 2026", time: "4:00 PM", type: "status" },
  { id: 4, action: "Notice Issued", detail: "Notice served to the respondent on 15 March 2026", date: "15 Mar 2026", time: "10:00 AM", type: "legal" },
  { id: 5, action: "Documents Submitted", detail: "All supporting affidavits and evidence uploaded successfully", date: "28 Feb 2026", time: "3:45 PM", type: "document" },
  { id: 6, action: "Petition Filed", detail: "Writ petition filed under Article 32 in Supreme Court of India", date: "12 Jan 2026", time: "9:30 AM", type: "legal" },
  { id: 7, action: "Advocate Assigned", detail: "Adv. Priya Sharma has been assigned to your case", date: "10 Jan 2026", time: "11:00 AM", type: "assignment" },
  { id: 8, action: "Case Created", detail: "Your case SC/2026/1024 has been registered in the system", date: "08 Jan 2026", time: "2:00 PM", type: "system" },
];

const typeIcons = {
  hearing: Bell,
  document: CheckCircle2,
  status: Clock,
  legal: CheckCircle2,
  assignment: RefreshCw,
  system: Circle,
};

export default function UpdatesPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Updates</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">Complete timeline of your case activity</p>
      </motion.div>

      <motion.div className="mt-8 space-y-0" initial="initial" animate="animate">
        {/* Group by date */}
        {["June 2026", "March 2026", "February 2026", "January 2026"].map((month) => {
          const monthUpdates = updates.filter((u) => u.date.includes(month.split(" ")[1]));
          if (!monthUpdates.length) return null;
          return (
            <div key={month} className="mb-8 md:mb-10">
              <h3 className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4 md:mb-6">{month}</h3>
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
      </motion.div>
    </div>
  );
}
