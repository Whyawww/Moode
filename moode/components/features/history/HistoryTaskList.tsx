"use client";

import { format, isSameDay } from "date-fns";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/useStore";

export default function HistoryTaskList({ date }: { date: Date | undefined }) {
  const { tasks } = useStore();

  const historyTasks = tasks.filter((task) => {
    if (!task.completed || !task.completedAt) return false;
    return date ? isSameDay(task.completedAt, date) : false;
  });

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-semibold text-foreground border-b border-white/10 pb-4 flex justify-between items-center">
        <span>{date ? format(date, "MMMM do, yyyy") : "Select a date"}</span>
        <span className="text-xs font-normal text-muted bg-surface/50 px-2 py-1 rounded-lg">
          {historyTasks.length} Completed
        </span>
      </h2>

      <div className="space-y-3">
        {historyTasks.length === 0 ? (
          <div className="text-center py-12 px-6 text-muted bg-surface/10 rounded-2xl border border-dashed border-white/10 flex flex-col items-center gap-3">
            <AlertCircle size={32} className="opacity-50" />
            <p>No tasks found for this date.</p>
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
  );
}
