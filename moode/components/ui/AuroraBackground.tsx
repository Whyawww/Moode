"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [resolvedTheme]);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || "focus";

  if (currentTheme === "daylight" || currentTheme === "latte") {
    return null;
  }

  const getThemeColors = () => {
    const safeTheme = currentTheme.toLowerCase();

    if (safeTheme.includes("zen")) {
      // ZEN GARDEN
      return {
        c1: "#22c55e", // Green 500
        c2: "#4ade80", // Green 400
        c3: "#10b981", // Emerald 500
      };
    }

    if (safeTheme.includes("sunset")) {
      // SUNSET LOFI
      return {
        c1: "#d946ef", // Fuchsia 500
        c2: "#f43f5e", // Rose 500
        c3: "#f97316", // Orange 500
      };
    }

    // DEEP FOCUS
    return {
      c1: "#3b82f6", // Blue 500
      c2: "#6366f1", // Indigo 500
      c3: "#0ea5e9", // Sky 500
    };
  };

  const colors = getThemeColors();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-background transition-colors duration-700">
      <motion.div
        key={currentTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen blur-[100px] animate-aurora-1 opacity-40"
          style={{
            background: `radial-gradient(circle at center, ${colors.c1}, transparent 70%)`,
          }}
        />

        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen blur-[100px] animate-aurora-2 opacity-40"
          style={{
            background: `radial-gradient(circle at center, ${colors.c2}, transparent 70%)`,
          }}
        />

        <div
          className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen blur-[100px] animate-aurora-3 opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${colors.c3}, transparent 70%)`,
          }}
        />

        <div className="absolute inset-0 bg-transparent animate-shimmer opacity-20 pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
