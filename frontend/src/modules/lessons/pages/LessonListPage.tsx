import { useState, useMemo, useCallback } from "react";
import { useLessonSearch } from "../hooks/useLessonSearch";
import { useLessonsList } from "../hooks/useLessonsList";
import { LessonCard } from "../components/LessonCard";
import { useFavorites } from "@/modules/favorites/hooks/useFavorites";
import { useAddFavorite } from "@/modules/favorites/hooks/useAddFavorite";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { LoadingState } from "@/shared/components/LoadingState";
import { EmptyState } from "@/shared/components/EmptyState";
import { Pagination } from "@/shared/components/Pagination";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";

export function LessonListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addingLessonId, setAddingLessonId] = useState<number | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  const { lessons, total, page, limit, loading, error, setPage } = useLessonsList(1, 6);
  const { results: searchResults, total: searchTotal, loading: searchLoading, search } = useLessonSearch();
  const { favorites, refetch: refetchFavorites } = useFavorites();
  const { addFavorite } = useAddFavorite(refetchFavorites);

  const favoriteLessonIds = useMemo(
    () => new Set(favorites.map((f) => f.lessonId)),
    [favorites]
  );

  const isSearching = searchQuery.trim().length > 0;
  const displayLessons = isSearching ? searchResults : lessons;
  const displayTotal = isSearching ? searchTotal : total;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery, 1, 6);
  };

  const handleAddFavorite = useCallback(
    (lessonId: number) => {
      setAddError(null);
      setAddingLessonId(lessonId);
      addFavorite(lessonId).catch((err) => {
        setAddError(getErrorMessage(err, "Failed to add to favorites"));
      }).finally(() => {
        setAddingLessonId(null);
      });
    },
    [addFavorite]
  );

  if (loading && !isSearching) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Lessons</h1>
        <form onSubmit={handleSearch} className="flex flex-1 max-w-md gap-2 sm:flex-initial">
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
      {error && <Alert variant="error" message={error} />}
      {addError && <Alert variant="error" message={addError} />}
      {searchLoading && isSearching && (
        <p className="text-sm text-gray-500">Searching...</p>
      )}
      {displayLessons.length === 0 && (
        <EmptyState message="No lessons found." />
      )}
      {displayLessons.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                studentPortal
                onAddFavorite={handleAddFavorite}
                isFavorite={favoriteLessonIds.has(lesson.id)}
                adding={addingLessonId === lesson.id}
              />
            ))}
          </div>
          {!isSearching && (
            <Pagination
              page={page}
              total={displayTotal}
              limit={limit}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
