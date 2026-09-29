import { site } from '@/data/site';

// TopBar adalah server component — tidak perlu 'use client'
export default function TopBar() {
  const jam = site.jamKantor ?? 'Menyusul';
  const telp = site.kontak.telepon ?? 'Menyusul';
  const alamat = site.kontak.alamat ?? 'Menyusul';

  return (
    <div className="bg-[#1B4332] text-white">
      {/* Konten tiga item — di HP hanya jam & telp, alamat disembunyikan */}
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-1.5 sm:px-6 sm:gap-6 sm:overflow-visible">

        {/* Jam kantor */}
        <div className="flex flex-shrink-0 items-center gap-1.5 text-xs text-[#C1ECD4]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 flex-shrink-0 text-[#A5D0B9]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{jam}</span>
        </div>

        {/* Pemisah */}
        <span className="flex-shrink-0 text-[#A5D0B9] select-none">·</span>

        {/* Telepon */}
        <div className="flex flex-shrink-0 items-center gap-1.5 text-xs text-[#C1ECD4]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 flex-shrink-0 text-[#A5D0B9]"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.58-1.58a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
          </svg>
          {site.kontak.telepon ? (
            <a
              href={`tel:${site.kontak.telepon}`}
              className="hover:text-[#D4A373] transition-colors"
            >
              {telp}
            </a>
          ) : (
            <span>{telp}</span>
          )}
        </div>

        {/* Pemisah — hanya di sm ke atas */}
        <span className="hidden sm:inline flex-shrink-0 text-[#A5D0B9] select-none">·</span>

        {/* Alamat — disembunyikan di HP */}
        <div className="hidden sm:flex flex-shrink-0 items-center gap-1.5 text-xs text-[#C1ECD4]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 flex-shrink-0 text-[#A5D0B9]"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{alamat}</span>
        </div>

      </div>
    </div>
  );
}
