// Initial demo catalog — seeds the Pinia stores on first load. After that,
// the stores (plus any admin edits) persist to localStorage, so editing this
// file again won't affect a browser that has already loaded the app once.
// Clear localStorage keys "zzt_products" / "zzt_clients" to reset to seed data.

export const seedCategories = [
  { id: 1, name: 'Corporate Gifting', slug: 'corporate-gifting' },
  { id: 2, name: 'Retail Store Clocks', slug: 'retail-store-clocks' },
  { id: 3, name: 'Hotel & Hospitality', slug: 'hotel-hospitality' },
  { id: 4, name: 'Custom Printed', slug: 'custom-printed' }
]

export const seedProducts = [
  {
    id: 1,
    categoryId: 1,
    name: 'Classic Round Analog Wall Clock',
    slug: 'classic-round-analog-wall-clock',
    description: 'Timeless round dial clock, fully customizable with your logo — perfect for corporate gifting and retail branding.',
    images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=900&q=80'],
    moq: 50,
    featured: true,
    badge: 'Bestseller'
  },
  {
    id: 2,
    categoryId: 3,
    name: 'Premium Wooden Vintage Wall Clock',
    slug: 'premium-wooden-vintage-wall-clock',
    description: 'Solid wood-finish casing designed for hotel lobbies and premium office spaces.',
    images: ['https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=900&q=80'],
    moq: 50,
    featured: true,
    badge: 'Premium'
  },
  {
    id: 3,
    categoryId: 1,
    name: 'Corporate Branded Silent Sweep Clock',
    slug: 'corporate-branded-silent-sweep-clock',
    description: 'Noiseless sweep movement, ideal for offices — printed with your corporate branding in bulk.',
    images: ['https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&q=80'],
    moq: 50,
    featured: true,
    badge: null
  },
  {
    id: 4,
    categoryId: 2,
    name: 'Digital Dual Time LED Wall Clock',
    slug: 'digital-dual-time-led-wall-clock',
    description: 'Modern LED digital display showing dual time zones — great for retail stores and showrooms.',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=80'],
    moq: 50,
    featured: true,
    badge: 'New'
  },
  {
    id: 5,
    categoryId: 4,
    name: 'Fully Custom Printed Photo Clock',
    slug: 'fully-custom-printed-photo-clock',
    description: 'Print any design, photo, or brand artwork edge-to-edge — a favorite for festive corporate gifting.',
    images: ['https://images.unsplash.com/photo-1508962914676-134849a727f0?w=900&q=80'],
    moq: 50,
    featured: false,
    badge: null
  },
  {
    id: 6,
    categoryId: 3,
    name: 'Hotel Lobby Oversized Wall Clock',
    slug: 'hotel-lobby-oversized-wall-clock',
    description: 'Large-format statement clock built for hotel lobbies, banquet halls, and reception areas.',
    images: ['https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=900&q=80'],
    moq: 50,
    featured: false,
    badge: null
  }
]

// Used by the sliding hero carousel on the homepage.
export const seedBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=1600&q=80',
    title: 'Classic Round Analog',
    subtitle: 'Our most-loved corporate gifting clock'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1600&q=80',
    title: 'Premium Wooden Vintage',
    subtitle: 'Statement pieces for hotels & offices'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=1600&q=80',
    title: 'Silent Sweep Movement',
    subtitle: 'Noiseless, elegant, fully brandable'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=80',
    title: 'Digital Dual Time LED',
    subtitle: 'Modern displays for retail spaces'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=1600&q=80',
    title: 'Oversized Lobby Clock',
    subtitle: 'Grand statement pieces, built to impress'
  }
]

// Placeholder client showcase — replace these with your own real clients via
// the Admin → Clients panel. Kept generic here since no factual client list
// was provided.
export const seedClients = [
  {
    id: 1,
    name: 'Horizon Retail Group',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Horizon%20Retail&backgroundType=gradientLinear',
    industry: 'Retail Chain',
    highlight: 'Supplied 12,000+ branded wall clocks across 80 stores'
  },
  {
    id: 2,
    name: 'Metro Hospitality Group',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Metro%20Hospitality&backgroundType=gradientLinear',
    industry: 'Hotels & Resorts',
    highlight: 'Custom lobby clocks for 15 hotel properties'
  },
  {
    id: 3,
    name: 'Prestige Corporate Gifts',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Prestige%20Gifts&backgroundType=gradientLinear',
    industry: 'Corporate Gifting',
    highlight: 'Recurring festive-season orders since 2022'
  },
  {
    id: 4,
    name: 'Bluewave Enterprises',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Bluewave&backgroundType=gradientLinear',
    industry: 'Corporate Office',
    highlight: '5,000 units delivered for employee gifting'
  }
]
