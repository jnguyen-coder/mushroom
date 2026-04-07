import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  productName: string;
};

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  productName,
}: QuantitySelectorProps) {
  const controls = useAnimationControls();
  const prevQty = useRef(quantity);

  useEffect(() => {
    if (quantity !== prevQty.current && quantity > 0) {
      controls.start({
        scale: [1, 1.25, 1],
        transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] },
      });
    }
    prevQty.current = quantity;
  }, [quantity, controls]);

  if (quantity === 0) {
    return (
      <button
        onClick={onIncrement}
        aria-label={`Add ${productName}`}
        className="bg-text-primary text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent cursor-pointer"
      >
        Add
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 bg-cream/60 rounded-full px-1 py-1">
      <button
        onClick={onDecrement}
        aria-label={`Remove one pound of ${productName}`}
        className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-bone text-sm transition-colors cursor-pointer"
      >
        -
      </button>
      <motion.span
        animate={controls}
        className="text-sm font-semibold min-w-[3rem] text-center"
      >
        {quantity} lb
      </motion.span>
      <button
        onClick={onIncrement}
        aria-label={`Add one pound of ${productName}`}
        className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-bone text-sm transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
