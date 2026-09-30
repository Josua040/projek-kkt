import type { Metadata } from 'next';
import { site } from '@/data/site';
import MapWrapper from '@/components/MapWrapper';

export const metadata: Metadata = {
  title: `Kontak — ${site.nama}`,
  description: `Informasi kontak dan lokasi peta ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

// ---------------------------------------------------------------------------
// Helper: ikon SVG kecil untuk baris info kontak
// ---------------------------------------------------------------------------
function IconJalan() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconAlamat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconTelepon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.58-1.58a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
    </svg>
  );
}
function IconEmail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconJam() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Halaman utama
// ---------------------------------------------------------------------------
export default function KontakPage() {
  const { koordinat, nama, kecamatan, kota, kontak, jamKantor } = site;
  const [lat, lng] = koordinat;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <main className="overflow-x-hidden">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Kontak
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {nama} · {kecamatan} · {kota}
          </p>
        </div>
      </div>

      {/* ── Info kontak + Peta ─────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#1B4332] mb-6">
            Informasi Kontak &amp; Lokasi
          </h2>

          {/* Desktop: 2 kolom; HP: menumpuk */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">

            {/* ── Kartu info kontak ──────────────────────────────────── */}
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-sm space-y-4">
              {/* Jalan (opsional jika tersedia) */}
              {kontak.jalan && (
                <div className="flex items-start gap-3">
                  <IconJalan />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">
                      Jalan
                    </p>
                    <p className="mt-0.5 text-sm text-[#1C1C18]">
                      {kontak.jalan}
                    </p>
                  </div>
                </div>
              )}

              {/* Alamat lengkap */}
              <div className="flex items-start gap-3">
                <IconAlamat />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">
                    Alamat
                  </p>
                  <p className="mt-0.5 text-sm text-[#1C1C18] leading-relaxed">
                    {kontak.alamat ? `${kontak.alamat}, Kode Pos ${kontak.kodePos}` : 'Data menyusul'}
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start gap-3">
                <IconTelepon />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">
                    Telepon
                  </p>
                  {kontak.telepon ? (
                    <a
                      href={`tel:${kontak.telepon}`}
                      className="mt-0.5 block text-sm text-[#1B4332] underline hover:text-[#BC6C25] transition-colors"
                    >
                      {kontak.telepon}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm text-[#1C1C18]">Data menyusul</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <IconEmail />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">
                    Email
                  </p>
                  {kontak.email ? (
                    <a
                      href={`mailto:${kontak.email}`}
                      className="mt-0.5 block text-sm text-[#1B4332] underline hover:text-[#BC6C25] transition-colors break-all"
                    >
                      {kontak.email}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm text-[#1C1C18]">Data menyusul</p>
                  )}
                </div>
              </div>

              {/* Jam Pelayanan */}
              <div className="flex items-start gap-3">
                <IconJam />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">
                    Jam Pelayanan
                  </p>
                  <p className="mt-0.5 text-sm text-[#1C1C18]">
                    {jamKantor ?? 'Data menyusul'}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Peta Leaflet ───────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              {/* MapWrapper: dynamic import + ssr:false ada di dalamnya */}
              <MapWrapper
                center={koordinat}
                villageName={nama}
                subtitle={`${kecamatan}, ${kota}`}
              />

              {/* Tombol Google Maps */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B4332] px-5 py-2.5 text-sm font-semibold text-[#1B4332] transition hover:bg-[#1B4332] hover:text-white self-start"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-4 w-4" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Buka di Google Maps
              </a>

              <p className="text-xs text-[#414844]">
                Koordinat: {lat}, {lng} (perkiraan belum diverifikasi presisi)
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
