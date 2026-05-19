"use client";

import { useEffect, useState } from "react";

export type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

function getCountdownTime(target: Date): CountdownTime {
  const remaining = target.getTime() - Date.now();

  if (remaining <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  return {
    days: Math.floor(remaining / DAY_IN_MS),
    hours: Math.floor((remaining % DAY_IN_MS) / HOUR_IN_MS),
    minutes: Math.floor((remaining % HOUR_IN_MS) / MINUTE_IN_MS),
    seconds: Math.floor((remaining % MINUTE_IN_MS) / SECOND_IN_MS),
    isExpired: false,
  };
}

export function useCountdown(target: Date): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    getCountdownTime(target),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownTime(target));
    }, SECOND_IN_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [target]);

  return countdown;
}
