import { defineStore } from 'pinia'
import { produk } from '../data.js'

const KUNCI_KERANJANG = 'ecoconnect-keranjang'
const KUNCI_WISHLIST = 'ecoconnect-wishlist'

// Membaca data dari localStorage. Jika gagal atau kosong, pakai nilai awal.
function muat(kunci, awal) {
  try {
    const data = localStorage.getItem(kunci)
    return data ? JSON.parse(data) : awal
  } catch {
    return awal
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
    items: muat(KUNCI_KERANJANG, []),   // contoh: [{ id: 'p1', jumlah: 2 }]
    wishlist: muat(KUNCI_WISHLIST, []), // contoh: ['p2', 'p4']
  }),

  getters: {
    totalItem: (state) =>
      state.items.reduce((total, item) => total + item.jumlah, 0),

    jumlahWishlist: (state) => state.wishlist.length,

    totalHarga: (state) =>
      state.items.reduce((total, item) => {
        const p = produk.find((x) => x.id === item.id)
        return total + (p ? p.harga * item.jumlah : 0)
      }, 0),

    // Getter yang mengembalikan fungsi, dipakai seperti: store.sudahDiWishlist('p1')
    sudahDiWishlist: (state) => (id) => state.wishlist.includes(id),
  },

  actions: {
    // Satu tempat untuk menyalin state ke localStorage
    sinkron() {
      simpan(KUNCI_KERANJANG, this.items)
      simpan(KUNCI_WISHLIST, this.wishlist)
    },

    tambah(id) {
      const ada = this.items.find((i) => i.id === id)
      if (ada) {
        ada.jumlah++
      } else {
        this.items.push({ id, jumlah: 1 })
      }
      this.sinkron()
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

    toggleWishlist(id) {
      this.wishlist = this.sudahDiWishlist(id)
        ? this.wishlist.filter((x) => x !== id)
        : [...this.wishlist, id]
      this.sinkron()
    },
  },
})