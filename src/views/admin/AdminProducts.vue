<script setup>
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/products'
import IconEdit from '../../components/icons/IconEdit.vue'
import IconTrash from '../../components/icons/IconTrash.vue'

const store = useProductStore()
const router = useRouter()

function remove(product) {
  if (confirm(`Delete "${product.name}"? This cannot be undone.`)) {
    store.removeProduct(product.id)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-2xl font-bold text-ink-900">Products</h1>
        <p class="text-ink-500 text-sm mt-1">{{ store.products.length }} product(s) in your catalog</p>
      </div>
      <RouterLink to="/admin/products/new" class="btn-accent">+ Add Product</RouterLink>
    </div>

    <div class="card !p-0 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-ink-50 text-left text-ink-500">
          <tr>
            <th class="px-5 py-3 font-semibold">Image</th>
            <th class="px-5 py-3 font-semibold">Name</th>
            <th class="px-5 py-3 font-semibold">Category</th>
            <th class="px-5 py-3 font-semibold">MOQ</th>
            <th class="px-5 py-3 font-semibold">Featured</th>
            <th class="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in store.products" :key="p.id" class="border-t border-ink-900/5 hover:bg-ink-50/60 transition">
            <td class="px-5 py-3">
              <img :src="p.images?.[0]" class="w-12 h-12 rounded-lg object-cover" />
            </td>
            <td class="px-5 py-3 font-medium text-ink-800">{{ p.name }}</td>
            <td class="px-5 py-3 text-ink-500">{{ store.categoryName(p.categoryId) }}</td>
            <td class="px-5 py-3 text-ink-500">{{ p.moq }} pcs</td>
            <td class="px-5 py-3">
              <span v-if="p.featured" class="chip chip-active !bg-violet-500 !text-ink-950 !border-violet-500 !py-0.5 !px-2.5 text-xs">Yes</span>
              <span v-else class="text-ink-400 text-xs">—</span>
            </td>
            <td class="px-5 py-3 text-right whitespace-nowrap">
              <button class="btn-ghost !px-2" @click="router.push(`/admin/products/${p.id}/edit`)"><IconEdit class="w-4 h-4" /></button>
              <button class="btn-danger !px-2" @click="remove(p)"><IconTrash class="w-4 h-4" /></button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!store.products.length" class="text-center text-ink-400 py-16">No products yet — add your first one.</p>
    </div>
  </div>

</template>
