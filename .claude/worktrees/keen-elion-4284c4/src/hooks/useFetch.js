import { useCallback, useEffect, useState } from "react";

export default function useFetch(fetcher, options = {}) {
  const { immediate = true, deps = [] } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState("");

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError("");
        const result = await fetcher(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "Error inesperado.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  useEffect(() => {
    if (!immediate) return undefined;
    execute().catch(() => undefined);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, execute, setData, setError, setLoading };
}
