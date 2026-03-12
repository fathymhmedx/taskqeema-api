import { useState, useEffect, useCallback } from "react";
import * as studentsService from "../services/studentsService";
import type { Student } from "../types";

export function useStudentById(id: number | null) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (studentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentsService.getStudentById(studentId);
      setStudent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load student");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id != null) fetch(id);
    else {
      setStudent(null);
      setLoading(false);
      setError(null);
    }
  }, [id, fetch]);

  return { student, loading, error, refetch: id != null ? () => fetch(id) : () => {} };
}
