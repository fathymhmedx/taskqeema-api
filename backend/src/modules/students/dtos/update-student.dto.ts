import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

export const updateStudentSchema = z.object({
  email: z.string().email("Invalid email").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .optional(),
  name: z.string().min(1, "Name is required").optional(),
  grade: z.string().optional(),
  schoolId: z.coerce.number().int().positive().optional(),
});

export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
