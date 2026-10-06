'use client';

import { timKkt } from '@/data/tim-kkt';
import AnggotaCard from './AnggotaCard';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function TimKktSection() {
  const { lang } = useLanguage();
  const t = translations.tentang;

  const hasKelompok = timKkt.kelompok && timKkt.kelompok.length > 0;

  const intiPosko = timKkt.kelompok?.find((k) =>
    k.bidang.toLowerCase().includes('inti')
  );

  const bidangLainnya = timKkt.kelompok?.filter(
    (k) => !k.bidang.toLowerCase().includes('inti')
  );

  const getBidangName = (bidang: string) => {
    if (lang === 'id') return bidang;
    const found = t.bidang[bidang as keyof typeof t.bidang];
    return found ? found.en : bidang;
  };

  return (
    <div className="w-full space-y-8">
      {/* ── Header Section ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 border-b border-[#C1C8C2]/60">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#BC6C25] mb-1">
            {lang === 'id' ? timKkt.angkatan : 'Sam Ratulangi University KKT Batch 149'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] leading-tight">
            {t.timTitle[lang]}
          </h2>
          <p className="mt-1 text-sm text-[#414844] max-w-2xl leading-relaxed">
            {t.timDesc[lang]}
          </p>
        </div>

        {/* Link Instagram (jika ada) */}
        {timKkt.instagram && (
          <a
            href={timKkt.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Tim KKT"
            className="inline-flex items-center gap-2 rounded-full border border-[#1B4332] bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#1B4332] transition hover:bg-[#1B4332] hover:text-white self-start sm:self-auto shadow-xs whitespace-nowrap"
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
            <span>{t.btnInstagram[lang]}</span>
          </a>
        )}
      </div>

      {/* ── Konten Anggota / Fallback ─────────────────────────────────── */}
      {!hasKelompok ? (
        <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-sm text-center">
          <p className="text-[#414844] italic text-sm sm:text-base">
            {lang === 'id'
              ? 'Data tim KKT akan segera ditambahkan.'
              : 'KKT team data will be added soon.'}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* 1. Inti Posko (Ditonjolkan di atas) */}
          {intiPosko && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-[#1B4332]" />
                <h3 className="text-xl font-bold text-[#1B4332]">
                  {getBidangName(intiPosko.bidang)}
                </h3>
                <span className="text-xs font-semibold text-[#BC6C25] bg-[#BC6C25]/10 px-2.5 py-0.5 rounded-full">
                  {t.pimpinanPosko[lang]}
                </span>
              </div>

              {/* Grid Inti Posko */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                {intiPosko.anggota.map((a, idx) => (
                  <div
                    key={a.nim}
                    className={
                      idx === 0
                        ? 'col-span-2 flex justify-center sm:col-span-1 sm:block'
                        : ''
                    }
                  >
                    <div
                      className={
                        idx === 0
                          ? 'w-[calc(50%-0.375rem)] sm:w-full h-full'
                          : 'w-full h-full'
                      }
                    >
                      <AnggotaCard anggota={a} isInti />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Bidang-bidang Lainnya */}
          {bidangLainnya &&
            bidangLainnya.map((kel) => (
              <div key={kel.bidang} className="space-y-4 pt-6 border-t border-[#C1C8C2]/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#2D6A4F]" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#1B4332]">
                    {getBidangName(kel.bidang)}
                  </h3>
                  <span className="text-xs text-[#414844] font-medium">
                    ({kel.anggota.length} {t.labelAnggota[lang]})
                  </span>
                </div>

                {/* Grid Anggota Bidang */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {kel.anggota.map((a, idx) => (
                    <div
                      key={a.nim}
                      className={
                        kel.anggota.length === 3 && idx === 0
                          ? 'col-span-2 flex justify-center sm:col-span-1 sm:block'
                          : ''
                      }
                    >
                      <div
                        className={
                          kel.anggota.length === 3 && idx === 0
                            ? 'w-[calc(50%-0.375rem)] sm:w-full h-full'
                            : 'w-full h-full'
                        }
                      >
                        <AnggotaCard key={a.nim} anggota={a} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
