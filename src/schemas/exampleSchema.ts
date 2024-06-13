import { z } from 'zod';

export const exampleSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
});
