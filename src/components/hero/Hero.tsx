'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Scroll parallax
  const bgScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-15%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax — raw motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for the background (moves opposite to mouse, subtle)
  const bgMouseX = useSpring(mouseX, springConfig);
  const bgMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalize -1 to 1 from center
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // Background shifts opposite to cursor, max ~20px
    mouseX.set(nx * -20);
    mouseY.set(ny * -12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      style={{ position: 'relative' }}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background — scroll + mouse */}
      <motion.div
        className="absolute inset-[-20px]"
        style={{
          y: bgScrollY,
          scale: bgScale,
          x: bgMouseX,
          translateY: bgMouseY,
        }}
      >
        <img
          src="/images/mushrooms/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FEFDFB]/80 via-[#FEFDFB]/50 to-transparent" />

      {/* Text content — scroll fade */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          className="text-center px-6 max-w-2xl mx-auto -mt-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.2em] text-[#6B635B] mb-6"
          >
            Premium Gourmet Mushrooms · Vancouver, BC
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight leading-[1.1] text-[#2C2824]"
          >
            Grown with Care, Delivered Fresh
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[#6B635B] mt-5 max-w-lg mx-auto leading-relaxed"
          >
            Small-batch cultivated mushrooms for restaurants, chefs, and home cooks.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <a
              href="#shop"
              className="bg-[#2C2824] text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-[#8B7D6B] transition-colors"
            >
              Shop Mushrooms
            </a>
            <a
              href="#shop"
              className="text-sm text-[#8B7D6B] hover:text-[#2C2824] transition-colors"
            >
              See Our Varieties &darr;
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
