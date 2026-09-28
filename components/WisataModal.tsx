'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Wisata } from '@/data/wisata';

interface WisataModalProps {
  wisata: Wisata;
  onClose: () => void;
}

export default function WisataModal({ wisata, onClose }: WisataModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Kunci scroll halaman di belakang
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Fokus ke tombol tutup saat modal dibuka
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Tutup dengan tombol Esc
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Tutup saat klik latar
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    /* Latar gelap transparan */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={handleOverlayClick}
    >
      {/* Panel modal */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={wisata.nama}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] shadow-2xl flex flex-col"
      >
        {/* Tombol tutup (X) */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Tutup popup"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Gambar besar */}
        <div className="relative w-full aspect-video flex-shrink-0 rounded-t-2xl overflow-hidden bg-[#C1C8C2]">
          {wisata.foto ? (
            <Image
              src={wisata.foto}
              alt={`Foto ${wisata.nama}`}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-16 w-16 text-[#8a9490]"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Isi teks */}
        <div className="p-5 flex flex-col gap-3">
          {/* Badge kategori */}
          <span className="inline-flex w-fit items-center rounded-full bg-[#1B4332] px-3 py-1 text-xs font-semibold text-white">
            {wisata.kategori}
          </span>

          {/* Nama wisata */}
          <h2 className="text-xl font-bold text-[#1B4332] leading-snug">
            {wisata.nama}
          </h2>

          {/* Deskripsi */}
          <p className="text-sm text-[#414844] leading-relaxed">
            {wisata.deskripsiLengkap ?? wisata.deskripsiSingkat}
          </p>

          {/* Lokasi */}
          {wisata.lokasi && (
            <p className="flex items-start gap-2 text-sm text-[#414844]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#BC6C25]"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {wisata.lokasi}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
