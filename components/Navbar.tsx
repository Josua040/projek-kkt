'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil Kelurahan' },
  { href: '/potensi', label: 'Potensi Wisata' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1B4332] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Brand — tiga logo berdampingan */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Beranda — Kelurahan Kumelembuay"
        >
          {/* Logo Unsrat */}
          <Image
            src="/images/logo/logo-unsrat.png"
            alt="Logo Universitas Sam Ratulangi"
            width={50}
            height={50}
            className="h-18 w-18 object-contain"
          />

          {/* Logo KKT Kumelembuay */}
          <Image
            src="/images/logo/logo-kkt.png"
            alt="Logo KKT Unsrat 149 Kumelembuay"
            width={50}
            height={50}
            className="h-16 w-16 object-contain"
          />

          {/* Logo Tomohon */}
          <Image
            src="/images/logo/logo-tomohon.png"
            alt="Logo Kota Tomohon"
            width={50}
            height={50}
            className="h-12 w-12 object-contain"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition hover:text-[#D4A373] ${isActive(link.href)
                  ? 'text-[#D4A373] underline underline-offset-4'
                  : ''
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button (HP only) */}
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded md:hidden"
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

      {/* Mobile dropdown panel */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#1B4332] md:hidden">
          <ul className="mx-auto max-w-6xl flex flex-col px-4 py-3 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-sm font-medium transition hover:text-[#D4A373] ${isActive(link.href)
                    ? 'text-[#D4A373] underline underline-offset-4'
                    : ''
                    }`}
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
