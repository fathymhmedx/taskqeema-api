import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

export const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  schoolId: z.coerce.number().int().positive("School is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export type SignupInput = z.infer<typeof signupSchema>;
