"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStore";

interface SessionCompleteModalProps {
  isOpen: boolean;
  taskTitle: string;
  durationSeconds: number;
  taskId: string;
}

export default function SessionCompleteModal({
  isOpen,
  taskTitle,
  durationSeconds,
  taskId,
}: SessionCompleteModalProps) {
  const router = useRouter();
  const { toggleTask } = useStore();

  const handleFinish = () => {
    toggleTask(taskId);
    router.push("/dashboard");
  };

  const formatDurationText = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;

    if (m > 0 && s > 0) return `${m} minutes ${s} seconds`;
    if (m > 0) return `${m} minute${m > 1 ? "s" : ""}`;
    return `${s} second${s !== 1 ? "s" : ""}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-surface/90 border border-white/10 rounded-3xl p-8 text-center shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary animate-in fade-in zoom-in duration-700">
                <CheckCircle2 size={40} strokeWidth={3} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Session Completed!
                </h2>
                <p className="text-muted">
                  You focused for{" "}
                  <span className="text-primary font-bold">
                    {formatDurationText(durationSeconds)}
                  </span>{" "}
                  on:
                </p>
                <div className="p-3 bg-white/5 rounded-xl text-sm font-medium text-foreground/90 border border-white/5">
                  "{taskTitle}"
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleFinish}
                  className="w-full py-3 px-4 bg-primary text-background rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Complete & Go Home
                </button>

                <button className="w-full py-3 px-4 bg-surface text-muted hover:text-foreground rounded-xl font-medium border border-transparent hover:border-white/10 transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share Statistics
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
