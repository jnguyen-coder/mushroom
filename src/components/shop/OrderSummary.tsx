import { AnimatePresence, motion } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';

export default function OrderSummary() {
  const {
    items,
    isEmpty,
    subtotal,
    removeItem,
    goToCheckout,
    goToShopping,
    checkoutStep,
  } = useOrder();

  const tax = subtotal * 0; // Placeholder — update when tax logic is defined
  const total = subtotal + tax;

  return (
    <div className="bg-ivory rounded-2xl border border-bone p-6">
      <h3 className="font-display text-xl font-semibold text-text-primary mb-4">
        Your Order
      </h3>

      {isEmpty ? (
        <div className="flex flex-col items-center py-8 text-center">
          {/* Mushroom outline SVG */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            className="text-bone mb-3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 38v-8" />
            <path d="M20 38h8" />
            <path d="M10 24c0-7.732 6.268-14 14-14s14 6.268 14 14c0 2-1 4-3 4H13c-2 0-3-2-3-4z" />
          </svg>
          <p className="text-text-tertiary text-sm">Your order is empty</p>
          <p className="text-text-tertiary text-xs mt-1">
            Add some mushrooms to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Item list */}
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.quantity} lb
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="text-sm font-medium text-text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-text-tertiary hover:text-error transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="border-t border-bone my-4" />

          {/* Tax placeholder */}
          {tax > 0 && (
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between font-semibold text-lg text-text-primary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Actions */}
          <div className="mt-6">
            {checkoutStep === 'checkout' ? (
              <button
                onClick={goToShopping}
                className="w-full text-center text-sm text-accent hover:underline"
              >
                Edit Order
              </button>
            ) : (
              <button
                onClick={goToCheckout}
                disabled={isEmpty}
                className="w-full bg-text-primary text-white rounded-xl py-3 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
