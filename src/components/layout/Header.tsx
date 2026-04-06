import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-bone/50 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-semibold tracking-tight">ASAHI</span>{' '}
          <span className="text-base font-normal">mushroom</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-8">
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

        {/* Order button */}
        <a
          href="#shop"
          className="hidden sm:inline-block bg-text-primary text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          Order
        </a>
      </div>
    </header>
  );
}
