export type PejabatInti = {
  nama: string;
  jabatan: string;
  nip?: string;
  foto?: string;
};

export type Lingkungan = {
  nama: string;
  kepala: string;
  wakil: string;
};

export const pejabatInti: PejabatInti[] = [
  {
    nama: "Audi Pangemanan, S.Kep.",
    jabatan: "Lurah",
    nip: "197408011994031004",
    foto: "/images/pemerintahan/lurah.jpg",
  },
  { nama: "Franly Y. Kaunang, SST.", jabatan: "Sekretaris" },
  { nama: "Fredy N. H. Paat", jabatan: "Kepala Seksi Kesejahteraan" },
  { nama: "Jefry Pangemanan, AMK.", jabatan: "Staf" },
];

export const lingkungan: Lingkungan[] = [
  { nama: "Lingkungan I", kepala: "Wilhelmus Kapoh", wakil: "Ferdi Pangemanan" },
  { nama: "Lingkungan II", kepala: "Adri Solang", wakil: "Agus Pitoy" },
  { nama: "Lingkungan III", kepala: "Lexi Maxi Runtuwalian", wakil: "Yan Frits Moningka" },
  { nama: "Lingkungan IV", kepala: "Yoseph Pangemanan", wakil: "Junita Terok" },
  { nama: "Lingkungan V", kepala: "Bennie Ponto", wakil: "Josep Aror" },
  { nama: "Lingkungan VI", kepala: "Elsye Ratag", wakil: "Mykhael Muhonis" },
  { nama: "Lingkungan VII", kepala: "Jeanne Mokoagouw", wakil: "Fence Victor Pitoy" },
];