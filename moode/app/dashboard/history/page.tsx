"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { DayPicker } from "react-day-picker";
import { format, isSameDay } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";

export default function HistoryPage() {
  const { tasks } = useStore();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const historyTasks = tasks.filter((task) => {
    if (!task.completed || !task.completedAt) return false;
    return selectedDate ? isSameDay(task.completedAt, selectedDate) : false;
  });

  const css = `
    .rdp { margin: 0; }
    .rdp-month { background-color: transparent; }
    .rdp-day_selected:not([disabled]) { background-color: var(--primary); color: var(--background); font-weight: bold; }
    .rdp-day_today { color: var(--primary); font-weight: bold; }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: var(--surface); }
  `;

  return (
    <div className="min-h-screen p-6 pt-24 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <style>{css}</style>

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-full bg-surface/50 hover:bg-surface text-muted hover:text-foreground transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarDays className="text-primary" /> History
          </h1>
          <p className="text-muted">Track your consistency.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <div className="p-6 rounded-3xl bg-surface/30 border border-white/5 backdrop-blur-md shadow-2xl">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiersClassNames={{
                selected: "my-selected",
              }}
              styles={{
                caption: { color: "var(--foreground)" },
                head_cell: { color: "var(--muted)" },
                day: { color: "var(--foreground)" },
              }}
            />
          </div>
        </div>

        {/*LIST TASK */}
        <div className="space-y-4 w-full">
          <h2 className="text-xl font-semibold text-foreground border-b border-white/10 pb-4 flex justify-between items-center">
            <span>
              {selectedDate
                ? format(selectedDate, "MMMM do, yyyy")
                : "Select a date"}
            </span>
            <span className="text-xs font-normal text-muted bg-surface/50 px-2 py-1 rounded-lg">
              {historyTasks.length} Completed
            </span>
          </h2>

          <div className="space-y-3">
            {historyTasks.length === 0 ? (
              <div className="text-center py-12 px-6 text-muted bg-surface/10 rounded-2xl border border-dashed border-white/10 flex flex-col items-center gap-3">
                <AlertCircle size={32} className="opacity-50" />
                <p>No tasks found for this date.</p>
                {isSameDay(selectedDate || new Date(), new Date()) && (
                  <p className="text-xs opacity-50 max-w-[200px]">
                    Tip: Completed tasks from before the update need to be
                    unchecked & re-checked to appear here.
                  </p>
                )}
              </div>
            ) : (
              <AnimatePresence>
                {historyTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface/40 border border-white/5 hover:bg-surface/60 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-through opacity-70 truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted">
                        Completed at {format(task.completedAt!, "HH:mm")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
