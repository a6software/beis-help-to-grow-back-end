import { agent as request } from 'supertest';
import app from '../../../src/app';
import {
  emailIsNotValidError,
  emailIsRequiredError,
} from '../../helpers/validation-error-messages/email';
import { CONTENT_TYPE_JSON } from '../../helpers/response-headers';

const BASE_PATH = '/create-account/validate-email-address';

describe('controllers/create-account/validate-email-address', () => {
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
