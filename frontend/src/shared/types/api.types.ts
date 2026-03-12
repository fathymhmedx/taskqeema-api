export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
  meta?: {
    fields?: Array<{ field: string; code: string; meta?: { message?: string } }>;
    field?: string;
  };
  stack?: string;
}

export class ApiError extends Error {
  statusCode: number;
  code?: string;
  meta?: ApiErrorResponse["meta"];
  constructor(
    message: string,
    statusCode: number,
    code?: string,
    meta?: ApiErrorResponse["meta"]
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.meta = meta;
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
