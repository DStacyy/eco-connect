<script setup>
import { computed } from 'vue'
import { useKeranjangStore } from '../stores/keranjang.js'
import { formatRupiah, cariUmkm } from '../utils.js'

const props = defineProps({
  produk: { type: Object, required: true },
})

const store = useKeranjangStore()

const umkm = computed(() => cariUmkm(props.produk.umkmId))
const habis = computed(() => props.produk.stok <= 0)
const penuh = computed(() => store.jumlahDiKeranjang(props.produk.id) >= props.produk.stok)
const suka = computed(() => store.sudahDiWishlist(props.produk.id))
const eco = computed(() => (props.produk.atribut?.length ?? 0) > 0)
</script>

<template>
  <article class="kartu">
    <div class="gambar-wrap">
      <RouterLink :to="`/produk/${produk.id}`">
        <img :src="produk.gambar" :alt="produk.nama" class="gambar" loading="lazy" />
      </RouterLink>

      <span v-if="eco" class="tag-eco">♻ Eco</span>

      <button
        type="button"
        class="suka"
        :class="{ aktif: suka }"
        :aria-label="suka ? 'Hapus dari wishlist' : 'Tambah ke wishlist'"
        :aria-pressed="suka"
        @click="store.toggleWishlist(produk.id)"
      >
        {{ suka ? '♥' : '♡' }}
      </button>

      <div v-if="habis" class="overlay-habis">Stok habis</div>
    </div>

    <div class="isi">
      <h3 class="nama">
        <RouterLink :to="`/produk/${produk.id}`">{{ produk.nama }}</RouterLink>
      </h3>

      <p class="harga">{{ formatRupiah(produk.harga) }}</p>

      <div v-if="produk.atribut?.length" class="label-wrap">
        <span v-for="a in produk.atribut" :key="a" class="label-eco">{{ a }}</span>
      </div>

      <p v-if="umkm" class="umkm">
        <RouterLink :to="`/umkm/${umkm.id}`" class="umkm-link">
          {{ umkm.kota }} · {{ umkm.nama }}
        </RouterLink>
      </p>

      <p v-if="!habis && produk.stok <= 5" class="sisa">Sisa {{ produk.stok }}</p>

      <button
        type="button"
        class="btn-beli"
        :disabled="habis || penuh"
        @click="store.tambah(produk.id)"
      >
        {{ habis ? 'Stok habis' : penuh ? 'Maks. di keranjang' : '+ Keranjang' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.kartu {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--garis);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.kartu:hover {
  border-color: var(--hijau);
  /* box-shadow: 4px 4px 0 var(--kuning); */
}

.gambar-wrap {
  position: relative;
  background: var(--hijau-muda);
}

.gambar {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

/* Pita eco berbentuk takik di pojok kiri atas */
.tag-eco {
  position: absolute;
  top: 8px;
  left: 0;
  padding: 3px 10px 3px 8px;
  background: var(--hijau);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 50%, 100% 100%, 0 100%);
}

.suka {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--garis);
  border-radius: var(--radius);
  font-size: 16px;
  color: #9e9e9e;
  cursor: pointer;
}

.suka.aktif {
  color: #e53935;
}

.overlay-habis {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(13, 59, 38, 0.72);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.isi {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px 12px;
}

.nama {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  height: calc(1.35em * 2);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.nama a:hover {
  color: var(--hijau);
}

.harga {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 800;
}

.umkm {
  margin: 0;
  font-size: 12px;
  color: var(--teks-redup);
}

.umkm-link:hover {
  color: var(--hijau);
  text-decoration: underline;
}

.sisa {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #e65100;
}

.btn-beli {
  margin-top: auto;
  height: 34px;
  padding: 0 8px;
  background: #fff;
  border: 1px solid var(--hijau);
  border-radius: var(--radius);
  color: var(--hijau);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-beli:hover:not(:disabled) {
  background: var(--hijau);
  color: #fff;
}

.btn-beli:disabled {
  border-color: #d0d0d0;
  background: #f5f5f5;
  color: #9e9e9e;
  cursor: not-allowed;
}
</style>