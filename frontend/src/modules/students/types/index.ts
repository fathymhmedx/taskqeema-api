export interface Student {
  id: number;
  email: string;
  name: string;
  grade?: string | null;
  schoolId?: number;
  createdAt: string;
  updatedAt?: string;
}

/** Current student profile (from GET /student/profile) */
export interface StudentProfile {
  id: number;
  email: string;
  name: string;
  grade?: string | null;
  schoolId?: number;
  schoolName?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateStudentInput {
  email: string;
  password: string;
  name: string;
  grade?: string;
  schoolId: number;
}

export interface UpdateStudentInput {
  email?: string;
  password?: string;
  name?: string;
  grade?: string;
  schoolId?: number;
}

export interface ListStudentsQuery {
  page?: number;
  limit?: number;
  search?: string;
}
