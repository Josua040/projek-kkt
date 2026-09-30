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
    deskripsiSingkat:
      "Panorama dari ketinggian dengan pemandangan Gunung Klabat dan momen matahari terbenam.",
    deskripsiLengkap:
      "Puncak Tetetana dikenal dengan daya tarik panorama dari ketinggian serta suasana taman dan ruang terbuka yang menjadi tempat masyarakat menikmati alam. Dari kawasan ini, pengunjung dapat melihat bentang alam yang luas, termasuk pemandangan Gunung Klabat dan kawasan sekitarnya. Salah satu momen yang menjadi daya tarik adalah pemandangan matahari terbenam, sehingga kawasan ini banyak dimanfaatkan sebagai tempat bersantai dan menikmati suasana sore. Keberadaan berbagai jenis bunga dan lanskap terbuka juga memberikan karakter tersendiri bagi Puncak Tetetana sebagai destinasi wisata alam di Kumelembuai.",
  },
  {
    id: "puncak-melbyls",
    nama: "Puncak Melby'Ls",
    kategori: "Wisata Alam",
    deskripsiSingkat:
      "Panorama perbukitan dengan suasana terbuka, udara sejuk, dan spot foto lanskap.",
    deskripsiLengkap:
      "Puncak Melby'Ls memiliki karakter wisata yang menonjolkan panorama alam dari kawasan perbukitan. Daya tarik utamanya terletak pada suasana terbuka dan pemandangan luas yang dapat dinikmati dari ketinggian. Kawasan ini cocok bagi pengunjung yang ingin menikmati udara sejuk, bersantai, menikmati lanskap alam, maupun mengabadikan pemandangan melalui fotografi. Keberadaan kawasan puncak dengan hamparan alam di sekitarnya menjadikan Melby'Ls sebagai salah satu lokasi yang potensial untuk menikmati suasana Kumelembuai dari perspektif yang berbeda.",
  },
  {
    id: "tuur-maasering",
    nama: "Tuur Ma'asering",
    kategori: "Budaya",
    deskripsiSingkat:
      "Wisata budaya aren: pengolahan air nira menjadi saguer dan Cap Tikus di tengah pondok kayu-bambu.",
    deskripsiLengkap:
      "Tuur Ma'asering merupakan destinasi wisata yang memadukan keindahan alam dengan kearifan lokal masyarakat Minahasa. Kawasan ini berada di tengah lingkungan pohon aren yang menjadi bagian penting dari kehidupan masyarakat setempat. Salah satu daya tarik utamanya adalah pengunjung dapat mengenal secara langsung proses pengolahan air nira menjadi saguer serta proses penyulingan yang menghasilkan minuman tradisional Cap Tikus. Selain itu, suasana wisata semakin khas dengan keberadaan pondok dan bangunan yang menggunakan material kayu dan bambu. Perpaduan antara hutan aren, tradisi pengolahan nira, serta suasana pedesaan menjadikan Tuur Ma'asering tidak hanya sebagai tempat rekreasi, tetapi juga ruang untuk mengenal budaya dan kearifan lokal masyarakat Kumelembuai.",
  },
  {
    id: "ranowawa-waterfall",
    nama: "Air Terjun Ranowawa",
    kategori: "Wisata Alam",
    deskripsiSingkat:
      "Air terjun alami yang sejuk dan tenang; tercatat dalam Rencana Induk Pariwisata Manado-Likupang.",
    deskripsiLengkap:
      "Air Terjun Ranowawa merupakan salah satu potensi wisata alam yang memiliki karakter berbeda dari destinasi puncak di Kumelembuai. Daya tarik utamanya adalah keberadaan air terjun yang berpadu dengan lingkungan alam yang masih alami, sehingga memberikan suasana sejuk dan tenang bagi pengunjung. Suara aliran air, pepohonan, serta kondisi lingkungan di sekitar air terjun menjadi bagian dari pengalaman wisata alam yang ditawarkan. Potensi Ranowawa dapat dikembangkan sebagai destinasi rekreasi berbasis alam sekaligus sebagai kawasan yang mengedepankan kelestarian lingkungan. Dalam dokumen Rencana Induk Pariwisata Manado-Likupang, Air Terjun Ranowawa juga tercatat sebagai salah satu daya tarik wisata alam di Tomohon Timur.",
  },
];