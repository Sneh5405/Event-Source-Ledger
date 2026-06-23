import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../errors/custom-errors';

export interface RequestValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  headers?: AnyZodObject;
}

export const validateRequest = (schemas: RequestValidationSchema) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      if (schemas.headers) {
        // We do a partial parse because headers have standard fields we don't always define
        const parsed = await schemas.headers.safeParseAsync(req.headers);
        if (parsed.success) {
          req.headers = { ...req.headers, ...parsed.data };
        } else {
          throw parsed.error;
        }
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Find the first error or list them all
        const firstError = error.errors[0];
        const message = `${firstError.path.join('.')}: ${firstError.message}`;
        
        // Pass a BadRequestError to the centralized error handler
        const badRequest = new BadRequestError(message, firstError.path.join('.'));
        next(badRequest);
      } else {
        next(error);
      }
    }
  };
};
