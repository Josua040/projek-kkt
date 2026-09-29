export type Wisata = {
  id: string;
  nama: string;
  kategori: string;
  foto?: string;
  deskripsiSingkat: string;
  deskripsiLengkap?: string;
  lokasi?: string;
};

export const wisata: Wisata[] = [
  {
    id: "puncak-tetetana",
    nama: "Puncak Tetetana",
    kategori: "Wisata Alam",
    deskripsiSingkat: "Deskripsi menyusul.", // TODO
  },
  {
    id: "puncak-melbyls",
    nama: "Puncak Melby'Ls",
    kategori: "Wisata Alam",
    deskripsiSingkat: "Deskripsi menyusul.", // TODO
  },
  {
    id: "tuur-maasering",
    nama: "Tuur Ma'asering",
    kategori: "Budaya",
    deskripsiSingkat: "Pelestarian budaya aren.",
    deskripsiLengkap: "Deskripsi lengkap menyusul.", // TODO
  },
  {
    id: "ranowawa-waterfall",
    nama: "Ranowawa Waterfall",
    kategori: "Wisata Alam",
    deskripsiSingkat: "Deskripsi menyusul.", // TODO
  },
];