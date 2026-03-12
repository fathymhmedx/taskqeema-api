import { Role } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { UserRecord } from "./types/user-record.types";

export async function findUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  return await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function createUser(
  email: string,
  passwordHash: string,
  role: Role,
): Promise<UserRecord> {
  return await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      role,
    },
  });
}
