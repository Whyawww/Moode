import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "focus" | "zen" | "sunset";

interface AudioState {
  rain: number;
  cafe: number;
  fire: number;
}

interface AppState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;

  volumes: AudioState;
  setVolume: (type: keyof AudioState, value: number) => void;
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
    }),
    {
      name: "moode-storage",
    }
  )
);
