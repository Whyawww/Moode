"use client";

import { useStore } from "@/hooks/useStore";
import { Monitor, Leaf, Sunset, History } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useStore();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-2xl mx-auto backdrop-blur-md bg-surface/30 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="font-bold text-lg tracking-tight text-primary">
            Moode
          </div>

          <div className="flex gap-2">
            <Link
              href="/dashboard/history"
              className="p-2 rounded-full text-muted hover:bg-white/10 hover:text-foreground transition-all"
              title="History"
            >
              <History size={18} />
            </Link>
            <button
              onClick={() => setTheme("focus")}
              className={`p-2 rounded-full transition-all ${
                theme === "focus"
                  ? "bg-primary text-background"
                  : "hover:bg-white/10"
              }`}
              title="Deep Focus"
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setTheme("zen")}
              className={`p-2 rounded-full transition-all ${
                theme === "zen"
                  ? "bg-primary text-background"
                  : "hover:bg-white/10"
              }`}
              title="Zen Garden"
            >
              <Leaf size={18} />
            </button>
            <button
              onClick={() => setTheme("sunset")}
              className={`p-2 rounded-full transition-all ${
                theme === "sunset"
                  ? "bg-primary text-background"
                  : "hover:bg-white/10"
              }`}
              title="Sunset Lofi"
            >
              <Sunset size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-28 px-4 pb-10 max-w-2xl mx-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
