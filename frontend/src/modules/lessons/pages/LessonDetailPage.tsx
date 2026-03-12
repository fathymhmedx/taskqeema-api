import { useParams, Link } from "react-router-dom";
import { useLessonById } from "../hooks/useLessonById";
import { LessonDetailView } from "../components/LessonDetailView";
import { LoadingState } from "@/shared/components/LoadingState";
import { ROUTES } from "@/app/config/constants";

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const lessonId = id != null ? parseInt(id, 10) : null;
  const { lesson, loading, error } = useLessonById(Number.isNaN(lessonId ?? NaN) ? null : lessonId);

  if (loading || lessonId == null) return <LoadingState />;
  const backButton = (
    <Link
      to={ROUTES.student.lessons}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Back to lessons"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </Link>
  );

  if (error || !lesson) {
    return (
      <div>
        <p className="text-red-600">{error ?? "Lesson not found."}</p>
        <div className="mt-2">{backButton}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {backButton}
      <LessonDetailView lesson={lesson} />
    </div>
  );
}
