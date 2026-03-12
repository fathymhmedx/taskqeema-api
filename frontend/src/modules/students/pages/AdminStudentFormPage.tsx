import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { StudentForm } from "../components/StudentForm";
import { useStudentById } from "../hooks/useStudentById";
import * as studentsService from "../services/studentsService";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Card } from "@/shared/components/Card";
import { Alert } from "@/shared/components/Alert";
import { LoadingState } from "@/shared/components/LoadingState";
import { ROUTES } from "@/app/config/constants";

export function AdminStudentFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id != null;
  const studentId = isEdit ? parseInt(id, 10) : null;
  const { student, loading } = useStudentById(Number.isNaN(studentId ?? NaN) ? null : studentId);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && studentId != null && !loading && !student) {
      navigate(ROUTES.admin.students, { replace: true });
    }
  }, [isEdit, studentId, loading, student, navigate]);

  const handleSubmit = async (values: {
    name?: string;
    email?: string;
    password?: string;
    grade?: string;
    schoolId?: number;
  }) => {
    setSubmitError(null);
    try {
      if (isEdit && studentId != null) {
        const body: { name?: string; email?: string; password?: string; grade?: string; schoolId?: number } = {};
        if (values.name != null) body.name = values.name;
        if (values.email != null) body.email = values.email;
        if (values.password != null && values.password !== "") body.password = values.password;
        if (values.grade != null) body.grade = values.grade;
        if (typeof values.schoolId === "number" && !Number.isNaN(values.schoolId) && values.schoolId > 0)
          body.schoolId = values.schoolId;
        await studentsService.updateStudent(studentId, body);
      } else {
        await studentsService.createStudent({
          name: values.name!,
          email: values.email!,
          password: values.password!,
          grade: values.grade,
          schoolId: values.schoolId!,
        });
      }
      navigate(ROUTES.admin.students);
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Failed to save student"));
    }
  };

  if (isEdit && loading) return <LoadingState />;
  if (isEdit && student == null) return null;

  const defaultValues =
    isEdit && student
      ? {
          name: student.name,
          email: student.email,
          grade: student.grade ?? "",
          schoolId: student.schoolId ?? undefined,
        }
      : undefined;

  return (
    <div className="container-content max-w-3xl mx-auto py-4 sm:py-6">
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit student" : "New student"}
        </h1>
        {submitError && <Alert variant="error" message={submitError} />}
        <Card className="p-4 sm:p-6">
          <StudentForm defaultValues={defaultValues} onSubmit={handleSubmit} isEdit={isEdit} />
        </Card>
      </div>
    </div>
  );
}
