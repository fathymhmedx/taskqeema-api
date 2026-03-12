import { z } from "zod";

export const updateSchoolSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  logo: z.string().url().optional().nullable().or(z.literal("")),
});

export type UpdateSchoolFormValues = z.infer<typeof updateSchoolSchema>;
