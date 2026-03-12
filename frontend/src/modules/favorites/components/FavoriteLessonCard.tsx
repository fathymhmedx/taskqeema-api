import { Link } from "react-router-dom";
import type { Favorite } from "../types";
import { Button } from "@/shared/components/Button";

interface FavoriteLessonCardProps {
  favorite: Favorite;
  onRemove: (lessonId: number) => void;
  removing?: boolean;
}

export function FavoriteLessonCard({ favorite, onRemove, removing }: FavoriteLessonCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5">
      <Link
        to={`/student/lessons/${favorite.lessonId}`}
        className="flex flex-1 flex-col focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 rounded-lg -m-1 p-1"
      >
        <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{favorite.lesson.title}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-2">
          {favorite.lesson.description || "No description."}
        </p>
      </Link>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <Button
          variant="danger"
          type="button"
          loading={removing}
          onClick={() => onRemove(favorite.lessonId)}
          className="w-full text-sm"
        >
          <svg className="mr-1.5 h-4 w-4 shrink-0 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </Button>
      </div>
    </div>
  );
}
