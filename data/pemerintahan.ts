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
  koordinat?: [number, number];
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
  { nama: "Lingkungan I", kepala: "Wilhelmus Kapoh", wakil: "Ferdi Pangemanan", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan II", kepala: "Adri Solang", wakil: "Agus Pitoy", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan III", kepala: "Lexi Maxi Runtuwalian", wakil: "Yan Frits Moningka", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan IV", kepala: "Yoseph Pangemanan", wakil: "Junita Terok", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan V", kepala: "Bennie Ponto", wakil: "Josep Aror", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan VI", kepala: "Elsye Ratag", wakil: "Mykhael Muhonis", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
  { nama: "Lingkungan VII", kepala: "Jeanne Mokoagouw", wakil: "Fence Victor Pitoy", koordinat: undefined }, // TODO: koordinat dari PWK/Lurah
];