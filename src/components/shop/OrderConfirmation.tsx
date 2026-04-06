import { motion } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';

export default function OrderConfirmation() {
  const { customer, orderId, paymentMethod, resetOrder } = useOrder();

  const etransferEmail = import.meta.env.VITE_ETRANSFER_EMAIL || 'payments@example.com';

  return (
    <div className="flex flex-col items-center text-center py-8">
      {/* Animated checkmark */}
      <div className="w-20 h-20">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="3"
            className="text-success"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.path
            d="M25 42l10 10 20-22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Thank you message */}
      <h2 className="font-display text-2xl font-semibold text-text-primary mt-6">
        Thank you, {customer.name || 'friend'}!
      </h2>
      <p className="text-text-secondary mt-2 max-w-sm">
        Your order has been received and we're preparing your fresh mushrooms.
      </p>

      {/* Order ID badge */}
      {orderId && (
        <div className="bg-cream rounded-full px-4 py-1.5 text-sm font-semibold text-accent mt-4">
          Order #{orderId}
        </div>
      )}

      {/* e-Transfer instructions */}
      {paymentMethod === 'etransfer' && (
        <div className="bg-ivory rounded-xl border border-bone p-5 mt-6 text-left max-w-sm w-full">
          <h3 className="text-sm font-semibold text-text-primary mb-2">
            Payment Instructions
          </h3>
          <p className="text-sm text-text-secondary">
            Please send your Interac e-Transfer to:
          </p>
          <p className="text-sm font-semibold text-text-primary mt-1">
            {etransferEmail}
          </p>
          <p className="text-xs text-text-tertiary mt-2">
            Include your order number in the message field. We'll confirm receipt by email.
          </p>
        </div>
      )}

      {/* Place another order */}
      <button
        onClick={resetOrder}
        className="mt-8 bg-text-primary text-white rounded-xl px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Place Another Order
      </button>
    </div>
  );
}
