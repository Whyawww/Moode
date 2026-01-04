"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/60 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="text-xl font-bold tracking-tight flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image
            src="/logo.png"
            alt="Moode"
            fill
            className="object-contain"
            priority
          />
        </div>
        <Image
          src="/moode.png"
          alt="Moode"
          width={120}
          height={30}
          className="object-contain"
          priority
        />
      </div>

      <Link
        href="/auth/login"
        className="group flex items-center gap-2 px-5 py-2 rounded-full bg-surface/50 border border-white/10 hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 text-sm font-semibold shadow-lg shadow-black/5"
      >
        <span>Login</span>
        <LogIn
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </nav>
  );
}
