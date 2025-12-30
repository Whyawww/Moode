"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}
