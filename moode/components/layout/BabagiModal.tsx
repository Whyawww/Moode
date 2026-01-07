"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Heart, Zap } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const TRAKTEER_LINK = "https://trakteer.id/jiwcodes";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden z-10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="text-center space-y-4 mb-6 relative">
              <button
                onClick={onClose}
                className="absolute top-[-10px] right-[-10px] p-2 text-muted hover:text-foreground hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 ring-1 ring-red-500/20 mb-2 shadow-lg shadow-red-500/10">
                <Coffee size={28} />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold">Traktir Kopi? ☕</h3>
                <p className="text-sm text-muted">
                  Bantu Moode tetep jalan dan bebas iklan.
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface/50 border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-yellow-400 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">
                      Server Costs
                    </p>
                    <p className="text-xs text-muted">
                      Cover biaya server & domain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart size={18} className="text-pink-400 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">
                      Support Dev
                    </p>
                    <p className="text-xs text-muted">
                      Bikin gue semangat ngoding fitur baru.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={TRAKTEER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#be1e2d] hover:bg-[#9f1926] text-white font-bold transition-all hover:scale-[1.02] shadow-lg shadow-red-600/20"
              >
                <span>Dukung via Trakteer</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  IDR
                </span>
              </a>

              <p className="text-xs text-center text-muted/60">
                Bisa via GoPay, OVO, Dana, ShopeePay & QRIS.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
