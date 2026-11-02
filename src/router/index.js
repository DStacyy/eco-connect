import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdukView from '../views/ProdukView.vue'
import UmkmView from '../views/UmkmView.vue'
import KeranjangView from '../views/KeranjangView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import WishlistView from '../views/WishlistView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/produk/:id', name: 'produk', component: ProdukView },
  { path: '/umkm/:id', name: 'umkm', component: UmkmView },
  { path: '/keranjang', name: 'keranjang', component: KeranjangView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
