import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../../src/database/config';
import userRoutes from '../../src/routes/user';
import { User } from '../../src/entity/User';
import { DataSource } from 'typeorm';

let app: express.Express;
let dataSource: DataSource;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use('/users', userRoutes);

  dataSource = await AppDataSource.initialize();

  // Create test data
  const userRepository = dataSource.getRepository(User);
  const users = [
    { username: 'user1', email: 'user1@example.com', password: 'password1', role: 'admin' },
    { username: 'user2', email: 'user2@example.com', password: 'password2', role: 'user' },
    { username: 'user3', email: 'user3@example.com', password: 'password3', role: 'user' },
  ];
  await userRepository.save(users);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('User Routes Integration Tests', () => {
  let userId: number;

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    userId = response.body.id;
    expect(userId).toBeDefined();
  });

  it('should get a user by ID', async () => {
    const response = await request(app).get(`/users/${userId}`).expect(200);
    expect(response.body).toMatchObject({
      id: userId,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
  });

  it('should update a user by ID', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({
        username: 'updateduser',
      })
      .expect(200);

    expect(response.body).toMatchObject({
      id: userId,
      username: 'updateduser',
    });
  });

  it('should delete a user by ID', async () => {
    await request(app).delete(`/users/${userId}`).expect(204);
  });
});
