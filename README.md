# Portofolio Pribadi — Modern, Elegan & Minimalis

Website portofolio pribadi dengan pendekatan desain bersih, monokromatik abu-abu (*charcoal* gelap hingga *light grey*), dan ruang kosong (*negative space*) yang lega. Dibangun menggunakan teknologi web murni: **HTML5, Vanilla CSS, dan JavaScript murni** tanpa dependensi pihak ketiga yang berat.

---

## Fitur Utama

- **Estetika Monokrom Premium**: Palet warna dominan abu-abu arsitektural (*charcoal*, *slate*, dan kontras *off-white*) yang tenang, bebas dari gradien norak atau elemen yang terlalu ramai.
- **Dukungan Dua Tema (Dark Charcoal & Studio Light)**: Mengikuti standar kontras tinggi WCAG AA (4.5:1+), tersimpan otomatis di *local storage*.
- **Hierarki Tipografi Tajam**: Menggunakan font modern *Plus Jakarta Sans* dengan pengaturan *letter-spacing* dan *line-height* yang nyaman dibaca.
- **Ruang Kosong (*Whitespace*) yang Luas**: Layout berbasis grid terstruktur yang memberikan fokus maksimal pada karya dan konten Anda.
- **Interaktivitas Halus (*Subtle Micro-interactions*)**:
  - Filter kategori proyek portofolio instan tanpa memuat ulang halaman (*Semua Proyek, Web Application, Full-Stack System, Frontend*).
  - Salin alamat surel cepat (*One-click copy to clipboard*) dengan notifikasi *toast* minimalis.
  - Akses langsung unduh/baca berkas CV PDF resmi dari tombol Hero.
  - Formulir kontak interaktif dengan validasi *client-side* dan umpan balik status pengiriman yang informatif.
  - Navigasi responsif (*Mobile Drawer Navigation*) yang ramah layar sentuh dan aksesibilitas keyboard (*Esc* key & *focus-visible*).

---

## Struktur Berkas

```
porti/
├── index.html            # Struktur semantik HTML5, meta tag SEO & OpenGraph, aksesibilitas ARIA
├── images/               # Aset visual: foto profil dan mockup thumbnail proyek
├── pdf/                  # Dokumen: Curriculum Vitae (CV) dan dokumen terkait
├── css/
│   ├── variables.css     # Sistem token desain: palet warna, tipografi, radius, dan spasi
│   └── style.css         # Styling komponen, layout CSS Grid & Flexbox, dan media queries responsif
├── js/
│   └── main.js           # Logika interaktif: toggle tema, scroll-spy, filter galeri, formulir kontak
└── README.md             # Panduan kustomisasi dan penggunaan
```

---

## Cara Menjalankan Secara Lokal

Website ini bersifat statis tanpa build step yang rumit:

1. **Menggunakan Live Server / Python**:
   - Jika Anda memiliki Python terpasang, jalankan perintah berikut pada terminal:
     ```bash
     python -m http.server 3000
     ```
   - Lalu buka peramban di `http://localhost:3000`.

2. **Membuka Berkas Secara Langsung**:
   - Anda juga dapat langsung mengklik dua kali berkas `index.html` untuk membukanya di browser (Chrome, Edge, Firefox, Safari).

---

## Panduan Kustomisasi Konten Pribadi

Untuk mengganti data menjadi data asli Anda:

1. **Nama & Profesi**:
   - Buka `index.html`, cari teks `Abdullah Falich` dan `Full Stack Developer`.
   - Ubah sesuai dengan nama dan keahlian Anda jika ingin disesuaikan lebih lanjut.

2. **Alamat Surel / Email**:
   - Di `index.html`, cari elemen dengan ID `email-address` (`abdullahfalichits@gmail.com`) dan sesuaikan dengan surel Anda.
   - Di `js/main.js`, pastikan fallback email pada fungsi penyalinan email juga disesuaikan jika diperlukan.

3. **Tautan Sosial Media**:
   - Pada bagian `#contact`, sesuaikan tautan `href` pada tombol GitHub, LinkedIn, X (Twitter), dan Figma dengan URL profil Anda.

4. **Karya & Proyek**:
   - Setiap kartu proyek berada di dalam elemen `<article class="project-card" data-category="...">`.
   - Anda dapat mengubah judul, deskripsi, teknologi (`<span class="tag-pill">`), serta tautan demo dan repositori GitHub.

5. **Pengalaman & Pendidikan**:
   - Pada seksi `#experience`, ubah nama institusi, posisi, tahun, dan capaian kerja sesuai perjalanan karier Anda.

---

## Lisensi & Standar
Dirancang dengan mematuhi prinsip aksesibilitas web **WCAG 2.1 Level AA** dan performa rendering instan tanpa *render-blocking third party scripts*. Bebas digunakan dan dimodifikasi untuk portofolio profesional pribadi Anda.
