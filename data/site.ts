export const site = {
  nama: 'Kelurahan Kumelembuay',
  kecamatan: 'Tomohon Timur',
  kota: 'Kota Tomohon',
  provinsi: 'Sulawesi Utara',

  // TODO: data dari kantor kelurahan
  tahunBerdiri: null as number | null,

  // TODO: data dari kantor kelurahan (mis. "xx Ha")
  luasWilayah: null as string | null,

  // TODO: data dari kantor kelurahan (mis. "Pertanian")
  mataPencaharian: null as string | null,

  // TODO: data dari kantor kelurahan
  sambutanLurah: null as string | null,

  // TODO: data dari kantor kelurahan
  visiMisiKelurahan: null as { visi: string; misi: string[] } | null,

  // TODO: data dari kantor kelurahan
  visiMisiLurah: null as string | null,

  // TODO: data dari kantor kelurahan
  sejarah: null as string | null,

  kontak: {
    // TODO: data dari kantor kelurahan
    jalan: null as string | null,
    // TODO: data dari kantor kelurahan
    alamat: null as string | null,
    // TODO: data dari kantor kelurahan
    telepon: null as string | null,
    // TODO: data dari kantor kelurahan
    email: null as string | null,
  },

  // Koordinat Kelurahan Kumelembuay (diverifikasi)
  koordinat: [1.348327, 124.885225] as [number, number],

  // TODO: data dari kantor kelurahan
  jamKantor: null as string | null,       // mis. "Senin–Jumat, 08.00–16.00 WITA"

  // TODO: data dari kantor kelurahan
  teleponKantor: null as string | null,   // mis. "+62 431 xxxxxx"

  // TODO: data dari kantor kelurahan (satu baris ringkas untuk TopBar)
  alamatSingkat: null as string | null,   // mis. "Jl. Kumelembuay, Tomohon Timur"

  // TODO: ganti dengan foto pemandangan/kelurahan asli, taruh di public/images/profil/hero.jpg
  heroImage: '/images/profil/hero.jpg',
};
