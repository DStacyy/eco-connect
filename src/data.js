// ===== DATA SUBJEKTIF (boleh kamu ubah) =====

export const kategori = ['Makanan', 'Fashion', 'Rumah Tangga', 'Kerajinan', 'Elektronik']

export const umkm = [
  {
    id: 'u1',
    nama: 'Dapur Hijau Sari',
    deskripsi: 'Bumbu dan camilan tanpa pengawet dari bahan lokal.',
    kota: 'Surabaya',
  },
  {
    id: 'u2',
    nama: 'Tas Daur Ulang Nara',
    deskripsi: 'Tas dan dompet dari bahan bekas kemasan.',
    kota: 'Malang',
  },
  {
    id: 'u3',
    nama: 'Elektronik Hijau Bima',
    deskripsi: 'Perangkat elektronik refurbished dan aksesoris ramah lingkungan.',
    kota: 'Sidoarjo',
  },
]

export const produk = [
  {
    id: 'p1',
    nama: 'Sambal Kemangi 150ml',
    harga: 25000,
    kategori: 'Makanan',
    gambar: 'https://placehold.co/400x300/ffffff/16a34a?text=Sambal',
    umkmId: 'u1',
  },
  {
    id: 'p2',
    nama: 'Tote Bag Kanvas Bekas',
    harga: 65000,
    kategori: 'Fashion',
    gambar: 'https://placehold.co/400x300/ffffff/facc15?text=Tote+Bag',
    umkmId: 'u2',
  },
  {
    id: 'p3',
    nama: 'Keripik Pisang Organik',
    harga: 18000,
    kategori: 'Makanan',
    gambar: 'https://placehold.co/400x300/ffffff/16a34a?text=Keripik',
    umkmId: 'u1',
  },
  {
    id: 'p4',
    nama: 'Keyboard Mekanikal Refurbished',
    harga: 350000,
    kategori: 'Elektronik',
    gambar: 'https://placehold.co/400x300/ffffff/16a34a?text=Keyboard',
    umkmId: 'u3',
  },
  {
    id: 'p5',
    nama: 'Earphone Casing Bambu',
    harga: 150000,
    kategori: 'Elektronik',
    gambar: 'https://placehold.co/400x300/ffffff/facc15?text=Earphone',
    umkmId: 'u3',
  },
  {
    id: 'p6',
    nama: 'Mouse dari Bahan Daur Ulang',
    harga: 120000,
    kategori: 'Elektronik',
    gambar: 'https://placehold.co/400x300/ffffff/16a34a?text=Mouse',
    umkmId: 'u3',
  },
  {
    id: 'p7',
    nama: 'Charger Solar Portable',
    harga: 275000,
    kategori: 'Elektronik',
    gambar: 'https://placehold.co/400x300/ffffff/facc15?text=Charger',
    umkmId: 'u3',
  },
]