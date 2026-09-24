<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import { SITE_NAME } from '../config'
import AnimatedClock from '../components/AnimatedClock.vue'
import IconBox from '../components/icons/IconBox.vue'
import IconBuilding from '../components/icons/IconBuilding.vue'

const admin = useAdminStore()
const router = useRouter()

function logout() {
  admin.logout()
  router.push({ name: 'admin-login' })
}

const links = [
  { to: '/admin', label: 'Overview', exact: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/clients', label: 'Clients' }
]
</script>

<template>
  <div class="min-h-screen flex bg-ink-50">
    <aside class="w-64 bg-ink-950 text-ink-200 flex flex-col shrink-0">
      <div class="px-5 py-5 border-b border-white/5 flex items-center gap-2.5">
        <AnimatedClock :size="30" tone="dark" />
        <span class="font-display text-lg font-semibold text-white">{{ SITE_NAME }}</span>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm hover:bg-white/5 transition"
          active-class="bg-violet-500/15 text-violet-300"
        >
          <IconBox v-if="link.label === 'Products'" class="w-4 h-4" />
          <IconBuilding v-else-if="link.label === 'Clients'" class="w-4 h-4" />
          <span v-else class="w-4 h-4 rounded-full border border-current opacity-60"></span>
          {{ link.label }}
        </RouterLink>
      </nav>
      <div class="px-5 py-4 border-t border-white/5">
        <button class="text-sm text-ink-400 hover:text-violet-300 transition" @click="logout">Log out</button>
      </div>
    </aside>
    <div class="flex-1 p-6 md:p-8 overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>
