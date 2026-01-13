import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import { startOfYear, format, subDays } from "date-fns";
import { logger } from "@/utils/logger";
import { gamificationService } from "@/service/gamification";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ThemeType = "focus" | "zen" | "sunset" | "daylight" | "latte";

export interface AudioState {
  rain: number;
  cafe: number;
  fire: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ActivityLog {
  date: string;
  minutes: number;
  count: number;
}

interface AppState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  volumes: AudioState;
  setVolume: (type: keyof AudioState, value: number) => void;

  currentNote: string;
  fetchNote: (date: Date) => Promise<void>;
  saveNote: (date: Date, content: string) => Promise<void>;

  activityLogs: ActivityLog[];
  currentStreak: number;
  fetchGamificationData: () => Promise<void>;
  logActivity: (minutes: number) => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "focus",
      setTheme: (theme) => set({ theme }),

      volumes: { rain: 0.2, cafe: 0, fire: 0 },
      setVolume: (type, value) =>
        set((state) => ({
          volumes: { ...state.volumes, [type]: value },
        })),

      // --- LEGACY NOTE LOGIC ---
      currentNote: "",
      fetchNote: async (date) => {
        set({ currentNote: "" });
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const dateString = date.toLocaleDateString("en-CA");
        const { data } = await supabase
          .from("daily_notes")
          .select("content")
          .eq("user_id", user.id)
          .eq("date", dateString)
          .single();

        if (data) {
          set({ currentNote: data.content });
        }
      },

      saveNote: async (date, content) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error("Login to save notes");
          return;
        }
        const dateString = date.toLocaleDateString("en-CA");
        set({ currentNote: content });

        await supabase
          .from("daily_notes")
          .upsert(
            { user_id: user.id, date: dateString, content: content },
            { onConflict: "user_id, date" }
          );
      },

      // --- GAMIFICATION ---
      activityLogs: [],
      currentStreak: 0,

      fetchGamificationData: async () => {
        try {
          const streak = await gamificationService.getCurrentStreak();

          const rawLogs = await gamificationService.getActivityLogs();

          const logs: ActivityLog[] = (rawLogs || []).map((item) => ({
            date: item.date,
            minutes: item.minutes_focused,
            count: 1,
          }));

          set({ currentStreak: streak, activityLogs: logs });
        } catch (err) {
          logger.error("Failed to fetch gamification data", err);
        }
      },

      logActivity: async (minutes) => {
        try {
          await gamificationService.logActivity(minutes);

          get().fetchGamificationData();
        } catch (err) {
          logger.error("Failed to log activity", err);
          toast.error("Failed to save progress");
        }
      },
    }),
    {
      name: "moode-storage",
      partialize: (state) => ({
        theme: state.theme,
        volumes: state.volumes,
      }),
    }
  )
);
