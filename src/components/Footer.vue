<script setup>
import { BUSINESS, SITE_NAME } from '../config'
import AnimatedClock from './AnimatedClock.vue'
</script>

<template>
  <footer class="bg-ink-950 text-ink-300 mt-16 relative overflow-hidden">
    <div class="absolute -right-16 -bottom-16 opacity-[0.06]">
      <AnimatedClock :size="280" tone="dark" />
    </div>

    <div class="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm relative">
      <div>
        <div class="flex items-center gap-2 mb-3">
          <AnimatedClock :size="28" tone="dark" />
          <span class="font-display text-lg font-semibold text-white">{{ SITE_NAME }}</span>
        </div>
        <p class="text-ink-400">{{ BUSINESS.address }}</p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">For Buyers</h4>
        <ul class="space-y-2 text-ink-400">
          <li>Wholesale pricing revealed on WhatsApp</li>
          <li>Minimum order: 50 pieces</li>
          <li>Pan-India delivery &amp; tracking</li>
          <li>GST invoicing on every order</li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Contact</h4>
        <ul class="space-y-2 text-ink-400">
          <li>{{ BUSINESS.email }}</li>
          <li>{{ BUSINESS.hours }}</li>
          <li>GSTIN: <span class="text-ink-200 font-medium">{{ BUSINESS.gstin }}</span></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Explore</h4>
        <ul class="space-y-2 text-ink-400">
          <li><RouterLink to="/catalog" class="hover:text-violet-400 transition">Full Catalog</RouterLink></li>
          <li><RouterLink to="/clients" class="hover:text-violet-400 transition">Our Clients</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-violet-400 transition">Request Bulk Quote</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="text-center text-xs text-ink-500 py-5 border-t border-white/5 relative">
      © {{ new Date().getFullYear() }} {{ SITE_NAME }}. All rights reserved. &nbsp;·&nbsp; GSTIN {{ BUSINESS.gstin }}
    </div>
  </footer>
</template>
