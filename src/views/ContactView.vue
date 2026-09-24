<script setup>
import { reactive } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { BUSINESS } from '../config'
import { openWhatsApp } from '../utils/whatsapp'
import IconWhatsapp from '../components/icons/IconWhatsapp.vue'

const form = reactive({ name: '', company_name: '', phone: '', message: '' })

function submit() {
  const lines = [
    'Hi Zam Zam Times! I would like to request a catalogue / bulk quote.',
    '',
    `Name: ${form.name}`,
    form.company_name ? `Company: ${form.company_name}` : null,
    form.phone ? `Phone: ${form.phone}` : null,
    form.message ? `Message: ${form.message}` : null
  ].filter(Boolean)

  openWhatsApp(lines.join('\n'))
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-lg mx-auto px-6 py-16">
      <h1 class="font-display text-3xl font-bold text-ink-900 mb-2">Request Catalogue / Bulk Quote</h1>
      <p class="text-ink-500 mb-8">
        Tell us what you need — submitting this opens WhatsApp with your details
        pre-filled so our sales team can reply with pricing and MOQ options right away.
      </p>

      <form class="card space-y-4" @submit.prevent="submit">
        <input v-model="form.name" class="input" placeholder="Your name" required />
        <input v-model="form.company_name" class="input" placeholder="Company name" />
        <input v-model="form.phone" class="input" placeholder="Phone" required />
        <textarea v-model="form.message" class="input" rows="3" placeholder="What are you looking for?"></textarea>
        <button class="btn-whatsapp w-full justify-center !py-3.5 text-base" type="submit">
          <IconWhatsapp class="w-5 h-5" /> Send via WhatsApp
        </button>
      </form>

      <div class="mt-10 card !shadow-none bg-ink-50 text-sm text-ink-600 space-y-1.5">
        <p class="font-semibold text-ink-800">{{ BUSINESS.name }}</p>
        <p>{{ BUSINESS.address }}</p>
        <p>{{ BUSINESS.email }} · {{ BUSINESS.hours }}</p>
        <p>GSTIN: <span class="font-medium text-ink-800">{{ BUSINESS.gstin }}</span></p>
      </div>
    </div>
  </DefaultLayout>

</template>
