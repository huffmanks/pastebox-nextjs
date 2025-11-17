"use client";

import { useCallback } from "react";

import { useBoolean } from "@/hooks/use-boolean";
import { useCounter } from "@/hooks/use-counter";
import { useInterval } from "@/hooks/use-interval";

type CountdownOptions = {
  countStart: number;
  countStop?: number;
  intervalMs?: number;
  isIncrement?: boolean;
};

type CountdownControllers = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: (resetValue: number) => void;
};

export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, string, CountdownControllers] {
  const { count, prettyCount, increment, decrement, reset: resetCounter } = useCounter(countStart);

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  const resetCountdown = useCallback(
    (resetValue?: number) => {
      stopCountdown();
      resetCounter(resetValue);
    },
    [stopCountdown, resetCounter]
  );

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [count, prettyCount, { startCountdown, stopCountdown, resetCountdown }];
}

export type { CountdownControllers, CountdownOptions };
