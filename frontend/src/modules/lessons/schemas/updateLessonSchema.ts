import { z } from "zod";

export const updateLessonSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required").optional(),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  rating: z.number().min(0).max(5).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export type UpdateLessonFormValues = z.infer<typeof updateLessonSchema>;
