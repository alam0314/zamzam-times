<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useQuoteListStore } from '../stores/quoteList'
import { SITE_NAME } from '../config'
import { openWhatsApp, generalEnquiryMessage } from '../utils/whatsapp'
import AnimatedClock from './AnimatedClock.vue'
import IconMenu from './icons/IconMenu.vue'
import IconClose from './icons/IconClose.vue'
import IconWhatsapp from './icons/IconWhatsapp.vue'

const quoteList = useQuoteListStore()
const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { to: '/catalog', label: 'Catalog' },
  { to: '/clients', label: 'Our Clients' },
  { to: '/contact', label: 'Bulk Quote' }
]
</script>

<template>
  <header class="bg-ink-900/95 backdrop-blur border-b border-white/5 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-18 py-3">
      <RouterLink to="/" class="flex items-center gap-2.5 group">
        <span class="w-9 h-9 shrink-0 relative">
          <AnimatedClock :size="36" tone="dark" class="drop-shadow" />
        </span>
        <span class="font-display text-xl sm:text-2xl font-semibold text-white tracking-wide">
          {{ SITE_NAME }}
        </span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:text-violet-300 transition"
          :class="{ 'text-violet-400': route.path === link.to }"
        >{{ link.label }}</RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <RouterLink to="/quote-list" class="relative text-white/80 hover:text-violet-300 transition">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 2 L4 8 v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8l-5-6" />
            <path d="M9 2h6" />
          </svg>
          <span v-if="quoteList.itemCount" class="absolute -top-2 -right-2 bg-violet-500 text-ink-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ quoteList.itemCount }}</span>
        </RouterLink>

        <button class="hidden sm:inline-flex btn-whatsapp !px-4 !py-2 text-sm" @click="openWhatsApp(generalEnquiryMessage())">
          <IconWhatsapp class="w-4 h-4" /> WhatsApp
        </button>

        <button class="md:hidden text-white" @click="mobileOpen = !mobileOpen">
          <IconClose v-if="mobileOpen" class="w-6 h-6" />
          <IconMenu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <transition name="fade-in">
      <div v-if="mobileOpen" class="md:hidden border-t border-white/5 bg-ink-900 px-4 py-4 space-y-3">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block text-white/80 hover:text-violet-300 py-1.5"
          @click="mobileOpen = false"
        >{{ link.label }}</RouterLink>
        <button class="btn-whatsapp w-full justify-center mt-2" @click="openWhatsApp(generalEnquiryMessage())">
          <IconWhatsapp class="w-4 h-4" /> WhatsApp Us
        </button>
      </div>
    </transition>
  </header>

</template>
