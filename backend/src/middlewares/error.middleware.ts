import { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if ((err as { code?: number }).code === 11000) {
    res.status(409).json({ message: 'Duplicate resource' });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({ message });
};
