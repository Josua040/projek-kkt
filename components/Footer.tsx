import Link from 'next/link';

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

        <p className="mt-8 border-t border-white/10 pt-4 text-xs text-[#a5d0b9]">
          © {new Date().getFullYear()} Website profil kelurahan ini dibuat untuk program kerja KKT 149 Kumelembuay Unsrat.
        </p>
      </div>
    </footer>
  );
}
