'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { Wisata } from '@/data/wisata';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface WisataGridProps {
  items: Wisata[];
}

export default function WisataGrid({ items }: WisataGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = translations.potensi;

  // Terjemahkan data wisata sesuai bahasa aktif
  const localizedItems: Wisata[] = items.map((orig) => {
    const tItem = translations.potensi.items.find((item) => item.id === orig.id);
    if (!tItem) return orig;
    return {
      ...orig,
      nama: tItem.nama[lang],
      kategori: tItem.kategori[lang],
      deskripsiSingkat: tItem.deskripsiSingkat[lang],
      deskripsiLengkap: tItem.deskripsiLengkap[lang],
      highlights: tItem.highlights?.map((h) => h[lang]) ?? orig.highlights,
    };
  });

  const selectedIndex = localizedItems.findIndex((item) => item.id === selectedId);
  const activeItem = selectedIndex !== -1 ? localizedItems[selectedIndex] : null;

  // Tutup showcase saat menekan Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Otomatis scroll perlahan ke panggung showcase saat destinasi dibuka
  useEffect(() => {
    if (selectedId && showcaseRef.current) {
      // Delay kecil agar elemen render dan animasi mulai
      const timer = setTimeout(() => {
        showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedId]);

  function handleCardClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleNavigate(direction: 'prev' | 'next') {
    if (!localizedItems.length) return;
    const current = selectedIndex !== -1 ? selectedIndex : 0;
    const nextIdx =
      direction === 'next'
        ? (current + 1) % localizedItems.length
        : (current - 1 + localizedItems.length) % localizedItems.length;
    setSelectedId(localizedItems[nextIdx].id);
  }

  if (localizedItems.length === 0) {
    return (
      <p className="text-[#414844] italic text-sm sm:text-base">
        {lang === 'id'
          ? 'Data wisata akan segera ditambahkan.'
          : 'Tourism destination data will be updated soon.'}
      </p>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* ── Petunjuk Interaktif / Category Tabs ─────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#BC6C25] animate-ping" />
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1B4332]">
            {t.selectPrompt[lang]}
          </p>
        </div>

        {/* Tab switcher cepat */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white border border-[#C1C8C2] shadow-xs">
          {localizedItems.map((item) => {
            const isActive = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCardClick(item.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4332] text-white shadow-xs scale-105'
                    : 'text-[#414844] hover:bg-[#FAF7F2] hover:text-[#1B4332]'
                }`}
              >
                {item.nama}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid 3 Kartu Destinasi Interaktif ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {localizedItems.map((item) => {
          const isActive = selectedId === item.id;

          return (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-300 transform ${
                isActive
                  ? 'ring-4 ring-[#1B4332] shadow-2xl -translate-y-2'
                  : 'hover:-translate-y-1.5 hover:shadow-xl'
              }`}
            >
              <button
                type="button"
                onClick={() => handleCardClick(item.id)}
                aria-expanded={isActive}
                aria-controls={`showcase-${item.id}`}
                className="relative block w-full h-[360px] sm:h-[400px] text-left focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 cursor-pointer"
              >
                {/* Foto Destinasi */}
                <div className="absolute inset-0 bg-[#C1C8C2]">
                  {item.foto ? (
                    <Image
                      src={item.foto}
                      alt={`Foto ${item.nama}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover object-center transition-transform duration-700 ease-out ${
                        isActive ? 'scale-108' : 'group-hover:scale-105'
                      }`}
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#2D6A4F]/20 text-[#1B4332]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-12 w-12 opacity-60"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Overlay Gradasi Multi-layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300" />

                {/* Badge Kategori & Status Atas */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#BC6C25]" />
                    {item.kategori}
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B4332] px-3 py-1 text-xs font-bold text-white shadow-md animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-[#A5D0B9]" />
                      {t.activeBadge[lang]}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white/90 group-hover:bg-white group-hover:text-[#1B4332] transition-colors">
                      {lang === 'id' ? 'Klik untuk rincian' : 'Click for details'}
                    </span>
                  )}
                </div>

                {/* Konten Teks Bawah */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                    {item.nama}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed drop-shadow-sm">
                    {item.deskripsiSingkat}
                  </p>

                  {/* Tombol Aksi Animasi */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A5D0B9] group-hover:text-white transition-colors">
                      {isActive ? t.btnCollapse[lang] : t.btnExplore[lang]}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isActive
                            ? 'rotate-180 text-white'
                            : 'group-hover:translate-x-1.5'
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="text-[11px] font-medium text-white/70">
                      Kel. Kumelembuay
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* ── PANGGUNG EKSPLORASI INTERAKTIF (PENGGANTI POPUP MODAL) ─────── */}
      {activeItem && (
        <section
          ref={showcaseRef}
          id={`showcase-${activeItem.id}`}
          role="region"
          aria-label={`Rincian ${activeItem.nama}`}
          className="relative w-full rounded-3xl border border-[#C1C8C2] bg-white shadow-2xl overflow-hidden mt-10 transition-all duration-500 animate-showcase"
        >
          {/* Header Bar Panggung */}
          <div className="bg-[#1B4332] text-white px-6 py-4 flex items-center justify-between border-b border-[#2D6A4F]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#A5D0B9]">
                <span className="h-2 w-2 rounded-full bg-[#BC6C25]" />
                {activeItem.kategori}
              </span>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-white/80">
                {t.badge[lang]} · Kelurahan Kumelembuay
              </span>
            </div>

            {/* Tombol Tutup / Sembunyikan */}
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              aria-label={t.ariaClose[lang]}
            >
              <span>{t.btnCollapse[lang]}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* Konten Utama Panggung Showcase */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Kolom Kiri: Foto Sinematik & Tombol Navigasi Maps (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#C1C8C2] shadow-md border border-gray-100 group">
                  {activeItem.foto ? (
                    <Image
                      src={activeItem.foto}
                      alt={`Foto ${activeItem.nama}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                  ) : null}

                  {/* Lencana lokasi terapung */}
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-[#D4A373] shrink-0"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span className="text-xs font-semibold drop-shadow">
                        {activeItem.lokasi ?? 'Kelurahan Kumelembuay, Tomohon Timur'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Google Maps */}
                {activeItem.mapsUrl && (
                  <a
                    href={activeItem.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-[#1B4332] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#2D6A4F] active:scale-98 cursor-pointer"
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
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{t.btnMaps[lang]}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 opacity-75"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-8a.75.75 0 00-.75-.75h-8a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Kolom Kanan: Narasi Rinci, Daya Tarik & Navigasi (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#BC6C25]">
                      {activeItem.kategori}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-[#717873]">
                      Kecamatan Tomohon Timur
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B4332] leading-tight">
                    {activeItem.nama}
                  </h2>

                  <p className="mt-3 text-base font-medium text-[#414844] leading-relaxed">
                    {activeItem.deskripsiSingkat}
                  </p>

                  {/* Daya Tarik Utama (Chips) */}
                  {activeItem.highlights && activeItem.highlights.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-[#F0ECE1]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-3 flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4 text-[#BC6C25]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t.highlightTitle[lang]}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {activeItem.highlights.map((hl, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#BC6C25]/20 text-xs font-semibold text-[#1C1C18]"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-white text-[10px]">
                              ✓
                            </span>
                            <span className="leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deskripsi Lengkap Naratif */}
                  <div className="mt-6 pt-5 border-t border-[#F0ECE1]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">
                      {lang === 'id' ? 'Tentang Destinasi' : 'About the Destination'}
                    </h4>
                    <p className="text-sm sm:text-base text-[#2D3748] leading-relaxed">
                      {activeItem.deskripsiLengkap ?? activeItem.deskripsiSingkat}
                    </p>
                  </div>
                </div>

                {/* Footer Bar: Pindah ke Destinasi Lain */}
                <div className="pt-6 border-t border-[#F0ECE1] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate('prev')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#C1C8C2] bg-white text-xs font-semibold text-[#1B4332] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t.btnPrev[lang]}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('next')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#C1C8C2] bg-white text-xs font-semibold text-[#1B4332] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      {t.btnNext[lang]}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <span className="text-xs text-[#717873] font-medium">
                    {selectedIndex + 1} / {localizedItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
