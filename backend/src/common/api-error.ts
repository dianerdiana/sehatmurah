export type ApiErrorItem = {
  field?: string;
  message: string;
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: ApiErrorItem[];

  constructor(
    statusCode: number,
    message: string,
    options: { code?: string; details?: ApiErrorItem[] } = {},
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = options.code;
    this.details = options.details;
  }
}
