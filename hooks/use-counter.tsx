"use client";

import * as React from "react";

import { getRelativeTimeLeft } from "@/lib/utils";

type UseCounterReturn = {
  count: number;
  prettyCount: string;
  increment: () => void;
  decrement: () => void;
  reset: (resetValue?: number) => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export function useCounter(initialValue?: number): UseCounterReturn {
  const [count, setCount] = React.useState(initialValue ?? 0);

  const prettyCount = React.useMemo(() => getRelativeTimeLeft(count), [count]);

  const increment = React.useCallback(() => {
    setCount((x) => x + 1);
  }, []);

  const decrement = React.useCallback(() => {
    setCount((x) => x - 1);
  }, []);

  const reset = React.useCallback(
    (resetValue?: number) => {
      if (resetValue !== undefined) setCount(resetValue);
      else setCount(initialValue ?? 0);
    },
    [initialValue]
  );

  return {
    count,
    prettyCount,
    increment,
    decrement,
    reset,
    setCount,
  };
}
