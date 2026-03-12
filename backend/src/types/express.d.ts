import { User, Student } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User & { student?: Student | null };
    }
  }
}
