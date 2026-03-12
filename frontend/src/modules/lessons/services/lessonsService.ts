import { api } from "@/app/config/api/axios";
import type { ApiResponse, PaginationMeta } from "@/shared/types/api.types";
import type { Lesson, CreateLessonInput, UpdateLessonInput, ListLessonsQuery } from "../types";

const BASE = "/lessons";

export async function getLessons(
  params?: ListLessonsQuery
): Promise<{ data: Lesson[]; meta: PaginationMeta }> {
  const { data } = await api.get<ApiResponse<Lesson[]>>(BASE, { params });
  return {
    data: data.data,
    meta: data.meta ?? { total: 0, page: 1, limit: 10 },
  };
}

export async function getLessonById(id: number): Promise<Lesson> {
  const { data } = await api.get<ApiResponse<Lesson>>(`${BASE}/${id}`);
  return data.data;
}

export async function searchLessons(
  name: string,
  page = 1,
  limit = 10
): Promise<{ data: Lesson[]; meta: PaginationMeta }> {
  const { data } = await api.get<ApiResponse<Lesson[]>>(`${BASE}/search`, {
    params: { name, page, limit },
  });
  return {
    data: data.data,
    meta: data.meta ?? { total: 0, page, limit },
  };
}

export async function createLesson(body: CreateLessonInput): Promise<Lesson> {
  const { data } = await api.post<ApiResponse<Lesson>>(BASE, body);
  return data.data;
}

export async function updateLesson(id: number, body: UpdateLessonInput): Promise<Lesson> {
  const { data } = await api.patch<ApiResponse<Lesson>>(`${BASE}/${id}`, body);
  return data.data;
}

export async function deleteLesson(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
