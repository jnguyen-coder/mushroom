export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  lineTotal: number
}

export interface OrderPayload {
  items: OrderItem[]
  subtotal: number
  customer: { name: string; email: string; phone: string }
  fulfillment: 'pickup' | 'delivery'
  deliveryAddress?: { street: string; city: string; province: string; postalCode: string }
  paymentMethod: 'square' | 'etransfer'
  specialInstructions?: string
  createdAt: string
}

export interface OrderResult {
  success: boolean
  orderId: string
  mock?: boolean
}

function generateIdempotencyKey(): string {
  // Crypto-random UUID for duplicate-order prevention.
  // The server MUST store this key and reject duplicate submissions.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Submit an order to the configured endpoint.
 *
 * Idempotency: Each call generates a unique idempotency key sent as both
 * a request header (Idempotency-Key) and in the payload body. The backend
 * endpoint MUST store this key and reject duplicate submissions to prevent
 * double-orders from retries, refreshes, or network lag.
 *
 * TODO: Implement backend endpoint — recommended: Vercel serverless function
 * that stores idempotency keys (e.g. in Redis/KV with 24h TTL),
 * sends email via Resend/SendGrid to admin + confirmation to customer.
 */
export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  const endpoint = import.meta.env.VITE_ORDER_ENDPOINT
  const orderId = `AM-${Date.now().toString(36).toUpperCase()}`
  const idempotencyKey = generateIdempotencyKey()

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.log('[submitOrder] No endpoint — mock mode')
      console.log('[submitOrder] Payload:', JSON.stringify({ ...payload, orderId, idempotencyKey }, null, 2))
    }
    await new Promise(r => setTimeout(r, 800))
    return { success: true, orderId, mock: true }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({ ...payload, orderId, idempotencyKey }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Order failed (${res.status}): ${body || res.statusText}`)
  }

  const data = await res.json()
  return { success: true, orderId: data.orderId || orderId, ...data }
}
