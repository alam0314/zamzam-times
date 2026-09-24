<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clients'
import { resizeImage } from '../../utils/image'
import IconUpload from '../../components/icons/IconUpload.vue'
import IconTrash from '../../components/icons/IconTrash.vue'

const route = useRoute()
const router = useRouter()
const store = useClientStore()

const isEdit = computed(() => !!route.params.id)
const existing = isEdit.value ? store.clients.find((c) => c.id === Number(route.params.id)) : null

const form = reactive({
  name: existing?.name || '',
  industry: existing?.industry || '',
  highlight: existing?.highlight || '',
  logo: existing?.logo || ''
})

const uploading = ref(false)

async function handleFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    form.logo = await resizeImage(file, 400, 0.9)
  } finally {
    uploading.value = false
  }
}

function removeLogo() {
  form.logo = ''
}

function save() {
  if (isEdit.value) {
    store.updateClient(route.params.id, form)
  } else {
    store.addClient(form)
  }
  router.push({ name: 'admin-clients' })
}

onMounted(() => {
  if (isEdit.value && !existing) {
    router.replace({ name: 'admin-clients' })
  }
})
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="font-display text-2xl font-bold text-ink-900 mb-6">{{ isEdit ? 'Edit Client' : 'Add Client' }}</h1>

    <form class="card space-y-6" @submit.prevent="save">
      <div>
        <label class="label">Logo / Photo</label>
        <div class="flex items-center gap-4">
          <div v-if="form.logo" class="relative w-20 h-20 rounded-xl overflow-hidden group border border-ink-900/10">
            <img :src="form.logo" class="w-full h-full object-cover" />
            <button type="button" class="absolute inset-0 bg-ink-950/60 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center" @click="removeLogo">
              <IconTrash class="w-4 h-4" />
            </button>
          </div>
          <label class="w-20 h-20 rounded-xl border-2 border-dashed border-ink-900/15 hover:border-violet-500 flex flex-col items-center justify-center gap-1 text-ink-400 hover:text-violet-600 cursor-pointer transition">
            <IconUpload class="w-5 h-5" />
            <span class="text-[10px] font-medium">{{ uploading ? 'Uploadingâ€¦' : 'Upload' }}</span>
            <input type="file" accept="image/*" class="hidden" @change="handleFile" />
          </label>
          <p class="text-xs text-ink-400">If left empty, a placeholder icon based on the name is used.</p>
        </div>
      </div>

      <div>
        <label class="label">Company Name</label>
        <input v-model="form.name" class="input" required />
      </div>
      <div>
        <label class="label">Industry</label>
        <input v-model="form.industry" class="input" placeholder="e.g. Retail Chain, Hotel Group" />
      </div>
      <div>
        <label class="label">Deal Highlight</label>
        <textarea v-model="form.highlight" class="input" rows="2" placeholder="e.g. Supplied 10,000+ units across 40 stores"></textarea>
      </div>

      <div class="flex gap-3 pt-2">
        <button class="btn-accent" type="submit">{{ isEdit ? 'Save Changes' : 'Add Client' }}</button>
        <RouterLink to="/admin/clients" class="btn-outline-light">Cancel</RouterLink>
      </div>
    </form>
  </div>

</template>
