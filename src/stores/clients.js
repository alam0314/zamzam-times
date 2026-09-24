import { defineStore } from 'pinia'
import { seedClients } from '../data/seed'

const STORAGE_KEY = 'zzt_clients'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* fall through to seed */
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedClients))
  return JSON.parse(JSON.stringify(seedClients))
}

/** "Trusted by" client showcase — manageable the same way as products (add/edit/delete + logo upload), no backend required. */
export const useClientStore = defineStore('clients', {
  state: () => ({
    clients: loadInitial()
  }),
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.clients))
    },
    nextId() {
      return this.clients.length ? Math.max(...this.clients.map((c) => c.id)) + 1 : 1
    },
    addClient(data) {
      const client = {
        id: this.nextId(),
        name: data.name,
        logo: data.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
        industry: data.industry || '',
        highlight: data.highlight || ''
      }
      this.clients.push(client)
      this.persist()
      return client
    },
    updateClient(id, data) {
      const idx = this.clients.findIndex((c) => c.id === Number(id))
      if (idx === -1) return null
      const updated = { ...this.clients[idx], ...data }
      this.clients.splice(idx, 1, updated)
      this.persist()
      return updated
    },
    removeClient(id) {
      this.clients = this.clients.filter((c) => c.id !== Number(id))
      this.persist()
    }
  }
})
