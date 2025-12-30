"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { Plus, X, Play, Circle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TaskList() {
  const { tasks, addTask, removeTask, toggleTask } = useStore();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || tasks.length >= 5) return;
    addTask(inputValue);
    setInputValue("");
  };

  const isFull = tasks.length >= 5;

  return (
    <div className="w-full backdrop-blur-xl bg-surface/40 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-full min-h-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Your Focus
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${
            isFull
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-white/10 text-muted border-white/10"
          }`}
        >
          {tasks.length}/5 Tasks
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="relative mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isFull ? "Max 5 tasks reached" : "What needs to be done?"
          }
          disabled={isFull}
          className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isFull}
          className="absolute right-2 top-2 p-1.5 bg-primary/20 text-primary rounded-lg hover:bg-primary hover:text-background disabled:opacity-0 transition-all"
        >
          <Plus size={16} />
        </button>
      </form>

      {/* Task Items (Animated) */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted text-sm py-10"
            >
              No tasks yet. <br /> Add one to start flowing.
            </motion.div>
          )}

          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-muted hover:text-primary transition-colors flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 size={20} className="text-primary" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                <span
                  className={`text-sm truncate ${
                    task.completed
                      ? "line-through text-muted"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Start Button (Bottom) */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <button
          disabled={tasks.length === 0}
          onClick={() => router.push("/focus")}
          className="w-full py-3 rounded-xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Play size={18} fill="currentColor" />
          Start Focus
        </button>
      </div>
    </div>
  );
}
