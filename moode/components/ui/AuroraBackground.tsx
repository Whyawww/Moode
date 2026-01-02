"use client";

import { useStore } from "@/hooks/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuroraBackground() {
  const { theme } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getThemeColors = () => {
    switch (theme) {
      case "zen":
        return {
          c1: "#2d6a4f",
          c2: "#40916c",
          c3: "#74c69d",
        };
      case "sunset":
        return {
          c1: "#B24592",
          c2: "#F15F79",
          c3: "#FF8C00",
        };
      default:
        return {
          c1: "#4c1d95",
          c2: "#0ea5e9",
          c3: "#6366f1",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen blur-[80px] animate-aurora-1 opacity-60"
          style={{
            background: `radial-gradient(circle at center, ${colors.c1}, transparent 70%)`,
          }}
        />

        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen blur-[80px] animate-aurora-2 opacity-60"
          style={{
            background: `radial-gradient(circle at center, ${colors.c2}, transparent 70%)`,
          }}
        />

        <div
          className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen blur-[90px] animate-aurora-3 opacity-50"
          style={{
            background: `radial-gradient(circle at center, ${colors.c3}, transparent 70%)`,
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-transparent animate-shimmer opacity-30 pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
