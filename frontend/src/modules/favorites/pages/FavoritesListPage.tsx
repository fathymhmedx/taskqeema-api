import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useRemoveFavorite } from "../hooks/useRemoveFavorite";
import { FavoriteLessonCard } from "../components/FavoriteLessonCard";
import { LoadingState } from "@/shared/components/LoadingState";
import { EmptyState } from "@/shared/components/EmptyState";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";
import { ROUTES } from "@/app/config/constants";

export function FavoritesListPage() {
  const { favorites, loading, error, refetch } = useFavorites();
  const { removeFavorite, loading: removing } = useRemoveFavorite(refetch);

  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = async (lessonId: number) => {
    setRemovingId(lessonId);
    try {
      await removeFavorite(lessonId);
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Favorites</h1>
      <p className="text-gray-500 text-sm">Lessons you saved for later.</p>
      {error && <Alert variant="error" message={error} />}
      {favorites.length === 0 ? (
        <EmptyState
          message="You have no favorite lessons yet."
          action={
            <Link to={ROUTES.student.lessons}>
              <Button>Browse lessons</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <FavoriteLessonCard
              key={fav.id}
              favorite={fav}
              onRemove={handleRemove}
              removing={removing && removingId === fav.lessonId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
