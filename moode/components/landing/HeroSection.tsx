"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-20 px-6 text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary tracking-wide uppercase mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Productivity Reimagined
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Focus shouldn't be <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 animate-gradient">
            boring.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          A minimalist workspace that combines ambient sounds, a strict
          rule-of-7 task list, and a flow-state timer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]"
          >
            Start Demo
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="text-sm text-muted pt-2">
          No credit card required. Free forever.
        </div>
      </motion.div>
    </section>
  );
}
