"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Gavel,
  Briefcase,
  FileText,
  Calendar,
  CheckSquare,
  Building2,
  UserPlus,
  FilePlus2,
  Scale,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { getAdminStats, getCases, getClients, getLawyers, getHearings, getTasks, getUpdates } from "../lib/api";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const priorityColors = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-stone-100 text-stone-600 border-stone-200",
};

const statusColors = {
  Active: "bg-[#dc2626]/10 text-[#dc2626]",
  Closed: "bg-slate-100 text-slate-500",
  Pending: "bg-amber-100 text-amber-700",
  Scheduled: "bg-[#dc2626]/10 text-[#dc2626]",
  Completed: "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentCases, setRecentCases] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientMap, setClientMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [statsRes, casesRes, clientsRes, tasksRes, hearingsRes, updatesRes] =
          await Promise.all([
            getAdminStats(),
            getCases(),
            getClients(),
            getTasks("Pending"),
            getHearings(),
            getUpdates(),
          ]);

        if (statsRes.success) setStats(statsRes.data);
        if (casesRes.success) setRecentCases(casesRes.data.slice(0, 5));
        if (clientsRes.success) {
          const map = {};
          clientsRes.data.forEach((c) => {
            map[c.id] = c.name;
          });
          setClientMap(map);
        }
        if (tasksRes.success) setPendingTasks(tasksRes.data.slice(0, 5));
        if (hearingsRes.success) {
          setUpcomingHearings(hearingsRes.data.filter((h) => h.status === "Scheduled"));
        }
        if (updatesRes.success) {
          const sorted = [...updatesRes.data].sort(
            (a, b) => new Date(b.date + " " + (b.time || "")) - new Date(a.date + " " + (a.time || ""))
          );
          setRecentUpdates(sorted.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = stats
    ? [
        { label: "Total Clients", value: stats.totalClients, icon: Users, color: "text-[#dc2626]", bg: "bg-[#dc2626]/10" },
        { label: "Active Clients", value: stats.activeClients, icon: Users, color: "text-[#b45309]", bg: "bg-[#b45309]/10" },
        { label: "Total Lawyers", value: stats.totalLawyers, icon: Gavel, color: "text-[#dc2626]", bg: "bg-[#dc2626]/10" },
        { label: "Active Lawyers", value: stats.activeLawyers, icon: Gavel, color: "text-[#b45309]", bg: "bg-[#b45309]/10" },
        { label: "Total Cases", value: stats.totalCases, icon: Briefcase, color: "text-[#dc2626]", bg: "bg-[#dc2626]/10" },
        { label: "Active Cases", value: stats.activeCases, icon: Briefcase, color: "text-[#b45309]", bg: "bg-[#b45309]/10" },
        { label: "Documents", value: stats.totalDocuments, icon: FileText, color: "text-[#78716c]", bg: "bg-[#78716c]/10" },
        { label: "Upcoming Hearings", value: stats.upcomingHearings, icon: Calendar, color: "text-[#b45309]", bg: "bg-[#b45309]/10" },
        { label: "Pending Tasks", value: stats.pendingTasks, icon: CheckSquare, color: "text-[#dc2626]", bg: "bg-[#dc2626]/10" },
        { label: "Courts", value: stats.totalCourts, icon: Building2, color: "text-[#78716c]", bg: "bg-[#78716c]/10" },
      ]
    : [];

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* ─── Header ─── */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div>
          <motion.p
            variants={fadeIn}
            className="text-xs md:text-sm font-medium text-[#dc2626] tracking-wide uppercase"
          >
            Overview
          </motion.p>
          <motion.h1
            variants={fadeIn}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mt-1 tracking-tight"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2"
          >
            Manage your legal platform
          </motion.p>
        </div>
        <motion.div
          variants={fadeIn}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#dc2626]/5 rounded-full text-sm text-[#dc2626] shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
          Admin Panel Active
        </motion.div>
      </motion.div>

      {/* ─── Stats Grid ─── */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              variants={fadeIn}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${s.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${s.color}`} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-[#0f172a]">{s.value}</p>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">{s.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ─── Two-Column Grid: Recent Cases + Pending Tasks ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Recent Cases */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Recent Cases</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Latest 5 cases</p>
            </div>
            <Link
              href="/admin/cases"
              className="text-xs md:text-sm text-[#dc2626] font-medium hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentCases.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No cases found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider">ID</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider">Title</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider hidden md:table-cell">Client</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider">Status</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider hidden lg:table-cell">Next Hearing</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 md:py-4 pr-3 font-mono text-[10px] md:text-xs text-slate-500">{c.id}</td>
                      <td className="py-3 md:py-4 pr-3 font-medium text-[#0f172a] truncate max-w-[120px] md:max-w-[180px]">
                        {c.title}
                      </td>
                      <td className="py-3 md:py-4 pr-3 hidden md:table-cell text-slate-500">
                        {clientMap[c.clientId] || `Client #${c.clientId}`}
                      </td>
                      <td className="py-3 md:py-4 pr-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${
                            statusColors[c.status] || "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 md:py-4 hidden lg:table-cell text-slate-500 text-[10px] md:text-xs">
                        {c.nextHearing || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Pending Tasks</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Tasks requiring attention</p>
            </div>
            <Link
              href="/admin/tasks"
              className="text-xs md:text-sm text-[#dc2626] font-medium hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingTasks.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No pending tasks</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider">Title</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider hidden md:table-cell">Assigned To</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider hidden sm:table-cell">Due</th>
                    <th className="pb-3 font-semibold text-[10px] md:text-xs uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTasks.map((t) => (
                    <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 md:py-4 pr-3 font-medium text-[#0f172a] truncate max-w-[150px] md:max-w-[200px]">
                        {t.title}
                      </td>
                      <td className="py-3 md:py-4 pr-3 hidden md:table-cell text-slate-500">{t.assignedTo}</td>
                      <td className="py-3 md:py-4 pr-3 hidden sm:table-cell text-slate-500">{t.dueDate}</td>
                      <td className="py-3 md:py-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${
                            priorityColors[t.priority] || "bg-stone-100 text-stone-600 border-stone-200"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* ─── Quick Actions ─── */}
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 mb-6 md:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-4 md:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link
            href="/admin/clients?add=true"
            className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-slate-100 hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300"
          >
            <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-[#dc2626] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-sm font-medium text-[#0f172a]">Add Client</span>
          </Link>
          <Link
            href="/admin/cases?add=true"
            className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-slate-100 hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300"
          >
            <FilePlus2 className="w-5 h-5 md:w-6 md:h-6 text-[#b45309] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-sm font-medium text-[#0f172a]">Add Case</span>
          </Link>
          <Link
            href="/admin/lawyers?add=true"
            className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-slate-100 hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300"
          >
            <Scale className="w-5 h-5 md:w-6 md:h-6 text-[#78716c] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-sm font-medium text-[#0f172a]">Add Lawyer</span>
          </Link>
          <Link
            href="#"
            className="group flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#f8fafc] border border-slate-100 hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300"
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#b45309] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-sm font-medium text-[#0f172a]">View Reports</span>
          </Link>
        </div>
      </motion.div>

      {/* ─── Bottom Row: Recent Updates + Upcoming Hearings ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Updates */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Recent Updates</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Latest activity on the platform</p>
            </div>
            <Link
              href="/admin/updates"
              className="text-xs md:text-sm text-[#dc2626] font-medium hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentUpdates.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No updates yet</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {recentUpdates.map((u) => (
                <div
                  key={u.id}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#dc2626]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs md:text-sm font-semibold text-[#0f172a] truncate">{u.action}</h4>
                      <span className="text-[9px] md:text-[10px] text-slate-400 shrink-0">{u.date}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 line-clamp-2">{u.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Upcoming Hearings */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f172a]">Upcoming Hearings</h3>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Scheduled court appearances</p>
            </div>
            <Link
              href="/admin/hearings"
              className="text-xs md:text-sm text-[#dc2626] font-medium hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {upcomingHearings.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No upcoming hearings</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {upcomingHearings.map((h) => (
                <div
                  key={h.id}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#b45309]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-[#b45309]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs md:text-sm font-semibold text-[#0f172a]">{h.caseId}</h4>
                      <span className="text-[9px] md:text-[10px] text-slate-400 shrink-0">{h.date}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[10px] md:text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {h.time}
                      </span>
                      <span className="text-[10px] md:text-xs text-slate-500">{h.courtRoom}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                          statusColors[h.status] || "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {h.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}