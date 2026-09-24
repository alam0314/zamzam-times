import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '../stores/admin'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/catalog', name: 'catalog', component: () => import('../views/CatalogView.vue') },
  { path: '/products/:slug', name: 'product-detail', component: () => import('../views/ProductDetailView.vue') },
  { path: '/quote-list', name: 'quote-list', component: () => import('../views/QuoteListView.vue') },
  { path: '/request-quote', name: 'request-quote', component: () => import('../views/RequestQuoteView.vue') },
  { path: '/clients', name: 'clients', component: () => import('../views/ClientsView.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },

  { path: '/admin/login', name: 'admin-login', component: () => import('../views/admin/AdminLogin.vue') },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboard.vue') },
      { path: 'products', name: 'admin-products', component: () => import('../views/admin/AdminProducts.vue') },
      { path: 'products/new', name: 'admin-product-new', component: () => import('../views/admin/AdminProductForm.vue') },
      { path: 'products/:id/edit', name: 'admin-product-edit', component: () => import('../views/admin/AdminProductForm.vue') },
      { path: 'clients', name: 'admin-clients', component: () => import('../views/admin/AdminClients.vue') },
      { path: 'clients/new', name: 'admin-client-new', component: () => import('../views/admin/AdminClientForm.vue') },
      { path: 'clients/:id/edit', name: 'admin-client-edit', component: () => import('../views/admin/AdminClientForm.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  if (to.meta.requiresAdmin) {
    const admin = useAdminStore()
    if (!admin.isAuthenticated) {
      return { name: 'admin-login', query: { redirect: to.fullPath } }
    }
  }
  return true
})

export default router
