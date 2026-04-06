import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Mushroom, PRICE_PER_LB } from '../../lib/mushrooms';

interface ProductCarouselProps {
  mushroom: Mushroom;
  onClose: () => void;
}

const SLIDE_COUNT = 3;

const placeholderGradients = [
  'from-cream to-bone',
  'from-bone to-warm-gray',
  'from-warm-gray to-cream',
];

export default function ProductCarousel({ mushroom, onClose }: ProductCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Body scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-text-primary/60 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-w-lg w-full mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* Image slides */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* TODO: Add 3-5 real photos per mushroom variety */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[currentSlide]} flex items-center justify-center`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-text-tertiary text-sm">
                {mushroom.name} — Photo {currentSlide + 1}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? 'bg-white w-4'
                    : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            {mushroom.name}
          </h2>
          <p className="text-text-secondary mt-2">{mushroom.description}</p>
          <p className="text-accent font-semibold mt-3">${PRICE_PER_LB}/lb</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
