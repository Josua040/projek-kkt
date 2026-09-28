# DESIGN.md — Panduan Tampilan

Konteks dan aturan ada di `CONTEXT.md`; isi halaman ada di `PRD.md`.
Referensi visual awal berasal dari desain Google Stitch (hanya **referensi**, bukan patokan mutlak). Komponen di referensi yang bersifat layanan/administrasi **tidak dipakai**.

## 1. Karakter
Natural / earthy, hangat, ramah, tepercaya. Bukan tampilan pemerintahan yang kaku dan bukan biru korporat. Banyak ruang kosong, sudut membulat, bayangan lembut, foto alam sebagai daya tarik utama.

## 2. Warna
| Token | Hex | Pemakaian |
|---|---|---|
| Hijau tua (utama) | `#1B4332` | navbar, hero, judul, tombol utama |
| Hijau sangat tua | `#012d1d` | footer |
| Terracotta | `#BC6C25` | aksen, badge, ikon marker peta |
| Pasir | `#D4A373` | hover, aksen lembut |
| Krem (latar halaman) | `#FAF7F2` | `background` |
| Krem section | `#F3EFE6` | section berselang-seling (mis. sambutan Lurah) |
| Teks utama | `#1C1C18` | `foreground` |
| Teks sekunder | `#414844` | deskripsi |
| Garis/border | `#C1C8C2` | border kartu |
| Hijau muda teks | `#A5D0B9`, `#C1ECD4` | teks kecil di atas latar hijau tua |

Latar situs **selalu terang (krem)**; jangan memakai mode gelap otomatis.
Kontras: teks di atas hijau tua harus putih/hijau muda; jangan hijau tua di atas latar gelap.

## 3. Tipografi
- Saat ini: **Geist** (bawaan `create-next-app`).
- Opsional: **Plus Jakarta Sans** (dipakai di referensi Stitch) lewat `next/font/google`. Belum diterapkan; ganti hanya jika diminta.
- Judul halaman `text-3xl`–`text-5xl` (font-extrabold), judul section `text-2xl` (bold), isi `text-sm`/`text-base`. Ukuran besar dimulai dari HP dengan skala turun (mis. `text-3xl sm:text-5xl`).

## 4. Aturan mobile-first
- Tulis kelas dasar untuk HP, tambahkan `sm:`/`md:`/`lg:` untuk layar lebih besar.
- Uji di 375px; tidak boleh ada scroll horizontal di `body`.
- Padding halaman: `px-4` di HP, `sm:px-6` di layar lebih besar; konten dibatasi `max-w-5xl`/`max-w-6xl` dan di-tengah.
- Area sentuh tombol/link minimal 44px.
- Grid: 1 kolom di HP, 2 kolom di `sm`, 3–4 kolom di `md`/`lg` sesuai konten.

## 5. Komponen

### Navbar
- Sticky di atas, latar hijau tua, teks putih; hover `#D4A373`.
- **Desktop (`md` ke atas):** nama kelurahan di kiri, menu di kanan.
- **HP:** nama kelurahan + **tombol hamburger**; menu terbuka sebagai panel di bawah navbar, link tersusun vertikal, menutup saat link dipilih. Perlu `'use client'` dan state buka/tutup. Tombol diberi `aria-label`, `aria-expanded`.
- Menu: Beranda, Profil Kelurahan, Potensi Wisata, Kontak. Tandai halaman aktif.

### Footer
Latar hijau sangat tua; 3 kolom di desktop, menumpuk di HP: identitas + lokasi, navigasi, kontak. Baris hak cipta di bawah.

### Kartu statistik (Beranda)
Kartu putih, `rounded-2xl`, border `#C1C8C2`, angka besar hijau tua, label kecil. 3 kartu (tahun berdiri, luas wilayah, mata pencaharian); `grid-cols-1 sm:grid-cols-3`. Nilai kosong ditampilkan `—`.

### Kartu wisata (Potensi)
Mengikuti referensi: **kartu berbasis gambar** dalam grid masonry.
- Gambar memenuhi kartu, `rounded-2xl`, overlay gradasi gelap di bagian bawah agar teks terbaca.
- Badge kategori (pil kecil, terracotta atau hijau tua) di kiri atas.
- Nama wisata tebal di bagian bawah; satu-dua baris deskripsi singkat.
- Ikon kaca pembesar kecil di kanan atas sebagai petunjuk bisa diklik.
- Tinggi kartu boleh bervariasi (masonry). Implementasi sederhana: CSS columns (`columns-1 sm:columns-2 lg:columns-3`) dengan `break-inside-avoid`; tidak perlu library masonry.
- Hover: sedikit naik/berbayang. Seluruh kartu adalah `button` yang bisa difokus keyboard.

### Modal wisata (popup)
- Muncul saat kartu diklik: latar gelap transparan, panel putih/krem `rounded-2xl`.
- Isi: gambar besar, nama wisata, badge kategori, penjelasan singkat, lokasi (jika ada), tombol tutup (X).
- Ditutup dengan tombol X, klik latar, atau tombol Esc. Saat terbuka, scroll halaman di belakang dikunci.
- HP: panel hampir selebar layar (`mx-4`), tingginya maksimal `max-h-[90vh]` dengan isi bisa di-scroll.
- Aksesibilitas: `role="dialog"`, `aria-modal="true"`, fokus berpindah ke modal saat dibuka.

### Struktur pemerintahan (Profil)
Bagan/kartu fleksibel: Lurah di paling atas, perangkat lain di bawahnya. Kartu: foto bulat, nama, jabatan. HP: kartu menumpuk vertikal; desktop: baris berdampingan. Foto kosong diganti lingkaran abu-abu.

### Peta
- **Kontak:** Leaflet + OpenStreetMap, satu marker terracotta (SVG) dengan popup nama kelurahan. Tinggi ±420px di desktop, ±300px di HP. `scrollWheelZoom` mati; uji agar geser di HP tidak mengunci scroll halaman.
- **Profil:** peta wilayah berupa **gambar** dengan keterangan, `rounded-2xl`, dapat diperbesar bila mudah dilakukan.
- Marker terracotta dan bingkai peta mengikuti gaya pada `components/VillageMap`.

### Tombol
Utama: pil (`rounded-full`), latar putih/hijau tua dengan hover `#D4A373`. Sekunder: outline hijau tua.

## 6. Gambar
- Simpan di `public/images/` (`wisata/`, `pemerintahan/`, `profil/`, `tim-kkt/`).
- Gunakan `next/image` dengan `alt` yang deskriptif; kompres dulu (target < 300 KB per foto).
- Selama foto belum ada, pakai blok warna netral (`#C1C8C2`) sebagai placeholder dengan proporsi yang sama, agar layout tidak berubah saat foto masuk.
