"use client";

import { useEffect, useMemo } from "react";
import { useStore } from "@/hooks/useStore";
import { eachDayOfInterval, subDays, format } from "date-fns";
import { Flame, Info } from "lucide-react";

const CONFIG = {
  DAYS_TO_SHOW: 91,
  THRESHOLDS: {
    LOW: 15,
    MEDIUM: 45,
    HIGH: 60,
  },
};

export default function StreakHeatmap() {
  const { activityLogs, fetchActivityLogs, currentStreak } = useStore();

  useEffect(() => {
    fetchActivityLogs();
  }, [fetchActivityLogs]);

  // Memoization
  const dates = useMemo(() => {
    const today = new Date();
    return eachDayOfInterval({
      start: subDays(today, CONFIG.DAYS_TO_SHOW - 1),
      end: today,
    });
  }, []);

  // pure Function
  const getIntensityClass = (minutes: number) => {
    if (minutes === 0) return "bg-surface/50 border-white/5";
    if (minutes < CONFIG.THRESHOLDS.LOW)
      return "bg-primary/30 border-primary/20";
    if (minutes < CONFIG.THRESHOLDS.MEDIUM)
      return "bg-primary/60 border-primary/40";
    return "bg-primary border-primary shadow-[0_0_10px_var(--primary)]";
  };

  return (
    <section
      className="w-full bg-surface/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl"
      aria-label="Focus Activity Heatmap"
    >
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Flame
              className={`transition-all duration-500 ${
                currentStreak > 0
                  ? "text-orange-500 fill-orange-500"
                  : "text-muted"
              }`}
              size={20}
            />
            <span>Focus Streak</span>
          </h3>
          <p className="text-xs text-muted mt-1">
            Keep the fire burning. Consistent action creates momentum.
          </p>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-mono font-bold text-primary animate-in fade-in slide-in-from-bottom-2">
              {currentStreak}
            </span>
            <span className="text-xs text-muted font-medium uppercase tracking-wider">
              days
            </span>
          </div>
        </div>
      </div>

      <div
        className="grid grid-rows-7 grid-flow-col gap-1.5 overflow-x-auto pb-4 custom-scrollbar"
        role="grid"
      >
        {dates.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const log = activityLogs.find((l) => l.date === dateStr);
          const minutes = log?.minutes || 0;
          const colorClass = getIntensityClass(minutes);

          return (
            <div
              key={dateStr}
              role="gridcell"
              aria-label={`${dateStr}: ${minutes} minutes focused`}
              className={`
                w-3 h-3 sm:w-4 sm:h-4 rounded-sm border transition-all duration-300
                hover:scale-125 hover:z-10 cursor-help
                ${colorClass}
              `}
              title={`${format(date, "MMM dd, yyyy")}: ${minutes} mins`}
            />
          );
        })}
      </div>

      {/* LEGEND SECTION */}
      <div className="flex items-center justify-end gap-3 mt-4">
        <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
          Less
        </span>
        <div className="flex gap-1">
          <LegendBox className="bg-surface/50" />
          <LegendBox className="bg-primary/30" />
          <LegendBox className="bg-primary/60" />
          <LegendBox className="bg-primary shadow-[0_0_5px_var(--primary)]" />
        </div>
        <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
          More
        </span>
      </div>
    </section>
  );
}

function LegendBox({ className }: { className: string }) {
  return <div className={`w-3 h-3 rounded-sm ${className}`} />;
}
