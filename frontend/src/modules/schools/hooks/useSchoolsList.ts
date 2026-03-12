import { useState, useEffect, useCallback } from "react";
import * as schoolsService from "../services/schoolsService";
import type { School } from "../types";

export function useSchoolsList() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await schoolsService.getSchools();
      setSchools(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load schools");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { schools, loading, error, refetch: fetch };
}
