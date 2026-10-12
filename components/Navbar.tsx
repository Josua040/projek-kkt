'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();

  const links = [
    { href: '/', label: translations.nav.beranda[lang] },
    { href: '/profil', label: translations.nav.profil[lang] },
    { href: '/potensi', label: translations.nav.potensi[lang] },
    { href: '/kontak', label: translations.nav.kontak[lang] },
    { href: '/tentang', label: translations.nav.tentang[lang] },
  ];

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    // Navbar sticky dengan glassmorphism latar krem dan border bawah tipis
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C1C8C2]/80 shadow-[0_2px_12px_rgba(27,67,50,0.04)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">

        {/* Brand — Tiga logo langsung tanpa border bulat agar tetap besar dan jelas */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3"
          aria-label={`${translations.nav.beranda[lang]} — ${site.nama}`}
        >
          {/* Trio Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Logo Unsrat */}
            <Image
              src="/images/logo/logo-unsrat.png"
              alt="Logo Universitas Sam Ratulangi"
              width={48}
              height={48}
              priority
              className="h-7 w-auto object-contain sm:h-9 transition-transform duration-200 group-hover:scale-105"
            />

            {/* Logo KKT Kumelembuay */}
            <Image
              src="/images/logo/logo-kkt.png"
              alt="Logo KKT Unsrat Kumelembuay"
              width={54}
              height={54}
              priority
              className="h-8.5 w-auto object-contain sm:h-11 transition-transform duration-200 group-hover:scale-105"
            />

            {/* Logo Tomohon */}
            <Image
              src="/images/logo/logo-tomohon.png"
              alt="Logo Kota Tomohon"
              width={48}
              height={48}
              priority
              className="h-7 w-auto object-contain sm:h-9 transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Label Nama Kelurahan */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-sm sm:text-base font-extrabold text-[#1B4332] leading-tight tracking-tight group-hover:text-[#BC6C25] transition-colors truncate">
              {site.nama.replace(/^Kelurahan\s+/i, '')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#64748B] leading-none mt-0.5 tracking-wide truncate hidden xs:inline">
              Kelurahan · {site.kecamatan}
            </span>
          </div>
        </Link>

        {/* Desktop menu + Language Switcher */}
        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1 rounded-full bg-white/80 p-1 border border-[#C1C8C2]/60 shadow-2xs backdrop-blur-xs text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-block rounded-full px-3.5 py-1.5 text-xs lg:text-sm font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'text-[#1B4332] hover:bg-[#1B4332]/8 hover:text-[#BC6C25]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Pemisah visual */}
          <div className="h-5 w-[1px] bg-[#C1C8C2]/80" aria-hidden="true" />

          {/* Desktop Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile controls (Language Switcher + Tactile Hamburger Button) */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />

          <button
            type="button"
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs ${
              isOpen
                ? 'bg-[#1B4332] text-white border-[#1B4332]'
                : 'bg-white text-[#1B4332] border-[#C1C8C2]/80 hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332]'
            }`}
            aria-label={isOpen ? translations.nav.ariaClose[lang] : translations.nav.ariaMenu[lang]}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              /* X icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {isOpen && (
        <div className="border-t border-[#C1C8C2]/70 bg-[#FAF7F2]/98 backdrop-blur-md md:hidden animate-showcase shadow-lg">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6 space-y-1.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white/60 hover:bg-white text-[#1B4332] border border-[#C1C8C2]/40 hover:shadow-2xs'
                }`}
              >
                <span>{link.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform ${
                    isActive(link.href) ? 'text-white' : 'text-[#BC6C25]'
                  }`}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ))}

            {/* Ringkasan kontak cepat di dalam menu mobile */}
            <div className="mt-3 pt-3 border-t border-[#C1C8C2]/50 text-xs text-[#414844] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1B4332]">
                  {lang === 'id' ? 'Jam Pelayanan:' : 'Office Hours:'}
                </span>
                <span>{site.jamKantor ?? 'Senin – Jumat (08.00 – 16.00)'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1B4332]">
                  {lang === 'id' ? 'Kontak Kantor:' : 'Contact:'}
                </span>
                <a
                  href={`tel:${site.kontak.telepon}`}
                  className="text-[#BC6C25] font-semibold hover:underline"
                >
                  {site.kontak.telepon}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
