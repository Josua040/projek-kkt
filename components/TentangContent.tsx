'use client';

import TimKktSection from '@/components/TimKktSection';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function TentangContent() {
  const { lang } = useLanguage();
  const t = translations.tentang;

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t.pageTitle[lang]}
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {t.subTitle[lang]}
          </p>
        </div>
      </div>

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
