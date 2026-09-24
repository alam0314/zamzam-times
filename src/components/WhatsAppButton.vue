<script setup>
import { openWhatsApp, generalEnquiryMessage } from '../utils/whatsapp'
import IconWhatsapp from './icons/IconWhatsapp.vue'
</script>

<template>
  <button
    class="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#1ebc59] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
    title="Chat with us on WhatsApp"
    @click="openWhatsApp(generalEnquiryMessage())"
  >
    <span class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
    <IconWhatsapp class="w-8 h-8 relative" />
  </button>

</template>
