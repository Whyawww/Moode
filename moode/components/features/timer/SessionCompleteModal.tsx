"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Trophy, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

interface SessionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  tasksCompleted: number;
}

export default function SessionCompleteModal({
  isOpen,
  onClose,
  duration,
  tasksCompleted,
}: SessionCompleteModalProps) {
  const handleShare = async () => {
    const taskText =
      tasksCompleted > 0 ? `✅ Crushed ${tasksCompleted} tasks.\n` : "";
    const shareText = `🚀 Just completed a ${duration}-minute deep work session on Moode!\n\n${taskText}Focus shouldn't be boring. Try it here:`;
    const shareUrl = "https://moode-six.vercel.app/";
    const fullContent = `${shareText} ${shareUrl}`;

    const shareData = {
      title: "Moode Focus Session",
      text: shareText,
      url: shareUrl,
    };

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        toast.success("Thanks for sharing your progress!");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to share. Try copying instead.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullContent);
        toast.success("Copied to clipboard! Ready to paste.");
      } catch (err) {
        toast.error("Failed to copy to clipboard.");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <Trophy size={40} className="text-yellow-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Session Complete!
                </h2>
                <p className="text-muted">
                  You kept the flow going. Great job!
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface/50 border border-white/5 flex flex-col items-center gap-2 transition-colors hover:bg-surface/70">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      {duration}
                    </span>
                    <span className="text-xs text-muted ml-1">min</span>
                  </div>
                  <span className="text-xs text-muted/60 uppercase tracking-wider">
                    Focus Time
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-white/5 flex flex-col items-center gap-2 transition-colors hover:bg-surface/70">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      {tasksCompleted}
                    </span>
                    <span className="text-xs text-muted ml-1">tasks</span>
                  </div>
                  <span className="text-xs text-muted/60 uppercase tracking-wider">
                    Completed
                  </span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0f172a]"
              >
                <Share2 size={18} />
                Share Statistics
              </button>

              <p className="text-xs text-muted/50 pt-2">
                Tip: Sharing your streak builds habit consistency.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
