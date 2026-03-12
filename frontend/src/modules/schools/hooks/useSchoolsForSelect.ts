import { useState, useEffect } from "react";
import * as schoolsService from "../services/schoolsService";
import type { School } from "../types";

export function useSchoolsForSelect() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    schoolsService
      .getSchools()
      .then((data) => {
        if (!cancelled) setSchools(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { schools, loading };
}
