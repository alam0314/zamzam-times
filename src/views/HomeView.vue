<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ProductCard from '../components/ProductCard.vue'
import Carousel from '../components/Carousel.vue'
import AnimatedClock from '../components/AnimatedClock.vue'
import { useProductStore } from '../stores/products'
import { useClientStore } from '../stores/clients'
import { seedBanners } from '../data/seed'
import { BUSINESS, MIN_ORDER_QTY } from '../config'
import { openWhatsApp, generalEnquiryMessage } from '../utils/whatsapp'
import IconWhatsapp from '../components/icons/IconWhatsapp.vue'
import IconTruck from '../components/icons/IconTruck.vue'
import IconShield from '../components/icons/IconShield.vue'
import IconTag from '../components/icons/IconTag.vue'
import IconArrowRight from '../components/icons/IconArrowRight.vue'

const productStore = useProductStore()
const clientStore = useClientStore()
const featured = productStore.featured
const clients = clientStore.clients
</script>

<template>
  <DefaultLayout>
    <!-- HERO: dark, premium, with a large realistic ticking clock as ambient background motion -->
    <section class="relative bg-ink-950 overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-[length:44px_44px] opacity-40"></div>
      <div class="absolute inset-0 bg-radial-fade"></div>

      <!-- Large ambient clocks: one slow-drifting big one, one smaller counter-rotating accent -->
      <div class="absolute -right-24 -top-24 md:-right-10 md:-top-32 opacity-90 animate-float">
        <AnimatedClock :size="560" tone="dark" />
      </div>
      <div class="absolute -left-20 bottom-0 opacity-30 hidden lg:block">
        <AnimatedClock :size="260" tone="dark" />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div class="animate-fade-up">
          <span class="section-label mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulseGlow"></span>
            Premium Wholesale Wall Clocks
          </span>
          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-6">
            Timeless Pieces,<br />
            <span class="text-violet-500">Built for Business.</span>
          </h1>
          <p class="text-ink-300 text-lg mb-8 max-w-lg">
            Zam Zam Times supplies premium wall clocks in bulk - fully customizable branding,
            pan-India delivery, and pricing tailored to your order, shared directly on WhatsApp.
          </p>

          <div class="flex flex-wrap gap-4 mb-10">
            <RouterLink to="/catalog" class="btn-accent">
              Explore Catalog <IconArrowRight class="w-4 h-4" />
            </RouterLink>
            <button class="btn-outline" @click="openWhatsApp(generalEnquiryMessage('Home page'))">
              <IconWhatsapp class="w-4 h-4" /> Chat on WhatsApp
            </button>
          </div>

          <div class="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300">
            <span class="flex items-center gap-2"><IconTag class="w-4 h-4 text-violet-400" /> MOQ {{ MIN_ORDER_QTY }} pcs</span>
            <span class="flex items-center gap-2"><IconTruck class="w-4 h-4 text-violet-400" /> Pan-India Delivery</span>
            <span class="flex items-center gap-2"><IconShield class="w-4 h-4 text-violet-400" /> GSTIN {{ BUSINESS.gstin }}</span>
          </div>
        </div>

        <!-- Sliding carousel of 5 signature designs -->
        <div class="animate-fade-up h-[360px] sm:h-[420px] lg:h-[460px]" style="animation-delay: 0.15s">
          <Carousel :slides="seedBanners" />
        </div>
      </div>
    </section>

    <!-- Trust strip -->
    <section class="bg-white border-b border-ink-900/5">
      <div class="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium text-ink-600">
        <span class="flex items-center gap-2"><IconTag class="w-4 h-4 text-violet-600" /> Wholesale pricing on WhatsApp</span>
        <span class="flex items-center gap-2"><IconShield class="w-4 h-4 text-violet-600" /> 100% Customizable Branding</span>
        <span class="flex items-center gap-2"><IconTruck class="w-4 h-4 text-violet-600" /> Fast Pan-India Delivery</span>
        <span class="flex items-center gap-2">GSTIN {{ BUSINESS.gstin }}</span>
      </div>
    </section>

    <!-- Featured products -->
    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="section-label mb-2">Signature Collection</span>
          <h2 class="font-display text-3xl font-bold text-ink-900">Featured Wall Clocks</h2>
        </div>
        <RouterLink to="/catalog" class="btn-ghost hidden sm:inline-flex">
          View full catalog <IconArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" class="animate-fade-up" />
      </div>
      <div class="mt-8 text-center sm:hidden">
        <RouterLink to="/catalog" class="btn-outline-light">View full catalog</RouterLink>
      </div>
    </section>

    <!-- Clients marquee -->
    <section class="bg-ink-900 py-16 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <span class="section-label mb-2">Trusted By</span>
          <h2 class="font-display text-2xl font-bold text-white">Businesses We've Supplied</h2>
        </div>
        <RouterLink to="/clients" class="btn-ghost !text-ink-300 hover:!text-violet-300 hidden sm:inline-flex">
          See all clients <IconArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
      <div class="flex gap-6 marquee-track w-max">
        <div v-for="c in [...clients, ...clients]" :key="c.id + '-' + Math.random()" class="w-72 shrink-0 bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <img :src="c.logo" :alt="c.name" class="w-12 h-12 rounded-full object-cover bg-white/10 shrink-0" />
          <div class="min-w-0">
            <p class="text-white font-semibold truncate">{{ c.name }}</p>
            <p class="text-ink-400 text-xs truncate">{{ c.industry }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="relative bg-gradient-to-br from-violet-500 to-violet-700 py-16 overflow-hidden">
      <div class="absolute -right-10 -bottom-16 opacity-20">
        <AnimatedClock :size="260" tone="light" />
      </div>
      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-ink-950 mb-3">Ready to place a bulk order?</h2>
        <p class="text-ink-900/80 mb-8 max-w-xl mx-auto">
          Share your requirement on WhatsApp and get wholesale pricing for quantities of {{ MIN_ORDER_QTY }}+ pieces, tailored to your business.
        </p>
        <button class="btn-primary !bg-ink-950 hover:!bg-ink-900" @click="openWhatsApp(generalEnquiryMessage('CTA banner'))">
          <IconWhatsapp class="w-4 h-4" /> Get Wholesale Pricing
        </button>
      </div>
    </section>
  </DefaultLayout>

</template>
