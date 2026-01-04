"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface HistoryCalendarProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function HistoryCalendar({
  selectedDate,
  onSelect,
}: HistoryCalendarProps) {
  const css = `
    .rdp { margin: 0; --rdp-cell-size: 45px; }
    .rdp-month { background-color: transparent; }
    .rdp-caption_label { font-size: 1.1rem; font-weight: 700; color: var(--foreground); }
    .rdp-nav_button { color: var(--muted); border-radius: 10px; }
    .rdp-nav_button:hover { color: var(--foreground); background-color: var(--surface); }
    .rdp-day { color: var(--foreground); font-weight: 500; transition: all 0.2s ease; border-radius: 12px; }
    .rdp-day:hover:not([disabled]) { background-color: var(--surface); color: var(--primary); }
    .rdp-day_today { color: var(--primary); font-weight: 900; border: 1px solid var(--primary); background-color: transparent; }
    .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) { 
        background-color: var(--primary) !important; 
        color: var(--background) !important;
        font-weight: bold !important;
        border-radius: 100% !important; 
        box-shadow: 0 0 15px var(--primary); 
        transform: scale(1.1);
        border: 2px solid var(--background);
    }
  `;

  return (
    <div className="p-6 rounded-3xl bg-surface/30 border border-white/5 backdrop-blur-md shadow-2xl w-full flex justify-center">
      <style>{css}</style>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        modifiersClassNames={{ selected: "my-selected" }}
      />
    </div>
  );
}
