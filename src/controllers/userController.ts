import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log('Controller getUsers called');
    const users = await userService.getAllUsers();
    console.log('Users retrieved:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
