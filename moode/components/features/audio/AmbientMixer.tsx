"use client";

import { useStore } from "@/hooks/useStore";
import { CloudRain, Coffee, Flame } from "lucide-react";

export default function AmbientMixer() {
  const { volumes, setVolume } = useStore();

  const sounds = [
    {
      id: "rain",
      label: "Rainy Mood",
      icon: CloudRain,
      color: "text-blue-400",
    },
    { id: "cafe", label: "Coffee Shop", icon: Coffee, color: "text-amber-700" },
    { id: "fire", label: "Campfire", icon: Flame, color: "text-orange-500" },
  ] as const;

  return (
    <div className="w-full backdrop-blur-xl bg-surface/40 border border-white/10 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Atmosphere
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-muted">
          Mix your vibe
        </span>
      </div>

      <div className="space-y-6">
        {sounds.map((sound) => (
          <div key={sound.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-surface ${sound.color} bg-opacity-20`}
                >
                  <sound.icon size={18} />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {sound.label}
                </span>
              </div>
              <span className="text-xs text-muted font-mono">
                {Math.round(volumes[sound.id as keyof typeof volumes] * 100)}%
              </span>
            </div>

            {/* Custom Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes[sound.id as keyof typeof volumes]}
              onChange={(e) =>
                setVolume(sound.id as any, parseFloat(e.target.value))
              }
              className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
