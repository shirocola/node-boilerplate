import { DataSource } from 'typeorm';
import { User } from './entity/User';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;
