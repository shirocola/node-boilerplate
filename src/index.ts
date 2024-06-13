import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { initDb } from './database/config';
import setupSwagger from './swagger';
import { Server } from 'http';
import sequelize from './database/config';  // Use the default export for sequelize instance

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and log configuration
initDb().then(() => {
  // eslint-disable-next-line no-console
  console.log('Database initialized');

  // Routes
  app.use('/api', routes);

  // Health check route
  app.get('/health', (req, res) => {
    // eslint-disable-next-line no-console
    console.log('Health check route hit');
    res.status(200).json({ status: 'UP' });
  });

  setupSwagger(app);

  let server: Server;

  if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${port}`);
    });
  }

  // Graceful shutdown
  const shutdown = async () => {
    // eslint-disable-next-line no-console
    console.log('Received shutdown signal, shutting down gracefully...');
    if (server) {
      server.close(async (err?: Error) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('Error closing the server:', err);
          process.exit(1);
        }

        // Close database connection
        try {
          await sequelize.close();
          // eslint-disable-next-line no-console
          console.log('Database connection closed');
          process.exit(0);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error closing the database connection:', error);
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
