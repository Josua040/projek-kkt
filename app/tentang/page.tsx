import type { Metadata } from 'next';
import Image from 'next/image';
import { site } from '@/data/site';
import { timKKT } from '@/data/tim-kkt';

export const metadata: Metadata = {
  title: `Tentang Kami — ${site.nama}`,
  description: `Tentang website profil ${site.nama} yang dibuat sebagai program kerja KKT Unsrat beserta Tim KKT Unsrat.`,
};

export default function TentangPage() {
  const hasTimData = Boolean(
    timKKT.periode || timKKT.fotoTim || timKKT.anggota.length > 0
  );

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

      {/* ── Section Tim KKT Unsrat ─────────────────────────────────────── */}
      <section className="bg-[#F3EFE6] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#1B4332]">
              Tim KKT Unsrat
            </h2>
            {timKKT.instagram && (
              <a
                href={timKKT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Tim KKT"
                className="inline-flex items-center gap-2 rounded-full border border-[#1B4332] bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#1B4332] transition hover:bg-[#1B4332] hover:text-white self-start sm:self-auto shadow-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Ikuti di Instagram</span>
              </a>
            )}
          </div>

          {!hasTimData ? (
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-sm">
              <p className="text-[#414844] italic text-sm sm:text-base">
                Data tim KKT akan segera ditambahkan.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Periode */}
              {timKKT.periode && (
                <div className="rounded-2xl border border-[#C1C8C2] bg-white px-5 py-4 shadow-sm inline-block">
                  <p className="text-sm text-[#414844]">
                    <span className="font-semibold text-[#1B4332]">Periode:</span>{' '}
                    {timKKT.periode}
                  </p>
                </div>
              )}

              {/* Foto tim */}
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-[#C1C8C2] border border-[#C1C8C2]">
                {timKKT.fotoTim ? (
                  <Image
                    src={timKKT.fotoTim}
                    alt="Foto tim KKT Unsrat di Kelurahan Kumelembuay"
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-[#8a9490]"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-sm text-[#8a9490]">Foto tim menyusul</p>
                  </div>
                )}
              </div>

              {/* Daftar anggota */}
              {timKKT.anggota.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-bold text-[#1B4332]">
                    Anggota Tim
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {timKKT.anggota.map((a, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#C1C8C2] bg-white p-4 shadow-sm"
                      >
                        <p className="font-semibold text-sm text-[#1C1C18]">
                          {a.nama}
                        </p>
                        <p className="mt-0.5 text-xs text-[#414844]">{a.prodi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
