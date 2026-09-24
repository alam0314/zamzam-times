<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useQuoteListStore } from '../stores/quoteList'
import IconTrash from '../components/icons/IconTrash.vue'

const quoteList = useQuoteListStore()
</script>

<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto px-6 py-14">
      <h1 class="font-display text-3xl font-bold text-ink-900 mb-2">Your Quote List</h1>
      <p class="text-ink-500 mb-8">No prices here — just build your list, then request a wholesale quote on WhatsApp.</p>

      <div v-if="!quoteList.items.length" class="card text-center py-16">
        <p class="text-ink-500 mb-4">Your quote list is empty.</p>
        <RouterLink to="/catalog" class="btn-primary">Browse the Catalog</RouterLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="item in quoteList.items" :key="item.productId" class="card flex items-center gap-4">
          <img :src="item.image" class="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-ink-800 truncate">{{ item.name }}</p>
            <p class="text-xs text-ink-400">MOQ {{ item.moq }} pcs</p>
          </div>
          <input
            type="number"
            class="input w-24"
            :min="item.moq"
            :value="item.qty"
            @change="quoteList.updateQty(item.productId, +$event.target.value)"
          />
          <button class="btn-danger !px-2.5" @click="quoteList.removeItem(item.productId)">
            <IconTrash class="w-4 h-4" />
          </button>
        </div>

        <div class="flex justify-end pt-4">
          <RouterLink to="/request-quote" class="btn-accent">Request Wholesale Quote →</RouterLink>
        </div>
      </div>
    </div>
  </DefaultLayout>

</template>
