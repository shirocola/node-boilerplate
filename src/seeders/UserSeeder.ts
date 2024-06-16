import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import logger from '../utils/logger';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      role: 'admin',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      password: 'password3',
    }
  ];

  await userRepository.clear(); // Clear existing data and reset ID sequence
  await dataSource.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);

  for (const user of users) {
    const newUser = userRepository.create(user);
    await userRepository.save(newUser);
  }

  logger.info('Seeded users');
};
