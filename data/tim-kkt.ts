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
        { nama: "I Wayan Widhi Adnyana", nim: "230311060037", jabatan: "Koordinator Posko" },
        { nama: "Maulidya R. Dewanti", nim: "230911010011", jabatan: "Sekretaris" },
        { nama: "Nadea Ibrahim", nim: "220611020696", jabatan: "Bendahara" },
      ],
    },
    {
      bidang: "Bidang Infokom",
      anggota: [
        { nama: "Miccella G. Korompis", nim: "230111040089", jabatan: "Koordinator" },
        { nama: "Nesa Mokoalu", nim: "230311090019", jabatan: "Anggota" },
        { nama: "Stenny A. Lengkong", nim: "220211040111", jabatan: "Anggota" },
        { nama: "Excella A. P. Waleleng", nim: "230211050004", jabatan: "Anggota" },
      ],
    },
    {
      bidang: "Bidang Program",
      anggota: [
        { nama: "Alfito L. J. Djindan", nim: "230311040089", jabatan: "Koordinator" },
        { nama: "Lidya Pangemanan", nim: "230311040008", jabatan: "Anggota" },
        { nama: "Civo E. Mandey", nim: "210211040024", jabatan: "Anggota" },
        { nama: "Gabriella Christianti Diamare", nim: "230811060035", jabatan: "Anggota" },
      ],
    },
    {
      bidang: "Bidang Pelaporan",
      anggota: [
        { nama: "Yuliana D. D. Mansawan", nim: "230811030005", jabatan: "Koordinator" },
        { nama: "Natanail Piter", nim: "230311080019", jabatan: "Anggota" },
        { nama: "Fernando J. Thadius", nim: "230211060111", jabatan: "Anggota" },
      ],
    },
  ] as BidangTim[],
};