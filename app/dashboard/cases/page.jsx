"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Gavel, MapPin, ChevronRight, ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: "SC/2026/1024",
    title: "State of Gujarat vs. Ahmed Khan",
    court: "Supreme Court of India",
    type: "Writ Petition",
    status: "Active",
    nextHearing: "22 July 2026",
    filedOn: "12 Jan 2026",
    advocate: "Adv. Priya Sharma",
  },
  {
    id: "HC/2026/0891",
    title: "Ahmed Khan vs. Municipal Corp.",
    court: "High Court of Gujarat",
    type: "Civil Appeal",
    status: "Active",
    nextHearing: "05 Aug 2026",
    filedOn: "03 Feb 2026",
    advocate: "Adv. Priya Sharma",
  },
  {
    id: "DL/2025/4523",
    title: "Property Dispute — Khan Family",
    court: "District Court, Ahmedabad",
    type: "Civil Suit",
    status: "Closed",
    nextHearing: "—",
    filedOn: "18 Sep 2025",
    advocate: "Adv. Rohan Mehta",
  },
];

export default function CasesPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">My Cases</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Track all your legal matters in one place</p>
          </div>
          <span className="px-3 py-1.5 bg-[#1d4ed8]/10 text-[#1d4ed8] text-xs md:text-sm font-semibold rounded-full self-start">
            {cases.filter((c) => c.status === "Active").length} Active
          </span>
        </div>
      </motion.div>

      <div className="space-y-4 md:space-y-6">
        {cases.map((c, idx) => (
          <motion.div
            key={c.id}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
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
    </div>
  );
}
