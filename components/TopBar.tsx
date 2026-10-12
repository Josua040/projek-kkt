'use client';

import { site } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function TopBar() {
  const { lang } = useLanguage();
  const jam = site.jamKantor ? translations.topbar.jamKantor[lang] : translations.topbar.menyusul[lang];
  const telp = site.kontak.telepon ?? translations.topbar.menyusul[lang];
  const alamat = site.kontak.alamat ? translations.topbar.alamat[lang] : translations.topbar.menyusul[lang];

  return (
    <div className="bg-gradient-to-r from-[#122e23] via-[#1B4332] to-[#122e23] text-white border-b border-white/10 text-xs select-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        {/* Sisi Kiri: Jam kantor & Telepon */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
          {/* Jam kantor */}
          <div className="flex shrink-0 items-center gap-1.5 text-[#C1ECD4]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0 text-[#A5D0B9]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-medium tracking-tight">{jam}</span>
          </div>

          <span className="shrink-0 text-white/30 select-none" aria-hidden="true">·</span>

          {/* Telepon */}
          <div className="flex shrink-0 items-center gap-1.5 text-[#C1ECD4]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0 text-[#A5D0B9]"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.58-1.58a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
            </svg>
            {site.kontak.telepon ? (
              <a
                href={`tel:${site.kontak.telepon}`}
                className="font-medium transition-colors hover:text-[#D4A373] hover:underline"
              >
                {telp}
              </a>
            ) : (
              <span className="font-medium">{telp}</span>
            )}
          </div>
        </div>

        {/* Sisi Kanan: Alamat singkat & Status resmi (tampil di tablet/desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[#C1ECD4]">
          <div className="flex items-center gap-1.5 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0 text-[#A5D0B9]"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-medium">{alamat}</span>
          </div>

          <span className="text-white/30 select-none" aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-[#A5D0B9] border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {lang === 'id' ? 'Portal Resmi Kelurahan' : 'Official Portal'}
          </span>
        </div>
      </div>
    </div>
  );
}
