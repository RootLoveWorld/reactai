import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Gateway (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('/api/health (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toContain('healthy');
        });
    });
  });

  describe('Authentication', () => {
    let accessToken: string;
    const testUser = {
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
    };

    it('/api/auth/register (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.user.email).toBe(testUser.email);
          expect(res.body.data.accessToken).toBeDefined();
          accessToken = res.body.data.accessToken;
        });
    });

    it('/api/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.accessToken).toBeDefined();
        });
    });

    it('/api/auth/profile (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.email).toBe(testUser.email);
        });
    });

    it('/api/auth/logout (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });
  });

  describe('Users', () => {
    let accessToken: string;

    beforeAll(async () => {
      // Login to get access token
      const loginRes = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      
      accessToken = loginRes.body.data.accessToken;
    });

    it('/api/users/profile (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toBeDefined();
        });
    });

    it('/api/users/profile (PUT)', () => {
      return request(app.getHttpServer())
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          firstName: 'Updated',
          lastName: 'Name',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.firstName).toBe('Updated');
        });
    });

    it('/api/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toBeInstanceOf(Array);
          expect(res.body.meta).toBeDefined();
        });
    });
  });

  describe('Chat', () => {
    let accessToken: string;
    let roomId: string;

    beforeAll(async () => {
      // Login to get access token
      const loginRes = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      
      accessToken = loginRes.body.data.accessToken;
    });

    it('/api/chat/rooms (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/chat/rooms')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Test Room',
          description: 'A test chat room',
          isPrivate: false,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.name).toBe('Test Room');
          roomId = res.body.data.id;
        });
    });

    it('/api/chat/rooms (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/chat/rooms')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toBeInstanceOf(Array);
        });
    });

    it('/api/chat/messages (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/chat/messages')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          content: 'Hello, world!',
          chatRoomId: roomId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.content).toBe('Hello, world!');
        });
    });

    it('/api/chat/rooms/:roomId/messages (GET)', () => {
      return request(app.getHttpServer())
        .get(`/api/chat/rooms/${roomId}/messages`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toBeInstanceOf(Array);
        });
    });
  });

  describe('Error Handling', () => {
    it('should return 401 for unauthorized requests', () => {
      return request(app.getHttpServer())
        .get('/api/users/profile')
        .expect(401);
    });

    it('should return 404 for non-existent routes', () => {
      return request(app.getHttpServer())
        .get('/api/non-existent')
        .expect(404);
    });

    it('should return 400 for invalid request body', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: '123', // Too short
        })
        .expect(400);
    });
  });
});