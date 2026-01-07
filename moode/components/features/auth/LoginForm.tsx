"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    const origin = window.location.origin;

    const toastId = toast.loading("Connecting to Google...");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      toast.dismiss(toastId);
      toast.error("Login Failed: " + error.message);
    } else {
      toast.dismiss(toastId);
      toast.success("Redirecting to Google...");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      <div className="backdrop-blur-xl bg-surface/30 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-[50px] pointer-events-none opacity-40" />

        <div className="relative z-10 space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted text-sm">
              Sign in to sync your tasks and history.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-transparent text-foreground border border-white/20 hover:bg-white/5 hover:border-white/40 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {loading ? (
                <Loader2 className="animate-spin text-foreground" size={20} />
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            <p className="text-xs text-center text-muted/60 px-4 leading-relaxed">
              By continuing, you agree to Moode&apos;s{" "}
              <Link
                href="/terms"
                className="underline font-bold decoration-muted/40 hover:text-foreground hover:decoration-foreground transition-all"
                target="_blank"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline font-black decoration-muted/40 hover:text-foreground hover:decoration-foreground transition-all"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
