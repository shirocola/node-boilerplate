import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../entity/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default connectDb;
