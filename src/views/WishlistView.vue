<script setup>
import { computed } from 'vue'
import { produk } from '../data.js'
import ProductCard from '../components/ProductCard.vue'
import { useKeranjangStore } from '../stores/keranjang.js'

const store = useKeranjangStore()

const daftar = computed(() => produk.filter((p) => store.wishlist.includes(p.id)))
</script>

<template>
  <section>
    <h1 class="judul">Wishlist</h1>

    <div v-if="daftar.length" class="grid-produk">
      <ProductCard v-for="item in daftar" :key="item.id" :produk="item" />
    </div>

    <div v-else class="kosong">
      <p>Belum ada produk yang kamu sukai.</p>
      <RouterLink to="/" class="btn btn-primer">Cari produk</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.judul {
  margin: 0 0 24px;
  font-size: 1.7rem;
  font-weight: 800;
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
