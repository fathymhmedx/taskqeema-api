import type { Lesson } from "../types";
import { Card } from "@/shared/components/Card";

interface LessonDetailViewProps {
  lesson: Lesson;
}

export function LessonDetailView({ lesson }: LessonDetailViewProps) {
  return (
    <Card title={lesson.title}>
      <p className="text-gray-600 mb-4">{lesson.description}</p>
      <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
        {lesson.content}
      </div>
    </Card>
  );
}
