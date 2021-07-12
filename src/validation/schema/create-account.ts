import Joi from 'joi';
import email from '../rules/email';
import password from '../rules/password';
import repeatedPassword from '../rules/repeated-password';

export const schema = Joi.object({
  email: email(),
  password: password(),
  repeatedPassword: repeatedPassword(),
});

export default {
  schema,
};
