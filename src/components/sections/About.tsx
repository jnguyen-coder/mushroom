"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-ivory py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary mb-6">
              Carefully Grown, Always Fresh
            </h2>
            <div className="space-y-4">
              <p className="text-text-secondary leading-relaxed">
                Every mushroom is cultivated in small batches with meticulous
                care — from substrate preparation to harvest. We grow year-round
                in controlled environments to ensure consistent quality.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our focus is simple: grow the freshest, most flavorful mushrooms
                possible and make ordering effortless. No middlemen, no long
                supply chains — just farm to table.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src="/images/mushrooms/hero-layer-2.jpg"
              alt="Fresh mushrooms"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
