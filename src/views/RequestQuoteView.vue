<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useQuoteListStore } from '../stores/quoteList'
import { openWhatsApp, quoteRequestMessage } from '../utils/whatsapp'
import IconWhatsapp from '../components/icons/IconWhatsapp.vue'

const quoteList = useQuoteListStore()
const router = useRouter()

const shipping = reactive({
  your_name: '',
  gstin: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  phone: ''
})

// No pricing engine, no payment gateway — this builds a clean item + quantity
// summary and hands it to WhatsApp, where your sales team quotes, confirms,
// and (for large orders) can hop on a WhatsApp video call to verify details.
function sendToWhatsApp() {
  const message = quoteRequestMessage({ items: quoteList.items, shipping })
  openWhatsApp(message)
  quoteList.clear()
  router.push({ name: 'home' })
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-2xl mx-auto px-6 py-14">
      <h1 class="font-display text-3xl font-bold text-ink-900 mb-2">Request a Wholesale Quote</h1>
      <p class="text-ink-500 mb-8">
        Add your delivery details below. We'll open WhatsApp with your full item list
        pre-filled so our team can confirm pricing and availability right away.
      </p>

      <form class="card space-y-4" @submit.prevent="sendToWhatsApp">
        <div>
          <label class="label">Your Name</label>
          <input v-model="shipping.your_name" class="input" required />
        </div>
        <div>
          <label class="label">GSTIN (optional)</label>
          <input v-model="shipping.gstin" class="input" />
        </div>
        <div>
          <label class="label">Delivery Address</label>
          <textarea v-model="shipping.address" class="input" rows="3" required></textarea>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <input v-model="shipping.city" class="input" placeholder="City" required />
          <input v-model="shipping.state" class="input" placeholder="State" required />
          <input v-model="shipping.pincode" class="input" placeholder="Pincode" required />
        </div>
        <input v-model="shipping.phone" class="input" placeholder="Phone" required />

        <button class="btn-whatsapp w-full justify-center !py-3.5 text-base" type="submit" :disabled="!quoteList.items.length">
          <IconWhatsapp class="w-5 h-5" /> Send Quote Request via WhatsApp
        </button>
      </form>
    </div>
  </DefaultLayout>

</template>
