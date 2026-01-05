import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0f172a] text-[#f8fafc] relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse-slow" />

      <div className="z-10 text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Lost in the flow?</h2>
          <p className="text-muted text-lg max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background font-bold hover:scale-105 transition-transform"
        >
          <MoveLeft size={18} />
          Back to Safety
        </Link>
      </div>
    </div>
  );
}
