<script setup>
// defineModel membuat v-model dua arah untuk tiap kontrol
const cari = defineModel('cari', { type: String, default: '' })
const urutan = defineModel('urutan', { type: String, default: 'default' })

const pilihanUrutan = [
  { nilai: 'default', label: 'Rekomendasi' },
  { nilai: 'termurah', label: 'Harga terendah' },
  { nilai: 'termahal', label: 'Harga tertinggi' },
]
</script>

<template>
  <div class="filter">
    <div class="cari-wrap">
      <label for="cari" class="sr-only">Cari produk</label>
      <span class="ikon-cari" aria-hidden="true">🔍</span>
      <input
        id="cari"
        v-model="cari"
        type="search"
        placeholder="Cari produk atau nama UMKM"
        class="input-cari"
      />
    </div>

    <div class="tabs" role="tablist" aria-label="Urutkan produk">
      <button
        v-for="o in pilihanUrutan"
        :key="o.nilai"
        type="button"
        role="tab"
        class="tab"
        :class="{ aktif: urutan === o.nilai }"
        :aria-selected="urutan === o.nilai"
        @click="urutan = o.nilai"
      >
        {{ o.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.cari-wrap {
  position: relative;
}

.ikon-cari {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  pointer-events: none;
}

.input-cari {
  width: 100%;
  height: 40px;
  padding: 0 12px 0 38px;
  border: 1px solid #cfcfcf;
  border-radius: var(--radius);
  font: inherit;
  background: #fff;
  color: var(--teks);
}

.input-cari:focus {
  outline: none;
  border-color: var(--hijau);
  box-shadow: 0 0 0 3px var(--hijau-muda);
}

.tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  border-bottom: 1px solid var(--garis);
}

.tab {
  padding: 8px 12px;
  margin-bottom: -1px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font: inherit;
  font-weight: 600;
  color: var(--teks-redup);
  white-space: nowrap;
  cursor: pointer;
}

.tab:hover {
  color: var(--teks);
}

.tab.aktif {
  color: var(--hijau);
  border-bottom-color: var(--hijau);
}
</style>