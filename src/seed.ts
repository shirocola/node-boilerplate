import 'reflect-metadata';
import { AppDataSource } from './database/config';
import { seedUsers } from './seeders/UserSeeder';
import logger from './utils/logger';

const seed = async () => {
  await AppDataSource.initialize();

  // Call individual seeders
  await seedUsers(AppDataSource);

  logger.info('Seeding completed');
  await AppDataSource.destroy();
};

seed().catch((error) => logger.error('Error seeding data:', error));
