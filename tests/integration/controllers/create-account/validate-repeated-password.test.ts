import { agent as request } from 'supertest';
import { Knex } from 'knex';
import { Express } from 'express';
import initApp from '../../../../src/app';

import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import {
  passwordDoesNotMatchExpectedPatternError,
  passwordIsRequiredError,
  repeatedPasswordIsRequiredError,
  repeatedPasswordMustBeRefPasswordError,
} from '../../../helpers/validation-error-messages/password';
import connection from '../../../../src/lib/database/connection';

const BASE_PATH = '/create-account/validate-repeated-password';

const GOOD_PASSWORD = '97zXDLfUZ9L12Rq4Myjckt9TfJ0L7x';

describe('controllers/create-account/validate-repeated-password', () => {
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
          data: [passwordIsRequiredError, repeatedPasswordIsRequiredError],
        });
      });

      it('should require the password field', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            repeatedPassword: GOOD_PASSWORD,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [passwordIsRequiredError, repeatedPasswordMustBeRefPasswordError(GOOD_PASSWORD)],
        });
      });

      it('should require the repeated password field', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: GOOD_PASSWORD,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [repeatedPasswordIsRequiredError],
        });
      });

      it('should require both fields to match', async () => {
        const badMatchPassword = 'something that does not match';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: GOOD_PASSWORD,
            repeatedPassword: badMatchPassword,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [repeatedPasswordMustBeRefPasswordError(badMatchPassword)],
        });
      });

      it('should require a minimum password length', async () => {
        const badPassword = '1a2b';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: badPassword,
            repeatedPassword: badPassword,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [passwordDoesNotMatchExpectedPatternError(badPassword)],
        });
      });

      it('should enforce a maximum password length', async () => {
        const badPassword = '1a2b!'.repeat(50);

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: badPassword,
            repeatedPassword: badPassword,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [passwordDoesNotMatchExpectedPatternError(badPassword)],
        });
      });

      it('should require a match of the password rules', async () => {
        const badPassword = '123abc!!';

        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: badPassword,
            repeatedPassword: badPassword,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [passwordDoesNotMatchExpectedPatternError(badPassword)],
        });
      });
    });

    describe('happy path', () => {
      it('should return a success response when given valid information', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            password: GOOD_PASSWORD,
            repeatedPassword: GOOD_PASSWORD,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({ success: true });
      });
    });
  });
});
