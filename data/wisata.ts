export type Wisata = {
  id: string;
  nama: string;
  kategori: string;           // mis. "Wisata Alam"
  foto?: string;              // path di /public/images/wisata/ — opsional
  deskripsiSingkat: string;   // teks di kartu
  deskripsiLengkap?: string;  // teks di popup
  lokasi?: string;
};

// TODO: ganti dengan data wisata asli dari kantor kelurahan
export const wisata: Wisata[] = [
  {
    id: 'wisata-1',
    nama: 'Nama Wisata 1',
    kategori: 'Wisata Alam',
    // foto: '/images/wisata/wisata-1.jpg', // TODO: tambahkan foto asli
    deskripsiSingkat: 'Deskripsi menyusul.',
    deskripsiLengkap: 'Deskripsi lengkap menyusul.',
    // lokasi: '', // TODO: tambahkan lokasi asli
  },
  {
    id: 'wisata-2',
    nama: 'Nama Wisata 2',
    kategori: 'Wisata Alam',
    // foto: '/images/wisata/wisata-2.jpg', // TODO: tambahkan foto asli
    deskripsiSingkat: 'Deskripsi menyusul.',
    deskripsiLengkap: 'Deskripsi lengkap menyusul.',
  },
  {
    id: 'wisata-3',
    nama: 'Nama Wisata 3',
    kategori: 'Wisata Alam',
    // foto: '/images/wisata/wisata-3.jpg', // TODO: tambahkan foto asli
    deskripsiSingkat: 'Deskripsi menyusul.',
    deskripsiLengkap: 'Deskripsi lengkap menyusul.',
  },
  {
    id: 'wisata-4',
    nama: 'Nama Wisata 4',
    kategori: 'Wisata Alam',
    // foto: '/images/wisata/wisata-4.jpg', // TODO: tambahkan foto asli
    deskripsiSingkat: 'Deskripsi menyusul.',
    deskripsiLengkap: 'Deskripsi lengkap menyusul.',
  },
];
