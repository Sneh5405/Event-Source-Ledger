import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug({ query: e.query, params: e.params, duration: `${e.duration}ms` }, 'Prisma Query');
});

prisma.$on('info', (e) => {
  logger.info(e.message);
});

prisma.$on('warn', (e) => {
  logger.warn(e.message);
});

prisma.$on('error', (e) => {
  logger.error(e.message);
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to PostgreSQL database via Prisma.');
  } catch (error) {
    logger.error({ error }, 'Failed to connect to PostgreSQL database.');
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
  logger.info('Disconnected from PostgreSQL database.');
};
