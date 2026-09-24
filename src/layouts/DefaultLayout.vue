<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fbfaf8]">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
