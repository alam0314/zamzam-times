// Central place to configure your business identity & WhatsApp number.
export const SITE_NAME = 'Zam Zam Times'

// Use the FULL international format with country code, no +, no spaces, no dashes.
// Example for an Indian number +91 99710 83325 -> "919205878130"
export const WHATSAPP_NUMBER = '919205878130' // TODO: replace with your real WhatsApp Business number

export const BUSINESS = {
  name: SITE_NAME,
  email: 'contact@zamzamtimes.in',
  address: 'Shop no. 314, New Lajpat Rai Market, Chandni Chowk, Delhi 110006',
  hours: 'Mon to Sat: 10am – 7pm',
  gstin: '07AHOPW4313M1ZQ'
}

// Minimum order quantity enforced storewide — every product, every enquiry.
export const MIN_ORDER_QTY = 50

// Soft client-side gate for the admin panel — this is NOT real security
// (anyone can read this file in the built JS bundle). It's meant only to
// keep the product-management screen away from casual storefront visitors.
// For real protection, put this site behind a hosting-level password, or
// add a small backend with proper authentication.
export const ADMIN_PASSWORD = 'zamzam2026' // TODO: change this before deploying
