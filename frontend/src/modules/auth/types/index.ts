export type Role = "ADMIN" | "STUDENT";

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  fullName: string;
  schoolId: number;
}

export interface SetupAdminInput {
  email: string;
  password: string;
  secret: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
