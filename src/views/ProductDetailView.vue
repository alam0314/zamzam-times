<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useProductStore } from '../stores/products'
import { useQuoteListStore } from '../stores/quoteList'
import { openWhatsApp, priceRequestMessage } from '../utils/whatsapp'
import { MIN_ORDER_QTY } from '../config'
import IconWhatsapp from '../components/icons/IconWhatsapp.vue'

const route = useRoute()
const store = useProductStore()
const quoteList = useQuoteListStore()

const product = store.bySlug(route.params.slug)
const moq = product?.moq || MIN_ORDER_QTY
const qty = ref(moq)
const activeImage = ref(0)
const added = ref(false)

function addToQuoteList() {
  quoteList.addItem(product, qty.value)
  added.value = true
  setTimeout(() => (added.value = false), 2000)
}

function askOnWhatsApp() {
  openWhatsApp(priceRequestMessage(product, qty.value))
}
</script>

<template>
  <DefaultLayout>
    <div v-if="product" class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <div>
        <div class="aspect-square bg-ink-50 rounded-2xl overflow-hidden shadow-soft">
          <img :src="product.images[activeImage]" :alt="product.name" class="w-full h-full object-cover" />
        </div>
        <div v-if="product.images.length > 1" class="flex gap-3 mt-4">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            class="w-16 h-16 rounded-lg overflow-hidden border-2 transition"
            :class="i === activeImage ? 'border-violet-500' : 'border-transparent opacity-70 hover:opacity-100'"
            @click="activeImage = i"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div>
        <span v-if="product.badge" class="chip chip-active !bg-violet-500 !text-ink-950 !border-violet-500 mb-3 inline-block">{{ product.badge }}</span>
        <h1 class="font-display text-3xl font-bold text-ink-900 mb-3">{{ product.name }}</h1>
        <p class="text-ink-600 mb-5">{{ product.description }}</p>

        <div class="flex items-center gap-3 mb-6">
          <span class="moq-pill !bg-violet-100 !text-violet-800">Minimum Order: {{ moq }} pcs</span>
        </div>

        <div class="card bg-ink-50 !shadow-none border-dashed mb-6">
          <p class="text-sm text-ink-500 mb-1">Wholesale Price</p>
          <p class="font-display text-2xl font-bold text-ink-900">Revealed on WhatsApp 💬</p>
          <p class="text-xs text-ink-400 mt-1">Share your quantity and we'll send you the best bulk price directly.</p>
        </div>

        <div class="flex items-center gap-3 mb-6">
          <label class="text-sm font-semibold text-ink-700">Quantity</label>
          <input v-model.number="qty" type="number" :min="moq" step="10" class="input w-28" />
          <span class="text-xs text-ink-400">min. {{ moq }} pcs</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <button class="btn-primary" @click="addToQuoteList">
            {{ added ? '✓ Added to Quote List' : 'Add to Quote List' }}
          </button>
          <button class="btn-whatsapp" @click="askOnWhatsApp">
            <IconWhatsapp class="w-4 h-4" /> Get Price on WhatsApp
          </button>
        </div>
      </div>
    </div>
    <div v-else class="max-w-6xl mx-auto px-6 py-24 text-center text-ink-500">Product not found.</div>
  </DefaultLayout>

</template>
