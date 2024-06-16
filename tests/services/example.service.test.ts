import { exampleService } from '../../src/services/exampleService';
import { exampleSchema } from '../../src/schemas/exampleSchema';
import { ZodError } from 'zod';

jest.mock('../../src/schemas/exampleSchema', () => ({
  exampleSchema: {
    parse: jest.fn(),
  },
}));

describe('exampleService', () => {
  describe('getExampleMessage', () => {
    it('should return the correct message', () => {
      const message = exampleService.getExampleMessage();
      expect(message).toBe('This is an example route');
    });
  });

  describe('validateExample', () => {
    it('should call exampleSchema.parse with the provided data', () => {
      const data = { key: 'value' };
      exampleService.validateExample(data);
      expect(exampleSchema.parse).toHaveBeenCalledWith(data);
    });

    it('should throw a ZodError when validation fails', () => {
      const invalidData = { key: 123 };
      (exampleSchema.parse as jest.Mock).mockImplementationOnce(() => {
        throw new ZodError([]);
      });

      expect(() => exampleService.validateExample(invalidData)).toThrow(ZodError);
    });
  });
});
