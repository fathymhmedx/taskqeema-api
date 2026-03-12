export interface ValidationField {
  field: string;
  code: string;
  meta?: Record<string, unknown>;
}

export interface ValidationMeta {
  fields?: ValidationField[];
  [key: string]: unknown;
}

export class ApiError extends Error {
  public statusCode: number;
  public status: "fail" | "error";
  public meta?: ValidationMeta;

  constructor(message: string, statusCode: number, meta?: ValidationMeta) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    this.meta = meta;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
