# ⚖️ VerdictOne — Client Portal

A modern legal client portal built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

Client-facing dashboard for tracking legal cases, accessing documents, communicating with advocates, and staying updated on hearings — all in one place.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Case Dashboard** | Real-time overview of active cases, next hearings, and court details |
| **Timeline** | Visual progress tracking with color-coded states (completed / in-progress / pending) |
| **Document Center** | Upload, download, and manage legal documents (PDFs, affidavits, notices) |
| **Client Queries** | WhatsApp-style chat with your advocate — persistent history |
| **Notifications** | Hearing reminders, document alerts, and case update notifications |
| **Quick Actions** | Ask question, upload document, book appointment, call advocate |
| **Stats Overview** | Active cases, document count, upcoming hearings, resolved queries |

---

## 🎨 Design System

```
Background  → #f8fafc
Primary     → #0f172a
Accent      → #1d4ed8
Success     → #10b981
Warning     → #f59e0b
Danger      → #ef4444
```

- **Typography:** Outfit (headings) + Inter (body)
- **Corners:** `rounded-xl` (10px) / `rounded-2xl` / `rounded-3xl`
- **Shadows:** Soft slate shadows (`shadow-lg shadow-slate-100`)
- **Animations:** Framer Motion staggered fade-ins on dashboard load

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Outfit + Inter (via next/font) |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

The client dashboard lives at `/dashboard` — static demo data is already in place.

---

## 📁 Project Structure

```
app/
├── globals.css          # Theme variables + base styles
├── layout.tsx           # Root layout (fonts, metadata)
├── page.tsx             # Landing page
└── dashboard/
    ├── layout.jsx       # Dashboard shell (sidebar + top bar)
    └── page.jsx         # Client dashboard (all sections)
```

---

## 🗺️ Roadmap

- [ ] Authentication (OTP / email + password)
- [ ] MongoDB integration for dynamic data
- [ ] Admin panel for advocates
- [ ] Document upload with Cloudinary / S3
- [ ] Email & SMS notifications (Resend / Twilio)
- [ ] Hindi + English language toggle
- [ ] Appointment booking with calendar sync
- [ ] E-sign integration
- [ ] Payment invoices

---

## 📄 License

MIT — built for legal tech.
