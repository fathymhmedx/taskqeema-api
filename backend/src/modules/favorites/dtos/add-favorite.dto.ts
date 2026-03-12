import { z } from "zod";

export const addFavoriteSchema = z.object({
  lessonId: z.coerce.number().int().positive("Lesson ID must be a positive integer"),
});

export type AddFavoriteDto = z.infer<typeof addFavoriteSchema>;
