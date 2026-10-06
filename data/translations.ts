import { site } from '@/data/site';

export const translations = {
  // ── Navigasi & Header ──────────────────────────────────────────────
  nav: {
    beranda: { id: 'Beranda', en: 'Home' },
    profil: { id: 'Profil Kelurahan', en: 'Village Profile' },
    potensi: { id: 'Potensi Wisata', en: 'Tourism Potential' },
    kontak: { id: 'Kontak', en: 'Contact' },
    tentang: { id: 'Tentang Kami', en: 'About Us' },
    ariaMenu: { id: 'Buka menu navigasi', en: 'Open navigation menu' },
    ariaClose: { id: 'Tutup menu navigasi', en: 'Close navigation menu' },
  },

  // ── TopBar ──────────────────────────────────────────────────────────
  topbar: {
    jamKantor: {
      id: site.jamKantor ?? 'Senin – Jumat (08.00 – 16.00)',
      en: 'Mon – Fri (08:00 – 16:00)',
    },
    alamat: {
      id: site.kontak.alamat ?? 'Lingkungan III, Kumelembuay, Tomohon Timur',
      en: 'Neighborhood III, Kumelembuay, East Tomohon',
    },
    menyusul: { id: 'Menyusul', en: 'TBA' },
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    namaKelurahan: { id: 'Kelurahan Kumelembuay', en: 'Kumelembuay Village' },
    alamatLengkap: {
      id: 'Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara.',
      en: 'East Tomohon District, Tomohon City, North Sulawesi, Indonesia.',
    },
    navigasiTitle: { id: 'Navigasi', en: 'Navigation' },
    kontakTitle: { id: 'Kontak', en: 'Contact' },
    kantor: { id: 'Kantor Kelurahan Kumelembuay', en: 'Kumelembuay Village Office' },
    kecamatanKota: { id: 'Kecamatan Tomohon Timur, Kota Tomohon', en: 'East Tomohon District, Tomohon City' },
    copyright: {
      id: 'Program kerja KKT 149 Kumelembuay Unsrat.',
      en: 'KKT 149 Kumelembuay Unsrat Work Program.',
    },
    instagramLabel: { id: 'Instagram Tim KKT', en: 'KKT Team Instagram' },
  },

  // ── Halaman Beranda (Home) ──────────────────────────────────────────
  beranda: {
    badge: { id: 'Selamat Datang di Portal Resmi', en: 'Welcome to the Official Portal' },
    wilayahSub: { id: 'Kecamatan Tomohon Timur · Kota Tomohon', en: 'East Tomohon District · Tomohon City' },
    heroTitle: {
      id: 'Mengenal Lebih Dekat Kelurahan Kumelembuay',
      en: 'Discover Kumelembuay Village Closer',
    },
    heroDesc: {
      id: 'Profil dan potensi wisata Kelurahan Kumelembuay dari lereng Gunung Mahawu untuk warga dan pengunjung.',
      en: 'Village profile and tourism potential of Kumelembuay from the slopes of Mount Mahawu for residents and travelers.',
    },
    btnPotensi: { id: 'Jelajahi Potensi', en: 'Explore Potential' },
    btnProfil: { id: 'Lihat Profil Kelurahan', en: 'View Village Profile' },

    // Statistik Floating Bar
    statPenduduk: { id: 'Jiwa Penduduk', en: 'Residents' },
    statWilayah: { id: 'Hektar Wilayah', en: 'Hectares of Land' },
    statTahun: { id: 'Tahun Berdiri', en: 'Year Founded' },
    statMataPencaharian: { id: 'Petani & Agraris', en: 'Farmers & Agriculture' },

    // Kartu Jelajah
    jelajahTitle: { id: 'Jelajahi Kumelembuay', en: 'Explore Kumelembuay' },
    jelajahCards: [
      {
        href: '/profil',
        title: { id: 'Profil Kelurahan', en: 'Village Profile' },
        desc: {
          id: 'Sejarah, visi-misi, dan struktur pemerintahan Kelurahan Kumelembuay.',
          en: 'History, vision & mission, and government structure of Kumelembuay Village.',
        },
      },
      {
        href: '/potensi',
        title: { id: 'Potensi Wisata', en: 'Tourism Potential' },
        desc: {
          id: 'Tempat-tempat wisata unggulan di Kelurahan Kumelembuay.',
          en: 'Featured prime tourist and ecotourism destinations in Kumelembuay Village.',
        },
      },
      {
        href: '/kontak',
        title: { id: 'Kontak', en: 'Contact' },
        desc: {
          id: 'Alamat, nomor telepon, dan lokasi Kantor Kelurahan Kumelembuay.',
          en: 'Address, telephone numbers, and location map of Kumelembuay Village Office.',
        },
      },
    ],

    // Sambutan Lurah
    sambutanTitle: { id: 'Sambutan Lurah', en: "Village Head's Welcome" },
    sambutanText: {
      id: site.sambutanLurah,
      en: 'Welcome to the official profile page of Kumelembuay Village, East Tomohon District. Kumelembuay is not merely a geographic territory, but part of a community journey that has grown alongside history, culture, and shared values passed down through generations.',
    },
    lurahJabatan: {
      id: 'Lurah Kelurahan Kumelembuai',
      en: 'Head of Kumelembuay Village',
    },
  },

  // ── Halaman Profil ──────────────────────────────────────────────────
  profil: {
    pageTitle: { id: 'Profil Kelurahan', en: 'Village Profile' },
    sejarahTitle: { id: 'Asal Usul & Sejarah', en: 'Origins & History' },
    sejarahText: {
      id: site.sejarah,
      en: 'Kumelembuay Village, located in East Tomohon District, Tomohon City, was born from the local wisdom of the Tombulu sub-ethnic group, one of the indigenous communities of Minahasa. Etymologically, the name Kumelembuai originates from root words in the Minahasa regional language: makelembuang or kumelembubu, which signify "gushing water", "bubbling water", or resembling "boiling water". This evocative naming directly honors historical geography, when the foothill area of Mount Mahawu and Tintingon was blessed with pure natural springs that surged and bubbled from the earth. Captivated by this fertile soil and bountiful water, the ancestors founded settlements (wanua) here, making these freshwater springs the center of their agricultural and communal life. Over the decades, the settlement evolved under the governance of walak Tomohon before becoming the modern village of today. Today, Kumelembuay is celebrated not only as a productive agricultural heartland, but also as a premier ecotourism and cultural destination in Tomohon City, highlighted by Tetetana Peak, Melby\'Ls Peak, and the preservation of sugar palm tradition at Tuur Ma\'asering.',
    },
    visiMisiTitle: { id: 'Visi dan Misi', en: 'Vision and Mission' },
    visiMisiDesc: {
      id: 'Kecamatan Tomohon Timur dan Kelurahan Kumelembuay berpedoman pada Visi dan Misi Pemerintah Kota Tomohon.',
      en: 'East Tomohon District and Kumelembuay Village are guided by the Vision and Mission of the Tomohon City Government.',
    },
    visiTag: { id: 'Visi Kota Tomohon', en: 'Vision of Tomohon City' },
    visiQuote: {
      id: 'Tomohon Maju, Berdaya Saing, dan Sejahtera',
      en: 'Tomohon: Advanced, Competitive, and Prosperous',
    },
    misiTag: { id: 'Misi Kota Tomohon', en: 'Mission of Tomohon City' },
    misiList: [
      {
        id: 'Menjaga dan melestarikan Kota Tomohon sebagai kota yang religius dan berbudaya.',
        en: 'Preserve and uphold Tomohon City as a religious and culturally vibrant city.',
      },
      {
        id: 'Mengembangkan ketahanan pangan serta pembangunan yang berwawasan lingkungan.',
        en: 'Develop food security and environmentally conscious, sustainable growth.',
      },
      {
        id: 'Menjadikan Tomohon sebagai kota wisata dunia.',
        en: 'Establish Tomohon as an internationally renowned world-class tourist destination.',
      },
      {
        id: 'Mewujudkan tata kelola pemerintahan yang berintegritas, adaptif, dan responsif.',
        en: 'Build governance grounded in integrity, adaptability, and responsive service.',
      },
      {
        id: 'Meningkatkan kesejahteraan masyarakat secara menyeluruh.',
        en: 'Enhance comprehensive community welfare and living standards.',
      },
    ],

    narasiTitle: { id: 'Narasi Lurah', en: "Village Head's Address" },
    narasiHeading: {
      id: 'KUMELEMBUAI: IDENTITAS, POTENSI, DAN KEBERSAMAAN',
      en: 'KUMELEMBUAI: IDENTITY, POTENTIAL, AND COMMUNITY',
    },
    narasiTagline: {
      id: 'Menjaga Warisan, Mengembangkan Potensi, Menatap Masa Depan.',
      en: 'Preserving Heritage, Cultivating Potential, Looking Toward the Future.',
    },
    narasiParagraf: [
      {
        id: 'Salam sejahtera bagi seluruh masyarakat Kelurahan Kumelembuai dan para pengunjung yang budiman.',
        en: 'Warm greetings to the people of Kumelembuay Village and to all esteemed visitors.',
      },
      {
        id: 'Selamat datang di laman profil Kelurahan Kumelembuai, Kecamatan Tomohon Timur. Kumelembuai bukan sekadar sebuah wilayah, tetapi merupakan bagian dari perjalanan kehidupan masyarakat yang tumbuh bersama sejarah, budaya, dan nilai-nilai kebersamaan yang terus diwariskan dari generasi ke generasi.',
        en: 'Welcome to the official profile page of Kumelembuay Village, East Tomohon District. Kumelembuay is not merely a territory, but part of a living communal journey that thrives with history, culture, and values passed down across generations.',
      },
      {
        id: 'Melalui laman ini, kami memperkenalkan Kumelembuai melalui berbagai informasi mengenai sejarah dan perkembangan kelurahan, kondisi kependudukan, mata pencaharian masyarakat, serta potensi lokal yang menjadi bagian penting dari identitas Kumelembuai. Setiap data dan informasi yang disajikan merupakan gambaran mengenai kehidupan masyarakat serta potensi yang dimiliki kelurahan.',
        en: 'Through this portal, we introduce Kumelembuay with comprehensive information regarding our history, demographics, livelihoods, and local resources that shape our identity. Every detail reflects our collective life and authentic village potential.',
      },
      {
        id: 'Di tengah perkembangan zaman, Kumelembuai terus menjaga nilai-nilai yang menjadi kekuatannya, sembari mengembangkan berbagai potensi yang dimiliki masyarakat dan lingkungan. Dengan mengenal sejarah, memahami kondisi hari ini, dan menggali potensi yang ada, kita dapat bersama-sama melihat arah perkembangan Kumelembuai di masa yang akan datang.',
        en: 'In an era of rapid progress, Kumelembuay steadfastly protects the values that form our strength, while fostering opportunities within our community and environment. By knowing our history, understanding our present, and exploring local potential, we together shape Kumelembuay’s bright future.',
      },
    ],

    petaTitle: { id: 'Peta Wilayah', en: 'Territory Map' },
    petaPlaceholder: { id: 'Peta wilayah menyusul', en: 'Territory map coming soon' },
    petaDesc: {
      id: `Peta wilayah ${site.nama} akan ditampilkan di sini setelah gambar dari kantor kelurahan tersedia.`,
      en: `Territory map of ${site.nama} will be displayed here once verified documents from the village office are ready.`,
    },
  },

  // ── Struktur Pemerintahan ───────────────────────────────────────────
  struktur: {
    badgeTitle: { id: 'Struktur Pemerintahan', en: 'Government Structure' },
    heading: { id: 'Pemerintah & Perangkat Kelurahan', en: 'Government & Village Officials' },
    desc: {
      id: `Aparatur kelurahan berintegritas tinggi yang mengemban mandat pelayanan masyarakat dan tata kelola pemerintahan ${site.nama}.`,
      en: `Dedicated village administration committed to public service excellence and sound governance in ${site.nama}.`,
    },
    badgeAktif: { id: 'Aparatur Aktif Melayani', en: 'Actively Serving the Community' },
    kantorKelurahan: { id: 'Kantor Kelurahan', en: 'Village Office' },
    sekretariatKelurahan: { id: 'Sekretariat Kelurahan', en: 'Village Secretariat' },
    statusAktif: { id: 'Aktif', en: 'Active' },
    aktifMelayani: { id: 'Aktif Melayani', en: 'Actively Serving' },
    pelaksanaTitle: { id: 'Pelaksana Teknis & Tata Usaha', en: 'Technical & Administrative Staff' },
    wilayahTitle: { id: 'Wilayah & Kemasyarakatan', en: 'Neighborhoods & Community Affairs' },
    kepalaLingkunganTitle: { id: 'Kepala & Wakil Kepala Lingkungan', en: 'Heads & Deputy Heads of Neighborhoods' },
    kepalaLingkunganDesc: {
      id: `Aparatur pelayanan masyarakat pada 7 lingkungan di Kelurahan ${site.nama}.`,
      en: `Grassroots community service leaders across the 7 neighborhoods of ${site.nama}.`,
    },
    badgeWilayah: { id: 'Wilayah', en: 'Neighborhood' },
    labelKepala: { id: 'Kepala:', en: 'Head:' },
    labelWakil: { id: 'Wakil:', en: 'Deputy:' },

    // Role translations
    roles: {
      'Lurah': { id: 'Lurah', en: 'Village Head' },
      'Sekretaris': { id: 'Sekretaris', en: 'Village Secretary' },
      'Kepala Seksi Kesejahteraan': { id: 'Kepala Seksi Kesejahteraan', en: 'Head of Social Welfare Section' },
      'Staf': { id: 'Staf', en: 'Administrative Staff' },
    },
    descriptions: {
      lurah: {
        id: 'Penanggung Jawab Umum Pemerintahan Kelurahan',
        en: 'Chief Executive of Village Governance & Public Affairs',
      },
      sekretaris: {
        id: 'Koordinator Administrasi, Keuangan & Pelayanan',
        en: 'Coordinator of Administration, Finance & Public Services',
      },
      kesejahteraan: {
        id: 'Bantuan Sosial, Kesehatan & Kesejahteraan Warga',
        en: 'Social Assistance, Health & Citizen Welfare Programs',
      },
      staf: {
        id: 'Pelaksana Teknis & Administrasi Kelurahan',
        en: 'Technical Support & Administrative Operations',
      },
    },
  },

  // ── Halaman Potensi Wisata ──────────────────────────────────────────
  potensi: {
    pageTitle: { id: 'Potensi Wisata', en: 'Tourism Potential' },
    pageDesc: {
      id: 'Kelurahan Kumelembuay menyimpan berbagai potensi wisata alam yang menakjubkan. Klik kartu wisata untuk melihat informasi lebih lengkap.',
      en: 'Kumelembuay Village is blessed with stunning ecotourism and rich cultural heritage. Click any destination card to view detailed visitor information.',
    },
    badge: { id: 'Destinasi Unggulan', en: 'Featured Destinations' },
    selectPrompt: {
      id: 'Pilih salah satu destinasi di bawah untuk membuka eksplorasi interaktif.',
      en: 'Select any destination below to open the interactive showcase.',
    },
    activeBadge: { id: 'Sedang Ditampilkan', en: 'Currently Viewing' },
    btnExplore: { id: 'Buka Eksplorasi', en: 'Explore Details' },
    btnCollapse: { id: 'Sembunyikan Rincian', en: 'Hide Details' },
    btnMaps: { id: 'Buka di Google Maps', en: 'Open in Google Maps' },
    highlightTitle: { id: 'Daya Tarik & Karakter Wisata', en: 'Key Highlights & Features' },
    btnPrev: { id: 'Sebelumnya', en: 'Previous' },
    btnNext: { id: 'Berikutnya', en: 'Next' },
    lokasiLabel: { id: 'Lokasi Destinasi', en: 'Destination Location' },
    ariaCard: { id: 'Lihat detail', en: 'View details for' },
    ariaClose: { id: 'Tutup tampilan', en: 'Close view' },
    items: [
      {
        id: 'puncak-tetetana',
        nama: { id: 'Puncak Tetetana', en: 'Tetetana Peak' },
        kategori: { id: 'Wisata Alam', en: 'Nature Tourism' },
        highlights: [
          { id: 'Panorama Gunung Klabat', en: 'Mount Klabat Panorama' },
          { id: 'Momen Sunset Emas', en: 'Golden Hour Sunset' },
          { id: 'Taman Bunga Terbuka', en: 'Open Flower Garden' },
        ],
        deskripsiSingkat: {
          id: 'Panorama dari ketinggian dengan pemandangan Gunung Klabat dan momen matahari terbenam.',
          en: 'Elevated panorama with scenic vistas of Mount Klabat and breathtaking sunset moments.',
        },
        deskripsiLengkap: {
          id: 'Puncak Tetetana dikenal dengan daya tarik panorama dari ketinggian serta suasana taman dan ruang terbuka yang menjadi tempat masyarakat menikmati alam. Dari kawasan ini, pengunjung dapat melihat bentang alam yang luas, termasuk pemandangan Gunung Klabat dan kawasan sekitarnya. Salah satu momen yang menjadi daya tarik adalah pemandangan matahari terbenam, sehingga kawasan ini banyak dimanfaatkan sebagai tempat bersantai dan menikmati suasana sore. Keberadaan berbagai jenis bunga dan lanskap terbuka juga memberikan karakter tersendiri bagi Puncak Tetetana sebagai destinasi wisata alam di Kumelembuai.',
          en: 'Tetetana Peak is celebrated for its lofty vantage point and tranquil garden spaces where visitors can immerse in nature. From this summit, travelers gaze out across expansive natural horizons including Mount Klabat and neighboring valleys. Sunset hours are especially popular, offering a serene evening retreat. Vibrant seasonal flowerbeds and open horizons make Tetetana Peak a prime nature destination in Kumelembuay.',
        },
      },
      {
        id: 'puncak-melbyls',
        nama: { id: "Puncak Melby'Ls", en: "Melby'Ls Peak" },
        kategori: { id: 'Wisata Alam', en: 'Nature Tourism' },
        highlights: [
          { id: 'Panorama Perbukitan Hijau', en: 'Rolling Green Hills' },
          { id: 'Udara Pegunungan Sejuk', en: 'Crisp Mountain Breeze' },
          { id: 'Spot Fotografi Lanskap', en: 'Scenic Photo Vantage' },
        ],
        deskripsiSingkat: {
          id: 'Panorama perbukitan dengan suasana terbuka, udara sejuk, dan spot foto lanskap.',
          en: 'Rolling highland hills, crisp mountain air, open vistas, and picturesque photo spots.',
        },
        deskripsiLengkap: {
          id: "Puncak Melby'Ls memiliki karakter wisata yang menonjolkan panorama alam dari kawasan perbukitan. Daya tarik utamanya terletak pada suasana terbuka dan pemandangan luas yang dapat dinikmati dari ketinggian. Kawasan ini cocok bagi pengunjung yang ingin menikmati udara sejuk, bersantai, menikmati lanskap alam, maupun mengabadikan pemandangan melalui fotografi. Keberadaan kawasan puncak dengan hamparan alam di sekitarnya menjadikan Melby'Ls sebagai salah satu lokasi yang potensial untuk menikmati suasana Kumelembuai dari perspektif yang berbeda.",
          en: "Melby'Ls Peak captures panoramic highland charm from the hilltops. Its main draw is the open-air ambiance and expansive panoramic views seen from above. It is an ideal getaway for travelers seeking refreshing mountain air, quiet relaxation, and photography. The high plateau surrounded by lush greenery provides a memorable new perspective of Kumelembuay.",
        },
      },
      {
        id: 'tuur-maasering',
        nama: { id: "Tuur Ma'asering", en: "Tuur Ma'asering" },
        kategori: { id: 'Budaya', en: 'Cultural Tourism' },
        highlights: [
          { id: 'Kawasan Hutan Aren', en: 'Sugar Palm Forest' },
          { id: 'Pembuatan Cap Tikus & Saguer', en: 'Artisanal Saguer & Cap Tikus' },
          { id: 'Arsitektur Kayu-Bambu Alami', en: 'Rustic Wood & Bamboo Setting' },
        ],
        deskripsiSingkat: {
          id: 'Wisata budaya aren: pengolahan air nira menjadi saguer dan Cap Tikus di tengah pondok kayu-bambu.',
          en: 'Sugar palm cultural experience: authentic palm sap extraction into saguer & Cap Tikus amid rustic bamboo architecture.',
        },
        deskripsiLengkap: {
          id: "Tuur Ma'asering merupakan destinasi wisata yang memadukan keindahan alam dengan kearifan lokal masyarakat Minahasa. Kawasan ini berada di tengah lingkungan pohon aren yang menjadi bagian penting dari kehidupan masyarakat setempat. Salah satu daya tarik utamanya adalah pengunjung dapat mengenal secara langsung proses pengolahan air nira menjadi saguer serta proses penyulingan yang menghasilkan minuman tradisional Cap Tikus. Selain itu, suasana wisata semakin khas dengan keberadaan pondok dan bangunan yang menggunakan material kayu dan bambu. Perpaduan antara hutan aren, tradisi pengolahan nira, serta suasana pedesaan menjadikan Tuur Ma'asering tidak hanya sebagai tempat rekreasi, tetapi juga ruang untuk mengenal budaya dan kearifan lokal masyarakat Kumelembuai.",
          en: "Tuur Ma'asering merges rustic landscape beauty with authentic Minahasa cultural traditions. Set within a sugar palm grove deeply rooted in local livelihood, visitors can witness firsthand how freshly harvested palm sap is converted into traditional saguer and distilled into Cap Tikus. Beautiful wooden and bamboo pavilions accentuate the pastoral village atmosphere. The harmonious mix of palm groves and living heritage makes Tuur Ma'asering an essential cultural stop in Kumelembuay.",
        },
      },
    ],
  },

  // ── Halaman Tentang Kami ────────────────────────────────────────────
  tentang: {
    pageTitle: { id: 'Tentang Kami', en: 'About Us' },
    subTitle: {
      id: 'Program Kerja KKT Unsrat · Kelurahan Kumelembuay',
      en: 'Unsrat KKT Work Program · Kumelembuay Village',
    },
    aboutTitle: { id: 'Tentang Website Ini', en: 'About This Website' },
    p1: {
      id: 'Website profil ini dikembangkan sebagai bagian dari program kerja Kuliah Kerja Terpadu (KKT) Universitas Sam Ratulangi (Unsrat) untuk Kelurahan Kumelembuay, Kecamatan Tomohon Timur, Kota Tomohon.',
      en: 'This profile website was created as part of the community service program of Sam Ratulangi University (Unsrat) Integrated Field Work (KKT) for Kumelembuay Village, East Tomohon District, Tomohon City.',
    },
    p2: {
      id: 'Website ini hadir untuk mempermudah akses informasi publik mengenai profil kelurahan, potensi ekowisata dan kearifan lokal, serta memfasilitasi komunikasi antara masyarakat, pihak kelurahan, dan para pengunjung.',
      en: 'This portal provides easy digital access to village profile details, ecotourism destinations, and cultural heritage, bridging communication between citizens, village administrators, and international visitors.',
    },
    timTitle: { id: 'Struktur Tim KKT', en: 'KKT Team Structure' },
    timDesc: {
      id: 'Mahasiswa KKT Unsrat Angkatan 149 yang bertugas di Posko Kumelembuay, Kec. Tomohon Timur, Kota Tomohon untuk mendharmabaktikan wawasan dan pengabdian bagi kemajuan masyarakat Kelurahan Kumelembuay.',
      en: 'Unsrat KKT Batch 149 students stationed at Kumelembuay Post, East Tomohon, dedicated to applying academic knowledge and community service for the betterment of Kumelembuay Village.',
    },
    btnInstagram: { id: 'Ikuti di Instagram', en: 'Follow on Instagram' },
    pimpinanPosko: { id: 'Pimpinan Posko', en: 'Post Leadership' },
    labelAnggota: { id: 'Anggota', en: 'Members' },
    fotoMenyusul: { id: 'Foto menyusul', en: 'Photo coming soon' },

    // Bidang names
    bidang: {
      'Inti Posko': { id: 'Inti Posko', en: 'Executive Core' },
      'Bidang Infokom': { id: 'Bidang Infokom', en: 'Info & Communication Division' },
      'Bidang Program': { id: 'Bidang Program', en: 'Programs & Field Division' },
      'Bidang Pelaporan': { id: 'Bidang Pelaporan', en: 'Reporting & Documentation Division' },
    },
    // Jabatan
    jabatan: {
      'Koordinator Posko': { id: 'Koordinator Posko', en: 'Post Coordinator' },
      'Koordinator': { id: 'Koordinator', en: 'Coordinator' },
      'Sekretaris': { id: 'Sekretaris', en: 'Secretary' },
      'Bendahara': { id: 'Bendahara', en: 'Treasurer' },
      'Anggota': { id: 'Anggota', en: 'Member' },
    },
  },

  // ── Halaman Kontak ──────────────────────────────────────────────────
  kontak: {
    pageTitle: { id: 'Kontak', en: 'Contact' },
    sectionTitle: { id: 'Informasi Kontak & Lokasi', en: 'Contact Information & Location' },
    infoTitle: { id: 'Informasi Kontak', en: 'Contact Information' },
    mapTitle: { id: 'Peta Wilayah & Lokasi Kelurahan', en: 'Territory Map & Village Location' },
    mapDesc: {
      id: 'Jelajahi peta digital Kelurahan Kumelembuay dengan batas wilayah resmi, citra satelit, dan sudut pandang 3D.',
      en: 'Explore the digital map of Kumelembuay Village featuring official boundaries, satellite imagery, and 3D terrain perspective.',
    },
    jalan: { id: 'Jalan', en: 'Street' },
    alamat: { id: 'Alamat', en: 'Address' },
    telepon: { id: 'Telepon', en: 'Telephone' },
    email: { id: 'Email', en: 'Email' },
    jam: { id: 'Jam Pelayanan', en: 'Service Hours' },
    dataMenyusul: { id: 'Data menyusul', en: 'Data to be updated' },
    btnMaps: { id: 'Buka di Google Maps', en: 'Open in Google Maps' },
    koordinatLabel: {
      id: 'Koordinat: 1.348987, 124.885827',
      en: 'Coordinates: 1.348987, 124.885827',
    },
  },
};
