/**
 * Fake API Layer — Replace these functions with real API calls later.
 * All functions return promises to simulate async behavior.
 */

// ─── In-memory Store ──────────────────────────────────────────────
let nextId = 100;

const store = {
  clients: [
    { id: 1, name: "Ahmed Khan", email: "ahmed.khan@email.com", phone: "+91 98765 43210", address: "12, Sattar Taluka Society, Paldi, Ahmedabad", dob: "15 Mar 1985", caseCount: 2, status: "Active", createdAt: "08 Jan 2026" },
    { id: 2, name: "Fatima Begum", email: "fatima.b@email.com", phone: "+91 98765 67890", address: "45, Shahibaug, Ahmedabad", dob: "22 Jun 1990", caseCount: 1, status: "Active", createdAt: "03 Feb 2026" },
    { id: 3, name: "Rahul Sharma", email: "rahul.s@email.com", phone: "+91 98765 11122", address: "78, Satellite, Ahmedabad", dob: "10 Nov 1982", caseCount: 0, status: "Inactive", createdAt: "20 Apr 2026" },
  ],
  lawyers: [
    { id: 1, name: "Adv. Priya Sharma", email: "priya.sharma@legalfirm.com", phone: "+91 98765 43210", specialization: "Constitutional Law", cases: 12, status: "Active", barCouncilId: "GJ/1245/2010" },
    { id: 2, name: "Adv. Rohan Mehta", email: "rohan.mehta@legalfirm.com", phone: "+91 98765 11223", specialization: "Civil Law", cases: 8, status: "Active", barCouncilId: "GJ/2098/2012" },
    { id: 3, name: "Adv. Sneha Patel", email: "sneha.p@legalfirm.com", phone: "+91 98765 33445", specialization: "Criminal Law", cases: 15, status: "Active", barCouncilId: "GJ/1567/2015" },
  ],
  cases: [
    { id: "SC/2026/1024", title: "State of Gujarat vs. Ahmed Khan", court: "Supreme Court of India", clientId: 1, lawyerId: 1, type: "Writ Petition", status: "Active", nextHearing: "22 Jul 2026", filedOn: "12 Jan 2026", details: "Writ petition under Article 32 challenging detention order." },
    { id: "HC/2026/0891", title: "Ahmed Khan vs. Municipal Corp.", court: "High Court of Gujarat", clientId: 1, lawyerId: 1, type: "Civil Appeal", status: "Active", nextHearing: "05 Aug 2026", filedOn: "03 Feb 2026", details: "Appeal against property tax assessment order." },
    { id: "DL/2025/4523", title: "Property Dispute — Khan Family", court: "District Court, Ahmedabad", clientId: 2, lawyerId: 2, type: "Civil Suit", status: "Closed", nextHearing: null, filedOn: "18 Sep 2025", details: "Ancestral property dispute resolved via settlement." },
  ],
  documents: [
    { id: 1, name: "Order_Copy.pdf", uploaded: "14 Mar 2026", size: "1.2 MB", category: "Orders", caseId: "SC/2026/1024" },
    { id: 2, name: "Hearing_Notice.pdf", uploaded: "10 Mar 2026", size: "0.8 MB", category: "Notices", caseId: "SC/2026/1024" },
    { id: 3, name: "Affidavit_Annexure.pdf", uploaded: "28 Feb 2026", size: "2.4 MB", category: "Affidavits", caseId: "SC/2026/1024" },
    { id: 4, name: "Case_Brief_Summary.pdf", uploaded: "12 Jan 2026", size: "1.6 MB", category: "Briefs", caseId: "SC/2026/1024" },
    { id: 5, name: "Appeal_Memo.pdf", uploaded: "03 Feb 2026", size: "2.0 MB", category: "Petitions", caseId: "HC/2026/0891" },
    { id: 6, name: "Settlement_Deed.pdf", uploaded: "10 Mar 2026", size: "1.1 MB", category: "Legal", caseId: "DL/2025/4523" },
  ],
  hearings: [
    { id: 1, caseId: "SC/2026/1024", date: "22 Jul 2026", time: "10:30 AM", courtRoom: "Court Room No. 3", judge: "Hon'ble Justice Sharma", status: "Scheduled", notes: "Preliminary hearing" },
    { id: 2, caseId: "HC/2026/0891", date: "05 Aug 2026", time: "11:00 AM", courtRoom: "Court Room No. 7", judge: "Hon'ble Justice Patel", status: "Scheduled", notes: "First hearing" },
    { id: 3, caseId: "DL/2025/4523", date: "10 Mar 2026", time: "10:00 AM", courtRoom: "Court Room No. 2", judge: "Hon'ble Justice Desai", status: "Completed", notes: "Final order passed" },
  ],
  updates: [
    { id: 1, caseId: "SC/2026/1024", action: "Hearing Scheduled", detail: "Next hearing confirmed for 22 July 2026 at 10:30 AM", date: "15 Jun 2026", time: "2:15 PM", type: "hearing" },
    { id: 2, caseId: "SC/2026/1024", action: "Document Uploaded", detail: "Hearing_Notice.pdf added", date: "10 Mar 2026", time: "11:30 AM", type: "document" },
    { id: 3, caseId: "HC/2026/0891", action: "Notice Served", detail: "Notice served to Municipal Corporation", date: "20 Feb 2026", time: "3:00 PM", type: "legal" },
  ],
  tasks: [
    { id: 1, title: "Prepare case brief for SC/2026/1024", assignedTo: "Adv. Priya Sharma", dueDate: "20 Jul 2026", priority: "High", status: "Pending", caseId: "SC/2026/1024" },
    { id: 2, title: "File additional affidavit for HC/2026/0891", assignedTo: "Adv. Priya Sharma", dueDate: "01 Aug 2026", priority: "Medium", status: "In Progress", caseId: "HC/2026/0891" },
    { id: 3, title: "Archive closed case DL/2025/4523", assignedTo: "Admin", dueDate: "15 Mar 2026", priority: "Low", status: "Completed", caseId: "DL/2025/4523" },
  ],
  courts: [
    { id: 1, name: "Supreme Court of India", location: "New Delhi", type: "Apex Court", judgeCount: 34, activeCases: 1200 },
    { id: 2, name: "High Court of Gujarat", location: "Ahmedabad", type: "High Court", judgeCount: 52, activeCases: 8500 },
    { id: 3, name: "District Court, Ahmedabad", location: "Ahmedabad", type: "District Court", judgeCount: 15, activeCases: 3200 },
  ],
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Simulate network delay
function delay(ms = 200) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── API Functions ────────────────────────────────────────────────

// ─── Clients ───
export async function getClients(search = "") {
  await delay();
  let list = clone(store.clients);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
  }
  return { success: true, data: list };
}

