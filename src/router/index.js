import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KeranjangView from '../views/KeranjangView.vue'
import WishlistView from '../views/WishlistView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/keranjang', name: 'keranjang', component: KeranjangView },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})