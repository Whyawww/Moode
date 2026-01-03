import { create } from "zustand";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ThemeType = "focus" | "zen" | "sunset";

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

    if (error) {
      console.error("Gagal ambil tasks:", error);
    } else {
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
      console.error("Error nambah task:", error);
      toast.error("Failed to add task.");
    } else if (data) {
      const newTask: Task = {
        id: data.id,
        title: data.title,
        completed: data.completed,
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
      toast.success("Task added to flow!");
    }
  },

  removeTask: async (id) => {
    const previousTasks = get().tasks;

    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Gagal hapus:", error);
      set({ tasks: previousTasks });
      toast.error("Failed to delete task.");
    } else {
      toast.info("Task removed.");
    }
  },

  toggleTask: async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const newCompletedAt = newStatus ? new Date().toISOString() : null;

    const { error } = await supabase
      .from("tasks")
      .update({
        completed: newStatus,
        completed_at: newCompletedAt,
      })
      .eq("id", id);

    if (!error) {
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
    }
  },
}));
