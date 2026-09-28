import Link from 'next/link';
import { site } from '@/data/site';

const stats = [
  {
    label: 'Tahun Berdiri',
    value: site.tahunBerdiri !== null ? String(site.tahunBerdiri) : '—',
  },
  {
    label: 'Luas Wilayah',
    value: site.luasWilayah ?? '—',
  },
  {
    label: 'Mayoritas Mata Pencaharian',
    value: site.mataPencaharian ?? '—',
  },
];

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
  const sambutan =
    site.sambutanLurah ?? 'Sambutan Lurah akan segera ditambahkan.';

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1B4332] px-4 py-20 text-center text-white sm:px-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#a5d0b9]">
          Kecamatan Tomohon Timur · Kota Tomohon
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Mengenal Lebih Dekat Kelurahan Kumelembuay
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[#c1ecd4]">
          Profil dan potensi wisata Kelurahan Kumelembuay — dari lereng Gunung
          Mahawu untuk warga dan pengunjung.
        </p>
        <Link
          href="/profil"
          className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1B4332] transition hover:bg-[#D4A373] hover:text-white"
        >
          Lihat Profil Kelurahan
        </Link>
      </section>

      {/* Statistik ringkas */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[#c1c8c2] bg-white p-5 text-center shadow-sm"
          >
            <p className="text-2xl font-extrabold text-[#1B4332]">{s.value}</p>
            <p className="mt-1 text-xs text-[#414844]">{s.label}</p>
          </div>
        ))}
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
            <p className="mt-2 text-sm text-[#414844]">{sambutan}</p>
            {site.sambutanLurah !== null && (
              <p className="mt-3 text-sm font-semibold text-[#1B4332]">
                — Lurah Kumelembuay
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
