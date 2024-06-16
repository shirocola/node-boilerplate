import { Request, Response } from 'express';
import { userService } from '../services/userService';
import logger from '../utils/logger';

export const getUsers = async (req: Request, res: Response) => {
  try {
    logger.info('Controller getUsers called');
    const users = await userService.getAllUsers();
    logger.info('Users retrieved:', users);
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    logger.info('Controller createUser called');
    const user = await userService.createUser(req.body);
    logger.info('User created:', user);
    res.status(201).json(user);
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    logger.info('Controller getUserById called');
    const user = await userService.getUserById(Number(req.params.id));
    if (user) {
      logger.info('User retrieved:', user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    logger.info('Controller updateUser called');
    const user = await userService.updateUser(Number(req.params.id), req.body);
    if (user) {
      logger.info('User updated:', user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    logger.info('Controller deleteUser called');
    const success = await userService.deleteUser(Number(req.params.id));
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
