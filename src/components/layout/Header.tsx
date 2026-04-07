import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MushroomSpawnButton from '../ui/MushroomSpawnButton';

const navLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

function MushroomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Soft rounded cap */}
      <ellipse cx="16" cy="13" rx="10" ry="8" opacity="0.85" />
      {/* Rounded stem */}
      <rect x="13" y="18" width="6" height="9" rx="3" opacity="0.7" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll + Escape key when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
          menuTriggerRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Wordmark = (
    <a
      href="/"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className="flex items-center"
    >
      <span className="font-logo text-sm font-semibold uppercase tracking-[0.15em] text-text-primary">
        ASAHI
      </span>
      <MushroomIcon className="mx-1.5 h-4 w-4 text-accent" />
      <span className="font-logo text-sm font-semibold uppercase tracking-[0.15em] text-text-primary">
        MUSHROOM
      </span>
    </a>
  );

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-bone/50 transition-shadow ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Mobile spacer to center the wordmark (matches hamburger width) */}
          <div className="w-6 lg:hidden" />

          {/* Logo / Wordmark — centered on mobile via flex */}
          <div className="lg:flex-none flex-1 flex justify-center lg:justify-start">
            {Wordmark}
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop order button */}
          <div className="hidden lg:block">
            <MushroomSpawnButton>
              <a
                href="#shop"
                className="inline-block bg-text-primary text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Order
              </a>
            </MushroomSpawnButton>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuTriggerRef}
            type="button"
            className="lg:hidden relative w-6 h-5 flex flex-col justify-between"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden"
          >
            {/* Top row: spacer + logo (centered) + close */}
            <div className="max-w-7xl w-full mx-auto px-5 py-3 flex items-center justify-between">
              <div className="w-6" />
              <div className="flex-1 flex justify-center">
                {Wordmark}
              </div>
              <button
                type="button"
                className="relative w-6 h-5 flex flex-col justify-between"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center translate-y-[9px] rotate-45" />
                <span className="block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 opacity-0 scale-x-0" />
                <span className="block h-0.5 w-6 bg-text-primary rounded-full transition-all duration-300 origin-center -translate-y-[9px] -rotate-45" />
              </button>
            </div>

            {/* Centered nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  className="text-lg text-text-primary font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom order button */}
            <div className="px-5 pb-10">
              <motion.a
                href="#shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.07, duration: 0.3 }}
                className="block bg-text-primary text-white rounded-full px-8 py-3 text-sm font-medium text-center w-full max-w-xs mx-auto hover:bg-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#shop');
                }}
              >
                Order Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
