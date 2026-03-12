import { api } from "@/app/config/api/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { School } from "../types";

const BASE = "/admin/schools";

export async function getSchools(): Promise<School[]> {
  const { data } = await api.get<ApiResponse<School[]>>(BASE);
  return data.data;
}

export async function getSchoolById(id: number): Promise<School> {
  const { data } = await api.get<ApiResponse<School>>(`${BASE}/${id}`);
  return data.data;
}

export async function createSchool(body: { name: string; phone: string; logo?: string | null }): Promise<School> {
  const { data } = await api.post<ApiResponse<School>>(BASE, body);
  return data.data;
}

export async function updateSchool(
  id: number,
  body: { name?: string; phone?: string; logo?: string | null }
): Promise<School> {
  const { data } = await api.patch<ApiResponse<School>>(`${BASE}/${id}`, body);
  return data.data;
}

export async function deleteSchool(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
