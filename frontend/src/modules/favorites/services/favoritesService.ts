import { api } from "@/app/config/api/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { Favorite } from "../types";

const BASE = "/favorites";

export async function getFavorites(): Promise<Favorite[]> {
  const { data } = await api.get<ApiResponse<Favorite[]>>(BASE);
  return data.data;
}

export async function addFavorite(lessonId: number): Promise<Favorite> {
  const { data } = await api.post<ApiResponse<Favorite>>(BASE, { lessonId });
  return data.data;
}

export async function removeFavorite(lessonId: number): Promise<void> {
  await api.delete(`${BASE}/${lessonId}`);
}
