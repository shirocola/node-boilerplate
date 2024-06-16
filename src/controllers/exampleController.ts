import { Request, Response } from 'express';
import { ZodError } from 'zod';
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
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  }
};
