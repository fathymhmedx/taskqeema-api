import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonForm } from "../components/LessonForm";
import { useLessonById } from "../hooks/useLessonById";
import * as lessonsService from "../services/lessonsService";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Card } from "@/shared/components/Card";
import { Alert } from "@/shared/components/Alert";
import { LoadingState } from "@/shared/components/LoadingState";
import { ROUTES } from "@/app/config/constants";

export function AdminLessonFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id != null;
  const lessonId = isEdit ? parseInt(id, 10) : null;
  const { lesson, loading } = useLessonById(Number.isNaN(lessonId ?? NaN) ? null : lessonId);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && lessonId != null && !loading && !lesson) {
      navigate(ROUTES.admin.lessons, { replace: true });
    }
  }, [isEdit, lessonId, loading, lesson, navigate]);

  const handleSubmit = async (values: {
    title?: string;
    description?: string;
    content?: string;
    image?: string;
    sortOrder?: number;
  }) => {
    setSubmitError(null);
    try {
      if (isEdit && lessonId != null) {
        const payload: Parameters<typeof lessonsService.updateLesson>[1] = {};
        if (values.title !== undefined && values.title.trim() !== "") payload.title = values.title.trim();
        if (values.description !== undefined) payload.description = values.description;
        if (values.content !== undefined && values.content.trim() !== "") payload.content = values.content.trim();
        if (values.image !== undefined && values.image.trim() !== "") payload.image = values.image.trim();
        const order = values.sortOrder;
        if (typeof order === "number" && !Number.isNaN(order) && order >= 0) payload.sortOrder = Math.floor(order);
        await lessonsService.updateLesson(lessonId, payload);
      } else {
        await lessonsService.createLesson({
          title: values.title!,
          description: values.description!,
          content: values.content!,
          image: values.image || undefined,
          sortOrder: values.sortOrder,
        });
      }
      navigate(ROUTES.admin.lessons);
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Failed to save lesson"));
    }
  };

  if (isEdit && loading) return <LoadingState />;
  if (isEdit && lesson == null) return null;

  const defaultValues =
    isEdit && lesson
      ? {
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          image: lesson.image ?? "",
          sortOrder: lesson.sortOrder,
        }
      : undefined;

  return (
    <div className="container-content max-w-3xl mx-auto py-4 sm:py-6">
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit lesson" : "New lesson"}
        </h1>
        {submitError && <Alert variant="error" message={submitError} />}
        <Card className="p-4 sm:p-6">
          <LessonForm defaultValues={defaultValues} onSubmit={handleSubmit} isEdit={isEdit} />
        </Card>
      </div>
    </div>
  );
}
