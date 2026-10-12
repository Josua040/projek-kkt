export type PejabatInti = {
  nama: string;
  jabatan: string;
  nip?: string;
  foto?: string;
  fotoPosisi?: string;
  fotoTransform?: string;
};

export type Lingkungan = {
  nama: string;
  kepala: string;
  wakil: string;
  koordinat?: [number, number]; // [lat, lng] WGS84, dari data PWK
};

export const pejabatInti: PejabatInti[] = [
  {
    nama: "Audi Pangemanan, S.Kep.",
    jabatan: "Lurah",
    nip: "197408011994031004",
    foto: "/images/pemerintahan/lurah.jpg",
  },
  {
    nama: "Franly Y. Kaunang, SST.",
    jabatan: "Sekretaris",
    foto: "/images/pemerintahan/franly-kaunang.jpg",
  },
  {
    nama: "Fredy N. H. Paat",
    jabatan: "Kepala Seksi Kesejahteraan",
    foto: "/images/pemerintahan/fredy-paat.jpeg",
    fotoPosisi: "center 15%",
    fotoTransform: "translateY(5px) scale(0.95)",
  },
  {
    nama: "Jefry Pangemanan, AMK.",
    jabatan: "Staf",
    foto: "/images/pemerintahan/jefry-pangemanan.jpeg",
  },
];

export const lingkungan: Lingkungan[] = [
  { nama: "Lingkungan I", kepala: "Wilhelmus Kapoh", wakil: "Ferdi Pangemanan", koordinat: [1.349042, 124.888745] },
  { nama: "Lingkungan II", kepala: "Adri Solang", wakil: "Agus Pitoy", koordinat: [1.349124, 124.887743] },
  { nama: "Lingkungan III", kepala: "Lexi Maxi Runtuwalian", wakil: "Yan Frits Moningka", koordinat: [1.349727, 124.886785] },
  { nama: "Lingkungan IV", kepala: "Yoseph Pangemanan", wakil: "Junita Terok", koordinat: [1.348261, 124.886823] },
  { nama: "Lingkungan V", kepala: "Bennie Ponto", wakil: "Josep Aror", koordinat: [1.350522, 124.885522] },
  { nama: "Lingkungan VI", kepala: "Elsye Ratag", wakil: "Mykhael Muhonis", koordinat: [1.349112, 124.885725] },
  { nama: "Lingkungan VII", kepala: "Jeanne Mokoagouw", wakil: "Fence Victor Pitoy", koordinat: [1.351567, 124.885744] },
];