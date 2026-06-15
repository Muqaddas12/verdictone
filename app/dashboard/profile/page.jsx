"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Scale, Gavel, FileText, Download, Edit3 } from "lucide-react";

const profile = {
  name: "Ahmed Khan",
  email: "ahmed.khan@email.com",
  phone: "+91 98765 43210",
  address: "12, Sattar Taluka Society, Paldi, Ahmedabad, Gujarat 380007",
  dob: "15 March 1985",
  caseId: "SC/2026/1024",
  advocate: "Adv. Priya Sharma",
};

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Profile</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">Your personal and case information</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* ─── Avatar Card ─── */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white text-2xl md:text-3xl font-bold mx-auto">
            AK
          </div>
          <h2 className="text-lg md:text-xl font-bold text-[#0f172a] mt-4">{profile.name}</h2>
          <p className="text-xs md:text-sm text-slate-500">{profile.caseId}</p>
          <button className="mt-6 w-full py-2.5 md:py-3 bg-[#0f172a] text-white rounded-xl text-xs md:text-sm font-medium hover:bg-[#1e293b] transition-all flex items-center justify-center gap-2">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </motion.div>

        {/* ─── Personal Details ─── */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-6">Personal Details</h3>
          <div className="space-y-5">
            {[
              { icon: User, label: "Full Name", value: profile.name },
              { icon: Mail, label: "Email", value: profile.email },
              { icon: Phone, label: "Phone", value: profile.phone },
              { icon: Calendar, label: "Date of Birth", value: profile.dob },
              { icon: MapPin, label: "Address", value: profile.address },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-slate-400">{item.label}</p>
                    <p className="text-xs md:text-sm font-medium text-[#0f172a] mt-0.5 break-words">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Case Info ─── */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-6">Case Information</h3>
          <div className="space-y-5">
            {[
              { icon: Scale, label: "Case ID", value: profile.caseId },
              { icon: Gavel, label: "Assigned Advocate", value: profile.advocate },
              { icon: FileText, label: "Total Documents", value: "12" },
              { icon: Calendar, label: "Next Hearing", value: "22 July 2026" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-slate-400">{item.label}</p>
                    <p className="text-xs md:text-sm font-medium text-[#0f172a] mt-0.5">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mt-6 w-full py-2.5 md:py-3 border border-slate-200 rounded-xl text-xs md:text-sm font-medium text-slate-500 hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Case Summary
          </button>
        </motion.div>
      </div>
    </div>
  );
}
