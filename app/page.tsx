import Link from "next/link";
import { Scale, Gavel, Shield, MessageSquare, FileText, Bell } from "lucide-react";

const features = [
  {
    icon: Gavel,
    title: "Case Tracking",
    desc: "Real-time updates on your case status, hearings, and filings.",
  },
  {
    icon: FileText,
    title: "Document Center",
    desc: "Upload, download, and manage all your legal documents securely.",
  },
  {
    icon: MessageSquare,
    title: "Client Queries",
    desc: "Chat directly with your advocate — no phone tag needed.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get alerts for hearings, updates, and document uploads.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "End-to-end encrypted. Your legal data stays yours.",
  },
  {
    icon: Scale,
    title: "Case History",
    desc: "Complete timeline of your case from filing to verdict.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ─────── Nav ─────── */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0f172a]">VerdictOne</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-[#0f172a] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium bg-[#0f172a] text-white px-5 py-2 rounded-xl hover:bg-[#1e293b] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ─────── Hero ─────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/95 to-[#1d4ed8]/20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#1d4ed8]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 text-sm rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Trusted by 500+ legal professionals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-8 leading-tight tracking-tight">
              Your legal cases,
              <br />
              <span className="text-[#1d4ed8]">one dashboard</span>
            </h1>
            <p className="text-lg text-white/60 mt-6 max-w-xl leading-relaxed">
              Track hearings, access documents, message your advocate, and never
              wonder "What's happening with my case?" ever again.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1e40af] transition-colors shadow-lg shadow-[#1d4ed8]/25"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/10"
              >
                See Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Features ─────── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#1d4ed8] tracking-wide uppercase">
            Everything you need
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3 tracking-tight">
            Built for clients, designed for advocates
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            No more phone tag or lost paperwork. Everything is in one secure
            place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#1d4ed8]/20 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mt-5">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to simplify your legal journey?
          </h2>
          <p className="text-white/60 mt-4 max-w-lg mx-auto">
            Join thousands of clients who stay informed and in control.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl font-semibold mt-10 hover:bg-[#1e40af] transition-colors shadow-lg shadow-[#1d4ed8]/25"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ─────── Footer ─────── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-slate-400">
          <p>© 2026 VerdictOne. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0f172a] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#0f172a] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
