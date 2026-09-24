<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <!-- Floating WhatsApp button on every storefront page (hidden in admin) -->
  <WhatsAppButton v-if="!isAdminRoute" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
