'use client';

import { site } from '@/data/site';
import MapWrapper from '@/components/MapWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 1.22h3a2 2 0 0 1 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.58-1.58a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
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

export default function KontakContent() {
  const { lang } = useLanguage();
  const t = translations.kontak;
  const { koordinat, nama, kecamatan, kota, kontak } = site;
  const [lat, lng] = koordinat;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  const jamText =
    lang === 'id'
      ? site.jamKantor ?? t.dataMenyusul[lang]
      : 'Monday – Friday (08:00 – 16:00)';

  const alamatText =
    lang === 'id'
      ? (kontak.alamat ? `${kontak.alamat}, Kode Pos ${kontak.kodePos}` : t.dataMenyusul[lang])
      : (kontak.alamat ? `Neighborhood III, Kumelembuay Village, East Tomohon District, Tomohon City, Postal Code ${kontak.kodePos}` : t.dataMenyusul[lang]);

  return (
    <main className="overflow-x-hidden bg-[#FAF7F2]">
      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A5D0B9] text-xs font-semibold mb-3 tracking-wide">
            <span>{lang === 'id' ? 'Layanan & Lokasi' : 'Public Service & Location'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t.pageTitle[lang]}
          </h1>
          <p className="mt-2 text-[#A5D0B9] text-sm sm:text-base">
            {nama} · {kecamatan} · {kota}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl py-12 px-4 sm:px-6 space-y-12">
        {/* ── BAGIAN 1: KARTU INFORMASI KONTAK (DI ATAS) ───────────────── */}
        <section aria-labelledby="kontak-info-title">
          <div className="mb-6">
            <h2 id="kontak-info-title" className="text-2xl font-bold text-[#1B4332]">
              {t.infoTitle[lang]}
            </h2>
            <p className="mt-1 text-sm text-[#414844]">
              {lang === 'id'
                ? 'Saluran komunikasi dan informasi kantor Kelurahan Kumelembuay.'
                : 'Communication channels and office details for Kumelembuay Village.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu 1: Alamat */}
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF7F2] text-[#BC6C25] border border-[#BC6C25]/20">
                    <IconAlamat />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#BC6C25]">
                    {t.alamat[lang]}
                  </span>
                </div>
                {kontak.jalan && (
                  <div className="flex items-center gap-2 mb-2 text-[#1C1C18] font-semibold text-base">
                    <IconJalan />
                    <span>{kontak.jalan}</span>
                  </div>
                )}
                <p className="text-sm text-[#414844] leading-relaxed">
                  {alamatText}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-xs text-[#717873]">
                {lang === 'id' ? 'Tomohon Timur, Sulawesi Utara' : 'East Tomohon, North Sulawesi'}
              </div>
            </div>

            {/* Kartu 2: Telepon & Email */}
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF7F2] text-[#BC6C25] border border-[#BC6C25]/20">
                    <IconTelepon />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#BC6C25]">
                    {lang === 'id' ? 'Telepon & Email' : 'Phone & Email'}
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <IconTelepon />
                    <div>
                      <span className="text-xs font-medium text-[#717873] block">{t.telepon[lang]}</span>
                      {kontak.telepon ? (
                        <a
                          href={`tel:${kontak.telepon}`}
                          className="text-sm font-semibold text-[#1B4332] hover:text-[#BC6C25] transition-colors"
                        >
                          {kontak.telepon}
                        </a>
                      ) : (
                        <span className="text-sm text-[#414844]">{t.dataMenyusul[lang]}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <IconEmail />
                    <div>
                      <span className="text-xs font-medium text-[#717873] block">{t.email[lang]}</span>
                      {kontak.email ? (
                        <a
                          href={`mailto:${kontak.email}`}
                          className="text-sm font-semibold text-[#1B4332] hover:text-[#BC6C25] transition-colors break-all"
                        >
                          {kontak.email}
                        </a>
                      ) : (
                        <span className="text-sm text-[#414844]">{t.dataMenyusul[lang]}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-xs text-[#717873]">
                {lang === 'id' ? 'Respon cepat di jam kerja' : 'Fast response during work hours'}
              </div>
            </div>

            {/* Kartu 3: Jam Pelayanan */}
            <div className="rounded-2xl border border-[#C1C8C2] bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF7F2] text-[#BC6C25] border border-[#BC6C25]/20">
                    <IconJam />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#BC6C25]">
                    {t.jam[lang]}
                  </span>
                </div>
                <p className="font-semibold text-[#1C1C18] text-base mb-1">
                  {jamText}
                </p>
                <p className="text-sm text-[#414844] leading-relaxed">
                  {lang === 'id'
                    ? 'Sabtu, Minggu & Hari Libur Nasional tutup untuk pelayanan administrasi tatap muka.'
                    : 'Closed on Saturdays, Sundays, and national holidays for in-person administrative services.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
                  {lang === 'id' ? 'Pelayanan Publik Aktif' : 'Public Service Active'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BAGIAN 2: PETA WILAYAH KELURAHAN (DI BAWAH & BESAR) ──────── */}
        <section aria-labelledby="peta-wilayah-title" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="peta-wilayah-title" className="text-2xl font-bold text-[#1B4332]">
                {t.mapTitle[lang]}
              </h2>
              <p className="mt-1 text-sm text-[#414844] max-w-2xl leading-relaxed">
                {t.mapDesc[lang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:self-end">
              <span className="text-xs text-[#717873] bg-white px-3 py-1.5 rounded-full border border-[#C1C8C2]">
                {t.koordinatLabel[lang]}
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#2D6A4F] active:scale-95 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-4 w-4" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t.btnMaps[lang]}
              </a>
            </div>
          </div>

          {/* Kanvas Peta Besar Full Width */}
          <div className="w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-[#C1C8C2]">
            <MapWrapper
              center={koordinat}
              villageName={nama}
              subtitle={`${kecamatan}, ${kota}`}
            />
          </div>

          {/* Petunjuk & Fitur Peta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#717873]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#C1C8C2]/60">
                <span className="h-2 w-2 rounded-full bg-[#1B4332]" />
                {lang === 'id' ? 'Batas Wilayah Kelurahan' : 'Village Boundary'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#C1C8C2]/60">
                <span className="h-2 w-2 rounded-full bg-[#BC6C25]" />
                {lang === 'id' ? '7 Lingkungan' : '7 Neighborhoods'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#C1C8C2]/60">
                {lang === 'id' ? 'Mode Peta / Satelit & 3D' : 'Map / Satellite & 3D Mode'}
              </span>
            </div>
            <p className="italic">
              {lang === 'id'
                ? '*Gunakan 2 jari di HP untuk menggeser peta.'
                : '*Use 2 fingers on mobile to pan the map.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
