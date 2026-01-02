"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CloudRain,
  Clock,
  CheckCircle2,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-background text-foreground selection:bg-primary/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/20 rounded-full blur-[80px] md:blur-[120px] opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/60 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Moode"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span>Moode</span>
        </div>

        <Link
          href="/auth/login"
          className="group flex items-center gap-2 px-5 py-2 rounded-full bg-surface/50 border border-white/10 hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 text-sm font-semibold shadow-lg shadow-black/5"
        >
          <span>Login</span>
          <LogIn
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-12 md:pt-32 px-6 z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12"
        >
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary tracking-wide uppercase mb-2 animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Productivity Reimagined
            </div>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Focus shouldn't be <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 animate-gradient">
                boring.
              </span>
            </h1>

            <p className="text-base md:text-xl text-muted max-w-2xl mx-auto leading-relaxed px-2">
              A minimalist workspace that combines ambient sounds, a strict
              rule-of-7 task list, and a flow-state timer.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4"
          >
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

            <div className="text-sm text-muted flex gap-1">
              <span>Already have an account?</span>
              <Link
                href="/auth/login"
                className="text-primary hover:underline underline-offset-4"
              >
                Log in here
              </Link>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-16 text-left w-full"
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
        </motion.div>
      </main>

      <footer className="w-full mt-auto py-3 text-center border-t border-white/5 bg-background/50 backdrop-blur-sm z-10">
        <p className="text-xl text-muted/60">
          © {new Date().getFullYear()} Powered by Moode.
        </p>
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
    <div className="p-5 md:p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-primary/20 hover:bg-surface/50 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1">
      <div className="mb-3 md:mb-4 p-3 rounded-xl bg-background/50 w-fit text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
