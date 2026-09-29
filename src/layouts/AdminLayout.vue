<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import { SITE_NAME } from '../config'
import AnimatedClock from '../components/AnimatedClock.vue'
import IconBox from '../components/icons/IconBox.vue'
import IconBuilding from '../components/icons/IconBuilding.vue'
import IconMenu from '../components/icons/IconMenu.vue'
import IconClose from '../components/icons/IconClose.vue'

const admin = useAdminStore()
const router = useRouter()
const route = useRoute()

// Sidebar is a fixed column on desktop, but becomes a slide-in drawer with a
// backdrop on phones/tablets — toggled by the hamburger button in the mobile
// top bar below. Closed by default on small screens so it never blocks content.
const sidebarOpen = ref(false)

function logout() {
  admin.logout()
  router.push({ name: 'admin-login' })
}

// Auto-close the mobile drawer whenever the admin navigates to a new page.
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  }
)

const links = [
  { to: '/admin', label: 'Overview', exact: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/clients', label: 'Clients' }
]

/**
 * We compute "is this nav item active" ourselves instead of relying on
 * RouterLink's built-in active-class matching. Reason: Vue Router has a
 * documented fallback rule for parent routes that have a default (empty-path)
 * child — like "Overview", which lives at the bare /admin path. That fallback
 * causes /admin's link to ALSO be treated as active on every other admin
 * sub-route (e.g. /admin/clients, /admin/products), because internally it
 * can't fully distinguish "link to the parent's default child" from "link to
 * the parent section as a whole". That produced the bug where "Overview" and
 * "Clients" were both highlighted at the same time.
 *
 * Doing exact string comparisons here instead is simple, predictable, and
 * side-steps that behavior entirely:
 *   - Overview (exact: true) is active ONLY on exactly /admin.
 *   - Products/Clients are active on their own path AND any nested route
 *     underneath it (e.g. /admin/products/new, /admin/products/5/edit),
 *     so the section stays highlighted while adding/editing an item too.
 */
function isLinkActive(link) {
  if (link.exact) return route.path === link.to
  return route.path === link.to || route.path.startsWith(link.to + '/')
}
</script>

<template>
  <div class="min-h-screen flex bg-ink-50">
    <!-- Backdrop overlay, only rendered/visible while the mobile drawer is open -->
    <transition name="fade-in">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-ink-950/50 md:hidden"
        @click="sidebarOpen = false"
      ></div>
    </transition>

    <!--
      Sidebar: a normal static column on md+ screens; on small screens it
      becomes a fixed, off-canvas drawer that slides in from the left and
      sits above the backdrop/content (z-50), toggled by sidebarOpen.
    -->
    <aside
      class="w-72 max-w-[85vw] md:w-64 bg-ink-950 text-ink-200 flex flex-col shrink-0 fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-out md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="px-5 py-5 border-b border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-2.5 min-w-0">
          <AnimatedClock :size="30" tone="dark" class="shrink-0" />
          <span class="font-display text-lg font-semibold text-white truncate">{{ SITE_NAME }}</span>
        </div>
        <button class="md:hidden text-ink-300 hover:text-white shrink-0" @click="sidebarOpen = false" aria-label="Close menu">
          <IconClose class="w-5 h-5" />
        </button>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition"
          :class="isLinkActive(link) ? 'bg-violet-500/15 text-violet-300' : 'hover:bg-white/5'"
        >
          <IconBox v-if="link.label === 'Products'" class="w-4 h-4 shrink-0" />
          <IconBuilding v-else-if="link.label === 'Clients'" class="w-4 h-4 shrink-0" />
          <span v-else class="w-4 h-4 rounded-full border border-current opacity-60 shrink-0"></span>
          {{ link.label }}
        </RouterLink>
      </nav>
      <div class="px-5 py-4 border-t border-white/5">
        <button class="text-sm text-ink-400 hover:text-violet-300 transition" @click="logout">Log out</button>
      </div>
    </aside>

    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Mobile-only top bar: hamburger to open the drawer, since the sidebar is hidden by default on small screens -->
      <div class="md:hidden sticky top-0 z-30 bg-ink-950 text-white px-4 py-3 flex items-center gap-3 shadow-soft">
        <button class="text-white" @click="sidebarOpen = true" aria-label="Open menu">
          <IconMenu class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-2 min-w-0">
          <AnimatedClock :size="22" tone="dark" class="shrink-0" />
          <span class="font-display text-base font-semibold truncate">{{ SITE_NAME }} Admin</span>
        </div>
      </div>

      <div class="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden overflow-y-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
