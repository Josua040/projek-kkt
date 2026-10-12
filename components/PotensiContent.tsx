'use client';

import { site } from '@/data/site';
import { wisata } from '@/data/wisata';
import WisataGrid from '@/components/WisataGrid';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

import PageHeader from '@/components/PageHeader';

export default function PotensiContent() {
  const { lang } = useLanguage();
  const t = translations.potensi;

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <PageHeader
        title={t.pageTitle[lang]}
        badge={lang === 'id' ? 'Ekowisata & Budaya Minahasa' : 'Ecotourism & Minahasa Heritage'}
        subtitle={`${site.nama} · ${site.kecamatan} · ${site.kota}`}
        bgImage="/images/wisata/tetetana-1.jpg"
        highlights={[
          lang === 'id' ? '3 Destinasi Wisata Unggulan' : '3 Featured Attractions',
          lang === 'id' ? 'Panorama Dataran Tinggi' : 'Highland Mountain Panorama',
          lang === 'id' ? 'Suasana Asri & Sejuk' : 'Fresh Mountain Breeze',
        ]}
        maxWidth="6xl"
      />

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
