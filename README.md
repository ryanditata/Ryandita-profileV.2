# Ryandita-profileV.2

Repositori ini berisi kode sumber untuk website portfolio modern pribadi yang dibangun dengan arsitektur **Headless CMS**. Proyek ini menggunakan **Next.js** di sisi frontend untuk performa yang optimal serta tampilan interaktif, dan **Sanity Studio** sebagai sistem manajemen konten (CMS) yang fleksibel.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
*   **Framework**: [Next.js 16](https://nextjs.org/) (dengan React 19)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animasi**: [Framer Motion](https://www.framer.com/motion/) untuk transisi mikro dan interaksi dinamis yang premium
*   **Ikon**: [Lucide React](https://lucide.dev/)
*   **Runtime/Package Manager**: [Bun](https://bun.sh/)

### Backend / Headless CMS (`/sanity`)
*   **Platform**: [Sanity Studio v3](https://www.sanity.io/)
*   **Fitur**: Integrasi schema-driven, real-time collaboration, query menggunakan GROQ, dan visual editor.
*   **Database/Dataset**: Hosted on Sanity.io cloud.

---

## 📂 Struktur Direktori

```text
Ryandita-profileV.2/
├── frontend/          # Aplikasi Next.js (Web Frontend)
│   ├── app/           # Next.js App Router (pages, components, layouts)
│   ├── data/          # Mock data lokal untuk pengembangan awal
│   ├── public/        # Aset statis (gambar, font, svg)
│   └── package.json
├── sanity/            # Konfigurasi Sanity Studio (Headless CMS)
│   ├── schemaTypes/   # Definisi schema untuk konten Sanity
│   ├── sanity.config.ts
│   └── package.json
└── README.md          # Dokumentasi utama (file ini)
```

---

## 🚀 Cara Menjalankan Project Secara Lokal

Pastikan Anda telah menginstal **Bun** pada mesin Anda sebelum memulai. Jika belum, Anda dapat menginstalnya melalui instruksi di [bun.sh](https://bun.sh).

### 1. Menjalankan Sanity Studio (CMS)
Buka terminal baru, navigasikan ke folder `sanity`, pasang dependensi, lalu jalankan development server:
```bash
cd sanity
bun install
bun dev
```
Setelah berjalan, buka [http://localhost:3333](http://localhost:3333) di browser untuk mengelola konten portfolio Anda.

### 2. Menjalankan Next.js (Frontend)
Buka terminal baru lainnya, navigasikan ke folder `frontend`, pasang dependensi, lalu jalankan development server:
```bash
cd frontend
bun install
bun dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat website portfolio Anda secara langsung.

---

## ⚙️ Konfigurasi Environment Variables

Untuk menghubungkan Frontend dengan Sanity CMS, buat file `.env.local` di dalam folder `/frontend` (atau atur pada penyedia layanan hosting Anda):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
```

*Catatan: Project ID (``) telah sesuai dengan konfigurasi bawaan Studio pada `sanity.config.ts`.*

---

## 🚀 Deployment

### Mendeploy Sanity Studio
Untuk mempublikasikan CMS Anda agar dapat diakses secara online:
```bash
cd sanity
bun run deploy
```

### Mendeploy Next.js Frontend
Frontend Next.js dapat dideploy dengan mudah di platform seperti **Vercel**, **Netlify**, atau platform pilihan Anda lainnya dengan menghubungkan repositori GitHub Anda.
Pastikan untuk menyertakan environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID` dan `NEXT_PUBLIC_SANITY_DATASET`) pada dashboard hosting Anda.
