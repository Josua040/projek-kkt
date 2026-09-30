export type AnggotaTim = {
  nama: string;
  nim: string;
  jabatan: string; // mis. "Koordinator", "Sekretaris", "Anggota"
  foto?: string;
};

export type BidangTim = {
  bidang: string; // mis. "Inti Posko", "Bidang Infokom"
  anggota: AnggotaTim[];
};

export const timKkt = {
  angkatan: "KKT Unsrat Angkatan 149",
  lokasi: "Posko Kumelembuay, Kec. Tomohon Timur, Kota Tomohon",
  instagram: null as string | null, // TODO: isi link Instagram KKT

  kelompok: [
    {
      bidang: "Inti Posko",
      anggota: [
        { nama: "I Wayan Widhi Adnyana", nim: "230311060037", jabatan: "Koordinator Posko", foto: "/images/tim-kkt/wayan.jpeg" },
        { nama: "Maulidya R. Dewanti", nim: "230911010011", jabatan: "Sekretaris", foto: "/images/tim-kkt/maulidya.jpeg" },
        { nama: "Nadea Ibrahim", nim: "220611020696", jabatan: "Bendahara", foto: "/images/tim-kkt/nadea.jpeg" },
      ],
    },
    {
      bidang: "Bidang Infokom",
      anggota: [
        { nama: "Miccella G. Korompis", nim: "230111040089", jabatan: "Koordinator", foto: "/images/tim-kkt/miccella.jpeg" },
        { nama: "Nesa Mokoalu", nim: "230311090019", jabatan: "Anggota", foto: "/images/tim-kkt/nesa.jpeg" },
        { nama: "Stenny A. Lengkong", nim: "220211040111", jabatan: "Anggota", foto: "/images/tim-kkt/stenny.jpeg" },
        { nama: "Excella A. P. Waleleng", nim: "230211050004", jabatan: "Anggota", foto: "/images/tim-kkt/excella.jpeg" },
      ],
    },
    {
      bidang: "Bidang Program",
      anggota: [
        { nama: "Alfito L. J. Djindan", nim: "230311040089", jabatan: "Koordinator", foto: "/images/tim-kkt/alfito.jpeg" },
        { nama: "Lidya Pangemanan", nim: "230311040008", jabatan: "Anggota", foto: "/images/tim-kkt/lidya.jpeg" },
        { nama: "Civo E. Mandey", nim: "210211040024", jabatan: "Anggota", foto: "/images/tim-kkt/chivo.jpeg" },
        { nama: "Gabriella Christianti Diamare", nim: "230811060035", jabatan: "Anggota", foto: "/images/tim-kkt/gabriella.jpeg" },
      ],
    },
    {
      bidang: "Bidang Pelaporan",
      anggota: [
        { nama: "Yuliana D. D. Mansawan", nim: "230811030005", jabatan: "Koordinator", foto: "/images/tim-kkt/yuliana.jpeg" },
        { nama: "Natanail Piter", nim: "230311080019", jabatan: "Anggota", foto: "/images/tim-kkt/Piter.jpeg" },
        { nama: "Fernando J. Thadius", nim: "230211060111", jabatan: "Anggota", foto: "/images/tim-kkt/fernando.jpeg" },
      ],
    },
  ] as BidangTim[],
};