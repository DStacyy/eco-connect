<script setup>
import { computed } from 'vue'
import { useKeranjangStore } from '../stores/keranjang.js'
import { cariProduk, formatRupiah } from '../utils.js'

const store = useKeranjangStore()

// Menggabungkan data item keranjang dengan detail produknya
const daftar = computed(() =>
  store.items
    .map((item) => {
      const p = cariProduk(item.id)
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
          <RouterLink :to="`/produk/${item.id}`">
            <img :src="item.gambar" :alt="item.nama" class="thumb" />
          </RouterLink>

          <div class="info">
            <RouterLink :to="`/produk/${item.id}`" class="nama">{{ item.nama }}</RouterLink>
            <p class="harga-satuan">{{ formatRupiah(item.harga) }}</p>
          </div>

          <div class="jumlah">
            <button
              type="button"
              :aria-label="`Kurangi ${item.nama}`"
              @click="store.kurangi(item.id)"
            >
              −
            </button>
            <span>{{ item.jumlah }}</span>
            <button
              type="button"
              :aria-label="`Tambah ${item.nama}`"
              :disabled="item.jumlah >= item.stok"
              @click="store.tambah(item.id)"
            >
              +
            </button>
          </div>

          <p class="subtotal">{{ formatRupiah(item.harga * item.jumlah) }}</p>

          <button type="button" class="hapus" @click="store.hapus(item.id)">Hapus</button>
        </li>
      </ul>

      <div class="total">
        <span>Total</span>
        <strong>{{ formatRupiah(store.totalHarga) }}</strong>
      </div>

      <div class="aksi-bawah">
        <p class="catatan">Pembayaran hanya simulasi, tidak ada transaksi nyata.</p>
        <RouterLink to="/checkout" class="btn btn-primer">Lanjut ke checkout</RouterLink>
      </div>
    </div>

    <div v-else class="kosong">
      <p>Keranjangmu masih kosong.</p>
      <RouterLink to="/" class="btn btn-primer">Mulai belanja</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.judul {
  margin: 0 0 24px;
  font-size: 1.7rem;
  font-weight: 800;
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
  border: 2px solid var(--warna-border);
  border-radius: var(--radius);
  flex-wrap: wrap;
}

.thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 1px solid var(--warna-border);
  background: var(--warna-hijau-muda);
}

.info {
  flex: 1 1 180px;
}

.nama {
  font-weight: 700;
}

.nama:hover {
  color: var(--warna-hijau);
  text-decoration: underline;
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
  border: 2px solid var(--warna-teks);
  border-radius: var(--radius);
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
}

.jumlah button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.jumlah span {
  min-width: 24px;
  text-align: center;
  font-weight: 700;
}

.subtotal {
  margin: 0;
  min-width: 120px;
  text-align: right;
  font-weight: 800;
  color: var(--warna-hijau);
}

.hapus {
  border: none;
  background: none;
  color: #b91c1c;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: underline;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 16px;
  background: var(--warna-hijau-muda);
  border: 2px solid var(--warna-hijau);
  border-radius: var(--radius);
  font-size: 1.1rem;
}

.aksi-bawah {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.catatan {
  margin: 0;
  font-size: 0.85rem;
  color: var(--warna-teks-redup);
}

.kosong {
  text-align: center;
  padding: 60px 0;
  color: var(--warna-teks-redup);
}

.kosong .btn {
  margin-top: 12px;
}
</style>
