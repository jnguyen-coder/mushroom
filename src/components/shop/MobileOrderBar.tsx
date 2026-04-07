import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';
import { MUSHROOMS } from '../../lib/mushrooms';

export default function MobileOrderBar() {
  const {
    items,
    itemCount,
    totalPounds,
    subtotal,
    checkoutStep,
    goToCheckout,
    goToShopping,
    incrementItem,
    decrementItem,
    removeItem,
  } = useOrder();

  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);

  // Escape key closes sheet + return focus
  useEffect(() => {
    if (!sheetOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSheetOpen(false);
        sheetTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [sheetOpen]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (sheetOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [sheetOpen]);

  const isVisible = itemCount > 0 && checkoutStep !== 'confirmation';

  const scrollToShop = () => {
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getName = (id: string) => MUSHROOMS.find(m => m.id === id)?.name ?? id;

  return (
    <>
      {/* Bottom bar */}
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
              <div>
                <p className="text-xs text-text-secondary">
                  {itemCount} item{itemCount !== 1 ? 's' : ''} · {totalPounds} lb
                </p>
                <p className="text-sm font-bold text-text-primary">
                  ${subtotal.toFixed(2)}
                </p>
              </div>

              {checkoutStep === 'shopping' ? (
                <button
                  ref={sheetTriggerRef}
                  onClick={() => { setSheetOpen(true); scrollToShop(); }}
                  className="bg-text-primary text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Review Order
                </button>
              ) : (
                <button
                  onClick={() => { goToShopping(); scrollToShop(); }}
                  className="bg-cream text-text-primary rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-bone transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-[#2C2824]/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                maxHeight: '80vh',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-bone" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 border-b border-bone">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  Your Order
                </h3>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="text-text-tertiary hover:text-text-primary transition-colors text-sm cursor-pointer"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </div>

              {/* Items list */}
              <div className="overflow-y-auto px-5 py-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                {items.length === 0 ? (
                  <p className="text-sm text-text-tertiary text-center py-6">Your order is empty.</p>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {getName(item.id)}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {item.quantity} lb · ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-3">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-cream transition-colors cursor-pointer text-sm"
                            aria-label={`Decrease ${getName(item.id)}`}
                          >
                            −
                          </button>
                          <span className="text-sm font-semibold w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-cream transition-colors cursor-pointer text-sm"
                            aria-label={`Increase ${getName(item.id)}`}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-1 text-text-tertiary hover:text-error transition-colors cursor-pointer"
                            aria-label={`Remove ${getName(item.id)}`}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                              <path d="M4 4l8 8M12 4l-8 8" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with total + checkout */}
              {items.length > 0 && (
                <div className="px-5 pt-3 pb-4 border-t border-bone">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-text-primary">Total ({totalPounds} lb)</span>
                    <span className="text-lg font-bold text-text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSheetOpen(false);
                      goToCheckout();
                      scrollToShop();
                    }}
                    className="w-full bg-text-primary text-white rounded-full py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
