import { Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { User } from '../entity/User';

export const getUsers = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.status(200).json(users);
};
