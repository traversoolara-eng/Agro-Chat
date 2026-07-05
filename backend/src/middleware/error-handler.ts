import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';

export interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';

  logger.error(`${status} - ${message}`);

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
