import { api } from "@/app/config/api/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { AuthResponse, LoginInput, SignupInput, SetupAdminInput } from "../types";

const AUTH_BASE = "/auth";

export async function login(input: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post<ApiResponse<AuthResponse>>(`${AUTH_BASE}/login`, input);
  return data.data;
}

export async function signup(input: SignupInput): Promise<AuthResponse> {
  const { data } = await api.post<ApiResponse<AuthResponse>>(`${AUTH_BASE}/signup`, input);
  return data.data;
}

export async function setupAdmin(input: SetupAdminInput): Promise<AuthResponse> {
  const { data } = await api.post<ApiResponse<AuthResponse>>(`${AUTH_BASE}/setup-admin`, input);
  return data.data;
}

export async function logout(): Promise<void> {
  await api.post<ApiResponse<{ message: string }>>(`${AUTH_BASE}/logout`);
}
