"use client";

import { useTasksByDate } from "@/hooks/queries/useTasks";
import { format } from "date-fns";
import { CheckCircle2, Clock, CalendarX2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryTaskList({ date }: { date: Date | undefined }) {
  const { data: tasks, isLoading } = useTasksByDate(date);

  if (!date) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted/50 p-8 border border-dashed border-white/5 rounded-3xl bg-surface/10">
        <CalendarX2 size={40} className="mb-3 opacity-50" />
        <p>Select a date to view history</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full h-full">
      <h2 className="text-xl font-bold text-foreground border-b border-white/10 pb-4 flex justify-between items-center animate-in fade-in slide-in-from-left-2 duration-500">
        <span>{format(date, "MMMM do, yyyy")}</span>
        <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {isLoading ? "..." : `${tasks?.length || 0} Done`}
        </span>
      </h2>

      <div className="space-y-3 min-h-[300px]">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-full bg-white/5 rounded-xl animate-pulse border border-white/5"
            />
          ))
        ) : tasks && tasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-surface/40 border border-white/5 hover:bg-surface/60 hover:border-primary/20 transition-all duration-300"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all">
                  <CheckCircle2 size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground opacity-80 group-hover:opacity-100 truncate">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={12} className="text-muted" />
                    <p className="text-xs text-muted">
                      {task.completed_at
                        ? format(new Date(task.completed_at), "HH:mm")
                        : "-"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 px-6 text-muted bg-surface/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center">
              <AlertCircle size={24} className="opacity-50" />
            </div>
            <div>
              <p className="text-foreground font-medium">No tasks recorded</p>
              <p className="text-xs opacity-50 mt-1">
                You were active, but maybe no tasks were checked off.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
