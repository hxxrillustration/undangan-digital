/* ============================================================
   LUXE INVITATION — PUSAT KONFIGURASI (js/config.js)
   ------------------------------------------------------------
   Semua data yang sering diganti (nama pasangan, tanggal,
   WhatsApp, harga, foto, musik, tema, rekening) cukup diubah
   DI FILE INI SAJA. Tidak perlu mengedit file lain.
   ============================================================ */

window.LUXE_CONFIG = {

  /* ---------- BRAND & KONTAK ---------- */
  brand: "LUXE INVITATION",
  tagline: "Your Love Story, Beautifully Told.",
  // Nomor WhatsApp bisnis (format internasional tanpa "+", contoh: 6281234567890)
  whatsapp: "6281234567890",
  instagram: "https://instagram.com/luxe.invitation",
  email: "hello@luxe-invitation.com",

  /* ---------- MUSIK LATAR ---------- */
  // Letakkan file musik di assets/audio/ lalu ganti nama file di bawah.
  // Jika file tidak ditemukan, kontrol musik otomatis disembunyikan.
  music: {
    enabled: true,
    url: "assets/audio/music.mp3",
    autoplayAfterOpen: true // hanya berlaku setelah tamu menekan "Buka Undangan"
  },

  /* ---------- TEMA KOLEKSI (landing page) ---------- */
  themes: [
    {
      id: "eternal",
      name: "Eternal Elegance",
      tag: "Klasik",
      desc: "Tema klasik dengan champagne gold dan ivory, hangat dan abadi.",
      accent: "#C6A76A",
      bg: "#F8F5EF",
      ink: "#2b2418"
    },
    {
      id: "modern",
      name: "Modern Romance",
      tag: "Minimalis",
      desc: "Tema minimalis kontemporer dengan tipografi editorial yang bersih.",
      accent: "#151515",
      bg: "#ffffff",
      ink: "#151515"
    },
    {
      id: "garden",
      name: "Garden of Love",
      tag: "Botanical",
      desc: "Tema botanical dengan sage green dan sentuhan elemen bunga.",
      accent: "#8a9578",
      bg: "#f4f6ef",
      ink: "#2c3124"
    },
    {
      id: "royal",
      name: "Royal Heritage",
      tag: "Formal",
      desc: "Tema formal bernuansa tradisional dengan sentuhan kemewahan istana.",
      accent: "#8c6d3f",
      bg: "#171410",
      ink: "#f3ead9"
    }
  ],

  /* ---------- PAKET & HARGA (mudah diubah) ---------- */
  packages: [
    {
      id: "essential",
      name: "PAKET ESSENTIAL",
      price: 199000,
      period: "Masa aktif 3 bulan",
      features: [
        "Satu desain pilihan",
        "Nama pasangan",
        "Informasi acara",
        "Hitung mundur",
        "Integrasi Google Maps",
        "Tombol WhatsApp",
        "Masa aktif 3 bulan"
      ],
      popular: false
    },
    {
      id: "signature",
      name: "PAKET SIGNATURE",
      price: 399000,
      period: "Masa aktif 1 tahun",
      features: [
        "Semua fitur Essential",
        "Galeri foto",
        "Musik latar",
        "RSVP kehadiran",
        "Buku ucapan",
        "Amplop digital",
        "Personalisasi warna",
        "Masa aktif 1 tahun"
      ],
      popular: true
    },
    {
      id: "prestige",
      name: "PAKET PRESTIGE",
      price: 699000,
      period: "Masa aktif 1 tahun",
      features: [
        "Semua fitur Signature",
        "Desain lebih personal",
        "Animasi premium",
        "Galeri foto tambahan",
        "Personalisasi tipografi",
        "Prioritas revisi",
        "Masa aktif 1 tahun"
      ],
      popular: false
    }
  ],

  /* ---------- DATA DEMO UNDANGAN ---------- */
  // ⚠️ SELURUH DATA DI BAWAH INI ADALAH CONTOH DEMO.
  // Ganti semua sebelum website diserahkan kepada pelanggan.
  couple: {
    groom: {
      fullName: "Aditya Pratama, S.T.",
      nickname: "Aditya",
      parents: "Putra kedua dari Bapak Hartono Pratama & Ibu Sari Wulandari",
      desc: "Seorang insinyur yang percaya bahwa cinta terbaik datang dengan kesabaran dan doa. (Data demo)",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=70",
      instagram: "https://instagram.com/aditya.demo"
    },
    bride: {
      fullName: "Nabila Putri, S.E.",
      nickname: "Nabila",
      parents: "Putri pertama dari Bapak Ahmad Fauzi & Ibu Rina Kartika",
      desc: "Seorang desainer grafis yang jatuh cinta pada detail dan keindahan sederhana. (Data demo)",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=70",
      instagram: "https://instagram.com/nabila.demo"
    },
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70",
    heroPhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=70"
  },

  event: {
    // Gunakan zona waktu lokal acara (WIB = +07:00)
    dateISO: "2026-12-20T08:00:00+07:00",
    akad: {
      title: "Akad Nikah",
      date: "Minggu, 20 Desember 2026",
      time: "08.00 – 10.00 WIB",
      locationName: "Ballroom The Grand Mulia (DEMO)",
      address: "The Grand Mulia Ballroom, Jakarta Selatan (alamat demo)"
    },
    resepsi: {
      title: "Resepsi",
      date: "Minggu, 20 Desember 2026",
      time: "11.00 – 14.00 WIB",
      locationName: "Ballroom The Grand Mulia (DEMO)",
      address: "The Grand Mulia Ballroom, Jakarta Selatan (alamat demo)"
    }
  },

  gallery: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=70", alt: "Foto prewedding demo pasangan di taman" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=70", alt: "Foto demo mempelai berpegangan tangan" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=70", alt: "Foto demo pasangan di gedung klasik" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=70", alt: "Foto demo pengantin wanita berbunga" },
    { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=70", alt: "Foto demo cincin pertunangan" },
    { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=70", alt: "Foto demo dekorasi meja resepsi" }
  ],

  loveStory: [
    { title: "The First Meeting", date: "Maret 2019", text: "Pertemuan pertama di sebuah pameran buku — sebuah kebetulan yang terasa seperti takdir. (Cerita demo)" },
    { title: "The Beginning", date: "Januari 2020", text: "Dari obrolan singkat menjadi kopi sore yang tak pernah selesai dibicarakan. (Cerita demo)" },
    { title: "The Proposal", date: "Februari 2026", text: "Di bawah langit senja, satu pertanyaan sederhana yang mengubah segalanya. (Cerita demo)" },
    { title: "Forever Starts Here", date: "Desember 2026", text: "Dan kini, bab baru kisah kami dimulai — bersama keluarga dan sahabat tercinta. (Cerita demo)" }
  ],

  gifts: [
    {
      bank: "BCA (CONTOH)",
      number: "1234567890",
      holder: "A/N Aditya Pratama (DEMO)"
    },
    {
      bank: "Mandiri (CONTOH)",
      number: "9876543210",
      holder: "A/N Nabila Putri (DEMO)"
    }
  ],
  giftAddress: "Jl. Kenanga No. 12, Jakarta Selatan (alamat kirim hadiah demo)",

  rsvp: {
    maxGuests: 5,
    whatsappMessage: true // kirim konfirmasi via WhatsApp (demo statis)
  },

  features: [
    { icon: "gem", title: "Desain Eksklusif", desc: "Layout editorial premium yang tidak terlihat seperti template gratis." },
    { icon: "mail-open", title: "Amplop Digital Interaktif", desc: "Pengalaman membuka undangan yang hangat dan personal." },
    { icon: "music", title: "Musik Latar", desc: "Alunan musik romantis yang mulai setelah tamu membuka undangan." },
    { icon: "images", title: "Galeri Foto", desc: "Pamerkan momen prewedding dalam grid editorial dengan lightbox." },
    { icon: "timer", title: "Hitung Mundur", desc: "Countdown real-time menuju hari bahagia yang diperbarui tiap detik." },
    { icon: "map-pin", title: "Peta Lokasi", desc: "Tombol lokasi langsung terhubung ke Google Maps." },
    { icon: "check-circle", title: "RSVP Kehadiran", desc: "Konfirmasi kehadiran mudah lewat WhatsApp atau formulir." },
    { icon: "heart", title: "Ucapan & Doa", desc: "Ruang interaktif untuk ucapan dan doa para tamu." },
    { icon: "calendar", title: "Informasi Acara", desc: "Jadwal akad dan resepsi tertata jelas dalam satu halaman." },
    { icon: "message-circle", title: "Integrasi WhatsApp", desc: "Terhubung langsung dengan nomor WhatsApp yang bisa diatur." },
    { icon: "smartphone", title: "Navigasi Mobile", desc: "Navigasi bawah khusus smartphone agar tamu mudah menjelajah." },
    { icon: "share-2", title: "Fitur Berbagi", desc: "Bagikan undangan ke keluarga dan sahabat hanya dengan satu tautan." }
  ]
};
