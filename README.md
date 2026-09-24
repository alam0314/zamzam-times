# Zam Zam Times — Premium Wholesale Wall Clock Storefront

A frontend-only Vue 3 site — no backend, no database, no hosting cost for
real-time infrastructure. Product/client data lives in the browser
(localStorage), and every pricing conversation happens on WhatsApp.

## What's new in this redesign

- **New brand**: renamed to **Zam Zam Times** everywhere (nav, footer, admin, browser tab).
- **Modern, premium visual design**: a navy/charcoal + brass-gold palette, Playfair Display headings, soft shadows, hover animations, and a fade-in page transition — replacing the previous flat, generic look.
- **Realistic animated clock background**: `AnimatedClock.vue` renders a live analog clock (SVG) whose hands are driven by the *actual current time*, ticking every second like a real quartz movement — used large and subtle in the hero, footer, and admin sidebar for a genuinely "alive" feel rather than a looping CSS animation.
- **Sliding image carousel**: a 5-slide auto-advancing carousel (`Carousel.vue`) in the homepage hero, with arrows + dots, showcasing five signature clock designs.
- **Hidden pricing, revealed on WhatsApp**: no price is ever shown on the site. Every product shows "Price on request 💬" and a **Get Price** button that opens WhatsApp with the product name + quantity pre-filled.
- **Minimum order quantity locked at 50**: enforced in the shared `MIN_ORDER_QTY` config, the product store (any product saved with a lower MOQ is clamped up to 50), and every quantity input on the site.
- **"Our Clients" showcase page**: a dedicated `/clients` page (plus a homepage marquee) showing companies you've completed bulk deals with — seeded with clearly placeholder/generic example entries for you to replace with your real clients via the admin panel.
- **GSTIN displayed**: `07AHOPW4313M1ZQ` appears in the footer, the hero trust strip, and the Contact page.
- **Full Admin Panel** (password-gated, no backend): add / edit / delete products with **image upload** (photos are resized client-side and stored as part of the product), plus a parallel Clients manager with logo upload.

## Stack

Vue 3 (Composition API) + Vite + Pinia + Vue Router + Tailwind CSS. Zero backend.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
```

## ⚠️ Before you deploy

1. **Set your WhatsApp number** in `src/config.js`:
   ```js
   export const WHATSAPP_NUMBER = '919971083325' // <-- change this
   ```

2. **Update the GSTIN / address / email** in `src/config.js` if needed.

## Using the Admin Panel

Go to `/admin/login`, enter your admin password, then:

- **Products** (`/admin/products`) — add, edit, or delete wall clocks. Upload one or more photos per product (drag-in via the file picker); the first photo becomes the main catalog image. MOQ is enforced at a minimum of 50.
- **Clients** (`/admin/clients`) — add, edit, or delete the businesses shown on your public "Our Clients" page and homepage marquee, each with a logo/photo, industry, and a short deal highlight.

All changes save instantly to the browser's local storage — no save button elsewhere, no deploy needed, no backend required.

## Pages

- **Home** (`/`) — animated clock hero, 5-slide carousel, trust strip (MOQ, delivery, GSTIN), featured products, clients marquee, WhatsApp CTA banner
- **Catalog** (`/catalog`) — searchable/filterable product grid
- **Product detail** (`/products/:slug`) — photo gallery, MOQ, "price on request", Add to Quote List, Get Price on WhatsApp
- **Quote List** (`/quote-list`) — like a cart, but tracks quantities only (no prices) across multiple products
- **Request Quote** (`/request-quote`) — collects delivery/company details, then opens WhatsApp with the full item + quantity list for your team to quote
- **Our Clients** (`/clients`) — showcase of completed bulk deals
- **Contact** (`/contact`) — quick enquiry form that also hands off to WhatsApp

## A note on the seeded "Clients" data

The four clients seeded in `src/data/seed.js` (Horizon Retail Group, Metro
Hospitality Group, etc.) are **placeholder examples**, not real companies —
no real client list was available when building this. Replace them with your
actual clients via **Admin → Clients** before publishing the site.
