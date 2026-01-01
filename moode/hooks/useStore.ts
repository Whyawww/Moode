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
  completedAt?: number;
}

interface AppState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  volumes: AudioState;
  setVolume: (type: keyof AudioState, value: number) => void;
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
          const activeCount = state.tasks.filter((t) => !t.completed).length;
          if (activeCount >= 7) return state;
          return {
            tasks: [
              { id: crypto.randomUUID(), title, completed: false },
              ...state.tasks,
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
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: !t.completed ? Date.now() : undefined,
                }
              : t
          ),
        })),
    }),
    {
      name: "moode-storage",
    }
  )
);
