import { Request, Response } from 'express';
import { exampleController } from '../../src/controllers/exampleController';
import { exampleSchema } from '../../src/schemas/exampleSchema';

describe('Example Controller', () => {
  it('should return a 200 response with a message', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    exampleController.getExample(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'This is an example route' });
  });

  it('should validate example data successfully', () => {
    const req = {
      body: { name: 'John Doe', age: 30 }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    exampleController.validateExample(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Validation successful' });
  });

  it('should return a validation error for invalid data', () => {
    const req = {
      body: { name: 'John Doe', age: 17 }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    exampleController.validateExample(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        {
          code: 'too_small',
          minimum: 18,
          type: 'number',
          inclusive: true,
          exact: false,
          message: 'Number must be greater than or equal to 18',
          path: ['age']
        }
      ]
    });
  });

  it('should return an unknown error if the error is not an instance of Error', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(exampleSchema, 'parse').mockImplementation(() => {
      throw 'string error';
    });

    exampleController.validateExample(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' });

    jest.restoreAllMocks();
  });

  it('should handle forced errors', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const originalParse = exampleSchema.parse;

    jest.spyOn(exampleSchema, 'parse').mockImplementation(() => {
      throw new Error('Forced error for testing');
    });

    exampleController.validateExample(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forced error for testing' });

    // Restore the original method after the test
    exampleSchema.parse = originalParse;
  });
});
