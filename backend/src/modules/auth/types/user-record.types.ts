import { Role } from "@prisma/client";

export interface UserRecord {
  id: number;
  email: string;
  passwordHash: string;
  role: Role;
}   