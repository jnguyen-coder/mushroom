"use client";

import { motion } from "framer-motion";
import MushroomSpawnButton from "../ui/MushroomSpawnButton";

export default function FinalCTA() {
  return (
    <section className="relative pt-16 pb-0 md:pt-24 md:pb-0 overflow-hidden min-h-[420px] md:min-h-[520px]">
      {/* Mushroom image — pushed down so only the tall one's cap peeks up */}
      <img
        src="/images/backgrounds/ready-to-order.png"
        alt=""
        className="absolute left-0 w-full object-cover object-top"
        style={{ bottom: '0%', height: '120%' }}
        loading="lazy"
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-6 text-center pt-8 md:pt-12 pb-48 md:pb-64"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-4">
          Ready to Order?
        </h2>
        <p className="text-text-secondary text-lg mb-8">
          Fresh mushrooms, grown for your table.
        </p>
        <MushroomSpawnButton>
          <a
            href="#shop"
            className="bg-text-primary text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-accent transition-colors inline-block"
          >
            Shop Now
          </a>
        </MushroomSpawnButton>
      </motion.div>
    </section>
  );
}
