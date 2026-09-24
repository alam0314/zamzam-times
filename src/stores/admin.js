import { defineStore } from 'pinia'
import { ADMIN_PASSWORD } from '../config'

// Lightweight client-side session gate for the admin panel (see note in
// config.js — this is a convenience gate, not real authentication).
export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: sessionStorage.getItem('admin_session') === '1'
  }),
  actions: {
    login(password) {
      if (password === ADMIN_PASSWORD) {
        this.isAuthenticated = true
        sessionStorage.setItem('admin_session', '1')
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      sessionStorage.removeItem('admin_session')
    }
  }
})
