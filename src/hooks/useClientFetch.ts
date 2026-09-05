"use client";

import { useEffect, useState } from "react";

export function useClientFetch<T>(factory: () => Promise<T>, key = "default") {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    factory()
      .then((result) => {
        if (!active) return;
        setData(result);
        setError(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
      });
    return () => {
      active = false;
    };
    // Key/version identify the request; factory is created by the page for that key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, version]);

  return {
    data,
    error,
    reload() {
      setData(null);
      setError(false);
      setVersion((value) => value + 1);
    },
  };
}
