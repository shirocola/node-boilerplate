import { userService } from '../../src/services/userService';
import { AppDataSource } from '../../src/database/config';
import { User } from '../../src/entity/User';

// Mock the AppDataSource and its repository methods
jest.mock('../../src/database/config', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn(),
    }),
  },
}));

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const mockUsers = [
      { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
      { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    ];

    const findMock = AppDataSource.getRepository(User).find as jest.MockedFunction<any>;

    findMock.mockResolvedValue(mockUsers);

    const users = await userService.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  it('should handle errors', async () => {
    const findMock = AppDataSource.getRepository(User).find as jest.MockedFunction<any>;

    findMock.mockRejectedValue(new Error('Failed to fetch users'));

    await expect(userService.getAllUsers()).rejects.toThrow('Failed to fetch users');
  });
});