export async function getClient(id) {
  await delay();
  const c = store.clients.find((c) => c.id === id);
  if (!c) return { success: false, error: "Client not found" };
  return { success: true, data: clone(c) };
}

export async function createClient(data) {
  await delay();
  const id = ++nextId;
  const client = { id, ...data, caseCount: 0, createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), status: "Active" };
  store.clients.push(client);
  return { success: true, data: client };
}

export async function updateClient(id, data) {
  await delay();
  const idx = store.clients.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Client not found" };
  store.clients[idx] = { ...store.clients[idx], ...data };
  return { success: true, data: clone(store.clients[idx]) };
}

export async function deleteClient(id) {
  await delay();
  const idx = store.clients.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Client not found" };
  store.clients.splice(idx, 1);
  return { success: true };
}

// ─── Lawyers ───
export async function getLawyers(search = "") {
  await delay();
  let list = clone(store.lawyers);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((l) => l.name.toLowerCase().includes(q) || l.specialization.toLowerCase().includes(q));
  }
  return { success: true, data: list };
}

export async function getLawyer(id) {
  await delay();
  const l = store.lawyers.find((l) => l.id === id);
  if (!l) return { success: false, error: "Lawyer not found" };
  return { success: true, data: clone(l) };
}

export async function createLawyer(data) {
  await delay();
  const id = ++nextId;
  const lawyer = { id, ...data, cases: 0, status: "Active" };
  store.lawyers.push(lawyer);
  return { success: true, data: lawyer };
}

export async function updateLawyer(id, data) {
  await delay();
  const idx = store.lawyers.findIndex((l) => l.id === id);
  if (idx === -1) return { success: false, error: "Lawyer not found" };
  store.lawyers[idx] = { ...store.lawyers[idx], ...data };
  return { success: true, data: clone(store.lawyers[idx]) };
}

export async function deleteLawyer(id) {
  await delay();
  const idx = store.lawyers.findIndex((l) => l.id === id);
  if (idx === -1) return { success: false, error: "Lawyer not found" };
  store.lawyers.splice(idx, 1);
  return { success: true };
}

// ─── Cases ───
export async function getCases(search = "") {
  await delay();
  let list = clone(store.cases);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.court.toLowerCase().includes(q));
  }
  return { success: true, data: list };
}

export async function getCase(id) {
  await delay();
  const c = store.cases.find((c) => c.id === id);
  if (!c) return { success: false, error: "Case not found" };
  return { success: true, data: clone(c) };
}

export async function createCase(data) {
  await delay();
  const caseId = data.id || `C/${2026}/${nextId++}`;
  const c = { id: caseId, ...data, filedOn: data.filedOn || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) };
  store.cases.push(c);
  // Update client case count
  const client = store.clients.find((cl) => cl.id === c.clientId);
  if (client) client.caseCount = (client.caseCount || 0) + 1;
  return { success: true, data: c };
}

export async function updateCase(id, data) {
  await delay();
  const idx = store.cases.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Case not found" };
  store.cases[idx] = { ...store.cases[idx], ...data };
  return { success: true, data: clone(store.cases[idx]) };
}

