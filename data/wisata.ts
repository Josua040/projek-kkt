export type Wisata = {
  id: string;
  nama: string;
  kategori: string;           // mis. "Wisata Alam"
  foto: string;               // path di /public/images/wisata/
  deskripsiSingkat: string;   // teks di kartu
  deskripsiLengkap?: string;  // teks di popup
  lokasi?: string;
};

// TODO: data dari kantor kelurahan (nama, foto, dan deskripsi 4 wisata)
export const wisata: Wisata[] = [];
