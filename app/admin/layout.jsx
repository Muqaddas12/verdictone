"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  RefreshCw,
  User,
  Users,
  Gavel,
  Scale,
  Calendar,
  CheckSquare,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Settings,
  HelpCircle,
  Building2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cases", label: "Cases", icon: Briefcase },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/lawyers", label: "Lawyers", icon: Gavel },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/hearings", label: "Hearings", icon: Calendar },
  { href: "/admin/courts", label: "Courts", icon: Building2 },
  { href: "/admin/updates", label: "Updates", icon: RefreshCw },
  { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
];

const notifications = [
  { id: 1, title: "New Case Filed", message: "SC/2026/1024 — Writ Petition filed", time: "2h ago", unread: true },
  { id: 2, title: "Client Registered", message: "Fatima Begum joined", time: "1d ago", unread: true },
  { id: 3, title: "Hearing Completed", message: "DL/2025/4523 — Final order passed", time: "3d ago", unread: false },
  { id: 4, title: "Document Uploaded", message: "Hearing_Notice.pdf added to SC/2026/1024", time: "5d ago", unread: false },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* ─── Overlay for mobile sidebar ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col shrink-0
        transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#dc2626] flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">VerdictOne</h1>
            <p className="text-xs text-slate-400 font-medium">Admin Panel</p>
          </div>
          <button className="lg:hidden p-1 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#dc2626] text-white shadow-lg shadow-red-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#0f172a]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-[#1d4ed8] transition-all duration-200"
          >
            <User className="w-5 h-5" />
            Client View
          </Link>
          <button
            onClick={() => { router.push("/"); }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-xl" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients, cases, documents..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Bell icon */}
            <div className="relative" ref={notifRef}>
              <button
                className="relative p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0f172a]">Notifications</h3>
                    <button className="text-[10px] text-[#dc2626] font-medium hover:underline" onClick={() => setNotifOpen(false)}>Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`flex gap-3 p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${n.unread ? "bg-[#dc2626]/5" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-[#dc2626]" : "bg-transparent"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-semibold text-[#0f172a] truncate">{n.title}</h4>
                            <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center gap-3 pl-3 border-l border-slate-100 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-9 h-9 rounded-full bg-[#dc2626] flex items-center justify-center text-white text-sm font-semibold">
                  AD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[#0f172a]">Admin</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-sm font-semibold text-[#0f172a]">Admin User</p>
                    <p className="text-[10px] text-slate-400">admin@verdictone.com</p>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs md:text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs md:text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <HelpCircle className="w-4 h-4" /> Help & Support
                    </button>
                  </div>
                  <div className="border-t border-slate-100 py-1">
                    <button onClick={() => { router.push("/"); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pb-4">{children}</main>
      </div>

      {/* ─── Bottom Navigation (mobile only) ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 lg:hidden">
        <div className="flex items-center justify-around px-2 py-1 overflow-x-auto">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
                  isActive ? "text-[#dc2626]" : "text-slate-400"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#dc2626]" : ""}`} />
                <span className={`text-[9px] font-medium ${isActive ? "text-[#dc2626]" : "text-slate-400"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
