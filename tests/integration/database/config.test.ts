import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../src/database/config';
import { User } from '../../../src/entity/User';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection', () => {
  it('should establish a database connection', async () => {
    await expect(AppDataSource.initialize()).resolves.not.toThrow();
    await AppDataSource.destroy();
  });

  it('should fail to connect with incorrect configuration', async () => {
    const originalHost = process.env.DB_HOST;
    process.env.DB_HOST = 'invalid_host';

    const badDataSource = new DataSource({
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

    await expect(badDataSource.initialize()).rejects.toThrow();

    // Restore original configuration
    process.env.DB_HOST = originalHost;
  });
});
