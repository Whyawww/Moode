"use client";
import { useState, useEffect } from "react";

// Interface biar TypeScript ga ngamuk
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function usePWAInstall() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      
      console.log("PWA Event 'beforeinstallprompt' fired! Button should show now.");
      
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!promptInstall) {
      console.warn("No install prompt available");
      return;
    }

    promptInstall.prompt();

    const { outcome } = await promptInstall.userChoice;
    console.log(`User response: ${outcome}`);

    setPromptInstall(null);
    setSupportsPWA(false); 
  };

  return { supportsPWA, installApp };
}