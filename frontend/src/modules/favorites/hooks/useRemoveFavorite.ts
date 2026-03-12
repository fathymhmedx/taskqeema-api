import { useState, useCallback } from "react";
import * as favoritesService from "../services/favoritesService";

export function useRemoveFavorite(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeFavorite = useCallback(
    async (lessonId: number) => {
      setLoading(true);
      setError(null);
      try {
        await favoritesService.removeFavorite(lessonId);
        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove favorite");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  return { removeFavorite, loading, error };
}
