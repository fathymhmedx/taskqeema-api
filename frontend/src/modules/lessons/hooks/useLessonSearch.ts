import { useState, useCallback } from "react";
import * as lessonsService from "../services/lessonsService";
import type { Lesson } from "../types";

export function useLessonSearch() {
  const [results, setResults] = useState<Lesson[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (name: string, page = 1, limit = 10) => {
    if (!name.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, meta } = await lessonsService.searchLessons(name, page, limit);
      setResults(data);
      setTotal(meta.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, total, loading, error, search };
}
