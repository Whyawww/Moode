"use client";
import LoginForm from "../../../components/features/auth/LoginForm";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-background overflow-hidden p-6">
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-muted hover:text-foreground hover:bg-surface transition-all group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
      </Link>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] opacity-20 animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-[450px] flex flex-col items-center text-center space-y-8">
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Logo */}
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/logo.png"
              alt="Moode"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            Moode.
          </h1>
          <h2 className="text-xl text-muted flex items-center gap-2">
            Find your flow, master your focus.{" "}
            <Sparkles size={16} className="text-primary inline" />
          </h2>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
