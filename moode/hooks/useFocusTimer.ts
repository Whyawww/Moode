import { useState, useEffect, useRef } from "react";
import {
  requestNotificationPermission,
  sendNotification,
} from "../utils/notification";

export function useFocusTimer(
  defaultMinutes: number = 25,
  onFinish?: () => void
) {
  const [initialTime, setInitialTime] = useState(defaultMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const endTimeRef = useRef<number | null>(null);

  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.ceil((endTimeRef.current! - now) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsActive(false);
          endTimeRef.current = null;

          sendNotification(
            "Focus Complete! 🎉",
            "Great job! Take a short break."
          );

          if (onFinishRef.current) {
            onFinishRef.current();
          }
        } else {
          setTimeLeft(remaining);
        }
      }, 200);
    } else {
      endTimeRef.current = null;
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = async () => {
    if (!isActive) {
      await requestNotificationPermission();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
    endTimeRef.current = null;
  };

  const setDuration = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
    endTimeRef.current = null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isActive,
    initialTime,
    toggleTimer,
    resetTimer,
    setDuration,
    setTimeLeft,
    setInitialTime,
    setIsActive,
    formatTime,
    progress: ((initialTime - timeLeft) / initialTime) * 100,
  };
}
