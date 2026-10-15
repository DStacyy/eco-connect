<script setup>
import { kategori } from '../data.js'

// defineModel membuat v-model dua arah untuk tiap kontrol
const cari = defineModel('cari', { type: String, default: '' })
const kategoriDipilih = defineModel('kategori', { type: String, default: '' })
const urutan = defineModel('urutan', { type: String, default: 'default' })
</script>

<template>
  <div class="filter">
    <input
      v-model="cari"
      type="search"
      placeholder="Cari produk atau nama UMKM..."
      class="input input-cari"
    />

    <select v-model="kategoriDipilih" class="input">
      <option value="">Semua kategori</option>
      <option v-for="k in kategori" :key="k" :value="k">{{ k }}</option>
    </select>

    <select v-model="urutan" class="input">
      <option value="default">Urutkan: Default</option>
      <option value="termurah">Harga terendah</option>
      <option value="termahal">Harga tertinggi</option>
    </select>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.input {
  padding: 10px 14px;
  border: 1px solid var(--warna-border);
  border-radius: var(--radius);
  font-size: 0.95rem;
  background: #fff;
}

.input:focus {
  outline: 2px solid var(--warna-hijau);
  border-color: transparent;
}

.input-cari {
  flex: 1 1 260px;
}
</style>