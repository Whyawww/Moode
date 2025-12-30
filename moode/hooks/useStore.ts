import { create } from "zustand";
import { persist } from "zustand/middleware";

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
}

interface AppState {
  // --- Theme Slice ---
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;

  // --- Audio Slice ---
  volumes: AudioState;
  setVolume: (type: keyof AudioState, value: number) => void;

  // --- Task Slice (BARU) ---
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "focus",
      setTheme: (theme) => set({ theme }),

      volumes: { rain: 0.5, cafe: 0, fire: 0 },
      setVolume: (type, value) =>
        set((state) => ({
          volumes: { ...state.volumes, [type]: value },
        })),

      tasks: [],
      addTask: (title) =>
        set((state) => {
          if (state.tasks.length >= 5) return state;
          return {
            tasks: [
              ...state.tasks,
              { id: crypto.randomUUID(), title, completed: false },
            ],
          };
        }),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
    }),
    {
      name: "moode-storage",
    }
  )
);
