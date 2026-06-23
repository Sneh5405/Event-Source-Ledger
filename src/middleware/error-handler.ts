import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-errors';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof CustomError) {
    logger.warn({
      method: req.method,
      path: req.path,
      statusCode: err.statusCode,
      errors: err.serializeErrors(),
    }, err.message);

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: { errors: err.serializeErrors() },
      meta: {},
    });
    return;
  }

  // Fallback for unhandled/internal errors
  logger.error({
    method: req.method,
    path: req.path,
    error: {
      message: err.message,
      stack: err.stack,
    },
  }, 'Unhandled exception occurred');

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: process.env.NODE_ENV === 'development' ? { stack: err.stack } : null,
    meta: {},
  });
};
