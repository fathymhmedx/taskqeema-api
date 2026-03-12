import { useState, useEffect, useCallback } from "react";
import * as favoritesService from "../services/favoritesService";
import type { Favorite } from "../types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await favoritesService.getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, error, refetch: fetchFavorites };
}
