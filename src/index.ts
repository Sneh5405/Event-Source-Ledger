import app from './app';
import { connectDatabase, disconnectDatabase } from './config/database';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to Database
    await connectDatabase();

    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    // Graceful Shutdown Handler
    const shutdown = async (signal: string) => {
      logger.info(`${signal} signal received. Starting graceful shutdown...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDatabase();
        logger.info('Graceful shutdown completed. Exiting.');
        process.exit(0);
      });

      // Force close if it takes too long
      setTimeout(() => {
        logger.error('Could not close database connections in time, forcefully shutting down.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    logger.fatal({ error }, 'Failed to start ledger core service.');
    process.exit(1);
  }
};

startServer();
