import { useState, useEffect, useCallback } from "react";
import * as studentsService from "../services/studentsService";
import type { Student } from "../types";

export function useStudentsList(initialPage = 1, limit = 10, search = "") {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(
    async (p: number) => {
      setLoading(true);
      setError(null);
      try {
        const { data, meta } = await studentsService.getStudents({
          page: p,
          limit,
          search: search || undefined,
        });
        setStudents(data);
        setTotal(meta.total);
        setPage(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load students");
      } finally {
        setLoading(false);
      }
    },
    [limit, search]
  );

  useEffect(() => {
    fetch(page);
  }, [page, fetch]);

  return {
    students,
    total,
    page,
    limit,
    loading,
    error,
    setPage,
    refetch: () => fetch(page),
  };
}
