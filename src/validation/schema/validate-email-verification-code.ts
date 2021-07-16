import Joi from 'joi';
import email from '../rules/email';
import emailVerificationCodeIsUuidv4 from '../rules/email-verification-code-is-uuidv4';

export const schema = Joi.object({
  email: email(),
  verificationCode: emailVerificationCodeIsUuidv4(),
}).required();

export default {
  schema,
};
