"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListTodo,
  Sliders,
  Timer,
  CheckCircle2,
  CloudRain,
  Flame,
  Coffee,
} from "lucide-react";

const features = [
  {
    id: "tasks",
    title: "1. The Rule of 7",
    desc: "Input up to 7 tasks. Prioritize what truly matters today. No clutter.",
    icon: <ListTodo />,
  },
  {
    id: "audio",
    title: "2. Set The Vibe",
    desc: "Mix Rain, Cafe, or Fire sounds to drown out the noise.",
    icon: <Sliders />,
  },
  {
    id: "timer",
    title: "3. Deep Flow",
    desc: "Start the timer. UI vanishes. Only you and your work remain.",
    icon: <Timer />,
  },
];

export default function FeatureWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Workflow that <span className="text-primary">just works.</span>
          </h2>
          <p className="text-muted text-lg">
            Don't fight your tools. Moode is designed to get out of your way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tab Controls */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border ${
                  activeTab === index
                    ? "bg-surface/60 border-primary/50 shadow-lg shadow-primary/10 scale-105"
                    : "bg-transparent border-transparent hover:bg-surface/30 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      activeTab === index
                        ? "bg-primary text-background"
                        : "bg-surface text-muted"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      activeTab === index ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted text-sm pl-[4.5rem] leading-relaxed">
                  {feature.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Visual Simulation */}
          <div className="relative h-[400px] w-full bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-grid-white/[0.03]" />

            <AnimatePresence mode="wait">
              {activeTab === 0 && <SimulateTasks key="tasks" />}
              {activeTab === 1 && <SimulateAudio key="audio" />}
              {activeTab === 2 && <SimulateTimer key="timer" />}
            </AnimatePresence>

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SUB COMPONENTS  ---

function SimulateTasks() {
  const tasks = [
    "Design Database",
    "Fix Hydration Error",
    "Push to Production",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm space-y-4"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-green-500/20" />
        <div className="ml-auto text-xs text-muted font-mono">Tasks: 3/7</div>
      </div>

      {tasks.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.5 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-white/5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              backgroundColor: i === 0 ? "rgb(56, 189, 248)" : "transparent",
            }}
            transition={{ delay: i * 0.5 + 1.5 }}
            className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center ${
              i === 0 ? "text-black" : ""
            }`}
          >
            {i === 0 && <CheckCircle2 size={12} />}
          </motion.div>

          <span
            className={`text-sm ${
              i === 0 ? "line-through text-muted" : "text-foreground"
            }`}
          >
            {t}
          </span>
        </motion.div>
      ))}

      {/* simulasi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="h-10 rounded-xl border border-white/10 bg-white/5 flex items-center px-3 text-sm text-muted"
      >
        <span className="animate-pulse">|</span>
      </motion.div>
    </motion.div>
  );
}

function SimulateAudio() {
  const sliders = [
    { icon: <CloudRain size={16} />, label: "Rain", val: 60 },
    { icon: <Coffee size={16} />, label: "Cafe", val: 30 },
    { icon: <Flame size={16} />, label: "Fire", val: 80 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-xs space-y-6"
    >
      <h3 className="text-center text-muted text-xs uppercase tracking-widest mb-4">
        Mixer Active
      </h3>
      {sliders.map((s, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between text-xs text-muted">
            <span className="flex items-center gap-2">
              {s.icon} {s.label}
            </span>
            <span>{s.val}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.val}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function SimulateTimer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 rounded-full border-4 border-white/5" />

        {/* Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="96"
            cy="96"
            r="92"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-primary"
            strokeDasharray="578"
            strokeDashoffset="578"
            animate={{ strokeDashoffset: 400 }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </svg>

        {/* Teks Jam */}
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold font-mono tabular-nums"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            24:59
          </motion.div>
          <p className="text-xs text-muted mt-1 uppercase tracking-widest">
            Focus Mode
          </p>
        </div>
      </div>
    </motion.div>
  );
}
