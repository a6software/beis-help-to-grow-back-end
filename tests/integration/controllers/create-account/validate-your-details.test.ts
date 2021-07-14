import { agent as request } from 'supertest';
import { Knex } from 'knex';
import { Express } from 'express';
import initApp from '../../../../src/app';
import { emailIsNotValidError } from '../../../helpers/validation-error-messages/email';
import { CONTENT_TYPE_JSON } from '../../../helpers/response-headers';
import connection from '../../../../src/lib/database/connection';
import { isRequiredError } from '../../../helpers/validation-error-messages/generic';

const BASE_PATH = '/create-account/validate-your-details';

const companyWebsiteUrl = 'http://example.com';
const fullName = 'Michael Gove';
const phoneNumber = '01632 960903';
const positionInCompany = 'Chief Tea Brewer';
const workEmailAddress = 'a.new.user@example.com';

const badEmailAddress = 'something invalid goes here';

describe('controllers/create-account/validate-your-details', () => {
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
      [
        {
          description: 'all required parameters are missing',
          payload: () => ({}),
          expectedErrors: [
            isRequiredError('companyWebsiteUrl'),
            isRequiredError('fullName'),
            isRequiredError('positionInCompany'),
            isRequiredError('workEmailAddress'),
          ],
        },
        {
          description: 'require a valid looking email address',
          payload: () => ({
            companyWebsiteUrl,
            fullName,
            phoneNumber,
            positionInCompany,
            workEmailAddress: badEmailAddress,
          }),
          expectedErrors: [emailIsNotValidError('workEmailAddress', badEmailAddress)],
        },
        // TODO all validation
      ].forEach(({ description, payload, expectedErrors }) => {
        it(`should fail - ${description}`, async () => {
          const response = await request(app)
            .post(BASE_PATH)
            .send(payload())
            .expect('Content-Type', CONTENT_TYPE_JSON)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            data: {
              errors: expectedErrors,
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
            companyWebsiteUrl,
            fullName,
            phoneNumber,
            positionInCompany,
            workEmailAddress,
          })
          .expect('Content-Type', CONTENT_TYPE_JSON)
          .expect(200);

        expect(response.body).toEqual({ success: true, data: { workEmailAddress } });
      });
    });
  });
});
