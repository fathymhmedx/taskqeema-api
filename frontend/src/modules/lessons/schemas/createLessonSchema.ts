import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  rating: z.number().min(0).max(5).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export type CreateLessonFormValues = z.infer<typeof createLessonSchema>;
