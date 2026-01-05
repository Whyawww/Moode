"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is Moode really free?",
    a: "Yes. Moode is a hobby project designed for personal productivity. No hidden fees, no subscriptions.",
  },
  {
    q: "Where is my data stored?",
    a: "Your tasks and notes are securely stored in Supabase (PostgreSQL). We use Row Level Security (RLS) so only you can access your own data.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Absolutely. Moode is a PWA (Progressive Web App). You can install it on iOS and Android for a native app experience.",
  },
  {
    q: "Why only 7 tasks?",
    a: "Cognitive load management. A long to-do list creates anxiety. A limited list forces you to prioritize what actually matters today.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          <p className="text-muted">
            Everything you need to know about the product.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="group p-6 rounded-2xl bg-surface/30 border border-white/5 hover:bg-surface/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <Plus
                  className={`text-muted transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-muted leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
