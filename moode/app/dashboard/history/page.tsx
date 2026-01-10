"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import HistoryCalendar from "@/components/features/history/HistoryCalender";
import DailyNote from "@/components/features/history/DailyNotes";
import HistoryTaskList from "@/components/features/history/HistoryTaskList";
import StreakHeatmap from "@/components/features/gamification/StreakHeatmap";

export default function HistoryPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="min-h-screen p-6 pt-8 max-w-5xl mx-auto space-y-8">
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
          <p className="text-muted">Track your consistency & reflections.</p>
        </div>
      </div>

      <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
        <StreakHeatmap />
      </div>

      <div className="grid md:grid-cols-[350px_1fr] gap-8 items-start">
        <div className="w-full flex flex-col gap-6 ">
          <HistoryCalendar
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />

          <DailyNote date={selectedDate} />
        </div>

        <div className="w-full max-h-[620px] overflow-y-auto pr-2 custom-scrollbar rounded-2xl">
          <HistoryTaskList date={selectedDate} />
        </div>
      </div>
    </div>
  );
}
