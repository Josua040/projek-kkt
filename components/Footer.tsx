import Link from 'next/link';
import { timKKT } from '@/data/tim-kkt';

const navLinks = [
  { href: '/profil', label: 'Profil Kelurahan' },
  { href: '/potensi', label: 'Potensi Wisata' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/tentang', label: 'Tentang Kami' },
];

export default function Footer() {
  return (
    <footer className="bg-[#012d1d] text-[#dff4ff]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Identitas */}
          <div>
            <h3 className="mb-2 text-base font-bold">Kelurahan Kumelembuay</h3>
            <p className="text-sm text-[#a5d0b9]">
              Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#a5d0b9]">
              Navigasi
            </h4>
            <ul className="space-y-1 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-[#D4A373]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#a5d0b9]">
              Kontak
            </h4>
            <p className="text-sm">Kantor Kelurahan Kumelembuay</p>
            <p className="text-sm">Kecamatan Tomohon Timur, Kota Tomohon</p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a5d0b9]">
          <p>
            © {new Date().getFullYear()} Website profil kelurahan ini dibuat untuk program kerja KKT 149 Kumelembuay Unsrat.
          </p>
          {timKKT.instagram && (
            <a
              href={timKKT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Tim KKT"
              className="flex items-center gap-1.5 text-[#a5d0b9] transition hover:text-[#D4A373] p-1 rounded focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="sm:hidden font-medium">Instagram Tim KKT</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
