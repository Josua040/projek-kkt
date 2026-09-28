import type { Metadata } from 'next';
import { site } from '@/data/site';
import { wisata } from '@/data/wisata';
import WisataGrid from '@/components/WisataGrid';

export const metadata: Metadata = {
  title: `Potensi Wisata — ${site.nama}`,
  description: `Jelajahi potensi wisata di ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

export default function PotensiPage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Potensi Wisata
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {site.nama} · {site.kecamatan} · {site.kota}
          </p>
        </div>
      </div>

      {/* ── Pengantar + Grid ───────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[#414844] text-sm sm:text-base mb-8 max-w-2xl">
            Kelurahan Kumelembuay menyimpan berbagai potensi wisata alam yang
            menakjubkan. Klik kartu wisata untuk melihat informasi lebih
            lengkap.
          </p>

          <WisataGrid items={wisata} />
        </div>
      </section>
    </main>
  );
}
