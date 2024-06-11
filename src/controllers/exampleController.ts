import { Request, Response } from 'express';

export const exampleController = {
  getExample: (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is an example route' });
  },
};
