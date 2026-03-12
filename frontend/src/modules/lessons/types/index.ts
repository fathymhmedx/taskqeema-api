export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string | null;
  rating?: number | null;
  sortOrder: number;
  createdAt: string;
  updatedAt?: string;
  isFavorite?: boolean;
}

export interface CreateLessonInput {
  title: string;
  description: string;
  content: string;
  image?: string;
  rating?: number;
  sortOrder?: number;
}

export interface UpdateLessonInput {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  rating?: number;
  sortOrder?: number;
}

export interface ListLessonsQuery {
  page?: number;
  limit?: number;
}
