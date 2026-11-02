<script setup>
import { useKeranjangStore } from './stores/keranjang.js'

const store = useKeranjangStore()
</script>

<template>
  <div class="promo-bar">
    🌱 Setiap pilihan kecilmu membantu bumi. Belanja produk lokal yang lebih hijau.
  </div>

  <header class="header">
    <div class="header-isi">
      <RouterLink to="/" class="logo">
        Eco<span class="aksen">-Connect</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/wishlist" class="nav-link">
          <span class="ikon">♡</span>
          Wishlist
          <span v-if="store.jumlahWishlist" class="badge">{{ store.jumlahWishlist }}</span>
        </RouterLink>

        <RouterLink to="/keranjang" class="nav-link">
          <span class="ikon">🛒</span>
          Keranjang
          <span v-if="store.totalItem" class="badge">{{ store.totalItem }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer class="footer">
    <p>Eco-Connect · Prototipe portofolio dengan data dummy</p>
  </footer>

  <div v-if="store.notifikasi" class="toast" role="status" aria-live="polite">
    {{ store.notifikasi }}
  </div>
</template>

<style scoped>
.promo-bar {
  background: var(--kuning);
  color: var(--teks);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid var(--garis);
}

.header-isi {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.logo {
  font-size: 1.35rem;
  font-weight: 800;
}

.aksen {
  color: var(--hijau);
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--hijau);
}

.ikon {
  font-size: 1rem;
}

.badge {
  background: #e53935;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  min-height: calc(100vh - 170px);
}

.footer {
  margin-top: 24px;
  background: var(--hutan);
  color: #cfe5d6;
  text-align: center;
  padding: 20px 16px;
  font-size: 13px;
}

.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  max-width: calc(100% - 32px);
  padding: 12px 20px;
  background: var(--teks);
  color: #fff;
  border-left: 4px solid var(--kuning);
  border-radius: 2px;
  font-weight: 600;
  box-shadow: 4px 4px 0 var(--hijau);
}
</style>