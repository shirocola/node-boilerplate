import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../entity/User';
import dotenv from 'dotenv';
import logger from '../../utils/logger';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Change to false in production
  logging: false,
  entities: [User],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection error:', error);
  }
};

export default connectDb;
