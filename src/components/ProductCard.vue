<script setup>
import { RouterLink } from 'vue-router'
import { MIN_ORDER_QTY } from '../config'
import { openWhatsApp, priceRequestMessage } from '../utils/whatsapp'
import IconWhatsapp from './icons/IconWhatsapp.vue'

const props = defineProps({ product: { type: Object, required: true } })

function quickEnquire() {
  openWhatsApp(priceRequestMessage(props.product, props.product.moq || MIN_ORDER_QTY))
}
</script>

<template>
  <div class="card !p-0 overflow-hidden group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 relative">
    <span v-if="product.badge" class="badge">{{ product.badge }}</span>
    <RouterLink :to="`/products/${product.slug}`" class="block aspect-square bg-ink-50 overflow-hidden relative">
      <img :src="product.images?.[0]" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
    </RouterLink>
    <div class="p-5">
      <RouterLink :to="`/products/${product.slug}`">
        <h3 class="font-semibold text-ink-800 line-clamp-1 hover:text-violet-700 transition">{{ product.name }}</h3>
      </RouterLink>
      <p class="moq-pill mt-2">MOQ {{ product.moq || MIN_ORDER_QTY }} pcs</p>

      <div class="mt-4 flex items-center justify-between gap-2">
        <span class="text-sm font-semibold text-ink-500">Price on request</span>
        <button class="btn-whatsapp !px-3 !py-1.5 !text-xs" @click="quickEnquire">
          <IconWhatsapp class="w-3.5 h-3.5" /> Get Price
        </button>
      </div>
    </div>
  </div>

</template>
