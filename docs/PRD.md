# PRD — Website Profil Kelurahan Kumelembuay

Aturan tetap dan batasan ada di `CONTEXT.md`. Tampilan dan komponen ada di `DESIGN.md`.

## 1. Ringkasan
- **Nama:** Website Profil Kelurahan Kumelembuay
- **Lokasi:** Kelurahan Kumelembuay, Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara
- **Jenis:** website informasi statis (profil), bukan sistem manajemen
- **Pengguna:** warga, pengunjung/wisatawan, pihak kampus dan pemerintah kota
- **Perangkat utama:** HP (mobile-first), tetap nyaman di desktop
- **Timeline:** KKT 23 hari; per 28 Sep 2026 sisa sekitar 17 hari (perkiraan)
- **Developer:** satu orang

## 2. Di luar scope (jangan dibuat)
Login/admin, CMS, database, layanan surat, APBDes/anggaran, formulir kontak/pengaduan, halaman Data Penduduk, halaman Galeri, berita/blog, multi-bahasa.
Data Penduduk dan Galeri sudah **diputuskan dicoret**; boleh ditambah nanti hanya jika developer meminta.

## 3. Navigasi
Beranda · Profil Kelurahan · Potensi Wisata · Kontak

| Menu | Route |
|---|---|
| Beranda | `/` |
| Profil Kelurahan | `/profil` |
| Potensi Wisata | `/potensi` |
| Kontak | `/kontak` |

Di HP, menu berupa **hamburger** (lihat `DESIGN.md`).

## 4. Halaman dan konten

### 4.1 Beranda `/`
- Hero: nama kelurahan, lokasi (kecamatan dan kota), satu kalimat pengantar, tombol ke Profil.
- Statistik ringkas (3 kartu): **tahun berdiri**, **luas wilayah**, **mayoritas mata pencaharian**.
- Sambutan Lurah (singkat) dengan slot foto Lurah.
- Kartu jelajah ke: Profil Kelurahan, Potensi Wisata, Kontak.

### 4.2 Profil Kelurahan `/profil`
Urutan section:
1. **Asal usul / sejarah** kelurahan (teks panjang, boleh ada foto).
2. **Visi dan misi kelurahan.**
3. **Narasi / visi misi Lurah.**
4. **Struktur pemerintahan kelurahan** (Lurah, Sekretaris, dst.; foto + nama + jabatan). Datanya masih ditanyakan ke Lurah oleh tim KKT, jadi buat komponen kartu/bagan yang fleksibel terhadap jumlah orang.
5. **Peta wilayah**: berupa **gambar** (peta cetak/scan dari kantor kelurahan) dengan keterangan.

### 4.3 Potensi Wisata `/potensi`
- Hanya **wisata**, saat ini **4 tempat**. Nama dan foto menyusul.
- Tampilan: grid kartu berbasis gambar (gaya masonry) seperti referensi desain.
- **Interaksi:** klik kartu membuka **popup (modal)** berisi gambar besar, nama wisata, dan penjelasan singkat (+ lokasi bila ada).
- Kategori yang kosong disembunyikan; jumlah kartu mengikuti data (tidak dipatok 4).

### 4.4 Kontak `/kontak`
- Info: **jalan, alamat lengkap, nomor telepon, email** kantor kelurahan.
- **Peta Leaflet** dengan satu marker di lokasi kantor/kelurahan (tanpa polygon batas wilayah).
- Section **Tim KKT Unsrat**: foto tim, nama, program studi, periode KKT. *(Penempatan di Kontak adalah usulan; ubah bila developer memutuskan lain.)*
- Tanpa formulir; hanya informasi kontak.

### 4.5 Elemen global
- **Navbar** (sticky) dan **Footer** (nama kelurahan, alamat singkat, navigasi, kredit "dibuat untuk program KKT Unsrat").

## 5. Model data (usulan)
Semua konten di folder `data/`, sehingga mengisi data cukup mengedit file, bukan komponen.

