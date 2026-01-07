"use client";

import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import AuroraBackground from "@/components/ui/AuroraBackground";
import SoundManager from "@/components/features/audio/SoundManager";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchTasks } = useStore();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchTasks();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN") {
        toast.success("Welcome back to your flow!");
        fetchTasks();
      }
      if (_event === "SIGNED_OUT") {
        fetchTasks();
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchTasks]);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden text-foreground">
      <AuroraBackground />
      <SoundManager />

      <DashboardHeader />

      <main className="flex-1 pt-28 px-4 pb-10 max-w-2xl mx-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
