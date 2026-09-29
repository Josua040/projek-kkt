import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';


const highlights = [
  {
    href: '/profil',
    title: 'Profil Kelurahan',
    desc: 'Sejarah, visi-misi, dan struktur pemerintahan Kelurahan Kumelembuay.',
  },
  {
    href: '/potensi',
    title: 'Potensi Wisata',
    desc: 'Tempat-tempat wisata unggulan di Kelurahan Kumelembuay.',
  },
  {
    href: '/kontak',
    title: 'Kontak',
    desc: 'Alamat, nomor telepon, dan lokasi Kantor Kelurahan Kumelembuay.',
  },
];

export default function BerandaPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#1B4332] text-white
          min-h-[420px] flex items-center
          px-4 py-20 sm:px-6 sm:min-h-[520px]"
      >
        {/* Foto latar */}
        <Image
          src="/images/profil/hero.jpg"
          alt="Foto pemandangan Kelurahan Kumelembuay"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Lapis 1: gelap merata ringan di seluruh hero */}
        <div className="absolute inset-0 bg-[#1B4332]/25" />
        {/* Lapis 2: gradien dari kiri (gelap) ke kanan (transparan) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(27,67,50,0.97) 0%, rgba(27,67,50,0.85) 35%, rgba(27,67,50,0.40) 65%, transparent 100%)',
          }}
        />

        {/* Konten teks — rata kiri, di atas overlay */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="max-w-xl text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#a5d0b9]">
              Kecamatan Tomohon Timur · Kota Tomohon
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Mengenal Lebih Dekat Kelurahan Kumelembuay
            </h1>
            <p className="mt-4 text-[#c1ecd4]">
              Profil dan potensi wisata Kelurahan Kumelembuay dari lereng Gunung
              Mahawu untuk warga dan pengunjung.
            </p>
            <Link
              href="/profil"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1B4332] transition hover:bg-[#D4A373] hover:text-white"
            >
              Lihat Profil Kelurahan
            </Link>
          </div>
        </div>
      </section>

      {/* Statistik ringkas — 4 kartu (grid-cols-2 sm:grid-cols-4) */}
      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6">
        {/* 1. Tahun Berdiri */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#c1c8c2] bg-white p-5 text-center shadow-sm">
          <p className="text-sm sm:text-base font-extrabold text-[#1B4332] leading-tight">
            {site.tahunDesa} · Kelurahan sejak {site.tahunKelurahan}
          </p>
          <p className="mt-2 text-xs text-[#414844]">Tahun Berdiri</p>
        </div>

        {/* 2. Luas Wilayah */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#c1c8c2] bg-white p-5 text-center shadow-sm">
          <p className="text-xl sm:text-2xl font-extrabold text-[#1B4332] leading-tight">
            {site.luasWilayah}
          </p>
          <p className="mt-2 text-xs text-[#414844]">Luas Wilayah</p>
        </div>

        {/* 3. Mayoritas Mata Pencaharian */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#c1c8c2] bg-white p-5 text-center shadow-sm">
          <p className="text-xs sm:text-sm font-bold text-[#1B4332] leading-snug">
            {site.mataPencaharian}
          </p>
          <p className="mt-2 text-xs text-[#414844]">Mayoritas Mata Pencaharian</p>
        </div>

        {/* 4. Jumlah Penduduk */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#c1c8c2] bg-white p-5 text-center shadow-sm">
          <p className="text-xl sm:text-2xl font-extrabold text-[#1B4332] leading-tight">
            {site.dataPenduduk.jumlahJiwa}
          </p>
          <p className="mt-1 text-xs font-semibold text-[#1B4332]">Jumlah Penduduk</p>
          <p className="mt-1 text-[11px] leading-tight text-[#414844]">
            {site.dataPenduduk.jumlahKK} KK · L {site.dataPenduduk.lakiLaki}, P {site.dataPenduduk.perempuan}
          </p>
        </div>
      </section>

      {/* Kartu jelajah */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-[#1B4332]">
          Jelajahi Kumelembuay
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="rounded-2xl border border-[#c1c8c2] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold text-[#1B4332]">
                {h.title}
              </h3>
              <p className="text-sm text-[#414844]">{h.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sambutan Lurah */}
      <section className="bg-[#F3EFE6] px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          {/* TODO: ganti div di bawah dengan foto Lurah menggunakan next/image */}
          <div className="h-28 w-28 shrink-0 rounded-full bg-[#c1c8c2]" />
          <div>
            <h3 className="text-lg font-bold text-[#1B4332]">Sambutan Lurah</h3>
            <p className="mt-2 text-sm text-[#414844] leading-relaxed">{site.sambutanLurah}</p>
            {site.narasiLurah?.nama && (
              <p className="mt-3 text-sm font-semibold text-[#1B4332]">
                — {site.narasiLurah.nama}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
