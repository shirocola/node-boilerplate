import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import setupSwagger from './swagger';
import { Server } from 'http';
import { connectDb, AppDataSource } from './database/config';
import { transactionId } from './middlewares/transactionId';
import gitCommitMiddleware from './middlewares/gitCommit';
import logger from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(transactionId);
app.use(gitCommitMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and log configuration
connectDb().then(() => {
  logger.info('Database initialized');

  // Routes
  app.use('/api', routes);

  // Health check route
  app.get('/health', (req, res) => {
    logger.info('Health check route hit');
    res.status(200).json({ status: 'UP' });
  });

  setupSwagger(app);

  let server: Server;

  if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Received shutdown signal, shutting down gracefully...');
    if (server) {
      server.close(async (err?: Error) => {
        if (err) {
          logger.error('Error closing the server:', err);
          process.exit(1);
        }

        // Close database connection
        try {
          await AppDataSource.destroy();
          logger.info('Database connection closed');
          process.exit(0);
        } catch (error) {
          logger.error('Error closing the database connection:', error);
          process.exit(1);
        }
      });
    }
  };

  // Handle termination signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
});

export default app;
