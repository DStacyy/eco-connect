<script setup>
import { useKeranjangStore } from '../stores/keranjang.js'
import { formatRupiah } from '../utils.js'

const props = defineProps({
  produk: { type: Object, required: true },
  namaUmkm: { type: String, default: '' },
})

const store = useKeranjangStore()
</script>

<template>
  <article class="kartu">
    <img :src="produk.gambar" :alt="produk.nama" class="gambar" />

    <div class="isi">
      <p class="umkm">{{ namaUmkm }}</p>
      <h3 class="nama">{{ produk.nama }}</h3>
      <p class="harga">{{ formatRupiah(produk.harga) }}</p>

      <div class="aksi">
        <button
          class="btn-suka"
          :class="{ aktif: store.sudahDiWishlist(produk.id) }"
          :aria-label="store.sudahDiWishlist(produk.id) ? 'Hapus dari wish list' : 'Tambah ke wish list'"
          @click="store.toggleWishlist(produk.id)"
        >
          {{ store.sudahDiWishlist(produk.id) ? '♥' : '♡' }}
        </button>

        <button class="btn-tambah" @click="store.tambah(produk.id)">
          + Keranjang
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.kartu {
  background: #fff;
  border: 1px solid var(--warna-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.kartu:hover {
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.15);
  transform: translateY(-2px);
}

.gambar {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: var(--warna-hijau-muda);
}

.isi {
  padding: 12px 14px 16px;
}

.umkm {
  margin: 0;
  font-size: 0.8rem;
  color: var(--warna-teks-redup);
}

.nama {
  margin: 4px 0 8px;
  font-size: 1rem;
}

.harga {
  margin: 0 0 12px;
  font-weight: 700;
  color: var(--warna-hijau);
}

.aksi {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-suka {
  width: 40px;
  height: 40px;
  border: 1px solid var(--warna-border);
  border-radius: var(--radius);
  background: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--warna-teks-redup);
}

.btn-suka.aktif {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}

.btn-tambah {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: var(--radius);
  background: var(--warna-hijau);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.btn-tambah:hover {
  filter: brightness(0.95);
}
</style>