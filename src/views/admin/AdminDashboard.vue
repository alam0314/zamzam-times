<script setup>
import { computed } from 'vue'
import { useProductStore } from '../../stores/products'
import { useClientStore } from '../../stores/clients'
import IconBox from '../../components/icons/IconBox.vue'
import IconBuilding from '../../components/icons/IconBuilding.vue'
import IconTag from '../../components/icons/IconTag.vue'

const productStore = useProductStore()
const clientStore = useClientStore()

const featuredCount = computed(() => productStore.products.filter((p) => p.featured).length)
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-ink-900 mb-1">Overview</h1>
    <p class="text-ink-500 mb-8">Manage your storefront catalog and client showcase â€” no developer needed.</p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
      <div class="card flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center"><IconBox class="w-5 h-5" /></div>
        <div>
          <p class="text-sm text-ink-500">Total Products</p>
          <p class="text-2xl font-bold text-ink-900">{{ productStore.products.length }}</p>
        </div>
      </div>
      <div class="card flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center"><IconTag class="w-5 h-5" /></div>
        <div>
          <p class="text-sm text-ink-500">Featured on Home</p>
          <p class="text-2xl font-bold text-ink-900">{{ featuredCount }}</p>
        </div>
      </div>
      <div class="card flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center"><IconBuilding class="w-5 h-5" /></div>
        <div>
          <p class="text-sm text-ink-500">Clients Showcased</p>
          <p class="text-2xl font-bold text-ink-900">{{ clientStore.clients.length }}</p>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="card">
        <h2 class="font-semibold text-ink-800 mb-3">Products</h2>
        <p class="text-sm text-ink-500 mb-4">Add, edit, or remove wall clocks â€” including photos â€” from your public catalog.</p>
        <RouterLink to="/admin/products" class="btn-primary">Manage Products</RouterLink>
      </div>
      <div class="card">
        <h2 class="font-semibold text-ink-800 mb-3">Clients</h2>
        <p class="text-sm text-ink-500 mb-4">Showcase businesses you've completed bulk deals with on the public "Our Clients" page.</p>
        <RouterLink to="/admin/clients" class="btn-primary">Manage Clients</RouterLink>
      </div>
    </div>
  </div>

</template>
