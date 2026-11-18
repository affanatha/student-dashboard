# SiswaKu - Dashboard Informasi Siswa

Aplikasi Dashboard Sederhana untuk menampilkan dan memonitor data informasi siswa secara interaktif, modern, dan responsif. Dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Material UI (MUI)** dengan fokus utama pada pemahaman dan penerapan nyata **Flexbox** dan **CSS Grid**.

---

## 📸 Tampilan Dashboard

Aplikasi dirancang responsif dan optimal untuk berbagai ukuran layar:
- **Desktop**: Tampilan multi-kolom penuh, sidebar permanen, 4 kolom kartu statistik, dan layout konten bersisian.
- **Tablet**: 2 kolom kartu statistik, layout konten adaptif.
- **Mobile**: Sidebar otomatis beralih menjadi Drawer interaktif (toggle via hamburger menu), 1 kolom kartu statistik, dan tabel dengan horizontal scroll yang rapi.

---

## 🚀 Fitur Utama & Tantangan Tambahan

1. **A. Sidebar Interaktif**
   - Logo dan nama aplikasi (*SiswaKu*).
   - Menu Navigasi: *Dashboard*, *Data Siswa*, dan *Pengaturan* dengan status menu aktif.
   - Responsif: Sidebar otomatis menjadi Drawer modal di perangkat mobile dengan tombol toggle.
   - Info tahun ajaran dan semester aktif di bagian bawah.

2. **B. Navbar Modern**
   - Judul halaman dinamis sesuai menu yang dipilih.
   - Kolom pencarian realtime.
   - Avatar profil pengguna dengan badge status aktif online.
   - Tombol hamburger responsif untuk perangkat layar kecil.

3. **C. Kartu Statistik Dashboard**
   - 4 Metrik Utama:
     - **Total Siswa** (120 siswa)
     - **Siswa Laki-laki** (65 siswa)
     - **Siswa Perempuan** (55 siswa)
     - **Jumlah Kelas** (6 rombel)
   - Hover effect interaktif: elevasi bayangan halus, sedikit terangkat (`translateY(-4px)`), dan aksen border dinamis.

4. **D. Tabel Data Siswa**
   - Kolom lengkap: Nama Siswa (dengan Avatar inisial & email), NIS, Kelas, Jenis Kelamin (ikon & chip), serta Status keaktifan (chip berwarna).
   - **Fitur Pencarian**: Pencarian instan berdasarkan nama, NIS, kelas, atau email.
   - **Fitur Filter Multi-kategori**: Filter berdasarkan Kelas, Gender, dan Status dengan tombol *Reset*.
   - **Pagination**: Komponen `TablePagination` bawaan Material UI dengan opsi baris per halaman (5, 10, 20).

5. **E. Informasi Tambahan (Distribusi Per Kelas)**
   - Menampilkan visualisasi kapasitas tiap kelas menggunakan progress bar.

---

## 🛠️ Struktur Komponen Proyek

Proyek ini dipisahkan secara modular agar mudah dipelihara dan dipahami:

```text
src/
├── app/
│   ├── layout.tsx         # Root layout dengan ThemeRegistry
│   ├── page.tsx           # Halaman utama (mengatur state & layout)
│   └── globals.css        # CSS reset dasar
├── components/
│   ├── Sidebar.tsx        # Navigasi samping (Flexbox vertikal + Mobile Drawer)
│   ├── Navbar.tsx         # Bar navigasi atas (Flexbox horizontal)
│   ├── StatCard.tsx       # Kartu statistik tunggal (Flexbox internal + hover effect)
│   ├── StatGrid.tsx       # Kontainer kumpulan kartu statistik (CSS Grid responsif)
│   ├── StudentTable.tsx   # Tabel data siswa dengan search, filter, dan pagination
│   ├── ClassDistributionCard.tsx # Widget informasi tambahan distribusi rombel
│   ├── SettingsView.tsx   # Tampilan menu pengaturan sekolah & preferensi
│   └── ThemeRegistry.tsx  # Wrapper konfigurasi MUI Emotion untuk App Router
├── data/
│   └── students.ts        # Data dummy 20 siswa realistis beserta konstanta statistik
└── theme/
    └── theme.ts           # Konfigurasi kustom tema MUI (palet, tipografi, radius)
```

