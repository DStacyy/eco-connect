# Eco-Connect

Prototipe katalog marketplace untuk produk UMKM ramah lingkungan. Dibuat sebagai proyek portofolio dengan data dummy dan tanpa backend.

## Fitur

- Katalog produk dengan pencarian, filter kategori, dan urutan harga.
- Halaman detail produk, halaman profil UMKM, dan produk lain dari penjual yang sama.
- Atribut ramah lingkungan di setiap produk, misalnya "Daur ulang" atau "Tanpa pengawet".
- Wishlist dan keranjang dengan jumlah barang dan validasi stok.
- Checkout simulasi dengan pilihan pengiriman dan ringkasan pesanan.
- Penyimpanan wishlist dan keranjang di localStorage, sehingga tetap ada saat halaman dimuat ulang.

## Tech stack

- Vue 3 (`<script setup>`)
- Vite
- Pinia
- Vue Router

## Menjalankan proyek

```bash
npm install
npm run dev
```

Lalu buka alamat yang muncul di terminal, biasanya `http://localhost:5173`.

## Struktur singkat

```
src/
├── data.js              # Data dummy: UMKM, produk, kategori
├── utils.js             # Format rupiah dan helper pencarian
├── stores/keranjang.js  # Store Pinia untuk keranjang, wishlist, dan notifikasi
├── components/          # ProductCard, SearchFilter
├── views/               # Beranda, detail produk, UMKM, keranjang, checkout, wishlist
└── router/index.js      # Daftar route
```

Untuk menambah produk atau UMKM dummy, cukup edit `src/data.js`.

## Catatan

Ini hanya prototipe. Tidak ada backend, login, atau pembayaran sungguhan. Gambar produk memakai placeholder dari placehold.co.
