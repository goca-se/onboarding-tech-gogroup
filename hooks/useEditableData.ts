"use client";

import { useState, useEffect, useCallback } from "react";

export function useEditableData<T>(
  key: string,
  defaultData: T
): { data: T; setData: (d: T) => void; reset: () => void } {
  const [data, setDataState] = useState<T>(defaultData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`content:${key}`);
      if (saved) setDataState(JSON.parse(saved));
    } catch { /* empty */ }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setData = useCallback(
    (d: T) => {
      setDataState(d);
      try {
        localStorage.setItem(`content:${key}`, JSON.stringify(d));
      } catch { /* empty */ }
    },
    [key]
  );

  const reset = useCallback(() => {
    localStorage.removeItem(`content:${key}`);
    setDataState(defaultData); // eslint-disable-line react-hooks/exhaustive-deps
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, reset };
}
