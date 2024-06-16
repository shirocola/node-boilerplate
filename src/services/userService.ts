import { AppDataSource } from '../database/config';
import { User } from '../entity/User';
import logger from '../utils/logger'; // Import your logger

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    logger.info('Fetching users from database');
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    logger.info('Fetched users:', users);
    return users;
  },

  createUser: async (data: Partial<User>): Promise<User> => {
    logger.info('Creating user in database');
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(data);
    await userRepository.save(user);
    logger.info('User created:', user);
    return user;
  },

  getUserById: async (id: number): Promise<User | null> => {
    logger.info('Fetching user by ID from database');
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    logger.info('Fetched user:', user);
    return user;
  },

  updateUser: async (id: number, data: Partial<User>): Promise<User | null> => {
    logger.info('Updating user in database');
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (user) {
      Object.assign(user, data);
      await userRepository.save(user);
      logger.info('User updated:', user);
      return user;
    }
    return null;
  },

  deleteUser: async (id: number): Promise<boolean> => {
    logger.info('Deleting user from database');
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    const success = !!(result.affected && result.affected > 0); // Ensure result.affected is not null or undefined
    logger.info('User deleted:', success);
    return success;
  },
};
