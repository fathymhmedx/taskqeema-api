export interface LessonWithFavorite {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string | null;
  rating?: number | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}
