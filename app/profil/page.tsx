import type { Metadata } from 'next';
import { site } from '@/data/site';
import { pejabatInti, lingkungan } from '@/data/pemerintahan';
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
              {/* Visi sebagai kutipan */}
              <blockquote className="rounded-2xl border-l-4 border-[#1B4332] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-2">
                  Visi
                </p>
                <p className="text-[#1C1C18] text-base sm:text-lg italic font-medium leading-relaxed">
                  &ldquo;{site.visiMisiKelurahan.visi}&rdquo;
                </p>
              </blockquote>

              {/* Misi sebagai daftar 5 item */}
              <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-4">
                  Misi
                </p>
                <ol className="space-y-4">
                  {site.visiMisiKelurahan.misi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-xs font-bold text-white mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-[#1B4332] text-sm sm:text-base">
                          {item.judul}
                        </p>
                        <p className="mt-1 text-[#414844] text-sm leading-relaxed">
                          {item.deskripsi}
                        </p>
                      </div>
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

      {/* ── 3. Narasi Lurah ────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[2])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Narasi Lurah</SectionTitle>
          {site.narasiLurah ? (
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1B4332] leading-snug">
                  {site.narasiLurah.judul}
                </h3>
                <p className="mt-1 text-sm italic font-medium text-[#BC6C25]">
                  &ldquo;{site.narasiLurah.tagline}&rdquo;
                </p>
              </div>
              <div className="space-y-3 pt-1 text-sm sm:text-base text-[#1C1C18] leading-relaxed">
                {site.narasiLurah.paragraf.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="pt-4 border-t border-[#C1C8C2]">
                <p className="font-bold text-[#1B4332] text-base">{site.narasiLurah.nama}</p>
                <p className="text-xs sm:text-sm text-[#414844]">{site.narasiLurah.jabatan}</p>
              </div>
            </div>
          ) : (
            <p className="text-[#414844] italic text-sm sm:text-base">
              Narasi Lurah akan segera ditambahkan.
            </p>
          )}
        </div>
      </section>

      {/* ── 4. Struktur Pemerintahan ───────────────────────────────────── */}
      <section className={`${sectionClass(bgs[3])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <SectionTitle>Struktur Pemerintahan</SectionTitle>
            <p className="text-sm text-[#414844]">
              Aparatur dan perangkat yang melayani masyarakat {site.nama}.
            </p>
          </div>

          {/* Bagian Pejabat Kelurahan */}
          <div>
            <h3 className="text-lg font-bold text-[#1B4332] mb-4">
              Pejabat Kelurahan
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pejabatInti.map((p) => (
                <PerangkatCard
                  key={p.nama}
                  pejabat={p}
                  isLurah={p.jabatan.toLowerCase().includes('lurah')}
                />
              ))}
            </div>
          </div>

          {/* Bagian Kepala Lingkungan */}
          <div>
            <h3 className="text-lg font-bold text-[#1B4332] mb-4">
              Kepala Lingkungan
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {lingkungan.map((l) => (
                <div
                  key={l.nama}
                  className="rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm"
                >
                  <h4 className="font-bold text-[#1B4332] text-base mb-2">
                    {l.nama}
                  </h4>
                  <div className="space-y-1 text-sm text-[#414844]">
                    <p>
                      <span className="font-medium text-[#1C1C18]">Kepala:</span>{' '}
                      {l.kepala}
                    </p>
                    <p>
                      <span className="font-medium text-[#1C1C18]">Wakil:</span>{' '}
                      {l.wakil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Peta Wilayah ────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[4])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Peta Wilayah</SectionTitle>

          {/* Placeholder gambar peta */}
          <div className="rounded-2xl overflow-hidden border border-[#C1C8C2] shadow-sm">
            <div className="relative w-full aspect-video bg-[#C1C8C2] flex flex-col items-center justify-center gap-3">
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

          <p className="mt-3 text-xs text-[#414844] text-center sm:text-sm">
            Peta wilayah {site.nama} akan ditampilkan di sini setelah gambar
            dari kantor kelurahan tersedia.
          </p>
        </div>
      </section>
    </main>
  );
}