export async function deleteCase(id) {
  await delay();
  const idx = store.cases.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Case not found" };
  const c = store.cases[idx];
  const client = store.clients.find((cl) => cl.id === c.clientId);
  if (client) client.caseCount = Math.max(0, (client.caseCount || 0) - 1);
  store.cases.splice(idx, 1);
  return { success: true };
}

// ─── Documents ───
export async function getDocuments(caseId = null, category = "") {
  await delay();
  let list = clone(store.documents);
  if (caseId) list = list.filter((d) => d.caseId === caseId);
  if (category && category !== "All") list = list.filter((d) => d.category === category);
  return { success: true, data: list };
}

export async function createDocument(data) {
  await delay();
  const id = ++nextId;
  const doc = { id, ...data, uploaded: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) };
  store.documents.push(doc);
  return { success: true, data: doc };
}

export async function deleteDocument(id) {
  await delay();
  const idx = store.documents.findIndex((d) => d.id === id);
  if (idx === -1) return { success: false, error: "Document not found" };
  store.documents.splice(idx, 1);
  return { success: true };
}

// ─── Hearings ───
export async function getHearings(caseId = null) {
  await delay();
  let list = clone(store.hearings);
  if (caseId) list = list.filter((h) => h.caseId === caseId);
  return { success: true, data: list };
}

export async function createHearing(data) {
  await delay();
  const id = ++nextId;
  const hearing = { id, ...data };
  store.hearings.push(hearing);
  return { success: true, data: hearing };
}

export async function updateHearing(id, data) {
  await delay();
  const idx = store.hearings.findIndex((h) => h.id === id);
  if (idx === -1) return { success: false, error: "Hearing not found" };
  store.hearings[idx] = { ...store.hearings[idx], ...data };
  return { success: true, data: clone(store.hearings[idx]) };
}

export async function deleteHearing(id) {
  await delay();
  const idx = store.hearings.findIndex((h) => h.id === id);
  if (idx === -1) return { success: false, error: "Hearing not found" };
  store.hearings.splice(idx, 1);
  return { success: true };
}

// ─── Updates ───
export async function getUpdates(caseId = null) {
  await delay();
  let list = clone(store.updates);
  if (caseId) list = list.filter((u) => u.caseId === caseId);
  list.sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));
  return { success: true, data: list };
}

export async function createUpdate(data) {
  await delay();
  const id = ++nextId;
  const update = { id, ...data, date: data.date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), time: data.time || new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) };
  store.updates.push(update);
  return { success: true, data: update };
}

export async function deleteUpdate(id) {
  await delay();
  const idx = store.updates.findIndex((u) => u.id === id);
  if (idx === -1) return { success: false, error: "Update not found" };
  store.updates.splice(idx, 1);
  return { success: true };
}

// ─── Tasks ───
export async function getTasks(status = "", caseId = null) {
  await delay();
  let list = clone(store.tasks);
  if (status) list = list.filter((t) => t.status === status);
  if (caseId) list = list.filter((t) => t.caseId === caseId);
  return { success: true, data: list };
}

export async function createTask(data) {
  await delay();
  const id = ++nextId;
  const task = { id, ...data };
  store.tasks.push(task);
  return { success: true, data: task };
}

export async function updateTask(id, data) {
  await delay();
  const idx = store.tasks.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, error: "Task not found" };
  store.tasks[idx] = { ...store.tasks[idx], ...data };
  return { success: true, data: clone(store.tasks[idx]) };
}

export async function deleteTask(id) {
  await delay();
  const idx = store.tasks.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, error: "Task not found" };
  store.tasks.splice(idx, 1);
  return { success: true };
}

// ─── Courts ───
export async function getCourts(search = "") {
  await delay();
  let list = clone(store.courts);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
  }
  return { success: true, data: list };
}

export async function createCourt(data) {
  await delay();
  const id = ++nextId;
  const court = { id, ...data };
  store.courts.push(court);
  return { success: true, data: court };
}

export async function updateCourt(id, data) {
  await delay();
  const idx = store.courts.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Court not found" };
  store.courts[idx] = { ...store.courts[idx], ...data };
  return { success: true, data: clone(store.courts[idx]) };
}

export async function deleteCourt(id) {
  await delay();
  const idx = store.courts.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, error: "Court not found" };
  store.courts.splice(idx, 1);
  return { success: true };
}

// ─── Dashboard Stats ───
export async function getAdminStats() {
  await delay();
  return {
    success: true,
    data: {
      totalClients: store.clients.length,
      activeClients: store.clients.filter((c) => c.status === "Active").length,
      totalLawyers: store.lawyers.length,
      activeLawyers: store.lawyers.filter((l) => l.status === "Active").length,
      totalCases: store.cases.length,
      activeCases: store.cases.filter((c) => c.status === "Active").length,
      totalDocuments: store.documents.length,
      upcomingHearings: store.hearings.filter((h) => h.status === "Scheduled").length,
      pendingTasks: store.tasks.filter((t) => t.status !== "Completed").length,
      totalCourts: store.courts.length,
    },
  };
}
