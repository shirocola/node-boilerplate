import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import gitCommitMiddleware from '../../src/middlewares/gitCommit';

jest.mock('fs');

describe('Git Commit Middleware', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(gitCommitMiddleware);
    app.get('/test', (req: Request, res: Response) => res.send('Git Commit test'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set X-Git-Commit-ID header when commit file exists', async () => {
    const commitId = 'abc123';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(commitId);

    await request(app)
      .get('/test')
      .expect(200)
      .expect('X-Git-Commit-ID', commitId);
  });

  it('should set X-Git-Commit-ID header to "unknown" when commit file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await request(app)
      .get('/test')
      .expect(200)
      .expect('X-Git-Commit-ID', 'unknown');
  });
});
