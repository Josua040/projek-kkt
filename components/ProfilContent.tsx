'use client';

import Image from 'next/image';
import { site } from '@/data/site';
import StrukturPemerintahan from '@/components/StrukturPemerintahan';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

type SectionBg = 'cream-light' | 'cream-dark';

function sectionClass(bg: SectionBg): string {
  return bg === 'cream-light' ? 'bg-[#FAF7F2]' : 'bg-[#F3EFE6]';
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-[#1B4332] mb-4 leading-snug">
      {children}
    </h2>
  );
}

export default function ProfilContent() {
  const { lang } = useLanguage();
  const t = translations.profil;

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
            {t.pageTitle[lang]}
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {site.nama} · {site.kecamatan} · {site.kota}
          </p>
        </div>
      </div>

      {/* ── 1. Sejarah ─────────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[0])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>{t.sejarahTitle[lang]}</SectionTitle>
          <p className="text-[#1C1C18] leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {t.sejarahText[lang]}
          </p>
        </div>
      </section>

      {/* ── 2. Visi dan Misi ───────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[1])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>{t.visiMisiTitle[lang]}</SectionTitle>
          <p className="text-sm text-[#414844] mb-6">
            {t.visiMisiDesc[lang]}
          </p>
          <div className="space-y-6">
            {/* Visi sebagai kutipan */}
            <blockquote className="rounded-2xl border-l-4 border-[#1B4332] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-2">
                {t.visiTag[lang]}
              </p>
              <p className="text-[#1C1C18] text-base sm:text-lg italic font-medium leading-relaxed">
                &ldquo;{t.visiQuote[lang]}&rdquo;
              </p>
            </blockquote>

            {/* Misi sebagai daftar 5 item */}
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-4">
                {t.misiTag[lang]}
              </p>
              <ol className="space-y-3.5">
                {t.misiList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-xs font-bold text-white mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-[#1C1C18] text-sm sm:text-base leading-relaxed pt-0.5">
                      {item[lang]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Narasi Lurah ────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[2])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>{t.narasiTitle[lang]}</SectionTitle>
          <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1B4332] leading-snug">
                {t.narasiHeading[lang]}
              </h3>
              <p className="mt-1 text-sm italic font-medium text-[#BC6C25]">
                &ldquo;{t.narasiTagline[lang]}&rdquo;
              </p>
            </div>
            <div className="space-y-3 pt-1 text-sm sm:text-base text-[#1C1C18] leading-relaxed">
              {t.narasiParagraf.map((p, idx) => (
                <p key={idx}>{p[lang]}</p>
              ))}
            </div>
            <div className="pt-4 border-t border-[#C1C8C2] flex items-center gap-3.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white ring-2 ring-[#1B4332]/20 shadow-xs">
                <Image
                  src="/images/pemerintahan/lurah.jpg"
                  alt={`Foto ${site.narasiLurah?.nama ?? 'Lurah'}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-[#1B4332] text-base leading-tight">
                  {site.narasiLurah.nama}
                </p>
                <p className="text-xs sm:text-sm text-[#414844]">
                  {lang === 'id' ? site.narasiLurah.jabatan : 'Head of Kumelembuay Village'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Struktur Pemerintahan ───────────────────────────────────── */}
      <section className={`${sectionClass(bgs[3])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <StrukturPemerintahan />
        </div>
      </section>

      {/* ── 5. Peta Wilayah ────────────────────────────────────────────── */}
      <section className={`${sectionClass(bgs[4])} py-12 px-4 sm:px-6`}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle>{t.petaTitle[lang]}</SectionTitle>

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
                {t.petaPlaceholder[lang]}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#414844] text-center sm:text-sm">
            {t.petaDesc[lang]}
          </p>
        </div>
      </section>
    </main>
  );
}
