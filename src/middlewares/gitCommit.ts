import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const commitFilePath = path.resolve(__dirname, '../../.git/refs/heads/main'); // Adjust the path as needed

const gitCommitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let commitId = 'unknown';

  if (fs.existsSync(commitFilePath)) {
    commitId = fs.readFileSync(commitFilePath, 'utf-8').trim();
  }

  res.setHeader('X-Git-Commit-ID', commitId);
  next();
};

export default gitCommitMiddleware;
