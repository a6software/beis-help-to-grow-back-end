import { agent as request } from 'supertest';
import { Knex } from 'knex';
import { Express } from 'express';
import initApp from '../../../../src/app';
import {
  emailIsNotValidError,
  emailIsRequiredError,
} from '../../../helpers/validation-error-messages/email';
import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import connection from '../../../../src/lib/database/connection';

const BASE_PATH = '/create-account/validate-email-address';

describe('controllers/create-account/validate-email-address', () => {
  let db: Knex;
  let app: Express;

  beforeAll(async () => {
    db = connection();
    await db.migrate.latest();
    await db.seed.run();

    app = initApp(db);
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('post', () => {
    describe('unhappy paths', () => {
      it('should fail if all required parameters are missing', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [emailIsRequiredError],
        });
      });

      it('should require a valid looking email address', async () => {
        const givenEmail = 'some bad value';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            email: givenEmail,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [emailIsNotValidError(givenEmail)],
        });
      });
    });

    describe('happy path', () => {
      it('should return a success response when given valid information', async () => {
        const email = 'a.new.user@example.com';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            email,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({ success: true, data: { email } });
      });
    });
  });
});
