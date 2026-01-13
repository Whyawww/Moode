"use client";

import { useEffect } from "react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import SoundManager from "@/components/features/audio/SoundManager";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN") {
        toast.success("Welcome back to your flow!");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        router.refresh();
      }
      if (_event === "SIGNED_OUT") {
        queryClient.clear();
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, queryClient]);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden text-foreground">
      <AuroraBackground />
      <SoundManager />

      <DashboardHeader />
      <main className="flex-1 pt-28 px-4 pb-10 max-w-5xl mx-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
