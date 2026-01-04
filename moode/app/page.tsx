"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DemoPreview from "@/components/landing/DemoPreview";
import HowItWorks from "@/components/landing/HowItWorks";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/20 rounded-full blur-[80px] md:blur-[120px] opacity-40 animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <Navbar />

      <main className="flex-1 w-full flex flex-col pt-10 overflow-x-hidden">
        <HeroSection />
        <DemoPreview />
        <HowItWorks />
      </main>

      <footer className="w-full py-8 text-center border-t border-white/5 bg-background/50 backdrop-blur-sm z-10 relative">
        <p className="text-sm text-muted/60">
          © {new Date().getFullYear()} Moode Crafted for deep work.
        </p>
      </footer>
    </div>
  );
}
