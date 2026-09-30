import Image from 'next/image';
import type { AnggotaTim } from '@/data/tim-kkt';

interface AnggotaCardProps {
  anggota: AnggotaTim;
  isInti?: boolean;
}

export default function AnggotaCard({ anggota, isInti = false }: AnggotaCardProps) {
  const isLeader =
    anggota.jabatan.toLowerCase().includes('koordinator') ||
    anggota.jabatan.toLowerCase().includes('sekretaris') ||
    anggota.jabatan.toLowerCase().includes('bendahara');

  return (
    <div
      className={`rounded-2xl border border-[#C1C8C2] bg-white p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        isInti ? 'ring-1 ring-[#1B4332]/15 sm:p-5' : ''
      }`}
    >
      <div>
        {/* Foto / Placeholder persegi rounded */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#C1C8C2] mb-3 flex items-center justify-center">
          {anggota.foto ? (
            <Image
              src={anggota.foto}
              alt={`Foto ${anggota.nama}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 p-2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 sm:h-12 sm:w-12 text-[#8a9490]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[10px] sm:text-xs text-[#8a9490] font-medium">
                Foto menyusul
              </span>
            </div>
          )}
        </div>

        {/* Badge Jabatan */}
        <div className="mb-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold tracking-wide ${
              isLeader
                ? 'bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/25'
                : 'bg-[#BC6C25]/10 text-[#BC6C25] border border-[#BC6C25]/25'
            }`}
          >
            {anggota.jabatan}
          </span>
        </div>

        {/* Nama */}
        <h4 className="text-sm sm:text-base font-bold text-[#1C1C18] leading-snug">
          {anggota.nama}
        </h4>
      </div>

      {/* NIM */}
      <p className="mt-2 pt-2 border-t border-[#E5E7EB] text-[11px] sm:text-xs text-[#414844] font-medium">
        NIM: <span className="text-[#1C1C18]">{anggota.nim}</span>
      </p>
    </div>
  );
}
