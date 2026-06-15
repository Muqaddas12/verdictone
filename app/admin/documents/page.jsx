"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Search, Trash2, X, Download, Upload, Folder } from "lucide-react";
import { getDocuments, createDocument, deleteDocument, getCases } from "../../lib/api";

const categories = ["All", "Orders", "Notices", "Affidavits", "Briefs", "Evidence", "Legal", "Petitions"];

const emptyForm = { name: "", category: "Orders", size: "", caseId: "" };

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [cases, setCases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [docRes, caseRes] = await Promise.all([
      getDocuments(),
      getCases(),
    ]);
    if (docRes.success) setDocuments(docRes.data);
    if (caseRes.success) setCases(caseRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createDocument(form);
    if (res.success) {
      setShowForm(false);
      setForm(emptyForm);
      fetchAll();
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteDocument(id);
    if (res.success) fetchAll();
  };

  const handleDownload = (docName) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = "#";
    link.download = docName;
    link.click();
  };

  // Filter documents
  const filtered = documents.filter((doc) => {
    const matchCategory = activeCategory === "All" || doc.category === activeCategory;
    const matchSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.caseId && doc.caseId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Documents</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Manage all case documents</p>
          </div>
          <button
            onClick={() => {
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] text-white rounded-xl hover:bg-[#b91c1c] transition-all text-xs md:text-sm font-medium self-start shadow-md shadow-red-100"
          >
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents or case ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 sm:mx-0 px-4 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  cat === activeCategory
                    ? "bg-[#dc2626] text-white"
                    : "bg-white border border-slate-100 text-slate-500 hover:border-[#dc2626] hover:text-[#dc2626]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-slate-100 border-t-red-500 animate-spin" />
              <p className="text-sm text-slate-400">Loading documents...</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + searchTerm}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <Folder className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm text-slate-400">
                    {searchTerm || activeCategory !== "All"
                      ? "No documents match your filters"
                      : "No documents uploaded yet"}
                  </p>
                  {!searchTerm && activeCategory === "All" && (
                    <button
                      onClick={() => {
                        setForm(emptyForm);
                        setShowForm(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#dc2626] text-white rounded-xl hover:bg-[#b91c1c] transition-all text-xs md:text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> Upload First Document
                    </button>
                  )}
                </div>
              )}
              {filtered.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 hover:shadow-lg hover:shadow-red-50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#dc2626]" />
                    </div>
                    <span
                      className={`text-[10px] md:text-xs px-2 py-1 rounded-full font-medium ${
                        doc.category === "Orders"
                          ? "bg-amber-50 text-amber-600"
                          : doc.category === "Notices"
                          ? "bg-blue-50 text-blue-600"
                          : doc.category === "Affidavits"
                          ? "bg-purple-50 text-purple-600"
                          : doc.category === "Briefs"
                          ? "bg-green-50 text-green-600"
                          : doc.category === "Evidence"
                          ? "bg-orange-50 text-orange-600"
                          : doc.category === "Legal"
                          ? "bg-indigo-50 text-indigo-600"
                          : doc.category === "Petitions"
                          ? "bg-pink-50 text-pink-600"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {doc.category}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-[#0f172a] truncate">{doc.name}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] md:text-xs text-slate-400">
                    <span>Case:</span>
                    <span className="font-mono text-slate-500">{doc.caseId}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400">
                      <span>{doc.uploaded}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(doc.name);
                        }}
                        className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#dc2626]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        className="p-1.5 md:p-2 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg border border-slate-100 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0f172a]">Upload Document</h2>
                    <p className="text-xs text-slate-400">Add a new document to the system</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Document Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Order_Copy.pdf"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Category</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white"
                  >
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Size</label>
                  <input
                    type="text"
                    required
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    placeholder="e.g. 1.2 MB"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Case</label>
                  <select
                    required
                    value={form.caseId}
                    onChange={(e) => setForm({ ...form, caseId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white"
                  >
                    <option value="">Select a case</option>
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>{c.id} — {c.title}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-100 text-xs md:text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#dc2626] text-white text-xs md:text-sm font-medium hover:bg-[#b91c1c] transition-all shadow-md shadow-red-100"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}