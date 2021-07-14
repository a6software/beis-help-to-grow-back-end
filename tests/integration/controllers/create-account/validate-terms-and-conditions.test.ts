import { agent as request } from 'supertest';
import { Knex } from 'knex';
import { Express } from 'express';
import initApp from '../../../../src/app';
import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import connection from '../../../../src/lib/database/connection';
import {
  consentToTermsAndConditionsIsRequiredError,
  consentToTermsAndConditionsMustBeAValidValueError,
} from '../../../helpers/validation-error-messages/consent-to-terms-and-conditions';
import {
  consentToDataSharingIsRequiredError,
  consentToDataSharingMustBeAValidValueError,
} from '../../../helpers/validation-error-messages/consent-to-data-sharing';

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
          data: {
            errors: [
              consentToDataSharingIsRequiredError,
              consentToTermsAndConditionsIsRequiredError,
            ],
          },
        });
      });

      [
        {
          given: {
            consentToDataSharing: false,
            consentToTermsAndConditions: true,
          },
          expected: [consentToDataSharingMustBeAValidValueError(false)],
        },
        {
          given: {
            consentToDataSharing: true,
            consentToTermsAndConditions: false,
          },
          expected: [consentToTermsAndConditionsMustBeAValidValueError(false)],
        },
      ].forEach(({ given, expected }) => {
        it(`should require a truthy boolean value`, async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send(given)
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: {
              errors: expected,
            },
          });
        });
      });
    });

    describe('happy path', () => {
      it('should return a success response when given valid information', async () => {
        const response = await request(app)
          .post(BASE_PATH)
          .send({
            consentToDataSharing: true,
            consentToTermsAndConditions: true,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          data: {
            consentToDataSharing: true,
            consentToTermsAndConditions: true,
          },
        });
      });
    });
  });
});
