# 🖥️ Dokumentasi Frontend (Next.js)

Dokumen ini menjelaskan struktur, alur kerja, data fetching, serta panduan deployment untuk bagian Frontend aplikasi **Ryandita-profileV.2**.

---

## 🛠️ Tech Stack & Fitur Utama

- **Framework**: Next.js 16 (React 19) dengan dukungan App Router (`app/` directory).
- **Styling**: Tailwind CSS v4.0 (konfigurasi baru menggunakan `@tailwindcss/postcss`).
- **Data Fetching**: Next-Sanity & GROQ (Graph Relation Object Queries) untuk pengambilan data asinkron dari CMS secara server-side (SSR).
- **Animasi**: Framer Motion untuk mikro-interaksi dan animasi transisi halaman premium.
- **Aset Gambar**: `@sanity/image-url` untuk melakukan optimasi (resizing, formatting) gambar dari CDN Sanity secara dinamis.

---

## 📂 Struktur Direktori Frontend

Berikut adalah penjelasan fungsi direktori di dalam folder `/frontend`:

```text
frontend/
├── app/                  # Next.js App Router
│   ├── components/       # Komponen UI global & layouting
│   │   ├── layouts/      # Layout utama (Navbar, Footer)
│   │   └── ui/           # Atom komponen reusable (Button, Badge, dll)
│   ├── pages/            # Konten modular per halaman
│   │   └── homepage/     # Komponen section khusus halaman utama (Hero, Stats, dll)
│   ├── portfolio/        # Halaman arsip & detail portfolio (/portfolio & /portfolio/[slug])
│   ├── globals.css       # File style utama (Tailwind directives)
│   ├── layout.tsx        # Root Layout utama aplikasi
│   └── page.tsx          # Halaman Utama (Homepage)
├── data/                 # Data statis lokal (backup/pengembangan tanpa CMS)
├── lib/                  # Utilitas dan integrasi API
│   ├── queries/          # Definisi query GROQ untuk mengambil data
│   └── sanity.ts         # Inisialisasi client Sanity & utilitas gambar
├── public/               # Gambar statis, logo, dan font lokal
├── package.json          # Dependensi dan script build npm
└── tsconfig.json         # Konfigurasi TypeScript
```

---

## ⚙️ Environment Variables (.env)

Untuk menghubungkan Frontend dengan database Sanity di cloud, Next.js membutuhkan file `.env.local` di root folder `/frontend` dengan isi sebagai berikut:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-05-22"
```

> [!WARNING]
> Jangan pernah mengunggah file `.env.local` ke repositori Git (file ini sudah otomatis diabaikan oleh `.gitignore`). Nilai-nilai di atas harus didaftarkan di dashboard hosting (misal: Vercel) ketika dideploy ke server production.

---

## 🔌 Koneksi & Data Fetching (Sanity Client)

Inisialisasi Sanity client dilakukan pada file `lib/sanity.ts`:
```typescript
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false, // Set false untuk mendapatkan data real-time terbaru saat build/request
});

const builder = createImageUrlBuilder(client as any);

// Fungsi pembantu untuk mengonversi objek gambar Sanity menjadi URL CDN yang valid
export function urlFor(source: any) {
  return builder.image(source);
}
```

### Contoh GROQ Queries (`lib/queries/projects.ts`):
```typescript
import { defineQuery } from "next-sanity";

// Query untuk mengambil semua project
export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    thumbnail,
    techStack,
    github,
    demo,
    featured,
    category,
    year
  }
`);
```

### Mengambil Data di Server Component (`app/page.tsx`):
Next.js 16 menggunakan Server Components secara default. Data diambil langsung di sisi server sebelum dikirim sebagai HTML ke browser:
```typescript
import { client } from "@/lib/sanity";
import { experiencesQuery } from "@/lib/queries/experience";
import { projectsQuery } from "@/lib/queries/projects";
import Experience from "./pages/homepage/Experience";
import Portfolio from "./pages/homepage/Portfolio";

export default async function Home() {
  // Melakukan fetch paralel untuk mempercepat loading
  const [experiences, projects] = await Promise.all([
    client.fetch(experiencesQuery),
    client.fetch(projectsQuery),
  ]);

  return (
    <>
      <Experience experiences={experiences} />
      <Portfolio projects={projects} />
    </>
  );
}
```

---

## 🎨 Menampilkan Gambar dari Sanity

Untuk menampilkan gambar (seperti Thumbnail Proyek) menggunakan komponen `<Image />` bawaan Next.js, gunakan fungsi `urlFor` yang sudah dibuat:

```tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface ProjectCardProps {
  project: {
    title: string;
    thumbnail?: any;
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.thumbnail ? urlFor(project.thumbnail).url() : null;

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover"
        />
      ) : (
        <div className="bg-gray-200">No Image Preview</div>
      )}
    </div>
  );
}
```

---

## 🚀 Panduan Deployment ke Vercel

Frontend Next.js dapat dideploy dengan mudah ke platform Vercel menggunakan integrasi GitHub:

1. Buat project baru di Vercel Dashboard dan hubungkan dengan repositori GitHub Anda.
2. Pada langkah konfigurasi proyek, masuk ke bagian **Environment Variables**.
3. Daftarkan tiga variabel berikut beserta nilainya:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = ``
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2026-05-22`
4. Klik **Deploy**.
5. **Penting**: Setelah deploy berhasil di Vercel, pastikan domain URL aplikasi Anda (`https://nama-aplikasi.vercel.app`) ditambahkan ke daftar **CORS Origins** di dashboard Sanity Anda (atau jalankan `sanity cors add` di terminal proyek Sanity) agar Next.js diizinkan melakukan fetch data dari CMS.
