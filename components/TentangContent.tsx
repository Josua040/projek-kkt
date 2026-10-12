'use client';

import TimKktSection from '@/components/TimKktSection';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function TentangContent() {
  const { lang } = useLanguage();
  const t = translations.tentang;

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <PageHeader
        title={t.pageTitle[lang]}
        badge={lang === 'id' ? 'Program Kerja KKT Unsrat' : 'Unsrat Field Work Program'}
        subtitle={t.subTitle[lang]}
        bgImage="/images/profil/hero.jpg"
        highlights={[
          lang === 'id' ? 'KKT Angkatan 149' : 'Batch 149 Field Work',
          lang === 'id' ? 'Universitas Sam Ratulangi' : 'Sam Ratulangi University',
          lang === 'id' ? 'Posko Kumelembuay' : 'Kumelembuay Base',
        ]}
        maxWidth="5xl"
      />

      {/* ── Penjelasan Program KKT ─────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] mb-3">
              {t.aboutTitle[lang]}
            </h2>
            <p className="text-[#1C1C18] text-sm sm:text-base leading-relaxed">
              {t.p1[lang]}
            </p>
            <p className="mt-3 text-[#414844] text-sm sm:text-base leading-relaxed">
              {t.p2[lang]}
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
