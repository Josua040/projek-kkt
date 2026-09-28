# CONTEXT.md — Aturan Tetap Proyek

> **Untuk AI/model:** baca file ini, `PRD.md`, dan `DESIGN.md` sebelum mengerjakan apa pun.
> Jika sebuah permintaan bertentangan dengan aturan di bawah, **tanyakan dulu**, jangan langsung dikerjakan.

## 1. Apa proyek ini
Website **profil** Kelurahan Kumelembuay, Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara.
Dibuat sebagai proker **KKT (Kuliah Kerja Terpadu) Unsrat** oleh satu developer (mahasiswa Teknik Informatika).
Tujuannya menampilkan profil kelurahan, potensi wisata, dan kontak, lalu diserahkan ke pihak kelurahan.

## 2. Aturan yang tidak boleh dilanggar
1. **Hanya website profil (informasi statis).** BUKAN sistem manajemen kelurahan. Jangan menambahkan: login, admin panel, CMS, database, layanan surat/administrasi, transparansi APBDes, formulir pengaduan, atau fitur transaksi.
2. **Ini KELURAHAN, bukan desa.** Pakai istilah: Kelurahan, Lurah, Perangkat Kelurahan, Lingkungan. Hindari: Kepala Desa, Perangkat Desa, Dusun.
3. **Jangan mengarang data.** Sejarah, angka, nama pejabat, nama wisata, alamat, nomor telepon, dan email BELUM ada. Semua data yang belum ada diisi placeholder (`—` atau teks "Data menyusul") dan diberi komentar `// TODO: data dari kantor kelurahan`. Jangan pernah membuat isi karangan yang tampak seperti fakta.
4. **Mobile-first.** Website akan dibuka terutama lewat HP. Setiap komponen dirancang untuk layar ±375px dulu, lalu diperlebar ke tablet/desktop.
5. **Sederhana dan cepat selesai.** Waktu terbatas (KKT 23 hari, satu developer). Pilih solusi paling sederhana; jangan menambah library atau fitur di luar `PRD.md` tanpa persetujuan.
6. **Semua teks tampilan berbahasa Indonesia.**

## 3. Tech stack (sudah diputuskan)
- Next.js (App Router, versi 16), TypeScript, Tailwind CSS v4 (konfigurasi lewat `app/globals.css`).
- Hosting: **Vercel** (deploy dari repo GitHub).
- Peta: **Leaflet + react-leaflet + OpenStreetMap** (gratis, tanpa API key).
- Konten disimpan sebagai **file data statis** di folder `data/` (bukan database).
- File baru ditulis sebagai `.tsx`/`.ts`. Beberapa file awal masih `.jsx` (`Navbar`, `Footer`, `VillageMap`, `page`); boleh dikonversi ke `.tsx` saat disentuh.

## 4. Jebakan teknis yang sudah pernah terjadi
- **Leaflet butuh `window`.** Komponen peta harus dimuat dengan `next/dynamic` dan `ssr: false`, dan pemanggilan `dynamic(..., { ssr: false })` itu harus berada di file yang memakai `'use client'`. Kalau tidak, muncul error "`ssr: false` is not allowed with `next/dynamic` in Server Components".
- **Ikon marker default Leaflet sering rusak di Next.js.** Pakai `L.divIcon` dengan SVG inline (sudah dilakukan di `VillageMap`).
- **Pembungkus peta Leaflet wajib `isolate`.** Tambahkan kelas `isolate` (atau `isolation: isolate`) pada div pembungkus paling luar komponen peta. Tanpanya, z-index internal Leaflet (tile layer, marker, popup) bisa bocor keluar stacking context dan menutupi elemen seperti navbar sticky.
- Setelah menambah file/class Tailwind baru dan styling tidak muncul: hentikan dev server, hapus folder `.next`, jalankan ulang `npm run dev`.
- Jangan ada dua file halaman di lokasi yang sama (mis. `page.tsx` dan `page.jsx` di `app/`).

## 5. Cara bekerja dengan developer
- Developer memberi instruksi singkat dan langsung; jawab ringkas, langsung ke kode/solusi.
- Untuk perubahan kode, sebutkan **file mana** yang diubah dan **di bagian mana** (developer bukan selalu tahu letak persisnya).
- Jika ada asumsi (mis. data yang belum ada), tulis asumsinya dalam satu kalimat, lalu kerjakan.
