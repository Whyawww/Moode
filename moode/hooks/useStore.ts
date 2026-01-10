import { create } from "zustand";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import { startOfYear, format, subDays } from "date-fns";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ThemeType = "focus" | "zen" | "sunset" | "daylight" | "latte";

interface AudioState {
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

  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string, currentStatus: boolean) => Promise<void>;

  currentNote: string;
  fetchNote: (date: Date) => Promise<void>;
  saveNote: (date: Date, content: string) => Promise<void>;

  activityLogs: ActivityLog[];
  currentStreak: number;
  fetchActivityLogs: () => Promise<void>;
  logActivity: (minutes: number) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  theme: "focus",
  setTheme: (theme) => set({ theme }),
  volumes: { rain: 0.2, cafe: 0, fire: 0 },
  setVolume: (type, value) =>
    set((state) => ({
      volumes: { ...state.volumes, [type]: value },
    })),

  tasks: [],
  isLoading: false,

  activityLogs: [],
  currentStreak: 0,

  fetchTasks: async () => {
    set({ isLoading: true });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      set({ tasks: [], isLoading: false });
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      const formattedTasks: Task[] = data.map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        completedAt: t.completed_at ? new Date(t.completed_at) : undefined,
      }));
      set({ tasks: formattedTasks });
    }
    set({ isLoading: false });
  },

  addTask: async (title) => {
    const activeCount = get().tasks.filter((t) => !t.completed).length;
    if (activeCount >= 7) {
      toast.warning("Focus limit reached (7 tasks max).");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login to save tasks.");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, user_id: user.id }])
      .select()
      .single();

    if (error) {
      toast.error("Failed to add task.");
    } else if (data) {
      const newTask: Task = {
        id: data.id,
        title: data.title,
        completed: data.completed,
      };
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      toast.success("Task added to flow!");
    }
  },

  removeTask: async (id) => {
    const previousTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      set({ tasks: previousTasks });
      toast.error("Failed to delete task.");
    } else {
      toast.info("Task removed.");
    }
  },

  toggleTask: async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const newCompletedAt = newStatus ? new Date().toISOString() : null;

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: newStatus,
              completedAt: newCompletedAt
                ? new Date(newCompletedAt)
                : undefined,
            }
          : t
      ),
    }));

    const { error } = await supabase
      .from("tasks")
      .update({
        completed: newStatus,
        completed_at: newCompletedAt,
      })
      .eq("id", id);

    if (error) {
      toast.error("Sync failed");
    }
  },

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

  fetchActivityLogs: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("activity_logs")
      .select("date, minutes_focused")
      .eq("user_id", user.id)
      .gte("date", format(startOfYear(new Date()), "yyyy-MM-dd"));

    if (data) {
      const logs: ActivityLog[] = data.map((item) => ({
        date: item.date,
        minutes: item.minutes_focused,
        count: 1,
      }));

      const sortedLogs = logs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      let streak = 0;
      const today = new Date();
      const todayStr = format(today, "yyyy-MM-dd");
      const yesterdayStr = format(subDays(today, 1), "yyyy-MM-dd");

      const hasActivityToday = sortedLogs.some((l) => l.date === todayStr);
      const hasActivityYesterday = sortedLogs.some(
        (l) => l.date === yesterdayStr
      );

      if (hasActivityToday || hasActivityYesterday) {
        let currentDateCheck = hasActivityToday ? today : subDays(today, 1);

        for (let i = 0; i < sortedLogs.length; i++) {
          const logDate = sortedLogs[i].date;
          if (logDate === format(currentDateCheck, "yyyy-MM-dd")) {
            streak++;
            currentDateCheck = subDays(currentDateCheck, 1);
          } else {
            if (new Date(logDate) < currentDateCheck) break;
          }
        }
      } else {
        streak = 0;
      }

      set({ activityLogs: logs, currentStreak: streak });
    }
  },

  logActivity: async (minutes) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const todayStr = format(new Date(), "yyyy-MM-dd");

    const existingLog = get().activityLogs.find((l) => l.date === todayStr);
    const currentMinutes = existingLog ? existingLog.minutes : 0;
    const newMinutes = currentMinutes + minutes;

    const { error } = await supabase.from("activity_logs").upsert(
      {
        user_id: user.id,
        date: todayStr,
        minutes_focused: newMinutes,
      },
      { onConflict: "user_id, date" }
    );

    if (!error) {
      get().fetchActivityLogs();
    } else {
      console.error("Failed to log activity:", error);
    }
  },
}));
