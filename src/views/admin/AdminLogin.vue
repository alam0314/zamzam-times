<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { SITE_NAME } from '../../config'
import AnimatedClock from '../../components/AnimatedClock.vue'
import IconLock from '../../components/icons/IconLock.vue'

const admin = useAdminStore()
const router = useRouter()
const route = useRoute()
const password = ref('')
const error = ref('')

function submit() {
  if (admin.login(password.value)) {
    router.push(route.query.redirect || { name: 'admin-dashboard' })
  } else {
    error.value = 'Incorrect password. Please try again.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-ink-950 flex items-center justify-center px-6 relative overflow-hidden">
    <div class="absolute -right-20 -top-20 opacity-20"><AnimatedClock :size="420" tone="dark" /></div>
    <div class="relative w-full max-w-sm">
      <div class="flex items-center gap-2.5 justify-center mb-8">
        <AnimatedClock :size="34" tone="dark" />
        <span class="font-display text-2xl font-semibold text-white">{{ SITE_NAME }}</span>
      </div>

      <form class="bg-white rounded-2xl shadow-2xl p-8 space-y-5" @submit.prevent="submit">
        <div class="flex items-center gap-2 text-ink-800">
          <IconLock class="w-5 h-5 text-violet-600" />
          <h1 class="font-semibold text-lg">Admin Access</h1>
        </div>
        <div>
          <label class="label">Password</label>
          <input v-model="password" type="password" class="input" placeholder="Enter admin password" required autofocus />
        </div>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <button class="btn-primary w-full" type="submit">Enter Admin Panel</button>
      </form>
      <p class="text-center text-ink-500 text-xs mt-5">
        <RouterLink to="/" class="hover:text-violet-400 transition">← Back to storefront</RouterLink>
      </p>
    </div>
  </div>

</template>
