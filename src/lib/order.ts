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

/* TODO: Implement backend endpoint — recommended: Vercel serverless function
   that sends email via Resend/SendGrid to admin + confirmation to customer */
export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  const endpoint = import.meta.env.VITE_ORDER_ENDPOINT
  const orderId = `AM-${Date.now().toString(36).toUpperCase()}`

  if (!endpoint) {
    console.log('[submitOrder] No endpoint — mock mode')
    console.log('[submitOrder] Payload:', JSON.stringify({ ...payload, orderId }, null, 2))
    await new Promise(r => setTimeout(r, 800))
    return { success: true, orderId, mock: true }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, orderId }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Order failed (${res.status}): ${body || res.statusText}`)
  }

  const data = await res.json()
  return { success: true, orderId: data.orderId || orderId, ...data }
}
