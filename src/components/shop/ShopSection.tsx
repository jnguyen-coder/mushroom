import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';
import ProductGrid from './ProductGrid';
import OrderSummary from './OrderSummary';

const CheckoutForm = lazy(() => import('./CheckoutForm'));
const OrderConfirmation = lazy(() => import('./OrderConfirmation'));

const enterRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

const enterLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function ShopSection() {
  const { checkoutStep } = useOrder();

  const renderContent = () => {
    switch (checkoutStep) {
      case 'checkout':
        return (
          <motion.div key="checkout" variants={enterRight} initial="initial" animate="animate" exit="exit">
            <Suspense fallback={<div className="py-12 text-center text-text-tertiary">Loading...</div>}>
              <CheckoutForm />
            </Suspense>
          </motion.div>
        );
      case 'confirmation':
        return (
          <motion.div key="confirmation" variants={fadeUp} initial="initial" animate="animate" exit="exit">
            <Suspense fallback={<div className="py-12 text-center text-text-tertiary">Loading...</div>}>
              <OrderConfirmation />
            </Suspense>
          </motion.div>
        );
      default:
        return (
          <motion.div key="shopping" variants={enterLeft} initial="initial" animate="animate" exit="exit">
            <ProductGrid />
          </motion.div>
        );
    }
  };

  return (
    <section id="shop" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
            Our Mushrooms
          </h2>
          <p className="text-text-secondary mt-3 max-w-md mx-auto">
            Locally grown gourmet mushrooms, harvested fresh and delivered to your door.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex gap-8">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
          <div className="w-[380px] shrink-0">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