---

## 📐 Penjelasan Penerapan Flexbox & CSS Grid

### A. Bagian yang Menggunakan Flexbox (1-Dimensional Layout)

Flexbox digunakan pada komponen yang memerlukan perataan elemen dalam satu sumbu (horizontal atau vertikal):

1. **Layout Utama (`src/app/page.tsx`)**:
   ```tsx
   <Box sx={{ display: 'flex', minHeight: '100vh' }}>
     <Sidebar ... />
     <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
       ...
     </Box>
   </Box>
   ```
   *Fungsi*: Menempatkan Sidebar di sisi kiri (`flex-shrink: 0`) dan membiarkan konten utama di sisi kanan mengisi sisa ruang layar secara fleksibel (`flex-grow: 1`).

2. **Navbar (`src/components/Navbar.tsx`)**:
   ```tsx
   <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
     {/* Hamburger & Judul */}
     {/* Search Bar */}
     {/* Profil Pengguna */}
   </Toolbar>
   ```
   *Fungsi*: Menyusun ketiga elemen navbar secara horizontal, memposisikan search bar di tengah dan profil di ujung kanan dengan spasi yang teratur.

3. **Isi Sidebar (`src/components/Sidebar.tsx`)**:
   ```tsx
   <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
     {/* Header / Logo Brand */}
     {/* Menu Navigasi (flexGrow: 1) */}
     {/* Footer Info Tahun Ajaran */}
   </Box>
   ```
   *Fungsi*: Menyusun elemen sidebar dari atas ke bawah (vertikal). Bagian menu diberikan `flexGrow: 1` agar footer otomatis terdorong ke posisi paling bawah sidebar.

4. **Isi Kartu Statistik (`src/components/StatCard.tsx`)**:
   ```tsx
   <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
     {/* Teks Angka & Label */}
     {/* Avatar Ikon */}
   </CardContent>
   ```
   *Fungsi*: Menyejajarkan teks statistik di kiri dan ikon di kanan secara vertikal tengah (`alignItems: 'center'`).

---

### B. Bagian yang Menggunakan CSS Grid (2-Dimensional Layout)

CSS Grid digunakan untuk mengelola tata letak baris dan kolom dua dimensi yang membutuhkan pembagian kolom simetris dan responsif:

1. **Kumpulan Kartu Statistik (`src/components/StatGrid.tsx`)**:
   ```tsx
   <Box
     sx={{
       display: 'grid',
       gridTemplateColumns: {
         xs: '1fr',              // Mobile: 1 kolom
         sm: 'repeat(2, 1fr)',   // Tablet: 2 kolom
         lg: 'repeat(4, 1fr)',   // Desktop: 4 kolom
       },
       gap: '16px',
       mb: 3,
     }}
   >
     {cards.map(...)}
   </Box>
   ```
   *Fungsi*: Membagi 4 kartu statistik secara merata dan seragam tanpa perlu perhitungan lebar manual.

2. **Layout Konten Dashboard (`src/app/page.tsx`)**:
   ```tsx
   <Box
     sx={{
       display: 'grid',
       gridTemplateColumns: {
         xs: '1fr',             // Mobile & Tablet: Menumpuk vertikal
         xl: '2.5fr 1fr',       // Desktop Lebar: Tabel di kiri, Widget di kanan
       },
       gap: 3,
     }}
   >
     <StudentTable ... />
     <ClassDistributionCard ... />
   </Box>
   ```
   *Fungsi*: Menata tabel data siswa berdampingan dengan widget distribusi kelas secara proporsional (rasio 2.5 : 1).

---

## 🎯 Jawaban untuk Sesi Evaluasi & Review

Saat sesi presentasi atau review project, berikut adalah jawaban lengkap atas pertanyaan yang sering diajukan:

### 1. Mengapa Flexbox digunakan pada bagian tertentu?
> **Jawaban:** Flexbox dirancang untuk tata letak satu dimensi (*one-dimensional layout*), baik secara horizontal baris (*row*) maupun vertikal kolom (*column*). Flexbox sangat ideal untuk:
> - **Navbar**: Mengatur perataan horizontal antara judul, search bar, dan profil dengan `justify-content: space-between` dan `align-items: center`.
> - **Sidebar**: Menyusun daftar menu ke arah bawah dan mendorong footer ke ujung bawah menggunakan `flex-direction: column` serta `flex-grow: 1`.
> - **Isi Kartu**: Meratakan posisi teks angka dan ikon agar tepat sejajar vertikal di dalam kartu.

