import type { Metadata } from 'next';
import { site } from '@/data/site';
import TimKktSection from '@/components/TimKktSection';

export const metadata: Metadata = {
  title: `Tentang Kami — ${site.nama}`,
  description: `Tentang website profil ${site.nama} yang dibuat sebagai program kerja KKT Unsrat beserta Tim KKT Unsrat.`,
};

export default function TentangPage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Tentang Kami
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            Program Kerja KKT Unsrat · {site.nama}
          </p>
        </div>
      </div>

      {/* ── Penjelasan Program KKT ─────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-3">
              Tentang Website Ini
            </h2>
            <p className="text-[#1C1C18] text-sm sm:text-base leading-relaxed">
              Website profil ini dikembangkan sebagai bagian dari program kerja Kuliah Kerja Terpadu (KKT) Universitas Sam Ratulangi (Unsrat) untuk Kelurahan Kumelembuay, Kecamatan Tomohon Timur, Kota Tomohon.
            </p>
            <p className="mt-3 text-[#414844] text-sm sm:text-base leading-relaxed">
              Website ini hadir untuk mempermudah akses informasi publik mengenai profil kelurahan, potensi ekowisata dan kearifan lokal, serta memfasilitasi komunikasi antara masyarakat, pihak kelurahan, dan para pengunjung.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section Struktur Tim KKT Unsrat ───────────────────────────── */}
      <section className="bg-[#F3EFE6] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <TimKktSection />
        </div>
      </section>
    </main>
  );
}
