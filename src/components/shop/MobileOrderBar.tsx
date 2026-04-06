import { AnimatePresence, motion } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';

export default function MobileOrderBar() {
  const {
    itemCount,
    totalPounds,
    subtotal,
    checkoutStep,
    goToCheckout,
    goToShopping,
  } = useOrder();

  const isVisible = itemCount > 0 && checkoutStep !== 'confirmation';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-bone shadow-lg"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: order info */}
            <div>
              <p className="text-xs text-text-secondary">
                {itemCount} item{itemCount !== 1 ? 's' : ''} · {totalPounds} lb
              </p>
              <p className="text-sm font-bold text-text-primary">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            {/* Right: action button */}
            {checkoutStep === 'shopping' ? (
              <button
                onClick={goToCheckout}
                className="bg-text-primary text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Review Order
              </button>
            ) : (
              <button
                onClick={goToShopping}
                className="bg-cream text-text-primary rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-bone transition-colors"
              >
                Back
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
