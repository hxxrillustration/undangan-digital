# LUXE INVITATION — Premium Digital Wedding Invitation

Website undangan pernikahan digital premium berbasis **HTML5 + CSS3 + JavaScript Vanilla**
(tanpa framework). Terdiri dari landing page pemasaran dan halaman undangan interaktif.

---

## 1. Cara membuka proyek di VS Code

1. Install ekstensi **Live Server** di VS Code.
2. Buka folder proyek ini melalui *File → Open Folder*.
3. Klik kanan `index.html` → **Open with Live Server**.

> Direkomendasikan menjalankan via Live Server (bukan double-click file),
> agar query parameter (`?to=`, `?theme=`) dan fetch berjalan normal.

## 2. Menjalankan dengan Live Server

- Landing page: `http://127.0.0.1:5500/index.html`
- Undangan demo: `http://127.0.0.1:5500/invitation.html?to=Bapak%20Andi&theme=eternal`

## 3. Cara mengganti nama pasangan

Buka **`config.js`** → bagian `couple`:
- `fullName`, `nickname`, `parents`, `desc`, `photo`, `instagram`
  untuk mempelai pria (`groom`) dan wanita (`bride`).

## 4. Cara mengganti tanggal dan lokasi acara

Di **`config.js`** → bagian `event`:
- `dateISO` — tanggal & jam dalam format ISO dengan zona waktu,
  contoh `"2026-12-20T08:00:00+07:00"` (WIB = +07:00).
  Countdown otomatis mengikuti nilai ini.
- `akad` dan `resepsi`: `date`, `time`, `locationName`, `address`.
  Tombol "Lihat Lokasi" otomatis membentuk URL Google Maps dari alamat ini.

## 5. Cara mengganti gambar

- Simpan foto di `assets/images/`.
- Ganti URL di `config.js`: `couple.*.photo`, `couple.heroPhoto`,
  dan array `gallery` (sertakan `src` dan `alt`).

## 6. Cara mengganti musik

1. Letakkan file MP3 di `assets/audio/` (mis. `music.mp3`).
2. Di `config.js` → `music.url` sesuaikan nama filenya.
3. Jika file tidak ditemukan, tombol musik otomatis disembunyikan.

## 7. Cara mengganti nomor WhatsApp

Di **`config.js`** → `whatsapp`: `"6281234567890"` (format internasional tanpa `+`).
Nomor ini dipakai untuk pemesanan, RSVP, dan tombol WhatsApp.

## 8. Cara mengubah harga paket

Di **`config.js`** → array `packages`. Ubah `name`, `price`, `period`, `features`.
Landing page (koleksi, harga, form pemesanan) otomatis mengikuti perubahan.

## 9. Cara mengubah warna tema

Di **`config.js`** → array `themes`: ubah `accent`, `bg`, `ink` tiap tema.
Warna utama situs ada sebagai CSS custom properties di `style.css` (`:root`).

## 10. Cara mengunggah ke hosting

Proyek ini statis — cukup unggah seluruh isi folder ke hosting statis:
**Netlify, Vercel, GitHub Pages, cPanel**, atau hosting mana pun.
Tidak diperlukan database atau server backend.

## 11. Fitur yang sudah berfungsi

- Landing page: navbar responsif, hero parallax, koleksi tema, fitur,
  preview interaktif (smartphone/desktop, ganti tema nyata), cara kerja,
  pricing, testimoni demo, FAQ accordion, footer dinamis.
- Form pemesanan: validasi, ringkasan live, kirim format pesan via WhatsApp.
- Undangan: cover dengan nama tamu dari `?to=`, animasi pembukaan,
  musik setelah interaksi (Web Audio), countdown per detik, profil mempelai,
  info acara + Google Maps dari alamat, galeri + lightbox (keyboard & Esc),
  love story, RSVP via WhatsApp, salin rekening (placeholder demo),
  guestbook tersimpan di LocalStorage dengan sanitasi XSS,
  navigasi bawah mobile + scroll-spy.

## 12. Fitur yang masih memerlukan backend

- Penyimpanan RSVP dan ucapan ke server/database
- Sistem masa aktif undangan & perpanjangan otomatis
- Panel admin pelanggan, upload foto oleh pelanggan
- Pembayaran online / invoice otomatis

Struktur `invitation.js` (bagian RSVP & guestbook) sudah dipisah
agar mudah ditukar dari LocalStorage ke API backend.

## 13. Mengganti data demo sebelum diserahkan ke pelanggan

⚠️ Wajib diganti (semua di `config.js`):
- `whatsapp` (masih placeholder), `instagram`, `email`
- Seluruh `couple`, `event`, `gallery`, `loveStory`
- `gifts` — **nomor rekening adalah PLACEHOLDER, bukan rekening nyata**
- `music.url` jika paket pelanggan mencakup musik
- Hapus penanda "(DEMO)" pada copywriting jika diperlukan

---

© LUXE INVITATION. Foto demo berasal dari Unsplash (lisensi gratis penggunaan).
