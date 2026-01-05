"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
  const router = useRouter();

  return (
    <section className="py-20 px-6 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Ready to enter the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            flow state?
          </span>
        </h2>

        <p className="text-lg text-muted max-w-xl mx-auto">
          Join users who have ditched the clutter and found their focus with
          Moode.
        </p>

        <button
          onClick={() => router.push("/auth/login")}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:scale-105 transition-transform"
        >
          Start Focusing for Free
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
