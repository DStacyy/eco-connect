import { defineStore } from 'pinia'
import { produk } from '../data.js'

const KUNCI_KERANJANG = 'ecoconnect-keranjang'
const KUNCI_WISHLIST = 'ecoconnect-wishlist'

let timerNotifikasi = null

const adaProduk = (id) => produk.some((p) => p.id === id)

// Membaca daftar dari localStorage. Jika rusak atau kosong, kembalikan array kosong.
function muatDaftar(kunci) {
  try {
    const data = JSON.parse(localStorage.getItem(kunci))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

// Menyimpan data ke localStorage. Jika gagal, aplikasi tetap berjalan.
function simpan(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai))
  } catch {
    // abaikan
  }
}

export const useKeranjangStore = defineStore('keranjang', {
  state: () => ({
    // Item yang produknya sudah tidak ada di data dibuang saat dimuat
    items: muatDaftar(KUNCI_KERANJANG).filter((i) => adaProduk(i.id)),
    wishlist: muatDaftar(KUNCI_WISHLIST).filter(adaProduk),
    notifikasi: '',
  }),

  getters: {
    totalItem: (state) => state.items.reduce((total, item) => total + item.jumlah, 0),

    jumlahWishlist: (state) => state.wishlist.length,

    totalHarga: (state) =>
      state.items.reduce((total, item) => {
        const p = produk.find((x) => x.id === item.id)
        return total + (p ? p.harga * item.jumlah : 0)
      }, 0),

    sudahDiWishlist: (state) => (id) => state.wishlist.includes(id),

    jumlahDiKeranjang: (state) => (id) => state.items.find((i) => i.id === id)?.jumlah ?? 0,
  },

  actions: {
    sinkron() {
      simpan(KUNCI_KERANJANG, this.items)
      simpan(KUNCI_WISHLIST, this.wishlist)
    },

    // Menampilkan notifikasi singkat di bagian bawah layar
    beri(pesan) {
      this.notifikasi = pesan
      clearTimeout(timerNotifikasi)
      timerNotifikasi = setTimeout(() => {
        this.notifikasi = ''
      }, 2200)
    },

    tambah(id) {
      const p = produk.find((x) => x.id === id)
      if (!p) return

      if (this.jumlahDiKeranjang(id) >= p.stok) {
        this.beri(`Stok "${p.nama}" sudah habis`)
        return
      }

      const ada = this.items.find((i) => i.id === id)
      if (ada) {
        ada.jumlah++
      } else {
        this.items.push({ id, jumlah: 1 })
      }
      this.sinkron()
      this.beri(`"${p.nama}" ditambahkan ke keranjang`)
    },

    kurangi(id) {
      const ada = this.items.find((i) => i.id === id)
      if (!ada) return
      if (ada.jumlah > 1) {
        ada.jumlah--
        this.sinkron()
      } else {
        this.hapus(id)
      }
    },

    hapus(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.sinkron()
    },

    kosongkan() {
      this.items = []
      this.sinkron()
    },

    toggleWishlist(id) {
      this.wishlist = this.sudahDiWishlist(id)
        ? this.wishlist.filter((x) => x !== id)
        : [...this.wishlist, id]
      this.sinkron()
    },
  },
})
