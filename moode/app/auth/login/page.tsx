"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("Error logging in: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 rounded-full bg-surface/20 text-muted hover:text-foreground transition-all"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted">Sign in to sync your focus history.</p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 px-4 bg-primary text-background rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
}
