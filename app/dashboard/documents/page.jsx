"use client";

import { motion } from "framer-motion";
import { File, Download, Upload, FileText, Search, FolderOpen } from "lucide-react";

const documents = [
  { id: 1, name: "Order_Copy.pdf", uploaded: "14 Mar 2026", size: "1.2 MB", category: "Orders" },
  { id: 2, name: "Hearing_Notice.pdf", uploaded: "10 Mar 2026", size: "0.8 MB", category: "Notices" },
  { id: 3, name: "Affidavit_Annexure.pdf", uploaded: "28 Feb 2026", size: "2.4 MB", category: "Affidavits" },
  { id: 4, name: "Case_Brief_Summary.pdf", uploaded: "12 Jan 2026", size: "1.6 MB", category: "Briefs" },
  { id: 5, name: "Evidence_Exhibit_A.pdf", uploaded: "05 Mar 2026", size: "3.1 MB", category: "Evidence" },
  { id: 6, name: "Vakalatnama_Signed.pdf", uploaded: "15 Jan 2026", size: "0.5 MB", category: "Legal" },
  { id: 7, name: "Writ_Petition_Main.pdf", uploaded: "12 Jan 2026", size: "4.2 MB", category: "Petitions" },
  { id: 8, name: "Counter_Affidavit.pdf", uploaded: "20 Feb 2026", size: "1.8 MB", category: "Affidavits" },
];

const categories = ["All", "Orders", "Notices", "Affidavits", "Briefs", "Evidence", "Legal", "Petitions"];

export default function DocumentsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Documents</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Access and manage all your legal documents</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl hover:bg-[#1e293b] transition-all text-xs md:text-sm font-medium self-start">
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 md:-mx-8 px-4 md:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
              cat === "All"
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-slate-100 text-slate-500 hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {documents.map((doc, idx) => (
          <motion.div
            key={doc.id}
            className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red-50 flex items-center justify-center">
                <File className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{doc.category}</span>
            </div>
            <h3 className="text-xs md:text-sm font-semibold text-[#0f172a] truncate">{doc.name}</h3>
            <div className="flex items-center justify-between mt-3 md:mt-4">
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400">
                <span>{doc.uploaded}</span>
                <span>•</span>
                <span>{doc.size}</span>
              </div>
              <button className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100">
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1d4ed8]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
