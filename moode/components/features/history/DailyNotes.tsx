"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { Save, Loader2, StickyNote } from "lucide-react";
import { toast } from "sonner";

export default function DailyNote({ date }: { date: Date | undefined }) {
  const { currentNote, fetchNote, saveNote } = useStore();
  const [localNote, setLocalNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (date) {
      fetchNote(date);
    }
  }, [date, fetchNote]);

  useEffect(() => {
    setLocalNote(currentNote || "");
  }, [currentNote, setLocalNote]);

  const handleSave = async () => {
    if (!date) return;
    setIsSaving(true);
    await saveNote(date, localNote);
    setIsSaving(false);
    toast.success("Note saved successfully");
  };

  if (!date) return null;

  return (
    <div className="mt-6 p-5 rounded-3xl bg-surface/30 border border-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-muted uppercase tracking-wider flex items-center gap-2">
          <StickyNote size={16} /> Daily Note
        </h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all disabled:opacity-50"
          title="Save Note"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
        </button>
      </div>

      <textarea
        value={localNote}
        onChange={(e) => setLocalNote(e.target.value)}
        placeholder="Write your reflection or gratitude here..."
        className="w-full h-32 bg-background/50 border border-white/10 rounded-xl p-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none placeholder:text-muted/40"
      />
    </div>
  );
}
