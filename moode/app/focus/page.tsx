"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import AuroraBackground from "@/components/ui/AuroraBackground";
import {
  Pause,
  Play,
  RotateCcw,
  ArrowLeft,
  Pencil,
  CheckCircle,
} from "lucide-react";
import AmbientMixer from "@/components/features/audio/AmbientMixer";
import SessionCompleteModal from "@/components/features/timer/SessionCompleteModal";
import SoundManager from "@/components/features/audio/SoundManager";

export default function FocusPage() {
  const { tasks } = useStore();
  const router = useRouter();

  const [initialTime, setInitialTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const endTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTask = tasks.find((t) => !t.completed) || tasks[0];

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.ceil((endTimeRef.current! - now) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsActive(false);
          endTimeRef.current = null;
          handleComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 200);
    } else {
      endTimeRef.current = null;
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    const formatted = formatTime(timeLeft);
    if (isActive) {
      document.title = `(${formatted}) ${
        currentTask?.title || "Focus"
      } - Moode`;
    } else {
      document.title = "Moode | Focus Room";
    }
  }, [timeLeft, isActive, currentTask]);

  const handleComplete = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time's Up! 🎉", {
        body: `You finished: ${currentTask?.title}`,
      });
    }
    setShowModal(true);
  };

  const handleFinishEarly = () => {
    setIsActive(false);
    endTimeRef.current = null;
    handleComplete();
  };

  const handleReset = () => {
    if (timeLeft === initialTime) return;

    const confirmReset = window.confirm(
      "Are you sure you want to reset the timer? Current progress will be lost."
    );
    if (confirmReset) {
      setIsActive(false);
      setIsEditing(false);
      setTimeLeft(initialTime);
      endTimeRef.current = null;
    }
  };

  const handleDurationChange = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
    setIsEditing(false);
    endTimeRef.current = null;
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 180) {
      const seconds = val * 60;
      setInitialTime(seconds);
      setTimeLeft(seconds);
      endTimeRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentMinutes = Math.floor(initialTime / 60);

  if (!currentTask) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-6 transition-colors duration-500 overflow-hidden">
      <AuroraBackground />
      <SoundManager />
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 p-2 rounded-full bg-surface/20 hover:bg-surface/40 text-muted transition-all z-20"
      >
        <ArrowLeft size={24} />
      </button>

      <SessionCompleteModal
        isOpen={showModal}
        taskTitle={currentTask.title}
        durationSeconds={Math.max(0, initialTime - timeLeft)}
        taskId={currentTask.id}
      />

      <div className="max-w-md w-full text-center space-y-8 z-10">
        <div className="space-y-4 animate-in fade-in zoom-in duration-500">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Current Focus
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground line-clamp-2">
            {currentTask.title}
          </h1>
        </div>

        {/* Timer Display */}
        <div className="relative group min-h-[160px] flex items-center justify-center">
          <div
            className={`font-mono font-bold tracking-tighter text-foreground tabular-nums transition-all ${
              isActive ? "scale-110" : "scale-100"
            }`}
          >
            {isEditing ? (
              <div className="flex items-center justify-center gap-2 text-7xl md:text-9xl animate-in fade-in zoom-in duration-300">
                <input
                  ref={inputRef}
                  type="number"
                  className="bg-transparent text-center w-[1.5em] focus:outline-none border-b-2 border-primary/50 text-primary placeholder:text-muted/20 appearance-none"
                  placeholder={currentMinutes.toString()}
                  onBlur={() => setIsEditing(false)}
                  onChange={handleManualInput}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                />
                <span className="text-4xl text-muted font-sans font-medium">
                  min
                </span>
              </div>
            ) : (
              <div
                onClick={() => !isActive && setIsEditing(true)}
                className="text-7xl md:text-9xl cursor-pointer select-none hover:text-primary/90 transition-colors"
              >
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
        </div>

        {/* Presets */}
        {!isActive && !isEditing && (
          <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-2">
            {[15, 25, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => handleDurationChange(min)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  initialTime === min * 60
                    ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                    : "bg-surface/50 text-muted border-white/5 hover:border-primary/50 hover:bg-surface"
                }`}
              >
                {min}m
              </button>
            ))}

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-dashed border-white/20 bg-transparent text-muted hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2"
            >
              <Pencil size={14} />
              Custom
            </button>
          </div>
        )}

        {isEditing && (
          <p className="text-sm text-muted animate-in fade-in">
            Type minutes and press Enter
          </p>
        )}

        <div className="flex items-center justify-center gap-8 pt-6">
          {/* RESET BUTTON */}
          <button
            onClick={handleReset}
            className="p-4 rounded-full bg-surface text-muted hover:bg-red-500/10 hover:text-red-400 hover:scale-105 transition-all"
            title="Reset Timer"
          >
            <RotateCcw size={22} />
          </button>

          {/* PLAY/PAUSE */}
          <button
            onClick={() => {
              if (isEditing) setIsEditing(false);
              setIsActive(!isActive);
            }}
            className="p-7 rounded-full bg-primary text-background hover:scale-110 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all"
          >
            {isActive ? (
              <Pause size={36} fill="currentColor" />
            ) : (
              <Play size={36} fill="currentColor" />
            )}
          </button>

          {/* FINISH EARLY */}
          <button
            onClick={handleFinishEarly}
            className="p-4 rounded-full bg-surface text-muted hover:bg-green-500/10 hover:text-green-400 hover:scale-105 transition-all"
            title="Finish Task Now"
          >
            <CheckCircle size={22} />
          </button>
        </div>

        <div className="pt-8 w-full max-w-sm mx-auto">
          <div className="opacity-50 hover:opacity-100 transition-opacity duration-300">
            <AmbientMixer />
          </div>
        </div>
      </div>
    </div>
  );
}
