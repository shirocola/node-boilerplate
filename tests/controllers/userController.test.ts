import { Request, Response } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../../src/controllers/userController';
import { userService } from '../../src/services/userService';
import logger from '../../src/utils/logger';

jest.mock('../../src/services/userService', () => ({
  userService: {
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

jest.mock('../../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('User Controller - getUsers', () => {
  it('should return a list of users and log messages', async () => {
    const mockUsers = [
      { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
      { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    ];
    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUsers(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller getUsers called');
    expect(logger.info).toHaveBeenCalledWith('Users retrieved:', mockUsers);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should handle errors and log messages when fetching users fails', async () => {
    const errorMessage = 'Failed to fetch users';
    (userService.getAllUsers as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUsers(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error fetching users:', new Error(errorMessage));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch users' });
  });
});

describe('User Controller - createUser', () => {
  it('should create a new user and return it', async () => {
    const mockUser = { id: 3, username: 'newuser', email: 'newuser@example.com', password: 'password3' };
    (userService.createUser as jest.Mock).mockResolvedValue(mockUser);

    const req = { body: { username: 'newuser', email: 'newuser@example.com', password: 'password3' } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller createUser called');
    expect(logger.info).toHaveBeenCalledWith('User created:', mockUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should handle errors when creating a user fails', async () => {
    (userService.createUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to create user'));

    const req = { body: { username: 'newuser', email: 'newuser@example.com', password: 'password3' } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error creating user:', new Error('Failed to create user'));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create user' });
  });
});

describe('User Controller - getUserById', () => {
  it('should return a user by ID', async () => {
    const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' };
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUserById(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller getUserById called');
    expect(logger.info).toHaveBeenCalledWith('User retrieved:', mockUser);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user not found', async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUserById(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller getUserById called');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle errors when fetching a user fails', async () => {
    (userService.getUserById as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch user'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUserById(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error fetching user:', new Error('Failed to fetch user'));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch user' });
  });
});

describe('User Controller - updateUser', () => {
  it('should update a user by ID', async () => {
    const mockUser = { id: 1, username: 'updateduser', email: 'updateduser@example.com', password: 'password1' };
    (userService.updateUser as jest.Mock).mockResolvedValue(mockUser);

    const req = { params: { id: '1' }, body: { username: 'updateduser' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateUser(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller updateUser called');
    expect(logger.info).toHaveBeenCalledWith('User updated:', mockUser);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user not found', async () => {
    (userService.updateUser as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: '1' }, body: { username: 'updateduser' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateUser(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller updateUser called');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle errors when updating a user fails', async () => {
    (userService.updateUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to update user'));

    const req = { params: { id: '1' }, body: { username: 'updateduser' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateUser(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error updating user:', new Error('Failed to update user'));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update user' });
  });
});

describe('User Controller - deleteUser', () => {
  it('should delete a user by ID', async () => {
    (userService.deleteUser as jest.Mock).mockResolvedValue(true);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller deleteUser called');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  it('should return 404 if user not found', async () => {
    (userService.deleteUser as jest.Mock).mockResolvedValue(false);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res);

    expect(logger.info).toHaveBeenCalledWith('Controller deleteUser called');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle errors when deleting a user fails', async () => {
    (userService.deleteUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete user'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteUser(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error deleting user:', new Error('Failed to delete user'));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete user' });
  });
});
