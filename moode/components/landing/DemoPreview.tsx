"use client";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";

export default function DemoPreview() {
  return (
    <section className="px-4 py-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <div className="rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>

          {/* Mock Content */}
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-8 w-32 bg-primary/20 rounded-lg animate-pulse" />
                <h3 className="text-2xl font-bold text-foreground">
                  Find Your Flow
                </h3>
                <p className="text-muted text-sm">
                  Mix sounds directly from your dashboard.
                </p>
              </div>
              {/* Fake Mixer */}
              <div className="p-4 rounded-2xl bg-surface/50 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded text-blue-400">
                      <CloudRain size={16} />
                    </div>
                    <span className="text-sm">Rainy Day</span>
                  </div>
                  <div className="h-2 w-24 bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-surface/30 p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-sm text-muted mb-2">
                <span>Your Focus</span>
                <span>3/7 Active</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-background/40 rounded-xl border border-white/5"
                >
                  <div className="w-5 h-5 rounded-full border border-muted/50" />
                  <div className="h-2 w-32 bg-white/10 rounded-full" />
                </div>
              ))}
              <div className="pt-2">
                <div className="w-full py-2 bg-primary/20 text-primary text-center rounded-lg text-sm font-bold">
                  Start Focus Session
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
