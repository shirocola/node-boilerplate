import { Request, Response } from 'express';
import { exampleSchema } from '../schemas/exampleSchema';

export const exampleController = {
  getExample: (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is an example route' });
  },

  validateExample: (req: Request, res: Response) => {
    try {
      exampleSchema.parse(req.body);
      res.status(200).json({ message: 'Validation successful' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  }
};
