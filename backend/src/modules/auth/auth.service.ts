import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "./auth.repository";
import { Role } from "@prisma/client";
import { ApiError } from "../../shared/errors/api-error";
import { generateTokens } from "../../shared/utils/token";
import { LoginResult } from "./types/login.types";
import { prisma } from "../../shared/prisma";


export const setupAdmin = async (
  email: string,
  password: string,
  secret: string,
) => {
  if (secret !== process.env.ADMIN_SECRET_KEY) {
    throw new ApiError("Invalid secret", 403);
  }

  const existing = await findUserByEmail(email);
  if (existing) throw new ApiError("Email already exists", 400);

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await createUser(email, passwordHash, Role.ADMIN);

  const { accessToken, refreshToken } = generateTokens({
    userId: admin.id,
    role: admin.role,
  });

  return {
    accessToken,
    refreshToken,
    user: { id: admin.id, email: admin.email, role: admin.role },
  };
};

export const signup = async (
  email: string,
  password: string,
  fullName: string,
  schoolId: number,
): Promise<LoginResult> => {
  const existing = await findUserByEmail(email);
  if (existing) throw new ApiError("email already exists", 400);

  const school = await prisma.school.findUnique({ where: { id: schoolId } });
  if (!school) throw new ApiError("School not found", 404);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash, Role.STUDENT);

  await prisma.student.create({
    data: {
      userId: user.id,
      name: fullName,
      schoolId,
      grade: "N/A",
    },
  });

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
    role: user.role,
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, role: user.role },
  };
};


export const login = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError("Invalid email or password", 401);

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new ApiError("Invalid email or password", 401);

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
    role: user.role,
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, role: user.role },
  };
};


export const logout = () => {
  return { success: true, data: { message: "Logged out successfully" } };
};
