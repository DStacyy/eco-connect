<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { produk } from '../data.js'
import { cariUmkm } from '../utils.js'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()

const profil = computed(() => cariUmkm(route.params.id))
const daftar = computed(() => produk.filter((p) => p.umkmId === route.params.id))
</script>

<template>
  <section v-if="profil">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <RouterLink to="/">Beranda</RouterLink>
      <span> / </span>
      <span>{{ profil.nama }}</span>
    </nav>

    <header class="profil">
      <p class="kota">{{ profil.kota }}</p>
      <h1 class="judul">{{ profil.nama }}</h1>
      <p class="deskripsi">{{ profil.deskripsi }}</p>
      <p class="cerita">{{ profil.cerita }}</p>
    </header>

    <h2 class="judul-blok">Produk ({{ daftar.length }})</h2>

    <div v-if="daftar.length" class="grid-produk">
      <ProductCard v-for="p in daftar" :key="p.id" :produk="p" />
    </div>
    <p v-else class="kosong">UMKM ini belum memiliki produk.</p>
  </section>

  <section v-else class="kosong">
    <h1 class="judul">UMKM tidak ditemukan</h1>
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

.profil {
  padding: 24px;
  margin-bottom: 36px;
  border: 2px solid var(--warna-teks);
  border-left: 8px solid var(--warna-hijau);
  border-radius: var(--radius);
  background: var(--warna-latar-lembut);
}

.kota {
  margin: 0 0 4px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--warna-hijau);
}

.judul {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.deskripsi {
  margin: 0 0 12px;
  font-weight: 600;
}

.cerita {
  margin: 0;
  color: var(--warna-teks-redup);
}

.kosong {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
