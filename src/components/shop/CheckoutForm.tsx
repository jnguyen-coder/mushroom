import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../../hooks/useOrder';
import { submitOrder } from '../../lib/order';
import MushroomSpawnButton from '../ui/MushroomSpawnButton';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
}

export default function CheckoutForm() {
  const {
    customer,
    fulfillment,
    deliveryAddress,
    paymentMethod,
    specialInstructions,
    items,
    subtotal,
    setCustomer,
    setFulfillment,
    setDeliveryAddress,
    setPaymentMethod,
    setSpecialInstructions,
    completeOrder,
    goToShopping,
  } = useOrder();

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customer.name?.trim()) newErrors.name = 'Name is required';
    if (!customer.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!customer.phone?.trim()) newErrors.phone = 'Phone is required';

    if (fulfillment === 'delivery') {
      if (!deliveryAddress.street?.trim()) newErrors.street = 'Street address is required';
      if (!deliveryAddress.city?.trim()) newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submittingRef = useRef(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async () => {
    if (!validate()) return;
    if (submittingRef.current) return; // Hard guard against double-submit
    submittingRef.current = true;
    setLoading(true);
    setSubmitError('');

    try {
      const payload = {
        customer,
        fulfillment,
        deliveryAddress: fulfillment === 'delivery' ? deliveryAddress : undefined,
        paymentMethod,
        specialInstructions,
        items,
        subtotal,
      };

      const result = await submitOrder(payload);
      completeOrder(result.orderId);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      submittingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white border border-bone rounded-xl px-4 py-3 text-base focus:border-accent focus:outline-none transition-colors';
  const labelClass = 'block text-sm font-medium text-text-primary mb-1.5';
  const errorClass = 'text-error text-xs mt-1';

  const etransferEmail = import.meta.env.VITE_ETRANSFER_EMAIL || 'pay@asahimushroom.com';

  return (
    <div>
      {/* Back button */}
      <button
        onClick={goToShopping}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 4l-4 4 4 4" />
        </svg>
        Back to shopping
      </button>

      <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary mb-6">
        Checkout
      </h2>

      {/* Contact */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Contact
        </h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              className={inputClass}
              value={customer.name || ''}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="Your full name"
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              value={customer.email || ''}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              className={inputClass}
              value={customer.phone || ''}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="(604) 555-0123"
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Fulfillment */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Fulfillment
        </h3>
        <div className="flex gap-2">
          {(['pickup', 'delivery'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFulfillment(option)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors ${
                fulfillment === option
                  ? 'bg-text-primary text-white'
                  : 'bg-cream text-text-primary hover:bg-bone'
              }`}
            >
              {option === 'pickup' ? 'Pickup' : 'Delivery'}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      <AnimatePresence>
        {fulfillment === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Delivery Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Street Address</label>
                <input
                  type="text"
                  className={inputClass}
                  value={deliveryAddress.street || ''}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
                  }
                  placeholder="123 Main St"
                />
                {errors.street && <p className={errorClass}>{errors.street}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={deliveryAddress.city || 'Vancouver'}
                    onChange={(e) =>
                      setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                    }
                  />
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
                <div>
                  <label className={labelClass}>Province</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={deliveryAddress.province || 'BC'}
                    onChange={(e) =>
                      setDeliveryAddress({ ...deliveryAddress, province: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Postal Code</label>
                <input
                  type="text"
                  className={inputClass}
                  value={deliveryAddress.postalCode || ''}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })
                  }
                  placeholder="V6B 1A1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Payment
        </h3>
        <div className="flex gap-2 mb-4">
          {(['square', 'etransfer'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setPaymentMethod(option)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors ${
                paymentMethod === option
                  ? 'bg-text-primary text-white'
                  : 'bg-cream text-text-primary hover:bg-bone'
              }`}
            >
              {option === 'square' ? 'Square' : 'e-Transfer'}
            </button>
          ))}
        </div>

        {paymentMethod === 'square' ? (
          <div className="bg-cream rounded-xl p-4 text-sm text-text-secondary">
            {/* Placeholder for Square payment integration */}
            Square payment form will appear here after order is placed.
          </div>
        ) : (
          <div className="bg-cream rounded-xl p-4 text-sm text-text-secondary">
            <p>
              Send your Interac e-Transfer to{' '}
              <span className="font-semibold text-text-primary">{etransferEmail}</span>
            </p>
            <p className="mt-1 text-xs">
              You'll receive payment instructions after placing your order.
            </p>
          </div>
        )}
      </div>

      {/* Special Instructions */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Special Instructions
        </h3>
        <textarea
          className={`${inputClass} resize-none h-24`}
          value={specialInstructions || ''}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Any notes for your order..."
        />
      </div>

      {/* Error banner */}
      {submitError && (
        <div className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error mb-4">
          <p>{submitError}</p>
          <button
            onClick={() => { setSubmitError(''); submittingRef.current = false; }}
            className="mt-1 text-xs underline hover:no-underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {/* Submit */}
      <MushroomSpawnButton>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-text-primary text-white rounded-full py-3 px-8 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path d="M12 2a10 10 0 019.8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Placing Order...
            </span>
          ) : 'Place Order'}
        </button>
      </MushroomSpawnButton>
    </div>
  );
}
