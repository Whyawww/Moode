"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useStore } from "@/hooks/useStore";

export default function SoundManager() {
  const { volumes } = useStore();

  const sounds = useRef<{ [key: string]: Howl | null }>({
    rain: null,
    cafe: null,
    fire: null,
  });

  useEffect(() => {
    sounds.current.rain = new Howl({
      src: ["/sounds/rain.mp3"],
      loop: true,
      volume: 0,
      preload: true,
      html5: true,
    });

    sounds.current.cafe = new Howl({
      src: ["/sounds/cafe.mp3"],
      loop: true,
      volume: 0,
      preload: true,
      html5: true,
    });

    sounds.current.fire = new Howl({
      src: ["/sounds/fire.mp3"],
      loop: true,
      volume: 0,
      preload: true,
      html5: true,
    });

    Object.values(sounds.current).forEach((sound) => sound?.play());

    return () => {
      Object.values(sounds.current).forEach((sound) => sound?.unload());
    };
  }, []);

  useEffect(() => {
    if (sounds.current.rain) sounds.current.rain.volume(volumes.rain);
    if (sounds.current.cafe) sounds.current.cafe.volume(volumes.cafe);
    if (sounds.current.fire) sounds.current.fire.volume(volumes.fire);
  }, [volumes]);

  return null;
}