### 2. Mengapa CSS Grid digunakan pada bagian tertentu?
> **Jawaban:** CSS Grid dirancang khusus untuk tata letak dua dimensi (*two-dimensional layout*) yang mengatur baris dan kolom secara bersamaan. CSS Grid dipilih untuk:
> - **Kumpulan Kartu Statistik**: Grid mempermudah pembagian 4 kartu dengan ukuran lebar yang persis sama (`repeat(4, 1fr)`) serta menentukan jarak antar kartu (`gap: 16px`) tanpa komplikasi margin negatif atau kalkulasi persentase manual.
> - **Layout Konten**: Menata tabel dan widget tambahan dalam struktur kolom dan baris yang rapi.

### 3. Bagaimana cara kerja layout saat ukuran layar berubah?
> **Jawaban:** Menggunakan sistem breakpoints Material UI (`xs: 0px`, `sm: 600px`, `md: 900px`, `lg: 1200px`, `xl: 1536px`):
> - **Pada Desktop (>900px)**: Sidebar ditampilkan permanen di kiri (`Drawer permanent`). Kartu statistik dibagi menjadi 4 kolom sejajar.
> - **Pada Tablet (600px - 900px)**: Kartu statistik otomatis terbagi menjadi 2 baris x 2 kolom (`repeat(2, 1fr)`).
> - **Pada Mobile (<600px)**: Sidebar otomatis disembunyikan dan diakses via tombol hamburger menu (`Drawer temporary`). Kartu statistik beralih menjadi 1 kolom (`1fr`) vertikal agar tidak sempit dan mudah dibaca. Tabel siswa dilengkapi kemampuan scroll horizontal (`overflowX: auto`).

### 4. Bagaimana komponen React dipisahkan dalam project?
> **Jawaban:** Mengikuti prinsip *Separation of Concerns* (Pemisahan Tanggung Jawab):
> - **`src/data/students.ts`**: Menyimpan struktur data dan dummy array terpisah dari UI logic.
> - **`Sidebar.tsx` & `Navbar.tsx`**: Menangani navigasi dan header aplikasi secara terisolasi.
> - **`StatCard.tsx` & `StatGrid.tsx`**: `StatCard` fokus pada tampilan visual satu kartu, sedangkan `StatGrid` fokus pada aturan tata letak grid kumpulan kartu.
> - **`StudentTable.tsx`**: Berdiri sendiri dengan mengelola state internal filter, pagination, dan pencarian data siswa.
> - **`page.tsx`**: Bertindak sebagai *orchestrator* yang menyatukan komponen-komponen tersebut ke dalam satu tampilan terpadu.

### 5. Bagaimana Material UI (MUI) membantu proses pembuatan UI?
> **Jawaban:**
> - Menyediakan komponen primitif yang aksesibel dan siap pakai (`Box`, `Card`, `Table`, `TextField`, `Button`, `Drawer`).
> - Memudahkan styling Flexbox dan Grid langsung melalui properti `sx` yang terintegrasi dengan breakpoints tema.
> - Memastikan konsistensi visual di seluruh aplikasi melalui konfigurasi tema global (`theme.ts`) untuk warna, font, dan radius sudut elemen.

---

## 💻 Panduan Menjalankan Project

### 1. Prasyarat
- Node.js versi 18 ke atas (disarankan v20 atau v22).
- npm atau yarn.

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan di Mode Development
```bash
npm run dev
```
Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

### 4. Build untuk Production
```bash
npm run build
npm run start
```

---

## 📦 Panduan Pengumpulan & Push ke GitHub

Untuk mengunggah kode ke GitHub pribadi Anda:
1. Buat repository baru di [GitHub](https://github.com/new) (misal: `student-dashboard`).
2. Hubungkan repository lokal dan lakukan push:
```bash
git remote add origin https://github.com/USERNAME/student-dashboard.git
git branch -M main
git push -u origin main
```
