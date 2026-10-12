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
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
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
      galeriCaptions: tItem.galeriCaptions?.map((gc) => ({ id: gc.id, en: gc.en })) ?? orig.galeriCaptions,
    };
  });

  const selectedIndex = localizedItems.findIndex((item) => item.id === selectedId);
  const activeItem = selectedIndex !== -1 ? localizedItems[selectedIndex] : null;

  // Galeri foto 3 foto untuk destinasi yang sedang aktif
  const activePhotos = activeItem?.galeri && activeItem.galeri.length > 0
    ? activeItem.galeri
    : activeItem?.foto
    ? [activeItem.foto]
    : [];

  function handleLightboxNav(direction: 'prev' | 'next') {
    setActivePhotoIndex((current) => {
      if (current === null || activePhotos.length === 0) return current;
      return direction === 'next'
        ? (current + 1) % activePhotos.length
        : (current - 1 + activePhotos.length) % activePhotos.length;
    });
  }

  // Keyboard navigation untuk Lightbox dan Showcase
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activePhotoIndex !== null) {
        if (e.key === 'Escape') {
          setActivePhotoIndex(null);
        } else if (e.key === 'ArrowRight') {
          setActivePhotoIndex((current) => {
            if (current === null || activePhotos.length === 0) return current;
            return (current + 1) % activePhotos.length;
          });
        } else if (e.key === 'ArrowLeft') {
          setActivePhotoIndex((current) => {
            if (current === null || activePhotos.length === 0) return current;
            return (current - 1 + activePhotos.length) % activePhotos.length;
          });
        }
      } else if (e.key === 'Escape') {
        setSelectedId(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, activePhotos.length]);

  // Kunci scroll body saat Lightbox terbuka
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhotoIndex]);

  // Otomatis scroll perlahan ke panggung showcase saat destinasi dibuka
  useEffect(() => {
    if (selectedId && showcaseRef.current) {
      const timer = setTimeout(() => {
        showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [selectedId]);

  function handleCardClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
    setActivePhotoIndex(null);
  }

  function handleNavigate(direction: 'prev' | 'next') {
    if (!localizedItems.length) return;
    const current = selectedIndex !== -1 ? selectedIndex : 0;
    const nextIdx =
      direction === 'next'
        ? (current + 1) % localizedItems.length
        : (current - 1 + localizedItems.length) % localizedItems.length;
    setSelectedId(localizedItems[nextIdx].id);
    setActivePhotoIndex(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Label petunjuk dengan dot pulse rapi */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#BC6C25] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#BC6C25]" />
          </span>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B4332] leading-snug">
            {t.selectPrompt[lang]}
          </p>
        </div>

        {/* Tab switcher cepat: rapi 1 baris terbagi rata di mobile & pill di desktop */}
        <div className="w-full sm:w-auto">
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-1 sm:gap-1.5 p-1 rounded-2xl sm:rounded-full bg-white border border-[#C1C8C2] shadow-xs">
            {localizedItems.map((item) => {
              const isActive = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCardClick(item.id)}
                  className={`px-2 sm:px-3.5 py-2 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-xl sm:rounded-full transition-all duration-200 cursor-pointer text-center truncate ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'text-[#414844] hover:bg-[#FAF7F2] hover:text-[#1B4332]'
                  }`}
                >
                  {item.nama}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Grid 3 Kartu Destinasi Interaktif ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {localizedItems.map((item) => {
          const isActive = selectedId === item.id;
          const photoCount = item.galeri?.length ?? (item.foto ? 1 : 0);

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
                {/* Foto Utama Destinasi */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 transition-opacity duration-300" />

                {/* Badge Kategori & Status Atas */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#BC6C25]" />
                    {item.kategori}
                  </span>

                  {/* Badge 3 Foto */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-[#D4A373]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{photoCount} Foto</span>
                  </span>
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

      {/* ── PANGGUNG EKSPLORASI INTERAKTIF & 3 FOTO MUNCUL ─────────────── */}
      {activeItem && (
        <section
          ref={showcaseRef}
          id={`showcase-${activeItem.id}`}
          role="region"
          aria-label={`Rincian dan Galeri ${activeItem.nama}`}
          className="relative w-full rounded-3xl border border-[#C1C8C2] bg-white shadow-2xl overflow-hidden mt-10 transition-all duration-500 animate-showcase"
        >
          {/* Header Bar Panggung */}
          <div className="bg-[#1B4332] text-white px-6 py-4 flex items-center justify-between border-b border-[#2D6A4F]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#A5D0B9]">
                <span className="h-2 w-2 rounded-full bg-[#BC6C25]" />
                {activeItem.kategori}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                {activeItem.nama} · Kelurahan Kumelembuay
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

          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* ── BAGIAN 1: GALERI 3 FOTO MUNCUL SEKALIGUS ───────────────── */}
            <div className="bg-[#FAF7F2] p-5 sm:p-7 rounded-3xl border border-[#E8E2D5]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1B4332] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-[#D4A373]"
                    >
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                      <path
                        fillRule="evenodd"
                        d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71a3.75 3.75 0 013.081 3.522v7.74a3.75 3.75 0 01-3.75 3.75H6a3.75 3.75 0 01-3.75-3.75V10.01a3.75 3.75 0 013.08-3.522c.466-.067.871-.327 1.11-.71l.822-1.317a2.828 2.828 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#1B4332] flex items-center gap-2">
                      <span>{t.galeriTitle[lang]}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#1B4332] text-white">
                        {activePhotos.length} Foto
                      </span>
                    </h3>
                    <p className="text-xs text-[#717873]">
                      {t.galeriSubtitle[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#BC6C25] bg-[#BC6C25]/10 px-3 py-1 rounded-full border border-[#BC6C25]/20">
                    {lang === 'id' ? 'Sentuh foto untuk memperbesar' : 'Click photo to view full size'}
                  </span>
                </div>
              </div>

              {/* Grid 3 Foto Nyata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                {activePhotos.map((photoUrl, idx) => {
                  const caption =
                    activeItem.galeriCaptions?.[idx]?.[lang] ??
                    (lang === 'id' ? `Foto ${idx + 1}` : `Photo ${idx + 1}`);

                  return (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className="group/photo relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#C1C8C2] border border-[#D5CEC0] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActivePhotoIndex(idx);
                        }
                      }}
                      aria-label={`${caption} - ${lang === 'id' ? 'Klik untuk memperbesar' : 'Click to enlarge'}`}
                    >
                      {/* Image Next.js */}
                      <Image
                        src={photoUrl}
                        alt={`${activeItem.nama} - ${caption}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/photo:scale-108"
                        priority={idx === 0}
                      />

                      {/* Gradasi lembut bawah */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 transition-opacity duration-300" />

                      {/* Badge Nomor Foto di Pojok Kiri Atas */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold shadow-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#BC6C25]" />
                          Foto {idx + 1}
                        </span>
                      </div>

                      {/* Ikon Zoom di Pojok Kanan Atas */}
                      <div className="absolute top-3 right-3 z-10 opacity-80 group-hover/photo:opacity-100 transition-opacity">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover/photo:bg-[#1B4332] group-hover/photo:text-white transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Keterangan Foto Bawah */}
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 z-10">
                        <p className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md">
                          {caption}
                        </p>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-[#A5D0B9] font-medium">
                          <span>{activeItem.nama}</span>
                          <span className="group-hover/photo:translate-x-1 transition-transform">
                            {lang === 'id' ? 'Perbesar ↗' : 'Enlarge ↗'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── BAGIAN 2: RINCIAN INFORMASI, DAYA TARIK & MAPS ──────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              {/* Kolom Kiri: Daya Tarik Utama + Google Maps (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Daya Tarik Utama (Chips) */}
                {activeItem.highlights && activeItem.highlights.length > 0 && (
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0ECE1]">
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

                    <div className="space-y-2">
                      {activeItem.highlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#BC6C25]/20 text-xs sm:text-sm font-semibold text-[#1C1C18] shadow-xs"
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

                {/* Info Lokasi & Tombol Google Maps */}
                <div className="p-5 rounded-2xl bg-white border border-[#C1C8C2] shadow-xs space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1B4332]/10 text-[#1B4332]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-[#BC6C25]"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#717873]">
                        {t.lokasiLabel[lang]}
                      </p>
                      <p className="text-sm font-bold text-[#1B4332] mt-0.5">
                        {activeItem.lokasi ?? 'Kelurahan Kumelembuay, Tomohon Timur'}
                      </p>
                    </div>
                  </div>

                  {activeItem.mapsUrl && (
                    <a
                      href={activeItem.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#1B4332] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#2D6A4F] active:scale-98 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-[#D4A373]"
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
              </div>

              {/* Kolom Kanan: Narasi Rinci & Navigasi (7 Cols) */}
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

                  {/* Deskripsi Lengkap Naratif */}
                  <div className="mt-6 pt-5 border-t border-[#F0ECE1]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-3">
                      {lang === 'id' ? 'Tentang Destinasi' : 'About the Destination'}
                    </h4>
                    <p className="text-sm sm:text-base text-[#2D3748] leading-relaxed">
                      {activeItem.deskripsiLengkap ?? activeItem.deskripsiSingkat}
                    </p>
                  </div>
                </div>

                {/* Footer Bar: Navigasi Antar Destinasi */}
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

      {/* ── LIGHTBOX MODAL FULLSCREEN UNTUK MELIHAT FOTO DALAM RESOLUSI PENUH ── */}
      {activeItem && activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.nama} - Foto ${activePhotoIndex + 1}`}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Header Lightbox */}
          <div
            className="flex items-center justify-between text-white z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#BC6C25]" />
              <p className="text-sm sm:text-base font-bold drop-shadow">
                {activeItem.nama}
              </p>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full font-medium text-white/90">
                {activePhotoIndex + 1} / {activePhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <span>{t.lightboxClose[lang]}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 rounded">
                Esc
              </kbd>
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

          {/* Area Foto Utama + Navigasi Panah */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Panah Kiri */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={() => handleLightboxNav('prev')}
                className="absolute left-2 sm:left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Foto Sebelumnya"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* Gambar Besar */}
            <div className="relative w-full h-[65vh] sm:h-[72vh] rounded-2xl overflow-hidden">
              <Image
                src={activePhotos[activePhotoIndex]}
                alt={`${activeItem.nama} - Foto ${activePhotoIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Tombol Panah Kanan */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={() => handleLightboxNav('next')}
                className="absolute right-2 sm:right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Foto Berikutnya"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Footer Lightbox: Keterangan & Thumbnails 3 Foto */}
          <div
            className="text-center text-white z-20 pt-2 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm font-semibold text-[#A5D0B9]">
              {activeItem.galeriCaptions?.[activePhotoIndex]?.[lang] ??
                `${activeItem.nama} - Foto ${activePhotoIndex + 1}`}
            </p>

            {/* Strip Thumbnail 3 Foto */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {activePhotos.map((thumbUrl, idx) => {
                const isCurrent = idx === activePhotoIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-[#D4A373] scale-110 shadow-lg'
                        : 'border-white/30 opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={thumbUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

