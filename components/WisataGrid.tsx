'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Wisata } from '@/data/wisata';
import WisataModal from './WisataModal';

// ---------------------------------------------------------------------------
// Lookup kelas per posisi (index % 4) — ditulis lengkap agar Tailwind mengenali
// ---------------------------------------------------------------------------

/** Aspect ratio di HP (1 kolom) */
const MOBILE_ASPECT: readonly string[] = [
  'aspect-[4/3]', // idx 0
  'aspect-[4/5]', // idx 1
  'aspect-[4/3]', // idx 2
  'aspect-[4/5]', // idx 3
];

/**
 * Kelas span di breakpoint sm (2 kolom, auto-rows-[200px]).
 * sm:aspect-auto menghapus aspect-ratio agar tinggi dikontrol oleh grid row.
 */
const SM_SPAN: readonly string[] = [
  'sm:col-span-2 sm:aspect-auto', // idx 0 — lebar penuh
  'sm:col-span-1 sm:aspect-auto', // idx 1 — satu kolom
  'sm:col-span-1 sm:aspect-auto', // idx 2 — satu kolom
  'sm:col-span-2 sm:aspect-auto', // idx 3 — lebar penuh
];

/**
 * Kelas span di breakpoint lg (3 kolom, auto-rows-[240px]).
 * Pola bento:
 *   [0: col-span-2]  [1: row-span-2]
 *   [2: 1x1       ]  (1 masih di sini)
 *   [3: 1x1       ]
 */
const LG_SPAN: readonly string[] = [
  'lg:col-span-2 lg:row-span-1', // idx 0 — lebar di kiri
  'lg:col-span-1 lg:row-span-2', // idx 1 — tinggi di kanan
  'lg:col-span-1 lg:row-span-1', // idx 2 — kiri bawah
  'lg:col-span-1 lg:row-span-1', // idx 3 — tengah bawah
];

// ---------------------------------------------------------------------------

interface WisataGridProps {
  items: Wisata[];
}

export default function WisataGrid({ items }: WisataGridProps) {
  const [selected, setSelected] = useState<Wisata | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-[#414844] italic text-sm sm:text-base">
        Data wisata akan segera ditambahkan.
      </p>
    );
  }

  // Jika kurang dari 4 entri, pakai grid rata biasa tanpa pola span
  const useBento = items.length >= 4;

  return (
    <>
      <div
        className={
          useBento
            ? // Bento grid: 1 kolom → 2 kolom sm → 3 kolom lg
              'mx-auto w-full max-w-6xl px-4 sm:px-6 ' +
              'grid grid-cols-1 gap-4 ' +
              'sm:grid-cols-2 sm:auto-rows-[200px] ' +
              'lg:grid-cols-3 lg:auto-rows-[240px] lg:gap-5'
            : // Grid rata biasa
              'mx-auto w-full max-w-6xl px-4 sm:px-6 ' +
              'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {items.map((item, idx) => {
          const pos = idx % 4;

          // Kelas untuk wadah kartu (ukuran & span)
          const mobileAspect = MOBILE_ASPECT[pos];
          const smSpan = useBento ? SM_SPAN[pos] : '';
          const lgSpan = useBento ? LG_SPAN[pos] : '';
          const wrapperClass = [mobileAspect, smSpan, lgSpan].filter(Boolean).join(' ');

          return (
            <div
              key={item.id}
              // Pada sm/lg, aspect-ratio diganti oleh grid auto-rows,
              // jadi wadah harus h-full agar mengisi baris grid
              className={`${wrapperClass} sm:h-full`}
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`Lihat detail ${item.nama}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:ring-offset-2 transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Gambar / placeholder — mengisi penuh kartu */}
                <div className="absolute inset-0 bg-[#C1C8C2]">
                  {item.foto ? (
                    <Image
                      src={item.foto}
                      alt={`Foto ${item.nama}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    /* Placeholder abu-abu */
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10 w-10 text-[#8a9490]"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Overlay gradasi gelap di bagian bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Badge kategori — kiri atas */}
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center rounded-full bg-[#1B4332]/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.kategori}
                  </span>
                </div>

                {/* Ikon kaca pembesar — kanan atas */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition group-hover:bg-black/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                {/* Nama wisata + deskripsi singkat — bagian bawah */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <p className="font-bold text-white leading-snug text-base drop-shadow line-clamp-2">
                    {item.nama}
                  </p>
                  {item.deskripsiSingkat && (
                    <p className="mt-0.5 text-xs text-white/80 line-clamp-2 drop-shadow">
                      {item.deskripsiSingkat}
                    </p>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal wisata */}
      {selected && (
        <WisataModal wisata={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
