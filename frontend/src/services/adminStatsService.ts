import { api } from "@/app/config/api/axios";
import type { ApiResponse } from "@/shared/types/api.types";

const BASE = "/admin/stats";

export interface AdminStats {
  favoritesCount: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const { data } = await api.get<ApiResponse<AdminStats>>(BASE);
  return data.data;
}
