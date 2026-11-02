import { produk, umkm } from './data.js'

export const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka)

export const cariProduk = (id) => produk.find((p) => p.id === id)

export const cariUmkm = (id) => umkm.find((u) => u.id === id)
