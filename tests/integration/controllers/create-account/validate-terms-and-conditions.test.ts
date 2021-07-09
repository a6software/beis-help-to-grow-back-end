import { agent as request } from 'supertest';
import { Knex } from 'knex';
import { Express } from 'express';
import initApp from '../../../../src/app';
import {
  termsAndConditionsIsRequiredError,
  termsAndConditionsMustBeAValidValueError,
  termsAndConditionsMustBeBooleanError,
} from '../../../helpers/validation-error-messages/terms-and-conditions';
import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import connection from '../../../../src/lib/database/connection';

const BASE_PATH = '/create-account/validate-terms-and-conditions';

describe('controllers/create-account/validate-terms-and-conditions', () => {
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
          data: [termsAndConditionsIsRequiredError],
        });
      });

      it(`should require a truthy boolean value`, async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            termsAndConditions: false,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          data: [termsAndConditionsMustBeAValidValueError(false)],
        });
      });

      ['no', 'off', 0].forEach((falsyValue) => {
        it(`should reject unusual falsy variants - ${falsyValue}`, async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send({
              termsAndConditions: falsyValue,
            })
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: [termsAndConditionsMustBeBooleanError(falsyValue)],
          });
        });
      });
    });

    describe('happy path', () => {
      it('should return a success response when given valid information', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            termsAndConditions: true,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({ success: true, data: { termsAndConditions: true } });
      });
    });
  });
});
