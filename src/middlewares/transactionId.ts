import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const transactionId = (req: Request, res: Response, next: NextFunction) => {
  const transactionId = uuidv4();
  req.headers['x-transaction-id'] = transactionId;
  res.setHeader('x-transaction-id', transactionId);
  next();
};
