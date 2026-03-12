import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number is required"),
  logo: z.string().url().optional().nullable(),
});

export type CreateSchoolDto = z.infer<typeof createSchoolSchema>;
