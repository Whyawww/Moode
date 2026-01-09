"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  Monitor,
  Leaf,
  Sunset,
  Sun,
  Coffee,
  History,
  LogOut,
  User,
  Palette,
  Check,
} from "lucide-react";

export default function DashboardHeader() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { id: "focus", label: "Deep Focus", icon: Monitor, color: "text-blue-400" },
    { id: "zen", label: "Zen Garden", icon: Leaf, color: "text-green-400" },
    {
      id: "sunset",
      label: "Sunset Lofi",
      icon: Sunset,
      color: "text-purple-400",
    },
    { id: "daylight", label: "Daylight", icon: Sun, color: "text-sky-500" },
    { id: "latte", label: "Latte Cafe", icon: Coffee, color: "text-amber-600" },
  ];

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

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
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserOpen(false);
      }
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsUserOpen(false);
    toast.success("See you next time! 👋");
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-surface/30 border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-3 flex items-center justify-between shadow-lg">
        <div className="relative w-24 h-8">
          <Image
            src="/moode.png"
            alt="Moode"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* --- THEME DROPDOWN SWITCHER --- */}
          <div className="relative" ref={themeDropdownRef}>
            {!mounted ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : (
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all border ${
                  isThemeOpen
                    ? "bg-primary/20 text-primary border-primary/20"
                    : "bg-transparent text-muted hover:text-foreground hover:bg-white/5 border-transparent"
                }`}
                title="Change Theme"
              >
                <Palette size={18} />
                <span className="text-xs font-bold">Theme</span>
              </button>
            )}

            {/* Dropdown Content */}
            {isThemeOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-full mt-3 w-48 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 z-50 ring-1 ring-white/5">
                {themeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setTheme(option.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      theme === option.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <option.icon
                        size={16}
                        className={
                          theme === option.id ? "text-primary" : option.color
                        }
                      />
                      <span>{option.label}</span>
                    </div>
                    {theme === option.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- USER PROFILE DROPDOWN --- */}
          {user ? (
            <div
              className="relative pl-2 md:pl-4 border-l border-white/10"
              ref={userDropdownRef}
            >
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
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
              </button>

              {isUserOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50 ring-1 ring-white/5">
                  <div className="px-4 py-3 border-b border-white/5 sm:hidden">
                    <p className="text-sm font-bold text-foreground truncate">
                      {user.user_metadata?.full_name}
                    </p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard/history"
                    onClick={() => setIsUserOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <History size={16} className="text-primary" />
                    History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="pl-4 border-l border-white/10 flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-1.5 text-sm font-bold bg-primary text-background rounded-full hover:opacity-90 transition-all"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
