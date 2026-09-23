# 🗄️ Dokumentasi Sanity CMS (Studio v3)

Dokumen ini menjelaskan arsitektur, definisi schema data, manajemen konten, serta deployment untuk **Sanity Studio v3** yang bertindak sebagai Headless CMS proyek **Ryandita-profileV.2**.

---

## 🏗️ Gambaran Umum Sanity Studio

Sanity Studio adalah editor konten berbasis web (React + TypeScript) yang dikonfigurasi melalui kode. Data disimpan di cloud infrastruktur Sanity.io. Sisi Frontend melakukan query data menggunakan GROQ melalui API endpoint Sanity.

- **URL Dashboard Project**: [https://manage.sanity.io](https://manage.sanity.io)
- **URL Deployed Studio**: [https://cms-portfolio-ryandita.sanity.studio](https://cms-portfolio-ryandita.sanity.studio)
- **Project ID**: ``
- **Dataset**: `production`

---

## 📂 Struktur Direktori Sanity

```text
sanity/
├── schemaTypes/          # Direktori utama definisi model data
│   ├── index.ts          # Index untuk mendaftarkan semua tipe schema
│   ├── experienceType.ts # Definisi schema untuk Riwayat Pengalaman
│   └── projectType.ts    # Definisi schema untuk Proyek Portfolio
├── static/               # File aset statis khusus Studio
├── sanity.cli.ts         # Konfigurasi CLI Sanity (deployment, API endpoint)
├── sanity.config.ts      # Konfigurasi utama Studio (title, plugins, schemaTypes)
└── package.json          # Dependensi npm dan script build
```

---

## 🗃️ Skema Model Konten (Schema Types)

Proyek ini mendefinisikan 2 dokumen utama (Document Types) yang didaftarkan pada file `schemaTypes/index.ts`:

### 1. `experience` (Riwayat Pengalaman)
Digunakan untuk mengelola data riwayat kerja, organisasi, atau pendidikan yang akan ditampilkan di section Experience halaman utama.

| Nama Field | Label UI | Tipe Data | Deskripsi / Pilihan |
| :--- | :--- | :--- | :--- |
| `title` | Title | `string` | Judul Pekerjaan / Jabatan (e.g. *Frontend Developer*) |
| `company` | Company / Organization | `string` | Nama perusahaan atau instansi |
| `employmentType` | Employment Type | `string` | Tipe kontrak: *Full-time, Part-time, Self-employed, Freelance, Contract, Internship, Apprenticeship, Seasonal* |
| `duration` | Duration | `string` | Rentang waktu detail (e.g. *Jan 2025 - Present*) |
| `description` | Description | `text` | Deskripsi tugas atau pencapaian |
| `years` | Years | `string` | Label tahun untuk timeline (e.g. *2025 - 2026*) |
| `order` | Order | `number` | Indeks urutan pengurutan manual (asc) |

### 2. `project` (Proyek Portfolio)
Digunakan untuk mengelola item-item proyek yang ditampilkan di galeri portfolio dan halaman detail proyek.

| Nama Field | Label UI | Tipe Data | Deskripsi / Pilihan |
| :--- | :--- | :--- | :--- |
| `title` | Project Title | `string` | Judul proyek |
| `slug` | Slug | `slug` | Auto-generate berdasarkan judul proyek (digunakan untuk routing URL `/portfolio/slug-proyek`) |
| `description` | Description | `text` | Deskripsi detail tentang proyek |
| `thumbnail` | Thumbnail | `image` | Gambar utama cover proyek |
| `techStack` | Tech Stack | `array of string` | Daftar teknologi yang digunakan (e.g. *Next.js, Tailwind, Bun*) |
| `github` | Github | `url` | Link ke repository source code GitHub |
| `demo` | Live Demo | `url` | Link website yang sudah online |
| `gallery` | Gallery Images | `array of image` | Kumpulan gambar screenshot (Concept Frame 1, Concept Frame 2, dll) |
| `featured` | Featured | `boolean` | Tampilkan di section portfolio utama halaman Home jika bernilai `true` |
| `category` | Category | `string` | Kategori proyek (e.g. *Web Application, UI/UX Design*) |
| `year` | Year | `string` | Tahun pembuatan proyek |

---

## 🛠️ Menambahkan Schema Baru

Jika Anda ingin menambahkan jenis konten baru (misal: **Blog Post**):
1. Buat file baru di `/schemaTypes/blogType.ts`:
   ```typescript
   import {defineField, defineType} from 'sanity'

   export const blogType = defineType({
     name: 'blog',
     title: 'Blog Posts',
     type: 'document',
     fields: [
       defineField({ name: 'title', type: 'string', title: 'Title' }),
       defineField({ name: 'content', type: 'text', title: 'Content' }),
     ]
   })
   ```
2. Daftarkan di `/schemaTypes/index.ts`:
   ```typescript
   import {projectType} from './projectType'
   import {experienceType} from './experienceType'
   import {blogType} from './blogType' // Import schema baru

   export const schemaTypes = [projectType, experienceType, blogType]
   ```
3. Jalankan `bun dev` untuk melihat tipe data baru tersebut muncul secara otomatis di Studio lokal.

---

## 🔒 Mengatur CORS Origin (Sangat Penting)

Secara default, Sanity memblokir akses data dari luar jika domain asal tidak didaftarkan ke daftar aman (CORS Origins).

### Cara Menambahkan CORS Origin:
- **Menggunakan CLI (di folder `/sanity`)**:
  ```bash
  npx sanity cors add http://localhost:3000 --credentials
  ```
  *(Ganti `http://localhost:3000` dengan domain production Anda jika sudah dideploy ke Vercel).*
  
- **Menggunakan Dashboard Web**:
  1. Masuk ke [manage.sanity.io](https://manage.sanity.io).
  2. Pilih proyek **Portfolio CMS** (``).
  3. Buka tab **API** > **CORS origins**.
  4. Klik **Add CORS origin**, masukkan URL domain Anda, centang "Allow credentials", lalu simpan.

---

## 🚀 Panduan Deployment Sanity Studio

Sanity Studio dideploy langsung ke hosting gratis bawaan Sanity (`sanity.studio`):

1. Masuk ke folder `/sanity`:
   ```bash
   cd sanity
   ```
2. Jalankan perintah deploy:
   ```bash
   bun run deploy
   ```
3. Studio akan dibangun (build) dan diunggah ke alamat: **[https://cms-portfolio-ryandita.sanity.studio](https://cms-portfolio-ryandita.sanity.studio)**

> [!TIP]
> Untuk menghindari pertanyaan berulang mengenai ID Aplikasi di masa mendatang, `appId` Anda (`det7yr4u8hmsswqih7vg1rnr`) dapat ditambahkan pada file `sanity.cli.ts` di bagian key `deployment`.
