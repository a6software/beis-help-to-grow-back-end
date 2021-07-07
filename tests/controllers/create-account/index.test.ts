import { agent as request } from 'supertest';
import app from '../../../src/app';
import connection from '../../../src/lib/database/connection';

const BASE_PATH = '/create-account';
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

describe('controllers/create-account', () => {
  beforeAll(async () => {
    const db = connection();
    await db.migrate.latest();
    await db.seed.run();
  });

  describe('post', () => {
    describe('unhappy paths', () => {
      it('should fail if all required parameters are missing', async () => {
        await request(app).post(BASE_PATH).expect('Content-Type', CONTENT_TYPE_JSON).expect(400);
      });

      xdescribe('email', () => {
        it('should require a valid looking email address', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({ email: 'some bad value', password: '123-abc' })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual('no');
        });

        it('should require a unique email address', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({ email: 'first.last@example.com', password: '123-abc' })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual('no');
        });
      });

      xdescribe('password', () => {
        [{ password: undefined }, { password: null }, { password: '' }];
        it('cannot be empty', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({ email: 'first.last@example.com', password: '123-abc' })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual('passwot?');
        });

        it('should not be too long', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({ email: 'first.last@example.com', password: 'a'.repeat(200) })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual('passwot?');
        });
      });
    });

    describe('happy path', () => {
      it('should create a user when given valid information', async () => {
        const email = 'a.new.user@example.com';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            email,
            password: 'w^gAbCT6 A Very Strong Password N$dS5ROVxyx4N*',
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({ email });
      });
    });
  });
});
