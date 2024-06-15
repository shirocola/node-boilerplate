import 'reflect-metadata';
import { AppDataSource } from './database/config';
import { seedUsers } from './seeders/UserSeeder';

const seed = async () => {
  await AppDataSource.initialize();

  // Call individual seeders
  await seedUsers(AppDataSource);

  console.log('Seeding completed');
  await AppDataSource.destroy();
};

seed().catch((error) => console.error('Error seeding data:', error));
