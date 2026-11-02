<script setup></script>

<template>
  <section class="kosong">
    <p class="kode">404</p>
    <h1 class="judul">Halaman tidak ditemukan</h1>
    <p>Alamat yang kamu buka tidak tersedia.</p>
    <RouterLink to="/" class="btn btn-primer">Kembali ke beranda</RouterLink>
  </section>
</template>

<style scoped>
.kosong {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 0;
  text-align: center;
}

.kode {
  margin: 0;
  font-size: 4rem;
  font-weight: 800;
  color: var(--warna-hijau);
  line-height: 1;
}

.judul {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
}
</style>
