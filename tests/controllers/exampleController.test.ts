import { Request, Response } from 'express';
import sinon from 'sinon';
import { exampleController } from '../../src/controllers/exampleController';
import { StubbedResponse } from '../../types/sinon-express';

describe('Example Controller', () => {
  let req: Partial<Request>;
  let res: StubbedResponse;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as unknown as StubbedResponse;
  });

  it('should return a 200 response with a message', () => {
    exampleController.getExample(req as Request, res as unknown as Response);

    expect(res.status.calledWith(200)).toBe(true);
    expect(res.json.calledWith({ message: 'This is an example route' })).toBe(true);
  });
});
