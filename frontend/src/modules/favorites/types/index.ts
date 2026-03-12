export interface FavoriteLesson {
  id: number;
  title: string;
  description: string;
}

export interface Favorite {
  id: number;
  lessonId: number;
  lesson: FavoriteLesson;
  createdAt: string;
}
