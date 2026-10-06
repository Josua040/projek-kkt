'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full bg-[#1B4332]/8 p-0.5 border border-[#1B4332]/15 ${className}`}
      role="group"
      aria-label="Pilih Bahasa / Language Selection"
    >
      <button
        type="button"
        onClick={() => setLang('id')}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
          lang === 'id'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-[#1B4332] hover:bg-[#1B4332]/10'
        }`}
        aria-pressed={lang === 'id'}
        aria-label="Bahasa Indonesia"
      >
        <span className="text-[13px] leading-none select-none">🇮🇩</span>
        <span className="leading-none">ID</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-[#1B4332] text-white shadow-xs'
            : 'text-[#1B4332] hover:bg-[#1B4332]/10'
        }`}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        <span className="text-[13px] leading-none select-none">🇬🇧</span>
        <span className="leading-none">EN</span>
      </button>
    </div>
  );
}
