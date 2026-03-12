import { useParams, Link } from "react-router-dom";
import { useStudentById } from "../hooks/useStudentById";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";
import { LoadingState } from "@/shared/components/LoadingState";
import { formatDate } from "@/shared/utils/formatDate";
import { ROUTES } from "@/app/config/constants";

export function AdminStudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = id != null ? parseInt(id, 10) : null;
  const { student, loading, error } = useStudentById(
    studentId != null && !Number.isNaN(studentId) ? studentId : null
  );

  if (loading) return <LoadingState compact />;
  const backButton = (
    <Link
      to={ROUTES.admin.students}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Back to list"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </Link>
  );

  if (error || !student) {
    return (
      <div className="space-y-4">
        <p className="text-red-600" role="alert">
          {error ?? "Student not found."}
        </p>
        {backButton}
      </div>
    );
  }

  return (
    <div className="container-content max-w-3xl space-y-4 py-4 sm:py-6">
      <div className="flex flex-wrap items-center gap-2">
        {backButton}
        <Link to={ROUTES.admin.studentEdit.replace(":id", String(student.id))}>
          <Button variant="secondary" className="shrink-0">Edit</Button>
        </Link>
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Student details</h1>
      <Card title={student.name}>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="text-gray-900">{student.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Grade</dt>
            <dd className="text-gray-900">{student.grade ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="text-gray-900">{formatDate(student.createdAt)}</dd>
          </div>
          {student.updatedAt && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Updated</dt>
              <dd className="text-gray-900">{formatDate(student.updatedAt)}</dd>
            </div>
          )}
        </dl>
      </Card>
    </div>
  );
}
