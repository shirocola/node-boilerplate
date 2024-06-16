import { exampleSchema } from '../schemas/exampleSchema';

export const exampleService = {
  getExampleMessage: () => {
    return 'This is an example route';
  },

  validateExample: (data: unknown) => {
    exampleSchema.parse(data);
  }
};
