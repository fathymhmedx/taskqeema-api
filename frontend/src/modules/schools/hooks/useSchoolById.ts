import { useState, useEffect, useCallback } from "react";
import * as schoolsService from "../services/schoolsService";
import type { School } from "../types";

export function useSchoolById(id: number | null) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (schoolId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await schoolsService.getSchoolById(schoolId);
      setSchool(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load school");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id != null) fetch(id);
    else {
      setSchool(null);
      setLoading(false);
      setError(null);
    }
  }, [id, fetch]);

  return { school, loading, error, refetch: id != null ? () => fetch(id) : () => {} };
}
