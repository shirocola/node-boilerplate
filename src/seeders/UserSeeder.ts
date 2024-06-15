import { DataSource } from 'typeorm';
import { User } from '../../entity/User';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    },
  ];

  await userRepository.clear(); // Clear existing data and reset ID sequence
  await dataSource.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);

  for (const user of users) {
    const newUser = userRepository.create(user);
    await userRepository.save(newUser);
  }

  console.log('Seeded users');
};
