import { Request, Response } from 'express';
import { getUsers } from '../../src/controllers/userController';
import { AppDataSource } from '../../src/database/config';
import { User } from '../../src/entity/User';

jest.mock('../../src/database/config', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue([
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
      ]),
    }),
  },
}));

describe('User Controller', () => {
  it('should return a list of users', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
      { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    ]);
  });
});
