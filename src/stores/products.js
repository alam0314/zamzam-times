import { defineStore } from 'pinia'
import { seedProducts, seedCategories } from '../data/seed'
import { MIN_ORDER_QTY } from '../config'

const STORAGE_KEY = 'zzt_products'
const CATEGORY_KEY = 'zzt_categories'

function loadInitial(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    /* fall through to seed */
  }
  localStorage.setItem(key, JSON.stringify(seed))
  return JSON.parse(JSON.stringify(seed))
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/**
 * Product catalog store. Fully client-side: seeded once from
 * src/data/seed.js, then persisted to localStorage so admin changes
 * (add/edit/delete + uploaded images) survive page reloads with no backend.
 * Pricing is intentionally NOT part of the public product model — every
 * product is quoted over WhatsApp, so there's nothing to store or leak here.
 */
export const useProductStore = defineStore('products', {
  state: () => ({
    products: loadInitial(STORAGE_KEY, seedProducts),
    categories: loadInitial(CATEGORY_KEY, seedCategories)
  }),
  getters: {
    featured: (state) => state.products.filter((p) => p.featured),
    byId: (state) => (id) => state.products.find((p) => p.id === Number(id)),
    bySlug: (state) => (slug) => state.products.find((p) => p.slug === slug),
    categoryName: (state) => (categoryId) => state.categories.find((c) => c.id === categoryId)?.name ?? 'Uncategorized'
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
    },
    list({ category = null, q = '', featuredOnly = false } = {}) {
      return this.products.filter((p) => {
        if (featuredOnly && !p.featured) return false
        if (category && p.categoryId !== category) return false
        if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
        return true
      })
    },
    nextId() {
      return this.products.length ? Math.max(...this.products.map((p) => p.id)) + 1 : 1
    },
    addProduct(data) {
      const product = {
        id: this.nextId(),
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug?.trim() ? slugify(data.slug) : slugify(data.name),
        description: data.description || '',
        images: data.images?.length ? data.images : ['https://placehold.co/900x900?text=Zam+Zam+Times'],
        moq: Math.max(Number(data.moq) || MIN_ORDER_QTY, MIN_ORDER_QTY),
        featured: !!data.featured,
        badge: data.badge || null
      }
      this.products.push(product)
      this.persist()
      return product
    },
    updateProduct(id, data) {
      const idx = this.products.findIndex((p) => p.id === Number(id))
      if (idx === -1) return null
      const existing = this.products[idx]
      const updated = {
        ...existing,
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug?.trim() ? slugify(data.slug) : existing.slug,
        description: data.description,
        images: data.images?.length ? data.images : existing.images,
        moq: Math.max(Number(data.moq) || MIN_ORDER_QTY, MIN_ORDER_QTY),
        featured: !!data.featured,
        badge: data.badge || null
      }
      this.products.splice(idx, 1, updated)
      this.persist()
      return updated
    },
    removeProduct(id) {
      this.products = this.products.filter((p) => p.id !== Number(id))
      this.persist()
    },
    resetToSeed() {
      this.products = JSON.parse(JSON.stringify(seedProducts))
      this.categories = JSON.parse(JSON.stringify(seedCategories))
      this.persist()
      localStorage.setItem(CATEGORY_KEY, JSON.stringify(this.categories))
    }
  }
})
