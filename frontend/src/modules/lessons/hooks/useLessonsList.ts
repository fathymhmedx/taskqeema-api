import { useState, useEffect, useCallback } from "react";
import * as lessonsService from "../services/lessonsService";
import type { Lesson } from "../types";

export function useLessonsList(initialPage = 1, limit = 10) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, meta } = await lessonsService.getLessons({ page: p, limit });
      setLessons(data);
      setTotal(meta.total);
      setPage(p);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lessons");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch(page);
  }, [page, fetch]);

  const setPageAndFetch = useCallback((p: number) => setPage(p), []);

  return { lessons, total, page, limit, loading, error, setPage: setPageAndFetch, refetch: () => fetch(page) };
}
