import { useState, useEffect, useCallback } from "react";
import * as lessonsService from "../services/lessonsService";
import type { Lesson } from "../types";

export function useLessonById(id: number | null) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (lessonId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonsService.getLessonById(lessonId);
      setLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id != null) fetch(id);
    else {
      setLesson(null);
      setLoading(false);
      setError(null);
    }
  }, [id, fetch]);

  return { lesson, loading, error, refetch: id != null ? () => fetch(id) : () => {} };
}
