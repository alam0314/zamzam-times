import { WHATSAPP_NUMBER } from '../config'

/**
 * Builds a wa.me deep link that opens WhatsApp (app on mobile, WhatsApp Web on
 * desktop) with a pre-filled message. There is no in-house chat, checkout, or
 * pricing engine on this site by design — every "reveal price" / "get quote"
 * action hands off straight to a WhatsApp conversation with the sales team,
 * where pricing is discussed and, for large orders, verified over a WhatsApp
 * video call before payment.
 */
export function buildWhatsAppLink(message, number = WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}

export function openWhatsApp(message, number = WHATSAPP_NUMBER) {
  window.open(buildWhatsAppLink(message, number), '_blank', 'noopener')
}

export function generalEnquiryMessage(context = '') {
  return `Hi Zam Zam Times! I'd like to know more about your wholesale wall clocks.${context ? ` (${context})` : ''}`
}

/** Single-product "reveal price" request — the core CTA on every product card/page. */
export function priceRequestMessage(product, qty) {
  return [
    `Hi Zam Zam Times! I'd like to get the wholesale price for:`,
    '',
    `• ${product.name}`,
    `Quantity: ${qty} pcs`,
    '',
    `Please share your best bulk pricing for this quantity.`
  ].join('\n')
}

/** Multi-item quote request built from the Quote List (no prices — those are discussed on WhatsApp). */
export function quoteRequestMessage({ items, shipping }) {
  const lines = [
    'Hi Zam Zam Times! I would like a wholesale quote for the following:',
    '',
    ...items.map((i) => `• ${i.name} — ${i.qty} pcs`),
    ''
  ]

  if (shipping?.company_name) {
    lines.push(
      'Delivery details:',
      `Company: ${shipping.company_name}`,
      shipping.gstin ? `GSTIN: ${shipping.gstin}` : null,
      `Address: ${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`,
      `Phone: ${shipping.phone}`,
      ''
    )
  }

  lines.push('Please share pricing and let me know if a quick video call is needed to confirm the order before payment.')

  return lines.filter(Boolean).join('\n')
}
