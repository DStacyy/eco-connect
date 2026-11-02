<script setup>
import { ref, computed } from 'vue'
import { produk, kategori } from '../data.js'
import { cariUmkm } from '../utils.js'
import heroImg from '../assets/hero.png'
import ProductCard from '../components/ProductCard.vue'
import SearchFilter from '../components/SearchFilter.vue'

const cari = ref('')
const kategoriDipilih = ref('')
const urutan = ref('default')

const pilihanKategori = ['', ...kategori]
const ikon = {
  '': '🛍️',
  Makanan: '🍲',
  Fashion: '👜',
  'Rumah Tangga': '🏠',
  Kerajinan: '🧺',
  Elektronik: '🔌',
}

const hasil = computed(() => {
  const kataKunci = cari.value.trim().toLowerCase()

  let daftar = produk.filter((item) => {
    const namaUmkm = cariUmkm(item.umkmId)?.nama ?? ''
    const cocokKata =
      !kataKunci ||
      item.nama.toLowerCase().includes(kataKunci) ||
      namaUmkm.toLowerCase().includes(kataKunci)

    const cocokKategori = !kategoriDipilih.value || item.kategori === kategoriDipilih.value

    return cocokKata && cocokKategori
  })

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
    <div class="banner">
      <div class="banner-teks">
        <p class="eyebrow">Belanja lokal, lebih hijau</p>
        <h1 class="banner-judul">Produk UMKM Ramah Lingkungan</h1>
        <p class="banner-sub">
          Dari bahan daur ulang sampai kemasan tanpa plastik, semuanya dari pelaku usaha lokal.
        </p>
        <RouterLink :to="{ hash: '#katalog' }" class="btn btn-kuning">Belanja sekarang</RouterLink>
      </div>
      <img :src="heroImg" alt="" class="banner-gambar" />
    </div>

    <div class="kategori-row" role="group" aria-label="Kategori">
      <button
        v-for="k in pilihanKategori"
        :key="k || 'semua'"
        type="button"
        class="kat"
        :class="{ aktif: kategoriDipilih === k }"
        :aria-pressed="kategoriDipilih === k"
        @click="kategoriDipilih = k"
      >
        <span class="kat-ikon">{{ ikon[k] }}</span>
        <span class="kat-nama">{{ k || 'Semua' }}</span>
      </button>
    </div>

    <div id="katalog" class="panel">
      <div class="panel-head">
        <h2 class="judul-blok">{{ kategoriDipilih || 'Semua Produk' }}</h2>
        <p class="jumlah">{{ hasil.length }} produk</p>
      </div>

      <SearchFilter v-model:cari="cari" v-model:urutan="urutan" />

      <div v-if="hasil.length" class="grid-produk">
        <ProductCard v-for="item in hasil" :key="item.id" :produk="item" />
      </div>

      <p v-else class="kosong">Tidak ada produk yang cocok. Coba kata kunci atau kategori lain.</p>
    </div>
  </section>
</template>

<style scoped>
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  align-items: center;
  padding: 28px 32px;
  border-radius: var(--radius);
  background-color: var(--hutan);
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.035) 0 14px,
    transparent 14px 28px
  );
  color: #fff;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--kuning);
}

.banner-judul {
  margin: 0 0 10px;
  font-size: 2rem;
  font-weight: 800;
}

.banner-sub {
  margin: 0 0 20px;
  color: #cfe5d6;
  font-size: 0.95rem;
}

.banner-gambar {
  width: 100%;
  max-height: 240px;
  object-fit: cover;
  border: 3px solid var(--kuning);
  border-radius: var(--radius);
}

.kategori-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin: 12px 0;
  padding: 12px;
  background: #fff;
  border: 1px solid var(--garis);
  border-radius: var(--radius);
}

.kat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 4px;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font: inherit;
  cursor: pointer;
  color: var(--teks);
}

.kat:hover {
  border-color: var(--garis);
}

.kat.aktif {
  background: var(--hijau-muda);
  border-color: var(--hijau);
  font-weight: 700;
  color: var(--hijau-gelap);
}

.kat-ikon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  font-size: 24px;
  background: var(--latar);
  border: 1px dashed #c9d3cb;
  border-radius: var(--radius);
}

.kat-nama {
  font-size: 12px;
  text-align: center;
}

.panel {
  padding: 16px;
  background: #fff;
  border: 1px solid var(--garis);
  border-radius: var(--radius);
  scroll-margin-top: 110px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.jumlah {
  margin: 0;
  font-size: 13px;
  color: var(--teks-redup);
}

@media (max-width: 800px) {
  .banner {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .banner-judul {
    font-size: 1.5rem;
  }

  .kategori-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>