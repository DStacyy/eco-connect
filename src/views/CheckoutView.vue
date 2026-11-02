<script setup>
import { computed, reactive, ref } from 'vue'
import { useKeranjangStore } from '../stores/keranjang.js'
import { cariProduk, formatRupiah } from '../utils.js'

const store = useKeranjangStore()

const daftar = computed(() =>
  store.items
    .map((item) => {
      const p = cariProduk(item.id)
      return p ? { ...p, jumlah: item.jumlah } : null
    })
    .filter(Boolean)
)

const ongkirOpsi = [
  { nilai: 'reguler', label: 'Reguler', biaya: 12000 },
  { nilai: 'ambil', label: 'Ambil di tempat UMKM', biaya: 0 },
]

const form = reactive({ nama: '', alamat: '', pengiriman: 'reguler' })
const error = ref('')
const sukses = ref(false)
const namaPemesan = ref('')

const ongkir = computed(
  () => ongkirOpsi.find((o) => o.nilai === form.pengiriman)?.biaya ?? 0
)
const grandTotal = computed(() => store.totalHarga + ongkir.value)

function pesan() {
  if (!form.nama.trim() || !form.alamat.trim()) {
    error.value = 'Nama dan alamat wajib diisi.'
    return
  }
  error.value = ''
  namaPemesan.value = form.nama.trim()
  store.kosongkan()
  sukses.value = true
}
</script>

<template>
  <section>
    <h1 class="judul">Checkout</h1>

    <div v-if="sukses" class="kotak sukses">
      <h2 class="judul-blok">Pesanan simulasi berhasil dibuat</h2>
      <p>
        Terima kasih, {{ namaPemesan }}. Ini hanya prototipe, jadi tidak ada pesanan yang benar-benar
        diproses.
      </p>
      <RouterLink to="/" class="btn btn-primer">Kembali belanja</RouterLink>
    </div>

    <div v-else-if="daftar.length" class="checkout">
      <form class="form" novalidate @submit.prevent="pesan">
        <h2 class="judul-blok">Data pengiriman</h2>

        <label class="field">
          <span>Nama lengkap</span>
          <input v-model="form.nama" type="text" class="input" autocomplete="name" />
        </label>

        <label class="field">
          <span>Alamat</span>
          <textarea v-model="form.alamat" class="input" rows="3" autocomplete="street-address"></textarea>
        </label>

        <fieldset class="field">
          <legend>Metode pengiriman</legend>
          <label v-for="o in ongkirOpsi" :key="o.nilai" class="opsi">
            <input v-model="form.pengiriman" type="radio" :value="o.nilai" />
            <span>{{ o.label }}</span>
            <strong>{{ o.biaya ? formatRupiah(o.biaya) : 'Gratis' }}</strong>
          </label>
        </fieldset>

        <p v-if="error" class="error" role="alert">{{ error }}</p>

        <button type="submit" class="btn btn-primer btn-lebar">Buat pesanan</button>
      </form>

      <aside class="ringkasan">
        <h2 class="judul-blok">Ringkasan</h2>

        <ul class="daftar-ringkas">
          <li v-for="p in daftar" :key="p.id">
            <span>{{ p.nama }} × {{ p.jumlah }}</span>
            <span>{{ formatRupiah(p.harga * p.jumlah) }}</span>
          </li>
        </ul>

        <div class="baris">
          <span>Subtotal</span>
          <span>{{ formatRupiah(store.totalHarga) }}</span>
        </div>
        <div class="baris">
          <span>Ongkir</span>
          <span>{{ ongkir ? formatRupiah(ongkir) : 'Gratis' }}</span>
        </div>
        <div class="baris total">
          <span>Total</span>
          <strong>{{ formatRupiah(grandTotal) }}</strong>
        </div>
      </aside>
    </div>

    <div v-else class="kotak">
      <p>Keranjang kosong, tidak ada yang bisa di-checkout.</p>
      <RouterLink to="/" class="btn btn-primer">Mulai belanja</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.judul {
  margin: 0 0 24px;
  font-size: 1.7rem;
  font-weight: 800;
}

.checkout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  align-items: start;
}

.form,
.ringkasan {
  padding: 24px;
  border: 2px solid var(--warna-border);
  border-radius: var(--radius);
  background: #fff;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  border: none;
  padding: 0;
  font-weight: 600;
}

.field legend {
  padding: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

.field textarea {
  resize: vertical;
}

.opsi {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid var(--warna-border);
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
}

.opsi:has(input:checked) {
  border-color: var(--warna-hijau);
  background: var(--warna-hijau-muda);
}

.error {
  color: #b91c1c;
  font-weight: 700;
  margin: 0 0 12px;
}

.daftar-ringkas {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
}

.daftar-ringkas li,
.baris {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.baris {
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 2px solid var(--warna-teks);
  font-size: 1.1rem;
}

.sukses {
  text-align: center;
}

.sukses .btn {
  margin-top: 12px;
}

@media (max-width: 720px) {
  .checkout {
    grid-template-columns: 1fr;
  }
}
</style>
