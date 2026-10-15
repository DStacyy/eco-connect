<script setup>
import { useKeranjangStore } from './stores/keranjang.js'

const store = useKeranjangStore()
</script>

<template>
  <header class="header">
    <div class="header-isi">
      <RouterLink to="/" class="logo">
        Eco<span class="aksen">-Connect</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/wishlist" class="nav-link">
          ♡ Wish list
          <span v-if="store.jumlahWishlist" class="badge">{{ store.jumlahWishlist }}</span>
        </RouterLink>

        <RouterLink to="/keranjang" class="nav-link">
          Keranjang
          <span v-if="store.totalItem" class="badge">{{ store.totalItem }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid var(--warna-border);
  z-index: 10;
}

.header-isi {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
}

.aksen {
  color: var(--warna-hijau);
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: var(--warna-teks);
}

.nav-link:hover {
  color: var(--warna-hijau);
}

.nav-link.router-link-exact-active {
  color: var(--warna-hijau);
}

.badge {
  background: var(--warna-kuning);
  color: var(--warna-teks);
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}
</style>