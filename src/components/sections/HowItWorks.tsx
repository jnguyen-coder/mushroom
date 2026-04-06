"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose",
    description: "Browse our selection and add mushrooms to your order.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Order",
    description: "Complete checkout with pickup or delivery.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Enjoy",
    description: "Receive fresh mushrooms, harvested to order.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10" />
        <path d="M15 2.5c1.5 2 3 5.5 3 9.5" />
        <path d="M12 2v4" />
        <path d="M22 8c-2 0-4 .5-6 1.5" />
        <path d="M20 4l2-1" />
        <path d="M22 3l-1 2" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ivory py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row gap-10 md:gap-8 items-start md:items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 flex flex-col md:flex-row items-center w-full">
              <motion.div
                className="flex-1 flex flex-col items-center text-center"
                variants={itemVariants}
              >
                <div className="w-10 h-10 rounded-full bg-cream text-accent text-sm font-semibold flex items-center justify-center">
                  {step.number}
                </div>
                <div className="mt-4">{step.icon}</div>
                <h3 className="font-semibold text-text-primary mt-3 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hidden md:block w-full max-w-[60px] h-px bg-bone flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
