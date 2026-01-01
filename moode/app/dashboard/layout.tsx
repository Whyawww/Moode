"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { Monitor, Leaf, Sunset, History, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useStore();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-surface/30 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="font-bold text-lg tracking-tight text-primary flex items-center gap-2">
            Moode
          </div>

          <div className="flex items-center gap-4">
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

            {/* --- USER PROFILE --- */}
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10 animate-in fade-in slide-in-from-right-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-foreground max-w-[100px] truncate">
                    {user.user_metadata?.full_name || "User"}
                  </p>
                </div>

                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-surface">
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User size={18} className="m-auto text-muted" />
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-28 px-4 pb-10 max-w-2xl mx-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
