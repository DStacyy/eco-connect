<script setup>
import { computed } from 'vue'
import { produk } from '../data.js'
import { useKeranjangStore } from '../stores/keranjang.js'
import { formatRupiah } from '../utils.js'

const store = useKeranjangStore()

// Menggabungkan data item keranjang dengan detail produknya
const daftar = computed(() =>
  store.items
    .map((item) => {
      const p = produk.find((x) => x.id === item.id)
      return p ? { ...p, jumlah: item.jumlah } : null
    })
    .filter(Boolean)
)
</script>

<template>
  <section>
    <h1 class="judul">Keranjang Belanja</h1>

    <div v-if="daftar.length" class="wrap">
      <ul class="list">
        <li v-for="item in daftar" :key="item.id" class="baris">
          <img :src="item.gambar" :alt="item.nama" class="thumb" />

          <div class="info">
            <p class="nama">{{ item.nama }}</p>
            <p class="harga-satuan">{{ formatRupiah(item.harga) }}</p>
          </div>

          <div class="jumlah">
            <button @click="store.kurangi(item.id)">−</button>
            <span>{{ item.jumlah }}</span>
            <button @click="store.tambah(item.id)">+</button>
          </div>

          <p class="subtotal">{{ formatRupiah(item.harga * item.jumlah) }}</p>

          <button class="hapus" @click="store.hapus(item.id)">Hapus</button>
        </li>
      </ul>

      <div class="total">
        <span>Total</span>
        <strong>{{ formatRupiah(store.totalHarga) }}</strong>
      </div>

      <p class="catatan">
        Ini hanya simulasi. Belum ada proses pembayaran.
      </p>
    </div>

    <div v-else class="kosong">
      <p>Keranjangmu masih kosong.</p>
      <RouterLink to="/" class="btn-kembali">Mulai belanja</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.judul {
  margin: 0 0 24px;
  font-size: 1.6rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.baris {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--warna-border);
  border-radius: var(--radius);
  flex-wrap: wrap;
}

.thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  background: var(--warna-hijau-muda);
}

.info {
  flex: 1 1 180px;
}

.nama {
  margin: 0;
  font-weight: 600;
}

.harga-satuan {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--warna-teks-redup);
}

.jumlah {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jumlah button {
  width: 32px;
  height: 32px;
  border: 1px solid var(--warna-border);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
}

.jumlah span {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.subtotal {
  margin: 0;
  min-width: 120px;
  text-align: right;
  font-weight: 700;
  color: var(--warna-hijau);
}

.hapus {
  border: none;
  background: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 0.9rem;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 16px;
  background: var(--warna-hijau-muda);
  border-radius: var(--radius);
  font-size: 1.1rem;
}

.catatan {
  margin: 12px 0 0;
  font-size: 0.85rem;
  color: var(--warna-teks-redup);
}

.kosong {
  text-align: center;
  padding: 60px 0;
  color: var(--warna-teks-redup);
}

.btn-kembali {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 20px;
  background: var(--warna-hijau);
  color: #fff;
  border-radius: var(--radius);
  font-weight: 600;
}
</style>