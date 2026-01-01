"use client";

import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { useStore } from "@/hooks/useStore";
import { usePathname } from "next/navigation";

export default function SoundManager() {
  const { volumes } = useStore();
  const pathname = usePathname();

  const sounds = useRef<{ [key: string]: Howl | null }>({
    rain: null,
    cafe: null,
    fire: null,
  });

  useEffect(() => {
    const soundConfig = [
      { key: "rain", src: "/sounds/rain.mp3" },
      { key: "cafe", src: "/sounds/cafe.mp3" },
      { key: "fire", src: "/sounds/fire.mp3" },
    ];

    soundConfig.forEach(({ key, src }) => {
      sounds.current[key] = new Howl({
        src: [src],
        loop: true,
        volume: 0,
        preload: true,
        html5: false,
        onloaderror: (id, err) =>
          console.error(`❌ Gagal load audio: ${key}`, err),
        onplayerror: (id, err) => {
          sounds.current[key]?.once("unlock", () =>
            sounds.current[key]?.play()
          );
        },
      });
    });

    Object.values(sounds.current).forEach((sound) => sound?.play());

    const unlockAudio = () => {
      if (Howler.ctx.state === "suspended") Howler.ctx.resume();
    };
    document.addEventListener("click", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      Object.values(sounds.current).forEach((sound) => sound?.unload());
    };
  }, []);

  useEffect(() => {
    const shouldMute = pathname === "/" || pathname === "/auth/login";

    Howler.mute(shouldMute);

    if (sounds.current.rain) {
      sounds.current.rain.volume(shouldMute ? 0 : volumes.rain);
    }
    if (sounds.current.cafe) {
      sounds.current.cafe.volume(shouldMute ? 0 : volumes.cafe);
    }
    if (sounds.current.fire) {
      sounds.current.fire.volume(shouldMute ? 0 : volumes.fire);
    }
  }, [volumes, pathname]);

  return null;
}
