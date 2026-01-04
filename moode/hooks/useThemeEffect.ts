"use client";

import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";

const themeColors = {
  focus: {
    "--background": "#0f172a",
    "--foreground": "#f8fafc",
    "--primary": "#38bdf8",
    "--surface": "#1e293b",
    "--muted": "#94a3b8",
  },
  zen: {
    "--background": "#1a2e1e",
    "--foreground": "#f0fdf4",
    "--primary": "#4ade80",
    "--surface": "#26412b",
    "--muted": "#86efac",
  },
  sunset: {
    "--background": "#2e1065",
    "--foreground": "#fae8ff",
    "--primary": "#f472b6",
    "--surface": "#4c1d95",
    "--muted": "#d8b4fe",
  },
};

export function useThemeEffect() {
  const { theme } = useStore();

  useEffect(() => {
    const currentTheme =
      theme && themeColors[theme as keyof typeof themeColors] ? theme : "focus";
    const colors = themeColors[currentTheme as keyof typeof themeColors];

    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return {
    currentTheme:
      theme && themeColors[theme as keyof typeof themeColors] ? theme : "focus",
  };
}
