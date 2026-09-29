<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useClientStore } from '../stores/clients'
import IconBuilding from '../components/icons/IconBuilding.vue'

const clientStore = useClientStore()
</script>

<template>
  <DefaultLayout>
    <div class="bg-ink-950 py-16">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <span class="section-label mb-3 justify-center">Our Track Record</span>
        <h1 class="font-display text-3xl md:text-4xl font-bold text-white mb-3">Businesses That Trust Zam Zam Times</h1>
        <p class="text-ink-300 max-w-2xl mx-auto">
          From retail chains to hotel groups and corporate gifting programs — here are some of
          the businesses we've completed bulk deals with.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid sm:grid-cols-2 gap-6">
        <div v-for="c in clientStore.clients" :key="c.id" class="card flex gap-5 items-start hover:shadow-glow transition">
          <img :src="c.logo" :alt="c.name" class="w-16 h-16 rounded-2xl object-cover bg-ink-50 shrink-0" />
          <div>
            <h3 class="font-semibold text-lg text-ink-900">{{ c.name }}</h3>
            <p class="text-xs font-semibold uppercase tracking-wide text-violet-600 mt-0.5">{{ c.industry }}</p>
            <p class="text-ink-600 mt-2 text-sm">{{ c.highlight }}</p>
          </div>
        </div>
      </div>

      <div v-if="!clientStore.clients.length" class="text-center py-20 text-ink-400">
        <IconBuilding class="w-10 h-10 mx-auto mb-3 opacity-40" />
        No client stories added yet.
      </div>
    </div>
  </DefaultLayout>

</template>
