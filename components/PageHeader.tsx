'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeaderProps {
  title: string;
  badge?: string;
  subtitle?: string;
  bgImage?: string;
  highlights?: string[];
  maxWidth?: '5xl' | '6xl';
}

export default function PageHeader({
  title,
  badge,
  subtitle,
  bgImage,
  highlights = [],
  maxWidth = '5xl',
}: PageHeaderProps) {
  const { lang } = useLanguage();

  return (
    <div className="relative isolate overflow-hidden bg-[#1B4332] text-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#BC6C25]/25">
      {/* 1. Background foto dengan gradasi gelap berlapis */}
      {bgImage && (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Lapis gelap merata */}
          <div
            className="absolute inset-0 bg-[#0b1f16]/75 sm:bg-[#0b1f16]/70 backdrop-blur-[1px]"
            aria-hidden="true"
          />
          {/* Lapis gradasi vertikal khas alam */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#081812] via-[#1B4332]/85 to-[#0b1f16]/90"
            aria-hidden="true"
          />
        </div>
      )}

      {/* 2. Ambient glow spots (menghilangkan kesan flat) */}
      <div
        className="pointer-events-none absolute -top-24 -right-20 -z-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#BC6C25]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#A5D0B9]/15 blur-3xl"
        aria-hidden="true"
      />

      {/* 3. Tekstur garis kontur topografi halus */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M-100 250 C150 120, 350 350, 600 200 C750 100, 850 180, 950 140" />
        <path d="M-100 200 C180 80, 320 300, 580 160 C730 60, 830 140, 950 100" />
        <path d="M-100 150 C200 40, 300 260, 560 120 C710 20, 810 100, 950 60" />
        <path d="M-100 300 C120 160, 380 400, 620 240 C770 140, 870 220, 950 180" />
      </svg>

      {/* 4. Konten Utama */}
      <div className={`mx-auto ${maxWidth === '6xl' ? 'max-w-6xl' : 'max-w-5xl'}`}>
        {/* Breadcrumb + Badge */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5 text-[#A5D0B9]"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
          </Link>

          <span className="text-white/40 font-light" aria-hidden="true">/</span>

          {badge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#C1ECD4] tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BC6C25]" aria-hidden="true" />
              {badge}
            </span>
          )}
        </div>

        {/* Judul Utama */}
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
          {title}
        </h1>

        {/* Sub-judul / Keterangan Wilayah */}
        {subtitle && (
          <p className="mt-2.5 text-sm sm:text-base text-[#C1ECD4]/90 font-medium leading-relaxed drop-shadow-xs max-w-2xl">
            {subtitle}
          </p>
        )}

        {/* Highlights Pills (Pemberi konteks cepat & detail visual) */}
        {highlights.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/20 backdrop-blur-xs border border-white/10 text-xs font-medium text-white/90 shadow-2xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#BC6C25]" aria-hidden="true" />
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
