<script setup>
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clients'
import IconEdit from '../../components/icons/IconEdit.vue'
import IconTrash from '../../components/icons/IconTrash.vue'

const store = useClientStore()
const router = useRouter()

function remove(client) {
  if (confirm(`Remove "${client.name}" from your clients showcase?`)) {
    store.removeClient(client.id)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-2xl font-bold text-ink-900">Clients</h1>
        <p class="text-ink-500 text-sm mt-1">Shown on your public "Our Clients" page.</p>
      </div>
      <RouterLink to="/admin/clients/new" class="btn-accent">+ Add Client</RouterLink>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div v-for="c in store.clients" :key="c.id" class="card flex gap-4 items-start">
        <img :src="c.logo" class="w-14 h-14 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-ink-800">{{ c.name }}</p>
          <p class="text-xs font-semibold uppercase tracking-wide text-violet-600">{{ c.industry }}</p>
          <p class="text-sm text-ink-500 mt-1 line-clamp-2">{{ c.highlight }}</p>
        </div>
        <div class="flex flex-col gap-1 shrink-0">
          <button class="btn-ghost !px-2" @click="router.push(`/admin/clients/${c.id}/edit`)"><IconEdit class="w-4 h-4" /></button>
          <button class="btn-danger !px-2" @click="remove(c)"><IconTrash class="w-4 h-4" /></button>
        </div>
      </div>
    </div>
    <p v-if="!store.clients.length" class="text-center text-ink-400 py-16">No clients added yet.</p>
  </div>

</template>
