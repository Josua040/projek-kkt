'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/data/site';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil Kelurahan' },
  { href: '/potensi', label: 'Potensi Wisata' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/tentang', label: 'Tentang Kami' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    // Navbar sticky dengan latar krem #FAF7F2 dan border bawah tipis
    <header className="sticky top-0 z-50 bg-[#FAF7F2] border-b border-[#C1C8C2] shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Brand — tiga logo dalam kontainer bordered */}
        <Link
          href="/"
          className="flex items-center"
          aria-label={`Beranda — ${site.nama}`}
        >
          <div className="flex items-center gap-2 px-1 py-0.5">

            {/* Logo Unsrat — border biru/ungu sesuai warna logo Unsrat */}
            <div className="flex items-center justify-center rounded-full border-2 border-[#3B3F8C] p-1">
              <Image
                src="/images/logo/logo-unsrat.png"
                alt="Logo Universitas Sam Ratulangi"
                width={50}
                height={50}
                className="h-7 w-auto object-contain sm:h-9"
              />
            </div>

            {/* Logo KKT Kumelembuay — border hijau hutan sesuai warna logo KKT, sedikit lebih besar */}
            <div className="flex items-center justify-center rounded-full border-2 border-[#2D6A4F] p-1">
              <Image
                src="/images/logo/logo-kkt.png"
                alt="Logo KKT Unsrat 149 Kumelembuay"
                width={50}
                height={50}
                className="h-9 w-auto object-contain sm:h-11"
              />
            </div>

            {/* Logo Tomohon — border merah tua sesuai warna logo Tomohon */}
            <div className="flex items-center justify-center rounded-full border-2 border-[#7B1D1D] p-1">
              <Image
                src="/images/logo/logo-tomohon.png"
                alt="Logo Kota Tomohon"
                width={50}
                height={50}
                className="h-7 w-auto object-contain sm:h-9"
              />
            </div>

          </div>
        </Link>

        {/* Desktop menu — aktif: pill solid hijau tua */}
        <ul className="hidden gap-2 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive(link.href)
                    ? 'rounded-full bg-[#1B4332] px-4 py-1.5 text-white transition-colors'
                    : 'rounded-full px-4 py-1.5 text-[#1B4332] transition-colors hover:bg-[#1B4332]/10'
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button (HP only) — ikon hijau tua */}
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-[#1B4332] md:hidden"
          aria-label="Buka menu navigasi"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            /* X icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown panel — latar krem #FAF7F2, teks hijau tua */}
      {isOpen && (
        <div className="border-t border-[#C1C8C2] bg-[#FAF7F2] md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    isActive(link.href)
                      ? 'block rounded-full border border-[#1B4332] bg-[#1B4332] px-4 py-2 text-sm font-medium text-white transition-colors'
                      : 'block rounded-full px-4 py-2 text-sm font-medium text-[#1B4332] transition-colors hover:bg-[#1B4332]/10'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
