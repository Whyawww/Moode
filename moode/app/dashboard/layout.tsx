"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@/hooks/useStore";
import {
  Monitor,
  Leaf,
  Sunset,
  History,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme, fetchTasks } = useStore();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (_event === "SIGNED_OUT") {
        fetchTasks();
        router.refresh();
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [user, fetchTasks]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-surface/30 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          {/* LOGO */}
          <div className="font-bold text-lg tracking-tight text-primary flex items-center gap-2">
            Moode
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
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

            {/* --- USER PROFILE DROPDOWN --- */}
            {user && (
              <div
                className="relative pl-4 border-l border-white/10"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
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
                  <ChevronDown
                    size={14}
                    className={`text-muted transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-white/5 sm:hidden">
                      <p className="text-sm font-bold text-foreground truncate">
                        {user.user_metadata?.full_name}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* History */}
                    <Link
                      href="/dashboard/history"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-white/5 transition-colors"
                    >
                      <History size={16} className="text-primary" />
                      History
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="pl-4 border-l border-white/10 flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-1.5 text-sm font-bold bg-primary text-background rounded-full hover:opacity-90 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-28 px-4 pb-10 max-w-2xl mx-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
