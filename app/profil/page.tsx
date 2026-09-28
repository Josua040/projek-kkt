import type { Metadata } from 'next';
import { site } from '@/data/site';
import { perangkat } from '@/data/pemerintahan';
import PerangkatCard from '@/components/PerangkatCard';

export const metadata: Metadata = {
  title: `Profil Kelurahan — ${site.nama}`,
  description: `Sejarah, visi misi, struktur pemerintahan, dan peta wilayah ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

// ---------------------------------------------------------------------------
// Tipe bantu untuk section berselang-seling
// ---------------------------------------------------------------------------
type SectionBg = 'cream-light' | 'cream-dark';

function sectionClass(bg: SectionBg): string {
  return bg === 'cream-light'
    ? 'bg-[#FAF7F2]'
    : 'bg-[#F3EFE6]';
}

// ---------------------------------------------------------------------------
// Sub-komponen: judul section
// ---------------------------------------------------------------------------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-[#1B4332] mb-4 leading-snug">
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// Halaman utama
// ---------------------------------------------------------------------------
export default function ProfilPage() {
  const bgs: SectionBg[] = [
    'cream-light',
    'cream-dark',
    'cream-light',
    'cream-dark',
    'cream-light',
  ];

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Profil Kelurahan
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {site.nama} · {site.kecamatan} · {site.kota}
          </p>
        </div>
      </div>

      {/* ── 1. Sejarah ─────────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[0])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Asal Usul &amp; Sejarah</SectionTitle>
          {site.sejarah ? (
            <p className="text-[#1C1C18] leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {site.sejarah}
            </p>
          ) : (
            <p className="text-[#414844] italic text-sm sm:text-base">
              Sejarah kelurahan akan segera ditambahkan.
            </p>
          )}
        </div>
      </section>

      {/* ── 2. Visi dan Misi Kelurahan ─────────────────────────────────── */}
      <section className={`${sectionClass(bgs[1])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Visi dan Misi Kelurahan</SectionTitle>
          {site.visiMisiKelurahan ? (
            <div className="space-y-6">
              {/* Visi */}
              <div className="rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-2">
                  Visi
                </p>
                <p className="text-[#1C1C18] font-medium leading-relaxed text-sm sm:text-base">
                  {site.visiMisiKelurahan.visi}
                </p>
              </div>
              {/* Misi */}
              <div className="rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-3">
                  Misi
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  {site.visiMisiKelurahan.misi.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#1C1C18] leading-relaxed text-sm sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <p className="text-[#414844] italic text-sm sm:text-base">
              Visi dan misi kelurahan akan segera ditambahkan.
            </p>
          )}
        </div>
      </section>

      {/* ── 3. Visi Misi / Narasi Lurah ────────────────────────────────── */}
      <section className={`${sectionClass(bgs[2])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Narasi &amp; Visi Misi Lurah</SectionTitle>
          {site.visiMisiLurah ? (
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm">
              <p className="text-[#1C1C18] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {site.visiMisiLurah}
              </p>
            </div>
          ) : (
            <p className="text-[#414844] italic text-sm sm:text-base">
              Narasi dan visi misi Lurah akan segera ditambahkan.
            </p>
          )}
        </div>
      </section>

      {/* ── 4. Struktur Pemerintahan ───────────────────────────────────── */}
      <section className={`${sectionClass(bgs[3])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Struktur Pemerintahan</SectionTitle>

          {perangkat.length === 0 ? (
            <p className="text-[#414844] italic text-sm sm:text-base">
              Struktur pemerintahan akan segera ditambahkan.
            </p>
          ) : (
            <div className="space-y-6">
              {/* Lurah — baris sendiri, di-tengah */}
              {perangkat
                .filter((p) => p.jabatan.toLowerCase().includes('lurah'))
                .map((p) => (
                  <div key={p.nama} className="flex justify-center">
                    <div className="w-full max-w-xs">
                      <PerangkatCard perangkat={p} isLurah />
                    </div>
                  </div>
                ))}

              {/* Pemisah visual (hanya tampil jika ada Lurah DAN perangkat lain) */}
              {perangkat.some((p) => p.jabatan.toLowerCase().includes('lurah')) &&
                perangkat.some((p) => !p.jabatan.toLowerCase().includes('lurah')) && (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-[#C1C8C2]" />
                    <span className="text-xs text-[#414844]">Perangkat Kelurahan</span>
                    <div className="flex-1 border-t border-[#C1C8C2]" />
                  </div>
                )}

              {/* Perangkat lain — grid responsif */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {perangkat
                  .filter((p) => !p.jabatan.toLowerCase().includes('lurah'))
                  .map((p) => (
                    <PerangkatCard key={p.nama} perangkat={p} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. Peta Wilayah ────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[4])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Peta Wilayah</SectionTitle>

          {/* Placeholder gambar peta — nanti diganti next/image */}
          <div className="rounded-2xl overflow-hidden border border-[#C1C8C2] shadow-sm">
            <div className="relative w-full aspect-video bg-[#C1C8C2] flex flex-col items-center justify-center gap-3">
              {/* Ikon peta sederhana */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-[#8a9490]"
                aria-hidden="true"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              <p className="text-[#414844] text-sm font-medium">
                Peta wilayah menyusul
              </p>
            </div>
          </div>

          {/* Keterangan di bawah peta */}
          <p className="mt-3 text-xs text-[#414844] text-center sm:text-sm">
            Peta wilayah {site.nama} akan ditampilkan di sini setelah gambar
            dari kantor kelurahan tersedia.
          </p>
        </div>
      </section>
    </main>
  );
}