```ts
// data/site.ts
export const site = {
  nama: "Kelurahan Kumelembuay",
  kecamatan: "Tomohon Timur",
  kota: "Kota Tomohon",
  provinsi: "Sulawesi Utara",
  tahunBerdiri: null as number | null,      // TODO
  luasWilayah: null as string | null,       // TODO, mis. "xx Ha"
  mataPencaharian: null as string | null,   // TODO
  sambutanLurah: null as string | null,     // TODO
  visiMisiKelurahan: null as { visi: string; misi: string[] } | null,
  visiMisiLurah: null as string | null,
  sejarah: null as string | null,
  kontak: { jalan: null, alamat: null, telepon: null, email: null },
  koordinat: [1.3306, 124.8722] as [number, number], // perkiraan; TODO ganti presisi
};

// data/wisata.ts
export type Wisata = {
  id: string;
  nama: string;
  kategori: string;            // mis. "Wisata Alam"
  foto: string;                // path di /public/images/wisata/
  deskripsiSingkat: string;    // teks di kartu
  deskripsiLengkap?: string;   // teks di popup
  lokasi?: string;
};

// data/pemerintahan.ts
export type Perangkat = { nama: string; jabatan: string; foto?: string };

// data/tim-kkt.ts
export type AnggotaKKT = { nama: string; prodi: string };
export type TimKKT = {
  periode: string | null;   // mis. "Agustus – September 2026"
  fotoTim: string | null;   // path di /public/images/tim-kkt/
  anggota: AnggotaKKT[];    // daftar nama + program studi
};
```
Nilai `null` berarti data belum ada → komponen menampilkan placeholder, bukan error.

## 6. Kebutuhan non-fungsional
- **Responsif:** dites di lebar 375px, 768px, dan 1280px.
- **Performa:** gambar lewat `next/image`, dikompres sebelum dimasukkan ke `/public/images/`.
- **Aksesibilitas dasar:** `alt` pada semua gambar, kontras teks memadai, area sentuh ≥ 44px, modal bisa ditutup dengan tombol Esc dan klik latar.
- **SEO dasar:** `metadata` (judul dan deskripsi) per halaman.
- **Deploy:** Vercel; deploy awal secepatnya agar bisa dites di HP sungguhan.

## 7. Status per 28 Sep 2026

### Selesai (langkah 1–6)
- ✅ Fondasi: Navbar mobile (hamburger), Footer, `globals.css` krem terang.
- ✅ Folder `data/` dengan placeholder (`site.ts`, `wisata.ts`, `pemerintahan.ts`, `tim-kkt.ts`); Beranda memakai data tersebut.
- ✅ Deploy awal ke Vercel.
- ✅ Halaman Profil (`/profil`): sejarah, visi-misi, narasi Lurah, struktur pemerintahan, peta wilayah placeholder.
- ✅ Halaman Potensi (`/potensi`): grid bento/mozaik, modal aksesibel, 4 placeholder wisata.
- ✅ Halaman Kontak (`/kontak`): info kontak, peta Leaflet (dragging HP dimatikan), tombol Google Maps, section Tim KKT.
- ✅ `VillageMap.jsx` dikonversi ke `VillageMap.tsx`; `MapWrapper.tsx` menangani `dynamic + ssr:false`.
- ✅ Route percobaan `/peta` dihapus.

### Menunggu data asli (langkah 7)
Tahun berdiri · luas wilayah · mata pencaharian · sejarah · visi-misi kelurahan · narasi Lurah · struktur pemerintahan · nama/foto/deskripsi 4 wisata · gambar peta wilayah · alamat/telepon/email · foto tim KKT + nama/prodi anggota · koordinat presisi.

## 8. Urutan pengerjaan
1. Fondasi: perbaiki Navbar (mobile), Footer, `globals.css`.
2. Buat folder `data/` dengan placeholder; rapikan Beranda memakai data itu.
3. Deploy awal ke Vercel; tes di HP.
4. Halaman Profil (semua section, dengan placeholder).
5. Halaman Potensi (kartu masonry + modal).
6. Halaman Kontak (info, Leaflet, Tim KKT).
7. Isi data dan foto asli saat sudah diterima; cek ulang di HP.

## 9. Data yang masih ditunggu
Tahun berdiri · luas wilayah · mata pencaharian mayoritas · sejarah · visi-misi kelurahan · visi-misi/sambutan Lurah + foto Lurah · struktur pemerintahan (dari Lurah, via tim KKT) · nama, foto, dan deskripsi 4 wisata · gambar peta wilayah · alamat, telepon, email · foto tim KKT · koordinat presisi.
