import { Link } from "react-router-dom";
import type { Lesson } from "../types";
import { Button } from "@/shared/components/Button";

interface LessonCardProps {
  lesson: Lesson;
  studentPortal?: boolean;
  onAddFavorite?: (lessonId: number) => void;
  isFavorite?: boolean;
  adding?: boolean;
}

export function LessonCard({
  lesson,
  studentPortal = true,
  onAddFavorite,
  isFavorite,
  adding,
}: LessonCardProps) {
  const href = studentPortal
    ? `/student/lessons/${lesson.id}`
    : `/admin/lessons/${lesson.id}/edit`;

  const showAddFavorite =
    studentPortal && onAddFavorite != null;
  const added = isFavorite ?? false;

  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!added && !adding) onAddFavorite?.(lesson.id);
  };

  return (
    <Link
      to={href}
      className="group block h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2"
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{lesson.title}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-2">{lesson.description || "No description."}</p>
        {showAddFavorite && (
          <div className="mt-4 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            <Button
              type="button"
              variant={added ? "ghost" : "secondary"}
              disabled={added}
              loading={adding}
              onClick={handleAddFavorite}
              className={`w-full text-sm ${added ? "text-emerald-600 hover:bg-emerald-50" : ""}`}
            >
              {added ? (
                <>
                  <svg className="mr-1.5 h-4 w-4 shrink-0 inline-block text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
                </>
              ) : (
                "Add to Favorites"
              )}
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}
