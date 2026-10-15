<script setup>
import { computed } from 'vue'
import { produk, umkm } from '../data.js'
import ProductCard from '../components/ProductCard.vue'
import { useKeranjangStore } from '../stores/keranjang.js'

const store = useKeranjangStore()

const daftar = computed(() =>
  produk.filter((p) => store.wishlist.includes(p.id))
)

const namaUmkmDari = (umkmId) =>
  umkm.find((u) => u.id === umkmId)?.nama ?? ''
</script>

<template>
  <section>
    <h1 class="judul">Wish List</h1>

    <div v-if="daftar.length" class="grid">
      <ProductCard
        v-for="item in daftar"
        :key="item.id"
        :produk="item"
        :nama-umkm="namaUmkmDari(item.umkmId)"
      />
    </div>

    <div v-else class="kosong">
      <p>Belum ada produk yang kamu sukai.</p>
      <RouterLink to="/" class="btn-kembali">Cari produk</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.judul {
  margin: 0 0 24px;
  font-size: 1.6rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
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