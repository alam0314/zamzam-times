<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../../stores/products'
import { resizeImage } from '../../utils/image'
import { MIN_ORDER_QTY } from '../../config'
import IconUpload from '../../components/icons/IconUpload.vue'
import IconTrash from '../../components/icons/IconTrash.vue'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

const isEdit = computed(() => !!route.params.id)
const existing = isEdit.value ? store.byId(route.params.id) : null

const form = reactive({
  name: existing?.name || '',
  slug: existing?.slug || '',
  categoryId: existing?.categoryId || store.categories[0]?.id || null,
  description: existing?.description || '',
  moq: existing?.moq || MIN_ORDER_QTY,
  featured: existing?.featured || false,
  badge: existing?.badge || '',
  images: existing?.images ? [...existing.images] : []
})

const uploading = ref(false)
const fileInput = ref(null)

async function handleFiles(e) {
  const files = Array.from(e.target.files || [])
  if (!files.length) return
  uploading.value = true
  try {
    for (const file of files) {
      const dataUrl = await resizeImage(file)
      form.images.push(dataUrl)
    }
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function removeImage(idx) {
  form.images.splice(idx, 1)
}

function save() {
  if (form.moq < MIN_ORDER_QTY) form.moq = MIN_ORDER_QTY

  if (isEdit.value) {
    store.updateProduct(route.params.id, form)
  } else {
    store.addProduct(form)
  }
  router.push({ name: 'admin-products' })
}

onMounted(() => {
  if (isEdit.value && !existing) {
    router.replace({ name: 'admin-products' })
  }
})
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="font-display text-2xl font-bold text-ink-900 mb-6">{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h1>

    <form class="card space-y-6" @submit.prevent="save">
      <!-- Images -->
      <div>
        <label class="label">Product Photos</label>
        <div class="flex flex-wrap gap-3">
          <div v-for="(img, idx) in form.images" :key="idx" class="relative w-24 h-24 rounded-xl overflow-hidden group border border-ink-900/10">
            <img :src="img" class="w-full h-full object-cover" />
            <button
              type="button"
              class="absolute inset-0 bg-ink-950/60 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
              @click="removeImage(idx)"
            >
              <IconTrash class="w-4 h-4" />
            </button>
            <span v-if="idx === 0" class="absolute bottom-1 left-1 text-[9px] font-bold bg-violet-500 text-ink-950 px-1.5 py-0.5 rounded-full">MAIN</span>
          </div>

          <label class="w-24 h-24 rounded-xl border-2 border-dashed border-ink-900/15 hover:border-violet-500 flex flex-col items-center justify-center gap-1 text-ink-400 hover:text-violet-600 cursor-pointer transition">
            <IconUpload class="w-5 h-5" />
            <span class="text-[10px] font-medium">{{ uploading ? 'Uploadingâ€¦' : 'Upload' }}</span>
            <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleFiles" />
          </label>
        </div>
        <p class="text-xs text-ink-400 mt-2">First photo is used as the main image. Images are resized and stored locally in your browser.</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="label">Product Name</label>
          <input v-model="form.name" class="input" required />
        </div>
        <div>
          <label class="label">URL Slug (optional)</label>
          <input v-model="form.slug" class="input" placeholder="auto-generated from name" />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="label">Category</label>
          <select v-model="form.categoryId" class="input">
            <option v-for="c in store.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div>
          <label class="label">Minimum Order Quantity</label>
          <input v-model.number="form.moq" type="number" :min="MIN_ORDER_QTY" class="input" />
          <p class="text-xs text-ink-400 mt-1">Storewide minimum is {{ MIN_ORDER_QTY }} pcs.</p>
        </div>
      </div>

      <div>
        <label class="label">Description</label>
        <textarea v-model="form.description" class="input" rows="3"></textarea>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <label class="label">Badge (optional)</label>
          <input v-model="form.badge" class="input" placeholder="e.g. Bestseller, New, Premium" />
        </div>
        <label class="flex items-center gap-2.5 pb-2.5 cursor-pointer">
          <input v-model="form.featured" type="checkbox" class="w-4 h-4 accent-violet-500" />
          <span class="text-sm font-medium text-ink-700">Show in "Featured" on homepage</span>
        </label>
      </div>

      <div class="flex gap-3 pt-2">
        <button class="btn-accent" type="submit">{{ isEdit ? 'Save Changes' : 'Add Product' }}</button>
        <RouterLink to="/admin/products" class="btn-outline-light">Cancel</RouterLink>
      </div>
    </form>
  </div>

</template>
