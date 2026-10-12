'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-xl bg-white p-0.5 border border-[#C1C8C2]/80 shadow-2xs ${className}`}
      role="group"
      aria-label="Pilih Bahasa / Language Selection"
    >
      <button
        type="button"
        onClick={() => setLang('id')}
        className={`flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
          lang === 'id'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-[#1B4332] hover:bg-[#1B4332]/8'
        }`}
        aria-pressed={lang === 'id'}
        aria-label="Bahasa Indonesia"
      >
        <span className="text-[12px] sm:text-[13px] leading-none select-none">🇮🇩</span>
        <span className="leading-none text-[11px] sm:text-xs">ID</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
          lang === 'en'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-[#1B4332] hover:bg-[#1B4332]/8'
        }`}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        <span className="text-[12px] sm:text-[13px] leading-none select-none">🇬🇧</span>
        <span className="leading-none text-[11px] sm:text-xs">EN</span>
      </button>
    </div>
  );
}
