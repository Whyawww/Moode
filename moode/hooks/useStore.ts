import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeType = 'focus' | 'zen' | 'sunset';

interface AppState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'focus',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'moode-storage',
    }
  )
);