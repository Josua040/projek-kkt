'use client';

import { site } from '@/data/site';
import { wisata } from '@/data/wisata';
import WisataGrid from '@/components/WisataGrid';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function PotensiContent() {
  const { lang } = useLanguage();
  const t = translations.potensi;

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A5D0B9] text-xs font-semibold mb-3 tracking-wide">
            <span>{lang === 'id' ? 'Ekowisata & Budaya Minahasa' : 'Ecotourism & Minahasa Heritage'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t.pageTitle[lang]}
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {site.nama} · {site.kecamatan} · {site.kota}
          </p>
        </div>
      </div>

      {/* ── Pengantar + Grid ───────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[#414844] text-sm sm:text-base mb-8 max-w-2xl leading-relaxed">
            {t.pageDesc[lang]}
          </p>

          <WisataGrid items={wisata} />
        </div>
      </section>
    </main>
  );
}
