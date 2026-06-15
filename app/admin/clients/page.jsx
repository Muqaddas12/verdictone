"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Search, Edit3, Trash2, X, Mail, Phone, MapPin, Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { getClients, createClient, updateClient, deleteClient } from "../../lib/api";

const initialForm = { name: "", email: "", phone: "", address: "", dob: "" };

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const fetchClients = useCallback(async (searchTerm = "") => {
    setLoading(true);
    const res = await getClients(searchTerm);
    if (res.success) setClients(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClients(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, fetchClients]);

  const openAddForm = () => {
    setEditingClient(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const openEditForm = (client) => {
    setEditingClient(client);
    setForm({ name: client.name, email: client.email, phone: client.phone, address: client.address, dob: client.dob });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingClient(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingClient) {
      await updateClient(editingClient.id, form);
    } else {
      await createClient(form);
    }
    closeForm();
    fetchClients(search);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    await deleteClient(id);
    fetchClients(search);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f172a] tracking-tight">Clients</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Manage client profiles</p>
          </div>
          <span className="px-3 py-1.5 bg-[#dc2626]/10 text-[#dc2626] text-xs md:text-sm font-semibold rounded-full self-start">
            {clients.length} Total
          </span>
        </div>
      </motion.div>

      {/* Search + Add Button */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl text-sm text-slate-600 placeholder:text-slate-400 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
          />
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </motion.div>

      {/* Client Cards Grid */}
      {clients.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-[#0f172a]">No clients yet</h3>
          <p className="text-sm text-slate-400 mt-1">Add your first client to get started.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Avatar + Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-bold text-sm">
                    {getInitials(client.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#0f172a] truncate">{client.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{client.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-full shrink-0 ${
                    client.status === "Active"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {client.status === "Active" ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Inactive
                    </span>
                  )}
                </span>
              </div>

              {/* Info Rows */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.phone}</span>
                </div>
                {client.address && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{client.address}</span>
                  </div>
                )}
                {client.dob && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>DOB: {client.dob}</span>
                  </div>
                )}
              </div>

              {/* Case Count Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-slate-50 text-xs font-semibold text-slate-600 rounded-lg">
                  {client.caseCount} {client.caseCount === 1 ? "Case" : "Cases"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEditForm(client)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id, client.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── Form Modal ─── */}
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
            <div className="fixed inset-0 bg-black/50" onClick={closeForm} />

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
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#0f172a]">
                      {editingClient ? "Edit Client" : "Add Client"}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {editingClient ? "Update client details" : "Fill in the client details"}
                    </p>
                  </div>
                </div>
                <button onClick={closeForm} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
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
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all resize-none"
                    placeholder="Enter address"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date of Birth</label>
                  <input
                    type="text"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all"
                    placeholder="e.g. 15 Mar 1985"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#dc2626] text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                  >
                    {editingClient ? "Update Client" : "Add Client"}
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