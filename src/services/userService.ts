import { AppDataSource } from '../database/config';
import { User } from '../entity/User';

export const userService = {
  getAllUsers: async () => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      console.log('Fetching users from database');
      const users = await userRepository.find();
      console.log('Fetched users:', users);
      return users;
    } catch (error) {
      console.error('Error in userService.getAllUsers:', error);
      throw error;
    }
  }
};
