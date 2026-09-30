export type AnggotaKKT = {
  nama: string;
  prodi: string; // program studi
};

export type TimKKT = {
  periode: string | null;     // mis. "Agustus – September 2026"
  fotoTim: string | null;     // path di /public/images/tim-kkt/foto-tim.jpg
  anggota: AnggotaKKT[];
  instagram: string | null;
};

// TODO: data dari tim KKT (lengkapi setelah foto dan data anggota tersedia)
export const timKKT: TimKKT = {
  periode: null,   // TODO: isi periode KKT yang benar
  fotoTim: null,   // TODO: ganti dengan path foto tim, mis. '/images/tim-kkt/foto-tim.jpg'
  anggota: [],     // TODO: isi dengan nama dan prodi seluruh anggota tim KKT
  // TODO jika suatu saat berganti
  instagram: 'https://www.instagram.com/kkt149.kumelembuay?stkn=MTAycHBsdG9jNmh0Ng==',
};
