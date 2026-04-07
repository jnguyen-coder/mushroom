'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MushroomSpawnButton from '../ui/MushroomSpawnButton';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll parallax on background
  const bgScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  // Text fades on scroll
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-15%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgMouseX = useSpring(mouseX, springConfig);
  const bgMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx * -20);
    mouseY.set(ny * -12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      style={{ position: 'relative' }}
      className="relative min-h-hero overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background — scroll + mouse */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: bgScrollY, x: bgMouseX, translateY: bgMouseY }}
      >
        <img
          src="/images/mushrooms/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
      </motion.div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFDFB]/80 via-[#FEFDFB]/50 to-transparent" />

      {/* Text content — upper portion */}
      <motion.div
        className="relative z-10 flex items-start justify-center min-h-hero pt-[25vh] md:pt-[20vh]"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          className="text-center px-6 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-6"
          >
            Premium Gourmet Mushrooms &middot; Vancouver, BC
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(1.75rem,5vw,4rem)] font-semibold tracking-tight leading-[1.1] text-text-primary"
          >
            Grown with Care, Delivered Fresh
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary mt-5 max-w-lg mx-auto leading-relaxed"
          >
            Small-batch cultivated mushrooms for restaurants, chefs, and home cooks.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <MushroomSpawnButton>
              <a
                href="#shop"
                className="bg-text-primary text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Shop Mushrooms
              </a>
            </MushroomSpawnButton>
            <a
              href="#shop"
              className="text-sm text-accent hover:text-text-primary transition-colors"
            >
              See Our Varieties &darr;
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7L10 13L16 7" stroke="#9B9189" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
