import Image from 'next/image';
import type { PejabatInti } from '@/data/pemerintahan';

interface PerangkatCardProps {
  pejabat: PejabatInti;
  /** Menandai kartu Lurah agar tampil lebih menonjol */
  isLurah?: boolean;
}

export default function PerangkatCard({ pejabat, isLurah = false }: PerangkatCardProps) {
  const { nama, jabatan, foto } = pejabat;

  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border border-[#C1C8C2] bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        isLurah ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20' : ''
      }`}
    >
      {/* Foto bulat */}
      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#C1C8C2] flex-shrink-0">
        {foto ? (
          <Image
            src={foto}
            alt={`Foto ${nama}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          /* Placeholder abu-abu dengan inisial */
          <div className="flex h-full w-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-12 w-12 text-[#8a9490]"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <p className={`font-semibold leading-snug ${isLurah ? 'text-[#1B4332] text-base' : 'text-[#1C1C18] text-sm'}`}>
          {nama}
        </p>
        {pejabat.nip && (
          <p className="text-xs text-[#717774] font-medium tracking-wide">
            NIP. {pejabat.nip}
          </p>
        )}
        <p className={`mt-0.5 ${isLurah ? 'text-sm font-medium text-[#BC6C25]' : 'text-xs text-[#414844]'}`}>
          {jabatan}
        </p>
      </div>
    </div>
  );
}
