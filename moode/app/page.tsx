"use client";

import { motion } from "framer-motion";
import { ArrowRight, CloudRain, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-primary/30">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Moode Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          Moode.
        </div>
        <Link
          href="/auth/login"
          className="text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          Login
        </Link>
      </nav>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center z-10 space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-primary tracking-wide uppercase mb-4">
            Productivity Reimagined
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Focus shouldn't be <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              boring.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            A minimalist workspace that combines ambient sounds, a strict
            rule-of-7 task list, and a flow-state timer. Designed for students
            who need to lock in.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            onClick={() => router.push("/dashboard")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]"
          >
            Start Focusing Now
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <p className="mt-4 text-xs text-muted">
            No signup required for demo. Free forever.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left"
        >
          <FeatureCard
            icon={<CloudRain size={24} />}
            title="Ambient Mixer"
            desc="Mix Rain, Cafe, and Fire sounds to create your perfect soundscape."
          />
          <FeatureCard
            icon={<CheckCircle2 size={24} />}
            title="The Rule of 7"
            desc="Only 7 tasks allowed at once. Stop being overwhelmed, start doing."
          />
          <FeatureCard
            icon={<Clock size={24} />}
            title="Flow Timer"
            desc="A distraction-free timer that takes over your screen when you work."
          />
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-muted/50">
        © 2025 Moode by Wahyu Aji Nusantara.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-white/10 hover:bg-surface/50 transition-all backdrop-blur-sm group">
      <div className="mb-4 p-3 rounded-xl bg-background/50 w-fit text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
