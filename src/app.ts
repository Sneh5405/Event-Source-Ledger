import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/custom-errors';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Ledger core service is healthy.',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    meta: {},
  });
});

// Fallback for unmatched routes
app.use('*', (_req: Request, _res: Response, next) => {
  next(new NotFoundError('The requested endpoint was not found.'));
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
