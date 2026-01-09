"use client";

import { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStore";
import { useFocusTimer } from "@/hooks/useFocusTimer";
import { toast } from "sonner";
import {
  Pause,
  Play,
  RotateCcw,
  ArrowLeft,
  Pencil,
  CheckCircle,
} from "lucide-react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import AmbientMixer from "@/components/features/audio/AmbientMixer";
import SessionCompleteModal from "@/components/features/timer/SessionCompleteModal";
import SoundManager from "@/components/features/audio/SoundManager";

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function FocusPage() {
  const router = useRouter();
  const { tasks, toggleTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [sessionSummary, setSessionSummary] = useState({
    secondsPassed: 0,
    tasksCompleted: 0,
    finishedTaskTitle: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const currentTask = tasks?.find((t) => !t.completed);
  const handleSessionComplete = async (isEarlyFinish = false) => {
    const taskTitle = currentTask?.title || "Free Flow";
    const passedTime = initialTime - timeLeft;

    setSessionSummary({
      secondsPassed: passedTime > 0 ? passedTime : 0,
      tasksCompleted: currentTask ? 1 : 0,
      finishedTaskTitle: taskTitle,
    });

    if (currentTask && !currentTask.completed) {
      try {
        await toggleTask(currentTask.id, false);
        toast.success(`Task "${taskTitle}" completed! 🎉`);
      } catch (error) {
        toast.error("Failed to update task status.");
        console.error(error);
      }
    } else if (!isEarlyFinish) {
      toast.success("Focus session finished!");
    }

    setShowModal(true);
  };

  const {
    timeLeft,
    isActive,
    initialTime,
    toggleTimer,
    resetTimer,
    setDuration,
    setInitialTime,
    formatTime,
  } = useFocusTimer(25, () => handleSessionComplete(false));

  const pageTitle = isActive
    ? `(${formatTime(timeLeft)}) ${currentTask?.title || "Focus"}`
    : "Moode | Focus Room";
  useDocumentTitle(pageTitle);


  const handleFinishEarly = async () => {
    if (isActive) toggleTimer();
    await handleSessionComplete(true);
  };

  const handleManualInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    const val = parseInt(e.target.value, 10);

    if (!isNaN(val) && val > 0 && val <= 180) {
      const seconds = val * 60;
      setInitialTime(seconds);
      setDuration(val);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  const currentMinutes = Math.floor(initialTime / 60);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 overflow-hidden text-foreground">
      <AuroraBackground />
      <SoundManager />

      <nav className="absolute top-6 left-6 z-20">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-3 rounded-full bg-surface/20 border border-white/5 hover:bg-surface/40 hover:text-primary hover:border-white/10 text-muted transition-all duration-300"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={24} />
        </button>
      </nav>

      <SessionCompleteModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push("/dashboard");
        }}
        durationSeconds={sessionSummary.secondsPassed}
        tasksCompleted={sessionSummary.tasksCompleted}
        taskTitle={sessionSummary.finishedTaskTitle}
      />

      <div className="z-10 w-full max-w-md text-center space-y-10">
        <header className="space-y-4 animate-in fade-in zoom-in duration-500">
          <div className="inline-block">
            <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 shadow-[0_0_15px_-5px_var(--primary)]">
              Current Focus
            </span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight line-clamp-2"
            title={currentTask?.title}
          >
            {currentTask?.title || "Free Flow"}
          </h1>
        </header>

        {/* Display Timer */}
        <section className="relative min-h-[160px] flex items-center justify-center">
          <div
            className={`font-mono font-bold tracking-tighter tabular-nums transition-transform duration-500 ease-out ${
              isActive
                ? "scale-110 text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                : "scale-100 text-foreground"
            }`}
          >
            {isEditing ? (
              <div className="flex items-center justify-center gap-2 text-7xl md:text-9xl animate-in fade-in zoom-in duration-300">
                <input
                  ref={inputRef}
                  type="number"
                  min="1"
                  max="180"
                  className="bg-transparent text-center w-[1.5em] focus:outline-none border-b-4 border-primary/50 text-primary placeholder:text-muted/20 appearance-none"
                  placeholder={currentMinutes.toString()}
                  onBlur={() => setIsEditing(false)}
                  onChange={handleManualInput}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <span className="text-4xl text-muted font-sans font-medium mt-8">
                  min
                </span>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => !isActive && setIsEditing(true)}
                className={`text-7xl md:text-9xl cursor-pointer select-none transition-colors ${
                  !isActive ? "hover:text-primary/80" : "cursor-default"
                }`}
                title={!isActive ? "Click to edit time" : ""}
              >
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
        </section>

        {/* Preset Waktu*/}
        {!isActive && !isEditing && (
          <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-top-2">
            {[15, 25, 45, 60].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all duration-300 ${
                  initialTime === min * 60
                    ? "bg-primary text-background border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-surface/30 text-muted border-white/5 hover:border-primary/50 hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {min}m
              </button>
            ))}

            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 rounded-2xl text-sm font-semibold border border-dashed border-white/20 bg-transparent text-muted hover:text-primary hover:border-primary/50 hover:bg-surface/30 transition-all flex items-center gap-2"
            >
              <Pencil size={14} />
              <span>Custom</span>
            </button>
          </div>
        )}

        {isEditing && (
          <p className="text-sm text-muted animate-in fade-in">
            Type minutes (1-180) and press Enter
          </p>
        )}

        {/* Kontrol Utama */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset the timer?")) {
                resetTimer();
              }
            }}
            className="p-4 rounded-full bg-surface/50 border border-white/5 text-muted hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 hover:scale-105 transition-all"
            title="Reset Timer"
            aria-label="Reset Timer"
          >
            <RotateCcw size={22} />
          </button>

          <button
            onClick={() => {
              if (isEditing) setIsEditing(false);
              toggleTimer();
            }}
            className={`rounded-full transition-all duration-300 shadow-2xl flex items-center justify-center ${
              isActive
                ? "w-24 h-24 bg-surface border-2 border-primary/20 text-primary hover:bg-surface/80 hover:border-primary/50"
                : "w-24 h-24 bg-primary text-background hover:scale-110 hover:shadow-primary/40 active:scale-95"
            }`}
            aria-label={isActive ? "Pause Timer" : "Start Timer"}
          >
            {isActive ? (
              <Pause size={40} fill="currentColor" />
            ) : (
              <Play size={40} fill="currentColor" className="ml-2" />
            )}
          </button>

          <button
            onClick={handleFinishEarly}
            className="p-4 rounded-full bg-surface/50 border border-white/5 text-muted hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20 hover:scale-105 transition-all"
            title="Mark Task as Complete Now"
            aria-label="Finish Task Early"
          >
            <CheckCircle size={22} />
          </button>
        </div>

        {/* Audio Controls */}
        <div className="pt-8 w-full max-w-sm mx-auto">
          <div className="opacity-70 hover:opacity-100 transition-opacity duration-300 p-4 rounded-3xl bg-surface/20 border border-white/5 backdrop-blur-sm">
            <AmbientMixer />
          </div>
        </div>
      </div>
    </main>
  );
}
