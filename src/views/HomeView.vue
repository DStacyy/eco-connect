<script setup>
import { ref, computed } from 'vue'
import { produk, umkm } from '../data.js'
import ProductCard from '../components/ProductCard.vue'
import SearchFilter from '../components/SearchFilter.vue'

const cari = ref('')
const kategoriDipilih = ref('')
const urutan = ref('default')

const namaUmkmDari = (umkmId) =>
  umkm.find((u) => u.id === umkmId)?.nama ?? ''

// Hasil dihitung ulang otomatis setiap kali cari, kategori, atau urutan berubah
const hasil = computed(() => {
  const kataKunci = cari.value.trim().toLowerCase()

  let daftar = produk.filter((item) => {
    const cocokKata =
      !kataKunci ||
      item.nama.toLowerCase().includes(kataKunci) ||
      namaUmkmDari(item.umkmId).toLowerCase().includes(kataKunci)

    const cocokKategori =
      !kategoriDipilih.value || item.kategori === kategoriDipilih.value

    return cocokKata && cocokKategori
  })

  // [...daftar] membuat salinan agar array asli tidak berubah
  if (urutan.value === 'termurah') {
    daftar = [...daftar].sort((a, b) => a.harga - b.harga)
  } else if (urutan.value === 'termahal') {
    daftar = [...daftar].sort((a, b) => b.harga - a.harga)
  }

  return daftar
})
</script>

<template>
  <section>
    <h1 class="judul">Produk UMKM Ramah Lingkungan</h1>
    <p class="subjudul">Pilihan produk berkelanjutan dari pelaku usaha lokal.</p>

    <SearchFilter
      v-model:cari="cari"
      v-model:kategori="kategoriDipilih"
      v-model:urutan="urutan"
    />

    <p class="jumlah">{{ hasil.length }} produk ditemukan</p>

    <div v-if="hasil.length" class="grid">
      <ProductCard
        v-for="item in hasil"
        :key="item.id"
        :produk="item"
        :nama-umkm="namaUmkmDari(item.umkmId)"
      />
    </div>

    <p v-else class="kosong">
      Tidak ada produk yang cocok. Coba kata kunci atau filter lain.
    </p>
  </section>
</template>

<style scoped>
.judul {
  margin: 0;
  font-size: 1.6rem;
}

.subjudul {
  margin: 4px 0 24px;
  color: var(--warna-teks-redup);
}

.jumlah {
  margin: 0 0 16px;
  font-size: 0.9rem;
  color: var(--warna-teks-redup);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.kosong {
  text-align: center;
  padding: 40px 0;
  color: var(--warna-teks-redup);
}
</style>