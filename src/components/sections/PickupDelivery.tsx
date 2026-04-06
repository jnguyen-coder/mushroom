"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Local Pickup",
    description:
      "Available weekdays. We'll notify you when your order is ready.",
    note: "/* TODO: Add pickup address and hours */",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Local Delivery",
    description: "We deliver within the Greater Vancouver area.",
    note: "/* TODO: Add delivery zones, fees, schedule */",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PickupDelivery() {
  return (
    <section id="delivery" className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-display text-3xl font-semibold tracking-tight text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Pickup &amp; Delivery
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="bg-ivory rounded-2xl p-8 border border-bone/60"
              variants={itemVariants}
            >
              {card.icon}
              <h3 className="text-lg font-semibold text-text-primary mt-4">
                {card.title}
              </h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {card.description}
              </p>
              <p className="text-xs text-text-tertiary mt-3">{card.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
