import Joi from 'joi';
import email from '../rules/email';
import emailVerificationCode from '../rules/email-verification-code';

export const schema = Joi.object({
  email: email(),
  verificationCode: emailVerificationCode(),
});

export default {
  schema,
};
