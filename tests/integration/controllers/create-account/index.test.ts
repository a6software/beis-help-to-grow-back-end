import { agent as request } from 'supertest';
import { Knex } from 'knex';
import app from '../../../../src/app';
import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import {
  passwordCannotBeEmptyError,
  passwordDoesNotMatchExpectedPatternError,
  passwordIsRequiredError,
  repeatedPasswordIsRequiredError,
} from '../../../helpers/validation-error-messages/password';
import { errorCreatingUserAccount } from '../../../helpers/validation-error-messages/user-account';
import {
  emailIsNotValidError,
  emailIsRequiredError,
} from '../../../helpers/validation-error-messages/email';
import connection from '../../../../src/lib/database/connection';

const BASE_PATH = '/create-account';

const GOOD_PASSWORD = '97zXDLfUZ9L12Rq4Myjckt9TfJ0L7x';

describe('controllers/create-account', () => {
  let db: Knex;

  beforeAll(async () => {
    db = connection();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('post', () => {
    xdescribe('unhappy paths', () => {
      it('should fail if all required parameters are missing', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [emailIsRequiredError, passwordIsRequiredError, repeatedPasswordIsRequiredError],
        });
      });

      describe('email', () => {
        it('should require a valid looking email address', async () => {
          const givenEmail = 'some bad value';

          const response = await request(app)
            .post(BASE_PATH)
            .send({
              email: givenEmail,
              password: GOOD_PASSWORD,
              repeatedPassword: GOOD_PASSWORD,
            })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: [emailIsNotValidError(givenEmail)],
          });
        });

        it('should require a unique email address', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({
              email: 'first.last@example.com',
              password: GOOD_PASSWORD,
              repeatedPassword: GOOD_PASSWORD,
            })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual(errorCreatingUserAccount);
        });
      });

      describe('password', () => {
        it('cannot be empty', async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({ email: 'first.last@example.com', password: '', repeatedPassword: '' })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: [passwordCannotBeEmptyError],
          });
        });

        it('should not be too long', async () => {
          const givenPassword = 'a'.repeat(200);

          const response = await request(app)
            .post(BASE_PATH)
            .send({
              email: 'first.last@example.com',
              password: givenPassword,
              repeatedPassword: givenPassword,
            })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: [passwordDoesNotMatchExpectedPatternError(givenPassword)],
          });
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
            password: GOOD_PASSWORD,
            repeatedPassword: GOOD_PASSWORD,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(201);

        expect(response.body).toEqual({ success: true, data: { email } });
      });
    });
  });
});
