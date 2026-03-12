import { useState, useCallback } from "react";
import * as favoritesService from "../services/favoritesService";

export function useAddFavorite(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFavorite = useCallback(
    async (lessonId: number) => {
      setLoading(true);
      setError(null);
      try {
        await favoritesService.addFavorite(lessonId);
        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add favorite");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  return { addFavorite, loading, error };
}
