"use client";

import { motion } from "framer-motion";
import Accordion from "../ui/Accordion";

const faqItems = [
  {
    question: "How fresh are your mushrooms?",
    answer:
      "Our mushrooms are harvested to order. When you receive them, they're typically less than 24 hours from harvest.",
  },
  {
    question: "What is the minimum order?",
    answer:
      "There is currently no minimum order. Order as much or as little as you'd like. /* TODO: Set minimum order amount */",
  },
  {
    question: "Do you deliver?",
    answer:
      "Yes, we deliver within the Greater Vancouver area. /* TODO: Add delivery details */",
  },
  {
    question: "How do I pay?",
    answer:
      "We accept Square (credit/debit) and Interac e-Transfer.",
  },
  {
    question: "Can I place a recurring order?",
    answer:
      "Yes! Contact us to set up a weekly or bi-weekly standing order. /* TODO: Add contact email */",
  },
  {
    question: "Do you supply restaurants?",
    answer:
      "Absolutely. We work with restaurants and chefs across Vancouver. Reach out for wholesale pricing. /* TODO: Add wholesale email */",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="font-display text-3xl font-semibold tracking-tight text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Common Questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
