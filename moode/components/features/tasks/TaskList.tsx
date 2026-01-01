"use client";

import { useState } from "react";
import { useStore, Task } from "@/hooks/useStore";
import { Plus, X, Play, Circle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TaskList() {
  const { tasks, addTask, removeTask, toggleTask } = useStore();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const ACTIVE_LIMIT = 7;
  const isFull = activeTasks.length >= ACTIVE_LIMIT;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isFull) return;
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <div className="w-full backdrop-blur-xl bg-surface/40 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-full min-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Your Focus
          </h2>
          <p className="text-xs text-muted">
            Rule of {ACTIVE_LIMIT}: Prioritize wisely.
          </p>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${
            isFull
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-white/10 text-muted border-white/10"
          }`}
        >
          {activeTasks.length}/{ACTIVE_LIMIT} Active
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="relative mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isFull
              ? "Finish a task to add more..."
              : "Type the task you want to complete..."
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

      <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
        <LayoutGroup>
          {/* ACTIVE TASKS CONTAINER */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {activeTasks.length === 0 && completedTasks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted text-sm py-10"
                >
                  No tasks yet. <br /> Add one to start flowing.
                </motion.div>
              )}

              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  toggle={toggleTask}
                  remove={removeTask}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* COMPLETED TASKS CONTAINER */}
          {completedTasks.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted uppercase tracking-wider opacity-60">
                <CheckCircle2 size={12} />
                <span>Completed ({completedTasks.length})</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <div className="space-y-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <AnimatePresence mode="popLayout">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      toggle={toggleTask}
                      remove={removeTask}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </LayoutGroup>
      </div>

      {/* Hanya muncul kalau ada Active Task */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <button
          disabled={activeTasks.length === 0}
          onClick={() => router.push("/focus")}
          className="w-full py-3 rounded-xl bg-primary text-background font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
        >
          <Play size={18} fill="currentColor" />
          {activeTasks.length > 0 ? "Start Focus Session" : "Add Task to Start"}
        </button>
      </div>
    </div>
  );
}

function TaskItem({
  task,
  toggle,
  remove,
}: {
  task: Task;
  toggle: (id: string) => void;
  remove: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
        task.completed
          ? "bg-surface/20 border-transparent"
          : "bg-surface/60 border-white/5 hover:border-primary/30 hover:bg-surface/80"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={() => toggle(task.id)}
          className={`flex-shrink-0 transition-colors ${
            task.completed ? "text-primary" : "text-muted hover:text-primary"
          }`}
        >
          {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
        <span
          className={`text-sm truncate select-none ${
            task.completed
              ? "line-through text-muted"
              : "text-foreground font-medium"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => remove(task.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        title="Delete"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
