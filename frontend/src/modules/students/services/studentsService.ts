import { api } from "@/app/config/api/axios";
import type { ApiResponse, PaginationMeta } from "@/shared/types/api.types";
import type {
  Student,
  StudentProfile,
  CreateStudentInput,
  UpdateStudentInput,
  ListStudentsQuery,
} from "../types";

const BASE = "/admin/students";

export async function getStudents(
  params?: ListStudentsQuery
): Promise<{ data: Student[]; meta: PaginationMeta }> {
  const { data } = await api.get<ApiResponse<Student[]>>(BASE, { params });
  return {
    data: data.data,
    meta: data.meta ?? { total: 0, page: 1, limit: 10 },
  };
}

export async function getStudentById(id: number): Promise<Student> {
  const { data } = await api.get<ApiResponse<Student>>(`${BASE}/${id}`);
  return data.data;
}

export async function createStudent(body: CreateStudentInput): Promise<Student> {
  const { data } = await api.post<ApiResponse<Student>>(BASE, body);
  return data.data;
}

export async function updateStudent(id: number, body: UpdateStudentInput): Promise<Student> {
  const { data } = await api.patch<ApiResponse<Student>>(`${BASE}/${id}`, body);
  return data.data;
}

export async function deleteStudent(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}

/** Get current logged-in student profile (student portal only) — uses GET /admin/students/profile */
export async function getCurrentStudentProfile(): Promise<StudentProfile> {
  const { data } = await api.get<ApiResponse<StudentProfile>>(`${BASE}/profile`);
  return data.data;
}
