import { defineStore } from 'pinia'
import { MIN_ORDER_QTY } from '../config'

/**
 * Replaces a traditional "cart": since pricing is never shown on the site,
 * this only tracks product + quantity so the buyer can request a combined
 * wholesale quote for multiple products over WhatsApp in one message.
 * Persisted to localStorage — no backend needed.
 */
export const useQuoteListStore = defineStore('quoteList', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('zzt_quote_list') || '[]')
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0)
  },
  actions: {
    persist() {
      localStorage.setItem('zzt_quote_list', JSON.stringify(this.items))
    },
    addItem(product, qty) {
      const quantity = Math.max(Number(qty) || MIN_ORDER_QTY, product.moq || MIN_ORDER_QTY)
      const existing = this.items.find((i) => i.productId === product.id)
      if (existing) {
        existing.qty += quantity
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          image: product.images?.[0],
          qty: quantity,
          moq: product.moq || MIN_ORDER_QTY
        })
      }
      this.persist()
    },
    updateQty(productId, qty) {
      const item = this.items.find((i) => i.productId === productId)
      if (item) item.qty = Math.max(Number(qty) || item.moq, item.moq)
      this.persist()
    },
    removeItem(productId) {
      this.items = this.items.filter((i) => i.productId !== productId)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    }
  }
})
