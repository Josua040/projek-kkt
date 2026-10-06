'use client';

import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function BerandaPage() {
  const { lang } = useLanguage();
  const t = translations.beranda;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#1B4332] text-white
          min-h-[460px] flex items-center
          px-4 pt-16 pb-24 sm:px-6 sm:min-h-[520px] sm:pt-20 sm:pb-28"
      >
        {/* Foto latar */}
        <Image
          src="/images/profil/hero.jpg"
          alt="Foto pemandangan Kelurahan Kumelembuay"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Lapis 1: gelap merata ringan di seluruh hero */}
        <div className="absolute inset-0 bg-[#1B4332]/25" />
        {/* Lapis 2: gradien dari kiri (gelap) ke kanan (transparan) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(27,67,50,0.97) 0%, rgba(27,67,50,0.85) 35%, rgba(27,67,50,0.40) 65%, transparent 100%)',
          }}
        />

        {/* Konten teks — rata kiri, di atas overlay */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="max-w-xl text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-1 text-xs font-semibold text-[#C1ECD4]">
              <span className="h-2 w-2 rounded-full bg-[#A5D0B9] animate-pulse" />
              <span>{t.badge[lang]}</span>
            </div>
            <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#a5d0b9]">
              {t.wilayahSub[lang]}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
              {t.heroTitle[lang]}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#c1ecd4] leading-relaxed">
              {t.heroDesc[lang]}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/potensi"
                className="inline-flex items-center gap-2 rounded-full bg-[#BC6C25] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D4A373] shadow-sm"
              >
                <span>{t.btnPotensi[lang]}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1B4332]"
              >
                <span>{t.btnProfil[lang]}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik ringkas — Floating Bar */}
      <section className="relative z-20 -mt-8 sm:-mt-12 lg:-mt-14 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-7 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* 1. Jumlah Penduduk */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#1E293B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M12 12c1.93 0 3.5-1.57 3.5-3.5S13.93 5 12 5 8.5 6.57 8.5 8.5 10.07 12 12 12zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                  <circle cx="5" cy="10" r="2" />
                  <path d="M5 13c-.9 0-2.5.45-3 1v2h3.5v-1.5c0-.62.24-1.2.65-1.66-.37-.09-.76-.14-1.15-.14z" />
                  <circle cx="19" cy="10" r="2" />
                  <path d="M19 13c-.39 0-.78.05-1.15.14.41.46.65 1.04.65 1.66V16H22v-2c-.5-.55-2.1-1-3-1z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111827] leading-none tracking-tight">
                  {site.dataPenduduk.jumlahJiwa.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}
                </p>
                <p className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {t.statPenduduk[lang]}
                </p>
              </div>
            </div>

            {/* 2. Luas Wilayah */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#965727]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <circle cx="7" cy="7" r="2.5" />
                  <path d="M2.5 19h19l-6.5-9-4 5.5-2.5-3.2L2.5 19z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111827] leading-none tracking-tight">
                  330
                </p>
                <p className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {t.statWilayah[lang]}
                </p>
              </div>
            </div>

            {/* 3. Tahun Berdiri */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#1E293B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7v2h20V7L12 2zM4 11v7h3v-7H4zm5 0v7h3v-7H9zm5 0v7h3v-7h-3zm5 0v7h3v-7h-3zM2 20v2h20v-2H2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111827] leading-none tracking-tight">
                  {site.tahunDesa}
                </p>
                <p className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {t.statTahun[lang]}
                </p>
              </div>
            </div>

            {/* 4. Mayoritas Mata Pencaharian */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#965727]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3C8.24 16.48 10.42 14.8 13 14.3V19h2v-4.83c1.78-.39 3.51-1.33 4.88-2.73 1.15-1.18 1.95-2.65 2.12-4.24.03-.3-.08-.59-.3-.79-.22-.2-.51-.27-.8-.21-1.3.26-2.58.82-3.9 1.8zm-6-2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111827] leading-none tracking-tight">
                  75%
                </p>
                <p className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {t.statMataPencaharian[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kartu jelajah */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-[#1B4332]">
          {t.jelajahTitle[lang]}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {t.jelajahCards.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="rounded-2xl border border-[#c1c8c2] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold text-[#1B4332]">
                {h.title[lang]}
              </h3>
              <p className="text-sm text-[#414844]">{h.desc[lang]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sambutan Lurah */}
      <section className="bg-[#F3EFE6] px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white ring-2 ring-[#1B4332]/25 shadow-md">
            <Image
              src="/images/pemerintahan/lurah.jpg"
              alt={`Foto ${site.narasiLurah?.nama ?? 'Lurah Kumelembuay'}`}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1B4332]">{t.sambutanTitle[lang]}</h3>
            <p className="mt-2 text-sm text-[#414844] leading-relaxed">{t.sambutanText[lang]}</p>
            {site.narasiLurah?.nama && (
              <div className="mt-3">
                <p className="text-sm font-bold text-[#1B4332]">
                  — {site.narasiLurah.nama}
                </p>
                <p className="text-xs text-[#717774] font-medium">
                  {t.lurahJabatan[lang]}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
