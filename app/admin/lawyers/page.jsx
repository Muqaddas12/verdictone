"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Plus, Search, Edit3, Trash2, X, Mail, Phone, Award, Briefcase } from "lucide-react";
import { getLawyers, createLawyer, updateLawyer, deleteLawyer } from "../../lib/api";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  barCouncilId: "",
};

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState(null);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    loadLawyers();
  }, []);

  const loadLawyers = async () => {
    const res = await getLawyers(search);
    if (res.success) setLawyers(res.data);
  };

  useEffect(() => {
    const timer = setTimeout(() => loadLawyers(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openCreateForm = () => {
    setEditingLawyer(null);
    setForm(initialFormState);
    setShowForm(true);
  };

  const openEditForm = (lawyer) => {
    setEditingLawyer(lawyer);
    setForm({
      name: lawyer.name,
      email: lawyer.email,
      phone: lawyer.phone,
      specialization: lawyer.specialization,
      barCouncilId: lawyer.barCouncilId,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingLawyer) {
      await updateLawyer(editingLawyer.id, form);
    } else {
      await createLawyer(form);
    }
    setShowForm(false);
    setEditingLawyer(null);
    setForm(initialFormState);
    await loadLawyers();
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    await deleteLawyer(id);
    await loadLawyers();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Lawyers</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Manage advocate profiles</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCreateForm}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] text-white text-sm font-semibold rounded-xl hover:bg-[#b91c1c] transition-all shadow-lg shadow-red-100"
          >
            <Plus className="w-4 h-4" />
            Add Lawyer
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl text-sm text-slate-600 placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
          />
        </div>
      </motion.div>

      {/* Lawyers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {lawyers.map((lawyer, idx) => (
          <motion.div
            key={lawyer.id}
            className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Avatar + Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm">
                  {getInitials(lawyer.name)}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-[#0f172a] leading-tight">{lawyer.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Advocate</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full shrink-0 ${
                lawyer.status === "Active"
                  ? "bg-[#10b981]/10 text-[#10b981]"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {lawyer.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{lawyer.specialization}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{lawyer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{lawyer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Bar Council: {lawyer.barCouncilId}</span>
              </div>
            </div>

            {/* Badges + Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#dc2626]/10 text-[#dc2626] text-[10px] font-semibold rounded-full">
                  {lawyer.cases} Cases
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditForm(lawyer)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#dc2626] transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(lawyer.id, lawyer.name)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {lawyers.length === 0 && (
          <motion.div
            className="col-span-full text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Gavel className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">No lawyers found</p>
            <button
              onClick={openCreateForm}
              className="mt-3 text-sm text-[#dc2626] font-medium hover:underline"
            >
              Add your first lawyer
            </button>
          </motion.div>
        )}
      </div>

      {/* ─── Lawyer Form Modal ─── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center pt-0 md:pt-10 px-0 md:px-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />

            {/* Form Card */}
            <motion.div
              className="relative z-10 w-full md:max-w-lg bg-white md:rounded-3xl shadow-2xl min-h-screen md:min-h-0 overflow-y-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 md:px-8 py-4 md:py-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dc2626] flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#0f172a]">
                      {editingLawyer ? "Edit Lawyer" : "Add Lawyer"}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {editingLawyer ? "Update advocate details" : "Register a new advocate"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Adv. Priya Sharma"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#0f172a] placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="advocate@legalfirm.com"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#0f172a] placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone</label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#0f172a] placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Specialization</label>
                  <input
                    type="text"
                    required
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    placeholder="e.g. Constitutional Law"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#0f172a] placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                  />
                </div>

                {/* Bar Council ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Bar Council ID</label>
                  <input
                    type="text"
                    required
                    value={form.barCouncilId}
                    onChange={(e) => setForm({ ...form, barCouncilId: e.target.value })}
                    placeholder="e.g. GJ/1245/2010"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#0f172a] placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-5 py-2.5 bg-white text-slate-600 text-sm font-semibold rounded-xl border border-slate-100 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-5 py-2.5 bg-[#dc2626] text-white text-sm font-semibold rounded-xl hover:bg-[#b91c1c] transition-all shadow-lg shadow-red-100"
                  >
                    {editingLawyer ? "Update Lawyer" : "Add Lawyer"}
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