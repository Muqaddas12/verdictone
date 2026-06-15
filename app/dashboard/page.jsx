"use client";

import { motion } from "framer-motion";
import {
  Gavel,
  Calendar,
  Clock,
  Download,
  Upload,
  MessageSquare,
  Phone,
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowUpRight,
  File,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const client = {
  name: "Ahmed",
  caseId: "SC/2026/1024",
  caseTitle: "State of Gujarat vs. Ahmed Khan",
  court: "Supreme Court of India",
  nextHearing: "22 July 2026",
  status: "Active",
};

const timeline = [
  { id: 1, label: "Petition Filed", date: "12 Jan 2026", status: "completed", description: "Writ petition filed under Article 32" },
  { id: 2, label: "Documents Submitted", date: "28 Feb 2026", status: "completed", description: "All supporting affidavits and evidence uploaded" },
  { id: 3, label: "Notice Issued", date: "15 Mar 2026", status: "completed", description: "Notice served to the respondent" },
  { id: 4, label: "Awaiting Hearing", date: "22 Jul 2026", status: "in-progress", description: "Scheduled for preliminary hearing" },
  { id: 5, label: "Final Order", date: "TBD", status: "pending", description: "Awaiting court verdict" },
];

const documents = [
  { id: 1, name: "Order_Copy.pdf", uploaded: "14 Mar 2026" },
  { id: 2, name: "Hearing_Notice.pdf", uploaded: "10 Mar 2026" },
  { id: 3, name: "Affidavit_Annexure.pdf", uploaded: "28 Feb 2026" },
  { id: 4, name: "Case_Brief_Summary.pdf", uploaded: "12 Jan 2026" },
];

const queries = [
  { id: 1, message: "Any update on the next hearing date?", time: "10:32 AM", isClient: true },
  { id: 2, message: "The hearing is confirmed for 22 July. I'll share the brief 2 days prior.", time: "11:15 AM", isClient: false },
  { id: 3, message: "Should I prepare any additional documents?", time: "11:20 AM", isClient: true },
  { id: 4, message: "Not at this stage. I'll let you know if anything is needed.", time: "11:22 AM", isClient: false },
];

const notifications = [
  { id: 1, title: "Hearing Confirmed", message: "Your case is scheduled for 22 July 2026 at 10:30 AM", time: "2 hours ago", unread: true },
  { id: 2, title: "Document Uploaded", message: "New document 'Hearing_Notice.pdf' has been added", time: "5 days ago", unread: false },
  { id: 3, title: "Case Update", message: "Status changed to 'Awaiting Hearing'", time: "1 week ago", unread: false },
];

const stats = [
  { label: "Active Cases", value: "2", color: "text-[#1d4ed8]" },
  { label: "Documents", value: "12", color: "text-[#10b981]" },
  { label: "Upcoming Hearings", value: "1", color: "text-[#f59e0b]" },
  { label: "Queries Resolved", value: "8", color: "text-[#0f172a]" },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* ─── Header ─── */}
      <motion.div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4" initial="initial" animate="animate" variants={stagger}>
        <div>
          <motion.p variants={fadeIn} className="text-xs md:text-sm font-medium text-[#1d4ed8] tracking-wide uppercase">Welcome back</motion.p>
          <motion.h1 variants={fadeIn} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mt-1 tracking-tight">{client.name} 👋</motion.h1>
          <motion.p variants={fadeIn} className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2">Case ID: <span className="font-mono text-[#0f172a]">{client.caseId}</span></motion.p>
        </div>
        <motion.div variants={fadeIn} className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0f172a]/5 rounded-full text-sm text-[#0f172a] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />All systems operational
        </motion.div>
      </motion.div>

      {/* ─── Stats ─── */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8" initial="initial" animate="animate" variants={stagger}>
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeIn} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <p className="text-xs md:text-sm text-slate-400">{s.label}</p>
            <p className={`text-2xl md:text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Main Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Case Status */}
        <motion.div className="bg-[#0f172a] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white relative overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#1d4ed8]/20 rounded-full blur-3xl" />
          <div className="relative">
            <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full">ACTIVE</span>
            <h2 className="text-base md:text-lg font-semibold mt-4 leading-tight">{client.caseTitle}</h2>
            <p className="text-xs md:text-sm text-white/60 mt-1">{client.court}</p>
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center"><Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#1d4ed8]" /></div>
                <div><p className="text-xs text-white/50">Next Hearing</p><p className="text-sm md:text-base font-semibold">{client.nextHearing}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center"><Gavel className="w-4 h-4 md:w-5 md:h-5 text-[#f59e0b]" /></div>
                <div><p className="text-xs text-white/50">Court</p><p className="text-sm md:text-base font-semibold">Supreme Court</p></div>
              </div>
            </div>
            <button className="mt-6 md:mt-8 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">View Full Case <ArrowUpRight className="w-4 h-4" /></button>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Case Timeline</h3>
            <button className="text-xs md:text-sm text-[#1d4ed8] font-medium hover:underline flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />
            <div className="space-y-0">
              {timeline.map((item, idx) => {
                const isCompleted = item.status === "completed";
                const isInProgress = item.status === "in-progress";
                let icon, color, bgColor;
                if (isCompleted) { icon = <CheckCircle2 className="w-5 h-5 text-[#10b981]" />; color = "text-[#10b981]"; bgColor = "bg-[#10b981]/10"; }
                else if (isInProgress) { icon = <Clock className="w-5 h-5 text-[#f59e0b]" />; color = "text-[#f59e0b]"; bgColor = "bg-[#f59e0b]/10"; }
                else { icon = <Circle className="w-5 h-5 text-slate-300" />; color = "text-slate-400"; bgColor = "bg-slate-50"; }
                return (
                  <motion.div key={item.id} className="flex gap-4 md:gap-5 pb-6 md:pb-8 last:pb-0" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.08 }}>
                    <div className={`relative z-10 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${bgColor}`}>{icon}</div>
                    <div className="flex-1 pt-0.5 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`font-semibold text-xs md:text-sm ${color} truncate`}>{item.label}</h4>
                        <span className="text-[10px] md:text-xs text-slate-400 shrink-0">{item.date}</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Documents */}
        <motion.div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Documents</h3>
            <button className="text-xs md:text-sm text-[#1d4ed8] font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-2 md:space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0"><File className="w-4 h-4 md:w-5 md:h-5 text-red-500" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-[#0f172a] truncate">{doc.name}</p>
                  <p className="text-[10px] md:text-xs text-slate-400">{doc.uploaded}</p>
                </div>
                <button className="p-2 md:p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100"><Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1d4ed8]" /></button>
              </div>
            ))}
          </div>
          <button className="mt-4 md:mt-5 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs md:text-sm font-medium text-slate-400 hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all flex items-center justify-center gap-2"><Upload className="w-4 h-4" />Upload New Document</button>
        </motion.div>

        {/* Queries */}
        <motion.div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Queries</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Chat with your advocate</p>
            </div>
            <span className="px-2 py-1 bg-[#1d4ed8]/10 text-[#1d4ed8] text-[10px] md:text-xs font-semibold rounded-full">Active</span>
          </div>
          <div className="space-y-2 md:space-y-3 max-h-[280px] md:max-h-[340px] overflow-y-auto pr-1">
            {queries.map((q) => (
              <div key={q.id} className={`flex ${q.isClient ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] md:max-w-[85%] px-3 py-2.5 md:px-4 md:py-3 rounded-2xl text-xs md:text-sm ${q.isClient ? "bg-[#1d4ed8] text-white rounded-br-md" : "bg-slate-50 text-slate-700 rounded-bl-md"}`}>
                  <p>{q.message}</p>
                  <p className={`text-[9px] md:text-[10px] mt-1 ${q.isClient ? "text-white/60" : "text-slate-400"}`}>{q.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 md:mt-5 flex gap-2">
            <input type="text" placeholder="Type your question..." className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 rounded-xl text-xs md:text-sm text-slate-600 placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-all" />
            <button className="px-3 md:px-4 py-2.5 md:py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl transition-all"><MessageSquare className="w-4 h-4" /></button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Notifications</h3>
            <button className="text-[10px] md:text-xs text-[#1d4ed8] font-medium hover:underline">Mark all read</button>
          </div>
          <div className="space-y-1">
            {notifications.map((n) => (
              <div key={n.id} className={`flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all ${n.unread ? "bg-[#1d4ed8]/5 border-l-2 border-[#1d4ed8]" : "hover:bg-slate-50"}`}>
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.unread ? "bg-[#1d4ed8]" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs md:text-sm font-semibold text-[#0f172a] truncate">{n.title}</h4>
                    <span className="text-[9px] md:text-[10px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-500 mt-1">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Quick Actions ─── */}
      <motion.div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-4 md:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: MessageSquare, label: "Ask Question", color: "bg-[#0f172a] text-white hover:bg-[#1e293b]" },
            { icon: Upload, label: "Upload Document", color: "bg-[#f8fafc] border border-slate-100 hover:border-[#1d4ed8]" },
            { icon: Calendar, label: "Book Appointment", color: "bg-[#f8fafc] border border-slate-100 hover:border-[#1d4ed8]" },
            { icon: Phone, label: "Call Advocate", color: "bg-[#f8fafc] border border-slate-100 hover:border-[#1d4ed8]" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} className={`group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl md:rounded-2xl transition-all ${a.color}`}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] md:text-sm font-medium">{a.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
