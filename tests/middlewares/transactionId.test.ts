import express, { Request, Response} from 'express';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { transactionId } from '../../src/middlewares/transactionId';
import logger from '../../src/utils/logger';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('Transaction ID Middleware', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(transactionId);
    app.get('/test', (req: Request, res: Response) => res.send('Transaction ID test'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set x-transaction-id header in both request and response', async () => {
    const mockTransactionId = 'mock-transaction-id';
    (uuidv4 as jest.Mock).mockReturnValue(mockTransactionId);

    await request(app)
      .get('/test')
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBe(mockTransactionId);
      });
  });

  it('should log the transaction ID', async () => {
    const mockTransactionId = 'mock-transaction-id';
    (uuidv4 as jest.Mock).mockReturnValue(mockTransactionId);
    const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();

    await request(app).get('/test');

    expect(consoleSpy).toHaveBeenCalledWith(`Transaction ID: ${mockTransactionId}`);
    consoleSpy.mockRestore();
  });
});
