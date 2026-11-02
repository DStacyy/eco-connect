<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { produk } from '../data.js'
import { cariProduk, cariUmkm, formatRupiah } from '../utils.js'
import { useKeranjangStore } from '../stores/keranjang.js'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const store = useKeranjangStore()

const item = computed(() => cariProduk(route.params.id))
const umkm = computed(() => (item.value ? cariUmkm(item.value.umkmId) : null))

const habis = computed(() => (item.value ? item.value.stok <= 0 : true))
const penuh = computed(() =>
  item.value ? store.jumlahDiKeranjang(item.value.id) >= item.value.stok : true
)
const suka = computed(() => (item.value ? store.sudahDiWishlist(item.value.id) : false))

// Produk lain dari UMKM yang sama, tanpa produk ini sendiri
const produkLain = computed(() => {
  if (!item.value) return []
  return produk
    .filter((p) => p.umkmId === item.value.umkmId && p.id !== item.value.id)
    .slice(0, 3)
})
</script>

<template>
  <section v-if="item">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <RouterLink to="/">Beranda</RouterLink>
      <span> / </span>
      <span>{{ item.nama }}</span>
    </nav>

    <div class="detail">
      <img :src="item.gambar" :alt="item.nama" class="gambar" />

      <div class="info">
        <p class="kategori">{{ item.kategori }}</p>
        <h1 class="judul">{{ item.nama }}</h1>
        <p class="harga">{{ formatRupiah(item.harga) }}</p>

        <div v-if="item.atribut?.length" class="label-wrap">
          <span v-for="a in item.atribut" :key="a" class="label-eco">{{ a }}</span>
        </div>

        <p class="deskripsi">{{ item.deskripsi }}</p>

        <p class="stok" :class="{ habis }">
          {{ habis ? 'Stok habis' : `Stok tersedia: ${item.stok}` }}
        </p>

        <p v-if="umkm" class="penjual">
          Dijual oleh
          <RouterLink :to="`/umkm/${umkm.id}`" class="link-penjual">{{ umkm.nama }}</RouterLink>,
          {{ umkm.kota }}
        </p>

        <div class="aksi">
          <button
            type="button"
            class="btn btn-primer"
            :disabled="habis || penuh"
            @click="store.tambah(item.id)"
          >
            {{ habis ? 'Stok habis' : penuh ? 'Maks. di keranjang' : '+ Keranjang' }}
          </button>

          <button
            type="button"
            class="btn btn-sekunder"
            :class="{ aktif: suka }"
            :aria-pressed="suka"
            @click="store.toggleWishlist(item.id)"
          >
            {{ suka ? '♥ Di wishlist' : '♡ Wishlist' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="produkLain.length" class="lainnya">
      <h2 class="judul-blok">Produk lain dari {{ umkm?.nama }}</h2>
      <div class="grid-produk">
        <ProductCard v-for="p in produkLain" :key="p.id" :produk="p" />
      </div>
    </div>
  </section>

  <section v-else class="kosong">
    <h1 class="judul">Produk tidak ditemukan</h1>
    <p>Produk yang kamu cari mungkin sudah tidak tersedia.</p>
    <RouterLink to="/" class="btn btn-primer">Kembali ke beranda</RouterLink>
  </section>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: var(--warna-teks-redup);
}

.breadcrumb a:hover {
  color: var(--warna-hijau);
  text-decoration: underline;
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.gambar {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 2px solid var(--warna-teks);
  border-radius: var(--radius);
  background: var(--warna-hijau-muda);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kategori {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--warna-hijau);
}

.judul {
  font-size: 1.8rem;
}

.harga {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--warna-hijau);
}

.deskripsi {
  margin: 0;
  color: var(--warna-teks-redup);
}

.stok {
  margin: 0;
  font-weight: 700;
  color: var(--warna-hijau-tua);
}

.stok.habis {
  color: #b91c1c;
}

.penjual {
  margin: 0;
  font-size: 0.95rem;
}

.link-penjual {
  font-weight: 700;
  text-decoration: underline;
}

.link-penjual:hover {
  color: var(--warna-hijau);
}

.aksi {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.lainnya {
  margin-top: 48px;
}

.kosong {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

@media (max-width: 720px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
</style>