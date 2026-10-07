'use client';

import Image from 'next/image';
import { pejabatInti, lingkungan } from '@/data/pemerintahan';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

// ---------------------------------------------------------------------------
// Helper: Avatar dengan fallback placeholder
// ---------------------------------------------------------------------------
function Avatar({
  foto,
  nama,
  size = 'md',
  ringColor = 'ring-[#C1C8C2]',
  fotoPosisi = 'center',
  fotoTransform,
}: {
  foto?: string;
  nama: string;
  size?: 'sm' | 'md' | 'lg';
  ringColor?: string;
  fotoPosisi?: string;
  fotoTransform?: string;
}) {
  const sizeClasses = {
    sm: 'h-16 w-16 sm:h-20 sm:w-20',
    md: 'h-20 w-20 sm:h-24 sm:w-24',
    lg: 'h-24 w-24 sm:h-28 sm:w-28',
  }[size];

  return (
    <div
      className={`relative ${sizeClasses} overflow-hidden rounded-full bg-[#FAF7F2] border-2 border-white ring-2 ${ringColor} shadow-xs flex-shrink-0 flex items-center justify-center`}
    >
      {foto ? (
        <Image
          src={foto}
          alt={`Foto ${nama}`}
          fill
          sizes="120px"
          className="object-cover"
          style={{
            objectPosition: fotoPosisi,
            transform: fotoTransform,
          }}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 sm:h-12 sm:w-12 text-[#8a9490]"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: Menentukan deskripsi tugas pejabat berdasarkan jabatan & bahasa
// ---------------------------------------------------------------------------
function getDeskripsiJabatan(jabatan: string, lang: 'id' | 'en'): string {
  const j = jabatan.toLowerCase();
  const d = translations.struktur.descriptions;
  if (j.includes('lurah')) {
    return d.lurah[lang];
  }
  if (j.includes('sekretaris')) {
    return d.sekretaris[lang];
  }
  if (j.includes('kesejahteraan')) {
    return d.kesejahteraan[lang];
  }
  if (j.includes('staf')) {
    return d.staf[lang];
  }
  if (j.includes('pemerintahan') || j.includes('trantib')) {
    return lang === 'id' ? 'Pemerintahan, Trantib & Pelayanan Wilayah' : 'Governance, Public Order & Community Services';
  }
  return lang === 'id' ? 'Aparatur Pemerintahan Kelurahan' : 'Village Administration Official';
}

function getNamaJabatan(jabatan: string, lang: 'id' | 'en'): string {
  const r = translations.struktur.roles;
  if (jabatan === 'Lurah') return r.Lurah[lang];
  if (jabatan === 'Sekretaris') return r.Sekretaris[lang];
  if (jabatan === 'Kepala Seksi Kesejahteraan') return r['Kepala Seksi Kesejahteraan'][lang];
  if (jabatan === 'Staf') return r.Staf[lang];
  return jabatan;
}

export default function StrukturPemerintahan() {
  const { lang } = useLanguage();
  const t = translations.struktur;

  const lurah =
    pejabatInti.find((p) => p.jabatan.toLowerCase().includes('lurah')) ||
    pejabatInti[0];

  const sekretaris = pejabatInti.find((p) =>
    p.jabatan.toLowerCase().includes('sekretaris')
  );

  const seksiList = pejabatInti.filter(
    (p) =>
      !p.jabatan.toLowerCase().includes('lurah') &&
      !p.jabatan.toLowerCase().includes('sekretaris')
  );

  return (
    <div className="w-full space-y-8">
      {/* ── Header Struktur ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 border-b border-[#C1C8C2]/60">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#BC6C25] mb-1">
            {t.badgeTitle[lang]}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] leading-tight">
            {t.heading[lang]}
          </h2>
          <p className="mt-1 text-sm text-[#414844] max-w-2xl leading-relaxed">
            {t.desc[lang]}
          </p>
        </div>

        {/* Status chip */}
        <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#2D6A4F]/10 border border-[#2D6A4F]/25 px-3.5 py-1.5 text-xs font-semibold text-[#1B4332] whitespace-nowrap shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#2D6A4F] animate-pulse" />
          <span>{t.badgeAktif[lang]}</span>
        </div>
      </div>

      {/* ── Bagan Hirarki ─────────────────────────────────────────────── */}
      <div className="pt-2">
        {/* 1. KEPALA DESA / LURAH */}
        {lurah && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-2xl bg-white border border-[#C1C8C2] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Garis aksen hijau tua di atas kartu */}
              <div className="h-2 w-full bg-[#1B4332]" />

              <div className="p-6 flex flex-col items-center text-center">
                <Avatar
                  foto={lurah.foto}
                  nama={lurah.nama}
                  size="lg"
                  ringColor="ring-[#1B4332]/25"
                  fotoPosisi={lurah.fotoPosisi}
                  fotoTransform={lurah.fotoTransform}
                />

                <span className="mt-3 inline-flex items-center rounded-full bg-[#1B4332] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                  {getNamaJabatan(lurah.jabatan, lang)}
                </span>

                <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#1C1C18] leading-snug">
                  {lurah.nama}
                </h3>

                {lurah.nip && (
                  <p className="mt-1 text-xs text-[#717774] font-medium tracking-wide">
                    NIP. {lurah.nip}
                  </p>
                )}

                <p className="mt-1 text-xs sm:text-sm text-[#414844]">
                  {getDeskripsiJabatan(lurah.jabatan, lang)}
                </p>

                {/* Footer informasi kartu */}
                <div className="mt-5 pt-3 border-t border-[#E5E7EB] w-full flex items-center justify-between text-xs text-[#414844] px-1">
                  <span className="flex items-center gap-1.5 text-[#1C1C18]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 text-[#BC6C25]"
                      aria-hidden="true"
                    >
                      <path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M11 11h2M11 15h2M16 11h2M16 15h2M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M3 7l9-4 9 4" />
                    </svg>
                    {t.kantorKelurahan[lang]}
                  </span>
                  <span className="flex items-center gap-1 text-[#2D6A4F] font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-[#2D6A4F]"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t.statusAktif[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Garis penghubung vertikal 1 */}
            <div className="w-0.5 h-8 sm:h-10 bg-[#C1C8C2]" />
          </div>
        )}

        {/* 2. SEKRETARIS */}
        {sekretaris && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-2xl bg-white border border-[#C1C8C2] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Garis aksen terracotta di atas kartu */}
              <div className="h-2 w-full bg-[#BC6C25]" />

              <div className="p-6 flex flex-col items-center text-center">
                <Avatar
                  foto={sekretaris.foto}
                  nama={sekretaris.nama}
                  size="md"
                  ringColor="ring-[#BC6C25]/25"
                  fotoPosisi={sekretaris.fotoPosisi}
                  fotoTransform={sekretaris.fotoTransform}
                />

                <span className="mt-3 inline-flex items-center rounded-full bg-[#BC6C25]/15 text-[#BC6C25] px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
                  {getNamaJabatan(sekretaris.jabatan, lang)} {lang === 'id' ? 'Kelurahan' : ''}
                </span>

                <h3 className="mt-2 text-base sm:text-lg font-bold text-[#1C1C18] leading-snug">
                  {sekretaris.nama}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-[#414844]">
                  {getDeskripsiJabatan(sekretaris.jabatan, lang)}
                </p>

                {/* Footer informasi kartu */}
                <div className="mt-5 pt-3 border-t border-[#E5E7EB] w-full flex items-center justify-between text-xs text-[#414844] px-1">
                  <span className="flex items-center gap-1.5 text-[#1C1C18]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 text-[#BC6C25]"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {t.sekretariatKelurahan[lang]}
                  </span>
                  <span className="flex items-center gap-1 text-[#2D6A4F] font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-[#2D6A4F]"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t.statusAktif[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Garis penghubung vertikal 2 */}
            <div className="w-0.5 h-8 sm:h-10 bg-[#C1C8C2]" />
          </div>
        )}

        {/* 3. PEMISAH TINGKAT: PELAKSANA TEKNIS & TATA USAHA */}
        {seksiList.length > 0 && (
          <div>
            <div className="relative my-2 flex items-center justify-center">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-[#C1C8C2]" />
              </div>
              <div className="relative bg-[#F3EFE6] px-4">
                <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#414844] bg-[#FAF7F2] border border-[#C1C8C2] rounded-full px-4 py-1">
                  {t.pelaksanaTitle[lang]}
                </span>
              </div>
            </div>

            {/* Grid Pejabat Seksi / Pelaksana Teknis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto pt-6">
              {seksiList.map((p) => {
                const isKesejahteraan = p.jabatan
                  .toLowerCase()
                  .includes('kesejahteraan');

                return (
                  <div
                    key={p.nama}
                    className="rounded-2xl bg-white border border-[#C1C8C2] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col items-center text-center"
                  >
                    {/* Aksen atas kartu */}
                    <div
                      className={`h-1.5 w-full ${
                        isKesejahteraan ? 'bg-[#2D6A4F]' : 'bg-[#1B4332]'
                      }`}
                    />

                    <div className="p-6 w-full flex flex-col items-center">
                      <Avatar
                        foto={p.foto}
                        nama={p.nama}
                        size="md"
                        ringColor={
                          isKesejahteraan
                            ? 'ring-[#2D6A4F]/20'
                            : 'ring-[#1B4332]/20'
                        }
                        fotoPosisi={p.fotoPosisi}
                        fotoTransform={p.fotoTransform}
                      />

                      <span
                        className={`mt-3 inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide ${
                          isKesejahteraan
                            ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                            : 'bg-[#1B4332]/10 text-[#1B4332]'
                        }`}
                      >
                        {getNamaJabatan(p.jabatan, lang)}
                      </span>

                      <h4 className="mt-2 text-base font-bold text-[#1C1C18] leading-snug">
                        {p.nama}
                      </h4>

                      <p className="mt-1 text-xs text-[#414844] leading-relaxed">
                        {getDeskripsiJabatan(p.jabatan, lang)}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#E5E7EB] w-full flex items-center justify-center text-xs text-[#414844]">
                        <span className="flex items-center gap-1 text-[#2D6A4F] font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3.5 w-3.5 text-[#2D6A4F]"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {t.aktifMelayani[lang]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 4. KEPALA LINGKUNGAN ──────────────────────────────────────── */}
      {lingkungan.length > 0 && (
        <div className="pt-10 border-t border-[#C1C8C2]/60 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#BC6C25] mb-1">
              {t.wilayahTitle[lang]}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1B4332]">
              {t.kepalaLingkunganTitle[lang]}
            </h3>
            <p className="mt-1 text-sm text-[#414844]">
              {t.kepalaLingkunganDesc[lang]}
            </p>
          </div>

          {/* Grid kartu lingkungan */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lingkungan.map((l) => (
              <div
                key={l.nama}
                className="rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center rounded-full bg-[#1B4332]/10 px-3 py-0.5 text-xs font-bold text-[#1B4332]">
                      {lang === 'id' ? l.nama : l.nama.replace('Lingkungan', 'Neighborhood')}
                    </span>
                    <span className="text-[11px] font-semibold text-[#BC6C25]">
                      {t.badgeWilayah[lang]}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="font-semibold text-[#1C1C18] min-w-[55px]">
                        {t.labelKepala[lang]}
                      </span>
                      <span className="text-[#414844] font-medium">{l.kepala}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-semibold text-[#1C1C18] min-w-[55px]">
                        {t.labelWakil[lang]}
                      </span>
                      <span className="text-[#414844]">{l.wakil}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
