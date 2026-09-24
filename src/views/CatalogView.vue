<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/products'

const store = useProductStore()
const activeCategory = ref(null)
const search = ref('')

const products = computed(() => store.list({ category: activeCategory.value, q: search.value }))
</script>

<template>
  <DefaultLayout>
    <div class="bg-ink-950 py-12 mb-10">
      <div class="max-w-7xl mx-auto px-6">
        <span class="section-label mb-2">Full Range</span>
        <h1 class="font-display text-3xl md:text-4xl font-bold text-white">Wholesale Wall Clock Catalog</h1>
        <p class="text-ink-300 mt-2">Every design ships at a minimum order of 50 pieces. Pricing shared on WhatsApp.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pb-20">
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <input v-model="search" class="input md:max-w-sm" placeholder="Search wall clocks…" />
        <div class="flex gap-2 flex-wrap">
          <button
            class="chip"
            :class="!activeCategory ? 'chip-active' : 'chip-inactive'"
            @click="activeCategory = null"
          >All</button>
          <button
            v-for="c in store.categories"
            :key="c.id"
            class="chip"
            :class="activeCategory === c.id ? 'chip-active' : 'chip-inactive'"
            @click="activeCategory = c.id"
          >{{ c.name }}</button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
      <p v-if="!products.length" class="text-ink-400 text-center py-16">No products match your filters yet.</p>
    </div>
  </DefaultLayout>

</template>
