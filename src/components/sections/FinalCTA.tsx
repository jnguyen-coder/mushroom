"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
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
        <a
          href="#shop"
          className="bg-text-primary text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-accent transition-colors inline-block"
        >
          Shop Now
        </a>
      </motion.div>
    </section>
  );
}
