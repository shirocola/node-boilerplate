import express from 'express';
import request from 'supertest';
import corsMiddleware from '../../src/middlewares/core';

describe('CORS Middleware', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(corsMiddleware);
    app.get('/test', (req, res) => res.send('CORS test'));
  });

  it('should enable CORS for the specified origin', async () => {
    await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3000')
      .expect(200)
      .expect('Access-Control-Allow-Origin', 'http://localhost:3000');
  });

  it('should not enable CORS for other origins', async () => {
    await request(app)
      .get('/test')
      .set('Origin', 'http://example.com')
      .expect(200)
      .expect((res) => {
        if (res.headers['access-control-allow-origin']) {
          throw new Error('CORS header should not be set for disallowed origins');
        }
      });
  });

  it('should not enable CORS when origin is not provided', async () => {
    await request(app)
      .get('/test')
      .expect(200)
      .expect((res) => {
        if (res.headers['access-control-allow-origin']) {
          throw new Error('CORS header should not be set when origin is not provided');
        }
      });
  });
});
