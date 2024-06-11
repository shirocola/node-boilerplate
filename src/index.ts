import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { initDb } from './database/config';
import setupSwagger from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and log configuration
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sequelize = initDb();

// Routes
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

setupSwagger(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
